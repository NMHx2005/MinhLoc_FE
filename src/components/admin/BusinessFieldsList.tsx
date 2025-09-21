'use client'

import React, { useState } from 'react';
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
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

interface BusinessField {
    id: string;
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    image: string;
    icon: string;
    color: string;
    features: string[];
    projects: string[];
    stats: {
        projectsCompleted: number;
        yearsExperience: number;
        teamSize: number;
        clientSatisfaction: number;
    };
    sortOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const BusinessFieldsList: React.FC = () => {
    const [fields, setFields] = useState<BusinessField[]>([
        {
            id: '1',
            title: 'Xây Dựng',
            slug: 'xay-dung',
            subtitle: 'Chuyên nghiệp - Chất lượng - Uy tín',
            description: 'MinhLoc Group là đơn vị tiên phong trong lĩnh vực xây dựng với hơn 15 năm kinh nghiệm. Chúng tôi cam kết mang đến những công trình chất lượng cao, đáp ứng mọi nhu cầu từ nhà ở đến các dự án thương mại quy mô lớn.',
            image: '/business-fields/construction.jpg',
            icon: 'construction',
            color: '#E7C873',
            features: [
                'Thiết kế và thi công chuyên nghiệp',
                'Vật liệu chất lượng cao',
                'Đội ngũ kỹ sư giàu kinh nghiệm',
                'Bảo hành dài hạn',
                'Giá cả cạnh tranh',
            ],
            projects: [
                'Chung cư Green Valley',
                'Tòa nhà văn phòng ABC',
                'Khu đô thị Sunshine',
                'Trung tâm thương mại XYZ',
            ],
            stats: {
                projectsCompleted: 150,
                yearsExperience: 15,
                teamSize: 200,
                clientSatisfaction: 98,
            },
            sortOrder: 1,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '2',
            title: 'Đầu Tư Tài Chính',
            slug: 'dau-tu-tai-chinh',
            subtitle: 'An toàn - Hiệu quả - Bền vững',
            description: 'Với đội ngũ chuyên gia tài chính giàu kinh nghiệm, chúng tôi cung cấp các giải pháp đầu tư tài chính toàn diện, giúp khách hàng tối ưu hóa lợi nhuận và quản lý rủi ro hiệu quả.',
            image: '/business-fields/finance.jpg',
            icon: 'finance',
            color: '#4CAF50',
            features: [
                'Tư vấn đầu tư chuyên nghiệp',
                'Quản lý danh mục đa dạng',
                'Phân tích rủi ro toàn diện',
                'Báo cáo minh bạch',
                'Hỗ trợ 24/7',
            ],
            projects: [
                'Quỹ đầu tư bất động sản',
                'Tư vấn tài chính doanh nghiệp',
                'Quản lý tài sản cá nhân',
                'Đầu tư chứng khoán',
            ],
            stats: {
                projectsCompleted: 80,
                yearsExperience: 10,
                teamSize: 50,
                clientSatisfaction: 95,
            },
            sortOrder: 2,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '3',
            title: 'Bất Động Sản',
            slug: 'bat-dong-san',
            subtitle: 'Vị trí đắc địa - Tiềm năng tăng trưởng',
            description: 'Chuyên phát triển và kinh doanh các dự án bất động sản cao cấp tại các vị trí đắc địa, mang đến cơ hội đầu tư sinh lời và không gian sống chất lượng cho khách hàng.',
            image: '/business-fields/real-estate.jpg',
            icon: 'real-estate',
            color: '#2196F3',
            features: [
                'Vị trí đắc địa',
                'Thiết kế hiện đại',
                'Tiện ích đầy đủ',
                'Pháp lý minh bạch',
                'Dịch vụ chăm sóc khách hàng',
            ],
            projects: [
                'Chung cư cao cấp',
                'Biệt thự liền kề',
                'Khu đô thị thông minh',
                'Trung tâm thương mại',
            ],
            stats: {
                projectsCompleted: 200,
                yearsExperience: 12,
                teamSize: 150,
                clientSatisfaction: 97,
            },
            sortOrder: 3,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingField, setEditingField] = useState<BusinessField | null>(null);
    const [formData, setFormData] = useState<Omit<BusinessField, 'id' | 'slug' | 'createdAt' | 'updatedAt'>>({
        title: '',
        subtitle: '',
        description: '',
        image: '',
        icon: 'construction',
        color: '#E7C873',
        features: [],
        projects: [],
        stats: {
            projectsCompleted: 0,
            yearsExperience: 0,
            teamSize: 0,
            clientSatisfaction: 0,
        },
        sortOrder: 1,
        isActive: true,
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

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
        setEditingField(null);
        setFormData({
            title: '',
            subtitle: '',
            description: '',
            image: '',
            icon: 'construction',
            color: '#E7C873',
            features: [],
            projects: [],
            stats: {
                projectsCompleted: 0,
                yearsExperience: 0,
                teamSize: 0,
                clientSatisfaction: 0,
            },
            sortOrder: fields.length + 1,
            isActive: true,
        });
        setDialogOpen(true);
    };

    const handleEditField = (field: BusinessField) => {
        setEditingField(field);
        setFormData({
            title: field.title,
            subtitle: field.subtitle,
            description: field.description,
            image: field.image,
            icon: field.icon,
            color: field.color,
            features: field.features,
            projects: field.projects,
            stats: field.stats,
            sortOrder: field.sortOrder,
            isActive: field.isActive,
        });
        setDialogOpen(true);
    };

    const handleSaveField = () => {
        if (editingField) {
            setFields(prev => prev.map(field =>
                field.id === editingField.id
                    ? {
                        ...formData,
                        id: editingField.id,
                        slug: editingField.slug,
                        createdAt: field.createdAt,
                        updatedAt: new Date().toISOString().split('T')[0]
                    }
                    : field
            ));
            setSnackbarMessage('Cập nhật lĩnh vực hoạt động thành công!');
        } else {
            const newField: BusinessField = {
                ...formData,
                id: Date.now().toString(),
                slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            };
            setFields(prev => [...prev, newField]);
            setSnackbarMessage('Thêm lĩnh vực hoạt động thành công!');
        }
        setSnackbarOpen(true);
        setDialogOpen(false);
    };

    const handleDeleteField = (fieldId: string) => {
        setFields(prev => prev.filter(field => field.id !== fieldId));
        setSnackbarMessage('Xóa lĩnh vực hoạt động thành công!');
        setSnackbarOpen(true);
    };

    const handleToggleStatus = (fieldId: string) => {
        setFields(prev => prev.map(field =>
            field.id === fieldId
                ? {
                    ...field,
                    isActive: !field.isActive,
                    updatedAt: new Date().toISOString().split('T')[0]
                }
                : field
        ));
        setSnackbarMessage('Cập nhật trạng thái lĩnh vực thành công!');
        setSnackbarOpen(true);
    };

    const handleAddFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, '']
        }));
    };

    const handleUpdateFeature = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map((feature, i) => i === index ? value : feature)
        }));
    };

    const handleRemoveFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleAddProject = () => {
        setFormData(prev => ({
            ...prev,
            projects: [...prev.projects, '']
        }));
    };

    const handleUpdateProject = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.map((project, i) => i === index ? value : project)
        }));
    };

    const handleRemoveProject = (index: number) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }));
    };

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
                                        {fields.length}
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
                                        {fields.filter(f => f.isActive).length}
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
                                        {fields.reduce((sum, f) => sum + f.stats.projectsCompleted, 0)}
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
                                        {Math.round(fields.reduce((sum, f) => sum + f.stats.clientSatisfaction, 0) / fields.length)}%
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
                {fields.map((field) => (
                    <Grid item xs={12} md={6} lg={4} key={field.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: field.color,
                                                width: 60,
                                                height: 60
                                            }}
                                        >
                                            {getIconComponent(field.icon)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {field.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {field.subtitle}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditField(field)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleToggleStatus(field.id)}
                                            color={field.isActive ? 'warning' : 'success'}
                                        >
                                            {field.isActive ? 'Tạm dừng' : 'Kích hoạt'}
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteField(field.id)}
                                            color="error"
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {field.description}
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        Thống kê:
                                    </Typography>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Dự án: {field.stats.projectsCompleted}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Kinh nghiệm: {field.stats.yearsExperience} năm
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Team: {field.stats.teamSize} người
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="caption" color="text.secondary">
                                                Hài lòng: {field.stats.clientSatisfaction}%
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        Tính năng nổi bật:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {field.features.slice(0, 3).map((feature, index) => (
                                            <Chip key={index} label={feature} size="small" variant="outlined" />
                                        ))}
                                        {field.features.length > 3 && (
                                            <Chip label={`+${field.features.length - 3}`} size="small" />
                                        )}
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        Dự án tiêu biểu:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {field.projects.slice(0, 2).map((project, index) => (
                                            <Chip key={index} label={project} size="small" color="primary" />
                                        ))}
                                        {field.projects.length > 2 && (
                                            <Chip label={`+${field.projects.length - 2}`} size="small" />
                                        )}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add/Edit Field Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="lg" fullWidth>
                <DialogTitle>
                    {editingField ? 'Chỉnh sửa lĩnh vực hoạt động' : 'Thêm lĩnh vực hoạt động mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tên lĩnh vực"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tiêu đề phụ"
                                value={formData.subtitle}
                                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả"
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Hình ảnh URL"
                                value={formData.image}
                                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Icon</InputLabel>
                                <Select
                                    value={formData.icon}
                                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                                >
                                    <MenuItem value="construction">Xây dựng</MenuItem>
                                    <MenuItem value="finance">Tài chính</MenuItem>
                                    <MenuItem value="real-estate">Bất động sản</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Màu sắc"
                                value={formData.color}
                                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Thứ tự sắp xếp"
                                type="number"
                                value={formData.sortOrder}
                                onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="subtitle1">
                                    Tính năng nổi bật
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddFeature}
                                    size="small"
                                >
                                    Thêm tính năng
                                </Button>
                            </Box>
                            {formData.features.map((feature, index) => (
                                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        value={feature}
                                        onChange={(e) => handleUpdateFeature(index, e.target.value)}
                                        placeholder="Nhập tính năng"
                                    />
                                    <IconButton
                                        onClick={() => handleRemoveFeature(index)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="subtitle1">
                                    Dự án tiêu biểu
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddProject}
                                    size="small"
                                >
                                    Thêm dự án
                                </Button>
                            </Box>
                            {formData.projects.map((project, index) => (
                                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        value={project}
                                        onChange={(e) => handleUpdateProject(index, e.target.value)}
                                        placeholder="Nhập tên dự án"
                                    />
                                    <IconButton
                                        onClick={() => handleRemoveProject(index)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                Thống kê
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Dự án hoàn thành"
                                        type="number"
                                        value={formData.stats.projectsCompleted}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            stats: { ...prev.stats, projectsCompleted: parseInt(e.target.value) }
                                        }))}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Năm kinh nghiệm"
                                        type="number"
                                        value={formData.stats.yearsExperience}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            stats: { ...prev.stats, yearsExperience: parseInt(e.target.value) }
                                        }))}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Số nhân viên"
                                        type="number"
                                        value={formData.stats.teamSize}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            stats: { ...prev.stats, teamSize: parseInt(e.target.value) }
                                        }))}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <TextField
                                        fullWidth
                                        label="% Hài lòng"
                                        type="number"
                                        value={formData.stats.clientSatisfaction}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            stats: { ...prev.stats, clientSatisfaction: parseInt(e.target.value) }
                                        }))}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                                    />
                                }
                                label="Hoạt động"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveField} variant="contained">
                        {editingField ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>

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
