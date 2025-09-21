'use client'

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    LinearProgress,
    Divider,
} from '@mui/material';
import {
    AccessTime as TimeIcon,
    Devices as DeviceIcon,
    LocationOn as LocationIcon,
    Mouse as ClickIcon,
    Visibility as ViewIcon,
} from '@mui/icons-material';

const UserBehavior: React.FC = () => {
    const deviceData = [
        { device: 'Desktop', percentage: 65, users: 1240, color: '#1976d2' },
        { device: 'Mobile', percentage: 30, users: 580, color: '#388e3c' },
        { device: 'Tablet', percentage: 5, users: 95, color: '#f57c00' },
    ];

    const timeSpentData = [
        { range: '0-30 giây', percentage: 25, users: 480, color: '#f44336' },
        { range: '30s-2 phút', percentage: 35, users: 670, color: '#ff9800' },
        { range: '2-5 phút', percentage: 25, users: 480, color: '#4caf50' },
        { range: '5-10 phút', percentage: 10, users: 190, color: '#2196f3' },
        { range: '10+ phút', percentage: 5, users: 95, color: '#9c27b0' },
    ];


    const userJourney = [
        { step: 'Landing Page', users: 1240, percentage: 100, color: '#1976d2' },
        { step: 'Browse Projects', users: 890, percentage: 72, color: '#388e3c' },
        { step: 'View Details', users: 420, percentage: 34, color: '#f57c00' },
        { step: 'Contact Form', users: 156, percentage: 13, color: '#7b1fa2' },
        { step: 'Phone Call', users: 45, percentage: 4, color: '#d32f2f' },
    ];

    const heatmapData = [
        { element: 'Header Logo', clicks: 1240, percentage: 100, color: '#4caf50' },
        { element: 'Navigation Menu', clicks: 890, percentage: 72, color: '#2196f3' },
        { element: 'Search Button', clicks: 420, percentage: 34, color: '#ff9800' },
        { element: 'Project Cards', clicks: 380, percentage: 31, color: '#9c27b0' },
        { element: 'Contact Button', clicks: 156, percentage: 13, color: '#f44336' },
        { element: 'Social Icons', clicks: 95, percentage: 8, color: '#607d8b' },
    ];

    return (
        <Grid container spacing={3}>
            {/* Device Usage */}
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
                            <DeviceIcon sx={{ mr: 1, color: '#E7C873' }} />
                            Thiết bị sử dụng
                        </Typography>

                        {deviceData.map((device, index) => (
                            <Box key={index} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {device.device}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {device.percentage}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={device.percentage}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: device.color,
                                        },
                                    }}
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                    {device.users.toLocaleString()} người dùng
                                </Typography>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Grid>

            {/* Time Spent */}
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
                            <TimeIcon sx={{ mr: 1, color: '#E7C873' }} />
                            Thời gian trên site
                        </Typography>

                        {timeSpentData.map((time, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {time.range}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {time.percentage}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={time.percentage}
                                    sx={{
                                        height: 6,
                                        borderRadius: 3,
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: time.color,
                                        },
                                    }}
                                />
                            </Box>
                        ))}

                        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Trung bình:</strong> 3 phút 15 giây
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Geographic Distribution */}
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
                            <LocationIcon sx={{ mr: 1, color: '#E7C873' }} />
                            Phân bố địa lý
                        </Typography>

                        <List>
                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemIcon>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#4caf50', fontSize: '0.8rem' }}>1</Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary="TP. Hồ Chí Minh"
                                    secondary="45.2% (560 users)"
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemIcon>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#2196f3', fontSize: '0.8rem' }}>2</Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Hà Nội"
                                    secondary="28.5% (354 users)"
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemIcon>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#ff9800', fontSize: '0.8rem' }}>3</Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Đà Nẵng"
                                    secondary="12.8% (159 users)"
                                />
                            </ListItem>
                            <ListItem sx={{ px: 0, py: 1 }}>
                                <ListItemIcon>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#9c27b0', fontSize: '0.8rem' }}>4</Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Khác"
                                    secondary="13.5% (167 users)"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>

            {/* User Journey */}
            <Grid item xs={12} lg={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
                            <ViewIcon sx={{ mr: 1, color: '#E7C873' }} />
                            Hành trình người dùng
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            {userJourney.map((step, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {step.step}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {step.users.toLocaleString()} ({step.percentage}%)
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            height: 20,
                                            backgroundColor: step.color,
                                            borderRadius: 2,
                                            width: `${step.percentage}%`,
                                            position: 'relative',
                                            transition: 'width 0.3s ease-in-out',
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ p: 2, backgroundColor: '#e8f5e8', borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Insight:</strong> 72% người dùng tiếp tục browse dự án sau khi vào trang chủ,
                                cho thấy nội dung hấp dẫn và dễ tìm hiểu.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Click Heatmap */}
            <Grid item xs={12} lg={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
                            <ClickIcon sx={{ mr: 1, color: '#E7C873' }} />
                            Click Heatmap
                        </Typography>

                        <List>
                            {heatmapData.map((element, index) => (
                                <React.Fragment key={index}>
                                    <ListItem sx={{ px: 0, py: 1.5 }}>
                                        <ListItemIcon>
                                            <Avatar
                                                sx={{
                                                    backgroundColor: element.color,
                                                    width: 32,
                                                    height: 32,
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {index + 1}
                                            </Avatar>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`${element.element} - ${element.percentage}%`}
                                            secondary={`${element.clicks.toLocaleString()} clicks`}
                                        />
                                    </ListItem>
                                    {index < heatmapData.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>

                        <Box sx={{ mt: 2, p: 2, backgroundColor: '#fff3e0', borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Gợi ý:</strong> Header Logo có tỷ lệ click cao nhất.
                                Nên tối ưu hóa các element khác để tăng engagement.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserBehavior;
