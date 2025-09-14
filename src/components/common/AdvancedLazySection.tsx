'use client'

import React from 'react';
import { Box, Skeleton } from '@mui/material';

interface AdvancedLazySectionProps {
    children: React.ReactNode;
    threshold?: number;
    triggerOnce?: boolean;
    fallbackHeight?: number;
    priority?: boolean;
}

const AdvancedLazySection: React.FC<AdvancedLazySectionProps> = ({
    children,
    threshold = 0.1,
    triggerOnce = true,
    fallbackHeight = 200,
    priority = false
}) => {
    const [isVisible, setIsVisible] = React.useState(priority);

    React.useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.disconnect();
                    }
                }
            },
            { threshold }
        );

        const element = document.getElementById('lazy-section');
        if (element) {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, [threshold, triggerOnce, priority]);

    if (isVisible) {
        return <>{children}</>;
    }

    return (
        <Box
            id="lazy-section"
            sx={{
                minHeight: fallbackHeight,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <Skeleton
                variant="rectangular"
                height={fallbackHeight}
                sx={{
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'loading 1.5s infinite',
                    '@keyframes loading': {
                        '0%': { backgroundPosition: '200% 0' },
                        '100%': { backgroundPosition: '-200% 0' }
                    }
                }}
            />
        </Box>
    );
};

export default AdvancedLazySection;
