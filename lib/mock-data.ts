import { DashboardStats, Site, Transaction, Worker } from "./types";

export const MOCK_SITES: Site[] = [
    {
        id: 'site-1',
        name: 'Cantiere Via Roma',
        address: 'Via Roma 10, Milano',
        lat: 45.4642,
        lng: 9.1900,
        radius: 200,
        isActive: true
    },
    {
        id: 'site-2',
        name: 'Ristrutturazione Villa Verdi',
        address: 'Via Giuseppe Verdi 5, Monza',
        lat: 45.5845,
        lng: 9.2744,
        radius: 300,
        isActive: true
    }
];

export const MOCK_WORKERS: Worker[] = [
    {
        id: 'w-1',
        name: 'Mario Rossi',
        role: 'site_manager',
        status: 'active',
        currentSite: 'site-1',
        lastActive: new Date().toISOString(),
        avatarUrl: 'https://github.com/shadcn.png'
    },
    {
        id: 'w-2',
        name: 'Luigi Verdi',
        role: 'worker',
        status: 'inactive',
        lastActive: new Date().toISOString()
    }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 't-1',
        type: 'expense',
        amount: 450.00,
        description: 'Materiale Elettrico',
        category: 'Materiali',
        date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        status: 'pending',
        user: 'Mario Rossi'
    },
    {
        id: 't-2',
        type: 'expense',
        amount: 120.50,
        description: 'Pranzo Staff',
        category: 'Jolly',
        date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        status: 'matched',
        user: 'Mario Rossi'
    },
    {
        id: 't-3',
        type: 'income',
        amount: 5000.00,
        description: 'Acconto Cliente Rossi',
        category: 'Fattura',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        status: 'kpi_verified'
    }
];

export const MOCK_STATS: DashboardStats = {
    totalBudget: 150000,
    currentSpend: 45230,
    activeSites: 2,
    pendingReconciliations: 3
};
