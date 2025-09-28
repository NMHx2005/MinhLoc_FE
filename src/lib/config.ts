export const config = {
    api: {
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1',
        timeout: 10000,
    },
    app: {
        name: process.env.NEXT_PUBLIC_APP_NAME || 'MinhLoc Group',
        version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    },
    features: {
        analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
        debug: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
    },
};
