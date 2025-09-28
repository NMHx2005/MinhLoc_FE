export type ProjectStatus = 'available' | 'sold' | 'coming-soon' | 'planning' | 'construction' | 'completed' | 'on-hold' | 'cancelled';
export type ProjectType = 'apartment' | 'villa' | 'commercial' | 'land' | 'office' | 'hotel';

export interface ProjectDTO {
    id: number;
    slug: string;
    name: string;
    type: ProjectType;
    city: string;
    district: string;
    location: string;
    priceVnd: number;
    priceLabel: string;
    areaM2: number;
    areaLabel: string;
    bedrooms?: number;
    bathrooms?: number;
    image: string;
    status: ProjectStatus;
    description: string;
    features: string[];
    createdAt: string; // ISO date string
}

export interface ProjectFilter {
    q?: string;
    type?: ProjectType | 'all';
    status?: ProjectStatus | 'all';
    city?: string | 'all';
    district?: string | 'all';
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
    limit?: number;
    offset?: number;
}

const MOCK_PROJECTS: ProjectDTO[] = [
    {
        id: 1,
        slug: 'chung-cu-green-valley',
        name: 'Chung cư Green Valley',
        type: 'apartment',
        city: 'TP.HCM',
        district: 'Quận 2',
        location: 'Quận 2, TP.HCM',
        priceVnd: 3_500_000_000,
        priceLabel: '3,5 tỷ',
        areaM2: 85,
        areaLabel: '85m²',
        bedrooms: 3,
        bathrooms: 2,
        image: '/article-1.png',
        status: 'available',
        description: 'Dự án chung cư cao cấp với thiết kế hiện đại, tiện ích đầy đủ',
        features: ['Hồ bơi', 'Gym', 'Vườn cây', 'Bảo vệ 24/7'],
        createdAt: '2025-09-15T08:00:00.000Z',
    },
    {
        id: 2,
        slug: 'biet-thu-royal-garden',
        name: 'Biệt thự Royal Garden',
        type: 'villa',
        city: 'TP.HCM',
        district: 'Quận 7',
        location: 'Quận 7, TP.HCM',
        priceVnd: 15_000_000_000,
        priceLabel: '15 tỷ',
        areaM2: 250,
        areaLabel: '250m²',
        bedrooms: 5,
        bathrooms: 4,
        image: '/article-2.png',
        status: 'available',
        description: 'Biệt thự sang trọng với không gian sống rộng rãi',
        features: ['Sân vườn', 'Garage', 'Hồ bơi riêng', 'Thang máy'],
        createdAt: '2025-09-10T09:00:00.000Z',
    },
    {
        id: 3,
        slug: 'van-phong-sky-tower',
        name: 'Tòa nhà văn phòng Sky Tower',
        type: 'commercial',
        city: 'TP.HCM',
        district: 'Quận 1',
        location: 'Quận 1, TP.HCM',
        priceVnd: 25_000_000_000,
        priceLabel: '25 tỷ',
        areaM2: 500,
        areaLabel: '500m²',
        image: '/article-3.png',
        status: 'coming-soon',
        description: 'Tòa nhà văn phòng cao cấp tại trung tâm thành phố',
        features: ['Parking', 'Thang máy', 'Hệ thống an ninh', 'View đẹp'],
        createdAt: '2025-09-05T10:00:00.000Z',
    },
    {
        id: 4,
        slug: 'dat-nen-golden-land',
        name: 'Đất nền Golden Land',
        type: 'land',
        city: 'TP.HCM',
        district: 'Quận 9',
        location: 'Quận 9, TP.HCM',
        priceVnd: 8_000_000_000,
        priceLabel: '8 tỷ',
        areaM2: 100,
        areaLabel: '100m²',
        image: '/article-4.png',
        status: 'available',
        description: 'Đất nền có vị trí đắc địa, tiềm năng phát triển cao',
        features: ['Mặt tiền đường', 'Gần trường học', 'Gần bệnh viện', 'Giao thông thuận tiện'],
        createdAt: '2025-09-18T02:00:00.000Z',
    },
];

export async function fetchProjects(filter: ProjectFilter): Promise<ProjectDTO[]> {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 200));

    const {
        q = '',
        type = 'all',
        status = 'all',
        city = 'all',
        district = 'all',
        minPrice = 0,
        maxPrice = Number.MAX_SAFE_INTEGER,
        minArea = 0,
        maxArea = Number.MAX_SAFE_INTEGER,
        limit = 100,
        offset = 0,
    } = filter;

    const qLower = q.trim().toLowerCase();

    const filtered = MOCK_PROJECTS.filter((p) => {
        const matchesQ = !qLower || p.name.toLowerCase().includes(qLower) || p.location.toLowerCase().includes(qLower);
        const matchesType = type === 'all' || p.type === type;
        const matchesStatus = status === 'all' || p.status === status;
        const matchesCity = city === 'all' || p.city === city;
        const matchesDistrict = district === 'all' || p.district === district;
        const matchesPrice = p.priceVnd >= minPrice && p.priceVnd <= maxPrice;
        const matchesArea = p.areaM2 >= minArea && p.areaM2 <= maxArea;
        return matchesQ && matchesType && matchesStatus && matchesCity && matchesDistrict && matchesPrice && matchesArea;
    })
        // newest first
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return filtered.slice(offset, offset + limit);
}

