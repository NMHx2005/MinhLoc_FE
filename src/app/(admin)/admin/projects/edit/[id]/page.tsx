'use client'

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Container,
    Breadcrumbs,
    Link,
    Paper,
    Fade,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Business as BusinessIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import { useProject } from '../../../../../../hooks/useProjects';
import AdminLayout from '../../../../../../components/admin/AdminLayout';
import ProjectEditForm from '../../../../../../components/admin/ProjectEditForm';
import type { UpdateProjectData } from '../../../../../../services/admin/projectService';

const EditProjectPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;

    const { project, loading, error, updateProject } = useProject(projectId);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const handleSave = async (data: UpdateProjectData) => {
        try {
            setSaving(true);
            // Debug: Log data being sent
            console.warn('Sending project data:', data);
            setSaveError(null);
            await updateProject(data);
            router.push(`/admin/projects/${projectId}`);
        } catch (err) {
            setSaveError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi lưu dự án');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        router.push(`/admin/projects/${projectId}`);
    };

    if (loading) {
        return (
            <AdminLayout>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress size={60} />
                            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                                Đang tải thông tin dự án...
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </AdminLayout>
        );
    }

    if (error || !project) {
        return (
            <AdminLayout>
                <Container maxWidth="xl">
                    <Box sx={{ p: 3 }}>
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error || 'Không tìm thấy dự án'}
                        </Alert>
                        <Button
                            variant="contained"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => router.back()}
                        >
                            Quay lại
                        </Button>
                    </Box>
                </Container>
            </AdminLayout>
        );
    }

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
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/admin/projects"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <BusinessIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Dự án
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href={`/admin/projects/${project._id}`}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <EditIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {project.name}
                    </Link>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EditIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Chỉnh sửa
                    </Box>
                </Breadcrumbs>

                {/* Header */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        mb: 4,
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                        color: 'white',
                        borderRadius: 3,
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '200px',
                            height: '200px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '50%',
                            transform: 'translate(100px, -100px)'
                        }
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                onClick={handleCancel}
                                sx={{
                                    mr: 2,
                                    borderColor: 'rgba(255,255,255,0.5)',
                                    color: 'white',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                Quay lại
                            </Button>
                        </Box>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Chỉnh sửa dự án
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                            {project.name}
                        </Typography>
                    </Box>
                </Paper>

                {/* Error Alert */}
                {saveError && (
                    <Fade in={true}>
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {saveError}
                        </Alert>
                    </Fade>
                )}

                {/* Form */}
                <ProjectEditForm
                    project={project}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    saving={saving}
                />
            </Container>
        </AdminLayout>
    );
};

export default EditProjectPage;
