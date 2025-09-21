'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Box,
    Typography,
    Chip,
    IconButton,
    Divider,
    FormControlLabel,
    Switch,
    FormGroup,
} from '@mui/material';
import {
    Close as CloseIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Upload as UploadIcon,
    LocationOn as LocationIcon,
    AttachMoney as MoneyIcon,
    SquareFoot as AreaIcon,
} from '@mui/icons-material';

interface ProjectFormProps {
    open: boolean;
    onClose: () => void;
    project?: any; // Project data for editing
    mode: 'create' | 'edit';
}

const ProjectForm: React.FC<ProjectFormProps> = ({ open, onClose, project, mode }) => {
    const [formData, setFormData] = useState({
        name: project?.name || '',
        type: project?.type || 'apartment',
        status: project?.status || 'available',
        city: project?.city || 'TP.HCM',
        district: project?.district || '',
        address: project?.address || '',
        price: project?.price || '',
        area: project?.area || '',
        bedrooms: project?.bedrooms || '',
        bathrooms: project?.bathrooms || '',
        description: project?.description || '',
        features: project?.features || [],
        isActive: project?.isActive ?? true,
        isFeatured: project?.isFeatured ?? false,
    });

    const [newFeature, setNewFeature] = useState('');
    const [uploadedImages, setUploadedImages] = useState<string[]>(project?.images || []);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddFeature = () => {
        if (newFeature.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, newFeature.trim()],
            }));
            setNewFeature('');
        }
    };

    const handleRemoveFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setUploadedImages(prev => [...prev, ...newImages]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        console.log('Submit project:', { ...formData, images: uploadedImages });
        onClose();
    };

    const typeOptions = [
        { value: 'apartment', label: 'Chung cư' },
        { value: 'villa', label: 'Biệt thự' },
        { value: 'commercial', label: 'Thương mại' },
        { value: 'land', label: 'Đất nền' },
    ];

    const statusOptions = [
        { value: 'available', label: 'Đang bán' },
        { value: 'sold', label: 'Đã bán' },
        { value: 'coming-soon', label: 'Sắp mở bán' },
    ];

    const cityOptions = [
        { value: 'TP.HCM', label: 'TP. Hồ Chí Minh' },
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'Đà Nẵng', label: 'Đà Nẵng' },
        { value: 'Khác', label: 'Khác' },
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { overflow: 'visible' }
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {mode === 'create' ? 'Thêm dự án mới' : 'Chỉnh sửa dự án'}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={3}>
                    {/* Basic Information */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Thông tin cơ bản
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <TextField
                            fullWidth
                            label="Tên dự án"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth required>
                            <InputLabel>Loại dự án</InputLabel>
                            <Select
                                value={formData.type}
                                label="Loại dự án"
                                onChange={(e) => handleInputChange('type', e.target.value)}
                            >
                                {typeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Trạng thái</InputLabel>
                            <Select
                                value={formData.status}
                                label="Trạng thái"
                                onChange={(e) => handleInputChange('status', e.target.value)}
                            >
                                {statusOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Thành phố</InputLabel>
                            <Select
                                value={formData.city}
                                label="Thành phố"
                                onChange={(e) => handleInputChange('city', e.target.value)}
                            >
                                {cityOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Quận/Huyện"
                            value={formData.district}
                            onChange={(e) => handleInputChange('district', e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Địa chỉ chi tiết"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                    </Grid>

                    {/* Price and Area */}
                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Giá cả & Diện tích
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Giá (tỷ VNĐ)"
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            InputProps={{
                                startAdornment: <MoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Diện tích (m²)"
                            type="number"
                            value={formData.area}
                            onChange={(e) => handleInputChange('area', e.target.value)}
                            InputProps={{
                                startAdornment: <AreaIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            label="Phòng ngủ"
                            type="number"
                            value={formData.bedrooms}
                            onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            label="Phòng tắm"
                            type="number"
                            value={formData.bathrooms}
                            onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                        />
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Mô tả dự án"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Mô tả chi tiết về dự án..."
                        />
                    </Grid>

                    {/* Features */}
                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Tiện ích
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <TextField
                            fullWidth
                            label="Thêm tiện ích"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleAddFeature}
                            sx={{ height: '56px' }}
                        >
                            Thêm tiện ích
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {formData.features.map((feature, index) => (
                                <Chip
                                    key={index}
                                    label={feature}
                                    onDelete={() => handleRemoveFeature(index)}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    </Grid>

                    {/* Image Upload */}
                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Hình ảnh dự án
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="image-upload"
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="image-upload">
                            <Button
                                variant="outlined"
                                component="span"
                                startIcon={<UploadIcon />}
                                sx={{ mb: 2 }}
                            >
                                Tải lên hình ảnh
                            </Button>
                        </label>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {uploadedImages.map((image, index) => (
                                <Box key={index} sx={{ position: 'relative' }}>
                                    <img
                                        src={image}
                                        alt={`Project ${index + 1}`}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            objectFit: 'cover',
                                            borderRadius: 8,
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveImage(index)}
                                        sx={{
                                            position: 'absolute',
                                            top: -8,
                                            right: -8,
                                            backgroundColor: 'error.main',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'error.dark',
                                            },
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* Settings */}
                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Cài đặt
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isActive}
                                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                    />
                                }
                                label="Hiển thị trên website"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isFeatured}
                                        onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                                    />
                                }
                                label="Dự án nổi bật"
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} color="inherit">
                    Hủy
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        backgroundColor: '#E7C873',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#d4b85a',
                        },
                    }}
                >
                    {mode === 'create' ? 'Tạo dự án' : 'Cập nhật'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectForm;
