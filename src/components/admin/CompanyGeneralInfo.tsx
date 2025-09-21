'use client'

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    Alert,
    Snackbar,
    CircularProgress,
    Divider,
    Chip,
} from '@mui/material';
import {
    Save as SaveIcon,
    Edit as EditIcon,
    Business as BusinessIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Language as WebsiteIcon,
} from '@mui/icons-material';

interface CompanyGeneralInfo {
    companyName: string;
    shortDescription: string;
    fullDescription: string;
    foundedYear: number;
    headquarters: string;
    contactInfo: {
        email: string;
        phone: string;
        address: string;
        website: string;
    };
    socialMedia: {
        facebook: string;
        linkedin: string;
        youtube: string;
    };
    mission: string;
    vision: string;
    values: string[];
    achievements: string[];
}

const CompanyGeneralInfo: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState<CompanyGeneralInfo>({
        companyName: 'MinhLoc Group',
        shortDescription: 'Tập đoàn đa ngành hàng đầu Việt Nam',
        fullDescription: 'MinhLoc Group là tập đoàn đa ngành với hơn 15 năm kinh nghiệm trong các lĩnh vực xây dựng, bất động sản và đầu tư tài chính.',
        foundedYear: 2008,
        headquarters: 'TP. Hồ Chí Minh, Việt Nam',
        contactInfo: {
            email: 'info@minhlocgroup.com',
            phone: '(+84) 28 1234 5678',
            address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
            website: 'https://minhlocgroup.com',
        },
        socialMedia: {
            facebook: 'https://facebook.com/minhlocgroup',
            linkedin: 'https://linkedin.com/company/minhlocgroup',
            youtube: 'https://youtube.com/minhlocgroup',
        },
        mission: 'Mang đến những sản phẩm và dịch vụ chất lượng cao, góp phần xây dựng cuộc sống tốt đẹp hơn cho cộng đồng.',
        vision: 'Trở thành tập đoàn đa ngành hàng đầu Việt Nam và khu vực Đông Nam Á.',
        values: ['Chất lượng', 'Uy tín', 'Sáng tạo', 'Phát triển bền vững'],
        achievements: [
            'Top 100 doanh nghiệp lớn nhất Việt Nam',
            'Giải thưởng Doanh nghiệp Xanh 2023',
            'Chứng nhận ISO 9001:2015',
            'Hơn 1000 dự án đã hoàn thành',
        ],
    });

    const handleInputChange = (field: string, value: any) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof CompanyGeneralInfo],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // TODO: Implement API call to save company general info
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

            setSnackbarMessage('Cập nhật thông tin công ty thành công!');
            setSnackbarOpen(true);
            setIsEditing(false);
        } catch (error) {
            setSnackbarMessage('Có lỗi xảy ra khi cập nhật thông tin!');
            setSnackbarOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // TODO: Reset form data to original values
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Thông tin chung về công ty
                </Typography>
                <Box>
                    {isEditing ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                Hủy
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => setIsEditing(true)}
                        >
                            Chỉnh sửa
                        </Button>
                    )}
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Thông tin cơ bản */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <BusinessIcon sx={{ mr: 1 }} />
                                Thông tin cơ bản
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Tên công ty"
                                        value={formData.companyName}
                                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Năm thành lập"
                                        type="number"
                                        value={formData.foundedYear}
                                        onChange={(e) => handleInputChange('foundedYear', parseInt(e.target.value))}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Trụ sở chính"
                                        value={formData.headquarters}
                                        onChange={(e) => handleInputChange('headquarters', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Mô tả ngắn"
                                        multiline
                                        rows={2}
                                        value={formData.shortDescription}
                                        onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Mô tả chi tiết"
                                        multiline
                                        rows={4}
                                        value={formData.fullDescription}
                                        onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Thông tin liên hệ */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <EmailIcon sx={{ mr: 1 }} />
                                Thông tin liên hệ
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={formData.contactInfo.email}
                                        onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                                        disabled={!isEditing}
                                        InputProps={{
                                            startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Điện thoại"
                                        value={formData.contactInfo.phone}
                                        onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
                                        disabled={!isEditing}
                                        InputProps={{
                                            startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ"
                                        multiline
                                        rows={2}
                                        value={formData.contactInfo.address}
                                        onChange={(e) => handleInputChange('contactInfo.address', e.target.value)}
                                        disabled={!isEditing}
                                        InputProps={{
                                            startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Website"
                                        value={formData.contactInfo.website}
                                        onChange={(e) => handleInputChange('contactInfo.website', e.target.value)}
                                        disabled={!isEditing}
                                        InputProps={{
                                            startAdornment: <WebsiteIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sứ mệnh, Tầm nhìn, Giá trị */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Sứ mệnh, Tầm nhìn & Giá trị
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Sứ mệnh"
                                        multiline
                                        rows={3}
                                        value={formData.mission}
                                        onChange={(e) => handleInputChange('mission', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Tầm nhìn"
                                        multiline
                                        rows={3}
                                        value={formData.vision}
                                        onChange={(e) => handleInputChange('vision', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            Giá trị cốt lõi
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {formData.values.map((value, index) => (
                                                <Chip
                                                    key={index}
                                                    label={value}
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Thành tựu */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Thành tựu nổi bật
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {formData.achievements.map((achievement, index) => (
                                    <Chip
                                        key={index}
                                        label={achievement}
                                        color="success"
                                        variant="outlined"
                                        icon={<BusinessIcon />}
                                    />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default CompanyGeneralInfo;
