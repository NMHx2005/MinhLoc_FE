'use client'

import { useEffect } from 'react';
import { initAOS } from '@/lib/aos';

const AOSProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        initAOS();
    }, []);

    return <>{children}</>;
};

export default AOSProvider;
