'use client'

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    LinearProgress,
} from '@mui/material';
import {
    People,
    ShoppingCart,
    AttachMoney,
    TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
    const stats = [
        {
            title: 'Tổng người dùng',
            value: '1,234',
            icon: <People />,
            color: '#1976d2',
            progress: 75,
        },
        {
            title: 'Đơn hàng',
            value: '567',
            icon: <ShoppingCart />,
            color: '#dc004e',
            progress: 60,
        },
        {
            title: 'Doanh thu',
            value: '₫12.3M',
            icon: <AttachMoney />,
            color: '#2e7d32',
            progress: 85,
        },
        {
            title: 'Tăng trưởng',
            value: '+12.5%',
            icon: <TrendingUp />,
            color: '#ed6c02',
            progress: 90,
        },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Tổng quan về hoạt động của hệ thống
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {stats.map((stat, index) => (
                    <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Card>
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Box
                                            sx={{
                                                p: 1,
                                                borderRadius: 1,
                                                backgroundColor: `${stat.color}20`,
                                                color: stat.color,
                                                mr: 2,
                                            }}
                                        >
                                            {stat.icon}
                                        </Box>
                                        <Box>
                                            <Typography variant="h4" component="div">
                                                {stat.value}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {stat.title}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={stat.progress}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            backgroundColor: `${stat.color}20`,
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: stat.color,
                                            },
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 2 }}>
                <Box sx={{ flex: { xs: 1, md: 2 } }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Biểu đồ doanh thu
                                </Typography>
                                <Box
                                    sx={{
                                        height: 300,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'grey.50',
                                        borderRadius: 1,
                                    }}
                                >
                                    <Typography color="text.secondary">
                                        Biểu đồ sẽ được hiển thị ở đây
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Hoạt động gần đây
                                </Typography>
                                <Box>
                                    {[
                                        'Người dùng mới đăng ký',
                                        'Đơn hàng được tạo',
                                        'Thanh toán thành công',
                                        'Sản phẩm mới được thêm',
                                    ].map((activity, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                py: 1,
                                                borderBottom: index < 3 ? '1px solid' : 'none',
                                                borderColor: 'grey.200',
                                            }}
                                        >
                                            <Typography variant="body2">
                                                {activity}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date().toLocaleString('vi-VN')}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
}
