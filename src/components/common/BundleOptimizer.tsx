'use client'

import { useEffect } from 'react';

const BundleOptimizer: React.FC = () => {
    useEffect(() => {
        // Preload critical resources
        const preloadCriticalResources = () => {
            // Only preload banner image (LCP element)
            const bannerLink = document.createElement('link');
            bannerLink.rel = 'preload';
            bannerLink.as = 'image';
            bannerLink.href = '/banner.png';
            bannerLink.fetchPriority = 'high';
            document.head.appendChild(bannerLink);

            // Preload logo (above the fold)
            const logoLink = document.createElement('link');
            logoLink.rel = 'preload';
            logoLink.as = 'image';
            logoLink.href = '/Logo_MinhLocGroup.png';
            logoLink.fetchPriority = 'high';
            document.head.appendChild(logoLink);
        };

        // Defer non-critical resources
        const deferNonCriticalResources = () => {
            // Defer analytics and tracking scripts
            const analyticsScripts = document.querySelectorAll('script[src*="analytics"], script[src*="gtag"]');
            analyticsScripts.forEach(script => {
                script.setAttribute('defer', 'true');
            });
        };

        // Optimize third-party scripts
        const optimizeThirdPartyScripts = () => {
            // Add loading="lazy" to non-critical scripts
            const scripts = document.querySelectorAll('script:not([src*="critical"])');
            scripts.forEach(script => {
                if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
                    script.setAttribute('defer', 'true');
                }
            });
        };

        // Run optimizations
        preloadCriticalResources();
        deferNonCriticalResources();
        optimizeThirdPartyScripts();

        // Cleanup function
        return () => {
            // Remove any dynamically added elements if needed
        };
    }, []);

    return null;
};

export default BundleOptimizer;
