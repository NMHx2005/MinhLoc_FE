'use client'
import React, { useEffect } from 'react';

const FontLoaderOptimized: React.FC = () => {
    useEffect(() => {
        const loadFonts = () => {
            // Check if fonts are already loaded
            if (document.querySelector('link[href*="fonts.googleapis.com"]')) {
                return;
            }

            const fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
            fontLink.onload = () => {
                document.documentElement.style.setProperty('--font-loaded', 'true');
            };
            fontLink.onerror = () => {
                document.documentElement.style.setProperty('--font-loaded', 'false');
            };
            document.head.appendChild(fontLink);
        };

        // Load fonts after a short delay to prioritize critical resources
        const timeoutId = setTimeout(loadFonts, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return null;
};

export default FontLoaderOptimized;
