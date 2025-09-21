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
    AccountBalance as FinanceIcon,
    TrendingUp as TrendingUpIcon,
    Savings as SavingsIcon,
    Assessment as AssessmentIcon,
} from '@mui/icons-material';

interface FinanceProject {
    id: string;
    name: string;
    description: string;
    type: 'investment' | 'fund' | 'loan' | 'savings';
    amount: number;
    status: 'active' | 'completed' | 'paused' | 'cancelled';
    startDate: string;
    endDate: string;
    expectedReturn: number;
    actualReturn: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const FinanceField: React.FC = () => {
    const [projects, setProjects] = useState<FinanceProject[]>([
        {
            id: '1',
            name: 'Quỹ Đầu tư Minh Lộc Growth',
            description: 'Quỹ đầu tư tăng trưởng tập trung vào bất động sản',
            type: 'fund',
            amount: 100000000000,
            status: 'active',
            startDate: '2024-01-01',
            endDate: '2026-12-31',
            expectedReturn: 15,
            actualReturn: 12,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '2',
            name: 'Đầu tư Cổ phiếu Ngân hàng',
            description: 'Danh mục đầu tư cổ phiếu ngân hàng hàng đầu',
            type: 'investment',
            amount: 50000000000,
            status: 'active',
            startDate: '2023-06-01',
            endDate: '2025-06-01',
            expectedReturn: 12,
            actualReturn: 14,
            isActive: true,
            createdAt: '2023-06-01',
            updatedAt: '2024-01-15',
        },
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<FinanceProject | null>(null);
    const [formData, setFormData] = useState<Omit<FinanceProject, 'id' | 'createdAt' | 'updatedAt'>>({
        name: '',
        description: '',
        type: 'investment',
        amount: 0,
        status: 'active',
        startDate: '',
        endDate: '',
        expectedReturn: 0,
        actualReturn: 0,
        isActive: true,
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'investment':
                return 'primary';
            case 'fund':
                return 'success';
            case 'loan':
                return 'warning';
            case 'savings':
                return 'info';
            default:
                return 'default';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'investment':
                return 'Đầu tư';
            case 'fund':
                return 'Quỹ';
            case 'loan':
                return 'Vay';
            case 'savings':
                return 'Tiết kiệm';
            default:
                return 'Không xác định';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'completed':
                return 'info';
            case 'paused':
                return 'warning';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active':
                return 'Hoạt động';
            case 'completed':
                return 'Hoàn thành';
            case 'paused':
                return 'Tạm dừng';
            case 'cancelled':
                return 'Hủy bỏ';
            default:
                return 'Không xác định';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const handleAddProject = () => {
        setEditingProject(null);
        setFormData({
            name: '',
            description: '',
            type: 'investment',
            amount: 0,
            status: 'active',
            startDate: '',
            endDate: '',
            expectedReturn: 0,
            actualReturn: 0,
            isActive: true,
        });
        setDialogOpen(true);
    };

    const handleEditProject = (project: FinanceProject) => {
        setEditingProject(project);
        setFormData({
            name: project.name,
            description: project.description,
            type: project.type,
            amount: project.amount,
            status: project.status,
            startDate: project.startDate,
            endDate: project.endDate,
            expectedReturn: project.expectedReturn,
            actualReturn: project.actualReturn,
            isActive: project.isActive,
        });
        setDialogOpen(true);
    };

    const handleSaveProject = () => {
        if (editingProject) {
            setProjects(prev => prev.map(project =>
                project.id === editingProject.id
                    ? {
                        ...formData,
                        id: editingProject.id,
                        createdAt: project.createdAt,
                        updatedAt: new Date().toISOString().split('T')[0]
                    }
                    : project
            ));
            setSnackbarMessage('Cập nhật dự án tài chính thành công!');
        } else {
            const newProject: FinanceProject = {
                ...formData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            };
            setProjects(prev => [...prev, newProject]);
            setSnackbarMessage('Thêm dự án tài chính thành công!');
        }
        setSnackbarOpen(true);
        setDialogOpen(false);
    };

    const handleDeleteProject = (projectId: string) => {
        setProjects(prev => prev.filter(project => project.id !== projectId));
        setSnackbarMessage('Xóa dự án tài chính thành công!');
        setSnackbarOpen(true);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Dự án Đầu tư Tài chính
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddProject}
                >
                    Thêm dự án
                </Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <FinanceIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {projects.length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng dự án
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
                                    <TrendingUpIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {projects.filter(p => p.status === 'active').length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Đang hoạt động
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
                                    <SavingsIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {formatCurrency(projects.reduce((sum, p) => sum + p.amount, 0))}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng vốn
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
                                    <AssessmentIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {Math.round(projects.reduce((sum, p) => sum + p.actualReturn, 0) / projects.length)}%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lợi nhuận TB
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Projects Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dự án</TableCell>
                            <TableCell>Loại</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Số tiền</TableCell>
                            <TableCell>Lợi nhuận</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {project.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {project.description}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={getTypeLabel(project.type)}
                                        color={getTypeColor(project.type) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusLabel(project.status)}
                                        color={getStatusColor(project.status) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {formatCurrency(project.amount)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Dự kiến: {project.expectedReturn}%
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            Thực tế: {project.actualReturn}%
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleEditProject(project)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDeleteProject(project.id)}
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

            {/* Add/Edit Project Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingProject ? 'Chỉnh sửa dự án tài chính' : 'Thêm dự án tài chính mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên dự án"
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
                                label="Loại dự án"
                                select
                                value={formData.type}
                                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                            >
                                <option value="investment">Đầu tư</option>
                                <option value="fund">Quỹ</option>
                                <option value="loan">Vay</option>
                                <option value="savings">Tiết kiệm</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Trạng thái"
                                select
                                value={formData.status}
                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                            >
                                <option value="active">Hoạt động</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="paused">Tạm dừng</option>
                                <option value="cancelled">Hủy bỏ</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Số tiền (VND)"
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData(prev => ({ ...prev, amount: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Lợi nhuận dự kiến (%)"
                                type="number"
                                value={formData.expectedReturn}
                                onChange={(e) => setFormData(prev => ({ ...prev, expectedReturn: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Lợi nhuận thực tế (%)"
                                type="number"
                                value={formData.actualReturn}
                                onChange={(e) => setFormData(prev => ({ ...prev, actualReturn: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ngày bắt đầu"
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ngày kết thúc"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveProject} variant="contained">
                        {editingProject ? 'Cập nhật' : 'Thêm'}
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

export default FinanceField;
