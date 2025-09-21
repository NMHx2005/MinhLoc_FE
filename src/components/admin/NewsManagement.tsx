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
    Tabs,
    Tab,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Visibility as ViewIcon,
    Newspaper as NewsIcon,
    Category as CategoryIcon,
    LocalOffer as TagIcon,
} from '@mui/icons-material';
import NewsForm from './NewsForm';
import NewsCategoriesManagement from './NewsCategoriesManagement';
import NewsTagsManagement from './NewsTagsManagement';

interface NewsArticle {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
    status: 'draft' | 'published' | 'archived';
    featured: boolean;
    featuredImage: string;
    publishedAt: string;
    createdAt: string;
    views: number;
}

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
            id={`news-tabpanel-${index}`}
            aria-labelledby={`news-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `news-tab-${index}`,
        'aria-controls': `news-tabpanel-${index}`,
    };
}

const NewsManagement: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [articles, setArticles] = useState<NewsArticle[]>([
        {
            id: 1,
            title: 'Xu hướng bất động sản 2024: Những cơ hội đầu tư mới',
            slug: 'xu-huong-bat-dong-san-2024',
            excerpt: 'Phân tích thị trường bất động sản 2024 với những cơ hội đầu tư tiềm năng...',
            content: 'Nội dung chi tiết về xu hướng bất động sản...',
            category: 'Thị trường BDS',
            tags: ['BDS', 'Đầu tư', '2024'],
            author: 'Admin',
            status: 'published',
            featured: true,
            featuredImage: '/placeholder-news.jpg',
            publishedAt: '2024-01-20',
            createdAt: '2024-01-18',
            views: 1250
        },
        {
            id: 2,
            title: 'Sâm Ngọc Linh Kontum: Đặc sản quý hiếm của núi rừng Tây Nguyên',
            slug: 'sam-ngoc-linh-kontum',
            excerpt: 'Tìm hiểu về sâm Ngọc Linh - loại sâm quý hiếm chỉ có ở vùng núi Ngọc Linh...',
            content: 'Nội dung chi tiết về sâm Ngọc Linh...',
            category: 'Sản phẩm Sâm',
            tags: ['Sâm Ngọc Linh', 'Kontum', 'Y học'],
            author: 'Editor',
            status: 'published',
            featured: false,
            featuredImage: '/placeholder-ginseng.jpg',
            publishedAt: '2024-01-18',
            createdAt: '2024-01-15',
            views: 890
        },
        {
            id: 3,
            title: 'Chính sách mới về thuế bất động sản năm 2024',
            slug: 'chinh-sach-thue-bat-dong-san-2024',
            excerpt: 'Tổng hợp các chính sách mới về thuế bất động sản có hiệu lực từ năm 2024...',
            content: 'Nội dung chi tiết về chính sách thuế...',
            category: 'Chính sách',
            tags: ['Thuế', 'Chính sách', 'BDS'],
            author: 'Admin',
            status: 'draft',
            featured: false,
            featuredImage: '/placeholder-policy.jpg',
            publishedAt: '',
            createdAt: '2024-01-22',
            views: 0
        },
        {
            id: 4,
            title: 'Lợi ích của sâm Hàn Quốc đối với sức khỏe',
            slug: 'loi-ich-sam-han-quoc',
            excerpt: 'Khám phá những lợi ích tuyệt vời của sâm Hàn Quốc cho sức khỏe...',
            content: 'Nội dung chi tiết về lợi ích sâm Hàn Quốc...',
            category: 'Sản phẩm Sâm',
            tags: ['Sâm Hàn Quốc', 'Sức khỏe'],
            author: 'Health Expert',
            status: 'published',
            featured: true,
            featuredImage: '/placeholder-korean-ginseng.jpg',
            publishedAt: '2024-01-16',
            createdAt: '2024-01-14',
            views: 1580
        },
        {
            id: 5,
            title: 'Dự án căn hộ cao cấp tại quận 7 sắp ra mắt',
            slug: 'du-an-can-ho-cao-cap-quan-7',
            excerpt: 'Giới thiệu dự án căn hộ cao cấp mới tại quận 7 với nhiều tiện ích hiện đại...',
            content: 'Nội dung chi tiết về dự án...',
            category: 'Dự án mới',
            tags: ['Căn hộ', 'Quận 7', 'Cao cấp'],
            author: 'Property Expert',
            status: 'archived',
            featured: false,
            featuredImage: '/placeholder-apartment.jpg',
            publishedAt: '2024-01-10',
            createdAt: '2024-01-08',
            views: 750
        }
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit' | 'view'>('add');

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, article: NewsArticle) => {
        setAnchorEl(event.currentTarget);
        setSelectedArticle(article);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedArticle(null);
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
        if (selectedArticle) {
            setArticles(articles.filter(article => article.id !== selectedArticle.id));
            setDeleteDialogOpen(false);
            setSelectedArticle(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedArticle(null);
    };

    const handleAddArticle = () => {
        setFormMode('add');
        setSelectedArticle(null);
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setSelectedArticle(null);
    };

    const handleFormSubmit = (articleData: Partial<NewsArticle>) => {
        if (formMode === 'add') {
            const newArticle: NewsArticle = {
                id: Math.max(...articles.map(a => a.id)) + 1,
                ...articleData as NewsArticle,
                createdAt: new Date().toISOString().split('T')[0],
                views: 0,
            };
            setArticles([...articles, newArticle]);
        } else if (formMode === 'edit' && selectedArticle) {
            setArticles(articles.map(article =>
                article.id === selectedArticle.id
                    ? { ...article, ...articleData }
                    : article
            ));
        }
        handleFormClose();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'success';
            case 'draft': return 'warning';
            case 'archived': return 'default';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'published': return 'Đã xuất bản';
            case 'draft': return 'Bản nháp';
            case 'archived': return 'Lưu trữ';
            default: return status;
        }
    };

    // Filter articles
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || article.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const paginatedArticles = filteredArticles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const uniqueCategories = [...new Set(articles.map(a => a.category))];

    return (
        <Box>
            {/* Sub Tabs */}
            <Card sx={{ mb: 3 }}>
                <CardContent sx={{ pb: 0 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="news management tabs">
                            <Tab
                                icon={<NewsIcon />}
                                label="Bài viết"
                                {...a11yProps(0)}
                                sx={{ minHeight: 60 }}
                            />
                            <Tab
                                icon={<CategoryIcon />}
                                label="Danh mục"
                                {...a11yProps(1)}
                                sx={{ minHeight: 60 }}
                            />
                            <Tab
                                icon={<TagIcon />}
                                label="Tags"
                                {...a11yProps(2)}
                                sx={{ minHeight: 60 }}
                            />
                        </Tabs>
                    </Box>
                </CardContent>
            </Card>

            {/* Tab Panels */}
            <TabPanel value={tabValue} index={0}>
                {/* Articles Management */}
                <Box>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Quản lý Bài viết ({filteredArticles.length})
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddArticle}
                            sx={{
                                backgroundColor: '#E7C873',
                                color: '#000',
                                '&:hover': {
                                    backgroundColor: '#d4b86a',
                                },
                            }}
                        >
                            Thêm Bài viết
                        </Button>
                    </Box>

                    {/* Filters */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        placeholder="Tìm kiếm bài viết..."
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
                                        <InputLabel>Danh mục</InputLabel>
                                        <Select
                                            value={categoryFilter}
                                            label="Danh mục"
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                        >
                                            <MenuItem value="all">Tất cả</MenuItem>
                                            {uniqueCategories.map(category => (
                                                <MenuItem key={category} value={category}>{category}</MenuItem>
                                            ))}
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
                                            <MenuItem value="published">Đã xuất bản</MenuItem>
                                            <MenuItem value="draft">Bản nháp</MenuItem>
                                            <MenuItem value="archived">Lưu trữ</MenuItem>
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
                                        <TableCell>Bài viết</TableCell>
                                        <TableCell>Danh mục</TableCell>
                                        <TableCell>Tags</TableCell>
                                        <TableCell>Tác giả</TableCell>
                                        <TableCell align="center">Lượt xem</TableCell>
                                        <TableCell align="center">Trạng thái</TableCell>
                                        <TableCell align="center">Ngày xuất bản</TableCell>
                                        <TableCell align="center">Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedArticles.map((article) => (
                                        <TableRow key={article.id} hover>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar
                                                        src={article.featuredImage}
                                                        alt={article.title}
                                                        sx={{ width: 60, height: 40, borderRadius: 1 }}
                                                        variant="rounded"
                                                    >
                                                        <NewsIcon />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                            {article.title}
                                                            {article.featured && (
                                                                <Chip
                                                                    label="Nổi bật"
                                                                    size="small"
                                                                    color="primary"
                                                                    sx={{ ml: 1, fontSize: '0.6rem' }}
                                                                />
                                                            )}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {article.excerpt.substring(0, 60)}...
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{article.category}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {article.tags.slice(0, 2).map(tag => (
                                                        <Chip
                                                            key={tag}
                                                            label={tag}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ fontSize: '0.7rem' }}
                                                        />
                                                    ))}
                                                    {article.tags.length > 2 && (
                                                        <Chip
                                                            label={`+${article.tags.length - 2}`}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ fontSize: '0.7rem' }}
                                                        />
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell>{article.author}</TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {article.views.toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={getStatusLabel(article.status)}
                                                    color={getStatusColor(article.status) as any}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    {article.publishedAt ?
                                                        new Date(article.publishedAt).toLocaleDateString('vi-VN')
                                                        : '-'
                                                    }
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={(e) => handleMenuOpen(e, article)}
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
                            count={filteredArticles.length}
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
                </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <NewsCategoriesManagement />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <NewsTagsManagement />
            </TabPanel>

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
                        Bạn có chắc chắn muốn xóa bài viết "{selectedArticle?.title}"?
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

            {/* News Form Dialog */}
            <NewsForm
                open={formOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                mode={formMode}
                initialData={selectedArticle}
            />
        </Box>
    );
};

export default NewsManagement;
