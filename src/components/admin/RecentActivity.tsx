'use client';

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Chip,
    Tooltip,
    IconButton,
    Divider,
} from '@mui/material';
import {
    Refresh as RefreshIcon,
    Article as ArticleIcon,
    Business as BusinessIcon,
    Inventory as InventoryIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    Mail as MailIcon,
    Comment as CommentIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useRecentActivity } from '../../hooks/useDashboard';

const RecentActivity: React.FC = () => {
    const { data: activityData, loading, error, refetch } = useRecentActivity(10);

    const getActivityIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'news':
            case 'article':
                return <ArticleIcon />;
            case 'project':
                return <BusinessIcon />;
            case 'product':
                return <InventoryIcon />;
            case 'user':
                return <PersonIcon />;
            case 'settings':
                return <SettingsIcon />;
            case 'contact':
                return <MailIcon />;
            case 'comment':
                return <CommentIcon />;
            default:
                return <ScheduleIcon />;
        }
    };

    const getActivityColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'news':
            case 'article':
                return 'info.main';
            case 'project':
                return 'primary.main';
            case 'product':
                return 'success.main';
            case 'user':
                return 'secondary.main';
            case 'settings':
                return 'warning.main';
            case 'contact':
                return 'error.main';
            case 'comment':
                return 'grey.600';
            default:
                return 'grey.500';
        }
    };

    const formatTimeAgo = (timestamp: string) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Vừa xong';
        if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} giờ trước`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} ngày trước`;

        return time.toLocaleDateString('vi-VN');
    };

    if (loading) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>🕒 Hoạt động gần đây</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {[...Array(5)].map((_, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'grey.300', width: 40, height: 40 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ height: 16, bgcolor: 'grey.300', borderRadius: 1, mb: 1 }} />
                                    <Box sx={{ height: 12, bgcolor: 'grey.200', borderRadius: 1, width: '60%' }} />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="error" variant="body1">
                        {error}
                    </Typography>
                    <Tooltip title="Thử lại">
                        <IconButton onClick={refetch} sx={{ mt: 1 }}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">🕒 Hoạt động gần đây</Typography>
                    <Tooltip title="Làm mới dữ liệu">
                        <IconButton onClick={refetch} size="small">
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                {activityData.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <ScheduleIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                        <Typography variant="body1" color="text.secondary">
                            Không có hoạt động nào gần đây
                        </Typography>
                    </Box>
                ) : (
                    <List sx={{ p: 0 }}>
                        {activityData.map((activity, index) => (
                            <React.Fragment key={activity.id}>
                                <ListItem sx={{ px: 0, py: 1.5 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: getActivityColor(activity.type),
                                                width: 32,
                                                height: 32,
                                            }}
                                        >
                                            {getActivityIcon(activity.type)}
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body2" component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, fontWeight: 'medium' }}>
                                                <span>{activity.title || activity.description}</span>
                                                <Chip
                                                    label={activity.type}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ height: 20, fontSize: '0.75rem' }}
                                                />
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="caption" color="text.secondary" component="span" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span>{activity.description}</span>
                                                <span>{activity.timeAgo || formatTimeAgo(activity.createdAt)}</span>
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                {index < activityData.length - 1 && <Divider variant="inset" component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    );
};

export default RecentActivity;
