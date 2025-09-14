'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface LazySectionProps {
    children: React.ReactNode;
    threshold?: number;
    rootMargin?: string;
    fallback?: React.ReactNode;
    sx?: SxProps<Theme>;
}

const LazySection: React.FC<LazySectionProps> = ({
    children,
    threshold = 0.1,
    rootMargin = '50px',
    fallback = null,
    sx = {}
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasLoaded) {
                    setIsVisible(true);
                    setHasLoaded(true);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, rootMargin, hasLoaded]);

    return (
        <Box ref={ref} sx={sx}>
            {isVisible ? children : fallback}
        </Box>
    );
};

export default LazySection;
