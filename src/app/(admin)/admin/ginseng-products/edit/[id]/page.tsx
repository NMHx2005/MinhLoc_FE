'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Box,
    Typography,
    Container,
    Breadcrumbs,
    Link,
    Button,
    Alert,
    Snackbar,
    CircularProgress,
} from '@mui/material';
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Spa as GinsengIcon,
    Edit as EditIcon,
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../../../components/admin/AdminLayout';
import GinsengProductFormPage from '../../../../../../components/admin/GinsengProductFormPage';
import { ginsengService } from '../../../../../../services/admin/ginsengService';
import type { GinsengProduct, UpdateProductData, CreateProductData } from '../../../../../../services/admin/ginsengService';

const EditGinsengProductPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [product, setProduct] = useState<GinsengProduct | null>(null);

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

    const handleSave = async (data: CreateProductData | UpdateProductData) => {
        try {
            setSaving(true);
            setError(null);

            await ginsengService.updateProduct(data as UpdateProductData);

            setSnackbarMessage('Cập nhật sản phẩm sâm thành công!');
            setSnackbarOpen(true);

            // Redirect to main page after successful update
            setTimeout(() => {
                router.push('/admin/ginseng-products');
            }, 1500);

        } catch (err: unknown) {
            console.error('Error updating ginseng product:', err);
            const errorMessage = err instanceof Error && 'response' in err
                ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
                : 'Có lỗi xảy ra khi cập nhật sản phẩm sâm';
            setError(errorMessage || 'Có lỗi xảy ra khi cập nhật sản phẩm sâm');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        router.push('/admin/ginseng-products');
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
                        onClick={handleCancel}
                    >
                        Quay lại
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
                        <EditIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Chỉnh sửa Sản phẩm
                    </Box>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={handleCancel}
                        sx={{ mr: 2 }}
                    >
                        Quay lại
                    </Button>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                            🌿 Chỉnh sửa Sản phẩm Sâm
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Cập nhật thông tin sản phẩm sâm: {product?.name}
                        </Typography>
                    </Box>
                </Box>

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {/* Product Form */}
                {product && (
                    <GinsengProductFormPage
                        mode="edit"
                        product={product}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        loading={saving}
                    />
                )}

                {/* Success Snackbar */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                />
            </Container>
        </AdminLayout>
    );
};

export default EditGinsengProductPage;
