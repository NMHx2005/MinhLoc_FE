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
    Eco as EcoIcon,
    Groups as GroupsIcon,
    Event as EventIcon,
    LocationOn as LocationIcon,
    CalendarToday as CalendarIcon,
} from '@mui/icons-material';

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
    const [activities, setActivities] = useState<SocialActivity[]>([
        {
            id: '1',
            title: 'Chương trình "Xây dựng tương lai"',
            description: 'Hỗ trợ xây dựng trường học cho trẻ em vùng sâu vùng xa',
            type: 'education',
            date: '2024-03-15',
            location: 'Tỉnh Đắk Lắk',
            participants: 50,
            budget: 500000000,
            images: ['/activities/school-building-1.jpg', '/activities/school-building-2.jpg'],
            impact: 'Xây dựng 2 trường học mới, hỗ trợ 500 học sinh',
            isActive: true,
            organizer: 'Phòng Nhân sự',
            status: 'completed',
        },
        {
            id: '2',
            title: 'Chiến dịch "Xanh hóa thành phố"',
            description: 'Trồng cây xanh và bảo vệ môi trường tại các khu vực công cộng',
            type: 'environment',
            date: '2024-04-22',
            location: 'Công viên Lê Văn Tám, TP.HCM',
            participants: 100,
            budget: 200000000,
            images: ['/activities/green-campaign-1.jpg'],
            impact: 'Trồng 1000 cây xanh, tạo không gian xanh cho cộng đồng',
            isActive: true,
            organizer: 'Phòng Marketing',
            status: 'ongoing',
        },
        {
            id: '3',
            title: 'Hỗ trợ người dân vùng lũ',
            description: 'Quyên góp và hỗ trợ trực tiếp người dân bị ảnh hưởng bởi lũ lụt',
            type: 'charity',
            date: '2024-01-10',
            location: 'Tỉnh Quảng Nam',
            participants: 30,
            budget: 1000000000,
            images: ['/activities/flood-relief-1.jpg', '/activities/flood-relief-2.jpg'],
            impact: 'Hỗ trợ 200 gia đình, cung cấp nhu yếu phẩm và tiền mặt',
            isActive: true,
            organizer: 'Ban Giám đốc',
            status: 'completed',
        },
        {
            id: '4',
            title: 'Giải chạy "Vì sức khỏe cộng đồng"',
            description: 'Tổ chức giải chạy marathon gây quỹ cho bệnh viện nhi',
            type: 'sports',
            date: '2024-05-20',
            location: 'Quận 1, TP.HCM',
            participants: 500,
            budget: 300000000,
            images: ['/activities/marathon-1.jpg'],
            impact: 'Gây quỹ 2 tỷ đồng cho bệnh viện Nhi đồng 1',
            isActive: true,
            organizer: 'Phòng Kinh doanh',
            status: 'planned',
        },
    ]);

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

    const handleSaveActivity = () => {
        if (editingActivity) {
            setActivities(prev => prev.map(activity =>
                activity.id === editingActivity.id
                    ? { ...formData, id: editingActivity.id }
                    : activity
            ));
        } else {
            const newActivity: SocialActivity = {
                ...formData,
                id: Date.now().toString(),
            };
            setActivities(prev => [...prev, newActivity]);
        }
        setDialogOpen(false);
    };

    const handleDeleteActivity = (activityId: string) => {
        setActivities(prev => prev.filter(activity => activity.id !== activityId));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    return (
        <Box>
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
                                                    <img
                                                        src={image}
                                                        alt={`Activity ${index + 1}`}
                                                        loading="lazy"
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
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveActivity} variant="contained">
                        {editingActivity ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CompanySocial;
