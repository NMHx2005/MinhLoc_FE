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
    HomeWork as RealEstateIcon,
    Apartment as ApartmentIcon,
    Villa as VillaIcon,
    LocationOn as LocationIcon,
} from '@mui/icons-material';

interface RealEstateProject {
    id: string;
    name: string;
    description: string;
    type: 'apartment' | 'house' | 'villa' | 'commercial' | 'land';
    location: string;
    status: 'planning' | 'selling' | 'sold_out' | 'completed';
    totalUnits: number;
    soldUnits: number;
    priceRange: {
        min: number;
        max: number;
    };
    area: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const RealEstateField: React.FC = () => {
    const [projects, setProjects] = useState<RealEstateProject[]>([
        {
            id: '1',
            name: 'Khu đô thị Minh Lộc Garden',
            description: 'Khu đô thị cao cấp với đầy đủ tiện ích',
            type: 'apartment',
            location: 'Quận 7, TP.HCM',
            status: 'selling',
            totalUnits: 500,
            soldUnits: 320,
            priceRange: {
                min: 2000000000,
                max: 5000000000,
            },
            area: 15.5,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '2',
            name: 'Biệt thự Minh Lộc Villa',
            description: 'Khu biệt thự sang trọng ven sông',
            type: 'villa',
            location: 'Quận 2, TP.HCM',
            status: 'sold_out',
            totalUnits: 50,
            soldUnits: 50,
            priceRange: {
                min: 8000000000,
                max: 15000000000,
            },
            area: 25.0,
            isActive: true,
            createdAt: '2023-06-01',
            updatedAt: '2024-01-15',
        },
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<RealEstateProject | null>(null);
    const [formData, setFormData] = useState<Omit<RealEstateProject, 'id' | 'createdAt' | 'updatedAt'>>({
        name: '',
        description: '',
        type: 'apartment',
        location: '',
        status: 'planning',
        totalUnits: 0,
        soldUnits: 0,
        priceRange: {
            min: 0,
            max: 0,
        },
        area: 0,
        isActive: true,
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'apartment':
                return 'primary';
            case 'house':
                return 'success';
            case 'villa':
                return 'warning';
            case 'commercial':
                return 'info';
            case 'land':
                return 'secondary';
            default:
                return 'default';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'apartment':
                return 'Căn hộ';
            case 'house':
                return 'Nhà phố';
            case 'villa':
                return 'Biệt thự';
            case 'commercial':
                return 'Thương mại';
            case 'land':
                return 'Đất nền';
            default:
                return 'Không xác định';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'planning':
                return 'info';
            case 'selling':
                return 'warning';
            case 'sold_out':
                return 'success';
            case 'completed':
                return 'primary';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'planning':
                return 'Lập kế hoạch';
            case 'selling':
                return 'Đang bán';
            case 'sold_out':
                return 'Bán hết';
            case 'completed':
                return 'Hoàn thành';
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

    const getSalesProgress = (sold: number, total: number) => {
        return total > 0 ? Math.round((sold / total) * 100) : 0;
    };

    const handleAddProject = () => {
        setEditingProject(null);
        setFormData({
            name: '',
            description: '',
            type: 'apartment',
            location: '',
            status: 'planning',
            totalUnits: 0,
            soldUnits: 0,
            priceRange: {
                min: 0,
                max: 0,
            },
            area: 0,
            isActive: true,
        });
        setDialogOpen(true);
    };

    const handleEditProject = (project: RealEstateProject) => {
        setEditingProject(project);
        setFormData({
            name: project.name,
            description: project.description,
            type: project.type,
            location: project.location,
            status: project.status,
            totalUnits: project.totalUnits,
            soldUnits: project.soldUnits,
            priceRange: project.priceRange,
            area: project.area,
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
            setSnackbarMessage('Cập nhật dự án bất động sản thành công!');
        } else {
            const newProject: RealEstateProject = {
                ...formData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            };
            setProjects(prev => [...prev, newProject]);
            setSnackbarMessage('Thêm dự án bất động sản thành công!');
        }
        setSnackbarOpen(true);
        setDialogOpen(false);
    };

    const handleDeleteProject = (projectId: string) => {
        setProjects(prev => prev.filter(project => project.id !== projectId));
        setSnackbarMessage('Xóa dự án bất động sản thành công!');
        setSnackbarOpen(true);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Dự án Bất động sản
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
                                    <RealEstateIcon />
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
                                    <ApartmentIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {projects.filter(p => p.status === 'selling').length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Đang bán
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
                                    <VillaIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {projects.reduce((sum, p) => sum + p.soldUnits, 0)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Đã bán
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
                                        {projects.reduce((sum, p) => sum + p.area, 0).toFixed(1)} ha
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng diện tích
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
                            <TableCell>Địa điểm</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Tiến độ bán</TableCell>
                            <TableCell>Giá</TableCell>
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
                                            {project.soldUnits}/{project.totalUnits}
                                        </Typography>
                                        <Box sx={{ width: 60, height: 8, bgcolor: 'grey.200', borderRadius: 1 }}>
                                            <Box
                                                sx={{
                                                    width: `${getSalesProgress(project.soldUnits, project.totalUnits)}%`,
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
                                        {formatCurrency(project.priceRange.min)} - {formatCurrency(project.priceRange.max)}
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
                    {editingProject ? 'Chỉnh sửa dự án bất động sản' : 'Thêm dự án bất động sản mới'}
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
                                <option value="apartment">Căn hộ</option>
                                <option value="house">Nhà phố</option>
                                <option value="villa">Biệt thự</option>
                                <option value="commercial">Thương mại</option>
                                <option value="land">Đất nền</option>
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
                                <option value="planning">Lập kế hoạch</option>
                                <option value="selling">Đang bán</option>
                                <option value="sold_out">Bán hết</option>
                                <option value="completed">Hoàn thành</option>
                            </TextField>
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
                                label="Diện tích (ha)"
                                type="number"
                                value={formData.area}
                                onChange={(e) => setFormData(prev => ({ ...prev, area: parseFloat(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tổng số căn"
                                type="number"
                                value={formData.totalUnits}
                                onChange={(e) => setFormData(prev => ({ ...prev, totalUnits: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Đã bán"
                                type="number"
                                value={formData.soldUnits}
                                onChange={(e) => setFormData(prev => ({ ...prev, soldUnits: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Giá thấp nhất (VND)"
                                type="number"
                                value={formData.priceRange.min}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    priceRange: { ...prev.priceRange, min: parseInt(e.target.value) }
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Giá cao nhất (VND)"
                                type="number"
                                value={formData.priceRange.max}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    priceRange: { ...prev.priceRange, max: parseInt(e.target.value) }
                                }))}
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

export default RealEstateField;
