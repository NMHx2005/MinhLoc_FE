'use client'

import React, { useState } from 'react';
import {
    Box, Typography, Container, Breadcrumbs, Link, Tabs, Tab,
} from '@mui/material';
import {
    Home as HomeIcon, Dashboard as DashboardIcon, ContactMail as ContactIcon,
    Inbox as InboxIcon, Email as NewsletterIcon, RecordVoiceOver as ConsultationIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import InboxManagement from '../../../../components/admin/InboxManagement';
import NewsletterManagement from '../../../../components/admin/NewsletterManagement';
import ConsultationRequests from '../../../../components/admin/ConsultationRequests';

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

const ContactManagementPage: React.FC = () => {
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
                        <ContactIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Quản lý Liên hệ
                    </Box>
                </Breadcrumbs>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Quản lý Liên hệ
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Quản lý inbox liên hệ, đăng ký nhận tin và yêu cầu tư vấn từ website.
                    </Typography>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={value} onChange={handleChange} aria-label="contact management tabs">
                        <Tab label="Inbox Liên hệ" {...a11yProps(0)} icon={<InboxIcon />} iconPosition="start" />
                        <Tab label="Đăng ký nhận tin" {...a11yProps(1)} icon={<NewsletterIcon />} iconPosition="start" />
                        <Tab label="Yêu cầu tư vấn" {...a11yProps(2)} icon={<ConsultationIcon />} iconPosition="start" />
                    </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>
                    <InboxManagement />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <NewsletterManagement />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <ConsultationRequests />
                </CustomTabPanel>
            </Container>
        </AdminLayout>
    );
};

export default ContactManagementPage;
