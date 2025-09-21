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
    DialogTitle,
    Chip,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    Grid,
    Avatar,
    Divider,
    Stack,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Reply as ReplyIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Visibility as ViewIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Schedule as ScheduleIcon,
    MarkEmailRead as ReadIcon,
    MarkEmailUnread as UnreadIcon,
    Subject as SubjectIcon,
} from '@mui/icons-material';

interface InboxMessage {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    priority: 'low' | 'medium' | 'high';
    receivedAt: string;
    repliedAt?: string;
    reply?: string;
    source: 'contact_form' | 'footer_form' | 'project_inquiry';
}

const InboxManagement: React.FC = () => {
    const [messages, setMessages] = useState<InboxMessage[]>([
        {
            id: 1,
            name: 'Nguyễn Văn An',
            email: 'nguyenvanan@email.com',
            phone: '0901234567',
            subject: 'Hỏi thông tin dự án Vinhomes',
            message: 'Chào anh/chị, tôi muốn tìm hiểu thông tin về dự án Vinhomes Grand Park. Có thể tư vấn cho tôi về giá cả và chính sách thanh toán không ạ? Cảm ơn!',
            status: 'new',
            priority: 'high',
            receivedAt: '2024-01-22T10:30:00',
            source: 'contact_form'
        },
        {
            id: 2,
            name: 'Trần Thị Bình',
            email: 'tranthibinh@gmail.com',
            phone: '0987654321',
            subject: 'Câu hỏi về sản phẩm sâm Ngọc Linh',
            message: 'Em muốn hỏi về chất lượng và nguồn gốc của sâm Ngọc Linh. Có giấy tờ chứng nhận không ạ? Giá bao nhiêu và có ship toàn quốc không?',
            status: 'replied',
            priority: 'medium',
            receivedAt: '2024-01-21T14:15:00',
            repliedAt: '2024-01-21T16:45:00',
            reply: 'Chào chị, cảm ơn chị đã quan tâm đến sản phẩm. Sâm Ngọc Linh của chúng tôi có đầy đủ giấy tờ chứng nhận từ Bộ Y tế. Giá từ 2-5 triệu/kg tùy loại. Chúng tôi có ship toàn quốc miễn phí.',
            source: 'footer_form'
        },
        {
            id: 3,
            name: 'Lê Minh Cường',
            email: 'leminhcuong@company.vn',
            phone: '0912345678',
            subject: 'Hợp tác đầu tư BDS',
            message: 'Công ty chúng tôi muốn tìm hiểu về cơ hội hợp tác đầu tư bất động sản. Xin vui lòng liên hệ để trao đổi thêm chi tiết.',
            status: 'read',
            priority: 'high',
            receivedAt: '2024-01-20T09:20:00',
            source: 'project_inquiry'
        },
        {
            id: 4,
            name: 'Phạm Thu Hương',
            email: 'phamthuhuong@email.com',
            phone: '0965432198',
            subject: 'Khiếu nại về dịch vụ',
            message: 'Tôi không hài lòng về chất lượng tư vấn. Nhân viên thiếu chuyên nghiệp và không giải đáp được thắc mắc của tôi.',
            status: 'new',
            priority: 'high',
            receivedAt: '2024-01-19T16:45:00',
            source: 'contact_form'
        },
        {
            id: 5,
            name: 'Hoàng Đức Thắng',
            email: 'hoangducthang@startup.io',
            phone: '0934567890',
            subject: 'Đơn hàng sâm cho công ty',
            message: 'Công ty chúng tôi cần đặt sâm làm quà tặng khách hàng. Số lượng khoảng 100 hộp. Có ưu đãi gì không ạ?',
            status: 'read',
            priority: 'medium',
            receivedAt: '2024-01-18T11:30:00',
            source: 'footer_form'
        }
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [replyDialogOpen, setReplyDialogOpen] = useState(false);
    const [replyText, setReplyText] = useState('');

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [sourceFilter, setSourceFilter] = useState('all');

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, message: InboxMessage) => {
        setAnchorEl(event.currentTarget);
        setSelectedMessage(message);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedMessage(null);
    };

    const handleView = () => {
        setViewDialogOpen(true);
        if (selectedMessage && selectedMessage.status === 'new') {
            setMessages(messages.map(msg =>
                msg.id === selectedMessage.id ? { ...msg, status: 'read' } : msg
            ));
        }
        handleMenuClose();
    };

    const handleReply = () => {
        setReplyDialogOpen(true);
        setReplyText('');
        handleMenuClose();
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleMarkAsRead = () => {
        if (selectedMessage) {
            setMessages(messages.map(msg =>
                msg.id === selectedMessage.id ? { ...msg, status: 'read' } : msg
            ));
        }
        handleMenuClose();
    };

    const handleMarkAsUnread = () => {
        if (selectedMessage) {
            setMessages(messages.map(msg =>
                msg.id === selectedMessage.id ? { ...msg, status: 'new' } : msg
            ));
        }
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedMessage) {
            setMessages(messages.filter(msg => msg.id !== selectedMessage.id));
            setDeleteDialogOpen(false);
            setSelectedMessage(null);
        }
    };

    const handleReplySubmit = () => {
        if (selectedMessage && replyText.trim()) {
            setMessages(messages.map(msg =>
                msg.id === selectedMessage.id
                    ? {
                        ...msg,
                        status: 'replied',
                        reply: replyText,
                        repliedAt: new Date().toISOString()
                    }
                    : msg
            ));
            setReplyDialogOpen(false);
            setReplyText('');
            setSelectedMessage(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'error';
            case 'read': return 'warning';
            case 'replied': return 'success';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'new': return 'Mới';
            case 'read': return 'Đã đọc';
            case 'replied': return 'Đã trả lời';
            default: return status;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return '#f44336';
            case 'medium': return '#ff9800';
            case 'low': return '#4caf50';
            default: return '#757575';
        }
    };

    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'high': return 'Cao';
            case 'medium': return 'Trung bình';
            case 'low': return 'Thấp';
            default: return priority;
        }
    };

    const getSourceLabel = (source: string) => {
        switch (source) {
            case 'contact_form': return 'Form liên hệ';
            case 'footer_form': return 'Form footer';
            case 'project_inquiry': return 'Hỏi dự án';
            default: return source;
        }
    };

    // Filter messages
    const filteredMessages = messages.filter(message => {
        const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
        const matchesSource = sourceFilter === 'all' || message.source === sourceFilter;

        return matchesSearch && matchesStatus && matchesPriority && matchesSource;
    });

    const paginatedMessages = filteredMessages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Inbox Liên hệ ({filteredMessages.length})
                </Typography>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f44336', mb: 1 }}>
                                {messages.filter(m => m.status === 'new').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tin nhắn mới
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800', mb: 1 }}>
                                {messages.filter(m => m.status === 'read').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Đã đọc
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 1 }}>
                                {messages.filter(m => m.status === 'replied').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Đã trả lời
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f44336', mb: 1 }}>
                                {messages.filter(m => m.priority === 'high').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Ưu tiên cao
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm tin nhắn..."
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
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Trạng thái</InputLabel>
                                <Select
                                    value={statusFilter}
                                    label="Trạng thái"
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="new">Mới</MenuItem>
                                    <MenuItem value="read">Đã đọc</MenuItem>
                                    <MenuItem value="replied">Đã trả lời</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Ưu tiên</InputLabel>
                                <Select
                                    value={priorityFilter}
                                    label="Ưu tiên"
                                    onChange={(e) => setPriorityFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="high">Cao</MenuItem>
                                    <MenuItem value="medium">Trung bình</MenuItem>
                                    <MenuItem value="low">Thấp</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Nguồn</InputLabel>
                                <Select
                                    value={sourceFilter}
                                    label="Nguồn"
                                    onChange={(e) => setSourceFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="contact_form">Form liên hệ</MenuItem>
                                    <MenuItem value="footer_form">Form footer</MenuItem>
                                    <MenuItem value="project_inquiry">Hỏi dự án</MenuItem>
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
                                <TableCell>Người gửi</TableCell>
                                <TableCell>Chủ đề</TableCell>
                                <TableCell align="center">Ưu tiên</TableCell>
                                <TableCell align="center">Nguồn</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Thời gian</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedMessages.map((message) => (
                                <TableRow
                                    key={message.id}
                                    hover
                                    sx={{
                                        backgroundColor: message.status === 'new' ? 'rgba(255, 193, 7, 0.1)' : 'inherit',
                                        fontWeight: message.status === 'new' ? 'bold' : 'normal'
                                    }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: getPriorityColor(message.priority) }}>
                                                {message.name.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {message.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {message.email}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {message.phone}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                {message.subject}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {message.message}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={getPriorityLabel(message.priority)}
                                            size="small"
                                            sx={{
                                                backgroundColor: getPriorityColor(message.priority),
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">
                                            {getSourceLabel(message.source)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={getStatusLabel(message.status)}
                                            color={getStatusColor(message.status) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">
                                            {new Date(message.receivedAt).toLocaleString('vi-VN')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={(e) => handleMenuOpen(e, message)}
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
                    count={filteredMessages.length}
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
                <MenuItem onClick={handleReply}>
                    <ReplyIcon sx={{ mr: 1 }} />
                    Trả lời
                </MenuItem>
                {selectedMessage?.status === 'new' && (
                    <MenuItem onClick={handleMarkAsRead}>
                        <ReadIcon sx={{ mr: 1 }} />
                        Đánh dấu đã đọc
                    </MenuItem>
                )}
                {selectedMessage?.status !== 'new' && (
                    <MenuItem onClick={handleMarkAsUnread}>
                        <UnreadIcon sx={{ mr: 1 }} />
                        Đánh dấu chưa đọc
                    </MenuItem>
                )}
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
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
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SubjectIcon />
                            Chi tiết tin nhắn
                        </Box>
                        <Chip
                            label={getStatusLabel(selectedMessage?.status || '')}
                            color={getStatusColor(selectedMessage?.status || '') as any}
                            size="small"
                        />
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {selectedMessage && (
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    {selectedMessage.subject}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">Tên:</Typography>
                                        <Typography variant="body1">{selectedMessage.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">Email:</Typography>
                                        <Typography variant="body1">{selectedMessage.email}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">Số điện thoại:</Typography>
                                        <Typography variant="body1">{selectedMessage.phone}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">Nguồn:</Typography>
                                        <Typography variant="body1">{getSourceLabel(selectedMessage.source)}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider />

                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Nội dung:</Typography>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {selectedMessage.message}
                                </Typography>
                            </Box>

                            {selectedMessage.reply && (
                                <>
                                    <Divider />
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            Phản hồi ({new Date(selectedMessage.repliedAt!).toLocaleString('vi-VN')}):
                                        </Typography>
                                        <Typography variant="body1" sx={{
                                            whiteSpace: 'pre-wrap',
                                            backgroundColor: '#f5f5f5',
                                            padding: 2,
                                            borderRadius: 1
                                        }}>
                                            {selectedMessage.reply}
                                        </Typography>
                                    </Box>
                                </>
                            )}

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" color="text.secondary">
                                    Nhận lúc: {new Date(selectedMessage.receivedAt).toLocaleString('vi-VN')}
                                </Typography>
                                <Chip
                                    label={getPriorityLabel(selectedMessage.priority)}
                                    size="small"
                                    sx={{
                                        backgroundColor: getPriorityColor(selectedMessage.priority),
                                        color: 'white'
                                    }}
                                />
                            </Box>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)}>Đóng</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setViewDialogOpen(false);
                            setReplyDialogOpen(true);
                        }}
                        startIcon={<ReplyIcon />}
                    >
                        Trả lời
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Reply Dialog */}
            <Dialog
                open={replyDialogOpen}
                onClose={() => setReplyDialogOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>Trả lời tin nhắn</DialogTitle>
                <DialogContent>
                    {selectedMessage && (
                        <Stack spacing={2}>
                            <Typography variant="body2" color="text.secondary">
                                Trả lời cho: <strong>{selectedMessage.name}</strong> ({selectedMessage.email})
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Chủ đề: <strong>{selectedMessage.subject}</strong>
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={6}
                                label="Nội dung trả lời"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Nhập nội dung trả lời..."
                            />
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setReplyDialogOpen(false)}>Hủy</Button>
                    <Button
                        variant="contained"
                        onClick={handleReplySubmit}
                        disabled={!replyText.trim()}
                    >
                        Gửi trả lời
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc chắn muốn xóa tin nhắn từ "{selectedMessage?.name}"?
                        Hành động này không thể hoàn tác.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InboxManagement;
