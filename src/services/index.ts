// Admin Services
export * from './admin/dashboardService';
export * from './admin/projectService';
export * from './admin/newsService';
export * from './admin/contentService';

// Admin User Service (with aliases to avoid conflicts)
export {
    userService as adminUserService,
    type User as AdminUser,
    type CreateUserData as AdminCreateUserData,
    type UpdateUserData as AdminUpdateUserData,
    type UserFilter as AdminUserFilter,
    type UserListResponse as AdminUserListResponse
} from './admin/userService';

// Auth Service
export * from './authService';

// Legacy Services (for backward compatibility) - with aliases to avoid conflicts
export {
    userService as legacyUserService,
    type User as LegacyUser,
    type CreateUserData as LegacyCreateUserData,
    type UpdateUserData as LegacyUpdateUserData
} from './userService';

// Note: Legacy projectService.ts contains mock data, use admin/projectService.ts for real API
