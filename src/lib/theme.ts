import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#E7C873', // Xanh navy sang trọng
            dark: '#0D47A1',
        },
        secondary: {
            main: '#1F4B43', // Vàng gold sang trọng
            light: '#FFD700',
            dark: '#B8860B',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: '#1A1A1A',
            secondary: '#6C757D',
        },
        grey: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2.75rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '2.25rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.875rem',
            fontWeight: 500,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.5rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        h6: {
            fontSize: '1.25rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 12,
                    fontWeight: 600,
                    padding: '12px 24px',
                    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                    '&:hover': {
                        boxShadow: '0 6px 20px 0 rgba(0,0,0,0.15)',
                        transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                },
                outlined: {
                    borderWidth: '2px',
                    '&:hover': {
                        borderWidth: '2px',
                        backgroundColor: 'rgba(26, 35, 126, 0.04)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                        transform: 'translateY(-4px)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'transparent',
                    boxShadow: '0 4px 20px rgba(26, 35, 126, 0.15)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    fontWeight: 500,
                },
            },
        },
    },
});
