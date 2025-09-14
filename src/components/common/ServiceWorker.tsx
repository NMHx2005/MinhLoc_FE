'use client'

import { useEffect } from 'react';

const ServiceWorker: React.FC = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.warn('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.error('SW registration failed: ', registrationError);
                });
        }
    }, []);

    return null;
};

export default ServiceWorker;
