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
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
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

const FieldPage: React.FC = () => {
    const [activeField, setActiveField] = useState(0);

    const businessFields = [
        {
            id: 0,
            title: 'Xây Dựng',
            subtitle: 'Chuyên nghiệp - Chất lượng - Uy tín',
            description: 'Minh Lộc Group là đơn vị tiên phong trong lĩnh vực xây dựng với hơn 15 năm kinh nghiệm. Chúng tôi cam kết mang đến những công trình chất lượng cao, đáp ứng mọi nhu cầu từ nhà ở đến các dự án thương mại quy mô lớn.',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/canho.png',
            icon: <Construction />,
            color: '#E7C873',
            features: [
                'Thiết kế kiến trúc chuyên nghiệp',
                'Thi công đúng tiến độ cam kết',
                'Vật liệu chất lượng cao',
                'Bảo hành dài hạn',
                'Đội ngũ kỹ sư giàu kinh nghiệm',
                'Tuân thủ quy chuẩn an toàn'
            ],
            projects: [
                { name: 'Khu đô thị Minh Lộc', scale: '500 căn hộ', status: 'Hoàn thành' },
                { name: 'Tòa nhà văn phòng A', scale: '20 tầng', status: 'Đang thi công' },
                { name: 'Chung cư cao cấp B', scale: '300 căn hộ', status: 'Hoàn thành' }
            ],
            stats: {
                projects: '50+',
                area: '1.2M m²',
                experience: '15+ năm'
            }
        },
        {
            id: 1,
            title: 'Đầu Tư Tài Chính',
            subtitle: 'Tăng trưởng bền vững - Lợi nhuận cao',
            description: 'Với chiến lược đầu tư thông minh và đa dạng hóa danh mục, Minh Lộc Group đã tạo ra những cơ hội đầu tư sinh lời cao cho khách hàng. Chúng tôi tập trung vào các lĩnh vực có tiềm năng tăng trưởng mạnh mẽ.',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/datnen.png',
            icon: <AccountBalance />,
            color: '#2E7D32',
            features: [
                'Phân tích thị trường chuyên sâu',
                'Đa dạng hóa danh mục đầu tư',
                'Quản lý rủi ro hiệu quả',
                'Tư vấn tài chính cá nhân',
                'Báo cáo minh bạch',
                'Hỗ trợ 24/7'
            ],
            projects: [
                { name: 'Quỹ đầu tư BĐS', scale: '500 tỷ VNĐ', status: 'Đang hoạt động' },
                { name: 'Dự án cổ phiếu', scale: '200 tỷ VNĐ', status: 'Hoàn thành' },
                { name: 'Đầu tư vàng', scale: '100 tỷ VNĐ', status: 'Đang hoạt động' }
            ],
            stats: {
                return: '15-25%',
                clients: '1000+',
                experience: '10+ năm'
            }
        },
        {
            id: 2,
            title: 'Bất Động Sản',
            subtitle: 'Không gian sống lý tưởng - Giá trị bền vững',
            description: 'Minh Lộc Group là cầu nối giữa khách hàng và những bất động sản chất lượng cao. Chúng tôi không chỉ bán nhà mà còn tạo ra những không gian sống hoàn hảo, mang đến giá trị lâu dài cho cộng đồng.',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/bds.png',
            icon: <Business />,
            color: '#1976D2',
            features: [
                'Tư vấn BĐS chuyên nghiệp',
                'Pháp lý minh bạch',
                'Hỗ trợ vay vốn',
                'Dịch vụ sau bán hàng',
                'Đánh giá thị trường',
                'Môi giới uy tín'
            ],
            projects: [
                { name: 'Khu đô thị ven sông', scale: '1000 căn hộ', status: 'Đang bán' },
                { name: 'Biệt thự cao cấp', scale: '200 căn', status: 'Hoàn thành' },
                { name: 'Shophouse thương mại', scale: '500 căn', status: 'Sắp mở bán' }
            ],
            stats: {
                properties: '2000+',
                clients: '5000+',
                experience: '12+ năm'
            }
        }
    ];

    const handleFieldChange = (fieldId: number) => {
        setActiveField(fieldId);
    };

    const currentField = businessFields[activeField];

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
                        {businessFields.map((field) => (
                            <Grid item xs={12} sm={6} md={4} key={field.id}>
                                <Card
                                    onClick={() => handleFieldChange(field.id)}
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        border: activeField === field.id ? `2px solid ${field.color}` : '2px solid transparent',
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
                                            {field.icon}
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                color: activeField === field.id ? field.color : 'inherit',
                                            }}
                                        >
                                            {field.title}
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
                                    alt={currentField.title}
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
                                            {currentField.icon}
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
                                                {currentField.title}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                {currentField.subtitle}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                                        {currentField.description}
                                    </Typography>

                                    <Box sx={{ mt: 'auto' }}>
                                        <Grid container spacing={2}>
                                            {Object.entries(currentField.stats).map(([key, value]) => (
                                                <Grid item xs={4} key={key}>
                                                    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                                                        <Typography variant="h5" sx={{ fontWeight: 700, color: currentField.color }}>
                                                            {value}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {key === 'projects' ? 'Dự án' :
                                                                key === 'area' ? 'Diện tích' :
                                                                    key === 'experience' ? 'Kinh nghiệm' :
                                                                        key === 'return' ? 'Lợi nhuận' :
                                                                            key === 'clients' ? 'Khách hàng' :
                                                                                key === 'properties' ? 'Bất động sản' : key}
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
                                            <ListItem key={index} sx={{ px: 0 }}>
                                                <ListItemIcon>
                                                    <CheckCircle sx={{ color: currentField.color, fontSize: 20 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={feature}
                                                    sx={{
                                                        '& .MuiListItemText-primary': {
                                                            fontSize: '1rem',
                                                            fontWeight: 500,
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
                                                    p: 2,
                                                    backgroundColor: '#f8f9fa',
                                                    borderRadius: 1,
                                                    border: `1px solid ${currentField.color}20`,
                                                }}
                                            >
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                    {project.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {project.scale}
                                                    </Typography>
                                                    <Chip
                                                        label={project.status}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: project.status === 'Hoàn thành' ? '#4CAF50' :
                                                                project.status === 'Đang hoạt động' ? '#2196F3' :
                                                                    project.status === 'Đang thi công' ? '#FF9800' :
                                                                        project.status === 'Đang bán' ? '#E7C873' :
                                                                            project.status === 'Sắp mở bán' ? '#9C27B0' : '#757575',
                                                            color: 'white',
                                                            fontWeight: 500,
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
                        backgroundColor: 'linear-gradient(135deg, #E7C873 0%, #d4b85a 100%)',
                        borderRadius: 1,
                        textAlign: 'center',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(231, 200, 115, 0.3)',
                    }}
                    data-aos="fade-up" data-aos-delay="600"
                >
                    <Typography variant="h4" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
                        Bạn Quan Tâm Đến Lĩnh Vực Nào?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                        Hãy để chúng tôi tư vấn và hỗ trợ bạn tìm ra giải pháp phù hợp nhất
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
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
                                px: 4,
                                py: 1.5,
                                borderRadius: 1,
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
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
                                px: 4,
                                py: 1.5,
                                borderRadius: 1,
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    borderColor: 'white',
                                },
                            }}
                        >
                            Xem thêm dự án
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Layout>
    );
};

export default FieldPage;
