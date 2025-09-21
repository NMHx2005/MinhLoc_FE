'use client'

import { useEffect } from 'react';

export const useDisableScrollLock = () => {
    useEffect(() => {
        const disableScrollLock = () => {
            const body = document.body;
            const html = document.documentElement;

            // Only apply if there's actually a padding-right issue
            if (body.style.paddingRight && body.style.paddingRight !== '0px') {
                body.style.setProperty('padding-right', '0px', 'important');
            }

            if (html.style.paddingRight && html.style.paddingRight !== '0px') {
                html.style.setProperty('padding-right', '0px', 'important');
            }

            if (body.style.overflow === 'hidden') {
                body.style.setProperty('overflow', 'visible', 'important');
            }

            if (html.style.overflow === 'hidden') {
                html.style.setProperty('overflow', 'visible', 'important');
            }
        };

        // Initial check
        disableScrollLock();

        // Use MutationObserver to watch for style changes - less aggressive
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target as HTMLElement;
                    if (target === document.body || target === document.documentElement) {
                        shouldUpdate = true;
                    }
                }
            });

            if (shouldUpdate) {
                disableScrollLock();
            }
        });

        // Observe both body and html
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['style']
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['style']
        });

        // Less frequent interval
        const interval = setInterval(disableScrollLock, 100);

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, []);
};