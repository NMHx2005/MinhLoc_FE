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
    Chip,
    Pagination,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Home,
    Article,
    CalendarToday,
    Person,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';

interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: 'company' | 'market' | 'culture';
    author: string;
    publishDate: string;
    readTime: string;
    featured: boolean;
    slug: string;
}

const NewsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const newsData: NewsItem[] = [
        {
            id: 1,
            title: 'LỄ KICK-OFF FRESIA RIVERSIDE: ĐẤT XANH MIỀN NAM TIẾP TỤC KHẲNG ĐỊNH VỊ THẾ DẪN ĐẦU THỊ TRƯỜNG BẤT ĐỘNG SẢN KHU ĐÔNG',
            excerpt: 'Chiều ngày 03.04.2025, Đất Xanh Miền Nam tiếp tục ghi dấu ấn khi tham dự Lễ ra quân dự án Fresia Riverside - bước đi tiếp nối chuỗi thành công khi triển khai các dự án đa phân khúc.',
            content: 'Chiều ngày 03.04.2025, Đất Xanh Miền Nam tiếp tục ghi dấu ấn khi tham dự Lễ ra quân dự án Fresia Riverside - bước đi tiếp nối chuỗi thành công khi triển khai các dự án đa phân khúc. Sự kiện này đánh dấu một cột mốc quan trọng trong chiến lược phát triển của công ty tại khu vực phía Đông TP.HCM...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/87/phoi-canh-tu-can-ho-the-prive-quan-2-anh-theprive-net-vn.jpg',
            category: 'company',
            author: 'Minh Lộc Group',
            publishDate: '2025-04-03',
            readTime: '5 phút',
            featured: true,
            slug: 'le-kick-off-fresia-riverside'
        },
        {
            id: 2,
            title: 'ĐẤT XANH MIỀN NAM BÙNG CHÁY NHIỆT HUYẾT TẠI LỄ RA QUÂN "THE INFINITY DĨ AN"',
            excerpt: 'Sáng ngày 28/02/2025, toàn thể đội ngũ Đất Xanh Miền Nam đã tham gia sự kiện ra quân dự án The Infinity Dĩ An với tinh thần quyết tâm cao độ.',
            content: 'Sáng ngày 28/02/2025, toàn thể đội ngũ Đất Xanh Miền Nam đã tham gia sự kiện ra quân dự án The Infinity Dĩ An với tinh thần quyết tâm cao độ. Sự kiện này không chỉ là một buổi lễ ra quân thông thường mà còn là cơ hội để toàn bộ team thể hiện sự đoàn kết và quyết tâm chinh phục những mục tiêu mới...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/86/th%C3%B4ng-tin-d%E1%BB%B1-%C3%A1n-stown-gateway-h%C3%ACnh-%E1%BA%A3nh-5_6.jpg',
            category: 'company',
            author: 'Minh Lộc Group',
            publishDate: '2025-02-28',
            readTime: '4 phút',
            featured: true,
            slug: 'the-infinity-di-an-kick-off'
        },
        {
            id: 3,
            title: 'ĐẤT XANH MIỀN NAM CHÀO ĐÓN CÔNG TY THÀNH VIÊN CENTRAL REAL ĐẾN THĂM VÀ LÀM VIỆC',
            excerpt: 'Ngày 27/02/2025, Đất Xanh Miền Nam vinh dự chào đón đoàn công tác từ Central Real đến thăm và làm việc tại trụ sở tổng công ty.',
            content: 'Ngày 27/02/2025, Đất Xanh Miền Nam vinh dự chào đón đoàn công tác từ Central Real đến thăm và làm việc tại trụ sở tổng công ty. Buổi làm việc diễn ra trong không khí thân thiện và chuyên nghiệp, tạo cơ hội để hai bên trao đổi kinh nghiệm và tìm kiếm cơ hội hợp tác...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/85/phoi-canh-the-gio-riverside.jpg',
            category: 'company',
            author: 'Minh Lộc Group',
            publishDate: '2025-02-27',
            readTime: '3 phút',
            featured: true,
            slug: 'central-real-visit'
        },
        {
            id: 4,
            title: 'Thách thức và cơ hội trong phân khúc nhà ở "vừa túi tiền" tại thị trường phía Nam',
            excerpt: 'Với việc phát triển nhà ở vừa túi tiền, các chủ đầu tư hiện đang hướng tới nhu cầu ở thực của người dân và xây dựng thị trường bất động sản bền vững.',
            content: 'Thị trường bất động sản phía Nam đang chứng kiến sự chuyển mình mạnh mẽ trong phân khúc nhà ở vừa túi tiền. Với việc phát triển nhà ở vừa túi tiền, các chủ đầu tư hiện đang hướng tới nhu cầu ở thực của người dân và xây dựng thị trường bất động sản bền vững...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/84/b%E1%BA%A3n-sao-c%E1%BB%A7a-db06e9991a33a36dfa22.jpg',
            category: 'market',
            author: 'Phòng Phân tích',
            publishDate: '2025-02-25',
            readTime: '6 phút',
            featured: false,
            slug: 'affordable-housing-challenges'
        },
        {
            id: 5,
            title: 'KHOẢNH KHẮC ĐÁNG NHỚ TẠI LỄ KHAI TRƯƠNG TÒA NHÀ TRỤ SỞ MỚI TỔNG CÔNG TY ĐẤT XANH MIỀN NAM',
            excerpt: 'Ngày 10/01/2025 vừa qua, DXMN đã tổ chức lễ khai trương Trụ sở mới tại vị trí đắc địa: 53-55-57 Vũ Tông Phan, Phường An Phú, Thành Phố Thủ Đức, TP.HCM.',
            content: 'Ngày 10/01/2025 vừa qua, DXMN đã tổ chức lễ khai trương Trụ sở mới tại vị trí đắc địa: 53-55-57 Vũ Tông Phan, Phường An Phú, Thành Phố Thủ Đức, TP.HCM. Cửa ngõ giao thương của toàn khu đông Sài Gòn...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/83/photo-3-1728871003192740345375-1728874764904-17288747649761796268016.png',
            category: 'company',
            author: 'Minh Lộc Group',
            publishDate: '2025-01-10',
            readTime: '4 phút',
            featured: false,
            slug: 'headquarters-grand-opening'
        },
        {
            id: 6,
            title: 'YÊU THƯƠNG ĐONG ĐẦY NHÂN NGÀY QUỐC TẾ PHỤ NỮ 8/3 TẠI ĐẤT XANH MIỀN NAM',
            excerpt: 'Ngày 8/3/2025, Đất Xanh Miền Nam đã tổ chức chương trình đặc biệt chào mừng Ngày Quốc tế Phụ nữ với nhiều hoạt động ý nghĩa.',
            content: 'Ngày 8/3/2025, Đất Xanh Miền Nam đã tổ chức chương trình đặc biệt chào mừng Ngày Quốc tế Phụ nữ với nhiều hoạt động ý nghĩa. Chương trình nhằm tôn vinh những đóng góp to lớn của các chị em phụ nữ trong công ty...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/81/hinh-anh-tt-avio-3.jpg',
            category: 'culture',
            author: 'Ban Tổ chức',
            publishDate: '2025-03-08',
            readTime: '3 phút',
            featured: false,
            slug: 'international-womens-day-2025'
        },
        {
            id: 7,
            title: 'ĐẤT XANH MIỀN NAM SẴN SÀNG CÙNG TT AVIO VIẾT TIẾP THÀNH CÔNG HUY HOÀNG',
            excerpt: 'Sáng ngày 25/02, các chiến binh kinh doanh ĐXMN đã cùng nhau tham dự sự kiện CÔNG BỐ CHÍNH SÁCH "SỐC BANH NÓC" - TT AVIO BLASTS OFF.',
            content: 'Sáng ngày 25/02, các chiến binh kinh doanh ĐXMN đã cùng nhau tham dự sự kiện CÔNG BỐ CHÍNH SÁCH "SỐC BANH NÓC" - TT AVIO BLASTS OFF được tổ chức tại Sales Gallery TT AVIO (ĐT 743C, P. Tân Đông Hiệp, TP. Dĩ An, Bình Dương)...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/80/photo-1-17237952011711905094232.jpg',
            category: 'company',
            author: 'Minh Lộc Group',
            publishDate: '2025-02-25',
            readTime: '5 phút',
            featured: false,
            slug: 'tt-avio-blasts-off'
        },
        {
            id: 8,
            title: 'Từng bán sạch giỏ hàng đợt 1, chưa đầy 2 tháng sau, một dự án "sát vách" Tp.HCM tiếp tục "cháy hàng" giai đoạn 2',
            excerpt: 'Hơn 500 khách hàng tham dự, 150 căn hộ có chủ trong vòng buổi sáng là không quá nhiều nếu so sánh với giai đoạn thị trường trước năm 2019.',
            content: 'Hơn 500 khách hàng tham dự, 150 căn hộ có chủ trong vòng buổi sáng là không quá nhiều nếu so sánh với giai đoạn thị trường trước năm 2019. Song, điều gây bất ngờ là khoảng cách giữa các đợt giới thiệu khá ngắn nhưng dự án hút được lượng người mua quan tâm đáng kể...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/870/472284737_122156053370363353_5995990933298122092_n.jpg',
            category: 'market',
            author: 'Phòng Phân tích',
            publishDate: '2025-02-20',
            readTime: '7 phút',
            featured: false,
            slug: 'project-sellout-analysis'
        }
    ];

    const categories = [
        { id: 0, label: 'Tất cả', value: 'all' },
        { id: 1, label: 'Tin MinhLoc Group', value: 'company' },
        { id: 2, label: 'Tin thị trường', value: 'market' },
        { id: 3, label: 'Văn hóa MLG', value: 'culture' },
    ];

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setCurrentPage(1);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'company': return '#E7C873';
            case 'market': return '#1976D2';
            case 'culture': return '#2E7D32';
            default: return '#666';
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'company': return 'Tin MinhLoc Group';
            case 'market': return 'Tin thị trường';
            case 'culture': return 'Văn hóa MLG';
            default: return category;
        }
    };

    const filteredNews = activeTab === 0
        ? newsData
        : newsData.filter(news => news.category === categories[activeTab].value);

    const featuredNews = filteredNews.filter(news => news.featured);
    const regularNews = filteredNews.filter(news => !news.featured);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNews = regularNews.slice(startIndex, endIndex);
    const totalPages = Math.ceil(regularNews.length / itemsPerPage);

    return (
        <Layout>
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: 'url("https://datxanhmiennam.com.vn/Data/Sites/1/Banner/bntt.jpg")',
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
                            TIN TỨC
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#E7C873',
                                mb: 3,
                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                            }}
                        >
                            Cập nhật thông tin mới nhất từ Minh Lộc Group
                        </Typography>
                        <Breadcrumbs aria-label="breadcrumb" sx={{ justifyContent: 'center', color: 'white' }}>
                            <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                                Trang chủ
                            </MuiLink>
                            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#E7C873' }}>
                                <Article sx={{ mr: 0.5 }} fontSize="inherit" />
                                Tin tức
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Category Tabs */}
                <Box sx={{ mb: 6 }} data-aos="fade-up" data-aos-delay="200">
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
                                fontSize: '1rem',
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
                        {categories.map((category) => (
                            <Tab key={category.id} label={category.label} />
                        ))}
                    </Tabs>
                </Box>

                {/* Featured News */}
                {featuredNews.length > 0 && (
                    <Box sx={{ mb: 6 }} data-aos="fade-up" data-aos-delay="400">
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                color: '#E7C873',
                                fontWeight: 600,
                                mb: 4,
                                fontSize: { xs: '1.8rem', md: '2.2rem' },
                            }}
                        >
                            Tin Nổi Bật
                        </Typography>
                        <Grid container spacing={4}>
                            {featuredNews.map((news) => (
                                <Grid item xs={12} md={6} key={news.id}>
                                    <Card
                                        component={Link}
                                        href={`/news/${news.slug}`}
                                        sx={{
                                            height: '100%',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            transition: 'all 0.3s ease',
                                            borderRadius: 1,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={news.image}
                                            alt={news.title}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ mb: 2 }}>
                                                <Chip
                                                    label={getCategoryLabel(news.category)}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: getCategoryColor(news.category),
                                                        color: 'white',
                                                        fontWeight: 500,
                                                        mb: 2,
                                                    }}
                                                />
                                            </Box>
                                            <Typography
                                                variant="h5"
                                                component="h3"
                                                sx={{
                                                    fontWeight: 700,
                                                    mb: 2,
                                                    fontSize: '1.25rem',
                                                    lineHeight: 1.3,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {news.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    mb: 2,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {news.excerpt}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <CalendarToday sx={{ fontSize: 16 }} />
                                                    <Typography variant="caption">
                                                        {new Date(news.publishDate).toLocaleDateString('vi-VN')}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <Person sx={{ fontSize: 16 }} />
                                                    <Typography variant="caption">{news.author}</Typography>
                                                </Box>
                                                <Typography variant="caption">{news.readTime}</Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Regular News */}
                <Box data-aos="fade-up" data-aos-delay="600">
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            color: '#E7C873',
                            fontWeight: 600,
                            mb: 4,
                            fontSize: { xs: '1.8rem', md: '2.2rem' },
                        }}
                    >
                        Tin Tức Mới Nhất
                    </Typography>
                    <Grid container spacing={3}>
                        {paginatedNews.map((news) => (
                            <Grid item xs={12} sm={6} md={4} key={news.id}>
                                <Card
                                    component={Link}
                                    href={`/news/${news.slug}`}
                                    sx={{
                                        height: '100%',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        transition: 'all 0.3s ease',
                                        borderRadius: 1,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={news.image}
                                        alt={news.title}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ mb: 2 }}>
                                            <Chip
                                                label={getCategoryLabel(news.category)}
                                                size="small"
                                                sx={{
                                                    backgroundColor: getCategoryColor(news.category),
                                                    color: 'white',
                                                    fontWeight: 500,
                                                    fontSize: '0.75rem',
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1.5,
                                                fontSize: '1rem',
                                                lineHeight: 1.4,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {news.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mb: 2,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {news.excerpt}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary' }}>
                                            <Typography variant="caption">
                                                {new Date(news.publishDate).toLocaleDateString('vi-VN')}
                                            </Typography>
                                            <Typography variant="caption">•</Typography>
                                            <Typography variant="caption">{news.readTime}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        borderRadius: 1,
                                    },
                                    '& .Mui-selected': {
                                        backgroundColor: '#E7C873',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#d4b85a',
                                        },
                                    },
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </Container>
        </Layout>
    );
};

export default NewsPage;
