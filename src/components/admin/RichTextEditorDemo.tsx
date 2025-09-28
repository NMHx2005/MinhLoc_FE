'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Alert } from '@mui/material';
import RichTextEditor from './RichTextEditor';

const RichTextEditorDemo: React.FC = () => {
    const [content, setContent] = useState(`
        <h2>Demo Rich Text Editor</h2>
        <p>Đây là <strong>text in đậm</strong> và <em>text in nghiêng</em>.</p>
        <p>Bạn có thể tạo <a href="https://example.com">link</a> và chèn hình ảnh.</p>
        <ul>
            <li>Danh sách có dấu đầu dòng</li>
            <li>Item thứ hai</li>
        </ul>
        <ol>
            <li>Danh sách có số thứ tự</li>
            <li>Item thứ hai</li>
        </ol>
        <blockquote>
            <p>Đây là một đoạn trích dẫn.</p>
        </blockquote>
        <p>Bạn có thể thay đổi <span style="color: #ff0000;">màu chữ</span> và <span style="background-color: #ffff00;">màu nền</span>.</p>
    `);

    const handleSave = () => {
        console.log('Content saved:', content);
        alert('Nội dung đã được lưu! Kiểm tra console để xem HTML output.');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Demo Rich Text Editor
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                    <strong>Các tính năng có sẵn:</strong><br />
                    • <strong>In đậm</strong>, <em>in nghiêng</em>, <u>gạch chân</u><br />
                    • Chèn link, hình ảnh, bảng<br />
                    • Danh sách có dấu đầu dòng và số thứ tự<br />
                    • Thay đổi màu chữ và màu nền<br />
                    • Chèn emoticons và ký tự đặc biệt<br />
                    • Xem code HTML và fullscreen<br />
                    • Undo/Redo và tìm kiếm/thay thế
                </Typography>
            </Alert>

            <Paper sx={{ p: 2, mb: 3 }}>
                <RichTextEditor
                    value={content}
                    onChange={setContent}
                    label="Nội dung demo"
                    placeholder="Nhập nội dung của bạn..."
                    height={400}
                />
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button variant="contained" onClick={handleSave}>
                    Lưu nội dung
                </Button>
                <Button variant="outlined" onClick={() => setContent('')}>
                    Xóa nội dung
                </Button>
            </Box>

            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    HTML Output:
                </Typography>
                <Box
                    component="pre"
                    sx={{
                        backgroundColor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        overflow: 'auto',
                        fontSize: '0.875rem',
                        maxHeight: 200
                    }}
                >
                    {content}
                </Box>
            </Paper>
        </Box>
    );
};

export default RichTextEditorDemo;
