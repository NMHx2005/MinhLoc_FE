import { useState, useEffect } from 'react';
import { userService, type User, type Role, type Permission, type ActivityLog } from '../services/admin/userService';

// Hook for managing users
export const useUsers = (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
    type?: string;
}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(params?.page || 1);
    const [limit, setLimit] = useState(params?.limit || 10);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await userService.getUsers({
                page,
                limit,
                ...params
            });
            setUsers(response.users);
            setTotal(response.total);
            setPage(response.page);
            setLimit(response.limit);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách người dùng');
            console.error('Users fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, limit, params?.search, params?.role, params?.status, params?.type]);

    const createUser = async (userData: any) => {
        try {
            const newUser = await userService.createUser(userData);
            await fetchUsers();
            return newUser;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Có lỗi xảy ra khi tạo người dùng');
        }
    };

    const updateUser = async (id: string, userData: any) => {
        try {
            const updatedUser = await userService.updateUser(id, userData);
            await fetchUsers();
            return updatedUser;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật người dùng');
        }
    };

    const deleteUser = async (id: string) => {
        try {
            await userService.deleteUser(id);
            await fetchUsers();
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Có lỗi xảy ra khi xóa người dùng');
        }
    };

    return {
        users,
        loading,
        error,
        total,
        page,
        limit,
        setPage,
        setLimit,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
    };
};

// Hook for managing a single user
export const useUser = (id: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);
            const response = await userService.getUserById(id);
            setUser(response);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải thông tin người dùng');
            console.error('User fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    return { user, loading, error, fetchUser };
};

// Hook for managing roles
export const useRoles = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await userService.getRoles();
            setRoles(response);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách vai trò');
            console.error('Roles fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const createRole = async (roleData: any) => {
        try {
            const newRole = await userService.createRole(roleData);
            await fetchRoles();
            return newRole;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Có lỗi xảy ra khi tạo vai trò');
        }
    };

    const updateRole = async (id: string, roleData: any) => {
        try {
            const updatedRole = await userService.updateRole(id, roleData);
            await fetchRoles();
            return updatedRole;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật vai trò');
        }
    };

    const deleteRole = async (id: string) => {
        try {
            await userService.deleteRole(id);
            await fetchRoles();
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Có lỗi xảy ra khi xóa vai trò');
        }
    };

    return {
        roles,
        loading,
        error,
        fetchRoles,
        createRole,
        updateRole,
        deleteRole,
    };
};

// Hook for managing permissions
export const usePermissions = () => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPermissions = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await userService.getPermissions();
            setPermissions(response);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải danh sách quyền');
            console.error('Permissions fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPermissions();
    }, []);

    return { permissions, loading, error, fetchPermissions };
};

// Hook for managing activity logs
export const useActivityLogs = (params?: {
    page?: number;
    limit?: number;
    userId?: string;
    action?: string;
    resource?: string;
    startDate?: string;
    endDate?: string;
}) => {
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(params?.page || 1);
    const [limit, setLimit] = useState(params?.limit || 10);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await userService.getActivityLogs({
                page,
                limit,
                ...params
            });
            setLogs(response.logs);
            setTotal(response.total);
            setPage(response.page);
            setLimit(response.limit);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải lịch sử hoạt động');
            console.error('Activity logs fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [page, limit, params?.userId, params?.action, params?.resource, params?.startDate, params?.endDate]);

    const cleanupLogs = async () => {
        try {
            await userService.cleanupActivityLogs();
            await fetchLogs();
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Có lỗi xảy ra khi dọn dẹp lịch sử');
        }
    };

    return {
        logs,
        loading,
        error,
        total,
        page,
        limit,
        setPage,
        setLimit,
        fetchLogs,
        cleanupLogs,
    };
};
