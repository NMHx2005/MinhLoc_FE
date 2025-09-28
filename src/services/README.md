# Services Architecture

## Cấu trúc thư mục

```
src/services/
├── admin/                    # Admin-specific services
│   ├── dashboardService.ts   # Dashboard API
│   ├── projectService.ts     # Project management
│   ├── userService.ts        # User management
│   ├── newsService.ts        # News & articles
│   └── contentService.ts     # Static pages & banners
├── client/                   # Client-facing services
├── authService.ts           # Authentication
├── userService.ts           # Legacy user service
├── projectService.ts        # Legacy project service
└── index.ts                 # Export all services
```

## Sử dụng Services

### 1. Dashboard Service

```typescript
import { dashboardService } from '@/services/admin/dashboardService';

// Lấy tổng quan dashboard
const overview = await dashboardService.getOverview();

// Lấy biểu đồ doanh thu
const revenueData = await dashboardService.getRevenueChart('12months');

// Lấy tất cả dữ liệu dashboard
const allData = await dashboardService.getAllDashboardData();
```

### 2. Project Service

```typescript
import { projectService } from '@/services/admin/projectService';

// Lấy danh sách dự án với filter
const projects = await projectService.getProjects({
  type: 'apartment',
  status: 'active',
  city: 'TP.HCM',
  page: 1,
  limit: 10
});

// Tạo dự án mới
const newProject = await projectService.createProject({
  name: 'Dự án mới',
  type: 'apartment',
  status: 'planning',
  location: 'Quận 1, TP.HCM',
  city: 'TP.HCM',
  district: 'Quận 1',
  description: 'Mô tả dự án',
  features: ['Hồ bơi', 'Gym'],
  totalUnits: 100,
  revenue: 1000000000,
  startDate: '2024-01-01'
});
```

### 3. User Service

```typescript
import { userService } from '@/services/admin/userService';

// Lấy danh sách users
const users = await userService.getUsers({
  role: 'admin',
  status: 'active',
  page: 1,
  limit: 20
});

// Tạo user mới
const newUser = await userService.createUser({
  email: 'user@example.com',
  password: 'password123',
  fullName: 'Nguyễn Văn A',
  role: 'editor',
  type: 'staff'
});
```

### 4. News Service

```typescript
import { newsService, newsCategoryService } from '@/services/admin/newsService';

// Lấy danh sách tin tức
const articles = await newsService.getArticles({
  category: 'real-estate',
  status: 'published',
  isFeatured: true
});

// Tạo tin tức mới
const newArticle = await newsService.createArticle({
  title: 'Tin tức mới',
  content: 'Nội dung tin tức...',
  category: 'real-estate',
  tags: ['bất động sản', 'tin tức'],
  status: 'published'
});

// Quản lý categories
const categories = await newsCategoryService.getCategories();
```

### 5. Content Service

```typescript
import { staticPageService, bannerService } from '@/services/admin/contentService';

// Quản lý trang tĩnh
const pages = await staticPageService.getPages({
  status: 'published',
  isActive: true
});

const newPage = await staticPageService.createPage({
  title: 'Trang về chúng tôi',
  content: 'Nội dung trang...',
  status: 'published'
});

// Quản lý banner
const banners = await bannerService.getBanners({
  type: 'hero',
  status: 'active'
});

const newBanner = await bannerService.createBanner({
  title: 'Banner chính',
  image: 'https://example.com/banner.jpg',
  type: 'hero',
  status: 'active',
  order: 1
});
```

### 6. Auth Service

```typescript
import { authService } from '@/services/authService';

// Đăng nhập
const authResponse = await authService.login({
  email: 'admin@example.com',
  password: 'password123'
});

// Kiểm tra authentication
const isAuth = authService.isAuthenticated();

// Lấy user hiện tại
const currentUser = await authService.getCurrentUser();

// Đăng xuất
await authService.logout();
```

## API Endpoints Mapping

### Dashboard
- `GET /admin/dashboard/overview` - Thống kê tổng quan
- `GET /admin/dashboard/revenue-chart` - Biểu đồ doanh thu
- `GET /admin/dashboard/project-progress` - Tiến độ dự án
- `GET /admin/dashboard/top-performers` - Top performers
- `GET /admin/dashboard/recent-activity` - Hoạt động gần đây

### Projects
- `GET /admin/projects` - Danh sách dự án
- `POST /admin/projects` - Tạo dự án
- `PUT /admin/projects/:id` - Cập nhật dự án
- `DELETE /admin/projects/:id` - Xóa dự án
- `GET /admin/projects/stats` - Thống kê dự án

### Users
- `GET /admin/users` - Danh sách users
- `POST /admin/users` - Tạo user
- `PUT /admin/users/:id` - Cập nhật user
- `DELETE /admin/users/:id` - Xóa user
- `GET /admin/users/stats` - Thống kê users

### News
- `GET /admin/news` - Danh sách tin tức
- `POST /admin/news` - Tạo tin tức
- `PUT /admin/news/:id` - Cập nhật tin tức
- `DELETE /admin/news/:id` - Xóa tin tức
- `GET /admin/news/categories` - Danh mục tin tức

### Content
- `GET /admin/static-pages` - Danh sách trang tĩnh
- `GET /admin/banners` - Danh sách banner
- `POST /admin/static-pages` - Tạo trang tĩnh
- `POST /admin/banners` - Tạo banner

### Auth
- `POST /auth/login` - Đăng nhập
- `POST /auth/logout` - Đăng xuất
- `GET /auth/me` - Thông tin user hiện tại
- `POST /auth/refresh` - Refresh token

## Error Handling

Tất cả services đều sử dụng centralized error handling từ `api.ts`:

- Tự động redirect login khi 401
- Hiển thị error messages
- Logging errors to console
- Retry mechanism cho failed requests

## TypeScript Support

Tất cả services đều có đầy đủ TypeScript types:

- Request/Response interfaces
- Filter types
- Pagination types
- Error types

## Best Practices

1. **Import specific services**: `import { projectService } from '@/services/admin/projectService'`
2. **Use filters**: Luôn sử dụng filter objects cho list APIs
3. **Handle errors**: Wrap service calls trong try-catch
4. **Type safety**: Sử dụng TypeScript interfaces
5. **Pagination**: Sử dụng page/limit cho large datasets
6. **Caching**: Implement caching ở component level nếu cần
