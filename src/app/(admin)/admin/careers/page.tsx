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
    Work as CareersIcon,
    Assignment as JobIcon,
    People as ApplicationIcon,
    Business as DepartmentIcon,
    CardGiftcard as BenefitsIcon,
    Timeline as ProcessIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import JobPositionsManagement from '../../../../components/admin/JobPositionsManagement';
import JobApplicationsManagement from '../../../../components/admin/JobApplicationsManagement';
import DepartmentsManagement from '../../../../components/admin/DepartmentsManagement';
import BenefitsManagement from '../../../../components/admin/BenefitsManagement';
import RecruitmentProcess from '../../../../components/admin/RecruitmentProcess';

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
            id={`careers-tabpanel-${index}`}
            aria-labelledby={`careers-tab-${index}`}
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
        id: `careers-tab-${index}`,
        'aria-controls': `careers-tabpanel-${index}`,
    };
}

const CareersManagementPage: React.FC = () => {
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
                        <CareersIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Quản lý Tuyển dụng
                    </Box>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        💼 Quản lý Tuyển dụng
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Quản lý vị trí tuyển dụng, hồ sơ ứng viên, phòng ban và quy trình tuyển dụng.
                    </Typography>
                </Box>

                {/* Tabs */}
                <Card sx={{ mb: 3 }}>
                    <CardContent sx={{ pb: 0 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="careers management tabs">
                                <Tab
                                    icon={<JobIcon />}
                                    label="Vị trí tuyển dụng"
                                    {...a11yProps(0)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<ApplicationIcon />}
                                    label="Hồ sơ ứng viên"
                                    {...a11yProps(1)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<DepartmentIcon />}
                                    label="Phòng ban"
                                    {...a11yProps(2)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<BenefitsIcon />}
                                    label="Phúc lợi"
                                    {...a11yProps(3)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<ProcessIcon />}
                                    label="Quy trình tuyển dụng"
                                    {...a11yProps(4)}
                                    sx={{ minHeight: 72 }}
                                />
                            </Tabs>
                        </Box>
                    </CardContent>
                </Card>

                {/* Tab Panels */}
                <TabPanel value={value} index={0}>
                    <JobPositionsManagement />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <JobApplicationsManagement />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <DepartmentsManagement />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <BenefitsManagement />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <RecruitmentProcess />
                </TabPanel>
            </Container>
        </AdminLayout>
    );
};

export default CareersManagementPage;
