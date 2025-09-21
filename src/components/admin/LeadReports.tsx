'use client'

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import {
    Person as LeadIcon,
    TrendingUp as ConversionIcon,
    Source as SourceIcon,
    AccessTime as TimeIcon,
    Phone as CallIcon,
    Email as EmailIcon,
    WhatsApp as WhatsAppIcon,
    Language as WebIcon,
    Facebook as FacebookIcon,
    Google as GoogleIcon,
    FileDownload as ExportIcon,
    AttachMoney as ValueIcon,
} from '@mui/icons-material';

interface LeadMetric {
    metric: string;
    current: number;
    previous: number;
    change: number;
    unit: string;
    target?: number;
}

interface ConversionFunnel {
    stage: string;
    count: number;
    rate: number;
    previousRate: number;
    change: number;
}

interface LeadSource {
    source: string;
    leads: number;
    conversion: number;
    value: number;
    cost: number;
    roi: number;
    icon: React.ReactNode;
    color: string;
}

interface LeadQuality {
    source: string;
    totalLeads: number;
    qualifiedLeads: number;
    qualificationRate: number;
    avgValue: number;
    conversionTime: number;
}

const LeadReports: React.FC = () => {
    const [dateRange, setDateRange] = useState('last_30_days');
    const [sourceFilter, setSourceFilter] = useState('all');

    const leadMetrics: LeadMetric[] = [
        {
            metric: 'Tổng Lead',
            current: 847,
            previous: 692,
            change: 22.4,
            unit: '',
            target: 1000
        },
        {
            metric: 'Tỷ lệ chuyển đổi',
            current: 18.5,
            previous: 15.2,
            change: 21.7,
            unit: '%',
            target: 20
        },
        {
            metric: 'Giá trị trung bình',
            current: 85.4,
            previous: 78.9,
            change: 8.2,
            unit: 'M VNĐ',
            target: 90
        },
        {
            metric: 'Chi phí Lead',
            current: 1.2,
            previous: 1.5,
            change: -20.0,
            unit: 'M VNĐ',
            target: 1.0
        },
    ];

    const conversionFunnel: ConversionFunnel[] = [
        { stage: 'Website Visitors', count: 45672, rate: 100, previousRate: 100, change: 0 },
        { stage: 'Form Submissions', count: 2834, rate: 6.2, previousRate: 5.8, change: 6.9 },
        { stage: 'Qualified Leads', count: 1247, rate: 2.7, previousRate: 2.4, change: 12.5 },
        { stage: 'Sales Qualified', count: 589, rate: 1.3, previousRate: 1.1, change: 18.2 },
        { stage: 'Proposals Sent', count: 324, rate: 0.7, previousRate: 0.6, change: 16.7 },
        { stage: 'Closed Deals', count: 157, rate: 0.34, previousRate: 0.28, change: 21.4 }
    ];

    const leadSources: LeadSource[] = [
        {
            source: 'Google Ads',
            leads: 234,
            conversion: 22.6,
            value: 45.8,
            cost: 12.4,
            roi: 269,
            icon: <GoogleIcon />,
            color: '#4285f4'
        },
        {
            source: 'Facebook Ads',
            leads: 189,
            conversion: 16.4,
            value: 32.1,
            cost: 8.7,
            roi: 269,
            icon: <FacebookIcon />,
            color: '#1877f2'
        },
        {
            source: 'Website Organic',
            leads: 156,
            conversion: 28.8,
            value: 52.3,
            cost: 0,
            roi: 999,
            icon: <WebIcon />,
            color: '#4caf50'
        },
        {
            source: 'Email Campaign',
            leads: 134,
            conversion: 19.4,
            value: 38.7,
            cost: 3.2,
            roi: 1109,
            icon: <EmailIcon />,
            color: '#ff5722'
        },
        {
            source: 'WhatsApp Business',
            leads: 89,
            conversion: 31.5,
            value: 67.2,
            cost: 2.1,
            roi: 3100,
            icon: <WhatsAppIcon />,
            color: '#25d366'
        },
        {
            source: 'Phone Referral',
            leads: 45,
            conversion: 42.2,
            value: 89.4,
            cost: 1.5,
            roi: 5860,
            icon: <CallIcon />,
            color: '#9c27b0'
        }
    ];

    const leadQuality: LeadQuality[] = [
        {
            source: 'Google Ads',
            totalLeads: 234,
            qualifiedLeads: 167,
            qualificationRate: 71.4,
            avgValue: 65.2,
            conversionTime: 8.5
        },
        {
            source: 'Website Organic',
            totalLeads: 156,
            qualifiedLeads: 134,
            qualificationRate: 85.9,
            avgValue: 78.9,
            conversionTime: 5.2
        },
        {
            source: 'Facebook Ads',
            totalLeads: 189,
            qualifiedLeads: 98,
            qualificationRate: 51.9,
            avgValue: 45.3,
            conversionTime: 12.3
        },
        {
            source: 'Email Campaign',
            totalLeads: 134,
            qualifiedLeads: 87,
            qualificationRate: 65.0,
            avgValue: 56.7,
            conversionTime: 7.8
        },
        {
            source: 'WhatsApp Business',
            totalLeads: 89,
            qualifiedLeads: 76,
            qualificationRate: 85.4,
            avgValue: 92.1,
            conversionTime: 3.1
        }
    ];

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    const formatCurrency = (amount: number) => {
        return `${amount.toFixed(1)}M VNĐ`;
    };

    const getChangeColor = (change: number) => {
        return change >= 0 ? '#4caf50' : '#f44336';
    };

    const getQualityColor = (rate: number) => {
        if (rate >= 80) return 'success';
        if (rate >= 60) return 'warning';
        return 'error';
    };

    const handleExport = () => {
        // Export lead reports
    };

    return (
        <Box>
            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Khoảng thời gian</InputLabel>
                                <Select
                                    value={dateRange}
                                    label="Khoảng thời gian"
                                    onChange={(e) => setDateRange(e.target.value)}
                                >
                                    <MenuItem value="today">Hôm nay</MenuItem>
                                    <MenuItem value="yesterday">Hôm qua</MenuItem>
                                    <MenuItem value="last_7_days">7 ngày qua</MenuItem>
                                    <MenuItem value="last_30_days">30 ngày qua</MenuItem>
                                    <MenuItem value="last_90_days">90 ngày qua</MenuItem>
                                    <MenuItem value="this_year">Năm nay</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Nguồn lead</InputLabel>
                                <Select
                                    value={sourceFilter}
                                    label="Nguồn lead"
                                    onChange={(e) => setSourceFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả nguồn</MenuItem>
                                    <MenuItem value="google">Google Ads</MenuItem>
                                    <MenuItem value="facebook">Facebook Ads</MenuItem>
                                    <MenuItem value="organic">Organic</MenuItem>
                                    <MenuItem value="email">Email</MenuItem>
                                    <MenuItem value="referral">Referral</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<ExportIcon />}
                                onClick={handleExport}
                            >
                                Xuất báo cáo Lead
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Lead Metrics */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {leadMetrics.map((metric, index) => {
                    const icons = [LeadIcon, ConversionIcon, ValueIcon, SourceIcon];
                    const IconComponent = icons[index];
                    const colors = ['#2196f3', '#4caf50', '#ff9800', '#9c27b0'];
                    const progress = metric.target ? (metric.current / metric.target) * 100 : 0;

                    return (
                        <Grid item xs={12} md={3} key={metric.metric}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                        <IconComponent sx={{ fontSize: 40, color: colors[index] }} />
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: colors[index] }}>
                                                {formatNumber(metric.current)}{metric.unit}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {metric.change >= 0 ? '+' : ''}{metric.change}% vs tháng trước
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {metric.metric}
                                    </Typography>
                                    {metric.target && (
                                        <Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                <Typography variant="caption">
                                                    Target: {formatNumber(metric.target)}{metric.unit}
                                                </Typography>
                                                <Typography variant="caption">
                                                    {progress.toFixed(1)}%
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={Math.min(progress, 100)}
                                                sx={{
                                                    height: 6,
                                                    borderRadius: 3,
                                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: colors[index]
                                                    }
                                                }}
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            <Grid container spacing={3}>
                {/* Conversion Funnel */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                <ConversionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Phễu Chuyển đổi
                            </Typography>

                            <List>
                                {conversionFunnel.map((stage, index) => (
                                    <React.Fragment key={stage.stage}>
                                        <ListItem sx={{ px: 0 }}>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                            {stage.stage}
                                                        </Typography>
                                                        <Box sx={{ textAlign: 'right' }}>
                                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                                {formatNumber(stage.count)}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {stage.rate}%
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                }
                                                secondary={
                                                    <Box sx={{ mt: 1 }}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={stage.rate * 10} // Scale for visualization
                                                            sx={{
                                                                height: 8,
                                                                borderRadius: 4,
                                                                backgroundColor: 'rgba(0,0,0,0.1)',
                                                                '& .MuiLinearProgress-bar': {
                                                                    backgroundColor: `hsl(${120 - index * 20}, 60%, 50%)`
                                                                }
                                                            }}
                                                        />
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Conversion rate: {stage.rate}%
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    color: getChangeColor(stage.change),
                                                                    fontWeight: 600
                                                                }}
                                                            >
                                                                {stage.change >= 0 ? '+' : ''}{stage.change}%
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                        {index < conversionFunnel.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Lead Sources Performance */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                <SourceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Hiệu suất theo Nguồn
                            </Typography>

                            <List>
                                {leadSources.map((source, index) => (
                                    <React.Fragment key={source.source}>
                                        <ListItem sx={{ px: 0 }}>
                                            <Box sx={{ mr: 2, color: source.color }}>
                                                {source.icon}
                                            </Box>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                            {source.source}
                                                        </Typography>
                                                        <Chip
                                                            label={`${source.conversion}%`}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: source.color,
                                                                color: 'white',
                                                                fontWeight: 600
                                                            }}
                                                        />
                                                    </Box>
                                                }
                                                secondary={`${formatNumber(source.leads)} leads • ${formatCurrency(source.value)} value • ROI: ${source.roi}%`}
                                            />
                                        </ListItem>
                                        {index < leadSources.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Lead Quality Analysis */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Phân tích Chất lượng Lead
                            </Typography>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nguồn</TableCell>
                                            <TableCell align="center">Tổng Lead</TableCell>
                                            <TableCell align="center">Lead chất lượng</TableCell>
                                            <TableCell align="center">Tỷ lệ đạt chuẩn</TableCell>
                                            <TableCell align="right">Giá trị TB</TableCell>
                                            <TableCell align="center">Thời gian chuyển đổi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leadQuality.map((item) => (
                                            <TableRow key={item.source} hover>
                                                <TableCell>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                        {item.source}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {formatNumber(item.totalLeads)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {formatNumber(item.qualifiedLeads)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={`${item.qualificationRate}%`}
                                                        color={getQualityColor(item.qualificationRate)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {formatCurrency(item.avgValue)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <TimeIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                                                        <Typography variant="body2">
                                                            {item.conversionTime} ngày
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Lead Source Tracking */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                🎯 Source Tracking & Attribution
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                            UTM Tracking
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Theo dõi tự động các chiến dịch marketing qua UTM parameters.
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 600 }}>
                                            ✓ Đã cấu hình
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ p: 2, backgroundColor: '#e8f5e8', borderRadius: 2 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                            First-Touch Attribution
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Ghi nhận nguồn đầu tiên của lead để phân tích hiệu quả.
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 600 }}>
                                            ✓ Hoạt động
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ p: 2, backgroundColor: '#fff3e0', borderRadius: 2 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                            Conversion Tracking
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Theo dõi toàn bộ customer journey từ lead đến deal.
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#f57c00', fontWeight: 600 }}>
                                            ✓ Real-time
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LeadReports;
