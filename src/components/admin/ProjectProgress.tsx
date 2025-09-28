'use client';

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Tooltip,
    IconButton,
    Grid,
} from '@mui/material';
import CustomProgressBar from './CustomProgressBar';
import {
    Refresh as RefreshIcon,
    Construction as ConstructionIcon,
    AssignmentTurnedIn as CompletedIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useProjectProgress } from '../../hooks/useDashboard';

const ProjectProgress: React.FC = () => {
    const { data: progressData, loading, error, refetch } = useProjectProgress();

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'success';
            case 'construction':
                return 'warning';
            case 'planning':
                return 'info';
            default:
                return 'default';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <CompletedIcon />;
            case 'construction':
                return <ConstructionIcon />;
            case 'planning':
                return <ScheduleIcon />;
            default:
                return <ScheduleIcon />;
        }
    };

    if (loading) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>🏗️ Tiến độ dự án</Typography>
                    <CustomProgressBar value={0} animated={false} />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="error" variant="body1">
                        {error}
                    </Typography>
                    <Tooltip title="Thử lại">
                        <IconButton onClick={refetch} sx={{ mt: 1 }}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </CardContent>
            </Card>
        );
    }

    // Calculate summary stats
    const totalProjects = progressData.length;
    const completedProjects = progressData.filter(p => p.status === 'completed').length;
    const inProgressProjects = progressData.filter(p => p.status === 'construction').length;
    const avgProgress = totalProjects > 0 ? progressData.reduce((sum, p) => sum + p.progress, 0) / totalProjects : 0;

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">🏗️ Tiến độ dự án</Typography>
                    <Tooltip title="Làm mới dữ liệu">
                        <IconButton onClick={refetch} size="small">
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Summary Stats */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={3}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
                            <Typography variant="h6" color="primary">
                                {totalProjects}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Tổng dự án
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
                            <Typography variant="h6" color="success.main">
                                {completedProjects}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Hoàn thành
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.50', borderRadius: 1 }}>
                            <Typography variant="h6" color="warning.main">
                                {inProgressProjects}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Đang thi công
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.50', borderRadius: 1 }}>
                            <Typography variant="h6" color="info.main">
                                {avgProgress.toFixed(1)}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                TB tiến độ
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Project List */}
                <List>
                    {progressData.map((project, index) => (
                        <ListItem
                            key={project.projectId}
                            sx={{
                                bgcolor: index % 2 === 0 ? 'grey.50' : 'transparent',
                                borderRadius: 1,
                                mb: 1,
                            }}
                        >
                            <ListItemIcon>
                                <Avatar sx={{ bgcolor: `${getStatusColor(project.status)}.main` }}>
                                    {getStatusIcon(project.status)}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                {project.projectName}
                                            </Typography>
                                            <Chip
                                                label={project.status}
                                                size="small"
                                                color={getStatusColor(project.status)}
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Tiến độ: {project.progress}%
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Hoàn thành: {new Date(project.completionDate).toLocaleDateString('vi-VN')}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <CustomProgressBar
                                                value={project.progress}
                                                height={6}
                                                color={
                                                    project.progress === 100 ? '#4caf50' :
                                                        project.progress >= 75 ? '#2196f3' :
                                                            project.progress >= 50 ? '#ff9800' : '#f44336'
                                                }
                                                backgroundColor="rgba(0,0,0,0.1)"
                                                borderRadius={3}
                                                percentagePosition="right"
                                                animated={true}
                                            />
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Trạng thái: {project.status}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>

                {progressData.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <ConstructionIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                        <Typography variant="body1" color="text.secondary">
                            Không có dự án nào
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ProjectProgress;
