'use client';
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, Skeleton } from '@mui/material';

interface SimpleLazySectionProps {
    children: React.ReactNode;
    threshold?: number;
    fallbackHeight?: number;
    delay?: number;
}

const SimpleLazySection: React.FC<SimpleLazySectionProps> = ({
    children,
    threshold = 0.1,
    fallbackHeight = 200,
    delay = 0,
}) => {
    const [hasRendered, setHasRendered] = useState(false);
    const { ref, inView } = useInView({
        threshold,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView && !hasRendered) {
            if (delay > 0) {
                setTimeout(() => {
                    setHasRendered(true);
                }, delay);
            } else {
                setHasRendered(true);
            }
        }
    }, [inView, hasRendered, delay]);

    return (
        <Box ref={ref}>
            {hasRendered ? (
                children
            ) : (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={fallbackHeight}
                    sx={{
                        animation: 'pulse 1.5s ease-in-out infinite',
                        '@keyframes pulse': {
                            '0%': { opacity: 1 },
                            '50%': { opacity: 0.5 },
                            '100%': { opacity: 1 },
                        },
                    }}
                />
            )}
        </Box>
    );
};

export default SimpleLazySection;
