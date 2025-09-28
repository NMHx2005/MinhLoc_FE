'use client'

import React, { useState, useEffect } from 'react';
import {
    Box, Card, CardContent, Typography, TextField, Button, Grid,
    Switch, FormControlLabel, Alert, Snackbar, CircularProgress,
    Divider, Avatar, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
    Tabs, Tab, IconButton
} from '@mui/material';
import {
    Save as SaveIcon, Upload as UploadIcon, Refresh as RefreshIcon,
    Business as BusinessIcon, Language as LanguageIcon, Schedule as ScheduleIcon,
    CloudUpload as CloudUploadIcon, Link as LinkIcon, Close as CloseIcon
} from '@mui/icons-material';
import { settingsService, type GeneralSettings } from '../../services/admin/settingsService';
import { api } from '../../services/api';

const GeneralSettings: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [settings, setSettings] = useState<GeneralSettings>({
        sitename: '',
        sitedescription: '',
        siteurl: '',
        site_logo: '',
        favicon: '',
        contactemail: '',
        contactphone: '',
        address: '',
        timezone: 'Asia/Ho_Chi_Minh',
        language: 'vi',
        currency: 'VND',
        dateformat: 'DD/MM/YYYY',
        timeformat: '24',
        maintenancemode: false,
        maintenancemessage: '',
        allowregistration: true,
        requireemailverification: true,
        defaultlanguage: 'vi'
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [faviconFile, setFaviconFile] = useState<File | null>(null);

    // Upload dialog states
    const [showLogoDialog, setShowLogoDialog] = useState(false);
    const [showFaviconDialog, setShowFaviconDialog] = useState(false);
    const [uploadTab, setUploadTab] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.getGeneralSettings();
            setSettings(prev => ({
                ...prev,
                ...data,
                sitename: data.sitename || '',
                sitedescription: data.sitedescription || '',
                siteurl: data.siteurl || '',
                site_logo: data.site_logo || '',
                favicon: data.favicon || '',
                contactemail: data.contactemail || '',
                contactphone: data.contactphone || '',
                address: data.address || '',
                timezone: data.timezone || 'Asia/Ho_Chi_Minh',
                language: data.language || 'vi',
                currency: data.currency || 'VND',
                dateformat: data.dateformat || 'DD/MM/YYYY',
                timeformat: data.timeformat || '24',
                maintenancemode: data.maintenancemode || false,
                maintenancemessage: data.maintenancemessage || '',
                allowregistration: data.allowregistration ?? true,
                requireemailverification: data.requireemailverification ?? true,
                defaultlanguage: data.defaultlanguage || 'vi'
            }));
        } catch (err) {
            console.error('Error loading settings:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải cài đặt');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof GeneralSettings, value: string | boolean) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setLogoFile(file);
        }
    };

    const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFaviconFile(file);
        }
    };

    const handleUploadImage = async (type: 'logo' | 'favicon') => {
        try {
            setUploading(true);
            setError(null);
            let imageUrl = '';

            if (uploadTab === 0 && (type === 'logo' ? logoFile : faviconFile)) {
                // Upload to backend API using api service
                const file = type === 'logo' ? logoFile : faviconFile;
                if (file) {
                    const formData = new FormData();
                    formData.append(type, file);

                    const response = await api.post(`/admin/settings/upload-${type}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });


                    if (!response.data.success) {
                        throw new Error(response.data.message || 'Upload failed');
                    }

                    // Backend returns data.logoUrl or data.faviconUrl
                    const urlField = type === 'logo' ? 'logoUrl' : 'faviconUrl';
                    if (!response.data.data || !response.data.data[urlField]) {
                        throw new Error('No URL returned from upload');
                    }

                    imageUrl = response.data.data[urlField];
                }
            } else if (uploadTab === 1 && imageUrl.trim()) {
                // Use provided URL
                imageUrl = imageUrl.trim();
            } else {
                throw new Error(uploadTab === 0 ? 'Vui lòng chọn file để upload' : 'Vui lòng nhập URL ảnh');
            }

            if (imageUrl) {
                if (type === 'logo') {
                    setSettings(prev => ({ ...prev, site_logo: imageUrl }));
                    setLogoFile(null);
                } else {
                    setSettings(prev => ({ ...prev, favicon: imageUrl }));
                    setFaviconFile(null);
                }

                setSnackbarMessage(`✅ Cập nhật ${type === 'logo' ? 'logo' : 'favicon'} thành công!`);
                setSnackbarOpen(true);
            }
        } catch (err) {
            console.error('Error uploading image:', err);
            const errorMessage = err instanceof Error ? err.message : 'Không thể upload ảnh';
            setError(errorMessage);
            setSnackbarMessage(`❌ ${errorMessage}`);
            setSnackbarOpen(true);
        } finally {
            setUploading(false);
            setImageUrl('');
            setUploadTab(0);
            if (type === 'logo') {
                setShowLogoDialog(false);
            } else {
                setShowFaviconDialog(false);
            }
        }
    };

    const handleCloseDialog = () => {
        setShowLogoDialog(false);
        setShowFaviconDialog(false);
        setImageUrl('');
        setUploadTab(0);
        setLogoFile(null);
        setFaviconFile(null);
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError(null);

            // Upload logo if selected
            if (logoFile) {
                const logoResponse = await settingsService.uploadLogo(logoFile);
                settings.site_logo = logoResponse.url;
            }

            // Upload favicon if selected
            if (faviconFile) {
                const faviconResponse = await settingsService.uploadFavicon(faviconFile);
                settings.favicon = faviconResponse.url;
            }

            // Update settings
            await settingsService.updateGeneralSettings(settings);

            setSnackbarMessage('✅ Cập nhật cài đặt thành công!');
            setSnackbarOpen(true);
            setLogoFile(null);
            setFaviconFile(null);
        } catch (err) {
            console.error('Error saving settings:', err);
            setError(err instanceof Error ? err.message : 'Không thể lưu cài đặt');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải cài đặt...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                    {error}
                    {error.includes('Upload failed') && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Lỗi upload ảnh:</strong>
                            </Typography>
                            <Typography variant="body2" component="div">
                                • Kiểm tra kết nối backend
                            </Typography>
                            <Typography variant="body2" component="div">
                                • Kiểm tra token authentication
                            </Typography>
                            <Typography variant="body2" component="div">
                                • Kiểm tra cấu hình Cloudinary ở backend
                            </Typography>
                        </Box>
                    )}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <BusinessIcon sx={{ mr: 1 }} />
                                Thông tin cơ bản
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Tên website"
                                        value={settings.sitename}
                                        onChange={(e) => handleInputChange('sitename', e.target.value)}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Mô tả website"
                                        value={settings.sitedescription}
                                        onChange={(e) => handleInputChange('sitedescription', e.target.value)}
                                        multiline
                                        rows={3}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="URL website"
                                        value={settings.siteurl}
                                        onChange={(e) => handleInputChange('siteurl', e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Email liên hệ"
                                        value={settings.contactemail}
                                        onChange={(e) => handleInputChange('contactemail', e.target.value)}
                                        type="email"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Số điện thoại"
                                        value={settings.contactphone}
                                        onChange={(e) => handleInputChange('contactphone', e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ"
                                        value={settings.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Logo & Favicon */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Logo & Favicon
                            </Typography>

                            <Box sx={{ textAlign: 'center', mb: 3 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                    Logo
                                </Typography>
                                <Avatar
                                    src={settings.site_logo}
                                    sx={{ width: 120, height: 60, mx: 'auto', mb: 2 }}
                                    variant="rounded"
                                >
                                    <BusinessIcon sx={{ fontSize: 40 }} />
                                </Avatar>
                                <Button
                                    variant="outlined"
                                    startIcon={<UploadIcon />}
                                    size="small"
                                    onClick={() => setShowLogoDialog(true)}
                                >
                                    Cập nhật Logo
                                </Button>
                                {logoFile && (
                                    <Chip
                                        label={logoFile.name}
                                        size="small"
                                        sx={{ ml: 1 }}
                                    />
                                )}
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                    Favicon
                                </Typography>
                                <Avatar
                                    src={settings.favicon}
                                    sx={{ width: 32, height: 32, mx: 'auto', mb: 2 }}
                                >
                                    <LanguageIcon />
                                </Avatar>
                                <Button
                                    variant="outlined"
                                    startIcon={<UploadIcon />}
                                    size="small"
                                    onClick={() => setShowFaviconDialog(true)}
                                >
                                    Cập nhật Favicon
                                </Button>
                                {faviconFile && (
                                    <Chip
                                        label={faviconFile.name}
                                        size="small"
                                        sx={{ ml: 1 }}
                                    />
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Regional Settings */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <LanguageIcon sx={{ mr: 1 }} />
                                Cài đặt khu vực
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Múi giờ"
                                        value={settings.timezone}
                                        onChange={(e) => handleInputChange('timezone', e.target.value)}
                                        SelectProps={{ native: true }}
                                    >
                                        <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</option>
                                        <option value="UTC">UTC</option>
                                        <option value="America/New_York">America/New_York</option>
                                        <option value="Europe/London">Europe/London</option>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Ngôn ngữ"
                                        value={settings.language}
                                        onChange={(e) => handleInputChange('language', e.target.value)}
                                        SelectProps={{ native: true }}
                                    >
                                        <option value="vi">Tiếng Việt</option>
                                        <option value="en">English</option>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Tiền tệ"
                                        value={settings.currency}
                                        onChange={(e) => handleInputChange('currency', e.target.value)}
                                        SelectProps={{ native: true }}
                                    >
                                        <option value="VND">VND</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Định dạng ngày"
                                        value={settings.dateformat}
                                        onChange={(e) => handleInputChange('dateformat', e.target.value)}
                                        SelectProps={{ native: true }}
                                    >
                                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Định dạng giờ"
                                        value={settings.timeformat}
                                        onChange={(e) => handleInputChange('timeformat', e.target.value)}
                                        SelectProps={{ native: true }}
                                    >
                                        <option value="24">24 giờ</option>
                                        <option value="12">12 giờ (AM/PM)</option>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Maintenance Mode */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <ScheduleIcon sx={{ mr: 1 }} />
                                Chế độ bảo trì
                            </Typography>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.maintenancemode}
                                        onChange={(e) => handleInputChange('maintenancemode', e.target.checked)}
                                    />
                                }
                                label="Bật chế độ bảo trì"
                            />

                            {settings.maintenancemode && (
                                <TextField
                                    fullWidth
                                    label="Thông báo bảo trì"
                                    value={settings.maintenancemessage || ''}
                                    onChange={(e) => handleInputChange('maintenancemessage', e.target.value)}
                                    multiline
                                    rows={3}
                                    sx={{ mt: 2 }}
                                    placeholder="Website đang được bảo trì. Vui lòng quay lại sau..."
                                />
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={loadSettings}
                    disabled={saving}
                >
                    Làm mới
                </Button>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
                </Button>
            </Box>

            {/* Logo Upload Dialog */}
            <Dialog open={showLogoDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        Cập nhật Logo
                        <IconButton onClick={handleCloseDialog} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Tabs value={uploadTab} onChange={(_, newValue) => setUploadTab(newValue)} sx={{ mb: 3 }}>
                        <Tab icon={<CloudUploadIcon />} label="Upload từ máy" />
                        <Tab icon={<LinkIcon />} label="Nhập URL" />
                    </Tabs>

                    {uploadTab === 0 && (
                        <Box>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="logo-file-upload"
                                type="file"
                                onChange={handleLogoUpload}
                            />
                            <label htmlFor="logo-file-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<CloudUploadIcon />}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    Chọn file từ máy
                                </Button>
                            </label>
                            {logoFile && (
                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        File đã chọn: {logoFile.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Kích thước: {(logoFile.size / 1024 / 1024).toFixed(2)} MB
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    {uploadTab === 1 && (
                        <TextField
                            fullWidth
                            label="URL ảnh"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.png"
                            sx={{ mt: 2 }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button
                        onClick={() => handleUploadImage('logo')}
                        variant="contained"
                        disabled={uploading || (uploadTab === 0 && !logoFile) || (uploadTab === 1 && !imageUrl.trim())}
                        startIcon={uploading ? <CircularProgress size={20} /> : <UploadIcon />}
                    >
                        {uploading ? 'Đang upload...' : 'Cập nhật Logo'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Favicon Upload Dialog */}
            <Dialog open={showFaviconDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        Cập nhật Favicon
                        <IconButton onClick={handleCloseDialog} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Tabs value={uploadTab} onChange={(_, newValue) => setUploadTab(newValue)} sx={{ mb: 3 }}>
                        <Tab icon={<CloudUploadIcon />} label="Upload từ máy" />
                        <Tab icon={<LinkIcon />} label="Nhập URL" />
                    </Tabs>

                    {uploadTab === 0 && (
                        <Box>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="favicon-file-upload"
                                type="file"
                                onChange={handleFaviconUpload}
                            />
                            <label htmlFor="favicon-file-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<CloudUploadIcon />}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    Chọn file từ máy
                                </Button>
                            </label>
                            {faviconFile && (
                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        File đã chọn: {faviconFile.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Kích thước: {(faviconFile.size / 1024 / 1024).toFixed(2)} MB
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    {uploadTab === 1 && (
                        <TextField
                            fullWidth
                            label="URL ảnh"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/favicon.ico"
                            sx={{ mt: 2 }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button
                        onClick={() => handleUploadImage('favicon')}
                        variant="contained"
                        disabled={uploading || (uploadTab === 0 && !faviconFile) || (uploadTab === 1 && !imageUrl.trim())}
                        startIcon={uploading ? <CircularProgress size={20} /> : <UploadIcon />}
                    >
                        {uploading ? 'Đang upload...' : 'Cập nhật Favicon'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default GeneralSettings;