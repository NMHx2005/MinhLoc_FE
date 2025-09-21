'use client'

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Grid,
    Divider,
    Chip,
    IconButton,
    Alert,
    AlertTitle,
    Switch,
    FormControlLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import {
    Save as SaveIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Search as SEOIcon,
    ExpandMore as ExpandMoreIcon,
    Language as LanguageIcon,
    Analytics as AnalyticsIcon,
    Security as SecurityIcon,
} from '@mui/icons-material';

interface SEOData {
    global: {
        siteName: string;
        siteDescription: string;
        siteKeywords: string[];
        defaultImage: string;
        googleAnalyticsId: string;
        googleSearchConsoleId: string;
        facebookPixelId: string;
        enableSitemap: boolean;
        enableRobots: boolean;
    };
    pages: {
        home: {
            title: string;
            description: string;
            keywords: string[];
        };
        about: {
            title: string;
            description: string;
            keywords: string[];
        };
        contact: {
            title: string;
            description: string;
            keywords: string[];
        };
        products: {
            title: string;
            description: string;
            keywords: string[];
        };
        news: {
            title: string;
            description: string;
            keywords: string[];
        };
    };
    social: {
        facebookUrl: string;
        youtubeUrl: string;
        zaloUrl: string;
        linkedinUrl: string;
    };
}

const SEOSettings: React.FC = () => {
    const [seoData, setSeoData] = useState<SEOData>({
        global: {
            siteName: 'MinhLoc Group - Bất động sản & Sâm Ngọc Linh',
            siteDescription: 'Công ty hàng đầu về bất động sản và phân phối sâm Ngọc Linh chính gốc tại Việt Nam',
            siteKeywords: ['bất động sản', 'sâm ngọc linh', 'kontum', 'đầu tư', 'căn hộ', 'đất nền'],
            defaultImage: '/og-image.jpg',
            googleAnalyticsId: 'G-XXXXXXXXXX',
            googleSearchConsoleId: '',
            facebookPixelId: '',
            enableSitemap: true,
            enableRobots: true,
        },
        pages: {
            home: {
                title: 'MinhLoc Group - Trang chủ',
                description: 'Khám phá các dự án bất động sản và sản phẩm sâm Ngọc Linh chất lượng cao',
                keywords: ['trang chủ', 'bất động sản', 'sâm ngọc linh'],
            },
            about: {
                title: 'Giới thiệu - MinhLoc Group',
                description: 'Tìm hiểu về lịch sử, sứ mệnh và giá trị của MinhLoc Group',
                keywords: ['giới thiệu', 'về chúng tôi', 'lịch sử công ty'],
            },
            contact: {
                title: 'Liên hệ - MinhLoc Group',
                description: 'Thông tin liên hệ và địa chỉ văn phòng MinhLoc Group',
                keywords: ['liên hệ', 'địa chỉ', 'hotline'],
            },
            products: {
                title: 'Sản phẩm Sâm - MinhLoc Group',
                description: 'Bộ sưu tập sâm Ngọc Linh và các sản phẩm sâm chất lượng cao',
                keywords: ['sâm ngọc linh', 'sâm hàn quốc', 'sản phẩm sâm'],
            },
            news: {
                title: 'Tin tức - MinhLoc Group',
                description: 'Cập nhật tin tức mới nhất về thị trường BDS và ngành sâm',
                keywords: ['tin tức', 'thị trường bds', 'tin sâm'],
            },
        },
        social: {
            facebookUrl: 'https://facebook.com/minhloc.group',
            youtubeUrl: 'https://youtube.com/@minhlocgroup',
            zaloUrl: 'https://zalo.me/minhlocgroup',
            linkedinUrl: 'https://linkedin.com/company/minhloc-group',
        },
    });

    const [newKeyword, setNewKeyword] = useState('');
    const [activeSection, setActiveSection] = useState('global');
    const [isSaved, setIsSaved] = useState(false);

    const handleInputChange = (section: keyof SEOData, field: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setSeoData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handlePageInputChange = (page: keyof SEOData['pages'], field: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSeoData(prev => ({
            ...prev,
            pages: {
                ...prev.pages,
                [page]: {
                    ...prev.pages[page],
                    [field]: event.target.value
                }
            }
        }));
    };

    const handleAddKeyword = (section: keyof SEOData, page?: keyof SEOData['pages']) => {
        if (!newKeyword.trim()) return;

        setSeoData(prev => {
            if (page) {
                return {
                    ...prev,
                    pages: {
                        ...prev.pages,
                        [page]: {
                            ...prev.pages[page],
                            keywords: [...prev.pages[page].keywords, newKeyword.trim()]
                        }
                    }
                };
            } else if (section === 'global') {
                return {
                    ...prev,
                    global: {
                        ...prev.global,
                        siteKeywords: [...prev.global.siteKeywords, newKeyword.trim()]
                    }
                };
            }
            return prev;
        });
        setNewKeyword('');
    };

    const handleRemoveKeyword = (keyword: string, section: keyof SEOData, page?: keyof SEOData['pages']) => {
        setSeoData(prev => {
            if (page) {
                return {
                    ...prev,
                    pages: {
                        ...prev.pages,
                        [page]: {
                            ...prev.pages[page],
                            keywords: prev.pages[page].keywords.filter(k => k !== keyword)
                        }
                    }
                };
            } else if (section === 'global') {
                return {
                    ...prev,
                    global: {
                        ...prev.global,
                        siteKeywords: prev.global.siteKeywords.filter(k => k !== keyword)
                    }
                };
            }
            return prev;
        });
    };

    const handleSave = () => {
        // Simulate API call
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const renderKeywordSection = (keywords: string[], section: keyof SEOData, page?: keyof SEOData['pages']) => (
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Keywords
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {keywords.map(keyword => (
                    <Chip
                        key={keyword}
                        label={keyword}
                        onDelete={() => handleRemoveKeyword(keyword, section, page)}
                        color="primary"
                        variant="outlined"
                        size="small"
                    />
                ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    size="small"
                    placeholder="Thêm keyword mới..."
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleAddKeyword(section, page);
                        }
                    }}
                />
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleAddKeyword(section, page)}
                    startIcon={<AddIcon />}
                >
                    Thêm
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Cài đặt SEO
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    Lưu cài đặt
                </Button>
            </Box>

            {/* Success Alert */}
            {isSaved && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    <AlertTitle>Thành công!</AlertTitle>
                    Cài đặt SEO đã được lưu thành công.
                </Alert>
            )}

            {/* Global SEO Settings */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SEOIcon sx={{ color: '#E7C873' }} />
                        Cài đặt SEO Tổng quan
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Tên website"
                                value={seoData.global.siteName}
                                onChange={handleInputChange('global', 'siteName')}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Ảnh mặc định (OG Image)"
                                value={seoData.global.defaultImage}
                                onChange={handleInputChange('global', 'defaultImage')}
                                margin="dense"
                                placeholder="/og-image.jpg"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả website"
                                multiline
                                rows={3}
                                value={seoData.global.siteDescription}
                                onChange={handleInputChange('global', 'siteDescription')}
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {renderKeywordSection(seoData.global.siteKeywords, 'global')}
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Analytics Settings */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AnalyticsIcon sx={{ color: '#E7C873' }} />
                        Cài đặt Analytics & Tracking
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Google Analytics ID"
                                value={seoData.global.googleAnalyticsId}
                                onChange={handleInputChange('global', 'googleAnalyticsId')}
                                placeholder="G-XXXXXXXXXX"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Google Search Console ID"
                                value={seoData.global.googleSearchConsoleId}
                                onChange={handleInputChange('global', 'googleSearchConsoleId')}
                                placeholder="google-site-verification="
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Facebook Pixel ID"
                                value={seoData.global.facebookPixelId}
                                onChange={handleInputChange('global', 'facebookPixelId')}
                                placeholder="123456789"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ pt: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={seoData.global.enableSitemap}
                                            onChange={handleInputChange('global', 'enableSitemap')}
                                        />
                                    }
                                    label="Bật Sitemap tự động"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={seoData.global.enableRobots}
                                            onChange={handleInputChange('global', 'enableRobots')}
                                        />
                                    }
                                    label="Bật Robots.txt"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Page-specific SEO */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LanguageIcon sx={{ color: '#E7C873' }} />
                        SEO từng trang
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        {Object.entries(seoData.pages).map(([pageKey, pageData]) => (
                            <Grid item xs={12} key={pageKey}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
                                            {pageKey === 'home' ? 'Trang chủ' :
                                                pageKey === 'about' ? 'Giới thiệu' :
                                                    pageKey === 'contact' ? 'Liên hệ' :
                                                        pageKey === 'products' ? 'Sản phẩm' : 'Tin tức'}
                                        </Typography>

                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Meta Title"
                                                    value={pageData.title}
                                                    onChange={handlePageInputChange(pageKey as keyof SEOData['pages'], 'title')}
                                                    margin="dense"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Meta Description"
                                                    value={pageData.description}
                                                    onChange={handlePageInputChange(pageKey as keyof SEOData['pages'], 'description')}
                                                    margin="dense"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                {renderKeywordSection(pageData.keywords, 'pages', pageKey as keyof SEOData['pages'])}
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Social Media Settings */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SecurityIcon sx={{ color: '#E7C873' }} />
                        Mạng xã hội
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Facebook URL"
                                value={seoData.social.facebookUrl}
                                onChange={handleInputChange('social', 'facebookUrl')}
                                placeholder="https://facebook.com/minhloc.group"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="YouTube URL"
                                value={seoData.social.youtubeUrl}
                                onChange={handleInputChange('social', 'youtubeUrl')}
                                placeholder="https://youtube.com/@minhlocgroup"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Zalo URL"
                                value={seoData.social.zaloUrl}
                                onChange={handleInputChange('social', 'zaloUrl')}
                                placeholder="https://zalo.me/minhlocgroup"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="LinkedIn URL"
                                value={seoData.social.linkedinUrl}
                                onChange={handleInputChange('social', 'linkedinUrl')}
                                placeholder="https://linkedin.com/company/minhloc-group"
                                margin="dense"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* SEO Tips */}
            <Card sx={{ mt: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        💡 Tips SEO
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Alert severity="info">
                                <Typography variant="body2">
                                    <strong>Meta Title:</strong> Nên từ 50-60 ký tự, chứa từ khóa chính
                                </Typography>
                            </Alert>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Alert severity="warning">
                                <Typography variant="body2">
                                    <strong>Meta Description:</strong> Nên từ 150-160 ký tự, mô tả hấp dẫn
                                </Typography>
                            </Alert>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Alert severity="success">
                                <Typography variant="body2">
                                    <strong>Keywords:</strong> Chọn 3-5 từ khóa chính cho mỗi trang
                                </Typography>
                            </Alert>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SEOSettings;
