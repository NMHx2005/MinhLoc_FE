import type { Metadata } from 'next';
import Layout from '@/components/client/shared/Layout';
import HeroSection from '@/components/client/shared/HeroSection';
import SimpleLazySection from '@/components/common/SimpleLazySection';
import SimpleCityProperties from '@/components/client/Home/SimpleCityProperties';
import SimpleWhyChooseUs from '@/components/client/Home/SimpleWhyChooseUs';
import SignInCTA from '@/components/client/Home/SignInCTA';
import SimpleFeaturedProperties from '@/components/client/Home/SimpleFeaturedProperties';
import DiscoverSection from '@/components/client/Home/DiscoverSection';
import AboutSection from '@/components/client/Home/AboutSection';
import TestimonialsSection from '@/components/client/Home/TestimonialsSection';
import PartnersSection from '@/components/client/Home/PartnersSection';
import RecentArticlesSection from '@/components/client/Home/RecentArticlesSection';

export const metadata: Metadata = {
  title: 'MinhLoc Group - Bất Động Sản Cao Cấp | Dự Án Uy Tín Tại TP.HCM & Hà Nội',
  description: 'Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt. Chung cư, biệt thự, đất nền, thương mại.',
  keywords: 'bất động sản, chung cư, biệt thự, đất nền, thương mại, TP.HCM, Hà Nội, MinhLoc Group, dự án bất động sản, nhà đất, đầu tư bất động sản',
  authors: [{ name: 'MinhLoc Group' }],
  creator: 'MinhLoc Group',
  publisher: 'MinhLoc Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://minhlocgroup.com'),
  openGraph: {
    title: 'MinhLoc Group - Bất Động Sản Cao Cấp',
    description: 'Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt.',
    images: ['/og-image.jpg'],
    url: 'https://minhlocgroup.com',
    siteName: 'MinhLoc Group',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MinhLoc Group - Bất Động Sản Cao Cấp',
    description: 'Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://minhlocgroup.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Layout>
        <SimpleLazySection threshold={0.1} fallbackHeight={300} delay={100}>
          <SimpleCityProperties />
        </SimpleLazySection>
        <SimpleLazySection threshold={0.1} fallbackHeight={400} delay={200}>
          <SimpleWhyChooseUs />
        </SimpleLazySection>
        <SimpleLazySection threshold={0.1} fallbackHeight={200} delay={300}>
          <SignInCTA />
        </SimpleLazySection>
        <SimpleLazySection threshold={0.1} fallbackHeight={500} delay={400}>
          <SimpleFeaturedProperties />
        </SimpleLazySection>
        <DiscoverSection />
        <SimpleLazySection threshold={0.1} fallbackHeight={600} delay={500}>
          <AboutSection />
        </SimpleLazySection>
        <TestimonialsSection />
        <PartnersSection />
        <SimpleLazySection threshold={0.1} fallbackHeight={500} delay={600}>
          <RecentArticlesSection />
        </SimpleLazySection>
      </Layout>
    </>
  );
}