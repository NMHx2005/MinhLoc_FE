'use client'

import React, { useState, useCallback } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Button,
    TextField,
    InputAdornment,
    Tabs,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    type SelectChangeEvent,
    Slider,
    Stack,
} from '@mui/material';
import {
    Search,
    LocationOn,
    Home,
    Business,
    Villa,
    FilterList,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';
import RecentArticlesSection from '@/components/client/Home/RecentArticlesSection';
import SimpleFeaturedProperties from '@/components/client/Home/SimpleFeaturedProperties';
import SimpleCityProperties from '@/components/client/Home/SimpleCityProperties';
import SimpleWhyChooseUs from '@/components/client/Home/SimpleWhyChooseUs';
import PartnersSection from '@/components/client/Home/PartnersSection';
import { fetchProjects, type ProjectDTO } from '@/services/projectService';

type ProjectType = 'apartment' | 'villa' | 'commercial' | 'land';

interface Project {
    id: number;
    slug: string;
    name: string;
    type: ProjectType;
    city: string;
    district: string;
    location: string;
    priceVnd: number;
    priceLabel: string;
    areaM2: number;
    areaLabel: string;
    bedrooms?: number;
    bathrooms?: number;
    image: string;
    status: 'available' | 'sold' | 'coming-soon';
    description: string;
    features: string[];
    createdAt: string | number | Date;
}

const currencyBillion = (vnd: number): string => `${(vnd / 1_000_000_000).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} tỷ`;

const projectTypes = [
    { value: 'all', label: 'Tất cả', icon: <FilterList /> },
    { value: 'apartment', label: 'Chung cư', icon: <Home /> },
    { value: 'villa', label: 'Biệt thự', icon: <Villa /> },
    { value: 'commercial', label: 'Thương mại', icon: <Business /> },
    { value: 'land', label: 'Đất nền', icon: <LocationOn /> },
] as const;

const statusOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'available', label: 'Còn trống' },
    { value: 'sold', label: 'Đã bán' },
    { value: 'coming-soon', label: 'Sắp mở bán' },
] as const;

type StatusColor = 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

const getStatusColor = (status: Project['status'] | 'all'): StatusColor => {
    switch (status) {
        case 'available': return 'success';
        case 'sold': return 'error';
        case 'coming-soon': return 'warning';
        default: return 'default';
    }
};

const getStatusLabel = (status: Project['status'] | 'all') => {
    switch (status) {
        case 'available': return 'Còn trống';
        case 'sold': return 'Đã bán';
        case 'coming-soon': return 'Sắp mở bán';
        default: return status;
    }
};

const priceMarks = [
    { value: 0, label: '0' },
    { value: 3000000000, label: '3 tỷ' },
    { value: 7000000000, label: '7 tỷ' },
    { value: 15000000000, label: '15 tỷ' },
    { value: 30000000000, label: '30 tỷ+' },
];

const areaMarks = [
    { value: 0, label: '0' },
    { value: 50, label: '50m²' },
    { value: 100, label: '100m²' },
    { value: 250, label: '250m²' },
    { value: 500, label: '500m²+' },
];

const ProjectsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<'all' | ProjectType>('all');
    const [selectedStatus, setSelectedStatus] = useState<Project['status'] | 'all'>('all');
    const [priceRange, setPriceRange] = useState<number[]>([0, 30_000_000_000]);
    const [areaRange, setAreaRange] = useState<number[]>([0, 500]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const PAGE_SIZE = 9; // 3 rows of 3 on large screens

    const loadProjects = useCallback(async (reset: boolean = true) => {
        setLoading(true);
        const data = await fetchProjects({
            q: searchTerm,
            type: selectedType === 'all' ? undefined : selectedType,
            status: selectedStatus === 'all' ? undefined : selectedStatus,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            minArea: areaRange[0],
            maxArea: areaRange[1],
            limit: PAGE_SIZE,
            offset: reset ? 0 : offset,
        });
        if (reset) {
            setProjects(data);
            setOffset(PAGE_SIZE);
        } else {
            setProjects(prev => [...prev, ...data]);
            setOffset(prev => prev + PAGE_SIZE);
        }
        setHasMore(data.length === PAGE_SIZE);
        setLoading(false);
    }, [searchTerm, selectedType, selectedStatus, priceRange, areaRange, offset]);

    const showAll = async () => {
        setLoading(true);
        const data = await fetchProjects({
            q: searchTerm,
            type: selectedType === 'all' ? undefined : selectedType,
            status: selectedStatus === 'all' ? undefined : selectedStatus,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            minArea: areaRange[0],
            maxArea: areaRange[1],
            limit: 1000,
            offset: 0,
        });
        setProjects(data);
        setOffset(data.length);
        setHasMore(false);
        setLoading(false);
    };

    React.useEffect(() => { loadProjects(true); }, [loadProjects]);

    return (
        <>
            <Layout>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Box textAlign="center" mb={4}>
                            <Typography variant="h2" component="h1" gutterBottom>
                                Dự án bất động sản
                            </Typography>
                            <Typography variant="h5" color="text.secondary">
                                Tìm kiếm và khám phá các dự án phù hợp với nhu cầu của bạn
                            </Typography>
                        </Box>
                    </motion.div>

                    {/* Search and Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card sx={{ mb: 6 }}>
                            <CardContent sx={{ p: 5 }}>
                                <Stack spacing={2}>
                                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                                        <TextField
                                            fullWidth
                                            placeholder="Tìm kiếm dự án..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Button variant="contained" onClick={() => loadProjects(true)} size="large" sx={{
                                            whiteSpace: 'nowrap',
                                            minWidth: 140,
                                            px: 3,
                                            height: { xs: 44, md: 56 },
                                            borderRadius: 2,
                                            flexShrink: 0,
                                        }}>Tìm kiếm</Button>
                                    </Box>

                                    <Tabs
                                        value={selectedType}
                                        onChange={(_e, newValue) => setSelectedType(newValue as 'all' | ProjectType)}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                    >
                                        {projectTypes.map((type) => (
                                            <Tab
                                                key={type.value}
                                                value={type.value}
                                                label={type.label}
                                                icon={type.icon}
                                                iconPosition="start"
                                            />
                                        ))}
                                    </Tabs>

                                    <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={5}>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Giá (VND)
                                            </Typography>
                                            <Slider
                                                value={priceRange}
                                                onChange={(_e, v) => setPriceRange(v as number[])}
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={30_000_000_000}
                                                step={500_000_000}
                                                marks={priceMarks}
                                                getAriaValueText={(v) => `${currencyBillion(v as number)}`}
                                                valueLabelFormat={(v) => currencyBillion(v as number)}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Diện tích (m²)
                                            </Typography>
                                            <Slider
                                                value={areaRange}
                                                onChange={(_e, v) => setAreaRange(v as number[])}
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={500}
                                                step={10}
                                                marks={areaMarks}
                                                getAriaValueText={(v) => `${v}m²`}
                                                valueLabelFormat={(v) => `${v}m²`}
                                            />
                                        </Box>
                                    </Box>

                                    <FormControl sx={{ maxWidth: { xs: '100%', md: 240 } }}>
                                        <InputLabel id="status-label">Trạng thái</InputLabel>
                                        <Select
                                            labelId="status-label"
                                            label="Trạng thái"
                                            value={selectedStatus}
                                            onChange={(e: SelectChangeEvent<string>) => setSelectedStatus(e.target.value as Project['status'] | 'all')}
                                            MenuProps={{ disableScrollLock: true }}
                                        >
                                            {statusOptions.map(s => (
                                                <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Projects Grid (Danh sách bất động sản) */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 4 }}>
                        {loading ? (
                            Array.from({ length: 6 }).map((_v, i) => (
                                <Box key={`skeleton-${i}`} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', lg: '1 1 calc(25% - 24px)' } }}>
                                    <Card sx={{ height: 360, borderRadius: 3 }} className="skeleton" />
                                </Box>
                            ))
                        ) : (
                            projects.map((project: ProjectDTO, i: number) => (
                                <Box key={project.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', lg: '1 1 calc(25% - 24px)' } }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: i * 0.1 }}
                                    >
                                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0 6px 18px rgba(0,0,0,0.08)', transition: 'transform .2s ease, box-shadow .2s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 28px rgba(0,0,0,0.12)' } }}>
                                            <CardMedia
                                                component="img"
                                                image={project.image}
                                                alt={project.name}
                                                sx={{ height: 200, objectFit: 'cover' }}
                                            />
                                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                                                    <Typography variant="h6" component="h2">
                                                        {project.name}
                                                    </Typography>
                                                    <Chip
                                                        label={getStatusLabel(project.status as Project['status'])}
                                                        color={getStatusColor(project.status as Project['status'])}
                                                        size="small"
                                                    />
                                                </Box>

                                                <Box display="flex" alignItems="center" mb={1}>
                                                    <LocationOn color="action" sx={{ mr: 1, fontSize: 20 }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {project.location}
                                                    </Typography>
                                                </Box>

                                                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                                    Đăng {new Date(project.createdAt).toLocaleDateString('vi-VN')}
                                                </Typography>

                                                <Typography variant="h5" color="primary" gutterBottom>
                                                    {project.priceLabel}
                                                </Typography>

                                                <Typography variant="body2" color="text.secondary" paragraph>
                                                    Diện tích: {project.areaLabel}
                                                </Typography>

                                                {project.bedrooms && (
                                                    <Typography variant="body2" color="text.secondary" paragraph>
                                                        {project.bedrooms} phòng ngủ • {project.bathrooms} phòng tắm
                                                    </Typography>
                                                )}

                                                <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                                                    {project.features.slice(0, 3).map((feature: string, idx: number) => (
                                                        <Chip
                                                            key={idx}
                                                            label={feature}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    ))}
                                                </Box>

                                                <Box sx={{ flexGrow: 1 }} />

                                                <Button
                                                    component={Link}
                                                    href={`/projects/${project.slug}`}
                                                    fullWidth
                                                    variant="contained"
                                                >
                                                    Xem chi tiết
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Box>
                            ))
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 8, flexWrap: 'wrap' }}>
                        {hasMore && (
                            <Button variant="outlined" onClick={() => loadProjects(false)} disabled={loading} sx={{ px: 4 }}>
                                {loading ? 'Đang tải...' : 'Xem thêm'}
                            </Button>
                        )}
                        {projects.length > 0 && (
                            <Button variant="text" onClick={showAll} disabled={loading} sx={{ px: 2 }}>
                                Hiển thị tất cả
                            </Button>
                        )}
                    </Box>

                    {/* News Section */}
                    <Box sx={{ mb: 6 }}>
                        <RecentArticlesSection />
                    </Box>

                    {/* Featured projects + Banner */}
                    <Box sx={{ mb: 6 }}>
                        <SimpleFeaturedProperties />
                    </Box>

                    {/* Properties by location */}
                    <Box sx={{ mb: 8 }}>
                        <SimpleCityProperties />
                    </Box>

                    {/* Support utilities and featured businesses */}
                    <Box sx={{ mb: 6 }}>
                        <SimpleWhyChooseUs />
                    </Box>
                    <Box sx={{ mb: 6 }}>
                        <PartnersSection />
                    </Box>

                    {/* Project Detail Dialog (quick view, optional) */}
                    <Dialog
                        open={!!selectedProject}
                        onClose={() => setSelectedProject(null)}
                        maxWidth="md"
                        fullWidth
                        disableScrollLock
                    >
                        {selectedProject && (
                            <>
                                <DialogTitle>{selectedProject.name}</DialogTitle>
                                <DialogContent>
                                    <Box mb={2}>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={selectedProject.image}
                                            alt={selectedProject.name}
                                        />
                                    </Box>

                                    <Typography variant="h4" color="primary" gutterBottom>
                                        {selectedProject.priceLabel}
                                    </Typography>

                                    <Box display="flex" alignItems="center" mb={2}>
                                        <LocationOn color="action" sx={{ mr: 1 }} />
                                        <Typography variant="body1">{selectedProject.location}</Typography>
                                    </Box>

                                    <Typography variant="body1" paragraph>
                                        {selectedProject.description}
                                    </Typography>

                                    <Typography variant="h6" gutterBottom>
                                        Tiện ích:
                                    </Typography>
                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                        {selectedProject.features.map((feature, idx) => (
                                            <Chip key={idx} label={feature} />
                                        ))}
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setSelectedProject(null)}>Đóng</Button>
                                    <Button variant="contained">Liên hệ tư vấn</Button>
                                </DialogActions>
                            </>
                        )}
                    </Dialog>
                </Container>
            </Layout>
        </>
    );
};

export default ProjectsPage;
