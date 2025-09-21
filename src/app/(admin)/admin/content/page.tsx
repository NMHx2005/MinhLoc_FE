'use client'

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Breadcrumbs,
    Link,
    Tab,
    Tabs,
    Card,
    CardContent,
} from '@mui/material';
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Article as ContentIcon,
    Newspaper as NewsIcon,
    Web as StaticPageIcon,
    ViewCarousel as BannerIcon,
    Search as SEOIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import NewsManagement from '../../../../components/admin/NewsManagement';
import StaticPages from '../../../../components/admin/StaticPages';
import BannerSlider from '../../../../components/admin/BannerSlider';
import SEOSettings from '../../../../components/admin/SEOSettings';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`content-tabpanel-${index}`}
            aria-labelledby={`content-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `content-tab-${index}`,
        'aria-controls': `content-tabpanel-${index}`,
    };
}

const ContentManagementPage: React.FC = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <AdminLayout>
            <Container maxWidth="xl">
                {/* Breadcrumbs */}
                <Breadcrumbs sx={{ mb: 3 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Trang chủ
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/admin"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Dashboard
                    </Link>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ContentIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Quản lý Nội dung
                    </Box>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        📝 Quản lý Nội dung
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Quản lý tin tức, trang tĩnh, banner và cài đặt SEO cho website.
                    </Typography>
                </Box>

                {/* Tabs */}
                <Card sx={{ mb: 3 }}>
                    <CardContent sx={{ pb: 0 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="content management tabs">
                                <Tab
                                    icon={<NewsIcon />}
                                    label="Tin tức"
                                    {...a11yProps(0)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<StaticPageIcon />}
                                    label="Trang tĩnh"
                                    {...a11yProps(1)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<BannerIcon />}
                                    label="Banner/Slider"
                                    {...a11yProps(2)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<SEOIcon />}
                                    label="SEO Settings"
                                    {...a11yProps(3)}
                                    sx={{ minHeight: 72 }}
                                />
                            </Tabs>
                        </Box>
                    </CardContent>
                </Card>

                {/* Tab Panels */}
                <TabPanel value={value} index={0}>
                    <NewsManagement />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <StaticPages />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <BannerSlider />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <SEOSettings />
                </TabPanel>
            </Container>
        </AdminLayout>
    );
};

export default ContentManagementPage;
