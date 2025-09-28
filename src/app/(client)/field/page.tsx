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
    Link as MuiLink,
    Button,
    Chip,
    Stack,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    Home,
    Business,
    Construction,
    AccountBalance,
    TrendingUp,
    CheckCircle,
    ArrowForward,
    Phone,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';
import { getBusinessFields, type BusinessField, getStatusLabel, getStatusColor } from '@/services/client/businessFieldService';

const FieldPage: React.FC = () => {
    const [activeField, setActiveField] = useState(0);
    const [businessFields, setBusinessFields] = useState<BusinessField[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load business fields from API
    useEffect(() => {
        const loadBusinessFields = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getBusinessFields();

                if (response) {
                    setBusinessFields(response);
                } else {
                    setError('Không thể tải danh sách lĩnh vực hoạt động');
                }
            } catch (err) {
                console.error('Error loading business fields:', err);
                setError('Không thể tải danh sách lĩnh vực hoạt động');
            } finally {
                setLoading(false);
            }
        };

        loadBusinessFields();
    }, []);

    // Icon mapping function
    const getIconComponent = (iconName: string) => {
        const iconMap: { [key: string]: React.ReactElement } = {
            'Construction': <Construction />,
            'AccountBalance': <AccountBalance />,
            'Business': <Business />,
            'construction': <Construction />,
            'account_balance': <AccountBalance />,
            'business': <Business />,
            'trending_up': <TrendingUp />,
            'home': <Home />,
        };
        return iconMap[iconName] || <Business />;
    };

    // Get stats display labels
    const getStatsLabel = (key: string) => {
        const labelMap: { [key: string]: string } = {
            'projects': 'Dự án',
            'area': 'Diện tích',
            'experience': 'Kinh nghiệm',
            'return': 'Lợi nhuận',
            'clients': 'Khách hàng',
            'properties': 'Bất động sản',
        };
        return labelMap[key] || key;
    };

    const handleFieldChange = (fieldId: number) => {
        setActiveField(fieldId);
    };

    const currentField = businessFields[activeField];

    // Loading state
    if (loading) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress size={60} sx={{ color: '#E7C873' }} />
                </Box>
            </Layout>
        );
    }

    // Error state
    if (error || businessFields.length === 0) {
        return (
            <Layout>
                <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error || 'Không có lĩnh vực hoạt động nào'}
                    </Alert>
                    <Button
                        component={Link}
                        href="/"
                        variant="contained"
                        sx={{ backgroundColor: '#E7C873', '&:hover': { backgroundColor: '#d4b05a' } }}
                    >
                        Về trang chủ
                    </Button>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: 'url("https://datxanhmiennam.com.vn/Data/Sites/1/Banner/bngt.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    pt: { xs: 12, md: 16 },
                    pb: { xs: 8, md: 12 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 1,
                    }
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box textAlign="center" data-aos="fade-up" data-aos-duration="1000">
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '2.5rem', md: '4rem' },
                            }}
                        >
                            Lĩnh Vực Hoạt Động
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#E7C873',
                                mb: 3,
                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                            }}
                        >
                            Minh Lộc Group - Đa dạng hóa đầu tư, phát triển bền vững
                        </Typography>
                        <Breadcrumbs aria-label="breadcrumb" sx={{ justifyContent: 'center', color: 'white' }}>
                            <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                                Trang chủ
                            </MuiLink>
                            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#E7C873' }}>
                                <Business sx={{ mr: 0.5 }} fontSize="inherit" />
                                Lĩnh vực hoạt động
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Field Navigation */}
                <Box sx={{ mb: 6 }} data-aos="fade-up" data-aos-delay="200">
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            color: '#E7C873',
                            fontWeight: 600,
                            mb: 4,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                        }}
                    >
                        Các Lĩnh Vực Chính
                    </Typography>

                    <Grid container spacing={2} justifyContent="center">
                        {businessFields.map((field, index) => (
                            <Grid item xs={12} sm={6} md={4} key={field._id}>
                                <Card
                                    onClick={() => handleFieldChange(index)}
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        border: activeField === index ? `2px solid ${field.color}` : '2px solid transparent',
                                        borderRadius: 1,
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <Box
                                            sx={{
                                                color: field.color,
                                                fontSize: 40,
                                                mb: 2,
                                            }}
                                        >
                                            {getIconComponent(field.icon)}
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                color: activeField === index ? field.color : 'inherit',
                                            }}
                                        >
                                            {field.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {field.subtitle}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Selected Field Details */}
                <Box data-aos="fade-up" data-aos-delay="400">
                    <Card sx={{ mb: 4, overflow: 'hidden', borderRadius: 1, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={currentField.image}
                                    alt={currentField.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Box
                                            sx={{
                                                color: currentField.color,
                                                fontSize: 32,
                                                mr: 2,
                                            }}
                                        >
                                            {getIconComponent(currentField.icon)}
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant="h4"
                                                component="h3"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: currentField.color,
                                                    mb: 0.5,
                                                }}
                                            >
                                                {currentField.name}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                {currentField.subtitle}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="body1"
                                        paragraph
                                        sx={{
                                            fontSize: '1.1rem',
                                            lineHeight: 1.6,
                                            mb: 3,
                                            maxHeight: '4.8rem', // 3 lines * 1.6 line-height
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            wordBreak: 'break-word',
                                            whiteSpace: 'normal'
                                        }}
                                    >
                                        {currentField.description && currentField.description.length > 200
                                            ? currentField.description.substring(0, 200) + '...'
                                            : currentField.description}
                                    </Typography>

                                    <Box sx={{ mt: 'auto' }}>
                                        <Grid container spacing={2}>
                                            {Object.entries(currentField.stats).map(([key, value]) => (
                                                <Grid item xs={4} key={key}>
                                                    <Box sx={{
                                                        textAlign: 'center',
                                                        p: 2,
                                                        backgroundColor: '#f8f9fa',
                                                        borderRadius: 2,
                                                        border: `1px solid ${currentField.color}20`,
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            backgroundColor: `${currentField.color}10`,
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: `0 4px 12px ${currentField.color}30`,
                                                        }
                                                    }}>
                                                        <Typography variant="h5" sx={{
                                                            fontWeight: 700,
                                                            color: currentField.color,
                                                            mb: 0.5
                                                        }}>
                                                            {value}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                            {getStatsLabel(key)}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>

                    {/* Features and Projects */}
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%', borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography
                                        variant="h5"
                                        component="h4"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 3,
                                            color: currentField.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <CheckCircle sx={{ mr: 1 }} />
                                        Điểm Mạnh
                                    </Typography>
                                    <List>
                                        {currentField.features.map((feature, index) => (
                                            <ListItem key={index} sx={{
                                                px: 0,
                                                py: 1,
                                                borderRadius: 1,
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    backgroundColor: `${currentField.color}10`,
                                                    transform: 'translateX(4px)',
                                                }
                                            }}>
                                                <ListItemIcon>
                                                    <CheckCircle sx={{
                                                        color: currentField.color,
                                                        fontSize: 20,
                                                        transition: 'all 0.2s ease',
                                                    }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={feature}
                                                    sx={{
                                                        '& .MuiListItemText-primary': {
                                                            fontSize: '1rem',
                                                            fontWeight: 500,
                                                            color: '#2c3e50',
                                                        },
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%', borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography
                                        variant="h5"
                                        component="h4"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 3,
                                            color: currentField.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TrendingUp sx={{ mr: 1 }} />
                                        Dự Án Tiêu Biểu
                                    </Typography>
                                    <Stack spacing={2}>
                                        {currentField.projects.map((project, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    p: 3,
                                                    backgroundColor: '#f8f9fa',
                                                    borderRadius: 2,
                                                    border: `1px solid ${currentField.color}20`,
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: `${currentField.color}10`,
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: `0 4px 12px ${currentField.color}30`,
                                                        border: `1px solid ${currentField.color}40`,
                                                    }
                                                }}
                                            >
                                                <Typography variant="subtitle1" sx={{
                                                    fontWeight: 600,
                                                    mb: 1,
                                                    color: '#2c3e50',
                                                    fontSize: '1.1rem'
                                                }}>
                                                    {project.name}
                                                </Typography>
                                                {project.description && (
                                                    <Typography variant="body2" color="text.secondary" sx={{
                                                        mb: 1.5,
                                                        fontSize: '0.9rem',
                                                        lineHeight: 1.4
                                                    }}>
                                                        {project.description}
                                                    </Typography>
                                                )}
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                        {project.scale}
                                                    </Typography>
                                                    <Chip
                                                        label={getStatusLabel(project.status)}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: getStatusColor(project.status),
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem',
                                                            height: 24,
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* Call to Action */}
                <Box
                    sx={{
                        mt: 8,
                        p: 6,
                        background: 'linear-gradient(135deg, #E7C873 0%, #d4b85a 100%)',
                        borderRadius: 3,
                        textAlign: 'center',
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(231, 200, 115, 0.4)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                            zIndex: 1,
                        }
                    }}
                    data-aos="fade-up" data-aos-delay="600"
                >
                    <Box sx={{ position: 'relative', zIndex: 2 }}>
                        <Typography variant="h4" component="h3" sx={{
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: '1.8rem', md: '2.5rem' }
                        }}>
                            Bạn Quan Tâm Đến Lĩnh Vực Nào?
                        </Typography>
                        <Typography variant="h6" sx={{
                            mb: 4,
                            opacity: 0.9,
                            fontSize: { xs: '1rem', md: '1.2rem' },
                            maxWidth: '600px',
                            mx: 'auto'
                        }}>
                            Hãy để chúng tôi tư vấn và hỗ trợ bạn tìm ra giải pháp phù hợp nhất
                        </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={3}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<Phone />}
                                sx={{
                                    backgroundColor: 'white',
                                    color: '#E7C873',
                                    px: 5,
                                    py: 2,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#f8f9fa',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                                    },
                                }}
                            >
                                Gọi tư vấn ngay
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                endIcon={<ArrowForward />}
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    px: 5,
                                    py: 2,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    borderWidth: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                        borderColor: 'white',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 16px rgba(255,255,255,0.2)',
                                    },
                                }}
                            >
                                Xem thêm dự án
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
};

export default FieldPage;
