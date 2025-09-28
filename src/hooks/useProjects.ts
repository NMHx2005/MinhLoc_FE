import { useState, useCallback, useEffect } from 'react';
import { projectService } from '../services/admin/projectService';
import type {
    Project,
    ProjectFilters,
    CreateProjectData,
    UpdateProjectData,
    ProjectType,
    ProjectStats
} from '../services/admin/projectService';

// Main projects hook
export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState<ProjectFilters>({});

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await projectService.getProjects({
                page,
                limit,
                ...filters
            });
            setProjects(result.projects);
            setTotal(result.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách dự án');
        } finally {
            setLoading(false);
        }
    }, [page, limit, filters.search, filters.type, filters.status, filters.location, filters.minPrice, filters.maxPrice, filters.minArea, filters.maxArea]);

    const createProject = useCallback(async (projectData: CreateProjectData): Promise<Project> => {
        setLoading(true);
        setError(null);
        try {
            const newProject = await projectService.createProject(projectData);
            setProjects(prev => [newProject, ...prev]);
            setTotal(prev => prev + 1);
            return newProject;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo dự án';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProject = useCallback(async (id: string, projectData: UpdateProjectData): Promise<Project> => {
        setLoading(true);
        setError(null);
        try {
            const updatedProject = await projectService.updateProject(id, projectData);
            setProjects(prev => prev.map(p => p._id === id ? updatedProject : p));
            return updatedProject;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật dự án';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteProject = useCallback(async (id: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await projectService.deleteProject(id);
            setProjects(prev => prev.filter(p => p._id !== id));
            setTotal(prev => prev - 1);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa dự án';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshProjects = useCallback(() => {
        fetchProjects();
    }, [fetchProjects]);

    const updateFilters = useCallback((newFilters: ProjectFilters) => {
        setFilters(newFilters);
        setPage(1); // Reset to first page when filters change
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({});
        setPage(1);
    }, []);

    const uploadGalleryImages = useCallback(async (projectId: string, formData: FormData): Promise<{ data: { images: string[] } }> => {
        setLoading(true);
        setError(null);
        try {
            const result = await projectService.uploadGalleryImages(projectId, formData);
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi upload hình ảnh';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteGalleryImage = useCallback(async (projectId: string, imageId: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await projectService.deleteGalleryImage(projectId, imageId);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa hình ảnh';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const addImageUrl = useCallback(async (projectId: string, imageUrl: string): Promise<{ data: { images: string[] } }> => {
        setLoading(true);
        setError(null);
        try {
            const result = await projectService.addImageUrl(projectId, imageUrl);
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi thêm URL hình ảnh';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return {
        projects,
        loading,
        error,
        total,
        page,
        limit,
        filters,
        setPage,
        setLimit,
        setFilters,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        refreshProjects,
        updateFilters,
        clearFilters,
        uploadGalleryImages,
        deleteGalleryImage,
        addImageUrl,
    };
};

// Project types hook
export const useProjectTypes = () => {
    const [types, setTypes] = useState<ProjectType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTypes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await projectService.getProjectTypes();
            setTypes(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách loại dự án');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTypes();
    }, [fetchTypes]);

    return {
        types,
        loading,
        error,
        fetchTypes,
    };
};

// Project statistics hook
export const useProjectStats = () => {
    const [stats, setStats] = useState<ProjectStats>({
        total: 0,
        planning: 0,
        construction: 0,
        completed: 0,
        soldOut: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await projectService.getProjectStats();
            setStats(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải thống kê dự án');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return {
        stats,
        loading,
        error,
        fetchStats,
    };
};

// Single project hook
export const useProject = (id: string) => {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProject = useCallback(async () => {
        if (!id) return;

        setLoading(true);
        setError(null);
        try {
            const result = await projectService.getProjectById(id);
            setProject(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải thông tin dự án');
        } finally {
            setLoading(false);
        }
    }, [id]);

    const updateProject = useCallback(async (projectData: UpdateProjectData): Promise<Project> => {
        if (!id) throw new Error('Project ID is required');

        setLoading(true);
        setError(null);
        try {
            const updatedProject = await projectService.updateProject(id, projectData);
            setProject(updatedProject);
            return updatedProject;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật dự án';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [id]);

    const uploadImages = useCallback(async (images: File[]): Promise<string[]> => {
        if (!id) throw new Error('Project ID is required');

        setLoading(true);
        setError(null);
        try {
            const imageUrls = await projectService.uploadGalleryImages(id, images);
            if (project) {
                setProject(prev => prev ? { ...prev, images: [...prev.images, ...imageUrls] } : null);
            }
            return imageUrls;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi upload hình ảnh';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [id, project]);

    const deleteImage = useCallback(async (imageId: string): Promise<void> => {
        if (!id) throw new Error('Project ID is required');

        setLoading(true);
        setError(null);
        try {
            await projectService.deleteGalleryImage(id, imageId);
            if (project) {
                setProject(prev => prev ? { ...prev, images: prev.images.filter(img => img !== imageId) } : null);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa hình ảnh';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [id, project]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    return {
        project,
        loading,
        error,
        fetchProject,
        updateProject,
        uploadImages,
        deleteImage,
    };
};
