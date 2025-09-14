'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const discoverItems = [
    {
        title: 'Dự Án Mới',
        description: 'Khám phá những dự án bất động sản mới nhất với thiết kế hiện đại',
        count: '25+ dự án'
    },
    {
        title: 'Vị Trí Đắc Địa',
        description: 'Các dự án tại vị trí trung tâm, tiện ích xung quanh đầy đủ',
        count: '50+ vị trí'
    },
    {
        title: 'Đầu Tư An Toàn',
        description: 'Cam kết pháp lý rõ ràng, tiềm năng tăng trưởng cao',
        count: '100% an toàn'
    }
];

const SimpleDiscoverSection: React.FC = () => {
    return (
        <Box sx={{ py: 8, backgroundColor: '#ffffff' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 2
                        }}
                    >
                        Khám Phá Thêm
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#6c757d',
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6
                        }}
                    >
                        Tìm hiểu thêm về các dịch vụ và cơ hội đầu tư bất động sản
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    {discoverItems.map((item) => (
                        <Box key={item.title} sx={{ flex: 1 }}>
                            <Card
                                sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 200,
                                        backgroundColor: '#E7C873',
                                        borderRadius: '12px 12px 0 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: '#1a1a1a',
                                            fontWeight: 700,
                                            fontSize: '3rem'
                                        }}
                                    >
                                        {item.title.charAt(0)}
                                    </Typography>
                                </Box>

                                <CardContent sx={{ p: 3 }}>
                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            mb: 2
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#6c757d',
                                            mb: 3,
                                            lineHeight: 1.6
                                        }}
                                    >
                                        {item.description}
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#E7C873'
                                            }}
                                        >
                                            {item.count}
                                        </Typography>

                                        <Button
                                            variant="text"
                                            endIcon={<ArrowForward />}
                                            sx={{
                                                color: '#E7C873',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                                }
                                            }}
                                        >
                                            Khám phá
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default SimpleDiscoverSection;
