'use client'

import { useEffect } from 'react';

const AOSProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;

        // Load AOS script dynamically
        const loadAOS = () => {
            // Check if AOS is already loaded
            if (window.AOS) {
                window.AOS.init({
                    duration: 1000,
                    easing: 'ease-out-cubic',
                    once: true,
                    offset: 120,
                    delay: 100,
                });
                return;
            }

            // Load AOS script
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
            script.async = true;
            script.onload = () => {
                if (window.AOS) {
                    window.AOS.init({
                        duration: 1000,
                        easing: 'ease-out-cubic',
                        once: true,
                        offset: 120,
                        delay: 100,
                    });
                }
            };
            document.head.appendChild(script);
        };

        // Delay to ensure DOM is ready
        setTimeout(loadAOS, 100);
    }, []);

    return <>{children}</>;
};

// Extend Window interface for TypeScript
declare global {
    interface Window {
        AOS: any;
    }
}

export default AOSProvider;
