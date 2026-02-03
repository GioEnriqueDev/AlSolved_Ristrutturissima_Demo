'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStore } from '@/store/useStore';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';

export default function ActivityFeed() {
    const { transactions } = useStore();

    // Sort by date desc
    const sortedTransactions = [...transactions].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <Card className="col-span-4 lg:col-span-1 bg-slate-900/50 border-slate-800 backdrop-blur h-[430px] flex flex-col">
            <CardHeader>
                <CardTitle className="text-slate-100">Attività Recenti</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[350px] px-6">
                    <div className="space-y-6">
                        {sortedTransactions.map((t) => (
                            <div key={t.id} className="flex items-start gap-4 animate-in slide-in-from-right-5 duration-500">
                                <Avatar className="h-9 w-9 border border-slate-700">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.user}`} alt="Avatar" />
                                    <AvatarFallback>WK</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none text-slate-200">
                                        {t.user || 'Utente Sconosciuto'}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {t.type === 'expense' ? 'Ha caricato una spesa' : 'Incasso registrato'}
                                    </p>
                                    <div className="flex items-center pt-1">
                                        <span className={`text-xs font-bold ${t.type === 'expense' ? 'text-red-400' : 'text-emerald-400'}`}>
                                            {t.type === 'expense' ? '-' : '+'}€{t.amount.toFixed(2)}
                                        </span>
                                        <span className="ml-auto text-[10px] text-slate-500 pl-2">
                                            {formatDistanceToNow(new Date(t.date), { addSuffix: true, locale: it })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {sortedTransactions.length === 0 && (
                            <p className="text-center text-slate-500 text-sm py-4">Nessuna attività recente</p>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
