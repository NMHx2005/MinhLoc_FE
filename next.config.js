/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    unoptimized: false,
    qualities: [25, 50, 75, 85, 95], // Add quality configuration
  },

  // Compression
  compress: true,

  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Webpack configuration for better bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 5000,
        maxSize: 150000,
        maxAsyncRequests: 50,
        maxInitialRequests: 50,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            enforce: true,
            maxSize: 100000,
          },
          mui: {
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            name: 'mui',
            chunks: 'all',
            priority: 20,
            enforce: true,
            maxSize: 80000,
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer',
            chunks: 'all',
            priority: 15,
            enforce: true,
            maxSize: 60000,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 25,
            enforce: true,
            maxSize: 50000,
          },
          emotion: {
            test: /[\\/]node_modules[\\/]@emotion[\\/]/,
            name: 'emotion',
            chunks: 'all',
            priority: 18,
            enforce: true,
            maxSize: 40000,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
            maxSize: 30000,
          },
        },
      };
    }

    // Tree shaking optimization (compatible with Next.js)
    if (config.optimization.usedExports !== false) {
      config.optimization.usedExports = true;
    }
    if (config.optimization.sideEffects !== false) {
      config.optimization.sideEffects = false;
    }

    // Module concatenation for better performance
    config.optimization.concatenateModules = true;

    // Remove console logs in production
    if (!dev) {
      config.optimization.minimizer = config.optimization.minimizer || [];
      config.optimization.minimizer.push(
        new (require('terser-webpack-plugin'))({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        })
      );
    }

    return config;
  },

  // Output configuration
  output: 'standalone',

  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Advanced compression
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
    gzipSize: true,
  },
  
  // Performance optimizations
  reactStrictMode: true,

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

module.exports = nextConfig;
