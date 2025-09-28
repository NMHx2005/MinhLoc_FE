'use client'

import React, { useState } from 'react';
import {
    Box,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Avatar,
    Typography,
    Divider,
    ListItemIcon,
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
    const { user, logout } = useAuth();

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setNotificationAnchor(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
        handleMenuClose();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            {/* Notifications */}
            <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
                onClick={handleNotificationMenuOpen}
                sx={{ mr: 1 }}
            >
                <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            {/* Notifications Menu */}
            <Menu
                anchorEl={notificationAnchor}
                open={Boolean(notificationAnchor)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: { width: 320, maxHeight: 400 },
                }}
            >
                <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Thông báo
                    </Typography>
                </Box>
                <MenuItem onClick={handleMenuClose}>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Dự án mới được thêm
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            2 phút trước
                        </Typography>
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Tin tức mới được đăng
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            1 giờ trước
                        </Typography>
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Liên hệ mới từ khách hàng
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            3 giờ trước
                        </Typography>
                    </Box>
                </MenuItem>
            </Menu>

            {/* Profile Menu */}
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <Avatar
                    sx={{ width: 32, height: 32, bgcolor: '#E7C873' }}
                    src={user?.avatar}
                    alt={user?.fullName}
                >
                    {user?.fullName?.charAt(0).toUpperCase() || 'A'}
                </Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: { width: 200 },
                }}
            >
                <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {user?.fullName || 'Admin User'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {user?.email || 'admin@minhlocgroup.com'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {user?.role && `Role: ${user.role}`}
                    </Typography>
                </Box>

                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Hồ sơ</Typography>
                </MenuItem>

                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Cài đặt</Typography>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Đăng xuất</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default AdminHeader;
