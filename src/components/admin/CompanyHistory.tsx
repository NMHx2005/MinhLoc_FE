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
} from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from '@mui/lab';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Business as BusinessIcon,
    TrendingUp as TrendingUpIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { companyService } from '../../services/admin/companyService';
import type { CompanyInfo } from '../../services/admin/companyService';
import { Alert, Snackbar, CircularProgress } from '@mui/material';

interface HistoryEvent {
    id: string;
    year: number;
    title: string;
    description: string;
    type: 'milestone' | 'achievement' | 'expansion' | 'award';
    isImportant: boolean;
}

const CompanyHistory: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [events, setEvents] = useState<HistoryEvent[]>([]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<HistoryEvent | null>(null);
    const [formData, setFormData] = useState<Omit<HistoryEvent, 'id'>>({
        year: new Date().getFullYear(),
        title: '',
        description: '',
        type: 'milestone',
        isImportant: false,
    });

    // Load company history from API
    const loadCompanyHistory = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const info = await companyService.getCompanyInfoBySection('history');
            if (info) {
                setCompanyInfo(info);
                // Convert milestones to events
                const milestones = info.data?.milestones || [];
                const historyEvents: HistoryEvent[] = milestones.map((milestone: any, index: number) => ({
                    id: milestone._id || `milestone-${index}`,
                    year: parseInt(milestone.year) || new Date().getFullYear(),
                    title: milestone.event || '',
                    description: milestone.description || '',
                    type: 'milestone' as const,
                    isImportant: index < 3, // First 3 milestones are important
                }));
                setEvents(historyEvents);
            }
        } catch (err) {
            console.error('Error loading company history:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải lịch sử công ty');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCompanyHistory();
    }, [loadCompanyHistory]);

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

    const handleSaveEvent = async () => {
        setSaving(true);
        try {
            let updatedEvents: HistoryEvent[];

            if (editingEvent) {
                // Update existing event
                updatedEvents = events.map(event =>
                    event.id === editingEvent.id
                        ? { ...formData, id: editingEvent.id }
                        : event
                );
            } else {
                // Add new event
                const newEvent: HistoryEvent = {
                    ...formData,
                    id: Date.now().toString(),
                };
                updatedEvents = [...events, newEvent].sort((a, b) => a.year - b.year);
            }

            // Update local state first
            setEvents(updatedEvents);

            // Convert events back to milestones format and save to API
            const milestones = updatedEvents.map(event => ({
                year: event.year.toString(),
                event: event.title,
                description: event.description,
            }));

            const dataToSave = {
                section: 'history',
                title: companyInfo?.title || 'Lịch sử hình thành và phát triển',
                content: companyInfo?.content || '',
                data: {
                    milestones: milestones,
                },
                sortOrder: 2
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Lưu lịch sử công ty thành công!');
            setSnackbarOpen(true);
            setDialogOpen(false);
            // Reload data
            await loadCompanyHistory();
        } catch (error) {
            console.error('Error saving company history:', error);
            setSnackbarMessage('❌ Lỗi khi lưu lịch sử công ty');
            setSnackbarOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteEvent = async (eventId: string) => {
        try {
            // Update local state first
            const updatedEvents = events.filter(event => event.id !== eventId);
            setEvents(updatedEvents);

            // Convert events back to milestones format and save to API
            const milestones = updatedEvents.map(event => ({
                year: event.year.toString(),
                event: event.title,
                description: event.description,
            }));

            const dataToSave = {
                section: 'history',
                title: companyInfo?.title || 'Lịch sử hình thành và phát triển',
                content: companyInfo?.content || '',
                data: {
                    milestones: milestones,
                },
                sortOrder: 2
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Xóa sự kiện thành công!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting event:', error);
            setSnackbarMessage('❌ Lỗi khi xóa sự kiện');
            setSnackbarOpen(true);
            // Reload data to restore state
            await loadCompanyHistory();
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải lịch sử công ty...</Typography>
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
                        {events.map((event) => (
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
                    <Button onClick={() => setDialogOpen(false)} disabled={saving}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSaveEvent}
                        variant="contained"
                        disabled={saving}
                        startIcon={saving ? <CircularProgress size={20} /> : undefined}
                    >
                        {saving ? 'Đang lưu...' : (editingEvent ? 'Cập nhật' : 'Thêm')}
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

export default CompanyHistory;
