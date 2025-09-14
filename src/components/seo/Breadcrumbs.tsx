'use client'

import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

interface BreadcrumbItem {
    label: string;
    href: string;
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
    '/': [
        { label: 'Trang chủ', href: '/' }
    ],
    '/about': [
        { label: 'Trang chủ', href: '/' },
        { label: 'Giới thiệu', href: '/about' }
    ],
    '/projects': [
        { label: 'Trang chủ', href: '/' },
        { label: 'Dự án', href: '/projects' }
    ],
    '/contact': [
        { label: 'Trang chủ', href: '/' },
        { label: 'Liên hệ', href: '/contact' }
    ],
    '/admin': [
        { label: 'Trang chủ', href: '/' },
        { label: 'Quản trị', href: '/admin' }
    ]
};

export default function Breadcrumbs() {
    const pathname = usePathname();
    const breadcrumbs = breadcrumbMap[pathname] || breadcrumbMap['/'];

    return (
        <MuiBreadcrumbs
            aria-label="breadcrumb"
            sx={{
                mb: 2,
                '& .MuiBreadcrumbs-separator': {
                    color: 'text.secondary'
                }
            }}
        >
            {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;

                if (isLast) {
                    return (
                        <Typography
                            key={item.href}
                            color="text.primary"
                            sx={{ fontWeight: 500 }}
                        >
                            {item.label}
                        </Typography>
                    );
                }

                return (
                    <Link
                        key={item.href}
                        component={NextLink}
                        href={item.href}
                        color="inherit"
                        underline="hover"
                        sx={{
                            '&:hover': {
                                color: 'primary.main'
                            }
                        }}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </MuiBreadcrumbs>
    );
}
