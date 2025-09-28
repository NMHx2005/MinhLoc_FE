"use client";

import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Breadcrumbs,
    Link,
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
    CircularProgress,
    Alert,
    IconButton,
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
    CheckCircle,
    HealthAndSafety,
    Spa,
    Nature
} from '@mui/icons-material';
import Layout from '@/components/client/shared/Layout';
import {
    getProducts,
    getCategories,
    getOrigins,
    searchProducts,
    type Product,
    type ProductFilters,
    type Category,
    type Origin
} from '@/services/client/productService';

const SamTypePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [favorites, setFavorites] = useState<string[]>([]);

    // API states
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [_origins, _setOrigins] = useState<Origin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [_totalPages, _setTotalPages] = useState(1);
    const [_totalProducts, _setTotalProducts] = useState(0);

    // Load data from API
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Load categories and origins
                const [categoriesResponse, originsResponse] = await Promise.all([
                    getCategories(),
                    getOrigins()
                ]);

                if (categoriesResponse.success) {
                    setCategories(categoriesResponse.data);
                }

                if (originsResponse.success) {
                    _setOrigins(originsResponse.data);
                }

                // Load products
                await loadProducts();
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const loadProducts = async (filters: ProductFilters = {}) => {
        try {
            const response = await getProducts({
                page: 1,
                limit: 50,
                isActive: true,
                ...filters
            });

            if (response.success) {
                setProducts(response.data.products);
                _setTotalPages(response.data.pagination.pages);
                _setTotalProducts(response.data.pagination.total);
            }
        } catch (err) {
            console.error('Error loading products:', err);
            setError('Có lỗi xảy ra khi tải danh sách sản phẩm.');
        }
    };

    // Dynamic categories for filter
    const categoryOptions = [
        { value: 'all', label: 'Tất cả loại sâm' },
        ...categories.map(cat => ({
            value: cat._id,
            label: cat.name
        }))
    ];

    // Filter and sort products
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.categoryId._id === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return (a.price || 0) - (b.price || 0);
            case 'price-high':
                return (b.price || 0) - (a.price || 0);
            case 'stock':
                return (b.stock || 0) - (a.stock || 0);
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    // Handle search
    const handleSearch = async () => {
        if (searchTerm.trim()) {
            try {
                const response = await searchProducts(searchTerm, {
                    category: selectedCategory !== 'all' ? selectedCategory : undefined,
                    isActive: true
                });

                if (response.success) {
                    setProducts(response.data.products);
                }
            } catch (err) {
                console.error('Error searching products:', err);
                setError('Có lỗi xảy ra khi tìm kiếm sản phẩm.');
            }
        } else {
            await loadProducts({
                category: selectedCategory !== 'all' ? selectedCategory : undefined
            });
        }
    };

    // Handle category change
    const handleCategoryChange = async (categoryId: string) => {
        setSelectedCategory(categoryId);
        await loadProducts({
            category: categoryId !== 'all' ? categoryId : undefined
        });
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const toggleFavorite = (productId: string) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const getCategoryColor = (categoryId: string) => {
        const category = categories.find(cat => cat._id === categoryId);
        if (!category) return '#666';

        // Use category name to determine color
        const name = category.name.toLowerCase();
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
        return `${price.toLocaleString('vi-VN')} VND`;
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
                        <Link href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                            Trang chủ
                        </Link>
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
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearch();
                                                }
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search sx={{ color: '#E7C873' }} />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Button
                                                            onClick={handleSearch}
                                                            sx={{ color: '#E7C873', minWidth: 'auto' }}
                                                        >
                                                            Tìm
                                                        </Button>
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
                                            onChange={(e) => handleCategoryChange(e.target.value)}
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
                                            {categoryOptions.map((cat) => (
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
                                            <option value="stock">Tồn kho cao nhất</option>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Loading and Error States */}
                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                <CircularProgress sx={{ color: '#E7C873' }} />
                            </Box>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Product Listings */}
                        {!loading && !error && (
                            <>
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                    Danh sách sản phẩm sâm ({sortedProducts.length})
                                </Typography>

                                <Grid container spacing={3}>
                                    {sortedProducts.map((product) => (
                                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                                            <Card
                                                sx={{
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    borderRadius: 2,
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                    transition: 'box-shadow 0.3s ease',
                                                    '&:hover': {
                                                        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                                                    },
                                                }}
                                            >
                                                {/* Product Image */}
                                                <Box sx={{ position: 'relative' }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="200"
                                                        image={product.images?.[0] || '/placeholder-product.jpg'}
                                                        alt={product.name}
                                                        sx={{ objectFit: 'cover' }}
                                                    />

                                                    {/* Stock badge */}
                                                    {product.stock < 10 && (
                                                        <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                                                            <Chip
                                                                label="SẮP HẾT"
                                                                size="small"
                                                                sx={{
                                                                    backgroundColor: '#f44336',
                                                                    color: 'white',
                                                                    fontWeight: 600,
                                                                }}
                                                            />
                                                        </Box>
                                                    )}

                                                    {/* Favorite button */}
                                                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => toggleFavorite(product._id)}
                                                            sx={{
                                                                backgroundColor: 'rgba(255,255,255,0.9)',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(255,255,255,1)',
                                                                },
                                                            }}
                                                        >
                                                            {favorites.includes(product._id) ? (
                                                                <Favorite sx={{ color: '#f44336', fontSize: 20 }} />
                                                            ) : (
                                                                <FavoriteBorder sx={{ color: '#666', fontSize: 20 }} />
                                                            )}
                                                        </IconButton>
                                                    </Box>
                                                </Box>

                                                <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    {/* Category */}
                                                    <Chip
                                                        label={product.categoryId.name}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: getCategoryColor(product.categoryId._id),
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            mb: 1,
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

                                                    {/* Grade */}
                                                    <Chip
                                                        label={product.grade.toUpperCase()}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: product.grade === 'premium' ? '#ffd700' : '#4caf50',
                                                            color: product.grade === 'premium' ? '#333' : 'white',
                                                            fontWeight: 600,
                                                            mb: 2,
                                                            alignSelf: 'flex-start',
                                                        }}
                                                    />

                                                    {/* Product details */}
                                                    <Box sx={{ mb: 2, flex: 1 }}>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                            <strong>Xuất xứ:</strong> {product.originId.name}
                                                        </Typography>
                                                        {product.specifications.age && (
                                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                                <strong>Tuổi:</strong> {product.specifications.age} năm
                                                            </Typography>
                                                        )}
                                                        <Typography variant="body2" color="text.secondary">
                                                            <strong>Trọng lượng:</strong> {product.weight} {product.weightUnit}
                                                        </Typography>
                                                    </Box>

                                                    {/* Price */}
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: '#E7C873',
                                                            fontSize: '1.4rem',
                                                            mb: 1,
                                                        }}
                                                    >
                                                        {formatPrice(product.price)}
                                                    </Typography>

                                                    {/* Stock status */}
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            mb: 2,
                                                            color: product.stock > 10 ? '#4caf50' : '#f44336',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {product.stock > 10 ? '✓ Còn hàng' : `⚠ Chỉ còn ${product.stock} sản phẩm`}
                                                    </Typography>

                                                    {/* Action buttons */}
                                                    <Stack direction="row" spacing={1}>
                                                        <Button
                                                            variant="outlined"
                                                            component={Link}
                                                            href={`/SamType/${product.slug}`}
                                                            startIcon={<Visibility />}
                                                            fullWidth
                                                            sx={{
                                                                borderColor: '#E7C873',
                                                                color: '#E7C873',
                                                                fontWeight: 600,
                                                                '&:hover': {
                                                                    backgroundColor: '#E7C873',
                                                                    color: 'white',
                                                                },
                                                            }}
                                                        >
                                                            Xem
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            startIcon={<ShoppingCart />}
                                                            fullWidth
                                                            disabled={product.stock === 0}
                                                            sx={{
                                                                backgroundColor: '#E7C873',
                                                                fontWeight: 600,
                                                                '&:hover': {
                                                                    backgroundColor: '#d4b85a',
                                                                },
                                                                '&:disabled': {
                                                                    backgroundColor: '#e0e0e0',
                                                                    color: '#9e9e9e',
                                                                }
                                                            }}
                                                        >
                                                            Mua
                                                        </Button>
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
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
                                            {categories.map((category) => (
                                                <ListItem key={category._id}>
                                                    <ListItemIcon>
                                                        <LocalFlorist sx={{ color: getCategoryColor(category._id) }} />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={category.name}
                                                        secondary={category.description}
                                                        primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }}
                                                        secondaryTypographyProps={{ fontSize: '0.8rem' }}
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
