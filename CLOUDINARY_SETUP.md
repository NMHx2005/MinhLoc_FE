# Cloudinary Setup Guide

## ⚠️ Lưu ý quan trọng
Upload ảnh được xử lý bởi **Backend API**, không phải Frontend. Vui lòng cấu hình Cloudinary ở backend.

## Bước 1: Cấu hình Backend
1. Vào thư mục `backend_minhloc`
2. Cấu hình Cloudinary trong file `.env` của backend:
```env
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## Bước 2: Lấy thông tin Cloudinary
1. Truy cập https://cloudinary.com
2. Đăng ký tài khoản miễn phí
3. Vào Dashboard > Settings > API Keys
4. Copy các thông tin: Cloud Name, API Key, API Secret

## Bước 3: Cấu hình Frontend
Tạo file `.env.local` trong thư mục `frontend_minhloc`:
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

## Bước 4: Khởi động cả Backend và Frontend
```bash
# Terminal 1 - Backend
cd backend_minhloc
npm run dev

# Terminal 2 - Frontend  
cd frontend_minhloc
npm run dev
```

## Test Upload:
1. Đảm bảo backend đang chạy
2. Vào trang Settings
3. Click "Cập nhật Logo" hoặc "Cập nhật Favicon"
4. Chọn tab "Upload từ máy"
5. Chọn file ảnh và upload

## Troubleshooting:
- **Lỗi "Upload failed"**: Kiểm tra backend có chạy không
- **Lỗi "Must supply api_key"**: Kiểm tra cấu hình Cloudinary ở backend
- **Lỗi authentication**: Kiểm tra token trong localStorage
