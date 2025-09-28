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
    Tooltip,
    Badge,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Reply as ReplyIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Visibility as ViewIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Person as PersonIcon,
    Refresh as RefreshIcon,
    MarkEmailRead as MarkReadIcon,
    Assignment as AssignIcon,
} from '@mui/icons-material';
import { useContactMessages } from '../../hooks/useContacts';
import { type ContactMessage } from '../../services/admin/contactService';

const InboxManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Use the contact messages hook
    const {
        messages,
        loading,
        error,
        total,
        updateMessageStatus,
        deleteMessage,
        setPage: setApiPage,
        setLimit: setApiLimit,
        fetchMessages,
    } = useContactMessages({
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

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, message: ContactMessage) => {
        setAnchorEl(event.currentTarget);
        setSelectedMessage(message);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedMessage(null);
    };

    const handleViewClick = () => {
        setViewDialogOpen(true);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedMessage) {
            try {
                await deleteMessage(selectedMessage._id);
                setDeleteDialogOpen(false);
                handleMenuClose();
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        }
    };

    const handleStatusChange = async (message: ContactMessage, newStatus: string) => {
        try {
            await updateMessageStatus(message._id, newStatus);
            handleMenuClose();
        } catch (error) {
            console.error('Error updating message status:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'error';
            case 'in_progress': return 'warning';
            case 'resolved': return 'success';
            case 'closed': return 'default';
            default: return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'new': return 'Mới';
            case 'in_progress': return 'Đang xử lý';
            case 'resolved': return 'Đã giải quyết';
            case 'closed': return 'Đã đóng';
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

    const getNewMessagesCount = () => {
        return messages.filter(msg => msg.status === 'new').length;
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6">
                        Inbox Liên hệ ({total})
                    </Typography>
                    {getNewMessagesCount() > 0 && (
                        <Badge badgeContent={getNewMessagesCount()} color="error">
                            <EmailIcon />
                        </Badge>
                    )}
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        // TODO: Open create message dialog
                        console.log('Create message');
                    }}
                >
                    Tạo tin nhắn
                </Button>
            </Box>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm theo tên, email, chủ đề..."
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
                                    <MenuItem value="in_progress">Đang xử lý</MenuItem>
                                    <MenuItem value="resolved">Đã giải quyết</MenuItem>
                                    <MenuItem value="closed">Đã đóng</MenuItem>
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
                        <Grid item xs={12} md={2}>
                            <Button
                                variant="outlined"
                                startIcon={<RefreshIcon />}
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('');
                                    setPriorityFilter('');
                                    fetchMessages();
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
                                <TableCell>Người gửi</TableCell>
                                <TableCell>Chủ đề</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Độ ưu tiên</TableCell>
                                <TableCell>Ngày gửi</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(messages || []).map((message: ContactMessage) => (
                                <TableRow key={message._id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {message.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {message.email}
                                                    </Typography>
                                                </Box>
                                                {message.phone && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {message.phone}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {message.subject}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {message.message}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getStatusText(message.status)}
                                            color={getStatusColor(message.status) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getPriorityText(message.priority)}
                                            color={getPriorityColor(message.priority) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {formatDate(message.createdAt)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(e) => handleMenuClick(e, message)}
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
                    <ViewIcon sx={{ mr: 1 }} />
                    Xem chi tiết
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedMessage) {
                        handleStatusChange(selectedMessage, 'in_progress');
                    }
                }}>
                    <MarkReadIcon sx={{ mr: 1 }} />
                    Đánh dấu đang xử lý
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedMessage) {
                        handleStatusChange(selectedMessage, 'resolved');
                    }
                }}>
                    <ReplyIcon sx={{ mr: 1 }} />
                    Đánh dấu đã giải quyết
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedMessage) {
                        handleStatusChange(selectedMessage, 'closed');
                    }
                }}>
                    <AssignIcon sx={{ mr: 1 }} />
                    Đóng tin nhắn
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1 }} />
                    Xóa
                </MenuItem>
            </Menu>

            {/* View Message Dialog */}
            <Dialog
                open={viewDialogOpen}
                onClose={() => setViewDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    Chi tiết tin nhắn
                </DialogTitle>
                <DialogContent>
                    {selectedMessage && (
                        <Box>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Tên:
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedMessage.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Email:
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedMessage.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Điện thoại:
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedMessage.phone || 'Không có'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Ngày gửi:
                                    </Typography>
                                    <Typography variant="body1">
                                        {formatDate(selectedMessage.createdAt)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                Chủ đề:
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {selectedMessage.subject}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                Nội dung:
                            </Typography>
                            <Typography variant="body1" sx={{
                                whiteSpace: 'pre-wrap',
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                p: 2,
                                backgroundColor: '#f5f5f5'
                            }}>
                                {selectedMessage.message}
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
                        Bạn có chắc chắn muốn xóa tin nhắn từ "{selectedMessage?.name}"?
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

export default InboxManagement;