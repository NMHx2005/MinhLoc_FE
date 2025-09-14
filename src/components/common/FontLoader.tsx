'use client'

import { useEffect } from 'react';

const FontLoader: React.FC = () => {
    useEffect(() => {
        // Dynamic font loading with fallback
        const loadFonts = () => {
            const fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
            fontLink.onload = () => {
                // Font loaded successfully
                document.documentElement.style.setProperty('--font-loaded', 'true');
            };
            fontLink.onerror = () => {
                // Fallback to system fonts
                document.documentElement.style.setProperty('--font-loaded', 'false');
            };
            document.head.appendChild(fontLink);
        };

        // Only load fonts if not already loaded
        if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
            loadFonts();
        }
    }, []);

    return null;
};

export default FontLoader;
