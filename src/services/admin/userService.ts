import apiClient from '../api';

// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  type: 'individual' | 'business';
  status: 'active' | 'inactive' | 'pending';
  role: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
  interests: string[];
  totalOrders: number;
  totalSpent: number;
  lastActivity: string;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
  fullName?: string;
  id?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  type?: 'individual' | 'business';
  role?: string;
  status?: 'active' | 'inactive' | 'pending';
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
  type?: 'individual' | 'business';
  role?: string;
  status?: 'active' | 'inactive' | 'pending';
  interests?: string[];
}

export interface Role {
  _id: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleData {
  name: string;
  description: string;
  permissions: string[];
}

export interface Permission {
  _id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface ActivityLog {
  _id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  createdAt: string;
}

export interface UserRoleAssignment {
  userId: string;
  roles: string[];
}

// User Service
export const userService = {
  // User Management
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
    type?: string;
  }): Promise<{ users: User[]; total: number; page: number; limit: number }> => {
    const response = await apiClient.get('/admin/users', { params });
    const data = response.data;

    // Handle the actual API response structure
    if (data.success && Array.isArray(data.data)) {
      return {
        users: data.data || [],
        total: data.pagination?.total || 0,
        page: data.pagination?.page || 1,
        limit: data.pagination?.limit || 10
      };
    }

    // Fallback for different response structures
    return {
      users: data?.users || data?.data || [],
      total: data?.total || data?.pagination?.total || 0,
      page: data?.page || data?.pagination?.page || 1,
      limit: data?.limit || data?.pagination?.limit || 10
    };
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get(`/admin/users/${id}`);
    const data = response.data;

    if (data.success && data.data) {
      return data.data;
    }

    return data.data || data;
  },

  createUser: async (userData: CreateUserData): Promise<User> => {
    const response = await apiClient.post('/admin/users', userData);
    const data = response.data;

    if (data.success && data.data) {
      return data.data;
    }

    return data.data || data;
  },

  updateUser: async (id: string, userData: UpdateUserData): Promise<User> => {
    const response = await apiClient.put(`/admin/users/${id}`, userData);
    const data = response.data;

    if (data.success && data.data) {
      return data.data;
    }

    return data.data || data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/users/${id}`);
  },

  // Role Management
  getRoles: async (): Promise<Role[]> => {
    const response = await apiClient.get('/admin/users/roles');
    const data = response.data;

    if (data.success && data.data) {
      return data.data;
    }

    return data.data || data;
  },

  createRole: async (roleData: CreateRoleData): Promise<Role> => {
    const response = await apiClient.post('/admin/users/roles', roleData);
    const data = response.data;

    if (data.success && data.data) {
      return data.data;
    }

    return data.data || data;
  },

  updateRole: async (id: string, roleData: Partial<CreateRoleData>): Promise<Role> => {
    const response = await apiClient.put(`/admin/users/roles/${id}`, roleData);
    const data = response.data;

    if (data.success && data.data) {
      return data.data;
    }

    return data.data || data;
  },

  deleteRole: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/users/roles/${id}`);
  },

  // Permission Management
  getPermissions: async (): Promise<Permission[]> => {
    const response = await apiClient.get('/admin/users/permissions');
    const data = response.data;

    if (data.success && data.data) {
      return data.data;
    }

    return data.data || data;
  },

  // User Role Assignment
  assignUserRoles: async (id: string, roleData: UserRoleAssignment): Promise<User> => {
    const response = await apiClient.put(`/admin/users/${id}/roles`, roleData);
    const data = response.data;

    if (data.success && data.data) {
      return data.data;
    }

    return data.data || data;
  },

  // Activity Logs
  getActivityLogs: async (params?: {
    page?: number;
    limit?: number;
    userId?: string;
    action?: string;
    resource?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{ logs: ActivityLog[]; total: number; page: number; limit: number }> => {
    const response = await apiClient.get('/admin/users/activity-logs', { params });
    const data = response.data;

    if (data.success && data.data) {
      return {
        logs: data.data || [],
        total: data.pagination?.total || 0,
        page: data.pagination?.page || 1,
        limit: data.pagination?.limit || 10
      };
    }

    return data.data || data;
  },

  getActivityLogsByUser: async (userId: string, params?: {
    page?: number;
    limit?: number;
    action?: string;
    resource?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{ logs: ActivityLog[]; total: number; page: number; limit: number }> => {
    const response = await apiClient.get(`/admin/users/activity-logs/${userId}`, { params });
    const data = response.data;

    if (data.success && data.data) {
      return {
        logs: data.data || [],
        total: data.pagination?.total || 0,
        page: data.pagination?.page || 1,
        limit: data.pagination?.limit || 10
      };
    }

    return data.data || data;
  },

  cleanupActivityLogs: async (): Promise<void> => {
    await apiClient.delete('/admin/users/activity-logs/cleanup');
  },
};