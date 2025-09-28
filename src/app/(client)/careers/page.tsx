"use client";

import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Breadcrumbs,
    Link as MuiLink,
    Button,
    Chip,
    Stack,
    TextField,
    InputAdornment,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Paper,
    CircularProgress,
} from '@mui/material';
import {
    Home,
    Work,
    LocationOn,
    AccessTime,
    AttachMoney,
    Search,
    Business,
    Group,
    School,
    Star,
    CheckCircle,
    Send,
    Email,
    Phone,
    Language,
    EmojiObjects,
    Favorite,
    TrendingUp,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';
import { careersService, type JobPosition, type Department } from '@/services/client/careersService';

// JobPosition interface is now imported from careersService

const CareersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });

    // Load data from API
    useEffect(() => {
        loadJobPositions();
        loadDepartments();
    }, []);

    const loadJobPositions = async () => {
        try {
            setLoading(true);
            setError(null);

            const filters = {
                department: selectedDepartment === 'all' ? undefined : selectedDepartment,
                search: searchTerm || undefined
            };

            const response = await careersService.getJobPositions(pagination.page, pagination.limit, filters);
            console.log(response);
            setJobPositions(response.positions || []);
            setPagination(response.pagination || {
                page: 1,
                limit: 10,
                total: 0,
                pages: 0
            });
        } catch (err) {
            console.error('Error loading job positions:', err);
            setError('Không thể tải danh sách việc làm');
        } finally {
            setLoading(false);
        }
    };

    const loadDepartments = async () => {
        try {
            const deptList = await careersService.getDepartments();
            setDepartments([
                { value: 'all', label: 'Tất cả phòng ban' },
                ...(deptList || [])
            ]);
        } catch (err) {
            console.error('Error loading departments:', err);
        }
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            loadJobPositions();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, selectedDepartment]);

    // Handle search and filter changes
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleDepartmentChange = (value: string) => {
        setSelectedDepartment(value);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'full-time': return '#4CAF50';
            case 'part-time': return '#FF9800';
            case 'contract': return '#2196F3';
            case 'internship': return '#9C27B0';
            default: return '#666';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'full-time': return 'Toàn thời gian';
            case 'part-time': return 'Bán thời gian';
            case 'contract': return 'Hợp đồng';
            case 'internship': return 'Thực tập';
            default: return type;
        }
    };

    return (
        <Layout>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '50vh', md: '60vh' },
                    overflow: 'hidden',
                    pt: { xs: 12, md: 16 },
                }}
            >
                <CardMedia
                    component="img"
                    image="https://datxanhmiennam.com.vn/Data/Sites/1/Banner/bngt.jpg"
                    alt="Tuyển dụng - Minh Lộc Group"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(231, 200, 115, 0.8), rgba(0,0,0,0.6))',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 4,
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography
                            variant="h1"
                            data-aos="fade-up"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                mb: 3,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                            }}
                        >
                            Cơ Hội Nghề Nghiệp
                        </Typography>
                        <Typography
                            variant="h5"
                            data-aos="fade-up"
                            data-aos-delay="200"
                            sx={{
                                color: 'white',
                                mb: 4,
                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                                maxWidth: '800px',
                                mx: 'auto',
                            }}
                        >
                            Gia nhập đội ngũ Minh Lộc Group - Nơi tài năng được tỏa sáng và phát triển
                        </Typography>
                    </Container>
                </Box>
            </Box>

            {/* Breadcrumbs */}
            <Box sx={{ backgroundColor: '#f8f9fa', py: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Container maxWidth="lg">
                    <Breadcrumbs aria-label="breadcrumb">
                        <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                            Trang chủ
                        </MuiLink>
                        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#E7C873' }}>
                            <Work sx={{ mr: 0.5 }} fontSize="inherit" />
                            Tuyển dụng
                        </Typography>
                    </Breadcrumbs>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Tab Navigation */}
                <Paper sx={{ mb: 4, borderRadius: 1 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            '& .MuiTab-root': {
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'none',
                            },
                            '& .Mui-selected': {
                                color: '#E7C873 !important',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#E7C873',
                            },
                        }}
                    >
                        <Tab label="Vị trí tuyển dụng" />
                        <Tab label="Về Minh Lộc Group" />
                        <Tab label="Quy trình tuyển dụng" />
                    </Tabs>
                </Paper>

                {/* Tab Content */}
                {activeTab === 0 && (
                    <Box>
                        {/* Search and Filter */}
                        <Card sx={{
                            mb: 4,
                            borderRadius: 3,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                            background: 'linear-gradient(135deg, rgba(231, 200, 115, 0.05) 0%, rgba(255,255,255,1) 100%)',
                            border: '1px solid rgba(231, 200, 115, 0.1)'
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" sx={{
                                    fontWeight: 600,
                                    mb: 3,
                                    color: '#E7C873',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}>
                                    <Search sx={{ fontSize: 24 }} />
                                    Tìm kiếm và lọc vị trí tuyển dụng
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={8}>
                                        <TextField
                                            fullWidth
                                            placeholder="Nhập từ khóa tìm kiếm (ví dụ: Kỹ sư, Marketing, Kế toán...)"
                                            value={searchTerm}
                                            onChange={(e) => handleSearchChange(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search sx={{ color: '#E7C873' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '&:hover fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E7C873',
                                                        borderWidth: 2,
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Chọn phòng ban"
                                            value={selectedDepartment}
                                            onChange={(e) => handleDepartmentChange(e.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '&:hover fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E7C873',
                                                        borderWidth: 2,
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#E7C873',
                                                },
                                            }}
                                        >
                                            {departments.map((dept) => (
                                                <option key={dept.value} value={dept.value}>
                                                    {dept.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Job Listings */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: '#E7C873' }}>
                                Danh sách vị trí tuyển dụng
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Tìm thấy
                                </Typography>
                                <Chip
                                    label={`${pagination.total} vị trí`}
                                    sx={{
                                        backgroundColor: '#E7C873',
                                        color: 'white',
                                        fontWeight: 600
                                    }}
                                />
                            </Box>
                        </Box>

                        {loading && (
                            <Box sx={{
                                textAlign: 'center',
                                py: 6,
                                backgroundColor: 'rgba(231, 200, 115, 0.05)',
                                borderRadius: 3,
                                border: '1px solid rgba(231, 200, 115, 0.1)'
                            }}>
                                <CircularProgress sx={{ color: '#E7C873', mb: 3, width: 48, height: 48 }} />
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    Đang tải danh sách việc làm...
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Vui lòng chờ trong giây lát
                                </Typography>
                            </Box>
                        )}

                        {error && (
                            <Box sx={{
                                textAlign: 'center',
                                py: 6,
                                backgroundColor: 'rgba(244, 67, 54, 0.05)',
                                borderRadius: 3,
                                border: '1px solid rgba(244, 67, 54, 0.1)'
                            }}>
                                <Typography variant="h6" color="error" sx={{ fontWeight: 600 }}>
                                    {error}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Vui lòng thử lại sau
                                </Typography>
                            </Box>
                        )}

                        {!loading && !error && jobPositions.length === 0 && (
                            <Box sx={{
                                textAlign: 'center',
                                py: 6,
                                backgroundColor: 'rgba(231, 200, 115, 0.05)',
                                borderRadius: 3,
                                border: '1px solid rgba(231, 200, 115, 0.1)'
                            }}>
                                <Work sx={{ fontSize: 64, color: '#E7C873', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                                    Không tìm thấy vị trí tuyển dụng nào
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc phòng ban
                                </Typography>
                            </Box>
                        )}

                        {!loading && !error && jobPositions.length > 0 && (
                            <Grid container spacing={3}>
                                {jobPositions.map((job, index) => (
                                    <Grid item xs={12} md={6} key={job._id}>
                                        <Card
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                            sx={{
                                                height: '100%',
                                                transition: 'all 0.3s ease',
                                                borderRadius: 2,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                                position: 'relative',
                                                border: '1px solid rgba(231, 200, 115, 0.1)',
                                                '&:hover': {
                                                    transform: 'translateY(-6px)',
                                                    boxShadow: '0 12px 30px rgba(231, 200, 115, 0.2)',
                                                    border: '1px solid rgba(231, 200, 115, 0.3)',
                                                },
                                            }}
                                        >
                                            <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                                {/* Job badges */}
                                                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                                    {job.isHot && (
                                                        <Chip
                                                            label="🔥 HOT"
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: '#FF5722',
                                                                color: 'white',
                                                                fontWeight: 600,
                                                                fontSize: '0.75rem',
                                                            }}
                                                        />
                                                    )}
                                                    {job.isUrgent && (
                                                        <Chip
                                                            label="⚡ URGENT"
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: '#F44336',
                                                                color: 'white',
                                                                fontWeight: 600,
                                                                fontSize: '0.75rem',
                                                            }}
                                                        />
                                                    )}
                                                    <Chip
                                                        label={getTypeLabel(job.type)}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: getTypeColor(job.type),
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem',
                                                        }}
                                                    />
                                                </Box>

                                                {/* Job title */}
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        mb: 2,
                                                        color: '#333',
                                                        fontSize: '1.1rem',
                                                    }}
                                                >
                                                    {job.title}
                                                </Typography>

                                                {/* Job details */}
                                                <Stack spacing={1.5} sx={{ mb: 2, flex: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                        <Box sx={{
                                                            backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                                            borderRadius: '50%',
                                                            p: 0.5,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <Business sx={{ fontSize: 16, color: '#E7C873' }} />
                                                        </Box>
                                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                            {departments.find(d => d.value === job.department)?.label}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                        <Box sx={{
                                                            backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                                            borderRadius: '50%',
                                                            p: 0.5,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <LocationOn sx={{ fontSize: 16, color: '#E7C873' }} />
                                                        </Box>
                                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                            {job.location}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                        <Box sx={{
                                                            backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                                            borderRadius: '50%',
                                                            p: 0.5,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <AttachMoney sx={{ fontSize: 16, color: '#E7C873' }} />
                                                        </Box>
                                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                            {job.salary}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                        <Box sx={{
                                                            backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                                            borderRadius: '50%',
                                                            p: 0.5,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <AccessTime sx={{ fontSize: 16, color: '#E7C873' }} />
                                                        </Box>
                                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                            Kinh nghiệm: {job.experience}
                                                        </Typography>
                                                    </Box>
                                                </Stack>

                                                {/* Job description */}
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        mb: 3,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {job.description}
                                                </Typography>

                                                {/* Apply button */}
                                                <Button
                                                    component={Link}
                                                    href="/contact"
                                                    variant="contained"
                                                    startIcon={<Send />}
                                                    fullWidth
                                                    sx={{
                                                        backgroundColor: '#E7C873',
                                                        fontWeight: 600,
                                                        py: 1.5,
                                                        borderRadius: 2,
                                                        textTransform: 'none',
                                                        fontSize: '1rem',
                                                        boxShadow: '0 4px 12px rgba(231, 200, 115, 0.3)',
                                                        '&:hover': {
                                                            backgroundColor: '#d4b85a',
                                                            boxShadow: '0 6px 16px rgba(231, 200, 115, 0.4)',
                                                            transform: 'translateY(-1px)',
                                                        },
                                                    }}
                                                >
                                                    Ứng tuyển ngay
                                                </Button>

                                                {/* Deadline */}
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mt: 2,
                                                    p: 1,
                                                    backgroundColor: 'rgba(244, 67, 54, 0.05)',
                                                    borderRadius: 1,
                                                    border: '1px solid rgba(244, 67, 54, 0.1)'
                                                }}>
                                                    <AccessTime sx={{ fontSize: 16, color: '#F44336', mr: 0.5 }} />
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: '#F44336',
                                                            fontWeight: 600,
                                                            fontSize: '0.8rem'
                                                        }}
                                                    >
                                                        Hạn nộp: {new Date(job.deadline).toLocaleDateString('vi-VN')}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        {/* Pagination */}
                        {!loading && !error && pagination.pages > 1 && (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 6,
                                py: 3,
                                backgroundColor: 'rgba(231, 200, 115, 0.05)',
                                borderRadius: 3,
                                border: '1px solid rgba(231, 200, 115, 0.1)'
                            }}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Button
                                        variant="outlined"
                                        disabled={pagination.page === 1}
                                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                        sx={{
                                            borderColor: '#E7C873',
                                            color: '#E7C873',
                                            borderRadius: 2,
                                            px: 3,
                                            fontWeight: 600,
                                            '&:hover': {
                                                backgroundColor: '#E7C873',
                                                color: 'white',
                                                transform: 'translateY(-1px)',
                                            },
                                            '&:disabled': {
                                                borderColor: 'rgba(231, 200, 115, 0.3)',
                                                color: 'rgba(231, 200, 115, 0.3)',
                                            }
                                        }}
                                    >
                                        Trước
                                    </Button>
                                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                                        <Button
                                            key={page}
                                            variant={pagination.page === page ? "contained" : "outlined"}
                                            onClick={() => setPagination(prev => ({ ...prev, page }))}
                                            sx={{
                                                borderRadius: 2,
                                                px: 2,
                                                minWidth: 40,
                                                fontWeight: 600,
                                                ...(pagination.page === page ? {
                                                    backgroundColor: '#E7C873',
                                                    boxShadow: '0 4px 12px rgba(231, 200, 115, 0.3)',
                                                    '&:hover': {
                                                        backgroundColor: '#d4b85a',
                                                        transform: 'translateY(-1px)',
                                                    },
                                                } : {
                                                    borderColor: '#E7C873',
                                                    color: '#E7C873',
                                                    '&:hover': {
                                                        backgroundColor: '#E7C873',
                                                        color: 'white',
                                                        transform: 'translateY(-1px)',
                                                    },
                                                }),
                                            }}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outlined"
                                        disabled={pagination.page === pagination.pages}
                                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                        sx={{
                                            borderColor: '#E7C873',
                                            color: '#E7C873',
                                            borderRadius: 2,
                                            px: 3,
                                            fontWeight: 600,
                                            '&:hover': {
                                                backgroundColor: '#E7C873',
                                                color: 'white',
                                                transform: 'translateY(-1px)',
                                            },
                                            '&:disabled': {
                                                borderColor: 'rgba(231, 200, 115, 0.3)',
                                                color: 'rgba(231, 200, 115, 0.3)',
                                            }
                                        }}
                                    >
                                        Sau
                                    </Button>
                                </Stack>
                            </Box>
                        )}
                    </Box>
                )}

                {activeTab === 1 && (
                    <Box>
                        <Grid container spacing={4}>
                            {/* Company Overview */}
                            <Grid item xs={12} md={8}>
                                <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                            Về Minh Lộc Group
                                        </Typography>
                                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                                            Minh Lộc Group là một trong những tập đoàn bất động sản hàng đầu tại Việt Nam với hơn 15 năm kinh nghiệm trong lĩnh vực đầu tư, phát triển và kinh doanh bất động sản. Chúng tôi đã và đang phát triển nhiều dự án quy mô lớn tại các thành phố lớn trên cả nước.
                                        </Typography>
                                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                                            Với tầm nhìn trở thành tập đoàn bất động sản hàng đầu khu vực, chúng tôi luôn tìm kiếm những nhân tài xuất sắc để cùng phát triển và gắn bó lâu dài. Tại Minh Lộc Group, bạn sẽ có cơ hội làm việc trong môi trường chuyên nghiệp, năng động và được đào tạo phát triển toàn diện.
                                        </Typography>

                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#E7C873' }}>
                                            Giá trị cốt lõi
                                        </Typography>
                                        <List>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Star sx={{ color: '#E7C873' }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Chất lượng"
                                                    secondary="Cam kết mang đến sản phẩm và dịch vụ chất lượng cao nhất"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <EmojiObjects sx={{ color: '#E7C873' }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Sáng tạo"
                                                    secondary="Không ngừng đổi mới và sáng tạo trong mọi hoạt động"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <Favorite sx={{ color: '#E7C873' }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Tận tâm"
                                                    secondary="Đặt lợi ích khách hàng và cộng đồng lên hàng đầu"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <TrendingUp sx={{ color: '#E7C873' }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Phát triển"
                                                    secondary="Không ngừng học hỏi và phát triển bản thân"
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Company Stats */}
                            <Grid item xs={12} md={4}>
                                <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                            Minh Lộc Group trong số liệu
                                        </Typography>
                                        <Stack spacing={3}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="h3" sx={{ fontWeight: 700, color: '#E7C873' }}>
                                                    15+
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Năm kinh nghiệm
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="h3" sx={{ fontWeight: 700, color: '#E7C873' }}>
                                                    100+
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Dự án hoàn thành
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="h3" sx={{ fontWeight: 700, color: '#E7C873' }}>
                                                    500+
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Nhân viên
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="h3" sx={{ fontWeight: 700, color: '#E7C873' }}>
                                                    1000+
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Khách hàng hài lòng
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>

                                {/* Benefits */}
                                <Card sx={{ borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                            Phúc lợi nhân viên
                                        </Typography>
                                        <List>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Lương thưởng cạnh tranh"
                                                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Bảo hiểm đầy đủ"
                                                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Đào tạo phát triển"
                                                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Du lịch công ty"
                                                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Cơ hội thăng tiến"
                                                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {activeTab === 2 && (
                    <Box>
                        <Card sx={{ borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, color: '#E7C873', textAlign: 'center' }}>
                                    Quy trình tuyển dụng tại Minh Lộc Group
                                </Typography>

                                <Grid container spacing={4}>
                                    {[
                                        {
                                            step: 1,
                                            title: 'Nộp hồ sơ',
                                            description: 'Ứng viên nộp hồ sơ trực tuyến qua website hoặc email',
                                            icon: <Send sx={{ fontSize: 40, color: '#E7C873' }} />
                                        },
                                        {
                                            step: 2,
                                            title: 'Sàng lọc hồ sơ',
                                            description: 'HR sẽ xem xét và sàng lọc hồ sơ phù hợp với yêu cầu',
                                            icon: <School sx={{ fontSize: 40, color: '#E7C873' }} />
                                        },
                                        {
                                            step: 3,
                                            title: 'Phỏng vấn vòng 1',
                                            description: 'Phỏng vấn với HR về kinh nghiệm và động cơ làm việc',
                                            icon: <Group sx={{ fontSize: 40, color: '#E7C873' }} />
                                        },
                                        {
                                            step: 4,
                                            title: 'Phỏng vấn vòng 2',
                                            description: 'Phỏng vấn chuyên môn với trưởng phòng hoặc giám đốc',
                                            icon: <Business sx={{ fontSize: 40, color: '#E7C873' }} />
                                        },
                                        {
                                            step: 5,
                                            title: 'Thông báo kết quả',
                                            description: 'Công ty sẽ thông báo kết quả trong vòng 1-2 tuần',
                                            icon: <Email sx={{ fontSize: 40, color: '#E7C873' }} />
                                        },
                                        {
                                            step: 6,
                                            title: 'Onboarding',
                                            description: 'Định hướng và đào tạo cho nhân viên mới',
                                            icon: <Star sx={{ fontSize: 40, color: '#E7C873' }} />
                                        }
                                    ].map((item, index) => (
                                        <Grid item xs={12} md={6} key={item.step}>
                                            <Card
                                                data-aos="fade-up"
                                                data-aos-delay={index * 100}
                                                sx={{
                                                    textAlign: 'center',
                                                    p: 3,
                                                    borderRadius: 1,
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                                    transition: 'transform 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                    },
                                                }}
                                            >
                                                <Avatar
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        mx: 'auto',
                                                        mb: 2,
                                                        backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                                    }}
                                                >
                                                    {item.icon}
                                                </Avatar>
                                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#E7C873' }}>
                                                    Bước {item.step}: {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.description}
                                                </Typography>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Contact Info */}
                                <Box sx={{ mt: 6, textAlign: 'center' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                        Thông tin liên hệ tuyển dụng
                                    </Typography>
                                    <Grid container spacing={3} justifyContent="center">
                                        <Grid item xs={12} md={4}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                <Email sx={{ color: '#E7C873' }} />
                                                <Typography variant="body1">
                                                    hr@minhloc.vn
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                <Phone sx={{ color: '#E7C873' }} />
                                                <Typography variant="body1">
                                                    +84 28 1234 5678
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                <Language sx={{ color: '#E7C873' }} />
                                                <Typography variant="body1">
                                                    www.minhloc.vn
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Container>
        </Layout>
    );
};

export default CareersPage;
