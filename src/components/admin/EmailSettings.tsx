'use client'

import React, { useState, useEffect } from 'react';
import {
    Box, Card, CardContent, Typography, TextField, Button, Grid,
    Switch, FormControlLabel, Alert, Snackbar, CircularProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    Chip, Menu, MenuItem, ListItemIcon, ListItemText, Select, FormControl,
    InputLabel
} from '@mui/material';
import {
    Save as SaveIcon, Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon,
    Email as EmailIcon, MoreVert as MoreVertIcon,
    BugReport as TestIcon, Refresh as RefreshIcon
} from '@mui/icons-material';
import { settingsService, type EmailSettings, type EmailTemplate } from '../../services/admin/settingsService';

const EmailSettings: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [emailSettings, setEmailSettings] = useState<EmailSettings>({
        provider: 'smtp',
        fromEmail: '',
        fromName: '',
        replyToEmail: '',
        testEmail: '',
        smtp: {
            host: '',
            port: 587,
            secure: false,
            username: '',
            password: ''
        }
    });

    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [showTemplateDialog, setShowTemplateDialog] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
    const [templateData, setTemplateData] = useState({
        name: '',
        subject: '',
        content: '',
        variables: [] as string[]
    });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

    const providerOptions = [
        { value: 'smtp', label: 'SMTP' },
        { value: 'sendgrid', label: 'SendGrid' },
        { value: 'mailgun', label: 'Mailgun' },
        { value: 'ses', label: 'Amazon SES' }
    ];

    const commonVariables = [
        '{{siteName}}', '{{userName}}', '{{userEmail}}', '{{resetLink}}',
        '{{verificationLink}}', '{{orderNumber}}', '{{orderTotal}}', '{{date}}'
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [settings, templateList] = await Promise.all([
                settingsService.getEmailSettings(),
                settingsService.getEmailTemplates()
            ]);
            setEmailSettings(settings);
            setTemplates(templateList);
        } catch (err) {
            console.error('Error loading email data:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu email');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof EmailSettings, value: string | boolean) => {
        setEmailSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNestedInputChange = (parent: keyof EmailSettings, field: string, value: string | number | boolean) => {
        setEmailSettings(prev => ({
            ...prev,
            [parent]: {
                ...(prev[parent] as Record<string, unknown>),
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError(null);
            await settingsService.updateEmailSettings(emailSettings);
            setSnackbarMessage('✅ Cập nhật cài đặt email thành công!');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error saving email settings:', err);
            setError(err instanceof Error ? err.message : 'Không thể lưu cài đặt email');
        } finally {
            setSaving(false);
        }
    };

    const handleTestEmail = async () => {
        try {
            setSaving(true);
            const result = await settingsService.testEmailSending();
            setSnackbarMessage(result.success ? '✅ Gửi email test thành công!' : `❌ ${result.message}`);
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error testing email:', err);
            setError(err instanceof Error ? err.message : 'Không thể gửi email test');
        } finally {
            setSaving(false);
        }
    };

    const handleCreateTemplate = async () => {
        try {
            setSaving(true);
            const newTemplate = await settingsService.createEmailTemplate(templateData);
            setTemplates(prev => [...prev, newTemplate]);
            setShowTemplateDialog(false);
            setTemplateData({ name: '', subject: '', content: '', variables: [] });
            setSnackbarMessage('✅ Tạo template thành công!');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error creating template:', err);
            setError(err instanceof Error ? err.message : 'Không thể tạo template');
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateTemplate = async () => {
        if (!editingTemplate) return;
        try {
            setSaving(true);
            const updatedTemplate = await settingsService.updateEmailTemplate(editingTemplate._id, templateData);
            setTemplates(prev => prev.map(t => t._id === editingTemplate._id ? updatedTemplate : t));
            setShowTemplateDialog(false);
            setEditingTemplate(null);
            setTemplateData({ name: '', subject: '', content: '', variables: [] });
            setSnackbarMessage('✅ Cập nhật template thành công!');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error updating template:', err);
            setError(err instanceof Error ? err.message : 'Không thể cập nhật template');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteTemplate = async (id: string) => {
        try {
            await settingsService.deleteEmailTemplate(id);
            setTemplates(prev => prev.filter(t => t._id !== id));
            setSnackbarMessage('✅ Xóa template thành công!');
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error deleting template:', err);
            setError(err instanceof Error ? err.message : 'Không thể xóa template');
        }
    };

    const handleEditTemplate = (template: EmailTemplate) => {
        setEditingTemplate(template);
        setTemplateData({
            name: template.name,
            subject: template.subject,
            content: template.content,
            variables: template.variables
        });
        setShowTemplateDialog(true);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, template: EmailTemplate) => {
        setAnchorEl(event.currentTarget);
        setSelectedTemplate(template);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTemplate(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải cài đặt email...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Email Configuration */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                <EmailIcon sx={{ mr: 1 }} />
                                Cấu hình Email
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Nhà cung cấp</InputLabel>
                                        <Select
                                            value={emailSettings.provider}
                                            label="Nhà cung cấp"
                                            onChange={(e) => handleInputChange('provider', e.target.value)}
                                        >
                                            {providerOptions.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Email gửi"
                                        value={emailSettings.fromEmail}
                                        onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                                        type="email"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Tên người gửi"
                                        value={emailSettings.fromName}
                                        onChange={(e) => handleInputChange('fromName', e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Email phản hồi"
                                        value={emailSettings.replyToEmail}
                                        onChange={(e) => handleInputChange('replyToEmail', e.target.value)}
                                        type="email"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email test"
                                        value={emailSettings.testEmail}
                                        onChange={(e) => handleInputChange('testEmail', e.target.value)}
                                        type="email"
                                        placeholder="email@example.com"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* SMTP Settings */}
                    {emailSettings.provider === 'smtp' && (
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 3 }}>
                                    Cài đặt SMTP
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="SMTP Host"
                                            value={emailSettings.smtp?.host || ''}
                                            onChange={(e) => handleNestedInputChange('smtp', 'host', e.target.value)}
                                            placeholder="smtp.gmail.com"
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Port"
                                            type="number"
                                            value={emailSettings.smtp?.port || 587}
                                            onChange={(e) => handleNestedInputChange('smtp', 'port', parseInt(e.target.value))}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Username"
                                            value={emailSettings.smtp?.username || ''}
                                            onChange={(e) => handleNestedInputChange('smtp', 'username', e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            value={emailSettings.smtp?.password || ''}
                                            onChange={(e) => handleNestedInputChange('smtp', 'password', e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={emailSettings.smtp?.secure || false}
                                                    onChange={(e) => handleNestedInputChange('smtp', 'secure', e.target.checked)}
                                                />
                                            }
                                            label="Sử dụng SSL/TLS"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}
                </Grid>

                {/* Email Templates */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6">
                                    Email Templates
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => setShowTemplateDialog(true)}
                                    size="small"
                                >
                                    Tạo Template
                                </Button>
                            </Box>

                            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tên</TableCell>
                                            <TableCell>Trạng thái</TableCell>
                                            <TableCell>Hành động</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {templates.map((template) => (
                                            <TableRow key={template._id}>
                                                <TableCell>{template.name}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={template.isActive ? 'Active' : 'Inactive'}
                                                        color={template.isActive ? 'success' : 'default'}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => handleMenuOpen(e, template)}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={loadData}
                    disabled={saving}
                >
                    Làm mới
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<TestIcon />}
                    onClick={handleTestEmail}
                    disabled={saving || !emailSettings.testEmail}
                >
                    Gửi Email Test
                </Button>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
                </Button>
            </Box>

            {/* Template Dialog */}
            <Dialog open={showTemplateDialog} onClose={() => setShowTemplateDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingTemplate ? 'Chỉnh sửa Template' : 'Tạo Template mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên template"
                                value={templateData.name}
                                onChange={(e) => setTemplateData(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tiêu đề email"
                                value={templateData.subject}
                                onChange={(e) => setTemplateData(prev => ({ ...prev, subject: e.target.value }))}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nội dung email"
                                multiline
                                rows={6}
                                value={templateData.content}
                                onChange={(e) => setTemplateData(prev => ({ ...prev, content: e.target.value }))}
                                placeholder="Sử dụng các biến: {{siteName}}, {{userName}}, {{userEmail}}, etc."
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                Biến có sẵn:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {commonVariables.map(variable => (
                                    <Chip
                                        key={variable}
                                        label={variable}
                                        size="small"
                                        onClick={() => {
                                            if (!templateData.variables.includes(variable)) {
                                                setTemplateData(prev => ({
                                                    ...prev,
                                                    variables: [...prev.variables, variable]
                                                }));
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setShowTemplateDialog(false);
                        setEditingTemplate(null);
                        setTemplateData({ name: '', subject: '', content: '', variables: [] });
                    }}>
                        Hủy
                    </Button>
                    <Button
                        onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
                        variant="contained"
                        disabled={!templateData.name || !templateData.subject || !templateData.content}
                    >
                        {editingTemplate ? 'Cập nhật' : 'Tạo'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Template Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {
                    if (selectedTemplate) {
                        handleEditTemplate(selectedTemplate);
                    }
                    handleMenuClose();
                }}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Chỉnh sửa</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                    if (selectedTemplate) {
                        handleDeleteTemplate(selectedTemplate._id);
                    }
                    handleMenuClose();
                }}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Xóa</ListItemText>
                </MenuItem>
            </Menu>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EmailSettings;