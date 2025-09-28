'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Chip,
    Box,
    Typography,
    IconButton,
    Alert,
    CircularProgress,
    Paper,
    LinearProgress,
    Snackbar,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Close as CloseIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    CloudUpload as UploadIcon,
} from '@mui/icons-material';
import { useProjectTypes } from '../../hooks/useProjects';
import type { Project, CreateProjectData, UpdateProjectData } from '../../services/admin/projectService';
import { uploadClient } from '../../services/api';

interface ProjectFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateProjectData | UpdateProjectData) => Promise<void>;
    project?: Project | null;
    mode: 'create' | 'edit';
}

const ProjectForm: React.FC<ProjectFormProps> = ({
    open,
    onClose,
    onSubmit,
    project,
    mode
}) => {
    const { types } = useProjectTypes();

    // Map project types to Vietnamese labels
    const getTypeLabel = (type: string) => {
        const labels = {
            apartment: 'Chung cư',
            villa: 'Biệt thự',
            office: 'Văn phòng',
            commercial: 'Thương mại',
        };
        return labels[type as keyof typeof labels] || type;
    };

    const [formData, setFormData] = useState<CreateProjectData>({
        name: '',
        slug: '',
        description: '',
        content: '',
        location: '',
        type: 'apartment',
        status: 'planning',
        price: {
            min: 0,
            max: 0,
            currency: 'VND'
        },
        area: {
            min: 0,
            max: 0,
            unit: 'm2'
        },
        images: [],
        features: [],
        amenities: [],
        developer: '',
        completionDate: '',
        totalUnits: 0,
        soldUnits: 0,
        coordinates: {
            latitude: 0,
            longitude: 0
        },
        isFeatured: false,
        isActive: true,
        tags: [],
        seoTitle: '',
        seoDescription: '',
        seoKeywords: []
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [newFeature, setNewFeature] = useState('');
    const [newAmenity, setNewAmenity] = useState('');
    const [newTag, setNewTag] = useState('');
    const [newKeyword, setNewKeyword] = useState('');

    // Image upload states
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    // Tab states
    const [imageTab, setImageTab] = useState(0);
    const [newImageUrl, setNewImageUrl] = useState('');

    // Sample image URLs for URL tab
    const sampleImageUrls = [
        "https://watermark.lovepik.com/photo/50060/9606.jpg_wh1200.jpg",
        "https://watermark.lovepik.com/photo/50060/9606.jpg_wh1200.jpg",
        "https://watermark.lovepik.com/photo/50060/9606.jpg_wh1200.jpg",
        "https://watermark.lovepik.com/photo/50060/9606.jpg_wh1200.jpg",
        "https://watermark.lovepik.com/photo/50060/9606.jpg_wh1200.jpg",
    ];

    // Initialize form data when project changes
    useEffect(() => {
        if (project && mode === 'edit') {
            setFormData({
                name: project.name,
                slug: project.slug,
                description: project.description,
                content: project.content,
                location: project.location,
                type: project.type,
                status: project.status,
                price: project.price,
                area: project.area,
                images: project.images || [],
                features: project.features,
                amenities: project.amenities,
                developer: project.developer,
                completionDate: project.completionDate || '',
                totalUnits: project.totalUnits,
                soldUnits: project.soldUnits,
                coordinates: project.coordinates || { latitude: 0, longitude: 0 },
                isFeatured: project.isFeatured,
                isActive: project.isActive,
                tags: project.tags || [],
                seoTitle: project.seoTitle || '',
                seoDescription: project.seoDescription || '',
                seoKeywords: project.seoKeywords || []
            });
        } else {
            // Reset form for create mode
            setFormData({
                name: '',
                slug: '',
                description: '',
                content: '',
                location: '',
                type: 'apartment',
                status: 'planning',
                price: { min: 0, max: 0, currency: 'VND' },
                area: { min: 0, max: 0, unit: 'm2' },
                images: [],
                features: [],
                amenities: [],
                developer: '',
                completionDate: '',
                totalUnits: 0,
                soldUnits: 0,
                coordinates: { latitude: 0, longitude: 0 },
                isFeatured: false,
                isActive: true,
                tags: [],
                seoTitle: '',
                seoDescription: '',
                seoKeywords: []
            });
        }
    }, [project, mode, open]);

    const handleInputChange = (field: keyof CreateProjectData, value: string | number | boolean | string[]) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNestedInputChange = (parent: keyof CreateProjectData, field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...(prev[parent] as Record<string, unknown>),
                [field]: value
            }
        }));
    };

    const handleAddFeature = () => {
        if (newFeature.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, newFeature.trim()]
            }));
            setNewFeature('');
        }
    };

    const handleRemoveFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleAddAmenity = () => {
        if (newAmenity.trim()) {
            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, newAmenity.trim()]
            }));
            setNewAmenity('');
        }
    };

    const handleRemoveAmenity = (index: number) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.filter((_, i) => i !== index)
        }));
    };

    const handleAddTag = () => {
        if (newTag.trim()) {
            setFormData(prev => ({
                ...prev,
                tags: [...(prev.tags || []), newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (index: number) => {
        setFormData(prev => ({
            ...prev,
            tags: (prev.tags || []).filter((_, i) => i !== index)
        }));
    };

    const handleAddKeyword = () => {
        if (newKeyword.trim()) {
            setFormData(prev => ({
                ...prev,
                seoKeywords: [...(prev.seoKeywords || []), newKeyword.trim()]
            }));
            setNewKeyword('');
        }
    };

    const handleRemoveKeyword = (index: number) => {
        setFormData(prev => ({
            ...prev,
            seoKeywords: (prev.seoKeywords || []).filter((_, i) => i !== index)
        }));
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleNameChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            name: value,
            slug: mode === 'create' ? generateSlug(value) : prev.slug
        }));
    };

    // Image upload functions
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length !== files.length) {
            setUploadError('Chỉ được chọn file hình ảnh');
            return;
        }

        setSelectedFiles(imageFiles);

        // Create preview URLs
        const urls = imageFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
        setUploadError(null);
    };

    const handleRemoveFile = (index: number) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        const newUrls = previewUrls.filter((_, i) => i !== index);

        // Revoke the URL to free memory
        URL.revokeObjectURL(previewUrls[index]);

        setSelectedFiles(newFiles);
        setPreviewUrls(newUrls);
    };

    const handleUploadImages = async () => {
        if (selectedFiles.length === 0) return;

        setUploading(true);
        setUploadProgress(0);
        setUploadError(null);

        try {
            const uploadedUrls: string[] = [];

            // Upload each file to Cloudinary
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const formData = new FormData();
                formData.append('file', file);
                formData.append('folder', 'minhloc/images');

                console.log(`Uploading file ${i + 1}/${selectedFiles.length}:`, {
                    name: file.name,
                    size: file.size,
                    type: file.type
                });

                const response = await uploadClient.post('/admin/files/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const fileProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            const totalProgress = Math.round(((i * 100) + fileProgress) / selectedFiles.length);
                            setUploadProgress(totalProgress);
                        }
                    },
                });

                if (response.data.success && response.data.data?.url) {
                    uploadedUrls.push(response.data.data.url);
                    console.log(`File ${i + 1} uploaded successfully:`, response.data.data.url);
                } else {
                    throw new Error(`Upload failed for file ${file.name}`);
                }
            }

            // Add uploaded images to form data
            setFormData(prev => ({
                ...prev,
                images: [...(prev.images || []), ...uploadedUrls]
            }));

            setSnackbarMessage(`Đã upload ${uploadedUrls.length} hình ảnh thành công!`);
            setSnackbarOpen(true);

            // Clear selected files
            setSelectedFiles([]);
            setPreviewUrls([]);

        } catch (error) {
            console.error('Upload error:', error);
            setUploadError(error instanceof Error ? error.message : 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: (prev.images || []).filter((_: string, i: number) => i !== index)
        }));
    };

    // URL handling functions
    const handleAddImageUrl = () => {
        if (newImageUrl.trim()) {
            setFormData(prev => ({
                ...prev,
                images: [...(prev.images || []), newImageUrl.trim()]
            }));
            setNewImageUrl('');
            setSnackbarMessage('Thêm URL hình ảnh thành công!');
            setSnackbarOpen(true);
        }
    };

    const handleSelectSampleUrl = (url: string) => {
        setFormData(prev => ({
            ...prev,
            images: [...(prev.images || []), url]
        }));
        setSnackbarMessage('Thêm hình ảnh mẫu thành công!');
        setSnackbarOpen(true);
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setImageTab(newValue);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            // Validation
            if (!formData.name || !formData.description || !formData.location) {
                setError('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }

            if (formData.price.min >= formData.price.max) {
                setError('Giá tối đa phải lớn hơn giá tối thiểu');
                return;
            }

            if (formData.area.min >= formData.area.max) {
                setError('Diện tích tối đa phải lớn hơn diện tích tối thiểu');
                return;
            }

            await onSubmit(formData);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {mode === 'create' ? 'Tạo dự án mới' : 'Chỉnh sửa dự án'}
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    {/* Basic Information */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Thông tin cơ bản
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Tên dự án *"
                            value={formData.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Slug"
                            value={formData.slug}
                            onChange={(e) => handleInputChange('slug', e.target.value)}
                            helperText="URL-friendly version of the name"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Mô tả ngắn *"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Nội dung chi tiết *"
                            value={formData.content}
                            onChange={(e) => handleInputChange('content', e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Địa điểm *"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Chủ đầu tư *"
                            value={formData.developer}
                            onChange={(e) => handleInputChange('developer', e.target.value)}
                            required
                        />
                    </Grid>

                    {/* Type and Status */}
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Loại dự án *</InputLabel>
                            <Select
                                value={formData.type}
                                onChange={(e) => handleInputChange('type', e.target.value)}
                                label="Loại dự án *"
                            >
                                {types.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {getTypeLabel(type)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Trạng thái *</InputLabel>
                            <Select
                                value={formData.status}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                                label="Trạng thái *"
                            >
                                <MenuItem value="planning">Đang lên kế hoạch</MenuItem>
                                <MenuItem value="construction">Đang xây dựng</MenuItem>
                                <MenuItem value="completed">Hoàn thành</MenuItem>
                                <MenuItem value="sold_out">Đã bán hết</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Price Information */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                            Thông tin giá
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Giá tối thiểu (VND) *"
                            type="number"
                            value={formData.price.min}
                            onChange={(e) => handleNestedInputChange('price', 'min', parseInt(e.target.value) || 0)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Giá tối đa (VND) *"
                            type="number"
                            value={formData.price.max}
                            onChange={(e) => handleNestedInputChange('price', 'max', parseInt(e.target.value) || 0)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Đơn vị tiền tệ</InputLabel>
                            <Select
                                value={formData.price.currency}
                                onChange={(e) => handleNestedInputChange('price', 'currency', e.target.value)}
                                label="Đơn vị tiền tệ"
                            >
                                <MenuItem value="VND">VND</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Area Information */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                            Thông tin diện tích
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Diện tích tối thiểu *"
                            type="number"
                            value={formData.area.min}
                            onChange={(e) => handleNestedInputChange('area', 'min', parseInt(e.target.value) || 0)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Diện tích tối đa *"
                            type="number"
                            value={formData.area.max}
                            onChange={(e) => handleNestedInputChange('area', 'max', parseInt(e.target.value) || 0)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Đơn vị</InputLabel>
                            <Select
                                value={formData.area.unit}
                                onChange={(e) => handleNestedInputChange('area', 'unit', e.target.value)}
                                label="Đơn vị"
                            >
                                <MenuItem value="m2">m²</MenuItem>
                                <MenuItem value="sqft">sqft</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Units Information */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                            Thông tin căn hộ
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Tổng số căn *"
                            type="number"
                            value={formData.totalUnits}
                            onChange={(e) => handleInputChange('totalUnits', parseInt(e.target.value) || 0)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Số căn đã bán"
                            type="number"
                            value={formData.soldUnits}
                            onChange={(e) => handleInputChange('soldUnits', parseInt(e.target.value) || 0)}
                        />
                    </Grid>

                    {/* Features */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                            Tính năng nổi bật
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
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
                            >
                                Thêm
                            </Button>
                        </Box>
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
                    </Grid>

                    {/* Amenities */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                            Tiện ích
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Thêm tiện ích"
                                value={newAmenity}
                                onChange={(e) => setNewAmenity(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddAmenity()}
                            />
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddAmenity}
                            >
                                Thêm
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {formData.amenities.map((amenity, index) => (
                                <Chip
                                    key={index}
                                    label={amenity}
                                    onDelete={() => handleRemoveAmenity(index)}
                                    deleteIcon={<DeleteIcon />}
                                />
                            ))}
                        </Box>
                    </Grid>

                    {/* Tags */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                            Tags
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Thêm tag"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                            />
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddTag}
                            >
                                Thêm
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {(formData.tags || []).map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    onDelete={() => handleRemoveTag(index)}
                                    deleteIcon={<DeleteIcon />}
                                />
                            ))}
                        </Box>
                    </Grid>

                    {/* Images Upload */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                            Hình ảnh dự án
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        {uploadError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {uploadError}
                            </Alert>
                        )}

                        {/* Tabs */}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                            <Tabs value={imageTab} onChange={handleTabChange}>
                                <Tab label="Upload File" />
                                <Tab label="Dán URL" />
                            </Tabs>
                        </Box>

                        {/* Upload File Tab */}
                        {imageTab === 0 && (
                            <Box>
                                <Box sx={{ mb: 3 }}>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        style={{ display: 'none' }}
                                    />
                                    <Button
                                        variant="outlined"
                                        startIcon={<UploadIcon />}
                                        onClick={() => fileInputRef.current?.click()}
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        disabled={uploading}
                                    >
                                        Chọn hình ảnh
                                    </Button>
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                                        Chọn nhiều file hình ảnh cùng lúc (JPG, PNG, GIF) - Upload ngay lên Cloudinary
                                    </Typography>
                                </Box>

                                {uploading && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            Đang upload... {uploadProgress}%
                                        </Typography>
                                        <Box sx={{ position: 'relative', width: '100%' }}>
                                            <LinearProgress variant="determinate" value={uploadProgress} />
                                        </Box>
                                    </Box>
                                )}

                                {previewUrls.length > 0 && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" sx={{ mb: 2 }}>
                                            Hình ảnh đã chọn ({previewUrls.length} ảnh)
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {previewUrls.map((url, index) => (
                                                <Grid item xs={6} sm={4} md={3} key={index}>
                                                    <Paper
                                                        elevation={1}
                                                        sx={{
                                                            position: 'relative',
                                                            padding: 1,
                                                            borderRadius: 1,
                                                        }}
                                                    >
                                                        <Box
                                                            component="img"
                                                            src={url}
                                                            alt={`Preview ${index + 1}`}
                                                            sx={{
                                                                width: '100%',
                                                                height: 120,
                                                                objectFit: 'cover',
                                                                borderRadius: 1,
                                                            }}
                                                        />
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleRemoveFile(index)}
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 4,
                                                                right: 4,
                                                                backgroundColor: 'rgba(0,0,0,0.5)',
                                                                color: 'white',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                                                },
                                                            }}
                                                        >
                                                            <CloseIcon fontSize="small" />
                                                        </IconButton>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <Button
                                            variant="contained"
                                            onClick={handleUploadImages}
                                            disabled={uploading}
                                            sx={{ mt: 2 }}
                                        >
                                            {uploading ? 'Đang thêm...' : 'Thêm hình ảnh'}
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* URL Tab */}
                        {imageTab === 1 && (
                            <Box>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        Thêm URL hình ảnh
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                        <TextField
                                            fullWidth
                                            label="URL hình ảnh"
                                            value={newImageUrl}
                                            onChange={(e) => setNewImageUrl(e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handleAddImageUrl}
                                            disabled={!newImageUrl.trim()}
                                        >
                                            Thêm URL
                                        </Button>
                                    </Box>
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        Hình ảnh mẫu có sẵn
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {sampleImageUrls.map((url, index) => (
                                            <Grid item xs={6} sm={4} md={3} key={index}>
                                                <Paper
                                                    elevation={1}
                                                    sx={{
                                                        position: 'relative',
                                                        padding: 1,
                                                        borderRadius: 1,
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            elevation: 3,
                                                        },
                                                    }}
                                                    onClick={() => handleSelectSampleUrl(url)}
                                                >
                                                    <Box
                                                        component="img"
                                                        src={url}
                                                        alt={`Sample ${index + 1}`}
                                                        sx={{
                                                            width: '100%',
                                                            height: 120,
                                                            objectFit: 'cover',
                                                            borderRadius: 1,
                                                        }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 4,
                                                            right: 4,
                                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                                            color: 'white',
                                                            padding: '4px 8px',
                                                            borderRadius: 1,
                                                            fontSize: '12px',
                                                        }}
                                                    >
                                                        Click để thêm
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Box>
                        )}

                        {/* Current Images */}
                        {formData.images && formData.images.length > 0 && (
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Hình ảnh hiện tại ({formData.images.length} ảnh)
                                </Typography>
                                <Grid container spacing={2}>
                                    {formData.images.map((image: string, index: number) => (
                                        <Grid item xs={6} sm={4} md={3} key={index}>
                                            <Paper
                                                elevation={1}
                                                sx={{
                                                    position: 'relative',
                                                    padding: 1,
                                                    borderRadius: 1,
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={image}
                                                    alt={`Project image ${index + 1}`}
                                                    sx={{
                                                        width: '100%',
                                                        height: 120,
                                                        objectFit: 'cover',
                                                        borderRadius: 1,
                                                    }}
                                                />
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemoveImage(index)}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 4,
                                                        right: 4,
                                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                                        },
                                                    }}
                                                >
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                    </Grid>

                    {/* SEO Keywords */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                            SEO Keywords
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Thêm keyword"
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                            />
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddKeyword}
                            >
                                Thêm
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {(formData.seoKeywords || []).map((keyword, index) => (
                                <Chip
                                    key={index}
                                    label={keyword}
                                    onDelete={() => handleRemoveKeyword(index)}
                                    deleteIcon={<DeleteIcon />}
                                />
                            ))}
                        </Box>
                    </Grid>

                    {/* Settings */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                            Cài đặt
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.isFeatured}
                                    onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                                />
                            }
                            label="Dự án nổi bật"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
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
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Hủy
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? 'Đang xử lý...' : (mode === 'create' ? 'Tạo dự án' : 'Cập nhật')}
                </Button>
            </DialogActions>

            {/* Success Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ProjectForm;