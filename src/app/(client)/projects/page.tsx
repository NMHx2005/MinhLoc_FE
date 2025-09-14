'use client'

import React, { useState } from 'react';
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

interface Project {
    id: number;
    name: string;
    type: 'apartment' | 'villa' | 'commercial' | 'land';
    location: string;
    price: string;
    area: string;
    bedrooms?: number;
    bathrooms?: number;
    image: string;
    status: 'available' | 'sold' | 'coming-soon';
    description: string;
    features: string[];
}

const ProjectsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const projects: Project[] = [
        {
            id: 1,
            name: 'Chung cư Green Valley',
            type: 'apartment',
            location: 'Quận 2, TP.HCM',
            price: '3.5 tỷ',
            area: '85m²',
            bedrooms: 3,
            bathrooms: 2,
            image: '/api/placeholder/400/300',
            status: 'available',
            description: 'Dự án chung cư cao cấp với thiết kế hiện đại, tiện ích đầy đủ',
            features: ['Hồ bơi', 'Gym', 'Vườn cây', 'Bảo vệ 24/7'],
        },
        {
            id: 2,
            name: 'Biệt thự Royal Garden',
            type: 'villa',
            location: 'Quận 7, TP.HCM',
            price: '15 tỷ',
            area: '250m²',
            bedrooms: 5,
            bathrooms: 4,
            image: '/api/placeholder/400/300',
            status: 'available',
            description: 'Biệt thự sang trọng với không gian sống rộng rãi',
            features: ['Sân vườn', 'Garage', 'Hồ bơi riêng', 'Thang máy'],
        },
        {
            id: 3,
            name: 'Tòa nhà văn phòng Sky Tower',
            type: 'commercial',
            location: 'Quận 1, TP.HCM',
            price: '25 tỷ',
            area: '500m²',
            image: '/api/placeholder/400/300',
            status: 'coming-soon',
            description: 'Tòa nhà văn phòng cao cấp tại trung tâm thành phố',
            features: ['Parking', 'Thang máy', 'Hệ thống an ninh', 'View đẹp'],
        },
        {
            id: 4,
            name: 'Đất nền Golden Land',
            type: 'land',
            location: 'Quận 9, TP.HCM',
            price: '8 tỷ',
            area: '100m²',
            image: '/api/placeholder/400/300',
            status: 'available',
            description: 'Đất nền có vị trí đắc địa, tiềm năng phát triển cao',
            features: ['Mặt tiền đường', 'Gần trường học', 'Gần bệnh viện', 'Giao thông thuận tiện'],
        },
    ];

    const projectTypes = [
        { value: 'all', label: 'Tất cả', icon: <FilterList /> },
        { value: 'apartment', label: 'Chung cư', icon: <Home /> },
        { value: 'villa', label: 'Biệt thự', icon: <Villa /> },
        { value: 'commercial', label: 'Thương mại', icon: <Business /> },
        { value: 'land', label: 'Đất nền', icon: <LocationOn /> },
    ];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || project.type === selectedType;
        return matchesSearch && matchesType;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available': return 'success';
            case 'sold': return 'error';
            case 'coming-soon': return 'warning';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'available': return 'Còn trống';
            case 'sold': return 'Đã bán';
            case 'coming-soon': return 'Sắp mở bán';
            default: return status;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Box textAlign="center" mb={6}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Dự án bất động sản
                    </Typography>
                    <Typography variant="h5" color="text.secondary" paragraph>
                        Khám phá những dự án bất động sản cao cấp của MINH LỘC GROUP
                    </Typography>
                </Box>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={3}>
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
                        </Box>

                        <Tabs
                            value={selectedType}
                            onChange={(_e, newValue) => setSelectedType(newValue)}
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
                    </CardContent>
                </Card>
            </motion.div>

            {/* Projects Grid */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {filteredProjects.map((project, index) => (
                    <Box key={project.id} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)', lg: '1 1 calc(33.333% - 22px)' } }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={project.image}
                                    alt={project.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                                        <Typography variant="h6" component="h2">
                                            {project.name}
                                        </Typography>
                                        <Chip
                                            label={getStatusLabel(project.status)}
                                            color={getStatusColor(project.status)}
                                            size="small"
                                        />
                                    </Box>

                                    <Box display="flex" alignItems="center" mb={1}>
                                        <LocationOn color="action" sx={{ mr: 1, fontSize: 20 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {project.location}
                                        </Typography>
                                    </Box>

                                    <Typography variant="h5" color="primary" gutterBottom>
                                        {project.price}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        Diện tích: {project.area}
                                    </Typography>

                                    {project.bedrooms && (
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            {project.bedrooms} phòng ngủ • {project.bathrooms} phòng tắm
                                        </Typography>
                                    )}

                                    <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                                        {project.features.slice(0, 3).map((feature, idx) => (
                                            <Chip
                                                key={idx}
                                                label={feature}
                                                size="small"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>

                                    <Button
                                        component={Link}
                                        href={`/project/${project.id}`}
                                        fullWidth
                                        variant="contained"
                                    >
                                        Xem chi tiết
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Box>
                ))}
            </Box>

            {/* Project Detail Dialog */}
            <Dialog
                open={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                maxWidth="md"
                fullWidth
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
                                {selectedProject.price}
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
    );
};

export default ProjectsPage;
