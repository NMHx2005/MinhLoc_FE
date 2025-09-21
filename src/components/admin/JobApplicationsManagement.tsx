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
    Avatar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Rating,
} from '@mui/material';
import {
    Visibility as ViewIcon,
    Download as DownloadIcon,
    Email as EmailIcon,
} from '@mui/icons-material';

interface JobApplication {
    id: string;
    jobId: string;
    jobTitle: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    resumeUrl: string;
    coverLetter: string;
    status: 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected';
    notes: string;
    interviewDate?: string;
    rating: number;
    appliedAt: string;
    updatedAt: string;
    experience: string;
    education: string;
    skills: string[];
}

const JobApplicationsManagement: React.FC = () => {
    const [applications, setApplications] = useState<JobApplication[]>([
        {
            id: '1',
            jobId: '1',
            jobTitle: 'Senior Frontend Developer',
            applicantName: 'Nguyễn Văn A',
            applicantEmail: 'nguyenvana@email.com',
            applicantPhone: '0123456789',
            resumeUrl: '/resumes/nguyen-van-a.pdf',
            coverLetter: 'Tôi rất quan tâm đến vị trí Senior Frontend Developer tại công ty. Với 4 năm kinh nghiệm trong lĩnh vực frontend development...',
            status: 'reviewing',
            notes: 'Ứng viên có kinh nghiệm tốt với React và TypeScript',
            interviewDate: '2024-02-15',
            rating: 4,
            appliedAt: '2024-01-20',
            updatedAt: '2024-01-25',
            experience: '4 năm kinh nghiệm frontend development',
            education: 'Cử nhân Công nghệ thông tin - Đại học Bách Khoa',
            skills: ['React', 'TypeScript', 'Next.js', 'Material-UI', 'Redux'],
        },
        {
            id: '2',
            jobId: '1',
            jobTitle: 'Senior Frontend Developer',
            applicantName: 'Trần Thị B',
            applicantEmail: 'tranthib@email.com',
            applicantPhone: '0987654321',
            resumeUrl: '/resumes/tran-thi-b.pdf',
            coverLetter: 'Tôi đã có 5 năm kinh nghiệm trong việc phát triển các ứng dụng web phức tạp...',
            status: 'interviewed',
            notes: 'Ứng viên xuất sắc, phù hợp với yêu cầu công việc',
            interviewDate: '2024-02-10',
            rating: 5,
            appliedAt: '2024-01-18',
            updatedAt: '2024-02-12',
            experience: '5 năm kinh nghiệm full-stack development',
            education: 'Thạc sĩ Công nghệ thông tin - Đại học Khoa học Tự nhiên',
            skills: ['React', 'Vue.js', 'Node.js', 'MongoDB', 'AWS'],
        },
        {
            id: '3',
            jobId: '2',
            jobTitle: 'Marketing Manager',
            applicantName: 'Lê Văn C',
            applicantEmail: 'levanc@email.com',
            applicantPhone: '0369852147',
            resumeUrl: '/resumes/le-van-c.pdf',
            coverLetter: 'Với 3 năm kinh nghiệm trong lĩnh vực marketing digital, tôi tin rằng mình có thể đóng góp tích cực...',
            status: 'pending',
            notes: '',
            rating: 0,
            appliedAt: '2024-01-25',
            updatedAt: '2024-01-25',
            experience: '3 năm kinh nghiệm marketing digital',
            education: 'Cử nhân Marketing - Đại học Kinh tế',
            skills: ['Digital Marketing', 'SEO', 'Google Ads', 'Facebook Ads', 'Analytics'],
        },
    ]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [jobFilter, setJobFilter] = useState('all');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'reviewing':
                return 'info';
            case 'interviewed':
                return 'primary';
            case 'accepted':
                return 'success';
            case 'rejected':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Chờ xem xét';
            case 'reviewing':
                return 'Đang xem xét';
            case 'interviewed':
                return 'Đã phỏng vấn';
            case 'accepted':
                return 'Đã chấp nhận';
            case 'rejected':
                return 'Đã từ chối';
            default:
                return 'Không xác định';
        }
    };

    const handleViewApplication = (application: JobApplication) => {
        setSelectedApplication(application);
        setDialogOpen(true);
    };

    const handleUpdateStatus = (applicationId: string, newStatus: string) => {
        setApplications(prev => prev.map(app =>
            app.id === applicationId
                ? {
                    ...app,
                    status: newStatus as any,
                    updatedAt: new Date().toISOString().split('T')[0]
                }
                : app
        ));
    };

    const handleUpdateRating = (applicationId: string, newRating: number) => {
        setApplications(prev => prev.map(app =>
            app.id === applicationId
                ? {
                    ...app,
                    rating: newRating,
                    updatedAt: new Date().toISOString().split('T')[0]
                }
                : app
        ));
    };

    const handleUpdateNotes = (applicationId: string, newNotes: string) => {
        setApplications(prev => prev.map(app =>
            app.id === applicationId
                ? {
                    ...app,
                    notes: newNotes,
                    updatedAt: new Date().toISOString().split('T')[0]
                }
                : app
        ));
    };

    const filteredApplications = applications.filter(app => {
        const statusMatch = statusFilter === 'all' || app.status === statusFilter;
        const jobMatch = jobFilter === 'all' || app.jobId === jobFilter;
        return statusMatch && jobMatch;
    });

    const getJobOptions = () => {
        const uniqueJobs = Array.from(new Set(applications.map(app => app.jobId)));
        return uniqueJobs.map(jobId => {
            const app = applications.find(a => a.jobId === jobId);
            return { value: jobId, label: app?.jobTitle || 'Unknown Job' };
        });
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Quản lý hồ sơ ứng viên
                </Typography>
            </Box>

            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Trạng thái</InputLabel>
                                <Select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="pending">Chờ xem xét</MenuItem>
                                    <MenuItem value="reviewing">Đang xem xét</MenuItem>
                                    <MenuItem value="interviewed">Đã phỏng vấn</MenuItem>
                                    <MenuItem value="accepted">Đã chấp nhận</MenuItem>
                                    <MenuItem value="rejected">Đã từ chối</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Vị trí tuyển dụng</InputLabel>
                                <Select
                                    value={jobFilter}
                                    onChange={(e) => setJobFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    {getJobOptions().map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="body2" color="text.secondary">
                                Tổng: {filteredApplications.length} hồ sơ
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Applications Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ứng viên</TableCell>
                            <TableCell>Vị trí</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Đánh giá</TableCell>
                            <TableCell>Ngày ứng tuyển</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredApplications.map((application) => (
                            <TableRow key={application.id}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                                            {application.applicantName.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                {application.applicantName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {application.applicantEmail}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {application.jobTitle}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusLabel(application.status)}
                                        color={getStatusColor(application.status) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Rating
                                        value={application.rating}
                                        onChange={(_, newValue) => handleUpdateRating(application.id, newValue || 0)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(application.appliedAt).toLocaleDateString('vi-VN')}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleViewApplication(application)}
                                    >
                                        <ViewIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        href={application.resumeUrl}
                                        target="_blank"
                                    >
                                        <DownloadIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Application Detail Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    Chi tiết hồ sơ ứng viên
                </DialogTitle>
                <DialogContent>
                    {selectedApplication && (
                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Thông tin cá nhân
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Họ và tên"
                                            value={selectedApplication.applicantName}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            value={selectedApplication.applicantEmail}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Số điện thoại"
                                            value={selectedApplication.applicantPhone}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Vị trí ứng tuyển"
                                            value={selectedApplication.jobTitle}
                                            disabled
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Kinh nghiệm & Học vấn
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Kinh nghiệm"
                                            value={selectedApplication.experience}
                                            disabled
                                            multiline
                                            rows={2}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Học vấn"
                                            value={selectedApplication.education}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            Kỹ năng
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {selectedApplication.skills.map((skill, index) => (
                                                <Chip key={index} label={skill} size="small" />
                                            ))}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Thư xin việc
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={selectedApplication.coverLetter}
                                    disabled
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Quản lý ứng viên
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Trạng thái</InputLabel>
                                            <Select
                                                value={selectedApplication.status}
                                                onChange={(e) => handleUpdateStatus(selectedApplication.id, e.target.value)}
                                            >
                                                <MenuItem value="pending">Chờ xem xét</MenuItem>
                                                <MenuItem value="reviewing">Đang xem xét</MenuItem>
                                                <MenuItem value="interviewed">Đã phỏng vấn</MenuItem>
                                                <MenuItem value="accepted">Đã chấp nhận</MenuItem>
                                                <MenuItem value="rejected">Đã từ chối</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Ngày phỏng vấn"
                                            type="date"
                                            value={selectedApplication.interviewDate || ''}
                                            onChange={(e) => {
                                                const updatedApp = { ...selectedApplication, interviewDate: e.target.value };
                                                setSelectedApplication(updatedApp);
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Ghi chú"
                                            multiline
                                            rows={3}
                                            value={selectedApplication.notes}
                                            onChange={(e) => handleUpdateNotes(selectedApplication.id, e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>
                        Đóng
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EmailIcon />}
                        onClick={() => {
                            // TODO: Implement email functionality
                            console.log('Send email to:', selectedApplication?.applicantEmail);
                        }}
                    >
                        Gửi email
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default JobApplicationsManagement;
