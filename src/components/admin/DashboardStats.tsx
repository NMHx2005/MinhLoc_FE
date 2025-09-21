'use client'

import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    Chip,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    Business as BusinessIcon,
    Inventory as InventoryIcon,
    People as PeopleIcon,
    AttachMoney as MoneyIcon,
} from '@mui/icons-material';

interface StatCardProps {
    title: string;
    value: string | number;
    change: number;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    change,
    icon,
    bgColor,
}) => {
    const isPositive = change >= 0;

    return (
        <Card
            sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            mr: 2,
                            width: 48,
                            height: 48,
                        }}
                    >
                        {icon}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            {value}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {title}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Chip
                        icon={isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        label={`${isPositive ? '+' : ''}${change}%`}
                        size="small"
                        sx={{
                            backgroundColor: isPositive ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                            color: isPositive ? '#4caf50' : '#f44336',
                            fontWeight: 600,
                        }}
                    />
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        So với tháng trước
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

const DashboardStats: React.FC = () => {
    const statsData = [
        {
            title: 'Tổng Dự án',
            value: '24',
            change: 12.5,
            icon: <BusinessIcon />,
            color: '#1976d2',
            bgColor: '#1976d2',
        },
        {
            title: 'Sản phẩm Sâm',
            value: '156',
            change: 8.2,
            icon: <InventoryIcon />,
            color: '#388e3c',
            bgColor: '#388e3c',
        },
        {
            title: 'Khách hàng',
            value: '1,234',
            change: -2.1,
            icon: <PeopleIcon />,
            color: '#f57c00',
            bgColor: '#f57c00',
        },
        {
            title: 'Doanh thu (Tỷ)',
            value: '45.2',
            change: 15.8,
            icon: <MoneyIcon />,
            color: '#7b1fa2',
            bgColor: '#7b1fa2',
        },
    ];

    return (
        <Grid container spacing={3}>
            {statsData.map((stat, index) => (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                    <StatCard {...stat} />
                </Grid>
            ))}
        </Grid>
    );
};

export default DashboardStats;
