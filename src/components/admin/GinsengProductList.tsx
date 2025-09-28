'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
    Avatar,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    Grid,
    Alert,
    CircularProgress,
    Snackbar,
    Checkbox,
    Tooltip,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Spa as GinsengIcon,
    Clear as ClearIcon,
    Sort as SortIcon,
    Download as DownloadIcon,
    Visibility as ViewIcon,
    VisibilityOff as HideIcon,
} from '@mui/icons-material';
import GinsengProductForm from './GinsengProductForm';
import { ginsengService } from '../../services/admin/ginsengService';
import type { GinsengProduct, CreateProductData, UpdateProductData } from '../../services/admin/ginsengService';

interface GinsengProductListProps {
    className?: string;
}

const GinsengProductList: React.FC<GinsengProductListProps> = () => {
    const router = useRouter();
    const [products, setProducts] = useState<GinsengProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<GinsengProduct | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [formMode] = useState<'add' | 'edit'>('add');

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [originFilter, setOriginFilter] = useState('all');
    const [gradeFilter, setGradeFilter] = useState('all');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [weightRange, setWeightRange] = useState({ min: '', max: '' });

    // Advanced features
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [bulkAction, setBulkAction] = useState<string>('');
    const [showBulkActions, setShowBulkActions] = useState(false);

    // Categories and origins for filters
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [origins, setOrigins] = useState<{ _id: string; name: string; country: string }[]>([]);

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const filters = {
                search: searchTerm || undefined,
                category: categoryFilter !== 'all' ? categoryFilter : undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined,
                origin: originFilter !== 'all' ? originFilter : undefined,
                grade: gradeFilter !== 'all' ? gradeFilter : undefined,
                priceMin: priceRange.min ? Number(priceRange.min) : undefined,
                priceMax: priceRange.max ? Number(priceRange.max) : undefined,
                weightMin: weightRange.min ? Number(weightRange.min) : undefined,
                weightMax: weightRange.max ? Number(weightRange.max) : undefined,
                sortBy: sortBy,
                sortOrder: sortOrder,
                page: page + 1,
                limit: rowsPerPage
            };

            // Debug logging
            // console.log('Loading products with filters:', filters);

            const response = await ginsengService.getProducts(filters);
            setProducts(response.products);
            setTotal(response.total);
        } catch (err) {
            console.error('Error loading products:', err);
            setError('Không thể tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    }, [searchTerm, categoryFilter, statusFilter, originFilter, gradeFilter, priceRange.min, priceRange.max, weightRange.min, weightRange.max, sortBy, sortOrder, page, rowsPerPage]);

    const loadCategoriesAndOrigins = async () => {
        try {
            const [categoriesData, originsData] = await Promise.all([
                ginsengService.getCategoriesForForm(),
                ginsengService.getOriginsForForm()
            ]);
            setCategories(categoriesData);
            setOrigins(originsData);
        } catch (err) {
            console.error('Error loading categories and origins:', err);
        }
    };

    // Load categories and origins for filters
    useEffect(() => {
        loadCategoriesAndOrigins();
    }, []);

    // Load products on component mount and when filters change
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, product: GinsengProduct) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        // Don't reset selectedProduct here to preserve data for form operations
    };

    const handleView = () => {
        if (!selectedProduct) {
            return;
        }
        router.push(`/admin/ginseng-products/view/${selectedProduct._id}`);
        handleMenuClose();
    };

    const handleEdit = () => {
        if (!selectedProduct) {
            return;
        }
        router.push(`/admin/ginseng-products/edit/${selectedProduct._id}`);
        handleMenuClose();
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = async () => {
        if (selectedProduct) {
            try {
                setLoading(true);
                setError(null);
                await ginsengService.deleteProduct(selectedProduct._id);
                setSnackbarMessage('✅ Xóa sản phẩm thành công!');
                setSnackbarOpen(true);
                await loadProducts(); // Reload products
                setDeleteDialogOpen(false);
                setSelectedProduct(null);
            } catch (err) {
                console.error('Error deleting product:', err);
                const errorMessage = '❌ Không thể xóa sản phẩm. Vui lòng thử lại.';
                setError(errorMessage);
                setSnackbarMessage(errorMessage);
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleAddProduct = () => {
        router.push('/admin/ginseng-products/create');
    };

    const handleFormClose = () => {
        setFormOpen(false);
        // Don't reset selectedProduct here to preserve data for form submission
    };


    const handleFormSubmit = async (productData: CreateProductData | UpdateProductData) => {
        try {
            setLoading(true);
            setError(null);

            if (formMode === 'add') {
                await ginsengService.createProduct(productData as CreateProductData);
                setSnackbarMessage('✅ Thêm sản phẩm thành công!');
            } else {
                await ginsengService.updateProduct(productData as UpdateProductData);
                setSnackbarMessage('✅ Cập nhật sản phẩm thành công!');
            }

            setSnackbarOpen(true);
            await loadProducts(); // Reload products
            setFormOpen(false);
            setSelectedProduct(null); // Reset after successful submission
        } catch (err) {
            console.error('Error submitting product:', err);
            const errorMessage = formMode === 'add'
                ? '❌ Không thể thêm sản phẩm. Vui lòng kiểm tra lại thông tin.'
                : '❌ Không thể cập nhật sản phẩm. Vui lòng kiểm tra lại thông tin.';
            setError(errorMessage);
            setSnackbarMessage(errorMessage);
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'success';
            case 'inactive': return 'default';
            case 'out_of_stock': return 'error';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Đang bán';
            case 'inactive': return 'Ngừng bán';
            case 'out_of_stock': return 'Hết hàng';
            default: return status;
        }
    };

    const getCategoryIcon = (_category: string) => {
        return <GinsengIcon sx={{ color: '#4caf50' }} />;
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm('');
        setCategoryFilter('all');
        setStatusFilter('all');
        setOriginFilter('all');
        setGradeFilter('all');
        setPriceRange({ min: '', max: '' });
        setWeightRange({ min: '', max: '' });
        setPage(0);
    };

    // Handle product selection for bulk actions
    const handleSelectProduct = (productId: string) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleSelectAll = () => {
        if (selectedProducts.length === products.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(products.map(p => p._id));
        }
    };

    // Bulk actions
    const handleBulkAction = async () => {
        if (!bulkAction || selectedProducts.length === 0) return;

        try {
            setLoading(true);

            switch (bulkAction) {
                case 'delete':
                    await Promise.all(selectedProducts.map(id => ginsengService.deleteProduct(id)));
                    setSnackbarMessage(`Đã xóa ${selectedProducts.length} sản phẩm`);
                    break;
                case 'activate':
                    await Promise.all(selectedProducts.map(id =>
                        ginsengService.updateProduct({ _id: id, status: 'active' })
                    ));
                    setSnackbarMessage(`Đã kích hoạt ${selectedProducts.length} sản phẩm`);
                    break;
                case 'deactivate':
                    await Promise.all(selectedProducts.map(id =>
                        ginsengService.updateProduct({ _id: id, status: 'inactive' })
                    ));
                    setSnackbarMessage(`Đã vô hiệu hóa ${selectedProducts.length} sản phẩm`);
                    break;
                case 'out_of_stock':
                    await Promise.all(selectedProducts.map(id =>
                        ginsengService.updateProduct({ _id: id, status: 'out_of_stock' })
                    ));
                    setSnackbarMessage(`Đã đánh dấu hết hàng ${selectedProducts.length} sản phẩm`);
                    break;
            }

            setSnackbarOpen(true);
            setSelectedProducts([]);
            setBulkAction('');
            setShowBulkActions(false);
            loadProducts();
        } catch (err) {
            console.error('Error performing bulk action:', err);
            setError('Không thể thực hiện hành động hàng loạt');
        } finally {
            setLoading(false);
        }
    };

    // Handle sorting
    const handleSort = (field: string) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
        setPage(0);
    };

    return (
        <Box>
            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Danh sách Sản phẩm Sâm ({total})
                    </Typography>
                    {selectedProducts.length > 0 && (
                        <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                            Đã chọn {selectedProducts.length} sản phẩm
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {selectedProducts.length > 0 && (
                        <Button
                            variant="outlined"
                            startIcon={<DownloadIcon />}
                            onClick={() => setShowBulkActions(true)}
                            sx={{ mr: 1 }}
                        >
                            Hành động ({selectedProducts.length})
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                        onClick={handleAddProduct}
                        disabled={loading}
                        sx={{
                            backgroundColor: '#E7C873',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#d4b86a',
                            },
                            '&:disabled': {
                                backgroundColor: '#f5f5f5',
                                color: '#999',
                            },
                        }}
                    >
                        {loading ? 'Đang xử lý...' : 'Thêm Sản phẩm'}
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
                                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                size="small"
                            >
                                {showAdvancedFilters ? 'Ẩn bộ lọc' : 'Bộ lọc nâng cao'}
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<ClearIcon />}
                                onClick={clearFilters}
                                size="small"
                            >
                                Xóa bộ lọc
                            </Button>
                        </Box>
                    </Box>

                    <Grid container spacing={2} alignItems="center">
                        {/* Basic Filters */}
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm sản phẩm..."
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
                                <InputLabel>Phân loại</InputLabel>
                                <Select
                                    value={categoryFilter}
                                    label="Phân loại"
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    {categories.map(category => (
                                        <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                    <MenuItem value="active">Đang bán</MenuItem>
                                    <MenuItem value="inactive">Ngừng bán</MenuItem>
                                    <MenuItem value="out_of_stock">Hết hàng</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Xuất xứ</InputLabel>
                                <Select
                                    value={originFilter}
                                    label="Xuất xứ"
                                    onChange={(e) => setOriginFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    {origins.map(origin => (
                                        <MenuItem key={origin._id} value={origin._id}>{origin.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Cấp độ</InputLabel>
                                <Select
                                    value={gradeFilter}
                                    label="Cấp độ"
                                    onChange={(e) => setGradeFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="premium">Premium</MenuItem>
                                    <MenuItem value="standard">Standard</MenuItem>
                                    <MenuItem value="economy">Economy</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Sắp xếp</InputLabel>
                                <Select
                                    value={`${sortBy}-${sortOrder}`}
                                    label="Sắp xếp"
                                    onChange={(e) => {
                                        const [field, order] = e.target.value.split('-');
                                        setSortBy(field);
                                        setSortOrder(order as 'asc' | 'desc');
                                    }}
                                >
                                    <MenuItem value="createdAt-desc">Mới nhất</MenuItem>
                                    <MenuItem value="createdAt-asc">Cũ nhất</MenuItem>
                                    <MenuItem value="name-asc">Tên A-Z</MenuItem>
                                    <MenuItem value="name-desc">Tên Z-A</MenuItem>
                                    <MenuItem value="price-asc">Giá thấp</MenuItem>
                                    <MenuItem value="price-desc">Giá cao</MenuItem>
                                    <MenuItem value="stock-asc">Tồn kho ít</MenuItem>
                                    <MenuItem value="stock-desc">Tồn kho nhiều</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Advanced Filters */}
                    {showAdvancedFilters && (
                        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                Bộ lọc nâng cao
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Giá từ (VNĐ)"
                                        type="number"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                        size="small"
                                        placeholder="0"
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Giá đến (VNĐ)"
                                        type="number"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                        size="small"
                                        placeholder="10000000"
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Trọng lượng từ (g)"
                                        type="number"
                                        value={weightRange.min}
                                        onChange={(e) => setWeightRange(prev => ({ ...prev, min: e.target.value }))}
                                        size="small"
                                        placeholder="0"
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Trọng lượng đến (g)"
                                        type="number"
                                        value={weightRange.max}
                                        onChange={(e) => setWeightRange(prev => ({ ...prev, max: e.target.value }))}
                                        size="small"
                                        placeholder="1000"
                                    />
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
                                    <Checkbox
                                        indeterminate={selectedProducts.length > 0 && selectedProducts.length < products.length}
                                        checked={selectedProducts.length === products.length && products.length > 0}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        Sản phẩm
                                        <Tooltip title="Sắp xếp theo tên">
                                            <IconButton size="small" onClick={() => handleSort('name')}>
                                                <SortIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                                <TableCell>Phân loại</TableCell>
                                <TableCell>Xuất xứ</TableCell>
                                <TableCell>SKU</TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                                        Giá bán
                                        <Tooltip title="Sắp xếp theo giá">
                                            <IconButton size="small" onClick={() => handleSort('price')}>
                                                <SortIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                        Tồn kho
                                        <Tooltip title="Sắp xếp theo tồn kho">
                                            <IconButton size="small" onClick={() => handleSort('stock')}>
                                                <SortIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Cấp độ</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                                        <CircularProgress />
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Đang tải dữ liệu...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Không có sản phẩm nào
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((product) => (
                                    <TableRow key={product._id} hover selected={selectedProducts.includes(product._id)}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedProducts.includes(product._id)}
                                                onChange={() => handleSelectProduct(product._id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder-ginseng.jpg'}
                                                    alt={product.name}
                                                    sx={{ width: 50, height: 50 }}
                                                >
                                                    {getCategoryIcon(product.category)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                        {product.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {product.weight}{product.weightUnit} • {product.description.substring(0, 30)}...
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={product.category}
                                                variant="outlined"
                                                size="small"
                                                sx={{ fontWeight: 500 }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={product.origin}
                                                variant="outlined"
                                                size="small"
                                                sx={{ fontWeight: 500 }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                                                {product.sku || 'N/A'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                                {product.price.toLocaleString('vi-VN')} đ
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={product.stock}
                                                color={product.stock === 0 ? 'error' : product.stock < 10 ? 'warning' : 'success'}
                                                size="small"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={getStatusLabel(product.status)}
                                                color={getStatusColor(product.status) as 'success' | 'default' | 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={product.grade}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    fontWeight: 600,
                                                    backgroundColor: product.grade === 'premium' ? '#ffd700' :
                                                        product.grade === 'standard' ? '#c0c0c0' : '#cd7f32',
                                                    color: product.grade === 'premium' ? '#000' : '#fff'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={(e) => handleMenuOpen(e, product)}
                                                size="small"
                                                disabled={loading}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
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
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <DeleteIcon color="error" />
                        Xác nhận xóa sản phẩm
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {selectedProduct && (
                        <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Avatar
                                    src={selectedProduct.images && selectedProduct.images.length > 0 ? selectedProduct.images[0] : '/placeholder-ginseng.jpg'}
                                    alt={selectedProduct.name}
                                    sx={{ width: 60, height: 60 }}
                                >
                                    {getCategoryIcon(selectedProduct.category)}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {selectedProduct.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedProduct.categoryId?.name || selectedProduct.category} • {selectedProduct.originId?.name || selectedProduct.origin}
                                    </Typography>
                                </Box>
                            </Box>
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                <Typography variant="body2">
                                    <strong>Cảnh báo:</strong> Hành động này sẽ xóa vĩnh viễn sản phẩm và không thể hoàn tác.
                                </Typography>
                            </Alert>
                            <Typography variant="body2" color="text.secondary">
                                Bạn có chắc chắn muốn tiếp tục?
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} disabled={loading}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
                    >
                        {loading ? 'Đang xóa...' : 'Xóa sản phẩm'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Product View Dialog - Removed, now using dedicated view page */}
            <DialogContent>
                {selectedProduct && (
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={3}>
                            {/* Product Image */}
                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Avatar
                                        src={selectedProduct.images && selectedProduct.images.length > 0 ? selectedProduct.images[0] : '/placeholder-ginseng.jpg'}
                                        alt={selectedProduct.name}
                                        sx={{ width: 200, height: 200, mx: 'auto', mb: 2 }}
                                    >
                                        {getCategoryIcon(selectedProduct.category)}
                                    </Avatar>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        {selectedProduct.name}
                                    </Typography>
                                    <Chip
                                        label={getStatusLabel(selectedProduct.status)}
                                        color={getStatusColor(selectedProduct.status) as 'success' | 'default' | 'error'}
                                        sx={{ mb: 1 }}
                                    />
                                </Box>
                            </Grid>

                            {/* Product Details */}
                            <Grid item xs={12} md={8}>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Thông tin cơ bản
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Phân loại:
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {selectedProduct.categoryId?.name || selectedProduct.category}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Xuất xứ:
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {selectedProduct.originId?.name || selectedProduct.origin}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Cấp độ:
                                            </Typography>
                                            <Chip
                                                label={selectedProduct.grade}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    fontWeight: 600,
                                                    backgroundColor: selectedProduct.grade === 'premium' ? '#ffd700' :
                                                        selectedProduct.grade === 'standard' ? '#c0c0c0' : '#cd7f32',
                                                    color: selectedProduct.grade === 'premium' ? '#000' : '#fff'
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Trọng lượng:
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {selectedProduct.weight} {selectedProduct.weightUnit}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Thông tin bán hàng
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Giá bán:
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                                {selectedProduct.price?.toLocaleString('vi-VN')} đ
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Tồn kho:
                                            </Typography>
                                            <Chip
                                                label={selectedProduct.stock || 0}
                                                color={selectedProduct.stock === 0 ? 'error' : selectedProduct.stock < 10 ? 'warning' : 'success'}
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Mã SKU:
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
                                                {selectedProduct.sku || 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Trạng thái:
                                            </Typography>
                                            <Chip
                                                label={getStatusLabel(selectedProduct.status)}
                                                color={getStatusColor(selectedProduct.status) as 'success' | 'default' | 'error'}
                                                size="small"
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Mô tả sản phẩm
                                    </Typography>
                                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                        {selectedProduct.description || 'Chưa có mô tả'}
                                    </Typography>
                                </Box>

                                {selectedProduct.content && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                            Nội dung chi tiết
                                        </Typography>
                                        <Box
                                            sx={{
                                                lineHeight: 1.6,
                                                '& p': { mb: 1 },
                                                '& ul, & ol': { pl: 2 },
                                                '& li': { mb: 0.5 }
                                            }}
                                            dangerouslySetInnerHTML={{ __html: selectedProduct.content }}
                                        />
                                    </Box>
                                )}

                                {selectedProduct.specifications && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                            Thông tin kỹ thuật
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {selectedProduct.specifications.benefits && selectedProduct.specifications.benefits.length > 0 && (
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                        Công dụng:
                                                    </Typography>
                                                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                                                        {selectedProduct.specifications.benefits.map((benefit: string, index: number) => (
                                                            <li key={index}>
                                                                <Typography variant="body2">
                                                                    {benefit}
                                                                </Typography>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Grid>
                                            )}
                                            {selectedProduct.specifications.ingredients && selectedProduct.specifications.ingredients.length > 0 && (
                                                <Grid item xs={12} md={6}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                        Thành phần:
                                                    </Typography>
                                                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                                                        {selectedProduct.specifications.ingredients.map((ingredient: string, index: number) => (
                                                            <li key={index}>
                                                                <Typography variant="body2">
                                                                    {ingredient}
                                                                </Typography>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Box>
                                )}

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Thông tin hệ thống
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Người tạo:
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {selectedProduct.createdBy?.name || 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Người cập nhật:
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {selectedProduct.updatedBy?.name || 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Ngày tạo:
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {selectedProduct.createdAt ? new Date(selectedProduct.createdAt).toLocaleString('vi-VN') : 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">
                                                Ngày cập nhật:
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {selectedProduct.updatedAt ? new Date(selectedProduct.updatedAt).toLocaleString('vi-VN') : 'N/A'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>

                                {selectedProduct.images && selectedProduct.images.length > 1 && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                            Hình ảnh khác
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                            {selectedProduct.images.slice(1).map((image, index) => (
                                                <Avatar
                                                    key={index}
                                                    src={image}
                                                    alt={`${selectedProduct.name} - ${index + 2}`}
                                                    sx={{ width: 80, height: 80 }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </DialogContent>

            {/* Product Form Dialog */}
            <GinsengProductForm
                open={formOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                mode={formMode}
                initialData={selectedProduct}
            />

            {/* Bulk Actions Dialog */}
            < Dialog
                open={showBulkActions}
                onClose={() => setShowBulkActions(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Hành động hàng loạt</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Bạn đã chọn {selectedProducts.length} sản phẩm. Chọn hành động muốn thực hiện:
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel>Hành động</InputLabel>
                        <Select
                            value={bulkAction}
                            label="Hành động"
                            onChange={(e) => setBulkAction(e.target.value)}
                        >
                            <MenuItem value="activate">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ViewIcon color="success" />
                                    Kích hoạt sản phẩm
                                </Box>
                            </MenuItem>
                            <MenuItem value="deactivate">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <HideIcon color="warning" />
                                    Vô hiệu hóa sản phẩm
                                </Box>
                            </MenuItem>
                            <MenuItem value="out_of_stock">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DeleteIcon color="error" />
                                    Đánh dấu hết hàng
                                </Box>
                            </MenuItem>
                            <MenuItem value="delete">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DeleteIcon color="error" />
                                    Xóa sản phẩm
                                </Box>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowBulkActions(false)}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleBulkAction}
                        variant="contained"
                        color={bulkAction === 'delete' ? 'error' : 'primary'}
                        disabled={!bulkAction}
                    >
                        Thực hiện
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarMessage.includes('✅') ? 'success' : snackbarMessage.includes('❌') ? 'error' : 'info'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default GinsengProductList;
