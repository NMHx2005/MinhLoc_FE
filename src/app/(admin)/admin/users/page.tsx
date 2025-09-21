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
    People as UsersIcon,
    Person as CustomerIcon,
    Security as RoleIcon,
    History as ActivityIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import CustomerList from '../../../../components/admin/CustomerList';
import UserRoles from '../../../../components/admin/UserRoles';
import ActivityLogs from '../../../../components/admin/ActivityLogs';

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
            id={`users-tabpanel-${index}`}
            aria-labelledby={`users-tab-${index}`}
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
        id: `users-tab-${index}`,
        'aria-controls': `users-tabpanel-${index}`,
    };
}

const UserManagementPage: React.FC = () => {
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
                        <UsersIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Quản lý Người dùng
                    </Box>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        👥 Quản lý Người dùng
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Quản lý khách hàng, phân quyền người dùng và theo dõi hoạt động.
                    </Typography>
                </Box>

                {/* Tabs */}
                <Card sx={{ mb: 3 }}>
                    <CardContent sx={{ pb: 0 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="user management tabs">
                                <Tab
                                    icon={<CustomerIcon />}
                                    label="Danh sách Khách hàng"
                                    {...a11yProps(0)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<RoleIcon />}
                                    label="Phân quyền"
                                    {...a11yProps(1)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<ActivityIcon />}
                                    label="Lịch sử hoạt động"
                                    {...a11yProps(2)}
                                    sx={{ minHeight: 72 }}
                                />
                            </Tabs>
                        </Box>
                    </CardContent>
                </Card>

                {/* Tab Panels */}
                <TabPanel value={value} index={0}>
                    <CustomerList />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserRoles />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ActivityLogs />
                </TabPanel>
            </Container>
        </AdminLayout>
    );
};

export default UserManagementPage;
