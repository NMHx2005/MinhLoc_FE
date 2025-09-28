/**
 * Utility functions for formatting data
 */

/**
 * Format price with proper units and currency
 * @param price - The price number
 * @param currency - The currency code (VND, USD, etc.)
 * @returns Formatted price string
 */
export const formatPrice = (price: number, currency: string = 'VND'): string => {
    if (!price || price === 0) return '0 VND';

    if (currency === 'VND') {
        // Format VND with proper units
        if (price >= 1000000000) {
            return `${(price / 1000000000).toFixed(1)}B VND`;
        } else if (price >= 1000000) {
            return `${(price / 1000000).toFixed(1)}M VND`;
        } else if (price >= 1000) {
            return `${(price / 1000).toFixed(1)}K VND`;
        } else {
            return `${price.toLocaleString()} VND`;
        }
    }

    // For other currencies, use standard formatting
    return `${price.toLocaleString()} ${currency}`;
};

/**
 * Format area with proper units
 * @param area - The area number
 * @param unit - The unit (m2, sqft, etc.)
 * @returns Formatted area string
 */
export const formatArea = (area: number, unit: string = 'm²'): string => {
    if (!area || area === 0) return `0 ${unit}`;

    if (area >= 1000000) {
        return `${(area / 1000000).toFixed(1)}M ${unit}`;
    } else if (area >= 1000) {
        return `${(area / 1000).toFixed(1)}K ${unit}`;
    } else {
        return `${area.toLocaleString()} ${unit}`;
    }
};

/**
 * Format percentage
 * @param value - The percentage value
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
    if (!value || value === 0) return '0%';
    return `${value.toFixed(decimals)}%`;
};

/**
 * Format date to Vietnamese locale
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
};

/**
 * Format date and time to Vietnamese locale
 * @param date - Date string or Date object
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: string | Date): string => {
    if (!date) return '';
    return new Date(date).toLocaleString('vi-VN');
};

/**
 * Format number with thousand separators
 * @param num - The number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
    if (!num || num === 0) return '0';
    return num.toLocaleString();
};
