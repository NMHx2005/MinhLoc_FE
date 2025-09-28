# API Integration Guide

## Cấu hình

### 1. Environment Variables
Tạo file `.env.local` trong thư mục `frontend_minhloc/`:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

# App Configuration
NEXT_PUBLIC_APP_NAME=MinhLoc Group Admin
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 2. API Client Setup
File `api.ts` đã được cấu hình với:
- Base URL: `http://localhost:5000/api/v1`
- Timeout: 10 seconds
- Automatic token handling
- Error interceptors

## Sử dụng

### 1. Dashboard API
```typescript
import { dashboardApi } from '@/lib/api';

// Lấy tổng quan dashboard
const overview = await dashboardApi.getOverview();

// Lấy dữ liệu biểu đồ doanh thu
const revenueData = await dashboardApi.getRevenueChart('12months');

// Lấy tiến độ dự án
const progressData = await dashboardApi.getProjectProgress();
```

### 2. Custom Hooks
```typescript
import { useDashboard, useOverview } from '@/hooks/useDashboard';

// Sử dụng hook tổng quan
const { data, loading, error, refetch } = useOverview();

// Sử dụng hook dashboard đầy đủ
const dashboard = useDashboard();
```

### 3. Generic API Calls
```typescript
import { api } from '@/lib/api';

// GET request
const response = await api.get('/admin/users');

// POST request
const newUser = await api.post('/admin/users', userData);

// PUT request
const updatedUser = await api.put(`/admin/users/${id}`, userData);
```

## Dashboard Components

### 1. DashboardOverview
Hiển thị các thống kê tổng quan:
- Tổng dự án, sản phẩm, tin tức, người dùng
- Doanh thu tổng và hàng tháng
- Dự án hoàn thành và đang thi công

### 2. RevenueChart
Biểu đồ doanh thu với:
- Chọn thời gian (3, 6, 12, 24 tháng)
- Hiển thị tổng doanh thu và dự án
- Biểu đồ thanh đơn giản

### 3. ProjectProgress
Tiến độ dự án với:
- Thống kê tổng quan
- Danh sách dự án với thanh tiến độ
- Trạng thái dự án (hoàn thành, thi công, lên kế hoạch)

### 4. RecentActivity
Hoạt động gần đây với:
- Lịch sử hoạt động theo thời gian
- Icon và màu sắc theo loại hoạt động
- Thời gian tương đối

## Authentication

API client tự động xử lý authentication:
- Token được lưu trong `localStorage` với key `admin_token`
- Tự động thêm header `Authorization: Bearer <token>`
- Redirect đến `/admin/login` khi 401 Unauthorized

## Error Handling

- Tự động hiển thị lỗi trong console
- Redirect login khi 401
- Hiển thị thông báo lỗi trong UI components
- Retry mechanism trong custom hooks

## Cấu trúc API Response

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
```

## Dashboard Data Types

```typescript
interface DashboardOverview {
  totalProjects: number;
  totalProducts: number;
  totalNews: number;
  totalUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  projectsCompleted: number;
  projectsInProgress: number;
}
```

## Lưu ý

1. Đảm bảo backend đang chạy trên `http://localhost:5000`
2. API endpoints cần authentication middleware
3. Sử dụng `type` imports cho TypeScript types
4. Các hooks tự động fetch data khi component mount
5. Có thể refresh data bằng cách gọi `refetch()` function
