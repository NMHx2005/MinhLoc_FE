'use client'

import React, { useState } from 'react';
import {
    Box, Card, CardContent, Typography, Button, Grid,
    Alert, Snackbar, CircularProgress, Divider, List,
    ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction,
    IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, FormControl, InputLabel, Select, MenuItem,
    FormControlLabel, Switch, Checkbox
} from '@mui/material';
import {
    Backup as BackupIcon, Restore as RestoreIcon, Download as DownloadIcon,
    Upload as UploadIcon, Delete as DeleteIcon, Schedule as ScheduleIcon,
    Storage as StorageIcon, Warning as WarningIcon, CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const BackupRestore: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [showBackupDialog, setShowBackupDialog] = useState(false);
    const [showRestoreDialog, setShowRestoreDialog] = useState(false);
    const [backupData, setBackupData] = useState({
        name: '',
        description: '',
        includeFiles: true,
        includeDatabase: true,
        includeSettings: true
    });

    const [restoreFile, setRestoreFile] = useState<File | null>(null);

    // Mock data for backup history
    const [backupHistory] = useState([
        {
            id: '1',
            name: 'Full Backup - 2024-01-15',
            date: '2024-01-15T10:30:00Z',
            size: '2.5 GB',
            type: 'Full',
            status: 'Completed'
        },
        {
            id: '2',
            name: 'Database Only - 2024-01-14',
            date: '2024-01-14T18:00:00Z',
            size: '150 MB',
            type: 'Database',
            status: 'Completed'
        },
        {
            id: '3',
            name: 'Files Only - 2024-01-13',
            date: '2024-01-13T12:00:00Z',
            size: '1.8 GB',
            type: 'Files',
            status: 'Completed'
        }
    ]);

    const handleCreateBackup = async () => {
        try {
            setSaving(true);
            setError(null);

            // Simulate backup creation
            await new Promise(resolve => setTimeout(resolve, 3000));

            setSnackbarMessage('✅ Tạo backup thành công!');
            setSnackbarOpen(true);
            setShowBackupDialog(false);
            setBackupData({
                name: '',
                description: '',
                includeFiles: true,
                includeDatabase: true,
                includeSettings: true
            });
        } catch (err) {
            console.error('Error creating backup:', err);
            setError(err instanceof Error ? err.message : 'Không thể tạo backup');
        } finally {
            setSaving(false);
        }
    };

    const handleRestoreBackup = async () => {
        if (!restoreFile) return;

        try {
            setSaving(true);
            setError(null);

            // Simulate restore process
            await new Promise(resolve => setTimeout(resolve, 5000));

            setSnackbarMessage('✅ Khôi phục backup thành công!');
            setSnackbarOpen(true);
            setShowRestoreDialog(false);
            setRestoreFile(null);
        } catch (err) {
            console.error('Error restoring backup:', err);
            setError(err instanceof Error ? err.message : 'Không thể khôi phục backup');
        } finally {
            setSaving(false);
        }
    };

    const handleDownloadBackup = (backupId: string) => {
        // Simulate download
        setSnackbarMessage('✅ Bắt đầu tải xuống backup...');
        setSnackbarOpen(true);
    };

    const handleDeleteBackup = (backupId: string) => {
        // Simulate delete
        setSnackbarMessage('✅ Xóa backup thành công!');
        setSnackbarOpen(true);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setRestoreFile(file);
        }
    };

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Backup Actions */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <BackupIcon sx={{ mr: 1 }} />
                                Tạo Backup
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Tạo bản sao lưu toàn bộ dữ liệu hệ thống bao gồm database, files và cài đặt.
                            </Typography>

                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<BackupIcon />}
                                onClick={() => setShowBackupDialog(true)}
                                sx={{
                                    backgroundColor: '#E7C873',
                                    color: '#000',
                                    '&:hover': {
                                        backgroundColor: '#d4b86a',
                                    },
                                }}
                            >
                                Tạo Backup Mới
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Restore Actions */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <RestoreIcon sx={{ mr: 1 }} />
                                Khôi phục Backup
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Khôi phục dữ liệu từ file backup. Hãy cẩn thận vì thao tác này sẽ ghi đè dữ liệu hiện tại.
                            </Typography>

                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<RestoreIcon />}
                                onClick={() => setShowRestoreDialog(true)}
                                color="warning"
                            >
                                Khôi phục từ File
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Backup History */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <StorageIcon sx={{ mr: 1 }} />
                                Lịch sử Backup
                            </Typography>

                            <List>
                                {backupHistory.map((backup, index) => (
                                    <React.Fragment key={backup.id}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <BackupIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={backup.name}
                                                secondary={
                                                    <Box component="div">
                                                        <Box component="div" sx={{ mb: 0.5 }}>
                                                            {new Date(backup.date).toLocaleString('vi-VN')} • {backup.size} • {backup.type}
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                                                            <Box component="span" sx={{ fontSize: '0.75rem', color: 'success.main' }}>
                                                                {backup.status}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => handleDownloadBackup(backup.id)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <DownloadIcon />
                                                </IconButton>
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => handleDeleteBackup(backup.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        {index < backupHistory.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Auto Backup Settings */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <ScheduleIcon sx={{ mr: 1 }} />
                                Cài đặt Backup Tự động
                            </Typography>

                            <Alert severity="info" sx={{ mb: 3 }}>
                                Tính năng backup tự động sẽ được phát triển trong phiên bản tiếp theo.
                            </Alert>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Tần suất backup</InputLabel>
                                        <Select value="daily" disabled>
                                            <MenuItem value="daily">Hàng ngày</MenuItem>
                                            <MenuItem value="weekly">Hàng tuần</MenuItem>
                                            <MenuItem value="monthly">Hàng tháng</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Giờ backup"
                                        type="time"
                                        value="02:00"
                                        disabled
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Số lượng backup giữ lại"
                                        type="number"
                                        value="30"
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Create Backup Dialog */}
            <Dialog open={showBackupDialog} onClose={() => setShowBackupDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Tạo Backup Mới</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên backup"
                                value={backupData.name}
                                onChange={(e) => setBackupData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Backup - 2024-01-15"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả"
                                multiline
                                rows={3}
                                value={backupData.description}
                                onChange={(e) => setBackupData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Mô tả về backup này..."
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                Bao gồm:
                            </Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <input
                                                type="checkbox"
                                                checked={backupData.includeDatabase}
                                                onChange={(e) => setBackupData(prev => ({ ...prev, includeDatabase: e.target.checked }))}
                                            />
                                        }
                                        label="Database"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <input
                                                type="checkbox"
                                                checked={backupData.includeFiles}
                                                onChange={(e) => setBackupData(prev => ({ ...prev, includeFiles: e.target.checked }))}
                                            />
                                        }
                                        label="Files & Media"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <input
                                                type="checkbox"
                                                checked={backupData.includeSettings}
                                                onChange={(e) => setBackupData(prev => ({ ...prev, includeSettings: e.target.checked }))}
                                            />
                                        }
                                        label="Settings & Configuration"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowBackupDialog(false)}>Hủy</Button>
                    <Button
                        onClick={handleCreateBackup}
                        variant="contained"
                        disabled={saving || !backupData.name}
                        startIcon={saving ? <CircularProgress size={20} /> : <BackupIcon />}
                    >
                        {saving ? 'Đang tạo...' : 'Tạo Backup'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Restore Backup Dialog */}
            <Dialog open={showRestoreDialog} onClose={() => setShowRestoreDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Khôi phục từ Backup</DialogTitle>
                <DialogContent>
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        <Typography variant="body2">
                            <strong>Cảnh báo:</strong> Thao tác này sẽ ghi đè toàn bộ dữ liệu hiện tại.
                            Hãy đảm bảo bạn đã tạo backup trước khi thực hiện.
                        </Typography>
                    </Alert>

                    <Box sx={{ textAlign: 'center', py: 3 }}>
                        <input
                            accept=".zip,.tar,.gz"
                            style={{ display: 'none' }}
                            id="restore-file-upload"
                            type="file"
                            onChange={handleFileUpload}
                        />
                        <label htmlFor="restore-file-upload">
                            <Button
                                variant="outlined"
                                component="span"
                                startIcon={<UploadIcon />}
                                size="large"
                            >
                                Chọn file backup
                            </Button>
                        </label>
                        {restoreFile && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    File đã chọn: {restoreFile.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Kích thước: {(restoreFile.size / 1024 / 1024).toFixed(2)} MB
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowRestoreDialog(false)}>Hủy</Button>
                    <Button
                        onClick={handleRestoreBackup}
                        variant="contained"
                        color="warning"
                        disabled={saving || !restoreFile}
                        startIcon={saving ? <CircularProgress size={20} /> : <RestoreIcon />}
                    >
                        {saving ? 'Đang khôi phục...' : 'Khôi phục'}
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

export default BackupRestore;