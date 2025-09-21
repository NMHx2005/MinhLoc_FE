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
    Avatar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CardGiftcard as BenefitsIcon,
    AttachMoney as MoneyIcon,
    HealthAndSafety as HealthIcon,
    School as EducationIcon,
    Work as WorkIcon,
    Home as HomeIcon,
    DirectionsCar as TransportIcon,
    Restaurant as FoodIcon,
} from '@mui/icons-material';

interface Benefit {
    id: string;
    name: string;
    description: string;
    type: 'salary' | 'insurance' | 'education' | 'work_life' | 'housing' | 'transport' | 'food' | 'other';
    value: number;
    currency: string;
    period: 'monthly' | 'yearly' | 'one_time';
    isActive: boolean;
    applicableTo: string[]; // Job positions or departments
    requirements: string[];
    createdAt: string;
    updatedAt: string;
}

const BenefitsManagement: React.FC = () => {
    const [benefits, setBenefits] = useState<Benefit[]>([
        {
            id: '1',
            name: 'Bảo hiểm sức khỏe toàn diện',
            description: 'Bảo hiểm sức khỏe cho nhân viên và gia đình',
            type: 'insurance',
            value: 2000000,
            currency: 'VND',
            period: 'monthly',
            isActive: true,
            applicableTo: ['Tất cả nhân viên'],
            requirements: ['Làm việc từ 3 tháng trở lên'],
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '2',
            name: 'Thưởng tháng 13',
            description: 'Thưởng cuối năm dựa trên hiệu suất làm việc',
            type: 'salary',
            value: 100,
            currency: 'PERCENT',
            period: 'yearly',
            isActive: true,
            applicableTo: ['Tất cả nhân viên'],
            requirements: ['Hoàn thành mục tiêu KPI'],
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '3',
            name: 'Hỗ trợ học tập',
            description: 'Hỗ trợ chi phí học tập và phát triển kỹ năng',
            type: 'education',
            value: 5000000,
            currency: 'VND',
            period: 'yearly',
            isActive: true,
            applicableTo: ['Tất cả nhân viên'],
            requirements: ['Khóa học liên quan đến công việc'],
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '4',
            name: 'Work from home',
            description: 'Làm việc từ xa 2 ngày/tuần',
            type: 'work_life',
            value: 0,
            currency: 'VND',
            period: 'monthly',
            isActive: true,
            applicableTo: ['Phòng Kỹ thuật', 'Phòng Kế hoạch'],
            requirements: ['Có kết nối internet ổn định'],
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '5',
            name: 'Hỗ trợ nhà ở',
            description: 'Trợ cấp nhà ở cho nhân viên ở xa',
            type: 'housing',
            value: 3000000,
            currency: 'VND',
            period: 'monthly',
            isActive: true,
            applicableTo: ['Nhân viên từ tỉnh khác'],
            requirements: ['Có hộ khẩu ngoài TP.HCM'],
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '6',
            name: 'Xe đưa đón',
            description: 'Xe đưa đón nhân viên từ các điểm tập trung',
            type: 'transport',
            value: 0,
            currency: 'VND',
            period: 'monthly',
            isActive: true,
            applicableTo: ['Tất cả nhân viên'],
            requirements: ['Đăng ký trước 1 tuần'],
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);
    const [formData, setFormData] = useState<Omit<Benefit, 'id' | 'createdAt' | 'updatedAt'>>({
        name: '',
        description: '',
        type: 'salary',
        value: 0,
        currency: 'VND',
        period: 'monthly',
        isActive: true,
        applicableTo: [],
        requirements: [],
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'salary':
                return <MoneyIcon />;
            case 'insurance':
                return <HealthIcon />;
            case 'education':
                return <EducationIcon />;
            case 'work_life':
                return <WorkIcon />;
            case 'housing':
                return <HomeIcon />;
            case 'transport':
                return <TransportIcon />;
            case 'food':
                return <FoodIcon />;
            default:
                return <BenefitsIcon />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'salary':
                return 'success';
            case 'insurance':
                return 'info';
            case 'education':
                return 'primary';
            case 'work_life':
                return 'warning';
            case 'housing':
                return 'secondary';
            case 'transport':
                return 'error';
            case 'food':
                return 'default';
            default:
                return 'primary';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'salary':
                return 'Lương thưởng';
            case 'insurance':
                return 'Bảo hiểm';
            case 'education':
                return 'Học tập';
            case 'work_life':
                return 'Cân bằng công việc';
            case 'housing':
                return 'Nhà ở';
            case 'transport':
                return 'Giao thông';
            case 'food':
                return 'Ăn uống';
            default:
                return 'Khác';
        }
    };

    const getPeriodLabel = (period: string) => {
        switch (period) {
            case 'monthly':
                return 'Hàng tháng';
            case 'yearly':
                return 'Hàng năm';
            case 'one_time':
                return 'Một lần';
            default:
                return 'Không xác định';
        }
    };

    const formatValue = (benefit: Benefit) => {
        if (benefit.value === 0) {
            return 'Miễn phí';
        }
        if (benefit.currency === 'PERCENT') {
            return `${benefit.value}%`;
        }
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(benefit.value);
    };

    const handleAddBenefit = () => {
        setEditingBenefit(null);
        setFormData({
            name: '',
            description: '',
            type: 'salary',
            value: 0,
            currency: 'VND',
            period: 'monthly',
            isActive: true,
            applicableTo: [],
            requirements: [],
        });
        setDialogOpen(true);
    };

    const handleEditBenefit = (benefit: Benefit) => {
        setEditingBenefit(benefit);
        setFormData({
            name: benefit.name,
            description: benefit.description,
            type: benefit.type,
            value: benefit.value,
            currency: benefit.currency,
            period: benefit.period,
            isActive: benefit.isActive,
            applicableTo: benefit.applicableTo,
            requirements: benefit.requirements,
        });
        setDialogOpen(true);
    };

    const handleSaveBenefit = () => {
        if (editingBenefit) {
            setBenefits(prev => prev.map(benefit =>
                benefit.id === editingBenefit.id
                    ? {
                        ...formData,
                        id: editingBenefit.id,
                        createdAt: benefit.createdAt,
                        updatedAt: new Date().toISOString().split('T')[0]
                    }
                    : benefit
            ));
            setSnackbarMessage('Cập nhật phúc lợi thành công!');
        } else {
            const newBenefit: Benefit = {
                ...formData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            };
            setBenefits(prev => [...prev, newBenefit]);
            setSnackbarMessage('Thêm phúc lợi thành công!');
        }
        setSnackbarOpen(true);
        setDialogOpen(false);
    };

    const handleDeleteBenefit = (benefitId: string) => {
        setBenefits(prev => prev.filter(benefit => benefit.id !== benefitId));
        setSnackbarMessage('Xóa phúc lợi thành công!');
        setSnackbarOpen(true);
    };

    const handleToggleStatus = (benefitId: string) => {
        setBenefits(prev => prev.map(benefit =>
            benefit.id === benefitId
                ? {
                    ...benefit,
                    isActive: !benefit.isActive,
                    updatedAt: new Date().toISOString().split('T')[0]
                }
                : benefit
        ));
        setSnackbarMessage('Cập nhật trạng thái phúc lợi thành công!');
        setSnackbarOpen(true);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Quản lý phúc lợi
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddBenefit}
                >
                    Thêm phúc lợi
                </Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <BenefitsIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {benefits.length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng phúc lợi
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
                                    <BenefitsIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {benefits.filter(b => b.isActive).length}
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
                                    <MoneyIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {benefits.filter(b => b.type === 'salary').length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lương thưởng
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
                                    <HealthIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {benefits.filter(b => b.type === 'insurance').length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Bảo hiểm
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Benefits Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Phúc lợi</TableCell>
                            <TableCell>Loại</TableCell>
                            <TableCell>Giá trị</TableCell>
                            <TableCell>Chu kỳ</TableCell>
                            <TableCell>Áp dụng cho</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {benefits.map((benefit) => (
                            <TableRow key={benefit.id}>
                                <TableCell>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {benefit.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {benefit.description}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        icon={getTypeIcon(benefit.type)}
                                        label={getTypeLabel(benefit.type)}
                                        color={getTypeColor(benefit.type) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {formatValue(benefit)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="text.secondary">
                                        {getPeriodLabel(benefit.period)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {benefit.applicableTo.map((item, index) => (
                                            <Chip key={index} label={item} size="small" variant="outlined" />
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={benefit.isActive ? 'Hoạt động' : 'Tạm dừng'}
                                        color={benefit.isActive ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleEditBenefit(benefit)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleToggleStatus(benefit.id)}
                                        color={benefit.isActive ? 'warning' : 'success'}
                                    >
                                        {benefit.isActive ? 'Tạm dừng' : 'Kích hoạt'}
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDeleteBenefit(benefit.id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Edit Benefit Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingBenefit ? 'Chỉnh sửa phúc lợi' : 'Thêm phúc lợi mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên phúc lợi"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                            <FormControl fullWidth>
                                <InputLabel>Loại phúc lợi</InputLabel>
                                <Select
                                    value={formData.type}
                                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                                >
                                    <MenuItem value="salary">Lương thưởng</MenuItem>
                                    <MenuItem value="insurance">Bảo hiểm</MenuItem>
                                    <MenuItem value="education">Học tập</MenuItem>
                                    <MenuItem value="work_life">Cân bằng công việc</MenuItem>
                                    <MenuItem value="housing">Nhà ở</MenuItem>
                                    <MenuItem value="transport">Giao thông</MenuItem>
                                    <MenuItem value="food">Ăn uống</MenuItem>
                                    <MenuItem value="other">Khác</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Chu kỳ</InputLabel>
                                <Select
                                    value={formData.period}
                                    onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value as any }))}
                                >
                                    <MenuItem value="monthly">Hàng tháng</MenuItem>
                                    <MenuItem value="yearly">Hàng năm</MenuItem>
                                    <MenuItem value="one_time">Một lần</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Giá trị"
                                type="number"
                                value={formData.value}
                                onChange={(e) => setFormData(prev => ({ ...prev, value: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Đơn vị</InputLabel>
                                <Select
                                    value={formData.currency}
                                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                                >
                                    <MenuItem value="VND">VND</MenuItem>
                                    <MenuItem value="PERCENT">Phần trăm</MenuItem>
                                </Select>
                            </FormControl>
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
                    <Button onClick={handleSaveBenefit} variant="contained">
                        {editingBenefit ? 'Cập nhật' : 'Thêm'}
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

export default BenefitsManagement;
