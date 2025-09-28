'use client'

import React, { useState } from 'react';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    CssBaseline,
} from '@mui/material';
import {
    Menu as MenuIcon,
} from '@mui/icons-material';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useDisableScrollLock } from '../../lib/useDisableScrollLock';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 280;

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    useDisableScrollLock();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }} className="admin-layout">
            <CssBaseline />

            {/* App Bar */}
            <AppBar
                position="fixed"
                sx={{
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                    ml: { lg: `${drawerWidth}px` },
                    backgroundColor: 'white',
                    color: '#1a1a1a',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { lg: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <AdminHeader />
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Box
                component="nav"
                sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
            >
                {/* Mobile drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        disableScrollLock: true,
                    }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    <AdminSidebar onClose={handleDrawerToggle} />
                </Drawer>

                {/* Desktop drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    <AdminSidebar />
                </Drawer>
            </Box>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                    mt: '64px',
                    backgroundColor: '#f8f9fa',
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default AdminLayout;
