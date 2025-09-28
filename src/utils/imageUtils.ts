/**
 * Utility functions for image optimization and display
 */

/**
 * Optimize image URL for better performance and quality
 * @param url - Original image URL
 * @param width - Desired width (default: 800)
 * @param height - Desired height (default: 450)
 * @param quality - Image quality (default: 'auto')
 * @returns Optimized image URL
 */
export const optimizeImageUrl = (
    url: string,
    width: number = 800,
    height: number = 450,
    quality: string = 'auto'
): string => {
    // If it's a Cloudinary URL, add optimization parameters
    if (url.includes('cloudinary.com')) {
        const baseUrl = url.split('/upload/')[0];
        const publicId = url.split('/upload/')[1];
        return `${baseUrl}/upload/w_${width},h_${height},c_fill,q_${quality},f_auto/${publicId}`;
    }

    // If it's a placeholder URL, update dimensions
    if (url.includes('via.placeholder.com')) {
        return url.replace(/\d+x\d+/, `${width}x${height}`);
    }

    return url;
};

/**
 * Get optimized image URL for different use cases
 */
export const getOptimizedImageUrl = {
    // For project detail pages - large images
    detail: (url: string) => optimizeImageUrl(url, 800, 450),

    // For project list thumbnails
    thumbnail: (url: string) => optimizeImageUrl(url, 80, 45),

    // For project cards in grid view
    card: (url: string) => optimizeImageUrl(url, 400, 225),

    // For project gallery
    gallery: (url: string) => optimizeImageUrl(url, 600, 338),

    // For sample images
    sample: (url: string) => optimizeImageUrl(url, 800, 450),
};

/**
 * Get placeholder image URL for different sizes
 */
export const getPlaceholderImage = {
    detail: () => 'https://via.placeholder.com/800x450/cccccc/666666?text=Image+Error',
    thumbnail: () => 'https://via.placeholder.com/80x45/cccccc/666666?text=No+Image',
    card: () => 'https://via.placeholder.com/400x225/cccccc/666666?text=No+Image',
    gallery: () => 'https://via.placeholder.com/600x338/cccccc/666666?text=Image+Error',
    sample: () => 'https://via.placeholder.com/800x450/cccccc/666666?text=Sample+Image',
};

/**
 * Common image styles for consistent display
 */
export const imageStyles = {
    // Standard 16:9 aspect ratio container
    container16x9: {
        position: 'relative' as const,
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        borderRadius: 2,
        border: '1px solid #e0e0e0',
    },

    // Image with hover effects
    imageWithHover: {
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const,
        transition: 'transform 0.3s ease-in-out',
        filter: 'brightness(1.05) contrast(1.02)',
        '&:hover': {
            transform: 'scale(1.05)',
            filter: 'brightness(1.1) contrast(1.05)',
        },
    },

    // Watermark overlay to hide unwanted elements
    watermarkOverlay: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)',
        opacity: 0.3,
        pointerEvents: 'none' as const,
    },

    // Hover overlay for interactive elements
    hoverOverlay: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            opacity: 1,
        },
    },

    // Image number badge
    imageBadge: {
        position: 'absolute' as const,
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        borderRadius: '50%',
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
    },
};

/**
 * Handle image load error with fallback
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl?: string) => {
    const target = e.target as HTMLImageElement;
    target.src = fallbackUrl || getPlaceholderImage.detail();
};

/**
 * Handle image load success with optimization
 */
export const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    img.style.filter = 'brightness(1.05) contrast(1.02)';
};
