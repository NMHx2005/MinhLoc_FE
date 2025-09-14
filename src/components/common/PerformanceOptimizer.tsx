'use client'

import { useEffect } from 'react';

const PerformanceOptimizer: React.FC = () => {
    useEffect(() => {
        // Defer non-critical JavaScript
        const deferNonCriticalJS = () => {
            const scripts = document.querySelectorAll('script:not([data-critical])');
            scripts.forEach(script => {
                if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
                    script.setAttribute('defer', 'true');
                }
            });
        };

        // Optimize third-party scripts
        const optimizeThirdPartyScripts = () => {
            const thirdPartyScripts = document.querySelectorAll('script[src*="analytics"], script[src*="gtag"], script[src*="facebook"]');
            thirdPartyScripts.forEach(script => {
                script.setAttribute('defer', 'true');
                script.setAttribute('loading', 'lazy');
            });
        };

        // Preload critical resources
        const preloadCriticalResources = () => {
            // Preload banner image (LCP element)
            if (!document.querySelector('link[href="/banner.png"]')) {
                const bannerLink = document.createElement('link');
                bannerLink.rel = 'preload';
                bannerLink.as = 'image';
                bannerLink.href = '/banner.png';
                bannerLink.fetchPriority = 'high';
                document.head.appendChild(bannerLink);
            }

            // Preload logo (above the fold)
            if (!document.querySelector('link[href="/Logo_MinhLocGroup.png"]')) {
                const logoLink = document.createElement('link');
                logoLink.rel = 'preload';
                logoLink.as = 'image';
                logoLink.href = '/Logo_MinhLocGroup.png';
                logoLink.fetchPriority = 'high';
                document.head.appendChild(logoLink);
            }
        };

        // Optimize images
        const optimizeImages = () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
                if (!img.hasAttribute('decoding')) {
                    img.setAttribute('decoding', 'async');
                }
            });
        };

        // Optimize fonts
        const optimizeFonts = () => {
            // Add font-display: swap to all font faces
            const style = document.createElement('style');
            style.textContent = `
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
      `;
            document.head.appendChild(style);
        };

        // Run optimizations
        deferNonCriticalJS();
        optimizeThirdPartyScripts();
        preloadCriticalResources();
        optimizeImages();
        optimizeFonts();

        // Cleanup function
        return () => {
            // Remove any dynamically added elements if needed
        };
    }, []);

    return null;
};

export default PerformanceOptimizer;
