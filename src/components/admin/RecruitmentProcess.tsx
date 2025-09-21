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
    Switch,
    FormControlLabel,
    Snackbar,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Timeline as ProcessIcon,
    Person as PersonIcon,
    Group as GroupIcon,
    CheckCircle as CheckIcon,
    Schedule as ScheduleIcon,
} from '@mui/icons-material';

interface ProcessStep {
    id: string;
    name: string;
    description: string;
    order: number;
    duration: number; // in days
    responsible: string;
    requirements: string[];
    isActive: boolean;
}

interface RecruitmentProcess {
    id: string;
    name: string;
    description: string;
    steps: ProcessStep[];
    totalDuration: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const RecruitmentProcess: React.FC = () => {
    const [processes, setProcesses] = useState<RecruitmentProcess[]>([
        {
            id: '1',
            name: 'Quy trình tuyển dụng cơ bản',
            description: 'Quy trình tuyển dụng cho các vị trí cơ bản',
            steps: [
                {
                    id: '1-1',
                    name: 'Nhận hồ sơ ứng tuyển',
                    description: 'Nhận và kiểm tra hồ sơ ứng tuyển từ các kênh tuyển dụng',
                    order: 1,
                    duration: 1,
                    responsible: 'Phòng Nhân sự',
                    requirements: ['CV', 'Thư xin việc', 'Bằng cấp'],
                    isActive: true,
                },
                {
                    id: '1-2',
                    name: 'Sàng lọc hồ sơ',
                    description: 'Sàng lọc và đánh giá hồ sơ ứng viên phù hợp',
                    order: 2,
                    duration: 2,
                    responsible: 'Phòng Nhân sự',
                    requirements: ['Đáp ứng yêu cầu cơ bản', 'Kinh nghiệm phù hợp'],
                    isActive: true,
                },
                {
                    id: '1-3',
                    name: 'Phỏng vấn vòng 1',
                    description: 'Phỏng vấn với HR về thông tin cá nhân và động cơ',
                    order: 3,
                    duration: 1,
                    responsible: 'Phòng Nhân sự',
                    requirements: ['Thái độ tích cực', 'Giao tiếp tốt'],
                    isActive: true,
                },
                {
                    id: '1-4',
                    name: 'Phỏng vấn vòng 2',
                    description: 'Phỏng vấn kỹ thuật với trưởng phòng',
                    order: 4,
                    duration: 1,
                    responsible: 'Trưởng phòng',
                    requirements: ['Kiến thức chuyên môn', 'Kinh nghiệm thực tế'],
                    isActive: true,
                },
                {
                    id: '1-5',
                    name: 'Quyết định tuyển dụng',
                    description: 'Hội đồng quyết định và thông báo kết quả',
                    order: 5,
                    duration: 1,
                    responsible: 'Ban Giám đốc',
                    requirements: ['Đạt yêu cầu tất cả vòng'],
                    isActive: true,
                },
            ],
            totalDuration: 6,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
        {
            id: '2',
            name: 'Quy trình tuyển dụng cấp cao',
            description: 'Quy trình tuyển dụng cho các vị trí quản lý cấp cao',
            steps: [
                {
                    id: '2-1',
                    name: 'Nhận hồ sơ ứng tuyển',
                    description: 'Nhận và kiểm tra hồ sơ ứng tuyển từ các kênh tuyển dụng',
                    order: 1,
                    duration: 1,
                    responsible: 'Phòng Nhân sự',
                    requirements: ['CV', 'Thư xin việc', 'Bằng cấp', 'Chứng chỉ'],
                    isActive: true,
                },
                {
                    id: '2-2',
                    name: 'Sàng lọc hồ sơ',
                    description: 'Sàng lọc và đánh giá hồ sơ ứng viên phù hợp',
                    order: 2,
                    duration: 3,
                    responsible: 'Phòng Nhân sự',
                    requirements: ['Đáp ứng yêu cầu cao', 'Kinh nghiệm quản lý'],
                    isActive: true,
                },
                {
                    id: '2-3',
                    name: 'Phỏng vấn HR',
                    description: 'Phỏng vấn với HR về thông tin cá nhân và động cơ',
                    order: 3,
                    duration: 1,
                    responsible: 'Phòng Nhân sự',
                    requirements: ['Thái độ tích cực', 'Giao tiếp tốt'],
                    isActive: true,
                },
                {
                    id: '2-4',
                    name: 'Phỏng vấn kỹ thuật',
                    description: 'Phỏng vấn kỹ thuật với trưởng phòng',
                    order: 4,
                    duration: 1,
                    responsible: 'Trưởng phòng',
                    requirements: ['Kiến thức chuyên môn', 'Kinh nghiệm thực tế'],
                    isActive: true,
                },
                {
                    id: '2-5',
                    name: 'Phỏng vấn Ban Giám đốc',
                    description: 'Phỏng vấn với Ban Giám đốc về tầm nhìn và chiến lược',
                    order: 5,
                    duration: 1,
                    responsible: 'Ban Giám đốc',
                    requirements: ['Tầm nhìn chiến lược', 'Kinh nghiệm quản lý'],
                    isActive: true,
                },
                {
                    id: '2-6',
                    name: 'Quyết định tuyển dụng',
                    description: 'Hội đồng quyết định và thông báo kết quả',
                    order: 6,
                    duration: 2,
                    responsible: 'Ban Giám đốc',
                    requirements: ['Đạt yêu cầu tất cả vòng'],
                    isActive: true,
                },
            ],
            totalDuration: 9,
            isActive: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
        },
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProcess, setEditingProcess] = useState<RecruitmentProcess | null>(null);
    const [formData, setFormData] = useState<Omit<RecruitmentProcess, 'id' | 'totalDuration' | 'createdAt' | 'updatedAt'>>({
        name: '',
        description: '',
        steps: [],
        isActive: true,
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const calculateTotalDuration = (steps: ProcessStep[]) => {
        return steps.reduce((total, step) => total + step.duration, 0);
    };

    const handleAddProcess = () => {
        setEditingProcess(null);
        setFormData({
            name: '',
            description: '',
            steps: [],
            isActive: true,
        });
        setDialogOpen(true);
    };

    const handleEditProcess = (process: RecruitmentProcess) => {
        setEditingProcess(process);
        setFormData({
            name: process.name,
            description: process.description,
            steps: process.steps,
            isActive: process.isActive,
        });
        setDialogOpen(true);
    };

    const handleSaveProcess = () => {
        const totalDuration = calculateTotalDuration(formData.steps);

        if (editingProcess) {
            setProcesses(prev => prev.map(process =>
                process.id === editingProcess.id
                    ? {
                        ...formData,
                        id: editingProcess.id,
                        totalDuration,
                        createdAt: process.createdAt,
                        updatedAt: new Date().toISOString().split('T')[0]
                    }
                    : process
            ));
            setSnackbarMessage('Cập nhật quy trình tuyển dụng thành công!');
        } else {
            const newProcess: RecruitmentProcess = {
                ...formData,
                id: Date.now().toString(),
                totalDuration,
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            };
            setProcesses(prev => [...prev, newProcess]);
            setSnackbarMessage('Thêm quy trình tuyển dụng thành công!');
        }
        setSnackbarOpen(true);
        setDialogOpen(false);
    };

    const handleDeleteProcess = (processId: string) => {
        setProcesses(prev => prev.filter(process => process.id !== processId));
        setSnackbarMessage('Xóa quy trình tuyển dụng thành công!');
        setSnackbarOpen(true);
    };

    const handleToggleStatus = (processId: string) => {
        setProcesses(prev => prev.map(process =>
            process.id === processId
                ? {
                    ...process,
                    isActive: !process.isActive,
                    updatedAt: new Date().toISOString().split('T')[0]
                }
                : process
        ));
        setSnackbarMessage('Cập nhật trạng thái quy trình thành công!');
        setSnackbarOpen(true);
    };

    const handleAddStep = () => {
        const newStep: ProcessStep = {
            id: Date.now().toString(),
            name: '',
            description: '',
            order: formData.steps.length + 1,
            duration: 1,
            responsible: '',
            requirements: [],
            isActive: true,
        };
        setFormData(prev => ({
            ...prev,
            steps: [...prev.steps, newStep]
        }));
    };

    const handleUpdateStep = (stepId: string, updatedStep: ProcessStep) => {
        setFormData(prev => ({
            ...prev,
            steps: prev.steps.map(step => step.id === stepId ? updatedStep : step)
        }));
    };

    const handleDeleteStep = (stepId: string) => {
        setFormData(prev => ({
            ...prev,
            steps: prev.steps.filter(step => step.id !== stepId)
        }));
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Quy trình tuyển dụng
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddProcess}
                >
                    Thêm quy trình
                </Button>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <ProcessIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {processes.length}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng quy trình
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
                                    <CheckIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {processes.filter(p => p.isActive).length}
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
                                    <ScheduleIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {Math.round(processes.reduce((sum, p) => sum + p.totalDuration, 0) / processes.length)} ngày
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Thời gian TB
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
                                    <GroupIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {processes.reduce((sum, p) => sum + p.steps.length, 0)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng bước
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Processes List */}
            <Grid container spacing={3}>
                {processes.map((process) => (
                    <Grid item xs={12} md={6} key={process.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                            {process.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {process.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                            <Chip
                                                label={process.isActive ? 'Hoạt động' : 'Tạm dừng'}
                                                color={process.isActive ? 'success' : 'default'}
                                                size="small"
                                            />
                                            <Chip
                                                label={`${process.totalDuration} ngày`}
                                                color="info"
                                                size="small"
                                            />
                                            <Chip
                                                label={`${process.steps.length} bước`}
                                                color="primary"
                                                size="small"
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
                                            onClick={() => handleToggleStatus(process.id)}
                                            color={process.isActive ? 'warning' : 'success'}
                                        >
                                            {process.isActive ? 'Tạm dừng' : 'Kích hoạt'}
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteProcess(process.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Stepper orientation="vertical">
                                    {process.steps.map((step) => (
                                        <Step key={step.id} active={step.isActive}>
                                            <StepLabel>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {step.name}
                                                </Typography>
                                            </StepLabel>
                                            <StepContent>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    {step.description}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {step.responsible}
                                                    </Typography>
                                                    <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary', ml: 1 }} />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {step.duration} ngày
                                                    </Typography>
                                                </Box>
                                                {step.requirements.length > 0 && (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {step.requirements.map((req, reqIndex) => (
                                                            <Chip key={reqIndex} label={req} size="small" variant="outlined" />
                                                        ))}
                                                    </Box>
                                                )}
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
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="lg" fullWidth>
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
                                rows={2}
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">
                                    Các bước trong quy trình
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddStep}
                                >
                                    Thêm bước
                                </Button>
                            </Box>
                        </Grid>
                        {formData.steps.map((step) => (
                            <Grid item xs={12} key={step.id}>
                                <Paper sx={{ p: 2, mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            Bước {step.order}: {step.name || 'Bước mới'}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteStep(step.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Tên bước"
                                                value={step.name}
                                                onChange={(e) => handleUpdateStep(step.id, { ...step, name: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Thời gian (ngày)"
                                                type="number"
                                                value={step.duration}
                                                onChange={(e) => handleUpdateStep(step.id, { ...step, duration: parseInt(e.target.value) })}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Mô tả"
                                                multiline
                                                rows={2}
                                                value={step.description}
                                                onChange={(e) => handleUpdateStep(step.id, { ...step, description: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Người phụ trách"
                                                value={step.responsible}
                                                onChange={(e) => handleUpdateStep(step.id, { ...step, responsible: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={step.isActive}
                                                        onChange={(e) => handleUpdateStep(step.id, { ...step, isActive: e.target.checked })}
                                                    />
                                                }
                                                label="Hoạt động"
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveProcess} variant="contained">
                        {editingProcess ? 'Cập nhật' : 'Thêm'}
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

export default RecruitmentProcess;
