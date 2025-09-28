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
    Tabs,
    Tab,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Email as EmailIcon,
    Refresh as RefreshIcon,
    Send as SendIcon,
    Campaign as CampaignIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import { useNewsletterSubscribers, useNewsletterCampaigns } from '../../hooks/useContacts';
import { type NewsletterSubscriber, type NewsletterCampaign } from '../../services/admin/contactService';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`newsletter-tabpanel-${index}`}
            aria-labelledby={`newsletter-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const NewsletterManagement: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItem, setSelectedItem] = useState<NewsletterSubscriber | NewsletterCampaign | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Subscribers hook
    const {
        subscribers,
        loading: subscribersLoading,
        error: subscribersError,
        total: subscribersTotal,
        deleteSubscriber,
        setPage: setSubscribersPage,
        setLimit: setSubscribersLimit,
        fetchSubscribers,
    } = useNewsletterSubscribers({
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm,
        status: statusFilter,
    });

    // Campaigns hook
    const {
        campaigns,
        loading: campaignsLoading,
        error: campaignsError,
        total: campaignsTotal,
        sendCampaign,
        setPage: setCampaignsPage,
        setLimit: setCampaignsLimit,
        fetchCampaigns,
    } = useNewsletterCampaigns({
        page: page + 1,
        limit: rowsPerPage,
        search: searchTerm,
        status: statusFilter,
    });

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setPage(0);
        setSearchTerm('');
        setStatusFilter('');
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
        if (tabValue === 0) {
            setSubscribersPage(newPage + 1);
        } else {
            setCampaignsPage(newPage + 1);
        }
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        if (tabValue === 0) {
            setSubscribersLimit(newRowsPerPage);
        } else {
            setCampaignsLimit(newRowsPerPage);
        }
        setPage(0);
        if (tabValue === 0) {
            setSubscribersPage(1);
        } else {
            setCampaignsPage(1);
        }
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, item: NewsletterSubscriber | NewsletterCampaign) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedItem(null);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedItem) {
            try {
                if (tabValue === 0) {
                    await deleteSubscriber(selectedItem._id);
                }
                setDeleteDialogOpen(false);
                handleMenuClose();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleSendCampaign = async () => {
        if (selectedItem && tabValue === 1) {
            try {
                await sendCampaign(selectedItem._id);
                handleMenuClose();
            } catch (error) {
                console.error('Error sending campaign:', error);
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'success';
            case 'unsubscribed': return 'warning';
            case 'bounced': return 'error';
            case 'draft': return 'default';
            case 'scheduled': return 'info';
            case 'sending': return 'warning';
            case 'sent': return 'success';
            case 'failed': return 'error';
            default: return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active': return 'Hoạt động';
            case 'unsubscribed': return 'Hủy đăng ký';
            case 'bounced': return 'Bị trả lại';
            case 'draft': return 'Bản nháp';
            case 'scheduled': return 'Đã lên lịch';
            case 'sending': return 'Đang gửi';
            case 'sent': return 'Đã gửi';
            case 'failed': return 'Thất bại';
            default: return status;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN');
    };

    const currentLoading = tabValue === 0 ? subscribersLoading : campaignsLoading;
    const currentError = tabValue === 0 ? subscribersError : campaignsError;
    const currentTotal = tabValue === 0 ? subscribersTotal : campaignsTotal;

    if (currentLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {currentError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {currentError}
                </Alert>
            )}

            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                    Quản lý Newsletter ({currentTotal})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        // TODO: Open create dialog
                        console.log('Create newsletter item');
                    }}
                >
                    {tabValue === 0 ? 'Thêm đăng ký' : 'Tạo chiến dịch'}
                </Button>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab
                        label={`Đăng ký nhận tin (${subscribersTotal})`}
                        icon={<PeopleIcon />}
                        iconPosition="start"
                    />
                    <Tab
                        label={`Chiến dịch (${campaignsTotal})`}
                        icon={<CampaignIcon />}
                        iconPosition="start"
                    />
                </Tabs>
            </Box>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                placeholder={tabValue === 0 ? "Tìm kiếm theo email, tên..." : "Tìm kiếm theo tên chiến dịch..."}
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
                                    {tabValue === 0 ? [
                                        <MenuItem key="active" value="active">Hoạt động</MenuItem>,
                                        <MenuItem key="unsubscribed" value="unsubscribed">Hủy đăng ký</MenuItem>,
                                        <MenuItem key="bounced" value="bounced">Bị trả lại</MenuItem>
                                    ] : [
                                        <MenuItem key="draft" value="draft">Bản nháp</MenuItem>,
                                        <MenuItem key="scheduled" value="scheduled">Đã lên lịch</MenuItem>,
                                        <MenuItem key="sending" value="sending">Đang gửi</MenuItem>,
                                        <MenuItem key="sent" value="sent">Đã gửi</MenuItem>,
                                        <MenuItem key="failed" value="failed">Thất bại</MenuItem>
                                    ]}
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
                                    if (tabValue === 0) {
                                        fetchSubscribers();
                                    } else {
                                        fetchCampaigns();
                                    }
                                }}
                                fullWidth
                            >
                                Làm mới
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Subscribers Tab */}
            <TabPanel value={tabValue} index={0}>
                <Card>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Tên</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell>Nguồn</TableCell>
                                    <TableCell>Ngày đăng ký</TableCell>
                                    <TableCell>Thao tác</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(subscribers || []).map((subscriber: NewsletterSubscriber) => (
                                    <TableRow key={subscriber._id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                <Typography variant="body2">
                                                    {subscriber.email}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {subscriber.name || 'Không có'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={getStatusText(subscriber.status)}
                                                color={getStatusColor(subscriber.status) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {subscriber.source}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {formatDate(subscriber.subscribedAt)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={(e) => handleMenuClick(e, subscriber)}
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
                        count={subscribersTotal}
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
            </TabPanel>

            {/* Campaigns Tab */}
            <TabPanel value={tabValue} index={1}>
                <Card>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên chiến dịch</TableCell>
                                    <TableCell>Chủ đề</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell>Người nhận</TableCell>
                                    <TableCell>Tỷ lệ mở</TableCell>
                                    <TableCell>Ngày tạo</TableCell>
                                    <TableCell>Thao tác</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(campaigns || []).map((campaign: NewsletterCampaign) => (
                                    <TableRow key={campaign._id} hover>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {campaign.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {campaign.subject}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={getStatusText(campaign.status)}
                                                color={getStatusColor(campaign.status) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {campaign.recipientCount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {campaign.recipientCount > 0
                                                    ? `${((campaign.openCount / campaign.recipientCount) * 100).toFixed(1)}%`
                                                    : '0%'
                                                }
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {formatDate(campaign.createdAt)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={(e) => handleMenuClick(e, campaign)}
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
                        count={campaignsTotal}
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
            </TabPanel>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {tabValue === 0 ? (
                    <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                        <DeleteIcon sx={{ mr: 1 }} />
                        Xóa đăng ký
                    </MenuItem>
                ) : [
                    <MenuItem key="send" onClick={handleSendCampaign}>
                        <SendIcon sx={{ mr: 1 }} />
                        Gửi chiến dịch
                    </MenuItem>,
                    <MenuItem key="delete" onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                        <DeleteIcon sx={{ mr: 1 }} />
                        Xóa chiến dịch
                    </MenuItem>
                ]}
            </Menu>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa {tabValue === 0 ? 'đăng ký' : 'chiến dịch'} này?
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

export default NewsletterManagement;