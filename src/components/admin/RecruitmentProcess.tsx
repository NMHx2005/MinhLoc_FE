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
    Stepper,
    Step,
    StepLabel,
    StepContent,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Assignment as AssignmentIcon,
    PersonSearch as PersonSearchIcon,
    Quiz as QuizIcon,
    Group as GroupIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface ProcessStep {
    _id: string;
    name: string;
    description: string;
    order: number;
    isActive: boolean;
    estimatedDays: number;
}

interface RecruitmentProcess {
    _id: string;
    name: string;
    description: string;
    steps: ProcessStep[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const RecruitmentProcess: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [processes, setProcesses] = useState<RecruitmentProcess[]>([]);

    // Mock data for recruitment processes
    const mockProcesses: RecruitmentProcess[] = [
        {
            _id: '1',
            name: 'Quy trình tuyển dụng cơ bản',
            description: 'Quy trình tuyển dụng chuẩn cho các vị trí thông thường.',
            steps: [
                {
                    _id: '1-1',
                    name: 'Sàng lọc hồ sơ',
                    description: 'Xem xét và sàng lọc hồ sơ ứng viên.',
                    order: 1,
                    isActive: true,
                    estimatedDays: 2
                },
                {
                    _id: '1-2',
                    name: 'Phỏng vấn vòng 1',
                    description: 'Phỏng vấn trực tiếp với HR.',
                    order: 2,
                    isActive: true,
                    estimatedDays: 3
                },
                {
                    _id: '1-3',
                    name: 'Phỏng vấn vòng 2',
                    description: 'Phỏng vấn với trưởng phòng.',
                    order: 3,
                    isActive: true,
                    estimatedDays: 5
                },
                {
                    _id: '1-4',
                    name: 'Quyết định tuyển dụng',
                    description: 'Đánh giá cuối cùng và quyết định.',
                    order: 4,
                    isActive: true,
                    estimatedDays: 2
                }
            ],
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        },
        {
            _id: '2',
            name: 'Quy trình tuyển dụng cấp cao',
            description: 'Quy trình tuyển dụng cho các vị trí quản lý và cấp cao.',
            steps: [
                {
                    _id: '2-1',
                    name: 'Sàng lọc hồ sơ',
                    description: 'Xem xét và sàng lọc hồ sơ ứng viên.',
                    order: 1,
                    isActive: true,
                    estimatedDays: 3
                },
                {
                    _id: '2-2',
                    name: 'Phỏng vấn HR',
                    description: 'Phỏng vấn với bộ phận nhân sự.',
                    order: 2,
                    isActive: true,
                    estimatedDays: 2
                },
                {
                    _id: '2-3',
                    name: 'Phỏng vấn kỹ thuật',
                    description: 'Phỏng vấn kỹ thuật với chuyên gia.',
                    order: 3,
                    isActive: true,
                    estimatedDays: 3
                },
                {
                    _id: '2-4',
                    name: 'Phỏng vấn ban giám đốc',
                    description: 'Phỏng vấn với ban giám đốc.',
                    order: 4,
                    isActive: true,
                    estimatedDays: 5
                },
                {
                    _id: '2-5',
                    name: 'Quyết định tuyển dụng',
                    description: 'Đánh giá cuối cùng và quyết định.',
                    order: 5,
                    isActive: true,
                    estimatedDays: 3
                }
            ],
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
        }
    ];

    const loadProcesses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            // Simulate API call
            setTimeout(() => {
                setProcesses(mockProcesses);
                setLoading(false);
            }, 1000);
        } catch (err) {
            console.error('Error loading processes:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải danh sách quy trình tuyển dụng');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProcesses();
    }, [loadProcesses]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProcess, setEditingProcess] = useState<RecruitmentProcess | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        isActive: true
    });

    const getStepIcon = (order: number) => {
        switch (order) {
            case 1:
                return <PersonSearchIcon />;
            case 2:
                return <QuizIcon />;
            case 3:
                return <GroupIcon />;
            default:
                return <CheckCircleIcon />;
        }
    };

    const handleAddProcess = () => {
        setEditingProcess(null);
        setFormData({
            name: '',
            description: '',
            isActive: true
        });
        setDialogOpen(true);
    };

    const handleEditProcess = (process: RecruitmentProcess) => {
        setEditingProcess(process);
        setFormData({
            name: process.name,
            description: process.description,
            isActive: process.isActive
        });
        setDialogOpen(true);
    };

    const handleSaveProcess = async () => {
        setSaving(true);
        try {
            // Simulate API call
            setTimeout(() => {
                setSnackbarMessage('✅ Lưu quy trình tuyển dụng thành công!');
                setSnackbarOpen(true);
                setDialogOpen(false);
                loadProcesses();
                setSaving(false);
            }, 1000);
        } catch (error) {
            console.error('Error saving process:', error);
            setSnackbarMessage('❌ Lỗi khi lưu quy trình tuyển dụng');
            setSnackbarOpen(true);
            setSaving(false);
        }
    };

    const handleDeleteProcess = async (processId: string) => {
        try {
            // Simulate API call
            setTimeout(() => {
                setSnackbarMessage('✅ Xóa quy trình tuyển dụng thành công!');
                setSnackbarOpen(true);
                loadProcesses();
            }, 1000);
        } catch (error) {
            console.error('Error deleting process:', error);
            setSnackbarMessage('❌ Lỗi khi xóa quy trình tuyển dụng');
            setSnackbarOpen(true);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải danh sách quy trình tuyển dụng...</Typography>
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
                    Quản lý quy trình tuyển dụng
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddProcess}
                >
                    Thêm quy trình
                </Button>
            </Box>

            <Grid container spacing={3}>
                {processes.map((process) => (
                    <Grid item xs={12} key={process._id}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: 'primary.main',
                                                width: 50,
                                                height: 50
                                            }}
                                        >
                                            <AssignmentIcon />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {process.name}
                                            </Typography>
                                            <Chip
                                                label={process.isActive ? 'Đang sử dụng' : 'Tạm dừng'}
                                                size="small"
                                                color={process.isActive ? 'success' : 'default'}
                                            />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditProcess(process)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteProcess(process._id)}
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
                                        mb: 3,
                                        height: '3.2em',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block',
                                        lineHeight: 1.6
                                    }}
                                >
                                    {process.description.length > 120
                                        ? `${process.description.substring(0, 120)}...`
                                        : process.description
                                    }
                                </Typography>

                                <Stepper orientation="vertical">
                                    {process.steps.map((step, index) => (
                                        <Step key={step._id} active={step.isActive}>
                                            <StepLabel
                                                icon={
                                                    <Avatar
                                                        sx={{
                                                            bgcolor: step.isActive ? 'primary.main' : 'grey.300',
                                                            width: 32,
                                                            height: 32
                                                        }}
                                                    >
                                                        {getStepIcon(step.order)}
                                                    </Avatar>
                                                }
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                        {step.name}
                                                    </Typography>
                                                    <Chip
                                                        label={`${step.estimatedDays} ngày`}
                                                        size="small"
                                                        color="info"
                                                    />
                                                </Box>
                                            </StepLabel>
                                            <StepContent>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                    {step.description}
                                                </Typography>
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add/Edit Process Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingProcess ? 'Chỉnh sửa quy trình tuyển dụng' : 'Thêm quy trình tuyển dụng mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên quy trình"
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
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveProcess} variant="contained" disabled={saving}>
                        {saving ? 'Đang lưu...' : (editingProcess ? 'Cập nhật' : 'Thêm')}
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

export default RecruitmentProcess;