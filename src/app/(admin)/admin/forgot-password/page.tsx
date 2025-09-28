'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    InputAdornment,
    Link,
    CircularProgress,
} from '@mui/material';
import {
    Email,
    Business,
    ArrowBack,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { authService } from '../../../../services/authService';

interface ForgotPasswordFormData {
    email: string;
}

interface ForgotPasswordFormErrors {
    email?: string;
    general?: string;
}

const ForgotPasswordPage: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<ForgotPasswordFormData>({
        email: '',
    });
    const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (field: keyof ForgotPasswordFormData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value,
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: ForgotPasswordFormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            await authService.forgotPassword({
                email: formData.email,
            });

            setSuccess(true);

        } catch (error: any) {
            console.error('Forgot password error:', error);

            const errorMessage = error.response?.data?.message ||
                error.message ||
                'Có lỗi xảy ra. Vui lòng thử lại.';

            setErrors({ general: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 3,
                }}
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={24}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            textAlign: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, #4caf50, #45a049)',
                                mb: 3,
                            }}
                        >
                            <Email sx={{ fontSize: 40, color: 'white' }} />
                        </Box>

                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                            Email đã được gửi!
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                            Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email <strong>{formData.email}</strong>
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 3, color: '#888' }}>
                            Vui lòng kiểm tra hộp thư và làm theo hướng dẫn để đặt lại mật khẩu của bạn.
                        </Typography>

                        <Button
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            onClick={() => router.push('/admin/login')}
                            sx={{ mb: 2 }}
                        >
                            Quay lại đăng nhập
                        </Button>

                        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #eee' }}>
                            <Typography variant="body2" color="text.secondary">
                                Không nhận được email? Kiểm tra thư mục spam hoặc{' '}
                                <Link
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSuccess(false);
                                        setFormData({ email: '' });
                                    }}
                                    sx={{ color: '#667eea' }}
                                >
                                    thử lại
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 3,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={24}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                mb: 2,
                            }}
                        >
                            <Business sx={{ fontSize: 40, color: 'white' }} />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#333' }}>
                            Quên mật khẩu?
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666', mb: 1 }}>
                            Không sao! Hãy nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.
                        </Typography>
                    </Box>

                    {/* Error Alert */}
                    {errors.general && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {errors.general}
                        </Alert>
                    )}

                    {/* Forgot Password Form */}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange('email')}
                            error={!!errors.email}
                            helperText={errors.email}
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: '#667eea' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Email />}
                            sx={{
                                py: 1.5,
                                mb: 3,
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
                                },
                                '&:disabled': {
                                    background: '#ccc',
                                },
                            }}
                        >
                            {loading ? 'Đang gửi...' : 'Gửi hướng dẫn'}
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Link
                                href="/admin/login"
                                variant="body2"
                                sx={{
                                    color: '#667eea',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                <ArrowBack sx={{ mr: 0.5, fontSize: 16 }} />
                                Quay lại đăng nhập
                            </Link>
                        </Box>
                    </Box>

                    {/* Footer */}
                    <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid #eee' }}>
                        <Typography variant="body2" color="text.secondary">
                            © 2024 MinhLoc Group. Tất cả quyền được bảo lưu.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ForgotPasswordPage;
