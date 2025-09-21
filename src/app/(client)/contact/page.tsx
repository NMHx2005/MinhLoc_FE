import type { Metadata } from 'next';
import Layout from '@/components/client/shared/Layout';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    IconButton
} from '@mui/material';
import {
    Phone,
    Email,
    LocationOn,
    Schedule,
    Send,
    Facebook,
    YouTube,
    LinkedIn,
    WhatsApp,
    ArrowForward
} from '@mui/icons-material';

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
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: 'url("https://datxanhmiennam.com.vn/Data/Sites/1/Banner/bnlh.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    pt: { xs: 12, md: 16 }, // Thêm padding-top để tránh header
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
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                mb: 3,
                            }}
                        >
                            Liên Hệ Với Chúng Tôi
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: { xs: '1.1rem', md: '1.3rem' },
                                fontWeight: 400,
                                maxWidth: '600px',
                                mx: 'auto',
                            }}
                        >
                            Chúng tôi sẵn sàng hỗ trợ và tư vấn cho bạn về các dự án bất động sản tốt nhất
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 8, pt: { xs: 4, md: 6 } }}>

                {/* Contact Information & Form */}
                <Grid container spacing={6}>
                    {/* Contact Information */}
                    <Grid item xs={12} lg={5}>
                        <Box data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    color: '#E7C873',
                                    fontWeight: 700,
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    mb: 4,
                                }}
                            >
                                Thông Tin Liên Hệ
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {/* Hotline Card */}
                                <Card
                                    data-aos="zoom-in"
                                    data-aos-duration="800"
                                    data-aos-delay="400"
                                    sx={{
                                        background: 'linear-gradient(135deg, #E7C873 0%, #d4b85a 100%)',
                                        color: 'white',
                                        borderRadius: 1,
                                        boxShadow: '0 8px 32px rgba(231, 200, 115, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 40px rgba(231, 200, 115, 0.4)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3 }}>
                                        <Box
                                            sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                borderRadius: '50%',
                                                p: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Phone sx={{ fontSize: '2rem' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                                Hotline
                                            </Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                1900232427
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                Hỗ trợ 24/7
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>

                                {/* Email Card */}
                                <Card
                                    data-aos="zoom-in"
                                    data-aos-duration="800"
                                    data-aos-delay="500"
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: 1,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                        border: '1px solid #f0f0f0',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3 }}>
                                        <Box
                                            sx={{
                                                backgroundColor: '#E7C873',
                                                borderRadius: '50%',
                                                p: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Email sx={{ fontSize: '2rem', color: 'white' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                                                Email
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                                                hi@minhlocgroup.com
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>

                                {/* Address Card */}
                                <Card
                                    data-aos="zoom-in"
                                    data-aos-duration="800"
                                    data-aos-delay="600"
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: 1,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                        border: '1px solid #f0f0f0',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, p: 3 }}>
                                        <Box
                                            sx={{
                                                backgroundColor: '#E7C873',
                                                borderRadius: '50%',
                                                p: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mt: 0.5,
                                            }}
                                        >
                                            <LocationOn sx={{ fontSize: '2rem', color: 'white' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                                                Địa Chỉ
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                                                Tầng 10, Tòa nhà ABC<br />
                                                123 Đường Nguyễn Huệ, Quận 1<br />
                                                TP. Hồ Chí Minh, Việt Nam
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>

                                {/* Working Hours Card */}
                                <Card
                                    data-aos="zoom-in"
                                    data-aos-duration="800"
                                    data-aos-delay="700"
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: 1,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                        border: '1px solid #f0f0f0',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, p: 3 }}>
                                        <Box
                                            sx={{
                                                backgroundColor: '#E7C873',
                                                borderRadius: '50%',
                                                p: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mt: 0.5,
                                            }}
                                        >
                                            <Schedule sx={{ fontSize: '2rem', color: 'white' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                                                Giờ Làm Việc
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                                                Thứ 2 - Thứ 6: 8:00 - 17:30<br />
                                                Thứ 7: 8:00 - 12:00<br />
                                                Chủ nhật: Nghỉ
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>

                                {/* Social Media */}
                                <Box data-aos="fade-up" data-aos-duration="800" data-aos-delay="800" sx={{ mt: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                                        Kết Nối Với Chúng Tôi
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <IconButton
                                            sx={{
                                                backgroundColor: '#1877F2',
                                                color: 'white',
                                                '&:hover': { backgroundColor: '#166FE5' },
                                            }}
                                        >
                                            <Facebook />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                backgroundColor: '#FF0000',
                                                color: 'white',
                                                '&:hover': { backgroundColor: '#E60000' },
                                            }}
                                        >
                                            <YouTube />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                backgroundColor: '#25D366',
                                                color: 'white',
                                                '&:hover': { backgroundColor: '#1DA851' },
                                            }}
                                        >
                                            <WhatsApp />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                backgroundColor: '#0077B5',
                                                color: 'white',
                                                '&:hover': { backgroundColor: '#005885' },
                                            }}
                                        >
                                            <LinkedIn />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Contact Form */}
                    <Grid item xs={12} lg={7}>
                        <Box data-aos="fade-left" data-aos-duration="1000" data-aos-delay="300">
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    color: '#E7C873',
                                    fontWeight: 700,
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    mb: 4,
                                }}
                            >
                                Gửi Tin Nhắn
                            </Typography>

                            <Card
                                sx={{
                                    borderRadius: 1,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    border: '1px solid #f0f0f0',
                                    overflow: 'hidden',
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Họ và tên"
                                                    variant="outlined"
                                                    required
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 1,
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
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Số điện thoại"
                                                    variant="outlined"
                                                    required
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 1,
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
                                                />
                                            </Grid>
                                        </Grid>

                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1,
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
                                        />

                                        <TextField
                                            fullWidth
                                            label="Chủ đề"
                                            variant="outlined"
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1,
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
                                        />

                                        <TextField
                                            fullWidth
                                            label="Nội dung tin nhắn"
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1,
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
                                        />

                                        <Button
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            endIcon={<Send />}
                                            sx={{
                                                backgroundColor: '#E7C873',
                                                color: 'black',
                                                fontWeight: 700,
                                                fontSize: '1.1rem',
                                                py: 2,
                                                borderRadius: 1,
                                                textTransform: 'none',
                                                boxShadow: '0 4px 20px rgba(231, 200, 115, 0.3)',
                                                '&:hover': {
                                                    backgroundColor: '#d4b85a',
                                                    boxShadow: '0 6px 25px rgba(231, 200, 115, 0.4)',
                                                    transform: 'translateY(-2px)',
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Gửi Tin Nhắn
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>

                {/* Map Section */}
                <Box sx={{ mt: { xs: 6, md: 8 } }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        sx={{
                            color: '#E7C873',
                            fontWeight: 700,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            textAlign: 'center',
                            mb: 4,
                        }}
                    >
                        Vị Trí Văn Phòng
                    </Typography>

                    <Box
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                        sx={{
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                            border: '1px solid #f0f0f0',
                        }}
                    >
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
                </Box>

                {/* Call to Action Section */}
                <Box
                    sx={{
                        backgroundImage: 'url("https://datxanhmiennam.com.vn/Data/Sites/1/skins/default/images/parameter_bg.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        borderRadius: 4,
                        mt: { xs: 6, md: 8 },
                        py: 6,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: 4,
                            zIndex: 1,
                        }
                    }}
                >
                    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                        <Box textAlign="center" data-aos="fade-up" data-aos-duration="1000">
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    mb: 3,
                                }}
                            >
                                Sẵn Sàng Bắt Đầu?
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontSize: { xs: '1rem', md: '1.2rem' },
                                    fontWeight: 400,
                                    mb: 4,
                                }}
                            >
                                Liên hệ ngay với chúng tôi để được tư vấn miễn phí về các dự án bất động sản tốt nhất
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForward />}
                                sx={{
                                    backgroundColor: '#E7C873',
                                    color: 'black',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    px: 6,
                                    py: 2,
                                    borderRadius: 1,
                                    textTransform: 'none',
                                    boxShadow: '0 4px 20px rgba(231, 200, 115, 0.3)',
                                    '&:hover': {
                                        backgroundColor: '#d4b85a',
                                        boxShadow: '0 6px 25px rgba(231, 200, 115, 0.4)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Liên Hệ Ngay
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Container>
        </Layout>
    );
}
