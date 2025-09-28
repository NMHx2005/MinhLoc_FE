import apiClient from '../api';

// Types
export interface GinsengProduct {
    _id: string;
    name: string;
    slug: string;
    description: string;
    content: string;
    sku: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive' | 'out_of_stock';
    category: string;
    origin: string;
    categoryId?: {
        _id: string;
        name: string;
        slug: string;
    };
    originId?: {
        _id: string;
        name: string;
        country: string;
    };
    weight: number;
    weightUnit: string;
    grade: 'premium' | 'standard' | 'economy';
    phone?: string; // Số điện thoại liên hệ
    images: string[];
    features: string[];
    specifications?: {
        age?: number;
        processingMethod?: string;
        storageMethod?: string;
        certification?: string;
        ingredients?: string[];
        benefits?: string[];
        usageInstructions?: string;
        contraindications?: string;
    };
    isFeatured: boolean;
    isActive: boolean;
    tags: string[];
    barcode?: string;
    dimensions?: {
        length?: number;
        width?: number;
        height?: number;
        unit: string;
    };
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    createdBy?: {
        _id: string;
        name: string;
        email: string;
    };
    updatedBy?: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface GinsengCategory {
    _id: string;
    name: string;
    slug: string;
    description: string;
    status: 'active' | 'inactive';
    productCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface GinsengOrigin {
    _id: string;
    name: string;
    country: string;
    description: string;
    status: 'active' | 'inactive';
    flag?: string;
    productCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductData {
    name: string;
    description: string;
    content: string;
    sku: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive' | 'out_of_stock';
    category: string;
    origin: string;
    weight: number;
    weightUnit: string;
    grade: 'premium' | 'standard' | 'economy';
    phone?: string; // Số điện thoại liên hệ
    images?: string[];
}

export interface UpdateProductData extends Partial<CreateProductData> {
    _id: string;
}

export interface CreateCategoryData {
    name: string;
    slug: string;
    description: string;
    status: 'active' | 'inactive';
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {
    _id: string;
}

export interface CreateOriginData {
    name: string;
    country: string;
    description: string;
    status: 'active' | 'inactive';
    flag?: string;
}

export interface UpdateOriginData extends Partial<CreateOriginData> {
    _id: string;
}

export interface ProductFilters {
    search?: string;
    category?: string;
    status?: string;
    origin?: string;
    grade?: string;
    priceMin?: number;
    priceMax?: number;
    weightMin?: number;
    weightMax?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

// API Service
export const ginsengService = {
    // Products
    getProducts: async (filters?: ProductFilters): Promise<{ products: GinsengProduct[]; total: number }> => {
        const params = new URLSearchParams();
        if (filters?.search) params.append('search', filters.search);
        if (filters?.category) params.append('category', filters.category);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.origin) params.append('origin', filters.origin);
        if (filters?.grade) params.append('grade', filters.grade);
        if (filters?.priceMin !== undefined) params.append('priceMin', filters.priceMin.toString());
        if (filters?.priceMax !== undefined) params.append('priceMax', filters.priceMax.toString());
        if (filters?.weightMin !== undefined) params.append('weightMin', filters.weightMin.toString());
        if (filters?.weightMax !== undefined) params.append('weightMax', filters.weightMax.toString());
        if (filters?.sortBy) params.append('sortBy', filters.sortBy);
        if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());

        const response = await apiClient.get(`/admin/products?${params.toString()}`);
        const data = response.data.data || { products: [], total: 0 };

        // Map products to match frontend interface
        const mappedProducts = data.products.map((product: Record<string, unknown>) => {
            // Fix placeholder images
            const images = (product.images as string[] || []).map((img: string) => {
                if (img.includes('via.placeholder.com')) {
                    return 'https://via.placeholder.com/400x300/4CAF50/FFFFFF.jpg?text=No+Image';
                }
                return img;
            });

            return {
                _id: product._id,
                name: product.name,
                slug: product.slug,
                description: product.description,
                content: product.content,
                sku: product.sku,
                price: product.price,
                stock: product.stock,
                status: product.status,
                category: (product.categoryId as Record<string, unknown>)?.name as string || (product.category as string),
                origin: (product.originId as Record<string, unknown>)?.name as string || (product.origin as string),
                categoryId: product.categoryId,
                originId: product.originId,
                weight: product.weight,
                weightUnit: product.weightUnit,
                grade: product.grade,
                phone: product.phone, // Add phone field
                images: images,
                features: product.features || [],
                specifications: product.specifications,
                isFeatured: product.isFeatured,
                isActive: product.isActive,
                tags: product.tags || [],
                barcode: product.barcode,
                dimensions: product.dimensions,
                createdBy: product.createdBy,
                updatedBy: product.updatedBy,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                __v: product.__v
            };
        });

        return {
            products: mappedProducts,
            total: data.total || 0
        };
    },

    getProductById: async (id: string): Promise<GinsengProduct> => {
        const response = await apiClient.get(`/admin/products/${id}`);
        const product = response.data.data;

        // Fix placeholder images
        const images = (product.images as string[] || []).map((img: string) => {
            if (img.includes('via.placeholder.com')) {
                return 'https://via.placeholder.com/400x300/4CAF50/FFFFFF.jpg?text=No+Image';
            }
            return img;
        });

        return {
            ...product,
            images: images
        };
    },

    createProduct: async (data: CreateProductData): Promise<GinsengProduct> => {
        // Map frontend data to backend schema
        const backendData = {
            name: data.name,
            description: data.description,
            content: data.content,
            sku: data.sku,
            price: data.price,
            stock: data.stock,
            status: data.status,
            categoryId: data.category, // Map category name to categoryId
            originId: data.origin, // Map origin name to originId
            weight: data.weight,
            weightUnit: data.weightUnit,
            grade: data.grade,
            phone: data.phone, // Add phone field
            images: data.images || []
        };

        const response = await apiClient.post('/admin/products', backendData);
        return response.data.data;
    },

    updateProduct: async (data: UpdateProductData): Promise<GinsengProduct> => {
        const { _id, ...updateData } = data;

        if (!_id) {
            throw new Error('Product ID is required for update');
        }

        // Map frontend data to backend schema
        const backendData: Record<string, unknown> = {};
        if (updateData.name) backendData.name = updateData.name;
        if (updateData.description) backendData.description = updateData.description;
        if (updateData.content) backendData.content = updateData.content;
        if (updateData.sku) backendData.sku = updateData.sku;
        if (updateData.price !== undefined) backendData.price = updateData.price;
        if (updateData.stock !== undefined) backendData.stock = updateData.stock;
        if (updateData.status) backendData.status = updateData.status;
        if (updateData.category) backendData.categoryId = updateData.category;
        if (updateData.origin) backendData.originId = updateData.origin;
        if (updateData.weight !== undefined) backendData.weight = updateData.weight;
        if (updateData.weightUnit) backendData.weightUnit = updateData.weightUnit;
        if (updateData.grade) backendData.grade = updateData.grade;
        if (updateData.phone !== undefined) backendData.phone = updateData.phone; // Add phone field
        if (updateData.images) backendData.images = updateData.images;

        const response = await apiClient.put(`/admin/products/${_id}`, backendData);
        return response.data.data;
    },

    deleteProduct: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/products/${id}`);
    },

    // Categories
    getCategories: async (): Promise<GinsengCategory[]> => {
        const response = await apiClient.get('/admin/products/categories');
        const categories = response.data.data || [];

        // Map categories to match frontend interface
        return categories.map((category: Record<string, unknown>) => ({
            _id: category._id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            status: category.status,
            productCount: category.productCount || 0,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }));
    },

    // Get categories for form dropdowns
    getCategoriesForForm: async (): Promise<{ _id: string; name: string }[]> => {
        const response = await apiClient.get('/admin/products/categories');
        const categories = response.data.data || [];

        return categories.map((category: Record<string, unknown>) => ({
            _id: category._id,
            name: category.name
        }));
    },

    createCategory: async (data: CreateCategoryData): Promise<GinsengCategory> => {
        // Map frontend data to backend schema
        const backendData = {
            name: data.name,
            slug: data.slug,
            description: data.description,
            status: data.status
        };

        const response = await apiClient.post('/admin/products/categories', backendData);
        return response.data.data;
    },

    updateCategory: async (data: UpdateCategoryData): Promise<GinsengCategory> => {
        const { _id, ...updateData } = data;

        // Map frontend data to backend schema
        const backendData: Record<string, unknown> = {};
        if (updateData.name) backendData.name = updateData.name;
        if (updateData.slug) backendData.slug = updateData.slug;
        if (updateData.description) backendData.description = updateData.description;
        if (updateData.status) backendData.status = updateData.status;

        const response = await apiClient.put(`/admin/products/categories/${_id}`, backendData);
        return response.data.data;
    },

    deleteCategory: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/products/categories/${id}`);
    },

    // Origins
    getOrigins: async (): Promise<GinsengOrigin[]> => {
        const response = await apiClient.get('/admin/products/origins');
        const origins = response.data.data || [];

        // Map origins to match frontend interface
        return origins.map((origin: Record<string, unknown>) => ({
            _id: origin._id,
            name: origin.name,
            country: origin.country,
            description: origin.description,
            status: origin.status,
            flag: origin.flag,
            productCount: origin.productCount || 0,
            createdAt: origin.createdAt,
            updatedAt: origin.updatedAt
        }));
    },

    // Get origins for form dropdowns
    getOriginsForForm: async (): Promise<{ _id: string; name: string; country: string }[]> => {
        const response = await apiClient.get('/admin/products/origins');
        const origins = response.data.data || [];

        return origins.map((origin: Record<string, unknown>) => ({
            _id: origin._id,
            name: origin.name,
            country: origin.country
        }));
    },

    createOrigin: async (data: CreateOriginData): Promise<GinsengOrigin> => {
        // Map frontend data to backend schema
        const backendData = {
            name: data.name,
            country: data.country,
            description: data.description,
            status: data.status,
            flag: data.flag
        };

        const response = await apiClient.post('/admin/products/origins', backendData);
        return response.data.data;
    },

    updateOrigin: async (data: UpdateOriginData): Promise<GinsengOrigin> => {
        const { _id, ...updateData } = data;

        // Map frontend data to backend schema
        const backendData: Record<string, unknown> = {};
        if (updateData.name) backendData.name = updateData.name;
        if (updateData.country) backendData.country = updateData.country;
        if (updateData.description) backendData.description = updateData.description;
        if (updateData.status) backendData.status = updateData.status;
        if (updateData.flag !== undefined) backendData.flag = updateData.flag;

        const response = await apiClient.put(`/admin/products/origins/${_id}`, backendData);
        return response.data.data;
    },

    deleteOrigin: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/products/origins/${id}`);
    },
};
