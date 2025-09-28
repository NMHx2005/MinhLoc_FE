'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
    ImageList,
    ImageListItem,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Favorite as FavoriteIcon,
    School as SchoolIcon,
    VolunteerActivism as VolunteerIcon,
    Groups as GroupsIcon,
    Event as EventIcon,
    LocationOn as LocationIcon,
    CalendarToday as CalendarIcon,
    Nature as EcoIcon,
} from '@mui/icons-material';
import { companyService } from '../../services/admin/companyService';
import type { CompanyInfo } from '../../services/admin/companyService';
import { Alert, Snackbar, CircularProgress } from '@mui/material';

interface SocialActivity {
    id: string;
    title: string;
    description: string;
    type: 'education' | 'environment' | 'community' | 'charity' | 'sports' | 'culture';
    date: string;
    location: string;
    participants: number;
    budget: number;
    images: string[];
    impact: string;
    isActive: boolean;
    organizer: string;
    status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
}

const CompanySocial: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [activities, setActivities] = useState<SocialActivity[]>([]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingActivity, setEditingActivity] = useState<SocialActivity | null>(null);
    const [formData, setFormData] = useState<Omit<SocialActivity, 'id'>>({
        title: '',
        description: '',
        type: 'education',
        date: new Date().toISOString().split('T')[0],
        location: '',
        participants: 0,
        budget: 0,
        images: [],
        impact: '',
        isActive: true,
        organizer: '',
        status: 'planned',
    });

    // Load company social activities data from API
    const loadCompanySocial = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const info = await companyService.getCompanyInfoBySection('social_activities');
            if (info) {
                setCompanyInfo(info);
                // Convert activities to SocialActivity format
                const activitiesData = info.data?.activities || [];
                const socialActivities: SocialActivity[] = activitiesData.map((activity: any, index: number) => ({
                    id: activity._id || `activity-${index}`,
                    title: activity.title || '',
                    description: activity.description || '',
                    type: 'community' as const, // Default type
                    date: new Date().toISOString().split('T')[0],
                    location: '',
                    participants: 0,
                    budget: 0,
                    images: activity.image ? [activity.image] : [],
                    impact: '',
                    isActive: true,
                    organizer: '',
                    status: 'completed' as const,
                }));
                setActivities(socialActivities);
            }
        } catch (err) {
            console.error('Error loading company social activities data:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu hoạt động xã hội');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCompanySocial();
    }, [loadCompanySocial]);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'education':
                return <SchoolIcon />;
            case 'environment':
                return <EcoIcon />;
            case 'community':
                return <GroupsIcon />;
            case 'charity':
                return <VolunteerIcon />;
            case 'sports':
                return <EventIcon />;
            case 'culture':
                return <FavoriteIcon />;
            default:
                return <FavoriteIcon />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'education':
                return 'primary';
            case 'environment':
                return 'success';
            case 'community':
                return 'info';
            case 'charity':
                return 'warning';
            case 'sports':
                return 'secondary';
            case 'culture':
                return 'error';
            default:
                return 'primary';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'education':
                return 'Giáo dục';
            case 'environment':
                return 'Môi trường';
            case 'community':
                return 'Cộng đồng';
            case 'charity':
                return 'Từ thiện';
            case 'sports':
                return 'Thể thao';
            case 'culture':
                return 'Văn hóa';
            default:
                return 'Khác';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'planned':
                return 'info';
            case 'ongoing':
                return 'warning';
            case 'completed':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'planned':
                return 'Dự kiến';
            case 'ongoing':
                return 'Đang diễn ra';
            case 'completed':
                return 'Hoàn thành';
            case 'cancelled':
                return 'Hủy bỏ';
            default:
                return 'Không xác định';
        }
    };

    const handleAddActivity = () => {
        setEditingActivity(null);
        setFormData({
            title: '',
            description: '',
            type: 'education',
            date: new Date().toISOString().split('T')[0],
            location: '',
            participants: 0,
            budget: 0,
            images: [],
            impact: '',
            isActive: true,
            organizer: '',
            status: 'planned',
        });
        setDialogOpen(true);
    };

    const handleEditActivity = (activity: SocialActivity) => {
        setEditingActivity(activity);
        setFormData({
            title: activity.title,
            description: activity.description,
            type: activity.type,
            date: activity.date,
            location: activity.location,
            participants: activity.participants,
            budget: activity.budget,
            images: activity.images,
            impact: activity.impact,
            isActive: activity.isActive,
            organizer: activity.organizer,
            status: activity.status,
        });
        setDialogOpen(true);
    };

    const handleSaveActivity = async () => {
        setSaving(true);
        try {
            let updatedActivities: SocialActivity[];

            if (editingActivity) {
                updatedActivities = activities.map(activity =>
                    activity.id === editingActivity.id
                        ? { ...formData, id: editingActivity.id }
                        : activity
                );
            } else {
                const newActivity: SocialActivity = {
                    ...formData,
                    id: Date.now().toString(),
                };
                updatedActivities = [...activities, newActivity];
            }

            setActivities(updatedActivities);

            // Convert activities back to API format and save
            const activitiesData = updatedActivities.map(activity => ({
                title: activity.title,
                description: activity.description,
                image: activity.images[0] || '',
            }));

            const dataToSave = {
                section: 'social_activities',
                title: companyInfo?.title || 'Hoạt động xã hội và trách nhiệm cộng đồng',
                content: companyInfo?.content || '',
                data: {
                    activities: activitiesData,
                    achievements: companyInfo?.data?.achievements || [],
                },
                sortOrder: 6
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Lưu hoạt động xã hội thành công!');
            setSnackbarOpen(true);
            setDialogOpen(false);
            await loadCompanySocial();
        } catch (error) {
            console.error('Error saving social activity:', error);
            setSnackbarMessage('❌ Lỗi khi lưu hoạt động xã hội');
            setSnackbarOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteActivity = async (activityId: string) => {
        try {
            const updatedActivities = activities.filter(activity => activity.id !== activityId);
            setActivities(updatedActivities);

            // Convert activities back to API format and save
            const activitiesData = updatedActivities.map(activity => ({
                title: activity.title,
                description: activity.description,
                image: activity.images[0] || '',
            }));

            const dataToSave = {
                section: 'social_activities',
                title: companyInfo?.title || 'Hoạt động xã hội và trách nhiệm cộng đồng',
                content: companyInfo?.content || '',
                data: {
                    activities: activitiesData,
                    achievements: companyInfo?.data?.achievements || [],
                },
                sortOrder: 6
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Xóa hoạt động xã hội thành công!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting social activity:', error);
            setSnackbarMessage('❌ Lỗi khi xóa hoạt động xã hội');
            setSnackbarOpen(true);
            await loadCompanySocial();
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải thông tin hoạt động xã hội...</Typography>
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
                    Hoạt động xã hội
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddActivity}
                >
                    Thêm hoạt động
                </Button>
            </Box>

            <Grid container spacing={3}>
                {activities.map((activity) => (
                    <Grid item xs={12} md={6} lg={4} key={activity.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: `${getTypeColor(activity.type)}.main`,
                                                width: 50,
                                                height: 50
                                            }}
                                        >
                                            {getTypeIcon(activity.type)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {activity.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                <Chip
                                                    label={getTypeLabel(activity.type)}
                                                    size="small"
                                                    color={getTypeColor(activity.type) as any}
                                                />
                                                <Chip
                                                    label={getStatusLabel(activity.status)}
                                                    size="small"
                                                    color={getStatusColor(activity.status) as any}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditActivity(activity)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteActivity(activity.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {activity.description}
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <CalendarIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(activity.date).toLocaleDateString('vi-VN')}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocationIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {activity.location}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {activity.participants} người tham gia
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Ngân sách: {formatCurrency(activity.budget)}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        Tác động:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {activity.impact}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        Tổ chức: {activity.organizer}
                                    </Typography>
                                </Box>

                                {activity.images.length > 0 && (
                                    <Box sx={{ mt: 2 }}>
                                        <ImageList sx={{ width: '100%', height: 100 }} cols={2} rowHeight={100}>
                                            {activity.images.map((image, index) => (
                                                <ImageListItem key={index}>
                                                    <Image
                                                        src={image}
                                                        width={100}
                                                        height={100}
                                                        alt={`Activity ${index + 1}`}
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add/Edit Activity Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingActivity ? 'Chỉnh sửa hoạt động' : 'Thêm hoạt động mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên hoạt động"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Loại hoạt động"
                                value={formData.type}
                                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                                SelectProps={{ native: true }}
                            >
                                <option value="education">Giáo dục</option>
                                <option value="environment">Môi trường</option>
                                <option value="community">Cộng đồng</option>
                                <option value="charity">Từ thiện</option>
                                <option value="sports">Thể thao</option>
                                <option value="culture">Văn hóa</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Trạng thái"
                                value={formData.status}
                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                                SelectProps={{ native: true }}
                            >
                                <option value="planned">Dự kiến</option>
                                <option value="ongoing">Đang diễn ra</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="cancelled">Hủy bỏ</option>
                            </TextField>
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
                                label="Ngày tổ chức"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                InputLabelProps={{ shrink: true }}
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
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Số người tham gia"
                                type="number"
                                value={formData.participants}
                                onChange={(e) => setFormData(prev => ({ ...prev, participants: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Ngân sách (VND)"
                                type="number"
                                value={formData.budget}
                                onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Tổ chức bởi"
                                value={formData.organizer}
                                onChange={(e) => setFormData(prev => ({ ...prev, organizer: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tác động"
                                multiline
                                rows={2}
                                value={formData.impact}
                                onChange={(e) => setFormData(prev => ({ ...prev, impact: e.target.value }))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} disabled={saving}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSaveActivity}
                        variant="contained"
                        disabled={saving}
                        startIcon={saving ? <CircularProgress size={20} /> : undefined}
                    >
                        {saving ? 'Đang lưu...' : (editingActivity ? 'Cập nhật' : 'Thêm')}
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

export default CompanySocial;
