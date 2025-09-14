'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const TestSection: React.FC = () => {
    return (
        <Box component="section" sx={{ py: 6, bgcolor: '#f0f0f0' }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: '#1a1a1a',
                        textAlign: 'center',
                        mb: 4,
                    }}
                >
                    Test Section - Này Là Nội Dung Thật!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#666',
                        textAlign: 'center',
                        fontSize: '1.125rem',
                    }}
                >
                    Nếu bạn thấy phần này, có nghĩa là lazy loading đã hoạt động!
                </Typography>
            </Container>
        </Box>
    );
};

export default TestSection;
