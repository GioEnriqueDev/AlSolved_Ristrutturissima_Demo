'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/services/api';
import { useStore } from '@/store/useStore';
import { Camera, Upload, Receipt } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ExpenseUpload() {
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const { addTransaction } = useStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            // append mock file
            await api.uploadExpense(formData);

            // Update global store
            addTransaction({
                id: `t-${Date.now()}`,
                type: 'expense',
                amount: parseFloat(amount),
                description: desc || 'Spesa Campo',
                category: 'Materiali',
                date: new Date().toISOString(),
                status: 'pending',
                user: 'Mario Rossi' // Hardcoded for demo
            });

            toast.success('Spesa registrata correttamente');
            setAmount('');
            setDesc('');
        } catch (e) {
            toast.error('Errore durante l\'invio');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-200">Note Spese</h2>
            <Card className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-slate-400">Importo (€)</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="0.00"
                                className="bg-slate-950 border-slate-700 text-lg"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="desc" className="text-slate-400">Descrizione</Label>
                            <Input
                                id="desc"
                                placeholder="Es. Scontrino Pranzo"
                                className="bg-slate-950 border-slate-700"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <Label className="text-slate-400 mb-2 block">Foto Giustificativo</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <Button type="button" variant="outline" className="h-20 border-slate-700 hover:bg-slate-800 flex flex-col gap-2">
                                    <Camera className="h-6 w-6 text-blue-400" />
                                    <span className="text-xs text-slate-400">Fotocamera</span>
                                </Button>
                                <Button type="button" variant="outline" className="h-20 border-slate-700 hover:bg-slate-800 flex flex-col gap-2">
                                    <Upload className="h-6 w-6 text-slate-400" />
                                    <span className="text-xs text-slate-400">Galleria</span>
                                </Button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-4" disabled={loading}>
                            {loading ? 'Invio in corso...' : 'Invia Nota Spese'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
