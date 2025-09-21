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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Divider,
    Alert,
    Snackbar,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Save as SaveIcon,
    Email as EmailIcon,
    Send as SendIcon,
    Security as SecurityIcon,
    Description as TemplateIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Science as TestIcon,
} from '@mui/icons-material';

interface EmailConfig {
    provider: string;
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPassword: string;
    smtpSecure: boolean;
    fromName: string;
    fromEmail: string;
    replyToEmail: string;
    enableTls: boolean;
    enableAuth: boolean;
}

interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    content: string;
    type: 'welcome' | 'newsletter' | 'notification' | 'custom';
    isActive: boolean;
    createdAt: string;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

const EmailSettings: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);

    const [config, setConfig] = useState<EmailConfig>({
        provider: 'smtp',
        smtpHost: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUser: 'noreply@minhloc.vn',
        smtpPassword: '',
        smtpSecure: false,
        fromName: 'Minh Lộc Group',
        fromEmail: 'noreply@minhloc.vn',
        replyToEmail: 'support@minhloc.vn',
        enableTls: true,
        enableAuth: true,
    });

    const [templates, setTemplates] = useState<EmailTemplate[]>([
        {
            id: '1',
            name: 'Welcome Email',
            subject: 'Chào mừng đến với Minh Lộc Group',
            content: 'Xin chào {{name}},\n\nCảm ơn bạn đã đăng ký...',
            type: 'welcome',
            isActive: true,
            createdAt: '2024-01-15T10:30:00',
        },
        {
            id: '2',
            name: 'Newsletter Template',
            subject: 'Bản tin hàng tuần - {{date}}',
            content: 'Tin tức mới nhất từ Minh Lộc Group...',
            type: 'newsletter',
            isActive: true,
            createdAt: '2024-01-10T14:20:00',
        },
        {
            id: '3',
            name: 'Contact Reply',
            subject: 'Cảm ơn bạn đã liên hệ',
            content: 'Chào {{name}},\n\nChúng tôi đã nhận được tin nhắn của bạn...',
            type: 'notification',
            isActive: true,
            createdAt: '2024-01-05T09:15:00',
        },
    ]);

    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
    const [templateDialog, setTemplateDialog] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
    const [templateForm, setTemplateForm] = useState({
        name: '',
        subject: '',
        content: '',
        type: 'custom' as EmailTemplate['type']
    });

    const handleInputChange = (field: keyof EmailConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = field === 'smtpPort' ? parseInt(event.target.value) : event.target.value;
        setConfig({
            ...config,
            [field]: value,
        });
    };

    const handleSelectChange = (field: keyof EmailConfig) => (event: any) => {
        setConfig({
            ...config,
            [field]: event.target.value,
        });
    };

    const handleSwitchChange = (field: keyof EmailConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleTestEmail = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const success = Math.random() > 0.2;
        setTestResult({
            success,
            message: success
                ? 'Email test đã được gửi thành công!'
                : 'Không thể gửi email. Vui lòng kiểm tra cấu hình SMTP.'
        });
        setLoading(false);
    };

    const handleEditTemplate = (template: EmailTemplate) => {
        setEditingTemplate(template);
        setTemplateForm({
            name: template.name,
            subject: template.subject,
            content: template.content,
            type: template.type
        });
        setTemplateDialog(true);
    };

    const handleCreateTemplate = () => {
        setEditingTemplate(null);
        setTemplateForm({
            name: '',
            subject: '',
            content: '',
            type: 'custom'
        });
        setTemplateDialog(true);
    };

    const handleSaveTemplate = () => {
        if (editingTemplate) {
            setTemplates(templates.map(t =>
                t.id === editingTemplate.id
                    ? { ...t, ...templateForm }
                    : t
            ));
        } else {
            const newTemplate: EmailTemplate = {
                id: (templates.length + 1).toString(),
                ...templateForm,
                isActive: true,
                createdAt: new Date().toISOString()
            };
            setTemplates([...templates, newTemplate]);
        }
        setTemplateDialog(false);
    };

    const handleDeleteTemplate = (templateId: string) => {
        setTemplates(templates.filter(t => t.id !== templateId));
    };

    const toggleTemplateStatus = (templateId: string) => {
        setTemplates(templates.map(t =>
            t.id === templateId ? { ...t, isActive: !t.isActive } : t
        ));
    };

    const getTypeLabel = (type: EmailTemplate['type']) => {
        const labels = {
            welcome: 'Chào mừng',
            newsletter: 'Bản tin',
            notification: 'Thông báo',
            custom: 'Tùy chỉnh'
        };
        return labels[type];
    };

    const getTypeColor = (type: EmailTemplate['type']) => {
        const colors = {
            welcome: 'success',
            newsletter: 'info',
            notification: 'warning',
            custom: 'default'
        };
        return colors[type] as any;
    };

    return (
        <Box>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
                <Tab label="Cấu hình SMTP" icon={<EmailIcon />} iconPosition="start" />
                <Tab label="Email Templates" icon={<TemplateIcon />} iconPosition="start" />
            </Tabs>

            <CustomTabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                    {/* SMTP Configuration */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                    <EmailIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Cấu hình SMTP
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel>Email Provider</InputLabel>
                                            <Select
                                                value={config.provider}
                                                label="Email Provider"
                                                onChange={handleSelectChange('provider')}
                                            >
                                                <MenuItem value="smtp">Custom SMTP</MenuItem>
                                                <MenuItem value="gmail">Gmail</MenuItem>
                                                <MenuItem value="outlook">Outlook</MenuItem>
                                                <MenuItem value="sendgrid">SendGrid</MenuItem>
                                                <MenuItem value="mailgun">Mailgun</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <TextField
                                            fullWidth
                                            label="SMTP Host"
                                            value={config.smtpHost}
                                            onChange={handleInputChange('smtpHost')}
                                            helperText="VD: smtp.gmail.com"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label="SMTP Port"
                                            type="number"
                                            value={config.smtpPort}
                                            onChange={handleInputChange('smtpPort')}
                                            helperText="VD: 587"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="SMTP Username"
                                            value={config.smtpUser}
                                            onChange={handleInputChange('smtpUser')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="SMTP Password"
                                            type="password"
                                            value={config.smtpPassword}
                                            onChange={handleInputChange('smtpPassword')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="From Name"
                                            value={config.fromName}
                                            onChange={handleInputChange('fromName')}
                                            helperText="Tên hiển thị khi gửi email"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="From Email"
                                            type="email"
                                            value={config.fromEmail}
                                            onChange={handleInputChange('fromEmail')}
                                            helperText="Email gửi đi"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Reply-To Email"
                                            type="email"
                                            value={config.replyToEmail}
                                            onChange={handleInputChange('replyToEmail')}
                                            helperText="Email nhận phản hồi"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Security & Test */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                    <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Bảo mật & Test
                                </Typography>

                                <Box sx={{ mb: 3 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={config.enableAuth}
                                                onChange={handleSwitchChange('enableAuth')}
                                            />
                                        }
                                        label="Bật xác thực"
                                    />
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={config.enableTls}
                                                onChange={handleSwitchChange('enableTls')}
                                            />
                                        }
                                        label="Bật TLS/SSL"
                                    />
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={config.smtpSecure}
                                                onChange={handleSwitchChange('smtpSecure')}
                                            />
                                        }
                                        label="SMTP Secure"
                                    />
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<TestIcon />}
                                    onClick={handleTestEmail}
                                    disabled={loading}
                                    sx={{ mb: 2 }}
                                >
                                    {loading ? 'Đang test...' : 'Gửi email test'}
                                </Button>

                                {testResult && (
                                    <Alert severity={testResult.success ? 'success' : 'error'}>
                                        {testResult.message}
                                    </Alert>
                                )}
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
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={1}>
                <Card>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Email Templates
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleCreateTemplate}
                                sx={{
                                    backgroundColor: '#E7C873',
                                    color: '#000',
                                    '&:hover': {
                                        backgroundColor: '#d4b86a',
                                    },
                                }}
                            >
                                Tạo Template
                            </Button>
                        </Box>

                        <List>
                            {templates.map((template) => (
                                <ListItem key={template.id} divider>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                    {template.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            px: 1,
                                                            py: 0.5,
                                                            backgroundColor: getTypeColor(template.type) === 'default' ? '#f5f5f5' : `${getTypeColor(template.type)}.light`,
                                                            color: getTypeColor(template.type) === 'default' ? '#666' : `${getTypeColor(template.type)}.dark`,
                                                            borderRadius: 1,
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {getTypeLabel(template.type)}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            px: 1,
                                                            py: 0.5,
                                                            backgroundColor: template.isActive ? '#e8f5e8' : '#ffeaea',
                                                            color: template.isActive ? '#2e7d32' : '#d32f2f',
                                                            borderRadius: 1,
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {template.isActive ? 'Active' : 'Inactive'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                        secondary={
                                            `Subject: ${template.subject} • Tạo: ${new Date(template.createdAt).toLocaleDateString('vi-VN')}`
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => toggleTemplateStatus(template.id)}
                                            color={template.isActive ? 'warning' : 'success'}
                                        >
                                            <SendIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleEditTemplate(template)}
                                            color="primary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDeleteTemplate(template.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </CustomTabPanel>

            {/* Template Dialog */}
            <Dialog
                open={templateDialog}
                onClose={() => setTemplateDialog(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    {editingTemplate ? 'Sửa Template' : 'Tạo Template mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                label="Tên Template"
                                value={templateForm.name}
                                onChange={(e) => setTemplateForm({
                                    ...templateForm,
                                    name: e.target.value
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Loại</InputLabel>
                                <Select
                                    value={templateForm.type}
                                    label="Loại"
                                    onChange={(e) => setTemplateForm({
                                        ...templateForm,
                                        type: e.target.value as EmailTemplate['type']
                                    })}
                                >
                                    <MenuItem value="welcome">Chào mừng</MenuItem>
                                    <MenuItem value="newsletter">Bản tin</MenuItem>
                                    <MenuItem value="notification">Thông báo</MenuItem>
                                    <MenuItem value="custom">Tùy chỉnh</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Subject"
                                value={templateForm.subject}
                                onChange={(e) => setTemplateForm({
                                    ...templateForm,
                                    subject: e.target.value
                                })}
                                helperText="Có thể sử dụng {{name}}, {{date}}, {{company}} để thay thế động"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={8}
                                label="Nội dung Email"
                                value={templateForm.content}
                                onChange={(e) => setTemplateForm({
                                    ...templateForm,
                                    content: e.target.value
                                })}
                                helperText="Sử dụng {{name}}, {{email}}, {{message}} để thay thế thông tin động"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTemplateDialog(false)}>Hủy</Button>
                    <Button
                        onClick={handleSaveTemplate}
                        variant="contained"
                        disabled={!templateForm.name.trim() || !templateForm.subject.trim()}
                    >
                        {editingTemplate ? 'Cập nhật' : 'Tạo'}
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
                    Cài đặt email đã được lưu thành công!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EmailSettings;
