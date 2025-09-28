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
    Avatar,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    Grid,
    // Badge,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Visibility as ViewIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Business as BusinessIcon,
    Person as CustomerIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useUsers } from '../../hooks/useUsers';
import { type User } from '../../services/admin/userService';

const CustomerList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Use the existing hook
    const {
        users: customers,
        loading,
        error,
        total,
        updateUser,
        deleteUser,
        setPage: setApiPage,
        setLimit: setApiLimit,
        fetchUsers,
    } = useUsers({
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm,
        status: statusFilter,
        type: typeFilter,
    });

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
        setApiPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setApiLimit(newRowsPerPage);
        setPage(0);
        setApiPage(1);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, customer: User) => {
        setAnchorEl(event.currentTarget);
        setSelectedCustomer(customer);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCustomer(null);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedCustomer) {
            try {
                await deleteUser(selectedCustomer._id);
                setDeleteDialogOpen(false);
                handleMenuClose();
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    const handleStatusChange = async (customer: User, newStatus: string) => {
        try {
            await updateUser(customer._id, { status: newStatus as any });
            handleMenuClose();
        } catch (error) {
            console.error('Error updating customer status:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'success';
            case 'inactive': return 'warning';
            case 'pending': return 'info';
            default: return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active': return 'Hoạt động';
            case 'inactive': return 'Không hoạt động';
            case 'pending': return 'Chờ duyệt';
            default: return status;
        }
    };

    const getTypeText = (type: string) => {
        switch (type) {
            case 'individual': return 'Cá nhân';
            case 'business': return 'Doanh nghiệp';
            default: return type;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
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
                    Danh sách Khách hàng ({total})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        // TODO: Open create user dialog
                        console.log('Create user');
                    }}
                >
                    Thêm khách hàng
                </Button>
            </Box>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm theo tên, email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Trạng thái</InputLabel>
                                <Select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    label="Trạng thái"
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    <MenuItem value="active">Hoạt động</MenuItem>
                                    <MenuItem value="inactive">Không hoạt động</MenuItem>
                                    <MenuItem value="pending">Chờ duyệt</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Loại</InputLabel>
                                <Select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    label="Loại"
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    <MenuItem value="individual">Cá nhân</MenuItem>
                                    <MenuItem value="business">Doanh nghiệp</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button
                                variant="outlined"
                                startIcon={<RefreshIcon />}
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('');
                                    setTypeFilter('');
                                    fetchUsers();
                                }}
                                fullWidth
                            >
                                Làm mới
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Khách hàng</TableCell>
                                <TableCell>Liên hệ</TableCell>
                                <TableCell>Loại</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Đơn hàng</TableCell>
                                <TableCell>Tổng chi tiêu</TableCell>
                                <TableCell>Hoạt động cuối</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(customers || []).map((customer: User) => (
                                <TableRow key={customer._id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                sx={{ bgcolor: 'primary.main' }}
                                                src={customer.avatar || ''}
                                            >
                                                {customer.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {customer.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Tham gia: {formatDate(customer.joinedAt || '')}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                <Typography variant="body2">
                                                    {customer.email || ''}
                                                </Typography>
                                            </Box>
                                            {customer.phone && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    <Typography variant="body2">
                                                        {customer.phone || ''}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {customer.type === 'business' ? (
                                                <BusinessIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                            ) : (
                                                <CustomerIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                                            )}
                                            <Typography variant="body2">
                                                {getTypeText(customer.type)}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getStatusText(customer.status)}
                                            color={getStatusColor(customer.status) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {customer.totalOrders || '0'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {formatCurrency(customer.totalSpent)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {formatDate(customer.lastActivity)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(e) => handleMenuClick(e, customer)}
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
                <MenuItem onClick={() => {
                    console.log('View customer:', selectedCustomer);
                    handleMenuClose();
                }}>
                    <ViewIcon sx={{ mr: 1 }} />
                    Xem chi tiết
                </MenuItem>
                <MenuItem onClick={() => {
                    console.log('Edit customer:', selectedCustomer);
                    handleMenuClose();
                }}>
                    <EditIcon sx={{ mr: 1 }} />
                    Chỉnh sửa
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedCustomer) {
                        handleStatusChange(selectedCustomer,
                            selectedCustomer.status === 'active' ? 'inactive' : 'active'
                        );
                    }
                }}>
                    <Chip
                        label={selectedCustomer?.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                        color={selectedCustomer?.status === 'active' ? 'warning' : 'success'}
                        size="small"
                        sx={{ mr: 1 }}
                    />
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
                        Bạn có chắc chắn muốn xóa khách hàng "{selectedCustomer?.name}"?
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
        </Box>
    );
};

export default CustomerList;
