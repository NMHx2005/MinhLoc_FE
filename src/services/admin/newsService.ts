import { api } from '../api';

// Types
export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: {
    _id: string;
    name: string;
    slug: string;
    color: string;
  };
  tags: string[];
  author: {
    id: {
      _id: string;
      name: string;
      email: string;
    };
    name: string;
  };
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  isBreaking: boolean;
  featuredImage: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  statistics: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
  };
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  allowComments: boolean;
  readingTime: number;
  wordCount: number;
}

export interface CreateNewsData {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  categoryId: string; // Changed from category to categoryId
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean; // Changed from featured to isFeatured
  featuredImage: string;
  isBreaking?: boolean;
  allowComments?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export type UpdateNewsData = Partial<CreateNewsData>;

export interface NewsCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewsTag {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Remove duplicate interface - using the one from api.ts

// News API calls
export const newsService = {
  // Get all news articles
  getNews: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
    author?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<PaginatedResponse<NewsArticle>> => {
    try {
      const response = await api.get<NewsArticle[]>('/admin/news', { params });
      return {
        success: response.success,
        data: response.data || [],
        pagination: response.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          pages: 0
        }
      };
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },

  // Get news article by ID
  getNewsById: async (id: string) => {
    try {
      const response = await api.get<NewsArticle>(`/admin/news/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching news article:', error);
      throw error;
    }
  },

  // Create new news article
  createNews: async (data: CreateNewsData) => {
    try {
      const response = await api.post<NewsArticle>('/admin/news', data);
      return response;
    } catch (error) {
      console.error('Error creating news article:', error);
      throw error;
    }
  },

  // Update news article
  updateNews: async (id: string, data: UpdateNewsData) => {
    try {
      const response = await api.put<NewsArticle>(`/admin/news/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating news article:', error);
      throw error;
    }
  },

  // Delete news article
  deleteNews: async (id: string) => {
    try {
      const response = await api.delete(`/admin/news/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting news article:', error);
      throw error;
    }
  },

  // Publish news article
  publishNews: async (id: string) => {
    try {
      const response = await api.post<NewsArticle>(`/admin/news/${id}/publish`);
      return response;
    } catch (error) {
      console.error('Error publishing news article:', error);
      throw error;
    }
  },

  // Categories API calls
  getNewsCategories: async () => {
    try {
      const response = await api.get<NewsCategory[]>('/admin/news-categories');
      return response;
    } catch (error) {
      console.error('Error fetching news categories:', error);
      throw error;
    }
  },

  createNewsCategory: async (data: {
    name: string;
    slug?: string;
    description?: string;
    color?: string;
    isActive?: boolean;
    sortOrder?: number;
  }) => {
    try {
      const response = await api.post<NewsCategory>('/admin/news-categories', data);
      return response;
    } catch (error) {
      console.error('Error creating news category:', error);
      throw error;
    }
  },

  updateNewsCategory: async (id: string, data: {
    name?: string;
    slug?: string;
    description?: string;
    color?: string;
    isActive?: boolean;
    sortOrder?: number;
  }) => {
    try {
      const response = await api.put<NewsCategory>(`/admin/news-categories/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating news category:', error);
      throw error;
    }
  },

  deleteNewsCategory: async (id: string) => {
    try {
      const response = await api.delete(`/admin/news-categories/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting news category:', error);
      throw error;
    }
  },

  toggleNewsCategoryStatus: async (id: string) => {
    try {
      const response = await api.patch<NewsCategory>(`/admin/news-categories/${id}/toggle-status`);
      return response;
    } catch (error) {
      console.error('Error toggling news category status:', error);
      throw error;
    }
  },

  // Tags API calls
  getNewsTags: async () => {
    try {
      const response = await api.get<NewsTag[]>('/admin/news/tags');
      return response;
    } catch (error) {
      console.error('Error fetching news tags:', error);
      throw error;
    }
  },

  createNewsTag: async (data: {
    name: string;
    slug?: string;
    description?: string;
    isActive?: boolean;
  }) => {
    try {
      const response = await api.post<NewsTag>('/admin/news/tags', data);
      return response;
    } catch (error) {
      console.error('Error creating news tag:', error);
      throw error;
    }
  },

  updateNewsTag: async (id: string, data: {
    name?: string;
    slug?: string;
    description?: string;
    isActive?: boolean;
  }) => {
    try {
      const response = await api.put<NewsTag>(`/admin/news/tags/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error updating news tag:', error);
      throw error;
    }
  },

  deleteNewsTag: async (id: string) => {
    try {
      const response = await api.delete(`/admin/news/tags/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting news tag:', error);
      throw error;
    }
  }
};

export default newsService;