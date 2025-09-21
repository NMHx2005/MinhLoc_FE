"use client";

import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Button,
    Breadcrumbs,
    Link as MuiLink,
    Grid,
    Chip,
    Tabs,
    Tab,
    IconButton,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Rating,
    Stack,
    Divider,
} from '@mui/material';
import {
    Home,
    Business,
    LocationOn,
    Phone,
    Email,
    Favorite,
    FavoriteBorder,
    Close,
    AttachMoney,
    SquareFoot,
    Bed,
    Bathtub,
    DirectionsCar,
    Pool,
    FitnessCenter,
    Wifi,
    Restaurant,
    LocalHospital,
    School,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';

interface ProjectDetail {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    images: string[];
    price: string;
    pricePerM2: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    parking: number;
    status: 'available' | 'sold' | 'coming-soon';
    location: string;
    developer: string;
    handoverDate: string;
    scale: string;
    amenities: {
        id: number;
        name: string;
        icon: React.ReactNode;
        description: string;
    }[];
    floorPlans: {
        id: number;
        name: string;
        area: string;
        bedrooms: number;
        bathrooms: number;
        price: string;
        image: string;
    }[];
    contact: {
        name: string;
        phone: string;
        email: string;
        avatar: string;
        rating: number;
        reviews: number;
    };
}

const ProjectDetailPage: React.FC = () => {
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Tất cả dự án đều trả về cùng 1 dự án mẫu (The Privé)
        const mockProject: ProjectDetail = {
            id: 1,
            title: 'The Privé',
            subtitle: 'Khu căn hộ cao cấp ven sông',
            description: 'The Privé là dự án căn hộ cao cấp ven sông với thiết kế hiện đại, tiện ích đầy đủ và vị trí đắc địa. Dự án mang đến không gian sống lý tưởng cho gia đình trẻ với hệ thống tiện ích hoàn chỉnh và dịch vụ chuyên nghiệp.',
            images: [
                'https://datxanhmiennam.com.vn/Data/Sites/1/Product/87/phoi-canh-tu-can-ho-the-prive-quan-2-anh-theprive-net-vn.jpg',
                'https://datxanhmiennam.com.vn/Data/Sites/1/Product/86/th%C3%B4ng-tin-d%E1%BB%B1-%C3%A1n-stown-gateway-h%C3%ACnh-%E1%BA%A3nh-5_6.jpg',
                'https://datxanhmiennam.com.vn/Data/Sites/1/Product/85/phoi-canh-the-gio-riverside.jpg',
            ],
            price: '3.2 - 8.5 tỷ',
            pricePerM2: '65 - 85 triệu/m²',
            area: '49 - 95 m²',
            bedrooms: 2,
            bathrooms: 2,
            parking: 1,
            status: 'available',
            location: 'Quận 2, TP.HCM',
            developer: 'Minh Lộc Group',
            handoverDate: 'Q4/2025',
            scale: '3.175 căn hộ',
            amenities: [
                { id: 1, name: 'Hồ bơi', icon: <Pool />, description: 'Hồ bơi ngoài trời rộng 500m²' },
                { id: 2, name: 'Gym & Fitness', icon: <FitnessCenter />, description: 'Phòng gym hiện đại 24/7' },
                { id: 3, name: 'Wifi miễn phí', icon: <Wifi />, description: 'Internet tốc độ cao toàn khu' },
                { id: 4, name: 'Nhà hàng', icon: <Restaurant />, description: 'Nhà hàng cao cấp trong khu' },
                { id: 5, name: 'Bệnh viện', icon: <LocalHospital />, description: 'Bệnh viện quốc tế gần khu' },
                { id: 6, name: 'Trường học', icon: <School />, description: 'Trường quốc tế trong bán kính 2km' },
            ],
            floorPlans: [
                { id: 1, name: '2PN + 2WC', area: '65m²', bedrooms: 2, bathrooms: 2, price: '4.2 tỷ', image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/87/phoi-canh-tu-can-ho-the-prive-quan-2-anh-theprive-net-vn.jpg' },
                { id: 2, name: '3PN + 2WC', area: '85m²', bedrooms: 3, bathrooms: 2, price: '6.8 tỷ', image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/86/th%C3%B4ng-tin-d%E1%BB%B1-%C3%A1n-stown-gateway-h%C3%ACnh-%E1%BA%A3nh-5_6.jpg' },
                { id: 3, name: '4PN + 3WC', area: '95m²', bedrooms: 4, bathrooms: 3, price: '8.5 tỷ', image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/85/phoi-canh-the-gio-riverside.jpg' },
            ],
            contact: {
                name: 'Nguyễn Văn A',
                phone: '0901234567',
                email: 'nguyenvana@minhlocgroup.com',
                avatar: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/canho.png',
                rating: 4.8,
                reviews: 156,
            },
        };
        setProject(mockProject);
    }, []);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleImageClick = (image: string, index: number) => {
        setSelectedImage(image);
        setCurrentImageIndex(index);
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available': return 'success';
            case 'sold': return 'error';
            case 'coming-soon': return 'warning';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'available': return 'Còn trống';
            case 'sold': return 'Đã bán';
            case 'coming-soon': return 'Sắp mở bán';
            default: return status;
        }
    };

    if (!project) {
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
                    height: { xs: '50vh', md: '70vh' },
                    overflow: 'hidden',
                }}
            >
                <CardMedia
                    component="img"
                    image={project.images[0]}
                    alt={project.title}
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
                            <MuiLink component={Link} href="/projects" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Business sx={{ mr: 0.5 }} fontSize="inherit" />
                                Dự án
                            </MuiLink>
                            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#E7C873' }}>
                                {project.title}
                            </Typography>
                        </Breadcrumbs>

                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                mb: 1,
                                fontSize: { xs: '2rem', md: '3.5rem' },
                            }}
                        >
                            {project.title}
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                color: '#E7C873',
                                mb: 2,
                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                            }}
                        >
                            {project.subtitle}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Chip
                                label={getStatusLabel(project.status)}
                                color={getStatusColor(project.status) as "success" | "error" | "warning" | "default"}
                                sx={{ color: 'white', fontWeight: 600 }}
                            />
                            <Chip
                                icon={<LocationOn />}
                                label={project.location}
                                sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.2)' }}
                            />
                            <Chip
                                icon={<AttachMoney />}
                                label={project.price}
                                sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.2)' }}
                            />
                        </Box>
                    </Container>
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={4}>
                    {/* Main Content */}
                    <Grid item xs={12} md={8}>
                        {/* Project Info */}
                        <Card sx={{ mb: 4 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#E7C873', fontWeight: 600 }}>
                                    Thông tin dự án
                                </Typography>

                                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                                    {project.description}
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                            <SquareFoot sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                {project.area}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Diện tích
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                            <Bed sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                {project.bedrooms}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Phòng ngủ
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                            <Bathtub sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                {project.bathrooms}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Phòng tắm
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                            <DirectionsCar sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                {project.parking}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Chỗ để xe
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Tabs */}
                        <Card sx={{ mb: 4 }}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        '&.Mui-selected': {
                                            color: '#E7C873',
                                            fontWeight: 600,
                                        },
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: '#E7C873',
                                    },
                                }}
                            >
                                <Tab label="Hình ảnh" />
                                <Tab label="Mặt bằng" />
                                <Tab label="Tiện ích" />
                            </Tabs>

                            <CardContent sx={{ p: 0 }}>
                                {/* Images Tab */}
                                {activeTab === 0 && (
                                    <Box sx={{ p: 3 }}>
                                        <Grid container spacing={2}>
                                            {project.images.map((image, index) => (
                                                <Grid item xs={12} sm={6} md={4} key={index}>
                                                    <Card
                                                        sx={{
                                                            cursor: 'pointer',
                                                            transition: 'transform 0.2s',
                                                            '&:hover': {
                                                                transform: 'scale(1.02)',
                                                            },
                                                        }}
                                                        onClick={() => handleImageClick(image, index)}
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            height="200"
                                                            image={image}
                                                            alt={`${project.title} ${index + 1}`}
                                                            sx={{ objectFit: 'cover' }}
                                                        />
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                )}

                                {/* Floor Plans Tab */}
                                {activeTab === 1 && (
                                    <Box sx={{ p: 3 }}>
                                        <Grid container spacing={3}>
                                            {project.floorPlans.map((plan) => (
                                                <Grid item xs={12} md={6} key={plan.id}>
                                                    <Card sx={{ height: '100%' }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="250"
                                                            image={plan.image}
                                                            alt={plan.name}
                                                            sx={{ objectFit: 'cover' }}
                                                        />
                                                        <CardContent>
                                                            <Typography variant="h6" gutterBottom>
                                                                {plan.name}
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Diện tích: {plan.area}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {plan.bedrooms}PN + {plan.bathrooms}WC
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                                                                {plan.price}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                )}

                                {/* Amenities Tab */}
                                {activeTab === 2 && (
                                    <Box sx={{ p: 3 }}>
                                        <Grid container spacing={3}>
                                            {project.amenities.map((amenity) => (
                                                <Grid item xs={12} sm={6} md={4} key={amenity.id}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                                        <Box sx={{ color: '#E7C873', mr: 2 }}>
                                                            {amenity.icon}
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                                {amenity.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {amenity.description}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        {/* Contact Card */}
                        <Card sx={{ mb: 4, position: 'sticky', top: 100 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Avatar
                                        src={project.contact.avatar}
                                        sx={{ width: 60, height: 60, mr: 2 }}
                                    />
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {project.contact.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Rating value={project.contact.rating} readOnly size="small" />
                                            <Typography variant="body2" color="text.secondary">
                                                ({project.contact.reviews} đánh giá)
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                                        {project.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {project.pricePerM2}
                                    </Typography>
                                </Box>

                                <Stack spacing={2}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        startIcon={<Phone />}
                                        sx={{
                                            backgroundColor: '#E7C873',
                                            color: 'white',
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: '#d4b85a',
                                            },
                                        }}
                                    >
                                        Gọi ngay
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        startIcon={<Email />}
                                        sx={{
                                            borderColor: '#E7C873',
                                            color: '#E7C873',
                                            py: 1.5,
                                            '&:hover': {
                                                borderColor: '#d4b85a',
                                                backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                            },
                                        }}
                                    >
                                        Gửi email
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        sx={{
                                            borderColor: isFavorite ? '#E7C873' : '#ddd',
                                            color: isFavorite ? '#E7C873' : '#666',
                                            py: 1.5,
                                        }}
                                    >
                                        {isFavorite ? 'Đã lưu' : 'Lưu dự án'}
                                    </Button>
                                </Stack>

                                <Divider sx={{ my: 3 }} />

                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Thông tin liên hệ
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        📞 {project.contact.phone}
                                    </Typography>
                                    <Typography variant="body2">
                                        ✉️ {project.contact.email}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Project Details */}
                        <Card>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" gutterBottom sx={{ color: '#E7C873', fontWeight: 600 }}>
                                    Chi tiết dự án
                                </Typography>

                                <List dense>
                                    <ListItem>
                                        <ListItemText
                                            primary="Chủ đầu tư"
                                            secondary={project.developer}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Quy mô"
                                            secondary={project.scale}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Bàn giao"
                                            secondary={project.handoverDate}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Trạng thái"
                                        />
                                        <Chip
                                            label={getStatusLabel(project.status)}
                                            color={getStatusColor(project.status) as "success" | "error" | "warning" | "default"}
                                            size="small"
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Image Modal */}
            <Dialog
                open={!!selectedImage}
                onClose={handleCloseImage}
                maxWidth="lg"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        color: 'white',
                    },
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box component="span" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        {project.title} - Hình {currentImageIndex + 1}
                    </Box>
                    <IconButton onClick={handleCloseImage} sx={{ color: 'white' }}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 0, position: 'relative' }}>
                    {selectedImage && (
                        <Box sx={{ position: 'relative' }}>
                            <CardMedia
                                component="img"
                                image={selectedImage}
                                alt={project.title}
                                sx={{
                                    width: '100%',
                                    maxHeight: '70vh',
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Layout>
    );
};

export default ProjectDetailPage;