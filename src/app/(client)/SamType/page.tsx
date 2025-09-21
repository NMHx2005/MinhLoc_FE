"use client";

import React, { useState } from 'react';
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
    TextField,
    InputAdornment,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Paper,
    Rating,
} from '@mui/material';
import {
    Home,
    LocalFlorist,
    Search,
    Star,
    ShoppingCart,
    Favorite,
    FavoriteBorder,
    Visibility,
    Inventory,
    CheckCircle,
    HealthAndSafety,
    Spa,
    Nature
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
    rating: number;
    reviewCount: number;
    description: string;
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
}

const SamTypePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [favorites, setFavorites] = useState<number[]>([]);

    const categories = [
        { value: 'all', label: 'Tất cả loại sâm' },
        { value: 'hong-sam', label: 'Hồng Sâm' },
        { value: 'nhat-sam', label: 'Nhật Sâm' },
        { value: 'han-quoc-sam', label: 'Hàn Quốc Sâm' },
        { value: 'my-sam', label: 'Mỹ Sâm' },
        { value: 'canada-sam', label: 'Canada Sâm' },
    ];

    const samProducts: SamProduct[] = [
        {
            id: 1,
            name: 'Hồng Sâm Hàn Quốc 6 năm tuổi',
            category: 'hong-sam',
            origin: 'Hàn Quốc',
            age: '6 năm',
            price: 2500000,
            originalPrice: 3000000,
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/87/phoi-canh-tu-can-ho-the-prive-quan-2-anh-theprive-net-vn.jpg',
            rating: 4.8,
            reviewCount: 156,
            description: 'Hồng sâm Hàn Quốc 6 năm tuổi được chế biến từ nhân sâm tươi 6 năm tuổi, có tác dụng bồi bổ sức khỏe, tăng cường miễn dịch và chống lão hóa.',
            benefits: [
                'Tăng cường sức đề kháng',
                'Bồi bổ khí huyết',
                'Chống lão hóa',
                'Cải thiện trí nhớ',
                'Tăng cường sinh lực'
            ],
            ingredients: ['Nhân sâm 6 năm tuổi', 'Mật ong', 'Đường phèn', 'Tinh chất sâm'],
            usage: 'Ngày 1-2 lần, mỗi lần 1-2 viên, uống với nước ấm',
            storage: 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp',
            weight: '100g',
            isNew: true,
            isBestSeller: true,
            isLimited: false,
            stock: 50,
            slug: 'hong-sam-han-quoc-6-nam-tuoi'
        },
        {
            id: 2,
            name: 'Nhật Sâm Tươi Cao Cấp',
            category: 'nhat-sam',
            origin: 'Nhật Bản',
            age: '4 năm',
            price: 1800000,
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/86/th%C3%B4ng-tin-d%E1%BB%B1-%C3%A1n-stown-gateway-h%C3%ACnh-%E1%BA%A3nh-5_6.jpg',
            rating: 4.6,
            reviewCount: 89,
            description: 'Nhật sâm tươi cao cấp được trồng và chăm sóc theo phương pháp truyền thống, giữ nguyên được dưỡng chất quý giá.',
            benefits: [
                'Bổ sung năng lượng',
                'Cải thiện tuần hoàn máu',
                'Tăng cường chức năng gan',
                'Hỗ trợ tiêu hóa',
                'Giảm căng thẳng'
            ],
            ingredients: ['Nhật sâm tươi 4 năm tuổi', 'Chất bảo quản tự nhiên'],
            usage: 'Ngâm với nước ấm 30 phút, uống 1-2 lần/ngày',
            storage: 'Bảo quản trong tủ lạnh, sử dụng trong 30 ngày',
            weight: '200g',
            isNew: false,
            isBestSeller: false,
            isLimited: true,
            stock: 15,
            slug: 'nhat-sam-tuoi-cao-cap'
        },
        {
            id: 3,
            name: 'Hàn Quốc Sâm Đỏ Premium',
            category: 'han-quoc-sam',
            origin: 'Hàn Quốc',
            age: '8 năm',
            price: 3500000,
            originalPrice: 4000000,
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/85/phoi-canh-the-gio-riverside.jpg',
            rating: 4.9,
            reviewCount: 234,
            description: 'Hàn Quốc sâm đỏ premium 8 năm tuổi - sản phẩm cao cấp nhất với hàm lượng saponin cao, mang lại hiệu quả tối ưu.',
            benefits: [
                'Tăng cường miễn dịch mạnh mẽ',
                'Chống oxy hóa cao',
                'Cải thiện chức năng não',
                'Tăng cường sinh lý nam',
                'Hỗ trợ điều trị tiểu đường'
            ],
            ingredients: ['Sâm đỏ Hàn Quốc 8 năm tuổi', 'Chiết xuất sâm', 'Vitamin E', 'Chất chống oxy hóa'],
            usage: 'Ngày 1 lần, mỗi lần 1 viên, uống trước bữa ăn 30 phút',
            storage: 'Bảo quản nơi khô ráo, nhiệt độ dưới 25°C',
            weight: '60 viên',
            isNew: false,
            isBestSeller: true,
            isLimited: false,
            stock: 25,
            slug: 'han-quoc-sam-do-premium'
        },
        {
            id: 4,
            name: 'Mỹ Sâm Tây Bắc',
            category: 'my-sam',
            origin: 'Mỹ',
            age: '5 năm',
            price: 1200000,
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/84/b%E1%BA%A3n-sao-c%E1%BB%A7a-db06e9991a33a36dfa22.jpg',
            rating: 4.4,
            reviewCount: 67,
            description: 'Mỹ sâm Tây Bắc được trồng tại vùng núi cao, có khí hậu lạnh phù hợp, cho chất lượng sâm đặc biệt.',
            benefits: [
                'Tăng cường sức khỏe tổng thể',
                'Hỗ trợ tim mạch',
                'Cải thiện giấc ngủ',
                'Tăng cường trao đổi chất',
                'Chống viêm nhiễm'
            ],
            ingredients: ['Mỹ sâm 5 năm tuổi', 'Chiết xuất thảo dược', 'Khoáng chất tự nhiên'],
            usage: 'Ngày 2 lần, mỗi lần 1-2 viên, uống với nước',
            storage: 'Bảo quản nơi khô ráo, tránh ẩm ướt',
            weight: '80 viên',
            isNew: true,
            isBestSeller: false,
            isLimited: false,
            stock: 40,
            slug: 'my-sam-tay-bac'
        },
        {
            id: 5,
            name: 'Canada Sâm Rừng Organic',
            category: 'canada-sam',
            origin: 'Canada',
            age: '7 năm',
            price: 2800000,
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/83/photo-3-1728871003192740345375-1728874764904-17288747649761796268016.png',
            rating: 4.7,
            reviewCount: 123,
            description: 'Canada sâm rừng organic được thu hái từ rừng nguyên sinh, không sử dụng hóa chất, đảm bảo độ tinh khiết cao nhất.',
            benefits: [
                'Tăng cường năng lượng tự nhiên',
                'Cải thiện khả năng tập trung',
                'Hỗ trợ hệ thần kinh',
                'Tăng cường sức bền',
                'Chống stress hiệu quả'
            ],
            ingredients: ['Canada sâm rừng 7 năm tuổi', 'Chất bảo quản hữu cơ', 'Chiết xuất tự nhiên'],
            usage: 'Ngày 1-2 lần, mỗi lần 1 viên, nhai kỹ hoặc ngậm tan',
            storage: 'Bảo quản nơi khô ráo, nhiệt độ phòng',
            weight: '50 viên',
            isNew: false,
            isBestSeller: false,
            isLimited: true,
            stock: 8,
            slug: 'canada-sam-rung-organic'
        },
        {
            id: 6,
            name: 'Hồng Sâm Nước Cao Cấp',
            category: 'hong-sam',
            origin: 'Hàn Quốc',
            age: '6 năm',
            price: 800000,
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/81/hinh-anh-tt-avio-3.jpg',
            rating: 4.5,
            reviewCount: 98,
            description: 'Hồng sâm nước cao cấp dạng lỏng, dễ hấp thu, tiện lợi sử dụng mọi lúc mọi nơi.',
            benefits: [
                'Hấp thu nhanh chóng',
                'Tăng cường sức khỏe',
                'Bổ sung năng lượng',
                'Cải thiện tuần hoàn',
                'Tăng cường miễn dịch'
            ],
            ingredients: ['Chiết xuất hồng sâm 6 năm tuổi', 'Nước tinh khiết', 'Mật ong', 'Vitamin B'],
            usage: 'Ngày 1-2 gói, uống trực tiếp hoặc pha với nước ấm',
            storage: 'Bảo quản nơi khô ráo, tránh ánh nắng',
            weight: '10 gói x 20ml',
            isNew: true,
            isBestSeller: false,
            isLimited: false,
            stock: 60,
            slug: 'hong-sam-nuoc-cao-cap'
        }
    ];

    const filteredProducts = samProducts.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const toggleFavorite = (productId: number) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
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
        return categories.find(cat => cat.value === category)?.label || category;
    };

    return (
        <Layout>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '50vh', md: '60vh' },
                    overflow: 'hidden',
                    pt: { xs: 12, md: 16 },
                }}
            >
                <CardMedia
                    component="img"
                    image="https://datxanhmiennam.com.vn/Data/Sites/1/Banner/bngt.jpg"
                    alt="Các Loại Sâm - Minh Lộc Group"
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
                        background: 'linear-gradient(135deg, rgba(231, 200, 115, 0.8), rgba(0,0,0,0.6))',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 4,
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography
                            variant="h1"
                            data-aos="fade-up"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                mb: 3,
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                                lineHeight: 1.2,
                            }}
                        >
                            Các Loại Sâm Cao Cấp
                        </Typography>
                        <Typography
                            variant="h5"
                            data-aos="fade-up"
                            data-aos-delay="200"
                            sx={{
                                color: 'white',
                                mb: 4,
                                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                                maxWidth: '800px',
                                mx: 'auto',
                                lineHeight: 1.4,
                            }}
                        >
                            Khám phá bộ sưu tập sâm quý hiếm từ khắp nơi trên thế giới - Sức khỏe vàng cho cuộc sống
                        </Typography>
                    </Container>
                </Box>
            </Box>

            {/* Breadcrumbs */}
            <Box sx={{ backgroundColor: '#f8f9fa', py: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Container maxWidth="lg">
                    <Breadcrumbs aria-label="breadcrumb">
                        <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                            Trang chủ
                        </MuiLink>
                        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#E7C873' }}>
                            <LocalFlorist sx={{ mr: 0.5 }} fontSize="inherit" />
                            Các Loại Sâm
                        </Typography>
                    </Breadcrumbs>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Tab Navigation */}
                <Paper sx={{ mb: 4, borderRadius: 1 }}>
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
                        <Tab label="Sản phẩm sâm" />
                        <Tab label="Lợi ích sâm" />
                        <Tab label="Hướng dẫn sử dụng" />
                    </Tabs>
                </Paper>

                {/* Tab Content */}
                {activeTab === 0 && (
                    <Box>
                        {/* Search and Filter */}
                        <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Grid container spacing={{ xs: 2, sm: 3 }}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            fullWidth
                                            placeholder="Tìm kiếm sản phẩm sâm..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search sx={{ color: '#E7C873' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '&:hover fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Loại sâm"
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '&:hover fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#E7C873',
                                                },
                                            }}
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Sắp xếp"
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '&:hover fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#E7C873',
                                                },
                                            }}
                                        >
                                            <option value="name">Tên A-Z</option>
                                            <option value="price-low">Giá thấp đến cao</option>
                                            <option value="price-high">Giá cao đến thấp</option>
                                            <option value="rating">Đánh giá cao nhất</option>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Product Listings */}
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                            Danh sách sản phẩm sâm ({sortedProducts.length})
                        </Typography>

                        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
                            {sortedProducts.map((product, index) => (
                                <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
                                    <Card
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                        sx={{
                                            height: '100%',
                                            transition: 'all 0.3s ease',
                                            borderRadius: 1,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                            position: 'relative',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            {/* Product Image */}
                                            <Box sx={{ position: 'relative' }}>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={product.image}
                                                    alt={product.name}
                                                    sx={{ objectFit: 'cover' }}
                                                />
                                                {/* Product badges */}
                                                <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                    {product.isNew && (
                                                        <Chip
                                                            label="MỚI"
                                                            size="small"
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
                                                            size="small"
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
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: '#9C27B0',
                                                                color: 'white',
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                                {/* Favorite button */}
                                                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                                                    <Button
                                                        size="small"
                                                        onClick={() => toggleFavorite(product.id)}
                                                        sx={{
                                                            minWidth: 'auto',
                                                            p: 1,
                                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(255,255,255,1)',
                                                            },
                                                        }}
                                                    >
                                                        {favorites.includes(product.id) ? (
                                                            <Favorite sx={{ color: '#F44336' }} />
                                                        ) : (
                                                            <FavoriteBorder sx={{ color: '#666' }} />
                                                        )}
                                                    </Button>
                                                </Box>
                                            </Box>

                                            <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                {/* Category */}
                                                <Chip
                                                    label={getCategoryLabel(product.category)}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: getCategoryColor(product.category),
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        mb: 2,
                                                        alignSelf: 'flex-start',
                                                    }}
                                                />

                                                {/* Product name */}
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        mb: 1,
                                                        color: '#333',
                                                        fontSize: '1.1rem',
                                                        lineHeight: 1.3,
                                                    }}
                                                >
                                                    {product.name}
                                                </Typography>

                                                {/* Rating */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                    <Rating value={product.rating} precision={0.1} size="small" readOnly />
                                                    <Typography variant="body2" color="text.secondary">
                                                        ({product.reviewCount})
                                                    </Typography>
                                                </Box>

                                                {/* Product details */}
                                                <Stack spacing={1} sx={{ mb: 2, flex: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <HealthAndSafety sx={{ fontSize: 16, color: '#666' }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            Xuất xứ: {product.origin}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Spa sx={{ fontSize: 16, color: '#666' }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            Tuổi: {product.age}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Inventory sx={{ fontSize: 16, color: '#666' }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            Trọng lượng: {product.weight}
                                                        </Typography>
                                                    </Box>
                                                </Stack>

                                                {/* Price */}
                                                <Box sx={{ mb: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: 700,
                                                                color: '#E7C873',
                                                                fontSize: '1.3rem',
                                                            }}
                                                        >
                                                            {product.price.toLocaleString('vi-VN')} VNĐ
                                                        </Typography>
                                                        {product.originalPrice && (
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    textDecoration: 'line-through',
                                                                    color: 'text.secondary',
                                                                }}
                                                            >
                                                                {product.originalPrice.toLocaleString('vi-VN')} VNĐ
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Box>

                                                {/* Stock status */}
                                                <Typography
                                                    variant="caption"
                                                    color={product.stock > 10 ? 'success.main' : 'error.main'}
                                                    sx={{ mb: 2, display: 'block' }}
                                                >
                                                    {product.stock > 10 ? 'Còn hàng' : `Chỉ còn ${product.stock} sản phẩm`}
                                                </Typography>

                                                {/* Action buttons */}
                                                <Stack
                                                    direction={{ xs: 'column', sm: 'row' }}
                                                    spacing={{ xs: 1, sm: 1 }}
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        component={Link}
                                                        href={`/SamType/${product.slug}`}
                                                        startIcon={<Visibility />}
                                                        fullWidth
                                                        sx={{
                                                            borderColor: '#E7C873',
                                                            color: '#E7C873',
                                                            py: 1,
                                                            '&:hover': {
                                                                backgroundColor: '#E7C873',
                                                                color: 'white',
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                                            Xem chi tiết
                                                        </Box>
                                                        <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>
                                                            Xem
                                                        </Box>
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={<ShoppingCart />}
                                                        fullWidth
                                                        disabled={product.stock === 0}
                                                        sx={{
                                                            backgroundColor: '#E7C873',
                                                            py: 1,
                                                            '&:hover': {
                                                                backgroundColor: '#d4b85a',
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                                            Mua ngay
                                                        </Box>
                                                        <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>
                                                            Mua
                                                        </Box>
                                                    </Button>
                                                </Stack>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {activeTab === 1 && (
                    <Box>
                        <Grid container spacing={{ xs: 3, md: 4 }}>
                            {/* Benefits Overview */}
                            <Grid item xs={12} lg={8}>
                                <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                            Lợi ích sức khỏe của sâm
                                        </Typography>
                                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                                            Sâm là một trong những loại thảo dược quý hiếm nhất thế giới, được sử dụng trong y học cổ truyền hàng nghìn năm. Các nghiên cứu khoa học hiện đại đã chứng minh nhiều lợi ích sức khỏe tuyệt vời của sâm.
                                        </Typography>

                                        <Grid container spacing={3}>
                                            {[
                                                {
                                                    icon: <HealthAndSafety sx={{ fontSize: 40, color: '#E7C873' }} />,
                                                    title: 'Tăng cường miễn dịch',
                                                    description: 'Sâm giúp tăng cường hệ thống miễn dịch, giúp cơ thể chống lại các tác nhân gây bệnh từ bên ngoài.'
                                                },
                                                {
                                                    icon: <Spa sx={{ fontSize: 40, color: '#E7C873' }} />,
                                                    title: 'Chống lão hóa',
                                                    description: 'Chứa nhiều chất chống oxy hóa mạnh, giúp làm chậm quá trình lão hóa và duy trì sự trẻ trung.'
                                                },
                                                {
                                                    icon: <Nature sx={{ fontSize: 40, color: '#E7C873' }} />,
                                                    title: 'Bổ sung năng lượng',
                                                    description: 'Cung cấp năng lượng tự nhiên, giúp cơ thể hoạt động hiệu quả và giảm mệt mỏi.'
                                                },
                                                {
                                                    icon: <Star sx={{ fontSize: 40, color: '#E7C873' }} />,
                                                    title: 'Cải thiện trí nhớ',
                                                    description: 'Hỗ trợ chức năng não bộ, tăng cường khả năng tập trung và cải thiện trí nhớ.'
                                                }
                                            ].map((benefit, index) => (
                                                <Grid item xs={12} sm={6} key={index}>
                                                    <Card
                                                        data-aos="fade-up"
                                                        data-aos-delay={index * 100}
                                                        sx={{
                                                            textAlign: 'center',
                                                            p: 3,
                                                            borderRadius: 1,
                                                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                                            transition: 'transform 0.3s ease',
                                                            '&:hover': {
                                                                transform: 'translateY(-2px)',
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={{ mb: 2 }}>
                                                            {benefit.icon}
                                                        </Box>
                                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#E7C873' }}>
                                                            {benefit.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {benefit.description}
                                                        </Typography>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Sam Types Info */}
                            <Grid item xs={12} lg={4}>
                                <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                            Các loại sâm phổ biến
                                        </Typography>
                                        <List>
                                            {categories.slice(1).map((category) => (
                                                <ListItem key={category.value}>
                                                    <ListItemIcon>
                                                        <LocalFlorist sx={{ color: getCategoryColor(category.value) }} />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={category.label}
                                                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>

                                {/* Quality Guarantee */}
                                <Card sx={{ borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                            Cam kết chất lượng
                                        </Typography>
                                        <List>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="100% tự nhiên"
                                                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Không chất bảo quản"
                                                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Chứng nhận chất lượng"
                                                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Bảo hành 30 ngày"
                                                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {activeTab === 2 && (
                    <Box>
                        <Card sx={{ borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, color: '#E7C873', textAlign: 'center' }}>
                                    Hướng dẫn sử dụng sâm hiệu quả
                                </Typography>

                                <Grid container spacing={{ xs: 2, md: 4 }}>
                                    {[
                                        {
                                            step: 1,
                                            title: 'Chọn loại sâm phù hợp',
                                            description: 'Dựa vào tình trạng sức khỏe và nhu cầu sử dụng để chọn loại sâm phù hợp nhất.',
                                            icon: <LocalFlorist sx={{ fontSize: 40, color: '#E7C873' }} />
                                        },
                                        {
                                            step: 2,
                                            title: 'Liều lượng đúng cách',
                                            description: 'Tuân thủ liều lượng khuyến nghị, không nên sử dụng quá liều để tránh tác dụng phụ.',
                                            icon: <HealthAndSafety sx={{ fontSize: 40, color: '#E7C873' }} />
                                        },
                                        {
                                            step: 3,
                                            title: 'Thời điểm sử dụng',
                                            description: 'Nên sử dụng vào buổi sáng hoặc trước bữa ăn 30 phút để hấp thu tốt nhất.',
                                            icon: <Spa sx={{ fontSize: 40, color: '#E7C873' }} />
                                        },
                                        {
                                            step: 4,
                                            title: 'Bảo quản đúng cách',
                                            description: 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và độ ẩm cao.',
                                            icon: <Nature sx={{ fontSize: 40, color: '#E7C873' }} />
                                        },
                                        {
                                            step: 5,
                                            title: 'Kiên trì sử dụng',
                                            description: 'Sử dụng đều đặn trong thời gian dài để đạt hiệu quả tối ưu.',
                                            icon: <Star sx={{ fontSize: 40, color: '#E7C873' }} />
                                        },
                                        {
                                            step: 6,
                                            title: 'Theo dõi phản ứng',
                                            description: 'Chú ý theo dõi phản ứng của cơ thể và điều chỉnh liều lượng nếu cần.',
                                            icon: <CheckCircle sx={{ fontSize: 40, color: '#E7C873' }} />
                                        }
                                    ].map((item, index) => (
                                        <Grid item xs={12} sm={6} md={6} key={item.step}>
                                            <Card
                                                data-aos="fade-up"
                                                data-aos-delay={index * 100}
                                                sx={{
                                                    textAlign: 'center',
                                                    p: 3,
                                                    borderRadius: 1,
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                                    transition: 'transform 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                    },
                                                }}
                                            >
                                                <Avatar
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        mx: 'auto',
                                                        mb: 2,
                                                        backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                                    }}
                                                >
                                                    {item.icon}
                                                </Avatar>
                                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#E7C873' }}>
                                                    Bước {item.step}: {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.description}
                                                </Typography>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Important Notes */}
                                <Box sx={{ mt: 6, p: 3, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                        Lưu ý quan trọng
                                    </Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Tham khảo ý kiến bác sĩ trước khi sử dụng nếu đang mang thai, cho con bú hoặc có bệnh lý đặc biệt"
                                                primaryTypographyProps={{ fontSize: '0.9rem' }}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Không sử dụng quá liều khuyến nghị để tránh tác dụng phụ"
                                                primaryTypographyProps={{ fontSize: '0.9rem' }}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Ngưng sử dụng và tham khảo bác sĩ nếu có phản ứng bất thường"
                                                primaryTypographyProps={{ fontSize: '0.9rem' }}
                                            />
                                        </ListItem>
                                    </List>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Container>
        </Layout>
    );
};

export default SamTypePage;
