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
    Chip,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    Grid,
    CircularProgress,
    Alert,
    IconButton,
    Tooltip,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import {
    Search as SearchIcon,
    Refresh as RefreshIcon,
    DeleteSweep as CleanupIcon,
    History as HistoryIcon,
    Person as PersonIcon,
    Security as SecurityIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import { useActivityLogs } from '../../hooks/useUsers';

const ActivityLogs: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [actionFilter, setActionFilter] = useState('');
    const [resourceFilter, setResourceFilter] = useState('');
    const [cleanupDialogOpen, setCleanupDialogOpen] = useState(false);

    // Use the existing hook
    const {
        logs,
        loading,
        error,
        total,
        setPage: setApiPage,
        setLimit: setApiLimit,
        cleanupLogs,
    } = useActivityLogs({
        page: page + 1,
        limit: rowsPerPage,
        action: actionFilter,
        resource: resourceFilter,
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

    const handleCleanupClick = () => {
        setCleanupDialogOpen(true);
    };

    const handleCleanupConfirm = async () => {
        try {
            await cleanupLogs();
            setCleanupDialogOpen(false);
        } catch (error) {
            console.error('Error cleaning up logs:', error);
        }
    };

    const getActionColor = (action: string) => {
        switch (action.toLowerCase()) {
            case 'create': return 'success';
            case 'update': return 'warning';
            case 'delete': return 'error';
            case 'login': return 'info';
            case 'logout': return 'default';
            default: return 'primary';
        }
    };

    const getActionIcon = (action: string) => {
        switch (action.toLowerCase()) {
            case 'create': return <EditIcon />;
            case 'update': return <EditIcon />;
            case 'delete': return <CleanupIcon />;
            case 'login': return <PersonIcon />;
            case 'logout': return <PersonIcon />;
            default: return <HistoryIcon />;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN');
    };

    const formatIPAddress = (ip: string) => {
        // Mask last octet for privacy
        const parts = ip.split('.');
        if (parts.length === 4) {
            return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
        }
        return ip;
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
                    Lịch sử Hoạt động ({total})
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Làm mới">
                        <IconButton onClick={() => window.location.reload()}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                    <Button
                        variant="outlined"
                        startIcon={<CleanupIcon />}
                        onClick={handleCleanupClick}
                        color="warning"
                    >
                        Dọn dẹp
                    </Button>
                </Box>
            </Box>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm theo người dùng, hành động..."
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
                                <InputLabel>Hành động</InputLabel>
                                <Select
                                    value={actionFilter}
                                    onChange={(e) => setActionFilter(e.target.value)}
                                    label="Hành động"
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    <MenuItem value="create">Tạo mới</MenuItem>
                                    <MenuItem value="update">Cập nhật</MenuItem>
                                    <MenuItem value="delete">Xóa</MenuItem>
                                    <MenuItem value="login">Đăng nhập</MenuItem>
                                    <MenuItem value="logout">Đăng xuất</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Tài nguyên</InputLabel>
                                <Select
                                    value={resourceFilter}
                                    onChange={(e) => setResourceFilter(e.target.value)}
                                    label="Tài nguyên"
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    <MenuItem value="user">Người dùng</MenuItem>
                                    <MenuItem value="role">Vai trò</MenuItem>
                                    <MenuItem value="permission">Quyền</MenuItem>
                                    <MenuItem value="auth">Xác thực</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button
                                variant="outlined"
                                startIcon={<RefreshIcon />}
                                onClick={() => {
                                    setSearchTerm('');
                                    setActionFilter('');
                                    setResourceFilter('');
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
                                <TableCell>Hành động</TableCell>
                                <TableCell>Tài nguyên</TableCell>
                                <TableCell>Chi tiết</TableCell>
                                <TableCell>Người dùng</TableCell>
                                <TableCell>IP Address</TableCell>
                                <TableCell>Thời gian</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow key={log._id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {getActionIcon(log.action)}
                                            <Chip
                                                label={log.action}
                                                color={getActionColor(log.action) as any}
                                                size="small"
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <SecurityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            <Typography variant="body2">
                                                {log.resource}
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                            ID: {log.resourceId}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ maxWidth: 200 }}>
                                            {log.details?.description || log.details?.message || 'Không có chi tiết'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {log.userId}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                            {formatIPAddress(log.ipAddress)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {formatDate(log.timestamp)}
                                        </Typography>
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

            {/* Cleanup Confirmation Dialog */}
            <Dialog
                open={cleanupDialogOpen}
                onClose={() => setCleanupDialogOpen(false)}
            >
                <DialogTitle>Xác nhận dọn dẹp</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn dọn dẹp lịch sử hoạt động?
                        Hành động này sẽ xóa các bản ghi cũ và không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCleanupDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleCleanupConfirm} color="warning" variant="contained">
                        Dọn dẹp
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ActivityLogs;
