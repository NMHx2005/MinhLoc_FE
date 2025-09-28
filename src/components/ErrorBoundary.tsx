'use client';

import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Alert,
    AlertTitle,
    Collapse,
    // IconButton,
} from '@mui/material';
import {
    Error as ErrorIcon,
    Refresh as RefreshIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
    expanded: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            expanded: false,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
            errorInfo: null,
            expanded: false,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
    }

    handleRetry = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
            expanded: false,
        });
    };

    toggleExpanded = () => {
        this.setState(prevState => ({
            expanded: !prevState.expanded,
        }));
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        bgcolor: '#f5f5f5',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            maxWidth: 600,
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        <ErrorIcon
                            sx={{
                                fontSize: 64,
                                color: 'error.main',
                                mb: 2,
                            }}
                        />

                        <Typography variant="h4" sx={{ mb: 2, color: 'error.main' }}>
                            Oops! Có lỗi xảy ra
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Ứng dụng gặp lỗi không mong muốn. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề tiếp tục.
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Button
                                variant="contained"
                                startIcon={<RefreshIcon />}
                                onClick={this.handleRetry}
                                sx={{ mr: 2 }}
                            >
                                Thử lại
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={this.toggleExpanded}
                                endIcon={this.state.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            >
                                {this.state.expanded ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                            </Button>
                        </Box>

                        <Collapse in={this.state.expanded}>
                            <Alert severity="error" sx={{ mb: 2 }}>
                                <AlertTitle>Chi tiết lỗi:</AlertTitle>
                                <Typography variant="body2" component="pre" sx={{ mt: 1, fontSize: '0.8rem' }}>
                                    {this.state.error?.message}
                                </Typography>
                            </Alert>

                            {this.state.errorInfo && (
                                <Alert severity="info">
                                    <AlertTitle>Stack trace:</AlertTitle>
                                    <Typography variant="body2" component="pre" sx={{ mt: 1, fontSize: '0.8rem' }}>
                                        {this.state.errorInfo.componentStack}
                                    </Typography>
                                </Alert>
                            )}
                        </Collapse>

                        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #eee' }}>
                            <Typography variant="body2" color="text.secondary">
                                Nếu vấn đề tiếp tục, vui lòng:
                            </Typography>
                            <Box component="ul" sx={{ mt: 1, textAlign: 'left', pl: 2 }}>
                                <li>Kiểm tra kết nối mạng</li>
                                <li>Làm mới trang</li>
                                <li>Xóa cache trình duyệt</li>
                                <li>Liên hệ hỗ trợ kỹ thuật</li>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
