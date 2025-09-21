'use client'

import React from 'react';
import {
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    CardMedia,
    Button,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Link from 'next/link';

const NewsSection: React.FC = () => {
    const newsCategories = [
        {
            id: 1,
            title: 'TIN ĐẤT XANH MIỀN NAM',
            icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/tin-tuc/icon1.png',
        },
        {
            id: 2,
            title: 'TIN THỊ TRƯỜNG',
            icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/tin-tuc/icon2.png',
        },
        {
            id: 3,
            title: 'VĂN HÓA DXMN',
            icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/tin-tuc/icon3.png',
        }
    ];

    // 3 Featured News (Top)
    const featuredNews = [
        {
            id: 1,
            title: 'LỄ KICK-OFF FRESIA RIVERSIDE: ĐẤT XANH MIỀN NAM TIẾP TỤC KHẲNG ĐỊNH VỊ THẾ DẪN ĐẦU...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/893/490012997_1251907440275420_6516192511609431180_n.jpg',
            link: '/tin-tuc/le-kick-off-fresia-riverside'
        },
        {
            id: 2,
            title: 'Thách thức và cơ hội trong phân khúc nhà ở "vừa túi tiền" tại thị trường phía ...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/873/avatar1729124631996-17291246330851410978282.jpeg',
            link: '/tin-tuc/thach-thuc-co-hoi-nha-o-vua-tui-tien'
        },
        {
            id: 3,
            title: 'YÊU THƯƠNG ĐỒNG ĐẨY NHÂN NGÀY QUỐC TẾ PHỤ NỮ 8/3 TẠI ĐẤT XANH MIỀN NAM',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/889/z6386189901777_5b805107586588a29177da08ef216000.jpg',
            link: '/tin-tuc/yeu-thuong-dong-day-nhan-8-3'
        }
    ];

    // 6 Side News (Bottom)
    const sideNews = [
        {
            id: 4,
            title: 'ĐẤT XANH MIỀN NAM BÙNG CHÁY NHIỆT TÀI LỄ RA QUÂN "THE INFINITY DI AN"',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/892/z6424109608109_d3812deb0f4e3da6b1c7e0829883ed17.jpg',
            link: '/tin-tuc/dat-xanh-mien-nam-bung-chay'
        },
        {
            id: 5,
            title: 'ĐẤT XANH MIỀN NAM CHÀO ĐÓN CÔNG TY THÀNH VIÊN CENTRAL REAL ĐẾN THĂM VÀ LÀM VIỆC...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/892/z6424109608109_d3812deb0f4e3da6b1c7e0829883ed17.jpg',
            link: '/tin-tuc/dat-xanh-chao-don-central-real'
        },
        {
            id: 6,
            title: 'Tăng bán sách giở hàng đợt 1, chưa đầy 2 tháng sau, một căn "sắt vách" Tp.HCM ...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/892/z6424109608109_d3812deb0f4e3da6b1c7e0829883ed17.jpg',
            link: '/tin-tuc/tang-ban-sach-gio-hang'
        },
        {
            id: 7,
            title: 'Nguồn cung căn hộ TP HCM dự báo khan hiếm năm 2025',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/892/z6424109608109_d3812deb0f4e3da6b1c7e0829883ed17.jpg',
            link: '/tin-tuc/nguon-cung-can-ho-tp-hcm'
        },
        {
            id: 8,
            title: 'CÙNG ĐẤT XANH MIỀN NAM TRAO GÓI YÊU THƯƠNG NHÂN NGÀY 20/11',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/892/z6424109608109_d3812deb0f4e3da6b1c7e0829883ed17.jpg',
            link: '/tin-tuc/cung-dat-xanh-trao-goi-yeu-thuong'
        },
        {
            id: 9,
            title: 'VINH DANH LÃNH ĐẠO SẢN XUẤT SẮC - CHÚC MỪNG GIÁM ĐỐC SẢN 7 - PHẠM ĐỨC TRUNG',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/892/z6424109608109_d3812deb0f4e3da6b1c7e0829883ed17.jpg',
            link: '/tin-tuc/vinh-danh-lanh-dao-san-xuat-sac'
        }
    ];

    return (
        <Box
            component="section"
            className="news-section"
            sx={{
                py: 8,
                backgroundImage: 'url(https://datxanhmiennam.com.vn/Data/Sites/1/skins/default/images/homeNews_bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                minHeight: '600px',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#E7C873',
                    opacity: 0.3,
                    zIndex: 1,
                }
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                {/* Category Headers Row */}
                <Box
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: 4,
                        mb: 4,
                    }}
                >
                    {newsCategories.map((category, index) => (
                        <Box
                            key={category.id}
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay={200 + index * 150}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                color: 'white',
                            }}
                        >
                            <Box
                                component="img"
                                src={category.icon}
                                alt={category.title}
                                sx={{
                                    width: 24,
                                    height: 24,
                                    filter: 'brightness(0) invert(1)',
                                }}
                            />
                            <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    color: '#E7C873',
                                    textTransform: 'uppercase',
                                    textAlign: 'center',
                                }}
                            >
                                {category.title}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Featured News Row */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: 4,
                        mb: 6,
                    }}
                >
                    {featuredNews.map((news, index) => (
                        <Card
                            key={news.id}
                            component={Link}
                            href={news.link}
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                            data-aos-delay={600 + index * 200}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: 1,
                                overflow: 'hidden',
                                transition: 'all 0.3s ease-in-out',
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={news.image}
                                alt={news.title}
                                sx={{
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            />
                            <CardContent sx={{ p: 2 }}>
                                <Typography
                                    variant="h6"
                                    component="h4"
                                    sx={{
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        color: 'white',
                                        mb: 2,
                                        lineHeight: 1.4,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {news.title}
                                </Typography>
                                <Button
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        color: '#E7C873',
                                        textTransform: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        p: 0,
                                        minWidth: 'auto',
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    Xem thêm
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* Side News Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: 3,
                    }}
                >
                    {sideNews.map((news, index) => (
                        <Box
                            key={news.id}
                            component={Link}
                            href={news.link}
                            data-aos="fade-up"
                            data-aos-duration="600"
                            data-aos-delay={1200 + index * 100}
                            sx={{
                                display: 'flex',
                                gap: 2,
                                textDecoration: 'none',
                                color: 'white',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateX(5px)',
                                    '& img': {
                                        transform: 'scale(1.1)',
                                    },
                                    '& h5': {
                                        color: '#E7C873',
                                    },
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={news.image}
                                alt={news.title}
                                sx={{
                                    width: 80,
                                    height: 60,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                    flexShrink: 0,
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                            />
                            <Typography
                                variant="subtitle2"
                                component="h5"
                                sx={{
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    color: 'white',
                                    lineHeight: 1.4,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    transition: 'color 0.3s ease-in-out',
                                }}
                            >
                                {news.title}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default NewsSection;
