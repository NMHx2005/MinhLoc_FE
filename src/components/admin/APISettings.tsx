'use client'

import React, { useState, useEffect } from 'react';
import {
    Box, Card, CardContent, Typography, TextField, Button, Grid,
    Switch, FormControlLabel, Alert, Snackbar, CircularProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    Chip, Menu, MenuItem, ListItemIcon, ListItemText
} from '@mui/material';
import {
    Save as SaveIcon, Add as AddIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon,
    Api as ApiIcon, Key as KeyIcon, Security as SecurityIcon, BugReport as TestIcon,
    Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { settingsService, type APISettings, type ApiKey } from '../../services/admin/settingsService';

const APISettings: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [apiSettings, setApiSettings] = useState<APISettings>({
        enableApi: false,
        apiVersion: '1.0.0',
        rateLimit: {
            requests: 1000,
            window: 3600
        },
        cors: {
            enabled: true,
            origins: []
        },
        authentication: {
            jwtSecret: '',
            jwtExpiresIn: '24h',
            refreshTokenExpiresIn: '7d'
        }
    });

    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [newApiKey, setNewApiKey] = useState({ name: '', permissions: [] as string[] });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
    const [showSecret, setShowSecret] = useState<{ [key: string]: boolean }>({});

    const permissionOptions = [
        'read:users', 'write:users', 'delete:users',
        'read:projects', 'write:projects', 'delete:projects',
        'read:news', 'write:news', 'delete:news',
        'read:settings', 'write:settings'
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [settings, keys] = await Promise.all([
                settingsService.getApiSettings(),
                settingsService.getApiKeys()
            ]);

            // Ensure all nested objects are properly initialized
            setApiSettings({
                enableApi: settings.enableApi ?? false,
                apiVersion: settings.apiVersion ?? '1.0.0',
                rateLimit: {
                    requests: settings.rateLimit?.requests ?? 1000,
                    window: settings.rateLimit?.window ?? 3600
                },
                cors: {
                    enabled: settings.cors?.enabled ?? true,
                    origins: settings.cors?.origins ?? []
                },
                authentication: {
                    jwtSecret: settings.authentication?.jwtSecret ?? '',
                    jwtExpiresIn: settings.authentication?.jwtExpiresIn ?? '24h',
                    refreshTokenExpiresIn: settings.authentication?.refreshTokenExpiresIn ?? '7d'
                }
            });
            setApiKeys(keys);
        } catch (err) {
            console.error('Error loading API data:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu API');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof APISettings, value: string | boolean) => {
        setApiSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNestedInputChange = (parent: keyof APISettings, field: string, value: string | number | boolean | string[]) => {
        setApiSettings(prev => ({
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
            await settingsService.updateApiSettings(apiSettings);
            setSnackbarMessage('✅ Cập nhật cài đặt API thành công!');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error saving API settings:', err);
            setError(err instanceof Error ? err.message : 'Không thể lưu cài đặt API');
        } finally {
            setSaving(false);
        }
    };

    const handleCreateApiKey = async () => {
        try {
            setSaving(true);
            const newKey = await settingsService.createApiKey(newApiKey);
            setApiKeys(prev => [...prev, newKey]);
            setShowCreateDialog(false);
            setNewApiKey({ name: '', permissions: [] });
            setSnackbarMessage('✅ Tạo API key thành công!');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error creating API key:', err);
            setError(err instanceof Error ? err.message : 'Không thể tạo API key');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteApiKey = async (id: string) => {
        try {
            await settingsService.deleteApiKey(id);
            setApiKeys(prev => prev.filter(key => key._id !== id));
            setSnackbarMessage('✅ Xóa API key thành công!');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error deleting API key:', err);
            setError(err instanceof Error ? err.message : 'Không thể xóa API key');
        }
    };

    const handleTestConnection = async () => {
        try {
            setSaving(true);
            const result = await settingsService.testApiConnection();
            setSnackbarMessage(result.success ? '✅ Kết nối API thành công!' : `❌ ${result.message}`);
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error testing connection:', err);
            setError(err instanceof Error ? err.message : 'Không thể kiểm tra kết nối');
        } finally {
            setSaving(false);
        }
    };

    const toggleSecretVisibility = (keyId: string) => {
        setShowSecret(prev => ({
            ...prev,
            [keyId]: !prev[keyId]
        }));
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, key: ApiKey) => {
        setAnchorEl(event.currentTarget);
        setSelectedKey(key);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedKey(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải cài đặt API...</Typography>
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
                {/* API Configuration */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <ApiIcon sx={{ mr: 1 }} />
                                Cấu hình API
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={apiSettings.enableApi}
                                                onChange={(e) => handleInputChange('enableApi', e.target.checked)}
                                            />
                                        }
                                        label="Bật API"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Phiên bản API"
                                        value={apiSettings.apiVersion}
                                        onChange={(e) => handleInputChange('apiVersion', e.target.value)}
                                        disabled={!apiSettings.enableApi}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="JWT Secret"
                                        type="password"
                                        value={apiSettings.authentication?.jwtSecret || ''}
                                        onChange={(e) => handleNestedInputChange('authentication', 'jwtSecret', e.target.value)}
                                        disabled={!apiSettings.enableApi}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="JWT Expires In"
                                        value={apiSettings.authentication?.jwtExpiresIn || ''}
                                        onChange={(e) => handleNestedInputChange('authentication', 'jwtExpiresIn', e.target.value)}
                                        disabled={!apiSettings.enableApi}
                                        placeholder="24h"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Refresh Token Expires In"
                                        value={apiSettings.authentication?.refreshTokenExpiresIn || ''}
                                        onChange={(e) => handleNestedInputChange('authentication', 'refreshTokenExpiresIn', e.target.value)}
                                        disabled={!apiSettings.enableApi}
                                        placeholder="7d"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Rate Limiting */}
                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <SecurityIcon sx={{ mr: 1 }} />
                                Giới hạn tốc độ
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Số request tối đa"
                                        type="number"
                                        value={apiSettings.rateLimit?.requests || 1000}
                                        onChange={(e) => handleNestedInputChange('rateLimit', 'requests', parseInt(e.target.value))}
                                        disabled={!apiSettings.enableApi}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Khoảng thời gian (giây)"
                                        type="number"
                                        value={apiSettings.rateLimit?.window || 3600}
                                        onChange={(e) => handleNestedInputChange('rateLimit', 'window', parseInt(e.target.value))}
                                        disabled={!apiSettings.enableApi}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* CORS Settings */}
                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                CORS Settings
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={apiSettings.cors?.enabled ?? true}
                                                onChange={(e) => handleNestedInputChange('cors', 'enabled', e.target.checked)}
                                                disabled={!apiSettings.enableApi}
                                            />
                                        }
                                        label="Bật CORS"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Allowed Origins (mỗi dòng một origin)"
                                        multiline
                                        rows={3}
                                        value={apiSettings.cors?.origins?.join('\n') || ''}
                                        onChange={(e) => handleNestedInputChange('cors', 'origins', e.target.value.split('\n').filter(o => o.trim()))}
                                        disabled={!apiSettings.enableApi || !apiSettings.cors?.enabled}
                                        placeholder="https://example.com&#10;https://app.example.com"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* API Keys Management */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <KeyIcon sx={{ mr: 1 }} />
                                    API Keys
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => setShowCreateDialog(true)}
                                    size="small"
                                >
                                    Tạo Key
                                </Button>
                            </Box>

                            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tên</TableCell>
                                            <TableCell>Key</TableCell>
                                            <TableCell>Trạng thái</TableCell>
                                            <TableCell>Hành động</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {apiKeys.map((key) => (
                                            <TableRow key={key._id}>
                                                <TableCell>{key.name}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                                            {showSecret[key._id] ? key.key : '••••••••••••••••'}
                                                        </Typography>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => toggleSecretVisibility(key._id)}
                                                        >
                                                            {showSecret[key._id] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={key.isActive ? 'Active' : 'Inactive'}
                                                        color={key.isActive ? 'success' : 'default'}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => handleMenuOpen(e, key)}
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
                    startIcon={<TestIcon />}
                    onClick={handleTestConnection}
                    disabled={saving || !apiSettings.enableApi}
                >
                    Kiểm tra kết nối
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

            {/* Create API Key Dialog */}
            <Dialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Tạo API Key mới</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Tên API Key"
                        value={newApiKey.name}
                        onChange={(e) => setNewApiKey(prev => ({ ...prev, name: e.target.value }))}
                        sx={{ mb: 3, mt: 2 }}
                    />
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                        Quyền hạn:
                    </Typography>
                    <Grid container spacing={1}>
                        {permissionOptions.map(permission => (
                            <Grid item xs={6} sm={4} key={permission}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={newApiKey.permissions.includes(permission)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setNewApiKey(prev => ({
                                                        ...prev,
                                                        permissions: [...prev.permissions, permission]
                                                    }));
                                                } else {
                                                    setNewApiKey(prev => ({
                                                        ...prev,
                                                        permissions: prev.permissions.filter(p => p !== permission)
                                                    }));
                                                }
                                            }}
                                        />
                                    }
                                    label={permission}
                                    sx={{ fontSize: '0.8rem' }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowCreateDialog(false)}>Hủy</Button>
                    <Button onClick={handleCreateApiKey} variant="contained" disabled={!newApiKey.name}>
                        Tạo
                    </Button>
                </DialogActions>
            </Dialog>

            {/* API Key Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {
                    if (selectedKey) {
                        handleDeleteApiKey(selectedKey._id);
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

export default APISettings;