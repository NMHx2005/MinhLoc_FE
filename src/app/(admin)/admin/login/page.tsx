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
    IconButton,
    Checkbox,
    FormControlLabel,
    Link,
    Divider,
    CircularProgress,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    Business,
    Login as LoginIcon,
} from '@mui/icons-material';
import { useAuth } from '../../../../contexts/AuthContext';

interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface LoginFormErrors {
    email?: string;
    password?: string;
    general?: string;
}

const AdminLoginPage: React.FC = () => {
    const { login, loading } = useAuth();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (field: keyof LoginFormData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value;

        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when user starts typing
        if (errors[field as keyof LoginFormErrors]) {
            setErrors(prev => ({
                ...prev,
                [field as keyof LoginFormErrors]: undefined,
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: LoginFormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setErrors({});

        try {
            await login({
                email: formData.email,
                password: formData.password,
                rememberMe: formData.rememberMe,
            });

            // Login successful - redirect handled by AuthContext

        } catch (error: unknown) {
            console.error('Login error:', error);

            // Handle different error response formats
            const axiosError = error as {
                response?: {
                    data?: {
                        message?: string;
                        error?: string;
                        success?: boolean;
                    }
                };
                message?: string
            };

            let errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.';

            if (axiosError.response?.data) {
                // Try different possible error message fields
                errorMessage = axiosError.response.data.error ||
                    axiosError.response.data.message ||
                    errorMessage;
            } else if (axiosError.message) {
                errorMessage = axiosError.message;
            }

            setErrors({ general: errorMessage });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

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
                            MinhLoc Group
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                            Admin Dashboard
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#888' }}>
                            Đăng nhập để truy cập hệ thống quản trị
                        </Typography>
                    </Box>

                    {/* Error Alert */}
                    {errors.general && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {errors.general}
                        </Alert>
                    )}

                    {/* Login Form */}
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
                            inputProps={{
                                autoComplete: 'email'
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: '#667eea' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            fullWidth
                            label="Mật khẩu"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleInputChange('password')}
                            error={!!errors.password}
                            helperText={errors.password}
                            disabled={loading}
                            inputProps={{
                                autoComplete: 'current-password'
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: '#667eea' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                            disabled={loading}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange('rememberMe')}
                                    disabled={loading}
                                    sx={{ color: '#667eea' }}
                                />
                            }
                            label="Ghi nhớ đăng nhập"
                            sx={{ mb: 3 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
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
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Button>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                hoặc
                            </Typography>
                        </Divider>

                        <Box sx={{ textAlign: 'center' }}>
                            <Link
                                href="/auth/forgot-password"
                                variant="body2"
                                sx={{
                                    color: '#667eea',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Quên mật khẩu?
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

export default AdminLoginPage;
