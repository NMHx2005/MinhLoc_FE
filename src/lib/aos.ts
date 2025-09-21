'use client'

import AOS from 'aos';

export const initAOS = () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 120,
        delay: 100,
    });
};

export default AOS;
