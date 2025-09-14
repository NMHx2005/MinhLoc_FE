'use client';

import React from 'react';
import { Box, Typography, Container, Card, CardContent, Avatar, Rating } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';

const testimonials = [
    {
        id: 1,
        name: 'Nguyễn Văn Minh',
        role: 'Nhà Đầu Tư Bất Động Sản',
        avatar: '/avatar.jpg',
        rating: 5,
        comment: 'MinhLoc Group đã giúp tôi tìm được dự án đầu tư tuyệt vời với lợi nhuận cao. Dịch vụ tư vấn chuyên nghiệp và hỗ trợ tận tình từ A-Z.',
        location: 'TP. Hồ Chí Minh'
    },
    {
        id: 2,
        name: 'Trần Thị Lan',
        role: 'Khách Hàng Mua Nhà',
        avatar: '/avatar.jpg',
        rating: 5,
        comment: 'Cảm ơn MinhLoc đã giúp gia đình tôi tìm được ngôi nhà mơ ước. Quy trình mua bán minh bạch, giá cả hợp lý và dịch vụ hậu mãi tốt.',
        location: 'Hà Nội'
    },
    {
        id: 3,
        name: 'Lê Văn Hùng',
        role: 'Nhà Đầu Tư',
        avatar: '/avatar.jpg',
        rating: 5,
        comment: 'Với hơn 5 năm kinh nghiệm đầu tư bất động sản, tôi tin tưởng MinhLoc Group là đối tác đáng tin cậy nhất. Chất lượng dự án luôn đảm bảo.',
        location: 'Đà Nẵng'
    },
    {
        id: 4,
        name: 'Phạm Thị Mai',
        role: 'Khách Hàng Cho Thuê',
        avatar: '/avatar.jpg',
        rating: 5,
        comment: 'Dịch vụ cho thuê bất động sản của MinhLoc rất chuyên nghiệp. Tôi đã cho thuê được căn hộ với giá tốt và khách thuê ổn định.',
        location: 'Nha Trang'
    },
    {
        id: 5,
        name: 'Hoàng Văn Đức',
        role: 'Nhà Đầu Tư',
        avatar: '/avatar.jpg',
        rating: 5,
        comment: 'MinhLoc Group có đội ngũ tư vấn giàu kinh nghiệm và am hiểu thị trường. Tôi đã đầu tư thành công nhiều dự án nhờ sự hỗ trợ của họ.',
        location: 'Phú Quốc'
    }
];

const TestimonialsSection: React.FC = () => {
    return (
        <Box
            component="section"
            sx={{
                py: { xs: 6, md: 8, lg: 10 },
                mb: { xs: 4, md: 6, lg: 8 },
                // backgroundColor: '#f8f9fa',
                position: 'relative',
            }}
        >
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 2,
                            lineHeight: 1.2,
                        }}
                    >
                        Khách Hàng Nói Gì Về Chúng Tôi?
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            color: '#666',
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Hơn 10,000 khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng tôi
                    </Typography>
                </Box>

                {/* Stats */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                        gap: { xs: 3, sm: 4 },
                        mb: { xs: 4, md: 6 },
                        textAlign: 'center',
                    }}
                >
                    <Box>
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                fontWeight: 700,
                                color: '#E6C873',
                                mb: 1,
                            }}
                        >
                            10,000+
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                color: '#1a1a1a',
                                fontWeight: 500,
                            }}
                        >
                            Khách Hàng Hài Lòng
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                fontWeight: 700,
                                color: '#E6C873',
                                mb: 1,
                            }}
                        >
                            4.9/5
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 1 }}>
                            {[...Array(5)].map((_, index) => (
                                <StarIcon
                                    key={index}
                                    sx={{
                                        fontSize: { xs: '1.2rem', sm: '1.4rem' },
                                        color: '#E6C873',
                                    }}
                                />
                            ))}
                        </Box>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                color: '#1a1a1a',
                                fontWeight: 500,
                            }}
                        >
                            Đánh Giá Trung Bình
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                fontWeight: 700,
                                color: '#E6C873',
                                mb: 1,
                            }}
                        >
                            15+
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                color: '#1a1a1a',
                                fontWeight: 500,
                            }}
                        >
                            Năm Kinh Nghiệm
                        </Typography>
                    </Box>
                </Box>

                {/* Testimonials Slider */}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.testimonial-next',
                            prevEl: '.testimonial-prev',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.testimonial-pagination',
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
                        }}
                        style={{
                            width: '100%',
                            height: 'auto',
                            paddingBottom: '60px',
                        }}
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        borderRadius: '16px',
                                        border: '1px solid #e0e0e0',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <CardContent sx={{ p: { xs: 3, sm: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        {/* Rating */}
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                            <Rating
                                                value={testimonial.rating}
                                                readOnly
                                                size="small"
                                                sx={{
                                                    '& .MuiRating-iconFilled': {
                                                        color: '#E6C873',
                                                    },
                                                }}
                                            />
                                        </Box>

                                        {/* Quote Icon */}
                                        {/* <Box
                                            sx={{
                                                textAlign: 'center',
                                                mb: 3,
                                                '&::before': {
                                                    content: '""',
                                                    fontSize: '3rem',
                                                    color: '#E6C873',
                                                    opacity: 0.3,
                                                },
                                            }}
                                        /> */}

                                        {/* Testimonial Text */}
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#1a1a1a',
                                                lineHeight: 1.7,
                                                fontStyle: 'italic',
                                                mb: 4,
                                                flexGrow: 1,
                                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                                textAlign: 'center',
                                            }}
                                        >
                                            "{testimonial.comment}"
                                        </Typography>

                                        {/* User Info */}
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Avatar
                                                src={testimonial.avatar || '/default-avatar.jpg'}
                                                alt={testimonial.name}
                                                sx={{
                                                    width: { xs: 60, sm: 70 },
                                                    height: { xs: 60, sm: 70 },
                                                    mx: 'auto',
                                                    mb: 2,
                                                    border: '3px solid #E6C873',
                                                }}
                                            />
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '1.1rem' },
                                                    color: '#1a1a1a',
                                                    fontWeight: 600,
                                                    mb: 0.5,
                                                }}
                                            >
                                                {testimonial.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                                    color: '#666',
                                                    mb: 0.5,
                                                }}
                                            >
                                                {testimonial.role}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                                    color: '#E6C873',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {testimonial.location}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                textAlign: 'center',
                                                mb: 8,
                                                '&::before': {
                                                    content: '""',
                                                    fontSize: '3rem',
                                                    color: '#E6C873',
                                                    opacity: 0.3,
                                                },
                                            }}
                                        />
                                    </CardContent>
                                </Card>
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
                            className="testimonial-prev"
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                border: '2px solid #E6C873',
                                backgroundColor: '#ffffff',
                                color: '#E6C873',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#E6C873',
                                    color: '#ffffff',
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <ArrowBackIosIcon sx={{ fontSize: '1rem' }} />
                        </Box>
                        <Box
                            className="testimonial-next"
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                border: '2px solid #E6C873',
                                backgroundColor: '#ffffff',
                                color: '#E6C873',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#E6C873',
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
                        className="testimonial-pagination"
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
                                backgroundColor: '#E6C873',
                                transform: 'scale(1.2)',
                            },
                        }}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default TestimonialsSection;
