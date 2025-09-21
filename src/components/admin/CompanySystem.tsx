'use client'

import React, { useState } from 'react';
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
    const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([
        {
            id: '1',
            name: 'MinhLoc Construction',
            description: 'Công ty con chuyên về xây dựng và phát triển dự án',
            type: 'subsidiary',
            location: 'TP. Hồ Chí Minh',
            contact: {
                phone: '(+84) 28 1234 5678',
                email: 'construction@minhlocgroup.com',
                website: 'https://construction.minhlocgroup.com',
            },
            establishedYear: 2010,
            isActive: true,
        },
        {
            id: '2',
            name: 'MinhLoc Real Estate',
            description: 'Công ty con chuyên về bất động sản và đầu tư',
            type: 'subsidiary',
            location: 'TP. Hồ Chí Minh',
            contact: {
                phone: '(+84) 28 1234 5679',
                email: 'realestate@minhlocgroup.com',
                website: 'https://realestate.minhlocgroup.com',
            },
            establishedYear: 2012,
            isActive: true,
        },
        {
            id: '3',
            name: 'Chi nhánh Hà Nội',
            description: 'Chi nhánh tại miền Bắc',
            type: 'branch',
            location: 'Hà Nội',
            contact: {
                phone: '(+84) 24 1234 5678',
                email: 'hanoi@minhlocgroup.com',
                website: 'https://hanoi.minhlocgroup.com',
            },
            establishedYear: 2015,
            isActive: true,
        },
    ]);

    const [departments, setDepartments] = useState<Department[]>([
        {
            id: '1',
            name: 'Phòng Kế hoạch & Phát triển',
            description: 'Lập kế hoạch chiến lược và phát triển dự án',
            head: 'Nguyễn Văn A',
            employeeCount: 25,
            responsibilities: [
                'Lập kế hoạch chiến lược dài hạn',
                'Nghiên cứu thị trường',
                'Phát triển dự án mới',
                'Quản lý danh mục đầu tư',
            ],
        },
        {
            id: '2',
            name: 'Phòng Kỹ thuật',
            description: 'Thiết kế và giám sát kỹ thuật',
            head: 'Trần Thị B',
            employeeCount: 40,
            responsibilities: [
                'Thiết kế dự án',
                'Giám sát kỹ thuật',
                'Quản lý chất lượng',
                'Nghiên cứu công nghệ mới',
            ],
        },
        {
            id: '3',
            name: 'Phòng Kinh doanh',
            description: 'Marketing và bán hàng',
            head: 'Lê Văn C',
            employeeCount: 30,
            responsibilities: [
                'Marketing dự án',
                'Bán hàng và chăm sóc khách hàng',
                'Quản lý kênh phân phối',
                'Phát triển thị trường',
            ],
        },
    ]);

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

    const handleSaveSubsidiary = () => {
        if (editingSubsidiary) {
            setSubsidiaries(prev => prev.map(sub =>
                sub.id === editingSubsidiary.id
                    ? { ...subsidiaryFormData, id: editingSubsidiary.id }
                    : sub
            ));
        } else {
            const newSubsidiary: Subsidiary = {
                ...subsidiaryFormData,
                id: Date.now().toString(),
            };
            setSubsidiaries(prev => [...prev, newSubsidiary]);
        }
        setSubsidiaryDialogOpen(false);
    };

    const handleDeleteSubsidiary = (subsidiaryId: string) => {
        setSubsidiaries(prev => prev.filter(sub => sub.id !== subsidiaryId));
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

    const handleSaveDepartment = () => {
        if (editingDepartment) {
            setDepartments(prev => prev.map(dept =>
                dept.id === editingDepartment.id
                    ? { ...departmentFormData, id: editingDepartment.id }
                    : dept
            ));
        } else {
            const newDepartment: Department = {
                ...departmentFormData,
                id: Date.now().toString(),
            };
            setDepartments(prev => [...prev, newDepartment]);
        }
        setDepartmentDialogOpen(false);
    };

    const handleDeleteDepartment = (departmentId: string) => {
        setDepartments(prev => prev.filter(dept => dept.id !== departmentId));
    };

    return (
        <Box>
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
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography variant="h6">
                                                            {subsidiary.name}
                                                        </Typography>
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
                                                    </Box>
                                                }
                                                secondary={
                                                    <Box>
                                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                                            {subsidiary.description}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {subsidiary.location} • Thành lập {subsidiary.establishedYear}
                                                        </Typography>
                                                    </Box>
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
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography variant="h6">
                                                            {department.name}
                                                        </Typography>
                                                        <Chip
                                                            label={`${department.employeeCount} người`}
                                                            size="small"
                                                            color="info"
                                                        />
                                                    </Box>
                                                }
                                                secondary={
                                                    <Box>
                                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                                            {department.description}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Trưởng phòng: {department.head}
                                                        </Typography>
                                                    </Box>
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
                    <Button onClick={() => setDepartmentDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={handleSaveDepartment} variant="contained">
                        {editingDepartment ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CompanySystem;
