"use client";

import React, { useState, useEffect, use } from 'react';
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
    Avatar,
} from '@mui/material';
import {
    Home,
    Article,
    CalendarToday,
    Person,
    AccessTime,
    Share as ShareIcon,
    Facebook,
    Twitter,
    LinkedIn,
    BookmarkBorder,
    Bookmark,
    ArrowBack,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';

interface NewsDetail {
    id: number;
    title: string;
    content: string;
    image: string;
    category: 'company' | 'market' | 'culture';
    author: string;
    authorAvatar: string;
    publishDate: string;
    readTime: string;
    featured: boolean;
    slug: string;
    tags: string[];
    relatedNews: {
        id: number;
        title: string;
        image: string;
        publishDate: string;
        slug: string;
    }[];
}

const NewsDetailPage: React.FC<{ params: Promise<{ slug: string }> }> = ({ params }) => {
    const [news, setNews] = useState<NewsDetail | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showShare, setShowShare] = useState(false);

    const resolvedParams = use(params);

    useEffect(() => {
        // Mock data - trong thực tế sẽ fetch từ API dựa trên slug
        const mockNews: NewsDetail = {
            id: 1,
            title: 'LỄ KICK-OFF FRESIA RIVERSIDE: ĐẤT XANH MIỀN NAM TIẾP TỤC KHẲNG ĐỊNH VỊ THẾ DẪN ĐẦU THỊ TRƯỜNG BẤT ĐỘNG SẢN KHU ĐÔNG',
            content: `
                <p>Chiều ngày 03.04.2025, Đất Xanh Miền Nam tiếp tục ghi dấu ấn khi tham dự Lễ ra quân dự án Fresia Riverside - bước đi tiếp nối chuỗi thành công khi triển khai các dự án đa phân khúc.</p>
                
                <p>Sự kiện này đánh dấu một cột mốc quan trọng trong chiến lược phát triển của công ty tại khu vực phía Đông TP.HCM. Với vị trí đắc địa và tiềm năng phát triển mạnh mẽ, Fresia Riverside hứa hẹn sẽ trở thành điểm nhấn mới trong bức tranh bất động sản khu vực.</p>

                <h3>Dự án Fresia Riverside - Tầm nhìn chiến lược</h3>
                
                <p>Fresia Riverside được thiết kế với tầm nhìn trở thành khu đô thị hiện đại, đáp ứng đầy đủ nhu cầu sống của cư dân. Dự án sở hữu những ưu thế vượt trội:</p>
                
                <ul>
                    <li><strong>Vị trí đắc địa:</strong> Nằm tại khu vực phía Đông TP.HCM, gần các trục giao thông chính</li>
                    <li><strong>Tiện ích đa dạng:</strong> Hệ thống tiện ích hiện đại, đầy đủ từ giáo dục đến y tế</li>
                    <li><strong>Thiết kế thông minh:</strong> Áp dụng công nghệ xanh và tiết kiệm năng lượng</li>
                    <li><strong>Pháp lý minh bạch:</strong> Sổ hồng lâu dài, đảm bảo quyền lợi tối đa cho khách hàng</li>
                </ul>

                <h3>Cam kết chất lượng từ Minh Lộc Group</h3>
                
                <p>Với hơn 15 năm kinh nghiệm trong lĩnh vực bất động sản, Minh Lộc Group cam kết mang đến cho khách hàng những sản phẩm chất lượng cao nhất. Dự án Fresia Riverside được đầu tư kỹ lưỡng từ khâu thiết kế đến thi công, đảm bảo từng chi tiết đều được chăm chút tỉ mỉ.</p>

                <p>Ông Nguyễn Văn A, Tổng Giám đốc Minh Lộc Group chia sẻ: "Fresia Riverside không chỉ là một dự án bất động sản thông thường, mà còn là tâm huyết của chúng tôi trong việc tạo ra những không gian sống lý tưởng cho cộng đồng. Chúng tôi tin tưởng rằng dự án này sẽ góp phần nâng cao chất lượng cuộc sống của người dân khu vực."</p>

                <h3>Triển vọng thị trường</h3>
                
                <p>Khu vực phía Đông TP.HCM đang có sự phát triển mạnh mẽ với nhiều dự án hạ tầng lớn được triển khai. Điều này tạo ra cơ hội đầu tư hấp dẫn cho các nhà đầu tư và nhu cầu ở thực cao từ người dân.</p>

                <p>Dự kiến, dự án Fresia Riverside sẽ chính thức mở bán trong quý 2/2025 với nhiều chính sách ưu đãi hấp dẫn dành cho khách hàng đăng ký sớm.</p>
            `,
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/87/phoi-canh-tu-can-ho-the-prive-quan-2-anh-theprive-net-vn.jpg',
            category: 'company',
            author: 'Minh Lộc Group',
            authorAvatar: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/canho.png',
            publishDate: '2025-04-03',
            readTime: '5 phút',
            featured: true,
            slug: 'le-kick-off-fresia-riverside',
            tags: ['Fresia Riverside', 'Bất động sản', 'Khu Đông', 'Minh Lộc Group'],
            relatedNews: [
                {
                    id: 2,
                    title: 'ĐẤT XANH MIỀN NAM BÙNG CHÁY NHIỆT HUYẾT TẠI LỄ RA QUÂN "THE INFINITY DĨ AN"',
                    image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/86/th%C3%B4ng-tin-d%E1%BB%B1-%C3%A1n-stown-gateway-h%C3%ACnh-%E1%BA%A3nh-5_6.jpg',
                    publishDate: '2025-02-28',
                    slug: 'the-infinity-di-an-kick-off'
                },
                {
                    id: 3,
                    title: 'ĐẤT XANH MIỀN NAM CHÀO ĐÓN CÔNG TY THÀNH VIÊN CENTRAL REAL',
                    image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/85/phoi-canh-the-gio-riverside.jpg',
                    publishDate: '2025-02-27',
                    slug: 'central-real-visit'
                },
                {
                    id: 4,
                    title: 'KHOẢNH KHẮC ĐÁNG NHỚ TẠI LỄ KHAI TRƯƠNG TÒA NHÀ TRỤ SỞ MỚI',
                    image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/83/photo-3-1728871003192740345375-1728874764904-17288747649761796268016.png',
                    publishDate: '2025-01-10',
                    slug: 'headquarters-grand-opening'
                }
            ]
        };
        setNews(mockNews);
    }, [resolvedParams.slug]);

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

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = () => {
        setShowShare(!showShare);
    };

    if (!news) {
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
                    height: { xs: '50vh', md: '60vh' },
                    overflow: 'hidden',
                }}
            >
                <CardMedia
                    component="img"
                    image={news.image}
                    alt={news.title}
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
                            <MuiLink component={Link} href="/news" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Article sx={{ mr: 0.5 }} fontSize="inherit" />
                                Tin tức
                            </MuiLink>
                            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#E7C873' }}>
                                {news.title}
                            </Typography>
                        </Breadcrumbs>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip
                                label={getCategoryLabel(news.category)}
                                sx={{
                                    backgroundColor: getCategoryColor(news.category),
                                    color: 'white',
                                    fontWeight: 600,
                                }}
                            />
                            {news.featured && (
                                <Chip
                                    label="Nổi bật"
                                    sx={{
                                        backgroundColor: '#FF5722',
                                        color: 'white',
                                        fontWeight: 600,
                                    }}
                                />
                            )}
                        </Box>

                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '1.8rem', md: '2.5rem' },
                                lineHeight: 1.2,
                            }}
                        >
                            {news.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, color: 'white' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CalendarToday sx={{ fontSize: 20 }} />
                                <Typography variant="body1">
                                    {new Date(news.publishDate).toLocaleDateString('vi-VN')}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTime sx={{ fontSize: 20 }} />
                                <Typography variant="body1">{news.readTime}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Person sx={{ fontSize: 20 }} />
                                <Typography variant="body1">{news.author}</Typography>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={4}>
                    {/* Main Content */}
                    <Grid item xs={12} md={8}>
                        {/* Article Content */}
                        <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box
                                    sx={{
                                        '& h3': {
                                            fontSize: '1.5rem',
                                            fontWeight: 600,
                                            color: '#E7C873',
                                            mb: 2,
                                            mt: 3,
                                        },
                                        '& p': {
                                            fontSize: '1.1rem',
                                            lineHeight: 1.8,
                                            mb: 2,
                                            color: '#333',
                                        },
                                        '& ul': {
                                            pl: 3,
                                            mb: 2,
                                        },
                                        '& li': {
                                            fontSize: '1.1rem',
                                            lineHeight: 1.8,
                                            mb: 1,
                                        },
                                        '& strong': {
                                            fontWeight: 600,
                                            color: '#E7C873',
                                        },
                                    }}
                                    dangerouslySetInnerHTML={{ __html: news.content }}
                                />
                            </CardContent>
                        </Card>

                        {/* Tags */}
                        <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#E7C873' }}>
                                    Tags
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                    {news.tags.map((tag, index) => (
                                        <Chip
                                            key={index}
                                            label={tag}
                                            variant="outlined"
                                            sx={{
                                                borderColor: '#E7C873',
                                                color: '#E7C873',
                                                '&:hover': {
                                                    backgroundColor: '#E7C873',
                                                    color: 'white',
                                                },
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Related News */}
                        <Card sx={{ borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                    Tin Liên Quan
                                </Typography>
                                <Grid container spacing={2}>
                                    {news.relatedNews.map((relatedNews) => (
                                        <Grid item xs={12} sm={6} key={relatedNews.id}>
                                            <Card
                                                component={Link}
                                                href={`/news/${relatedNews.slug}`}
                                                sx={{
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                    transition: 'all 0.3s ease',
                                                    borderRadius: 1,
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                                    },
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    height="150"
                                                    image={relatedNews.image}
                                                    alt={relatedNews.title}
                                                    sx={{ objectFit: 'cover' }}
                                                />
                                                <CardContent sx={{ p: 2 }}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            fontWeight: 600,
                                                            mb: 1,
                                                            fontSize: '0.9rem',
                                                            lineHeight: 1.4,
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        {relatedNews.title}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {new Date(relatedNews.publishDate).toLocaleDateString('vi-VN')}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        {/* Author Info */}
                        <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                    Tác giả
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                        src={news.authorAvatar}
                                        sx={{ width: 60, height: 60 }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            {news.author}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Minh Lộc Group
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                    Hành động
                                </Typography>
                                <Stack spacing={2}>
                                    <Button
                                        variant="outlined"
                                        startIcon={isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                                        onClick={handleBookmark}
                                        fullWidth
                                        sx={{
                                            borderColor: '#E7C873',
                                            color: '#E7C873',
                                            '&:hover': {
                                                backgroundColor: '#E7C873',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        {isBookmarked ? 'Đã lưu' : 'Lưu bài viết'}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ShareIcon />}
                                        onClick={handleShare}
                                        fullWidth
                                        sx={{
                                            borderColor: '#E7C873',
                                            color: '#E7C873',
                                            '&:hover': {
                                                backgroundColor: '#E7C873',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        Chia sẻ
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href="/news"
                                        startIcon={<ArrowBack />}
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#E7C873',
                                            '&:hover': {
                                                backgroundColor: '#d4b85a',
                                            },
                                        }}
                                    >
                                        Quay lại tin tức
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Share Options */}
                        {showShare && (
                            <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                        Chia sẻ
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Facebook />}
                                            fullWidth
                                            sx={{
                                                borderColor: '#1877F2',
                                                color: '#1877F2',
                                                '&:hover': {
                                                    backgroundColor: '#1877F2',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            Facebook
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Twitter />}
                                            fullWidth
                                            sx={{
                                                borderColor: '#1DA1F2',
                                                color: '#1DA1F2',
                                                '&:hover': {
                                                    backgroundColor: '#1DA1F2',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            Twitter
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<LinkedIn />}
                                            fullWidth
                                            sx={{
                                                borderColor: '#0077B5',
                                                color: '#0077B5',
                                                '&:hover': {
                                                    backgroundColor: '#0077B5',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            LinkedIn
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default NewsDetailPage;
