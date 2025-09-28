'use client'

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    Box,
    Chip,
    Card,
    CardContent,
    Divider,
    IconButton,
    Avatar,
} from '@mui/material';
import {
    Close as CloseIcon,
    LocationOn as LocationIcon,
    AttachMoney as MoneyIcon,
    SquareFoot as AreaIcon,
    Business as BusinessIcon,
    CalendarToday as CalendarIcon,
    Home as HomeIcon,
    Star as StarIcon,
    CheckCircle as CheckIcon,
    Cancel as CancelIcon,
} from '@mui/icons-material';
import type { Project } from '../../services/admin/projectService';

interface ProjectDetailProps {
    open: boolean;
    onClose: () => void;
    project: Project | null;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
    open,
    onClose,
    project
}) => {
    if (!project) return null;

    const getTypeLabel = (type: string) => {
        const types = {
            apartment: 'Chung cư',
            villa: 'Biệt thự',
            office: 'Văn phòng',
            commercial: 'Thương mại'
        };
        return types[type as keyof typeof types] || type;
    };

    const getStatusLabel = (status: string) => {
        const statuses = {
            planning: 'Đang lên kế hoạch',
            construction: 'Đang xây dựng',
            completed: 'Hoàn thành',
            sold_out: 'Đã bán hết'
        };
        return statuses[status as keyof typeof statuses] || status;
    };

    const getStatusColor = (status: string) => {
        const colors = {
            planning: 'warning',
            construction: 'info',
            completed: 'success',
            sold_out: 'error'
        };
        return colors[status as keyof typeof colors] || 'default';
    };

    const formatPrice = (price: number, currency: string) => {
        if (currency === 'VND') {
            return `${(price / 1000000).toFixed(1)}M VND`;
        }
        return `${price.toLocaleString()} ${currency}`;
    };

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString('vi-VN');
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">
                        Chi tiết dự án
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
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <HomeIcon sx={{ mr: 1 }} />
                                    Thông tin cơ bản
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Tên dự án
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {project.name}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Loại dự án
                                        </Typography>
                                        <Chip
                                            label={getTypeLabel(project.type)}
                                            color="primary"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Trạng thái
                                        </Typography>
                                        <Chip
                                            label={getStatusLabel(project.status)}
                                            color={getStatusColor(project.status) as any}
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Chủ đầu tư
                                        </Typography>
                                        <Typography variant="body1">
                                            {project.developer}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Mô tả
                                        </Typography>
                                        <Typography variant="body1">
                                            {project.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Location */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <LocationIcon sx={{ mr: 1 }} />
                                    Vị trí
                                </Typography>
                                <Typography variant="body1">
                                    {project.location}
                                </Typography>
                                {project.coordinates && (
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        Tọa độ: {project.coordinates.latitude}, {project.coordinates.longitude}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Price and Area */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <MoneyIcon sx={{ mr: 1 }} />
                                    Giá bán
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                    {formatPrice(project.price.min, project.price.currency)}
                                    {project.price.min !== project.price.max &&
                                        ` - ${formatPrice(project.price.max, project.price.currency)}`
                                    }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <AreaIcon sx={{ mr: 1 }} />
                                    Diện tích
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                    {project.area.min}
                                    {project.area.min !== project.area.max && ` - ${project.area.max}`}
                                    {' '}{project.area.unit}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Units Information */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <BusinessIcon sx={{ mr: 1 }} />
                                    Thông tin căn hộ
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                                {project.totalUnits}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Tổng số căn
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#e8f5e8', borderRadius: 2 }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                                {project.soldUnits}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Đã bán
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#fff3e0', borderRadius: 2 }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                                                {project.totalUnits - project.soldUnits}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Còn lại
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                                                {project.salesRate.toFixed(1)}%
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Tỷ lệ bán
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Features and Amenities */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Tính năng nổi bật
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {project.features.map((feature, index) => (
                                        <Chip
                                            key={index}
                                            label={feature}
                                            size="small"
                                            variant="outlined"
                                            icon={<CheckIcon />}
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Tiện ích
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {project.amenities.map((amenity, index) => (
                                        <Chip
                                            key={index}
                                            label={amenity}
                                            size="small"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Project Images */}
                    {project.images && project.images.length > 0 && (
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        Hình ảnh dự án
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {project.images.map((image, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Box
                                                    component="img"
                                                    src={image}
                                                    alt={`Project image ${index + 1}`}
                                                    sx={{
                                                        width: '100%',
                                                        height: 200,
                                                        objectFit: 'cover',
                                                        borderRadius: 2,
                                                        border: '1px solid #e0e0e0'
                                                    }}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}

                    {/* Additional Information */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Thông tin bổ sung
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Ngày hoàn thành dự kiến
                                        </Typography>
                                        <Typography variant="body1">
                                            {project.completionDate ? formatDate(project.completionDate) : 'Chưa xác định'}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Doanh thu
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatPrice(project.revenue, project.price.currency)}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Dự án nổi bật
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {project.isFeatured ? (
                                                <CheckIcon color="success" />
                                            ) : (
                                                <CancelIcon color="disabled" />
                                            )}
                                            <Typography variant="body2" sx={{ ml: 1 }}>
                                                {project.isFeatured ? 'Có' : 'Không'}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Trạng thái hoạt động
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {project.isActive ? (
                                                <CheckIcon color="success" />
                                            ) : (
                                                <CancelIcon color="disabled" />
                                            )}
                                            <Typography variant="body2" sx={{ ml: 1 }}>
                                                {project.isActive ? 'Hoạt động' : 'Tạm dừng'}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    {project.tags && project.tags.length > 0 && (
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Tags
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                                {project.tags.map((tag, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={tag}
                                                        size="small"
                                                        variant="outlined"
                                                        color="default"
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectDetail;
