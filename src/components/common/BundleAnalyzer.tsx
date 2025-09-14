'use client'

import { useEffect } from 'react';

const BundleAnalyzer: React.FC = () => {
    useEffect(() => {
        // Defer non-critical JavaScript
        const deferNonCriticalJS = () => {
            // Defer all scripts except critical ones
            const scripts = document.querySelectorAll('script:not([data-critical])');
            scripts.forEach(script => {
                if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
                    script.setAttribute('defer', 'true');
                }
            });
        };

        // Optimize third-party scripts
        const optimizeThirdPartyScripts = () => {
            // Add loading="lazy" to non-critical scripts
            const thirdPartyScripts = document.querySelectorAll('script[src*="analytics"], script[src*="gtag"], script[src*="facebook"]');
            thirdPartyScripts.forEach(script => {
                script.setAttribute('defer', 'true');
                script.setAttribute('loading', 'lazy');
            });
        };

        // Preload critical resources
        const preloadCriticalResources = () => {
            // Only preload banner image (LCP element)
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

        // Run optimizations
        deferNonCriticalJS();
        optimizeThirdPartyScripts();
        preloadCriticalResources();

        // Cleanup function
        return () => {
            // Remove any dynamically added elements if needed
        };
    }, []);

    return null;
};

export default BundleAnalyzer;
