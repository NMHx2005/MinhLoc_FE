'use client'

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    TextField,
    Grid,
    IconButton,
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    LocalOffer as TagIcon,
} from '@mui/icons-material';

const NewsTagsManagement: React.FC = () => {
    const [tags, setTags] = useState([
        { id: 1, name: 'BDS', count: 15, color: '#1976d2' },
        { id: 2, name: 'Đầu tư', count: 12, color: '#388e3c' },
        { id: 3, name: 'Sâm Ngọc Linh', count: 8, color: '#f57c00' },
        { id: 4, name: 'Kontum', count: 6, color: '#7b1fa2' },
        { id: 5, name: 'Y học', count: 5, color: '#d32f2f' },
        { id: 6, name: 'Thuế', count: 4, color: '#1976d2' },
        { id: 7, name: 'Chính sách', count: 3, color: '#388e3c' },
        { id: 8, name: 'Sâm Hàn Quốc', count: 7, color: '#f57c00' },
        { id: 9, name: 'Sức khỏe', count: 9, color: '#7b1fa2' },
        { id: 10, name: 'Căn hộ', count: 11, color: '#d32f2f' },
    ]);

    const [newTag, setNewTag] = useState('');

    const handleAddTag = () => {
        if (newTag.trim() && !tags.find(tag => tag.name.toLowerCase() === newTag.toLowerCase())) {
            const newTagItem = {
                id: Math.max(...tags.map(t => t.id)) + 1,
                name: newTag.trim(),
                count: 0,
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
            };
            setTags([...tags, newTagItem]);
            setNewTag('');
        }
    };

    const handleDeleteTag = (tagId: number) => {
        setTags(tags.filter(tag => tag.id !== tagId));
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Quản lý Tags ({tags.length})
                </Typography>
            </Box>

            {/* Add New Tag */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TagIcon sx={{ color: '#E7C873' }} />
                        Thêm Tag Mới
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Nhập tên tag..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddTag();
                                }
                            }}
                            size="small"
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddTag}
                            startIcon={<AddIcon />}
                            sx={{
                                backgroundColor: '#E7C873',
                                color: '#000',
                                '&:hover': {
                                    backgroundColor: '#d4b86a',
                                },
                                minWidth: 120
                            }}
                        >
                            Thêm
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Tags Cloud */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Tags Cloud
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {tags
                            .sort((a, b) => b.count - a.count)
                            .map((tag) => (
                                <Chip
                                    key={tag.id}
                                    label={`${tag.name} (${tag.count})`}
                                    sx={{
                                        backgroundColor: tag.color,
                                        color: 'white',
                                        fontSize: Math.max(0.7 + (tag.count / 20), 0.7) + 'rem',
                                        height: 'auto',
                                        '& .MuiChip-label': {
                                            px: 2,
                                            py: 1
                                        }
                                    }}
                                    onDelete={() => handleDeleteTag(tag.id)}
                                    deleteIcon={<DeleteIcon sx={{ color: 'white !important' }} />}
                                />
                            ))}
                    </Box>
                </CardContent>
            </Card>

            {/* Tags Statistics */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Top Tags
                            </Typography>
                            {tags
                                .sort((a, b) => b.count - a.count)
                                .slice(0, 5)
                                .map((tag, index) => (
                                    <Box key={tag.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2" sx={{ minWidth: 20 }}>
                                                #{index + 1}
                                            </Typography>
                                            <Chip
                                                label={tag.name}
                                                size="small"
                                                sx={{ backgroundColor: tag.color, color: 'white' }}
                                            />
                                        </Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {tag.count} bài viết
                                        </Typography>
                                    </Box>
                                ))}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Thống kê Tags
                            </Typography>
                            <Box sx={{ display: 'grid', gap: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Tổng số tags:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {tags.length}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Tổng lượt sử dụng:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {tags.reduce((sum, tag) => sum + tag.count, 0)}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Tag phổ biến nhất:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {tags.sort((a, b) => b.count - a.count)[0]?.name || 'N/A'}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Trung bình lượt sử dụng:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {tags.length > 0 ? Math.round(tags.reduce((sum, tag) => sum + tag.count, 0) / tags.length) : 0}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewsTagsManagement;
