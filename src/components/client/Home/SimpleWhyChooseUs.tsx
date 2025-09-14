'use client';

import React from 'react';
import { Box, Typography, Container, Card, CardContent, IconButton } from '@mui/material';
import {
    Home as HomeIcon,
    TrendingUp as TrendingUpIcon,
    Security as SecurityIcon,
    Support as SupportIcon,
    Speed as SpeedIcon,
    Verified as VerifiedIcon,
} from '@mui/icons-material';

const features = [
    {
        id: 1,
        icon: <HomeIcon />,
        title: 'Đa Dạng Bất Động Sản',
        description: 'Chúng tôi cung cấp đầy đủ các loại hình bất động sản từ chung cư, biệt thự, nhà phố đến đất nền, thương mại với giá cả cạnh tranh nhất thị trường.',
    },
    {
        id: 2,
        icon: <TrendingUpIcon />,
        title: 'Mua Bán & Cho Thuê',
        description: 'Hỗ trợ khách hàng mua bán và cho thuê bất động sản với giá thị trường tốt nhất, quy trình nhanh chóng và minh bạch.',
    },
    {
        id: 3,
        icon: <SecurityIcon />,
        title: 'Được Tin Tưởng Bởi Hàng Nghìn Khách Hàng',
        description: 'Với hơn 10 năm kinh nghiệm và hàng nghìn giao dịch thành công, chúng tôi cam kết mang đến dịch vụ tư vấn miễn phí và hỗ trợ vay vốn tốt nhất.',
    },
    {
        id: 4,
        icon: <SupportIcon />,
        title: 'Tư Vấn Chuyên Nghiệp',
        description: 'Đội ngũ chuyên gia bất động sản giàu kinh nghiệm sẽ tư vấn miễn phí và hỗ trợ bạn trong suốt quá trình giao dịch.',
    },
    {
        id: 5,
        icon: <SpeedIcon />,
        title: 'Giao Dịch Nhanh Chóng',
        description: 'Quy trình giao dịch được tối ưu hóa, giúp bạn hoàn tất thủ tục mua bán bất động sản một cách nhanh chóng và thuận tiện.',
    },
    {
        id: 6,
        icon: <VerifiedIcon />,
        title: 'Bảo Đảm Chất Lượng',
        description: 'Tất cả bất động sản đều được kiểm định kỹ lưỡng về pháp lý và chất lượng, đảm bảo quyền lợi tối đa cho khách hàng.',
    },
];

const SimpleWhyChooseUs: React.FC = () => {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#ffffff' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 2,
                            lineHeight: 1.2,
                        }}
                    >
                        Tại Sao Chọn Chúng Tôi
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
                        MinhLoc Group - Đối tác tin cậy trong lĩnh vực bất động sản với hơn 10 năm kinh nghiệm
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                    },
                    gap: { xs: 3, sm: 4, md: 4 },
                    px: { xs: 1, sm: 0 }
                }}>
                    {features.map((feature) => (
                        <Card
                            key={feature.id}
                            sx={{
                                height: '100%',
                                borderRadius: '16px',
                                border: '1px solid #e0e0e0',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                                    borderColor: '#E7C873',
                                },
                            }}
                        >
                            <CardContent sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 2, sm: 3 } }}>
                                    <IconButton
                                        sx={{
                                            width: { xs: '60px', sm: '70px', md: '80px' },
                                            height: { xs: '60px', sm: '70px', md: '80px' },
                                            borderRadius: '50%',
                                            bgcolor: '#E7C873',
                                            color: '#1a1a1a',
                                            '&:hover': {
                                                bgcolor: '#d4b85a',
                                                transform: 'scale(1.05)',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                                            },
                                        }}
                                        aria-label={feature.title}
                                    >
                                        {feature.icon}
                                    </IconButton>
                                </Box>

                                <Typography
                                    variant="h5"
                                    component="h3"
                                    sx={{
                                        fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                                        fontWeight: 700,
                                        color: '#1a1a1a',
                                        mb: { xs: 1.5, sm: 2 },
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {feature.title}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#666',
                                        lineHeight: 1.6,
                                        flexGrow: 1,
                                        fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '1rem' },
                                    }}
                                >
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#666',
                            fontSize: '0.875rem',
                            '& a': {
                                color: '#E7C873',
                                textDecoration: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            },
                        }}
                    >
                        Tìm hiểu thêm về dịch vụ của chúng tôi{' '}
                        <a href="/about" aria-label="Tìm hiểu thêm về MinhLoc Group">
                            tại đây
                        </a>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default SimpleWhyChooseUs;
