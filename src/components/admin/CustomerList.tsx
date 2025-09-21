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
    Avatar,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    Grid,
    Badge,
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
    LocationOn as LocationIcon,
    Business as BusinessIcon,
    Person as CustomerIcon,
} from '@mui/icons-material';
import CustomerForm from './CustomerForm';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
    type: 'individual' | 'business';
    status: 'active' | 'inactive' | 'blocked';
    totalOrders: number;
    totalSpent: number;
    lastActivity: string;
    joinedAt: string;
    avatar: string;
    notes: string;
    interests: string[];
}

const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([
        {
            id: 1,
            name: 'Nguyễn Văn Anh',
            email: 'nguyen.van.anh@email.com',
            phone: '0901234567',
            address: '123 Nguyễn Huệ, Q1, TP.HCM',
            company: 'Công ty ABC',
            type: 'business',
            status: 'active',
            totalOrders: 5,
            totalSpent: 2500000,
            lastActivity: '2024-01-20',
            joinedAt: '2023-06-15',
            avatar: '/placeholder-user.jpg',
            notes: 'Khách hàng VIP, quan tâm đến sâm cao cấp',
            interests: ['Sâm Ngọc Linh', 'BDS cao cấp']
        },
        {
            id: 2,
            name: 'Trần Thị Bình',
            email: 'tran.thi.binh@gmail.com',
            phone: '0987654321',
            address: '456 Lê Lợi, Q3, TP.HCM',
            company: '',
            type: 'individual',
            status: 'active',
            totalOrders: 3,
            totalSpent: 1200000,
            lastActivity: '2024-01-18',
            joinedAt: '2023-08-20',
            avatar: '/placeholder-user-female.jpg',
            notes: 'Khách hàng thường xuyên, thích sản phẩm sâm Hàn Quốc',
            interests: ['Sâm Hàn Quốc', 'Sức khỏe']
        },
        {
            id: 3,
            name: 'Lê Minh Cường',
            email: 'le.minh.cuong@company.vn',
            phone: '0912345678',
            address: '789 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM',
            company: 'Tập đoàn XYZ',
            type: 'business',
            status: 'inactive',
            totalOrders: 1,
            totalSpent: 500000,
            lastActivity: '2023-12-15',
            joinedAt: '2023-11-10',
            avatar: '/placeholder-user.jpg',
            notes: 'Quan tâm đến dự án bất động sản',
            interests: ['BDS thương mại', 'Đầu tư']
        },
        {
            id: 4,
            name: 'Phạm Thu Hương',
            email: 'pham.thu.huong@email.com',
            phone: '0965432198',
            address: '321 Võ Văn Tần, Q10, TP.HCM',
            company: '',
            type: 'individual',
            status: 'blocked',
            totalOrders: 0,
            totalSpent: 0,
            lastActivity: '2023-10-05',
            joinedAt: '2023-09-01',
            avatar: '/placeholder-user-female.jpg',
            notes: 'Tài khoản bị khóa do vi phạm điều khoản',
            interests: ['Sâm', 'Căn hộ']
        },
        {
            id: 5,
            name: 'Hoàng Đức Thắng',
            email: 'hoang.duc.thang@startup.io',
            phone: '0934567890',
            address: '654 Pasteur, Q1, TP.HCM',
            company: 'Startup DEF',
            type: 'business',
            status: 'active',
            totalOrders: 8,
            totalSpent: 4500000,
            lastActivity: '2024-01-22',
            joinedAt: '2023-03-12',
            avatar: '/placeholder-user.jpg',
            notes: 'Khách hàng doanh nghiệp, mua số lượng lớn',
            interests: ['Sâm Ngọc Linh', 'Sâm Hàn Quốc', 'BDS văn phòng']
        }
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit' | 'view'>('add');

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, customer: Customer) => {
        setAnchorEl(event.currentTarget);
        setSelectedCustomer(customer);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCustomer(null);
    };

    const handleView = () => {
        setFormMode('view');
        setFormOpen(true);
        handleMenuClose();
    };

    const handleEdit = () => {
        setFormMode('edit');
        setFormOpen(true);
        handleMenuClose();
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedCustomer) {
            setCustomers(customers.filter(customer => customer.id !== selectedCustomer.id));
            setDeleteDialogOpen(false);
            setSelectedCustomer(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedCustomer(null);
    };

    const handleAddCustomer = () => {
        setFormMode('add');
        setSelectedCustomer(null);
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setSelectedCustomer(null);
    };

    const handleFormSubmit = (customerData: Partial<Customer>) => {
        if (formMode === 'add') {
            const newCustomer: Customer = {
                ...customerData as Customer,
                id: Math.max(...customers.map(c => c.id)) + 1,
                joinedAt: new Date().toISOString().split('T')[0],
                lastActivity: new Date().toISOString().split('T')[0],
                totalOrders: 0,
                totalSpent: 0,
            };
            setCustomers([...customers, newCustomer]);
        } else if (formMode === 'edit' && selectedCustomer) {
            setCustomers(customers.map(customer =>
                customer.id === selectedCustomer.id
                    ? { ...customer, ...customerData }
                    : customer
            ));
        }
        handleFormClose();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'success';
            case 'inactive': return 'warning';
            case 'blocked': return 'error';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Hoạt động';
            case 'inactive': return 'Không hoạt động';
            case 'blocked': return 'Bị khóa';
            default: return status;
        }
    };

    const getTypeIcon = (type: string) => {
        return type === 'business' ? <BusinessIcon sx={{ color: '#1976d2' }} /> : <CustomerIcon sx={{ color: '#4caf50' }} />;
    };

    const getTypeLabel = (type: string) => {
        return type === 'business' ? 'Doanh nghiệp' : 'Cá nhân';
    };

    // Filter customers
    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm) ||
            customer.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || customer.type === typeFilter;
        const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    const paginatedCustomers = filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Danh sách Khách hàng ({filteredCustomers.length})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddCustomer}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    Thêm Khách hàng
                </Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                                {customers.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tổng khách hàng
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 1 }}>
                                {customers.filter(c => c.status === 'active').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Đang hoạt động
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800', mb: 1 }}>
                                {customers.filter(c => c.type === 'business').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Doanh nghiệp
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0', mb: 1 }}>
                                {(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 1000000).toFixed(1)}M
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tổng chi tiêu (VNĐ)
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm khách hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Loại khách hàng</InputLabel>
                                <Select
                                    value={typeFilter}
                                    label="Loại khách hàng"
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="individual">Cá nhân</MenuItem>
                                    <MenuItem value="business">Doanh nghiệp</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Trạng thái</InputLabel>
                                <Select
                                    value={statusFilter}
                                    label="Trạng thái"
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="active">Hoạt động</MenuItem>
                                    <MenuItem value="inactive">Không hoạt động</MenuItem>
                                    <MenuItem value="blocked">Bị khóa</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Khách hàng</TableCell>
                                <TableCell>Liên hệ</TableCell>
                                <TableCell>Loại</TableCell>
                                <TableCell align="center">Đơn hàng</TableCell>
                                <TableCell align="center">Chi tiêu</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Hoạt động cuối</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedCustomers.map((customer) => (
                                <TableRow key={customer.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Badge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                badgeContent={getTypeIcon(customer.type)}
                                            >
                                                <Avatar
                                                    src={customer.avatar}
                                                    alt={customer.name}
                                                    sx={{ width: 50, height: 50 }}
                                                >
                                                    {customer.name.charAt(0)}
                                                </Avatar>
                                            </Badge>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {customer.name}
                                                </Typography>
                                                {customer.company && (
                                                    <Typography variant="caption" color="text.secondary">
                                                        {customer.company}
                                                    </Typography>
                                                )}
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                                                    {customer.interests.slice(0, 2).map(interest => (
                                                        <Chip
                                                            key={interest}
                                                            label={interest}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ fontSize: '0.6rem', height: 20 }}
                                                        />
                                                    ))}
                                                    {customer.interests.length > 2 && (
                                                        <Chip
                                                            label={`+${customer.interests.length - 2}`}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ fontSize: '0.6rem', height: 20 }}
                                                        />
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                <Typography variant="body2">
                                                    {customer.email}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                <Typography variant="body2">
                                                    {customer.phone}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {customer.address.substring(0, 30)}...
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={getTypeIcon(customer.type)}
                                            label={getTypeLabel(customer.type)}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {customer.totalOrders}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {customer.totalSpent.toLocaleString('vi-VN')} đ
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={getStatusLabel(customer.status)}
                                            color={getStatusColor(customer.status) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">
                                            {new Date(customer.lastActivity).toLocaleDateString('vi-VN')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={(e) => handleMenuOpen(e, customer)}
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
                    count={filteredCustomers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Số hàng mỗi trang:"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} của ${count !== -1 ? count : `hơn ${to}`}`
                    }
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
                    <ViewIcon sx={{ mr: 1 }} />
                    Xem chi tiết
                </MenuItem>
                <MenuItem onClick={handleEdit}>
                    <EditIcon sx={{ mr: 1 }} />
                    Chỉnh sửa
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1 }} />
                    Xóa
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
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa khách hàng "{selectedCustomer?.name}"?
                        Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Hủy</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Customer Form Dialog */}
            <CustomerForm
                open={formOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                mode={formMode}
                initialData={selectedCustomer}
            />
        </Box>
    );
};

export default CustomerList;
