'use client'

import React, { useState } from 'react';
import {
    Box, Typography, Container, Breadcrumbs, Link, Tabs, Tab,
} from '@mui/material';
import {
    Home as HomeIcon, Dashboard as DashboardIcon, Settings as SettingsIcon,
    Business as GeneralIcon, Api as ApiIcon, Email as EmailIcon,
    Share as SocialIcon, Backup as BackupIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import GeneralSettings from '../../../../components/admin/GeneralSettings';
import APISettings from '../../../../components/admin/APISettings';
import EmailSettings from '../../../../components/admin/EmailSettings';
import SocialSettings from '../../../../components/admin/SocialSettings';
import BackupRestore from '../../../../components/admin/BackupRestore';

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

const SystemSettingsPage: React.FC = () => {
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
                        <SettingsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Cài đặt Hệ thống
                    </Box>
                </Breadcrumbs>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Cài đặt Hệ thống
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Quản lý cấu hình chung, API, email, mạng xã hội và sao lưu dữ liệu.
                    </Typography>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={value} onChange={handleChange} aria-label="system settings tabs">
                        <Tab label="Cấu hình chung" {...a11yProps(0)} icon={<GeneralIcon />} iconPosition="start" />
                        <Tab label="API Settings" {...a11yProps(1)} icon={<ApiIcon />} iconPosition="start" />
                        <Tab label="Email Settings" {...a11yProps(2)} icon={<EmailIcon />} iconPosition="start" />
                        <Tab label="Social Media" {...a11yProps(3)} icon={<SocialIcon />} iconPosition="start" />
                        <Tab label="Backup & Restore" {...a11yProps(4)} icon={<BackupIcon />} iconPosition="start" />
                    </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>
                    <GeneralSettings />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <APISettings />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <EmailSettings />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <SocialSettings />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <BackupRestore />
                </CustomTabPanel>
            </Container>
        </AdminLayout>
    );
};

export default SystemSettingsPage;
