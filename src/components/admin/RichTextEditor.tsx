'use client'

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Tabs, Tab } from '@mui/material';
import { uploadClient } from '../../services/api';

// Dynamic import để tránh lỗi SSR
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
    ssr: false,
    loading: () => <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>Loading editor...</Box>
});

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    height?: number;
    error?: boolean;
    helperText?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    height = 400,
    error = false,
    helperText
}) => {
    const [mounted, setMounted] = useState(false);
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleImageUpload = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('images', file);

            uploadClient.post('/uploads/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    if (response.data.success && response.data.data && response.data.data.length > 0) {
                        resolve(response.data.data[0]);
                    } else {
                        reject(new Error('Upload failed'));
                    }
                })
                .catch((error) => {
                    console.error('Image upload error:', error);
                    reject(error);
                });
        });
    };

    const handleImageInsert = async () => {
        if (tabValue === 0 && imageFile) {
            // Upload file
            setUploading(true);
            try {
                const uploadedUrl = await handleImageUpload(imageFile);
                insertImageToContent(uploadedUrl);
                handleCloseImageDialog();
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Lỗi khi upload ảnh. Vui lòng thử lại.');
            } finally {
                setUploading(false);
            }
        } else if (tabValue === 1 && imageUrl.trim()) {
            // Use URL
            insertImageToContent(imageUrl.trim());
            handleCloseImageDialog();
        }
    };

    const insertImageToContent = (url: string) => {
        const imageMarkdown = `![Image](${url})`;
        const currentContent = value || '';

        // Ensure proper spacing and formatting
        let newContent;
        if (currentContent.trim() === '') {
            newContent = imageMarkdown;
        } else if (currentContent.endsWith('\n')) {
            newContent = currentContent + imageMarkdown;
        } else {
            newContent = currentContent + '\n\n' + imageMarkdown;
        }

        onChange(newContent);
    };

    const handleCloseImageDialog = () => {
        setImageDialogOpen(false);
        setImageUrl('');
        setImageFile(null);
        setTabValue(0);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    if (!mounted) {
        return (
            <Box sx={{
                height: height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#f5f5f5'
            }}>
                Loading editor...
            </Box>
        );
    }

    return (
        <Box>
            {/* Custom Toolbar */}
            <Box sx={{
                display: 'flex',
                gap: 1,
                mb: 1,
                p: 1,
                border: '1px solid #e0e0e0',
                borderRadius: '4px 4px 0 0',
                backgroundColor: '#f5f5f5'
            }}>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setImageDialogOpen(true)}
                    sx={{ fontSize: '12px' }}
                >
                    📷 Chèn ảnh
                </Button>
            </Box>

            <Box sx={{
                '& .w-md-editor': {
                    height: height,
                },
                '& .w-md-editor-text': {
                    fontSize: '14px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif',
                    lineHeight: 1.6,
                },
                '& .w-md-editor-preview': {
                    fontSize: '14px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif',
                    lineHeight: 1.6,
                },
                '& .w-md-editor-preview p': {
                    margin: '0 0 16px 0',
                },
                '& .w-md-editor-preview h1, .w-md-editor-preview h2, .w-md-editor-preview h3': {
                    margin: '24px 0 16px 0',
                    fontWeight: 600,
                },
                '& .w-md-editor-preview img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '4px',
                    margin: '16px 0',
                },
                '& .w-md-editor-preview blockquote': {
                    borderLeft: '4px solid #e0e0e0',
                    margin: '16px 0',
                    padding: '0 16px',
                    color: '#666',
                    fontStyle: 'italic',
                }
            }}>
                <MDEditor
                    value={value}
                    onChange={(val) => onChange(val || '')}
                    height={height}
                    data-color-mode="light"
                    visibleDragbar={false}
                    preview="edit"
                    hideToolbar={false}
                    textareaProps={{
                        placeholder: 'Nhập nội dung bài viết...',
                        style: {
                            fontSize: '14px',
                            fontFamily: '-apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif',
                        }
                    }}
                />
            </Box>

            {/* Image Insert Dialog */}
            <Dialog open={imageDialogOpen} onClose={handleCloseImageDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Chèn ảnh vào nội dung</DialogTitle>
                <DialogContent>
                    <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
                        <Tab label="Upload ảnh" />
                        <Tab label="Nhập URL" />
                    </Tabs>

                    {tabValue === 0 && (
                        <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Chọn ảnh từ máy tính để upload
                            </Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                            {imageFile && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2" color="success.main">
                                        Đã chọn: {imageFile.name}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    {tabValue === 1 && (
                        <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Nhập URL của ảnh
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="https://example.com/image.jpg"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                variant="outlined"
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseImageDialog}>Hủy</Button>
                    <Button
                        onClick={handleImageInsert}
                        variant="contained"
                        disabled={uploading || (tabValue === 0 && !imageFile) || (tabValue === 1 && !imageUrl.trim())}
                    >
                        {uploading ? 'Đang upload...' : 'Chèn ảnh'}
                    </Button>
                </DialogActions>
            </Dialog>

            {error && helperText && (
                <Alert severity="error" sx={{ mt: 1 }}>
                    {helperText}
                </Alert>
            )}
            {!error && helperText && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {helperText}
                </Typography>
            )}
        </Box>
    );
};

export default RichTextEditor;