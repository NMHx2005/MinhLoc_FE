'use client'

import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import HeroBanner from '../Home/HeroBanner';
import OptimizedBanner from '@/components/common/OptimizedBanner';

const HeroSection: React.FC = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
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
            <OptimizedBanner
                src="/banner.png"
                alt="MinhLoc Group - Bất Động Sản Cao Cấp"
                priority={true}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                }}
            />
            {/* Header with transparent background */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Header />
            </Box>

            {/* Hero Banner without background */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <HeroBanner />
            </Box>
        </Box>
    );
};

export default HeroSection;
