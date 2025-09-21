'use client'

import React, { useState } from 'react';
import {
    Card,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Chip,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    Add as AddIcon,
    Image as ImageIcon,
    LocationOn as LocationIcon,
    AttachMoney as MoneyIcon,
} from '@mui/icons-material';

interface Project {
    id: number;
    name: string;
    type: 'apartment' | 'villa' | 'commercial' | 'land';
    status: 'available' | 'sold' | 'coming-soon';
    city: string;
    district: string;
    price: string;
    area: string;
    image: string;
    createdAt: string;
}

interface ProjectListProps {
    onEditProject?: (project: Project) => void;
    onAddProject?: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onEditProject, onAddProject }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Mock data
    const projects: Project[] = [
        {
            id: 1,
            name: 'Chung cư Green Valley',
            type: 'apartment',
            status: 'available',
            city: 'TP.HCM',
            district: 'Quận 2',
            price: '3.5 tỷ',
            area: '85m²',
            image: '/article-1.png',
            createdAt: '2024-01-15',
        },
        {
            id: 2,
            name: 'Biệt thự Royal Garden',
            type: 'villa',
            status: 'sold',
            city: 'TP.HCM',
            district: 'Quận 7',
            price: '15 tỷ',
            area: '250m²',
            image: '/article-2.png',
            createdAt: '2024-01-10',
        },
        {
            id: 3,
            name: 'Tòa nhà Sky Tower',
            type: 'commercial',
            status: 'coming-soon',
            city: 'TP.HCM',
            district: 'Quận 1',
            price: '25 tỷ',
            area: '500m²',
            image: '/article-3.png',
            createdAt: '2024-01-05',
        },
        {
            id: 4,
            name: 'Đất nền Golden Land',
            type: 'land',
            status: 'available',
            city: 'TP.HCM',
            district: 'Quận 9',
            price: '8 tỷ',
            area: '100m²',
            image: '/article-4.png',
            createdAt: '2024-01-18',
        },
    ];

    const getTypeLabel = (type: string) => {
        const types = {
            apartment: 'Chung cư',
            villa: 'Biệt thự',
            commercial: 'Thương mại',
            land: 'Đất nền',
        };
        return types[type as keyof typeof types] || type;
    };

    const getStatusColor = (status: string) => {
        const colors = {
            available: '#4caf50',
            sold: '#f44336',
            'coming-soon': '#ff9800',
        };
        return colors[status as keyof typeof colors] || '#666';
    };

    const getStatusLabel = (status: string) => {
        const labels = {
            available: 'Đang bán',
            sold: 'Đã bán',
            'coming-soon': 'Sắp mở bán',
        };
        return labels[status as keyof typeof labels] || status;
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, project: Project) => {
        setAnchorEl(event.currentTarget);
        setSelectedProject(project);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProject(null);
    };

    const handleEdit = () => {
        if (selectedProject && onEditProject) {
            onEditProject(selectedProject);
        }
        handleMenuClose();
    };

    const handleView = () => {
        // TODO: Implement view project functionality
        handleMenuClose();
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        // TODO: Implement delete project functionality
        setDeleteDialogOpen(false);
        setSelectedProject(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedProject(null);
    };

    const handleAddProject = () => {
        if (onAddProject) {
            onAddProject();
        }
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Danh sách Dự án ({projects.length})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddProject}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#d4b85a',
                        },
                    }}
                >
                    Thêm dự án
                </Button>
            </Box>

            {/* Table */}
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Dự án</TableCell>
                                <TableCell>Loại</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Vị trí</TableCell>
                                <TableCell>Giá</TableCell>
                                <TableCell>Diện tích</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((project) => (
                                    <TableRow key={project.id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{ width: 60, height: 60 }}
                                                    src={project.image}
                                                >
                                                    <ImageIcon />
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {project.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        ID: #{project.id}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={getTypeLabel(project.type)}
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#e3f2fd',
                                                    color: '#1976d2',
                                                    fontWeight: 500,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={getStatusLabel(project.status)}
                                                size="small"
                                                sx={{
                                                    backgroundColor: getStatusColor(project.status),
                                                    color: 'white',
                                                    fontWeight: 500,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                <Typography variant="body2">
                                                    {project.district}, {project.city}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <MoneyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {project.price}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{project.area}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {new Date(project.createdAt).toLocaleDateString('vi-VN')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={(e) => handleMenuOpen(e, project)}
                                                size="small"
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={projects.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: { width: 200 },
                }}
            >
                <MenuItem onClick={handleView}>
                    <ListItemIcon>
                        <ViewIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Xem chi tiết</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Chỉnh sửa</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText>Xóa</ListItemText>
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc chắn muốn xóa dự án "{selectedProject?.name}" không?
                        Hành động này không thể hoàn tác.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Hủy</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProjectList;
