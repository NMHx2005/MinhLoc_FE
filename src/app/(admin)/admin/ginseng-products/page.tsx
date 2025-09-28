'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    Button,
} from '@mui/material';
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Spa as GinsengIcon,
    Inventory as ProductIcon,
    Category as CategoryIcon,
    LocationOn as OriginIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import GinsengProductList from '../../../../components/admin/GinsengProductList';
import GinsengCategories from '../../../../components/admin/GinsengCategories';
import GinsengOrigins from '../../../../components/admin/GinsengOrigins';

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
            id={`ginseng-tabpanel-${index}`}
            aria-labelledby={`ginseng-tab-${index}`}
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
        id: `ginseng-tab-${index}`,
        'aria-controls': `ginseng-tabpanel-${index}`,
    };
}

const GinsengProductsPage: React.FC = () => {
    const router = useRouter();
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleNavigateToCreate = () => {
        router.push('/admin/ginseng-products/create');
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
                        <GinsengIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Quản lý Sản phẩm Sâm
                    </Box>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        🌿 Quản lý Sản phẩm Sâm
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Quản lý danh sách sản phẩm sâm, phân loại và xuất xứ.
                    </Typography>

                    {/* Quick Actions */}
                    <Box sx={{ mb: 3 }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleNavigateToCreate}
                        >
                            Thêm Sản phẩm Mới
                        </Button>
                    </Box>
                </Box>

                {/* Tabs */}
                <Card sx={{ mb: 3 }}>
                    <CardContent sx={{ pb: 0 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="ginseng management tabs">
                                <Tab
                                    icon={<ProductIcon />}
                                    label="Danh sách Sản phẩm"
                                    {...a11yProps(0)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<CategoryIcon />}
                                    label="Phân loại Sâm"
                                    {...a11yProps(1)}
                                    sx={{ minHeight: 72 }}
                                />
                                <Tab
                                    icon={<OriginIcon />}
                                    label="Xuất xứ"
                                    {...a11yProps(2)}
                                    sx={{ minHeight: 72 }}
                                />
                            </Tabs>
                        </Box>
                    </CardContent>
                </Card>

                {/* Tab Panels */}
                <TabPanel value={value} index={0}>
                    <GinsengProductList />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <GinsengCategories />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <GinsengOrigins />
                </TabPanel>
            </Container>
        </AdminLayout>
    );
};

export default GinsengProductsPage;
