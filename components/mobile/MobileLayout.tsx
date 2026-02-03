'use client';

import { ReactNode } from 'react';

export default function MobileLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 pb-20">
            <header className="fixed top-0 left-0 right-0 h-14 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-center z-50">
                <h1 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Ristrutturissima Field
                </h1>
            </header>
            <main className="pt-20 px-4">
                {children}
            </main>
        </div>
    );
}
