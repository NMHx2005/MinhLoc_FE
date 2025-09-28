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
    Avatar,
    ImageList,
    ImageListItem,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Business as BusinessIcon,
    Handshake as HandshakeIcon,
    Star as StarIcon,
    LocationOn as LocationIcon,
    Language as WebsiteIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
} from '@mui/icons-material';
import { companyService } from '../../services/admin/companyService';
import type { CompanyInfo } from '../../services/admin/companyService';
import { Alert, Snackbar, CircularProgress } from '@mui/material';
import ImageUpload from './ImageUpload';

interface Partner {
    id: string;
    name: string;
    description: string;
    type: 'strategic' | 'supplier' | 'distributor' | 'technology' | 'financial';
    logo: string;
    website: string;
    contact: {
        phone: string;
        email: string;
        address: string;
    };
    partnershipStart: string;
    isActive: boolean;
    rating: number;
    projects: string[];
}

const CompanyPartners: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [partners, setPartners] = useState<Partner[]>([]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
    const [formData, setFormData] = useState<Omit<Partner, 'id'>>({
        name: '',
        description: '',
        type: 'strategic',
        logo: '',
        website: '',
        contact: {
            phone: '',
            email: '',
            address: '',
        },
        partnershipStart: new Date().toISOString().split('T')[0],
        isActive: true,
        rating: 5,
        projects: [],
    });

    // Load company partners data from API
    const loadCompanyPartners = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const info = await companyService.getCompanyInfoBySection('partners');
            if (info) {
                setCompanyInfo(info);
                // Convert partners to Partner format
                const partnersData = info.data?.partners || [];
                const systemPartners: Partner[] = partnersData.map((partner: any, index: number) => ({
                    id: partner._id || `partner-${index}`,
                    name: partner.name || '',
                    description: partner.type || '',
                    type: 'strategic' as const, // Default type
                    logo: partner.logo || '',
                    website: '',
                    contact: {
                        phone: '',
                        email: '',
                        address: '',
                    },
                    partnershipStart: new Date().toISOString().split('T')[0],
                    isActive: true,
                    rating: 5,
                    projects: [],
                }));
                setPartners(systemPartners);
            }
        } catch (err) {
            console.error('Error loading company partners data:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu đối tác');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCompanyPartners();
    }, [loadCompanyPartners]);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'strategic':
                return <HandshakeIcon />;
            case 'supplier':
                return <BusinessIcon />;
            case 'distributor':
                return <BusinessIcon />;
            case 'technology':
                return <StarIcon />;
            case 'financial':
                return <BusinessIcon />;
            default:
                return <BusinessIcon />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'strategic':
                return 'primary';
            case 'supplier':
                return 'success';
            case 'distributor':
                return 'info';
            case 'technology':
                return 'warning';
            case 'financial':
                return 'secondary';
            default:
                return 'primary';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'strategic':
                return 'Chiến lược';
            case 'supplier':
                return 'Nhà cung cấp';
            case 'distributor':
                return 'Phân phối';
            case 'technology':
                return 'Công nghệ';
            case 'financial':
                return 'Tài chính';
            default:
                return 'Khác';
        }
    };

    const handleAddPartner = () => {
        setEditingPartner(null);
        setFormData({
            name: '',
            description: '',
            type: 'strategic',
            logo: '',
            website: '',
            contact: {
                phone: '',
                email: '',
                address: '',
            },
            partnershipStart: new Date().toISOString().split('T')[0],
            isActive: true,
            rating: 5,
            projects: [],
        });
        setDialogOpen(true);
    };

    const handleEditPartner = (partner: Partner) => {
        setEditingPartner(partner);
        setFormData({
            name: partner.name,
            description: partner.description,
            type: partner.type,
            logo: partner.logo,
            website: partner.website,
            contact: partner.contact,
            partnershipStart: partner.partnershipStart,
            isActive: partner.isActive,
            rating: partner.rating,
            projects: partner.projects,
        });
        setDialogOpen(true);
    };

    const handleSavePartner = async () => {
        setSaving(true);
        try {
            let updatedPartners: Partner[];

            if (editingPartner) {
                updatedPartners = partners.map(partner =>
                    partner.id === editingPartner.id
                        ? { ...formData, id: editingPartner.id }
                        : partner
                );
            } else {
                const newPartner: Partner = {
                    ...formData,
                    id: Date.now().toString(),
                };
                updatedPartners = [...partners, newPartner];
            }

            setPartners(updatedPartners);

            // Convert partners back to API format and save
            const partnersData = updatedPartners.map(partner => ({
                name: partner.name,
                type: partner.description,
                logo: partner.logo,
            }));

            const dataToSave = {
                section: 'partners',
                title: companyInfo?.title || 'Đối tác chiến lược',
                content: companyInfo?.content || '',
                data: {
                    partners: partnersData,
                },
                sortOrder: 5
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Lưu thông tin đối tác thành công!');
            setSnackbarOpen(true);
            setDialogOpen(false);
            await loadCompanyPartners();
        } catch (error) {
            console.error('Error saving partner:', error);
            setSnackbarMessage('❌ Lỗi khi lưu thông tin đối tác');
            setSnackbarOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const handleDeletePartner = async (partnerId: string) => {
        try {
            const updatedPartners = partners.filter(partner => partner.id !== partnerId);
            setPartners(updatedPartners);

            // Convert partners back to API format and save
            const partnersData = updatedPartners.map(partner => ({
                name: partner.name,
                type: partner.description,
                logo: partner.logo,
            }));

            const dataToSave = {
                section: 'partners',
                title: companyInfo?.title || 'Đối tác chiến lược',
                content: companyInfo?.content || '',
                data: {
                    partners: partnersData,
                },
                sortOrder: 5
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Xóa đối tác thành công!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting partner:', error);
            setSnackbarMessage('❌ Lỗi khi xóa đối tác');
            setSnackbarOpen(true);
            await loadCompanyPartners();
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <StarIcon
                key={index}
                sx={{
                    color: index < rating ? '#ffc107' : '#e0e0e0',
                    fontSize: 16,
                }}
            />
        ));
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải thông tin đối tác...</Typography>
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
                    Đối tác & Nhà cung cấp
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddPartner}
                >
                    Thêm đối tác
                </Button>
            </Box>

            <Grid container spacing={3}>
                {partners.map((partner) => (
                    <Grid item xs={12} md={6} lg={4} key={partner.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            src={partner.logo}
                                            sx={{ width: 60, height: 60 }}
                                        >
                                            {getTypeIcon(partner.type)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {partner.name}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Chip
                                                    label={getTypeLabel(partner.type)}
                                                    size="small"
                                                    color={getTypeColor(partner.type) as any}
                                                />
                                                {partner.isActive && (
                                                    <Chip
                                                        label="Hoạt động"
                                                        size="small"
                                                        color="success"
                                                    />
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditPartner(partner)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeletePartner(partner.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {partner.description}
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        Đánh giá: {renderStars(partner.rating)}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Hợp tác từ {new Date(partner.partnershipStart).toLocaleDateString('vi-VN')}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                        <LocationIcon sx={{ mr: 1, fontSize: 16 }} />
                                        Liên hệ
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                        {partner.contact.address}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                        {partner.contact.phone}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {partner.contact.email}
                                    </Typography>
                                </Box>

                                {partner.projects.length > 0 && (
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            Dự án hợp tác:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {partner.projects.map((project, index) => (
                                                <Chip
                                                    key={index}
                                                    label={project}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add/Edit Partner Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingPartner ? 'Chỉnh sửa đối tác' : 'Thêm đối tác mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tên đối tác"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Loại đối tác</InputLabel>
                                <Select
                                    value={formData.type}
                                    label="Loại đối tác"
                                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                                >
                                    <MenuItem value="strategic">Chiến lược</MenuItem>
                                    <MenuItem value="supplier">Nhà cung cấp</MenuItem>
                                    <MenuItem value="distributor">Phân phối</MenuItem>
                                    <MenuItem value="technology">Công nghệ</MenuItem>
                                    <MenuItem value="financial">Tài chính</MenuItem>
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
                            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                Logo đối tác
                            </Typography>
                            <ImageUpload
                                value={formData.logo}
                                onChange={(url) => setFormData(prev => ({ ...prev, logo: url }))}
                                showPreview={false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Website"
                                value={formData.website}
                                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                                placeholder="https://example.com"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Điện thoại"
                                value={formData.contact.phone}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, phone: e.target.value }
                                }))}
                                placeholder="+84 123 456 789"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={formData.contact.email}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, email: e.target.value }
                                }))}
                                placeholder="contact@partner.com"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Địa chỉ"
                                value={formData.contact.address}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, address: e.target.value }
                                }))}
                                placeholder="Địa chỉ trụ sở chính"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ngày bắt đầu hợp tác"
                                type="date"
                                value={formData.partnershipStart}
                                onChange={(e) => setFormData(prev => ({ ...prev, partnershipStart: e.target.value }))}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Đánh giá (1-5 sao)"
                                type="number"
                                inputProps={{ min: 1, max: 5 }}
                                value={formData.rating}
                                onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) || 5 }))}
                                placeholder="5"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} disabled={saving}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSavePartner}
                        variant="contained"
                        disabled={saving}
                        startIcon={saving ? <CircularProgress size={20} /> : undefined}
                    >
                        {saving ? 'Đang lưu...' : (editingPartner ? 'Cập nhật' : 'Thêm')}
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

export default CompanyPartners;
