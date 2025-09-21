'use client'

import React from 'react';
import { Box } from '@mui/material';
import HeroBanner from '../Home/HeroBanner';
// Removed import for deleted component

const HeroSection: React.FC = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                filter: 'hue-rotate(0deg) saturate(0.8) brightness(0.9)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                }
            }}
        >
            {/* Background image removed - using HeroBanner's own background */}

            {/* Hero Banner without background */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <HeroBanner />
            </Box>
        </Box>
    );
};

export default HeroSection;
