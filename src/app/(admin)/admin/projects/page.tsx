'use client'

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Breadcrumbs,
    Link,
    Alert,
} from '@mui/material';
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Business as BusinessIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import ProjectFilters from '../../../../components/admin/ProjectFilters';
import ProjectList from '../../../../components/admin/ProjectList';
import ProjectForm from '../../../../components/admin/ProjectForm';

interface FilterState {
    search: string;
    type: string;
    status: string;
    city: string;
    district: string;
    minPrice: string;
    maxPrice: string;
    minArea: string;
    maxArea: string;
}

const ProjectsPage: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        type: 'all',
        status: 'all',
        city: 'all',
        district: 'all',
        minPrice: '',
        maxPrice: '',
        minArea: '',
        maxArea: '',
    });
    const [formOpen, setFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        console.log('Filters applied:', newFilters);
    };

    const handleAddProject = () => {
        setFormMode('create');
        setSelectedProject(null);
        setFormOpen(true);
    };

    const handleEditProject = (project: any) => {
        setFormMode('edit');
        setSelectedProject(project);
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setSelectedProject(null);
    };

    const getFilterSummary = () => {
        const activeFilters = [];
        if (filters.search) activeFilters.push(`Tìm kiếm: "${filters.search}"`);
        if (filters.type !== 'all') activeFilters.push(`Loại: ${filters.type}`);
        if (filters.status !== 'all') activeFilters.push(`Trạng thái: ${filters.status}`);
        if (filters.city !== 'all') activeFilters.push(`Thành phố: ${filters.city}`);
        if (filters.district !== 'all') activeFilters.push(`Quận: ${filters.district}`);
        if (filters.minPrice || filters.maxPrice) {
            const priceRange = `${filters.minPrice || '0'} - ${filters.maxPrice || '∞'} tỷ`;
            activeFilters.push(`Giá: ${priceRange}`);
        }
        if (filters.minArea || filters.maxArea) {
            const areaRange = `${filters.minArea || '0'} - ${filters.maxArea || '∞'} m²`;
            activeFilters.push(`Diện tích: ${areaRange}`);
        }
        return activeFilters;
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
                        Quản lý Dự án
                    </Box>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Quản lý Dự án Bất động sản
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Quản lý danh sách dự án, thêm/sửa thông tin dự án và theo dõi trạng thái bán hàng.
                    </Typography>
                </Box>

                {/* Filters */}
                <Box sx={{ mb: 4 }}>
                    <ProjectFilters onFilterChange={handleFilterChange} />
                </Box>

                {/* Filter Summary */}
                {getFilterSummary().length > 0 && (
                    <Alert severity="info" sx={{ mb: 3 }}>
                        <Typography variant="body2">
                            <strong>Bộ lọc đang áp dụng:</strong> {getFilterSummary().join(', ')}
                        </Typography>
                    </Alert>
                )}

                {/* Project List */}
                <Box sx={{ mb: 4 }}>
                    <ProjectList
                        onEditProject={handleEditProject}
                        onAddProject={handleAddProject}
                    />
                </Box>

                {/* Project Form Dialog */}
                <ProjectForm
                    open={formOpen}
                    onClose={handleFormClose}
                    project={selectedProject}
                    mode={formMode}
                />

                {/* Quick Stats */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Thống kê Nhanh
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                        <Box sx={{ p: 3, backgroundColor: '#e8f5e8', borderRadius: 2, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                                24
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tổng dự án
                            </Typography>
                        </Box>
                        <Box sx={{ p: 3, backgroundColor: '#e3f2fd', borderRadius: 2, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                                18
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Đang bán
                            </Typography>
                        </Box>
                        <Box sx={{ p: 3, backgroundColor: '#fff3e0', borderRadius: 2, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                                4
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Sắp mở bán
                            </Typography>
                        </Box>
                        <Box sx={{ p: 3, backgroundColor: '#ffebee', borderRadius: 2, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                                2
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Đã bán
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </AdminLayout>
    );
};

export default ProjectsPage;
