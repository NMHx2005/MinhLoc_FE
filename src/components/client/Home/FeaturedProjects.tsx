'use client'

import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Container,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Link from 'next/link';

const FeaturedProjects: React.FC = () => {
    const projects = [
        {
            id: 1,
            title: 'Picity Sky Park',
            description: 'Picity Sky Park Bình Đường là Dự án Căn hộ Chung cư cao tầng kết hợp TMDV văn phòng cao cấp tiếp...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/68/220628_picity-skypark_v02_bird-view-day_final-3.jpg',
            slug: 'picity-sky-park',
            featured: true, // Large card
        },
        {
            id: 2,
            title: 'Vinhomes Grand Park',
            description: 'Vinhomes Grand Park là Đại đô thị thông minh đẳng cấp quốc tế được vận hành ứng dụng theo các mô...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/67/the-beverly-27.jpg',
            slug: 'vinhomes-grand-park',
            featured: false,
        },
        {
            id: 3,
            title: 'Diamond Boulevard',
            description: 'Diamond Boulevard nâng niu đời sống tinh thần cư dân, đem đến cảm hứng sống tràn đầy qua hệ tiện ích...',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/79/1.new.-hb_new-fix.jpg',
            slug: 'diamond-boulevard',
            featured: false,
        },
    ];

    return (
        <Box sx={{ py: 8, backgroundColor: '#F5F5F5' }}>
            <Container maxWidth="lg">
                {/* Section Title */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        sx={{
                            color: '#E7C873',
                            fontWeight: 700,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                    >
                        DỰ ÁN NỔI BẬT
                    </Typography>
                </Box>

                {/* Projects Grid */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    {/* Large Featured Project */}
                    <Box data-aos="fade-right" data-aos-duration="1200">
                        <Card
                            sx={{
                                height: '100%',
                                position: 'relative',
                                borderRadius: 0,
                                overflow: 'hidden',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={projects[0].image}
                                alt={projects[0].title}
                                sx={{
                                    objectFit: 'cover',
                                    position: 'relative',
                                    transition: 'transform 0.3s ease',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            />
                            {/* Overlay */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    p: 3,
                                    // color: 'white',
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        fontSize: { xs: '1.5rem', md: '2rem' },
                                        color: '#E7C873',
                                    }}
                                >
                                    {projects[0].title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        mb: 3,
                                        fontSize: '1rem',
                                        lineHeight: 1.6,
                                        opacity: 0.9,
                                    }}
                                >
                                    {projects[0].description}
                                </Typography>
                                <Button
                                    component={Link}
                                    href={`/projects/${projects[0].slug}`}
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        backgroundColor: 'transparent',
                                        boxShadow: 'none',
                                        hover: {
                                            backgroundColor: 'transparent',
                                            boxShadow: 'none',
                                        },
                                    }}
                                >
                                    Chi tiết
                                </Button>
                            </Box>
                        </Card>
                    </Box>

                    {/* Smaller Projects */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                        {projects.slice(1).map((project, index) => (
                            <Box
                                key={project.id}
                                data-aos="fade-left"
                                data-aos-duration="1200"
                                data-aos-delay={index * 200}
                            >
                                <Card
                                    sx={{
                                        flex: 1,
                                        borderRadius: 0,
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: '50%',
                                            objectFit: 'cover',
                                            flexShrink: 0,
                                            transition: 'transform 0.3s ease',
                                            overflow: 'hidden',
                                            color: '#E7C873',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            },
                                        }}
                                        image={project.image}
                                        alt={project.title}
                                    />
                                    <CardContent sx={{
                                        p: 3,
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Box>
                                            <Typography
                                                variant="h5"
                                                component="h3"
                                                sx={{
                                                    fontWeight: 700,
                                                    mb: 2,
                                                    fontSize: '1.25rem',
                                                    color: '#E7C873',
                                                }}
                                            >
                                                {project.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mb: 3,
                                                    color: '#666',
                                                    lineHeight: 1.6,
                                                    fontSize: '0.95rem',
                                                }}
                                            >
                                                {project.description}
                                            </Typography>
                                        </Box>
                                        <Button
                                            component={Link}
                                            href={`/projects/${project.slug}`}
                                            endIcon={<ArrowForward />}
                                            sx={{
                                                color: '#E7C873',
                                                textTransform: 'none',
                                                fontSize: '0.95rem',
                                                fontWeight: 500,
                                                p: 0,
                                                alignSelf: 'flex-start',
                                                backgroundColor: 'transparent',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                },
                                            }}
                                        >
                                            Chi tiết
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default FeaturedProjects;
