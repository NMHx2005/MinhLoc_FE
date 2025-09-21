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
    Menu,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Chip,
    Avatar,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    Grid,
    Switch,
    FormControlLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormGroup,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Security as SecurityIcon,
    AdminPanelSettings as AdminIcon,
    Edit as EditorIcon,
    Visibility as ViewerIcon,
    ExpandMore as ExpandMoreIcon,
    Shield as ShieldIcon,
} from '@mui/icons-material';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    status: 'active' | 'inactive';
    lastLogin: string;
    createdAt: string;
    avatar: string;
    permissions: string[];
}

interface Role {
    id: string;
    name: string;
    description: string;
    permissions: string[];
    userCount: number;
    color: string;
}

const UserRoles: React.FC = () => {
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            name: 'Nguyễn Văn Admin',
            email: 'admin@minhloc.vn',
            role: 'admin',
            status: 'active',
            lastLogin: '2024-01-22',
            createdAt: '2023-01-01',
            avatar: '/placeholder-admin.jpg',
            permissions: ['all']
        },
        {
            id: 2,
            name: 'Trần Thị Editor',
            email: 'editor@minhloc.vn',
            role: 'editor',
            status: 'active',
            lastLogin: '2024-01-21',
            createdAt: '2023-03-15',
            avatar: '/placeholder-editor.jpg',
            permissions: ['content.read', 'content.write', 'content.edit', 'users.read']
        },
        {
            id: 3,
            name: 'Lê Minh Viewer',
            email: 'viewer@minhloc.vn',
            role: 'viewer',
            status: 'active',
            lastLogin: '2024-01-20',
            createdAt: '2023-06-10',
            avatar: '/placeholder-viewer.jpg',
            permissions: ['content.read', 'analytics.read']
        },
        {
            id: 4,
            name: 'Phạm Thu Content',
            email: 'content@minhloc.vn',
            role: 'editor',
            status: 'inactive',
            lastLogin: '2024-01-15',
            createdAt: '2023-08-20',
            avatar: '/placeholder-content.jpg',
            permissions: ['content.read', 'content.write', 'content.edit']
        },
        {
            id: 5,
            name: 'Hoàng Đức Support',
            email: 'support@minhloc.vn',
            role: 'viewer',
            status: 'active',
            lastLogin: '2024-01-19',
            createdAt: '2023-11-05',
            avatar: '/placeholder-support.jpg',
            permissions: ['content.read', 'users.read', 'analytics.read']
        }
    ]);

    const [roles] = useState<Role[]>([
        {
            id: 'admin',
            name: 'Administrator',
            description: 'Toàn quyền quản trị hệ thống',
            permissions: ['all'],
            userCount: 1,
            color: '#f44336'
        },
        {
            id: 'editor',
            name: 'Editor',
            description: 'Quản lý nội dung và một số chức năng hệ thống',
            permissions: ['content.read', 'content.write', 'content.edit', 'content.delete', 'users.read', 'analytics.read'],
            userCount: 2,
            color: '#ff9800'
        },
        {
            id: 'viewer',
            name: 'Viewer',
            description: 'Chỉ xem và truy cập thông tin cơ bản',
            permissions: ['content.read', 'analytics.read'],
            userCount: 2,
            color: '#4caf50'
        }
    ]);

    const [selectedTab, setSelectedTab] = useState('users');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [roleDialogOpen, setRoleDialogOpen] = useState(false);

    const availablePermissions = [
        { id: 'content.read', name: 'Xem nội dung', category: 'Nội dung' },
        { id: 'content.write', name: 'Tạo nội dung', category: 'Nội dung' },
        { id: 'content.edit', name: 'Sửa nội dung', category: 'Nội dung' },
        { id: 'content.delete', name: 'Xóa nội dung', category: 'Nội dung' },
        { id: 'users.read', name: 'Xem người dùng', category: 'Người dùng' },
        { id: 'users.write', name: 'Tạo người dùng', category: 'Người dùng' },
        { id: 'users.edit', name: 'Sửa người dùng', category: 'Người dùng' },
        { id: 'users.delete', name: 'Xóa người dùng', category: 'Người dùng' },
        { id: 'analytics.read', name: 'Xem thống kê', category: 'Thống kê' },
        { id: 'settings.read', name: 'Xem cài đặt', category: 'Cài đặt' },
        { id: 'settings.write', name: 'Thay đổi cài đặt', category: 'Cài đặt' },
        { id: 'system.admin', name: 'Quản trị hệ thống', category: 'Hệ thống' },
    ];

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const handleChangeRole = () => {
        setRoleDialogOpen(true);
        handleMenuClose();
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedUser) {
            setUsers(users.filter(user => user.id !== selectedUser.id));
            setDeleteDialogOpen(false);
            setSelectedUser(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedUser(null);
    };

    const handleRoleChange = (newRole: 'admin' | 'editor' | 'viewer') => {
        if (selectedUser) {
            const rolePermissions = roles.find(r => r.id === newRole)?.permissions || [];
            setUsers(users.map(user =>
                user.id === selectedUser.id
                    ? { ...user, role: newRole, permissions: rolePermissions }
                    : user
            ));
            setRoleDialogOpen(false);
            setSelectedUser(null);
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin': return <AdminIcon sx={{ color: '#f44336' }} />;
            case 'editor': return <EditorIcon sx={{ color: '#ff9800' }} />;
            case 'viewer': return <ViewerIcon sx={{ color: '#4caf50' }} />;
            default: return <SecurityIcon />;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'error';
            case 'editor': return 'warning';
            case 'viewer': return 'success';
            default: return 'default';
        }
    };

    const getStatusColor = (status: string) => {
        return status === 'active' ? 'success' : 'default';
    };

    const getStatusLabel = (status: string) => {
        return status === 'active' ? 'Hoạt động' : 'Không hoạt động';
    };

    // Filter users
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Phân quyền Người dùng
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    Thêm Người dùng
                </Button>
            </Box>

            {/* Role Overview Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {roles.map((role) => (
                    <Grid item xs={12} md={4} key={role.id}>
                        <Card
                            sx={{
                                borderLeft: `4px solid ${role.color}`,
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease'
                                }
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    {getRoleIcon(role.id)}
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {role.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {role.userCount} người dùng
                                        </Typography>
                                    </Box>
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {role.description}
                                </Typography>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {role.permissions.slice(0, 3).map(permission => (
                                        <Chip
                                            key={permission}
                                            label={permission === 'all' ? 'Toàn quyền' :
                                                availablePermissions.find(p => p.id === permission)?.name || permission}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontSize: '0.7rem' }}
                                        />
                                    ))}
                                    {role.permissions.length > 3 && role.permissions[0] !== 'all' && (
                                        <Chip
                                            label={`+${role.permissions.length - 3}`}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontSize: '0.7rem' }}
                                        />
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm người dùng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Vai trò</InputLabel>
                                <Select
                                    value={roleFilter}
                                    label="Vai trò"
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="admin">Administrator</MenuItem>
                                    <MenuItem value="editor">Editor</MenuItem>
                                    <MenuItem value="viewer">Viewer</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Trạng thái</InputLabel>
                                <Select
                                    value={statusFilter}
                                    label="Trạng thái"
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="active">Hoạt động</MenuItem>
                                    <MenuItem value="inactive">Không hoạt động</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Danh sách Người dùng ({filteredUsers.length})
                    </Typography>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Người dùng</TableCell>
                                    <TableCell>Vai trò</TableCell>
                                    <TableCell>Quyền hạn</TableCell>
                                    <TableCell align="center">Trạng thái</TableCell>
                                    <TableCell align="center">Đăng nhập cuối</TableCell>
                                    <TableCell align="center">Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    sx={{ width: 40, height: 40 }}
                                                >
                                                    {user.name.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                        {user.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {user.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                icon={getRoleIcon(user.role)}
                                                label={roles.find(r => r.id === user.role)?.name || user.role}
                                                color={getRoleColor(user.role) as any}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {user.permissions.slice(0, 2).map(permission => (
                                                    <Chip
                                                        key={permission}
                                                        label={permission === 'all' ? 'Toàn quyền' :
                                                            availablePermissions.find(p => p.id === permission)?.name || permission}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ fontSize: '0.7rem' }}
                                                    />
                                                ))}
                                                {user.permissions.length > 2 && user.permissions[0] !== 'all' && (
                                                    <Chip
                                                        label={`+${user.permissions.length - 2}`}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ fontSize: '0.7rem' }}
                                                    />
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={getStatusLabel(user.status)}
                                                color={getStatusColor(user.status) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2">
                                                {new Date(user.lastLogin).toLocaleDateString('vi-VN')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={(e) => handleMenuOpen(e, user)}
                                                size="small"
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

            {/* Role Permissions Details */}
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShieldIcon sx={{ color: '#E7C873' }} />
                        Chi tiết Quyền hạn theo Vai trò
                    </Typography>

                    {roles.map((role) => (
                        <Accordion key={role.id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {getRoleIcon(role.id)}
                                    <Typography variant="h6">
                                        {role.name}
                                    </Typography>
                                    <Chip
                                        label={`${role.userCount} người dùng`}
                                        size="small"
                                        color={getRoleColor(role.id) as any}
                                    />
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                {role.permissions[0] === 'all' ? (
                                    <Typography variant="body1" color="error" sx={{ fontWeight: 600 }}>
                                        🔑 Toàn quyền - Có thể truy cập tất cả chức năng của hệ thống
                                    </Typography>
                                ) : (
                                    <Grid container spacing={2}>
                                        {['Nội dung', 'Người dùng', 'Thống kê', 'Cài đặt', 'Hệ thống'].map(category => {
                                            const categoryPermissions = availablePermissions.filter(p =>
                                                p.category === category && role.permissions.includes(p.id)
                                            );

                                            if (categoryPermissions.length === 0) return null;

                                            return (
                                                <Grid item xs={12} md={6} key={category}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                        {category}
                                                    </Typography>
                                                    <FormGroup>
                                                        {categoryPermissions.map(permission => (
                                                            <FormControlLabel
                                                                key={permission.id}
                                                                control={<Checkbox checked disabled />}
                                                                label={permission.name}
                                                                sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.9rem' } }}
                                                            />
                                                        ))}
                                                    </FormGroup>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </CardContent>
            </Card>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: { width: 200 },
                }}
            >
                <MenuItem onClick={handleChangeRole}>
                    <SecurityIcon sx={{ mr: 1 }} />
                    Thay đổi vai trò
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1 }} />
                    Xóa người dùng
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa người dùng "{selectedUser?.name}"?
                        Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Hủy</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Role Change Dialog */}
            <Dialog
                open={roleDialogOpen}
                onClose={() => setRoleDialogOpen(false)}
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>Thay đổi vai trò</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Chọn vai trò mới cho người dùng "{selectedUser?.name}":
                    </DialogContentText>
                    <Grid container spacing={2}>
                        {roles.map((role) => (
                            <Grid item xs={12} key={role.id}>
                                <Button
                                    fullWidth
                                    variant={selectedUser?.role === role.id ? "contained" : "outlined"}
                                    startIcon={getRoleIcon(role.id)}
                                    onClick={() => handleRoleChange(role.id as any)}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        textAlign: 'left',
                                        p: 2
                                    }}
                                >
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {role.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {role.description}
                                        </Typography>
                                    </Box>
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRoleDialogOpen(false)}>Hủy</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserRoles;
