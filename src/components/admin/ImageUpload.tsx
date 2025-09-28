'use client'

import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Alert,
    IconButton
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Image as ImageIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { uploadClient } from '../../services/api';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    error?: boolean;
    helperText?: string;
    label?: string;
    height?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    error = false,
    helperText,
    label = "Upload Image",
    height = 200
}) => {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (file: File) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Vui lòng chọn file ảnh hợp lệ');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Kích thước file không được vượt quá 5MB');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('images', file);

            const response = await uploadClient.post('/uploads/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success && response.data.data && response.data.data.length > 0) {
                onChange(response.data.data[0]);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Lỗi khi upload ảnh. Vui lòng thử lại.');
        } finally {
            setUploading(false);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleRemoveImage = () => {
        onChange('');
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                {label}
            </Typography>

            {value ? (
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: height,
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        overflow: 'hidden',
                        '&:hover .overlay': {
                            opacity: 1
                        }
                    }}
                >
                    <img
                        src={value}
                        alt="Uploaded"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    <Box
                        className="overlay"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            gap: 1
                        }}
                    >
                        <IconButton
                            onClick={handleClick}
                            sx={{ color: 'white' }}
                            disabled={uploading}
                        >
                            <CloudUploadIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleRemoveImage}
                            sx={{ color: 'white' }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            ) : (
                <Box
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={handleClick}
                    sx={{
                        width: '100%',
                        height: height,
                        border: `2px dashed ${dragOver ? '#1976d2' : '#ccc'}`,
                        borderRadius: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backgroundColor: dragOver ? '#f5f5f5' : 'transparent',
                        transition: 'all 0.2s',
                        '&:hover': {
                            borderColor: '#1976d2',
                            backgroundColor: '#f5f5f5'
                        }
                    }}
                >
                    {uploading ? (
                        <CircularProgress size={40} />
                    ) : (
                        <>
                            <ImageIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                Kéo thả ảnh vào đây hoặc click để chọn
                            </Typography>
                            <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                                Hỗ trợ: JPG, PNG, GIF (tối đa 5MB)
                            </Typography>
                        </>
                    )}
                </Box>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
            />

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

export default ImageUpload;