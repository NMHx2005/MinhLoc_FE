'use client'

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    Switch,
    FormControlLabel,
    Divider,
    Snackbar,
} from '@mui/material';
import {
    Save as SaveIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';

interface FieldSettings {
    enableConstruction: boolean;
    enableFinance: boolean;
    enableRealEstate: boolean;
    defaultCurrency: string;
    defaultLanguage: string;
    autoUpdate: boolean;
    notificationEmail: string;
    maxProjectsPerField: number;
    enableAnalytics: boolean;
    dataRetentionDays: number;
}

const FieldSettings: React.FC = () => {
    const [settings, setSettings] = useState<FieldSettings>({
        enableConstruction: true,
        enableFinance: true,
        enableRealEstate: true,
        defaultCurrency: 'VND',
        defaultLanguage: 'vi',
        autoUpdate: true,
        notificationEmail: 'admin@minhlocgroup.com',
        maxProjectsPerField: 100,
        enableAnalytics: true,
        dataRetentionDays: 365,
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSave = () => {
        // TODO: Implement save to backend
        setSnackbarMessage('Cài đặt đã được lưu thành công!');
        setSnackbarOpen(true);
    };

    const handleChange = (field: keyof FieldSettings, value: any) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Cài đặt Lĩnh vực Hoạt động
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                >
                    Lưu cài đặt
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* General Settings */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Cài đặt chung
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email thông báo"
                                        type="email"
                                        value={settings.notificationEmail}
                                        onChange={(e) => handleChange('notificationEmail', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Tiền tệ mặc định"
                                        select
                                        value={settings.defaultCurrency}
                                        onChange={(e) => handleChange('defaultCurrency', e.target.value)}
                                    >
                                        <option value="VND">VND</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Ngôn ngữ mặc định"
                                        select
                                        value={settings.defaultLanguage}
                                        onChange={(e) => handleChange('defaultLanguage', e.target.value)}
                                    >
                                        <option value="vi">Tiếng Việt</option>
                                        <option value="en">English</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Số dự án tối đa mỗi lĩnh vực"
                                        type="number"
                                        value={settings.maxProjectsPerField}
                                        onChange={(e) => handleChange('maxProjectsPerField', parseInt(e.target.value))}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Thời gian lưu trữ dữ liệu (ngày)"
                                        type="number"
                                        value={settings.dataRetentionDays}
                                        onChange={(e) => handleChange('dataRetentionDays', parseInt(e.target.value))}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Field Settings */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Cài đặt lĩnh vực
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.enableConstruction}
                                                onChange={(e) => handleChange('enableConstruction', e.target.checked)}
                                            />
                                        }
                                        label="Kích hoạt lĩnh vực Xây dựng"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.enableFinance}
                                                onChange={(e) => handleChange('enableFinance', e.target.checked)}
                                            />
                                        }
                                        label="Kích hoạt lĩnh vực Đầu tư Tài chính"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.enableRealEstate}
                                                onChange={(e) => handleChange('enableRealEstate', e.target.checked)}
                                            />
                                        }
                                        label="Kích hoạt lĩnh vực Bất động sản"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* System Settings */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Cài đặt hệ thống
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.autoUpdate}
                                                onChange={(e) => handleChange('autoUpdate', e.target.checked)}
                                            />
                                        }
                                        label="Tự động cập nhật dữ liệu"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.enableAnalytics}
                                                onChange={(e) => handleChange('enableAnalytics', e.target.checked)}
                                            />
                                        }
                                        label="Kích hoạt phân tích dữ liệu"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default FieldSettings;
