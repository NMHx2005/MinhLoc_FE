'use client'

import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface TruncatedTextProps extends Omit<TypographyProps, 'children'> {
    children: string;
    lines?: number;
    showTooltip?: boolean;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({
    children,
    lines = 1,
    showTooltip = false,
    sx,
    ...props
}) => {
    const truncatedSx = {
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        lineHeight: 1.4,
        maxHeight: `${lines * 1.4}em`,
        ...sx
    };

    return (
        <Typography
            {...props}
            sx={truncatedSx}
            title={showTooltip ? children : undefined}
        >
            {children}
        </Typography>
    );
};

export default TruncatedText;
