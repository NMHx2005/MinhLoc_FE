'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
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
    IconButton,
    Alert,
    CircularProgress,
    Card,
    CardContent,
    Paper,
    LinearProgress,
    Snackbar,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    CloudUpload as UploadIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { useProjectTypes } from '../../hooks/useProjects';
import type { Project, CreateProjectData, UpdateProjectData } from '../../services/admin/projectService';
import { uploadClient } from '../../services/api';
import RichTextEditor from './RichTextEditor';

interface ProjectEditFormProps {
    project: Project;
    onSave: (data: CreateProjectData | UpdateProjectData) => Promise<void>;
    onCancel: () => void;
    saving?: boolean;
}

const ProjectEditForm: React.FC<ProjectEditFormProps> = ({
    project,
    onSave,
    onCancel,
    saving = false
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
        features: [],
        amenities: [],
        developer: '',
        phone: '',
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
        seoKeywords: [],
        images: []
    });

    const [error, setError] = useState<string | null>(null);
    const [newFeature, setNewFeature] = useState('');
    const [newAmenity, setNewAmenity] = useState('');

    // Image upload states
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    // Tab states
    const [imageTab, setImageTab] = useState(0);
    const [newImageUrl, setNewImageUrl] = useState('');

    // Sample image URLs for URL tab - all with 16:9 aspect ratio
    const sampleImageUrls = [
        'https://via.placeholder.com/800x450/4CAF50/FFFFFF.jpg',
        'https://via.placeholder.com/800x450/2196F3/FFFFFF.jpg',
        'https://via.placeholder.com/800x450/FF9800/FFFFFF.jpg',
        'https://via.placeholder.com/800x450/9C27B0/FFFFFF.jpg',
        'https://via.placeholder.com/800x450/F44336/FFFFFF.jpg',
        'https://via.placeholder.com/800x450/00BCD4/FFFFFF.jpg',
    ];

    // Initialize form data when project changes
    useEffect(() => {
        if (project) {
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
                phone: project.phone || '',
                completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : '',
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
        }
    }, [project]);

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


    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    // Utility function to optimize image display
    const optimizeImageUrl = (url: string) => {
        // If it's a Cloudinary URL, add optimization parameters
        if (url.includes('cloudinary.com')) {
            const baseUrl = url.split('/upload/')[0];
            const publicId = url.split('/upload/')[1];
            return `${baseUrl}/upload/w_800,h_450,c_fill,q_auto,f_auto/${publicId}`;
        }
        return url;
    };

    const handleNameChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            name: value,
            slug: generateSlug(value)
        }));
    };

    // Image upload functions
    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        await processFiles(files);
    };

    const processFiles = async (files: File[]) => {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length !== files.length) {
            setUploadError('Chỉ được chọn file hình ảnh');
            return;
        }

        console.warn('Files selected:', {
            totalFiles: files.length,
            imageFiles: imageFiles.length,
            fileNames: imageFiles.map(f => f.name),
            fileSizes: imageFiles.map(f => f.size)
        });

        setSelectedFiles(imageFiles);

        // Create preview URLs
        const urls = imageFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
        setUploadError(null);

        // Auto upload files
        try {
            await handleUploadImages();
        } catch (error) {
            console.error('Upload error:', error);
            setUploadError(error instanceof Error ? error.message : 'Upload failed');
        }
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = async (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragOver(false);

        const files = Array.from(event.dataTransfer.files);
        await processFiles(files);
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
        if (selectedFiles.length === 0) {
            console.warn('No files to upload');
            return;
        }

        console.warn('Starting upload process:', {
            projectId: project._id,
            fileCount: selectedFiles.length,
            fileNames: selectedFiles.map(f => f.name)
        });

        setUploading(true);
        setUploadProgress(0);
        setUploadError(null);

        try {
            // Create FormData for backend API
            const formData = new FormData();
            selectedFiles.forEach(file => {
                formData.append('images', file);
                console.warn('Added file to FormData:', {
                    name: file.name,
                    size: file.size,
                    type: file.type
                });
            });

            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 200);

            console.warn('Sending upload request to:', `/admin/projects/${project._id}/gallery`);

            // Upload to backend API using uploadClient with progress tracking
            const result = await uploadClient.post(`/admin/projects/${project._id}/gallery`, formData, {
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(progress);
                    }
                },
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            console.warn('Upload successful:', {
                status: result.status,
                data: result.data,
                images: result.data.data?.images,
                currentImages: []
            });

            // Add uploaded images to form data
            setFormData(prev => ({
                ...prev,
                images: [...(prev.images || []), ...(result.data.data?.images || [])]
            }));

            setSnackbarMessage(`Upload thành công ${result.data.data?.images?.length || 0} hình ảnh!`);
            setSnackbarOpen(true);

            // Clear selected files
            setSelectedFiles([]);
            setPreviewUrls([]);

        } catch (error) {
            console.error('Upload failed:', error);
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

            // Validation for completionDate
            if (formData.completionDate) {
                const completionDate = new Date(formData.completionDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset time to start of day

                // If project is not completed, completionDate must be in the future
                if (formData.status !== 'completed' && completionDate <= today) {
                    setError('Ngày hoàn thành phải trong tương lai (trừ khi dự án đã hoàn thành)');
                    return;
                }
            }

            // Convert completionDate to proper format
            const submitData = {
                ...formData,
                completionDate: formData.completionDate ? new Date(formData.completionDate).toISOString() : null
            };

            console.warn('ProjectEditForm - Sending data:', {
                formData: submitData,
                formDataType: typeof submitData,
                formDataKeys: Object.keys(submitData)
            });
            await onSave(submitData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={4}>
                {/* Basic Information */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                Thông tin cơ bản
                            </Typography>

                            <Grid container spacing={3}>
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
                                    <RichTextEditor
                                        value={formData.content}
                                        onChange={(content) => handleInputChange('content', content)}
                                        placeholder="Nhập nội dung chi tiết về dự án..."
                                        height={300}
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

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Số điện thoại liên hệ"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="Ví dụ: 0123456789 hoặc +84123456789"
                                        helperText="Số điện thoại Việt Nam hợp lệ (không bắt buộc)"
                                    />
                                </Grid>

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
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Price Information */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Thông tin giá
                            </Typography>

                            <Grid container spacing={3}>
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
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Area Information */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Thông tin diện tích
                            </Typography>

                            <Grid container spacing={3}>
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
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Units Information */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Thông tin căn hộ
                            </Typography>

                            <Grid container spacing={3}>
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

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Ngày hoàn thành dự kiến"
                                        type="date"
                                        value={formData.completionDate ? new Date(formData.completionDate).toISOString().split('T')[0] : ''}
                                        onChange={(e) => handleInputChange('completionDate', e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        helperText="Chỉ nhập khi dự án chưa hoàn thành"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Features */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Tính năng nổi bật
                            </Typography>

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
                        </CardContent>
                    </Card>
                </Grid>

                {/* Amenities */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Tiện ích
                            </Typography>

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
                        </CardContent>
                    </Card>
                </Grid>

                {/* Settings */}
                {/* Images Upload */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Hình ảnh dự án
                            </Typography>

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

                                        {/* Drag & Drop Area */}
                                        <Box
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            sx={{
                                                border: '2px dashed',
                                                borderColor: isDragOver ? 'primary.main' : 'grey.300',
                                                borderRadius: 2,
                                                p: 4,
                                                textAlign: 'center',
                                                backgroundColor: isDragOver ? 'primary.50' : 'grey.50',
                                                transition: 'all 0.3s ease-in-out',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    backgroundColor: 'primary.50',
                                                },
                                            }}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <UploadIcon
                                                sx={{
                                                    fontSize: 48,
                                                    color: isDragOver ? 'primary.main' : 'grey.400',
                                                    mb: 2
                                                }}
                                            />
                                            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                                {isDragOver ? 'Thả hình ảnh vào đây' : 'Kéo thả hình ảnh hoặc nhấn để chọn'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                Hỗ trợ JPG, PNG, GIF - Tối đa 10MB mỗi file
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                startIcon={<UploadIcon />}
                                                disabled={uploading}
                                                sx={{ mt: 1 }}
                                            >
                                                Chọn hình ảnh
                                            </Button>
                                        </Box>
                                    </Box>

                                    {uploading && (
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Đang upload {selectedFiles.length} hình ảnh... {uploadProgress}%
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={uploadProgress}
                                                sx={{
                                                    height: 8,
                                                    borderRadius: 4,
                                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                                    '& .MuiLinearProgress-bar': {
                                                        borderRadius: 4,
                                                        backgroundColor: '#4caf50',
                                                    },
                                                }}
                                            />
                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                                {selectedFiles.map(f => f.name).join(', ')}
                                            </Typography>
                                        </Box>
                                    )}

                                    {uploadError && (
                                        <Alert severity="error" sx={{ mb: 2 }}>
                                            {uploadError}
                                        </Alert>
                                    )}

                                    {previewUrls.length > 0 && (
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="h6" sx={{ mb: 2 }}>
                                                Hình ảnh đã chọn ({previewUrls.length} ảnh)
                                            </Typography>
                                            <Grid container spacing={3}>
                                                {previewUrls.map((url, index) => (
                                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                                        <Paper
                                                            elevation={2}
                                                            sx={{
                                                                position: 'relative',
                                                                borderRadius: 2,
                                                                overflow: 'hidden',
                                                                transition: 'all 0.3s ease-in-out',
                                                                '&:hover': {
                                                                    elevation: 8,
                                                                    transform: 'translateY(-4px)',
                                                                },
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    position: 'relative',
                                                                    width: '100%',
                                                                    aspectRatio: '16/9',
                                                                    overflow: 'hidden',
                                                                }}
                                                            >
                                                                <Box
                                                                    component="img"
                                                                    src={url}
                                                                    alt={`Preview ${index + 1}`}
                                                                    sx={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover',
                                                                        transition: 'transform 0.3s ease-in-out',
                                                                        filter: 'brightness(1.1) contrast(1.05)',
                                                                        '&:hover': {
                                                                            transform: 'scale(1.05)',
                                                                            filter: 'brightness(1.2) contrast(1.1)',
                                                                        },
                                                                    }}
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        target.src = 'https://via.placeholder.com/400x225/cccccc/666666?text=Preview+Error';
                                                                    }}
                                                                />

                                                                {/* Preview overlay */}
                                                                <Box
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        left: 0,
                                                                        right: 0,
                                                                        bottom: 0,
                                                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                                                        opacity: 0,
                                                                        transition: 'opacity 0.3s ease-in-out',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        '&:hover': {
                                                                            opacity: 1,
                                                                        },
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            color: 'white',
                                                                            fontWeight: 'bold',
                                                                            textAlign: 'center',
                                                                            px: 2,
                                                                        }}
                                                                    >
                                                                        Preview {index + 1}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>

                                                            {/* Remove button */}
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleRemoveFile(index)}
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: 8,
                                                                    right: 8,
                                                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                                                    color: 'error.main',
                                                                    boxShadow: 2,
                                                                    '&:hover': {
                                                                        backgroundColor: 'error.main',
                                                                        color: 'white',
                                                                        transform: 'scale(1.1)',
                                                                    },
                                                                    transition: 'all 0.2s ease-in-out',
                                                                }}
                                                            >
                                                                <CloseIcon fontSize="small" />
                                                            </IconButton>

                                                            {/* Preview badge */}
                                                            <Box
                                                                sx={{
                                                                    position: 'absolute',
                                                                    bottom: 8,
                                                                    left: 8,
                                                                    backgroundColor: 'primary.main',
                                                                    color: 'white',
                                                                    borderRadius: 1,
                                                                    px: 1,
                                                                    py: 0.5,
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: 'bold',
                                                                }}
                                                            >
                                                                Preview
                                                            </Box>
                                                        </Paper>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            {!uploading && selectedFiles.length > 0 && (
                                                <Button
                                                    variant="contained"
                                                    onClick={handleUploadImages}
                                                    sx={{ mt: 2 }}
                                                >
                                                    Upload {selectedFiles.length} hình ảnh
                                                </Button>
                                            )}
                                            {uploading && (
                                                <Button
                                                    variant="contained"
                                                    disabled
                                                    sx={{ mt: 2 }}
                                                >
                                                    Đang upload...
                                                </Button>
                                            )}
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
                                                            sx={{
                                                                width: '100%',
                                                                aspectRatio: '16/9',
                                                                overflow: 'hidden',
                                                                borderRadius: 1,
                                                            }}
                                                        >
                                                            <Box
                                                                component="img"
                                                                src={url}
                                                                alt={`Sample ${index + 1}`}
                                                                sx={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover',
                                                                    overflow: 'hidden',
                                                                }}
                                                            />
                                                        </Box>
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
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Hình ảnh hiện tại ({formData.images?.length || 0} ảnh)
                                </Typography>

                                {(!formData.images || formData.images.length === 0) ? (
                                    <Box
                                        sx={{
                                            border: '2px dashed',
                                            borderColor: 'grey.300',
                                            borderRadius: 2,
                                            p: 4,
                                            textAlign: 'center',
                                            backgroundColor: 'grey.50',
                                        }}
                                    >
                                        <UploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                                        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                            Chưa có hình ảnh nào
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Hãy chọn hình ảnh để thêm vào dự án
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Grid container spacing={3}>
                                        {formData.images.map((image: string, index: number) => (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                                <Paper
                                                    elevation={2}
                                                    sx={{
                                                        position: 'relative',
                                                        borderRadius: 2,
                                                        overflow: 'hidden',
                                                        transition: 'all 0.3s ease-in-out',
                                                        '&:hover': {
                                                            elevation: 8,
                                                            transform: 'translateY(-4px)',
                                                        },
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            position: 'relative',
                                                            width: '100%',
                                                            aspectRatio: '16/9',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        <Box
                                                            component="img"
                                                            src={optimizeImageUrl(image)}
                                                            alt={`Project image ${index + 1}`}
                                                            sx={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                overflow: 'hidden',
                                                                transition: 'transform 0.3s ease-in-out',
                                                                filter: 'brightness(1.1) contrast(1.05)',
                                                                '&:hover': {
                                                                    transform: 'scale(1.05)',
                                                                    filter: 'brightness(1.2) contrast(1.1)',
                                                                },
                                                            }}
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.src = 'https://via.placeholder.com/400x225/cccccc/666666?text=Image+Error';
                                                            }}
                                                            onLoad={(e) => {
                                                                // Remove any potential watermarks by applying a subtle overlay
                                                                const img = e.target as HTMLImageElement;
                                                                img.style.filter = 'brightness(1.1) contrast(1.05)';
                                                            }}
                                                        />

                                                        {/* Watermark/Logo overlay to hide unwanted elements */}
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)',
                                                                opacity: 0.3,
                                                                pointerEvents: 'none',
                                                            }}
                                                        />

                                                        {/* Overlay on hover */}
                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                backgroundColor: 'rgba(0,0,0,0.4)',
                                                                opacity: 0,
                                                                transition: 'opacity 0.3s ease-in-out',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                '&:hover': {
                                                                    opacity: 1,
                                                                },
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: 'white',
                                                                    fontWeight: 'bold',
                                                                    textAlign: 'center',
                                                                    px: 2,
                                                                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                                                }}
                                                            >
                                                                Hình {index + 1}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    {/* Remove button */}
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleRemoveImage(index)}
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 8,
                                                            right: 8,
                                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                                            color: 'error.main',
                                                            boxShadow: 2,
                                                            '&:hover': {
                                                                backgroundColor: 'error.main',
                                                                color: 'white',
                                                                transform: 'scale(1.1)',
                                                            },
                                                            transition: 'all 0.2s ease-in-out',
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>

                                                    {/* Image index badge */}
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 8,
                                                            left: 8,
                                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                                            color: 'white',
                                                            borderRadius: 1,
                                                            px: 1,
                                                            py: 0.5,
                                                            fontSize: '0.75rem',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Cài đặt
                            </Typography>

                            <Grid container spacing={3}>
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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
                <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={onCancel}
                    disabled={saving}
                    size="large"
                >
                    Hủy
                </Button>
                <Button
                    variant="contained"
                    startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                    onClick={handleSubmit}
                    disabled={saving}
                    size="large"
                >
                    {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
            </Box>

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
        </Box>
    );
};

export default ProjectEditForm;
