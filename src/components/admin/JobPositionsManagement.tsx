'use client'

import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
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
    Switch,
    FormControlLabel,
    Snackbar,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Work as WorkIcon,
    LocationOn as LocationIcon,
    Schedule as ScheduleIcon,
    AttachMoney as MoneyIcon,
    People as PeopleIcon,
    Star as StarIcon,
    PriorityHigh as UrgentIcon,
} from '@mui/icons-material';
import { careersService } from '../../services/admin/careersService';
import type { JobPosition, CreateJobPositionData } from '../../services/admin/careersService';

// Remove local interface, use the one from careersService

const JobPositionsManagement: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [_saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [positions, setPositions] = useState<JobPosition[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });
    const [filters, _setFilters] = useState({
        department: '',
        status: '',
        search: ''
    });

    // Load job positions from API
    const loadJobPositions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await careersService.getJobPositions({
                page: pagination.page,
                limit: pagination.limit,
                department: filters.department || undefined,
                status: filters.status || undefined,
                search: filters.search || undefined
            });

            setPositions(response.data.positions);
            setPagination(response.data.pagination);
        } catch (err) {
            console.error('Error loading job positions:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải danh sách vị trí tuyển dụng');
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, filters]);

    useEffect(() => {
        loadJobPositions();
    }, [loadJobPositions]);

    // Remove mock data, use API data

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null);
    const [formData, setFormData] = useState<CreateJobPositionData>({
        title: '',
        department: 'sales',
        location: '',
        type: 'full-time',
        salary: '',
        experience: '',
        deadline: '',
        description: '',
        requirements: [],
        responsibilities: [],
        benefits: [],
        skills: [],
        isHot: false,
        isUrgent: false,
        isActive: true,
        status: 'draft',
        priority: 1,
        tags: [],
    });

    // Remove duplicate snackbar states

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'full-time':
                return <WorkIcon />;
            case 'part-time':
                return <ScheduleIcon />;
            case 'contract':
                return <WorkIcon />;
            case 'internship':
                return <PeopleIcon />;
            default:
                return <WorkIcon />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'full-time':
                return 'primary';
            case 'part-time':
                return 'info';
            case 'contract':
                return 'warning';
            case 'internship':
                return 'success';
            default:
                return 'primary';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'full-time':
                return 'Toàn thời gian';
            case 'part-time':
                return 'Bán thời gian';
            case 'contract':
                return 'Hợp đồng';
            case 'internship':
                return 'Thực tập';
            default:
                return 'Khác';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'draft':
                return 'default';
            case 'published':
                return 'success';
            case 'closed':
                return 'error';
            case 'cancelled':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'draft':
                return 'Bản nháp';
            case 'published':
                return 'Đã xuất bản';
            case 'closed':
                return 'Đã đóng';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };


    const handleAddPosition = () => {
        setEditingPosition(null);
        setFormData({
            title: '',
            department: 'sales',
            location: '',
            type: 'full-time',
            salary: '',
            experience: '',
            deadline: '',
            description: '',
            requirements: [],
            responsibilities: [],
            benefits: [],
            skills: [],
            isHot: false,
            isUrgent: false,
            isActive: true,
            status: 'draft',
            priority: 1,
            tags: [],
        });
        setFormErrors({});
        setDialogOpen(true);
    };

    const handleEditPosition = (position: JobPosition) => {
        setEditingPosition(position);
        setFormData({
            title: position.title,
            department: position.department,
            location: position.location,
            type: position.type,
            salary: position.salary,
            experience: position.experience,
            deadline: position.deadline,
            description: position.description,
            requirements: position.requirements,
            responsibilities: position.responsibilities,
            benefits: position.benefits,
            skills: position.skills,
            isHot: position.isHot,
            isUrgent: position.isUrgent,
            isActive: position.isActive,
            status: position.status,
            priority: position.priority,
            tags: position.tags,
        });
        setFormErrors({});
        setDialogOpen(true);
    };

    const validateForm = (): boolean => {
        const errors: { [key: string]: string } = {};

        if (!formData.title || formData.title.length < 10) {
            errors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
        }

        if (!formData.description || formData.description.length < 100) {
            errors.description = 'Mô tả phải có ít nhất 100 ký tự';
        }

        if (!formData.location) {
            errors.location = 'Địa điểm là bắt buộc';
        }

        if (!formData.salary) {
            errors.salary = 'Mức lương là bắt buộc';
        }

        if (!formData.experience) {
            errors.experience = 'Kinh nghiệm là bắt buộc';
        }

        if (!formData.deadline) {
            errors.deadline = 'Hạn nộp hồ sơ là bắt buộc';
        } else {
            const deadlineDate = new Date(formData.deadline);
            const today = new Date();
            if (deadlineDate <= today) {
                errors.deadline = 'Hạn nộp hồ sơ phải sau ngày hiện tại';
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSavePosition = async () => {
        if (!validateForm()) {
            setSnackbarMessage('❌ Vui lòng kiểm tra lại thông tin đã nhập');
            setSnackbarOpen(true);
            return;
        }

        setSaving(true);
        try {
            if (editingPosition) {
                await careersService.updateJobPosition(editingPosition._id, formData);
                setSnackbarMessage('✅ Cập nhật vị trí tuyển dụng thành công!');
            } else {
                await careersService.createJobPosition(formData);
                setSnackbarMessage('✅ Thêm vị trí tuyển dụng thành công!');
            }
            setSnackbarOpen(true);
            setDialogOpen(false);
            await loadJobPositions();
        } catch (error) {
            console.error('Error saving job position:', error);
            setSnackbarMessage('❌ Lỗi khi lưu vị trí tuyển dụng. Vui lòng kiểm tra lại thông tin.');
            setSnackbarOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const handleDeletePosition = async (positionId: string) => {
        try {
            await careersService.deleteJobPosition(positionId);
            setSnackbarMessage('✅ Xóa vị trí tuyển dụng thành công!');
            setSnackbarOpen(true);
            await loadJobPositions();
        } catch (error) {
            console.error('Error deleting job position:', error);
            setSnackbarMessage('❌ Lỗi khi xóa vị trí tuyển dụng');
            setSnackbarOpen(true);
        }
    };

    const handleToggleStatus = async (positionId: string) => {
        try {
            const position = positions.find(p => p._id === positionId);
            if (position) {
                const newStatus = position.status === 'published' ? 'closed' : 'published';
                await careersService.updateJobPosition(positionId, {
                    status: newStatus
                });
                setSnackbarMessage('✅ Cập nhật trạng thái thành công!');
                setSnackbarOpen(true);
                await loadJobPositions();
            }
        } catch (error) {
            console.error('Error toggling status:', error);
            setSnackbarMessage('❌ Lỗi khi cập nhật trạng thái');
            setSnackbarOpen(true);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải danh sách vị trí tuyển dụng...</Typography>
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
                    Quản lý vị trí tuyển dụng
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddPosition}
                >
                    Thêm vị trí
                </Button>
            </Box>

            <Grid container spacing={3}>
                {positions?.map((position) => (
                    <Grid item xs={12} md={6} lg={4} key={position._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: `${getTypeColor(position.type)}.main`,
                                                width: 50,
                                                height: 50
                                            }}
                                        >
                                            {getTypeIcon(position.type)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {position.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                <Chip
                                                    label={getTypeLabel(position.type)}
                                                    size="small"
                                                    color={getTypeColor(position.type) as "primary" | "info" | "warning" | "success"}
                                                />
                                                <Chip
                                                    label={getStatusLabel(position.status)}
                                                    size="small"
                                                    color={getStatusColor(position.status) as "success" | "default" | "error" | "warning"}
                                                />
                                                {position.isHot && (
                                                    <Chip
                                                        label="Hot"
                                                        size="small"
                                                        color="error"
                                                        icon={<StarIcon />}
                                                    />
                                                )}
                                                {position.isUrgent && (
                                                    <Chip
                                                        label="Urgent"
                                                        size="small"
                                                        color="warning"
                                                        icon={<UrgentIcon />}
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditPosition(position)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeletePosition(position._id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        height: '3.2em',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block',
                                        lineHeight: 1.6
                                    }}
                                >
                                    {position.description.length > 120
                                        ? `${position.description.substring(0, 120)}...`
                                        : position.description
                                    }
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocationIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {position.location}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <MoneyIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {position.salary}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                                            Kinh nghiệm:
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {position.experience}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                                            Hạn nộp:
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {new Date(position.deadline).toLocaleDateString('vi-VN')}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                                            Phòng ban:
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {position.department}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Tạo bởi: {position.createdBy?.name || 'Admin'}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                            {new Date(position.createdAt || '').toLocaleDateString('vi-VN')}
                                        </Typography>
                                    </Box>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleToggleStatus(position._id)}
                                        color={position.status === 'published' ? 'warning' : 'success'}
                                    >
                                        {position.status === 'published' ? 'Tạm dừng' : 'Kích hoạt'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add/Edit Position Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingPosition ? 'Chỉnh sửa vị trí tuyển dụng' : 'Thêm vị trí tuyển dụng mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên vị trí"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                error={!!formErrors.title}
                                helperText={formErrors.title || `${formData.title.length}/10 ký tự tối thiểu`}
                                inputProps={{ maxLength: 200 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Phòng ban</InputLabel>
                                <Select
                                    value={formData.department}
                                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value as 'sales' | 'marketing' | 'construction' | 'finance' | 'hr' | 'it' | 'admin' | 'operations' }))}
                                >
                                    <MenuItem value="sales">Kinh doanh</MenuItem>
                                    <MenuItem value="marketing">Marketing</MenuItem>
                                    <MenuItem value="construction">Xây dựng</MenuItem>
                                    <MenuItem value="finance">Tài chính</MenuItem>
                                    <MenuItem value="hr">Nhân sự</MenuItem>
                                    <MenuItem value="it">Công nghệ thông tin</MenuItem>
                                    <MenuItem value="admin">Hành chính</MenuItem>
                                    <MenuItem value="operations">Vận hành</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Địa điểm"
                                value={formData.location}
                                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                error={!!formErrors.location}
                                helperText={formErrors.location}
                                inputProps={{ maxLength: 100 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Loại công việc</InputLabel>
                                <Select
                                    value={formData.type}
                                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'full-time' | 'part-time' | 'contract' | 'internship' }))}
                                >
                                    <MenuItem value="full-time">Toàn thời gian</MenuItem>
                                    <MenuItem value="part-time">Bán thời gian</MenuItem>
                                    <MenuItem value="contract">Hợp đồng</MenuItem>
                                    <MenuItem value="internship">Thực tập</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Kinh nghiệm"
                                value={formData.experience}
                                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                                error={!!formErrors.experience}
                                helperText={formErrors.experience || "Ví dụ: 2-3 năm"}
                                inputProps={{ maxLength: 50 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Mức lương"
                                value={formData.salary}
                                onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                                error={!!formErrors.salary}
                                helperText={formErrors.salary || "Ví dụ: 15-25 triệu VND"}
                                inputProps={{ maxLength: 100 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Hạn nộp hồ sơ"
                                type="date"
                                value={formData.deadline}
                                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                                InputLabelProps={{ shrink: true }}
                                error={!!formErrors.deadline}
                                helperText={formErrors.deadline}
                                inputProps={{ min: new Date().toISOString().split('T')[0] }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Trạng thái</InputLabel>
                                <Select
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' | 'closed' | 'cancelled' }))}
                                >
                                    <MenuItem value="draft">Bản nháp</MenuItem>
                                    <MenuItem value="published">Đã xuất bản</MenuItem>
                                    <MenuItem value="closed">Đã đóng</MenuItem>
                                    <MenuItem value="cancelled">Đã hủy</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả công việc"
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                error={!!formErrors.description}
                                helperText={formErrors.description || `${formData.description.length}/100 ký tự tối thiểu`}
                                inputProps={{ maxLength: 2000 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isHot}
                                        onChange={(e) => setFormData(prev => ({ ...prev, isHot: e.target.checked }))}
                                    />
                                }
                                label="Vị trí Hot"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isUrgent}
                                        onChange={(e) => setFormData(prev => ({ ...prev, isUrgent: e.target.checked }))}
                                    />
                                }
                                label="Tuyển gấp"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSavePosition} variant="contained">
                        {editingPosition ? 'Cập nhật' : 'Thêm'}
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

export default JobPositionsManagement;
