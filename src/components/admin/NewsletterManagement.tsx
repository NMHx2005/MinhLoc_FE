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
    Tabs,
    Tab,
    Stack,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Email as EmailIcon,
    Send as SendIcon,
    Block as BlockIcon,
    Campaign as CampaignIcon,
    Group as GroupIcon,
    TrendingUp as StatsIcon,
} from '@mui/icons-material';

interface Subscriber {
    id: number;
    email: string;
    name?: string;
    status: 'active' | 'unsubscribed' | 'bounced';
    subscribedAt: string;
    lastEmailSent?: string;
    source: 'website_footer' | 'popup' | 'manual' | 'import';
    interests: string[];
}

interface Campaign {
    id: number;
    name: string;
    subject: string;
    content: string;
    status: 'draft' | 'sent' | 'scheduled';
    sentAt?: string;
    scheduledAt?: string;
    recipients: number;
    openRate: number;
    clickRate: number;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`newsletter-tabpanel-${index}`}
            aria-labelledby={`newsletter-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

const NewsletterManagement: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);

    const [subscribers, setSubscribers] = useState<Subscriber[]>([
        {
            id: 1,
            email: 'nguyenvana@email.com',
            name: 'Nguyễn Văn A',
            status: 'active',
            subscribedAt: '2024-01-15T10:30:00',
            lastEmailSent: '2024-01-20T14:00:00',
            source: 'website_footer',
            interests: ['BDS', 'Sâm Ngọc Linh']
        },
        {
            id: 2,
            email: 'tranthibinh@gmail.com',
            name: 'Trần Thị Bình',
            status: 'active',
            subscribedAt: '2024-01-12T09:15:00',
            lastEmailSent: '2024-01-20T14:00:00',
            source: 'popup',
            interests: ['Sâm Hàn Quốc', 'Sức khỏe']
        },
        {
            id: 3,
            email: 'leminhcuong@company.vn',
            status: 'unsubscribed',
            subscribedAt: '2023-12-20T16:45:00',
            lastEmailSent: '2024-01-15T10:00:00',
            source: 'manual',
            interests: ['BDS thương mại']
        },
        {
            id: 4,
            email: 'phamthuhuong@email.com',
            name: 'Phạm Thu Hương',
            status: 'bounced',
            subscribedAt: '2024-01-08T11:20:00',
            source: 'website_footer',
            interests: ['Sâm', 'Căn hộ']
        },
        {
            id: 5,
            email: 'hoangducthang@startup.io',
            name: 'Hoàng Đức Thắng',
            status: 'active',
            subscribedAt: '2023-11-25T14:30:00',
            lastEmailSent: '2024-01-20T14:00:00',
            source: 'import',
            interests: ['BDS văn phòng', 'Sâm cao cấp']
        }
    ]);

    const [campaigns, setCampaigns] = useState<Campaign[]>([
        {
            id: 1,
            name: 'Newsletter tháng 1/2024',
            subject: 'Cập nhật thị trường BDS và sản phẩm sâm mới',
            content: 'Nội dung newsletter về xu hướng BDS và các sản phẩm sâm mới...',
            status: 'sent',
            sentAt: '2024-01-20T14:00:00',
            recipients: 156,
            openRate: 65.4,
            clickRate: 12.8
        },
        {
            id: 2,
            name: 'Khuyến mãi cuối năm',
            subject: 'Ưu đãi đặc biệt sâm Ngọc Linh - Giảm 20%',
            content: 'Chương trình khuyến mãi cuối năm cho sản phẩm sâm...',
            status: 'sent',
            sentAt: '2023-12-25T09:00:00',
            recipients: 143,
            openRate: 72.1,
            clickRate: 18.5
        },
        {
            id: 3,
            name: 'Newsletter tháng 2/2024',
            subject: 'Dự án BDS mới và tin tức sâm Hàn Quốc',
            content: 'Nội dung draft cho newsletter tháng 2...',
            status: 'draft',
            recipients: 0,
            openRate: 0,
            clickRate: 0
        }
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItem, setSelectedItem] = useState<Subscriber | Campaign | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [addSubscriberDialogOpen, setAddSubscriberDialogOpen] = useState(false);
    const [newSubscriberEmail, setNewSubscriberEmail] = useState('');
    const [newSubscriberName, setNewSubscriberName] = useState('');

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sourceFilter, setSourceFilter] = useState('all');

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setPage(0);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: Subscriber | Campaign) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedItem(null);
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedItem) {
            if (tabValue === 0) {
                setSubscribers(subscribers.filter(sub => sub.id !== selectedItem.id));
            } else {
                setCampaigns(campaigns.filter(camp => camp.id !== selectedItem.id));
            }
            setDeleteDialogOpen(false);
            setSelectedItem(null);
        }
    };

    const handleAddSubscriber = () => {
        if (newSubscriberEmail.trim()) {
            const newSubscriber: Subscriber = {
                id: Math.max(...subscribers.map(s => s.id)) + 1,
                email: newSubscriberEmail,
                name: newSubscriberName || undefined,
                status: 'active',
                subscribedAt: new Date().toISOString(),
                source: 'manual',
                interests: []
            };
            setSubscribers([...subscribers, newSubscriber]);
            setAddSubscriberDialogOpen(false);
            setNewSubscriberEmail('');
            setNewSubscriberName('');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'success';
            case 'unsubscribed': return 'warning';
            case 'bounced': return 'error';
            case 'sent': return 'success';
            case 'draft': return 'default';
            case 'scheduled': return 'info';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Hoạt động';
            case 'unsubscribed': return 'Hủy đăng ký';
            case 'bounced': return 'Lỗi email';
            case 'sent': return 'Đã gửi';
            case 'draft': return 'Bản nháp';
            case 'scheduled': return 'Đã lên lịch';
            default: return status;
        }
    };

    const getSourceLabel = (source: string) => {
        switch (source) {
            case 'website_footer': return 'Footer website';
            case 'popup': return 'Popup';
            case 'manual': return 'Thêm thủ công';
            case 'import': return 'Import file';
            default: return source;
        }
    };

    // Filter data based on current tab
    const filteredSubscribers = subscribers.filter(subscriber => {
        const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (subscriber.name && subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
        const matchesSource = sourceFilter === 'all' || subscriber.source === sourceFilter;

        return matchesSearch && matchesStatus && matchesSource;
    });

    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const currentData = tabValue === 0 ? filteredSubscribers : filteredCampaigns;
    const paginatedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Quản lý Email Marketing
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        if (tabValue === 0) {
                            setAddSubscriberDialogOpen(true);
                        }
                    }}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    {tabValue === 0 ? 'Thêm Subscriber' : 'Quản lý Campaign'}
                </Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                                {subscribers.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tổng subscriber
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 1 }}>
                                {subscribers.filter(s => s.status === 'active').length}
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
                                {campaigns.filter(c => c.status === 'sent').length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Campaign đã gửi
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0', mb: 1 }}>
                                {campaigns.filter(c => c.status === 'sent').reduce((avg, c) => avg + c.openRate, 0) / Math.max(campaigns.filter(c => c.status === 'sent').length, 1)}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tỷ lệ mở trung bình
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs */}
            <Card sx={{ mb: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Subscribers" icon={<GroupIcon />} iconPosition="start" />
                        <Tab label="Campaigns" icon={<CampaignIcon />} iconPosition="start" />
                        <Tab label="Thống kê" icon={<StatsIcon />} iconPosition="start" />
                    </Tabs>
                </Box>

                <CustomTabPanel value={tabValue} index={0}>
                    {/* Subscriber Filters */}
                    <CardContent>
                        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    placeholder="Tìm kiếm subscriber..."
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
                                    <InputLabel>Trạng thái</InputLabel>
                                    <Select
                                        value={statusFilter}
                                        label="Trạng thái"
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <MenuItem value="all">Tất cả</MenuItem>
                                        <MenuItem value="active">Hoạt động</MenuItem>
                                        <MenuItem value="unsubscribed">Hủy đăng ký</MenuItem>
                                        <MenuItem value="bounced">Lỗi email</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Nguồn</InputLabel>
                                    <Select
                                        value={sourceFilter}
                                        label="Nguồn"
                                        onChange={(e) => setSourceFilter(e.target.value)}
                                    >
                                        <MenuItem value="all">Tất cả</MenuItem>
                                        <MenuItem value="website_footer">Footer website</MenuItem>
                                        <MenuItem value="popup">Popup</MenuItem>
                                        <MenuItem value="manual">Thêm thủ công</MenuItem>
                                        <MenuItem value="import">Import file</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Subscribers Table */}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Tên</TableCell>
                                        <TableCell align="center">Nguồn</TableCell>
                                        <TableCell align="center">Trạng thái</TableCell>
                                        <TableCell align="center">Ngày đăng ký</TableCell>
                                        <TableCell align="center">Email cuối</TableCell>
                                        <TableCell align="center">Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(paginatedData as Subscriber[]).map((subscriber) => (
                                        <TableRow key={subscriber.id} hover>
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
                                                    {subscriber.name || '-'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    {getSourceLabel(subscriber.source)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={getStatusLabel(subscriber.status)}
                                                    color={getStatusColor(subscriber.status) as any}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    {new Date(subscriber.subscribedAt).toLocaleDateString('vi-VN')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    {subscriber.lastEmailSent
                                                        ? new Date(subscriber.lastEmailSent).toLocaleDateString('vi-VN')
                                                        : '-'
                                                    }
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={(e) => handleMenuOpen(e, subscriber)}
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
                    </CardContent>
                </CustomTabPanel>

                <CustomTabPanel value={tabValue} index={1}>
                    {/* Campaign Filters */}
                    <CardContent>
                        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    placeholder="Tìm kiếm campaign..."
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
                                    <InputLabel>Trạng thái</InputLabel>
                                    <Select
                                        value={statusFilter}
                                        label="Trạng thái"
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <MenuItem value="all">Tất cả</MenuItem>
                                        <MenuItem value="draft">Bản nháp</MenuItem>
                                        <MenuItem value="sent">Đã gửi</MenuItem>
                                        <MenuItem value="scheduled">Đã lên lịch</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Campaigns Table */}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tên Campaign</TableCell>
                                        <TableCell>Chủ đề</TableCell>
                                        <TableCell align="center">Trạng thái</TableCell>
                                        <TableCell align="center">Người nhận</TableCell>
                                        <TableCell align="center">Tỷ lệ mở</TableCell>
                                        <TableCell align="center">Tỷ lệ click</TableCell>
                                        <TableCell align="center">Ngày gửi</TableCell>
                                        <TableCell align="center">Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(paginatedData as Campaign[]).map((campaign) => (
                                        <TableRow key={campaign.id} hover>
                                            <TableCell>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {campaign.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {campaign.subject}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={getStatusLabel(campaign.status)}
                                                    color={getStatusColor(campaign.status) as any}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    {(campaign.recipients || 0).toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    {campaign.openRate}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    {campaign.clickRate}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    {campaign.sentAt
                                                        ? new Date(campaign.sentAt).toLocaleDateString('vi-VN')
                                                        : '-'
                                                    }
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={(e) => handleMenuOpen(e, campaign)}
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
                    </CardContent>
                </CustomTabPanel>

                <CustomTabPanel value={tabValue} index={2}>
                    {/* Statistics */}
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Thống kê Subscriber
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Tổng subscriber"
                                                    secondary={`${subscribers.length} người`}
                                                />
                                                <ListItemSecondaryAction>
                                                    <Chip
                                                        label={subscribers.length}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Đang hoạt động"
                                                    secondary={`${subscribers.filter(s => s.status === 'active').length} người`}
                                                />
                                                <ListItemSecondaryAction>
                                                    <Chip
                                                        label={`${((subscribers.filter(s => s.status === 'active').length / subscribers.length) * 100).toFixed(1)}%`}
                                                        color="success"
                                                        size="small"
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Hủy đăng ký"
                                                    secondary={`${subscribers.filter(s => s.status === 'unsubscribed').length} người`}
                                                />
                                                <ListItemSecondaryAction>
                                                    <Chip
                                                        label={`${((subscribers.filter(s => s.status === 'unsubscribed').length / subscribers.length) * 100).toFixed(1)}%`}
                                                        color="warning"
                                                        size="small"
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Email lỗi"
                                                    secondary={`${subscribers.filter(s => s.status === 'bounced').length} người`}
                                                />
                                                <ListItemSecondaryAction>
                                                    <Chip
                                                        label={`${((subscribers.filter(s => s.status === 'bounced').length / subscribers.length) * 100).toFixed(1)}%`}
                                                        color="error"
                                                        size="small"
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Hiệu quả Campaign
                                        </Typography>
                                        <List dense>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Tổng campaign đã gửi"
                                                    secondary={`${campaigns.filter(c => c.status === 'sent').length} campaign`}
                                                />
                                                <ListItemSecondaryAction>
                                                    <Chip
                                                        label={campaigns.filter(c => c.status === 'sent').length}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Tỷ lệ mở trung bình"
                                                    secondary="Phần trăm email được mở"
                                                />
                                                <ListItemSecondaryAction>
                                                    <Chip
                                                        label={`${(campaigns.filter(c => c.status === 'sent').reduce((avg, c) => avg + c.openRate, 0) / Math.max(campaigns.filter(c => c.status === 'sent').length, 1)).toFixed(1)}%`}
                                                        color="success"
                                                        size="small"
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Tỷ lệ click trung bình"
                                                    secondary="Phần trăm link được click"
                                                />
                                                <ListItemSecondaryAction>
                                                    <Chip
                                                        label={`${(campaigns.filter(c => c.status === 'sent').reduce((avg, c) => avg + c.clickRate, 0) / Math.max(campaigns.filter(c => c.status === 'sent').length, 1)).toFixed(1)}%`}
                                                        color="info"
                                                        size="small"
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Tổng email đã gửi"
                                                    secondary="Tất cả email trong các campaign"
                                                />
                                                <ListItemSecondaryAction>
                                                    <Chip
                                                        label={campaigns.filter(c => c.status === 'sent').reduce((total, c) => total + (c.recipients || 0), 0).toLocaleString()}
                                                        color="secondary"
                                                        size="small"
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CustomTabPanel>

                {/* Pagination */}
                {tabValue < 2 && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={currentData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Số hàng mỗi trang:"
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} của ${count !== -1 ? count : `hơn ${to}`}`
                        }
                    />
                )}
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
                {tabValue === 0 ? (
                    // Subscriber menu
                    [
                        <MenuItem key="block" onClick={handleMenuClose}>
                            <BlockIcon sx={{ mr: 1 }} />
                            {(selectedItem as Subscriber)?.status === 'active' ? 'Chặn email' : 'Kích hoạt'}
                        </MenuItem>,
                        <MenuItem key="delete" onClick={handleDelete} sx={{ color: 'error.main' }}>
                            <DeleteIcon sx={{ mr: 1 }} />
                            Xóa
                        </MenuItem>
                    ]
                ) : (
                    // Campaign menu
                    [
                        <MenuItem key="send" onClick={handleMenuClose}>
                            <SendIcon sx={{ mr: 1 }} />
                            Gửi ngay
                        </MenuItem>,
                        <MenuItem key="delete" onClick={handleDelete} sx={{ color: 'error.main' }}>
                            <DeleteIcon sx={{ mr: 1 }} />
                            Xóa
                        </MenuItem>
                    ]
                )}
            </Menu>

            {/* Add Subscriber Dialog */}
            <Dialog
                open={addSubscriberDialogOpen}
                onClose={() => setAddSubscriberDialogOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>Thêm Subscriber mới</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Email *"
                            type="email"
                            value={newSubscriberEmail}
                            onChange={(e) => setNewSubscriberEmail(e.target.value)}
                            placeholder="example@email.com"
                        />
                        <TextField
                            fullWidth
                            label="Tên (tùy chọn)"
                            value={newSubscriberName}
                            onChange={(e) => setNewSubscriberName(e.target.value)}
                            placeholder="Nguyễn Văn A"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddSubscriberDialogOpen(false)}>Hủy</Button>
                    <Button
                        variant="contained"
                        onClick={handleAddSubscriber}
                        disabled={!newSubscriberEmail.trim()}
                    >
                        Thêm
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
                        Bạn có chắc chắn muốn xóa {tabValue === 0 ? 'subscriber' : 'campaign'} này?
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

export default NewsletterManagement;
