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
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Business as BusinessIcon,
    TrendingUp as TrendingUpIcon,
    Star as StarIcon,
} from '@mui/icons-material';

interface HistoryEvent {
    id: string;
    year: number;
    title: string;
    description: string;
    type: 'milestone' | 'achievement' | 'expansion' | 'award';
    isImportant: boolean;
}

const CompanyHistory: React.FC = () => {
    const [events, setEvents] = useState<HistoryEvent[]>([
        {
            id: '1',
            year: 2008,
            title: 'Thành lập MinhLoc Group',
            description: 'MinhLoc Group được thành lập với tầm nhìn trở thành tập đoàn đa ngành hàng đầu Việt Nam.',
            type: 'milestone',
            isImportant: true,
        },
        {
            id: '2',
            year: 2010,
            title: 'Dự án đầu tiên',
            description: 'Hoàn thành dự án chung cư đầu tiên tại TP.HCM với 200 căn hộ.',
            type: 'achievement',
            isImportant: false,
        },
        {
            id: '3',
            year: 2015,
            title: 'Mở rộng ra Hà Nội',
            description: 'Thành lập chi nhánh tại Hà Nội và bắt đầu các dự án bất động sản tại miền Bắc.',
            type: 'expansion',
            isImportant: true,
        },
        {
            id: '4',
            year: 2018,
            title: 'Giải thưởng Doanh nghiệp Xanh',
            description: 'Nhận giải thưởng Doanh nghiệp Xanh 2018 cho các dự án phát triển bền vững.',
            type: 'award',
            isImportant: true,
        },
        {
            id: '5',
            year: 2020,
            title: 'Diversification Strategy',
            description: 'Mở rộng sang lĩnh vực đầu tư tài chính và quản lý tài sản.',
            type: 'expansion',
            isImportant: false,
        },
        {
            id: '6',
            year: 2023,
            title: 'Top 100 Doanh nghiệp lớn nhất',
            description: 'Lọt vào danh sách Top 100 doanh nghiệp lớn nhất Việt Nam theo VNR500.',
            type: 'award',
            isImportant: true,
        },
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<HistoryEvent | null>(null);
    const [formData, setFormData] = useState<Omit<HistoryEvent, 'id'>>({
        year: new Date().getFullYear(),
        title: '',
        description: '',
        type: 'milestone',
        isImportant: false,
    });

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'milestone':
                return <BusinessIcon />;
            case 'achievement':
                return <TrendingUpIcon />;
            case 'expansion':
                return <TrendingUpIcon />;
            case 'award':
                return <StarIcon />;
            default:
                return <BusinessIcon />;
        }
    };

    const getEventColor = (type: string) => {
        switch (type) {
            case 'milestone':
                return 'primary';
            case 'achievement':
                return 'success';
            case 'expansion':
                return 'info';
            case 'award':
                return 'warning';
            default:
                return 'primary';
        }
    };

    const handleAddEvent = () => {
        setEditingEvent(null);
        setFormData({
            year: new Date().getFullYear(),
            title: '',
            description: '',
            type: 'milestone',
            isImportant: false,
        });
        setDialogOpen(true);
    };

    const handleEditEvent = (event: HistoryEvent) => {
        setEditingEvent(event);
        setFormData({
            year: event.year,
            title: event.title,
            description: event.description,
            type: event.type,
            isImportant: event.isImportant,
        });
        setDialogOpen(true);
    };

    const handleSaveEvent = () => {
        if (editingEvent) {
            // Update existing event
            setEvents(prev => prev.map(event =>
                event.id === editingEvent.id
                    ? { ...formData, id: editingEvent.id }
                    : event
            ));
        } else {
            // Add new event
            const newEvent: HistoryEvent = {
                ...formData,
                id: Date.now().toString(),
            };
            setEvents(prev => [...prev, newEvent].sort((a, b) => a.year - b.year));
        }
        setDialogOpen(false);
    };

    const handleDeleteEvent = (eventId: string) => {
        setEvents(prev => prev.filter(event => event.id !== eventId));
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Lịch sử hình thành và phát triển
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddEvent}
                >
                    Thêm sự kiện
                </Button>
            </Box>

            <Card>
                <CardContent>
                    <Timeline>
                        {events.map((event, index) => (
                            <TimelineItem key={event.id}>
                                <TimelineOppositeContent
                                    sx={{ m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {event.year}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot
                                        color={getEventColor(event.type) as any}
                                        variant={event.isImportant ? 'filled' : 'outlined'}
                                    >
                                        {getEventIcon(event.type)}
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="h6" component="span">
                                                {event.title}
                                            </Typography>
                                            {event.isImportant && (
                                                <Chip
                                                    label="Quan trọng"
                                                    size="small"
                                                    color="warning"
                                                    sx={{ ml: 1 }}
                                                />
                                            )}
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                {event.description}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEditEvent(event)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDeleteEvent(event.id)}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </CardContent>
            </Card>

            {/* Add/Edit Event Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingEvent ? 'Chỉnh sửa sự kiện' : 'Thêm sự kiện mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Năm"
                                type="number"
                                value={formData.year}
                                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Loại sự kiện"
                                value={formData.type}
                                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                                SelectProps={{ native: true }}
                            >
                                <option value="milestone">Cột mốc</option>
                                <option value="achievement">Thành tựu</option>
                                <option value="expansion">Mở rộng</option>
                                <option value="award">Giải thưởng</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tiêu đề"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                    <Button onClick={handleSaveEvent} variant="contained">
                        {editingEvent ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CompanyHistory;
