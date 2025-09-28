'use client'

import React from 'react';
import { Box, Typography } from '@mui/material';

interface CustomProgressBarProps {
    value: number;
    max?: number;
    height?: number;
    color?: string;
    backgroundColor?: string;
    borderRadius?: number;
    showPercentage?: boolean;
    showValue?: boolean;
    label?: string;
    valueLabel?: string;
    percentagePosition?: 'inside' | 'outside' | 'right';
    animated?: boolean;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({
    value,
    max = 100,
    height = 8,
    color = '#1976d2',
    backgroundColor = 'rgba(0,0,0,0.1)',
    borderRadius = 4,
    showPercentage = true,
    showValue = false,
    label,
    valueLabel,
    percentagePosition = 'right',
    animated = true,
}) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <Box sx={{ width: '100%' }}>
            {/* Label and Value Row */}
            {(label || valueLabel) && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    {label && (
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {label}
                        </Typography>
                    )}
                    {valueLabel && (
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {valueLabel}
                        </Typography>
                    )}
                </Box>
            )}

            {/* Progress Bar Container */}
            <Box sx={{ position: 'relative', width: '100%' }}>
                {/* Background Bar */}
                <Box
                    sx={{
                        width: '100%',
                        height: height,
                        backgroundColor: backgroundColor,
                        borderRadius: borderRadius,
                        overflow: 'hidden',
                    }}
                >
                    {/* Progress Bar */}
                    <Box
                        sx={{
                            width: `${percentage}%`,
                            height: '100%',
                            backgroundColor: color,
                            borderRadius: borderRadius,
                            transition: animated ? 'width 0.6s ease-in-out' : 'none',
                            position: 'relative',
                        }}
                    >
                        {/* Percentage inside bar (if position is inside) */}
                        {showPercentage && percentagePosition === 'inside' && percentage > 15 && (
                            <Typography
                                variant="caption"
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                }}
                            >
                                {Math.round(percentage)}%
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* Percentage outside bar (if position is outside or right) */}
                {showPercentage && (percentagePosition === 'outside' || percentagePosition === 'right') && (
                    <Typography
                        variant="caption"
                        sx={{
                            position: 'absolute',
                            right: percentagePosition === 'right' ? 0 : -40,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: color,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            backgroundColor: percentagePosition === 'outside' ? 'white' : 'transparent',
                            padding: percentagePosition === 'outside' ? '2px 6px' : 0,
                            borderRadius: percentagePosition === 'outside' ? 1 : 0,
                            border: percentagePosition === 'outside' ? `1px solid ${color}` : 'none',
                            minWidth: percentagePosition === 'outside' ? 35 : 'auto',
                            textAlign: 'center',
                        }}
                    >
                        {Math.round(percentage)}%
                    </Typography>
                )}

                {/* Value display (if enabled) */}
                {showValue && (
                    <Typography
                        variant="caption"
                        sx={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'text.secondary',
                            fontWeight: 500,
                            fontSize: '0.7rem',
                        }}
                    >
                        {value}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default CustomProgressBar;
