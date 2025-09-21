'use client'

import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    Divider,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Business as BusinessIcon,
    Article as ArticleIcon,
    People as PeopleIcon,
    ContactMail as ContactIcon,
    Settings as SettingsIcon,
    Analytics as AnalyticsIcon,
    Home as HomeIcon,
    Spa as SamIcon,
    Assessment as ReportsIcon,
    BusinessCenter as CompanyIcon,
    Work as CareersIcon,
    Domain as BusinessFieldsIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 280;

interface AdminSidebarProps {
    onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
    const pathname = usePathname();

    const menuItems = [
        {
            title: 'Tổng quan',
            icon: <DashboardIcon />,
            path: '/admin',
            exact: true,
        },
        {
            title: 'Analytics',
            icon: <AnalyticsIcon />,
            path: '/admin/analytics',
        },
        {
            title: 'Dự án BDS',
            icon: <BusinessIcon />,
            path: '/admin/projects',
        },
        {
            title: 'Sản phẩm Sâm',
            icon: <SamIcon />,
            path: '/admin/ginseng-products',
        },
        {
            title: 'Thông tin Công ty',
            icon: <CompanyIcon />,
            path: '/admin/company',
        },
        {
            title: 'Tuyển dụng',
            icon: <CareersIcon />,
            path: '/admin/careers',
        },
        {
            title: 'Lĩnh vực Hoạt động',
            icon: <BusinessFieldsIcon />,
            path: '/admin/business-fields',
        },
        {
            title: 'Nội dung',
            icon: <ArticleIcon />,
            path: '/admin/content',
        },
        {
            title: 'Người dùng',
            icon: <PeopleIcon />,
            path: '/admin/users',
        },
        {
            title: 'Liên hệ',
            icon: <ContactIcon />,
            path: '/admin/contacts',
        },
        {
            title: 'Báo cáo',
            icon: <ReportsIcon />,
            path: '/admin/reports',
        },
        {
            title: 'Cài đặt',
            icon: <SettingsIcon />,
            path: '/admin/settings',
        },
    ];

    const isActive = (path: string, exact: boolean = false) => {
        if (exact) {
            return pathname === path;
        }
        return pathname.startsWith(path);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <HomeIcon sx={{ mr: 1, color: '#E7C873' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#E7C873' }}>
                        MinhLoc Admin
                    </Typography>
                </Box>

                <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

                {/* Menu Items */}
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                onClick={onClose}
                                sx={{
                                    borderRadius: 1,
                                    mb: 0.5,
                                    backgroundColor: isActive(item.path, item.exact)
                                        ? 'rgba(231, 200, 115, 0.2)'
                                        : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive(item.path, item.exact) ? '#E7C873' : 'white',
                                        minWidth: 40,
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            color: isActive(item.path, item.exact) ? '#E7C873' : 'white',
                                            fontWeight: isActive(item.path, item.exact) ? 600 : 400,
                                            fontSize: '0.9rem',
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', my: 2 }} />

                {/* Back to Website */}
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/"
                        onClick={onClose}
                        sx={{
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(231, 200, 115, 0.2)',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#E7C873', minWidth: 40 }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Về Website"
                            sx={{
                                '& .MuiListItemText-primary': {
                                    color: '#E7C873',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                },
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            </Box>
        </Drawer>
    );
};

export default AdminSidebar;
