'use client'

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    Avatar,
    IconButton,
    Chip,
    OutlinedInput,
} from '@mui/material';
import {
    CloudUpload as UploadIcon,
    Person as PersonIcon,
    Add as AddIcon,
} from '@mui/icons-material';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
    type: 'individual' | 'business';
    status: 'active' | 'inactive' | 'blocked';
    totalOrders: number;
    totalSpent: number;
    lastActivity: string;
    joinedAt: string;
    avatar: string;
    notes: string;
    interests: string[];
}

interface CustomerFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Customer>) => void;
    mode: 'add' | 'edit' | 'view';
    initialData?: Customer | null;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
    open,
    onClose,
    onSubmit,
    mode,
    initialData
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: '',
        type: 'individual' as const,
        status: 'active' as const,
        avatar: '/placeholder-user.jpg',
        notes: '',
        interests: [] as string[],
    });

    const [newInterest, setNewInterest] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const availableInterests = [
        'Sâm Ngọc Linh', 'Sâm Hàn Quốc', 'Korean Red', 'Sức khỏe', 'Y học',
        'BDS cao cấp', 'BDS thương mại', 'BDS văn phòng', 'Căn hộ', 'Đất nền',
        'Đầu tư', 'Kinh doanh', 'Chăm sóc sức khỏe'
    ];

    useEffect(() => {
        if (initialData && (mode === 'edit' || mode === 'view')) {
            setFormData({
                name: initialData.name,
                email: initialData.email,
                phone: initialData.phone,
                address: initialData.address,
                company: initialData.company,
                type: initialData.type,
                status: initialData.status,
                avatar: initialData.avatar,
                notes: initialData.notes,
                interests: initialData.interests,
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                company: '',
                type: 'individual',
                status: 'active',
                avatar: '/placeholder-user.jpg',
                notes: '',
                interests: [],
            });
        }
        setErrors({});
    }, [initialData, mode, open]);

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSelectChange = (field: string) => (event: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));

        // Clear error when user selects
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleAddInterest = () => {
        if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
            setFormData(prev => ({
                ...prev,
                interests: [...prev.interests, newInterest.trim()]
            }));
            setNewInterest('');
        }
    };

    const handleRemoveInterest = (interestToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.filter(interest => interest !== interestToRemove)
        }));
    };

    const handleAvailableInterestClick = (interest: string) => {
        if (!formData.interests.includes(interest)) {
            setFormData(prev => ({
                ...prev,
                interests: [...prev.interests, interest]
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Tên khách hàng là bắt buộc';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Số điện thoại là bắt buộc';
        } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Địa chỉ là bắt buộc';
        }

        if (formData.type === 'business' && !formData.company.trim()) {
            newErrors.company = 'Tên công ty là bắt buộc cho khách hàng doanh nghiệp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (mode === 'view') {
            onClose();
            return;
        }

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    avatar: e.target?.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const isReadOnly = mode === 'view';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { overflow: 'visible' }
            }}
        >
            <DialogTitle>
                {mode === 'add' ? '👤 Thêm Khách hàng Mới' :
                    mode === 'edit' ? '✏️ Chỉnh sửa Khách hàng' :
                        '👁️ Xem Chi tiết Khách hàng'}
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    {/* Avatar */}
                    <Grid item xs={12} md={3}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                Ảnh đại diện
                            </Typography>
                            <Avatar
                                src={formData.avatar}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mx: 'auto',
                                    mb: 2,
                                    bgcolor: '#f5f5f5'
                                }}
                            >
                                <PersonIcon sx={{ fontSize: 40, color: '#999' }} />
                            </Avatar>
                            {!isReadOnly && (
                                <>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="avatar-upload"
                                        type="file"
                                        onChange={handleImageUpload}
                                    />
                                    <label htmlFor="avatar-upload">
                                        <IconButton
                                            color="primary"
                                            component="span"
                                            sx={{
                                                border: '2px dashed #E7C873',
                                                borderRadius: 2,
                                                p: 2,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(231, 200, 115, 0.1)'
                                                }
                                            }}
                                        >
                                            <UploadIcon />
                                        </IconButton>
                                    </label>
                                    <Typography variant="caption" display="block" color="text.secondary">
                                        Nhấp để tải ảnh lên
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Grid>

                    {/* Customer Information */}
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Họ và tên"
                                    value={formData.name}
                                    onChange={handleChange('name')}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    disabled={isReadOnly}
                                    placeholder="VD: Nguyễn Văn Anh"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange('email')}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    disabled={isReadOnly}
                                    placeholder="example@email.com"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    value={formData.phone}
                                    onChange={handleChange('phone')}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                    disabled={isReadOnly}
                                    placeholder="0901234567"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={!!errors.type}>
                                    <InputLabel>Loại khách hàng</InputLabel>
                                    <Select
                                        value={formData.type}
                                        label="Loại khách hàng"
                                        onChange={handleSelectChange('type')}
                                        disabled={isReadOnly}
                                    >
                                        <MenuItem value="individual">Cá nhân</MenuItem>
                                        <MenuItem value="business">Doanh nghiệp</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {formData.type === 'business' && (
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Tên công ty"
                                        value={formData.company}
                                        onChange={handleChange('company')}
                                        error={!!errors.company}
                                        helperText={errors.company}
                                        disabled={isReadOnly}
                                        placeholder="VD: Công ty ABC"
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Địa chỉ"
                                    multiline
                                    rows={2}
                                    value={formData.address}
                                    onChange={handleChange('address')}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                    disabled={isReadOnly}
                                    placeholder="Địa chỉ đầy đủ..."
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Trạng thái</InputLabel>
                                    <Select
                                        value={formData.status}
                                        label="Trạng thái"
                                        onChange={handleSelectChange('status')}
                                        disabled={isReadOnly}
                                    >
                                        <MenuItem value="active">Hoạt động</MenuItem>
                                        <MenuItem value="inactive">Không hoạt động</MenuItem>
                                        <MenuItem value="blocked">Bị khóa</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Ghi chú"
                                    multiline
                                    rows={3}
                                    value={formData.notes}
                                    onChange={handleChange('notes')}
                                    disabled={isReadOnly}
                                    placeholder="Ghi chú về khách hàng..."
                                />
                            </Grid>

                            {/* Interests */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Sở thích & Quan tâm
                                </Typography>

                                {/* Current Interests */}
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {formData.interests.map(interest => (
                                        <Chip
                                            key={interest}
                                            label={interest}
                                            onDelete={!isReadOnly ? () => handleRemoveInterest(interest) : undefined}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>

                                {!isReadOnly && (
                                    <>
                                        {/* Add New Interest */}
                                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                            <TextField
                                                size="small"
                                                placeholder="Thêm sở thích mới..."
                                                value={newInterest}
                                                onChange={(e) => setNewInterest(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleAddInterest();
                                                    }
                                                }}
                                            />
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={handleAddInterest}
                                                startIcon={<AddIcon />}
                                            >
                                                Thêm
                                            </Button>
                                        </Box>

                                        {/* Available Interests */}
                                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                            Sở thích có sẵn (nhấp để thêm):
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {availableInterests.map(interest => (
                                                <Chip
                                                    key={interest}
                                                    label={interest}
                                                    size="small"
                                                    onClick={() => handleAvailableInterestClick(interest)}
                                                    disabled={formData.interests.includes(interest)}
                                                    sx={{
                                                        cursor: formData.interests.includes(interest) ? 'default' : 'pointer',
                                                        opacity: formData.interests.includes(interest) ? 0.5 : 1
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose}>
                    {isReadOnly ? 'Đóng' : 'Hủy'}
                </Button>
                {!isReadOnly && (
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            backgroundColor: '#E7C873',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#d4b86a',
                            },
                        }}
                    >
                        {mode === 'add' ? 'Thêm khách hàng' : 'Cập nhật'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default CustomerForm;
