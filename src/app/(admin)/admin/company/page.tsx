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
    Business as CompanyIcon,
    Info as GeneralIcon,
    History as HistoryIcon,
    Star as CompetitiveIcon,
    Group as SystemIcon,
    Handshake as PartnersIcon,
    Favorite as SocialIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import CompanyGeneralInfo from '../../../../components/admin/CompanyGeneralInfo';
import CompanyHistory from '../../../../components/admin/CompanyHistory';
import CompanyCompetitive from '../../../../components/admin/CompanyCompetitive';
import CompanySystem from '../../../../components/admin/CompanySystem';
import CompanyPartners from '../../../../components/admin/CompanyPartners';
import CompanySocial from '../../../../components/admin/CompanySocial';

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
            id={`company-tabpanel-${index}`}
            aria-labelledby={`company-tab-${index}`}
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
        id: `company-tab-${index}`,
        'aria-controls': `company-tabpanel-${index}`,
    };
}

const CompanyManagementPage: React.FC = () => {
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
                        <CompanyIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Quản lý Thông tin Công ty
                    </Box>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        🏢 Quản lý Thông tin Công ty
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Quản lý thông tin giới thiệu, lịch sử, năng lực cạnh tranh và các hoạt động của MinhLoc Group.
                    </Typography>
                </Box>

                {/* Tabs */}
                <Card sx={{ mb: 3 }}>
                    <CardContent sx={{ pb: 0 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="company management tabs">
                                <Tab
                                    icon={<GeneralIcon />}
                                    label="Thông tin chung"
                                    {...a11yProps(0)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<HistoryIcon />}
                                    label="Lịch sử hình thành"
                                    {...a11yProps(1)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<CompetitiveIcon />}
                                    label="Năng lực cạnh tranh"
                                    {...a11yProps(2)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<SystemIcon />}
                                    label="Hệ thống MinhLoc"
                                    {...a11yProps(3)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<PartnersIcon />}
                                    label="Đối tác"
                                    {...a11yProps(4)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<SocialIcon />}
                                    label="Hoạt động xã hội"
                                    {...a11yProps(5)}
                                    sx={{ minHeight: 72 }}
                                />
                            </Tabs>
                        </Box>
                    </CardContent>
                </Card>

                {/* Tab Panels */}
                <TabPanel value={value} index={0}>
                    <CompanyGeneralInfo />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CompanyHistory />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CompanyCompetitive />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <CompanySystem />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <CompanyPartners />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <CompanySocial />
                </TabPanel>
            </Container>
        </AdminLayout>
    );
};

export default CompanyManagementPage;
