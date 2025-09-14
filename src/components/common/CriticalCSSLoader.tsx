'use client'

import { useEffect } from 'react';

const CriticalCSSLoader: React.FC = () => {
    useEffect(() => {
        // Load critical CSS dynamically
        const loadCriticalCSS = () => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/critical.css';
            link.type = 'text/css';
            link.media = 'all';

            // Add error handling
            link.onerror = () => {
                console.warn('Failed to load critical CSS, using fallback');
                // Fallback inline styles
                const fallbackStyle = document.createElement('style');
                fallbackStyle.textContent = `
          * { box-sizing: border-box; }
          body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            line-height: 1.6;
            color: #1a1a1a;
            background-color: #ffffff;
          }
          html { scroll-behavior: smooth; }
        `;
                document.head.appendChild(fallbackStyle);
            };

            link.onload = () => {
                console.log('Critical CSS loaded successfully');
            };

            document.head.appendChild(link);
        };

        // Only load if not already loaded
        if (!document.querySelector('link[href="/critical.css"]')) {
            loadCriticalCSS();
        }
    }, []);

    return null;
};

export default CriticalCSSLoader;
