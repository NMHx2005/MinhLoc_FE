'use client'

import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
    Alert,
    CircularProgress,
    Avatar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CardGiftcard as GiftIcon,
    AttachMoney as MoneyIcon,
    HealthAndSafety as HealthIcon,
    School as SchoolIcon,
    Work as WorkIcon,
} from '@mui/icons-material';

interface Benefit {
    _id: string;
    name: string;
    description: string;
    category: 'salary' | 'insurance' | 'training' | 'work_life' | 'other';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const BenefitsManagement: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [benefits, setBenefits] = useState<Benefit[]>([]);

    // Mock data for benefits
    const mockBenefits: Benefit[] = [
        {
            _id: '1',
            name: 'Bảo hiểm y tế',
            description: 'Bảo hiểm y tế toàn diện cho nhân viên và gia đình.',
            category: 'insurance',
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        },
        {
            _id: '2',
            name: 'Thưởng tháng 13',
            description: 'Thưởng tháng 13 hàng năm dựa trên kết quả kinh doanh.',
            category: 'salary',
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        },
        {
            _id: '3',
            name: 'Đào tạo kỹ năng',
            description: 'Chương trình đào tạo và phát triển kỹ năng chuyên môn.',
            category: 'training',
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        },
        {
            _id: '4',
            name: 'Làm việc linh hoạt',
            description: 'Chế độ làm việc từ xa và giờ làm việc linh hoạt.',
            category: 'work_life',
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        },
        {
            _id: '5',
            name: 'Du lịch công ty',
            description: 'Chuyến du lịch hàng năm cho toàn thể nhân viên.',
            category: 'other',
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        }
    ];

    const loadBenefits = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            // Simulate API call
            setTimeout(() => {
                setBenefits(mockBenefits);
                setLoading(false);
            }, 1000);
        } catch (err) {
            console.error('Error loading benefits:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải danh sách phúc lợi');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadBenefits();
    }, [loadBenefits]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'other' as Benefit['category'],
        isActive: true
    });

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'salary':
                return <MoneyIcon />;
            case 'insurance':
                return <HealthIcon />;
            case 'training':
                return <SchoolIcon />;
            case 'work_life':
                return <WorkIcon />;
            default:
                return <GiftIcon />;
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'salary':
                return 'Lương thưởng';
            case 'insurance':
                return 'Bảo hiểm';
            case 'training':
                return 'Đào tạo';
            case 'work_life':
                return 'Cân bằng công việc';
            default:
                return 'Khác';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'salary':
                return 'success';
            case 'insurance':
                return 'info';
            case 'training':
                return 'warning';
            case 'work_life':
                return 'primary';
            default:
                return 'default';
        }
    };

    const handleAddBenefit = () => {
        setEditingBenefit(null);
        setFormData({
            name: '',
            description: '',
            category: 'other',
            isActive: true
        });
        setDialogOpen(true);
    };

    const handleEditBenefit = (benefit: Benefit) => {
        setEditingBenefit(benefit);
        setFormData({
            name: benefit.name,
            description: benefit.description,
            category: benefit.category,
            isActive: benefit.isActive
        });
        setDialogOpen(true);
    };

    const handleSaveBenefit = async () => {
        setSaving(true);
        try {
            // Simulate API call
            setTimeout(() => {
                setSnackbarMessage('✅ Lưu phúc lợi thành công!');
                setSnackbarOpen(true);
                setDialogOpen(false);
                loadBenefits();
                setSaving(false);
            }, 1000);
        } catch (error) {
            console.error('Error saving benefit:', error);
            setSnackbarMessage('❌ Lỗi khi lưu phúc lợi');
            setSnackbarOpen(true);
            setSaving(false);
        }
    };

    const handleDeleteBenefit = async (benefitId: string) => {
        try {
            // Simulate API call
            setTimeout(() => {
                setSnackbarMessage('✅ Xóa phúc lợi thành công!');
                setSnackbarOpen(true);
                loadBenefits();
            }, 1000);
        } catch (error) {
            console.error('Error deleting benefit:', error);
            setSnackbarMessage('❌ Lỗi khi xóa phúc lợi');
            setSnackbarOpen(true);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải danh sách phúc lợi...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

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

            <Grid container spacing={3}>
                {benefits.map((benefit) => (
                    <Grid item xs={12} md={6} lg={4} key={benefit._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: `${getCategoryColor(benefit.category)}.main`,
                                                width: 50,
                                                height: 50
                                            }}
                                        >
                                            {getCategoryIcon(benefit.category)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {benefit.name}
                                            </Typography>
                                            <Chip
                                                label={getCategoryLabel(benefit.category)}
                                                size="small"
                                                color={getCategoryColor(benefit.category) as any}
                                            />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditBenefit(benefit)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteBenefit(benefit._id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mb: 2,
                                        height: '3.2em',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block',
                                        lineHeight: 1.6
                                    }}
                                >
                                    {benefit.description.length > 120
                                        ? `${benefit.description.substring(0, 120)}...`
                                        : benefit.description
                                    }
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Chip
                                        label={benefit.isActive ? 'Đang áp dụng' : 'Tạm dừng'}
                                        size="small"
                                        color={benefit.isActive ? 'success' : 'default'}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

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
                            <FormControl fullWidth>
                                <InputLabel>Danh mục</InputLabel>
                                <Select
                                    value={formData.category}
                                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Benefit['category'] }))}
                                >
                                    <MenuItem value="salary">Lương thưởng</MenuItem>
                                    <MenuItem value="insurance">Bảo hiểm</MenuItem>
                                    <MenuItem value="training">Đào tạo</MenuItem>
                                    <MenuItem value="work_life">Cân bằng công việc</MenuItem>
                                    <MenuItem value="other">Khác</MenuItem>
                                </Select>
                            </FormControl>
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
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                                    />
                                }
                                label="Đang áp dụng"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveBenefit} variant="contained" disabled={saving}>
                        {saving ? 'Đang lưu...' : (editingBenefit ? 'Cập nhật' : 'Thêm')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarMessage.includes('❌') ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BenefitsManagement;