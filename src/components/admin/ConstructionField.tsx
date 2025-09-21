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
    Construction as ConstructionIcon,
    Engineering as EngineeringIcon,
    Build as BuildIcon,
    LocationOn as LocationIcon,
} from '@mui/icons-material';

interface ConstructionProject {
    id: string;
    name: string;
    description: string;
    location: string;
    status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
    startDate: string;
    endDate: string;
    budget: number;
    progress: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const ConstructionField: React.FC = () => {
    const [projects, setProjects] = useState<ConstructionProject[]>([
        {
            id: '1',
            name: 'Dự án Khu đô thị Minh Lộc',
            description: 'Khu đô thị hiện đại với đầy đủ tiện ích',
            location: 'Quận 7, TP.HCM',
            status: 'in_progress',
            startDate: '2024-01-01',
            endDate: '2025-12-31',
            budget: 500000000000,
            progress: 65,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '2',
            name: 'Tòa nhà Văn phòng Minh Lộc Tower',
            description: 'Tòa nhà văn phòng cao cấp 25 tầng',
            location: 'Quận 1, TP.HCM',
            status: 'completed',
            startDate: '2023-06-01',
            endDate: '2024-03-31',
            budget: 200000000000,
            progress: 100,
            isActive: true,
            createdAt: '2023-06-01',
            updatedAt: '2024-03-31',
        },
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<ConstructionProject | null>(null);
    const [formData, setFormData] = useState<Omit<ConstructionProject, 'id' | 'createdAt' | 'updatedAt'>>({
        name: '',
        description: '',
        location: '',
        status: 'planning',
        startDate: '',
        endDate: '',
        budget: 0,
        progress: 0,
        isActive: true,
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'planning':
                return 'info';
            case 'in_progress':
                return 'warning';
            case 'completed':
                return 'success';
            case 'on_hold':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'planning':
                return 'Lập kế hoạch';
            case 'in_progress':
                return 'Đang thi công';
            case 'completed':
                return 'Hoàn thành';
            case 'on_hold':
                return 'Tạm dừng';
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
            location: '',
            status: 'planning',
            startDate: '',
            endDate: '',
            budget: 0,
            progress: 0,
            isActive: true,
        });
        setDialogOpen(true);
    };

    const handleEditProject = (project: ConstructionProject) => {
        setEditingProject(project);
        setFormData({
            name: project.name,
            description: project.description,
            location: project.location,
            status: project.status,
            startDate: project.startDate,
            endDate: project.endDate,
            budget: project.budget,
            progress: project.progress,
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
            setSnackbarMessage('Cập nhật dự án xây dựng thành công!');
        } else {
            const newProject: ConstructionProject = {
                ...formData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            };
            setProjects(prev => [...prev, newProject]);
            setSnackbarMessage('Thêm dự án xây dựng thành công!');
        }
        setSnackbarOpen(true);
        setDialogOpen(false);
    };

    const handleDeleteProject = (projectId: string) => {
        setProjects(prev => prev.filter(project => project.id !== projectId));
        setSnackbarMessage('Xóa dự án xây dựng thành công!');
        setSnackbarOpen(true);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Dự án Xây dựng
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
                                    <ConstructionIcon />
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
                                <Avatar sx={{ bgcolor: 'warning.main' }}>
                                    <EngineeringIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {projects.filter(p => p.status === 'in_progress').length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Đang thi công
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
                                    <BuildIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {projects.filter(p => p.status === 'completed').length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Hoàn thành
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
                                    <LocationIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {formatCurrency(projects.reduce((sum, p) => sum + p.budget, 0))}
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

            {/* Projects Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dự án</TableCell>
                            <TableCell>Địa điểm</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Tiến độ</TableCell>
                            <TableCell>Ngân sách</TableCell>
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
                                    <Typography variant="body2" color="text.secondary">
                                        {project.location}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusLabel(project.status)}
                                        color={getStatusColor(project.status) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="body2">
                                            {project.progress}%
                                        </Typography>
                                        <Box sx={{ width: 60, height: 8, bgcolor: 'grey.200', borderRadius: 1 }}>
                                            <Box
                                                sx={{
                                                    width: `${project.progress}%`,
                                                    height: '100%',
                                                    bgcolor: 'primary.main',
                                                    borderRadius: 1,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {formatCurrency(project.budget)}
                                    </Typography>
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
                    {editingProject ? 'Chỉnh sửa dự án xây dựng' : 'Thêm dự án xây dựng mới'}
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
                                label="Địa điểm"
                                value={formData.location}
                                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Trạng thái"
                                select
                                value={formData.status}
                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                            >
                                <option value="planning">Lập kế hoạch</option>
                                <option value="in_progress">Đang thi công</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="on_hold">Tạm dừng</option>
                            </TextField>
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ngân sách (VND)"
                                type="number"
                                value={formData.budget}
                                onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tiến độ (%)"
                                type="number"
                                value={formData.progress}
                                onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
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

export default ConstructionField;
