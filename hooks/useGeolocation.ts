import { useState, useCallback } from 'react';

interface LocationState {
    coords: { lat: number; lng: number } | null;
    error: string | null;
    loading: boolean;
}

export function useGeolocation() {
    const [state, setState] = useState<LocationState>({
        coords: null,
        error: null,
        loading: false,
    });

    const getLocation = useCallback(() => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        if (!navigator.geolocation) {
            setState({
                coords: null,
                error: 'Geolocation is not supported by your browser',
                loading: false,
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    coords: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    error: null,
                    loading: false,
                });
            },
            (error) => {
                setState({
                    coords: null,
                    error: error.message,
                    loading: false,
                });
            }
        );
    }, []);

    return { ...state, getLocation };
}
