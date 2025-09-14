import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import EmotionRegistry from '@/lib/emotion-registry';
import ThemeProvider from '@/components/providers/ThemeProvider';
import StructuredData from '@/components/seo/StructuredData';
// import PerformanceMonitor from '@/components/common/PerformanceMonitor';
import ServiceWorker from '@/components/common/ServiceWorker';
// import PerformanceOptimizer from '@/components/common/PerformanceOptimizer';
// import FontLoaderOptimized from '@/components/common/FontLoaderOptimized';
// @ts-expect-error: Nếu file globals.css chưa tồn tại, hãy tạo file này trong src/app hoặc đảm bảo đường dẫn đúng.
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'MinhLoc Group - Bất Động Sản Cao Cấp',
    template: '%s | MinhLoc Group',
  },
  description: 'Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt.',
  keywords: [
    'bất động sản',
    'chung cư cao cấp',
    'biệt thự sang trọng',
    'đất nền đầu tư',
    'thương mại',
    'TP.HCM',
    'Hà Nội',
    'MinhLoc Group',
    'dự án bất động sản',
    'nhà đất',
    'đầu tư bất động sản',
    'căn hộ',
    'shophouse',
    'officetel'
  ],
  authors: [{ name: 'MinhLoc Group', url: 'https://minhlocgroup.com' }],
  creator: 'MinhLoc Group',
  publisher: 'MinhLoc Group',
  generator: 'Next.js',
  applicationName: 'MinhLoc Group',
  category: 'Real Estate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://minhlocgroup.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://minhlocgroup.com',
    title: 'MinhLoc Group - Bất Động Sản Cao Cấp',
    description: 'Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt.',
    siteName: 'MinhLoc Group',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MinhLoc Group - Bất Động Sản Cao Cấp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MinhLoc Group - Bất Động Sản Cao Cấp',
    description: 'Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt.',
    images: ['/og-image.jpg'],
    creator: '@minhlocgroup',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/Logo_MinhLocGroup.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" /></noscript>
        <link rel="preload" href="/banner.png" as="image" fetchPriority="high" />
        <link rel="preload" href="/Logo_MinhLocGroup.png" as="image" fetchPriority="high" />
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <link rel="preload" href="/_next/static/chunks/webpack.js" as="script" />
        <meta name="theme-color" content="#E7C873" />
        <meta name="msapplication-TileColor" content="#E7C873" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="emotion-insertion-point" content="" />
        <meta name="description" content="Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt. Chung cư, biệt thự, đất nền, thương mại." />
        <meta name="keywords" content="bất động sản, chung cư, biệt thự, đất nền, thương mại, TP.HCM, Hà Nội, MinhLoc Group, dự án bất động sản, nhà đất, đầu tư bất động sản" />
        <meta name="robots" content="index, follow" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MinhLoc Group" />
        <meta name="msapplication-TileImage" content="/Logo_MinhLocGroup.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="theme-color" content="#E7C873" />
        <meta name="color-scheme" content="light" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        <meta name="yahoo-site-verification" content="your-yahoo-verification-code" />
        <StructuredData />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            * { box-sizing: border-box; }
            body { 
              margin: 0; 
              padding: 0; 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              line-height: 1.6;
              color: #1a1a1a;
              background-color: #ffffff;
            }
            html { scroll-behavior: smooth; }
            .hero-section {
              position: relative;
              min-height: 100vh;
              background-image: url('/banner.png');
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              color: white;
              display: flex;
              flex-direction: column;
            }
            .hero-section::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.3);
              z-index: 1;
            }
            .hero-content {
              position: relative;
              z-index: 2;
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 80px 20px 20px;
            }
            .hero-title {
              font-size: 2.5rem;
              font-weight: bold;
              margin-bottom: 1rem;
              line-height: 1.1;
            }
            .hero-subtitle {
              font-size: 1.8rem;
              font-weight: 600;
              margin-bottom: 2rem;
            }
            .hero-cta {
              background-color: #E7C873;
              color: black;
              font-weight: bold;
              padding: 12px 24px;
              border-radius: 12px;
              border: none;
              font-size: 1rem;
              cursor: pointer;
              transition: background-color 0.3s ease;
            }
            .hero-cta:hover {
              background-color: #d4b85a;
            }
            .search-form {
              background-color: #1a1a1a;
              border-radius: 12px;
              padding: 24px;
              margin: 20px auto;
              max-width: 1200px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 8px 25px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
              position: relative;
              z-index: 2;
              border: 1px solid rgba(255,255,255,0.05);
              backdrop-filter: blur(10px);
            }
            .search-form-content {
              display: flex;
              flex-direction: column;
              gap: 24px;
              align-items: stretch;
            }
            @media (min-width: 768px) {
              .search-form-content {
                flex-direction: row;
                gap: 0;
                align-items: center;
              }
              .hero-title {
                font-size: 4rem;
              }
              .hero-content {
                padding: 160px 20px 20px;
              }
            }
            .skeleton {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
            }
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            .prevent-shift {
              min-height: 200px;
            }
            .MuiAppBar-root {
              background-color: transparent !important;
              box-shadow: none !important;
              border-bottom: none !important;
            }
            .MuiToolbar-root {
              box-shadow: none !important;
              border-bottom: none !important;
            }
            .MuiButton-root {
              text-transform: none !important;
            }
            .MuiTypography-root {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
            }
            /* Prevent layout shift */
            .hero-section {
              min-height: 100vh;
              contain: layout style paint;
            }
            .search-form {
              contain: layout style paint;
            }
            /* Optimize font loading */
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 300 700;
              font-display: swap;
              src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2') format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            /* Critical above-the-fold styles */
            .hero-section {
              background-image: url('/banner.png');
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              position: relative;
              will-change: transform;
              contain: layout style paint;
            }
            .hero-section::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.3);
              z-index: 1;
            }
            .hero-content {
              position: relative;
              z-index: 2;
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 80px 20px 20px;
            }
            .hero-title {
              font-size: 2.5rem;
              font-weight: bold;
              margin-bottom: 1rem;
              line-height: 1.1;
              color: white;
            }
            .hero-subtitle {
              font-size: 1.8rem;
              font-weight: 600;
              margin-bottom: 2rem;
              color: white;
            }
            .hero-cta {
              background-color: #E7C873;
              color: black;
              font-weight: bold;
              padding: 12px 24px;
              border-radius: 12px;
              border: none;
              font-size: 1rem;
              cursor: pointer;
              transition: background-color 0.3s ease;
            }
            .hero-cta:hover {
              background-color: #d4b85a;
            }
            .search-form {
              background-color: #1a1a1a;
              border-radius: 12px;
              padding: 24px;
              margin: 20px auto;
              max-width: 1200px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 8px 25px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
              position: relative;
              z-index: 2;
              border: 1px solid rgba(255,255,255,0.05);
              backdrop-filter: blur(10px);
            }
            .search-form-content {
              display: flex;
              flex-direction: column;
              gap: 24px;
              align-items: stretch;
            }
            @media (min-width: 768px) {
              .search-form-content {
                flex-direction: row;
                gap: 0;
                align-items: center;
              }
              .hero-title {
                font-size: 4rem;
              }
              .hero-content {
                padding: 160px 20px 20px;
              }
            }
          `
        }} />
      </head>
      <body className={inter.className}>
        <EmotionRegistry>
          <ThemeProvider>
            {children}
            {/* <PerformanceMonitor /> */}
            <ServiceWorker />
            {/* <PerformanceOptimizer /> */}
            {/* <FontLoaderOptimized /> */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </ThemeProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}