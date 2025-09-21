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
    Avatar
} from '@mui/material';
import { Home, Business, Timeline, Star, Group, Handshake, Favorite } from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';

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

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const tabs = [
        { id: 0, label: 'Giới thiệu chung', icon: <Business /> },
        { id: 1, label: 'Lịch sử hình thành', icon: <Timeline /> },
        { id: 2, label: 'Năng lực cạnh tranh', icon: <Star /> },
        { id: 3, label: 'Hệ thống Minh Lộc Group', icon: <Group /> },
        { id: 4, label: 'Đối tác', icon: <Handshake /> },
        { id: 5, label: 'Hoạt động xã hội', icon: <Favorite /> },
    ];

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
                            GIỚI THIỆU MINH LỘC GROUP
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
                                    }}
                                >
                                    Minh Lộc Group được thành lập năm 2015 với mục tiêu mang đến những sản phẩm bất động sản đẳng cấp và các sản phẩm nhân sâm cao cấp chất lượng tốt nhất. Với hơn 8 năm phát triển, chúng tôi đã khẳng định vị thế là một trong những tập đoàn hàng đầu trong lĩnh vực bất động sản và kinh doanh nhân sâm tại Việt Nam.
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.1rem',
                                        lineHeight: 1.8,
                                        color: '#333',
                                        mb: 3,
                                    }}
                                >
                                    Minh Lộc Group không ngừng nỗ lực nâng cao giá trị cuộc sống cho người dân Việt Nam thông qua việc cung cấp những sản phẩm bất động sản chất lượng cao và các sản phẩm chăm sóc sức khỏe từ nhân sâm. Chúng tôi cam kết mang đến những cơ hội đầu tư an toàn, hiệu quả và bền vững.
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.1rem',
                                        lineHeight: 1.8,
                                        color: '#333',
                                        mb: 4,
                                    }}
                                >
                                    Với triết lý kinh doanh "Xây dựng niềm tin bắt đầu từ xây dựng ngôi nhà của bạn", Minh Lộc Group luôn đặt khách hàng làm trung tâm, đảm bảo mọi sản phẩm và dịch vụ đều đạt tiêu chuẩn cao nhất.
                                </Typography>
                                <Box sx={{ textAlign: 'right', pt: 2, borderTop: '1px solid #e0e0e0' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                                        Tổng Giám đốc Minh Lộc Group
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                                        Nguyễn Minh Lộc
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
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
                            LỊCH SỬ HÌNH THÀNH
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
                                Dòng thời gian phát triển
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 4 }}>
                                {[
                                    { year: '2015', event: 'Thành lập Minh Lộc Group' },
                                    { year: '2017', event: 'Ra mắt dự án BĐS đầu tiên' },
                                    { year: '2019', event: 'Mở rộng sang lĩnh vực nhân sâm' },
                                    { year: '2021', event: 'Đạt doanh thu 1000 tỷ VNĐ' },
                                    { year: '2023', event: 'Mở rộng ra thị trường quốc tế' },
                                    { year: '2024', event: 'Kỷ niệm 10 năm thành lập' },
                                ].map((item, index) => (
                                    <Card
                                        key={item.year}
                                        data-aos="zoom-in"
                                        data-aos-delay={index * 100}
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            p: 2,
                                            minWidth: 200,
                                            textAlign: 'center',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                                            {item.year}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            {item.event}
                                        </Typography>
                                    </Card>
                                ))}
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
                            NĂNG LỰC CẠNH TRANH
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            {
                                title: 'Vốn hóa mạnh mẽ',
                                description: 'Tổng vốn điều lệ hơn 2.000 tỷ VNĐ, đảm bảo năng lực tài chính vững mạnh',
                                icon: '💰',
                                color: '#4caf50'
                            },
                            {
                                title: 'Đội ngũ chuyên nghiệp',
                                description: 'Hơn 500 nhân viên có trình độ cao, kinh nghiệm dày dặn trong lĩnh vực BĐS và nhân sâm',
                                icon: '👥',
                                color: '#2196f3'
                            },
                            {
                                title: 'Công nghệ tiên tiến',
                                description: 'Ứng dụng công nghệ 4.0 trong quản lý dự án và phân phối sản phẩm',
                                icon: '🚀',
                                color: '#ff9800'
                            },
                            {
                                title: 'Mạng lưới rộng khắp',
                                description: 'Có mặt tại 15 tỉnh thành với hơn 50 điểm bán hàng và showroom',
                                icon: '🌐',
                                color: '#9c27b0'
                            },
                            {
                                title: 'Chứng nhận chất lượng',
                                description: 'Đạt các chứng nhận ISO 9001:2015, ISO 14001:2015 và HACCP',
                                icon: '🏆',
                                color: '#f44336'
                            },
                            {
                                title: 'Đối tác uy tín',
                                description: 'Hợp tác với hơn 100 đối tác trong nước và quốc tế',
                                icon: '🤝',
                                color: '#607d8b'
                            }
                        ].map((item, index) => (
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
                                    <Typography
                                        variant="h2"
                                        sx={{ mb: 2, fontSize: '3rem' }}
                                    >
                                        {item.icon}
                                    </Typography>
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
                        ))}
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
                            HỆ THỐNG MINH LỘC GROUP
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Card
                                data-aos="fade-right"
                                data-aos-duration="1000"
                                sx={{
                                    height: '100%',
                                    p: 4,
                                    background: 'linear-gradient(135deg, #E7C873 0%, #d4b85a 100%)',
                                    color: 'white',
                                }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                                    Bất động sản
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                    {[
                                        'Căn hộ cao cấp',
                                        'Nhà phố, biệt thự',
                                        'Khu đô thị mới',
                                        'Dự án nghỉ dưỡng',
                                        'Văn phòng cho thuê',
                                        'Khu thương mại'
                                    ].map((item, index) => (
                                        <Box key={index} component="li" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ width: 8, height: 8, backgroundColor: 'white', borderRadius: '50%', mr: 2 }} />
                                            <Typography>{item}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card
                                data-aos="fade-left"
                                data-aos-duration="1000"
                                sx={{
                                    height: '100%',
                                    p: 4,
                                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                    color: 'white',
                                }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                                    Nhân sâm cao cấp
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                    {[
                                        'Sâm tươi Hàn Quốc',
                                        'Sâm khô chất lượng cao',
                                        'Cao sâm đặc biệt',
                                        'Trà sâm thảo dược',
                                        'Thực phẩm chức năng',
                                        'Mỹ phẩm từ sâm'
                                    ].map((item, index) => (
                                        <Box key={index} component="li" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ width: 8, height: 8, backgroundColor: 'white', borderRadius: '50%', mr: 2 }} />
                                            <Typography>{item}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 6, textAlign: 'center' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                color: '#1a1a1a',
                                mb: 4,
                            }}
                        >
                            Mạng lưới hoạt động
                        </Typography>
                        <Grid container spacing={3}>
                            {[
                                { city: 'Hà Nội', projects: 15, staff: 120 },
                                { city: 'TP.HCM', projects: 25, staff: 200 },
                                { city: 'Đà Nẵng', projects: 8, staff: 60 },
                                { city: 'Hải Phòng', projects: 5, staff: 40 },
                                { city: 'Cần Thơ', projects: 6, staff: 45 },
                                { city: 'Nha Trang', projects: 4, staff: 35 },
                            ].map((item, index) => (
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
                                        <Typography variant="body2" sx={{ color: '#666' }}>
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
                            ĐỐI TÁC CHIẾN LƯỢC
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            { name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam', type: 'Tài chính' },
                            { name: 'Tập đoàn Vingroup', type: 'Bất động sản' },
                            { name: 'Công ty TNHH Samsung Electronics Việt Nam', type: 'Công nghệ' },
                            { name: 'Tập đoàn FPT', type: 'Công nghệ thông tin' },
                            { name: 'Công ty TNHH LG Electronics Việt Nam', type: 'Điện tử' },
                            { name: 'Tập đoàn Hòa Phát', type: 'Thép' },
                            { name: 'Công ty TNHH Nestlé Việt Nam', type: 'Thực phẩm' },
                            { name: 'Tập đoàn Masan', type: 'Thực phẩm' },
                            { name: 'Công ty TNHH Unilever Việt Nam', type: 'Hàng tiêu dùng' },
                            { name: 'Tập đoàn Vinamilk', type: 'Sữa' },
                            { name: 'Công ty TNHH Canon Marketing Việt Nam', type: 'Thiết bị văn phòng' },
                            { name: 'Tập đoàn Thế Giới Di Động', type: 'Bán lẻ' },
                        ].map((partner, index) => (
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
                                    <Avatar
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            mx: 'auto',
                                            mb: 2,
                                            backgroundColor: '#1976d2',
                                            fontSize: '1.5rem',
                                        }}
                                    >
                                        {partner.name.charAt(0)}
                                    </Avatar>
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
                        ))}
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
                            HOẠT ĐỘNG XÃ HỘI
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box
                                data-aos="fade-right"
                                data-aos-duration="1000"
                                sx={{
                                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                    borderRadius: 1,
                                    p: 4,
                                    color: 'white',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundImage: 'url("https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        opacity: 0.2,
                                        zIndex: 1,
                                    }
                                }}
                            >
                                <Box sx={{ position: 'relative', zIndex: 2 }}>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                                        CỘNG ĐỒNG
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                                        Gắn kết với cộng đồng, vì cộng đồng và chia sẻ thành công với cộng đồng là những nghĩa cử cao đẹp đã được toàn thể cán bộ, công nhân viên Minh Lộc Group thực hiện. Mỗi thành viên trong hệ thống Minh Lộc Group luôn ý thức sâu sắc trách nhiệm gắn bó và chia sẻ với cộng đồng bằng những hành động thiết thực.
                                    </Typography>
                                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                        Minh Lộc Group đã tổ chức một Ban công tác xã hội và Quỹ từ thiện riêng để kịp thời chung tay chia sẻ khó khăn với những hoàn cảnh kém may mắn, đồng hành cùng các cơ quan đoàn thể mang lại hạnh phúc ấm no cho người dân gặp khó khăn trong cả nước.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                data-aos="fade-left"
                                data-aos-duration="1000"
                                sx={{
                                    background: 'linear-gradient(135deg, #E7C873 0%, #d4b85a 100%)',
                                    borderRadius: 1,
                                    p: 4,
                                    color: 'white',
                                }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                                    Các hoạt động nổi bật
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                    {[
                                        'Chương trình "Mái ấm cho em" - Xây dựng nhà tình thương',
                                        'Quỹ học bổng "Vì tương lai Việt Nam" - Hỗ trợ học sinh nghèo',
                                        'Chương trình "Sức khỏe cộng đồng" - Khám bệnh miễn phí',
                                        'Dự án "Xanh hóa môi trường" - Trồng cây gây rừng',
                                        'Hỗ trợ người dân vùng lũ lụt, thiên tai',
                                        'Tặng quà Tết cho gia đình chính sách'
                                    ].map((item, index) => (
                                        <Box key={index} component="li" sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ width: 8, height: 8, backgroundColor: 'white', borderRadius: '50%', mr: 2, mt: 1, flexShrink: 0 }} />
                                            <Typography sx={{ lineHeight: 1.6 }}>{item}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

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
                            Thành tích đạt được
                        </Typography>
                        <Grid container spacing={3}>
                            {[
                                { number: '500+', label: 'Gia đình được hỗ trợ' },
                                { number: '1,000+', label: 'Học sinh nhận học bổng' },
                                { number: '50+', label: 'Nhà tình thương được xây' },
                                { number: '10,000+', label: 'Cây xanh được trồng' },
                                { number: '100+', label: 'Chương trình từ thiện' },
                                { number: '5 tỷ VNĐ', label: 'Tổng giá trị hỗ trợ' },
                            ].map((item, index) => (
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
                            ))}
                        </Grid>
                    </Box>
                </TabPanel>
            </Container>
        </Layout>
    );
}