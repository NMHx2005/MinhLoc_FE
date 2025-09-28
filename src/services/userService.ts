import { api } from '@/services/api';

export interface User {
  _id: string;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role: string;
  type: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  permissions: string[];
  lastLogin?: string;
  lastActivity?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: string;
  type: string;
  status?: 'active' | 'inactive' | 'suspended' | 'pending';
}

export interface UpdateUserData {
  email?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role?: string;
  type?: string;
  status?: 'active' | 'inactive' | 'suspended' | 'pending';
}

export const userService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/admin/users');
    return response.data.users || response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData: CreateUserData): Promise<User> => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id: string, userData: UpdateUserData): Promise<User> => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/admin/users/${id}`);
  },

  // Search users
  searchUsers: async (query: string): Promise<User[]> => {
    const response = await api.get(`/admin/users?q=${encodeURIComponent(query)}`);
    return response.data.users || response.data;
  },
};
