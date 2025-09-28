'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

// Dynamic import để tránh lỗi SSR
const ReactMarkdown = dynamic(() => import('react-markdown'), {
    ssr: false,
    loading: () => <Box sx={{ p: 2 }}>Loading...</Box>
});

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
    // Clean up malformed markdown
    const cleanContent = content
        // Fix broken image markdown that spans multiple lines
        .replace(/!\[([^\]]*)\]\s*\n\s*\(([^)]+)\)/g, '![$1]($2)')
        // Fix any other malformed markdown patterns
        .replace(/\*\*\s*\n/g, '**\n')
        .replace(/\n\s*\*\*/g, '\n**')
        // Clean up extra whitespace
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    return (
        <Box
            className={className}
            sx={{
                fontSize: '16px',
                lineHeight: 1.8,
                fontFamily: '-apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif',
                '& p': {
                    margin: '0 0 16px 0',
                },
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                    margin: '24px 0 16px 0',
                    fontWeight: 600,
                    lineHeight: 1.3,
                },
                '& h1': {
                    fontSize: '2rem',
                },
                '& h2': {
                    fontSize: '1.5rem',
                },
                '& h3': {
                    fontSize: '1.25rem',
                },
                '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    margin: '16px 0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                },
                '& blockquote': {
                    borderLeft: '4px solid #e0e0e0',
                    margin: '16px 0',
                    padding: '0 16px',
                    color: '#666',
                    fontStyle: 'italic',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '0 4px 4px 0',
                },
                '& ul, & ol': {
                    margin: '16px 0',
                    paddingLeft: '24px',
                },
                '& li': {
                    margin: '8px 0',
                },
                '& strong': {
                    fontWeight: 600,
                },
                '& em': {
                    fontStyle: 'italic',
                },
                '& code': {
                    backgroundColor: '#f5f5f5',
                    padding: '2px 4px',
                    borderRadius: '3px',
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                    fontSize: '0.9em',
                },
                '& pre': {
                    backgroundColor: '#f5f5f5',
                    padding: '16px',
                    borderRadius: '8px',
                    overflow: 'auto',
                    margin: '16px 0',
                },
                '& pre code': {
                    backgroundColor: 'transparent',
                    padding: 0,
                },
                '& a': {
                    color: '#1976d2',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                },
                '& table': {
                    width: '100%',
                    borderCollapse: 'collapse',
                    margin: '16px 0',
                },
                '& th, & td': {
                    border: '1px solid #e0e0e0',
                    padding: '8px 12px',
                    textAlign: 'left',
                },
                '& th': {
                    backgroundColor: '#f5f5f5',
                    fontWeight: 600,
                },
            }}
        >
            <ReactMarkdown>
                {cleanContent}
            </ReactMarkdown>
        </Box>
    );
};

export default MarkdownRenderer;
