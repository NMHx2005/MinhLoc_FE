'use client'

import React from 'react';
import {
    Box,
    Typography,
    Container,
    Breadcrumbs,
    Link,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Business as BusinessIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import ProjectFilters from '../../../../components/admin/ProjectFilters';
import ProjectList from '../../../../components/admin/ProjectList';
import { useProjects, useProjectStats } from '../../../../hooks/useProjects';
import type { Project, ProjectFilters as ProjectFiltersType } from '../../../../services/admin/projectService';

const ProjectsPage: React.FC = () => {
    const {
        projects,
        loading,
        error,
        total,
        page,
        limit,
        filters,
        setPage,
        setLimit,
        deleteProject,
        updateFilters,
    } = useProjects();

    const { stats, loading: statsLoading } = useProjectStats();


    const handleFilterChange = (newFilters: {
        search: string;
        type: string;
        status: string;
        city: string;
        district: string;
        minPrice: string;
        maxPrice: string;
        minArea: string;
        maxArea: string;
    }) => {
        // Convert string values to numbers for price and area filters
        const convertedFilters: ProjectFiltersType = {
            ...newFilters,
            minPrice: newFilters.minPrice ? parseFloat(String(newFilters.minPrice)) : undefined,
            maxPrice: newFilters.maxPrice ? parseFloat(String(newFilters.maxPrice)) : undefined,
            minArea: newFilters.minArea ? parseFloat(String(newFilters.minArea)) : undefined,
            maxArea: newFilters.maxArea ? parseFloat(String(newFilters.maxArea)) : undefined,
        };
        updateFilters(convertedFilters);
    };

    const handleAddProject = () => {
        window.location.href = '/admin/projects/create';
    };

    const handleEditProject = (project: Project) => {
        window.location.href = `/admin/projects/edit/${project._id}`;
    };



    const handleDeleteProject = async (projectId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
            try {
                await deleteProject(projectId);
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };


    const getFilterSummary = () => {
        const activeFilters = [];
        if (filters.search) activeFilters.push(`Tìm kiếm: "${filters.search}"`);
        if (filters.type) activeFilters.push(`Loại: ${filters.type}`);
        if (filters.status) activeFilters.push(`Trạng thái: ${filters.status}`);
        if (filters.location) activeFilters.push(`Vị trí: ${filters.location}`);
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

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {/* Project List */}
                <Box sx={{ mb: 4 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <ProjectList
                            projects={projects}
                            loading={loading}
                            onEditProject={handleEditProject}
                            onDeleteProject={handleDeleteProject}
                            onAddProject={handleAddProject}
                            total={total}
                            page={page}
                            limit={limit}
                            onPageChange={setPage}
                            onLimitChange={setLimit}
                        />
                    )}
                </Box>

                {/* Quick Stats */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Thống kê Nhanh
                    </Typography>
                    {statsLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                            <Box sx={{ p: 3, backgroundColor: '#e8f5e8', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                                    {stats.total}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tổng dự án
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3, backgroundColor: '#e3f2fd', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                                    {stats.construction}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Đang xây dựng
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3, backgroundColor: '#fff3e0', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                                    {stats.planning}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Đang lên kế hoạch
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3, backgroundColor: '#ffebee', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                                    {stats.soldOut}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Đã bán hết
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Container>

        </AdminLayout>
    );
};

export default ProjectsPage;
