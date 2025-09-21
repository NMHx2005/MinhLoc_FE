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
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar,
    Snackbar,
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
    Business as BusinessIcon,
    People as PeopleIcon,
    Person as PersonIcon,
} from '@mui/icons-material';

interface Department {
    id: string;
    name: string;
    description: string;
    head: string;
    headEmail: string;
    headPhone: string;
    employeeCount: number;
    maxEmployees: number;
    location: string;
    responsibilities: string[];
    budget: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const DepartmentsManagement: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([
        {
            id: '1',
            name: 'Phòng Kế hoạch & Phát triển',
            description: 'Lập kế hoạch chiến lược và phát triển dự án mới',
            head: 'Nguyễn Văn A',
            headEmail: 'nguyenvana@minhlocgroup.com',
            headPhone: '0123456789',
            employeeCount: 25,
            maxEmployees: 30,
            location: 'Tầng 10, Tòa nhà A',
            responsibilities: [
                'Lập kế hoạch chiến lược dài hạn',
                'Nghiên cứu thị trường',
                'Phát triển dự án mới',
                'Quản lý danh mục đầu tư',
            ],
            budget: 5000000000,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '2',
            name: 'Phòng Kỹ thuật',
            description: 'Thiết kế và giám sát kỹ thuật các dự án',
            head: 'Trần Thị B',
            headEmail: 'tranthib@minhlocgroup.com',
            headPhone: '0987654321',
            employeeCount: 40,
            maxEmployees: 45,
            location: 'Tầng 8, Tòa nhà A',
            responsibilities: [
                'Thiết kế dự án',
                'Giám sát kỹ thuật',
                'Quản lý chất lượng',
                'Nghiên cứu công nghệ mới',
            ],
            budget: 8000000000,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-20',
        },
        {
            id: '3',
            name: 'Phòng Kinh doanh',
            description: 'Marketing và bán hàng các sản phẩm, dịch vụ',
            head: 'Lê Văn C',
            headEmail: 'levanc@minhlocgroup.com',
            headPhone: '0369852147',
            employeeCount: 30,
            maxEmployees: 35,
            location: 'Tầng 6, Tòa nhà A',
            responsibilities: [
                'Marketing dự án',
                'Bán hàng và chăm sóc khách hàng',
                'Quản lý kênh phân phối',
                'Phát triển thị trường',
            ],
            budget: 6000000000,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-18',
        },
        {
            id: '4',
            name: 'Phòng Nhân sự',
            description: 'Quản lý nhân sự và phát triển nguồn nhân lực',
            head: 'Phạm Thị D',
            headEmail: 'phamthid@minhlocgroup.com',
            headPhone: '0741852963',
            employeeCount: 15,
            maxEmployees: 20,
            location: 'Tầng 5, Tòa nhà A',
            responsibilities: [
                'Tuyển dụng nhân sự',
                'Đào tạo và phát triển',
                'Quản lý lương thưởng',
                'Chính sách nhân sự',
            ],
            budget: 2000000000,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-12',
        },
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
    const [formData, setFormData] = useState<Omit<Department, 'id' | 'createdAt' | 'updatedAt'>>({
        name: '',
        description: '',
        head: '',
        headEmail: '',
        headPhone: '',
        employeeCount: 0,
        maxEmployees: 0,
        location: '',
        responsibilities: [],
        budget: 0,
        isActive: true,
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const handleAddDepartment = () => {
        setEditingDepartment(null);
        setFormData({
            name: '',
            description: '',
            head: '',
            headEmail: '',
            headPhone: '',
            employeeCount: 0,
            maxEmployees: 0,
            location: '',
            responsibilities: [],
            budget: 0,
            isActive: true,
        });
        setDialogOpen(true);
    };

    const handleEditDepartment = (department: Department) => {
        setEditingDepartment(department);
        setFormData({
            name: department.name,
            description: department.description,
            head: department.head,
            headEmail: department.headEmail,
            headPhone: department.headPhone,
            employeeCount: department.employeeCount,
            maxEmployees: department.maxEmployees,
            location: department.location,
            responsibilities: department.responsibilities,
            budget: department.budget,
            isActive: department.isActive,
        });
        setDialogOpen(true);
    };

    const handleSaveDepartment = () => {
        if (editingDepartment) {
            setDepartments(prev => prev.map(dept =>
                dept.id === editingDepartment.id
                    ? {
                        ...formData,
                        id: editingDepartment.id,
                        createdAt: dept.createdAt,
                        updatedAt: new Date().toISOString().split('T')[0]
                    }
                    : dept
            ));
            setSnackbarMessage('Cập nhật phòng ban thành công!');
        } else {
            const newDepartment: Department = {
                ...formData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            };
            setDepartments(prev => [...prev, newDepartment]);
            setSnackbarMessage('Thêm phòng ban thành công!');
        }
        setSnackbarOpen(true);
        setDialogOpen(false);
    };

    const handleDeleteDepartment = (departmentId: string) => {
        setDepartments(prev => prev.filter(dept => dept.id !== departmentId));
        setSnackbarMessage('Xóa phòng ban thành công!');
        setSnackbarOpen(true);
    };

    const handleToggleStatus = (departmentId: string) => {
        setDepartments(prev => prev.map(dept =>
            dept.id === departmentId
                ? {
                    ...dept,
                    isActive: !dept.isActive,
                    updatedAt: new Date().toISOString().split('T')[0]
                }
                : dept
        ));
        setSnackbarMessage('Cập nhật trạng thái phòng ban thành công!');
        setSnackbarOpen(true);
    };

    return (
        <Box>
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

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <BusinessIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {departments.length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng phòng ban
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'success.main' }}>
                                    <PeopleIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng nhân viên
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'info.main' }}>
                                    <PersonIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {departments.filter(dept => dept.isActive).length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Phòng ban hoạt động
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'warning.main' }}>
                                    <BusinessIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {formatCurrency(departments.reduce((sum, dept) => sum + dept.budget, 0))}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng ngân sách
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Departments Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Phòng ban</TableCell>
                            <TableCell>Trưởng phòng</TableCell>
                            <TableCell>Nhân viên</TableCell>
                            <TableCell>Vị trí</TableCell>
                            <TableCell>Ngân sách</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departments.map((department) => (
                            <TableRow key={department.id}>
                                <TableCell>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {department.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {department.description}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {department.head}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {department.headEmail}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Typography variant="body2">
                                            {department.employeeCount}/{department.maxEmployees}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            nhân viên
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="text.secondary">
                                        {department.location}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {formatCurrency(department.budget)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={department.isActive ? 'Hoạt động' : 'Tạm dừng'}
                                        color={department.isActive ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleEditDepartment(department)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleToggleStatus(department.id)}
                                        color={department.isActive ? 'warning' : 'success'}
                                    >
                                        {department.isActive ? 'Tạm dừng' : 'Kích hoạt'}
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDeleteDepartment(department.id)}
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
                                label="Mô tả"
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Trưởng phòng"
                                value={formData.head}
                                onChange={(e) => setFormData(prev => ({ ...prev, head: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email trưởng phòng"
                                type="email"
                                value={formData.headEmail}
                                onChange={(e) => setFormData(prev => ({ ...prev, headEmail: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Số điện thoại trưởng phòng"
                                value={formData.headPhone}
                                onChange={(e) => setFormData(prev => ({ ...prev, headPhone: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Vị trí"
                                value={formData.location}
                                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Số nhân viên hiện tại"
                                type="number"
                                value={formData.employeeCount}
                                onChange={(e) => setFormData(prev => ({ ...prev, employeeCount: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Số nhân viên tối đa"
                                type="number"
                                value={formData.maxEmployees}
                                onChange={(e) => setFormData(prev => ({ ...prev, maxEmployees: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Ngân sách (VND)"
                                type="number"
                                value={formData.budget}
                                onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveDepartment} variant="contained">
                        {editingDepartment ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default DepartmentsManagement;
