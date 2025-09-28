"use client";

import Layout from '@/components/client/shared/Layout';
import {
    Container,
    Typography,
    Box,
    Card,
    Tabs,
    Tab,
    Breadcrumbs,
    Link as MuiLink,
    Grid,
    Chip,
    Avatar,
    CircularProgress,
    Alert
} from '@mui/material';
import { Home, Business, Timeline, Star, Group, Handshake, Favorite } from '@mui/icons-material';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { companyService, type CompanyInfo } from '@/services/client/companyService';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`about-tabpanel-${index}`}
            aria-labelledby={`about-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [companyData, setCompanyData] = useState<CompanyInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    // Load company data from API
    useEffect(() => {
        const loadCompanyData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await companyService.getCompanyInfo();

                // Handle both single object and array responses
                if (Array.isArray(response)) {
                    console.warn('Company Data:', response);
                    setCompanyData(response);
                } else if (typeof response === 'object' && response !== null) {
                    console.warn('Company Data:', response);
                    // If single object, wrap in array
                    setCompanyData([response]);
                } else {
                    console.warn('Unexpected data format:', response);
                    setCompanyData([]); // Set empty array as fallback
                }
            } catch (err) {
                console.error('Error loading company data:', err);
                setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu công ty');
                setCompanyData([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        loadCompanyData();
    }, []);

    // Helper function to get data by section
    const getDataBySection = (section: string) => {
        return companyData.find(item => item.section === section);
    };

    const tabs = [
        { id: 0, label: 'Giới thiệu chung', icon: <Business /> },
        { id: 1, label: 'Lịch sử hình thành', icon: <Timeline /> },
        { id: 2, label: 'Năng lực cạnh tranh', icon: <Star /> },
        { id: 3, label: 'Hệ thống & Mạng lưới', icon: <Group /> },
        { id: 4, label: 'Đối tác chiến lược', icon: <Handshake /> },
        { id: 5, label: 'Trách nhiệm xã hội', icon: <Favorite /> },
    ];

    // Show loading state
    if (loading) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress size={60} />
                </Box>
            </Layout>
        );
    }

    // Show error state
    if (error) {
        return (
            <Layout>
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Banner */}
            <Box
                sx={{
                    backgroundImage: 'url("https://datxanhmiennam.com.vn/Data/Sites/1/Banner/bngt.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    height: { xs: '60vh', md: '70vh' },
                    display: 'flex',
                    alignItems: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        zIndex: 1,
                    }
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box textAlign="center" data-aos="fade-up" data-aos-duration="1000">
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontSize: { xs: '2.5rem', md: '4rem' },
                                fontWeight: 'bold',
                                color: 'white',
                                mb: 2,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            }}
                        >
                            GIỚI THIỆU MINH LỘC GROUP
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'white',
                                opacity: 0.9,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                            }}
                        >
                            Bất động sản đẳng cấp • Nhân sâm cao cấp
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Breadcrumbs Section */}
            <Box sx={{
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #e0e0e0',
                py: 2
            }}>
                <Container maxWidth="lg">
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        sx={{
                            '& .MuiBreadcrumbs-separator': {
                                color: '#666'
                            }
                        }}
                    >
                        <MuiLink
                            component={Link}
                            href="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#1976d2',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            <Home sx={{ mr: 0.5, fontSize: '1.2rem' }} />
                            Trang chủ
                        </MuiLink>
                        <Typography sx={{ color: '#666', display: 'flex', alignItems: 'center' }}>
                            <Business sx={{ mr: 0.5, fontSize: '1.2rem' }} />
                            Giới thiệu
                        </Typography>
                        <Typography sx={{ color: '#1976d2', fontWeight: 500 }}>
                            {tabs[activeTab].label}
                        </Typography>
                    </Breadcrumbs>
                </Container>
            </Box>

            {/* Navigation Tabs */}
            <Box sx={{ backgroundColor: 'white', borderBottom: '1px solid #e0e0e0' }}>
                <Container maxWidth="lg">
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#E7C873',
                                height: 3,
                            },
                            '& .MuiTab-root': {
                                minHeight: 48,
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                px: 3,
                                color: '#666',
                                '&.Mui-selected': {
                                    color: '#E7C873',
                                    fontWeight: 600,
                                },
                                '&:hover': {
                                    color: '#E7C873',
                                }
                            },
                        }}
                    >
                        {tabs.map((tab) => (
                            <Tab
                                key={tab.id}
                                label={tab.label}
                                icon={tab.icon}
                                iconPosition="start"
                                sx={{ minWidth: { xs: 'auto', md: 200 } }}
                            />
                        ))}
                    </Tabs>
                </Container>
            </Box>

            {/* Tab Content */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Giới thiệu chung */}
                <TabPanel value={activeTab} index={0}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 'bold',
                                color: '#1a1a1a',
                                mb: 4,
                            }}
                        >
                            {getDataBySection('general')?.title || 'GIỚI THIỆU CHUNG'}
                        </Typography>
                    </Box>

                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={5}>
                            <Box
                                data-aos="fade-right"
                                data-aos-duration="1000"
                                sx={{
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: -20,
                                        left: -20,
                                        right: 20,
                                        bottom: 20,
                                        background: 'linear-gradient(135deg, #E7C873 0%, #d4b85a 100%)',
                                        borderRadius: 1,
                                        zIndex: -1,
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                                    alt="Tổng Giám đốc Minh Lộc Group"
                                    sx={{
                                        width: '100%',
                                        height: 500,
                                        objectFit: 'cover',
                                        borderRadius: 1,
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Box
                                data-aos="fade-left"
                                data-aos-duration="1000"
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    p: 4,
                                    borderRadius: 2,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.1rem',
                                        lineHeight: 1.8,
                                        color: '#333',
                                        mb: 3,
                                        whiteSpace: 'pre-line'
                                    }}
                                >
                                    {getDataBySection('general')?.content || 'Minh Lộc Group được thành lập năm 2015 với mục tiêu mang đến những sản phẩm bất động sản đẳng cấp và các sản phẩm nhân sâm cao cấp chất lượng tốt nhất. Với hơn 8 năm phát triển, chúng tôi đã khẳng định vị thế là một trong những tập đoàn hàng đầu trong lĩnh vực bất động sản và kinh doanh nhân sâm tại Việt Nam.'}
                                </Typography>

                                {/* Company Info */}
                                {getDataBySection('general')?.data && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
                                            Thông tin công ty
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {getDataBySection('general')?.data?.companyName && (
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                                        <strong>Tên công ty:</strong> {getDataBySection('general')?.data?.companyName}
                                                    </Typography>
                                                </Grid>
                                            )}
                                            {getDataBySection('general')?.data?.foundedYear && (
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                                        <strong>Năm thành lập:</strong> {getDataBySection('general')?.data?.foundedYear}
                                                    </Typography>
                                                </Grid>
                                            )}
                                            {getDataBySection('general')?.data?.headquarters && (
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                                        <strong>Trụ sở chính:</strong> {getDataBySection('general')?.data?.headquarters}
                                                    </Typography>
                                                </Grid>
                                            )}
                                            {getDataBySection('general')?.data?.contactInfo?.email && (
                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                                        <strong>Email:</strong> {getDataBySection('general')?.data?.contactInfo?.email}
                                                    </Typography>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Box>
                                )}

                                {/* Mission & Vision */}
                                <Grid container spacing={3} sx={{ mt: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ p: 2, backgroundColor: 'rgba(231, 200, 115, 0.1)', borderRadius: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                                                Sứ mệnh
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666' }}>
                                                {getDataBySection('general')?.data?.mission || 'Mang đến những sản phẩm và dịch vụ chất lượng cao, góp phần xây dựng cuộc sống tốt đẹp hơn cho cộng đồng và phát triển bền vững.'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ p: 2, backgroundColor: 'rgba(231, 200, 115, 0.1)', borderRadius: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                                                Tầm nhìn
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666' }}>
                                                {getDataBySection('general')?.data?.vision || 'Trở thành tập đoàn đa ngành hàng đầu Việt Nam và khu vực Đông Nam Á, được khách hàng tin tưởng và đối tác đánh giá cao.'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box sx={{ textAlign: 'right', pt: 2, borderTop: '1px solid #e0e0e0' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                                        Lãnh đạo MinhLoc Group
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                                        Tập thể lãnh đạo tài năng
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Achievements Section */}
                    {(() => {
                        const achievements = getDataBySection('general')?.data?.achievements;
                        return achievements && achievements.length > 0 ? (
                            <Box sx={{ mt: 8 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        color: '#1a1a1a',
                                        mb: 6,
                                    }}
                                >
                                    Thành tựu nổi bật
                                </Typography>
                                <Grid container spacing={3}>
                                    {getDataBySection('general')?.data?.achievements?.map((achievement, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <Box
                                                data-aos="zoom-in"
                                                data-aos-delay={index * 100}
                                                sx={{
                                                    textAlign: 'center',
                                                    p: 3,
                                                    backgroundColor: 'white',
                                                    borderRadius: 2,
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                    border: '1px solid #e0e0e0',
                                                    '&:hover': {
                                                        transform: 'translateY(-8px)',
                                                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                <Typography
                                                    variant="h3"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: '#1976d2',
                                                        mb: 2,
                                                        fontSize: { xs: '2rem', md: '3rem' },
                                                    }}
                                                >
                                                    {achievement.number}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: '#333',
                                                        fontWeight: 500,
                                                        textAlign: 'center',
                                                        lineHeight: 1.4,
                                                    }}
                                                >
                                                    {achievement.label}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ) : (
                            <Box sx={{ mt: 8, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ color: '#666', fontStyle: 'italic' }}>
                                    Chưa có dữ liệu thành tựu
                                </Typography>
                            </Box>
                        );
                    })()}

                    {/* Values Section */}
                    {(() => {
                        const values = getDataBySection('general')?.data?.values;
                        return values && values.length > 0 ? (
                            <Box sx={{ mt: 8 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        color: '#1a1a1a',
                                        mb: 6,
                                    }}
                                >
                                    Giá trị cốt lõi
                                </Typography>
                                <Grid container spacing={3}>
                                    {getDataBySection('general')?.data?.values?.map((value, index) => (
                                        <Grid item xs={12} md={6} key={index}>
                                            <Box
                                                data-aos="fade-up"
                                                data-aos-delay={index * 100}
                                                sx={{
                                                    p: 3,
                                                    backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                                    borderRadius: 2,
                                                    borderLeft: 4,
                                                    borderLeftColor: '#E7C873',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(231, 200, 115, 0.15)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontWeight: 'medium',
                                                        lineHeight: 1.6,
                                                    }}
                                                >
                                                    {value}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ) : (
                            <Box sx={{ mt: 8, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ color: '#666', fontStyle: 'italic' }}>
                                    Chưa có dữ liệu giá trị cốt lõi
                                </Typography>
                            </Box>
                        );
                    })()}
                </TabPanel>

                {/* Lịch sử hình thành */}
                <TabPanel value={activeTab} index={1}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 'bold',
                                color: '#1a1a1a',
                                mb: 4,
                            }}
                        >
                            {getDataBySection('history')?.title || 'LỊCH SỬ HÌNH THÀNH VÀ PHÁT TRIỂN'}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                            borderRadius: 1,
                            p: 4,
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: 0.1,
                                zIndex: 1,
                            }
                        }}
                    >
                        <Box sx={{ position: 'relative', zIndex: 2 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    mb: 4,
                                    textAlign: 'center',
                                }}
                            >
                                Các mốc phát triển quan trọng
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 4 }}>
                                {(() => {
                                    const milestones = getDataBySection('history')?.data?.milestones;
                                    return milestones && milestones.length > 0 ?
                                        milestones.map((item, index) => (
                                            <Card
                                                key={item.year || index}
                                                data-aos="zoom-in"
                                                data-aos-delay={index * 100}
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                    p: 3,
                                                    minWidth: 280,
                                                    maxWidth: 350,
                                                    textAlign: 'center',
                                                    borderRadius: 2,
                                                    border: '1px solid rgba(25, 118, 210, 0.1)',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                                        borderColor: '#1976d2',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: '#1976d2',
                                                        mb: 2,
                                                        fontSize: '1.8rem'
                                                    }}
                                                >
                                                    {item.year}
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: '#333',
                                                        mb: 2,
                                                        fontSize: '1.1rem',
                                                        lineHeight: 1.3
                                                    }}
                                                >
                                                    {item.event}
                                                </Typography>
                                                {item.description && (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#666',
                                                            lineHeight: 1.5,
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        {item.description}
                                                    </Typography>
                                                )}
                                            </Card>
                                        )) : (
                                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                                <Typography variant="h6" sx={{ color: '#666', fontStyle: 'italic' }}>
                                                    Chưa có dữ liệu lịch sử
                                                </Typography>
                                            </Box>
                                        );
                                })()}
                            </Box>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        mb: 2,
                                    }}
                                >
                                    2024
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        lineHeight: 1.6,
                                        maxWidth: 800,
                                        mx: 'auto',
                                    }}
                                >
                                    Thực hiện chiến lược đa dạng hóa sản phẩm và thị trường. Đặc biệt là sự kiện thành lập 2 chi nhánh mới là Chi nhánh Hà Nội và Chi nhánh Đà Nẵng với mạng lưới hoạt động phủ khắp Việt Nam và các nước trong khu vực.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>

                {/* Năng lực cạnh tranh */}
                <TabPanel value={activeTab} index={2}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 'bold',
                                color: '#1a1a1a',
                                mb: 4,
                            }}
                        >
                            {getDataBySection('competitiveness')?.title || 'NĂNG LỰC CẠNH TRANH VÀ THẾ MẠNH'}
                        </Typography>
                    </Box>

                    {/* Content Description */}
                    {getDataBySection('competitiveness')?.content && (
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: 800,
                                    mx: 'auto',
                                    lineHeight: 1.8,
                                    color: '#666',
                                }}
                            >
                                {getDataBySection('competitiveness')?.content}
                            </Typography>
                        </Box>
                    )}

                    <Grid container spacing={4}>
                        {(() => {
                            const strengths = getDataBySection('competitiveness')?.data?.strengths;
                            return strengths && strengths.length > 0 ?
                                strengths.map((item, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Card
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                            sx={{
                                                height: '100%',
                                                p: 3,
                                                textAlign: 'center',
                                                border: `2px solid ${item.color}`,
                                                borderRadius: 1,
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: `0 8px 25px ${item.color}30`,
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: '50%',
                                                    backgroundColor: `${item.color}20`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mx: 'auto',
                                                    mb: 2,
                                                }}
                                            >
                                                <Typography
                                                    variant="h2"
                                                    sx={{ fontSize: '2.5rem' }}
                                                >
                                                    {item.icon || '💼'}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: item.color,
                                                    mb: 2,
                                                }}
                                            >
                                                {item.title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: '#666',
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {item.description}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                )) : (
                                    <Grid item xs={12}>
                                        <Box sx={{ textAlign: 'center', py: 4 }}>
                                            <Typography variant="h6" sx={{ color: '#666', fontStyle: 'italic' }}>
                                                Chưa có dữ liệu thế mạnh
                                            </Typography>
                                        </Box>
                                    </Grid>
                                );
                        })()}
                    </Grid>
                </TabPanel>

                {/* Hệ thống Minh Lộc Group */}
                <TabPanel value={activeTab} index={3}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 'bold',
                                color: '#1a1a1a',
                                mb: 4,
                            }}
                        >
                            {getDataBySection('system')?.title || 'HỆ THỐNG VÀ MẠNG LƯỚI HOẠT ĐỘNG'}
                        </Typography>
                    </Box>

                    {/* Content Description */}
                    {getDataBySection('system')?.content && (
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: 800,
                                    mx: 'auto',
                                    lineHeight: 1.8,
                                    color: '#666',
                                }}
                            >
                                {getDataBySection('system')?.content}
                            </Typography>
                        </Box>
                    )}

                    {/* Business Areas */}
                    {(() => {
                        const businessAreas = getDataBySection('system')?.data?.businessAreas;
                        return businessAreas && businessAreas.length > 0 && (
                            <Grid container spacing={4} sx={{ mb: 6 }}>
                                {businessAreas.map((area, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Card
                                            data-aos="fade-up"
                                            data-aos-delay={index * 200}
                                            sx={{
                                                height: '100%',
                                                p: 4,
                                                background: `linear-gradient(135deg, ${area.color} 0%, ${area.color}dd 100%)`,
                                                color: 'white',
                                                borderRadius: 2,
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: `0 8px 25px ${area.color}40`,
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                                                {area.name}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                                                {area.description}
                                            </Typography>
                                            <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                                {area.items.map((item, itemIndex) => (
                                                    <Box key={itemIndex} component="li" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ width: 8, height: 8, backgroundColor: 'white', borderRadius: '50%', mr: 2 }} />
                                                        <Typography>{item}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        );
                    })()}

                    {/* Network */}
                    {(() => {
                        const network = getDataBySection('system')?.data?.network;
                        return network && network.length > 0 && (
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#1a1a1a',
                                        mb: 4,
                                    }}
                                >
                                    Mạng lưới chi nhánh và văn phòng
                                </Typography>
                                <Grid container spacing={3}>
                                    {network.map((item, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <Card
                                                data-aos="zoom-in"
                                                data-aos-delay={index * 100}
                                                sx={{
                                                    p: 3,
                                                    textAlign: 'center',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                                                    {item.city}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                                    {item.projects} dự án
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#666' }}>
                                                    {item.staff} nhân viên
                                                </Typography>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        );
                    })()}

                </TabPanel>

                {/* Đối tác */}
                <TabPanel value={activeTab} index={4}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 'bold',
                                color: '#1a1a1a',
                                mb: 4,
                            }}
                        >
                            {getDataBySection('partners')?.title || 'ĐỐI TÁC CHIẾN LƯỢC VÀ UY TÍN'}
                        </Typography>
                    </Box>

                    {/* Content Description */}
                    {getDataBySection('partners')?.content && (
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: 800,
                                    mx: 'auto',
                                    lineHeight: 1.8,
                                    color: '#666',
                                }}
                            >
                                {getDataBySection('partners')?.content}
                            </Typography>
                        </Box>
                    )}

                    <Grid container spacing={4}>
                        {(() => {
                            const partners = getDataBySection('partners')?.data?.partners;
                            return partners && partners.length > 0 ?
                                partners.map((partner, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                            sx={{
                                                p: 3,
                                                height: '100%',
                                                textAlign: 'center',
                                                border: '1px solid #e0e0e0',
                                                '&:hover': {
                                                    borderColor: '#1976d2',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 4px 20px rgba(25,118,210,0.15)',
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            {partner.logo ? (
                                                <Box
                                                    component="img"
                                                    src={partner.logo}
                                                    alt={partner.name}
                                                    sx={{
                                                        width: 100,
                                                        height: 100,
                                                        mx: 'auto',
                                                        mb: 2,
                                                        objectFit: 'contain',
                                                        borderRadius: 1,
                                                        border: '1px solid #e0e0e0',
                                                        backgroundColor: 'white',
                                                        p: 1,
                                                    }}
                                                />
                                            ) : (
                                                <Avatar
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        mx: 'auto',
                                                        mb: 2,
                                                        backgroundColor: '#1976d2',
                                                        fontSize: '1.8rem',
                                                    }}
                                                >
                                                    {partner.name.charAt(0)}
                                                </Avatar>
                                            )}
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1rem' }}>
                                                {partner.name}
                                            </Typography>
                                            <Chip
                                                label={partner.type}
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#E7C873',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                }}
                                            />
                                        </Card>
                                    </Grid>
                                )) : (
                                    <Grid item xs={12}>
                                        <Box sx={{ textAlign: 'center', py: 4 }}>
                                            <Typography variant="h6" sx={{ color: '#666', fontStyle: 'italic' }}>
                                                Chưa có dữ liệu đối tác
                                            </Typography>
                                        </Box>
                                    </Grid>
                                );
                        })()}
                    </Grid>
                </TabPanel>

                {/* Hoạt động xã hội */}
                <TabPanel value={activeTab} index={5}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 'bold',
                                color: '#1a1a1a',
                                mb: 4,
                            }}
                        >
                            {getDataBySection('social_activities')?.title || 'TRÁCH NHIỆM XÃ HỘI VÀ CỘNG ĐỒNG'}
                        </Typography>
                    </Box>

                    {/* Content Description */}
                    {getDataBySection('social_activities')?.content && (
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: 800,
                                    mx: 'auto',
                                    lineHeight: 1.8,
                                    color: '#666',
                                }}
                            >
                                {getDataBySection('social_activities')?.content}
                            </Typography>
                        </Box>
                    )}

                    {/* Activities */}
                    {(() => {
                        const activities = getDataBySection('social_activities')?.data?.activities;
                        return activities && activities.length > 0 && (
                            <Box sx={{ mb: 6 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#1a1a1a',
                                        mb: 4,
                                        textAlign: 'center',
                                    }}
                                >
                                    Chương trình và hoạt động từ thiện
                                </Typography>
                                <Grid container spacing={4}>
                                    {activities.map((activity, index) => (
                                        <Grid item xs={12} md={6} key={index}>
                                            <Card
                                                data-aos="fade-up"
                                                data-aos-delay={index * 200}
                                                sx={{
                                                    height: '100%',
                                                    overflow: 'hidden',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                {activity.image && (
                                                    <Box
                                                        component="img"
                                                        src={activity.image}
                                                        alt={activity.title}
                                                        sx={{
                                                            width: '100%',
                                                            height: 200,
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                )}
                                                <Box sx={{ p: 3 }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            mb: 2,
                                                            color: '#1976d2',
                                                            fontSize: '1.1rem',
                                                            lineHeight: 1.3
                                                        }}
                                                    >
                                                        {activity.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#666',
                                                            lineHeight: 1.6,
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        {activity.description}
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        );
                    })()}


                    <Box sx={{ mt: 6 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                color: '#1a1a1a',
                                mb: 4,
                                textAlign: 'center',
                            }}
                        >
                            Kết quả và thành tích đạt được
                        </Typography>
                        <Grid container spacing={3}>
                            {(() => {
                                const achievements = getDataBySection('social_activities')?.data?.achievements;
                                return achievements && achievements.length > 0 ?
                                    achievements.map((item, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <Card
                                                data-aos="zoom-in"
                                                data-aos-delay={index * 100}
                                                sx={{
                                                    p: 3,
                                                    textAlign: 'center',
                                                    background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                                    },
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                <Typography
                                                    variant="h3"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: '#1976d2',
                                                        mb: 1,
                                                    }}
                                                >
                                                    {item.number}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: '#666',
                                                        fontWeight: '500',
                                                    }}
                                                >
                                                    {item.label}
                                                </Typography>
                                            </Card>
                                        </Grid>
                                    )) : (
                                        <Grid item xs={12}>
                                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                                <Typography variant="h6" sx={{ color: '#666', fontStyle: 'italic' }}>
                                                    Chưa có dữ liệu thành tích
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    );
                            })()}
                        </Grid>
                    </Box>
                </TabPanel>
            </Container>
        </Layout >
    );
}