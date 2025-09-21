'use client'

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Snackbar,
    LinearProgress,
    Chip,
    FormControlLabel,
    Switch,
    TextField,
    Divider,
} from '@mui/material';
import {
    Backup as BackupIcon,
    Restore as RestoreIcon,
    Download as DownloadIcon,
    Upload as UploadIcon,
    Delete as DeleteIcon,
    Storage as StorageIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';

interface BackupFile {
    id: string;
    name: string;
    size: string;
    date: string;
    type: 'manual' | 'auto';
    status: 'completed' | 'failed' | 'in_progress';
    tables: string[];
    description: string;
}

interface BackupConfig {
    autoBackup: boolean;
    backupSchedule: string;
    retentionDays: number;
    includeFiles: boolean;
    includeDatabase: boolean;
    backupLocation: 'local' | 'cloud';
    cloudProvider: string;
    maxBackupSize: number;
}

const BackupRestore: React.FC = () => {
    const [backups, setBackups] = useState<BackupFile[]>([
        {
            id: '1',
            name: 'full_backup_20240122_150000',
            size: '156.7 MB',
            date: '2024-01-22T15:00:00',
            type: 'auto',
            status: 'completed',
            tables: ['users', 'projects', 'products', 'contacts', 'orders'],
            description: 'Sao lưu tự động hàng ngày'
        },
        {
            id: '2',
            name: 'manual_backup_20240121_093000',
            size: '142.3 MB',
            date: '2024-01-21T09:30:00',
            type: 'manual',
            status: 'completed',
            tables: ['users', 'projects', 'products'],
            description: 'Sao lưu thủ công trước khi cập nhật'
        },
        {
            id: '3',
            name: 'full_backup_20240120_150000',
            size: '139.8 MB',
            date: '2024-01-20T15:00:00',
            type: 'auto',
            status: 'completed',
            tables: ['users', 'projects', 'products', 'contacts', 'orders'],
            description: 'Sao lưu tự động hàng ngày'
        },
        {
            id: '4',
            name: 'full_backup_20240119_150000',
            size: '0 MB',
            date: '2024-01-19T15:00:00',
            type: 'auto',
            status: 'failed',
            tables: [],
            description: 'Sao lưu thất bại - lỗi kết nối database'
        }
    ]);

    const [config, setConfig] = useState<BackupConfig>({
        autoBackup: true,
        backupSchedule: 'daily',
        retentionDays: 30,
        includeFiles: true,
        includeDatabase: true,
        backupLocation: 'local',
        cloudProvider: 'aws-s3',
        maxBackupSize: 1024
    });

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [saved, setSaved] = useState(false);
    const [backupDialog, setBackupDialog] = useState(false);
    const [restoreDialog, setRestoreDialog] = useState(false);
    const [selectedBackup, setSelectedBackup] = useState<BackupFile | null>(null);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const handleConfigChange = (field: keyof BackupConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = ['retentionDays', 'maxBackupSize'].includes(field)
            ? parseInt(event.target.value)
            : event.target.value;

        setConfig({
            ...config,
            [field]: value,
        });
    };

    const handleSwitchChange = (field: keyof BackupConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({
            ...config,
            [field]: event.target.checked,
        });
    };

    const handleSaveConfig = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        setSaved(true);
    };

    const handleCreateBackup = async () => {
        setBackupDialog(false);
        setLoading(true);
        setProgress(0);

        // Simulate backup progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setLoading(false);

                    // Add new backup to list
                    const newBackup: BackupFile = {
                        id: (backups.length + 1).toString(),
                        name: `manual_backup_${new Date().toISOString().replace(/[:.]/g, '').slice(0, 15)}`,
                        size: `${(Math.random() * 200 + 50).toFixed(1)} MB`,
                        date: new Date().toISOString(),
                        type: 'manual',
                        status: 'completed',
                        tables: ['users', 'projects', 'products', 'contacts', 'orders'],
                        description: 'Sao lưu thủ công'
                    };
                    setBackups([newBackup, ...backups]);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const handleRestore = async () => {
        if (!selectedBackup) return;

        setRestoreDialog(false);
        setLoading(true);
        setProgress(0);

        // Simulate restore progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setLoading(false);
                    return 100;
                }
                return prev + 15;
            });
        }, 400);
    };

    const handleDownload = (backup: BackupFile) => {
        // Simulate download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${backup.name}.sql`;
        link.click();
    };

    const handleDelete = async () => {
        if (!selectedBackup) return;

        setBackups(backups.filter(b => b.id !== selectedBackup.id));
        setDeleteDialog(false);
        setSelectedBackup(null);
    };

    const getStatusColor = (status: BackupFile['status']) => {
        switch (status) {
            case 'completed': return 'success';
            case 'failed': return 'error';
            case 'in_progress': return 'warning';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: BackupFile['status']) => {
        switch (status) {
            case 'completed': return 'Hoàn thành';
            case 'failed': return 'Thất bại';
            case 'in_progress': return 'Đang xử lý';
            default: return status;
        }
    };

    const getTypeLabel = (type: BackupFile['type']) => {
        return type === 'auto' ? 'Tự động' : 'Thủ công';
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Backup Configuration */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                <SettingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Cấu hình Sao lưu
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={config.autoBackup}
                                                onChange={handleSwitchChange('autoBackup')}
                                            />
                                        }
                                        label="Sao lưu tự động"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Lịch sao lưu"
                                        value={config.backupSchedule}
                                        onChange={handleConfigChange('backupSchedule')}
                                        disabled={!config.autoBackup}
                                        SelectProps={{ native: true }}
                                    >
                                        <option value="hourly">Mỗi giờ</option>
                                        <option value="daily">Hàng ngày</option>
                                        <option value="weekly">Hàng tuần</option>
                                        <option value="monthly">Hàng tháng</option>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Lưu trữ (ngày)"
                                        type="number"
                                        value={config.retentionDays}
                                        onChange={handleConfigChange('retentionDays')}
                                        helperText="Tự động xóa backup cũ"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={config.includeDatabase}
                                                onChange={handleSwitchChange('includeDatabase')}
                                            />
                                        }
                                        label="Bao gồm Database"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={config.includeFiles}
                                                onChange={handleSwitchChange('includeFiles')}
                                            />
                                        }
                                        label="Bao gồm Files"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Vị trí lưu trữ"
                                        value={config.backupLocation}
                                        onChange={handleConfigChange('backupLocation')}
                                        SelectProps={{ native: true }}
                                    >
                                        <option value="local">Local Server</option>
                                        <option value="cloud">Cloud Storage</option>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Kích thước tối đa (MB)"
                                        type="number"
                                        value={config.maxBackupSize}
                                        onChange={handleConfigChange('maxBackupSize')}
                                    />
                                </Grid>

                                {config.backupLocation === 'cloud' && (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Cloud Provider"
                                            value={config.cloudProvider}
                                            onChange={handleConfigChange('cloudProvider')}
                                            SelectProps={{ native: true }}
                                        >
                                            <option value="aws-s3">AWS S3</option>
                                            <option value="google-cloud">Google Cloud</option>
                                            <option value="azure">Azure Blob</option>
                                            <option value="dropbox">Dropbox</option>
                                        </TextField>
                                    </Grid>
                                )}
                            </Grid>

                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSaveConfig}
                                    disabled={loading}
                                    sx={{
                                        backgroundColor: '#E7C873',
                                        color: '#000',
                                        '&:hover': {
                                            backgroundColor: '#d4b86a',
                                        },
                                    }}
                                >
                                    Lưu cấu hình
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Quick Actions */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                <StorageIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Thao tác nhanh
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        startIcon={<BackupIcon />}
                                        onClick={() => setBackupDialog(true)}
                                        disabled={loading}
                                        sx={{
                                            backgroundColor: '#4caf50',
                                            '&:hover': {
                                                backgroundColor: '#388e3c',
                                            },
                                            mb: 2
                                        }}
                                    >
                                        Tạo Backup ngay
                                    </Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        size="large"
                                        startIcon={<UploadIcon />}
                                        component="label"
                                        disabled={loading}
                                    >
                                        Tải lên Backup file
                                        <input
                                            type="file"
                                            accept=".sql,.zip"
                                            hidden
                                            onChange={(e) => {
                                                // Handle file upload
                                                if (e.target.files?.[0]) {
                                                    // Process file upload
                                                }
                                            }}
                                        />
                                    </Button>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                Thống kê Storage:
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Tổng dung lượng</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        438.8 MB / 2 GB
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={22}
                                    sx={{ height: 8, borderRadius: 4 }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Tổng số backup: {backups.length}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Backup cuối: {new Date(backups[0]?.date).toLocaleDateString('vi-VN')}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Backup Files List */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Danh sách Backup Files
                            </Typography>

                            {loading && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        {progress < 100 ? 'Đang xử lý...' : 'Hoàn thành!'}
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={progress}
                                        sx={{ height: 8, borderRadius: 4 }}
                                    />
                                </Box>
                            )}

                            <List>
                                {backups.map((backup) => (
                                    <ListItem key={backup.id} divider>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                        {backup.name}
                                                    </Typography>
                                                    <Chip
                                                        label={getStatusLabel(backup.status)}
                                                        color={getStatusColor(backup.status)}
                                                        size="small"
                                                    />
                                                    <Chip
                                                        label={getTypeLabel(backup.type)}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Box>
                                            }
                                            secondary={
                                                `${backup.description} • Kích thước: ${backup.size} • Ngày: ${new Date(backup.date).toLocaleString('vi-VN')} • Tables: ${backup.tables.join(', ')}`
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                onClick={() => handleDownload(backup)}
                                                color="primary"
                                                disabled={backup.status !== 'completed'}
                                            >
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedBackup(backup);
                                                    setRestoreDialog(true);
                                                }}
                                                color="warning"
                                                disabled={backup.status !== 'completed'}
                                            >
                                                <RestoreIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedBackup(backup);
                                                    setDeleteDialog(true);
                                                }}
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
            </Grid>

            {/* Create Backup Dialog */}
            <Dialog
                open={backupDialog}
                onClose={() => setBackupDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Tạo Backup mới</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Bạn có muốn tạo một backup file mới không?
                    </Typography>
                    <Alert severity="info">
                        Quá trình backup có thể mất vài phút tùy thuộc vào kích thước dữ liệu.
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBackupDialog(false)}>Hủy</Button>
                    <Button
                        onClick={handleCreateBackup}
                        variant="contained"
                        startIcon={<BackupIcon />}
                    >
                        Tạo Backup
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Restore Dialog */}
            <Dialog
                open={restoreDialog}
                onClose={() => setRestoreDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Khôi phục dữ liệu</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Bạn có chắc muốn khôi phục dữ liệu từ backup "{selectedBackup?.name}"?
                    </Typography>
                    <Alert severity="warning">
                        <strong>Cảnh báo:</strong> Tất cả dữ liệu hiện tại sẽ bị ghi đè.
                        Hành động này không thể hoàn tác.
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRestoreDialog(false)}>Hủy</Button>
                    <Button
                        onClick={handleRestore}
                        variant="contained"
                        color="warning"
                        startIcon={<RestoreIcon />}
                    >
                        Khôi phục
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Xóa Backup</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Bạn có chắc muốn xóa backup "{selectedBackup?.name}"?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>Hủy</Button>
                    <Button
                        onClick={handleDelete}
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                    >
                        Xóa
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
                    Cấu hình backup đã được lưu thành công!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BackupRestore;
