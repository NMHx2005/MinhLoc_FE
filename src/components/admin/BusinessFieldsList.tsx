'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    Chip,
    IconButton,
    Divider,
    Avatar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Snackbar,
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Business as BusinessIcon,
    Construction as ConstructionIcon,
    AccountBalance as FinanceIcon,
    HomeWork as RealEstateIcon,
    Star as StarIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    Delete,
    TrendingUp,
    Edit,
} from '@mui/icons-material';
import { businessFieldService } from '../../services/admin/businessFieldService';
import type { BusinessField, CreateBusinessFieldData, UpdateBusinessFieldData } from '../../services/admin/businessFieldService';
import ImageUpload from './ImageUpload';

// Remove duplicate interface - using imported type

const BusinessFieldsList: React.FC = () => {
    const router = useRouter();
    const [fields, setFields] = useState<BusinessField[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Load business fields on component mount
    useEffect(() => {
        loadBusinessFields();
    }, []);

    const loadBusinessFields = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await businessFieldService.getBusinessFields();
            console.log('API Response:', response); // Debug log

            // Handle API response structure: { success: true, data: { fields: [], pagination: {} } }
            if (response.success && response.data && response.data.fields) {
                setFields(Array.isArray(response.data.fields) ? response.data.fields : []);
            } else {
                // Fallback for different response structures
                const fieldsData = response.data || response || [];
                setFields(Array.isArray(fieldsData) ? fieldsData : []);
            }
        } catch (err) {
            console.error('Error loading business fields:', err);
            setError('Không thể tải danh sách lĩnh vực hoạt động');
            setFields([]); // Ensure fields is always an array
        } finally {
            setLoading(false);
        }
    };

    const getIconComponent = (icon: string) => {
        switch (icon) {
            case 'construction':
                return <ConstructionIcon />;
            case 'finance':
                return <FinanceIcon />;
            case 'real-estate':
                return <RealEstateIcon />;
            default:
                return <BusinessIcon />;
        }
    };

    // const getIconColor = (icon: string) => {
    //     switch (icon) {
    //         case 'construction':
    //             return 'warning';
    //         case 'finance':
    //             return 'success';
    //         case 'real-estate':
    //             return 'info';
    //         default:
    //             return 'primary';
    //     }
    // };

    const handleAddField = () => {
        router.push('/admin/business-fields/create');
    };

    const handleEditField = (field: BusinessField) => {
        router.push(`/admin/business-fields/edit/${field._id}`);
    };


    const handleDeleteField = async (fieldId: string) => {
        try {
            await businessFieldService.deleteBusinessField(fieldId);
            setSnackbarMessage('Xóa lĩnh vực hoạt động thành công!');
            setSnackbarOpen(true);
            loadBusinessFields(); // Reload data
        } catch (err) {
            console.error('Error deleting business field:', err);
            setSnackbarMessage('Có lỗi xảy ra khi xóa lĩnh vực hoạt động');
            setSnackbarOpen(true);
        }
    };

    const handleToggleStatus = async (fieldId: string) => {
        try {
            await businessFieldService.toggleStatus(fieldId);
            setSnackbarMessage('Cập nhật trạng thái lĩnh vực thành công!');
            setSnackbarOpen(true);
            loadBusinessFields(); // Reload data
        } catch (err) {
            console.error('Error toggling business field status:', err);
            setSnackbarMessage('Có lỗi xảy ra khi cập nhật trạng thái');
            setSnackbarOpen(true);
        }
    };



    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <Typography>Đang tải...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
                <Button variant="contained" onClick={loadBusinessFields}>
                    Thử lại
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Danh sách lĩnh vực hoạt động
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddField}
                >
                    Thêm lĩnh vực
                </Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <BusinessIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {Array.isArray(fields) ? fields.length : 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng lĩnh vực
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'success.main' }}>
                                    <CheckCircleOutlineIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {Array.isArray(fields) ? fields.filter(f => f.isActive).length : 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Đang hoạt động
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'info.main' }}>
                                    <TrendingUp />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {Array.isArray(fields) ? fields.reduce((sum, f) => sum + (parseInt(f.stats?.projects || '0') || 0), 0) : 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Dự án hoàn thành
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'warning.main' }}>
                                    <StarIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {Array.isArray(fields) && fields.length > 0
                                            ? Math.round(fields.reduce((sum, f) => sum + (parseInt(f.stats?.clients || '0') || 0), 0) / fields.length)
                                            : 0}%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Hài lòng TB
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Fields Grid */}
            <Grid container spacing={3}>
                {Array.isArray(fields) && fields.map((field) => (
                    <Grid item xs={12} md={6} lg={4} key={field._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: field.color,
                                                width: 50,
                                                height: 50,
                                                flexShrink: 0
                                            }}
                                        >
                                            {getIconComponent(field.icon)}
                                        </Avatar>
                                        <Box sx={{ minWidth: 0, flex: 1 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    wordBreak: 'break-word',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    mb: 0.5
                                                }}
                                            >
                                                {field.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    wordBreak: 'break-word',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {field.subtitle}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditField(field)}
                                            sx={{ p: 0.5 }}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleToggleStatus(field._id)}
                                            color={field.isActive ? 'warning' : 'success'}
                                            sx={{ p: 0.5 }}
                                        >
                                            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                                {field.isActive ? 'Tạm dừng' : 'Kích hoạt'}
                                            </Typography>
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteField(field._id)}
                                            color="error"
                                            sx={{ p: 0.5 }}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        maxHeight: '2.8rem', // 2 lines * 1.4 line-height
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        lineHeight: 1.4,
                                        wordBreak: 'break-word',
                                        whiteSpace: 'normal'
                                    }}
                                >
                                    {field.description && field.description.length > 150
                                        ? field.description.substring(0, 150) + '...'
                                        : field.description}
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                        Thống kê:
                                    </Typography>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                                <strong>Dự án:</strong> {field.stats?.projects || 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                                <strong>Kinh nghiệm:</strong> {field.stats?.experience || 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                                <strong>Diện tích:</strong> {field.stats?.area || 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                                <strong>Khách hàng:</strong> {field.stats?.clients || 'N/A'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                        Tính năng nổi bật:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {field.features && field.features.length > 0 ? field.features.slice(0, 3).map((feature, index) => (
                                            <Chip
                                                key={index}
                                                label={feature}
                                                size="small"
                                                variant="outlined"
                                                sx={{ fontSize: '0.7rem', height: 24 }}
                                            />
                                        )) : (
                                            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                Chưa có tính năng
                                            </Typography>
                                        )}
                                        {field.features && field.features.length > 3 && (
                                            <Chip
                                                label={`+${field.features.length - 3}`}
                                                size="small"
                                                sx={{ fontSize: '0.7rem', height: 24 }}
                                            />
                                        )}
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                        Dự án tiêu biểu:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {field.projects && field.projects.length > 0 ? field.projects.slice(0, 2).map((project, index) => (
                                            <Chip
                                                key={index}
                                                label={project.name}
                                                size="small"
                                                color="primary"
                                                sx={{ fontSize: '0.7rem', height: 24 }}
                                            />
                                        )) : (
                                            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                Chưa có dự án
                                            </Typography>
                                        )}
                                        {field.projects && field.projects.length > 2 && (
                                            <Chip
                                                label={`+${field.projects.length - 2}`}
                                                size="small"
                                                sx={{ fontSize: '0.7rem', height: 24 }}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default BusinessFieldsList;
