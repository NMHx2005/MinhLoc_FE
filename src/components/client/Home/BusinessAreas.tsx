'use client'

import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    CircularProgress,
} from '@mui/material';
import { getBusinessFields } from '@/services/client/businessFieldService';

const BusinessAreas: React.FC = () => {
    const [businessAreas, setBusinessAreas] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBusinessFields = async () => {
            try {
                setLoading(true);
                const response = await getBusinessFields(1, 3); // Lấy 3 lĩnh vực
                if (response) {
                    setBusinessAreas(response);
                } else {
                    setError('Không thể tải dữ liệu lĩnh vực hoạt động');
                }
            } catch (err) {
                console.error('Error fetching business fields:', err);
                setError('Có lỗi xảy ra khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessFields();
    }, []);

    return (
        <Box
            component="section"
            className="business-areas-section"
            sx={{
                py: 8,
                backgroundColor: '#f8f9fa',
                backgroundImage: 'url(/background.png)',
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(248, 249, 250, 0.95)',
                    zIndex: 1,
                }
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                {/* Section Title */}
                <Typography
                    variant="h2"
                    component="h2"


                    sx={{
                        textAlign: 'center',
                        color: '#E7C873',
                        fontWeight: 700,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        mb: 6,
                    }}
                >
                    Lĩnh vực hoạt động
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

                {/* Business Areas Grid */}
                {!loading && !error && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(3, 1fr)',
                            },
                            gap: 4,
                            mt: 4,
                        }}
                    >
                        {businessAreas.map((area: any) => (
                            <Card
                                key={area._id}


                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'white',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                {/* Image */}
                                <Box
                                    component="img"
                                    src={area.image || '/modern-house.png'}
                                    alt={area.name}
                                    sx={{
                                        width: '100%',
                                        height: 200,
                                        objectFit: 'cover',
                                        overflow: 'hidden!important',
                                        objectPosition: 'center',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />

                                {/* Content */}
                                <CardContent
                                    sx={{
                                        p: 3,
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        component="h3"
                                        sx={{
                                            fontSize: '1.5rem',
                                            fontWeight: 700,
                                            color: '#E7C873',
                                            mb: 2,
                                            textAlign: 'center',
                                        }}
                                    >
                                        {area.name}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontSize: '0.95rem',
                                            lineHeight: 1.5,
                                            color: '#555',
                                            textAlign: 'justify',
                                            flexGrow: 1,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden!important',
                                            textOverflow: 'ellipsis',
                                            height: '4.5em', // 3 lines * 1.5 line-height
                                        }}
                                        title={area.description} // Tooltip for full text
                                    >
                                        {area.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default BusinessAreas;
