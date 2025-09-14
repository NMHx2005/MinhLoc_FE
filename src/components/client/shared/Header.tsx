'use client'

import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import {
    Menu as MenuIcon,
    Phone as PhoneIcon,
    KeyboardArrowDown as ArrowDownIcon
} from '@mui/icons-material';

const Header: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState<null | HTMLElement>(null);

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchor(null);
    };

    const navigationItems = [
        { label: 'Trang chủ', path: '/', hasDropdown: true },
        { label: 'Dự án', path: '/projects', hasDropdown: true },
        { label: 'Về chúng tôi', path: '/about', hasDropdown: true },
        { label: 'Tin tức', path: '/news', hasDropdown: true },
        { label: 'Lĩnh vực', path: '/business-areas', hasDropdown: true },
        { label: 'Liên hệ', path: '/contact', hasDropdown: false },
    ];

    return (
        <AppBar
            position="absolute"
            elevation={0}
            sx={{
                backgroundColor: 'transparent',
                height: { xs: '80px', md: '142.5px' },
                zIndex: 9999,
                boxShadow: 'none !important',
                borderBottom: 'none !important',
                '&::before': {
                    display: 'none !important',
                },
                '&::after': {
                    display: 'none !important',
                },
            }}
        >
            <Container maxWidth={false} sx={{ px: 0 }}>
                <Toolbar
                    sx={{
                        height: { xs: '80px', md: '142.5px' },
                        px: { xs: 2, md: 4 },
                        justifyContent: 'space-between',
                        boxShadow: 'none !important',
                        borderBottom: 'none !important',
                        '&::before': {
                            display: 'none !important',
                        },
                        '&::after': {
                            display: 'none !important',
                        },
                    }}
                >
                    {/* Logo */}
                    <Box
                        component={Link}
                        href="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                            height: { xs: '60px', md: '80px' },
                            width: { xs: '120px', md: '150px' },
                        }}
                    >
                        <Image
                            src="/Logo_MinhLocGroup.png"
                            alt="MINH LỘC GROUP"
                            width={120}
                            height={60}
                            priority={true}
                            sizes="(max-width: 768px) 120px, 150px"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    </Box>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <Box sx={{
                            display: 'flex',
                            gap: 0,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                            {navigationItems.map((item) => (
                                <Box
                                    key={item.path}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        px: { xs: 1, md: 2 },
                                        py: 1,
                                        position: 'relative',
                                        minWidth: 'fit-content',
                                    }}
                                >
                                    <Button
                                        component={Link}
                                        href={item.path}
                                        sx={{
                                            color: 'white !important',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.9rem', md: '1rem' },
                                            px: 0,
                                            py: 0,
                                            minWidth: 'auto',
                                            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                color: 'white !important',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                    {item.hasDropdown && (
                                        <ArrowDownIcon
                                            sx={{
                                                color: 'white',
                                                fontSize: { xs: '14px', md: '16px' },
                                                ml: 0.5,
                                            }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    )}

                    {/* Right Side Actions */}
                    {!isMobile && (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 1, md: 2 },
                            flexWrap: 'wrap',
                        }}>
                            {/* Phone */}
                            <Box sx={{
                                display: { xs: 'none', lg: 'flex' },
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <PhoneIcon sx={{
                                    color: 'white !important',
                                    fontSize: { xs: '16px', md: '20px' }
                                }} />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'white !important',
                                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                                        fontWeight: 500,
                                        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    +68 685 88666
                                </Typography>
                            </Box>

                            {/* Add Property Button */}
                            <Button
                                variant="outlined"
                                sx={{
                                    color: 'white !important',
                                    borderColor: 'white !important',
                                    textTransform: 'none',
                                    borderRadius: '50px',
                                    px: { xs: 2, md: 3 },
                                    py: 1,
                                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                                    fontWeight: 500,
                                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderColor: 'white !important',
                                        color: 'white !important',
                                    },
                                }}
                            >
                                Tìm kiếm bất động sản
                            </Button>
                        </Box>
                    )}

                    {/* Mobile Menu */}
                    {isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMobileMenuOpen}
                                sx={{ color: 'white' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={mobileMenuAnchor}
                                open={Boolean(mobileMenuAnchor)}
                                onClose={handleMobileMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                PaperProps={{
                                    sx: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                    }
                                }}
                            >
                                {navigationItems.map((item) => (
                                    <MenuItem
                                        key={item.path}
                                        component={Link}
                                        href={item.path}
                                        onClick={handleMobileMenuClose}
                                        sx={{
                                            color: 'white',
                                            fontWeight: 500,
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
