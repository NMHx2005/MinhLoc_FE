# MinhLoc Group - Next.js Frontend

Dự án frontend cho MinhLoc Group được xây dựng với Next.js 14, TypeScript, và Material-UI để đạt SEO score 99-100 điểm.

## 🚀 Tính Năng

### SEO Optimization
- ✅ **Server-Side Rendering (SSR)** - Content sẵn sàng cho search engines
- ✅ **Static Site Generation (SSG)** - Pre-render pages tại build time
- ✅ **Meta Tags** - Tự động generate meta tags cho mỗi page
- ✅ **Open Graph** - Social media sharing optimization
- ✅ **Sitemap.xml** - Tự động generate sitemap
- ✅ **Robots.txt** - Search engine crawling rules
- ✅ **Structured Data** - JSON-LD cho bất động sản
- ✅ **Image Optimization** - Next.js Image component với WebP/AVIF
- ✅ **Performance** - Lighthouse score 95-100

### UI/UX Features
- ✅ **Material-UI** - Component library với custom theme
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark/Light Theme** - Theme switching support
- ✅ **Animations** - Framer Motion cho smooth transitions
- ✅ **Loading States** - Skeleton loaders và loading indicators

### State Management
- ✅ **Zustand** - Lightweight state management
- ✅ **Persistent Storage** - LocalStorage integration
- ✅ **Type Safety** - Full TypeScript support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Material-UI v7
- **Styling**: Emotion (CSS-in-JS)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Yup
- **Icons**: Material-UI Icons + React Icons
- **Date Handling**: Day.js
- **Notifications**: React Hot Toast

## 📁 Cấu Trúc Dự Án

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout với SEO config
│   ├── page.tsx           # Trang chủ
│   ├── projects/          # Trang dự án
│   ├── about/             # Trang về chúng tôi
│   ├── contact/           # Trang liên hệ
│   ├── admin/             # Admin dashboard
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt generation
├── components/            # React components
│   ├── client/            # Client-side components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── Footer.tsx     # Footer
│   │   ├── Layout.tsx     # Page layout
│   │   └── HeroBanner.tsx # Hero section
│   └── admin/             # Admin components
├── lib/                   # Utilities và config
│   ├── theme.ts           # Material-UI theme
│   ├── config.ts          # App configuration
│   └── api.ts             # Axios configuration
├── services/              # API services
│   └── userService.ts     # User API calls
└── store/                 # State management
    ├── useAppStore.ts     # Global app state
    └── useAuthStore.ts    # Authentication state
```

## 🚀 Cài Đặt & Chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Tạo file environment variables
```bash
cp .env.example .env.local
```

### 3. Chạy development server
```bash
npm run dev
```

### 4. Build cho production
```bash
npm run build
npm start
```

## 🔧 Cấu Hình

### Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# App Configuration
NEXT_PUBLIC_APP_NAME=MinhLoc Group
NEXT_PUBLIC_APP_VERSION=1.0.0

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=true

# SEO
NEXT_PUBLIC_SITE_URL=https://minhlocgroup.com
NEXT_PUBLIC_SITE_NAME=MinhLoc Group
```

### SEO Configuration
- **Meta Tags**: Tự động generate cho mỗi page
- **Open Graph**: Social media optimization
- **Twitter Cards**: Twitter sharing optimization
- **Sitemap**: Tự động generate sitemap.xml
- **Robots**: Search engine crawling rules
- **Structured Data**: JSON-LD cho bất động sản

## 📊 Performance Optimization

### Next.js Features
- **Image Optimization**: WebP/AVIF format support
- **Code Splitting**: Automatic bundle splitting
- **Tree Shaking**: Remove unused code
- **Compression**: Gzip/Brotli compression
- **Caching**: Static asset caching

### Bundle Analysis
```bash
npm run build
npm run analyze
```

## 🎨 Theme Customization

### Color Palette
- **Primary**: #E7C873 (Gold)
- **Secondary**: #1F4B43 (Navy)
- **Background**: #ffffff (White)
- **Text**: #1A1A1A (Dark)

### Typography
- **Font Family**: Inter, Roboto, Helvetica, Arial
- **Responsive**: Mobile-first approach
- **Custom Components**: Buttons, Cards, AppBar

## 🔍 SEO Checklist

### Technical SEO
- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ Meta tags optimization
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Structured data (JSON-LD)

### Performance
- ✅ Image optimization
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Compression
- ✅ CDN ready

### Content SEO
- ✅ Semantic HTML
- ✅ Heading hierarchy
- ✅ Alt text cho images
- ✅ Internal linking
- ✅ Mobile-first design

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px
- **Large Desktop**: > 1200px

### Mobile Features
- **Touch-friendly**: Large buttons và touch targets
- **Optimized Images**: Responsive image loading
- **Hamburger Menu**: Mobile navigation
- **Swipe Gestures**: Touch interactions

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t minhloc-frontend .
docker run -p 3000:3000 minhloc-frontend
```

### Static Export
```bash
npm run build
npm run export
```

## 📈 SEO Score Expectations

| Metric | Score |
|--------|-------|
| **Lighthouse SEO** | 95-100 |
| **First Contentful Paint** | 0.5-1.5s |
| **Largest Contentful Paint** | 1-2s |
| **Cumulative Layout Shift** | 0-0.1 |
| **Time to Interactive** | 1.5-3s |
| **Mobile Performance** | 85-95 |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: hi@minhlocgroup.com
- **Phone**: +68 685 88666
- **Website**: https://minhlocgroup.com

---

**MinhLoc Group** - Bất Động Sản Cao Cấp | Uy Tín - Chất Lượng - Giá Tốt