export type TransactionType = 'expense' | 'income';
export type TransactionStatus = 'pending' | 'kpi_verified' | 'matched';

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    description: string;
    category: string;
    date: string; // ISO string
    status: TransactionStatus;
    user?: string;
    receiptUrl?: string;
}

export interface Worker {
    id: string;
    name: string;
    role: 'site_manager' | 'worker';
    status: 'active' | 'inactive' | 'break';
    currentSite?: string;
    lastActive?: string;
    avatarUrl?: string;
}

export interface Site {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    radius: number; // meters for geofencing
    isActive: boolean;
}

export interface DashboardStats {
    totalBudget: number;
    currentSpend: number;
    activeSites: number;
    pendingReconciliations: number;
}
