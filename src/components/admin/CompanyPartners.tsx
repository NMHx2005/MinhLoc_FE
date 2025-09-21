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
    Business as BusinessIcon,
    Handshake as HandshakeIcon,
    Star as StarIcon,
    LocationOn as LocationIcon,
    Language as WebsiteIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
} from '@mui/icons-material';

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
    const [partners, setPartners] = useState<Partner[]>([
        {
            id: '1',
            name: 'Samsung C&T',
            description: 'Đối tác chiến lược trong lĩnh vực xây dựng và phát triển dự án',
            type: 'strategic',
            logo: '/partners/samsung-ct.png',
            website: 'https://samsungct.com',
            contact: {
                phone: '(+82) 2 2145 5114',
                email: 'contact@samsungct.com',
                address: 'Seoul, South Korea',
            },
            partnershipStart: '2015-01-01',
            isActive: true,
            rating: 5,
            projects: ['Chung cư Green Valley', 'Tòa nhà văn phòng ABC'],
        },
        {
            id: '2',
            name: 'Vietcombank',
            description: 'Đối tác tài chính cung cấp các gói vay ưu đãi cho dự án',
            type: 'financial',
            logo: '/partners/vietcombank.png',
            website: 'https://vietcombank.com.vn',
            contact: {
                phone: '(+84) 24 3942 0321',
                email: 'info@vietcombank.com.vn',
                address: 'Hà Nội, Việt Nam',
            },
            partnershipStart: '2010-03-15',
            isActive: true,
            rating: 4,
            projects: ['Dự án Khu đô thị XYZ', 'Chung cư Sunshine'],
        },
        {
            id: '3',
            name: 'Autodesk Vietnam',
            description: 'Nhà cung cấp phần mềm thiết kế và quản lý dự án',
            type: 'technology',
            logo: '/partners/autodesk.png',
            website: 'https://autodesk.com.vn',
            contact: {
                phone: '(+84) 28 3822 8899',
                email: 'vietnam@autodesk.com',
                address: 'TP.HCM, Việt Nam',
            },
            partnershipStart: '2018-06-01',
            isActive: true,
            rating: 4,
            projects: ['Tất cả dự án thiết kế'],
        },
        {
            id: '4',
            name: 'Cement Corporation',
            description: 'Nhà cung cấp vật liệu xây dựng chính',
            type: 'supplier',
            logo: '/partners/cement-corp.png',
            website: 'https://cementcorp.vn',
            contact: {
                phone: '(+84) 28 1234 5678',
                email: 'sales@cementcorp.vn',
                address: 'TP.HCM, Việt Nam',
            },
            partnershipStart: '2012-01-01',
            isActive: true,
            rating: 3,
            projects: ['Tất cả dự án xây dựng'],
        },
    ]);

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

    const handleSavePartner = () => {
        if (editingPartner) {
            setPartners(prev => prev.map(partner =>
                partner.id === editingPartner.id
                    ? { ...formData, id: editingPartner.id }
                    : partner
            ));
        } else {
            const newPartner: Partner = {
                ...formData,
                id: Date.now().toString(),
            };
            setPartners(prev => [...prev, newPartner]);
        }
        setDialogOpen(false);
    };

    const handleDeletePartner = (partnerId: string) => {
        setPartners(prev => prev.filter(partner => partner.id !== partnerId));
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

    return (
        <Box>
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
                            <TextField
                                fullWidth
                                select
                                label="Loại đối tác"
                                value={formData.type}
                                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                                SelectProps={{ native: true }}
                            >
                                <option value="strategic">Chiến lược</option>
                                <option value="supplier">Nhà cung cấp</option>
                                <option value="distributor">Phân phối</option>
                                <option value="technology">Công nghệ</option>
                                <option value="financial">Tài chính</option>
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
                                label="Logo URL"
                                value={formData.logo}
                                onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Website"
                                value={formData.website}
                                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Điện thoại"
                                value={formData.contact.phone}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, phone: e.target.value }
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={formData.contact.email}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, email: e.target.value }
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Địa chỉ"
                                value={formData.contact.address}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, address: e.target.value }
                                }))}
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
                                onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSavePartner} variant="contained">
                        {editingPartner ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CompanyPartners;
