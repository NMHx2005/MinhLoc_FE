import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Header />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: { xs: '80px', md: '142.5px' }, // Add padding-top to account for absolute header
                }}
            >
                <Container maxWidth="lg" sx={{ py: 2 }}>
                    <Breadcrumbs />
                    {children}
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
