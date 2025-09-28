'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LeafletMapProps {
    address: string;
    height?: number;
    zoom?: number;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
    address,
    height = 450,
    zoom: _zoom = 15
}) => {
    const [isClient, setIsClient] = useState(false);
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!address || !isClient) return;

        const geocodeAddress = async () => {
            try {
                setLoading(true);
                setError(null);

                // Use Nominatim (OpenStreetMap) geocoding service
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=vn`
                );

                const data = await response.json();

                if (data && data.length > 0) {
                    const { lat, lon } = data[0];
                    setCoordinates([parseFloat(lat), parseFloat(lon)]);
                } else {
                    setError('Không tìm thấy địa chỉ trên bản đồ');
                }
            } catch (err) {
                console.error('Geocoding error:', err);
                setError('Lỗi khi tải bản đồ');
            } finally {
                setLoading(false);
            }
        };

        geocodeAddress();
    }, [address, isClient]);

    if (!isClient) {
        return (
            <Box
                sx={{
                    height,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (loading) {
        return (
            <Box
                sx={{
                    height,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <CircularProgress />
                <Typography variant="body2" color="text.secondary">
                    Đang tải bản đồ...
                </Typography>
            </Box>
        );
    }

    if (error || !coordinates) {
        return (
            <Box
                sx={{
                    height,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    flexDirection: 'column',
                    gap: 2,
                    p: 3,
                }}
            >
                <Typography variant="h6" color="error">
                    {error || 'Không thể hiển thị bản đồ'}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    Địa chỉ: {address}
                </Typography>
            </Box>
        );
    }

    // Use OpenStreetMap embed instead of Leaflet to avoid initialization issues
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates[1] - 0.01},${coordinates[0] - 0.01},${coordinates[1] + 0.01},${coordinates[0] + 0.01}&layer=mapnik&marker=${coordinates[0]},${coordinates[1]}`;

    return (
        <Box sx={{ height, width: '100%' }}>
            <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </Box>
    );
};

export default LeafletMap;
