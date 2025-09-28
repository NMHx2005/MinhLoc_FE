'use client';

import React, { useState, useEffect, use } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Chip,
    Button,
    Breadcrumbs,
    Link as MuiLink,
    Tabs,
    Tab,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    CircularProgress,
    Alert,
    TextField,
    Divider,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import {
    Home,
    Phone,
    Favorite,
    FavoriteBorder,
    Close,
    Add,
    Remove,
    ArrowBack,
    LocalShipping,
    Security,
    Support,
    CheckCircle,
    Spa,
    Inventory,
    LocationOn,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';
import { getProductBySlug, getProducts, type Product } from '@/services/client/productService';

const SamProductDetailPage: React.FC<{ params: Promise<{ slug: string }> }> = ({ params }) => {
    const resolvedParams = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch product by slug
                const productResponse = await getProductBySlug(resolvedParams.slug);
                if (productResponse) {
                    setProduct(productResponse);

                    // Fetch related products (same category)
                    const relatedResponse = await getProducts({
                        category: productResponse.categoryId._id,
                        limit: 4
                    });
                    if (relatedResponse.success && relatedResponse.data) {
                        // Filter out current product
                        const products = relatedResponse.data.products || relatedResponse.data;
                        const filtered = products.filter((p: Product) => p._id !== productResponse._id);
                        setRelatedProducts(filtered.slice(0, 3));
                    }
                } else {
                    setError('Không tìm thấy sản phẩm');
                }
            } catch (err) {
                console.error('Error loading product:', err);
                setError('Có lỗi xảy ra khi tải sản phẩm');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [resolvedParams.slug]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, Math.min(prev + delta, product?.stock || 1)));
    };


    const handleContact = () => {
        if (product?.phone) {
            window.open(`tel:${product.phone}`, '_self');
        }
    };

    const getCategoryColor = (_categoryId: string) => {
        if (!product?.categoryId) return '#666';

        const name = product.categoryId.name.toLowerCase();
        if (name.includes('hồng') || name.includes('hong')) return '#E7C873';
        if (name.includes('nhật') || name.includes('nhat')) return '#4CAF50';
        if (name.includes('hàn') || name.includes('han')) return '#F44336';
        if (name.includes('mỹ') || name.includes('my')) return '#2196F3';
        if (name.includes('canada')) return '#9C27B0';
        return '#666';
    };

    const formatPrice = (price: number | undefined) => {
        if (!price || typeof price !== 'number') {
            return 'Liên hệ';
        }
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (loading) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress size={60} sx={{ color: '#E7C873' }} />
                </Box>
            </Layout>
        );
    }

    if (error || !product) {
        return (
            <Layout>
                <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error || 'Không tìm thấy sản phẩm'}
                    </Alert>
                    <Button
                        component={Link}
                        href="/SamType"
                        variant="contained"
                        startIcon={<ArrowBack />}
                        sx={{ backgroundColor: '#E7C873', '&:hover': { backgroundColor: '#d4b05a' } }}
                    >
                        Quay lại danh sách sản phẩm
                    </Button>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                {/* Breadcrumbs */}
                <Container maxWidth="lg" sx={{ pt: 3, pb: 2 }}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                        <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                            Trang chủ
                        </MuiLink>
                        <MuiLink component={Link} href="/SamType" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Spa sx={{ mr: 0.5 }} fontSize="inherit" />
                            Sâm
                        </MuiLink>
                        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#E7C873', fontWeight: 600 }}>
                            {product.name}
                        </Typography>
                    </Breadcrumbs>
                </Container>

                <Container maxWidth="lg" sx={{ pb: 6 }}>
                    <Grid container spacing={4}>
                        {/* Main Content */}
                        <Grid item xs={12} lg={8}>
                            {/* Product Header */}
                            <Card sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="400"
                                        image={product.images?.[0] || '/placeholder-product.jpg'}
                                        alt={product.name}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            display: 'flex',
                                            gap: 1,
                                        }}
                                    >
                                        <Chip
                                            label={product.categoryId.name}
                                            sx={{
                                                backgroundColor: getCategoryColor(product.categoryId._id),
                                                color: 'white',
                                                fontWeight: 600
                                            }}
                                        />
                                        {product.isFeatured && (
                                            <Chip
                                                label="Nổi bật"
                                                sx={{ color: 'white', backgroundColor: '#E7C873', fontWeight: 600 }}
                                            />
                                        )}
                                        {product.stock < 10 && (
                                            <Chip
                                                label="Sắp hết hàng"
                                                sx={{ color: 'white', backgroundColor: '#f44336', fontWeight: 600 }}
                                            />
                                        )}
                                    </Box>
                                </Box>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#2c3e50' }}>
                                        {product.name}
                                    </Typography>

                                    <Typography variant="h6" sx={{ color: '#E7C873', mb: 2, fontWeight: 600 }}>
                                        {product.categoryId.name} • {product.originId.name}
                                    </Typography>

                                    <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 700, mb: 3 }}>
                                        {formatPrice(product.price)}
                                    </Typography>

                                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#555' }}>
                                        {product.description}
                                    </Typography>
                                </CardContent>
                            </Card>

                            {/* Product Stats */}
                            <Card sx={{ mb: 4, borderRadius: 2 }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
                                        Thông số sản phẩm
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                                <LocationOn sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                                                    Xuất xứ
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {product.originId.name}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                                <Spa sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                                                    Tuổi
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {product.specifications.age ? `${product.specifications.age} năm` : 'N/A'}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                                <Inventory sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                                                    Trọng lượng
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {product.weight} {product.weightUnit}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                                <CheckCircle sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                                                    Cấp độ
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {product.grade}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            {/* Product Images */}
                            {product.images && product.images.length > 1 && (
                                <Card sx={{ mb: 4, borderRadius: 2 }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
                                            Hình ảnh sản phẩm
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {product.images.map((image, index) => (
                                                <Grid item xs={6} sm={4} md={3} key={index}>
                                                    <Card
                                                        sx={{
                                                            cursor: 'pointer',
                                                            border: selectedImage === index ? '2px solid #E7C873' : '1px solid #e0e0e0',
                                                            borderRadius: 2,
                                                            overflow: 'hidden',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                transform: 'translateY(-2px)',
                                                                boxShadow: 4
                                                            }
                                                        }}
                                                        onClick={() => {
                                                            setSelectedImage(index);
                                                            setShowImageModal(true);
                                                        }}
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            height="120"
                                                            image={image}
                                                            alt={`${product.name} ${index + 1}`}
                                                            sx={{ objectFit: 'cover' }}
                                                        />
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Product Details Tabs */}
                            <Card sx={{ borderRadius: 2 }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="product details tabs">
                                        <Tab label="Mô tả chi tiết" />
                                        <Tab label="Thông số kỹ thuật" />
                                        <Tab label="Lợi ích sức khỏe" />
                                        <Tab label="Hướng dẫn sử dụng" />
                                    </Tabs>
                                </Box>
                                <CardContent sx={{ p: 4 }}>
                                    {activeTab === 0 && (
                                        <Box>
                                            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#555', mb: 3 }}>
                                                {product.description}
                                            </Typography>
                                            {product.content && (
                                                <Box
                                                    sx={{
                                                        '& img': {
                                                            maxWidth: '100%',
                                                            height: 'auto',
                                                            borderRadius: 2,
                                                            mb: 2
                                                        }
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: product.content.replace(
                                                            /!\[([^\]]*)\]\(([^)]+)\)/g,
                                                            '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 16px;" />'
                                                        )
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    )}
                                    {activeTab === 1 && (
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <List>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="Danh mục"
                                                            secondary={product.categoryId.name}
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="Xuất xứ"
                                                            secondary={product.originId.name}
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="Cấp độ"
                                                            secondary={product.grade}
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="Trọng lượng"
                                                            secondary={`${product.weight} ${product.weightUnit}`}
                                                        />
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <List>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="Tuổi"
                                                            secondary={product.specifications.age ? `${product.specifications.age} năm` : 'N/A'}
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="Mã SKU"
                                                            secondary={product.sku}
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="Tình trạng"
                                                            secondary={product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                                                        />
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary="Số lượng còn lại"
                                                            secondary={product.stock}
                                                        />
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                        </Grid>
                                    )}
                                    {activeTab === 2 && (
                                        <Box>
                                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                                                Lợi ích sức khỏe
                                            </Typography>
                                            {product.features && product.features.length > 0 ? (
                                                <List>
                                                    {product.features.map((feature, index) => (
                                                        <ListItem key={index}>
                                                            <CheckCircle sx={{ color: '#4CAF50', mr: 2 }} />
                                                            <ListItemText primary={feature} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            ) : (
                                                <Typography color="text.secondary">
                                                    Thông tin lợi ích sức khỏe đang được cập nhật...
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                    {activeTab === 3 && (
                                        <Box>
                                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                                                Hướng dẫn sử dụng
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                                                <strong>Cách sử dụng:</strong><br />
                                                • Ngâm với nước ấm 60-70°C trong 10-15 phút<br />
                                                • Có thể nhai trực tiếp hoặc pha trà<br />
                                                • Sử dụng 1-2 lần/ngày, mỗi lần 3-5g<br />
                                                • Nên sử dụng vào buổi sáng hoặc trước bữa ăn
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                                                <strong>Bảo quản:</strong><br />
                                                • Bảo quản nơi khô ráo, thoáng mát<br />
                                                • Tránh ánh nắng trực tiếp<br />
                                                • Đóng kín sau khi sử dụng<br />
                                                • Hạn sử dụng: 24 tháng kể từ ngày sản xuất
                                            </Typography>
                                            <Alert severity="warning" sx={{ mt: 2 }}>
                                                <strong>Lưu ý:</strong> Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.
                                                Nên tham khảo ý kiến bác sĩ trước khi sử dụng.
                                            </Alert>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Sidebar */}
                        <Grid item xs={12} lg={4}>
                            {/* Product Actions */}
                            <Card sx={{ mb: 4, borderRadius: 2, position: 'sticky', top: 20 }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
                                        {formatPrice(product.price)}
                                    </Typography>

                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            Số lượng
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                onClick={() => handleQuantityChange(-1)}
                                                disabled={quantity <= 1}
                                                sx={{ border: '1px solid #e0e0e0' }}
                                            >
                                                <Remove />
                                            </IconButton>
                                            <TextField
                                                value={quantity}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value) || 1;
                                                    setQuantity(Math.max(1, Math.min(value, product.stock)));
                                                }}
                                                inputProps={{ min: 1, max: product.stock, style: { textAlign: 'center' } }}
                                                sx={{ width: 80 }}
                                                size="small"
                                            />
                                            <IconButton
                                                onClick={() => handleQuantityChange(1)}
                                                disabled={quantity >= product.stock}
                                                sx={{ border: '1px solid #e0e0e0' }}
                                            >
                                                <Add />
                                            </IconButton>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Còn lại: {product.stock} sản phẩm
                                        </Typography>
                                    </Box>

                                    <Stack spacing={2}>
                                        {product.phone ? (
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                size="large"
                                                startIcon={<Phone />}
                                                onClick={handleContact}
                                                sx={{
                                                    backgroundColor: '#E7C873',
                                                    '&:hover': { backgroundColor: '#d4b05a' },
                                                    py: 1.5,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600
                                                }}
                                            >
                                                Liên hệ: {product.phone}
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                size="large"
                                                startIcon={<Phone />}
                                                disabled
                                                sx={{
                                                    backgroundColor: '#ccc',
                                                    '&:hover': { backgroundColor: '#ccc' },
                                                    py: 1.5,
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600
                                                }}
                                            >
                                                Chưa cập nhật số điện thoại
                                            </Button>
                                        )}

                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                                            onClick={() => setIsFavorite(!isFavorite)}
                                            sx={{
                                                borderColor: isFavorite ? '#f44336' : '#e0e0e0',
                                                color: isFavorite ? '#f44336' : '#666',
                                                '&:hover': {
                                                    borderColor: isFavorite ? '#d32f2f' : '#E7C873',
                                                    backgroundColor: isFavorite ? 'rgba(244, 67, 54, 0.1)' : 'rgba(231, 200, 115, 0.1)'
                                                }
                                            }}
                                        >
                                            {isFavorite ? 'Đã yêu thích' : 'Yêu thích'}
                                        </Button>
                                    </Stack>

                                    <Divider sx={{ my: 3 }} />

                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                                            Cam kết chất lượng
                                        </Typography>
                                        <Stack spacing={1}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                <LocalShipping sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    Giao hàng toàn quốc
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                <Security sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    Đảm bảo chính hãng
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                <Support sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    Hỗ trợ 24/7
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50', mb: 4, textAlign: 'center' }}>
                                Sản phẩm liên quan
                            </Typography>
                            <Grid container spacing={3}>
                                {relatedProducts.map((relatedProduct) => (
                                    <Grid item xs={12} sm={6} md={4} key={relatedProduct._id}>
                                        <Card
                                            component={Link}
                                            href={`/SamType/${relatedProduct.slug}`}
                                            sx={{
                                                textDecoration: 'none',
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: 6
                                                }
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={relatedProduct.images?.[0] || '/placeholder-product.jpg'}
                                                alt={relatedProduct.name}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', mb: 1 }}>
                                                    {relatedProduct.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    {relatedProduct.categoryId.name} • {relatedProduct.originId.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                    {relatedProduct.weight} {relatedProduct.weightUnit}
                                                </Typography>
                                                <Typography variant="h6" sx={{ color: '#E7C873', fontWeight: 700 }}>
                                                    {formatPrice(relatedProduct.price)}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Container>

                {/* Image Modal */}
                <Dialog
                    open={showImageModal}
                    onClose={() => setShowImageModal(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">{product.name}</Typography>
                            <IconButton onClick={() => setShowImageModal(false)}>
                                <Close />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <CardMedia
                            component="img"
                            image={product.images?.[selectedImage] || '/placeholder-product.jpg'}
                            alt={product.name}
                            sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
                        />
                    </DialogContent>
                </Dialog>
            </Box>
        </Layout>
    );
};

export default SamProductDetailPage;