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
    Edit as EditIcon,
    Delete as DeleteIcon,
    Work as WorkIcon,
    LocationOn as LocationIcon,
    Schedule as ScheduleIcon,
    AttachMoney as MoneyIcon,
    People as PeopleIcon,
    Star as StarIcon,
    PriorityHigh as UrgentIcon,
} from '@mui/icons-material';

interface JobPosition {
    id: string;
    title: string;
    slug: string;
    department: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'internship';
    salary: {
        min: number;
        max: number;
        currency: string;
        period: string;
    };
    experience: string;
    deadline: string;
    description: string;
    requirements: string[];
    benefits: string[];
    isHot: boolean;
    isUrgent: boolean;
    status: 'active' | 'inactive' | 'closed';
    applicationsCount: number;
    createdAt: string;
    updatedAt: string;
}

const JobPositionsManagement: React.FC = () => {
    const [positions, setPositions] = useState<JobPosition[]>([
        {
            id: '1',
            title: 'Senior Frontend Developer',
            slug: 'senior-frontend-developer',
            department: 'Công nghệ thông tin',
            location: 'TP. Hồ Chí Minh',
            type: 'full-time',
            salary: {
                min: 25000000,
                max: 40000000,
                currency: 'VND',
                period: 'tháng',
            },
            experience: '3-5 năm',
            deadline: '2024-12-31',
            description: 'Tìm kiếm Senior Frontend Developer có kinh nghiệm với React, TypeScript và Next.js.',
            requirements: [
                'Kinh nghiệm 3-5 năm với React, TypeScript',
                'Thành thạo Next.js, Material-UI',
                'Có kinh nghiệm với state management (Redux, Zustand)',
                'Hiểu biết về responsive design và mobile-first approach',
            ],
            benefits: [
                'Lương cạnh tranh 25-40 triệu/tháng',
                'Bảo hiểm sức khỏe toàn diện',
                'Môi trường làm việc năng động',
                'Cơ hội thăng tiến cao',
            ],
            isHot: true,
            isUrgent: false,
            status: 'active',
            applicationsCount: 15,
            createdAt: '2024-01-15',
            updatedAt: '2024-01-20',
        },
        {
            id: '2',
            title: 'Marketing Manager',
            slug: 'marketing-manager',
            department: 'Marketing',
            location: 'Hà Nội',
            type: 'full-time',
            salary: {
                min: 20000000,
                max: 30000000,
                currency: 'VND',
                period: 'tháng',
            },
            experience: '2-4 năm',
            deadline: '2024-11-30',
            description: 'Tìm kiếm Marketing Manager có kinh nghiệm trong lĩnh vực bất động sản.',
            requirements: [
                'Kinh nghiệm 2-4 năm trong marketing',
                'Thành thạo digital marketing, SEO, SEM',
                'Có kinh nghiệm với Google Analytics, Facebook Ads',
                'Kỹ năng quản lý team và dự án',
            ],
            benefits: [
                'Lương 20-30 triệu/tháng',
                'Thưởng KPI hàng tháng',
                'Đào tạo và phát triển kỹ năng',
                'Du lịch công ty hàng năm',
            ],
            isHot: false,
            isUrgent: true,
            status: 'active',
            applicationsCount: 8,
            createdAt: '2024-01-10',
            updatedAt: '2024-01-18',
        },
        {
            id: '3',
            title: 'Intern Backend Developer',
            slug: 'intern-backend-developer',
            department: 'Công nghệ thông tin',
            location: 'TP. Hồ Chí Minh',
            type: 'internship',
            salary: {
                min: 5000000,
                max: 8000000,
                currency: 'VND',
                period: 'tháng',
            },
            experience: 'Sinh viên năm cuối',
            deadline: '2024-10-31',
            description: 'Tuyển thực tập sinh Backend Developer để học hỏi và phát triển kỹ năng.',
            requirements: [
                'Sinh viên năm cuối ngành CNTT',
                'Có kiến thức cơ bản về Node.js, Express',
                'Hiểu biết về cơ sở dữ liệu (MongoDB, MySQL)',
                'Có tinh thần học hỏi và làm việc nhóm',
            ],
            benefits: [
                'Trợ cấp 5-8 triệu/tháng',
                'Được mentor hướng dẫn trực tiếp',
                'Cơ hội chuyển thành nhân viên chính thức',
                'Môi trường học tập năng động',
            ],
            isHot: false,
            isUrgent: false,
            status: 'active',
            applicationsCount: 25,
            createdAt: '2024-01-05',
            updatedAt: '2024-01-15',
        },
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null);
    const [formData, setFormData] = useState<Omit<JobPosition, 'id' | 'slug' | 'applicationsCount' | 'createdAt' | 'updatedAt'>>({
        title: '',
        department: '',
        location: '',
        type: 'full-time',
        salary: {
            min: 0,
            max: 0,
            currency: 'VND',
            period: 'tháng',
        },
        experience: '',
        deadline: '',
        description: '',
        requirements: [],
        benefits: [],
        isHot: false,
        isUrgent: false,
        status: 'active',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'full-time':
                return <WorkIcon />;
            case 'part-time':
                return <ScheduleIcon />;
            case 'contract':
                return <WorkIcon />;
            case 'internship':
                return <PeopleIcon />;
            default:
                return <WorkIcon />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'full-time':
                return 'primary';
            case 'part-time':
                return 'info';
            case 'contract':
                return 'warning';
            case 'internship':
                return 'success';
            default:
                return 'primary';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'full-time':
                return 'Toàn thời gian';
            case 'part-time':
                return 'Bán thời gian';
            case 'contract':
                return 'Hợp đồng';
            case 'internship':
                return 'Thực tập';
            default:
                return 'Khác';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'default';
            case 'closed':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active':
                return 'Đang tuyển';
            case 'inactive':
                return 'Tạm dừng';
            case 'closed':
                return 'Đã đóng';
            default:
                return 'Không xác định';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const handleAddPosition = () => {
        setEditingPosition(null);
        setFormData({
            title: '',
            department: '',
            location: '',
            type: 'full-time',
            salary: {
                min: 0,
                max: 0,
                currency: 'VND',
                period: 'tháng',
            },
            experience: '',
            deadline: '',
            description: '',
            requirements: [],
            benefits: [],
            isHot: false,
            isUrgent: false,
            status: 'active',
        });
        setDialogOpen(true);
    };

    const handleEditPosition = (position: JobPosition) => {
        setEditingPosition(position);
        setFormData({
            title: position.title,
            department: position.department,
            location: position.location,
            type: position.type,
            salary: position.salary,
            experience: position.experience,
            deadline: position.deadline,
            description: position.description,
            requirements: position.requirements,
            benefits: position.benefits,
            isHot: position.isHot,
            isUrgent: position.isUrgent,
            status: position.status,
        });
        setDialogOpen(true);
    };

    const handleSavePosition = () => {
        if (editingPosition) {
            setPositions(prev => prev.map(position =>
                position.id === editingPosition.id
                    ? { ...formData, id: editingPosition.id, slug: editingPosition.slug, applicationsCount: position.applicationsCount, createdAt: position.createdAt, updatedAt: new Date().toISOString().split('T')[0] }
                    : position
            ));
            setSnackbarMessage('Cập nhật vị trí tuyển dụng thành công!');
        } else {
            const newPosition: JobPosition = {
                ...formData,
                id: Date.now().toString(),
                slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
                applicationsCount: 0,
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            };
            setPositions(prev => [...prev, newPosition]);
            setSnackbarMessage('Thêm vị trí tuyển dụng thành công!');
        }
        setSnackbarOpen(true);
        setDialogOpen(false);
    };

    const handleDeletePosition = (positionId: string) => {
        setPositions(prev => prev.filter(position => position.id !== positionId));
        setSnackbarMessage('Xóa vị trí tuyển dụng thành công!');
        setSnackbarOpen(true);
    };

    const handleToggleStatus = (positionId: string) => {
        setPositions(prev => prev.map(position =>
            position.id === positionId
                ? {
                    ...position,
                    status: position.status === 'active' ? 'inactive' : 'active',
                    updatedAt: new Date().toISOString().split('T')[0]
                }
                : position
        ));
        setSnackbarMessage('Cập nhật trạng thái thành công!');
        setSnackbarOpen(true);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Quản lý vị trí tuyển dụng
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddPosition}
                >
                    Thêm vị trí
                </Button>
            </Box>

            <Grid container spacing={3}>
                {positions.map((position) => (
                    <Grid item xs={12} md={6} lg={4} key={position.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: `${getTypeColor(position.type)}.main`,
                                                width: 50,
                                                height: 50
                                            }}
                                        >
                                            {getTypeIcon(position.type)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {position.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                <Chip
                                                    label={getTypeLabel(position.type)}
                                                    size="small"
                                                    color={getTypeColor(position.type) as any}
                                                />
                                                <Chip
                                                    label={getStatusLabel(position.status)}
                                                    size="small"
                                                    color={getStatusColor(position.status) as any}
                                                />
                                                {position.isHot && (
                                                    <Chip
                                                        label="Hot"
                                                        size="small"
                                                        color="error"
                                                        icon={<StarIcon />}
                                                    />
                                                )}
                                                {position.isUrgent && (
                                                    <Chip
                                                        label="Urgent"
                                                        size="small"
                                                        color="warning"
                                                        icon={<UrgentIcon />}
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditPosition(position)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeletePosition(position.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {position.description}
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocationIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {position.location}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <MoneyIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {formatCurrency(position.salary.min)} - {formatCurrency(position.salary.max)}/{position.salary.period}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Kinh nghiệm: {position.experience}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Hạn nộp: {new Date(position.deadline).toLocaleDateString('vi-VN')}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {position.applicationsCount} ứng viên
                                    </Typography>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleToggleStatus(position.id)}
                                    >
                                        {position.status === 'active' ? 'Tạm dừng' : 'Kích hoạt'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add/Edit Position Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingPosition ? 'Chỉnh sửa vị trí tuyển dụng' : 'Thêm vị trí tuyển dụng mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên vị trí"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phòng ban"
                                value={formData.department}
                                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Địa điểm"
                                value={formData.location}
                                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Loại công việc</InputLabel>
                                <Select
                                    value={formData.type}
                                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                                >
                                    <MenuItem value="full-time">Toàn thời gian</MenuItem>
                                    <MenuItem value="part-time">Bán thời gian</MenuItem>
                                    <MenuItem value="contract">Hợp đồng</MenuItem>
                                    <MenuItem value="internship">Thực tập</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Kinh nghiệm"
                                value={formData.experience}
                                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Lương tối thiểu"
                                type="number"
                                value={formData.salary.min}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    salary: { ...prev.salary, min: parseInt(e.target.value) }
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Lương tối đa"
                                type="number"
                                value={formData.salary.max}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    salary: { ...prev.salary, max: parseInt(e.target.value) }
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Hạn nộp hồ sơ"
                                type="date"
                                value={formData.deadline}
                                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Trạng thái</InputLabel>
                                <Select
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                                >
                                    <MenuItem value="active">Đang tuyển</MenuItem>
                                    <MenuItem value="inactive">Tạm dừng</MenuItem>
                                    <MenuItem value="closed">Đã đóng</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả công việc"
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isHot}
                                        onChange={(e) => setFormData(prev => ({ ...prev, isHot: e.target.checked }))}
                                    />
                                }
                                label="Vị trí Hot"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isUrgent}
                                        onChange={(e) => setFormData(prev => ({ ...prev, isUrgent: e.target.checked }))}
                                    />
                                }
                                label="Tuyển gấp"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSavePosition} variant="contained">
                        {editingPosition ? 'Cập nhật' : 'Thêm'}
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

export default JobPositionsManagement;
