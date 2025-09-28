import { api } from '../api';

// Types
export interface NewsArticle {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    imageUrl?: string;
    featuredImageUrl?: string;
    images?: string[];
    categoryId: string | {
        _id: string;
        name: string;
        slug: string;
        color: string;
    };
    author?: string;
    authorAvatar?: string;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
    readTime?: number;
    isFeatured: boolean;
    isBreaking: boolean;
    isTrending?: boolean;
    status: 'draft' | 'published' | 'archived';
    tags: string[];
    viewCount?: number;
    likeCount?: number;
    shareCount?: number;
    commentCount?: number;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords: string[];
    };
    allowComments?: boolean;
    featuredImageAlt?: string;
    imageAlt?: string;
    gallery?: string[];
    relatedArticles?: string[];
    customFields?: Record<string, any>;
    notes?: string;
}

export interface NewsCategory {
    _id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface NewsFilters {
    search?: string;
    category?: string;
    tag?: string;
}

export interface NewsSearchParams {
    query?: string;
    category?: string;
    tag?: string;
    dateFrom?: string;
    dateTo?: string;
}

export interface NewsListResult {
    articles: NewsArticle[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface NewsResponse {
    success: boolean;
    message: string;
    data?: NewsArticle | NewsArticle[] | NewsListResult;
}

// News Service
export const newsService = {
    // Get all news articles
    getNews: async (page: number = 1, limit: number = 10, filters: NewsFilters = {}): Promise<NewsArticle[]> => {
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...filters
            });

            const response = await api.get(`/client/news?${params}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching news:', error);
            throw new Error(error.response?.data?.message || 'Lỗi khi tải tin tức');
        }
    },

    // Get news article by ID
    getNewsById: async (id: string): Promise<NewsArticle> => {
        try {
            const response = await api.get(`/client/news/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching news by ID:', error);
            throw new Error(error.response?.data?.message || 'Lỗi khi tải bài viết');
        }
    },

    // Get news article by slug
    getNewsBySlug: async (slug: string): Promise<NewsArticle> => {
        try {
            const response = await api.get(`/client/news/slug/${slug}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching news by slug:', error);
            throw new Error(error.response?.data?.message || 'Lỗi khi tải bài viết');
        }
    },

    // Get featured news
    getFeaturedNews: async (limit: number = 5): Promise<NewsArticle[]> => {
        try {
            const response = await api.get(`/client/news/featured?limit=${limit}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching featured news:', error);
            throw new Error(error.response?.data?.message || 'Lỗi khi tải tin tức nổi bật');
        }
    },

    // Get latest news
    getLatestNews: async (limit: number = 10): Promise<NewsArticle[]> => {
        try {
            const response = await api.get(`/client/news/latest?limit=${limit}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching latest news:', error);
            throw new Error(error.response?.data?.message || 'Lỗi khi tải tin tức mới nhất');
        }
    },

    // Get news by category
    getNewsByCategory: async (categoryId: string, page: number = 1, limit: number = 10): Promise<NewsListResult> => {
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString()
            });

            const response = await api.get(`/client/news/category/${categoryId}?${params}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching news by category:', error);
            throw new Error(error.response?.data?.message || 'Lỗi khi tải tin tức theo chuyên mục');
        }
    },

    // Search news
    searchNews: async (searchParams: NewsSearchParams): Promise<NewsArticle[]> => {
        try {
            const params = new URLSearchParams();
            if (searchParams.query) params.append('query', searchParams.query);
            if (searchParams.category) params.append('category', searchParams.category);
            if (searchParams.tag) params.append('tag', searchParams.tag);
            if (searchParams.dateFrom) params.append('dateFrom', searchParams.dateFrom);
            if (searchParams.dateTo) params.append('dateTo', searchParams.dateTo);

            const response = await api.get(`/client/news/search?${params}`);
            return response.data;
        } catch (error: any) {
            console.error('Error searching news:', error);
            throw new Error(error.response?.data?.message || 'Lỗi khi tìm kiếm tin tức');
        }
    },

    // Get news categories
    getNewsCategories: async (): Promise<NewsCategory[]> => {
        try {
            const response = await api.get('/client/news/categories');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching news categories:', error);
            throw new Error(error.response?.data?.message || 'Lỗi khi tải chuyên mục');
        }
    },

    // Get news category by slug
    getNewsCategoryBySlug: async (slug: string): Promise<NewsCategory> => {
        try {
            const response = await api.get(`/client/news/categories/slug/${slug}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching news category by slug:', error);
            throw new Error(error.response?.data?.message || 'Lỗi khi tải chuyên mục');
        }
    },

    // Get news tags
    getNewsTags: async (): Promise<string[]> => {
        try {
            const response = await api.get('/client/news/tags');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching news tags:', error);
            throw new Error(error.response?.data?.message || 'Lỗi khi tải tags');
        }
    },

    // Get related news
    getRelatedNews: async (articleId: string, limit: number = 5): Promise<NewsArticle[]> => {
        try {
            const response = await api.get(`/client/news/${articleId}/related?limit=${limit}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching related news:', error);
            throw new Error(error.response?.data?.message || 'Lỗi khi tải tin tức liên quan');
        }
    }
};
export default newsService;

