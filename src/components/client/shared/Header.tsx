'use client'

import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Stack,
    CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    Search as SearchIcon,
    Phone as PhoneIcon,
    Facebook,
    YouTube,
    Home,
    Login,
    PersonAdd,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import { companyService, type CompanyInfo } from '@/services/client/companyService';

const Header: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    // Fetch company info
    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                setLoading(true);
                const info = await companyService.getGeneralInfo();
                setCompanyInfo(info);
            } catch (error) {
                console.error('Error fetching company info:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyInfo();
    }, []);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        // Check if window is available (client-side)
        if (typeof window !== 'undefined') {
            // Initial check
            handleScroll();

            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleSearchToggle = () => {
        setSearchOpen(!searchOpen);
    };

    const navigationItems = [
        { label: 'Trang chủ', path: '/', hasDropdown: false, icon: <Home /> },
        { label: 'Giới thiệu', path: '/about', hasDropdown: false },
        {
            label: 'Dự án',
            path: '/projects',
            hasDropdown: false,
        },
        { label: 'Lĩnh Vực Hoạt Động', path: '/field', hasDropdown: false },
        {
            label: 'Tin tức',
            path: '/news',
            hasDropdown: false,
        },
        { label: 'Các Loại Sâm', path: '/SamType', hasDropdown: false },
        {
            label: 'Tuyển Dụng',
            path: '/careers',
            hasDropdown: false,
        },
        { label: 'Liên hệ', path: '/contact', hasDropdown: false },
    ];

    const topBarItems = [
        {
            label: companyInfo?.data?.companyName ? `${companyInfo.data.companyName} - Trụ Sở` : 'MinhLoc Group - Trụ Sở',
            path: '/about/headquarters'
        },
        {
            label: 'Saigon Real',
            path: companyInfo?.data?.contactInfo?.website || 'https://minhlocgroup.vn'
        },
    ];

    return (
        <>

            {/* Main Header */}
            <AppBar
                position="fixed"
                elevation={scrolled ? 4 : 0}



                sx={{
                    backgroundColor: 'white',
                    color: '#1a1a1a',
                    boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    transition: 'all 0.3s ease-in-out',
                }}
            >
                {/* Top Bar */}
                <Box
                    sx={{
                        backgroundColor: '#E7C873', // Luxurious gold instead of blue
                        color: 'white',
                        py: scrolled ? 0 : 0.8,
                        position: 'relative',
                        zIndex: 1001,
                        height: scrolled ? 0 : 'auto',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease-in-out',
                        display: { xs: 'none', md: 'block' },
                    }}
                >
                    <Container maxWidth="lg">
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                {topBarItems.map((item, index) => (
                                    <React.Fragment key={item.path}>
                                        <Link
                                            href={item.path}
                                            style={{
                                                color: 'white',
                                                textDecoration: 'none',
                                                fontWeight: 500,
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {item.label}
                                        </Link>
                                        {index < topBarItems.length - 1 && (
                                            <Box
                                                sx={{
                                                    width: '1px',
                                                    height: '16px',
                                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                                }}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </Box>
                        </Box>
                    </Container>
                </Box>
                <Container sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', width: '100%' }}>
                    <Toolbar
                        sx={{
                            minHeight: scrolled ? { xs: '50px', md: '60px' } : { xs: '70px', md: '80px' },
                            px: { xs: 2, md: 0 },
                            transition: 'all 0.3s ease-in-out',
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
                                mr: 4,
                            }}
                        >
                            <Image
                                src="/Logo_MinhLocGroup.png"
                                alt={companyInfo?.data?.companyName || "MinhLoc Group"}
                                width={scrolled ? 120 : 120}
                                height={scrolled ? 90 : 120}
                                priority={true}
                                style={{
                                    height: scrolled ? '90px' : '120px',
                                    objectFit: 'contain',
                                    width: 'auto',
                                    transition: 'all 0.3s ease-in-out',
                                }}
                            />
                        </Box>
                    </Toolbar>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                        {/* Right Side Actions */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: "end",
                            py: scrolled ? 0.5 : 1,
                            gap: scrolled ? 1.5 : 2,
                            transition: 'all 0.3s ease-in-out',
                        }}>
                            {/* Hotline */}
                            {!loading && (
                                <Box
                                    sx={{
                                        display: { xs: 'none', md: 'flex' },
                                        alignItems: 'center',
                                        gap: scrolled ? 0.5 : 1,
                                        backgroundColor: '#E7C873',
                                        color: 'white',
                                        px: scrolled ? 1.2 : 2,
                                        py: scrolled ? 0.6 : 1,
                                        borderRadius: '4px',
                                        fontWeight: 600,
                                        fontSize: scrolled ? '0.8rem' : '0.9rem',
                                        transition: 'all 0.3s ease-in-out',
                                    }}
                                >
                                    <PhoneIcon sx={{ fontSize: '1.2rem' }} />
                                    <Typography
                                        component={Link}
                                        href={`tel:${companyInfo?.data?.contactInfo?.phone || '1900232427'}`}
                                        sx={{
                                            color: 'white',
                                            textDecoration: 'none',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                        }}
                                    >
                                        {companyInfo?.data?.contactInfo?.phone || '1900232427'}
                                    </Typography>
                                </Box>
                            )}
                            {loading && (
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                                    <CircularProgress size={20} />
                                </Box>
                            )}

                            {/* Search Toggle */}
                            <IconButton
                                onClick={handleSearchToggle}
                                sx={{
                                    color: '#1a1a1a',
                                    border: '1px solid #E7C873',
                                    borderRadius: '4px',
                                    width: scrolled ? '32px' : '40px',
                                    height: scrolled ? '32px' : '40px',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                        color: '#E7C873',
                                    },
                                }}
                            >
                                <SearchIcon sx={{ fontSize: scrolled ? '1rem' : '1.2rem' }} />
                            </IconButton>

                            {/* Social Icons */}
                            {!loading && (
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: scrolled ? 0.5 : 1 }}>
                                    {companyInfo?.data?.socialMedia?.facebook && (
                                        <IconButton
                                            component={Link}
                                            href={companyInfo.data.socialMedia.facebook}
                                            target="_blank"
                                            sx={{
                                                backgroundColor: '#1877F2',
                                                color: 'white',
                                                width: scrolled ? '32px' : '40px',
                                                height: scrolled ? '32px' : '40px',
                                                borderRadius: '4px',
                                                transition: 'all 0.3s ease-in-out',
                                                '&:hover': {
                                                    backgroundColor: '#166FE5',
                                                },
                                            }}
                                        >
                                            <Facebook sx={{ fontSize: scrolled ? '1rem' : '1.2rem' }} />
                                        </IconButton>
                                    )}
                                    {companyInfo?.data?.socialMedia?.youtube && (
                                        <IconButton
                                            component={Link}
                                            href={companyInfo.data.socialMedia.youtube}
                                            target="_blank"
                                            sx={{
                                                backgroundColor: '#FF0000',
                                                color: 'white',
                                                width: scrolled ? '32px' : '40px',
                                                height: scrolled ? '32px' : '40px',
                                                borderRadius: '4px',
                                                transition: 'all 0.3s ease-in-out',
                                                '&:hover': {
                                                    backgroundColor: '#E60000',
                                                },
                                            }}
                                        >
                                            <YouTube sx={{ fontSize: scrolled ? '1rem' : '1.2rem' }} />
                                        </IconButton>
                                    )}
                                </Box>
                            )}

                            {/* Mobile Menu Button */}
                            {isMobile && (
                                <IconButton
                                    onClick={handleMobileMenuToggle}
                                    sx={{
                                        color: '#1a1a1a',
                                        '&:hover': {
                                            color: '#E7C873',
                                        },
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </Box>
                        {/* Navigation Menu */}
                        <Box
                            sx={{
                                borderTop: '1px solid #f0f0f0',
                                py: scrolled ? 0.5 : 1,
                                transition: 'all 0.3s ease-in-out',
                            }}
                        >
                            <Container>
                                <Box
                                    sx={{
                                        display: { xs: 'none', md: 'flex' },
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 0,
                                    }}
                                >
                                    {navigationItems.map((item) => (
                                        <Button
                                            key={item.path}
                                            component={Link}
                                            href={item.path}
                                            startIcon={item.icon}
                                            sx={{
                                                color: '#1a1a1a',
                                                textTransform: 'none',
                                                fontWeight: 700,
                                                backgroundColor: 'transparent',
                                                fontSize: scrolled ? '0.75rem' : '0.875rem',
                                                px: scrolled ? 1.2 : 2,
                                                py: scrolled ? 0.6 : 1,
                                                borderRadius: 0,
                                                minWidth: 'auto',
                                                boxShadow: 'none',
                                                borderBottom: pathname === item.path ? '2px solid #E7C873' : '2px solid transparent',
                                                transition: 'all 0.3s ease-in-out',
                                                '&:hover': {
                                                    borderBottom: '2px solid #E7C873',
                                                    boxShadow: 'none',
                                                },
                                                '&:focus': {
                                                    backgroundColor: 'transparent',
                                                },
                                                '&:active': {
                                                    backgroundColor: 'transparent',
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </Box>
                            </Container>
                        </Box>

                        {/* Mobile Hotline */}
                        {isMobile && !loading && (
                            <Box
                                sx={{
                                    backgroundColor: '#E7C873',
                                    color: 'white',
                                    py: 1,
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                    component={Link}
                                    href={`tel:${companyInfo?.data?.contactInfo?.phone || '1900232427'}`}
                                    sx={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    📞 {companyInfo?.data?.contactInfo?.phone || '1900232427'}
                                </Typography>
                            </Box>
                        )}
                        {isMobile && loading && (
                            <Box
                                sx={{
                                    backgroundColor: '#E7C873',
                                    color: 'white',
                                    py: 1,
                                    textAlign: 'center',
                                }}
                            >
                                <CircularProgress size={20} sx={{ color: 'white' }} />
                            </Box>
                        )}
                    </Box>
                </Container>
            </AppBar>

            {/* Mobile Menu Drawer */}
            <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={handleMobileMenuToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '280px',
                        backgroundColor: 'white',
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ color: '#E7C873', fontWeight: 700 }}>
                            Menu
                        </Typography>
                        <IconButton onClick={handleMobileMenuToggle}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Mobile User Controls */}
                    <Box sx={{ mb: 2 }}>
                        <Stack direction="row" sx={{ gap: 2, display: 'none', flexDirection: 'column' }}>
                            <Button
                                component={Link}
                                href="/login"
                                startIcon={<Login />}
                                size="small"
                                sx={{
                                    borderColor: '#E7C873',
                                    color: '#E7C873',
                                    textTransform: 'none',
                                    flex: 1,
                                }}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                component={Link}
                                href="/register"
                                startIcon={<PersonAdd />}
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderColor: '#E7C873',
                                    color: '#E7C873',
                                    textTransform: 'none',
                                    flex: 1,
                                }}
                            >
                                Đăng ký
                            </Button>
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Mobile Navigation */}
                    <List>
                        {navigationItems.map((item) => (
                            <React.Fragment key={item.path}>
                                <ListItem
                                    component={Link}
                                    href={item.path}
                                    onClick={handleMobileMenuToggle}
                                    sx={{
                                        borderRadius: '8px',
                                        mb: 0.5,
                                        backgroundColor: pathname === item.path ? 'rgba(231, 200, 115, 0.1)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={item.label}
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                color: pathname === item.path ? '#E7C873' : '#1a1a1a',
                                                fontWeight: pathname === item.path ? 600 : 400,
                                            },
                                        }}
                                    />
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>

                    <Divider sx={{ my: 2 }} />

                    {/* Mobile Social Icons */}
                    {!loading && (
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            {companyInfo?.data?.socialMedia?.facebook && (
                                <IconButton
                                    component={Link}
                                    href={companyInfo.data.socialMedia.facebook}
                                    target="_blank"
                                    sx={{
                                        color: '#1877F2',
                                        '&:hover': {
                                            backgroundColor: 'rgba(24, 119, 242, 0.1)',
                                        },
                                    }}
                                >
                                    <Facebook />
                                </IconButton>
                            )}
                            {companyInfo?.data?.socialMedia?.youtube && (
                                <IconButton
                                    component={Link}
                                    href={companyInfo.data.socialMedia.youtube}
                                    target="_blank"
                                    sx={{
                                        color: '#FF0000',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                        },
                                    }}
                                >
                                    <YouTube />
                                </IconButton>
                            )}
                        </Box>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
