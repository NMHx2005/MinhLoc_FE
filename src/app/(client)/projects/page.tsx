"use client";

import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Button,
    Breadcrumbs,
    Link as MuiLink,
    Tabs,
    Tab,
    Pagination,
} from '@mui/material';
import {
    Home,
    Business,
    Search,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';

interface Project {
    id: number;
    title: string;
    image: string;
    scale: string;
    area: string;
    category: number;
    slug: string;
}

const ProjectsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;

    const projectCategories = [
        { id: 0, name: 'TẤT CẢ DỰ ÁN', icon: 'null' },
        { id: 1, name: 'Căn hộ', icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/canho.png' },
        { id: 2, name: 'Đất nền', icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/datnen.png' },
        { id: 3, name: 'BĐS nghỉ dưỡng', icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/bds.png' },
        { id: 4, name: 'Nhà phố biệt thự', icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/nhapho.png' },
        { id: 5, name: 'Officetel', icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/off.png' },
    ];

    const projects: Project[] = [
        // Căn hộ
        {
            id: 1,
            title: 'The Privé',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/87/phoi-canh-tu-can-ho-the-prive-quan-2-anh-theprive-net-vn.jpg',
            scale: '3175 căn hộ',
            area: '49 m2 – 95 m2',
            category: 1,
            slug: 'the-prive',
        },
        {
            id: 2,
            title: 'Stown Gateway',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/86/th%C3%B4ng-tin-d%E1%BB%B1-%C3%A1n-stown-gateway-h%C3%ACnh-%E1%BA%A3nh-5_6.jpg',
            scale: '942 căn hộ',
            area: '47 m2 – 79 m2',
            category: 1,
            slug: 'stown-gateway',
        },
        {
            id: 3,
            title: 'The Gió Riverside',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/85/phoi-canh-the-gio-riverside.jpg',
            scale: '2905 căn hộ',
            area: '41 m2 – 76 m2',
            category: 1,
            slug: 'the-gio-riverside',
        },
        {
            id: 4,
            title: 'Masteri Grand View',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/84/b%E1%BA%A3n-sao-c%E1%BB%A7a-db06e9991a33a36dfa22.jpg',
            scale: '616 căn hộ',
            area: '57 m2 – 372 m2',
            category: 1,
            slug: 'masteri-grand-view',
        },
        {
            id: 5,
            title: 'King Crown Infinity',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/83/photo-3-1728871003192740345375-1728874764904-17288747649761796268016.png',
            scale: '776 căn hộ',
            area: '54 m2 – 103 m2',
            category: 1,
            slug: 'king-crown-infinity',
        },
        {
            id: 6,
            title: 'TT Avio',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/81/hinh-anh-tt-avio-3.jpg',
            scale: '2000 căn hộ',
            area: '37 m2 – 82 m2',
            category: 1,
            slug: 'tt-avio',
        },
        {
            id: 7,
            title: 'Benhill',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/80/photo-1-17237952011711905094232.jpg',
            scale: '841 căn hộ',
            area: '37 m2 – 95 m2',
            category: 1,
            slug: 'benhill',
        },
        {
            id: 8,
            title: 'The Felix',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/78/ph%E1%BB%91i-c%E1%BA%A3nh-t%E1%BB%95-th%E1%BB%83.jpg',
            scale: '1206 căn hộ',
            area: '48 m2 – 86 m2',
            category: 1,
            slug: 'the-felix',
        },
        {
            id: 9,
            title: 'Eaton Park',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/77/eaton-park-8.jpg',
            scale: '1980 căn hộ',
            area: '55 m2 – 90 m2',
            category: 1,
            slug: 'eaton-park',
        },
        // Đất nền
        {
            id: 10,
            title: 'Lộc Phát Residence',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/39/avatar-loc-phat-residence.jpg',
            scale: '478 sản phẩm',
            area: 'Tổng diện tích : 53,300.9m2',
            category: 2,
            slug: 'loc-phat-residence',
        },
        {
            id: 11,
            title: 'Garden Riverside',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/54/h%C3%ACnh-t%E1%BB%95ng-quan-d%E1%BB%B1-%C3%A1n.jpg',
            scale: 'nhà liền kế 538 lô, biệt thự 155 lô',
            area: 'Diện tích đất toàn khu: 26,44 ha',
            category: 2,
            slug: 'garden-riverside',
        },
        {
            id: 12,
            title: 'Lakeside Palace',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/5/5.jpg',
            scale: '46ha',
            area: 'Dự án đất nền thương mại',
            category: 2,
            slug: 'lakeside-palace',
        },
        // BĐS nghỉ dưỡng
        {
            id: 13,
            title: 'Diamond Bay Condotel',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/4/7.jpg',
            scale: '1442 căn hộ du lịch và khách sạn',
            area: 'Tổng diện tích: hơn 300ha',
            category: 3,
            slug: 'diamond-bay-condotel',
        },
        // Nhà phố biệt thự
        {
            id: 14,
            title: 'Gem Sky World',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/65/lt_pv_01_birdviewa.jpg',
            scale: '92.2 ha',
            area: 'Số lượng sản phẩm: 4.026',
            category: 4,
            slug: 'gem-sky-world',
        },
    ];

    const filteredProjects = activeTab === 0
        ? projects
        : projects.filter(project => project.category === activeTab);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const currentProjects = filteredProjects.slice(startIndex, endIndex);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setCurrentPage(1);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Layout>
            {/* Hero Banner */}
            <Box
                sx={{
                    backgroundImage: 'url("https://datxanhmiennam.com.vn/Data/Sites/1/Banner/bnda.jpg")',
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
                            DỰ ÁN ĐẤT MINH LỘC GROUP
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Breadcrumbs */}
            <Box sx={{ backgroundColor: '#f8f9fa', py: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Container maxWidth="lg">
                    <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#666' }}>
                        <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                            Trang chủ
                        </MuiLink>
                        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#1976d2' }}>
                            <Business sx={{ mr: 0.5 }} fontSize="inherit" />
                            Dự án
                        </Typography>
                    </Breadcrumbs>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Filter Tabs */}
                <Box sx={{ mb: 6 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: 48,
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                px: 2,
                                '&.Mui-selected': {
                                    color: '#E7C873',
                                    fontWeight: 600,
                                },
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#E7C873',
                                height: 3,
                            },
                        }}
                    >
                        {projectCategories.map((category) => (
                            <Tab
                                key={category.id}
                                value={category.id}
                                label={category.name}
                                icon={
                                    <Box
                                        component="img"
                                        src={category.icon}
                                        alt={category.name}
                                        sx={{ width: 24, height: 24, mr: 1 }}
                                    />
                                }
                                iconPosition="start"
                            />
                        ))}
                    </Tabs>
                </Box>

                {/* Search Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
                    <Button
                        variant="contained"
                        startIcon={<Search />}
                        sx={{
                            backgroundColor: '#E7C873',
                            color: 'white',
                            px: 3,
                            py: 1.5,
                            borderRadius: 1,
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#d4b85a',
                            },
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </Box>

                {/* Projects Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: 3,
                        mb: 6,
                    }}
                >
                    {currentProjects.map((project, index) => (
                        <Card
                            key={project.id}
                            component={Link}
                            href={`/projects/${project.slug}`}
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay={index * 100}
                            sx={{
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={project.image}
                                alt={project.title}
                                sx={{
                                    objectFit: 'cover',
                                }}
                            />
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="h6"
                                    component="h3"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        mb: 2,
                                        color: '#1a1a1a',
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {project.title}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                    <Business sx={{ fontSize: '1rem', color: '#666' }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#666',
                                            fontSize: '0.9rem',
                                        }}
                                    >
                                        Quy mô: {project.scale}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            backgroundColor: '#666',
                                            borderRadius: 0.5,
                                            mr: 0.5,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#666',
                                            fontSize: '0.9rem',
                                        }}
                                    >
                                        {project.area}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

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
                                    minWidth: 40,
                                    height: 40,
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
            </Container>
        </Layout>
    );
};

export default ProjectsPage;