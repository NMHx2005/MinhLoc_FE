'use client'

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Chip,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Grid,
    CircularProgress,
    Alert,
    Switch,
    FormControlLabel,
    Autocomplete,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Security as SecurityIcon,
    Refresh as RefreshIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import { useRoles, usePermissions } from '../../hooks/useUsers';
import { type Role, type Permission } from '../../services/admin/userService';

const UserRoles: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

    // Use the API hooks
    const {
        roles,
        loading,
        error,
        createRole,
        updateRole,
        deleteRole,
    } = useRoles();

    const {
        permissions,
        loading: permissionsLoading,
    } = usePermissions();

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        permissions: [] as string[],
        isActive: true,
    });

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, role: Role) => {
        setAnchorEl(event.currentTarget);
        setSelectedRole(role);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRole(null);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedRole) {
            try {
                await deleteRole(selectedRole._id);
                setDeleteDialogOpen(false);
                handleMenuClose();
            } catch (error) {
                console.error('Error deleting role:', error);
            }
        }
    };

    const handleEditClick = () => {
        if (selectedRole) {
            setFormData({
                name: selectedRole.name,
                description: selectedRole.description,
                permissions: selectedRole.permissions,
                isActive: selectedRole.isActive,
            });
            setFormMode('edit');
            setFormOpen(true);
        }
        handleMenuClose();
    };

    const handleAddClick = () => {
        setFormData({
            name: '',
            description: '',
            permissions: [],
            isActive: true,
        });
        setFormMode('add');
        setFormOpen(true);
    };

    const handleFormSubmit = async () => {
        try {
            if (formMode === 'add') {
                await createRole(formData);
            } else if (selectedRole) {
                await updateRole(selectedRole._id, formData);
            }
            setFormOpen(false);
        } catch (error) {
            console.error('Error saving role:', error);
        }
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setSelectedRole(null);
        setFormData({
            name: '',
            description: '',
            permissions: [],
            isActive: true,
        });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
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

            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                    Quản lý Vai trò ({roles.length})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                >
                    Thêm vai trò
                </Button>
            </Box>

            {/* Table */}
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên vai trò</TableCell>
                                <TableCell>Mô tả</TableCell>
                                <TableCell>Số quyền</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((role) => (
                                <TableRow key={role._id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <SecurityIcon sx={{ color: 'primary.main' }} />
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                {role.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="text.secondary">
                                            {role.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={`${role.permissions.length} quyền`}
                                            color="info"
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={role.isActive ? 'Hoạt động' : 'Không hoạt động'}
                                            color={role.isActive ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {new Date(role.createdAt).toLocaleDateString('vi-VN')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(e) => handleMenuClick(e, role)}
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
                    count={roles.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Số dòng mỗi trang:"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} của ${count !== -1 ? count : `nhiều hơn ${to}`}`
                    }
                />
            </Card>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditClick}>
                    <EditIcon sx={{ mr: 1 }} />
                    Chỉnh sửa
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1 }} />
                    Xóa
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa vai trò "{selectedRole?.name}"?
                        Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add/Edit Role Form */}
            <Dialog
                open={formOpen}
                onClose={handleFormClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    {formMode === 'add' ? 'Thêm vai trò mới' : 'Chỉnh sửa vai trò'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Tên vai trò"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                    }
                                    label="Hoạt động"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mô tả"
                                    multiline
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    options={permissions}
                                    getOptionLabel={(option) => option.name}
                                    value={permissions.filter(p => formData.permissions.includes(p._id))}
                                    onChange={(_, value) => {
                                        setFormData({
                                            ...formData,
                                            permissions: value.map(p => p._id)
                                        });
                                    }}
                                    loading={permissionsLoading}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Quyền"
                                            placeholder="Chọn các quyền cho vai trò"
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            <Box>
                                                <Typography variant="body2">
                                                    {option.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {option.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFormClose}>
                        Hủy
                    </Button>
                    <Button onClick={handleFormSubmit} variant="contained">
                        {formMode === 'add' ? 'Thêm' : 'Cập nhật'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserRoles;
