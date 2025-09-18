'use client'

import React from 'react';

import {
    Container,
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    type SelectChangeEvent,
    MenuItem,
    Slider,
    Button,
    Divider,
    Paper,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import Layout from '@/components/client/shared/Layout';
import { fetchSam, type SamDTO } from '@/services/projectService';

const typeOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'ngoc-linh', label: 'Ngọc Linh' },
    { value: 'han-quoc', label: 'Hàn Quốc' },
    { value: 'korean-red', label: 'Hồng sâm' },
    { value: 'khac', label: 'Khác' },
] as const;

const originOptions = ['all', 'Kontum', 'Korea'] as const;

type TypeFilter = typeof typeOptions[number]['value'];

type OriginFilter = typeof originOptions[number];

export default function SamListPage() {
    const [q, setQ] = React.useState('');
    const [type, setType] = React.useState<TypeFilter>('all');
    const [origin, setOrigin] = React.useState<OriginFilter>('all');
    const [weight, setWeight] = React.useState<number[]>([0, 1000]);
    const [items, setItems] = React.useState<SamDTO[]>([]);
    const [loading, setLoading] = React.useState(false);

    const load = React.useCallback(async () => {
        setLoading(true);
        const data = await fetchSam({
            q,
            type: type === 'all' ? undefined : type,
            origin: origin === 'all' ? undefined : origin,
            minWeight: weight[0],
            maxWeight: weight[1],
            limit: 12,
        });
        setItems(data);
        setLoading(false);
    }, [q, type, origin, weight]);

    React.useEffect(() => { load(); }, [load]);

    return (
        <Layout>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    py: { xs: 8, md: 12 },
                    // background: 'linear-gradient(135deg, rgba(26,26,26,0.85) 0%, rgba(231,200,115,0.25) 100%)',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url(/discover-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        // opacity: 0.2,
                        zIndex: -1,
                    },
                }}
            >
                <Container maxWidth="lg">
                    <Box textAlign="center">
                        <Typography variant="h2" component="h1" sx={{ fontWeight: 800, color: '#fff', mb: 2 }}>
                            Sản phẩm sâm cao cấp
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#f6f6f6', maxWidth: 720, mx: 'auto', lineHeight: 1.7 }}>
                            Chất lượng tinh tuyển, nguồn gốc minh bạch – Liên hệ để được tư vấn và báo giá tốt
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                {/* Filters */}
                <Paper elevation={0} sx={{ mb: 4, borderRadius: 3, p: { xs: 2, md: 3 }, border: '1px solid rgba(231,200,115,0.3)', background: 'linear-gradient(135deg, rgba(231,200,115,0.05) 0%, rgba(255,255,255,0.9) 100%)' }}>
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                        <TextField
                            placeholder="Tìm sản phẩm sâm..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            fullWidth
                            InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }}
                        />
                        <FormControl sx={{ minWidth: { xs: '100%', md: 220 } }}>
                            <InputLabel>Loại sâm</InputLabel>
                            <Select
                                label="Loại sâm"
                                value={type}
                                onChange={(e: SelectChangeEvent<string>) => setType(e.target.value as TypeFilter)}
                                MenuProps={{ disableScrollLock: true }}
                            >
                                {typeOptions.map(o => (<MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: { xs: '100%', md: 220 } }}>
                            <InputLabel>Xuất xứ</InputLabel>
                            <Select
                                label="Xuất xứ"
                                value={origin}
                                onChange={(e: SelectChangeEvent<string>) => setOrigin(e.target.value as OriginFilter)}
                                MenuProps={{ disableScrollLock: true }}
                            >
                                {originOptions.map(o => (<MenuItem key={o} value={o}>{o === 'all' ? 'Tất cả' : o}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            onClick={load}
                            sx={{
                                backgroundColor: '#E7C873',
                                color: '#1a1a1a',
                                '&:hover': { backgroundColor: '#d4b85a' },
                                whiteSpace: 'nowrap',
                                minWidth: 160,
                                height: { xs: 44, md: 56 },
                                borderRadius: 2,
                                flexShrink: 0,
                            }}
                        >
                            Tìm kiếm
                        </Button>
                    </Box>

                    <Divider sx={{ my: 2, borderColor: 'rgba(231,200,115,0.3)' }} />

                    <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">Trọng lượng (gram)</Typography>
                            <Slider
                                value={weight}
                                onChange={(_e, v) => setWeight(v as number[])}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000}
                                step={50}
                                sx={{ color: '#E7C873', '& .MuiSlider-thumb': { border: '2px solid #1a1a1a' } }}
                            />
                        </Box>
                    </Box>
                </Paper>

                {/* Product Grid */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {loading ? (
                        Array.from({ length: 6 }).map((_v, i) => (
                            <Box key={`s${i}`} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(33.333% - 20px)' } }}>
                                <Card sx={{ height: 320, borderRadius: 3, border: '1px solid rgba(231,200,115,0.25)', background: 'rgba(0,0,0,0.03)' }} />
                            </Box>
                        ))
                    ) : (
                        items.map((p: SamDTO) => (
                            <Box key={p.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(33.333% - 20px)' } }}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 3,
                                        boxShadow: '0 14px 32px rgba(0,0,0,0.12)',
                                        overflow: 'hidden',
                                        transition: 'transform .25s ease, box-shadow .25s ease',
                                        '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 44px rgba(0,0,0,0.16)' },
                                        border: '1px solid rgba(231,200,115,0.25)'
                                    }}
                                >
                                    <CardMedia component="img" height="260" image={p.image} alt={p.name} sx={{ objectFit: 'cover' }} />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" fontWeight={800} sx={{ mb: .5 }}>{p.name}</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>Xuất xứ: {p.origin} • {p.weightGram}g</Typography>
                                        <Typography fontWeight={800} sx={{ mb: 2, color: '#C79E3A' }}>{p.priceLabel}</Typography>
                                        <Button variant="contained" href={`tel:0123456789`} fullWidth sx={{ backgroundColor: '#E7C873', color: '#1a1a1a', '&:hover': { backgroundColor: '#d4b85a' }, borderRadius: 2 }}>Gọi tư vấn</Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))
                    )}
                </Box>

                {/* CTA Section */}
                <Box
                    sx={{
                        mt: 6,
                        textAlign: 'center',
                        py: 6,
                        px: 4,
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, rgba(231,200,115,0.12) 0%, rgba(255,255,255,0.9) 100%)',
                        border: '1px solid rgba(231,200,115,0.3)'
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 1.5, fontWeight: 800, color: '#1a1a1a' }}>
                        Cần tư vấn chi tiết hơn?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, color: '#666' }}>
                        Liên hệ đội ngũ MinhLoc để được hỗ trợ tận tâm và nhanh chóng.
                    </Typography>
                    <Button variant="contained" size="large" href={`tel:0123456789`} sx={{ backgroundColor: '#E7C873', color: '#1a1a1a', '&:hover': { backgroundColor: '#d4b85a' }, borderRadius: 2, px: 4 }}>
                        Gọi ngay 0123 456 789
                    </Button>
                </Box>
            </Container>
        </Layout>
    );
}
