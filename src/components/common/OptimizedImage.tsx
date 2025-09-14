'use client'

import React, { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import Image from 'next/image';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
    sx?: SxProps<Theme>;
    fill?: boolean;
    sizes?: string;
    quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    width,
    height,
    priority = false,
    className,
    sx,
    fill = false,
    sizes = '100vw',
    quality = 75
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    if (hasError) {
        return (
            <Box
                sx={{
                    width: width || '100%',
                    height: height || '200px',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    ...sx
                }}
            >
                Image not available
            </Box>
        );
    }

    return (
        <Box sx={{ position: 'relative', ...sx }}>
            {isLoading && (
                <Skeleton
                    variant="rectangular"
                    width={width || '100%'}
                    height={height || '200px'}
                    animation="wave"
                />
            )}
            <Image
                src={src}
                alt={alt}
                width={fill ? undefined : width}
                height={fill ? undefined : height}
                fill={fill}
                priority={priority}
                className={className}
                sizes={sizes}
                quality={quality}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                    display: isLoading ? 'none' : 'block',
                    objectFit: 'cover'
                }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
        </Box>
    );
};

export default OptimizedImage;
