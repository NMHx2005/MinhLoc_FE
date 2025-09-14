'use client';

import React, { useState, useEffect, useRef } from 'react';

import { Box, Skeleton } from '@mui/material';
import { useInView } from 'react-intersection-observer';

interface UltraLazySectionProps {
    children: React.ReactNode;
    threshold?: number;
    triggerOnce?: boolean;
    fallbackHeight?: number;
    priority?: boolean;
    delay?: number; // Delay before loading
}

const UltraLazySection: React.FC<UltraLazySectionProps> = ({
    children,
    threshold = 0.1,
    triggerOnce = true,
    fallbackHeight = 200,
    priority = false,
    delay = 0,
}) => {
    const [hasRendered, setHasRendered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { ref, inView } = useInView({
        threshold,
        triggerOnce,
    });

    useEffect(() => {
        if (inView && !hasRendered && !isLoading) {
            setIsLoading(true);

            // Add delay if specified
            if (delay > 0) {
                timeoutRef.current = setTimeout(() => {
                    setHasRendered(true);
                    setIsLoading(false);
                }, delay);
            } else {
                // Use requestIdleCallback for better performance
                if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                    requestIdleCallback(() => {
                        setHasRendered(true);
                        setIsLoading(false);
                    });
                } else {
                    setTimeout(() => {
                        setHasRendered(true);
                        setIsLoading(false);
                    }, 0);
                }
            }
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [inView, hasRendered, isLoading, delay]);

    // Render immediately if priority is true
    if (priority) {
        return <Box>{children}</Box>;
    }

    return (
        <Box ref={ref}>
            {hasRendered ? (
                children
            ) : (
                <Box sx={{ minHeight: fallbackHeight, width: '100%' }}>
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
                </Box>
            )}
        </Box>
    );
};

export default UltraLazySection;
