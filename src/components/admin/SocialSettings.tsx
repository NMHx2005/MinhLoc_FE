'use client'

import React, { useState, useEffect } from 'react';
import {
    Box, Card, CardContent, Typography, TextField, Button, Grid,
    Switch, FormControlLabel, Alert, Snackbar, CircularProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    Menu, MenuItem, ListItemIcon, ListItemText, Select, FormControl,
    InputLabel, Divider
} from '@mui/material';
import {
    Save as SaveIcon, Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon,
    Share as ShareIcon, Facebook as FacebookIcon, Twitter as TwitterIcon,
    LinkedIn as LinkedInIcon, Instagram as InstagramIcon, YouTube as YouTubeIcon,
    MoreVert as MoreVertIcon, Refresh as RefreshIcon
} from '@mui/icons-material';
import { settingsService, type SocialSettings, type SocialLink } from '../../services/admin/settingsService';

const SocialSettings: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [socialSettings, setSocialSettings] = useState<SocialSettings>({
        enableSocialLogin: false,
        facebook: {
            appId: '',
            appSecret: ''
        },
        google: {
            clientId: '',
            clientSecret: ''
        },
        twitter: {
            consumerKey: '',
            consumerSecret: ''
        },
        linkedin: {
            clientId: '',
            clientSecret: ''
        }
    });

    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [showLinkDialog, setShowLinkDialog] = useState(false);
    const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
    const [linkData, setLinkData] = useState({
        platform: '',
        url: '',
        icon: '',
        order: 0
    });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedLink, setSelectedLink] = useState<SocialLink | null>(null);

    const platformOptions = [
        { value: 'facebook', label: 'Facebook', icon: 'facebook' },
        { value: 'twitter', label: 'Twitter', icon: 'twitter' },
        { value: 'instagram', label: 'Instagram', icon: 'instagram' },
        { value: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
        { value: 'youtube', label: 'YouTube', icon: 'youtube' },
        { value: 'tiktok', label: 'TikTok', icon: 'tiktok' },
        { value: 'zalo', label: 'Zalo', icon: 'zalo' }
    ];

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'facebook': return <FacebookIcon />;
            case 'twitter': return <TwitterIcon />;
            case 'instagram': return <InstagramIcon />;
            case 'linkedin': return <LinkedInIcon />;
            case 'youtube': return <YouTubeIcon />;
            default: return <ShareIcon />;
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [settings, links] = await Promise.all([
                settingsService.getSocialSettings(),
                settingsService.getSocialLinks()
            ]);
            setSocialSettings(settings);
            setSocialLinks(links);
        } catch (err) {
            console.error('Error loading social data:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu mạng xã hội');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof SocialSettings, value: string | boolean) => {
        setSocialSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNestedInputChange = (parent: keyof SocialSettings, field: string, value: string | number | boolean) => {
        setSocialSettings(prev => ({
            ...prev,
            [parent]: {
                ...(prev[parent] as Record<string, unknown>),
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError(null);
            await settingsService.updateSocialSettings(socialSettings);
            setSnackbarMessage('✅ Cập nhật cài đặt mạng xã hội thành công!');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error saving social settings:', err);
            setError(err instanceof Error ? err.message : 'Không thể lưu cài đặt mạng xã hội');
        } finally {
            setSaving(false);
        }
    };

    const handleCreateLink = async () => {
        try {
            setSaving(true);
            const newLink = await settingsService.createSocialLink(linkData);
            setSocialLinks(prev => [...prev, newLink]);
            setShowLinkDialog(false);
            setLinkData({ platform: '', url: '', icon: '', order: 0 });
            setSnackbarMessage('✅ Tạo liên kết thành công!');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error creating social link:', err);
            setError(err instanceof Error ? err.message : 'Không thể tạo liên kết');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateLink = async () => {
        if (!editingLink) return;
        try {
            setSaving(true);
            const updatedLink = await settingsService.updateSocialLink(editingLink._id, linkData);
            setSocialLinks(prev => prev.map(l => l._id === editingLink._id ? updatedLink : l));
            setShowLinkDialog(false);
            setEditingLink(null);
            setLinkData({ platform: '', url: '', icon: '', order: 0 });
            setSnackbarMessage('✅ Cập nhật liên kết thành công!');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error updating social link:', err);
            setError(err instanceof Error ? err.message : 'Không thể cập nhật liên kết');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteLink = async (id: string) => {
        try {
            await settingsService.deleteSocialLink(id);
            setSocialLinks(prev => prev.filter(l => l._id !== id));
            setSnackbarMessage('✅ Xóa liên kết thành công!');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error deleting social link:', err);
            setError(err instanceof Error ? err.message : 'Không thể xóa liên kết');
        }
    };

    const handleEditLink = (link: SocialLink) => {
        setEditingLink(link);
        setLinkData({
            platform: link.platform,
            url: link.url,
            icon: link.icon,
            order: link.order
        });
        setShowLinkDialog(true);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, link: SocialLink) => {
        setAnchorEl(event.currentTarget);
        setSelectedLink(link);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedLink(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải cài đặt mạng xã hội...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Social Login Settings */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <ShareIcon sx={{ mr: 1 }} />
                                Đăng nhập mạng xã hội
                            </Typography>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={socialSettings.enableSocialLogin}
                                        onChange={(e) => handleInputChange('enableSocialLogin', e.target.checked)}
                                    />
                                }
                                label="Bật đăng nhập mạng xã hội"
                                sx={{ mb: 3 }}
                            />

                            {socialSettings.enableSocialLogin && (
                                <Grid container spacing={3}>
                                    {/* Facebook */}
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                            <FacebookIcon sx={{ mr: 1, color: '#1877F2' }} />
                                            Facebook
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="App ID"
                                                    value={socialSettings.facebook?.appId || ''}
                                                    onChange={(e) => handleNestedInputChange('facebook', 'appId', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="App Secret"
                                                    type="password"
                                                    value={socialSettings.facebook?.appSecret || ''}
                                                    onChange={(e) => handleNestedInputChange('facebook', 'appSecret', e.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 2 }} />

                                    {/* Google */}
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                            <Box component="img" src="/google-icon.png" alt="Google" sx={{ width: 24, height: 24, mr: 1 }} />
                                            Google
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Client ID"
                                                    value={socialSettings.google?.clientId || ''}
                                                    onChange={(e) => handleNestedInputChange('google', 'clientId', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Client Secret"
                                                    type="password"
                                                    value={socialSettings.google?.clientSecret || ''}
                                                    onChange={(e) => handleNestedInputChange('google', 'clientSecret', e.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 2 }} />

                                    {/* Twitter */}
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                            <TwitterIcon sx={{ mr: 1, color: '#1DA1F2' }} />
                                            Twitter
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Consumer Key"
                                                    value={socialSettings.twitter?.consumerKey || ''}
                                                    onChange={(e) => handleNestedInputChange('twitter', 'consumerKey', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Consumer Secret"
                                                    type="password"
                                                    value={socialSettings.twitter?.consumerSecret || ''}
                                                    onChange={(e) => handleNestedInputChange('twitter', 'consumerSecret', e.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 2 }} />

                                    {/* LinkedIn */}
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                            <LinkedInIcon sx={{ mr: 1, color: '#0077B5' }} />
                                            LinkedIn
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Client ID"
                                                    value={socialSettings.linkedin?.clientId || ''}
                                                    onChange={(e) => handleNestedInputChange('linkedin', 'clientId', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Client Secret"
                                                    type="password"
                                                    value={socialSettings.linkedin?.clientSecret || ''}
                                                    onChange={(e) => handleNestedInputChange('linkedin', 'clientSecret', e.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Social Links */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6">
                                    Liên kết mạng xã hội
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => setShowLinkDialog(true)}
                                    size="small"
                                >
                                    Thêm liên kết
                                </Button>
                            </Box>

                            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nền tảng</TableCell>
                                            <TableCell>URL</TableCell>
                                            <TableCell>Hành động</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {socialLinks.map((link) => (
                                            <TableRow key={link._id}>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        {getPlatformIcon(link.platform)}
                                                        <Typography sx={{ ml: 1 }}>{link.platform}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {link.url}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => handleMenuOpen(e, link)}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={loadData}
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

            {/* Link Dialog */}
            <Dialog open={showLinkDialog} onClose={() => setShowLinkDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingLink ? 'Chỉnh sửa liên kết' : 'Thêm liên kết mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Nền tảng</InputLabel>
                                <Select
                                    value={linkData.platform}
                                    label="Nền tảng"
                                    onChange={(e) => setLinkData(prev => ({ ...prev, platform: e.target.value }))}
                                >
                                    {platformOptions.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="URL"
                                value={linkData.url}
                                onChange={(e) => setLinkData(prev => ({ ...prev, url: e.target.value }))}
                                placeholder="https://..."
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Icon (tên class CSS)"
                                value={linkData.icon}
                                onChange={(e) => setLinkData(prev => ({ ...prev, icon: e.target.value }))}
                                placeholder="fab fa-facebook"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Thứ tự hiển thị"
                                type="number"
                                value={linkData.order}
                                onChange={(e) => setLinkData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setShowLinkDialog(false);
                        setEditingLink(null);
                        setLinkData({ platform: '', url: '', icon: '', order: 0 });
                    }}>
                        Hủy
                    </Button>
                    <Button
                        onClick={editingLink ? handleUpdateLink : handleCreateLink}
                        variant="contained"
                        disabled={!linkData.platform || !linkData.url}
                    >
                        {editingLink ? 'Cập nhật' : 'Tạo'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Link Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {
                    if (selectedLink) {
                        handleEditLink(selectedLink);
                    }
                    handleMenuClose();
                }}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Chỉnh sửa</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedLink) {
                        handleDeleteLink(selectedLink._id);
                    }
                    handleMenuClose();
                }}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Xóa</ListItemText>
                </MenuItem>
            </Menu>

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

export default SocialSettings;