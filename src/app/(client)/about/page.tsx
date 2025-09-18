import type { Metadata } from 'next';
import Layout from '@/components/client/shared/Layout';
import { Container, Typography, Box, Card, CardMedia, CardContent, Divider, Chip } from '@mui/material';

export const metadata: Metadata = {
    title: 'Về Minh Lộc Group | Tập đoàn BĐS & Nhân sâm cao cấp',
    description: 'Minh Lộc Group hoạt động trong lĩnh vực bất động sản và kinh doanh nhân sâm cao cấp, hướng tới giá trị thịnh vượng bền vững.',
    openGraph: {
        title: 'Về Minh Lộc Group',
        description: 'BĐS – Sức khỏe – Bền vững',
        images: ['/og-image.jpg'],
    },
};

const fadeAnim = { animation: 'fadeUp .6s ease both' } as const;

export default function AboutPage() {
    return (
        <Layout>
            <Container maxWidth="lg" sx={{ py: 6, '@keyframes fadeUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
                <Box textAlign="center" mb={6} sx={fadeAnim}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Minh Lộc Group
                    </Typography>
                    <Typography variant="h5" color="text.secondary" paragraph>
                        Bất động sản đẳng cấp • Nhân sâm cao cấp – Hướng tới thịnh vượng bền vững
                    </Typography>
                    <Divider sx={{ width: 120, height: 4, mx: 'auto', backgroundColor: '#E7C873', borderRadius: 2 }} />
                </Box>

                {/* Intro with image */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, ...fadeAnim }}>
                    <Box sx={{ flex: 1 }}>
                        <Card sx={{ overflow: 'hidden' }}>
                            <CardMedia component="img" height="320" image="/article-1.png" alt="Minh Lộc Group" />
                        </Card>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography>
                                    Minh Lộc Group tự hào là một trong những công ty hàng đầu tại Việt Nam, hoạt động trong hai lĩnh vực chính: bất động sản và kinh doanh nhân sâm cao cấp. Với tầm nhìn trở thành biểu tượng của sự thịnh vượng và bền vững, chúng tôi không ngừng nỗ lực mang lại giá trị vượt trội cho khách hàng, đối tác và cộng đồng.
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    Thương hiệu Minh Lộc kết hợp sự chuyên nghiệp trong bất động sản với sự tận tâm trong việc cung cấp các sản phẩm chăm sóc sức khỏe chất lượng cao – trọng tâm là nhân sâm, dược liệu quý từ thiên nhiên.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

                {/* Real estate section */}
                <Box mt={6} sx={fadeAnim}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Lĩnh vực bất động sản
                    </Typography>
                    <Divider sx={{ width: 80, height: 4, backgroundColor: '#E7C873', borderRadius: 2, mb: 2 }} />
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        <Box sx={{ flex: 1.2 }}>
                            <Typography>
                                Minh Lộc Group phát triển đa dạng sản phẩm từ nhà ở, căn hộ cao cấp, khu đô thị hiện đại đến thương mại – nghỉ dưỡng. Chúng tôi tạo ra không gian sống chất lượng, kết hợp thiết kế hiện đại, tiện ích đẳng cấp và môi trường sống xanh, bền vững. Mỗi dự án được triển khai bởi đội ngũ kiến trúc sư, kỹ sư và nhà thầu hàng đầu, tuân thủ tiêu chuẩn quốc tế và pháp lý minh bạch.
                            </Typography>
                            <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                                {['Không gian sống xanh', 'Tiện ích nội khu', 'Pháp lý minh bạch', 'Chất lượng quốc tế'].map((t) => (
                                    <Chip key={t} label={t} sx={{ backgroundColor: 'rgba(231,200,115,0.18)', border: '1px solid #E7C873' }} />
                                ))}
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Card>
                                <CardMedia component="img" height="260" image="/article-2.png" alt="Dự án bất động sản" />
                            </Card>
                        </Box>
                    </Box>
                </Box>

                {/* Ginseng section */}
                <Box mt={6} sx={fadeAnim}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Lĩnh vực kinh doanh nhân sâm
                    </Typography>
                    <Divider sx={{ width: 80, height: 4, backgroundColor: '#E7C873', borderRadius: 2, mb: 2 }} />
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        <Box sx={{ flex: 1 }}>
                            <Card>
                                <CardMedia component="img" height="260" image="/article-3.png" alt="Sản phẩm nhân sâm" />
                            </Card>
                        </Box>
                        <Box sx={{ flex: 1.2 }}>
                            <Typography>
                                Minh Lộc Group phân phối các sản phẩm nhân sâm cao cấp (sâm tươi, sâm khô, cao sâm, trà sâm, thực phẩm chức năng và mỹ phẩm từ sâm) được kiểm định nghiêm ngặt, đảm bảo độ tinh khiết và hàm lượng dưỡng chất cao. Chúng tôi hợp tác cùng chuyên gia dược liệu để mang đến giải pháp chăm sóc sức khỏe toàn diện.
                            </Typography>
                            <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                                {['Nguồn gốc rõ ràng', 'Hàm lượng dưỡng chất cao', 'Phù hợp nhiều đối tượng', 'Sản phẩm nội địa từ vùng núi Việt Nam'].map((t) => (
                                    <Chip key={t} label={t} sx={{ backgroundColor: 'rgba(231,200,115,0.18)', border: '1px solid #E7C873' }} />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Vision & mission */}
                <Box mt={6} sx={fadeAnim}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Tầm nhìn & Sứ mệnh
                    </Typography>
                    <Divider sx={{ width: 80, height: 4, backgroundColor: '#E7C873', borderRadius: 2, mb: 2 }} />
                    <Typography>
                        Tầm nhìn: trở thành tập đoàn đa ngành hàng đầu, vươn tầm khu vực và thế giới, kiến tạo giá trị bền vững cho khách hàng và cộng đồng.
                        Sứ mệnh: mang lại sự hài lòng tối đa, tạo cơ hội đầu tư an toàn – hiệu quả, đồng thời thúc đẩy các hoạt động xã hội và bảo vệ môi trường.
                    </Typography>
                </Box>

                {/* Core values */}
                <Box mt={6} sx={fadeAnim}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Đội ngũ & Giá trị cốt lõi
                    </Typography>
                    <Divider sx={{ width: 80, height: 4, backgroundColor: '#E7C873', borderRadius: 2, mb: 2 }} />
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        <Box sx={{ flex: 1 }}>
                            <Card>
                                <CardMedia component="img" height="260" image="/article-4.png" alt="Đội ngũ Minh Lộc" />
                            </Card>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography>
                                Minh Lộc Group sở hữu đội ngũ chuyên nghiệp, giàu kinh nghiệm và tâm huyết. Chúng tôi coi sự tận tâm và sáng tạo là chìa khóa tạo nên khác biệt.
                            </Typography>
                            <Box mt={2} component="ul" sx={{ pl: 3, m: 0 }}>
                                {[
                                    'Uy tín: Minh bạch và trung thực',
                                    'Chất lượng: Tiêu chuẩn cao nhất',
                                    'Sáng tạo: Đổi mới liên tục',
                                    'Bền vững: Gắn kết cộng đồng & môi trường',
                                ].map((it, idx) => (
                                    <Box key={idx} component="li" sx={{ mb: 1 }}>
                                        <Typography>{it}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
}
