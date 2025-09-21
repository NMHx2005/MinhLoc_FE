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
    LinearProgress,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Call as CallIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Visibility as ViewIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Assignment as AssignIcon,
    Schedule as ScheduleIcon,
    Person as PersonIcon,
    Business as BusinessIcon,
    LocationOn as LocationIcon,
    AttachMoney as MoneyIcon,
    TrendingUp as ConversionIcon,
} from '@mui/icons-material';

interface ConsultationRequest {
    id: number;
    name: string;
    email: string;
    phone: string;
    company?: string;
    requestType: 'property_consultation' | 'ginseng_consultation' | 'investment_consultation' | 'partnership';
    subject: string;
    message: string;
    budget?: string;
    timeline?: string;
    location?: string;
    status: 'new' | 'contacted' | 'in_progress' | 'converted' | 'lost';
    priority: 'low' | 'medium' | 'high';
    source: 'contact_form' | 'phone_call' | 'email' | 'referral' | 'social_media';
    assignedTo?: string;
    createdAt: string;
    lastContactedAt?: string;
    notes: string;
    conversionValue?: number;
}

const ConsultationRequests: React.FC = () => {
    const [requests, setRequests] = useState<ConsultationRequest[]>([
        {
            id: 1,
            name: 'Nguyễn Văn Minh',
            email: 'nguyenvanminh@email.com',
            phone: '0901234567',
            company: 'Công ty TNHH ABC',
            requestType: 'property_consultation',
            subject: 'Tư vấn mua căn hộ cao cấp',
            message: 'Tôi đang tìm căn hộ 3PN khu vực quận 7, giá tầm 5-7 tỷ. Mong được tư vấn chi tiết.',
            budget: '5-7 tỷ VNĐ',
            timeline: '3-6 tháng',
            location: 'Quận 7, TP.HCM',
            status: 'new',
            priority: 'high',
            source: 'contact_form',
            createdAt: '2024-01-22T10:30:00',
            notes: 'Khách hàng tiềm năng cao, có nhu cầu thực tế'
        },
        {
            id: 2,
            name: 'Trần Thị Lan',
            email: 'tranthilan@gmail.com',
            phone: '0987654321',
            requestType: 'ginseng_consultation',
            subject: 'Hỏi về sản phẩm sâm cho người già',
            message: 'Gia đình tôi muốn mua sâm Ngọc Linh cho ông bà. Có loại nào phù hợp với người cao tuổi không?',
            budget: '2-3 triệu VNĐ',
            timeline: '1-2 tuần',
            status: 'contacted',
            priority: 'medium',
            source: 'phone_call',
            assignedTo: 'Nguyễn Thu Hương',
            createdAt: '2024-01-21T14:15:00',
            lastContactedAt: '2024-01-21T16:30:00',
            notes: 'Đã tư vấn qua điện thoại, khách quan tâm đến sâm tươi'
        },
        {
            id: 3,
            name: 'Lê Đức Thắng',
            email: 'leducthang@company.vn',
            phone: '0912345678',
            company: 'Tập đoàn XYZ Holdings',
            requestType: 'investment_consultation',
            subject: 'Hợp tác đầu tư dự án BDS',
            message: 'Công ty chúng tôi muốn tìm hiểu cơ hội đầu tư vào các dự án bất động sản quy mô lớn.',
            budget: '50-100 tỷ VNĐ',
            timeline: '6-12 tháng',
            location: 'TP.HCM và các tỉnh lân cận',
            status: 'in_progress',
            priority: 'high',
            source: 'referral',
            assignedTo: 'Phạm Minh Quân',
            createdAt: '2024-01-20T09:20:00',
            lastContactedAt: '2024-01-22T11:00:00',
            notes: 'Đã có cuộc họp ban đầu, cần chuẩn bị proposal chi tiết',
            conversionValue: 85000000000
        },
        {
            id: 4,
            name: 'Phạm Thu Hằng',
            email: 'phamthuhang@email.com',
            phone: '0965432198',
            requestType: 'ginseng_consultation',
            subject: 'Sâm cho người bệnh tiểu đường',
            message: 'Mẹ tôi bị tiểu đường, có thể dùng sâm được không? Loại nào an toàn?',
            budget: '1-2 triệu VNĐ',
            timeline: 'Càng sớm càng tốt',
            status: 'converted',
            priority: 'medium',
            source: 'social_media',
            assignedTo: 'Nguyễn Thu Hương',
            createdAt: '2024-01-19T16:45:00',
            lastContactedAt: '2024-01-20T10:15:00',
            notes: 'Đã bán được 2kg sâm tươi, khách hàng hài lòng',
            conversionValue: 2500000
        },
        {
            id: 5,
            name: 'Hoàng Minh Tuấn',
            email: 'hoangminhtuan@startup.io',
            phone: '0934567890',
            company: 'Startup Innovation',
            requestType: 'partnership',
            subject: 'Hợp tác phân phối sản phẩm sâm',
            message: 'Startup chúng tôi muốn hợp tác phân phối sản phẩm sâm qua kênh online.',
            timeline: '2-3 tháng',
            status: 'lost',
            priority: 'low',
            source: 'email',
            assignedTo: 'Trần Văn Dũng',
            createdAt: '2024-01-18T11:30:00',
            lastContactedAt: '2024-01-19T14:20:00',
            notes: 'Không phù hợp về mô hình kinh doanh'
        }
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [assignedTo, setAssignedTo] = useState('');

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [sourceFilter, setSourceFilter] = useState('all');

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, request: ConsultationRequest) => {
        setAnchorEl(event.currentTarget);
        setSelectedRequest(request);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRequest(null);
    };

    const handleView = () => {
        setViewDialogOpen(true);
        handleMenuClose();
    };

    const handleAssign = () => {
        setAssignDialogOpen(true);
        setAssignedTo(selectedRequest?.assignedTo || '');
        handleMenuClose();
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleStatusChange = (newStatus: ConsultationRequest['status']) => {
        if (selectedRequest) {
            setRequests(requests.map(req =>
                req.id === selectedRequest.id
                    ? {
                        ...req,
                        status: newStatus,
                        lastContactedAt: newStatus !== 'new' ? new Date().toISOString() : req.lastContactedAt
                    }
                    : req
            ));
        }
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedRequest) {
            setRequests(requests.filter(req => req.id !== selectedRequest.id));
            setDeleteDialogOpen(false);
            setSelectedRequest(null);
        }
    };

    const handleAssignSubmit = () => {
        if (selectedRequest && assignedTo.trim()) {
            setRequests(requests.map(req =>
                req.id === selectedRequest.id
                    ? { ...req, assignedTo: assignedTo }
                    : req
            ));
            setAssignDialogOpen(false);
            setAssignedTo('');
            setSelectedRequest(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'error';
            case 'contacted': return 'warning';
            case 'in_progress': return 'info';
            case 'converted': return 'success';
            case 'lost': return 'default';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'new': return 'Mới';
            case 'contacted': return 'Đã liên hệ';
            case 'in_progress': return 'Đang xử lý';
            case 'converted': return 'Thành công';
            case 'lost': return 'Thất bại';
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

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'property_consultation': return 'Tư vấn BDS';
            case 'ginseng_consultation': return 'Tư vấn sâm';
            case 'investment_consultation': return 'Tư vấn đầu tư';
            case 'partnership': return 'Hợp tác';
            default: return type;
        }
    };

    const getSourceLabel = (source: string) => {
        switch (source) {
            case 'contact_form': return 'Form liên hệ';
            case 'phone_call': return 'Điện thoại';
            case 'email': return 'Email';
            case 'referral': return 'Giới thiệu';
            case 'social_media': return 'Mạng xã hội';
            default: return source;
        }
    };

    // Filter requests
    const filteredRequests = requests.filter(request => {
        const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (request.company && request.company.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        const matchesType = typeFilter === 'all' || request.requestType === typeFilter;
        const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
        const matchesSource = sourceFilter === 'all' || request.source === sourceFilter;

        return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesSource;
    });

    const paginatedRequests = filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Calculate conversion stats
    const totalRequests = requests.length;
    const convertedRequests = requests.filter(r => r.status === 'converted').length;
    const conversionRate = totalRequests > 0 ? (convertedRequests / totalRequests) * 100 : 0;
    const totalValue = requests.filter(r => r.conversionValue).reduce((sum, r) => sum + (r.conversionValue || 0), 0);

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Yêu cầu Tư vấn ({filteredRequests.length})
                </Typography>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                                {requests.filter(r => r.status === 'new').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Yêu cầu mới
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800', mb: 1 }}>
                                {requests.filter(r => r.status === 'in_progress').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Đang xử lý
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 1 }}>
                                {convertedRequests}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Thành công
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0', mb: 1 }}>
                                {conversionRate.toFixed(1)}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tỷ lệ chuyển đổi
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Conversion Progress */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Tiến độ chuyển đổi khách hàng
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {convertedRequests}/{totalRequests} yêu cầu đã chuyển đổi thành công
                                </Typography>
                                <ConversionIcon sx={{ fontSize: 16, color: 'success.main' }} />
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={conversionRate}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#4caf50',
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                                    {(totalValue / 1000000000).toFixed(1)}B VNĐ
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tổng giá trị chuyển đổi
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm yêu cầu..."
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
                                    <MenuItem value="contacted">Đã liên hệ</MenuItem>
                                    <MenuItem value="in_progress">Đang xử lý</MenuItem>
                                    <MenuItem value="converted">Thành công</MenuItem>
                                    <MenuItem value="lost">Thất bại</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Loại yêu cầu</InputLabel>
                                <Select
                                    value={typeFilter}
                                    label="Loại yêu cầu"
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="property_consultation">Tư vấn BDS</MenuItem>
                                    <MenuItem value="ginseng_consultation">Tư vấn sâm</MenuItem>
                                    <MenuItem value="investment_consultation">Tư vấn đầu tư</MenuItem>
                                    <MenuItem value="partnership">Hợp tác</MenuItem>
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
                                    <MenuItem value="phone_call">Điện thoại</MenuItem>
                                    <MenuItem value="email">Email</MenuItem>
                                    <MenuItem value="referral">Giới thiệu</MenuItem>
                                    <MenuItem value="social_media">Mạng xã hội</MenuItem>
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
                                <TableCell>Yêu cầu</TableCell>
                                <TableCell align="center">Loại</TableCell>
                                <TableCell align="center">Ưu tiên</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Phân công</TableCell>
                                <TableCell align="center">Ngày tạo</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedRequests.map((request) => (
                                <TableRow
                                    key={request.id}
                                    hover
                                    sx={{
                                        backgroundColor: request.status === 'new' ? 'rgba(255, 193, 7, 0.1)' : 'inherit'
                                    }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: getPriorityColor(request.priority) }}>
                                                {request.company ? <BusinessIcon /> : <PersonIcon />}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {request.name}
                                                </Typography>
                                                {request.company && (
                                                    <Typography variant="caption" color="text.secondary">
                                                        {request.company}
                                                    </Typography>
                                                )}
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                    <EmailIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {request.email}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <PhoneIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {request.phone}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                {request.subject}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {request.message}
                                            </Typography>
                                            {request.budget && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                                    <MoneyIcon sx={{ fontSize: 12, color: 'success.main' }} />
                                                    <Typography variant="caption" color="success.main">
                                                        {request.budget}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">
                                            {getTypeLabel(request.requestType)}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {getSourceLabel(request.source)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={getPriorityLabel(request.priority)}
                                            size="small"
                                            sx={{
                                                backgroundColor: getPriorityColor(request.priority),
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={getStatusLabel(request.status)}
                                            color={getStatusColor(request.status) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">
                                            {request.assignedTo || '-'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">
                                            {new Date(request.createdAt).toLocaleDateString('vi-VN')}
                                        </Typography>
                                        {request.lastContactedAt && (
                                            <Typography variant="caption" color="text.secondary">
                                                Liên hệ: {new Date(request.lastContactedAt).toLocaleDateString('vi-VN')}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={(e) => handleMenuOpen(e, request)}
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
                    count={filteredRequests.length}
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
                <MenuItem onClick={handleAssign}>
                    <AssignIcon sx={{ mr: 1 }} />
                    Phân công
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('contacted')}>
                    <CallIcon sx={{ mr: 1 }} />
                    Đánh dấu đã liên hệ
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('in_progress')}>
                    <ScheduleIcon sx={{ mr: 1 }} />
                    Chuyển đang xử lý
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange('converted')}>
                    <ConversionIcon sx={{ mr: 1 }} />
                    Đánh dấu thành công
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
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
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        Chi tiết yêu cầu tư vấn
                        <Chip
                            label={getStatusLabel(selectedRequest?.status || '')}
                            color={getStatusColor(selectedRequest?.status || '') as any}
                            size="small"
                        />
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {selectedRequest && (
                        <Stack spacing={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">Khách hàng:</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {selectedRequest.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">Công ty:</Typography>
                                    <Typography variant="body1">
                                        {selectedRequest.company || '-'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">Email:</Typography>
                                    <Typography variant="body1">{selectedRequest.email}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">Điện thoại:</Typography>
                                    <Typography variant="body1">{selectedRequest.phone}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">Loại yêu cầu:</Typography>
                                    <Typography variant="body1">{getTypeLabel(selectedRequest.requestType)}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">Nguồn:</Typography>
                                    <Typography variant="body1">{getSourceLabel(selectedRequest.source)}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Chủ đề:</Typography>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    {selectedRequest.subject}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Nội dung:</Typography>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {selectedRequest.message}
                                </Typography>
                            </Box>

                            <Divider />

                            <Grid container spacing={2}>
                                {selectedRequest.budget && (
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">Ngân sách:</Typography>
                                        <Typography variant="body1">{selectedRequest.budget}</Typography>
                                    </Grid>
                                )}
                                {selectedRequest.timeline && (
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">Thời gian:</Typography>
                                        <Typography variant="body1">{selectedRequest.timeline}</Typography>
                                    </Grid>
                                )}
                                {selectedRequest.location && (
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">Địa điểm:</Typography>
                                        <Typography variant="body1">{selectedRequest.location}</Typography>
                                    </Grid>
                                )}
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">Phân công:</Typography>
                                    <Typography variant="body1">{selectedRequest.assignedTo || 'Chưa phân công'}</Typography>
                                </Grid>
                            </Grid>

                            {selectedRequest.notes && (
                                <>
                                    <Divider />
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Ghi chú:</Typography>
                                        <Typography variant="body1" sx={{
                                            backgroundColor: '#f5f5f5',
                                            padding: 2,
                                            borderRadius: 1
                                        }}>
                                            {selectedRequest.notes}
                                        </Typography>
                                    </Box>
                                </>
                            )}

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="caption" color="text.secondary">
                                    Tạo lúc: {new Date(selectedRequest.createdAt).toLocaleString('vi-VN')}
                                </Typography>
                                <Chip
                                    label={getPriorityLabel(selectedRequest.priority)}
                                    size="small"
                                    sx={{
                                        backgroundColor: getPriorityColor(selectedRequest.priority),
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
                            setAssignDialogOpen(true);
                        }}
                        startIcon={<AssignIcon />}
                    >
                        Phân công
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Assign Dialog */}
            <Dialog
                open={assignDialogOpen}
                onClose={() => setAssignDialogOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>Phân công xử lý</DialogTitle>
                <DialogContent>
                    {selectedRequest && (
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Phân công yêu cầu: <strong>{selectedRequest.subject}</strong>
                            </Typography>
                            <FormControl fullWidth>
                                <InputLabel>Nhân viên xử lý</InputLabel>
                                <Select
                                    value={assignedTo}
                                    label="Nhân viên xử lý"
                                    onChange={(e) => setAssignedTo(e.target.value)}
                                >
                                    <MenuItem value="">Chưa phân công</MenuItem>
                                    <MenuItem value="Nguyễn Thu Hương">Nguyễn Thu Hương</MenuItem>
                                    <MenuItem value="Phạm Minh Quân">Phạm Minh Quân</MenuItem>
                                    <MenuItem value="Trần Văn Dũng">Trần Văn Dũng</MenuItem>
                                    <MenuItem value="Lê Thị Mai">Lê Thị Mai</MenuItem>
                                    <MenuItem value="Hoàng Văn Nam">Hoàng Văn Nam</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAssignDialogOpen(false)}>Hủy</Button>
                    <Button
                        variant="contained"
                        onClick={handleAssignSubmit}
                        disabled={!assignedTo.trim()}
                    >
                        Phân công
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
                        Bạn có chắc chắn muốn xóa yêu cầu từ "{selectedRequest?.name}"?
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

export default ConsultationRequests;
