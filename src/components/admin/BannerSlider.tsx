'use client'

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Avatar,
    IconButton,
    Switch,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    DragIndicator as DragIcon,
    ViewCarousel as BannerIcon,
    CloudUpload as UploadIcon,
} from '@mui/icons-material';

interface Banner {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    link: string;
    linkText: string;
    position: 'left' | 'center' | 'right';
    active: boolean;
    order: number;
    startDate: string;
    endDate: string;
}

const BannerSlider: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>([
        {
            id: 1,
            title: 'Dự án căn hộ cao cấp Golden View',
            subtitle: 'Vị trí đắc địa - Thiết kế hiện đại - Giá cả hợp lý',
            image: '/placeholder-banner1.jpg',
            link: '/du-an/golden-view',
            linkText: 'Xem chi tiết',
            position: 'left',
            active: true,
            order: 1,
            startDate: '2024-01-01',
            endDate: '2024-12-31'
        },
        {
            id: 2,
            title: 'Sâm Ngọc Linh Kontum chính gốc',
            subtitle: 'Chất lượng cao - Giá tốt nhất thị trường',
            image: '/placeholder-ginseng-banner.jpg',
            link: '/san-pham/sam-ngoc-linh',
            linkText: 'Mua ngay',
            position: 'center',
            active: true,
            order: 2,
            startDate: '2024-01-01',
            endDate: '2024-12-31'
        },
        {
            id: 3,
            title: 'Tư vấn đầu tư BDS miễn phí',
            subtitle: 'Đội ngũ chuyên gia giàu kinh nghiệm sẵn sàng hỗ trợ 24/7',
            image: '/placeholder-consultation.jpg',
            link: '/lien-he',
            linkText: 'Đăng ký tư vấn',
            position: 'right',
            active: false,
            order: 3,
            startDate: '2024-02-01',
            endDate: '2024-11-30'
        }
    ]);

    const [formOpen, setFormOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image: '/placeholder-banner.jpg',
        link: '',
        linkText: '',
        position: 'center' as const,
        active: true,
        startDate: '',
        endDate: '',
    });

    const handleEdit = (banner: Banner) => {
        setSelectedBanner(banner);
        setFormMode('edit');
        setFormData({
            title: banner.title,
            subtitle: banner.subtitle,
            image: banner.image,
            link: banner.link,
            linkText: banner.linkText,
            position: banner.position,
            active: banner.active,
            startDate: banner.startDate,
            endDate: banner.endDate,
        });
        setFormOpen(true);
    };

    const handleDelete = (bannerId: number) => {
        setBanners(banners.filter(banner => banner.id !== bannerId));
    };

    const handleAddBanner = () => {
        setSelectedBanner(null);
        setFormMode('add');
        setFormData({
            title: '',
            subtitle: '',
            image: '/placeholder-banner.jpg',
            link: '',
            linkText: 'Xem chi tiết',
            position: 'center',
            active: true,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        });
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setSelectedBanner(null);
    };

    const handleFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSelectChange = (field: string) => (event: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleFormSubmit = () => {
        if (formMode === 'add') {
            const newBanner: Banner = {
                id: Math.max(...banners.map(b => b.id)) + 1,
                ...formData,
                order: banners.length + 1,
            };
            setBanners([...banners, newBanner]);
        } else if (formMode === 'edit' && selectedBanner) {
            setBanners(banners.map(banner =>
                banner.id === selectedBanner.id
                    ? { ...banner, ...formData }
                    : banner
            ));
        }
        setFormOpen(false);
    };

    const handleToggleActive = (bannerId: number) => {
        setBanners(banners.map(banner =>
            banner.id === bannerId
                ? { ...banner, active: !banner.active }
                : banner
        ));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    image: e.target?.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Banner/Slider ({banners.length})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddBanner}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    Thêm Banner
                </Button>
            </Box>

            {/* Banner Preview */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BannerIcon sx={{ color: '#E7C873' }} />
                        Preview Slider
                    </Typography>
                    <Box sx={{
                        height: 200,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 2,
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundImage: banners.find(b => b.active)?.image ? `url(${banners.find(b => b.active)?.image})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        px: 4
                    }}>
                        {banners.find(b => b.active) ? (
                            <Box sx={{
                                color: 'white',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                                maxWidth: '50%'
                            }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {banners.find(b => b.active)?.title}
                                </Typography>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    {banners.find(b => b.active)?.subtitle}
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#E7C873',
                                        color: '#000',
                                        '&:hover': { backgroundColor: '#d4b86a' }
                                    }}
                                >
                                    {banners.find(b => b.active)?.linkText}
                                </Button>
                            </Box>
                        ) : (
                            <Typography variant="h6" color="text.secondary">
                                Chưa có banner nào được kích hoạt
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>

            {/* Banners List */}
            <Grid container spacing={3}>
                {banners
                    .sort((a, b) => a.order - b.order)
                    .map((banner) => (
                        <Grid item xs={12} md={6} lg={4} key={banner.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    opacity: banner.active ? 1 : 0.6,
                                    border: banner.active ? '2px solid #E7C873' : '1px solid #e0e0e0'
                                }}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <Avatar
                                        src={banner.image}
                                        sx={{
                                            width: '100%',
                                            height: 120,
                                            borderRadius: 0,
                                            bgcolor: '#f5f5f5'
                                        }}
                                        variant="square"
                                    >
                                        <BannerIcon sx={{ fontSize: 40, color: '#999' }} />
                                    </Avatar>
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        display: 'flex',
                                        gap: 1
                                    }}>
                                        <IconButton
                                            size="small"
                                            sx={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
                                        >
                                            <DragIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                        {banner.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                                        {banner.subtitle}
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            Vị trí: {banner.position}
                                        </Typography>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={banner.active}
                                                    onChange={() => handleToggleActive(banner.id)}
                                                    size="small"
                                                />
                                            }
                                            label="Kích hoạt"
                                            sx={{ ml: 0 }}
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(banner.startDate).toLocaleDateString('vi-VN')} - {new Date(banner.endDate).toLocaleDateString('vi-VN')}
                                        </Typography>
                                        <Box>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEdit(banner)}
                                                color="primary"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDelete(banner.id)}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            {/* Form Dialog */}
            <Dialog
                open={formOpen}
                onClose={handleFormClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>
                    {formMode === 'add' ? '🎨 Thêm Banner Mới' : '✏️ Chỉnh sửa Banner'}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        {/* Banner Image */}
                        <Grid item xs={12} md={5}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                    Hình ảnh Banner
                                </Typography>
                                <Avatar
                                    src={formData.image}
                                    sx={{
                                        width: '100%',
                                        height: 160,
                                        borderRadius: 2,
                                        mb: 2,
                                        bgcolor: '#f5f5f5'
                                    }}
                                    variant="rounded"
                                >
                                    <BannerIcon sx={{ fontSize: 40, color: '#999' }} />
                                </Avatar>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="banner-image-upload"
                                    type="file"
                                    onChange={handleImageUpload}
                                />
                                <label htmlFor="banner-image-upload">
                                    <IconButton
                                        color="primary"
                                        component="span"
                                        sx={{
                                            border: '2px dashed #E7C873',
                                            borderRadius: 2,
                                            p: 2,
                                            '&:hover': {
                                                backgroundColor: 'rgba(231, 200, 115, 0.1)'
                                            }
                                        }}
                                    >
                                        <UploadIcon />
                                    </IconButton>
                                </label>
                                <Typography variant="caption" display="block" color="text.secondary">
                                    Kích thước khuyến nghị: 1200x400px
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Banner Information */}
                        <Grid item xs={12} md={7}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Tiêu đề banner"
                                        value={formData.title}
                                        onChange={handleFormChange('title')}
                                        placeholder="VD: Dự án căn hộ cao cấp Golden View"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phụ đề"
                                        value={formData.subtitle}
                                        onChange={handleFormChange('subtitle')}
                                        placeholder="VD: Vị trí đắc địa - Thiết kế hiện đại - Giá cả hợp lý"
                                    />
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <TextField
                                        fullWidth
                                        label="Link đích"
                                        value={formData.link}
                                        onChange={handleFormChange('link')}
                                        placeholder="/du-an/golden-view"
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Text button"
                                        value={formData.linkText}
                                        onChange={handleFormChange('linkText')}
                                        placeholder="Xem chi tiết"
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Vị trí text</InputLabel>
                                        <Select
                                            value={formData.position}
                                            label="Vị trí text"
                                            onChange={handleSelectChange('position')}
                                        >
                                            <MenuItem value="left">Trái</MenuItem>
                                            <MenuItem value="center">Giữa</MenuItem>
                                            <MenuItem value="right">Phải</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Ngày bắt đầu"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={handleFormChange('startDate')}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Ngày kết thúc"
                                        type="date"
                                        value={formData.endDate}
                                        onChange={handleFormChange('endDate')}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.active}
                                                onChange={handleFormChange('active')}
                                            />
                                        }
                                        label="Kích hoạt banner"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleFormClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleFormSubmit}
                        variant="contained"
                        sx={{
                            backgroundColor: '#E7C873',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#d4b86a',
                            },
                        }}
                    >
                        {formMode === 'add' ? 'Thêm banner' : 'Cập nhật'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BannerSlider;
