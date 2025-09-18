import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import Layout from '@/components/client/shared/Layout';
import {
    Box,
    Container,
    Typography,
    Chip,
    Card,
    CardMedia,
    CardContent,
    Button,
    Divider,
    Avatar,
    Stack,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { LocationOn, PictureAsPdf, Map, CalendarMonth, PhotoLibrary, Phone, Chat, Verified } from '@mui/icons-material';

interface ProjectDetail {
    slug: string;
    name: string;
    summary: string;
    city: string;
    district: string;
    address: string;
    priceLabel: string;
    areaLabel: string;
    status: 'available' | 'sold' | 'coming-soon';
    features: string[];
    heroImage: string;
    gallery: string[];
    floorplanImages: string[];
    progress: { date: string; label: string }[];
    brochureUrl?: string;
}

const DATA: ProjectDetail[] = [
    {
        slug: 'chung-cu-green-valley',
        name: 'Chung cư Green Valley',
        summary: 'Dự án chung cư cao cấp với thiết kế hiện đại, tiện ích đầy đủ, vị trí chiến lược tại Quận 2.',
        city: 'TP.HCM',
        district: 'Quận 2',
        address: 'Số 1 Đường XYZ, Quận 2, TP.HCM',
        priceLabel: '3,5 tỷ',
        areaLabel: '85m²',
        status: 'available',
        features: ['Hồ bơi', 'Gym', 'Vườn cây', 'Bảo vệ 24/7', 'Khu BBQ', 'Sân chơi trẻ em'],
        heroImage: '/article-1.png',
        gallery: ['/article-1.png', '/article-2.png', '/article-3.png', '/article-4.png'],
        floorplanImages: ['/modern-house.png', '/next.svg'],
        progress: [
            { date: '2024-01', label: 'Khởi công' },
            { date: '2024-08', label: 'Hoàn thành phần thô' },
            { date: '2025-03', label: 'Hoàn thiện nội thất' },
        ],
        brochureUrl: '/og-image.jpg',
    },
    {
        slug: 'biet-thu-royal-garden',
        name: 'Biệt thự Royal Garden',
        summary: 'Biệt thự sang trọng với không gian sống rộng rãi, tiện ích đẳng cấp tại Quận 7.',
        city: 'TP.HCM',
        district: 'Quận 7',
        address: 'Số 9 Đường ABC, Quận 7, TP.HCM',
        priceLabel: '15 tỷ',
        areaLabel: '250m²',
        status: 'available',
        features: ['Sân vườn', 'Garage', 'Hồ bơi riêng', 'Thang máy', 'Bảo mật 24/7'],
        heroImage: '/article-2.png',
        gallery: ['/article-2.png', '/article-3.png', '/article-4.png'],
        floorplanImages: ['/modern-house.png'],
        progress: [
            { date: '2024-02', label: 'Khởi công' },
            { date: '2024-12', label: 'Hoàn thành phần thô' },
        ],
        brochureUrl: '/og-image.jpg',
    },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = DATA.find(p => p.slug === slug);
    if (!project) {
        return {
            title: 'Dự án | MinhLoc Group',
            description: 'Chi tiết dự án bất động sản MinhLoc Group',
        };
    }
    return {
        title: `${project.name} | MinhLoc Group`,
        description: project.summary,
        alternates: { canonical: `/projects/${project.slug}` },
        openGraph: {
            title: `${project.name} | MinhLoc Group`,
            description: project.summary,
            url: `https://minhlocgroup.com/projects/${project.slug}`,
            type: 'article',
            images: [project.heroImage],
        },
    };
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <Box display="flex" alignItems="center" gap={1} mb={2}>
            {icon}
            <Typography variant="h5" component="h2">{title}</Typography>
        </Box>
    );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = DATA.find(p => p.slug === slug);

    if (!project) return notFound();

    return (
        <Layout>
            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, columnGap: 3, rowGap: 3, alignItems: 'start' }}>
                    {/* Left content */}
                    <Box>
                        {/* Gallery */}
                        <Card sx={{ mb: 2, borderRadius: 3, overflow: 'hidden' }}>
                            <CardMedia component="img" height="420" image={project.heroImage} alt={project.name} sx={{ objectFit: 'cover' }} />
                        </Card>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 1, mb: 3 }}>
                            {project.gallery.map((src, i) => (
                                <Card key={i} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                    <CardMedia component="img" height="96" image={src} alt={`${project.name} ${i + 1}`} sx={{ objectFit: 'cover' }} />
                                </Card>
                            ))}
                        </Box>

                        {/* Title and quick facts */}
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800 }}>{project.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1 }}>
                                <LocationOn color="action" />
                                <Typography variant="body2">{project.address}</Typography>
                            </Box>
                            <Chip label={project.city} />
                            <Chip label={project.district} />
                            <Chip label={project.areaLabel} />
                            <Chip label={project.priceLabel} color="primary" />
                        </Box>

                        {/* CTA row */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 3 }}>
                            <Button variant="contained" color="primary" startIcon={<PictureAsPdf />}>Tải brochure</Button>
                            <Button variant="outlined" startIcon={<Phone />}>Hiện số</Button>
                            <Button variant="outlined" startIcon={<Chat />}>Chat ngay</Button>
                        </Stack>

                        <Divider sx={{ mb: 3 }} />

                        {/* Description */}
                        <SectionTitle icon={<PhotoLibrary />} title="Thông tin mô tả" />
                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                            {project.summary} Liên hệ để được tư vấn chi tiết và nhận ưu đãi mới nhất.
                        </Typography>

                        {/* Property features table-like */}
                        <SectionTitle icon={<CalendarMonth />} title="Đặc điểm bất động sản" />
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
                            <Card sx={{ borderRadius: 2 }}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="Mức giá" secondary={project.priceLabel} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Diện tích" secondary={project.areaLabel} />
                                    </ListItem>
                                </List>
                            </Card>
                            <Card sx={{ borderRadius: 2 }}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="Pháp lý" secondary="Hợp đồng mua bán" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Trạng thái" secondary={project.status === 'available' ? 'Còn trống' : project.status === 'coming-soon' ? 'Sắp mở bán' : 'Đã bán'} />
                                    </ListItem>
                                </List>
                            </Card>
                        </Box>

                        {/* Project info */}
                        <SectionTitle icon={<Map />} title="Thông tin dự án" />
                        <Card sx={{ mb: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <CardMedia component="img" image={project.heroImage} alt={project.name} sx={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 1 }} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={700}>{project.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">Đang cập nhật tiến độ • Chủ đầu tư: MinhLoc Group</Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Banner */}
                        <Card sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                            <CardMedia component="img" image="/banner.png" alt="banner" sx={{ objectFit: 'cover' }} />
                        </Card>

                        {/* Map */}
                        <SectionTitle icon={<Map />} title="Xem trên bản đồ" />
                        <Card sx={{ height: 320, mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                            <Box sx={{ width: '100%', height: '100%', backgroundColor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography color="text.secondary">Bản đồ (placeholder)</Typography>
                            </Box>
                        </Card>

                        {/* Listing meta */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 2, mb: 5 }}>
                            <Box><Typography variant="caption" color="text.secondary">Ngày đăng</Typography><Typography>12/09/2025</Typography></Box>
                            <Box><Typography variant="caption" color="text.secondary">Ngày hết hạn</Typography><Typography>22/09/2025</Typography></Box>
                            <Box><Typography variant="caption" color="text.secondary">Loại tin</Typography><Typography>Tin thường</Typography></Box>
                            <Box><Typography variant="caption" color="text.secondary">Mã tin</Typography><Typography>43556374</Typography></Box>
                        </Box>
                    </Box>

                    {/* Right sidebar */}
                    <Box>
                        <Card sx={{ mb: 2, borderRadius: 2 }}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                                    <Avatar src="/avatar.jpg" alt="Agent" />
                                    <Box>
                                        <Typography fontWeight={700}>Nguyễn Thị Hương</Typography>
                                        <Typography variant="caption" color="text.secondary">Môi giới chuyên nghiệp</Typography>
                                    </Box>
                                    <Verified sx={{ color: '#2e7d32', ml: 'auto' }} />
                                </Stack>
                                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                    <Box>
                                        <Typography variant="h6" textAlign="center">1 năm</Typography>
                                        <Typography variant="caption" color="text.secondary">Kinh nghiệm</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" textAlign="center">112</Typography>
                                        <Typography variant="caption" color="text.secondary">Tin đăng</Typography>
                                    </Box>
                                </Stack>
                                <Stack spacing={1}>
                                    <Button variant="contained" fullWidth startIcon={<Phone />}>Hiện số</Button>
                                    <Button variant="outlined" fullWidth startIcon={<Chat />}>Chat qua Zalo</Button>
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card sx={{ mb: 2, borderRadius: 2 }}>
                            <CardContent>
                                <Typography fontWeight={700} sx={{ mb: 1 }}>Bất động sản nổi bật</Typography>
                                <List dense>
                                    <ListItem><ListItemText primary="Mua bán nhà đất ở thành phố Vinh" /></ListItem>
                                    <ListItem><ListItemText primary="Bán đất Cẩm Mỹ" /></ListItem>
                                    <ListItem><ListItemText primary="Bán nhà Bến Tre" /></ListItem>
                                    <ListItem><ListItemText primary="Bán nhà Giang Điền" /></ListItem>
                                </List>
                            </CardContent>
                        </Card>

                        <Card sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Typography fontWeight={700} sx={{ mb: 1 }}>Hỗ trợ tiện ích</Typography>
                                <List dense>
                                    <ListItem><ListItemText primary="Tư vấn phong thuỷ" /></ListItem>
                                    <ListItem><ListItemText primary="Hỗ trợ pháp lý làm nhà" /></ListItem>
                                    <ListItem><ListItemText primary="Tính lãi suất" /></ListItem>
                                    <ListItem><ListItemText primary="Quy trình xây nhà" /></ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

                {/* Related grid */}
                <Divider sx={{ my: 4 }} />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>Bất động sản dành cho bạn</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
                    {DATA.slice(0, 2).map((rel) => (
                        <Card key={rel.slug} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0 6px 18px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                            <CardMedia component="img" height="180" image={rel.heroImage} alt={rel.name} sx={{ objectFit: 'cover' }} />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography fontWeight={700} sx={{ mb: 0.5 }}>{rel.name}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    <LocationOn sx={{ fontSize: 16, mr: 0.5 }} /> {rel.address}
                                </Typography>
                                <Typography color="primary" fontWeight={700}>{rel.priceLabel}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Layout>
    );
}
