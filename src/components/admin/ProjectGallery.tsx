'use client'

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Typography,
    Box,
    Alert,
    CircularProgress,
    Chip,
    TextField,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Close as CloseIcon,
    Delete as DeleteIcon,
    Upload as UploadIcon,
    Image as ImageIcon,
    Link as LinkIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import { useProjects } from '../../hooks/useProjects';

interface ProjectGalleryProps {
    open: boolean;
    onClose: () => void;
    projectId: string;
    projectName: string;
    images: string[];
    onImagesChange: (images: string[]) => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
    open,
    onClose,
    projectId,
    projectName,
    images,
    onImagesChange
}) => {
    const { uploadGalleryImages, deleteGalleryImage, addImageUrl } = useProjects();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        try {
            setUploading(true);
            setError(null);

            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append('images', file);
            });

            const result = await uploadGalleryImages(projectId, formData);
            onImagesChange([...images, ...result.data.images]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi upload ảnh');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async (imageUrl: string) => {
        try {
            setLoading(true);
            setError(null);

            // Extract image ID from URL (assuming URL format)
            const imageId = imageUrl.split('/').pop()?.split('.')[0] || '';

            await deleteGalleryImage(projectId, imageId);
            onImagesChange(images.filter(img => img !== imageUrl));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa ảnh');
        } finally {
            setLoading(false);
        }
    };

    const handleAddUrl = async () => {
        if (imageUrl.trim()) {
            try {
                setLoading(true);
                setError(null);

                // Validate URL
                new URL(imageUrl.trim());

                const result = await addImageUrl(projectId, imageUrl.trim());
                onImagesChange([...images, ...result.data.images]);
                setImageUrl('');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'URL không hợp lệ');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setError(null);
    };

    const handleClose = () => {
        setError(null);
        setTabValue(0);
        setImageUrl('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">
                        Quản lý hình ảnh - {projectName}
                    </Typography>
                    <IconButton onClick={handleClose} size="small">
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

                {/* Add Images Section */}
                <Box sx={{ mb: 3 }}>
                    <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
                        <Tab
                            icon={<UploadIcon />}
                            label="Upload ảnh"
                            iconPosition="start"
                        />
                        <Tab
                            icon={<LinkIcon />}
                            label="Thêm URL"
                            iconPosition="start"
                        />
                    </Tabs>

                    {tabValue === 0 && (
                        <Box>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="gallery-upload"
                                multiple
                                type="file"
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                            <label htmlFor="gallery-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={uploading ? <CircularProgress size={20} /> : <UploadIcon />}
                                    disabled={uploading}
                                    sx={{ mb: 2 }}
                                >
                                    {uploading ? 'Đang upload...' : 'Chọn ảnh từ máy tính'}
                                </Button>
                            </label>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                Chọn nhiều ảnh cùng lúc (JPG, PNG, GIF, WebP) - sẽ tự động upload lên Cloudinary
                            </Typography>
                        </Box>
                    )}

                    {tabValue === 1 && (
                        <Box>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="URL hình ảnh"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddUrl()}
                                />
                                <Button
                                    variant="contained"
                                    startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
                                    onClick={handleAddUrl}
                                    disabled={!imageUrl.trim() || loading}
                                >
                                    {loading ? 'Đang thêm...' : 'Thêm'}
                                </Button>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Nhập URL hình ảnh từ internet (hỗ trợ JPG, PNG, GIF, WebP)
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Images Grid */}
                {images.length === 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            py: 4,
                            border: '2px dashed #ccc',
                            borderRadius: 2,
                        }}
                    >
                        <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Chưa có hình ảnh nào
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Nhấn "Thêm hình ảnh" để bắt đầu
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        {images.map((image, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={image}
                                        alt={`Gallery image ${index + 1}`}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent sx={{ p: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Chip
                                                label={`Ảnh ${index + 1}`}
                                                size="small"
                                                variant="outlined"
                                            />
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteImage(image)}
                                                disabled={loading}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Image Count */}
                {images.length > 0 && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {images.length} hình ảnh
                        </Typography>
                    </Box>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectGallery;
