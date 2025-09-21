'use client'

import React, { useState } from 'react';
import {
    Box, Typography, Container, Breadcrumbs, Link, Tabs, Tab,
} from '@mui/material';
import {
    Home as HomeIcon, Dashboard as DashboardIcon, Assessment as ReportsIcon,
    Business as ProjectIcon, Traffic as TrafficIcon, Leaderboard as LeadIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import ProjectReports from '../../../../components/admin/ProjectReports';
import TrafficReports from '../../../../components/admin/TrafficReports';
import LeadReports from '../../../../components/admin/LeadReports';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ReportsPage: React.FC = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <AdminLayout>
            <Container maxWidth="xl">
                <Breadcrumbs sx={{ mb: 3 }}>
                    <Link underline="hover" color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Trang chủ
                    </Link>
                    <Link underline="hover" color="inherit" href="/admin" sx={{ display: 'flex', alignItems: 'center' }}>
                        <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Dashboard
                    </Link>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ReportsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Báo cáo & Thống kê
                    </Box>
                </Breadcrumbs>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Báo cáo & Thống kê
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Theo dõi hiệu suất kinh doanh, traffic website và chuyển đổi lead.
                    </Typography>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={value} onChange={handleChange} aria-label="reports tabs">
                        <Tab label="Báo cáo Dự án" {...a11yProps(0)} icon={<ProjectIcon />} iconPosition="start" />
                        <Tab label="Báo cáo Traffic" {...a11yProps(1)} icon={<TrafficIcon />} iconPosition="start" />
                        <Tab label="Báo cáo Lead" {...a11yProps(2)} icon={<LeadIcon />} iconPosition="start" />
                    </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>
                    <ProjectReports />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <TrafficReports />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <LeadReports />
                </CustomTabPanel>
            </Container>
        </AdminLayout>
    );
};

export default ReportsPage;
