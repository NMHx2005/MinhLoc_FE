'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Typography,
    Button,
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
    Add as AddIcon,
} from '@mui/icons-material';
import { useProjects } from '../../../../../hooks/useProjects';
import AdminLayout from '../../../../../components/admin/AdminLayout';
import ProjectCreateForm from '../../../../../components/admin/ProjectCreateForm';
import type { CreateProjectData } from '../../../../../services/admin/projectService';

const CreateProjectPage: React.FC = () => {
    const router = useRouter();
    const { createProject } = useProjects();
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const handleSave = async (data: CreateProjectData) => {
        try {
            setSaving(true);
            setSaveError(null);
            const newProject = await createProject(data);
            router.push(`/admin/projects/${newProject._id}`);
        } catch (err) {
            setSaveError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo dự án');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        router.push('/admin/projects');
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
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/admin/projects"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <BusinessIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Dự án
                    </Link>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AddIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Tạo mới
                    </Box>
                </Breadcrumbs>

                {/* Header */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        mb: 4,
                        background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
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
                            Tạo dự án mới
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                            Thêm dự án bất động sản mới vào hệ thống
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
                <ProjectCreateForm
                    onSave={handleSave}
                    onCancel={handleCancel}
                    saving={saving}
                />
            </Container>
        </AdminLayout>
    );
};

export default CreateProjectPage;
