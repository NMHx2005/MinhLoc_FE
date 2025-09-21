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
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Divider,
    Alert,
    Snackbar,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@mui/material';
import {
    Save as SaveIcon,
    Api as ApiIcon,
    Security as SecurityIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    VisibilityOff as HideIcon,
    Science as TestIcon,
    CheckCircle as SuccessIcon,
    Error as ErrorIcon,
} from '@mui/icons-material';

interface APIConfig {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
    enableLogging: boolean;
    enableCache: boolean;
    cacheTimeout: number;
    rateLimit: number;
    enableCors: boolean;
    corsOrigins: string[];
}

interface APIKey {
    id: string;
    name: string;
    key: string;
    permissions: string[];
    createdAt: string;
    lastUsed?: string;
    isActive: boolean;
}

const APISettings: React.FC = () => {
    const [config, setConfig] = useState<APIConfig>({
        baseUrl: 'https://api.minhloc.vn',
        timeout: 30000,
        retryAttempts: 3,
        enableLogging: true,
        enableCache: true,
        cacheTimeout: 300,
        rateLimit: 1000,
        enableCors: true,
        corsOrigins: ['https://minhloc.vn', 'https://admin.minhloc.vn']
    });

    const [apiKeys, setApiKeys] = useState<APIKey[]>([
        {
            id: '1',
            name: 'Frontend App',
            key: 'mlg_live_sk_1234567890abcdef',
            permissions: ['read:projects', 'read:products', 'write:contacts'],
            createdAt: '2024-01-15T10:30:00',
            lastUsed: '2024-01-22T09:15:00',
            isActive: true
        },
        {
            id: '2',
            name: 'Mobile App',
            key: 'mlg_live_sk_fedcba0987654321',
            permissions: ['read:projects', 'read:products'],
            createdAt: '2024-01-10T14:20:00',
            lastUsed: '2024-01-21T16:45:00',
            isActive: true
        },
        {
            id: '3',
            name: 'Analytics Service',
            key: 'mlg_live_sk_abcd1234efgh5678',
            permissions: ['read:analytics', 'write:analytics'],
            createdAt: '2024-01-05T11:00:00',
            isActive: false
        }
    ]);

    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
    const [newKeyDialog, setNewKeyDialog] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
    const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([]);

    const handleInputChange = (field: keyof APIConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = ['timeout', 'retryAttempts', 'cacheTimeout', 'rateLimit'].includes(field)
            ? parseInt(event.target.value)
            : event.target.value;

        setConfig({
            ...config,
            [field]: value,
        });
    };

    // const handleSelectChange = (field: keyof APIConfig) => (event: any) => {
    //     setConfig({
    //         ...config,
    //         [field]: event.target.value,
    //     });
    // };

    const handleSwitchChange = (field: keyof APIConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleTestConnection = async () => {
        setLoading(true);
        // Simulate API test
        await new Promise(resolve => setTimeout(resolve, 2000));
        const success = Math.random() > 0.3; // 70% success rate for demo
        setTestResult({
            success,
            message: success ? 'Kết nối API thành công!' : 'Không thể kết nối đến API server'
        });
        setLoading(false);
    };

    const _toggleKeyVisibility = (keyId: string) => {
        setShowKeys(prev => ({
            ...prev,
            [keyId]: !prev[keyId]
        }));
    };

    const handleCreateApiKey = () => {
        if (newKeyName.trim()) {
            const newKey: APIKey = {
                id: (apiKeys.length + 1).toString(),
                name: newKeyName,
                key: `mlg_live_sk_${Math.random().toString(36).substring(2, 18)}`,
                permissions: newKeyPermissions,
                createdAt: new Date().toISOString(),
                isActive: true
            };
            setApiKeys([...apiKeys, newKey]);
            setNewKeyDialog(false);
            setNewKeyName('');
            setNewKeyPermissions([]);
        }
    };

    const handleDeleteApiKey = (keyId: string) => {
        setApiKeys(apiKeys.filter(key => key.id !== keyId));
    };

    const toggleApiKeyStatus = (keyId: string) => {
        setApiKeys(apiKeys.map(key =>
            key.id === keyId ? { ...key, isActive: !key.isActive } : key
        ));
    };

    const availablePermissions = [
        'read:projects', 'write:projects', 'delete:projects',
        'read:products', 'write:products', 'delete:products',
        'read:contacts', 'write:contacts', 'delete:contacts',
        'read:analytics', 'write:analytics',
        'read:users', 'write:users', 'delete:users'
    ];

    return (
        <Box>
            <Grid container spacing={3}>
                {/* API Configuration */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                <ApiIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Cấu hình API
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Base URL"
                                        value={config.baseUrl}
                                        onChange={handleInputChange('baseUrl')}
                                        helperText="URL gốc của API server"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Timeout (ms)"
                                        type="number"
                                        value={config.timeout}
                                        onChange={handleInputChange('timeout')}
                                        helperText="Thời gian chờ tối đa"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Retry Attempts"
                                        type="number"
                                        value={config.retryAttempts}
                                        onChange={handleInputChange('retryAttempts')}
                                        helperText="Số lần thử lại khi lỗi"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Cache Timeout (s)"
                                        type="number"
                                        value={config.cacheTimeout}
                                        onChange={handleInputChange('cacheTimeout')}
                                        helperText="Thời gian cache dữ liệu"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Rate Limit (requests/hour)"
                                        type="number"
                                        value={config.rateLimit}
                                        onChange={handleInputChange('rateLimit')}
                                        helperText="Giới hạn số requests mỗi giờ"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="CORS Origins"
                                        value={config.corsOrigins.join(', ')}
                                        onChange={(e) => setConfig({
                                            ...config,
                                            corsOrigins: e.target.value.split(',').map(s => s.trim())
                                        })}
                                        helperText="Các domain được phép truy cập (phân cách bằng dấu phẩy)"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* API Controls */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Điều khiển API
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={config.enableLogging}
                                            onChange={handleSwitchChange('enableLogging')}
                                        />
                                    }
                                    label="Ghi log API"
                                />
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={config.enableCache}
                                            onChange={handleSwitchChange('enableCache')}
                                        />
                                    }
                                    label="Bật cache"
                                />
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={config.enableCors}
                                            onChange={handleSwitchChange('enableCors')}
                                        />
                                    }
                                    label="Bật CORS"
                                />
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<TestIcon />}
                                onClick={handleTestConnection}
                                disabled={loading}
                                sx={{ mb: 2 }}
                            >
                                {loading ? 'Đang test...' : 'Test kết nối'}
                            </Button>

                            {testResult && (
                                <Alert
                                    severity={testResult.success ? 'success' : 'error'}
                                    icon={testResult.success ? <SuccessIcon /> : <ErrorIcon />}
                                >
                                    {testResult.message}
                                </Alert>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* API Keys Management */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Quản lý API Keys
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => setNewKeyDialog(true)}
                                    sx={{
                                        backgroundColor: '#E7C873',
                                        color: '#000',
                                        '&:hover': {
                                            backgroundColor: '#d4b86a',
                                        },
                                    }}
                                >
                                    Tạo API Key
                                </Button>
                            </Box>

                            <List>
                                {apiKeys.map((apiKey) => (
                                    <ListItem key={apiKey.id} divider>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                        {apiKey.name}
                                                    </Typography>
                                                    <Chip
                                                        label={apiKey.isActive ? 'Active' : 'Inactive'}
                                                        color={apiKey.isActive ? 'success' : 'default'}
                                                        size="small"
                                                    />
                                                </Box>
                                            }
                                            secondary={`Key: ${showKeys[apiKey.id] ? apiKey.key : apiKey.key.replace(/(.{8}).*(.{4})/, '$1****$2')} • Permissions: ${apiKey.permissions.join(', ')} • Tạo: ${new Date(apiKey.createdAt).toLocaleDateString('vi-VN')}${apiKey.lastUsed ? ` • Dùng cuối: ${new Date(apiKey.lastUsed).toLocaleDateString('vi-VN')}` : ''}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                onClick={() => toggleApiKeyStatus(apiKey.id)}
                                                color={apiKey.isActive ? 'warning' : 'success'}
                                            >
                                                {apiKey.isActive ? <HideIcon /> : <SuccessIcon />}
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDeleteApiKey(apiKey.id)}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
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

            {/* Create API Key Dialog */}
            <Dialog
                open={newKeyDialog}
                onClose={() => setNewKeyDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Tạo API Key mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên API Key"
                        fullWidth
                        variant="outlined"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Permissions:
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            multiple
                            value={newKeyPermissions}
                            onChange={(e) => setNewKeyPermissions(e.target.value as string[])}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} size="small" />
                                    ))}
                                </Box>
                            )}
                        >
                            {availablePermissions.map((permission) => (
                                <MenuItem key={permission} value={permission}>
                                    {permission}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewKeyDialog(false)}>Hủy</Button>
                    <Button
                        onClick={handleCreateApiKey}
                        variant="contained"
                        disabled={!newKeyName.trim()}
                    >
                        Tạo
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Snackbar */}
            <Snackbar
                open={saved}
                autoHideDuration={3000}
                onClose={() => setSaved(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSaved(false)} severity="success">
                    Cài đặt API đã được lưu thành công!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default APISettings;
