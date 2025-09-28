import { api } from '../api';

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    content: string;
    categoryId: {
        _id: string;
        name: string;
        slug: string;
    };
    originId: {
        _id: string;
        name: string;
        country: string;
    };
    grade: string;
    weight: number;
    price: number;
    stock: number;
    status: string;
    images: string[];
    features: string[];
    specifications: {
        age?: number;
        processingMethod?: string;
        storageMethod?: string;
        ingredients: string[];
        benefits: string[];
        usageInstructions?: string;
        contraindications?: string;
    };
    isFeatured: boolean;
    isActive: boolean;
    tags: string[];
    sku: string;
    dimensions: {
        unit: string;
    };
    weightUnit: string;
    phone?: string; // Số điện thoại liên hệ
    createdAt: string;
    updatedAt: string;
}

export interface ProductFilters {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    origin?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    minPrice?: number;
    maxPrice?: number;
}

export interface ProductListResponse {
    success: boolean;
    data: {
        products: Product[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    };
}

export interface ProductResponse {
    success: boolean;
    data: Product;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    isActive: boolean;
    sortOrder: number;
}

export interface Origin {
    _id: string;
    name: string;
    slug: string;
    country: string;
    region: string;
    description: string;
    flagImage: string;
    isActive: boolean;
    isFeatured: boolean;
}

export interface CategoriesResponse {
    success: boolean;
    data: Category[];
}

export interface OriginsResponse {
    success: boolean;
    data: Origin[];
}

// Get all products
export const getProducts = async (filters: ProductFilters = {}): Promise<ProductListResponse> => {
    try {
        const params = new URLSearchParams();

        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.origin) params.append('origin', filters.origin);
        if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString());
        if (filters.isFeatured !== undefined) params.append('isFeatured', filters.isFeatured.toString());
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

        const response = await api.get(`/client/products?${params.toString()}`);

        // Handle different response structures
        if (response.data && typeof response.data === 'object') {
            if (Array.isArray(response.data)) {
                return {
                    success: true,
                    data: {
                        products: response.data,
                        pagination: {
                            page: 1,
                            limit: response.data.length,
                            total: response.data.length,
                            pages: 1
                        }
                    }
                };
            }
            return response.data;
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get featured products
export const getFeaturedProducts = async (): Promise<ProductListResponse> => {
    try {
        const response = await api.get('/client/products/featured');

        if (Array.isArray(response.data)) {
            return {
                success: true,
                data: {
                    products: response.data,
                    pagination: {
                        page: 1,
                        limit: response.data.length,
                        total: response.data.length,
                        pages: 1
                    }
                }
            };
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching featured products:', error);
        throw error;
    }
};

// Search products
export const searchProducts = async (query: string, filters: ProductFilters = {}): Promise<ProductListResponse> => {
    try {
        const params = new URLSearchParams();
        params.append('q', query);

        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());
        if (filters.category) params.append('category', filters.category);
        if (filters.origin) params.append('origin', filters.origin);
        if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString());
        if (filters.isFeatured !== undefined) params.append('isFeatured', filters.isFeatured.toString());
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

        const response = await api.get(`/client/products/search?${params.toString()}`);

        if (Array.isArray(response.data)) {
            return {
                success: true,
                data: {
                    products: response.data,
                    pagination: {
                        page: 1,
                        limit: response.data.length,
                        total: response.data.length,
                        pages: 1
                    }
                }
            };
        }

        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};

// Get product by ID
export const getProductById = async (id: string): Promise<ProductResponse> => {
    try {
        const response = await api.get(`/client/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product by ID ${id}:`, error);
        throw error;
    }
};

// Get product by slug
export const getProductBySlug = async (slug: string): Promise<Product> => {
    try {
        const response = await api.get(`/client/products/slug/${slug}`);
        // API trả về Product trực tiếp, không có wrapper
        return response.data;
    } catch (error) {
        console.error(`Error fetching product by slug ${slug}:`, error);
        throw error;
    }
};

// Get products by category
export const getProductsByCategory = async (categoryId: string, filters: ProductFilters = {}): Promise<ProductListResponse> => {
    try {
        const params = new URLSearchParams();

        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());
        if (filters.search) params.append('search', filters.search);
        if (filters.origin) params.append('origin', filters.origin);
        if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString());
        if (filters.isFeatured !== undefined) params.append('isFeatured', filters.isFeatured.toString());
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

        const response = await api.get(`/client/products/category/${categoryId}?${params.toString()}`);

        if (Array.isArray(response.data)) {
            return {
                success: true,
                data: {
                    products: response.data,
                    pagination: {
                        page: 1,
                        limit: response.data.length,
                        total: response.data.length,
                        pages: 1
                    }
                }
            };
        }

        return response.data;
    } catch (error) {
        console.error(`Error fetching products by category ${categoryId}:`, error);
        throw error;
    }
};

// Get products by origin
export const getProductsByOrigin = async (originId: string, filters: ProductFilters = {}): Promise<ProductListResponse> => {
    try {
        const params = new URLSearchParams();

        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString());
        if (filters.isFeatured !== undefined) params.append('isFeatured', filters.isFeatured.toString());
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

        const response = await api.get(`/client/products/origin/${originId}?${params.toString()}`);

        if (Array.isArray(response.data)) {
            return {
                success: true,
                data: {
                    products: response.data,
                    pagination: {
                        page: 1,
                        limit: response.data.length,
                        total: response.data.length,
                        pages: 1
                    }
                }
            };
        }

        return response.data;
    } catch (error) {
        console.error(`Error fetching products by origin ${originId}:`, error);
        throw error;
    }
};

// Get categories
export const getCategories = async (): Promise<CategoriesResponse> => {
    try {
        const response = await api.get('/client/products/categories');

        if (Array.isArray(response.data)) {
            return { success: true, data: response.data };
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Get origins
export const getOrigins = async (): Promise<OriginsResponse> => {
    try {
        const response = await api.get('/client/products/origins');

        if (Array.isArray(response.data)) {
            return { success: true, data: response.data };
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching origins:', error);
        throw error;
    }
};
