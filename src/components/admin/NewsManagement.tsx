'use client'

import React, { useState, useEffect, useCallback } from 'react';
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
    Snackbar,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Visibility as ViewIcon,
    Newspaper as NewsIcon,
    FilterList as FilterIcon,
    Clear as ClearIcon,
    Download as DownloadIcon,
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { newsService } from '../../services/admin/newsService';
import type { NewsArticle } from '../../services/admin/newsService';
import NewsCategoriesManagement from './NewsCategoriesManagement';
import NewsTagsManagement from './NewsTagsManagement';

// Remove duplicate interface - using the one from newsService

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


const NewsManagement: React.FC = () => {
    const router = useRouter();
    const [tabValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [categories, setCategories] = useState<Array<{ _id: string, name: string }>>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [showFilters, setShowFilters] = useState(false);

    // Bulk actions
    const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

    // Load categories from API
    const loadCategories = useCallback(async () => {
        try {
            const response = await newsService.getNewsCategories();
            if (response.success && response.data) {
                setCategories(response.data);
            } else if (Array.isArray(response)) {
                setCategories(response);
            } else if (response.data) {
                setCategories(response.data);
            }
        } catch (err) {
            console.error('Error loading categories:', err);
        }
    }, []);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Load news articles from API
    const loadNews = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await newsService.getNews({
                page: pagination.page,
                limit: pagination.limit,
                search: debouncedSearchTerm || undefined,
                category: categoryFilter !== 'all' ? categoryFilter : undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined,
                sortBy: sortBy,
                sortOrder: sortOrder
            });

            setArticles(response.data);
            setPagination(response.pagination);
        } catch (err) {
            console.error('Error loading news:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải danh sách tin tức');
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, debouncedSearchTerm, categoryFilter, statusFilter, sortBy, sortOrder]);

    useEffect(() => {
        loadNews();
    }, [loadNews]);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);


    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
        setPagination(prev => ({ ...prev, page: newPage + 1 }));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        setPagination(prev => ({ ...prev, page: 1, limit: newRowsPerPage }));
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
        if (selectedArticle) {
            router.push(`/admin/content/news/${selectedArticle._id}`);
        }
        handleMenuClose();
    };

    const handleEdit = () => {
        if (selectedArticle) {
            router.push(`/admin/content/news/${selectedArticle._id}/edit`);
        }
        handleMenuClose();
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = async () => {
        if (selectedArticle) {
            setSaving(true);
            try {
                await newsService.deleteNews(selectedArticle._id);
                setSnackbarMessage('✅ Xóa bài viết thành công!');
                setSnackbarOpen(true);
                setDeleteDialogOpen(false);
                setSelectedArticle(null);
                await loadNews();
            } catch (error) {
                console.error('Error deleting article:', error);
                setSnackbarMessage('❌ Lỗi khi xóa bài viết');
                setSnackbarOpen(true);
            } finally {
                setSaving(false);
            }
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedArticle(null);
    };

    const handleAddArticle = () => {
        router.push('/admin/content/news/add');
    };

    // Bulk actions
    const handleSelectAll = () => {
        if (selectedArticles.length === articles.length) {
            setSelectedArticles([]);
        } else {
            setSelectedArticles(articles.map(article => article._id));
        }
    };

    const handleSelectArticle = (articleId: string) => {
        setSelectedArticles(prev =>
            prev.includes(articleId)
                ? prev.filter(id => id !== articleId)
                : [...prev, articleId]
        );
    };

    const handleBulkDelete = () => {
        setBulkDeleteDialogOpen(true);
    };

    const handleBulkDeleteConfirm = async () => {
        if (selectedArticles.length > 0) {
            setSaving(true);
            try {
                // Delete articles one by one
                for (const articleId of selectedArticles) {
                    await newsService.deleteNews(articleId);
                }
                setSnackbarMessage(`✅ Đã xóa ${selectedArticles.length} bài viết thành công!`);
                setSnackbarOpen(true);
                setBulkDeleteDialogOpen(false);
                setSelectedArticles([]);
                await loadNews();
            } catch (error) {
                console.error('Error bulk deleting articles:', error);
                setSnackbarMessage('❌ Lỗi khi xóa bài viết');
                setSnackbarOpen(true);
            } finally {
                setSaving(false);
            }
        }
    };

    const handleBulkDeleteCancel = () => {
        setBulkDeleteDialogOpen(false);
    };

    // Clear all filters
    const handleClearFilters = () => {
        setSearchTerm('');
        setCategoryFilter('all');
        setStatusFilter('all');
        setDateFilter('all');
        setSortBy('createdAt');
        setSortOrder('desc');
        setSelectedArticles([]);
    };

    // Export function
    const handleExport = () => {
        const csvContent = [
            ['Tiêu đề', 'Danh mục', 'Trạng thái', 'Tác giả', 'Lượt xem', 'Ngày tạo'],
            ...articles.map(article => [
                article.title,
                article.categoryId?.name || 'N/A',
                getStatusLabel(article.status),
                article.author?.name || 'N/A',
                article.statistics?.views || 0,
                new Date(article.createdAt).toLocaleDateString('vi-VN')
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `tin-tuc-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải danh sách tin tức...</Typography>
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

            {/* Sub Tabs
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
            </Card> */}

            {/* Tab Panels */}
            <TabPanel value={tabValue} index={0}>
                {/* Articles Management */}
                <Box>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Quản lý Bài viết ({pagination.total})
                            {selectedArticles.length > 0 && (
                                <Chip
                                    label={`${selectedArticles.length} đã chọn`}
                                    color="primary"
                                    size="small"
                                    sx={{ ml: 2 }}
                                />
                            )}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {selectedArticles.length > 0 && (
                                <>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={handleBulkDelete}
                                        size="small"
                                    >
                                        Xóa ({selectedArticles.length})
                                    </Button>
                                </>
                            )}
                            <Button
                                variant="outlined"
                                startIcon={<DownloadIcon />}
                                onClick={handleExport}
                                size="small"
                            >
                                Xuất CSV
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<RefreshIcon />}
                                onClick={loadNews}
                                size="small"
                            >
                                Làm mới
                            </Button>
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
                    </Box>

                    {/* Filters */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Bộ lọc & Tìm kiếm
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<FilterIcon />}
                                        onClick={() => setShowFilters(!showFilters)}
                                        size="small"
                                    >
                                        {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ClearIcon />}
                                        onClick={handleClearFilters}
                                        size="small"
                                        color="secondary"
                                    >
                                        Xóa bộ lọc
                                    </Button>
                                </Box>
                            </Box>

                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        placeholder="Tìm kiếm theo tiêu đề, nội dung..."
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
                                            {categories.map(category => (
                                                <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
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
                                <Grid item xs={12} md={2}>
                                    <Button
                                        variant="contained"
                                        onClick={loadNews}
                                        fullWidth
                                        size="small"
                                        sx={{
                                            height: '40px',
                                            backgroundColor: '#E7C873',
                                            color: '#000',
                                            '&:hover': {
                                                backgroundColor: '#d4b86a',
                                            },
                                        }}
                                    >
                                        Tìm kiếm
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* Advanced Filters */}
                            {showFilters && (
                                <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                        Bộ lọc nâng cao
                                    </Typography>
                                    <Grid container spacing={3} alignItems="center">
                                        <Grid item xs={12} md={3}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Sắp xếp theo</InputLabel>
                                                <Select
                                                    value={sortBy}
                                                    label="Sắp xếp theo"
                                                    onChange={(e) => setSortBy(e.target.value)}
                                                >
                                                    <MenuItem value="createdAt">Ngày tạo</MenuItem>
                                                    <MenuItem value="updatedAt">Ngày cập nhật</MenuItem>
                                                    <MenuItem value="publishedAt">Ngày xuất bản</MenuItem>
                                                    <MenuItem value="title">Tiêu đề</MenuItem>
                                                    <MenuItem value="views">Lượt xem</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Thứ tự</InputLabel>
                                                <Select
                                                    value={sortOrder}
                                                    label="Thứ tự"
                                                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                                                >
                                                    <MenuItem value="desc">Mới nhất</MenuItem>
                                                    <MenuItem value="asc">Cũ nhất</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Khoảng thời gian</InputLabel>
                                                <Select
                                                    value={dateFilter}
                                                    label="Khoảng thời gian"
                                                    onChange={(e) => setDateFilter(e.target.value)}
                                                >
                                                    <MenuItem value="all">Tất cả</MenuItem>
                                                    <MenuItem value="today">Hôm nay</MenuItem>
                                                    <MenuItem value="week">Tuần này</MenuItem>
                                                    <MenuItem value="month">Tháng này</MenuItem>
                                                    <MenuItem value="year">Năm nay</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                        </CardContent>
                    </Card>

                    {/* Table */}
                    <Card>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <IconButton
                                                onClick={handleSelectAll}
                                                size="small"
                                            >
                                                {selectedArticles.length === articles.length && articles.length > 0 ? (
                                                    <CheckBoxIcon />
                                                ) : (
                                                    <CheckBoxOutlineBlankIcon />
                                                )}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>Bài viết</TableCell>
                                        <TableCell>Danh mục</TableCell>
                                        <TableCell>Tags</TableCell>
                                        <TableCell>Tác giả</TableCell>
                                        <TableCell align="center">Lượt xem</TableCell>
                                        <TableCell align="center">Thời gian đọc</TableCell>
                                        <TableCell align="center">Trạng thái</TableCell>
                                        <TableCell align="center">Ngày xuất bản</TableCell>
                                        <TableCell align="center">Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {articles.map((article) => (
                                        <TableRow key={article._id} hover>
                                            <TableCell padding="checkbox">
                                                <IconButton
                                                    onClick={() => handleSelectArticle(article._id)}
                                                    size="small"
                                                >
                                                    {selectedArticles.includes(article._id) ? (
                                                        <CheckBoxIcon />
                                                    ) : (
                                                        <CheckBoxOutlineBlankIcon />
                                                    )}
                                                </IconButton>
                                            </TableCell>
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
                                                            {article.isFeatured && (
                                                                <Chip
                                                                    label="Nổi bật"
                                                                    size="small"
                                                                    color="primary"
                                                                    sx={{ ml: 1, fontSize: '0.6rem' }}
                                                                />
                                                            )}
                                                            {article.isBreaking && (
                                                                <Chip
                                                                    label="Tin nóng"
                                                                    size="small"
                                                                    color="error"
                                                                    sx={{ ml: 1, fontSize: '0.6rem' }}
                                                                />
                                                            )}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {(article.excerpt || '').substring(0, 60)}...
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={article.categoryId?.name || 'N/A'}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: article.categoryId?.color || '#1976d2',
                                                        color: 'white',
                                                        fontSize: '0.7rem'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {(article.tags || []).slice(0, 2).map(tag => (
                                                        <Chip
                                                            key={tag}
                                                            label={tag}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ fontSize: '0.7rem' }}
                                                        />
                                                    ))}
                                                    {(article.tags || []).length > 2 && (
                                                        <Chip
                                                            label={`+${(article.tags || []).length - 2}`}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ fontSize: '0.7rem' }}
                                                        />
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell>{article.author?.name || 'N/A'}</TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {(article.statistics?.views || 0).toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2" color="text.secondary">
                                                    {article.readingTime || 0} phút
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={getStatusLabel(article.status)}
                                                    color={getStatusColor(article.status) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
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
                                                    onClick={(e: React.MouseEvent<HTMLElement>) => handleMenuOpen(e, article)}
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
                            count={pagination.total}
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
                <DialogTitle>Xác nhận xóa bài viết</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Bạn có chắc chắn muốn xóa bài viết này?
                    </DialogContentText>
                    {selectedArticle && (
                        <Box sx={{
                            p: 2,
                            backgroundColor: '#f5f5f5',
                            borderRadius: 1,
                            border: '1px solid #e0e0e0'
                        }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                {selectedArticle.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Danh mục: {selectedArticle.categoryId?.name || 'N/A'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Trạng thái: {getStatusLabel(selectedArticle.status)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lượt xem: {(selectedArticle.statistics?.views || 0).toLocaleString()}
                            </Typography>
                        </Box>
                    )}
                    <DialogContentText sx={{ mt: 2, color: 'error.main', fontWeight: 600 }}>
                        ⚠️ Hành động này không thể hoàn tác!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Hủy</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={saving}>
                        {saving ? 'Đang xóa...' : 'Xóa bài viết'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Bulk Delete Confirmation Dialog */}
            <Dialog
                open={bulkDeleteDialogOpen}
                onClose={handleBulkDeleteCancel}
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>Xác nhận xóa nhiều bài viết</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Bạn có chắc chắn muốn xóa {selectedArticles.length} bài viết đã chọn?
                    </DialogContentText>
                    <Box sx={{
                        p: 2,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 1,
                        border: '1px solid #e0e0e0',
                        maxHeight: 200,
                        overflow: 'auto'
                    }}>
                        {articles
                            .filter(article => selectedArticles.includes(article._id))
                            .map(article => (
                                <Box key={article._id} sx={{ mb: 1, pb: 1, borderBottom: '1px solid #e0e0e0' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {article.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {article.categoryId?.name || 'N/A'} • {getStatusLabel(article.status)}
                                    </Typography>
                                </Box>
                            ))
                        }
                    </Box>
                    <DialogContentText sx={{ mt: 2, color: 'error.main', fontWeight: 600 }}>
                        ⚠️ Hành động này không thể hoàn tác!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBulkDeleteCancel}>Hủy</Button>
                    <Button onClick={handleBulkDeleteConfirm} color="error" variant="contained" disabled={saving}>
                        {saving ? 'Đang xóa...' : `Xóa ${selectedArticles.length} bài viết`}
                    </Button>
                </DialogActions>
            </Dialog>


            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarMessage.includes('❌') ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default NewsManagement;
