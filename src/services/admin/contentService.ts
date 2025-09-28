import { api } from '@/services/api';

// Content Types
export type StaticPageStatus = 'draft' | 'published' | 'archived';
export type BannerType = 'hero' | 'promotion' | 'announcement' | 'slider';
export type BannerStatus = 'active' | 'inactive' | 'scheduled';

export interface StaticPage {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: StaticPageStatus;
  isActive: boolean;
  template?: string;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
  };
  publishedAt?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  _id: string;
  title: string;
  description?: string;
  image: string;
  type: BannerType;
  status: BannerStatus;
  isActive: boolean;
  link?: {
    url: string;
    target: '_blank' | '_self';
    text?: string;
  };
  order: number;
  startDate?: string;
  endDate?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStaticPageData {
  title: string;
  content: string;
  excerpt?: string;
  status: StaticPageStatus;
  isActive?: boolean;
  template?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
  };
  publishedAt?: string;
}

export interface UpdateStaticPageData {
  title?: string;
  content?: string;
  excerpt?: string;
  status?: StaticPageStatus;
  isActive?: boolean;
  template?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
  };
  publishedAt?: string;
}

export interface CreateBannerData {
  title: string;
  description?: string;
  image: string;
  type: BannerType;
  status: BannerStatus;
  isActive?: boolean;
  link?: {
    url: string;
    target: '_blank' | '_self';
    text?: string;
  };
  order: number;
  startDate?: string;
  endDate?: string;
}

export interface UpdateBannerData {
  title?: string;
  description?: string;
  image?: string;
  type?: BannerType;
  status?: BannerStatus;
  isActive?: boolean;
  link?: {
    url: string;
    target: '_blank' | '_self';
    text?: string;
  };
  order?: number;
  startDate?: string;
  endDate?: string;
}

export interface ContentFilter {
  q?: string;
  status?: StaticPageStatus | 'all';
  isActive?: boolean;
  template?: string | 'all';
  createdFrom?: string;
  createdTo?: string;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface BannerFilter {
  q?: string;
  type?: BannerType | 'all';
  status?: BannerStatus | 'all';
  isActive?: boolean;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ContentListResponse {
  pages: StaticPage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface BannerListResponse {
  banners: Banner[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Static Page Service
export const staticPageService = {
  // Get all static pages with filters and pagination
  getPages: async (filter: ContentFilter = {}): Promise<ContentListResponse> => {
    const params = new URLSearchParams();

    if (filter.q) params.append('q', filter.q);
    if (filter.status && filter.status !== 'all') params.append('status', filter.status);
    if (filter.isActive !== undefined) params.append('isActive', filter.isActive.toString());
    if (filter.template && filter.template !== 'all') params.append('template', filter.template);
    if (filter.createdFrom) params.append('createdFrom', filter.createdFrom);
    if (filter.createdTo) params.append('createdTo', filter.createdTo);
    if (filter.limit) params.append('limit', filter.limit.toString());
    if (filter.page) params.append('page', filter.page.toString());
    if (filter.sortBy) params.append('sortBy', filter.sortBy);
    if (filter.sortOrder) params.append('sortOrder', filter.sortOrder);

    const response = await api.get(`/admin/static-pages?${params.toString()}`);
    return response.data;
  },

  // Get static page by ID
  getPageById: async (id: string): Promise<StaticPage> => {
    const response = await api.get(`/admin/static-pages/${id}`);
    return response.data;
  },

  // Get static page by slug
  getPageBySlug: async (slug: string): Promise<StaticPage> => {
    const response = await api.get(`/admin/static-pages/slug/${slug}`);
    return response.data;
  },

  // Create new static page
  createPage: async (pageData: CreateStaticPageData): Promise<StaticPage> => {
    const response = await api.post('/admin/static-pages', pageData);
    return response.data;
  },

  // Update static page
  updatePage: async (id: string, pageData: UpdateStaticPageData): Promise<StaticPage> => {
    const response = await api.put(`/admin/static-pages/${id}`, pageData);
    return response.data;
  },

  // Delete static page
  deletePage: async (id: string): Promise<void> => {
    await api.delete(`/admin/static-pages/${id}`);
  },

  // Bulk delete static pages
  deletePages: async (ids: string[]): Promise<void> => {
    await api.delete('/admin/static-pages/bulk', { data: { ids } });
  },

  // Update page status
  updatePageStatus: async (id: string, status: StaticPageStatus): Promise<StaticPage> => {
    const response = await api.put(`/admin/static-pages/${id}/status`, { status });
    return response.data;
  },

  // Publish page
  publishPage: async (id: string, publishedAt?: string): Promise<StaticPage> => {
    const response = await api.put(`/admin/static-pages/${id}/publish`, { publishedAt });
    return response.data;
  },

  // Unpublish page
  unpublishPage: async (id: string): Promise<StaticPage> => {
    const response = await api.put(`/admin/static-pages/${id}/unpublish`);
    return response.data;
  },

  // Toggle page active status
  togglePageActive: async (id: string): Promise<StaticPage> => {
    const response = await api.put(`/admin/static-pages/${id}/toggle-active`);
    return response.data;
  },

  // Get static page statistics
  getPageStats: async (): Promise<{
    total: number;
    byStatus: Record<StaticPageStatus, number>;
    byTemplate: Record<string, number>;
    active: number;
    published: number;
  }> => {
    const response = await api.get('/admin/static-pages/stats');
    return response.data;
  },

  // Export pages to CSV
  exportPages: async (filter: ContentFilter = {}): Promise<Blob> => {
    const params = new URLSearchParams();

    if (filter.q) params.append('q', filter.q);
    if (filter.status && filter.status !== 'all') params.append('status', filter.status);
    if (filter.isActive !== undefined) params.append('isActive', filter.isActive.toString());
    if (filter.template && filter.template !== 'all') params.append('template', filter.template);

    const response = await api.get(`/admin/static-pages/export?${params.toString()}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};

// Banner Service
export const bannerService = {
  // Get all banners with filters and pagination
  getBanners: async (filter: BannerFilter = {}): Promise<BannerListResponse> => {
    const params = new URLSearchParams();

    if (filter.q) params.append('q', filter.q);
    if (filter.type && filter.type !== 'all') params.append('type', filter.type);
    if (filter.status && filter.status !== 'all') params.append('status', filter.status);
    if (filter.isActive !== undefined) params.append('isActive', filter.isActive.toString());
    if (filter.limit) params.append('limit', filter.limit.toString());
    if (filter.page) params.append('page', filter.page.toString());
    if (filter.sortBy) params.append('sortBy', filter.sortBy);
    if (filter.sortOrder) params.append('sortOrder', filter.sortOrder);

    const response = await api.get(`/admin/banners?${params.toString()}`);
    return response.data;
  },

  // Get banner by ID
  getBannerById: async (id: string): Promise<Banner> => {
    const response = await api.get(`/admin/banners/${id}`);
    return response.data;
  },

  // Create new banner
  createBanner: async (bannerData: CreateBannerData): Promise<Banner> => {
    const response = await api.post('/admin/banners', bannerData);
    return response.data;
  },

  // Update banner
  updateBanner: async (id: string, bannerData: UpdateBannerData): Promise<Banner> => {
    const response = await api.put(`/admin/banners/${id}`, bannerData);
    return response.data;
  },

  // Delete banner
  deleteBanner: async (id: string): Promise<void> => {
    await api.delete(`/admin/banners/${id}`);
  },

  // Bulk delete banners
  deleteBanners: async (ids: string[]): Promise<void> => {
    await api.delete('/admin/banners/bulk', { data: { ids } });
  },

  // Update banner status
  updateBannerStatus: async (id: string, status: BannerStatus): Promise<Banner> => {
    const response = await api.put(`/admin/banners/${id}/status`, { status });
    return response.data;
  },

  // Toggle banner active status
  toggleBannerActive: async (id: string): Promise<Banner> => {
    const response = await api.put(`/admin/banners/${id}/toggle-active`);
    return response.data;
  },

  // Update banner order
  updateBannerOrder: async (banners: { id: string; order: number }[]): Promise<void> => {
    await api.put('/admin/banners/reorder', { banners });
  },

  // Get banner statistics
  getBannerStats: async (): Promise<{
    total: number;
    byType: Record<BannerType, number>;
    byStatus: Record<BannerStatus, number>;
    active: number;
    scheduled: number;
  }> => {
    const response = await api.get('/admin/banners/stats');
    return response.data;
  },

  // Export banners to CSV
  exportBanners: async (filter: BannerFilter = {}): Promise<Blob> => {
    const params = new URLSearchParams();

    if (filter.q) params.append('q', filter.q);
    if (filter.type && filter.type !== 'all') params.append('type', filter.type);
    if (filter.status && filter.status !== 'all') params.append('status', filter.status);
    if (filter.isActive !== undefined) params.append('isActive', filter.isActive.toString());

    const response = await api.get(`/admin/banners/export?${params.toString()}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};
