// import type { Metadata } from 'next';
import Layout from '@/components/client/shared/Layout';
import HeroSection from '@/components/client/shared/HeroSection';
import FeaturedProjects from '@/components/client/Home/FeaturedProjects';
import ProjectsUnderDevelopment from '@/components/client/Home/ProjectsUnderDevelopment';
import CompanyDesire from '@/components/client/Home/CompanyDesire';
import BusinessAreas from '@/components/client/Home/BusinessAreas';
import Statistics from '@/components/client/Home/Statistics';
import NewsSection from '@/components/client/Home/NewsSection';

// export const metadata: Metadata = {
//   title: 'MinhLoc Group - Bất Động Sản Cao Cấp | Dự Án Uy Tín Tại TP.HCM & Hà Nội',
//   description: 'Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt. Chung cư, biệt thự, đất nền, thương mại.',
//   keywords: 'bất động sản, chung cư, biệt thự, đất nền, thương mại, TP.HCM, Hà Nội, MinhLoc Group, dự án bất động sản, nhà đất, đầu tư bất động sản',
//   authors: [{ name: 'MinhLoc Group' }],
//   creator: 'MinhLoc Group',
//   publisher: 'MinhLoc Group',
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   metadataBase: new URL('https://minhlocgroup.com'),
//   openGraph: {
//     title: 'MinhLoc Group - Bất Động Sản Cao Cấp',
//     description: 'Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt.',
//     images: ['/og-image.jpg'],
//     url: 'https://minhlocgroup.com',
//     siteName: 'MinhLoc Group',
//     locale: 'vi_VN',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'MinhLoc Group - Bất Động Sản Cao Cấp',
//     description: 'Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt.',
//     images: ['/og-image.jpg'],
//   },
//   alternates: {
//     canonical: 'https://minhlocgroup.com',
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
// };

export default function HomePage() {
  return (
    <>
      <Layout>
        <HeroSection />
        <FeaturedProjects />
        <ProjectsUnderDevelopment />
        <CompanyDesire />
        <BusinessAreas />
        <Statistics />
        <NewsSection />
      </Layout>
    </>
  );
}