'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGeolocation } from '@/hooks/useGeolocation';
import { api } from '@/services/api';
import { useStore } from '@/store/useStore';
import { CheckCircle2, Loader2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function GPSClockIn() {
    const { getLocation, loading: gpsLoading, coords, error } = useGeolocation();
    const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
    const [siteName, setSiteName] = useState<string>('');
    const { updateWorkerStatus } = useStore();

    const handleClockIn = async () => {
        // 1. Get Location
        getLocation();
        // Logic continues in useEffect or we can just chain if useGeolocation returned promise (it doesn't, it uses state).
        // For this demo, we'll watch the coords.
    };

    // React to coords update
    // In a real app we'd use useEffect or a promise-based getPosition
    // Let's simulate the flow here simpler:

    const handlePress = async () => {
        setStatus('checking');

        // Simulate getting location manually since the hook is reactive
        if (!navigator.geolocation) {
            setStatus('error');
            toast.error('GPS not supported');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const res = await api.clockIn(pos.coords.latitude, pos.coords.longitude);
                    if (res.success && res.site) {
                        setStatus('success');
                        setSiteName(res.site.name);
                        updateWorkerStatus('w-1', 'active', res.site.id);
                        toast.success(res.message);
                    } else {
                        setStatus('error');
                        toast.error(res.message);
                    }
                } catch (e) {
                    setStatus('error');
                    toast.error('Connection failed');
                }
            },
            (err) => {
                setStatus('error');
                toast.error('GPS Permission Denied');
            }
        );
    };

    if (status === 'success') {
        return (
            <Card className="bg-emerald-950/30 border-emerald-500/50 mb-6">
                <CardContent className="flex flex-col items-center justify-center p-6 py-10 text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-emerald-100">Timbratura Effettuata</h3>
                        <p className="text-emerald-400 mt-1 flex items-center justify-center gap-1">
                            <MapPin className="h-4 w-4" /> {siteName}
                        </p>
                        <p className="text-xs text-emerald-500/50 mt-2">{new Date().toLocaleTimeString()}</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-200 mb-4">Registro Presenze</h2>
            <Button
                size="lg"
                className={`w-full h-40 rounded-2xl text-2xl font-bold shadow-2xl transition-all ${status === 'checking'
                        ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-900/20 ring-4 ring-blue-900/20'
                    }`}
                onClick={handlePress}
                disabled={status === 'checking'}
            >
                {status === 'checking' ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="text-sm font-normal">Acquiring GPS...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <MapPin className="h-8 w-8 md:h-10 md:w-10" />
                        INIZIA TURNO
                    </div>
                )}
            </Button>
        </div>
    );
}
