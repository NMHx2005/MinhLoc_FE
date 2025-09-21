'use client'

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    Switch,
    FormControlLabel,
} from '@mui/material';
import {
    Edit as EditIcon,
    Visibility as ViewIcon,
    Web as PageIcon,
    Add as AddIcon,
} from '@mui/icons-material';

interface StaticPage {
    id: number;
    title: string;
    slug: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    status: 'published' | 'draft';
    showInMenu: boolean;
    updatedAt: string;
    views: number;
}

const StaticPages: React.FC = () => {
    const [pages, setPages] = useState<StaticPage[]>([
        {
            id: 1,
            title: 'Giới thiệu',
            slug: 'gioi-thieu',
            content: 'Nội dung trang giới thiệu về công ty...',
            metaTitle: 'Giới thiệu về MinhLoc Group',
            metaDescription: 'Tìm hiểu về lịch sử, sứ mệnh và giá trị của MinhLoc Group',
            status: 'published',
            showInMenu: true,
            updatedAt: '2024-01-20',
            views: 1250
        },
        {
            id: 2,
            title: 'Liên hệ',
            slug: 'lien-he',
            content: 'Thông tin liên hệ và form liên hệ...',
            metaTitle: 'Liên hệ với MinhLoc Group',
            metaDescription: 'Thông tin liên hệ, địa chỉ và form gửi yêu cầu',
            status: 'published',
            showInMenu: true,
            updatedAt: '2024-01-18',
            views: 890
        },
        {
            id: 3,
            title: 'Tuyển dụng',
            slug: 'tuyen-dung',
            content: 'Thông tin tuyển dụng và cơ hội nghề nghiệp...',
            metaTitle: 'Tuyển dụng - Cơ hội nghề nghiệp tại MinhLoc',
            metaDescription: 'Khám phá các vị trí tuyển dụng và cơ hội phát triển nghề nghiệp',
            status: 'published',
            showInMenu: true,
            updatedAt: '2024-01-15',
            views: 650
        },
        {
            id: 4,
            title: 'Chính sách bảo mật',
            slug: 'chinh-sach-bao-mat',
            content: 'Chính sách bảo mật thông tin khách hàng...',
            metaTitle: 'Chính sách bảo mật - MinhLoc Group',
            metaDescription: 'Chính sách bảo mật và xử lý thông tin cá nhân',
            status: 'published',
            showInMenu: false,
            updatedAt: '2024-01-10',
            views: 320
        },
        {
            id: 5,
            title: 'Điều khoản sử dụng',
            slug: 'dieu-khoan-su-dung',
            content: 'Điều khoản và điều kiện sử dụng website...',
            metaTitle: 'Điều khoản sử dụng - MinhLoc Group',
            metaDescription: 'Điều khoản và điều kiện sử dụng dịch vụ của MinhLoc Group',
            status: 'draft',
            showInMenu: false,
            updatedAt: '2024-01-08',
            views: 0
        }
    ]);

    const [formOpen, setFormOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState<StaticPage | null>(null);
    const [formMode, setFormMode] = useState<'add' | 'edit' | 'view'>('add');
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        metaTitle: '',
        metaDescription: '',
        status: 'draft' as const,
        showInMenu: false,
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    };

    const handleEdit = (page: StaticPage) => {
        setSelectedPage(page);
        setFormMode('edit');
        setFormData({
            title: page.title,
            slug: page.slug,
            content: page.content,
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription,
            status: page.status,
            showInMenu: page.showInMenu,
        });
        setFormOpen(true);
    };

    const handleView = (page: StaticPage) => {
        setSelectedPage(page);
        setFormMode('view');
        setFormData({
            title: page.title,
            slug: page.slug,
            content: page.content,
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription,
            status: page.status,
            showInMenu: page.showInMenu,
        });
        setFormOpen(true);
    };

    const handleAddPage = () => {
        setSelectedPage(null);
        setFormMode('add');
        setFormData({
            title: '',
            slug: '',
            content: '',
            metaTitle: '',
            metaDescription: '',
            status: 'draft',
            showInMenu: false,
        });
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setSelectedPage(null);
    };

    const handleFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData(prev => {
            const newData = {
                ...prev,
                [field]: value
            };

            // Auto-generate slug from title
            if (field === 'title') {
                newData.slug = generateSlug(value as string);
                // Auto-generate meta title if empty
                if (!prev.metaTitle) {
                    newData.metaTitle = value as string;
                }
            }

            return newData;
        });
    };

    const handleFormSubmit = () => {
        if (formMode === 'view') {
            setFormOpen(false);
            return;
        }

        if (formMode === 'add') {
            const newPage: StaticPage = {
                id: Math.max(...pages.map(p => p.id)) + 1,
                ...formData,
                updatedAt: new Date().toISOString().split('T')[0],
                views: 0,
            };
            setPages([...pages, newPage]);
        } else if (formMode === 'edit' && selectedPage) {
            setPages(pages.map(page =>
                page.id === selectedPage.id
                    ? {
                        ...page,
                        ...formData,
                        updatedAt: new Date().toISOString().split('T')[0]
                    }
                    : page
            ));
        }
        setFormOpen(false);
    };

    const getStatusColor = (status: string) => {
        return status === 'published' ? 'success' : 'warning';
    };

    const getStatusLabel = (status: string) => {
        return status === 'published' ? 'Đã xuất bản' : 'Bản nháp';
    };

    const isReadOnly = formMode === 'view';

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Trang tĩnh ({pages.length})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddPage}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    Thêm Trang
                </Button>
            </Box>

            {/* Pages Table */}
            <Card>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Trang</TableCell>
                                <TableCell>Slug</TableCell>
                                <TableCell align="center">Hiển thị menu</TableCell>
                                <TableCell align="center">Lượt xem</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Cập nhật</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pages.map((page) => (
                                <TableRow key={page.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PageIcon sx={{ color: '#E7C873' }} />
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {page.title}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {page.metaDescription || 'Chưa có mô tả'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                                            /{page.slug}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={page.showInMenu ? 'Có' : 'Không'}
                                            color={page.showInMenu ? 'primary' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {page.views.toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={getStatusLabel(page.status)}
                                            color={getStatusColor(page.status) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2">
                                            {new Date(page.updatedAt).toLocaleDateString('vi-VN')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => handleView(page)}
                                            size="small"
                                            color="primary"
                                        >
                                            <ViewIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleEdit(page)}
                                            size="small"
                                            color="warning"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            {/* Form Dialog */}
            <Dialog
                open={formOpen}
                onClose={handleFormClose}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>
                    {formMode === 'add' ? '📄 Thêm Trang Mới' :
                        formMode === 'edit' ? '✏️ Chỉnh sửa Trang' :
                            '👁️ Xem Chi tiết Trang'}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Tiêu đề trang"
                                value={formData.title}
                                onChange={handleFormChange('title')}
                                disabled={isReadOnly}
                                placeholder="VD: Giới thiệu"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Slug URL"
                                value={formData.slug}
                                onChange={handleFormChange('slug')}
                                disabled={isReadOnly}
                                placeholder="gioi-thieu"
                                helperText="URL thân thiện cho trang"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nội dung trang"
                                multiline
                                rows={8}
                                value={formData.content}
                                onChange={handleFormChange('content')}
                                disabled={isReadOnly}
                                placeholder="Nội dung chi tiết của trang..."
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Meta Title (SEO)"
                                value={formData.metaTitle}
                                onChange={handleFormChange('metaTitle')}
                                disabled={isReadOnly}
                                placeholder="Tiêu đề cho SEO"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Meta Description (SEO)"
                                value={formData.metaDescription}
                                onChange={handleFormChange('metaDescription')}
                                disabled={isReadOnly}
                                placeholder="Mô tả cho SEO"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.status === 'published'}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            status: e.target.checked ? 'published' : 'draft'
                                        }))}
                                        disabled={isReadOnly}
                                    />
                                }
                                label="Xuất bản trang"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.showInMenu}
                                        onChange={handleFormChange('showInMenu')}
                                        disabled={isReadOnly}
                                    />
                                }
                                label="Hiển thị trong menu"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleFormClose}>
                        {isReadOnly ? 'Đóng' : 'Hủy'}
                    </Button>
                    {!isReadOnly && (
                        <Button
                            onClick={handleFormSubmit}
                            variant="contained"
                            sx={{
                                backgroundColor: '#E7C873',
                                color: '#000',
                                '&:hover': {
                                    backgroundColor: '#d4b86a',
                                },
                            }}
                        >
                            {formMode === 'add' ? 'Thêm trang' : 'Cập nhật'}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StaticPages;
