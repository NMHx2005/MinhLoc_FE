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
    Alert,
    Snackbar,
    CircularProgress,
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
import { companyService } from '../../services/admin/companyService';

import type { CompanyInfo } from '../../services/admin/companyService';

interface CompanyGeneralInfoData {
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
    achievements: Array<{ number: string; label: string }>;
}

const CompanyGeneralInfo: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

    const [formData, setFormData] = useState<CompanyGeneralInfoData>({
        companyName: '',
        shortDescription: '',
        fullDescription: '',
        foundedYear: 0,
        headquarters: '',
        contactInfo: {
            email: '',
            phone: '',
            address: '',
            website: '',
        },
        socialMedia: {
            facebook: '',
            linkedin: '',
            youtube: '',
        },
        mission: '',
        vision: '',
        values: [],
        achievements: [],
    });

    // Load company info from API
    const loadCompanyInfo = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const info = await companyService.getCompanyInfoBySection('general');
            if (info) {
                setCompanyInfo(info);
                // Parse data from API
                const apiData = info.data || {};
                setFormData({
                    companyName: apiData.companyName || '',
                    shortDescription: info.title || '',
                    fullDescription: info.content || '',
                    foundedYear: apiData.foundedYear || 0,
                    headquarters: apiData.headquarters || '',
                    contactInfo: {
                        email: apiData.contactInfo?.email || '',
                        phone: apiData.contactInfo?.phone || '',
                        address: apiData.contactInfo?.address || '',
                        website: apiData.contactInfo?.website || '',
                    },
                    socialMedia: {
                        facebook: apiData.socialMedia?.facebook || '',
                        linkedin: apiData.socialMedia?.linkedin || '',
                        youtube: apiData.socialMedia?.youtube || '',
                    },
                    mission: apiData.mission || '',
                    vision: apiData.vision || '',
                    values: apiData.values || [],
                    achievements: apiData.achievements || [],
                });
            }
        } catch (err) {
            console.error('Error loading company info:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải thông tin công ty');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCompanyInfo();
    }, [loadCompanyInfo]);

    const handleInputChange = (field: string, value: string | number | string[]) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof CompanyGeneralInfoData] as Record<string, string | number | string[]>),
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
            const dataToSave = {
                section: 'general',
                title: formData.shortDescription,
                content: formData.fullDescription,
                data: {
                    companyName: formData.companyName,
                    foundedYear: formData.foundedYear,
                    headquarters: formData.headquarters,
                    contactInfo: formData.contactInfo,
                    socialMedia: formData.socialMedia,
                    mission: formData.mission,
                    vision: formData.vision,
                    values: formData.values,
                    achievements: formData.achievements,
                },
                sortOrder: 1
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Lưu thông tin công ty thành công!');
            setSnackbarOpen(true);
            setIsEditing(false);
            // Reload data
            await loadCompanyInfo();
        } catch (error) {
            console.error('Error saving company info:', error);
            setSnackbarMessage('❌ Lỗi khi lưu thông tin công ty');
            setSnackbarOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form data to original values from API
        if (companyInfo) {
            const apiData = companyInfo.data || {};
            setFormData({
                companyName: apiData.companyName || '',
                shortDescription: companyInfo.title || '',
                fullDescription: companyInfo.content || '',
                foundedYear: apiData.foundedYear || 0,
                headquarters: apiData.headquarters || '',
                contactInfo: {
                    email: apiData.contactInfo?.email || '',
                    phone: apiData.contactInfo?.phone || '',
                    address: apiData.contactInfo?.address || '',
                    website: apiData.contactInfo?.website || '',
                },
                socialMedia: {
                    facebook: apiData.socialMedia?.facebook || '',
                    linkedin: apiData.socialMedia?.linkedin || '',
                    youtube: apiData.socialMedia?.youtube || '',
                },
                mission: apiData.mission || '',
                vision: apiData.vision || '',
                values: apiData.values || [],
                achievements: apiData.achievements || [],
            });
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải thông tin công ty...</Typography>
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
                                        placeholder="Mô tả ngắn gọn về công ty"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Mô tả chi tiết"
                                        multiline
                                        rows={6}
                                        value={formData.fullDescription}
                                        onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Mô tả chi tiết về lịch sử, sứ mệnh và tầm nhìn của công ty"
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
                                        rows={4}
                                        value={formData.mission}
                                        onChange={(e) => handleInputChange('mission', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Sứ mệnh của công ty"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Tầm nhìn"
                                        multiline
                                        rows={4}
                                        value={formData.vision}
                                        onChange={(e) => handleInputChange('vision', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Tầm nhìn của công ty"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Giá trị cốt lõi"
                                        multiline
                                        rows={3}
                                        value={formData.values.join('\n')}
                                        onChange={(e) => handleInputChange('values', e.target.value.split('\n').filter(v => v.trim()))}
                                        disabled={!isEditing}
                                        placeholder="Mỗi giá trị trên một dòng"
                                    />
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

                            <Grid container spacing={2}>
                                {formData.achievements.map((achievement, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                p: 2,
                                                textAlign: 'center',
                                                '&:hover': {
                                                    boxShadow: 2,
                                                    transform: 'translateY(-2px)',
                                                    transition: 'all 0.3s ease'
                                                }
                                            }}
                                        >
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: 'primary.main',
                                                    mb: 1
                                                }}
                                            >
                                                {achievement.number}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ lineHeight: 1.4 }}
                                            >
                                                {achievement.label}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
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
