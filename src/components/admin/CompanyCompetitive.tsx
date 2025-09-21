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
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Star as StarIcon,
    TrendingUp as TrendingUpIcon,
    Security as SecurityIcon,
    Speed as SpeedIcon,
    Group as GroupIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface CompetitiveAdvantage {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: 'technology' | 'experience' | 'team' | 'process' | 'network';
    isActive: boolean;
}

interface Achievement {
    id: string;
    title: string;
    value: string;
    unit: string;
    description: string;
}

const CompanyCompetitive: React.FC = () => {
    const [advantages, setAdvantages] = useState<CompetitiveAdvantage[]>([
        {
            id: '1',
            title: 'Kinh nghiệm 15+ năm',
            description: 'Hơn 15 năm kinh nghiệm trong lĩnh vực xây dựng và bất động sản',
            icon: 'experience',
            category: 'experience',
            isActive: true,
        },
        {
            id: '2',
            title: 'Công nghệ tiên tiến',
            description: 'Ứng dụng công nghệ BIM, AI trong thiết kế và quản lý dự án',
            icon: 'technology',
            category: 'technology',
            isActive: true,
        },
        {
            id: '3',
            title: 'Đội ngũ chuyên nghiệp',
            description: 'Hơn 500 nhân viên có trình độ cao, được đào tạo bài bản',
            icon: 'team',
            category: 'team',
            isActive: true,
        },
        {
            id: '4',
            title: 'Quy trình chuẩn hóa',
            description: 'Quy trình quản lý dự án theo tiêu chuẩn quốc tế ISO 9001:2015',
            icon: 'process',
            category: 'process',
            isActive: true,
        },
    ]);

    const [achievements, setAchievements] = useState<Achievement[]>([
        {
            id: '1',
            title: 'Dự án đã hoàn thành',
            value: '1000+',
            unit: 'dự án',
            description: 'Từ nhà ở đến các dự án thương mại quy mô lớn',
        },
        {
            id: '2',
            title: 'Khách hàng hài lòng',
            value: '98%',
            unit: 'tỷ lệ',
            description: 'Tỷ lệ khách hàng hài lòng với chất lượng dịch vụ',
        },
        {
            id: '3',
            title: 'Thị phần',
            value: '15%',
            unit: 'TP.HCM',
            description: 'Thị phần bất động sản cao cấp tại TP.HCM',
        },
        {
            id: '4',
            title: 'Tăng trưởng',
            value: '25%',
            unit: 'năm',
            description: 'Tăng trưởng doanh thu trung bình hàng năm',
        },
    ]);

    const [advantageDialogOpen, setAdvantageDialogOpen] = useState(false);
    const [editingAdvantage, setEditingAdvantage] = useState<CompetitiveAdvantage | null>(null);
    const [advantageFormData, setAdvantageFormData] = useState<Omit<CompetitiveAdvantage, 'id'>>({
        title: '',
        description: '',
        icon: 'experience',
        category: 'experience',
        isActive: true,
    });

    const [achievementDialogOpen, setAchievementDialogOpen] = useState(false);
    const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
    const [achievementFormData, setAchievementFormData] = useState<Omit<Achievement, 'id'>>({
        title: '',
        value: '',
        unit: '',
        description: '',
    });

    const getIconComponent = (icon: string) => {
        switch (icon) {
            case 'experience':
                return <TrendingUpIcon />;
            case 'technology':
                return <SpeedIcon />;
            case 'team':
                return <GroupIcon />;
            case 'process':
                return <SecurityIcon />;
            case 'network':
                return <GroupIcon />;
            default:
                return <StarIcon />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'experience':
                return 'primary';
            case 'technology':
                return 'info';
            case 'team':
                return 'success';
            case 'process':
                return 'warning';
            case 'network':
                return 'secondary';
            default:
                return 'primary';
        }
    };

    const handleAddAdvantage = () => {
        setEditingAdvantage(null);
        setAdvantageFormData({
            title: '',
            description: '',
            icon: 'experience',
            category: 'experience',
            isActive: true,
        });
        setAdvantageDialogOpen(true);
    };

    const handleEditAdvantage = (advantage: CompetitiveAdvantage) => {
        setEditingAdvantage(advantage);
        setAdvantageFormData({
            title: advantage.title,
            description: advantage.description,
            icon: advantage.icon,
            category: advantage.category,
            isActive: advantage.isActive,
        });
        setAdvantageDialogOpen(true);
    };

    const handleSaveAdvantage = () => {
        if (editingAdvantage) {
            setAdvantages(prev => prev.map(adv =>
                adv.id === editingAdvantage.id
                    ? { ...advantageFormData, id: editingAdvantage.id }
                    : adv
            ));
        } else {
            const newAdvantage: CompetitiveAdvantage = {
                ...advantageFormData,
                id: Date.now().toString(),
            };
            setAdvantages(prev => [...prev, newAdvantage]);
        }
        setAdvantageDialogOpen(false);
    };

    const handleDeleteAdvantage = (advantageId: string) => {
        setAdvantages(prev => prev.filter(adv => adv.id !== advantageId));
    };

    const handleAddAchievement = () => {
        setEditingAchievement(null);
        setAchievementFormData({
            title: '',
            value: '',
            unit: '',
            description: '',
        });
        setAchievementDialogOpen(true);
    };

    const handleEditAchievement = (achievement: Achievement) => {
        setEditingAchievement(achievement);
        setAchievementFormData({
            title: achievement.title,
            value: achievement.value,
            unit: achievement.unit,
            description: achievement.description,
        });
        setAchievementDialogOpen(true);
    };

    const handleSaveAchievement = () => {
        if (editingAchievement) {
            setAchievements(prev => prev.map(ach =>
                ach.id === editingAchievement.id
                    ? { ...achievementFormData, id: editingAchievement.id }
                    : ach
            ));
        } else {
            const newAchievement: Achievement = {
                ...achievementFormData,
                id: Date.now().toString(),
            };
            setAchievements(prev => [...prev, newAchievement]);
        }
        setAchievementDialogOpen(false);
    };

    const handleDeleteAchievement = (achievementId: string) => {
        setAchievements(prev => prev.filter(ach => ach.id !== achievementId));
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Năng lực cạnh tranh
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Lợi thế cạnh tranh */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <StarIcon sx={{ mr: 1 }} />
                                    Lợi thế cạnh tranh
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddAdvantage}
                                    size="small"
                                >
                                    Thêm lợi thế
                                </Button>
                            </Box>

                            <List>
                                {advantages.map((advantage, index) => (
                                    <React.Fragment key={advantage.id}>
                                        <ListItem
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                py: 2,
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 40, mt: 1 }}>
                                                {getIconComponent(advantage.icon)}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography variant="h6">
                                                            {advantage.title}
                                                        </Typography>
                                                        <Chip
                                                            label={advantage.category}
                                                            size="small"
                                                            color={getCategoryColor(advantage.category) as any}
                                                        />
                                                        {advantage.isActive && (
                                                            <Chip
                                                                label="Hoạt động"
                                                                size="small"
                                                                color="success"
                                                            />
                                                        )}
                                                    </Box>
                                                }
                                                secondary={advantage.description}
                                            />
                                            <Box>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEditAdvantage(advantage)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteAdvantage(advantage.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </ListItem>
                                        {index < advantages.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Thành tựu nổi bật */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircleIcon sx={{ mr: 1 }} />
                                    Thành tựu
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddAchievement}
                                    size="small"
                                >
                                    Thêm
                                </Button>
                            </Box>

                            <List>
                                {achievements.map((achievement) => (
                                    <ListItem key={achievement.id} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                                            <Typography variant="h6" color="primary">
                                                {achievement.value} {achievement.unit}
                                            </Typography>
                                            <Box>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEditAchievement(achievement)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteAchievement(achievement.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            {achievement.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {achievement.description}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Add/Edit Advantage Dialog */}
            <Dialog open={advantageDialogOpen} onClose={() => setAdvantageDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingAdvantage ? 'Chỉnh sửa lợi thế cạnh tranh' : 'Thêm lợi thế cạnh tranh mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tiêu đề"
                                value={advantageFormData.title}
                                onChange={(e) => setAdvantageFormData(prev => ({ ...prev, title: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả"
                                multiline
                                rows={3}
                                value={advantageFormData.description}
                                onChange={(e) => setAdvantageFormData(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Loại"
                                value={advantageFormData.category}
                                onChange={(e) => setAdvantageFormData(prev => ({ ...prev, category: e.target.value as any }))}
                                SelectProps={{ native: true }}
                            >
                                <option value="experience">Kinh nghiệm</option>
                                <option value="technology">Công nghệ</option>
                                <option value="team">Đội ngũ</option>
                                <option value="process">Quy trình</option>
                                <option value="network">Mạng lưới</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Icon"
                                value={advantageFormData.icon}
                                onChange={(e) => setAdvantageFormData(prev => ({ ...prev, icon: e.target.value }))}
                                SelectProps={{ native: true }}
                            >
                                <option value="experience">Kinh nghiệm</option>
                                <option value="technology">Công nghệ</option>
                                <option value="team">Đội ngũ</option>
                                <option value="process">Quy trình</option>
                                <option value="network">Mạng lưới</option>
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAdvantageDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveAdvantage} variant="contained">
                        {editingAdvantage ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add/Edit Achievement Dialog */}
            <Dialog open={achievementDialogOpen} onClose={() => setAchievementDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingAchievement ? 'Chỉnh sửa thành tựu' : 'Thêm thành tựu mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tiêu đề"
                                value={achievementFormData.title}
                                onChange={(e) => setAchievementFormData(prev => ({ ...prev, title: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Giá trị"
                                value={achievementFormData.value}
                                onChange={(e) => setAchievementFormData(prev => ({ ...prev, value: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Đơn vị"
                                value={achievementFormData.unit}
                                onChange={(e) => setAchievementFormData(prev => ({ ...prev, unit: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả"
                                multiline
                                rows={2}
                                value={achievementFormData.description}
                                onChange={(e) => setAchievementFormData(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAchievementDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveAchievement} variant="contained">
                        {editingAchievement ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CompanyCompetitive;
