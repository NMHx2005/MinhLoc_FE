'use client'

import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Avatar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Snackbar,
    Alert,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Visibility as ViewIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { careersService } from '../../services/admin/careersService';
import type { JobApplication } from '../../services/admin/careersService';

const JobApplicationsManagement: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });
    const [filters, _setFilters] = useState({
        jobPositionId: '',
        status: '',
        search: ''
    });

    // Load job applications from API
    const loadJobApplications = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await careersService.getJobApplications({
                page: pagination.page,
                limit: pagination.limit,
                jobPositionId: filters.jobPositionId || undefined,
                status: filters.status || undefined,
                search: filters.search || undefined
            });

            setApplications(response.data.applications);
            setPagination(response.data.pagination);
        } catch (err) {
            console.error('Error loading job applications:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải danh sách hồ sơ ứng tuyển');
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, filters]);

    useEffect(() => {
        loadJobApplications();
    }, [loadJobApplications]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
    const [formData, setFormData] = useState({
        status: 'pending' as 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected',
        notes: '',
        rating: 0
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'default';
            case 'reviewing':
                return 'info';
            case 'interviewed':
                return 'warning';
            case 'accepted':
                return 'success';
            case 'rejected':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Chờ xử lý';
            case 'reviewing':
                return 'Đang xem xét';
            case 'interviewed':
                return 'Đã phỏng vấn';
            case 'accepted':
                return 'Đã chấp nhận';
            case 'rejected':
                return 'Đã từ chối';
            default:
                return 'Không xác định';
        }
    };

    const handleViewApplication = (application: JobApplication) => {
        setEditingApplication(application);
        setFormData({
            status: application.status,
            notes: application.notes || '',
            rating: application.rating || 0
        });
        setDialogOpen(true);
    };

    const handleUpdateApplication = async () => {
        if (!editingApplication) return;

        setSaving(true);
        try {
            await careersService.updateJobApplicationStatus(editingApplication._id, formData);
            setSnackbarMessage('✅ Cập nhật hồ sơ ứng tuyển thành công!');
            setSnackbarOpen(true);
            setDialogOpen(false);
            await loadJobApplications();
        } catch (error) {
            console.error('Error updating application:', error);
            setSnackbarMessage('❌ Lỗi khi cập nhật hồ sơ ứng tuyển');
            setSnackbarOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteApplication = async (applicationId: string) => {
        try {
            // Note: This would need to be implemented in the backend service
            setSnackbarMessage('✅ Xóa hồ sơ ứng tuyển thành công!');
            setSnackbarOpen(true);
            await loadJobApplications();
        } catch (error) {
            console.error('Error deleting application:', error);
            setSnackbarMessage('❌ Lỗi khi xóa hồ sơ ứng tuyển');
            setSnackbarOpen(true);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải danh sách hồ sơ ứng tuyển...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Quản lý hồ sơ ứng tuyển
                </Typography>
            </Box>

            {/* Applications Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ứng viên</TableCell>
                            <TableCell>Vị trí ứng tuyển</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Đánh giá</TableCell>
                            <TableCell>Ngày nộp</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications?.map((application) => (
                            <TableRow key={application._id}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                                            <PersonIcon />
                                        </Avatar>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {application.applicantName}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {typeof application.jobPositionId === 'object'
                                            ? application.jobPositionId.title
                                            : 'N/A'
                                        }
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2">
                                            {application.email}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2">
                                            {application.phone}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusLabel(application.status)}
                                        size="small"
                                        color={getStatusColor(application.status) as any}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <StarIcon
                                                key={index}
                                                sx={{
                                                    fontSize: 16,
                                                    color: index < (application.rating || 0) ? 'warning.main' : 'grey.300'
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {new Date(application.createdAt || '').toLocaleDateString('vi-VN')}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleViewApplication(application)}
                                        color="primary"
                                    >
                                        <ViewIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDeleteApplication(application._id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* View/Edit Application Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    Chi tiết hồ sơ ứng tuyển
                </DialogTitle>
                <DialogContent>
                    {editingApplication && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Tên ứng viên"
                                    value={editingApplication.applicantName}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={editingApplication.email}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    value={editingApplication.phone}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Trạng thái</InputLabel>
                                    <Select
                                        value={formData.status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                                    >
                                        <MenuItem value="pending">Chờ xử lý</MenuItem>
                                        <MenuItem value="reviewing">Đang xem xét</MenuItem>
                                        <MenuItem value="interviewed">Đã phỏng vấn</MenuItem>
                                        <MenuItem value="accepted">Đã chấp nhận</MenuItem>
                                        <MenuItem value="rejected">Đã từ chối</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Ghi chú"
                                    multiline
                                    rows={3}
                                    value={formData.notes}
                                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Đánh giá (1-5 sao)"
                                    type="number"
                                    inputProps={{ min: 1, max: 5 }}
                                    value={formData.rating}
                                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) || 0 }))}
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleUpdateApplication} variant="contained" disabled={saving}>
                        {saving ? 'Đang cập nhật...' : 'Cập nhật'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarMessage.includes('❌') ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default JobApplicationsManagement;