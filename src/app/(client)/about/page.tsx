import type { Metadata } from 'next';
import Layout from '@/components/client/shared/Layout';
import { Container, Typography, Box } from '@mui/material';

export const metadata: Metadata = {
    title: 'Về Chúng Tôi - MinhLoc Group',
    description: 'Tìm hiểu về MinhLoc Group - Công ty bất động sản uy tín với hơn 10 năm kinh nghiệm trong lĩnh vực đầu tư và phát triển bất động sản.',
    keywords: 'về chúng tôi, MinhLoc Group, công ty bất động sản, lịch sử công ty, đội ngũ, tầm nhìn, sứ mệnh',
    openGraph: {
        title: 'Về Chúng Tôi - MinhLoc Group',
        description: 'Tìm hiểu về MinhLoc Group - Công ty bất động sản uy tín với hơn 10 năm kinh nghiệm.',
        images: ['/about-og-image.jpg'],
    },
};

export default function AboutPage() {
    return (
        <Layout>
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box textAlign="center" mb={6}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Về Chúng Tôi
                    </Typography>
                    <Typography variant="h5" color="text.secondary" paragraph>
                        MinhLoc Group - Đối tác tin cậy trong lĩnh vực bất động sản
                    </Typography>
                </Box>

                <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                    <Typography variant="body1" paragraph>
                        MinhLoc Group là một trong những công ty bất động sản hàng đầu tại Việt Nam,
                        với hơn 10 năm kinh nghiệm trong lĩnh vực đầu tư và phát triển bất động sản.
                        Chúng tôi tự hào mang đến những dự án chất lượng cao, đáp ứng nhu cầu đa dạng
                        của khách hàng từ chung cư, biệt thự đến các dự án thương mại.
                    </Typography>

                    <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
                        Tầm Nhìn
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Trở thành công ty bất động sản hàng đầu Việt Nam, được khách hàng tin tưởng
                        và đối tác đánh giá cao về chất lượng sản phẩm và dịch vụ.
                    </Typography>

                    <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
                        Sứ Mệnh
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Mang đến những không gian sống và làm việc chất lượng cao, góp phần xây dựng
                        cộng đồng phát triển bền vững và thịnh vượng.
                    </Typography>

                    <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2 }}>
                        Giá Trị Cốt Lõi
                    </Typography>
                    <Typography variant="body1" paragraph>
                        - <strong>Chất lượng:</strong> Cam kết mang đến sản phẩm và dịch vụ chất lượng cao nhất<br />
                        - <strong>Uy tín:</strong> Xây dựng lòng tin thông qua sự minh bạch và trung thực<br />
                        - <strong>Đổi mới:</strong> Liên tục cải tiến và áp dụng công nghệ tiên tiến<br />
                        - <strong>Khách hàng:</strong> Đặt nhu cầu khách hàng làm trung tâm trong mọi hoạt động
                    </Typography>
                </Box>
            </Container>
        </Layout>
    );
}
