'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/client/shared/Layout';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    IconButton,
    Alert,
    Snackbar,
    CircularProgress
} from '@mui/material';
import {
    Phone,
    Email,
    LocationOn,
    Schedule,
    Send,
    Facebook,
    YouTube,
    LinkedIn,
    WhatsApp,
    ArrowForward
} from '@mui/icons-material';
import { contactService, type ContactMessage } from '@/services/client/contactService';
import { companyService, type CompanyInfo } from '@/services/client/companyService';
import LeafletMap from '@/components/client/LeafletMap';

export default function ContactPage() {
    // Form state
    const [formData, setFormData] = useState<ContactMessage>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    // UI state
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'warning' | 'info'
    });

    // Form validation
    const [errors, setErrors] = useState<Partial<ContactMessage>>({});

    // Company info state
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [companyLoading, setCompanyLoading] = useState(true);

    // Handle input change
    const handleInputChange = (field: keyof ContactMessage, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    // Validate form
    const validateForm = (): boolean => {
        const newErrors: Partial<ContactMessage> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Họ và tên là bắt buộc';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Số điện thoại là bắt buộc';
        } else if (!/^(\+84|84|0)[1-9][0-9]{8,9}$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Chủ đề là bắt buộc';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Nội dung tin nhắn là bắt buộc';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Nội dung phải có ít nhất 10 ký tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            await contactService.sendContactMessage(formData);

            setSnackbar({
                open: true,
                message: 'Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ lại sớm nhất.',
                severity: 'success'
            });

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error: unknown) {
            console.error('Contact form error:', error);

            // Parse server validation errors
            if (error instanceof Error) {
                const errorMessage = error.message;

                // Check if it's a validation error
                if (errorMessage.includes('validation failed')) {
                    const newErrors: Partial<ContactMessage> = {};

                    // Parse specific field errors
                    if (errorMessage.includes('name:')) {
                        newErrors.name = 'Tên không hợp lệ';
                    }
                    if (errorMessage.includes('email:')) {
                        newErrors.email = 'Email không hợp lệ';
                    }
                    if (errorMessage.includes('phone:')) {
                        newErrors.phone = 'Số điện thoại không hợp lệ';
                    }
                    if (errorMessage.includes('subject:')) {
                        newErrors.subject = 'Chủ đề không hợp lệ';
                    }
                    if (errorMessage.includes('message:')) {
                        if (errorMessage.includes('ít nhất 10 ký tự')) {
                            newErrors.message = 'Nội dung phải có ít nhất 10 ký tự';
                        } else {
                            newErrors.message = 'Nội dung không hợp lệ';
                        }
                    }

                    // Set field errors
                    if (Object.keys(newErrors).length > 0) {
                        setErrors(newErrors);
                    }

                    setSnackbar({
                        open: true,
                        message: 'Vui lòng kiểm tra lại thông tin đã nhập',
                        severity: 'error'
                    });
                } else {
                    setSnackbar({
                        open: true,
                        message: errorMessage,
                        severity: 'error'
                    });
                }
            } else {
                setSnackbar({
                    open: true,
                    message: 'Có lỗi xảy ra khi gửi tin nhắn',
                    severity: 'error'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    // Load company info on component mount
    useEffect(() => {
        loadCompanyInfo();
    }, []);

    // Load company general info
    const loadCompanyInfo = async () => {
        try {
            setCompanyLoading(true);
            const info = await companyService.getGeneralInfo();
            setCompanyInfo(info);
        } catch (error: unknown) {
            console.error('Error loading company info:', error);
        } finally {
            setCompanyLoading(false);
        }
    };
    return (
        <Layout>
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: 'url("https://datxanhmiennam.com.vn/Data/Sites/1/Banner/bnlh.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    pt: { xs: 12, md: 16 }, // Thêm padding-top để tránh header
                    pb: { xs: 8, md: 12 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 1,
                    }
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box textAlign="center" data-aos="fade-up" data-aos-duration="1000">
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                mb: 3,
                            }}
                        >
                            Liên Hệ Với Chúng Tôi
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: { xs: '1.1rem', md: '1.3rem' },
                                fontWeight: 400,
                                maxWidth: '600px',
                                mx: 'auto',
                            }}
                        >
                            Chúng tôi sẵn sàng hỗ trợ và tư vấn cho bạn về các dự án bất động sản tốt nhất
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 8, pt: { xs: 4, md: 6 } }}>

                {/* Contact Information & Form */}
                <Grid container spacing={6}>
                    {/* Contact Information */}
                    <Grid item xs={12} lg={5}>
                        <Box data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    color: '#E7C873',
                                    fontWeight: 700,
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    mb: 4,
                                }}
                            >
                                Thông Tin Liên Hệ
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {/* Loading State */}
                                {companyLoading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                        <CircularProgress size={40} sx={{ color: '#E7C873' }} />
                                    </Box>
                                ) : (
                                    <>
                                        {/* Hotline Card */}
                                        <Card
                                            data-aos="zoom-in"
                                            data-aos-duration="800"
                                            data-aos-delay="400"
                                            sx={{
                                                background: 'linear-gradient(135deg, #E7C873 0%, #d4b85a 100%)',
                                                color: 'white',
                                                borderRadius: 1,
                                                boxShadow: '0 8px 32px rgba(231, 200, 115, 0.3)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: '0 12px 40px rgba(231, 200, 115, 0.4)',
                                                },
                                            }}
                                        >
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3 }}>
                                                <Box
                                                    sx={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                        borderRadius: '50%',
                                                        p: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Phone sx={{ fontSize: '2rem' }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                                        Hotline
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                        {companyInfo?.data?.contactInfo?.phone || '1900232427'}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                        Hỗ trợ 24/7
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>

                                        {/* Email Card */}
                                        <Card
                                            data-aos="zoom-in"
                                            data-aos-duration="800"
                                            data-aos-delay="500"
                                            sx={{
                                                backgroundColor: 'white',
                                                borderRadius: 1,
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                border: '1px solid #f0f0f0',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                                },
                                            }}
                                        >
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3 }}>
                                                <Box
                                                    sx={{
                                                        backgroundColor: '#E7C873',
                                                        borderRadius: '50%',
                                                        p: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Email sx={{ fontSize: '2rem', color: 'white' }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                                                        Email
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                                                        {companyInfo?.data?.contactInfo?.email || 'hi@minhlocgroup.com'}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>

                                        {/* Address Card */}
                                        <Card
                                            data-aos="zoom-in"
                                            data-aos-duration="800"
                                            data-aos-delay="600"
                                            sx={{
                                                backgroundColor: 'white',
                                                borderRadius: 1,
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                border: '1px solid #f0f0f0',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                                },
                                            }}
                                        >
                                            <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, p: 3 }}>
                                                <Box
                                                    sx={{
                                                        backgroundColor: '#E7C873',
                                                        borderRadius: '50%',
                                                        p: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mt: 0.5,
                                                    }}
                                                >
                                                    <LocationOn sx={{ fontSize: '2rem', color: 'white' }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                                                        Địa Chỉ
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ color: '#666', lineHeight: 1.6 }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: companyInfo?.data?.contactInfo?.address ||
                                                                'Tầng 10, Tòa nhà ABC<br />123 Đường Nguyễn Huệ, Quận 1<br />TP. Hồ Chí Minh, Việt Nam'
                                                        }}
                                                    />
                                                </Box>
                                            </CardContent>
                                        </Card>

                                        {/* Working Hours Card */}
                                        <Card
                                            data-aos="zoom-in"
                                            data-aos-duration="800"
                                            data-aos-delay="700"
                                            sx={{
                                                backgroundColor: 'white',
                                                borderRadius: 1,
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                border: '1px solid #f0f0f0',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                                },
                                            }}
                                        >
                                            <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, p: 3 }}>
                                                <Box
                                                    sx={{
                                                        backgroundColor: '#E7C873',
                                                        borderRadius: '50%',
                                                        p: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mt: 0.5,
                                                    }}
                                                >
                                                    <Schedule sx={{ fontSize: '2rem', color: 'white' }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                                                        Giờ Làm Việc
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                                                        Thứ 2 - Thứ 6: 8:00 - 17:30<br />
                                                        Thứ 7: 8:00 - 12:00<br />
                                                        Chủ nhật: Nghỉ
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>

                                        {/* Social Media */}
                                        <Box data-aos="fade-up" data-aos-duration="800" data-aos-delay="800" sx={{ mt: 2 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                                                Kết Nối Với Chúng Tôi
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                {companyInfo?.data?.socialMedia?.facebook && (
                                                    <IconButton
                                                        component="a"
                                                        href={companyInfo.data.socialMedia.facebook}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            backgroundColor: '#1877F2',
                                                            color: 'white',
                                                            '&:hover': { backgroundColor: '#166FE5' },
                                                        }}
                                                    >
                                                        <Facebook />
                                                    </IconButton>
                                                )}
                                                {companyInfo?.data?.socialMedia?.youtube && (
                                                    <IconButton
                                                        component="a"
                                                        href={companyInfo.data.socialMedia.youtube}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            backgroundColor: '#FF0000',
                                                            color: 'white',
                                                            '&:hover': { backgroundColor: '#E60000' },
                                                        }}
                                                    >
                                                        <YouTube />
                                                    </IconButton>
                                                )}
                                                {companyInfo?.data?.socialMedia?.linkedin && (
                                                    <IconButton
                                                        component="a"
                                                        href={companyInfo.data.socialMedia.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            backgroundColor: '#0077B5',
                                                            color: 'white',
                                                            '&:hover': { backgroundColor: '#005885' },
                                                        }}
                                                    >
                                                        <LinkedIn />
                                                    </IconButton>
                                                )}
                                                {/* Default social media if no data from API */}
                                                {!companyInfo?.data?.socialMedia && (
                                                    <>
                                                        <IconButton
                                                            sx={{
                                                                backgroundColor: '#1877F2',
                                                                color: 'white',
                                                                '&:hover': { backgroundColor: '#166FE5' },
                                                            }}
                                                        >
                                                            <Facebook />
                                                        </IconButton>
                                                        <IconButton
                                                            sx={{
                                                                backgroundColor: '#FF0000',
                                                                color: 'white',
                                                                '&:hover': { backgroundColor: '#E60000' },
                                                            }}
                                                        >
                                                            <YouTube />
                                                        </IconButton>
                                                        <IconButton
                                                            sx={{
                                                                backgroundColor: '#25D366',
                                                                color: 'white',
                                                                '&:hover': { backgroundColor: '#1DA851' },
                                                            }}
                                                        >
                                                            <WhatsApp />
                                                        </IconButton>
                                                        <IconButton
                                                            sx={{
                                                                backgroundColor: '#0077B5',
                                                                color: 'white',
                                                                '&:hover': { backgroundColor: '#005885' },
                                                            }}
                                                        >
                                                            <LinkedIn />
                                                        </IconButton>
                                                    </>
                                                )}
                                            </Box>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Contact Form */}
                    <Grid item xs={12} lg={7}>
                        <Box data-aos="fade-left" data-aos-duration="1000" data-aos-delay="300">
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    color: '#E7C873',
                                    fontWeight: 700,
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    mb: 4,
                                }}
                            >
                                Gửi Tin Nhắn
                            </Typography>

                            <Card
                                sx={{
                                    borderRadius: 1,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    border: '1px solid #f0f0f0',
                                    overflow: 'hidden',
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Họ và tên"
                                                    variant="outlined"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    error={!!errors.name}
                                                    helperText={errors.name}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 1,
                                                            '&:hover fieldset': {
                                                                borderColor: '#E7C873',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#E7C873',
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root.Mui-focused': {
                                                            color: '#E7C873',
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Số điện thoại"
                                                    variant="outlined"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    error={!!errors.phone}
                                                    helperText={errors.phone || 'Ví dụ: 0123456789 hoặc +84123456789'}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 1,
                                                            '&:hover fieldset': {
                                                                borderColor: '#E7C873',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#E7C873',
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root.Mui-focused': {
                                                            color: '#E7C873',
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            required
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1,
                                                    '&:hover fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#E7C873',
                                                },
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Chủ đề"
                                            variant="outlined"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => handleInputChange('subject', e.target.value)}
                                            error={!!errors.subject}
                                            helperText={errors.subject}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1,
                                                    '&:hover fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#E7C873',
                                                },
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Nội dung tin nhắn"
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            required
                                            value={formData.message}
                                            onChange={(e) => handleInputChange('message', e.target.value)}
                                            error={!!errors.message}
                                            helperText={errors.message}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1,
                                                    '&:hover fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#E7C873',
                                                },
                                            }}
                                        />

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            disabled={loading}
                                            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                                            sx={{
                                                backgroundColor: '#E7C873',
                                                color: 'black',
                                                fontWeight: 700,
                                                fontSize: '1.1rem',
                                                py: 2,
                                                borderRadius: 1,
                                                textTransform: 'none',
                                                boxShadow: '0 4px 20px rgba(231, 200, 115, 0.3)',
                                                '&:hover': {
                                                    backgroundColor: '#d4b85a',
                                                    boxShadow: '0 6px 25px rgba(231, 200, 115, 0.4)',
                                                    transform: 'translateY(-2px)',
                                                },
                                                '&:disabled': {
                                                    backgroundColor: '#ccc',
                                                    color: '#666',
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            {loading ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>

                {/* Map Section */}
                <Box sx={{ mt: { xs: 6, md: 8 } }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            sx={{
                                color: '#E7C873',
                                fontWeight: 700,
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                mb: 2,
                            }}
                        >
                            Vị Trí Văn Phòng
                        </Typography>

                        {companyInfo?.data?.contactInfo?.address && (
                            <Button
                                variant="outlined"
                                startIcon={<LocationOn />}
                                onClick={() => {
                                    const mapsUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(companyInfo?.data?.contactInfo?.address || '')}`;
                                    window.open(mapsUrl, '_blank');
                                }}
                                sx={{
                                    borderColor: '#E7C873',
                                    color: '#E7C873',
                                    '&:hover': {
                                        borderColor: '#D4B85A',
                                        backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                    },
                                }}
                            >
                                Mở trong OpenStreetMap
                            </Button>
                        )}
                    </Box>

                    <Box
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                        sx={{
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                            border: '1px solid #f0f0f0',
                        }}
                    >
                        {companyInfo?.data?.contactInfo?.address ? (
                            <LeafletMap
                                address={companyInfo.data.contactInfo.address}
                                height={450}
                                zoom={15}
                            />
                        ) : (
                            <Box
                                sx={{
                                    height: 450,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f5f5f5',
                                    color: '#666',
                                    fontSize: '1.1rem',
                                }}
                            >
                                {companyLoading ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <CircularProgress size={24} />
                                        <span>Đang tải thông tin địa chỉ...</span>
                                    </Box>
                                ) : (
                                    'Địa chỉ văn phòng chưa được cập nhật'
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* Call to Action Section */}
                <Box
                    sx={{
                        backgroundImage: 'url("https://datxanhmiennam.com.vn/Data/Sites/1/skins/default/images/parameter_bg.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        borderRadius: 4,
                        mt: { xs: 6, md: 8 },
                        py: 6,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: 4,
                            zIndex: 1,
                        }
                    }}
                >
                    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                        <Box textAlign="center" data-aos="fade-up" data-aos-duration="1000">
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    mb: 3,
                                }}
                            >
                                Sẵn Sàng Bắt Đầu?
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontSize: { xs: '1rem', md: '1.2rem' },
                                    fontWeight: 400,
                                    mb: 4,
                                }}
                            >
                                Liên hệ ngay với chúng tôi để được tư vấn miễn phí về các dự án bất động sản tốt nhất
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForward />}
                                sx={{
                                    backgroundColor: '#E7C873',
                                    color: 'black',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    px: 6,
                                    py: 2,
                                    borderRadius: 1,
                                    textTransform: 'none',
                                    boxShadow: '0 4px 20px rgba(231, 200, 115, 0.3)',
                                    '&:hover': {
                                        backgroundColor: '#d4b85a',
                                        boxShadow: '0 6px 25px rgba(231, 200, 115, 0.4)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Liên Hệ Ngay
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Container>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Layout>
    );
}
