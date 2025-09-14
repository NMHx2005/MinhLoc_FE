'use client'

import { useEffect } from 'react';

interface LayoutShift extends PerformanceEntry {
    value: number;
    hadRecentInput: boolean;
}

const PerformanceMonitor: React.FC = () => {
    useEffect(() => {
        // Only run in production
        if (process.env.NODE_ENV !== 'production') return;

        // Monitor Core Web Vitals
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // Log LCP (Largest Contentful Paint)
                if (entry.entryType === 'largest-contentful-paint') {
                    console.warn('LCP:', entry.startTime);
                }

                // Log FID (First Input Delay)
                if (entry.entryType === 'first-input') {
                    const fidEntry = entry as PerformanceEventTiming;
                    console.warn('FID:', fidEntry.processingStart - fidEntry.startTime);
                }

                // Log CLS (Cumulative Layout Shift)
                if (entry.entryType === 'layout-shift' && !(entry as LayoutShift).hadRecentInput) {
                    console.warn('CLS:', (entry as LayoutShift).value);
                }
            }
        });

        // Observe different types of performance entries
        try {
            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        } catch {
            // Some browsers don't support all entry types
            console.warn('Performance monitoring not fully supported');
        }

        // Monitor resource loading times
        const resourceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'resource') {
                    const resource = entry as PerformanceResourceTiming;
                    if (resource.duration > 1000) { // Log resources taking more than 1 second
                        console.warn('Slow resource:', resource.name, resource.duration + 'ms');
                    }
                }
            }
        });

        try {
            resourceObserver.observe({ entryTypes: ['resource'] });
        } catch {
            console.warn('Resource monitoring not supported');
        }

        // Cleanup
        return () => {
            observer.disconnect();
            resourceObserver.disconnect();
        };
    }, []);

    return null;
};

export default PerformanceMonitor;
