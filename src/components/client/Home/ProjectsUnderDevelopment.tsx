'use client'

import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    IconButton,
    Fade,
    Slide,
} from '@mui/material';
import { ArrowForward, Business, BorderStyle, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

const ProjectsUnderDevelopment: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Swipe/Drag functionality states
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    const projectCategories = [
        { id: 0, name: 'Tất cả dự án', icon: null },
        { id: 1, name: 'Căn hộ', icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/canho.png' },
        { id: 2, name: 'Đất nền', icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/datnen.png' },
        { id: 3, name: 'BĐS nghỉ dưỡng', icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/bds.png' },
        { id: 4, name: 'Nhà phố biệt thự', icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/nhapho.png' },
        { id: 5, name: 'Officetel', icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/du-an/off.png' },
    ];

    const projects = [
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
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/78/ph%E1%BB%91i-c%E1%BA%A3nh-t%E1%BB%95ng-th%E1%BB%83.jpg',
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
        {
            id: 10,
            title: 'Picity Sky Park',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/68/220628_picity-skypark_v02_bird-view-day_final-3.jpg',
            scale: '3 Tháp - 1.568 sản phẩm',
            area: '44,69 m2 - 72,79 m2',
            category: 1,
            slug: 'picity-sky-park',
        },
        // Đất nền
        {
            id: 11,
            title: 'Lộc Phát Residence',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/39/avatar-loc-phat-residence.jpg',
            scale: '478 sản phẩm',
            area: 'Tổng diện tích : 53,300.9m2',
            category: 2,
            slug: 'loc-phat-residence',
        },
        {
            id: 12,
            title: 'Garden Riverside',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/54/h%C3%ACnh-t%E1%BB%95ng-quan-d%E1%BB%B1-%C3%A1n.jpg',
            scale: 'nhà liền kế 538 lô, biệt thự 155 lô',
            area: 'Diện tích đất toàn khu: 26,44 ha',
            category: 2,
            slug: 'garden-riverside',
        },
        {
            id: 13,
            title: 'Lakeside Palace',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/5/5.jpg',
            scale: '46ha',
            area: 'Dự án đất nền thương mại',
            category: 2,
            slug: 'lakeside-palace',
        },
        // BĐS nghỉ dưỡng
        {
            id: 14,
            title: 'Diamond Bay Condotel',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/Product/4/7.jpg',
            scale: '1442 căn hộ du lịch và khách sạn',
            area: 'Tổng diện tích: hơn 300ha',
            category: 3,
            slug: 'diamond-bay-condotel',
        },
        // Nhà phố biệt thự
        {
            id: 15,
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

    const [projectsPerSlide, setProjectsPerSlide] = useState(3);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setProjectsPerSlide(1);
            } else if (window.innerWidth < 960) {
                setProjectsPerSlide(2);
            } else {
                setProjectsPerSlide(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const totalSlides = isClient ? Math.ceil(filteredProjects.length / projectsPerSlide) : Math.ceil(filteredProjects.length / 3);
    const currentProjects = isClient ? filteredProjects.slice(
        currentSlide * projectsPerSlide,
        (currentSlide + 1) * projectsPerSlide
    ) : filteredProjects.slice(0, 3);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
            setTimeout(() => setIsAnimating(false), 200);
        }, 30);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
            setTimeout(() => setIsAnimating(false), 200);
        }, 30);
    };

    const handleSlideChange = (slideIndex: number) => {
        if (isAnimating || slideIndex === currentSlide) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentSlide(slideIndex);
            setTimeout(() => setIsAnimating(false), 200);
        }, 30);
    };

    // Reset slide when tab changes
    React.useEffect(() => {
        setCurrentSlide(0);
        setTranslateX(0);
    }, [activeTab]);

    // Swipe/Drag handlers
    const handleStart = (clientX: number) => {
        if (totalSlides <= 1 || isAnimating) return;
        setIsDragging(true);
        setStartX(clientX);
        setCurrentX(clientX);
    };

    const handleMove = (clientX: number) => {
        if (!isDragging || totalSlides <= 1) return;
        const deltaX = clientX - startX;
        setCurrentX(clientX);
        setTranslateX(deltaX);
    };

    const handleEnd = () => {
        if (!isDragging || totalSlides <= 1) return;
        setIsDragging(false);

        const deltaX = currentX - startX;
        const threshold = 50; // minimum swipe distance

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                // Swipe right - go to previous
                handlePrev();
            } else {
                // Swipe left - go to next
                handleNext();
            }
        }

        setTranslateX(0);
    };

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        handleStart(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        handleMove(e.clientX);
    };

    const handleMouseUp = () => {
        handleEnd();
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleEnd();
        }
    };

    // Touch events
    const handleTouchStart = (e: React.TouchEvent) => {
        handleStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        handleEnd();
    };


    return (
        <Box component="section" className="home-zoneProjects" sx={{ py: 8, backgroundColor: '#F5F5F5' }}>
            <Container maxWidth="lg">
                {/* Section Title */}
                <Typography
                    variant="h3"
                    component="h2"
                    className="title-home"
                    sx={{
                        textAlign: 'center',
                        color: '#E7C873',
                        fontWeight: 600,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        mb: 6,
                    }}
                >
                    Dự án đang triển khai
                </Typography>

                {/* Tabs */}
                <Box className="prj tabs" sx={{ mb: 4 }}>
                    <Box className="nav-scroll" sx={{ mb: 2 }}>
                        <Box
                            component="ul"
                            className="tab-links"
                            sx={{
                                display: 'flex',
                                listStyle: 'none',
                                p: 0,
                                mb: 0,
                                gap: 1,
                                overflowX: 'auto',
                                marginBottom: "20px",
                                '&::-webkit-scrollbar': { display: 'none' },
                            }}
                        >
                            {projectCategories.map((category) => (
                                <Box
                                    key={category.id}
                                    component="li"
                                    className={activeTab === category.id ? 'all active' : ''}
                                    sx={{
                                        flexShrink: 0,
                                        backgroundColor: '#F5F5F5',
                                    }}
                                >
                                    <Button
                                        component="a"
                                        className={activeTab === category.id ? 'show active' : 'show'}
                                        onClick={() => setActiveTab(category.id)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            px: 2,
                                            py: 1.5,
                                            backgroundColor: activeTab === category.id ? '#E7C873' : 'white',
                                            color: activeTab === category.id ? 'white' : '#666',
                                            // borderRadius: 2,
                                            textTransform: 'none',
                                            fontSize: '0.9rem',
                                            fontWeight: 500,
                                            minWidth: 'auto',
                                            '&:hover': {
                                                backgroundColor: activeTab === category.id ? '#E7C873' : '#f5f5f5',
                                            },
                                        }}
                                    >
                                        {category.icon && (
                                            <Box
                                                component="img"
                                                src={category.icon}
                                                alt={category.name}
                                                sx={{ width: 24, height: 24 }}
                                            />
                                        )}
                                        <Box component="span">{category.name}</Box>
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Tab Content */}
                    <Box className="tab-content" sx={{ marginTop: "50px" }}>
                        <Box className={`tab ${activeTab === 0 ? 'active' : ''}`} id="tabs-99">
                            <Box className="descZone" sx={{ mb: 2 }}></Box>

                            {/* Projects Slider */}
                            <Box className="zone-projectSlider link" sx={{ position: 'relative' }}>
                                {/* Navigation Arrows */}
                                <IconButton
                                    className="slick-prev slick-arrow"
                                    onClick={handlePrev}
                                    disabled={totalSlides <= 1 || isAnimating}
                                    sx={{
                                        position: 'absolute',
                                        left: -50,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        zIndex: 2,
                                        backgroundColor: '#F5F5F5',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                        transition: 'all 0.2s ease-out',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            transform: 'translateY(-50%) scale(1.05)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        },
                                        '&:disabled': {
                                            opacity: 0.5,
                                            cursor: 'not-allowed',
                                        },
                                    }}
                                >
                                    <ArrowBack />
                                </IconButton>

                                <IconButton
                                    className="slick-next slick-arrow"
                                    onClick={handleNext}
                                    disabled={totalSlides <= 1 || isAnimating}
                                    sx={{
                                        position: 'absolute',
                                        right: -50,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        zIndex: 2,
                                        backgroundColor: '#F5F5F5',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                        transition: 'all 0.2s ease-out',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            transform: 'translateY(-50%) scale(1.05)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        },
                                        '&:disabled': {
                                            opacity: 0.5,
                                            cursor: 'not-allowed',
                                        },
                                    }}
                                >
                                    <ArrowForward />
                                </IconButton>

                                {/* Projects Grid */}
                                <Fade in={!isAnimating} timeout={200}>
                                    <Box
                                        className="slick-list draggable"
                                        onMouseDown={handleMouseDown}
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseLeave}
                                        onTouchStart={handleTouchStart}
                                        onTouchMove={handleTouchMove}
                                        onTouchEnd={handleTouchEnd}
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: {
                                                xs: '1fr',
                                                sm: 'repeat(2, 1fr)',
                                                md: 'repeat(3, 1fr)',
                                            },
                                            gap: 3,
                                            mb: 4,
                                            minHeight: {
                                                xs: 300,
                                                sm: 350,
                                                md: 400,
                                            },
                                            transition: isDragging ? 'none' : 'all 0.2s ease-out',
                                            opacity: isAnimating ? 0.8 : 1,
                                            transform: `${isAnimating ? 'scale(0.99)' : 'scale(1)'} ${isDragging ? `translateX(${translateX}px)` : ''}`,
                                            cursor: isDragging ? 'grabbing' : 'grab',
                                            userSelect: 'none',
                                            touchAction: 'pan-y pinch-zoom',
                                        }}
                                    >
                                        {currentProjects.map((project, index) => (
                                            <Slide
                                                key={project.id}
                                                direction="up"
                                                in={!isAnimating}
                                                timeout={200 + index * 50}
                                            >
                                                <Box
                                                    className="item-project slick-slide slick-current slick-active"
                                                    sx={{
                                                        width: '100%',
                                                        transition: 'all 0.2s ease-out',
                                                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                                        '&:hover': {
                                                            transform: 'translateY(-4px)',
                                                        },
                                                    }}
                                                >
                                                    <Box component="figure" sx={{ m: 0 }}>
                                                        <Link
                                                            href={`/projects/${project.slug}`}
                                                            className="project-img"
                                                            style={{ textDecoration: 'none' }}
                                                        >
                                                            <Box
                                                                component="img"
                                                                src={project.image}
                                                                alt={project.title}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: 200,
                                                                    objectFit: 'cover',
                                                                    borderRadius: 0,
                                                                    transition: 'transform 0.3s ease',
                                                                    '&:hover': {
                                                                        // transform: 'scale(1.05)',
                                                                    },
                                                                }}
                                                            />
                                                        </Link>
                                                        <Box component="figcaption" sx={{ p: 2 }}>
                                                            <Typography
                                                                variant="h6"
                                                                component="h3"
                                                                className="project-title"
                                                                sx={{
                                                                    fontSize: '1.25rem',
                                                                    fontWeight: 700,
                                                                    mb: 1,
                                                                    color: '#1a1a1a',
                                                                }}
                                                            >
                                                                <Link
                                                                    href={`/projects/${project.slug}`}
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                        color: 'inherit'
                                                                    }}
                                                                >
                                                                    {project.title}
                                                                </Link>
                                                            </Typography>
                                                            <Box className="project-brief">
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
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
                                                                    <BorderStyle sx={{ fontSize: '1rem', color: '#666' }} />
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
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Slide>
                                        ))}
                                    </Box>
                                </Fade>

                                {/* Dots Indicator */}
                                {totalSlides > 1 && (
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: 1,
                                        mt: 2
                                    }}>
                                        {Array.from({ length: totalSlides }).map((_, index) => (
                                            <Box
                                                key={index}
                                                onClick={() => handleSlideChange(index)}
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: currentSlide === index ? '#E7C873' : '#ddd',
                                                    cursor: isAnimating ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.2s ease-out',
                                                    transform: currentSlide === index ? 'scale(1.1)' : 'scale(1)',
                                                    '&:hover': {
                                                        backgroundColor: currentSlide === index ? '#E7C873' : '#bbb',
                                                        transform: currentSlide === index ? 'scale(1.1)' : 'scale(1.05)',
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </Box>

                            {/* View All Button */}
                            <Box
                                className="btn-wrap"
                                data-aos="fade-up"
                                data-aos-duration="600"
                                data-aos-delay="800"
                                sx={{ textAlign: 'center', mt: 4 }}
                            >
                                <Button
                                    component={Link}
                                    href="/projects"
                                    className="btn-viewAll"
                                    variant="outlined"
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        color: '#E7C873',
                                        borderColor: '#E7C873',
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 1,
                                    }}
                                >
                                    Xem tất cả
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default ProjectsUnderDevelopment;
