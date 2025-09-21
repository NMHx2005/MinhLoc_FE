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
    Switch,
    FormControlLabel,
    Alert,
    Snackbar,
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Save as SaveIcon,
    Share as ShareIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Launch as LaunchIcon,
    Facebook as FacebookIcon,
    YouTube as YouTubeIcon,
    Instagram as InstagramIcon,
    Twitter as TwitterIcon,
    LinkedIn as LinkedInIcon,
    Language as WebsiteIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';

interface SocialLink {
    id: string;
    name: string;
    platform: string;
    url: string;
    isActive: boolean;
    icon: React.ReactNode;
    color: string;
    followers?: number;
    description: string;
}

interface SocialConfig {
    facebookPixel: string;
    googleAnalytics: string;
    googleTagManager: string;
    enableSocialLogin: boolean;
    enableSocialShare: boolean;
    enableSocialComments: boolean;
    metaImage: string;
    metaTitle: string;
    metaDescription: string;
}

const SocialSettings: React.FC = () => {
    const [config, setConfig] = useState<SocialConfig>({
        facebookPixel: '',
        googleAnalytics: 'GA-XXXXXXXXX',
        googleTagManager: 'GTM-XXXXXXX',
        enableSocialLogin: true,
        enableSocialShare: true,
        enableSocialComments: false,
        metaImage: '/og-image.jpg',
        metaTitle: 'Minh Lộc Group - BDS & Sâm Ngọc Linh',
        metaDescription: 'Chuyên cung cấp bất động sản cao cấp và sản phẩm sâm Ngọc Linh chất lượng cao'
    });

    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
        {
            id: '1',
            name: 'Facebook Page',
            platform: 'facebook',
            url: 'https://facebook.com/minhloc.group',
            isActive: true,
            icon: <FacebookIcon />,
            color: '#1877f2',
            followers: 15420,
            description: 'Trang Facebook chính thức'
        },
        {
            id: '2',
            name: 'YouTube Channel',
            platform: 'youtube',
            url: 'https://youtube.com/@minhloc-group',
            isActive: true,
            icon: <YouTubeIcon />,
            color: '#ff0000',
            followers: 8650,
            description: 'Kênh YouTube giới thiệu dự án'
        },
        {
            id: '3',
            name: 'Instagram',
            platform: 'instagram',
            url: 'https://instagram.com/minhloc.group',
            isActive: true,
            icon: <InstagramIcon />,
            color: '#e4405f',
            followers: 12300,
            description: 'Hình ảnh dự án và sản phẩm'
        },
        {
            id: '4',
            name: 'LinkedIn Company',
            platform: 'linkedin',
            url: 'https://linkedin.com/company/minhloc-group',
            isActive: false,
            icon: <LinkedInIcon />,
            color: '#0077b5',
            followers: 2100,
            description: 'Trang doanh nghiệp LinkedIn'
        },
        {
            id: '5',
            name: 'Hotline',
            platform: 'phone',
            url: 'tel:+84281234567',
            isActive: true,
            icon: <PhoneIcon />,
            color: '#4caf50',
            description: 'Hotline hỗ trợ khách hàng'
        },
        {
            id: '6',
            name: 'WhatsApp Business',
            platform: 'whatsapp',
            url: 'https://wa.me/84281234567',
            isActive: true,
            icon: <WhatsAppIcon />,
            color: '#25d366',
            description: 'Tư vấn qua WhatsApp'
        }
    ]);

    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [linkDialog, setLinkDialog] = useState(false);
    const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
    const [linkForm, setLinkForm] = useState({
        name: '',
        platform: 'website',
        url: '',
        description: ''
    });

    const handleConfigChange = (field: keyof SocialConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({
            ...config,
            [field]: event.target.value,
        });
    };

    const handleSwitchChange = (field: keyof SocialConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({
            ...config,
            [field]: event.target.checked,
        });
    };

    const handleSave = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        setSaved(true);
    };

    const handleEditLink = (link: SocialLink) => {
        setEditingLink(link);
        setLinkForm({
            name: link.name,
            platform: link.platform,
            url: link.url,
            description: link.description
        });
        setLinkDialog(true);
    };

    const handleCreateLink = () => {
        setEditingLink(null);
        setLinkForm({
            name: '',
            platform: 'website',
            url: '',
            description: ''
        });
        setLinkDialog(true);
    };

    const handleSaveLink = () => {
        const platformIcons: Record<string, { icon: React.ReactNode; color: string }> = {
            facebook: { icon: <FacebookIcon />, color: '#1877f2' },
            youtube: { icon: <YouTubeIcon />, color: '#ff0000' },
            instagram: { icon: <InstagramIcon />, color: '#e4405f' },
            twitter: { icon: <TwitterIcon />, color: '#1da1f2' },
            linkedin: { icon: <LinkedInIcon />, color: '#0077b5' },
            whatsapp: { icon: <WhatsAppIcon />, color: '#25d366' },
            phone: { icon: <PhoneIcon />, color: '#4caf50' },
            email: { icon: <EmailIcon />, color: '#ff5722' },
            website: { icon: <WebsiteIcon />, color: '#757575' }
        };

        if (editingLink) {
            setSocialLinks(socialLinks.map(link =>
                link.id === editingLink.id
                    ? {
                        ...link,
                        ...linkForm,
                        icon: platformIcons[linkForm.platform]?.icon || <WebsiteIcon />,
                        color: platformIcons[linkForm.platform]?.color || '#757575'
                    }
                    : link
            ));
        } else {
            const newLink: SocialLink = {
                id: (socialLinks.length + 1).toString(),
                ...linkForm,
                isActive: true,
                icon: platformIcons[linkForm.platform]?.icon || <WebsiteIcon />,
                color: platformIcons[linkForm.platform]?.color || '#757575'
            };
            setSocialLinks([...socialLinks, newLink]);
        }
        setLinkDialog(false);
    };

    const handleDeleteLink = (linkId: string) => {
        setSocialLinks(socialLinks.filter(link => link.id !== linkId));
    };

    const toggleLinkStatus = (linkId: string) => {
        setSocialLinks(socialLinks.map(link =>
            link.id === linkId ? { ...link, isActive: !link.isActive } : link
        ));
    };

    const formatFollowers = (followers?: number) => {
        if (!followers) return '';
        if (followers >= 1000000) {
            return `${(followers / 1000000).toFixed(1)}M followers`;
        } else if (followers >= 1000) {
            return `${(followers / 1000).toFixed(1)}K followers`;
        }
        return `${followers} followers`;
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Social Media Links */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    <ShareIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Liên kết Mạng xã hội
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={handleCreateLink}
                                    sx={{
                                        backgroundColor: '#E7C873',
                                        color: '#000',
                                        '&:hover': {
                                            backgroundColor: '#d4b86a',
                                        },
                                    }}
                                >
                                    Thêm liên kết
                                </Button>
                            </Box>

                            <List>
                                {socialLinks.map((link) => (
                                    <ListItem key={link.id} divider>
                                        <ListItemAvatar>
                                            <Avatar sx={{ backgroundColor: link.color, color: 'white' }}>
                                                {link.icon}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${link.name} - ${link.isActive ? 'Active' : 'Inactive'}`}
                                            secondary={`${link.description} • ${link.url}${link.followers ? ` • ${formatFollowers(link.followers)}` : ''}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                onClick={() => window.open(link.url, '_blank')}
                                                color="primary"
                                                size="small"
                                            >
                                                <LaunchIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => toggleLinkStatus(link.id)}
                                                color={link.isActive ? 'warning' : 'success'}
                                                size="small"
                                            >
                                                {link.isActive ? 'Off' : 'On'}
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleEditLink(link)}
                                                color="primary"
                                                size="small"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDeleteLink(link.id)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Social Features */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Tính năng Mạng xã hội
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={config.enableSocialLogin}
                                            onChange={handleSwitchChange('enableSocialLogin')}
                                        />
                                    }
                                    label="Đăng nhập bằng mạng xã hội"
                                />
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={config.enableSocialShare}
                                            onChange={handleSwitchChange('enableSocialShare')}
                                        />
                                    }
                                    label="Nút chia sẻ mạng xã hội"
                                />
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={config.enableSocialComments}
                                            onChange={handleSwitchChange('enableSocialComments')}
                                        />
                                    }
                                    label="Bình luận Facebook"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Tracking & Analytics */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Tracking & Analytics
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Google Analytics ID"
                                        value={config.googleAnalytics}
                                        onChange={handleConfigChange('googleAnalytics')}
                                        helperText="VD: GA-XXXXXXXXX hoặc G-XXXXXXXXXX"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Google Tag Manager ID"
                                        value={config.googleTagManager}
                                        onChange={handleConfigChange('googleTagManager')}
                                        helperText="VD: GTM-XXXXXXX"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Facebook Pixel ID"
                                        value={config.facebookPixel}
                                        onChange={handleConfigChange('facebookPixel')}
                                        helperText="VD: 1234567890123456"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Open Graph Meta */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Open Graph Meta Tags
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="OG Title"
                                        value={config.metaTitle}
                                        onChange={handleConfigChange('metaTitle')}
                                        helperText="Tiêu đề khi chia sẻ trên mạng xã hội"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="OG Description"
                                        value={config.metaDescription}
                                        onChange={handleConfigChange('metaDescription')}
                                        helperText="Mô tả khi chia sẻ trên mạng xã hội"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="OG Image URL"
                                        value={config.metaImage}
                                        onChange={handleConfigChange('metaImage')}
                                        helperText="URL hình ảnh hiển thị khi chia sẻ (1200x630px)"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Save Button */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                            disabled={loading}
                            sx={{
                                backgroundColor: '#E7C873',
                                color: '#000',
                                '&:hover': {
                                    backgroundColor: '#d4b86a',
                                },
                                minWidth: 150,
                            }}
                        >
                            {loading ? 'Đang lưu...' : 'Lưu cài đặt'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* Link Dialog */}
            <Dialog
                open={linkDialog}
                onClose={() => setLinkDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {editingLink ? 'Sửa liên kết' : 'Thêm liên kết mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                label="Tên hiển thị"
                                value={linkForm.name}
                                onChange={(e) => setLinkForm({
                                    ...linkForm,
                                    name: e.target.value
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                select
                                label="Platform"
                                value={linkForm.platform}
                                onChange={(e) => setLinkForm({
                                    ...linkForm,
                                    platform: e.target.value
                                })}
                                SelectProps={{ native: true }}
                            >
                                <option value="facebook">Facebook</option>
                                <option value="youtube">YouTube</option>
                                <option value="instagram">Instagram</option>
                                <option value="twitter">Twitter</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="whatsapp">WhatsApp</option>
                                <option value="phone">Phone</option>
                                <option value="email">Email</option>
                                <option value="website">Website</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="URL"
                                value={linkForm.url}
                                onChange={(e) => setLinkForm({
                                    ...linkForm,
                                    url: e.target.value
                                })}
                                helperText="VD: https://facebook.com/minhloc.group"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả"
                                value={linkForm.description}
                                onChange={(e) => setLinkForm({
                                    ...linkForm,
                                    description: e.target.value
                                })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLinkDialog(false)}>Hủy</Button>
                    <Button
                        onClick={handleSaveLink}
                        variant="contained"
                        disabled={!linkForm.name.trim() || !linkForm.url.trim()}
                    >
                        {editingLink ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Snackbar */}
            <Snackbar
                open={saved}
                autoHideDuration={3000}
                onClose={() => setSaved(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSaved(false)} severity="success">
                    Cài đặt mạng xã hội đã được lưu thành công!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SocialSettings;
