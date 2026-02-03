'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStore } from '@/store/useStore';
import {
    Building2,
    CreditCard,
    FileText,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Users
} from 'lucide-react';
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { managerView, setManagerView } = useStore();

    const SIDEBAR_ITEMS = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' as const, active: managerView === 'dashboard' },
        { icon: Building2, label: 'Cantieri', id: 'site_details' as const, active: managerView === 'site_details' },
        { icon: Users, label: 'Personale', id: 'staff' as const, active: false }, // Placeholder
        { icon: CreditCard, label: 'Contabilità', id: 'accounting' as const, active: false }, // Placeholder
        { icon: FileText, label: 'Documenti', id: 'docs' as const, active: false }, // Placeholder
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-slate-950 text-slate-100 border-r border-slate-800">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    Ristrutturissima<span className="text-xs text-slate-400 block font-normal tracking-wide">ENTERPRISE OS</span>
                </h1>
            </div>

            <ScrollArea className="flex-1 px-4">
                <nav className="space-y-2">
                    {SIDEBAR_ITEMS.map((item) => (
                        <Button
                            key={item.label}
                            variant="ghost"
                            onClick={() => {
                                if (item.id === 'dashboard' || item.id === 'site_details') {
                                    setManagerView(item.id);
                                    setIsMobileOpen(false);
                                }
                            }}
                            className={`w-full justify-start text-sm font-medium transition-all duration-300 ${item.active
                                ? 'bg-blue-600/10 text-blue-400 border-l-2 border-blue-500 rounded-none rounded-r-md'
                                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                                }`}
                        >
                            <item.icon className={`mr-3 h-5 w-5 ${item.active ? 'text-blue-500' : ''}`} />
                            {item.label}
                        </Button>
                    ))}
                </nav>
            </ScrollArea>

            <div className="p-4 border-t border-slate-800">
                <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-500/10">
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 relative flex overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-72 h-screen sticky top-0">
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {/* Header */}
                <header className="flex h-16 items-center border-b border-slate-800 bg-slate-950/50 backdrop-blur px-6 justify-between sticky top-0 z-30">
                    <div className="md:hidden">
                        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-slate-300">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 bg-slate-950 border-slate-800 text-slate-100 w-72">
                                <SidebarContent />
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <Button variant="outline" size="sm" className="hidden sm:flex border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white">
                            <Settings className="mr-2 h-4 w-4" />
                            Impostazioni
                        </Button>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 border border-slate-700" />
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
