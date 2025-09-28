"use client";

import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Button,
    Breadcrumbs,
    Link as MuiLink,
    Tabs,
    Tab,
    Pagination,
    CircularProgress,
    Alert,
    TextField,
    InputAdornment,
} from '@mui/material';
import {
    Home,
    Business,
    Search,
    LocationOn,
    AttachMoney,
    SquareFoot,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';
import TruncatedDescription from '@/components/client/shared/TruncatedDescription';
import {
    getProjects,
    getProjectTypes,
    type Project,
    type ProjectFilters
} from '@/services/client/projectService';

const ProjectsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectTypes, setProjectTypes] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [totalProjects, setTotalProjects] = useState(0);
    const projectsPerPage = 6;

    // Load projects and types from API
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Load project types
                const typesResponse = await getProjectTypes();
                if (typesResponse.success) {
                    setProjectTypes(typesResponse.data);
                }

                // Load projects
                await loadProjects();
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Không thể tải dữ liệu dự án');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Load projects based on current filters
    const loadProjects = async () => {
        try {
            const filters: ProjectFilters = {};

            // Map tab to type
            if (activeTab > 0 && projectTypes.length > 0) {
                const typeMapping: { [key: number]: string } = {
                    1: 'apartment',
                    2: 'villa',
                    3: 'commercial',
                    4: 'villa',
                    5: 'office'
                };
                filters.type = typeMapping[activeTab];
            }

            if (searchQuery) {
                filters.search = searchQuery;
            }

            // Get all projects first (no pagination from API)
            const response = await getProjects(1, 1000, filters); // Get large number to get all

            if (response.success) {
                const allProjects = response.data;

                // Client-side pagination
                const startIndex = (currentPage - 1) * projectsPerPage;
                const endIndex = startIndex + projectsPerPage;
                const paginatedProjects = allProjects.slice(startIndex, endIndex);

                setProjects(paginatedProjects);
                setTotalPages(Math.ceil(allProjects.length / projectsPerPage));
                setTotalProjects(allProjects.length);
            } else {
                setError('Không thể tải danh sách dự án');
            }
        } catch (err) {
            console.error('Error loading projects:', err);
            setError('Không thể tải danh sách dự án');
        }
    };

    // Reload projects when filters change
    useEffect(() => {
        if (projectTypes.length > 0) {
            loadProjects();
        }
    }, [activeTab, currentPage, searchQuery, projectTypes]); // eslint-disable-line react-hooks/exhaustive-deps

    // Create project categories from API types
    const projectCategories = [
        { id: 0, name: 'TẤT CẢ DỰ ÁN', icon: 'null', type: null },
        ...projectTypes.map((type, index) => {
            const typeNames: { [key: string]: string } = {
                'apartment': 'CĂN HỘ',
                'villa': 'BIỆT THỰ',
                'office': 'VĂN PHÒNG',
                'commercial': 'THƯƠNG MẠI'
            };
            return {
                id: index + 1,
                name: typeNames[type] || type.toUpperCase(),
                icon: 'null',
                type: type
            };
        })
    ];

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setCurrentPage(1);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearch = async () => {
        setCurrentPage(1);
        await loadProjects();
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Layout>
            {/* Hero Banner */}
            <Box
                sx={{
                    backgroundImage: 'url("https://datxanhmiennam.com.vn/Data/Sites/1/Banner/bnda.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    pt: { xs: 12, md: 16 },
                    pb: { xs: 8, md: 12 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 1,
                    }
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box textAlign="center" data-aos="fade-up" data-aos-duration="1000">
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '2.5rem', md: '4rem' },
                            }}
                        >
                            DỰ ÁN ĐẤT MINH LỘC GROUP
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Breadcrumbs */}
            <Box sx={{ backgroundColor: '#f8f9fa', py: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Container maxWidth="lg">
                    <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#666' }}>
                        <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                            Trang chủ
                        </MuiLink>
                        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#1976d2' }}>
                            <Business sx={{ mr: 0.5 }} fontSize="inherit" />
                            Dự án
                        </Typography>
                    </Breadcrumbs>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Filter Tabs */}
                <Box sx={{ mb: 6 }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: 48,
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                px: 2,
                                '&.Mui-selected': {
                                    color: '#E7C873',
                                    fontWeight: 600,
                                },
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#E7C873',
                                height: 3,
                            },
                        }}
                    >
                        {projectCategories.map((category) => (
                            <Tab
                                key={category.id}
                                value={category.id}
                                label={category.name}
                                icon={
                                    category.id === 0 ? (
                                        <Business sx={{ width: 20, height: 20, mr: 1 }} />
                                    ) : category.type === 'apartment' ? (
                                        <Box sx={{ width: 20, height: 20, mr: 1, backgroundColor: '#1976d2', borderRadius: 0.5 }} />
                                    ) : category.type === 'villa' ? (
                                        <Box sx={{ width: 20, height: 20, mr: 1, backgroundColor: '#4caf50', borderRadius: 0.5 }} />
                                    ) : (
                                        <Box sx={{ width: 20, height: 20, mr: 1, backgroundColor: '#ff9800', borderRadius: 0.5 }} />
                                    )
                                }
                                iconPosition="start"
                            />
                        ))}
                    </Tabs>
                </Box>

                {/* Search Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2 }}>
                    <TextField
                        placeholder="Tìm kiếm dự án..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        sx={{
                            flexGrow: 1,
                            maxWidth: 400,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 1,
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        disabled={loading}
                        sx={{
                            backgroundColor: '#E7C873',
                            color: 'white',
                            px: 3,
                            py: 1.5,
                            borderRadius: 1,
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#d4b85a',
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : 'Tìm kiếm'}
                    </Button>
                </Box>

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        {error}
                    </Alert>
                )}

                {/* Loading State */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress size={60} />
                    </Box>
                ) : (
                    <>
                        {/* Projects Grid */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(2, 1fr)',
                                    md: 'repeat(3, 1fr)',
                                },
                                gap: 3,
                                mb: 6,
                            }}
                        >
                            {projects.map((project, index) => (
                                <Card
                                    key={project._id}
                                    component={Link}
                                    href={`/projects/${project.slug}`}
                                    data-aos="fade-up"
                                    data-aos-duration="800"
                                    data-aos-delay={index * 100}
                                    sx={{
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={project.images?.[0] || '/images/placeholder-project.jpg'}
                                        alt={project.name}
                                        sx={{
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                sx={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 700,
                                                    color: '#1a1a1a',
                                                    lineHeight: 1.2,
                                                    flex: 1,
                                                    mr: 1,
                                                    height: '2.4em',
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    textOverflow: 'ellipsis'
                                                }}
                                                title={project.name}
                                            >
                                                {project.name}
                                            </Typography>
                                            {project.isFeatured && (
                                                <Box
                                                    sx={{
                                                        backgroundColor: '#E7C873',
                                                        color: 'white',
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: 0.5,
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase'
                                                    }}
                                                >
                                                    Nổi bật
                                                </Box>
                                            )}
                                        </Box>

                                        <TruncatedDescription
                                            maxLines={4}
                                            lineHeight={1.4}
                                            fontSize="0.9rem"
                                            sx={{
                                                color: '#666',
                                                mb: 2
                                            }}
                                        >
                                            {project.description}
                                        </TruncatedDescription>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                            <LocationOn sx={{ fontSize: '1rem', color: '#666' }} />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#666',
                                                    fontSize: '0.9rem',
                                                    flex: 1,
                                                    height: '1.4em',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                                title={project.location}
                                            >
                                                {project.location}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                            <SquareFoot sx={{ fontSize: '1rem', color: '#666' }} />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#666',
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {project.area.min} - {project.area.max} {project.area.unit}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                            <AttachMoney sx={{ fontSize: '1rem', color: '#1976d2' }} />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#1976d2',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 600
                                                }}
                                            >
                                                {(project.price.min / 1000000).toFixed(0)} - {(project.price.max / 1000000).toFixed(0)} triệu {project.price.currency}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                            <Business sx={{ fontSize: '1rem', color: '#666' }} />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#666',
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {project.totalUnits} {project.type === 'apartment' ? 'căn hộ' : project.type === 'villa' ? 'biệt thự' : 'sản phẩm'}
                                            </Typography>
                                        </Box>

                                        {/* Status Badge */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor:
                                                        project.status === 'completed' ? '#4caf50' :
                                                            project.status === 'construction' ? '#ff9800' :
                                                                project.status === 'planning' ? '#2196f3' : '#f44336'
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#666',
                                                    fontSize: '0.9rem',
                                                    textTransform: 'capitalize'
                                                }}
                                            >
                                                {project.status === 'completed' ? 'Hoàn thành' :
                                                    project.status === 'construction' ? 'Đang xây dựng' :
                                                        project.status === 'planning' ? 'Chuẩn bị' : 'Bán hết'}
                                            </Typography>
                                        </Box>

                                        {/* Developer */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#666',
                                                    fontSize: '0.8rem',
                                                    fontStyle: 'italic',
                                                    flex: 1,
                                                    height: '1.4em',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                                title={`Chủ đầu tư: ${project.developer}`}
                                            >
                                                {`Chủ đầu tư: ${project.developer}`}
                                            </Typography>
                                        </Box>

                                        {/* Sales Rate */}
                                        {project.salesRate > 0 && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: '#1976d2',
                                                        fontSize: '0.9rem',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    Đã bán: {project.salesRate.toFixed(1)}%
                                                </Typography>
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>

                        {/* No Projects Message */}
                        {projects.length === 0 && !loading && (
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
                                    Không tìm thấy dự án nào
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#999' }}>
                                    Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                                </Typography>
                            </Box>
                        )}
                    </>
                )}

                {/* Pagination */}
                {totalPages > 1 && !loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    borderRadius: 1,
                                    minWidth: 40,
                                    height: 40,
                                },
                                '& .Mui-selected': {
                                    backgroundColor: '#E7C873',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#d4b85a',
                                    },
                                },
                            }}
                        />
                    </Box>
                )}

                {/* Results Summary */}
                {!loading && projects.length > 0 && totalProjects > 0 && (
                    <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            Hiển thị {projects.length} trong tổng số {totalProjects} dự án
                        </Typography>
                    </Box>
                )}
            </Container>
        </Layout>
    );
};

export default ProjectsPage;