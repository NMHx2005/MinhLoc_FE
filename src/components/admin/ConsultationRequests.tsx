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
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    Grid,
    CircularProgress,
    Alert,
    Avatar,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Business as BusinessIcon,
    Person as PersonIcon,
    Refresh as RefreshIcon,
    Assignment as AssignIcon,
    Schedule as ScheduleIcon,
    CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useConsultationRequests } from '../../hooks/useContacts';
import { type ConsultationRequest } from '../../services/admin/contactService';

const ConsultationRequests: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Use the consultation requests hook
    const {
        requests,
        loading,
        error,
        total,
        updateRequestStatus,
        assignRequest,
        setPage: setApiPage,
        setLimit: setApiLimit,
        fetchRequests,
    } = useConsultationRequests({
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm,
        status: statusFilter,
        priority: priorityFilter,
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

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, request: ConsultationRequest) => {
        setAnchorEl(event.currentTarget);
        setSelectedRequest(request);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRequest(null);
    };

    const handleViewClick = () => {
        setViewDialogOpen(true);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleStatusChange = async (request: ConsultationRequest, newStatus: string) => {
        try {
            await updateRequestStatus(request._id, newStatus);
            handleMenuClose();
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

    const handleAssignRequest = async (request: ConsultationRequest) => {
        try {
            // TODO: Open assign dialog to select user
            console.log('Assign request to user');
            handleMenuClose();
        } catch (error) {
            console.error('Error assigning request:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'error';
            case 'contacted': return 'warning';
            case 'scheduled': return 'info';
            case 'completed': return 'success';
            case 'cancelled': return 'default';
            default: return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'new': return 'Mới';
            case 'contacted': return 'Đã liên hệ';
            case 'scheduled': return 'Đã lên lịch';
            case 'completed': return 'Hoàn thành';
            case 'cancelled': return 'Đã hủy';
            default: return status;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'error';
            case 'high': return 'warning';
            case 'medium': return 'info';
            case 'low': return 'default';
            default: return 'default';
        }
    };

    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'Khẩn cấp';
            case 'high': return 'Cao';
            case 'medium': return 'Trung bình';
            case 'low': return 'Thấp';
            default: return priority;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN');
    };

    const formatCurrency = (amount: string) => {
        if (!amount) return 'Chưa xác định';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(parseInt(amount));
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
                    Yêu cầu Tư vấn ({total})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        // TODO: Open create request dialog
                        console.log('Create consultation request');
                    }}
                >
                    Tạo yêu cầu tư vấn
                </Button>
            </Box>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm theo tên, email, công ty..."
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
                                    <MenuItem value="new">Mới</MenuItem>
                                    <MenuItem value="contacted">Đã liên hệ</MenuItem>
                                    <MenuItem value="scheduled">Đã lên lịch</MenuItem>
                                    <MenuItem value="completed">Hoàn thành</MenuItem>
                                    <MenuItem value="cancelled">Đã hủy</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Độ ưu tiên</InputLabel>
                                <Select
                                    value={priorityFilter}
                                    onChange={(e) => setPriorityFilter(e.target.value)}
                                    label="Độ ưu tiên"
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    <MenuItem value="urgent">Khẩn cấp</MenuItem>
                                    <MenuItem value="high">Cao</MenuItem>
                                    <MenuItem value="medium">Trung bình</MenuItem>
                                    <MenuItem value="low">Thấp</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button
                                variant="outlined"
                                startIcon={<RefreshIcon />}
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('');
                                    setPriorityFilter('');
                                    fetchRequests();
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
                                <TableCell>Dự án</TableCell>
                                <TableCell>Ngân sách</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Độ ưu tiên</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(requests || []).map((request: ConsultationRequest) => (
                                <TableRow key={request._id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                sx={{ bgcolor: 'primary.main' }}
                                            >
                                                {request.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {request.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {request.email}
                                                    </Typography>
                                                </Box>
                                                {request.company && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <BusinessIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {request.company}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {request.projectType}
                                        </Typography>
                                        {request.timeline && (
                                            <Typography variant="caption" color="text.secondary">
                                                Thời gian: {request.timeline}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {formatCurrency(request.budget || '')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getStatusText(request.status)}
                                            color={getStatusColor(request.status) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getPriorityText(request.priority)}
                                            color={getPriorityColor(request.priority) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {formatDate(request.createdAt)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(e) => handleMenuClick(e, request)}
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
                <MenuItem onClick={handleViewClick}>
                    <PersonIcon sx={{ mr: 1 }} />
                    Xem chi tiết
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedRequest) {
                        handleStatusChange(selectedRequest, 'contacted');
                    }
                }}>
                    <EmailIcon sx={{ mr: 1 }} />
                    Đánh dấu đã liên hệ
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedRequest) {
                        handleStatusChange(selectedRequest, 'scheduled');
                    }
                }}>
                    <ScheduleIcon sx={{ mr: 1 }} />
                    Đánh dấu đã lên lịch
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedRequest) {
                        handleStatusChange(selectedRequest, 'completed');
                    }
                }}>
                    <CheckIcon sx={{ mr: 1 }} />
                    Hoàn thành
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedRequest) {
                        handleAssignRequest(selectedRequest);
                    }
                }}>
                    <AssignIcon sx={{ mr: 1 }} />
                    Phân công
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1 }} />
                    Xóa
                </MenuItem>
            </Menu>

            {/* View Request Dialog */}
            <Dialog
                open={viewDialogOpen}
                onClose={() => setViewDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    Chi tiết yêu cầu tư vấn
                </DialogTitle>
                <DialogContent>
                    {selectedRequest && (
                        <Box>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Tên:
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedRequest.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Email:
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedRequest.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Điện thoại:
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedRequest.phone || 'Không có'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Công ty:
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedRequest.company || 'Không có'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Loại dự án:
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedRequest.projectType}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Ngân sách:
                                    </Typography>
                                    <Typography variant="body1">
                                        {formatCurrency(selectedRequest.budget || '')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Thời gian:
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedRequest.timeline || 'Chưa xác định'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Ngày tạo:
                                    </Typography>
                                    <Typography variant="body1">
                                        {formatDate(selectedRequest.createdAt)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                Mô tả dự án:
                            </Typography>
                            <Typography variant="body1" sx={{
                                whiteSpace: 'pre-wrap',
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                p: 2,
                                backgroundColor: '#f5f5f5'
                            }}>
                                {selectedRequest.message}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa yêu cầu tư vấn từ "{selectedRequest?.name}"?
                        Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={() => {
                        // TODO: Implement delete
                        setDeleteDialogOpen(false);
                        handleMenuClose();
                    }} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ConsultationRequests;
