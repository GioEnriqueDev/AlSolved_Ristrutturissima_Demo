'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store/useStore';
import {
    Activity,
    AlertCircle,
    ArrowUpRight,
    CalendarDays,
    CheckCircle2,
    Clock,
    Download,
    FileCheck,
    FileText,
    Hammer,
    HardHat,
    MoreHorizontal,
    Plus,
    Receipt,
    Users,
    Wallet
} from 'lucide-react';
import { useState } from 'react';

export default function SiteDetailView() {
    const { transactions, workers } = useStore();
    const [activeTab, setActiveTab] = useState('overview');

    // Filter for demo site "Cantiere Via Roma"
    const activeWorkers = workers.filter(w => w.status === 'active');
    const siteExpenses = transactions.filter(t => t.type === 'expense');

    return (
        <div className="space-y-6 animate-enter">
            {/* Header / Command Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 rounded-xl glass-card relative overflow-hidden group">
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors duration-500" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-1">
                        <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 bg-emerald-500/10 animate-pulse-glow">
                            LIVE
                        </Badge>
                        <h2 className="text-3xl font-bold text-white tracking-tight glow-text">Cantiere Via Roma</h2>
                    </div>
                    <p className="text-slate-400 flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4" /> Iniziato: 12 Gennaio 2024
                        <span className="text-slate-600">|</span>
                        <span>Milano, MI</span>
                    </p>
                </div>

                <div className="flex gap-3 relative z-10 mt-4 md:mt-0">
                    <Button variant="outline" className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white">
                        <Download className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20">
                        <Plus className="mr-2 h-4 w-4" /> Nuova Attività
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card border-none bg-slate-900/60">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Forza Lavoro Attiva</CardTitle>
                        <Users className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{activeWorkers.length}</div>
                        <div className="flex -space-x-2 mt-3">
                            {activeWorkers.map((w, i) => (
                                <Avatar key={w.id} className="border-2 border-slate-900 h-8 w-8 ring-2 ring-emerald-500/30">
                                    <AvatarImage src={w.avatarUrl} />
                                    <AvatarFallback>{w.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            ))}
                            <div className="h-8 w-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs text-slate-400">
                                +2
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-none bg-slate-900/60">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Budget Materiali</CardTitle>
                        <Wallet className="h-4 w-4 text-amber-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">€12.450</div>
                        <div className="mt-3 space-y-1">
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Speso: €8.200</span>
                                <span>65%</span>
                            </div>
                            <Progress value={65} className="h-1.5 bg-slate-800 [&>div]:bg-amber-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-none bg-slate-900/60">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Efficienza Settimanale</CardTitle>
                        <Activity className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-400">94%</div>
                        <p className="text-xs text-slate-500 mt-2 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1 text-emerald-500" />
                            +4% rispetto al cronoprogramma
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full lg:w-[400px] grid-cols-3 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Overview</TabsTrigger>
                    <TabsTrigger value="materials" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Materiali</TabsTrigger>
                    <TabsTrigger value="presences" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Presenze</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                    {/* Activity Stream */}
                    <Card className="glass-card border-slate-800/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-blue-500" />
                                Timeline Attività
                            </CardTitle>
                            <CardDescription>Registro in tempo reale di tutte le operazioni</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px] pr-4">
                                <div className="space-y-6 pl-2 border-l border-slate-800">
                                    {/* Mock Timeline Items */}
                                    <div className="relative pl-6 pb-2">
                                        <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-slate-950" />
                                        <p className="text-sm text-slate-500 mb-1">10:42 • Sistema</p>
                                        <p className="text-slate-200 font-medium">Smart Match Completato</p>
                                        <p className="text-sm text-slate-400">Transazione di €450,00 riconciliata con fattura #8823</p>
                                    </div>
                                    <div className="relative pl-6 pb-2">
                                        <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-slate-950" />
                                        <p className="text-sm text-slate-500 mb-1">09:15 • Mario Rossi</p>
                                        <p className="text-slate-200 font-medium">Check-in Cantiere</p>
                                        <p className="text-sm text-slate-400">Geolocalizzazione confermata (Precisione 12m)</p>
                                    </div>
                                    <div className="relative pl-6 pb-2">
                                        <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-slate-950" />
                                        <p className="text-sm text-slate-500 mb-1">Ieri, 18:30 • Amministrazione</p>
                                        <p className="text-slate-200 font-medium">Fattura Mancante</p>
                                        <p className="text-sm text-slate-400">Ordine #4421 segnalato come consegnato ma senza fattura.</p>
                                    </div>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="materials" className="mt-6">
                    <Card className="glass-card border-slate-800/50">
                        <CardHeader>
                            <CardTitle className="flex items-center text-slate-100">
                                <Receipt className="mr-2 h-5 w-5 text-purple-500" />
                                Registro Acquisti & Fatture
                            </CardTitle>
                            <CardDescription>Sincronizzazione automatica da App Mobile e Banca</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border border-slate-800 overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-900/80 text-slate-400 uppercase text-xs font-semibold">
                                        <tr>
                                            <th className="px-4 py-3">Data</th>
                                            <th className="px-4 py-3">Descrizione</th>
                                            <th className="px-4 py-3">Categoria</th>
                                            <th className="px-4 py-3">Importo</th>
                                            <th className="px-4 py-3">Stato Fattura</th>
                                            <th className="px-4 py-3 text-right">Azioni</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800 bg-slate-950/30">
                                        {siteExpenses.map((expense) => (
                                            <tr key={expense.id} className="hover:bg-slate-900/50 transition-colors group">
                                                <td className="px-4 py-3 text-slate-400">
                                                    {new Date(expense.date).toLocaleDateString('it-IT')}
                                                </td>
                                                <td className="px-4 py-3 font-medium text-slate-200">
                                                    {expense.description}
                                                    <div className="text-xs text-slate-500">{expense.user}</div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">
                                                        {expense.category}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 font-mono text-slate-200">
                                                    €{expense.amount.toFixed(2)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {expense.status === 'matched' ? (
                                                        <span className="flex items-center text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-1 rounded w-fit">
                                                            <FileCheck className="w-3 h-3 mr-1" /> Verificata
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center text-amber-400 text-xs font-medium bg-amber-400/10 px-2 py-1 rounded w-fit animate-pulse">
                                                            <Clock className="w-3 h-3 mr-1" /> In Attesa
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-white">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="presences" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Summary Card */}
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="text-slate-100 flex items-center">
                                    <HardHat className="mr-2 h-5 w-5 text-orange-500" />
                                    Presenze Oggi
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {['Mario Rossi', 'Luigi Verdi', 'Giacomo Neri'].map((name, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-slate-700">
                                                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-slate-200">{name}</p>
                                                    <p className="text-xs text-slate-500 flex items-center">
                                                        <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-500" />
                                                        Entrato alle 08:00
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                                    IN CANTIERE
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Map Placeholder */}
                        <Card className="glass-card flex flex-col items-center justify-center p-6 text-center border-dashed border-2 border-slate-800 bg-slate-900/20">
                            <div className="h-24 w-24 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 text-slate-500">
                                <Hammer className="h-10 w-10" />
                            </div>
                            <h3 className="text-slate-300 font-medium">Mappa Cantiere</h3>
                            <p className="text-slate-500 text-sm max-w-xs mt-2">
                                Visualizzazione tracciato GPS in tempo reale del perimetro di lavoro.
                            </p>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
