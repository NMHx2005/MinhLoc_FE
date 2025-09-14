'use client'

import React from 'react';
import Image from 'next/image';

interface OptimizedBannerProps {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
    sx?: any;
}

const OptimizedBanner: React.FC<OptimizedBannerProps> = ({
    src,
    alt,
    priority = true,
    className,
    sx
}) => {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            quality={75}
            sizes="100vw"
            fetchPriority="high"
            className={className}
            style={{
                objectFit: 'cover',
                objectPosition: 'center',
                ...sx
            }}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
    );
};

export default OptimizedBanner;
