'use client'

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Divider,
    Avatar,
    IconButton,
    Alert,
    Snackbar,
} from '@mui/material';
import {
    Save as SaveIcon,
    Upload as UploadIcon,
    Image as ImageIcon,
    Language as LanguageIcon,
    Palette as ThemeIcon,
    Public as FaviconIcon,
} from '@mui/icons-material';

interface GeneralConfig {
    companyName: string;
    companyDescription: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
    website: string;
    language: string;
    timezone: string;
    currency: string;
    dateFormat: string;
    theme: string;
    maintenanceMode: boolean;
    logo: string;
    favicon: string;
    footerText: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
}

const GeneralSettings: React.FC = () => {
    const [config, setConfig] = useState<GeneralConfig>({
        companyName: 'Minh Lộc Group',
        companyDescription: 'Chuyên cung cấp bất động sản cao cấp và sản phẩm sâm Ngọc Linh chất lượng',
        companyAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
        companyPhone: '028 1234 5678',
        companyEmail: 'info@minhloc.vn',
        website: 'https://minhloc.vn',
        language: 'vi',
        timezone: 'Asia/Ho_Chi_Minh',
        currency: 'VND',
        dateFormat: 'DD/MM/YYYY',
        theme: 'light',
        maintenanceMode: false,
        logo: '/logo.png',
        favicon: '/favicon.ico',
        footerText: '© 2024 Minh Lộc Group. All rights reserved.',
        metaTitle: 'Minh Lộc Group - BDS & Sâm Ngọc Linh',
        metaDescription: 'Chuyên cung cấp bất động sản cao cấp và sản phẩm sâm Ngọc Linh chất lượng cao',
        metaKeywords: 'bất động sản, sâm ngọc linh, minh lộc, BDS cao cấp'
    });

    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field: keyof GeneralConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({
            ...config,
            [field]: event.target.value,
        });
    };

    const handleSelectChange = (field: keyof GeneralConfig) => (event: any) => {
        setConfig({
            ...config,
            [field]: event.target.value,
        });
    };

    const handleSwitchChange = (field: keyof GeneralConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({
            ...config,
            [field]: event.target.checked,
        });
    };

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        setSaved(true);
    };

    const handleFileUpload = (field: 'logo' | 'favicon') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setConfig({
                ...config,
                [field]: url,
            });
        }
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Company Information */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Thông tin Công ty
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Tên công ty"
                                        value={config.companyName}
                                        onChange={handleInputChange('companyName')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="Mô tả công ty"
                                        value={config.companyDescription}
                                        onChange={handleInputChange('companyDescription')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ"
                                        value={config.companyAddress}
                                        onChange={handleInputChange('companyAddress')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Số điện thoại"
                                        value={config.companyPhone}
                                        onChange={handleInputChange('companyPhone')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={config.companyEmail}
                                        onChange={handleInputChange('companyEmail')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Website"
                                        value={config.website}
                                        onChange={handleInputChange('website')}
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
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Logo & Favicon
                            </Typography>

                            {/* Logo Upload */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>Logo</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                        src={config.logo}
                                        variant="square"
                                        sx={{ width: 80, height: 80 }}
                                    >
                                        <ImageIcon />
                                    </Avatar>
                                    <Box>
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="logo-upload"
                                            type="file"
                                            onChange={handleFileUpload('logo')}
                                        />
                                        <label htmlFor="logo-upload">
                                            <IconButton color="primary" component="span">
                                                <UploadIcon />
                                            </IconButton>
                                        </label>
                                        <Typography variant="caption" display="block">
                                            PNG, JPG (max 2MB)
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Favicon Upload */}
                            <Box>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>Favicon</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                        src={config.favicon}
                                        variant="square"
                                        sx={{ width: 32, height: 32 }}
                                    >
                                        <FaviconIcon />
                                    </Avatar>
                                    <Box>
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="favicon-upload"
                                            type="file"
                                            onChange={handleFileUpload('favicon')}
                                        />
                                        <label htmlFor="favicon-upload">
                                            <IconButton color="primary" component="span">
                                                <UploadIcon />
                                            </IconButton>
                                        </label>
                                        <Typography variant="caption" display="block">
                                            ICO, PNG (32x32px)
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Localization Settings */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                <LanguageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Bản địa hóa
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Ngôn ngữ</InputLabel>
                                        <Select
                                            value={config.language}
                                            label="Ngôn ngữ"
                                            onChange={handleSelectChange('language')}
                                        >
                                            <MenuItem value="vi">Tiếng Việt</MenuItem>
                                            <MenuItem value="en">English</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Múi giờ</InputLabel>
                                        <Select
                                            value={config.timezone}
                                            label="Múi giờ"
                                            onChange={handleSelectChange('timezone')}
                                        >
                                            <MenuItem value="Asia/Ho_Chi_Minh">GMT+7 (Việt Nam)</MenuItem>
                                            <MenuItem value="Asia/Bangkok">GMT+7 (Bangkok)</MenuItem>
                                            <MenuItem value="Asia/Singapore">GMT+8 (Singapore)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Tiền tệ</InputLabel>
                                        <Select
                                            value={config.currency}
                                            label="Tiền tệ"
                                            onChange={handleSelectChange('currency')}
                                        >
                                            <MenuItem value="VND">VND (₫)</MenuItem>
                                            <MenuItem value="USD">USD ($)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Định dạng ngày</InputLabel>
                                        <Select
                                            value={config.dateFormat}
                                            label="Định dạng ngày"
                                            onChange={handleSelectChange('dateFormat')}
                                        >
                                            <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                                            <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                                            <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Theme & System */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                <ThemeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Giao diện & Hệ thống
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Chủ đề</InputLabel>
                                        <Select
                                            value={config.theme}
                                            label="Chủ đề"
                                            onChange={handleSelectChange('theme')}
                                        >
                                            <MenuItem value="light">Sáng</MenuItem>
                                            <MenuItem value="dark">Tối</MenuItem>
                                            <MenuItem value="auto">Tự động</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={config.maintenanceMode}
                                                onChange={handleSwitchChange('maintenanceMode')}
                                            />
                                        }
                                        label="Chế độ bảo trì"
                                    />
                                    <Typography variant="caption" display="block" color="text.secondary">
                                        Khi bật, website sẽ hiển thị trang bảo trì cho người dùng
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* SEO Settings */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Cài đặt SEO
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Meta Title"
                                        value={config.metaTitle}
                                        onChange={handleInputChange('metaTitle')}
                                        helperText="Tối đa 60 ký tự"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Meta Keywords"
                                        value={config.metaKeywords}
                                        onChange={handleInputChange('metaKeywords')}
                                        helperText="Các từ khóa cách nhau bằng dấu phẩy"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="Meta Description"
                                        value={config.metaDescription}
                                        onChange={handleInputChange('metaDescription')}
                                        helperText="Tối đa 160 ký tự"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Footer Text"
                                        value={config.footerText}
                                        onChange={handleInputChange('footerText')}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Save Button */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                            disabled={loading}
                            sx={{
                                backgroundColor: '#E7C873',
                                color: '#000',
                                '&:hover': {
                                    backgroundColor: '#d4b86a',
                                },
                                minWidth: 150,
                            }}
                        >
                            {loading ? 'Đang lưu...' : 'Lưu cài đặt'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* Success Snackbar */}
            <Snackbar
                open={saved}
                autoHideDuration={3000}
                onClose={() => setSaved(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSaved(false)} severity="success">
                    Cài đặt đã được lưu thành công!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default GeneralSettings;
