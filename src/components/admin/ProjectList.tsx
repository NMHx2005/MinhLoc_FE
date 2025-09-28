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
    Refresh as RefreshIcon,
} from '@mui/icons-material';

import type { Project } from '../../services/admin/projectService';
import { getOptimizedImageUrl, getPlaceholderImage, imageStyles, handleImageError } from '../../utils/imageUtils';

interface ProjectListProps {
    projects: Project[];
    loading: boolean;
    onEditProject?: (project: Project) => void;
    onDeleteProject?: (projectId: string) => void;
    onAddProject?: () => void;
    total: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
    projects,
    loading: _loading,
    onEditProject,
    onDeleteProject,
    onAddProject,
    total,
    page,
    limit,
    onPageChange,
    onLimitChange
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const getTypeLabel = (type: string) => {
        const types = {
            apartment: 'Chung cư',
            villa: 'Biệt thự',
            commercial: 'Thương mại',
            office: 'Văn phòng',
        };
        return types[type as keyof typeof types] || type;
    };

    const getStatusColor = (status: string) => {
        const colors = {
            planning: '#ff9800',
            construction: '#2196f3',
            completed: '#4caf50',
            sold_out: '#f44336',
        };
        return colors[status as keyof typeof colors] || '#666';
    };

    const getStatusLabel = (status: string) => {
        const labels = {
            planning: 'Đang lên kế hoạch',
            construction: 'Đang xây dựng',
            completed: 'Hoàn thành',
            sold_out: 'Đã bán hết',
        };
        return labels[status as keyof typeof labels] || status;
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        onPageChange(newPage + 1); // Convert to 1-based page
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLimit = parseInt(event.target.value, 10);
        onLimitChange(newLimit);
        onPageChange(1); // Reset to first page
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


    const handleDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedProject && onDeleteProject) {
            onDeleteProject(selectedProject._id);
        }
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
                    Danh sách Dự án ({total} dự án)
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={() => window.location.reload()}
                    >
                        Làm mới
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddProject}
                    >
                        Thêm dự án
                    </Button>
                </Box>
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
                            {projects.map((project) => (
                                <TableRow key={project._id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: 80,
                                                    height: 45, // 16:9 aspect ratio
                                                    borderRadius: 1,
                                                    overflow: 'hidden',
                                                    border: '1px solid #e0e0e0',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={project.images?.[0] ? getOptimizedImageUrl.thumbnail(project.images[0]) : '/article-1.png'}
                                                    alt={project.name}
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        filter: 'brightness(1.05) contrast(1.02)',
                                                    }}
                                                    onError={(e) => handleImageError(e, getPlaceholderImage.thumbnail())}
                                                />
                                                {/* Watermark overlay */}
                                                <Box sx={imageStyles.watermarkOverlay} />
                                                {!project.images?.[0] && (
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            color: 'text.secondary',
                                                        }}
                                                    >
                                                        <ImageIcon sx={{ fontSize: 20 }} />
                                                    </Box>
                                                )}
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {project.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {project.location}
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
                                                {project.location}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <MoneyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {project.price.min.toLocaleString()} - {project.price.max.toLocaleString()} {project.price.currency}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {project.area.min} - {project.area.max} {project.area.unit}
                                        </Typography>
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
                    count={total}
                    rowsPerPage={limit}
                    page={page - 1} // Convert to 0-based page
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
                <MenuItem
                    onClick={() => window.open(`/admin/projects/${selectedProject!._id}`)}
                >
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
                    <ListItemText>Xóa dự án</ListItemText>
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
                <DialogTitle>Xác nhận xóa dự án</DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc chắn muốn xóa dự án <strong>"{selectedProject?.name}"</strong> không?
                        <br />
                        <br />
                        Hành động này sẽ xóa vĩnh viễn tất cả dữ liệu liên quan đến dự án và không thể hoàn tác.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Hủy</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Xóa dự án
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
};

export default ProjectList;
