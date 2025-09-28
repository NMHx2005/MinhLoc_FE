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
    CircularProgress,
    Tabs,
    Tab,
    Alert,
    Chip,
} from '@mui/material';
import {
    Image as ImageIcon,
    Description as DescriptionIcon,
    Info as InfoIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import { ginsengService } from '../../services/admin/ginsengService';
import type { CreateProductData, UpdateProductData, GinsengProduct } from '../../services/admin/ginsengService';
import ImageManager from './ImageManager';
import RichTextEditor from './RichTextEditor';

interface GinsengProductFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateProductData | UpdateProductData) => void;
    mode: 'add' | 'edit';
    initialData?: GinsengProduct | null;
}

const GinsengProductForm: React.FC<GinsengProductFormProps> = ({
    open,
    onClose,
    onSubmit,
    mode,
    initialData
}) => {
    const [formData, setFormData] = useState<CreateProductData>({
        name: '',
        description: '',
        content: '',
        sku: '',
        price: 0,
        stock: 0,
        status: 'active',
        category: '',
        origin: '',
        weight: 0,
        weightUnit: 'g',
        grade: 'premium',
        images: []
    });


    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [origins, setOrigins] = useState<{ _id: string; name: string; country: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [imageManagerOpen, setImageManagerOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load categories and origins
    useEffect(() => {
        if (open) {
            loadCategoriesAndOrigins();
        }
    }, [open]);

    // Load initial data for edit mode
    useEffect(() => {
        if (mode === 'edit' && initialData) {
            // Set form data immediately, don't wait for categories/origins
            const categoryId = initialData.categoryId?._id || initialData.category;
            const originId = initialData.originId?._id || initialData.origin;

            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                content: initialData.content || '',
                sku: initialData.sku || '',
                price: initialData.price || 0,
                stock: initialData.stock || 0,
                status: initialData.status || 'active',
                category: categoryId || '',
                origin: originId || '',
                weight: initialData.weight || 0,
                weightUnit: initialData.weightUnit || 'g',
                grade: initialData.grade || 'premium',
                images: initialData.images || []
            });
        } else if (mode === 'add') {
            setFormData({
                name: '',
                description: '',
                content: '',
                sku: '',
                price: 0,
                stock: 0,
                status: 'active',
                category: '',
                origin: '',
                weight: 0,
                weightUnit: 'g',
                grade: 'premium',
                images: []
            });
            // Tự động tạo SKU khi thêm sản phẩm mới
            generateSKU();
        }
        setErrors({});
    }, [mode, initialData, open]);

    const loadCategoriesAndOrigins = async () => {
        try {
            setLoading(true);
            const [categoriesData, originsData] = await Promise.all([
                ginsengService.getCategoriesForForm(),
                ginsengService.getOriginsForForm()
            ]);
            setCategories(categoriesData);
            setOrigins(originsData);
        } catch (error) {
            console.error('Error loading categories and origins:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateSKU = async () => {
        try {
            // Lấy danh sách sản phẩm để tìm SKU cao nhất
            const response = await ginsengService.getProducts({ page: 1, limit: 1000 });
            const products = response.products || [];

            // Tìm SKU cao nhất có format GIN-XXX-XXX
            let maxNumber = 0;
            products.forEach((product: GinsengProduct) => {
                if (product.sku && product.sku.startsWith('GIN-')) {
                    const parts = product.sku.split('-');
                    if (parts.length >= 3) {
                        const number = parseInt(parts[2]);
                        if (!isNaN(number) && number > maxNumber) {
                            maxNumber = number;
                        }
                    }
                }
            });

            // Tạo SKU mới
            const newSKU = `GIN-${String(maxNumber + 1).padStart(3, '0')}`;
            setFormData(prev => ({ ...prev, sku: newSKU }));
        } catch (error) {
            console.error('Error generating SKU:', error);
            // Fallback SKU nếu có lỗi
            const fallbackSKU = `GIN-${String(Date.now()).slice(-3)}`;
            setFormData(prev => ({ ...prev, sku: fallbackSKU }));
        }
    };

    const handleChange = (field: keyof CreateProductData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }) => {
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

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Tên sản phẩm là bắt buộc';
        }

        if (!formData.sku.trim()) {
            newErrors.sku = 'Mã SKU là bắt buộc';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Mô tả là bắt buộc';
        } else if (formData.description.trim().length < 20) {
            newErrors.description = 'Mô tả phải có ít nhất 20 ký tự';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Nội dung sản phẩm là bắt buộc';
        } else if (formData.content.trim().length < 50) {
            newErrors.content = 'Nội dung phải có ít nhất 50 ký tự';
        }

        if (formData.price <= 0) {
            newErrors.price = 'Giá phải lớn hơn 0';
        }

        if (formData.stock < 0) {
            newErrors.stock = 'Số lượng tồn kho không được âm';
        }

        if (!formData.category) {
            newErrors.category = 'Phân loại là bắt buộc';
        }

        if (!formData.origin) {
            newErrors.origin = 'Xuất xứ là bắt buộc';
        }

        if (formData.weight <= 0) {
            newErrors.weight = 'Trọng lượng phải lớn hơn 0';
        }

        if (!formData.weightUnit.trim()) {
            newErrors.weightUnit = 'Đơn vị trọng lượng là bắt buộc';
        }

        if (!formData.grade.trim()) {
            newErrors.grade = 'Cấp độ là bắt buộc';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                setLoading(true);
                setError(null);
                if (mode === 'add') {
                    await onSubmit(formData);
                } else {
                    if (!initialData?._id) {
                        throw new Error('Product ID is missing');
                    }

                    await onSubmit({
                        _id: initialData._id,
                        ...formData
                    });
                }
                onClose();
            } catch (error: unknown) {
                console.error('Error submitting form:', error);

                // Xử lý lỗi validation từ backend
                const axiosError = error as { response?: { data?: { error?: string } } };
                if (axiosError?.response?.data?.error) {
                    const backendError = axiosError.response.data.error;

                    // Parse validation errors từ backend
                    if (backendError.includes('validation failed:')) {
                        const validationErrors: Record<string, string> = {};
                        const errorParts = backendError.split('validation failed:')[1];

                        if (errorParts) {
                            // Parse các lỗi validation
                            const errors = errorParts.split(',').map((e: string) => e.trim());
                            errors.forEach((err: string) => {
                                if (err.includes(':')) {
                                    const [field, message] = err.split(':').map((s: string) => s.trim());
                                    if (field && message) {
                                        // Map field names
                                        const fieldMap: Record<string, string> = {
                                            'sku': 'sku',
                                            'content': 'content',
                                            'description': 'description',
                                            'name': 'name',
                                            'price': 'price',
                                            'stock': 'stock',
                                            'category': 'category',
                                            'origin': 'origin',
                                            'weight': 'weight',
                                            'weightUnit': 'weightUnit',
                                            'grade': 'grade'
                                        };

                                        const mappedField = fieldMap[field] || field;
                                        validationErrors[mappedField] = message;
                                    }
                                }
                            });

                            // Set validation errors
                            if (Object.keys(validationErrors).length > 0) {
                                setErrors(validationErrors);
                                setError('Vui lòng kiểm tra và sửa các lỗi bên dưới');
                                return;
                            }
                        }
                    }

                    // Nếu không phải validation error, hiển thị lỗi chung
                    setError(backendError);
                } else {
                    setError('Có lỗi xảy ra khi lưu sản phẩm');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const handleImagesChange = (images: string[]) => {
        setFormData(prev => ({ ...prev, images }));
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { overflow: 'visible' }
            }}
        >
            <DialogTitle>
                {mode === 'add' ? '🌿 Thêm Sản phẩm Sâm Mới' : '✏️ Chỉnh sửa Sản phẩm Sâm'}
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, p: 2 }}>
                        <CircularProgress size={24} />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            Đang tải dữ liệu...
                        </Typography>
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ m: 2 }}>
                        {error}
                    </Alert>
                )}

                <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab
                        icon={<InfoIcon />}
                        label="Thông tin cơ bản"
                        iconPosition="start"
                    />
                    <Tab
                        icon={<ImageIcon />}
                        label="Hình ảnh"
                        iconPosition="start"
                    />
                    <Tab
                        icon={<DescriptionIcon />}
                        label="Mô tả chi tiết"
                        iconPosition="start"
                    />
                </Tabs>

                {/* Tab 1: Basic Information */}
                {activeTab === 0 && (
                    <Box sx={{ p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Tên sản phẩm"
                                    value={formData.name}
                                    onChange={handleChange('name')}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    placeholder="VD: Sâm Ngọc Linh Cao Cấp"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <TextField
                                        fullWidth
                                        label="Mã SKU"
                                        value={formData.sku}
                                        onChange={handleChange('sku')}
                                        error={!!errors.sku}
                                        helperText={errors.sku || (mode === 'edit' ? "Mã SKU hiện tại (không thể thay đổi)" : "Mã định danh sản phẩm (VD: GIN-001)")}
                                        placeholder="VD: GIN-001"
                                        disabled={mode === 'edit'}
                                    />
                                    {mode === 'add' && (
                                        <Button
                                            variant="outlined"
                                            onClick={generateSKU}
                                            startIcon={<RefreshIcon />}
                                            sx={{
                                                minWidth: 'auto',
                                                px: 2,
                                                height: '56px'
                                            }}
                                            title="Tạo SKU mới"
                                        >
                                            Tạo
                                        </Button>
                                    )}
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Mô tả ngắn"
                                    multiline
                                    rows={2}
                                    value={formData.description}
                                    onChange={handleChange('description')}
                                    error={!!errors.description}
                                    helperText={errors.description || "Mô tả ngắn gọn (tối thiểu 20 ký tự)"}
                                    placeholder="Mô tả ngắn gọn về sản phẩm..."
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Giá bán (VND)"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange('price')}
                                    error={!!errors.price}
                                    helperText={errors.price}
                                    placeholder="0"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Số lượng tồn kho"
                                    type="number"
                                    value={formData.stock}
                                    onChange={handleChange('stock')}
                                    error={!!errors.stock}
                                    helperText={errors.stock}
                                    placeholder="0"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={!!errors.category}>
                                    <InputLabel>Phân loại</InputLabel>
                                    <Select
                                        value={formData.category}
                                        label="Phân loại"
                                        onChange={handleChange('category')}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.category && (
                                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                            {errors.category}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={!!errors.origin}>
                                    <InputLabel>Xuất xứ</InputLabel>
                                    <Select
                                        value={formData.origin}
                                        label="Xuất xứ"
                                        onChange={handleChange('origin')}
                                    >
                                        {origins.map((origin) => (
                                            <MenuItem key={origin._id} value={origin._id}>
                                                {origin.name} ({origin.country})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.origin && (
                                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                            {errors.origin}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Trọng lượng"
                                    type="number"
                                    value={formData.weight}
                                    onChange={handleChange('weight')}
                                    error={!!errors.weight}
                                    helperText={errors.weight}
                                    placeholder="0"
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth error={!!errors.weightUnit}>
                                    <InputLabel>Đơn vị trọng lượng</InputLabel>
                                    <Select
                                        value={formData.weightUnit}
                                        label="Đơn vị trọng lượng"
                                        onChange={handleChange('weightUnit')}
                                    >
                                        <MenuItem value="g">Gram (g)</MenuItem>
                                        <MenuItem value="kg">Kilogram (kg)</MenuItem>
                                        <MenuItem value="oz">Ounce (oz)</MenuItem>
                                        <MenuItem value="lb">Pound (lb)</MenuItem>
                                    </Select>
                                    {errors.weightUnit && (
                                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                            {errors.weightUnit}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth error={!!errors.grade}>
                                    <InputLabel>Cấp độ</InputLabel>
                                    <Select
                                        value={formData.grade}
                                        label="Cấp độ"
                                        onChange={handleChange('grade')}
                                    >
                                        <MenuItem value="premium">Premium</MenuItem>
                                        <MenuItem value="standard">Standard</MenuItem>
                                        <MenuItem value="economy">Economy</MenuItem>
                                    </Select>
                                    {errors.grade && (
                                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                            {errors.grade}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Trạng thái</InputLabel>
                                    <Select
                                        value={formData.status}
                                        label="Trạng thái"
                                        onChange={handleChange('status')}
                                    >
                                        <MenuItem value="active">Đang bán</MenuItem>
                                        <MenuItem value="inactive">Ngừng bán</MenuItem>
                                        <MenuItem value="out_of_stock">Hết hàng</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* Tab 2: Images */}
                {activeTab === 1 && (
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Quản lý hình ảnh sản phẩm
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Thêm hình ảnh cho sản phẩm bằng cách dán URL hoặc upload từ máy tính
                            </Typography>

                            {formData.images && formData.images.length > 0 && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        Hình ảnh hiện tại ({formData.images.length}):
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {formData.images.map((_image, index) => (
                                            <Chip
                                                key={index}
                                                label={`Hình ${index + 1}`}
                                                onDelete={() => {
                                                    const newImages = formData.images?.filter((_, i) => i !== index) || [];
                                                    handleImagesChange(newImages);
                                                }}
                                                variant="outlined"
                                                size="small"
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            <Button
                                variant="contained"
                                startIcon={<ImageIcon />}
                                onClick={() => setImageManagerOpen(true)}
                                sx={{
                                    backgroundColor: '#4caf50',
                                    '&:hover': {
                                        backgroundColor: '#388e3c',
                                    },
                                }}
                            >
                                {formData.images && formData.images.length > 0 ? 'Chỉnh sửa hình ảnh' : 'Thêm hình ảnh'}
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* Tab 3: Rich Text Description */}
                {activeTab === 2 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Mô tả chi tiết sản phẩm
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Sử dụng trình soạn thảo văn bản để tạo mô tả chi tiết và hấp dẫn cho sản phẩm
                            <br />
                            <strong>Yêu cầu: Nội dung phải có ít nhất 50 ký tự</strong>
                        </Typography>

                        {errors.content && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {errors.content}
                            </Alert>
                        )}

                        <RichTextEditor
                            value={formData.content}
                            onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                            placeholder="Nhập nội dung chi tiết về sản phẩm sâm..."
                            height={400}
                        />

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                                Số ký tự: {formData.content.replace(/<[^>]*>/g, '').length}/50
                            </Typography>
                            {formData.content.replace(/<[^>]*>/g, '').length < 50 && (
                                <Typography variant="caption" color="error">
                                    Cần thêm {50 - formData.content.replace(/<[^>]*>/g, '').length} ký tự nữa
                                </Typography>
                            )}
                        </Box>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <Button onClick={handleClose} disabled={loading}>
                    Hủy
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    {loading ? (
                        <CircularProgress size={20} color="inherit" />
                    ) : (
                        mode === 'add' ? 'Thêm sản phẩm' : 'Cập nhật'
                    )}
                </Button>
            </DialogActions>

            {/* Image Manager Dialog */}
            <ImageManager
                open={imageManagerOpen}
                onClose={() => setImageManagerOpen(false)}
                images={formData.images || []}
                onImagesChange={handleImagesChange}
                title="Quản lý hình ảnh sản phẩm"
            />
        </Dialog>
    );
};

export default GinsengProductForm;