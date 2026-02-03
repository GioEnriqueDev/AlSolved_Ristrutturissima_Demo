'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { Check, ArrowRight, FileText, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

export default function SmartReconciliation() {
    const { transactions, approveTransaction } = useStore();

    // Find first pending transaction for demo
    const pendingTransaction = transactions.find(t => t.status === 'pending');

    if (!pendingTransaction) {
        return (
            <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-slate-100 flex items-center gap-2">
                        <Check className="h-5 w-5 text-emerald-500" />
                        All Caught Up!
                    </CardTitle>
                    <CardDescription>No pending reconciliations required.</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    const handleApprove = () => {
        approveTransaction(pendingTransaction.id);
        toast.success('Transaction Matched Successfully', {
            description: `Matched €${pendingTransaction.amount} with Bank Transaction #8823`,
        });
    };

    return (
        <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-amber-500/20 shadow-lg shadow-amber-900/10">
            <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                    Smart Reconciliation
                    <span className="inline-flex items-center rounded-md bg-amber-400/10 px-2 py-1 text-xs font-medium text-amber-500 ring-1 ring-inset ring-amber-400/20">Action Required</span>
                </CardTitle>
                <CardDescription>AI suggests a match for this transaction.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-4 py-4">

                    {/* Bank Side */}
                    <div className="flex-1 w-full bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs uppercase tracking-wider">
                            <FileText className="h-3 w-3" /> Bank Feed
                        </div>
                        <div className="font-mono text-lg text-slate-100">€{pendingTransaction.amount.toFixed(2)}</div>
                        <div className="text-sm text-slate-500 truncate">SIAE Microelettronica - POS</div>
                        <div className="text-xs text-slate-600 mt-1">Today, 10:42 AM</div>
                    </div>

                    <div className="bg-slate-800 rounded-full p-2">
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                    </div>

                    {/* App Side */}
                    <div className="flex-1 w-full bg-blue-950/20 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs uppercase tracking-wider">
                            <Smartphone className="h-3 w-3" /> Field Worker App
                        </div>
                        <div className="font-mono text-lg text-blue-100">€{pendingTransaction.amount.toFixed(2)}</div>
                        <div className="text-sm text-blue-200/70 truncate">{pendingTransaction.description}</div>
                        <div className="text-xs text-blue-300/50 mt-1">Uploaded by {pendingTransaction.user}</div>
                    </div>

                </div>
            </CardContent>
            <CardFooter className="bg-slate-950/30 pt-6">
                <Button onClick={handleApprove} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg shadow-emerald-900/20">
                    <Check className="mr-2 h-4 w-4" /> Approve Match
                </Button>
            </CardFooter>
        </Card>
    );
}
