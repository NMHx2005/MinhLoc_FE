'use client'

import React, { useState, useEffect, useCallback } from 'react';
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
import { companyService } from '../../services/admin/companyService';
import type { CompanyInfo } from '../../services/admin/companyService';
import { Alert, Snackbar, CircularProgress } from '@mui/material';

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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [advantages, setAdvantages] = useState<CompetitiveAdvantage[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);

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

    // Load company competitive data from API
    const loadCompanyCompetitive = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const info = await companyService.getCompanyInfoBySection('competitiveness');
            if (info) {
                setCompanyInfo(info);
                // Convert strengths to advantages
                const strengths = info.data?.strengths || [];
                const competitiveAdvantages: CompetitiveAdvantage[] = strengths.map((strength: any, index: number) => ({
                    id: strength._id || `strength-${index}`,
                    title: strength.title || '',
                    description: strength.description || '',
                    icon: strength.icon || 'experience',
                    category: 'experience' as const,
                    isActive: true,
                }));
                setAdvantages(competitiveAdvantages);
            }
        } catch (err) {
            console.error('Error loading company competitive data:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu năng lực cạnh tranh');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCompanyCompetitive();
    }, [loadCompanyCompetitive]);

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

    const handleSaveAdvantage = async () => {
        setSaving(true);
        try {
            let updatedAdvantages: CompetitiveAdvantage[];

            if (editingAdvantage) {
                updatedAdvantages = advantages.map(adv =>
                    adv.id === editingAdvantage.id
                        ? { ...advantageFormData, id: editingAdvantage.id }
                        : adv
                );
            } else {
                const newAdvantage: CompetitiveAdvantage = {
                    ...advantageFormData,
                    id: Date.now().toString(),
                };
                updatedAdvantages = [...advantages, newAdvantage];
            }

            setAdvantages(updatedAdvantages);

            // Convert advantages back to strengths format and save to API
            const strengths = updatedAdvantages.map(adv => ({
                title: adv.title,
                description: adv.description,
                icon: adv.icon,
                color: '#2196f3', // Default color
            }));

            const dataToSave = {
                section: 'competitiveness',
                title: companyInfo?.title || 'Năng lực cạnh tranh và thế mạnh',
                content: companyInfo?.content || '',
                data: {
                    strengths: strengths,
                },
                sortOrder: 3
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Lưu thông tin năng lực cạnh tranh thành công!');
            setSnackbarOpen(true);
            setAdvantageDialogOpen(false);
            await loadCompanyCompetitive();
        } catch (error) {
            console.error('Error saving competitive advantage:', error);
            setSnackbarMessage('❌ Lỗi khi lưu thông tin năng lực cạnh tranh');
            setSnackbarOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAdvantage = async (advantageId: string) => {
        try {
            const updatedAdvantages = advantages.filter(adv => adv.id !== advantageId);
            setAdvantages(updatedAdvantages);

            // Convert advantages back to strengths format and save to API
            const strengths = updatedAdvantages.map(adv => ({
                title: adv.title,
                description: adv.description,
                icon: adv.icon,
                color: '#2196f3', // Default color
            }));

            const dataToSave = {
                section: 'competitiveness',
                title: companyInfo?.title || 'Năng lực cạnh tranh và thế mạnh',
                content: companyInfo?.content || '',
                data: {
                    strengths: strengths,
                },
                sortOrder: 3
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Xóa thế mạnh thành công!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting advantage:', error);
            setSnackbarMessage('❌ Lỗi khi xóa thế mạnh');
            setSnackbarOpen(true);
            await loadCompanyCompetitive();
        }
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

    const handleSaveAchievement = async () => {
        setSaving(true);
        try {
            let updatedAchievements: Achievement[];

            if (editingAchievement) {
                updatedAchievements = achievements.map(ach =>
                    ach.id === editingAchievement.id
                        ? { ...achievementFormData, id: editingAchievement.id }
                        : ach
                );
            } else {
                const newAchievement: Achievement = {
                    ...achievementFormData,
                    id: Date.now().toString(),
                };
                updatedAchievements = [...achievements, newAchievement];
            }

            setAchievements(updatedAchievements);

            // Convert achievements to API format and save
            const achievementsData = updatedAchievements.map(ach => ({
                number: ach.value,
                label: ach.title,
            }));

            const dataToSave = {
                section: 'competitiveness',
                title: companyInfo?.title || 'Năng lực cạnh tranh và thế mạnh',
                content: companyInfo?.content || '',
                data: {
                    strengths: advantages.map(adv => ({
                        title: adv.title,
                        description: adv.description,
                        icon: adv.icon,
                        color: '#2196f3',
                    })),
                    achievements: achievementsData,
                },
                sortOrder: 3
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Lưu thành tựu thành công!');
            setSnackbarOpen(true);
            setAchievementDialogOpen(false);
            await loadCompanyCompetitive();
        } catch (error) {
            console.error('Error saving achievement:', error);
            setSnackbarMessage('❌ Lỗi khi lưu thành tựu');
            setSnackbarOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAchievement = async (achievementId: string) => {
        try {
            const updatedAchievements = achievements.filter(ach => ach.id !== achievementId);
            setAchievements(updatedAchievements);

            // Convert achievements to API format and save
            const achievementsData = updatedAchievements.map(ach => ({
                number: ach.value,
                label: ach.title,
            }));

            const dataToSave = {
                section: 'competitiveness',
                title: companyInfo?.title || 'Năng lực cạnh tranh và thế mạnh',
                content: companyInfo?.content || '',
                data: {
                    strengths: advantages.map(adv => ({
                        title: adv.title,
                        description: adv.description,
                        icon: adv.icon,
                        color: '#2196f3',
                    })),
                    achievements: achievementsData,
                },
                sortOrder: 3
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Xóa thành tựu thành công!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting achievement:', error);
            setSnackbarMessage('❌ Lỗi khi xóa thành tựu');
            setSnackbarOpen(true);
            await loadCompanyCompetitive();
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải thông tin năng lực cạnh tranh...</Typography>
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
                                                    <Typography variant="h6" component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <span>{advantage.title}</span>
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
                                                    </Typography>
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
                    <Button onClick={() => setAchievementDialogOpen(false)} disabled={saving}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSaveAchievement}
                        variant="contained"
                        disabled={saving}
                        startIcon={saving ? <CircularProgress size={20} /> : undefined}
                    >
                        {saving ? 'Đang lưu...' : (editingAchievement ? 'Cập nhật' : 'Thêm')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarMessage.includes('✅') ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CompanyCompetitive;
