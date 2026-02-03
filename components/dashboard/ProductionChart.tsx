'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { name: '01/02', produzione: 4000, spese: 2400 },
    { name: '02/02', produzione: 3000, spese: 1398 },
    { name: '03/02', produzione: 2000, spese: 9800 },
    { name: '04/02', produzione: 2780, spese: 3908 },
    { name: '05/02', produzione: 1890, spese: 4800 },
    { name: '06/02', produzione: 2390, spese: 3800 },
    { name: '07/02', produzione: 3490, spese: 4300 },
];

export default function ProductionChart() {
    return (
        <Card className="col-span-4 lg:col-span-3 bg-slate-900/50 border-slate-800 backdrop-blur">
            <CardHeader>
                <CardTitle className="text-slate-100">Spese vs Produzione (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorProduzione" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorSpese" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `€${value}`}
                        />
                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-800" vertical={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                            itemStyle={{ color: '#f8fafc' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="produzione"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorProduzione)"
                        />
                        <Area
                            type="monotone"
                            dataKey="spese"
                            stroke="#f43f5e"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorSpese)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
