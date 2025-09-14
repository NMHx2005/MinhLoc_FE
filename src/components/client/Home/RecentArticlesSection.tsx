'use client';

import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const StyledCard = styled(Card)(() => ({
    height: '100%',
    minHeight: '480px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    },
}));

const StyledCardMedia = styled(CardMedia)(() => ({
    height: 200,
    borderRadius: '12px 12px 0 0',
    objectFit: 'cover',
}));

const StyledChip = styled(Chip)(() => ({
    backgroundColor: '#8B4513',
    color: 'white',
    fontSize: '0.75rem',
    height: '24px',
    '& .MuiChip-label': {
        padding: '0 8px',
    },
}));

const ReadMoreButton = styled(Button)(() => ({
    color: '#8B4513',
    fontWeight: 600,
    textTransform: 'none',
    padding: '8px 16px',
    minWidth: 'auto',
    justifyContent: 'flex-start',
    borderRadius: '20px',
    border: '1px solid #8B4513',
    backgroundColor: 'transparent',
    fontSize: '0.875rem',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#8B4513',
        color: 'white',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)',
    },
}));

// Removed NavigationButton styled component

const RecentArticlesSection: React.FC = () => {
    const articles = [
        {
            id: 1,
            image: '/article-1.png',
            category: 'Căn hộ',
            date: '19 tháng 3, 2024',
            title: 'Thị trường nhà ở thay đổi nhiều nhất tuần này',
            readMore: 'Đọc thêm →',
        },
        {
            id: 2,
            image: '/article-2.png',
            category: 'Căn hộ',
            date: '19 tháng 3, 2024',
            title: 'Khám phá các thành phố Việt Nam tốt nhất cho việc đi xe đạp',
            readMore: 'Đọc thêm →',
        },
        {
            id: 3,
            image: '/article-3.png',
            category: 'Văn phòng',
            date: '19 tháng 3, 2024',
            title: '10 thành phố có thể đi bộ nơi bạn có thể sống với chi phí phải chăng',
            readMore: 'Đọc thêm →',
        },
        {
            id: 4,
            image: '/article-4.png',
            category: 'Cửa hàng',
            date: '19 tháng 3, 2024',
            title: 'Căn hộ mới đẹp ở các thành phố tốt nhất của Việt Nam',
            readMore: 'Đọc thêm →',
        },
    ];

    return (
        <Box
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 2,
                        }}
                    >
                        Bài viết & Tin tức gần đây
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            color: '#666',
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Cập nhật những thông tin mới nhất về thị trường bất động sản và các dự án nổi bật
                    </Typography>
                </Box>

                {/* Articles Slider */}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.articles-next',
                            prevEl: '.articles-prev',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.articles-pagination',
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        speed={1000}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1280: {
                                slidesPerView: 4,
                            },
                        }}
                        style={{
                            width: '100%',
                            height: 'auto',
                            paddingBottom: '60px',
                        }}
                    >
                        {articles.map((article) => (
                            <SwiperSlide key={article.id}>
                                <StyledCard>
                                    <StyledCardMedia
                                        image={article.image}
                                        title={article.title}
                                        onError={(e: React.SyntheticEvent<HTMLDivElement>) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            p: 3,
                                            height: '100%',
                                        }}
                                    >
                                        {/* Category and Date */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                mb: 2,
                                            }}
                                        >
                                            <StyledChip label={article.category} size="small" />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: '#666',
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                •
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: '#666',
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                {article.date}
                                            </Typography>
                                        </Box>

                                        {/* Title */}
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            sx={{
                                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                                fontWeight: 600,
                                                color: '#1a1a1a',
                                                mb: 2,
                                                lineHeight: 1.4,
                                                flexGrow: 1,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                minHeight: '4.2em',
                                            }}
                                        >
                                            {article.title}
                                        </Typography>

                                        {/* Read More */}
                                        <ReadMoreButton
                                            onClick={() => {
                                                // Handle read more click
                                                console.warn('Read more:', article.title);
                                            }}
                                        >
                                            {article.readMore}
                                        </ReadMoreButton>
                                    </CardContent>
                                </StyledCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2,
                            mt: 3,
                        }}
                    >
                        <Box
                            className="articles-prev"
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                border: '2px solid #8B4513',
                                backgroundColor: '#ffffff',
                                color: '#8B4513',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#8B4513',
                                    color: '#ffffff',
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <ArrowBackIosIcon sx={{ fontSize: '1rem' }} />
                        </Box>
                        <Box
                            className="articles-next"
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                border: '2px solid #8B4513',
                                backgroundColor: '#ffffff',
                                color: '#8B4513',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#8B4513',
                                    color: '#ffffff',
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <ArrowForwardIosIcon sx={{ fontSize: '1rem' }} />
                        </Box>
                    </Box>

                    {/* Custom Pagination */}
                    <Box
                        className="articles-pagination"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1,
                            mt: 2,
                            '& .swiper-pagination-bullet': {
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: '#e0e0e0',
                                opacity: 1,
                                transition: 'all 0.3s ease',
                            },
                            '& .swiper-pagination-bullet-active': {
                                backgroundColor: '#8B4513',
                                transform: 'scale(1.2)',
                            },
                        }}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default RecentArticlesSection;
