'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Container,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';

// Number counting hook
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(end * easeOutCubic));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [end, duration, start]);

    return count;
};

const Statistics: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const statistics = [
        {
            id: 1,
            number: 1500,
            suffix: '',
            unit: 'Tỷ đồng vốn điều lệ',
        },
        {
            id: 2,
            number: 3000,
            suffix: '+',
            unit: 'Căn hộ bán ra mỗi năm',
        },
        {
            id: 3,
            number: 100,
            suffix: '+',
            unit: 'Dự án trải dài khắp cả nước',
        },
        {
            id: 4,
            number: 500,
            suffix: '+',
            unit: 'Đội ngũ nhân lực',
        }
    ];

    return (
        <Box
            ref={ref}
            component="section"
            className="statistics-section"
            sx={{
                py: 8,
                backgroundImage: 'url(https://datxanhmiennam.com.vn/Data/Sites/1/skins/default/images/parameter_bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#E7C873', // Blue overlay
                    opacity: 0.3,
                    zIndex: 1,
                }
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                {/* Statistics Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: { xs: 4, md: 6 },
                    }}
                >
                    {statistics.map((stat, index) => {
                        const CounterComponent = () => {
                            const count = useCountUp(stat.number, 2000 + index * 200, isInView);

                            // Format number with commas
                            const formatNumber = (num: number) => {
                                if (num >= 1000) {
                                    return (num / 1000).toLocaleString('vi-VN', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 1
                                    }).replace(',', '.');
                                }
                                return num.toString();
                            };

                            return (
                                <Typography
                                    variant="h2"
                                    component="div"
                                    sx={{
                                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                                        fontWeight: 700,
                                        color: 'white',
                                        mb: 2,
                                        lineHeight: 1,
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                    }}
                                >
                                    {formatNumber(count)}{stat.suffix}
                                </Typography>
                            );
                        };

                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                viewport={{ once: true }}
                            >
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        border: '2px solid #E7C873',
                                        borderRadius: 1,
                                        py: 4,
                                        px: 3,
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(5px)',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                            borderColor: '#ffffff',
                                        },
                                    }}
                                >
                                    {/* Animated Number */}
                                    <CounterComponent />

                                    {/* Unit/Description */}
                                    <Typography
                                        variant="body1"
                                        component="div"
                                        sx={{
                                            fontSize: { xs: '0.9rem', md: '1rem' },
                                            fontWeight: 500,
                                            color: 'white',
                                            lineHeight: 1.4,
                                            textAlign: 'center',
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                        }}
                                    >
                                        {stat.unit}
                                    </Typography>
                                </Box>
                            </motion.div>
                        );
                    })}
                </Box>
            </Container>
        </Box>
    );
};

export default Statistics;
