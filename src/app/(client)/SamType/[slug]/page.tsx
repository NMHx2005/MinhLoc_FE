"use client";

import React, { useState, useEffect, use } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Breadcrumbs,
    Link as MuiLink,
    Button,
    Chip,
    Stack,
    Rating,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Home,
    LocalFlorist,
    ShoppingCart,
    FavoriteBorder,
    Share,
    CheckCircle,
    HealthAndSafety,
    Spa,
    Inventory,
    AccessTime,
    LocationOn,
    Close,
    Add,
    Remove,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';

interface SamProduct {
    id: number;
    name: string;
    category: 'hong-sam' | 'nhat-sam' | 'han-quoc-sam' | 'my-sam' | 'canada-sam';
    origin: string;
    age: string;
    price: number;
    originalPrice?: number;
    image: string;
    images: string[];
    rating: number;
    reviewCount: number;
    description: string;
    detailedDescription: string;
    benefits: string[];
    ingredients: string[];
    usage: string;
    storage: string;
    weight: string;
    isNew: boolean;
    isBestSeller: boolean;
    isLimited: boolean;
    stock: number;
    slug: string;
    relatedProducts: {
        id: number;
        name: string;
        image: string;
        price: number;
        slug: string;
    }[];
}

const SamProductDetailPage: React.FC<{ params: Promise<{ slug: string }> }> = ({ params }) => {
    const [product, setProduct] = useState<SamProduct | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const resolvedParams = use(params);

    useEffect(() => {
        // Mock data - trong thực tế sẽ fetch từ API dựa trên slug
        const mockProduct: SamProduct = {
            id: 1,
            name: 'Hồng Sâm Hàn Quốc 6 năm tuổi',
            category: 'hong-sam',
            origin: 'Hàn Quốc',
            age: '6 năm',
            price: 2500000,
            originalPrice: 3000000,
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/87/phoi-canh-tu-can-ho-the-prive-quan-2-anh-theprive-net-vn.jpg',
            images: [
                'https://datxanhmiennam.com.vn/Data/Sites/1/Product/87/phoi-canh-tu-can-ho-the-prive-quan-2-anh-theprive-net-vn.jpg',
                'https://datxanhmiennam.com.vn/Data/Sites/1/Product/86/th%C3%B4ng-tin-d%E1%BB%B1-%C3%A1n-stown-gateway-h%C3%ACnh-%E1%BA%A3nh-5_6.jpg',
                'https://datxanhmiennam.com.vn/Data/Sites/1/Product/85/phoi-canh-the-gio-riverside.jpg',
                'https://datxanhmiennam.com.vn/Data/Sites/1/Product/84/b%E1%BA%A3n-sao-c%E1%BB%A7a-db06e9991a33a36dfa22.jpg',
            ],
            rating: 4.8,
            reviewCount: 156,
            description: 'Hồng sâm Hàn Quốc 6 năm tuổi được chế biến từ nhân sâm tươi 6 năm tuổi, có tác dụng bồi bổ sức khỏe, tăng cường miễn dịch và chống lão hóa.',
            detailedDescription: `
                <p>Hồng sâm Hàn Quốc 6 năm tuổi là sản phẩm cao cấp được chế biến từ nhân sâm tươi 6 năm tuổi theo phương pháp truyền thống của Hàn Quốc. Quá trình chế biến kỹ lưỡng giúp tăng cường hàm lượng saponin - hoạt chất quý giá nhất trong sâm.</p>
                
                <h3>Đặc điểm nổi bật</h3>
                <p>Sản phẩm được chọn lọc từ những củ sâm chất lượng cao nhất, đảm bảo độ tinh khiết và hiệu quả tối ưu. Mỗi viên sâm đều được kiểm tra chất lượng nghiêm ngặt trước khi đóng gói.</p>
                
                <h3>Quy trình sản xuất</h3>
                <p>Nhân sâm tươi được thu hoạch sau 6 năm trồng trọt, sau đó trải qua quá trình hấp và sấy khô theo phương pháp truyền thống. Quá trình này giúp tăng cường hoạt tính sinh học và bảo quản được lâu dài.</p>
                
                <h3>Chứng nhận chất lượng</h3>
                <p>Sản phẩm đã được chứng nhận bởi các tổ chức quốc tế về chất lượng và an toàn thực phẩm, đảm bảo không chứa chất bảo quản độc hại.</p>
            `,
            benefits: [
                'Tăng cường sức đề kháng và hệ miễn dịch',
                'Bồi bổ khí huyết, cải thiện tuần hoàn máu',
                'Chống lão hóa, làm đẹp da từ bên trong',
                'Cải thiện trí nhớ và khả năng tập trung',
                'Tăng cường sinh lực và sức bền',
                'Hỗ trợ chức năng gan và thận',
                'Giảm căng thẳng, mệt mỏi',
                'Tăng cường chức năng tim mạch'
            ],
            ingredients: [
                'Nhân sâm 6 năm tuổi (Panax ginseng)',
                'Mật ong tự nhiên',
                'Đường phèn tinh khiết',
                'Tinh chất sâm cô đặc',
                'Vitamin E tự nhiên',
                'Chất chống oxy hóa'
            ],
            usage: 'Ngày 1-2 lần, mỗi lần 1-2 viên, uống với nước ấm trước bữa ăn 30 phút. Không nên sử dụng quá liều khuyến nghị.',
            storage: 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Nhiệt độ bảo quản dưới 25°C. Đậy kín nắp sau khi sử dụng.',
            weight: '100g (60 viên)',
            isNew: true,
            isBestSeller: true,
            isLimited: false,
            stock: 50,
            slug: 'hong-sam-han-quoc-6-nam-tuoi',
            relatedProducts: [
                {
                    id: 2,
                    name: 'Nhật Sâm Tươi Cao Cấp',
                    image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/86/th%C3%B4ng-tin-d%E1%BB%B1-%C3%A1n-stown-gateway-h%C3%ACnh-%E1%BA%A3nh-5_6.jpg',
                    price: 1800000,
                    slug: 'nhat-sam-tuoi-cao-cap'
                },
                {
                    id: 3,
                    name: 'Hàn Quốc Sâm Đỏ Premium',
                    image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/85/phoi-canh-the-gio-riverside.jpg',
                    price: 3500000,
                    slug: 'han-quoc-sam-do-premium'
                },
                {
                    id: 4,
                    name: 'Mỹ Sâm Tây Bắc',
                    image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/84/b%E1%BA%A3n-sao-c%E1%BB%A7a-db06e9991a33a36dfa22.jpg',
                    price: 1200000,
                    slug: 'my-sam-tay-bac'
                }
            ]
        };
        setProduct(mockProduct);
    }, [resolvedParams.slug]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, Math.min(prev + delta, product?.stock || 1)));
    };

    const handleAddToCart = () => {
        // Logic thêm vào giỏ hàng
        // TODO: Implement add to cart functionality
    };

    const handleBuyNow = () => {
        // Logic mua ngay
        // TODO: Implement buy now functionality
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'hong-sam': return '#E7C873';
            case 'nhat-sam': return '#4CAF50';
            case 'han-quoc-sam': return '#F44336';
            case 'my-sam': return '#2196F3';
            case 'canada-sam': return '#9C27B0';
            default: return '#666';
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'hong-sam': return 'Hồng Sâm';
            case 'nhat-sam': return 'Nhật Sâm';
            case 'han-quoc-sam': return 'Hàn Quốc Sâm';
            case 'my-sam': return 'Mỹ Sâm';
            case 'canada-sam': return 'Canada Sâm';
            default: return category;
        }
    };

    if (!product) {
        return (
            <Layout>
                <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                    <Typography variant="h4">Đang tải...</Typography>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '40vh', md: '50vh' },
                    overflow: 'hidden',
                    pt: { xs: 12, md: 16 },
                }}
            >
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        p: 4,
                    }}
                >
                    <Container maxWidth="lg">
                        <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white', mb: 2 }}>
                            <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                                Trang chủ
                            </MuiLink>
                            <MuiLink component={Link} href="/SamType" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocalFlorist sx={{ mr: 0.5 }} fontSize="inherit" />
                                Các Loại Sâm
                            </MuiLink>
                            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#E7C873' }}>
                                {product.name}
                            </Typography>
                        </Breadcrumbs>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip
                                label={getCategoryLabel(product.category)}
                                sx={{
                                    backgroundColor: getCategoryColor(product.category),
                                    color: 'white',
                                    fontWeight: 600,
                                }}
                            />
                            {product.isNew && (
                                <Chip
                                    label="MỚI"
                                    sx={{
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        fontWeight: 600,
                                    }}
                                />
                            )}
                            {product.isBestSeller && (
                                <Chip
                                    label="BÁN CHẠY"
                                    sx={{
                                        backgroundColor: '#FF5722',
                                        color: 'white',
                                        fontWeight: 600,
                                    }}
                                />
                            )}
                            {product.isLimited && (
                                <Chip
                                    label="CÓ HẠN"
                                    sx={{
                                        backgroundColor: '#9C27B0',
                                        color: 'white',
                                        fontWeight: 600,
                                    }}
                                />
                            )}
                        </Box>

                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.5rem' },
                                lineHeight: 1.2,
                            }}
                        >
                            {product.name}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 2, sm: 3 },
                            color: 'white',
                            flexWrap: 'wrap'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Rating value={product.rating} precision={0.1} size="small" readOnly />
                                <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                                    ({product.reviewCount} đánh giá)
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocationOn sx={{ fontSize: 16 }} />
                                <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                                    {product.origin}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Spa sx={{ fontSize: 16 }} />
                                <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                                    {product.age}
                                </Typography>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                <Grid container spacing={{ xs: 3, md: 4 }}>
                    {/* Product Images */}
                    <Grid item xs={12} lg={6}>
                        <Card sx={{ mb: 3, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={product.images[selectedImage]}
                                alt={product.name}
                                sx={{
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        opacity: 0.9,
                                    }
                                }}
                                onClick={() => setShowImageModal(true)}
                            />
                        </Card>

                        {/* Thumbnail Images */}
                        <Grid container spacing={1}>
                            {product.images.map((image, index) => (
                                <Grid item xs={3} key={index}>
                                    <Card
                                        sx={{
                                            cursor: 'pointer',
                                            border: selectedImage === index ? '2px solid #E7C873' : '1px solid #e0e0e0',
                                            borderRadius: 1,
                                            overflow: 'hidden',
                                        }}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="80"
                                            image={image}
                                            alt={`${product.name} ${index + 1}`}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Product Info */}
                    <Grid item xs={12} lg={6}>
                        <Card sx={{ mb: 3, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                                {/* Price */}
                                <Box sx={{ mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                fontWeight: 700,
                                                color: '#E7C873',
                                            }}
                                        >
                                            {product.price.toLocaleString('vi-VN')} VNĐ
                                        </Typography>
                                        {product.originalPrice && (
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textDecoration: 'line-through',
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                {product.originalPrice.toLocaleString('vi-VN')} VNĐ
                                            </Typography>
                                        )}
                                    </Box>
                                    {product.originalPrice && (
                                        <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                                            Tiết kiệm: {((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)}%
                                        </Typography>
                                    )}
                                </Box>

                                {/* Description */}
                                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                                    {product.description}
                                </Typography>

                                {/* Product Details */}
                                <Stack spacing={2} sx={{ mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <HealthAndSafety sx={{ fontSize: 20, color: '#666' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Xuất xứ: {product.origin}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Spa sx={{ fontSize: 20, color: '#666' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Tuổi: {product.age}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Inventory sx={{ fontSize: 20, color: '#666' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Trọng lượng: {product.weight}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <AccessTime sx={{ fontSize: 20, color: '#666' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Bảo quản: {product.storage}
                                        </Typography>
                                    </Box>
                                </Stack>

                                {/* Stock Status */}
                                <Typography
                                    variant="body2"
                                    color={product.stock > 10 ? 'success.main' : 'error.main'}
                                    sx={{ mb: 3, fontWeight: 600 }}
                                >
                                    {product.stock > 10 ? 'Còn hàng' : `Chỉ còn ${product.stock} sản phẩm`}
                                </Typography>

                                {/* Quantity Selector */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        Số lượng:
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                        <IconButton
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity <= 1}
                                            size="small"
                                        >
                                            <Remove />
                                        </IconButton>
                                        <Typography sx={{ px: 2, minWidth: 40, textAlign: 'center' }}>
                                            {quantity}
                                        </Typography>
                                        <IconButton
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={quantity >= product.stock}
                                            size="small"
                                        >
                                            <Add />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {/* Action Buttons */}
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={{ xs: 1, sm: 2 }}
                                    sx={{ mb: 3 }}
                                >
                                    <Button
                                        variant="contained"
                                        startIcon={<ShoppingCart />}
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        sx={{
                                            backgroundColor: '#E7C873',
                                            flex: 1,
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: '#d4b85a',
                                            },
                                        }}
                                    >
                                        Thêm vào giỏ
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<FavoriteBorder />}
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        sx={{
                                            borderColor: '#E7C873',
                                            color: '#E7C873',
                                            minWidth: { xs: 'auto', sm: '120px' },
                                            '&:hover': {
                                                backgroundColor: '#E7C873',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                            {isFavorite ? 'Đã yêu thích' : 'Yêu thích'}
                                        </Box>
                                        <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>
                                            {isFavorite ? '♥' : '♡'}
                                        </Box>
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Share />}
                                        sx={{
                                            borderColor: '#E7C873',
                                            color: '#E7C873',
                                            minWidth: { xs: 'auto', sm: '120px' },
                                            '&:hover': {
                                                backgroundColor: '#E7C873',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                            Chia sẻ
                                        </Box>
                                    </Button>
                                </Stack>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                    sx={{
                                        backgroundColor: '#1976D2',
                                        py: 1.5,
                                        '&:hover': {
                                            backgroundColor: '#1565C0',
                                        },
                                    }}
                                >
                                    Mua ngay
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Product Details Tabs */}
                <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            '& .MuiTab-root': {
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'none',
                            },
                            '& .Mui-selected': {
                                color: '#E7C873 !important',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#E7C873',
                            },
                        }}
                    >
                        <Tab label="Mô tả chi tiết" />
                        <Tab label="Thành phần" />
                        <Tab label="Cách sử dụng" />
                        <Tab label="Lợi ích" />
                    </Tabs>

                    <CardContent sx={{ p: 4 }}>
                        {activeTab === 0 && (
                            <Box
                                sx={{
                                    '& h3': {
                                        fontSize: '1.5rem',
                                        fontWeight: 600,
                                        color: '#E7C873',
                                        mb: 2,
                                        mt: 3,
                                    },
                                    '& p': {
                                        fontSize: '1.1rem',
                                        lineHeight: 1.8,
                                        mb: 2,
                                        color: '#333',
                                    },
                                }}
                                dangerouslySetInnerHTML={{ __html: product.detailedDescription }}
                            />
                        )}

                        {activeTab === 1 && (
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                    Thành phần chính
                                </Typography>
                                <List>
                                    {product.ingredients.map((ingredient, index) => (
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <CheckCircle sx={{ color: '#4CAF50' }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={ingredient}
                                                primaryTypographyProps={{ fontSize: '1rem' }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}

                        {activeTab === 2 && (
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                    Hướng dẫn sử dụng
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                                    {product.usage}
                                </Typography>

                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#E7C873' }}>
                                    Cách bảo quản
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                    {product.storage}
                                </Typography>
                            </Box>
                        )}

                        {activeTab === 3 && (
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                    Lợi ích sức khỏe
                                </Typography>
                                <Grid container spacing={{ xs: 1, sm: 2 }}>
                                    {product.benefits.map((benefit, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                                                <CheckCircle sx={{ color: '#4CAF50', mt: 0.5, flexShrink: 0 }} />
                                                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                                    {benefit}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                    </CardContent>
                </Card>

                {/* Related Products */}
                <Card sx={{ borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                            Sản phẩm liên quan
                        </Typography>
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            {product.relatedProducts.map((relatedProduct) => (
                                <Grid item xs={12} sm={6} lg={4} key={relatedProduct.id}>
                                    <Card
                                        component={Link}
                                        href={`/SamType/${relatedProduct.slug}`}
                                        sx={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            transition: 'all 0.3s ease',
                                            borderRadius: 1,
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={relatedProduct.image}
                                            alt={relatedProduct.name}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <CardContent sx={{ p: 2 }}>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight: 600,
                                                    mb: 1,
                                                    fontSize: '0.9rem',
                                                    lineHeight: 1.4,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {relatedProduct.name}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#E7C873',
                                                }}
                                            >
                                                {relatedProduct.price.toLocaleString('vi-VN')} VNĐ
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Container>

            {/* Image Modal */}
            <Dialog
                open={showImageModal}
                onClose={() => setShowImageModal(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box component="span" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        {product.name} - Hình {selectedImage + 1}
                    </Box>
                    <IconButton onClick={() => setShowImageModal(false)} sx={{ color: 'white' }}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <CardMedia
                        component="img"
                        image={product.images[selectedImage]}
                        alt={product.name}
                        sx={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowImageModal(false)}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default SamProductDetailPage;
