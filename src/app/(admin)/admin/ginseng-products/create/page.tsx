'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Typography,
    Container,
    Breadcrumbs,
    Link,
    Button,
    Alert,
    Snackbar,
} from '@mui/material';
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Spa as GinsengIcon,
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../../components/admin/AdminLayout';
import GinsengProductFormPage from '../../../../../components/admin/GinsengProductFormPage';
import type { CreateProductData, UpdateProductData } from '../../../../../services/admin/ginsengService';

const CreateGinsengProductPage: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSave = async (data: CreateProductData | UpdateProductData) => {
        try {
            setLoading(true);
            setError(null);

            // Here you would call the API to create the product
            // await ginsengService.createProduct(data as CreateProductData);
            console.log('Creating product with data:', data);

            setSnackbarMessage('Tạo sản phẩm sâm thành công!');
            setSnackbarOpen(true);

            // Redirect to main page after successful creation
            setTimeout(() => {
                router.push('/admin/ginseng-products');
            }, 1500);

        } catch (err: unknown) {
            console.error('Error creating ginseng product:', err);
            const errorMessage = err instanceof Error && 'response' in err
                ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
                : 'Có lỗi xảy ra khi tạo sản phẩm sâm';
            setError(errorMessage || 'Có lỗi xảy ra khi tạo sản phẩm sâm');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/admin/ginseng-products');
    };

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
                        <AddIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Thêm Sản phẩm Mới
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
                            🌿 Thêm Sản phẩm Sâm Mới
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Tạo sản phẩm sâm mới với đầy đủ thông tin chi tiết.
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
                <GinsengProductFormPage
                    mode="add"
                    onSave={handleSave}
                    onCancel={handleCancel}
                    loading={loading}
                />

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

export default CreateGinsengProductPage;
