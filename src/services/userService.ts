import api from '@/lib/api';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserData {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface UpdateUserData {
    name?: string;
    email?: string;
    role?: string;
    status?: 'active' | 'inactive';
}

export const userService = {
    // Get all users
    getUsers: async (): Promise<User[]> => {
        const response = await api.get('/users');
        return response.data;
    },

    // Get user by ID
    getUserById: async (id: number): Promise<User> => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    // Create new user
    createUser: async (userData: CreateUserData): Promise<User> => {
        const response = await api.post('/users', userData);
        return response.data;
    },

    // Update user
    updateUser: async (id: number, userData: UpdateUserData): Promise<User> => {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    },

    // Delete user
    deleteUser: async (id: number): Promise<void> => {
        await api.delete(`/users/${id}`);
    },

    // Search users
    searchUsers: async (query: string): Promise<User[]> => {
        const response = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
        return response.data;
    },
};
