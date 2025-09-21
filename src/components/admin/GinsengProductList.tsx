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
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Spa as GinsengIcon,
} from '@mui/icons-material';
import GinsengProductForm from './GinsengProductForm';

interface GinsengProduct {
    id: number;
    name: string;
    category: string;
    origin: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive' | 'out_of_stock';
    description: string;
    image: string;
    createdAt: string;
    weight: string;
    grade: string;
}

interface GinsengProductListProps {
    // Add any props here if needed
}

const GinsengProductList: React.FC<GinsengProductListProps> = () => {
    const [products, setProducts] = useState<GinsengProduct[]>([
        {
            id: 1,
            name: 'Sâm Ngọc Linh Cao Cấp',
            category: 'Sâm Ngọc Linh',
            origin: 'Kontum',
            price: 1200000,
            stock: 25,
            status: 'active',
            description: 'Sâm Ngọc Linh tự nhiên, tuổi 10 năm',
            image: '/placeholder-ginseng.jpg',
            createdAt: '2024-01-15',
            weight: '50g',
            grade: 'A+'
        },
        {
            id: 2,
            name: 'Sâm Hàn Quốc 6 Năm Tuổi',
            category: 'Sâm Hàn Quốc',
            origin: 'Korea',
            price: 800000,
            stock: 45,
            status: 'active',
            description: 'Sâm Hàn Quốc chính hãng 6 năm tuổi',
            image: '/placeholder-ginseng.jpg',
            createdAt: '2024-01-10',
            weight: '75g',
            grade: 'A'
        },
        {
            id: 3,
            name: 'Korean Red Ginseng Premium',
            category: 'Korean Red',
            origin: 'Korea',
            price: 1500000,
            stock: 0,
            status: 'out_of_stock',
            description: 'Hồng sâm Hàn Quốc cao cấp',
            image: '/placeholder-ginseng.jpg',
            createdAt: '2024-01-08',
            weight: '100g',
            grade: 'Premium'
        },
        {
            id: 4,
            name: 'Sâm Ngọc Linh Tươi',
            category: 'Sâm Ngọc Linh',
            origin: 'Kontum',
            price: 500000,
            stock: 15,
            status: 'active',
            description: 'Sâm Ngọc Linh tươi vừa thu hoạch',
            image: '/placeholder-ginseng.jpg',
            createdAt: '2024-01-12',
            weight: '200g',
            grade: 'B+'
        },
        {
            id: 5,
            name: 'Sâm Canada Cao Cấp',
            category: 'Khác',
            origin: 'Canada',
            price: 950000,
            stock: 30,
            status: 'inactive',
            description: 'Sâm Canada xuất khẩu chất lượng cao',
            image: '/placeholder-ginseng.jpg',
            createdAt: '2024-01-05',
            weight: '60g',
            grade: 'A'
        },
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<GinsengProduct | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [originFilter, setOriginFilter] = useState('all');

    const handleChangePage = (event: unknown, newPage: number) => {
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
        setSelectedProduct(null);
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
        if (selectedProduct) {
            setProducts(products.filter(product => product.id !== selectedProduct.id));
            setDeleteDialogOpen(false);
            setSelectedProduct(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleAddProduct = () => {
        setFormMode('add');
        setSelectedProduct(null);
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setSelectedProduct(null);
    };

    const handleFormSubmit = (productData: Partial<GinsengProduct>) => {
        if (formMode === 'add') {
            const newProduct: GinsengProduct = {
                id: Math.max(...products.map(p => p.id)) + 1,
                ...productData as GinsengProduct,
                createdAt: new Date().toISOString().split('T')[0],
            };
            setProducts([...products, newProduct]);
        } else if (formMode === 'edit' && selectedProduct) {
            setProducts(products.map(product =>
                product.id === selectedProduct.id
                    ? { ...product, ...productData }
                    : product
            ));
        }
        handleFormClose();
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

    const getCategoryIcon = (category: string) => {
        return <GinsengIcon sx={{ color: '#4caf50' }} />;
    };

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
        const matchesOrigin = originFilter === 'all' || product.origin === originFilter;

        return matchesSearch && matchesCategory && matchesStatus && matchesOrigin;
    });

    const paginatedProducts = filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const uniqueOrigins = [...new Set(products.map(p => p.origin))];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Danh sách Sản phẩm Sâm ({filteredProducts.length})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddProduct}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    Thêm Sản phẩm
                </Button>
            </Box>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
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
                                    {uniqueCategories.map(category => (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
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
                                    {uniqueOrigins.map(origin => (
                                        <MenuItem key={origin} value={origin}>{origin}</MenuItem>
                                    ))}
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
                                <TableCell>Sản phẩm</TableCell>
                                <TableCell>Phân loại</TableCell>
                                <TableCell>Xuất xứ</TableCell>
                                <TableCell align="right">Giá bán</TableCell>
                                <TableCell align="center">Tồn kho</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Cấp độ</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedProducts.map((product) => (
                                <TableRow key={product.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                src={product.image}
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
                                                    {product.weight} • {product.description.substring(0, 30)}...
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.origin}</TableCell>
                                    <TableCell align="right">
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {product.price.toLocaleString('vi-VN')} đ
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: product.stock === 0 ? 'error.main' :
                                                    product.stock < 10 ? 'warning.main' : 'success.main'
                                            }}
                                        >
                                            {product.stock}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={getStatusLabel(product.status)}
                                            color={getStatusColor(product.status) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={product.grade}
                                            variant="outlined"
                                            size="small"
                                            sx={{ fontWeight: 600 }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={(e) => handleMenuOpen(e, product)}
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
                    count={filteredProducts.length}
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
                        Bạn có chắc chắn muốn xóa sản phẩm "{selectedProduct?.name}"?
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

            {/* Product Form Dialog */}
            <GinsengProductForm
                open={formOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                mode={formMode}
                initialData={selectedProduct}
            />
        </Box>
    );
};

export default GinsengProductList;
