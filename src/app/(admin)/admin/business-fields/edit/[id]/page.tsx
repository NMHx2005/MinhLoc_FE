'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Alert,
    Snackbar,
    IconButton,
    Chip,
    Divider,
    CircularProgress,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { businessFieldService, type UpdateBusinessFieldData } from '@/services/admin/businessFieldService';

const EditBusinessFieldPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const fieldId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<UpdateBusinessFieldData>({
        name: '',
        subtitle: '',
        description: '',
        image: '',
        icon: 'construction',
        color: '#E7C873',
        features: [],
        projects: [],
        stats: {
            projects: '',
            area: '',
            experience: '',
            return: '',
            clients: '',
            properties: '',
        },
        sortOrder: 1,
        isActive: true,
    });

    const [newFeature, setNewFeature] = useState('');
    const [newProject, setNewProject] = useState<{
        name: string;
        scale: string;
        status: 'completed' | 'in_progress' | 'planning' | 'sold_out' | 'coming_soon';
        description: string;
        image: string;
    }>({
        name: '',
        scale: '',
        status: 'planning',
        description: '',
        image: '',
    });

    const loadBusinessField = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await businessFieldService.getBusinessFieldById(fieldId);
            const field = response.data || response;

            setFormData({
                name: field.name || '',
                subtitle: field.subtitle || '',
                description: field.description || '',
                image: field.image || '',
                icon: field.icon || 'construction',
                color: field.color || '#E7C873',
                features: field.features || [],
                projects: field.projects || [],
                stats: field.stats || {
                    projects: '',
                    area: '',
                    experience: '',
                    return: '',
                    clients: '',
                    properties: '',
                },
                sortOrder: field.sortOrder || 1,
                isActive: field.isActive !== undefined ? field.isActive : true,
            });
        } catch (err: unknown) {
            console.error('Error loading business field:', err);
            setError('Không thể tải thông tin lĩnh vực hoạt động');
        } finally {
            setLoading(false);
        }
    }, [fieldId]);

    useEffect(() => {
        if (fieldId) {
            loadBusinessField();
        }
    }, [fieldId, loadBusinessField]);

    const handleInputChange = (field: string, value: string | number | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleStatsChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                [field]: value
            }
        }));
    };

    const handleAddFeature = () => {
        if (newFeature.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...(prev.features || []), newFeature.trim()]
            }));
            setNewFeature('');
        }
    };

    const handleRemoveFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: (prev.features || []).filter((_, i) => i !== index)
        }));
    };

    const handleAddProject = () => {
        if (newProject.name.trim() && newProject.scale.trim()) {
            const projectToAdd = {
                name: newProject.name.trim(),
                scale: newProject.scale.trim(),
                status: newProject.status,
                description: newProject.description?.trim() || '',
                image: newProject.image?.trim() || '',
            };

            setFormData(prev => ({
                ...prev,
                projects: [...(prev.projects || []), projectToAdd]
            }));
            setNewProject({
                name: '',
                scale: '',
                status: 'planning',
                description: '',
                image: '',
            });
        }
    };

    const handleRemoveProject = (index: number) => {
        setFormData(prev => ({
            ...prev,
            projects: (prev.projects || []).filter((_, i) => i !== index)
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError(null);

            // Validation
            if (!formData.name?.trim()) {
                setError('Tên lĩnh vực là bắt buộc');
                return;
            }

            if (!formData.description?.trim() || formData.description.length < 100) {
                setError('Mô tả phải có ít nhất 100 ký tự');
                return;
            }

            if (!formData.image?.trim()) {
                setError('Hình ảnh là bắt buộc');
                return;
            }

            // Clean and validate projects data
            const cleanedProjects = (formData.projects || []).map(project => ({
                name: project.name?.trim() || '',
                scale: project.scale?.trim() || '',
                status: project.status || 'planning',
                description: project.description?.trim() || '',
                image: project.image?.trim() || '',
            })).filter(project => project.name && project.scale);

            const dataToSave = {
                ...formData,
                projects: cleanedProjects
            };

            // console.log('Data to update:', dataToSave); // Debug log

            await businessFieldService.updateBusinessField(fieldId, dataToSave);

            setSnackbarMessage('Cập nhật lĩnh vực hoạt động thành công!');
            setSnackbarOpen(true);

            // Redirect to business fields list
            setTimeout(() => {
                router.push('/admin/business-fields');
            }, 1500);

        } catch (err: unknown) {
            console.error('Error updating business field:', err);
            const errorMessage = err instanceof Error && 'response' in err
                ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
                : 'Có lỗi xảy ra khi cập nhật lĩnh vực hoạt động';
            setError(errorMessage || 'Có lỗi xảy ra khi cập nhật lĩnh vực hoạt động');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <Box sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton
                        onClick={() => router.back()}
                        sx={{ mr: 2 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        Chỉnh sửa lĩnh vực hoạt động
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {/* Basic Information */}
                    <Grid item xs={12} lg={8}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                    Thông tin cơ bản
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Tên lĩnh vực"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            required
                                            helperText="Tên lĩnh vực là bắt buộc"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Tiêu đề phụ"
                                            value={formData.subtitle}
                                            onChange={(e) => handleInputChange('subtitle', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Mô tả"
                                            multiline
                                            rows={4}
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            required
                                            helperText={`Mô tả phải có ít nhất 100 ký tự (${formData.description?.length || 0}/100)`}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ImageUpload
                                            value={formData.image || ''}
                                            onChange={(url) => handleInputChange('image', url)}
                                            label="Hình ảnh lĩnh vực"
                                            required
                                            helperText="URL hình ảnh phải hợp lệ (jpg, jpeg, png, gif, webp)"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                    Tính năng nổi bật
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Thêm tính năng"
                                        value={newFeature}
                                        onChange={(e) => setNewFeature(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                                    />
                                    <Button
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={handleAddFeature}
                                        disabled={!newFeature.trim()}
                                    >
                                        Thêm
                                    </Button>
                                </Box>

                                {formData.features && formData.features.length > 0 && (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {formData.features.map((feature, index) => (
                                            <Chip
                                                key={index}
                                                label={feature}
                                                onDelete={() => handleRemoveFeature(index)}
                                                deleteIcon={<DeleteIcon />}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </CardContent>
                        </Card>

                        {/* Projects */}
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                    Dự án tiêu biểu
                                </Typography>

                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Tên dự án"
                                            value={newProject.name}
                                            onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Quy mô"
                                            value={newProject.scale}
                                            onChange={(e) => setNewProject(prev => ({ ...prev, scale: e.target.value }))}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Trạng thái</InputLabel>
                                            <Select
                                                value={newProject.status}
                                                onChange={(e) => setNewProject(prev => ({ ...prev, status: e.target.value as typeof prev.status }))}
                                            >
                                                <MenuItem value="planning">Đang lập kế hoạch</MenuItem>
                                                <MenuItem value="in_progress">Đang thi công</MenuItem>
                                                <MenuItem value="completed">Hoàn thành</MenuItem>
                                                <MenuItem value="sold_out">Đã bán hết</MenuItem>
                                                <MenuItem value="coming_soon">Sắp mở bán</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Hình ảnh dự án"
                                            value={newProject.image}
                                            onChange={(e) => setNewProject(prev => ({ ...prev, image: e.target.value }))}
                                            placeholder="URL hình ảnh dự án"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Mô tả dự án"
                                            multiline
                                            rows={2}
                                            value={newProject.description}
                                            onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="Mô tả dự án"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<AddIcon />}
                                            onClick={handleAddProject}
                                            disabled={!newProject.name.trim() || !newProject.scale.trim()}
                                        >
                                            Thêm dự án
                                        </Button>
                                    </Grid>
                                </Grid>

                                {formData.projects && formData.projects.length > 0 && (
                                    <Box>
                                        <Divider sx={{ mb: 2 }} />
                                        {formData.projects.map((project, index) => (
                                            <Box key={index} sx={{ border: 1, borderColor: 'divider', p: 2, borderRadius: 1, mb: 2 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                            {project.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Quy mô: {project.scale}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Trạng thái: {
                                                                project.status === 'planning' ? 'Đang lập kế hoạch' :
                                                                    project.status === 'in_progress' ? 'Đang thi công' :
                                                                        project.status === 'completed' ? 'Hoàn thành' :
                                                                            project.status === 'sold_out' ? 'Đã bán hết' :
                                                                                'Sắp mở bán'
                                                            }
                                                        </Typography>
                                                        {project.description && (
                                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                                {project.description}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                    <IconButton
                                                        onClick={() => handleRemoveProject(index)}
                                                        color="error"
                                                        size="small"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} lg={4}>
                        {/* Settings */}
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                    Cài đặt
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel>Icon</InputLabel>
                                            <Select
                                                value={formData.icon}
                                                onChange={(e) => handleInputChange('icon', e.target.value)}
                                            >
                                                <MenuItem value="construction">Xây dựng</MenuItem>
                                                <MenuItem value="finance">Tài chính</MenuItem>
                                                <MenuItem value="real-estate">Bất động sản</MenuItem>
                                                <MenuItem value="investment">Đầu tư</MenuItem>
                                                <MenuItem value="consulting">Tư vấn</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Màu sắc"
                                            value={formData.color}
                                            onChange={(e) => handleInputChange('color', e.target.value)}
                                            placeholder="#E7C873"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Thứ tự sắp xếp"
                                            type="number"
                                            value={formData.sortOrder}
                                            onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 1)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={formData.isActive}
                                                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                                />
                                            }
                                            label="Hoạt động"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Stats */}
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                    Thống kê
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Số dự án"
                                            value={formData.stats?.projects || ''}
                                            onChange={(e) => handleStatsChange('projects', e.target.value)}
                                            placeholder="VD: 150+"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Diện tích"
                                            value={formData.stats?.area || ''}
                                            onChange={(e) => handleStatsChange('area', e.target.value)}
                                            placeholder="VD: 1000ha"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Kinh nghiệm"
                                            value={formData.stats?.experience || ''}
                                            onChange={(e) => handleStatsChange('experience', e.target.value)}
                                            placeholder="VD: 15+ năm"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Lợi nhuận"
                                            value={formData.stats?.return || ''}
                                            onChange={(e) => handleStatsChange('return', e.target.value)}
                                            placeholder="VD: 12-15%"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Khách hàng"
                                            value={formData.stats?.clients || ''}
                                            onChange={(e) => handleStatsChange('clients', e.target.value)}
                                            placeholder="VD: 1000+"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Bất động sản"
                                            value={formData.stats?.properties || ''}
                                            onChange={(e) => handleStatsChange('properties', e.target.value)}
                                            placeholder="VD: 500+"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => router.back()}
                                        disabled={saving}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        onClick={handleSave}
                                        disabled={saving}
                                    >
                                        {saving ? 'Đang lưu...' : 'Cập nhật'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                />
            </Box>
        </AdminLayout>
    );
};

export default EditBusinessFieldPage;
