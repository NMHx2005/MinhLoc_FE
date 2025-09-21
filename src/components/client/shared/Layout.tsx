'use client'

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <>
            <Header />
            <Box sx={{
                flexGrow: 1,
                pt: { xs: '100px', md: '150px' }, // Add padding top to compensate for fixed header
            }}>
                {children}
            </Box>
            <Footer />
        </>
    );
};

export default Layout;
