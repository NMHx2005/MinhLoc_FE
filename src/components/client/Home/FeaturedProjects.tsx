'use client'

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Container,
    CircularProgress,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Link from 'next/link';
import TruncatedDescription from '@/components/client/shared/TruncatedDescription';
import { getProjects } from '@/services/client/projectService';
import type { Project } from '@/services/client/projectService';

const FeaturedProjects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await getProjects(1, 3, {});
                if (response.success) {
                    setProjects(response.data);
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

    if (loading) {
        return (
            <Box sx={{ py: 8, backgroundColor: '#F5F5F5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 8, backgroundColor: '#F5F5F5', textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    if (projects.length === 0) {
        return (
            <Box sx={{ py: 8, backgroundColor: '#F5F5F5', textAlign: 'center' }}>
                <Typography variant="h6">
                    Không có dự án nào
                </Typography>
            </Box>
        );
    }

    // Ensure we have at least one project
    if (!projects[0]) {
        return (
            <Box sx={{ py: 8, backgroundColor: '#F5F5F5', textAlign: 'center' }}>
                <Typography variant="h6">
                    Dữ liệu dự án không hợp lệ
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 8, backgroundColor: '#F5F5F5' }}>
            <Container maxWidth="lg">
                {/* Section Title */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h3"
                        component="h2"


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
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, alignItems: 'stretch' }}>
                    {/* Large Featured Project */}
                    <Box>
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: 0,
                                overflow: 'hidden',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '100%',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={projects[0].images?.[0] || '/modern-house.png'}
                                alt={projects[0].name || 'Dự án'}
                                sx={{
                                    objectFit: 'cover',
                                    // height: 200,
                                    width: '100%',
                                    flexShrink: 0,
                                    maxWidth: '100%',
                                    overflow: 'hidden!important',
                                }}
                            />
                            <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography
                                    variant="h5"
                                    component="h3"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        fontSize: '1.5rem',
                                        color: '#E7C873',
                                    }}
                                >
                                    {projects[0].name || 'Dự án'}
                                </Typography>
                                <TruncatedDescription
                                    maxLines={4}
                                    lineHeight={1.6}
                                    fontSize="0.95rem"
                                    sx={{
                                        mb: 3,
                                        color: '#666',
                                        flex: 1
                                    }}
                                >
                                    {projects[0].description || 'Mô tả dự án'}
                                </TruncatedDescription>
                                <Button
                                    component={Link}
                                    href={`/projects/${projects[0].slug || '#'}`}
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        fontSize: '0.95rem',
                                        fontWeight: 500,
                                        color: '#E7C873',
                                        textTransform: 'none',
                                        alignSelf: 'flex-start',
                                        p: 0,
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

                    {/* Smaller Projects */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                        {projects.slice(1).map((project) => (
                            <Box
                                key={project._id}
                                sx={{ flex: '1 1 0', minHeight: 0 }}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        borderRadius: 0,
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        minHeight: 0,
                                        maxWidth: '100%',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: '40%',
                                            objectFit: 'cover',
                                            flexShrink: 0,
                                            maxWidth: '40%',
                                            overflow: 'hidden!important',
                                        }}
                                        image={project.images?.[0] || '/modern-house.png'}
                                        alt={project.name}
                                    />
                                    <CardContent sx={{
                                        p: 3,
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        minWidth: 0,
                                        overflow: 'hidden'
                                    }}>
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                sx={{
                                                    fontWeight: 700,
                                                    mb: 2,
                                                    fontSize: '1.1rem',
                                                    color: '#E7C873',
                                                }}
                                            >
                                                {project.name}
                                            </Typography>
                                            <TruncatedDescription
                                                maxLines={3}
                                                lineHeight={1.5}
                                                fontSize="0.9rem"
                                                sx={{
                                                    mb: 2,
                                                    color: '#666'
                                                }}
                                            >
                                                {project.description}
                                            </TruncatedDescription>
                                        </Box>
                                        <Button
                                            component={Link}
                                            href={`/projects/${project.slug}`}
                                            endIcon={<ArrowForward />}
                                            sx={{
                                                color: '#E7C873',
                                                textTransform: 'none',
                                                fontSize: '0.9rem',
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
