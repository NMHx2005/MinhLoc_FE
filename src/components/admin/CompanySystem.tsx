'use client'

import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Avatar,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Business as BusinessIcon,
    Group as GroupIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Language as WebsiteIcon,
} from '@mui/icons-material';
import { companyService } from '../../services/admin/companyService';
import type { CompanyInfo } from '../../services/admin/companyService';
import { Alert, Snackbar, CircularProgress } from '@mui/material';

interface Subsidiary {
    id: string;
    name: string;
    description: string;
    type: 'subsidiary' | 'branch' | 'office';
    location: string;
    contact: {
        phone: string;
        email: string;
        website: string;
    };
    establishedYear: number;
    isActive: boolean;
}

interface Department {
    id: string;
    name: string;
    description: string;
    head: string;
    employeeCount: number;
    responsibilities: string[];
}

const CompanySystem: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);

    const [subsidiaryDialogOpen, setSubsidiaryDialogOpen] = useState(false);
    const [editingSubsidiary, setEditingSubsidiary] = useState<Subsidiary | null>(null);
    const [subsidiaryFormData, setSubsidiaryFormData] = useState<Omit<Subsidiary, 'id'>>({
        name: '',
        description: '',
        type: 'subsidiary',
        location: '',
        contact: {
            phone: '',
            email: '',
            website: '',
        },
        establishedYear: new Date().getFullYear(),
        isActive: true,
    });

    const [departmentDialogOpen, setDepartmentDialogOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
    const [departmentFormData, setDepartmentFormData] = useState<Omit<Department, 'id'>>({
        name: '',
        description: '',
        head: '',
        employeeCount: 0,
        responsibilities: [],
    });

    // Load company system data from API
    const loadCompanySystem = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const info = await companyService.getCompanyInfoBySection('system');
            if (info) {
                setCompanyInfo(info);
                // Convert businessAreas to departments
                const businessAreas = info.data?.businessAreas || [];
                const systemDepartments: Department[] = businessAreas.map((area: any, index: number) => ({
                    id: area._id || `dept-${index}`,
                    name: area.name || '',
                    description: area.description || '',
                    head: 'Trưởng phòng', // Default value
                    employeeCount: 0, // Default value
                    responsibilities: area.items || [],
                }));
                setDepartments(systemDepartments);

                // Convert network to subsidiaries
                const network = info.data?.network || [];
                const systemSubsidiaries: Subsidiary[] = network.map((item: any, index: number) => ({
                    id: item._id || `sub-${index}`,
                    name: `Chi nhánh ${item.city}`,
                    description: `Chi nhánh tại ${item.city}`,
                    type: 'branch' as const,
                    location: item.city || '',
                    contact: {
                        phone: '',
                        email: '',
                        website: '',
                    },
                    establishedYear: 2020, // Default value
                    isActive: true,
                }));
                setSubsidiaries(systemSubsidiaries);
            }
        } catch (err) {
            console.error('Error loading company system data:', err);
            setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu hệ thống công ty');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCompanySystem();
    }, [loadCompanySystem]);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'subsidiary':
                return <BusinessIcon />;
            case 'branch':
                return <LocationIcon />;
            case 'office':
                return <GroupIcon />;
            default:
                return <BusinessIcon />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'subsidiary':
                return 'primary';
            case 'branch':
                return 'success';
            case 'office':
                return 'info';
            default:
                return 'primary';
        }
    };

    const handleAddSubsidiary = () => {
        setEditingSubsidiary(null);
        setSubsidiaryFormData({
            name: '',
            description: '',
            type: 'subsidiary',
            location: '',
            contact: {
                phone: '',
                email: '',
                website: '',
            },
            establishedYear: new Date().getFullYear(),
            isActive: true,
        });
        setSubsidiaryDialogOpen(true);
    };

    const handleEditSubsidiary = (subsidiary: Subsidiary) => {
        setEditingSubsidiary(subsidiary);
        setSubsidiaryFormData({
            name: subsidiary.name,
            description: subsidiary.description,
            type: subsidiary.type,
            location: subsidiary.location,
            contact: subsidiary.contact,
            establishedYear: subsidiary.establishedYear,
            isActive: subsidiary.isActive,
        });
        setSubsidiaryDialogOpen(true);
    };

    const handleSaveSubsidiary = async () => {
        setSaving(true);
        try {
            let updatedSubsidiaries: Subsidiary[];

            if (editingSubsidiary) {
                updatedSubsidiaries = subsidiaries.map(sub =>
                    sub.id === editingSubsidiary.id
                        ? { ...subsidiaryFormData, id: editingSubsidiary.id }
                        : sub
                );
            } else {
                const newSubsidiary: Subsidiary = {
                    ...subsidiaryFormData,
                    id: Date.now().toString(),
                };
                updatedSubsidiaries = [...subsidiaries, newSubsidiary];
            }

            setSubsidiaries(updatedSubsidiaries);

            // Convert subsidiaries back to network format and save to API
            const network = updatedSubsidiaries.map(sub => ({
                city: sub.location,
                projects: 0, // Default value
                staff: 0, // Default value
            }));

            const dataToSave = {
                section: 'system',
                title: companyInfo?.title || 'Hệ thống MinhLoc Group',
                content: companyInfo?.content || '',
                data: {
                    businessAreas: departments.map(dept => ({
                        name: dept.name,
                        description: dept.description,
                        items: dept.responsibilities,
                        color: '#2196f3',
                    })),
                    network: network,
                },
                sortOrder: 4
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Lưu thông tin chi nhánh thành công!');
            setSnackbarOpen(true);
            setSubsidiaryDialogOpen(false);
            await loadCompanySystem();
        } catch (error) {
            console.error('Error saving subsidiary:', error);
            setSnackbarMessage('❌ Lỗi khi lưu thông tin chi nhánh');
            setSnackbarOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteSubsidiary = async (subsidiaryId: string) => {
        try {
            const updatedSubsidiaries = subsidiaries.filter(sub => sub.id !== subsidiaryId);
            setSubsidiaries(updatedSubsidiaries);

            // Convert subsidiaries back to network format and save to API
            const network = updatedSubsidiaries.map(sub => ({
                city: sub.location,
                projects: 0, // Default value
                staff: 0, // Default value
            }));

            const dataToSave = {
                section: 'system',
                title: companyInfo?.title || 'Hệ thống MinhLoc Group',
                content: companyInfo?.content || '',
                data: {
                    businessAreas: departments.map(dept => ({
                        name: dept.name,
                        description: dept.description,
                        items: dept.responsibilities,
                        color: '#2196f3',
                    })),
                    network: network,
                },
                sortOrder: 4
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Xóa chi nhánh thành công!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting subsidiary:', error);
            setSnackbarMessage('❌ Lỗi khi xóa chi nhánh');
            setSnackbarOpen(true);
            await loadCompanySystem();
        }
    };

    const handleAddDepartment = () => {
        setEditingDepartment(null);
        setDepartmentFormData({
            name: '',
            description: '',
            head: '',
            employeeCount: 0,
            responsibilities: [],
        });
        setDepartmentDialogOpen(true);
    };

    const handleEditDepartment = (department: Department) => {
        setEditingDepartment(department);
        setDepartmentFormData({
            name: department.name,
            description: department.description,
            head: department.head,
            employeeCount: department.employeeCount,
            responsibilities: department.responsibilities,
        });
        setDepartmentDialogOpen(true);
    };

    const handleSaveDepartment = async () => {
        setSaving(true);
        try {
            let updatedDepartments: Department[];

            if (editingDepartment) {
                updatedDepartments = departments.map(dept =>
                    dept.id === editingDepartment.id
                        ? { ...departmentFormData, id: editingDepartment.id }
                        : dept
                );
            } else {
                const newDepartment: Department = {
                    ...departmentFormData,
                    id: Date.now().toString(),
                };
                updatedDepartments = [...departments, newDepartment];
            }

            setDepartments(updatedDepartments);

            // Convert departments back to businessAreas format and save to API
            const businessAreas = updatedDepartments.map(dept => ({
                name: dept.name,
                description: dept.description,
                items: dept.responsibilities,
                color: '#2196f3',
            }));

            const dataToSave = {
                section: 'system',
                title: companyInfo?.title || 'Hệ thống MinhLoc Group',
                content: companyInfo?.content || '',
                data: {
                    businessAreas: businessAreas,
                    network: subsidiaries.map(sub => ({
                        city: sub.location,
                        projects: 0,
                        staff: 0,
                    })),
                },
                sortOrder: 4
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Lưu thông tin phòng ban thành công!');
            setSnackbarOpen(true);
            setDepartmentDialogOpen(false);
            await loadCompanySystem();
        } catch (error) {
            console.error('Error saving department:', error);
            setSnackbarMessage('❌ Lỗi khi lưu thông tin phòng ban');
            setSnackbarOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteDepartment = async (departmentId: string) => {
        try {
            const updatedDepartments = departments.filter(dept => dept.id !== departmentId);
            setDepartments(updatedDepartments);

            // Convert departments back to businessAreas format and save to API
            const businessAreas = updatedDepartments.map(dept => ({
                name: dept.name,
                description: dept.description,
                items: dept.responsibilities,
                color: '#2196f3',
            }));

            const dataToSave = {
                section: 'system',
                title: companyInfo?.title || 'Hệ thống MinhLoc Group',
                content: companyInfo?.content || '',
                data: {
                    businessAreas: businessAreas,
                    network: subsidiaries.map(sub => ({
                        city: sub.location,
                        projects: 0,
                        staff: 0,
                    })),
                },
                sortOrder: 4
            };

            await companyService.createOrUpdateCompanyInfo(dataToSave);

            setSnackbarMessage('✅ Xóa phòng ban thành công!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting department:', error);
            setSnackbarMessage('❌ Lỗi khi xóa phòng ban');
            setSnackbarOpen(true);
            await loadCompanySystem();
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Đang tải thông tin hệ thống công ty...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Hệ thống MinhLoc Group
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Công ty con & Chi nhánh */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <BusinessIcon sx={{ mr: 1 }} />
                                    Công ty con & Chi nhánh
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddSubsidiary}
                                    size="small"
                                >
                                    Thêm
                                </Button>
                            </Box>

                            <List>
                                {subsidiaries.map((subsidiary, index) => (
                                    <React.Fragment key={subsidiary.id}>
                                        <ListItem
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                py: 2,
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 40, mt: 1 }}>
                                                <Avatar sx={{ bgcolor: `${getTypeColor(subsidiary.type)}.main` }}>
                                                    {getTypeIcon(subsidiary.type)}
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6" component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <span>{subsidiary.name}</span>
                                                        <Chip
                                                            label={subsidiary.type}
                                                            size="small"
                                                            color={getTypeColor(subsidiary.type) as any}
                                                        />
                                                        {subsidiary.isActive && (
                                                            <Chip
                                                                label="Hoạt động"
                                                                size="small"
                                                                color="success"
                                                            />
                                                        )}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="body2" color="text.secondary" component="span">
                                                        <div style={{ marginBottom: 8 }}>
                                                            {subsidiary.description}
                                                        </div>
                                                        <span style={{ fontSize: '0.75rem' }}>
                                                            {subsidiary.location} • Thành lập {subsidiary.establishedYear}
                                                        </span>
                                                    </Typography>
                                                }
                                            />
                                            <Box>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEditSubsidiary(subsidiary)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteSubsidiary(subsidiary.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </ListItem>
                                        {index < subsidiaries.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Phòng ban */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <GroupIcon sx={{ mr: 1 }} />
                                    Phòng ban
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddDepartment}
                                    size="small"
                                >
                                    Thêm
                                </Button>
                            </Box>

                            <List>
                                {departments.map((department, index) => (
                                    <React.Fragment key={department.id}>
                                        <ListItem
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                py: 2,
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 40, mt: 1 }}>
                                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                    <GroupIcon />
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6" component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <span>{department.name}</span>
                                                        <Chip
                                                            label={`${department.employeeCount} người`}
                                                            size="small"
                                                            color="info"
                                                        />
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="body2" color="text.secondary" component="span">
                                                        <div style={{ marginBottom: 8 }}>
                                                            {department.description}
                                                        </div>
                                                        <span style={{ fontSize: '0.75rem' }}>
                                                            Trưởng phòng: {department.head}
                                                        </span>
                                                    </Typography>
                                                }
                                            />
                                            <Box>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEditDepartment(department)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteDepartment(department.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </ListItem>
                                        {index < departments.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Add/Edit Subsidiary Dialog */}
            <Dialog open={subsidiaryDialogOpen} onClose={() => setSubsidiaryDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingSubsidiary ? 'Chỉnh sửa công ty con/chi nhánh' : 'Thêm công ty con/chi nhánh mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Tên"
                                value={subsidiaryFormData.name}
                                onChange={(e) => setSubsidiaryFormData(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Loại"
                                value={subsidiaryFormData.type}
                                onChange={(e) => setSubsidiaryFormData(prev => ({ ...prev, type: e.target.value as any }))}
                                SelectProps={{ native: true }}
                            >
                                <option value="subsidiary">Công ty con</option>
                                <option value="branch">Chi nhánh</option>
                                <option value="office">Văn phòng</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả"
                                multiline
                                rows={2}
                                value={subsidiaryFormData.description}
                                onChange={(e) => setSubsidiaryFormData(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Địa điểm"
                                value={subsidiaryFormData.location}
                                onChange={(e) => setSubsidiaryFormData(prev => ({ ...prev, location: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Năm thành lập"
                                type="number"
                                value={subsidiaryFormData.establishedYear}
                                onChange={(e) => setSubsidiaryFormData(prev => ({ ...prev, establishedYear: parseInt(e.target.value) }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Điện thoại"
                                value={subsidiaryFormData.contact.phone}
                                onChange={(e) => setSubsidiaryFormData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, phone: e.target.value }
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={subsidiaryFormData.contact.email}
                                onChange={(e) => setSubsidiaryFormData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, email: e.target.value }
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Website"
                                value={subsidiaryFormData.contact.website}
                                onChange={(e) => setSubsidiaryFormData(prev => ({
                                    ...prev,
                                    contact: { ...prev.contact, website: e.target.value }
                                }))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSubsidiaryDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveSubsidiary} variant="contained">
                        {editingSubsidiary ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add/Edit Department Dialog */}
            <Dialog open={departmentDialogOpen} onClose={() => setDepartmentDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingDepartment ? 'Chỉnh sửa phòng ban' : 'Thêm phòng ban mới'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên phòng ban"
                                value={departmentFormData.name}
                                onChange={(e) => setDepartmentFormData(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả"
                                multiline
                                rows={2}
                                value={departmentFormData.description}
                                onChange={(e) => setDepartmentFormData(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Trưởng phòng"
                                value={departmentFormData.head}
                                onChange={(e) => setDepartmentFormData(prev => ({ ...prev, head: e.target.value }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Số nhân viên"
                                type="number"
                                value={departmentFormData.employeeCount}
                                onChange={(e) => setDepartmentFormData(prev => ({ ...prev, employeeCount: parseInt(e.target.value) }))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDepartmentDialogOpen(false)} disabled={saving}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSaveDepartment}
                        variant="contained"
                        disabled={saving}
                        startIcon={saving ? <CircularProgress size={20} /> : undefined}
                    >
                        {saving ? 'Đang lưu...' : (editingDepartment ? 'Cập nhật' : 'Thêm')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarMessage.includes('✅') ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CompanySystem;
