'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/store/useStore';
import { AlertCircle, Building, Coins, TrendingUp } from 'lucide-react';

export default function KPISection() {
    const { stats } = useStore();

    // Calculate budget percentage
    const budgetPercentage = Math.min(100, Math.round((stats.currentSpend / stats.totalBudget) * 100));

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-400">Total Budget</CardTitle>
                    <Coins className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-100">€{stats.totalBudget.toLocaleString()}</div>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>Speso: €{stats.currentSpend.toLocaleString()}</span>
                            <span>{budgetPercentage}%</span>
                        </div>
                        <Progress value={budgetPercentage} className="h-2 bg-slate-800 [&>div]:bg-emerald-500" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-400">Active Sites</CardTitle>
                    <Building className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-100">{stats.activeSites}</div>
                    <p className="text-xs text-slate-500">Currently operational</p>
                </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-400">Puntualità Fornitori</CardTitle>
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-100">92%</div>
                    <p className="text-xs text-emerald-500">+12% from last month</p>
                </CardContent>
            </Card>

            <Card className={`bg-slate-900/50 border-slate-800 backdrop-blur ${stats.pendingReconciliations > 0 ? 'border-amber-500/20' : ''}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-400">Pending Actions</CardTitle>
                    <AlertCircle className={`h-4 w-4 ${stats.pendingReconciliations > 0 ? 'text-amber-500 animate-pulse' : 'text-slate-500'}`} />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-100">{stats.pendingReconciliations}</div>
                    <p className="text-xs text-amber-500">
                        {stats.pendingReconciliations > 0 ? 'Requires manager approval' : 'All clear'}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
