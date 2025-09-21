'use client'

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Avatar,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Login as LoginIcon,
    Logout as LogoutIcon,
    Security as SecurityIcon,
    Article as ArticleIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    Error as ErrorIcon,
    Warning as WarningIcon,
    Info as InfoIcon,
    CheckCircle as SuccessIcon,
    History as HistoryIcon,
} from '@mui/icons-material';

interface ActivityLog {
    id: number;
    userId: number;
    userName: string;
    userAvatar: string;
    action: string;
    resource: string;
    resourceId?: number;
    description: string;
    details: string;
    ipAddress: string;
    userAgent: string;
    status: 'success' | 'error' | 'warning' | 'info';
    timestamp: string;
    category: 'auth' | 'content' | 'user' | 'system' | 'security';
}

const ActivityLogs: React.FC = () => {
    const [logs] = useState<ActivityLog[]>([
        {
            id: 1,
            userId: 1,
            userName: 'Nguyễn Văn Admin',
            userAvatar: '/placeholder-admin.jpg',
            action: 'CREATE',
            resource: 'Article',
            resourceId: 15,
            description: 'Tạo bài viết mới "Xu hướng BDS 2024"',
            details: 'Tạo bài viết trong danh mục "Thị trường BDS" với trạng thái "Published"',
            ipAddress: '192.168.1.100',
            userAgent: 'Chrome 120.0.0.0',
            status: 'success',
            timestamp: '2024-01-22T14:30:25Z',
            category: 'content'
        },
        {
            id: 2,
            userId: 2,
            userName: 'Trần Thị Editor',
            userAvatar: '/placeholder-editor.jpg',
            action: 'UPDATE',
            resource: 'User',
            resourceId: 5,
            description: 'Cập nhật thông tin khách hàng',
            details: 'Thay đổi trạng thái từ "inactive" thành "active" cho khách hàng Hoàng Đức Support',
            ipAddress: '192.168.1.101',
            userAgent: 'Firefox 121.0.0.0',
            status: 'success',
            timestamp: '2024-01-22T13:45:12Z',
            category: 'user'
        },
        {
            id: 3,
            userId: 1,
            userName: 'Nguyễn Văn Admin',
            userAvatar: '/placeholder-admin.jpg',
            action: 'LOGIN',
            resource: 'System',
            description: 'Đăng nhập hệ thống',
            details: 'Đăng nhập thành công vào admin panel',
            ipAddress: '192.168.1.100',
            userAgent: 'Chrome 120.0.0.0',
            status: 'success',
            timestamp: '2024-01-22T09:15:33Z',
            category: 'auth'
        },
        {
            id: 4,
            userId: 3,
            userName: 'Lê Minh Viewer',
            userAvatar: '/placeholder-viewer.jpg',
            action: 'VIEW',
            resource: 'Analytics',
            description: 'Xem báo cáo thống kê',
            details: 'Truy cập trang Analytics để xem báo cáo traffic 7 ngày qua',
            ipAddress: '192.168.1.102',
            userAgent: 'Safari 17.2.0',
            status: 'success',
            timestamp: '2024-01-22T11:20:45Z',
            category: 'content'
        },
        {
            id: 5,
            userId: 2,
            userName: 'Trần Thị Editor',
            userAvatar: '/placeholder-editor.jpg',
            action: 'DELETE',
            resource: 'Article',
            resourceId: 12,
            description: 'Xóa bài viết cũ',
            details: 'Xóa bài viết "Chính sách cũ" do nội dung đã lỗi thời',
            ipAddress: '192.168.1.101',
            userAgent: 'Firefox 121.0.0.0',
            status: 'warning',
            timestamp: '2024-01-21T16:30:22Z',
            category: 'content'
        },
        {
            id: 6,
            userId: 4,
            userName: 'Phạm Thu Content',
            userAvatar: '/placeholder-content.jpg',
            action: 'LOGIN_FAILED',
            resource: 'System',
            description: 'Đăng nhập thất bại',
            details: 'Sai mật khẩu - Tài khoản tạm khóa 15 phút',
            ipAddress: '192.168.1.105',
            userAgent: 'Chrome 120.0.0.0',
            status: 'error',
            timestamp: '2024-01-21T10:45:15Z',
            category: 'security'
        },
        {
            id: 7,
            userId: 1,
            userName: 'Nguyễn Văn Admin',
            userAvatar: '/placeholder-admin.jpg',
            action: 'UPDATE',
            resource: 'Settings',
            description: 'Cập nhật cài đặt SEO',
            details: 'Thay đổi meta description cho trang chủ và cập nhật Google Analytics ID',
            ipAddress: '192.168.1.100',
            userAgent: 'Chrome 120.0.0.0',
            status: 'success',
            timestamp: '2024-01-21T14:22:10Z',
            category: 'system'
        },
        {
            id: 8,
            userId: 5,
            userName: 'Hoàng Đức Support',
            userAvatar: '/placeholder-support.jpg',
            action: 'VIEW',
            resource: 'Customer',
            resourceId: 3,
            description: 'Xem hồ sơ khách hàng',
            details: 'Truy cập thông tin chi tiết khách hàng Lê Minh Cường để hỗ trợ',
            ipAddress: '192.168.1.103',
            userAgent: 'Edge 120.0.0.0',
            status: 'info',
            timestamp: '2024-01-21T09:30:55Z',
            category: 'user'
        },
        {
            id: 9,
            userId: 2,
            userName: 'Trần Thị Editor',
            userAvatar: '/placeholder-editor.jpg',
            action: 'CREATE',
            resource: 'Banner',
            description: 'Tạo banner quảng cáo mới',
            details: 'Tạo banner "Khuyến mãi sâm Ngọc Linh" cho trang chủ',
            ipAddress: '192.168.1.101',
            userAgent: 'Firefox 121.0.0.0',
            status: 'success',
            timestamp: '2024-01-20T15:45:30Z',
            category: 'content'
        },
        {
            id: 10,
            userId: 1,
            userName: 'Nguyễn Văn Admin',
            userAvatar: '/placeholder-admin.jpg',
            action: 'BACKUP',
            resource: 'System',
            description: 'Sao lưu dữ liệu hệ thống',
            details: 'Thực hiện sao lưu tự động database và files hàng tuần',
            ipAddress: '192.168.1.100',
            userAgent: 'System Task',
            status: 'success',
            timestamp: '2024-01-20T02:00:00Z',
            category: 'system'
        }
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [actionFilter, setActionFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewDetail = (log: ActivityLog) => {
        setSelectedLog(log);
        setDetailDialogOpen(true);
    };

    const getActionIcon = (action: string, category: string) => {
        if (action.includes('LOGIN')) return <LoginIcon />;
        if (action.includes('LOGOUT')) return <LogoutIcon />;
        if (action === 'CREATE') return <AddIcon />;
        if (action === 'UPDATE') return <EditIcon />;
        if (action === 'DELETE') return <DeleteIcon />;
        if (action === 'VIEW') return <ViewIcon />;

        switch (category) {
            case 'auth': return <SecurityIcon />;
            case 'content': return <ArticleIcon />;
            case 'user': return <PeopleIcon />;
            case 'system': return <SettingsIcon />;
            case 'security': return <SecurityIcon />;
            default: return <InfoIcon />;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success': return <SuccessIcon sx={{ color: '#4caf50' }} />;
            case 'error': return <ErrorIcon sx={{ color: '#f44336' }} />;
            case 'warning': return <WarningIcon sx={{ color: '#ff9800' }} />;
            case 'info': return <InfoIcon sx={{ color: '#2196f3' }} />;
            default: return <InfoIcon />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'success';
            case 'error': return 'error';
            case 'warning': return 'warning';
            case 'info': return 'info';
            default: return 'default';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'auth': return '#9c27b0';
            case 'content': return '#2196f3';
            case 'user': return '#4caf50';
            case 'system': return '#ff9800';
            case 'security': return '#f44336';
            default: return '#757575';
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'auth': return 'Xác thực';
            case 'content': return 'Nội dung';
            case 'user': return 'Người dùng';
            case 'system': return 'Hệ thống';
            case 'security': return 'Bảo mật';
            default: return category;
        }
    };

    // Filter logs
    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.resource.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAction = actionFilter === 'all' || log.action === actionFilter;
        const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || log.status === statusFilter;

        return matchesSearch && matchesAction && matchesCategory && matchesStatus;
    });

    const paginatedLogs = filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const uniqueActions = [...new Set(logs.map(l => l.action))];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Lịch sử Hoạt động ({filteredLogs.length})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Theo dõi tất cả hoạt động của người dùng trong hệ thống
                </Typography>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={2.4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2196f3', mb: 1 }}>
                                {logs.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tổng hoạt động
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={2.4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 1 }}>
                                {logs.filter(l => l.status === 'success').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Thành công
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={2.4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f44336', mb: 1 }}>
                                {logs.filter(l => l.status === 'error').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lỗi
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={2.4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800', mb: 1 }}>
                                {logs.filter(l => l.status === 'warning').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Cảnh báo
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={2.4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0', mb: 1 }}>
                                {new Set(logs.map(l => l.userId)).size}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Người dùng hoạt động
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
                                placeholder="Tìm kiếm hoạt động..."
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
                        <Grid item xs={12} md={2.25}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Hành động</InputLabel>
                                <Select
                                    value={actionFilter}
                                    label="Hành động"
                                    onChange={(e) => setActionFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    {uniqueActions.map(action => (
                                        <MenuItem key={action} value={action}>{action}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2.25}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Danh mục</InputLabel>
                                <Select
                                    value={categoryFilter}
                                    label="Danh mục"
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="auth">Xác thực</MenuItem>
                                    <MenuItem value="content">Nội dung</MenuItem>
                                    <MenuItem value="user">Người dùng</MenuItem>
                                    <MenuItem value="system">Hệ thống</MenuItem>
                                    <MenuItem value="security">Bảo mật</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2.25}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Trạng thái</InputLabel>
                                <Select
                                    value={statusFilter}
                                    label="Trạng thái"
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="success">Thành công</MenuItem>
                                    <MenuItem value="error">Lỗi</MenuItem>
                                    <MenuItem value="warning">Cảnh báo</MenuItem>
                                    <MenuItem value="info">Thông tin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2.25}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<FilterIcon />}
                                onClick={() => {
                                    setSearchTerm('');
                                    setActionFilter('all');
                                    setCategoryFilter('all');
                                    setStatusFilter('all');
                                }}
                                size="small"
                            >
                                Xóa bộ lọc
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Logs Table */}
            <Card>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Người dùng</TableCell>
                                <TableCell>Hành động</TableCell>
                                <TableCell>Tài nguyên</TableCell>
                                <TableCell>Mô tả</TableCell>
                                <TableCell align="center">Danh mục</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Thời gian</TableCell>
                                <TableCell align="center">Chi tiết</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedLogs.map((log) => (
                                <TableRow key={log.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                src={log.userAvatar}
                                                alt={log.userName}
                                                sx={{ width: 40, height: 40 }}
                                            >
                                                {log.userName.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {log.userName}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    ID: {log.userId}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {getActionIcon(log.action, log.category)}
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {log.action}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {log.resource}
                                            {log.resourceId && (
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                                    ID: {log.resourceId}
                                                </Typography>
                                            )}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {log.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={getCategoryLabel(log.category)}
                                            size="small"
                                            sx={{
                                                backgroundColor: getCategoryColor(log.category),
                                                color: 'white',
                                                fontWeight: 600
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                            {getStatusIcon(log.status)}
                                            <Chip
                                                label={log.status}
                                                color={getStatusColor(log.status) as any}
                                                size="small"
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">
                                            {new Date(log.timestamp).toLocaleString('vi-VN')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => handleViewDetail(log)}
                                            size="small"
                                            color="primary"
                                        >
                                            <ViewIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={filteredLogs.length}
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

            {/* Detail Dialog */}
            <Dialog
                open={detailDialogOpen}
                onClose={() => setDetailDialogOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HistoryIcon sx={{ color: '#E7C873' }} />
                    Chi tiết Hoạt động
                </DialogTitle>

                <DialogContent>
                    {selectedLog && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Người thực hiện
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Avatar src={selectedLog.userAvatar} alt={selectedLog.userName}>
                                        {selectedLog.userName.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {selectedLog.userName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            User ID: {selectedLog.userId}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Thời gian
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    {new Date(selectedLog.timestamp).toLocaleString('vi-VN')}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Hành động
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    {getActionIcon(selectedLog.action, selectedLog.category)}
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {selectedLog.action} - {selectedLog.resource}
                                        {selectedLog.resourceId && ` (ID: ${selectedLog.resourceId})`}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Mô tả
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    {selectedLog.description}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Chi tiết
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    {selectedLog.details}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Danh mục
                                </Typography>
                                <Chip
                                    label={getCategoryLabel(selectedLog.category)}
                                    sx={{
                                        backgroundColor: getCategoryColor(selectedLog.category),
                                        color: 'white',
                                        fontWeight: 600,
                                        mb: 2
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Trạng thái
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    {getStatusIcon(selectedLog.status)}
                                    <Chip
                                        label={selectedLog.status}
                                        color={getStatusColor(selectedLog.status) as any}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Địa chỉ IP
                                </Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 2 }}>
                                    {selectedLog.ipAddress}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    User Agent
                                </Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 2 }}>
                                    {selectedLog.userAgent}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setDetailDialogOpen(false)}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ActivityLogs;
