'use client'

import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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

// TabPanel component moved outside to prevent re-creation on every render
const TabPanel = ({ children, value, index }: { children: React.ReactNode; value: number; index: number }) => (
    <div hidden={value !== index}>
        {value === index && <div style={{ padding: '16px 0' }}>{children}</div>}
    </div>
);

interface GinsengProductFormPageProps {
    mode: 'add' | 'edit';
    product?: GinsengProduct | null;
    onSave: (data: CreateProductData | UpdateProductData) => void;
    onCancel: () => void;
    loading?: boolean;
}

const GinsengProductFormPage: React.FC<GinsengProductFormPageProps> = ({
    mode,
    product,
    onSave,
    onCancel,
    loading = false
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
        phone: '',
        images: []
    });

    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [origins, setOrigins] = useState<{ _id: string; name: string; country: string }[]>([]);
    const [formLoading, setFormLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [imageManagerOpen, setImageManagerOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const generateSKU = useCallback(() => {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        const sku = `GIN-${timestamp}-${random}`;
        setFormData(prev => ({ ...prev, sku }));
    }, []);

    const loadCategoriesAndOrigins = useCallback(async () => {
        try {
            setFormLoading(true);
            const [categoriesRes, originsRes] = await Promise.all([
                ginsengService.getCategories(),
                ginsengService.getOrigins()
            ]);
            setCategories(categoriesRes);
            setOrigins(originsRes);
        } catch (err) {
            console.error('Error loading categories and origins:', err);
            setError('Không thể tải danh mục và xuất xứ');
        } finally {
            setFormLoading(false);
        }
    }, []);

    // Load categories and origins
    useEffect(() => {
        loadCategoriesAndOrigins();
    }, [loadCategoriesAndOrigins]);

    // Load initial data for edit mode
    useEffect(() => {
        if (mode === 'edit' && product) {
            const categoryId = product.categoryId?._id || product.category;
            const originId = product.originId?._id || product.origin;

            setFormData({
                name: product.name || '',
                description: product.description || '',
                content: product.content || '',
                sku: product.sku || '',
                price: product.price || 0,
                stock: product.stock || 0,
                status: product.status || 'active',
                category: categoryId || '',
                origin: originId || '',
                weight: product.weight || 0,
                weightUnit: product.weightUnit || 'g',
                grade: product.grade || 'premium',
                phone: product.phone || '',
                images: product.images || []
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
                phone: '',
                images: []
            });
            generateSKU();
        }
        setErrors({});
    }, [mode, product, generateSKU]);

    const handleInputChange = useCallback((field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        setErrors(prev => {
            if (prev[field]) {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            }
            return prev;
        });
    }, []);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Tên sản phẩm là bắt buộc';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Mô tả sản phẩm là bắt buộc';
        }

        if (!formData.sku.trim()) {
            newErrors.sku = 'SKU là bắt buộc';
        }

        if (formData.price <= 0) {
            newErrors.price = 'Giá sản phẩm phải lớn hơn 0';
        }

        if (formData.stock < 0) {
            newErrors.stock = 'Số lượng tồn kho không được âm';
        }

        if (!formData.category) {
            newErrors.category = 'Danh mục là bắt buộc';
        }

        if (!formData.origin) {
            newErrors.origin = 'Xuất xứ là bắt buộc';
        }

        if (formData.weight <= 0) {
            newErrors.weight = 'Trọng lượng phải lớn hơn 0';
        }

        if (!formData.images || formData.images.length === 0) {
            newErrors.images = 'Ít nhất một hình ảnh là bắt buộc';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setFormLoading(true);
            setError(null);

            // For edit mode, include the product ID
            if (mode === 'edit' && product?._id) {
                const updateData: UpdateProductData = {
                    ...formData,
                    _id: product._id
                };
                await onSave(updateData);
            } else {
                await onSave(formData);
            }
        } catch (err) {
            console.error('Error saving product:', err);
            setError('Có lỗi xảy ra khi lưu sản phẩm');
        } finally {
            setFormLoading(false);
        }
    };

    const handleImageSelect = useCallback((images: string[]) => {
        setFormData(prev => ({ ...prev, images }));
    }, []);


    if (formLoading && categories.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Card>
                <CardContent>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                            <Tab icon={<InfoIcon />} label="Thông tin cơ bản" />
                            <Tab icon={<DescriptionIcon />} label="Mô tả chi tiết" />
                            <Tab icon={<ImageIcon />} label="Hình ảnh" />
                        </Tabs>
                    </Box>

                    {/* Basic Information Tab */}
                    <TabPanel value={activeTab} index={0}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Tên sản phẩm"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="SKU"
                                    value={formData.sku}
                                    onChange={(e) => handleInputChange('sku', e.target.value)}
                                    error={!!errors.sku}
                                    helperText={errors.sku}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <Button
                                                size="small"
                                                onClick={generateSKU}
                                                startIcon={<RefreshIcon />}
                                            >
                                                Tạo mới
                                            </Button>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Số điện thoại liên hệ"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    error={!!errors.phone}
                                    helperText={errors.phone || 'Ví dụ: 0123456789 hoặc +84123456789'}
                                    placeholder="0123456789"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Giá (VNĐ)"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange('price', Number(e.target.value))}
                                    error={!!errors.price}
                                    helperText={errors.price}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Số lượng tồn kho"
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => handleInputChange('stock', Number(e.target.value))}
                                    error={!!errors.stock}
                                    helperText={errors.stock}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!errors.category} required>
                                    <InputLabel>Danh mục</InputLabel>
                                    <Select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        label="Danh mục"
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {errors.category && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                        {errors.category}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!errors.origin} required>
                                    <InputLabel>Xuất xứ</InputLabel>
                                    <Select
                                        value={formData.origin}
                                        onChange={(e) => handleInputChange('origin', e.target.value)}
                                        label="Xuất xứ"
                                    >
                                        {origins.map((origin) => (
                                            <MenuItem key={origin._id} value={origin._id}>
                                                {origin.name} ({origin.country})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {errors.origin && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                        {errors.origin}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Trọng lượng"
                                    type="number"
                                    value={formData.weight}
                                    onChange={(e) => handleInputChange('weight', Number(e.target.value))}
                                    error={!!errors.weight}
                                    helperText={errors.weight}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Đơn vị trọng lượng</InputLabel>
                                    <Select
                                        value={formData.weightUnit}
                                        onChange={(e) => handleInputChange('weightUnit', e.target.value)}
                                        label="Đơn vị trọng lượng"
                                    >
                                        <MenuItem value="g">Gram (g)</MenuItem>
                                        <MenuItem value="kg">Kilogram (kg)</MenuItem>
                                        <MenuItem value="oz">Ounce (oz)</MenuItem>
                                        <MenuItem value="lb">Pound (lb)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Phân loại</InputLabel>
                                    <Select
                                        value={formData.grade}
                                        onChange={(e) => handleInputChange('grade', e.target.value)}
                                        label="Phân loại"
                                    >
                                        <MenuItem value="premium">Premium</MenuItem>
                                        <MenuItem value="standard">Standard</MenuItem>
                                        <MenuItem value="economy">Economy</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Trạng thái</InputLabel>
                                    <Select
                                        value={formData.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        label="Trạng thái"
                                    >
                                        <MenuItem value="active">Hoạt động</MenuItem>
                                        <MenuItem value="inactive">Tạm dừng</MenuItem>
                                        <MenuItem value="draft">Bản nháp</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </TabPanel>

                    {/* Description Tab */}
                    <TabPanel value={activeTab} index={1}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mô tả ngắn"
                                    multiline
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    error={!!errors.description}
                                    helperText={errors.description}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Mô tả chi tiết
                                </Typography>
                                <RichTextEditor
                                    value={formData.content}
                                    onChange={(value) => handleInputChange('content', value)}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>

                    {/* Images Tab */}
                    <TabPanel value={activeTab} index={2}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                Hình ảnh sản phẩm
                            </Typography>
                            {errors.images && (
                                <Typography variant="caption" color="error" sx={{ mb: 2, display: 'block' }}>
                                    {errors.images}
                                </Typography>
                            )}

                            {formData.images && formData.images.length > 0 && (
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                                    {(formData.images || []).map((_, index) => (
                                        <Chip
                                            key={index}
                                            label={`Hình ${index + 1}`}
                                            onDelete={() => {
                                                const newImages = (formData.images || []).filter((_, i) => i !== index);
                                                handleInputChange('images', newImages);
                                            }}
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                            )}

                            <Button
                                variant="outlined"
                                startIcon={<ImageIcon />}
                                onClick={() => setImageManagerOpen(true)}
                            >
                                {(formData.images && formData.images.length > 0) ? 'Thay đổi hình ảnh' : 'Chọn hình ảnh'}
                            </Button>
                        </Box>
                    </TabPanel>
                </CardContent>
            </Card>

            {/* Form Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={loading || formLoading}
                >
                    Hủy
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || formLoading}
                    startIcon={loading || formLoading ? <CircularProgress size={20} /> : undefined}
                >
                    {loading || formLoading ? 'Đang lưu...' : mode === 'add' ? 'Tạo sản phẩm' : 'Cập nhật sản phẩm'}
                </Button>
            </Box>

            {/* Image Manager Dialog */}
            <ImageManager
                open={imageManagerOpen}
                onClose={() => setImageManagerOpen(false)}
                images={formData.images || []}
                onImagesChange={handleImageSelect}
                title="Quản lý hình ảnh sản phẩm"
            />
        </Box>
    );
};

export default GinsengProductFormPage;
