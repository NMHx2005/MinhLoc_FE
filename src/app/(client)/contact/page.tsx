import type { Metadata } from 'next';
import Layout from '@/components/client/shared/Layout';
import { Container, Typography, Box, Card, CardContent, TextField, Button } from '@mui/material';
import { Phone, Email, LocationOn, Schedule } from '@mui/icons-material';

export const metadata: Metadata = {
    title: 'Liên Hệ - MinhLoc Group',
    description: 'Liên hệ với MinhLoc Group để được tư vấn về các dự án bất động sản. Hotline: +68 685 88666 | Email: hi@minhlocgroup.com',
    keywords: 'liên hệ, tư vấn bất động sản, MinhLoc Group, hotline, email, địa chỉ công ty',
    openGraph: {
        title: 'Liên Hệ - MinhLoc Group',
        description: 'Liên hệ với MinhLoc Group để được tư vấn về các dự án bất động sản.',
        images: ['/contact-og-image.jpg'],
    },
};

export default function ContactPage() {
    return (
        <Layout>
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box textAlign="center" mb={6}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Liên Hệ Với Chúng Tôi
                    </Typography>
                    <Typography variant="h5" color="text.secondary" paragraph>
                        Chúng tôi sẵn sàng hỗ trợ và tư vấn cho bạn
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    {/* Contact Information */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Thông Tin Liên Hệ
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
                            <Card>
                                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Phone color="primary" />
                                    <Box>
                                        <Typography variant="h6">Hotline</Typography>
                                        <Typography variant="body1">+68 685 88666</Typography>
                                    </Box>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Email color="primary" />
                                    <Box>
                                        <Typography variant="h6">Email</Typography>
                                        <Typography variant="body1">hi@minhlocgroup.com</Typography>
                                    </Box>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <LocationOn color="primary" />
                                    <Box>
                                        <Typography variant="h6">Địa Chỉ</Typography>
                                        <Typography variant="body1">
                                            123 Đường ABC, Quận 1<br />
                                            TP.HCM, Việt Nam
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Schedule color="primary" />
                                    <Box>
                                        <Typography variant="h6">Giờ Làm Việc</Typography>
                                        <Typography variant="body1">
                                            Thứ 2 - Thứ 6: 8:00 - 17:30<br />
                                            Thứ 7: 8:00 - 12:00
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>

                    {/* Contact Form */}
                    <Box sx={{ flex: 1 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" component="h2" gutterBottom>
                                    Gửi Tin Nhắn
                                </Typography>

                                <Box component="form" sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                                        <TextField
                                            fullWidth
                                            label="Họ và tên"
                                            variant="outlined"
                                            required
                                        />
                                        <TextField
                                            fullWidth
                                            label="Số điện thoại"
                                            variant="outlined"
                                            required
                                        />
                                    </Box>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Chủ đề"
                                        variant="outlined"
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Nội dung tin nhắn"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        required
                                    />
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        sx={{ py: 1.5 }}
                                    >
                                        Gửi Tin Nhắn
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.833317010418!2d105.81835567690494!3d20.95920789016068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad0399f92707%3A0x7f070aa44a38955e!2zMiBOZy4gMTA5IFAuIELhurFuZyBMaeG7h3QsIEhvw6BuZyBMaeG7h3QsIEhvw6BuZyBNYWksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1758197256353!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </Box>
            </Container>
        </Layout>
    );
}
