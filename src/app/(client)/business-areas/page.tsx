"use client";

import React from 'react';
import Layout from '@/components/client/shared/Layout';
import { Container, Box, Typography, Card, CardContent, CardMedia, Button, Chip, Divider, Avatar, Paper, List, ListItem, ListItemIcon, ListItemText, Tabs, Tab } from '@mui/material';
import { Business, Construction, Gavel, LocalFlorist, Timeline, EmojiEvents, VerifiedUser, Group, TrendingUp, Star, CheckCircle } from '@mui/icons-material';

// CSS animations
const fadeUpAnimation = {
    '@keyframes fadeUp': {
        from: {
            opacity: 0,
            transform: 'translateY(30px)',
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },
    animation: 'fadeUp 0.8s ease-out forwards',
    opacity: 0,
};

const BUSINESS_AREAS = [
    {
        key: 'real-estate',
        title: 'Bất động sản cao cấp',
        shortDesc: 'Mua bán, môi giới, tư vấn đầu tư dự án bất động sản.',
        fullDesc: 'Chuyên nghiệp trong việc phân phối các dự án bất động sản cao cấp, từ căn hộ chung cư, biệt thự, đất nền đến các dự án thương mại. Đội ngũ môi giới giàu kinh nghiệm, am hiểu thị trường, luôn đồng hành cùng khách hàng trong mọi giao dịch.',
        image: '/modern-house.png',
        icon: <Business />,
        services: ['Môi giới mua bán', 'Tư vấn đầu tư', 'Định giá bất động sản', 'Quản lý tài sản', 'Pháp lý giao dịch'],
        achievements: ['500+ giao dịch thành công', '95% khách hàng hài lòng', '50+ dự án phân phối'],
    },
    {
        key: 'ginseng',
        title: 'Kinh doanh sâm Ngọc Linh',
        shortDesc: 'Phân phối sâm Ngọc Linh, sâm Hàn Quốc chính hãng cao cấp.',
        fullDesc: 'Chuyên cung cấp các sản phẩm sâm Ngọc Linh nguyên chất từ vùng núi Kon Tum, cùng với sâm Hàn Quốc nhập khẩu chính hãng. Cam kết chất lượng, nguồn gốc rõ ràng, mang lại giá trị sức khỏe tối ưu cho người tiêu dùng.',
        image: '/discover-bg.png',
        icon: <LocalFlorist />,
        services: ['Sâm tươi Ngọc Linh', 'Sâm khô Ngọc Linh', 'Sâm Hàn Quốc nhập khẩu', 'Các sản phẩm từ sâm', 'Tư vấn sử dụng'],
        achievements: ['100% sản phẩm có nguồn gốc', '1000+ khách hàng tin dùng', 'Đối tác chính thức tại Hàn Quốc'],
    },
    {
        key: 'legal',
        title: 'Pháp lý & Tư vấn',
        shortDesc: 'Dịch vụ pháp lý chuyên nghiệp, hợp đồng, thủ tục dự án.',
        fullDesc: 'Đội ngũ luật sư và chuyên gia pháp lý giàu kinh nghiệm, cung cấp dịch vụ tư vấn pháp lý toàn diện cho cá nhân và doanh nghiệp. Từ soạn thảo hợp đồng, xử lý tranh chấp đến tư vấn thủ tục đầu tư.',
        image: '/article-3.png',
        icon: <Gavel />,
        services: ['Tư vấn pháp lý BĐS', 'Soạn thảo hợp đồng', 'Xử lý tranh chấp', 'Thủ tục đầu tư', 'Pháp lý doanh nghiệp'],
        achievements: ['200+ vụ việc thành công', '15+ năm kinh nghiệm', '98% thành công trong tranh chấp'],
    },
    {
        key: 'construction',
        title: 'Xây dựng & Hoàn thiện',
        shortDesc: 'Thi công xây dựng, hoàn thiện nội thất công trình chuyên nghiệp.',
        fullDesc: 'Dịch vụ xây dựng và hoàn thiện nội thất từ A-Z, từ thiết kế, thi công đến bàn giao. Đội ngũ kỹ sư, kiến trúc sư và thợ lành nghề, cam kết chất lượng và tiến độ theo đúng hợp đồng.',
        image: '/article-4.png',
        icon: <Construction />,
        services: ['Thiết kế kiến trúc', 'Thi công xây dựng', 'Hoàn thiện nội thất', 'Cải tạo sửa chữa', 'Giám sát công trình'],
        achievements: ['100+ công trình hoàn thành', '100% bàn giao đúng hạn', '5 sao về chất lượng thi công'],
    },
];

const COMPANY_STATS = [
    { number: '6+', label: 'Năm kinh nghiệm', icon: <Timeline /> },
    { number: '2000+', label: 'Khách hàng tin tưởng', icon: <Group /> },
    { number: '50+', label: 'Dự án thành công', icon: <EmojiEvents /> },
    { number: '95%', label: 'Tỷ lệ hài lòng', icon: <Star /> },
];

const CORE_VALUES = [
    { title: 'Chuyên nghiệp', desc: 'Đội ngũ có trình độ cao, quy trình chuẩn mực', icon: <VerifiedUser /> },
    { title: 'Uy tín', desc: 'Cam kết thực hiện đúng những gì đã hứa', icon: <CheckCircle /> },
    { title: 'Chất lượng', desc: 'Sản phẩm và dịch vụ luôn đạt tiêu chuẩn cao nhất', icon: <Star /> },
    { title: 'Đổi mới', desc: 'Không ngừng cải tiến và ứng dụng công nghệ mới', icon: <TrendingUp /> },
];

const TIMELINE_DATA = [
    { year: '2019', title: 'Thành lập công ty', desc: 'MinhLoc Group chính thức ra đời với định hướng phát triển bền vững' },
    { year: '2020', title: 'Mở rộng lĩnh vực BĐS', desc: 'Trở thành đại lý phân phối cho nhiều dự án lớn tại TP.HCM và Hà Nội' },
    { year: '2021', title: 'Kinh doanh sâm Ngọc Linh', desc: 'Bắt đầu nhập khẩu và phân phối sâm Ngọc Linh, sâm Hàn Quốc chính hãng' },
    { year: '2022', title: 'Dịch vụ pháp lý', desc: 'Thành lập bộ phận tư vấn pháp lý chuyên nghiệp' },
    { year: '2023', title: 'Xây dựng & hoàn thiện', desc: 'Mở rộng sang lĩnh vực thi công xây dựng và hoàn thiện nội thất' },
    { year: '2024', title: 'Chuyển đổi số', desc: 'Ứng dụng công nghệ số trong quản lý và chăm sóc khách hàng' },
    { year: '2025', title: 'Mở rộng toàn quốc', desc: 'Kế hoạch mở rộng mạng lưới ra các tỉnh thành lớn' },
];

export default function BusinessAreasPage() {
    const [activeTabIndex, setActiveTabIndex] = React.useState(0);

    const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTabIndex(newValue);
    };

    const activeArea = BUSINESS_AREAS[activeTabIndex];

    return (
        <Layout>
            {/* Hero Section */}
            <Box
                sx={{
                    // background: 'linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(231,200,115,0.2) 100%)',
                    py: { xs: 8, md: 12 },
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(/discover-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        // opacity: 0.1,
                        zIndex: -1,
                    },
                }}
            >
                <Container maxWidth="lg">
                    <Box textAlign="center" sx={{ ...fadeUpAnimation, animationDelay: '0.1s' }}>
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                fontWeight: 800,
                                color: '#fff',
                                mb: 3,
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            Lĩnh vực hoạt động
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                                color: '#fff',
                                mb: 4,
                                maxWidth: '800px',
                                mx: 'auto',
                                lineHeight: 1.6,
                            }}
                        >
                            Hệ sinh thái dịch vụ đa dạng và chuyên nghiệp, đáp ứng mọi nhu cầu của khách hàng từ bất động sản cao cấp đến sản phẩm chăm sóc sức khỏe
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    backgroundColor: '#E7C873',
                                    color: '#fff',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 25px rgba(231,200,115,0.3)',
                                    '&:hover': {
                                        backgroundColor: '#d4b85a',
                                        boxShadow: '0 12px 35px rgba(231,200,115,0.4)',
                                    },
                                }}
                            >
                                Khám phá dịch vụ
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    borderColor: '#E7C873',
                                    color: '#fff',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: '12px',
                                    '&:hover': {
                                        borderColor: '#d4b85a',
                                        color: '#d4b85a',
                                        backgroundColor: 'rgba(231,200,115,0.05)',
                                    },
                                }}
                            >
                                Liên hệ tư vấn
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                {/* Company Stats */}
                <Box sx={{ mb: 10, ...fadeUpAnimation, animationDelay: '0.2s' }}>
                    <Typography
                        variant="h3"
                        textAlign="center"
                        sx={{ mb: 6, fontWeight: 700, color: '#1a1a1a' }}
                    >
                        Con số ấn tượng
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 4,
                            justifyContent: 'center',
                        }}
                    >
                        {COMPANY_STATS.map((stat, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flex: { xs: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 16px)' },
                                    maxWidth: { xs: 'calc(50% - 16px)', md: 'calc(25% - 16px)' },
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        textAlign: 'center',
                                        borderRadius: 3,
                                        background: 'linear-gradient(135deg, rgba(231,200,115,0.1) 0%, rgba(255,255,255,0.8) 100%)',
                                        border: '1px solid rgba(231,200,115,0.2)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                            background: 'linear-gradient(135deg, rgba(231,200,115,0.15) 0%, rgba(255,255,255,0.9) 100%)',
                                        },
                                    }}
                                >
                                    <Box sx={{ color: '#E7C873', mb: 2, fontSize: '2.5rem' }}>
                                        {stat.icon}
                                    </Box>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 800,
                                            color: '#1a1a1a',
                                            mb: 1,
                                            fontSize: { xs: '2rem', md: '2.5rem' },
                                        }}
                                    >
                                        {stat.number}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: '#666', fontWeight: 500 }}>
                                        {stat.label}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Main Business Areas */}
                <Box sx={{ mb: 10, ...fadeUpAnimation, animationDelay: '0.3s' }}>
                    <Typography
                        variant="h3"
                        textAlign="center"
                        sx={{ mb: 2, fontWeight: 700, color: '#1a1a1a' }}
                    >
                        Lĩnh vực hoạt động chính
                    </Typography>
                    <Box
                        sx={{
                            width: '80px',
                            height: '4px',
                            backgroundColor: '#E7C873',
                            mx: 'auto',
                            borderRadius: 2,
                            mb: 4,
                        }}
                    />

                    {/* Tabs header */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                        <Tabs
                            value={activeTabIndex}
                            onChange={handleChangeTab}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            sx={{
                                '.MuiTab-root': { textTransform: 'none', fontWeight: 600 },
                                '.MuiTabs-indicator': { backgroundColor: '#E7C873' },
                            }}
                        >
                            {BUSINESS_AREAS.map((area, index) => (
                                <Tab
                                    key={area.key}
                                    label={area.title}
                                    id={`business-area-tab-${index}`}
                                    aria-controls={`business-area-tabpanel-${index}`}
                                    sx={{
                                        color: activeTabIndex === index ? '#1a1a1a' : '#666',
                                        '&.Mui-selected': { color: '#1a1a1a' },
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Box>

                    {/* Active tab content only */}
                    {activeArea && (
                        <Box id={`business-area-tabpanel-${activeTabIndex}`} role="tabpanel">
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box sx={{ maxWidth: { xs: '100%', md: '900px' }, width: '100%' }}>
                                    <Card
                                        sx={{
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="260"
                                            image={activeArea.image}
                                            alt={activeArea.title}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <CardContent sx={{ p: 4 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                                                <Avatar sx={{ bgcolor: '#E7C873', color: '#1a1a1a' }}>
                                                    {activeArea.icon}
                                                </Avatar>
                                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                                                    {activeArea.title}
                                                </Typography>
                                            </Box>

                                            <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
                                                {activeArea.shortDesc}
                                            </Typography>

                                            <Typography variant="body2" sx={{ color: '#444', mb: 2, lineHeight: 1.6 }}>
                                                {activeArea.fullDesc}
                                            </Typography>

                                            <Divider sx={{ my: 2 }} />

                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1 }}>
                                                Dịch vụ:
                                            </Typography>
                                            <List dense>
                                                {activeArea.services.map((service: string, idx: number) => (
                                                    <ListItem key={idx} sx={{ py: 0.5 }}>
                                                        <ListItemIcon>
                                                            <CheckCircle sx={{ fontSize: 20, color: '#E7C873' }} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={service} />
                                                    </ListItem>
                                                ))}
                                            </List>

                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1a1a1a', mt: 2, mb: 1 }}>
                                                Thành tựu:
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {activeArea.achievements.map((achieve: string, idx: number) => (
                                                    <Chip
                                                        key={idx}
                                                        label={achieve}
                                                        color="default"
                                                        variant="outlined"
                                                        sx={{
                                                            borderColor: '#E7C873',
                                                            color: '#1a1a1a',
                                                            fontWeight: 500,
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* Core Values */}
                <Box sx={{ mb: 10, ...fadeUpAnimation, animationDelay: '0.4s' }}>
                    <Typography
                        variant="h3"
                        textAlign="center"
                        sx={{ mb: 2, fontWeight: 700, color: '#1a1a1a' }}
                    >
                        Giá trị cốt lõi
                    </Typography>
                    <Box sx={{ width: '80px', height: '4px', backgroundColor: '#E7C873', mx: 'auto', borderRadius: 2, mb: 6 }} />

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 3,
                            justifyContent: 'center',
                        }}
                    >
                        {CORE_VALUES.map((value, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' },
                                    maxWidth: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 12px)' },
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        textAlign: 'center',
                                        height: '100%',
                                        borderRadius: 3,
                                        border: '2px solid rgba(231,200,115,0.2)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#E7C873',
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            backgroundColor: '#E7C873',
                                            color: '#1a1a1a',
                                            width: 60,
                                            height: 60,
                                            mx: 'auto',
                                            mb: 2,
                                        }}
                                    >
                                        {value.icon}
                                    </Avatar>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#1a1a1a' }}>
                                        {value.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                                        {value.desc}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Timeline */}
                <Box sx={{ mb: 10, ...fadeUpAnimation, animationDelay: '0.5s' }}>
                    <Typography
                        variant="h3"
                        textAlign="center"
                        sx={{ mb: 2, fontWeight: 700, color: '#1a1a1a' }}
                    >
                        Hành trình phát triển
                    </Typography>
                    <Box sx={{ width: '80px', height: '4px', backgroundColor: '#E7C873', mx: 'auto', borderRadius: 2, mb: 6 }} />

                    <Box sx={{ position: 'relative', maxWidth: '800px', mx: 'auto' }}>
                        {/* Timeline line */}
                        <Box
                            sx={{
                                position: 'absolute',
                                left: '50%',
                                top: 0,
                                bottom: 0,
                                width: '3px',
                                backgroundColor: '#E7C873',
                                transform: 'translateX(-50%)',
                                display: { xs: 'none', md: 'block' },
                            }}
                        />

                        {TIMELINE_DATA.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    position: 'relative',
                                    mb: 4,
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                                    alignItems: 'center',
                                    gap: 3,
                                }}
                            >
                                {/* Timeline dot */}
                                <Box
                                    sx={{
                                        position: { xs: 'relative', md: 'absolute' },
                                        left: { md: '50%' },
                                        transform: { md: 'translateX(-50%)' },
                                        width: 20,
                                        height: 20,
                                        backgroundColor: '#E7C873',
                                        borderRadius: '50%',
                                        border: '4px solid white',
                                        boxShadow: '0 0 0 3px #E7C873',
                                        zIndex: 1,
                                        flexShrink: 0,
                                    }}
                                />

                                {/* Content */}
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        maxWidth: { md: '350px' },
                                        width: '100%',
                                        border: '1px solid rgba(231,200,115,0.2)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: '#E7C873',
                                            fontWeight: 800,
                                            mb: 1,
                                        }}
                                    >
                                        {item.year}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            mb: 1,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                                        {item.desc}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* CTA Section */}
                <Box
                    sx={{
                        ...fadeUpAnimation,
                        animationDelay: '0.6s',
                        textAlign: 'center',
                        py: 8,
                        px: 4,
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, rgba(231,200,115,0.1) 0%, rgba(255,255,255,0.8) 100%)',
                        border: '1px solid rgba(231,200,115,0.2)',
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{ mb: 3, fontWeight: 700, color: '#1a1a1a' }}
                    >
                        Sẵn sàng hợp tác cùng chúng tôi?
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
                    >
                        Hãy để MinhLoc Group đồng hành cùng bạn trong hành trình phát triển. Chúng tôi cam kết mang lại giá trị tốt nhất cho mọi dự án và nhu cầu của bạn.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: '#E7C873',
                                color: '#1a1a1a',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: '50px',
                                boxShadow: '0 8px 25px rgba(231,200,115,0.3)',
                                '&:hover': {
                                    backgroundColor: '#d4b85a',
                                    boxShadow: '0 12px 35px rgba(231,200,115,0.4)',
                                },
                            }}
                        >
                            Liên hệ ngay
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                borderColor: '#E7C873',
                                color: '#E7C873',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: '50px',
                                '&:hover': {
                                    borderColor: '#d4b85a',
                                    color: '#d4b85a',
                                    backgroundColor: 'rgba(231,200,115,0.05)',
                                },
                            }}
                        >
                            Tìm hiểu thêm
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
}

