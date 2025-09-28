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
    TextField,
    Snackbar,
    Alert,
    CircularProgress,
    Avatar,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Business as BusinessIcon,
    People as PeopleIcon,
} from '@mui/icons-material';

interface Department {
    _id: string;
    name: string;
    description: string;
    manager: string;
    employeeCount: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const DepartmentsManagement: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [departments, setDepartments] = useState<Department[]>([]);

    // Mock data for departments
    const mockDepartments: Department[] = [
        {
            _id: '1',
            name: 'Kinh doanh',
            description: 'Phòng kinh doanh chịu trách nhiệm phát triển thị trường và tìm kiếm khách hàng mới.',
            manager: 'Nguyễn Văn A',
            employeeCount: 15,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        },
        {
            _id: '2',
            name: 'Marketing',
            description: 'Phòng marketing phụ trách quảng bá thương hiệu và sản phẩm của công ty.',
            manager: 'Trần Thị B',
            employeeCount: 8,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        },
        {
            _id: '3',
            name: 'Công nghệ thông tin',
            description: 'Phòng IT phát triển và duy trì hệ thống công nghệ thông tin.',
            manager: 'Lê Văn C',
            employeeCount: 12,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        },
        {
            _id: '4',
            name: 'Nhân sự',
            description: 'Phòng nhân sự quản lý tuyển dụng, đào tạo và phát triển nhân viên.',
            manager: 'Phạm Thị D',
            employeeCount: 6,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        }
    ];

    const loadDepartments = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            // Simulate API call
            setTimeout(() => {
                setDepartments(mockDepartments);
                setLoading(false);
            }, 1000);
        } catch (err) {
            console.error('Error loading departments:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải danh sách phòng ban');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDepartments();
    }, [loadDepartments]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        manager: '',
        isActive: true
    });

    const handleAddDepartment = () => {
        setEditingDepartment(null);
        setFormData({
            name: '',
            description: '',
            manager: '',
            isActive: true
        });
        setDialogOpen(true);
    };

    const handleEditDepartment = (department: Department) => {
        setEditingDepartment(department);
        setFormData({
            name: department.name,
            description: department.description,
            manager: department.manager,
            isActive: department.isActive
        });
        setDialogOpen(true);
    };

    const handleSaveDepartment = async () => {
        setSaving(true);
        try {
            // Simulate API call
            setTimeout(() => {
                setSnackbarMessage('✅ Lưu phòng ban thành công!');
                setSnackbarOpen(true);
                setDialogOpen(false);
                loadDepartments();
                setSaving(false);
            }, 1000);
        } catch (error) {
            console.error('Error saving department:', error);
            setSnackbarMessage('❌ Lỗi khi lưu phòng ban');
            setSnackbarOpen(true);
            setSaving(false);
        }
    };

    const handleDeleteDepartment = async (departmentId: string) => {
        try {
            // Simulate API call
            setTimeout(() => {
                setSnackbarMessage('✅ Xóa phòng ban thành công!');
                setSnackbarOpen(true);
                loadDepartments();
            }, 1000);
        } catch (error) {
            console.error('Error deleting department:', error);
            setSnackbarMessage('❌ Lỗi khi xóa phòng ban');
            setSnackbarOpen(true);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải danh sách phòng ban...</Typography>
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
                    Quản lý phòng ban
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddDepartment}
                >
                    Thêm phòng ban
                </Button>
            </Box>

            <Grid container spacing={3}>
                {departments.map((department) => (
                    <Grid item xs={12} md={6} lg={4} key={department._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: 'primary.main',
                                                width: 50,
                                                height: 50
                                            }}
                                        >
                                            <BusinessIcon />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {department.name}
                                            </Typography>
                                            <Chip
                                                label={department.isActive ? 'Hoạt động' : 'Tạm dừng'}
                                                size="small"
                                                color={department.isActive ? 'success' : 'default'}
                                            />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditDepartment(department)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteDepartment(department._id)}
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
                                    {department.description.length > 120
                                        ? `${department.description.substring(0, 120)}...`
                                        : department.description
                                    }
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <PeopleIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                                            Trưởng phòng:
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {department.manager}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                                            Số nhân viên:
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {department.employeeCount} người
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add/Edit Department Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingDepartment ? 'Chỉnh sửa phòng ban' : 'Thêm phòng ban mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên phòng ban"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Trưởng phòng"
                                value={formData.manager}
                                onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả"
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveDepartment} variant="contained" disabled={saving}>
                        {saving ? 'Đang lưu...' : (editingDepartment ? 'Cập nhật' : 'Thêm')}
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

export default DepartmentsManagement;