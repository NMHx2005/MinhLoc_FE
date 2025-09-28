'use client'

import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tabs,
    Tab,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Alert,
    CircularProgress,
    Chip,
    InputAdornment,
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    CloudUpload as UploadIcon,
    Link as LinkIcon,
    Image as ImageIcon,
} from '@mui/icons-material';
import apiClient from '../../services/api';

interface ImageItem {
    id: string;
    url: string;
    alt?: string;
    isUploaded?: boolean;
}

interface ImageManagerProps {
    open: boolean;
    onClose: () => void;
    images: string[];
    onImagesChange: (images: string[]) => void;
    title?: string;
}

const ImageManager: React.FC<ImageManagerProps> = ({
    open,
    onClose,
    images,
    onImagesChange,
    title = "Quản lý hình ảnh"
}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [urlInput, setUrlInput] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Convert images array to ImageItem array
    const imageItems: ImageItem[] = (images || []).map((url, index) => ({
        id: `img-${index}`,
        url,
        alt: `Hình ảnh ${index + 1}`,
        isUploaded: true // All images are now uploaded through backend
    }));

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setError(null);
    };

    const handleAddUrl = () => {
        if (!urlInput.trim()) {
            setError('Vui lòng nhập URL hình ảnh');
            return;
        }

        const trimmedUrl = urlInput.trim();

        // Validate URL
        try {
            const urlObj = new URL(trimmedUrl);

            // Check if it's a valid image URL
            const isValidImageUrl =
                // Check for image file extensions
                /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(urlObj.pathname) ||
                // Check for known image hosting services
                /via\.placeholder\.com/.test(trimmedUrl) ||
                /res\.cloudinary\.com/.test(trimmedUrl) ||
                /images\.unsplash\.com/.test(trimmedUrl) ||
                /picsum\.photos/.test(trimmedUrl) ||
                // Check for base64 data URLs
                trimmedUrl.startsWith('data:image/');

            if (!isValidImageUrl) {
                setError('URL phải là hình ảnh hợp lệ (jpg, png, gif, webp, svg)');
                return;
            }
        } catch {
            setError('URL không hợp lệ');
            return;
        }

        const newImages = [...(images || []), trimmedUrl];
        onImagesChange(newImages);
        setUrlInput('');
        setError(null);
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            Array.from(files).forEach(file => {
                formData.append('images', file);
            });

            const response = await apiClient.post('/uploads/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success && response.data.data) {
                // Backend returns array of URLs directly
                const uploadedUrls = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                const newImages = [...(images || []), ...uploadedUrls];
                onImagesChange(newImages);
            } else {
                throw new Error(response.data.message || 'Upload failed');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError('Không thể upload hình ảnh. Vui lòng thử lại.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = (images || []).filter((_, i) => i !== index);
        onImagesChange(newImages);
    };

    const handleMoveImage = (fromIndex: number, toIndex: number) => {
        const newImages = [...(images || [])];
        const [movedImage] = newImages.splice(fromIndex, 1);
        newImages.splice(toIndex, 0, movedImage);
        onImagesChange(newImages);
    };

    const handleSave = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ImageIcon sx={{ color: 'primary.main' }} />
                    {title}
                </Box>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                        <Tab
                            icon={<LinkIcon />}
                            label="Dán URL"
                            iconPosition="start"
                        />
                        <Tab
                            icon={<UploadIcon />}
                            label="Upload ảnh"
                            iconPosition="start"
                        />
                    </Tabs>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Tab 1: URL Input */}
                    {activeTab === 0 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Thêm hình ảnh từ URL
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                <TextField
                                    fullWidth
                                    label="URL hình ảnh"
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LinkIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleAddUrl}
                                    startIcon={<AddIcon />}
                                    sx={{ minWidth: 120 }}
                                >
                                    Thêm
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {/* Tab 2: File Upload */}
                    {activeTab === 1 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Upload hình ảnh từ máy tính
                            </Typography>
                            <Box sx={{ mb: 3 }}>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={() => fileInputRef.current?.click()}
                                    startIcon={uploading ? <CircularProgress size={20} /> : <UploadIcon />}
                                    disabled={uploading}
                                    sx={{ mb: 2 }}
                                >
                                    {uploading ? 'Đang upload...' : 'Chọn hình ảnh'}
                                </Button>
                                <Typography variant="body2" color="text.secondary">
                                    Hỗ trợ: JPG, PNG, GIF, WebP (tối đa 10MB mỗi file)
                                    <br />
                                    Hình ảnh sẽ được upload lên Cloudinary qua server
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* Image List */}
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Danh sách hình ảnh ({images.length})
                        </Typography>

                        {images.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <ImageIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="body1" color="text.secondary">
                                    Chưa có hình ảnh nào
                                </Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={2}>
                                {imageItems.map((image, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={image.id}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={image.url}
                                                alt={image.alt}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Hình {index + 1}
                                                    </Typography>
                                                    <Chip
                                                        label="Đã upload"
                                                        size="small"
                                                        color="success"
                                                        variant="outlined"
                                                    />
                                                </Box>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{
                                                        wordBreak: 'break-all',
                                                        display: 'block',
                                                        maxHeight: '40px',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {image.url}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemoveImage(index)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                {index > 0 && (
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleMoveImage(index, index - 1)}
                                                        title="Di chuyển lên"
                                                    >
                                                        ↑
                                                    </IconButton>
                                                )}
                                                {index < images.length - 1 && (
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleMoveImage(index, index + 1)}
                                                        title="Di chuyển xuống"
                                                    >
                                                        ↓
                                                    </IconButton>
                                                )}
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleSave} variant="contained">
                    Lưu thay đổi
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageManager;
