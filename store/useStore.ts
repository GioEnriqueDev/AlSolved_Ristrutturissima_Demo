import { create } from 'zustand';
import { DashboardStats, Site, Transaction, Worker } from '@/lib/types';
import { MOCK_SITES, MOCK_STATS, MOCK_TRANSACTIONS, MOCK_WORKERS } from '@/lib/mock-data';

interface AppState {
    viewMode: 'manager' | 'worker';
    stats: DashboardStats;
    transactions: Transaction[];
    workers: Worker[];
    sites: Site[];

    // Actions
    setViewMode: (mode: 'manager' | 'worker') => void;
    addTransaction: (transaction: Transaction) => void;
    updateWorkerStatus: (workerId: string, status: Worker['status'], siteId?: string) => void;
    approveTransaction: (id: string) => void;
    initialize: () => void;
}

export const useStore = create<AppState>((set) => ({
    viewMode: 'manager',
    stats: MOCK_STATS,
    transactions: [],
    workers: [],
    sites: MOCK_SITES,

    setViewMode: (mode) => set({ viewMode: mode }),

    addTransaction: (transaction) => set((state) => ({
        transactions: [transaction, ...state.transactions],
        stats: {
            ...state.stats,
            currentSpend: transaction.type === 'expense'
                ? state.stats.currentSpend + transaction.amount
                : state.stats.currentSpend
        }
    })),

    updateWorkerStatus: (workerId, status, siteId) => set((state) => ({
        workers: state.workers.map(w =>
            w.id === workerId
                ? { ...w, status, currentSite: siteId, lastActive: new Date().toISOString() }
                : w
        )
    })),

    approveTransaction: (id) => set((state) => ({
        transactions: state.transactions.map(t =>
            t.id === id ? { ...t, status: 'matched' } : t
        ),
        stats: {
            ...state.stats,
            pendingReconciliations: Math.max(0, state.stats.pendingReconciliations - 1)
        }
    })),

    initialize: () => set({
        transactions: MOCK_TRANSACTIONS,
        workers: MOCK_WORKERS,
        stats: MOCK_STATS
    })
}));
