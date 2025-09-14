'use client'

import dynamic from 'next/dynamic';
import { Skeleton } from '@mui/material';

// Dynamic imports with loading states
export const DynamicTestimonialsSection = dynamic(
    () => import('@/components/client/Home/TestimonialsSection'),
    {
        loading: () => (
            <Skeleton
                variant="rectangular"
                height={400}
                sx={{
                    borderRadius: 2,
                    backgroundColor: '#f5f5f5'
                }}
            />
        )
    }
);

export const DynamicNewsSection = dynamic(
    () => import('@/components/client/Home/NewsSection'),
    {
        loading: () => (
            <Skeleton
                variant="rectangular"
                height={300}
                sx={{
                    borderRadius: 2,
                    backgroundColor: '#f5f5f5'
                }}
            />
        )
    }
);

export const DynamicClientLogosSection = dynamic(
    () => import('@/components/client/Home/ClientLogosSection'),
    {
        loading: () => (
            <Skeleton
                variant="rectangular"
                height={200}
                sx={{
                    borderRadius: 2,
                    backgroundColor: '#f5f5f5'
                }}
            />
        )
    }
);

export const DynamicDiscoverSection = dynamic(
    () => import('@/components/client/Home/DiscoverSection'),
    {
        loading: () => (
            <Skeleton
                variant="rectangular"
                height={350}
                sx={{
                    borderRadius: 2,
                    backgroundColor: '#f5f5f5'
                }}
            />
        )
    }
);
