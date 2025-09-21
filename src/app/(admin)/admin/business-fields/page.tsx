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
    Business as BusinessIcon,
    Construction as ConstructionIcon,
    AccountBalance as FinanceIcon,
    HomeWork as RealEstateIcon,
    Settings as SettingsIcon,
    Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import BusinessFieldsList from '../../../../components/admin/BusinessFieldsList';
import ConstructionField from '../../../../components/admin/ConstructionField';
import FinanceField from '../../../../components/admin/FinanceField';
import RealEstateField from '../../../../components/admin/RealEstateField';
import FieldSettings from '../../../../components/admin/FieldSettings';
import FieldAnalytics from '../../../../components/admin/FieldAnalytics';

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
            id={`business-fields-tabpanel-${index}`}
            aria-labelledby={`business-fields-tab-${index}`}
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
        id: `business-fields-tab-${index}`,
        'aria-controls': `business-fields-tabpanel-${index}`,
    };
}

const BusinessFieldsManagementPage: React.FC = () => {
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
                        <BusinessIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Quản lý Lĩnh vực Hoạt động
                    </Box>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        🏗️ Quản lý Lĩnh vực Hoạt động
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Quản lý các lĩnh vực kinh doanh chính: Xây dựng, Đầu tư Tài chính, Bất động sản.
                    </Typography>
                </Box>

                {/* Tabs */}
                <Card sx={{ mb: 3 }}>
                    <CardContent sx={{ pb: 0 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="business fields management tabs">
                                <Tab
                                    icon={<BusinessIcon />}
                                    label="Danh sách lĩnh vực"
                                    {...a11yProps(0)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<ConstructionIcon />}
                                    label="Xây dựng"
                                    {...a11yProps(1)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<FinanceIcon />}
                                    label="Đầu tư Tài chính"
                                    {...a11yProps(2)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<RealEstateIcon />}
                                    label="Bất động sản"
                                    {...a11yProps(3)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<SettingsIcon />}
                                    label="Cài đặt"
                                    {...a11yProps(4)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<AnalyticsIcon />}
                                    label="Phân tích"
                                    {...a11yProps(5)}
                                    sx={{ minHeight: 72 }}
                                />
                            </Tabs>
                        </Box>
                    </CardContent>
                </Card>

                {/* Tab Panels */}
                <TabPanel value={value} index={0}>
                    <BusinessFieldsList />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ConstructionField />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <FinanceField />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <RealEstateField />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <FieldSettings />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <FieldAnalytics />
                </TabPanel>
            </Container>
        </AdminLayout>
    );
};

export default BusinessFieldsManagementPage;
