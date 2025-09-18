import type { Metadata } from 'next';
import React from 'react';
import Layout from '@/components/client/shared/Layout';
import { notFound } from 'next/navigation';
import {
    Container, Box, Typography, Card, CardMedia, Chip, Button
} from '@mui/material';

const SAM_DATA = [
    {
        slug: 'sam-ngoc-linh-tuoi-10-nam',
        name: 'Sâm Ngọc Linh tươi 10 năm',
        origin: 'Kontum',
        weightGram: 500,
        priceLabel: 'Liên hệ',
        image: '/article-1.png',
        gallery: ['/article-1.png', '/article-2.png', '/article-3.png'],
        benefits: ['Bồi bổ cơ thể', 'Tăng cường miễn dịch', 'Hỗ trợ phục hồi sức khỏe'],
    },
    {
        slug: 'sam-han-quoc-hop-100g',
        name: 'Sâm Hàn Quốc hộp 100g',
        origin: 'Korea',
        weightGram: 100,
        priceLabel: '1,9 triệu',
        image: '/article-2.png',
        gallery: ['/article-2.png', '/article-3.png'],
        benefits: ['Tăng sức bền', 'Giảm mệt mỏi'],
    },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const item = SAM_DATA.find(s => s.slug === slug);
    if (!item) return { title: 'Sâm | MinhLoc Group' };
    return { title: `${item.name} | MinhLoc Group`, description: `${item.name} xuất xứ ${item.origin}` };
}

export default async function SamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = SAM_DATA.find(s => s.slug === slug);
    if (!item) return notFound();

    return (
        <Layout>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 3 }}>
                    <Box>
                        <Card sx={{ mb: 2 }}>
                            <CardMedia component="img" height="360" image={item.image} alt={item.name} />
                        </Card>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
                            {item.gallery.map((g, i) => (
                                <Card key={i}>
                                    <CardMedia component="img" height="100" image={g} alt={`${item.name} ${i + 1}`} />
                                </Card>
                            ))}
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h4" gutterBottom>{item.name}</Typography>
                        <Box display="flex" gap={1} mb={2}>
                            <Chip label={`Xuất xứ: ${item.origin}`} />
                            <Chip label={`${item.weightGram}g`} />
                        </Box>
                        <Typography color="primary" fontWeight={700} sx={{ mb: 2, color: '#E7C873' }}>{item.priceLabel}</Typography>
                        <Button variant="contained" href={`tel:0123456789`} sx={{ mb: 1, backgroundColor: '#E7C873', color: '#1a1a1a', '&:hover': { backgroundColor: '#d4b85a' } }} fullWidth>Gọi tư vấn</Button>
                        <Button variant="outlined" href={`mailto:hi@minhlocgroup.com`} fullWidth sx={{ borderColor: '#E7C873', color: '#E7C873', '&:hover': { borderColor: '#d4b85a', color: '#d4b85a' } }}>Gửi email</Button>

                        <Box mt={3}>
                            <Typography variant="h6" gutterBottom>Lợi ích</Typography>
                            <Box display="flex" gap={1} flexWrap="wrap">
                                {item.benefits.map((b, idx) => (<Chip key={idx} label={b} sx={{ backgroundColor: 'rgba(231,200,115,0.15)', border: '1px solid #E7C873' }} />))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
}
