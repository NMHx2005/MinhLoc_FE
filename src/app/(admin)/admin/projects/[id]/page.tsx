'use client'

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Grid,
    Chip,
    IconButton,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    LocationOn as LocationIcon,
    AttachMoney as MoneyIcon,
    SquareFoot as AreaIcon,
    Business as BusinessIcon,
    Home as HomeIcon,
    CheckCircle as CheckIcon,
    Cancel as CancelIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material';
import { useProject } from '../../../../../hooks/useProjects';
import AdminLayout from '../../../../../components/admin/AdminLayout';
import { getOptimizedImageUrl, getPlaceholderImage, imageStyles, handleImageError } from '../../../../../utils/imageUtils';
import { formatPrice, formatArea, formatPercentage, formatDate, formatNumber } from '../../../../../utils/formatUtils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

const ProjectDetailPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;

    const { project, loading, error } = useProject(projectId);

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


    if (loading) {
        return (
            <AdminLayout>
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                </Box>
            </AdminLayout>
        );
    }

    if (error || !project) {
        return (
            <AdminLayout>
                <Box sx={{ p: 3 }}>
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error || 'Không tìm thấy dự án'}
                    </Alert>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => router.back()}
                    >
                        Quay lại
                    </Button>
                </Box>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <Box sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => router.back()} sx={{ mr: 2 }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h4" component="h1">
                            {project.name}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => router.push(`/admin/projects/edit/${project._id}`)}
                    >
                        Chỉnh sửa
                    </Button>
                </Box>

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
                                            color={getStatusColor(project.status) as 'warning' | 'info' | 'success' | 'error' | 'default'}
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

                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Số điện thoại liên hệ
                                        </Typography>
                                        {project.phone ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PhoneIcon color="primary" fontSize="small" />
                                                <Typography
                                                    variant="body1"
                                                    component="a"
                                                    href={`tel:${project.phone}`}
                                                    sx={{
                                                        color: 'primary.main',
                                                        textDecoration: 'none',
                                                        '&:hover': { textDecoration: 'underline' }
                                                    }}
                                                >
                                                    {project.phone}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Typography variant="body1" color="text.disabled">
                                                Chưa cập nhật
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Mô tả
                                        </Typography>
                                        <Typography variant="body1">
                                            {project.description}
                                        </Typography>
                                    </Grid>

                                    {project.content && (
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                                                Nội dung chi tiết
                                            </Typography>
                                            <Box sx={{
                                                p: 2,
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: 1,
                                                border: '1px solid #e0e0e0',
                                                '& img': {
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                    borderRadius: 1,
                                                    margin: '8px 0'
                                                },
                                                '& p': {
                                                    margin: '8px 0',
                                                    lineHeight: 1.6
                                                },
                                                '& strong': {
                                                    fontWeight: 'bold'
                                                },
                                                '& em': {
                                                    fontStyle: 'italic'
                                                },
                                                '& ul, & ol': {
                                                    paddingLeft: '20px',
                                                    margin: '8px 0'
                                                },
                                                '& li': {
                                                    margin: '4px 0'
                                                },
                                                '& blockquote': {
                                                    borderLeft: '4px solid #1976d2',
                                                    paddingLeft: '16px',
                                                    margin: '16px 0',
                                                    fontStyle: 'italic',
                                                    color: '#666'
                                                },
                                                '& code': {
                                                    backgroundColor: '#f5f5f5',
                                                    padding: '2px 4px',
                                                    borderRadius: '3px',
                                                    fontFamily: 'monospace',
                                                    fontSize: '0.9em'
                                                },
                                                '& pre': {
                                                    backgroundColor: '#f5f5f5',
                                                    padding: '12px',
                                                    borderRadius: '4px',
                                                    overflow: 'auto',
                                                    margin: '8px 0'
                                                },
                                                '& pre code': {
                                                    backgroundColor: 'transparent',
                                                    padding: 0
                                                }
                                            }}>
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    rehypePlugins={[rehypeSanitize]}
                                                >
                                                    {project.content}
                                                </ReactMarkdown>
                                            </Box>
                                        </Grid>
                                    )}
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
                                    {formatArea(project.area.min, project.area.unit)}
                                    {project.area.min !== project.area.max && ` - ${formatArea(project.area.max, project.area.unit)}`}
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
                                                {formatNumber(project.totalUnits)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Tổng số căn
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#e8f5e8', borderRadius: 2 }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                                {formatNumber(project.soldUnits)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Đã bán
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#fff3e0', borderRadius: 2 }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                                                {formatNumber(project.totalUnits - project.soldUnits)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Còn lại
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                                                {formatPercentage(project.salesRate)}
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
                                    {project.features.map((feature: string, index: number) => (
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
                                    {project.amenities.map((amenity: string, index: number) => (
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
                                        Hình ảnh dự án ({project.images.length} ảnh)
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {project.images.map((image: string, index: number) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Box
                                                    sx={{
                                                        ...imageStyles.container16x9,
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                                        '&:hover': {
                                                            transform: 'translateY(-4px)',
                                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                                        },
                                                    }}
                                                >
                                                    <Box
                                                        component="img"
                                                        src={getOptimizedImageUrl.detail(image)}
                                                        alt={`Project image ${index + 1}`}
                                                        sx={imageStyles.imageWithHover}
                                                        onError={(e) => handleImageError(e, getPlaceholderImage.detail())}
                                                    />

                                                    {/* Watermark/Logo overlay to hide unwanted elements */}
                                                    <Box sx={imageStyles.watermarkOverlay} />

                                                    {/* Image number badge */}
                                                    <Box sx={imageStyles.imageBadge}>
                                                        {index + 1}
                                                    </Box>

                                                    {/* Hover overlay */}
                                                    <Box sx={imageStyles.hoverOverlay}>
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
                                                {project.tags.map((tag: string, index: number) => (
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
            </Box>
        </AdminLayout>
    );
};

export default ProjectDetailPage;
