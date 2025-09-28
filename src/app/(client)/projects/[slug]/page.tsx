'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    Home,
    Business,
    Phone,
    Email,
    Favorite,
    FavoriteBorder,
    Close,
    SquareFoot,
    Pool,
    FitnessCenter,
    Park,
    School,
    LocalHospital,
    Wifi,
    Restaurant,
    DirectionsCar,
    ArrowBack,
    People,
    TrendingUp,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';
import { getProjectBySlug, type Project } from '@/services/client/projectService';

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const loadProject = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getProjectBySlug(slug);

                if (response.success && response.data) {
                    setProject(response.data);
                } else {
                    setError('Không tìm thấy dự án');
                }
            } catch (err) {
                console.error('Error loading project:', err);
                setError('Không thể tải thông tin dự án');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            loadProject();
        }
    }, [slug]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'success';
            case 'construction': return 'warning';
            case 'planning': return 'info';
            case 'sold_out': return 'error';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed': return 'Đã hoàn thành';
            case 'construction': return 'Đang xây dựng';
            case 'planning': return 'Đang lên kế hoạch';
            case 'sold_out': return 'Đã bán hết';
            default: return status;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'apartment': return 'Căn hộ';
            case 'villa': return 'Biệt thự';
            case 'office': return 'Văn phòng';
            case 'commercial': return 'Thương mại';
            default: return type;
        }
    };

    const formatPrice = (min: number, max: number, currency: string) => {
        const minFormatted = (min / 1000000000).toFixed(1);
        const maxFormatted = (max / 1000000000).toFixed(1);
        return `${minFormatted} - ${maxFormatted} tỷ ${currency}`;
    };

    const formatArea = (min: number, max: number, unit: string) => {
        return `${min} - ${max} ${unit}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
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

    if (error || !project) {
        return (
            <Layout>
                <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error || 'Không tìm thấy dự án'}
                    </Alert>
                    <Button
                        component={Link}
                        href="/projects"
                        variant="contained"
                        startIcon={<ArrowBack />}
                        sx={{ backgroundColor: '#E7C873', '&:hover': { backgroundColor: '#d4b05a' } }}
                    >
                        Quay lại danh sách dự án
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
                        <MuiLink component={Link} href="/projects" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Business sx={{ mr: 0.5 }} fontSize="inherit" />
                            Dự án
                        </MuiLink>
                        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#E7C873', fontWeight: 600 }}>
                            {project.name}
                        </Typography>
                    </Breadcrumbs>
                </Container>

                <Container maxWidth="lg" sx={{ pb: 6 }}>
                    <Grid container spacing={4}>
                        {/* Main Content */}
                        <Grid item xs={12} lg={8}>
                            {/* Project Header */}
                            <Card sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="400"
                                        image={project.images?.[0] || '/placeholder-project.jpg'}
                                        alt={project.name}
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
                                            label={getStatusLabel(project.status)}
                                            color={getStatusColor(project.status) as "success" | "error" | "warning" | "default"}
                                            sx={{ color: 'white', fontWeight: 600 }}
                                        />
                                        {project.isFeatured && (
                                            <Chip
                                                label="Nổi bật"
                                                sx={{ color: 'white', backgroundColor: '#E7C873', fontWeight: 600 }}
                                            />
                                        )}
                                    </Box>
                                </Box>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#2c3e50' }}>
                                        {project.name}
                                    </Typography>

                                    <Typography variant="h6" sx={{ color: '#E7C873', mb: 2, fontWeight: 600 }}>
                                        {getTypeLabel(project.type)} • {project.location}
                                    </Typography>

                                    <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 700, mb: 3 }}>
                                        {formatPrice(project.price.min, project.price.max, project.price.currency)}
                                    </Typography>

                                    <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#555' }}>
                                        {project.description}
                                    </Typography>
                                </CardContent>
                            </Card>

                            {/* Project Stats */}
                            <Card sx={{ mb: 4, borderRadius: 2 }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
                                        Thông số dự án
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item xs={6} sm={3}>
                                            <Box sx={{ textAlign: 'center', p: 2 }}>
                                                <SquareFoot sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                                                    {formatArea(project.area.min, project.area.max, project.area.unit)}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Diện tích
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Box sx={{ textAlign: 'center', p: 2 }}>
                                                <People sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                                                    {project.totalUnits.toLocaleString()}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Tổng số căn
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Box sx={{ textAlign: 'center', p: 2 }}>
                                                <TrendingUp sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                                                    {project.salesRate.toFixed(1)}%
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Đã bán
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Box sx={{ textAlign: 'center', p: 2 }}>
                                                <Business sx={{ fontSize: 40, color: '#E7C873', mb: 1 }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                                                    {project.developer}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Chủ đầu tư
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            {/* Content Tabs */}
                            <Card sx={{ borderRadius: 2 }}>
                                <Tabs
                                    value={activeTab}
                                    onChange={(_, newValue) => setActiveTab(newValue)}
                                    sx={{
                                        borderBottom: '1px solid #e0e0e0',
                                        '& .MuiTab-root': {
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            py: 2,
                                            px: 3,
                                        },
                                        '& .MuiTabs-indicator': {
                                            backgroundColor: '#E7C873',
                                            height: 3,
                                        },
                                    }}
                                >
                                    <Tab label="Hình ảnh" />
                                    <Tab label="Tính năng" />
                                    <Tab label="Tiện ích" />
                                </Tabs>

                                <CardContent sx={{ p: 0 }}>
                                    {/* Images Tab */}
                                    {activeTab === 0 && (
                                        <Box sx={{ p: 4 }}>
                                            {project.images && project.images.length > 0 ? (
                                                <Grid container spacing={2}>
                                                    {project.images.map((image, index) => (
                                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                                            <Card
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    overflow: 'hidden',
                                                                    borderRadius: 2,
                                                                    transition: 'transform 0.3s ease',
                                                                    '&:hover': {
                                                                        transform: 'scale(1.02)',
                                                                    },
                                                                }}
                                                                onClick={() => setSelectedImage(image)}
                                                            >
                                                                <CardMedia
                                                                    component="img"
                                                                    height="200"
                                                                    image={image}
                                                                    alt={`${project.name} - Hình ${index + 1}`}
                                                                    sx={{ objectFit: 'cover' }}
                                                                />
                                                            </Card>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            ) : (
                                                <Box sx={{ textAlign: 'center', py: 6 }}>
                                                    <Typography variant="body1" color="text.secondary">
                                                        Chưa cập nhật hình ảnh
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    )}

                                    {/* Features Tab */}
                                    {activeTab === 1 && (
                                        <Box sx={{ p: 4 }}>
                                            {project.features && project.features.length > 0 ? (
                                                <Grid container spacing={2}>
                                                    {project.features.map((feature, index) => (
                                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                p: 2,
                                                                backgroundColor: '#f8f9fa',
                                                                borderRadius: 2,
                                                                border: '1px solid #e0e0e0',
                                                            }}>
                                                                <Box sx={{
                                                                    color: '#E7C873',
                                                                    mr: 2,
                                                                    fontSize: '1.5rem',
                                                                    width: 40,
                                                                    height: 40,
                                                                    borderRadius: '50%',
                                                                    backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}>
                                                                    ✨
                                                                </Box>
                                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                                    {feature}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            ) : (
                                                <Box sx={{ textAlign: 'center', py: 6 }}>
                                                    <Typography variant="body1" color="text.secondary">
                                                        Chưa cập nhật tính năng
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    )}

                                    {/* Amenities Tab */}
                                    {activeTab === 2 && (
                                        <Box sx={{ p: 4 }}>
                                            {project.amenities && project.amenities.length > 0 ? (
                                                <Grid container spacing={2}>
                                                    {project.amenities.map((amenity, index) => {
                                                        const getAmenityIcon = (amenityName: string) => {
                                                            const name = amenityName.toLowerCase();
                                                            if (name.includes('hồ bơi') || name.includes('pool')) return <Pool />;
                                                            if (name.includes('gym') || name.includes('fitness')) return <FitnessCenter />;
                                                            if (name.includes('công viên') || name.includes('park')) return <Park />;
                                                            if (name.includes('trường học') || name.includes('school')) return <School />;
                                                            if (name.includes('bệnh viện') || name.includes('hospital')) return <LocalHospital />;
                                                            if (name.includes('wifi') || name.includes('internet')) return <Wifi />;
                                                            if (name.includes('nhà hàng') || name.includes('restaurant')) return <Restaurant />;
                                                            if (name.includes('garage') || name.includes('để xe')) return <DirectionsCar />;
                                                            return <Pool />;
                                                        };

                                                        return (
                                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    p: 2,
                                                                    backgroundColor: '#f8f9fa',
                                                                    borderRadius: 2,
                                                                    border: '1px solid #e0e0e0',
                                                                }}>
                                                                    <Box sx={{
                                                                        color: '#1976d2',
                                                                        mr: 2,
                                                                        fontSize: '1.5rem',
                                                                        width: 40,
                                                                        height: 40,
                                                                        borderRadius: '50%',
                                                                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'
                                                                    }}>
                                                                        {getAmenityIcon(amenity)}
                                                                    </Box>
                                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                                        {amenity}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                        );
                                                    })}
                                                </Grid>
                                            ) : (
                                                <Box sx={{ textAlign: 'center', py: 6 }}>
                                                    <Typography variant="body1" color="text.secondary">
                                                        Chưa cập nhật tiện ích
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Project Content */}
                            {project.content && (
                                <Card sx={{ mt: 4, borderRadius: 2 }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
                                            Chi tiết dự án
                                        </Typography>
                                        <Box sx={{
                                            '& p': { fontSize: '1rem', lineHeight: 1.7, color: '#555', mb: 2 },
                                            '& h1, & h2, & h3, & h4, & h5, & h6': { color: '#2c3e50', fontWeight: 600, mb: 1 },
                                            '& img': { maxWidth: '100%', height: 'auto', borderRadius: 2, mb: 2 }
                                        }}>
                                            <div dangerouslySetInnerHTML={{
                                                __html: project.content
                                                    .replace(/!\[Image\]\(([^)]+)\)/g, '<img src="$1" alt="Project Image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />')
                                            }} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>

                        {/* Sidebar */}
                        <Grid item xs={12} lg={4}>
                            {/* Contact Card */}
                            <Card sx={{ mb: 4, borderRadius: 2 }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#2c3e50', mb: 3, textAlign: 'center' }}>
                                        Liên hệ tư vấn
                                    </Typography>

                                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#E7C873', mb: 1 }}>
                                            {formatPrice(project.price.min, project.price.max, project.price.currency)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {formatArea(project.area.min, project.area.max, project.area.unit)}
                                        </Typography>
                                    </Box>

                                    <Stack spacing={2}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            sx={{
                                                backgroundColor: '#E7C873',
                                                color: 'white',
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                '&:hover': { backgroundColor: '#d4b05a' },
                                            }}
                                            href={project.phone ? `tel:${project.phone}` : '#'}
                                            disabled={!project.phone}
                                        >
                                            <Phone sx={{ mr: 1 }} />
                                            {project.phone ? `Gọi ngay: ${project.phone}` : 'Chưa cập nhật'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            size="large"
                                            sx={{
                                                borderColor: '#E7C873',
                                                color: '#E7C873',
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                '&:hover': { backgroundColor: '#E7C873', color: 'white' },
                                            }}
                                        >
                                            <Email sx={{ mr: 1 }} />
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
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {isFavorite ? 'Đã lưu' : 'Lưu dự án'}
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>

                            {/* Project Details */}
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
                                        Thông tin chi tiết
                                    </Typography>

                                    <List dense>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemText
                                                primary="Chủ đầu tư"
                                                secondary={project.developer}
                                                primaryTypographyProps={{ fontWeight: 600, color: '#2c3e50' }}
                                                secondaryTypographyProps={{ color: '#666' }}
                                            />
                                        </ListItem>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemText
                                                primary="Số điện thoại"
                                                secondary={project.phone || 'Chưa cập nhật'}
                                                primaryTypographyProps={{ fontWeight: 600, color: '#2c3e50' }}
                                                secondaryTypographyProps={{ color: '#666' }}
                                            />
                                        </ListItem>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemText
                                                primary="Loại dự án"
                                                secondary={getTypeLabel(project.type)}
                                                primaryTypographyProps={{ fontWeight: 600, color: '#2c3e50' }}
                                                secondaryTypographyProps={{ color: '#666' }}
                                            />
                                        </ListItem>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemText
                                                primary="Tổng số căn"
                                                secondary={project.totalUnits.toLocaleString()}
                                                primaryTypographyProps={{ fontWeight: 600, color: '#2c3e50' }}
                                                secondaryTypographyProps={{ color: '#666' }}
                                            />
                                        </ListItem>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemText
                                                primary="Đã bán"
                                                secondary={`${project.soldUnits.toLocaleString()} căn (${project.salesRate.toFixed(1)}%)`}
                                                primaryTypographyProps={{ fontWeight: 600, color: '#2c3e50' }}
                                                secondaryTypographyProps={{ color: '#666' }}
                                            />
                                        </ListItem>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemText
                                                primary="Doanh thu"
                                                secondary={`${(project.revenue / 1000000000).toFixed(1)} tỷ VND`}
                                                primaryTypographyProps={{ fontWeight: 600, color: '#2c3e50' }}
                                                secondaryTypographyProps={{ color: '#666' }}
                                            />
                                        </ListItem>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemText
                                                primary="Trạng thái"
                                                primaryTypographyProps={{ fontWeight: 600, color: '#2c3e50' }}
                                            />
                                            <Chip
                                                label={getStatusLabel(project.status)}
                                                color={getStatusColor(project.status) as "success" | "error" | "warning" | "default"}
                                                size="small"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </ListItem>
                                        {project.completionDate && (
                                            <ListItem sx={{ px: 0, py: 1 }}>
                                                <ListItemText
                                                    primary="Ngày hoàn thành dự kiến"
                                                    secondary={formatDate(project.completionDate)}
                                                    primaryTypographyProps={{ fontWeight: 600, color: '#2c3e50' }}
                                                    secondaryTypographyProps={{ color: '#666' }}
                                                />
                                            </ListItem>
                                        )}
                                        {project.coordinates && (
                                            <ListItem sx={{ px: 0, py: 1 }}>
                                                <ListItemText
                                                    primary="Tọa độ"
                                                    secondary={`${project.coordinates.latitude}, ${project.coordinates.longitude}`}
                                                    primaryTypographyProps={{ fontWeight: 600, color: '#2c3e50' }}
                                                    secondaryTypographyProps={{ color: '#666' }}
                                                />
                                            </ListItem>
                                        )}
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemText
                                                primary="Ngày tạo"
                                                secondary={formatDate(project.createdAt)}
                                                primaryTypographyProps={{ fontWeight: 600, color: '#2c3e50' }}
                                                secondaryTypographyProps={{ color: '#666' }}
                                            />
                                        </ListItem>
                                        <ListItem sx={{ px: 0, py: 1 }}>
                                            <ListItemText
                                                primary="Cập nhật lần cuối"
                                                secondary={formatDate(project.updatedAt)}
                                                primaryTypographyProps={{ fontWeight: 600, color: '#2c3e50' }}
                                                secondaryTypographyProps={{ color: '#666' }}
                                            />
                                        </ListItem>
                                    </List>

                                    {project.tags && project.tags.length > 0 && (
                                        <Box sx={{ mt: 3 }}>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
                                                Tags:
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {project.tags.map((tag, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={tag}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            fontSize: '0.8rem',
                                                            borderColor: '#E7C873',
                                                            color: '#E7C873'
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Image Modal */}
            <Dialog
                open={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{project.name}</Typography>
                    <IconButton onClick={() => setSelectedImage(null)}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {selectedImage && (
                        <CardMedia
                            component="img"
                            image={selectedImage}
                            alt={project.name}
                            sx={{ width: '100%', borderRadius: 2 }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Layout>
    );
}