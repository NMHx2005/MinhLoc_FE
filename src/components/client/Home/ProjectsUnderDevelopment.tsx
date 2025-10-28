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
    CircularProgress,
} from '@mui/material';
import { ArrowForward, Business, BorderStyle, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import { getProjects, type Project } from '@/services/client/projectService';

interface TransformedProject {
    id: string;
    title: string;
    image: string;
    scale: string;
    area: string;
    category: number;
    slug: string;
}

const ProjectsUnderDevelopment: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [apiProjects, setApiProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await getProjects(1, 1000, {}); // Lấy tất cả dự án
                if (response.success) {
                    setApiProjects(response.data);
                } else {
                    setError('Không thể tải dữ liệu dự án');
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Có lỗi xảy ra khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Map API project type to category ID
    const getCategoryId = (type: string) => {
        switch (type) {
            case 'apartment': return 1;
            case 'land': return 2;
            case 'resort': return 3;
            case 'villa': return 4;
            case 'officetel': return 5;
            default: return 1;
        }
    };

    // Transform API projects to match component structure
    const transformedProjects: TransformedProject[] = apiProjects.map(project => ({
        id: project._id,
        title: project.name,
        image: project.images?.[0] || '/modern-house.png',
        scale: project.totalUnits ? `${project.totalUnits} căn hộ` : 'N/A',
        area: project.area ? `${project.area.min} m2 – ${project.area.max} m2` : 'N/A',
        category: getCategoryId(project.type),
        slug: project.slug,
    }));


    const filteredProjects = activeTab === 0
        ? transformedProjects
        : transformedProjects.filter(project => project.category === activeTab);

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

                {/* Loading State */}
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* Error State */}
                {error && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" color="error">
                            {error}
                        </Typography>
                    </Box>
                )}

                {/* Content */}
                {!loading && !error && (
                    <>
                        {/* Tabs */}
                        <Box className="prj tabs" sx={{ mb: { xs: 3, sm: 3.5, md: 4 } }}>
                            <Box className="nav-scroll" sx={{ mb: { xs: 1.5, sm: 2 } }}>
                                <Box
                                    component="ul"
                                    className="tab-links"
                                    sx={{
                                        display: 'flex',
                                        listStyle: 'none',
                                        p: 0,
                                        mb: 0,
                                        gap: { xs: 0.5, sm: 0.75, md: 1 },
                                        overflowX: 'auto',
                                        flexWrap: 'wrap',
                                        marginBottom: { xs: "15px", sm: "18px", md: "20px" },
                                        px: { xs: 1, sm: 0 },
                                        '&::-webkit-scrollbar': { display: 'none' },
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',
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
                                                    gap: { xs: 0.5, sm: 0.75, md: 1 },
                                                    px: { xs: 1.25, sm: 1.5, md: 2 },
                                                    py: { xs: 1, sm: 1.25, md: 1.5 },
                                                    backgroundColor: activeTab === category.id ? '#E7C873' : 'white',
                                                    color: activeTab === category.id ? 'white' : '#666',
                                                    borderRadius: { xs: 1, sm: 1.5, md: 2 },
                                                    textTransform: 'none',
                                                    fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.9rem' },
                                                    fontWeight: 500,
                                                    minWidth: 'auto',
                                                    whiteSpace: 'nowrap',
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
                                                        sx={{ width: { xs: 16, sm: 20, md: 24 }, height: { xs: 16, sm: 20, md: 24 } }}
                                                    />
                                                )}
                                                <Box component="span" sx={{ fontSize: 'inherit' }}>{category.name}</Box>
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
                                    <Box className="zone-projectSlider link" sx={{
                                        position: 'relative',
                                        px: { xs: 3, sm: 4, md: 5 }, // Thêm padding để chứa navigation arrows
                                    }}>
                                        {/* Navigation Arrows */}
                                        <IconButton
                                            className="slick-prev slick-arrow"
                                            onClick={handlePrev}
                                            disabled={totalSlides <= 1 || isAnimating}
                                            sx={{
                                                position: 'absolute',
                                                left: { xs: 0, sm: 0, md: 0 },
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                zIndex: 2,
                                                backgroundColor: '#F5F5F5',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                                transition: 'all 0.2s ease-out',
                                                width: { xs: 32, sm: 40, md: 48 },
                                                height: { xs: 32, sm: 40, md: 48 },
                                                display: { xs: totalSlides <= 1 ? 'none' : 'flex', sm: 'flex' },
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
                                            <ArrowBack sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } }} />
                                        </IconButton>

                                        <IconButton
                                            className="slick-next slick-arrow"
                                            onClick={handleNext}
                                            disabled={totalSlides <= 1 || isAnimating}
                                            sx={{
                                                position: 'absolute',
                                                right: { xs: 0, sm: 0, md: 0 },
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                zIndex: 2,
                                                backgroundColor: '#F5F5F5',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                                transition: 'all 0.2s ease-out',
                                                width: { xs: 32, sm: 40, md: 48 },
                                                height: { xs: 32, sm: 40, md: 48 },
                                                display: { xs: totalSlides <= 1 ? 'none' : 'flex', sm: 'flex' },
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
                                            <ArrowForward sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } }} />
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
                                                    gap: { xs: 2, sm: 2.5, md: 3 },
                                                    mb: { xs: 3, sm: 3.5, md: 4 },
                                                    minHeight: {
                                                        xs: 280,
                                                        sm: 320,
                                                        md: 400,
                                                    },
                                                    px: { xs: 0, sm: 0 },
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
                                                                boxShadow: { xs: '0 4px 15px rgba(0,0,0,0.08)', sm: '0 6px 20px rgba(0,0,0,0.1)', md: '0 8px 25px rgba(0,0,0,0.1)' },
                                                                borderRadius: { xs: 1, sm: 1.5, md: 2 },
                                                                overflow: 'hidden',
                                                                backgroundColor: 'white',
                                                                '&:hover': {
                                                                    transform: { xs: 'translateY(-2px)', sm: 'translateY(-3px)', md: 'translateY(-4px)' },
                                                                    boxShadow: { xs: '0 6px 20px rgba(0,0,0,0.12)', sm: '0 8px 25px rgba(0,0,0,0.15)', md: '0 12px 35px rgba(0,0,0,0.15)' },
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
                                                                            height: { xs: 180, sm: 200, md: 220 },
                                                                            borderRadius: 0,
                                                                            transition: 'transform 0.3s ease',
                                                                            '&:hover': {
                                                                                transform: { xs: 'scale(1.02)', sm: 'scale(1.03)', md: 'scale(1.05)' },
                                                                            },
                                                                        }}
                                                                    />
                                                                </Link>
                                                                <Box component="figcaption" sx={{ p: { xs: 1.5, sm: 1.75, md: 2 } }}>
                                                                    <Typography
                                                                        variant="h6"
                                                                        component="h3"
                                                                        className="project-title"
                                                                        sx={{
                                                                            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                                                                            fontWeight: 700,
                                                                            mb: { xs: 0.75, sm: 0.875, md: 1 },
                                                                            color: '#1a1a1a',
                                                                            lineHeight: 1.3,
                                                                            display: '-webkit-box',
                                                                            WebkitLineClamp: 2,
                                                                            WebkitBoxOrient: 'vertical',
                                                                            overflow: 'hidden',
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
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 0.5 }, mb: { xs: 0.25, sm: 0.5 } }}>
                                                                            <Business sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, color: '#666' }} />
                                                                            <Typography
                                                                                variant="body2"
                                                                                sx={{
                                                                                    color: '#666',
                                                                                    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9rem' },
                                                                                    lineHeight: 1.2,
                                                                                }}
                                                                            >
                                                                                Quy mô: {project.scale}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 0.5 } }}>
                                                                            <BorderStyle sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, color: '#666' }} />
                                                                            <Typography
                                                                                variant="body2"
                                                                                sx={{
                                                                                    color: '#666',
                                                                                    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9rem' },
                                                                                    lineHeight: 1.2,
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
                                                gap: { xs: 0.75, sm: 1 },
                                                mt: { xs: 1.5, sm: 2 },
                                                px: { xs: 2, sm: 0 },
                                            }}>
                                                {Array.from({ length: totalSlides }).map((_, index) => (
                                                    <Box
                                                        key={index}
                                                        onClick={() => handleSlideChange(index)}
                                                        sx={{
                                                            width: { xs: 6, sm: 8 },
                                                            height: { xs: 6, sm: 8 },
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
                                        sx={{ textAlign: 'center', mt: { xs: 3, sm: 3.5, md: 4 } }}
                                    >
                                        <Button
                                            component={Link}
                                            href="/projects"
                                            className="btn-viewAll"
                                            variant="outlined"
                                            endIcon={<ArrowForward sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }} />}
                                            sx={{
                                                color: '#E7C873',
                                                borderColor: '#E7C873',
                                                textTransform: 'none',
                                                fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
                                                fontWeight: 500,
                                                px: { xs: 3, sm: 3.5, md: 4 },
                                                py: { xs: 1.25, sm: 1.375, md: 1.5 },
                                                borderRadius: 1,
                                                minWidth: { xs: 120, sm: 140, md: 160 },
                                                '&:hover': {
                                                    backgroundColor: '#E7C873',
                                                    color: 'white',
                                                    borderColor: '#E7C873',
                                                },
                                            }}
                                        >
                                            Xem tất cả
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default ProjectsUnderDevelopment;
