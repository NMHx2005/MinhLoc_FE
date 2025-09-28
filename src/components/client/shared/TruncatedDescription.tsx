'use client'

import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface TruncatedDescriptionProps extends Omit<BoxProps, 'children'> {
    children: string;
    maxLines?: number;
    lineHeight?: number;
    fontSize?: string;
}

const TruncatedDescription: React.FC<TruncatedDescriptionProps> = ({
    children,
    maxLines = 4,
    lineHeight = 1.4,
    fontSize = '0.9rem',
    ...props
}) => {
    return (
        <Box
            sx={{
                fontSize,
                lineHeight,
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                height: `${maxLines * lineHeight}em`,
                ...props.sx
            }}
            title={children}
            {...props}
        >
            {children}
        </Box>
    );
};

export default TruncatedDescription;
