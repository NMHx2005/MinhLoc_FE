"use client";

import React, { useState } from 'react';
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

interface JobPosition {
    id: number;
    title: string;
    department: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'internship';
    salary: string;
    experience: string;
    deadline: string;
    description: string;
    requirements: string[];
    benefits: string[];
    isHot: boolean;
    isUrgent: boolean;
}

const CareersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');

    const departments = [
        { value: 'all', label: 'Tất cả phòng ban' },
        { value: 'sales', label: 'Kinh doanh' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'construction', label: 'Xây dựng' },
        { value: 'finance', label: 'Tài chính' },
        { value: 'hr', label: 'Nhân sự' },
        { value: 'it', label: 'Công nghệ thông tin' },
    ];

    const jobPositions: JobPosition[] = [
        {
            id: 1,
            title: 'Chuyên viên Kinh doanh Bất động sản',
            department: 'sales',
            location: 'TP. Hồ Chí Minh',
            type: 'full-time',
            salary: '15-30 triệu VNĐ',
            experience: '1-3 năm',
            deadline: '2025-05-15',
            description: 'Tìm kiếm và tư vấn khách hàng về các sản phẩm bất động sản của công ty. Xây dựng mối quan hệ khách hàng và đạt chỉ tiêu kinh doanh.',
            requirements: [
                'Tốt nghiệp Đại học các chuyên ngành liên quan',
                'Có kinh nghiệm 1-3 năm trong lĩnh vực bất động sản',
                'Kỹ năng giao tiếp và thuyết phục tốt',
                'Có khả năng làm việc độc lập và theo nhóm',
                'Thành thạo tin học văn phòng'
            ],
            benefits: [
                'Lương cơ bản + hoa hồng hấp dẫn',
                'Thưởng tháng 13, thưởng hiệu quả',
                'Bảo hiểm xã hội, y tế đầy đủ',
                'Du lịch công ty hàng năm',
                'Đào tạo nâng cao chuyên môn'
            ],
            isHot: true,
            isUrgent: false
        },
        {
            id: 2,
            title: 'Kỹ sư Xây dựng',
            department: 'construction',
            location: 'TP. Hồ Chí Minh, Bình Dương',
            type: 'full-time',
            salary: '20-35 triệu VNĐ',
            experience: '2-5 năm',
            deadline: '2025-04-30',
            description: 'Tham gia thiết kế, giám sát thi công các dự án bất động sản. Đảm bảo chất lượng và tiến độ công trình.',
            requirements: [
                'Tốt nghiệp Đại học chuyên ngành Xây dựng',
                'Có kinh nghiệm 2-5 năm trong lĩnh vực xây dựng',
                'Thành thạo AutoCAD, Revit, MS Project',
                'Có chứng chỉ hành nghề xây dựng',
                'Khả năng đọc hiểu bản vẽ kỹ thuật'
            ],
            benefits: [
                'Lương thỏa thuận theo năng lực',
                'Phụ cấp xăng xe, điện thoại',
                'Bảo hiểm tai nạn 24/7',
                'Cơ hội thăng tiến rõ ràng',
                'Môi trường làm việc chuyên nghiệp'
            ],
            isHot: false,
            isUrgent: true
        },
        {
            id: 3,
            title: 'Chuyên viên Marketing Digital',
            department: 'marketing',
            location: 'TP. Hồ Chí Minh',
            type: 'full-time',
            salary: '12-20 triệu VNĐ',
            experience: '1-2 năm',
            deadline: '2025-05-20',
            description: 'Phát triển và thực hiện các chiến lược marketing online. Quản lý các kênh truyền thông xã hội và website.',
            requirements: [
                'Tốt nghiệp Đại học Marketing, Truyền thông',
                'Có kinh nghiệm với Google Ads, Facebook Ads',
                'Kỹ năng viết content và thiết kế cơ bản',
                'Hiểu biết về SEO, SEM',
                'Sáng tạo và cập nhật xu hướng'
            ],
            benefits: [
                'Lương cạnh tranh + KPI',
                'Được đào tạo các khóa học marketing',
                'Môi trường năng động, sáng tạo',
                'Cơ hội học hỏi từ chuyên gia',
                'Team building định kỳ'
            ],
            isHot: true,
            isUrgent: false
        },
        {
            id: 4,
            title: 'Kế toán Tổng hợp',
            department: 'finance',
            location: 'TP. Hồ Chí Minh',
            type: 'full-time',
            salary: '10-15 triệu VNĐ',
            experience: 'Từ 1 năm',
            deadline: '2025-05-10',
            description: 'Thực hiện công tác kế toán tổng hợp, lập báo cáo tài chính, quản lý thu chi và ngân sách công ty.',
            requirements: [
                'Tốt nghiệp Đại học Kế toán, Tài chính',
                'Có chứng chỉ kế toán trưởng (ưu tiên)',
                'Thành thạo Excel, phần mềm kế toán',
                'Hiểu biết về luật thuế và kế toán',
                'Tỉ mỉ, cẩn thận, trung thực'
            ],
            benefits: [
                'Lương ổn định theo bậc lương',
                'Làm việc giờ hành chính',
                'Bảo hiểm đầy đủ theo quy định',
                'Môi trường làm việc ổn định',
                'Cơ hội học tập nâng cao'
            ],
            isHot: false,
            isUrgent: false
        },
        {
            id: 5,
            title: 'Thực tập sinh Marketing',
            department: 'marketing',
            location: 'TP. Hồ Chí Minh',
            type: 'internship',
            salary: '3-5 triệu VNĐ',
            experience: 'Không yêu cầu',
            deadline: '2025-06-01',
            description: 'Hỗ trợ team marketing trong các hoạt động truyền thông, sự kiện và nghiên cứu thị trường.',
            requirements: [
                'Sinh viên năm 3, 4 hoặc mới tốt nghiệp',
                'Chuyên ngành Marketing, Kinh tế, Truyền thông',
                'Có kiến thức cơ bản về marketing',
                'Kỹ năng tin học văn phòng',
                'Nhiệt tình, học hỏi'
            ],
            benefits: [
                'Trợ cấp thực tập hấp dẫn',
                'Được đào tạo bài bản',
                'Cơ hội trở thành nhân viên chính thức',
                'Môi trường học tập tốt',
                'Chế độ nghỉ phép linh hoạt'
            ],
            isHot: false,
            isUrgent: false
        },
        {
            id: 6,
            title: 'Trưởng phòng Nhân sự',
            department: 'hr',
            location: 'TP. Hồ Chí Minh',
            type: 'full-time',
            salary: '25-40 triệu VNĐ',
            experience: '5+ năm',
            deadline: '2025-04-25',
            description: 'Quản lý toàn bộ hoạt động nhân sự, xây dựng chính sách nhân sự, tuyển dụng và phát triển nhân tài.',
            requirements: [
                'Tốt nghiệp Đại học chuyên ngành Nhân sự, Tâm lý',
                'Có kinh nghiệm 5+ năm ở vị trí quản lý HR',
                'Kỹ năng lãnh đạo và quản lý nhóm',
                'Hiểu biết về luật lao động',
                'Khả năng lập kế hoạch chiến lược'
            ],
            benefits: [
                'Lương cao + thưởng quản lý',
                'Quyền ký quyết định nhân sự',
                'Cơ hội phát triển sự nghiệp cao',
                'Đào tạo lãnh đạo cao cấp',
                'Phụ cấp xe xăng, điện thoại'
            ],
            isHot: true,
            isUrgent: true
        }
    ];

    const filteredJobs = jobPositions.filter(job => {
        const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDepartment && matchesSearch;
    });

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
                        <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            placeholder="Tìm kiếm vị trí công việc..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search sx={{ color: '#E7C873' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '&:hover fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Phòng ban"
                                            value={selectedDepartment}
                                            onChange={(e) => setSelectedDepartment(e.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '&:hover fieldset': {
                                                        borderColor: '#E7C873',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E7C873',
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
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                            Danh sách vị trí tuyển dụng ({filteredJobs.length})
                        </Typography>

                        <Grid container spacing={3}>
                            {filteredJobs.map((job, index) => (
                                <Grid item xs={12} md={6} key={job.id}>
                                    <Card
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                        sx={{
                                            height: '100%',
                                            transition: 'all 0.3s ease',
                                            borderRadius: 1,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                            position: 'relative',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            {/* Job badges */}
                                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                                {job.isHot && (
                                                    <Chip
                                                        label="HOT"
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: '#FF5722',
                                                            color: 'white',
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                )}
                                                {job.isUrgent && (
                                                    <Chip
                                                        label="URGENT"
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: '#F44336',
                                                            color: 'white',
                                                            fontWeight: 600,
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
                                            <Stack spacing={1} sx={{ mb: 2, flex: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Business sx={{ fontSize: 18, color: '#666' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {departments.find(d => d.value === job.department)?.label}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <LocationOn sx={{ fontSize: 18, color: '#666' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {job.location}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <AttachMoney sx={{ fontSize: 18, color: '#666' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {job.salary}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <AccessTime sx={{ fontSize: 18, color: '#666' }} />
                                                    <Typography variant="body2" color="text.secondary">
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
                                                variant="contained"
                                                startIcon={<Send />}
                                                fullWidth
                                                sx={{
                                                    backgroundColor: '#E7C873',
                                                    fontWeight: 600,
                                                    '&:hover': {
                                                        backgroundColor: '#d4b85a',
                                                    },
                                                }}
                                            >
                                                Ứng tuyển ngay
                                            </Button>

                                            {/* Deadline */}
                                            <Typography
                                                variant="caption"
                                                color="error"
                                                sx={{ textAlign: 'center', mt: 1 }}
                                            >
                                                Hạn nộp: {new Date(job.deadline).toLocaleDateString('vi-VN')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
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
