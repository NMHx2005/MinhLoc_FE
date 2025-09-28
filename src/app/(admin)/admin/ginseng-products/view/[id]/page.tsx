'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import {
    Box,
    Typography,
    Container,
    Breadcrumbs,
    Link,
    Button,
    Alert,
    CircularProgress,
    Card,
    CardContent,
    Grid,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Spa as GinsengIcon,
    Visibility as ViewIcon,
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Image as ImageIcon,
    Category as CategoryIcon,
    LocationOn as LocationIcon,
    Scale as ScaleIcon,
    AttachMoney as PriceIcon,
    Inventory as StockIcon,
    Grade as GradeIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../../../components/admin/AdminLayout';
import { ginsengService } from '../../../../../../services/admin/ginsengService';
import type { GinsengProduct } from '../../../../../../services/admin/ginsengService';

const ViewGinsengProductPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<GinsengProduct | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const loadProduct = useCallback(async () => {
        if (!productId) {
            setError('Không tìm thấy ID sản phẩm.');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await ginsengService.getProductById(productId);
            setProduct(response);
        } catch (err: unknown) {
            console.error('Error loading product:', err);
            setError('Không thể tải thông tin sản phẩm');
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    const handleEdit = () => {
        router.push(`/admin/ginseng-products/edit/${productId}`);
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!product) return;

        try {
            setDeleting(true);
            await ginsengService.deleteProduct(productId);

            // Redirect to main page after successful deletion
            router.push('/admin/ginseng-products');
        } catch (err: unknown) {
            console.error('Error deleting product:', err);
            setError('Không thể xóa sản phẩm');
        } finally {
            setDeleting(false);
            setDeleteDialogOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const handleBack = () => {
        router.push('/admin/ginseng-products');
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'error';
            case 'draft':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active':
                return 'Hoạt động';
            case 'inactive':
                return 'Tạm dừng';
            case 'draft':
                return 'Bản nháp';
            default:
                return status;
        }
    };

    const getGradeLabel = (grade: string) => {
        switch (grade) {
            case 'premium':
                return 'Premium';
            case 'standard':
                return 'Standard';
            case 'economy':
                return 'Economy';
            default:
                return grade;
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                        <CircularProgress />
                    </Box>
                </Container>
            </AdminLayout>
        );
    }

    if (error && !product) {
        return (
            <AdminLayout>
                <Container maxWidth="xl">
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                    >
                        Quay lại danh sách
                    </Button>
                </Container>
            </AdminLayout>
        );
    }

    if (!product) {
        return (
            <AdminLayout>
                <Container maxWidth="xl">
                    <Alert severity="warning" sx={{ mb: 3 }}>
                        Không tìm thấy sản phẩm
                    </Alert>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                    >
                        Quay lại danh sách
                    </Button>
                </Container>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <Container maxWidth="xl">
                {/* Breadcrumbs */}
                <Breadcrumbs sx={{ mb: 3 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Trang chủ
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/admin"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Dashboard
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/admin/ginseng-products"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <GinsengIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Quản lý Sản phẩm Sâm
                    </Link>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ViewIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Chi tiết Sản phẩm
                    </Box>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                            🌿 Chi tiết Sản phẩm Sâm
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {product.name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={handleBack}
                            variant="outlined"
                        >
                            Quay lại
                        </Button>
                        <Button
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                            variant="contained"
                            color="primary"
                        >
                            Chỉnh sửa
                        </Button>
                        <Button
                            startIcon={<DeleteIcon />}
                            onClick={handleDelete}
                            variant="outlined"
                            color="error"
                        >
                            Xóa
                        </Button>
                    </Box>
                </Box>

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {/* Left Column: Product Images */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Hình ảnh sản phẩm
                                </Typography>

                                {product.images && product.images.length > 0 ? (
                                    <Box>
                                        {/* Main Image */}
                                        <Box sx={{ mb: 2, position: 'relative', width: '100%', height: 300 }}>
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                style={{
                                                    objectFit: 'cover',
                                                    borderRadius: 8,
                                                    border: '1px solid #e0e0e0'
                                                }}
                                            />
                                        </Box>

                                        {/* Thumbnail Images */}
                                        {product.images.length > 1 && (
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                {product.images.slice(1).map((image, index) => (
                                                    <Box key={index} sx={{ position: 'relative', width: 80, height: 80 }}>
                                                        <Image
                                                            src={image}
                                                            alt={`${product.name} - ${index + 2}`}
                                                            fill
                                                            style={{
                                                                objectFit: 'cover',
                                                                borderRadius: 4,
                                                                border: '1px solid #e0e0e0',
                                                                cursor: 'pointer'
                                                            }}
                                                        />
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                ) : (
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 200,
                                        border: '2px dashed #e0e0e0',
                                        borderRadius: 2
                                    }}>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                                            <Typography variant="body2" color="text.secondary">
                                                Chưa có hình ảnh
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Column: Product Details */}
                    <Grid item xs={12} md={8}>
                        {/* Basic Information */}
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                    Thông tin cơ bản
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 600 }}>
                                                Tên sản phẩm:
                                            </Typography>
                                            <Typography variant="body1">
                                                {product.name}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 600 }}>
                                                SKU:
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                                {product.sku}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <PriceIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 600 }}>
                                                Giá:
                                            </Typography>
                                            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                                                {formatPrice(product.price)}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <StockIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 600 }}>
                                                Tồn kho:
                                            </Typography>
                                            <Typography variant="body1">
                                                {product.stock} sản phẩm
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <ScaleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 600 }}>
                                                Trọng lượng:
                                            </Typography>
                                            <Typography variant="body1">
                                                {product.weight} {product.weightUnit}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <GradeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 600 }}>
                                                Phân loại:
                                            </Typography>
                                            <Chip
                                                label={getGradeLabel(product.grade)}
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <CategoryIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 600 }}>
                                                Danh mục:
                                            </Typography>
                                            <Typography variant="body1">
                                                {product.categoryId?.name || product.category || 'Chưa phân loại'}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 600 }}>
                                                Xuất xứ:
                                            </Typography>
                                            <Typography variant="body1">
                                                {product.originId?.name || product.origin || 'Chưa xác định'}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 600 }}>
                                                Trạng thái:
                                            </Typography>
                                            <Chip
                                                icon={product.status === 'active' ? <ActiveIcon /> : <InactiveIcon />}
                                                label={getStatusLabel(product.status)}
                                                color={getStatusColor(product.status) as 'success' | 'error' | 'warning' | 'default'}
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Mô tả sản phẩm
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                    {product.description || 'Chưa có mô tả'}
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* Detailed Content */}
                        {product.content && (
                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Nội dung chi tiết
                                    </Typography>
                                    <Box
                                        sx={{
                                            '& img': { maxWidth: '100%', height: 'auto' },
                                            '& p': { marginBottom: 2 }
                                        }}
                                        dangerouslySetInnerHTML={{ __html: product.content }}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Metadata */}
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Thông tin hệ thống
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Ngày tạo:</strong> {new Date(product.createdAt).toLocaleString('vi-VN')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Cập nhật lần cuối:</strong> {new Date(product.updatedAt).toLocaleString('vi-VN')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteCancel}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        Xác nhận xóa sản phẩm
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Bạn có chắc chắn muốn xóa sản phẩm <strong>"{product.name}"</strong> không?
                        </Typography>
                        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                            Hành động này không thể hoàn tác!
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteCancel} disabled={deleting}>
                            Hủy
                        </Button>
                        <Button
                            onClick={handleDeleteConfirm}
                            color="error"
                            variant="contained"
                            disabled={deleting}
                            startIcon={deleting ? <CircularProgress size={20} /> : <DeleteIcon />}
                        >
                            {deleting ? 'Đang xóa...' : 'Xóa'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </AdminLayout>
    );
};

export default ViewGinsengProductPage;
