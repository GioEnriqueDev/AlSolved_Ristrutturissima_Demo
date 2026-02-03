'use client';

import ActivityFeed from "@/components/dashboard/ActivityFeed";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPISection from "@/components/dashboard/KPISection";
import ProductionChart from "@/components/dashboard/ProductionChart";
import FeatureWalkthrough from "@/components/dashboard/FeatureWalkthrough";
import SmartReconciliation from "@/components/dashboard/SmartReconciliation";
import ExpenseUpload from "@/components/mobile/ExpenseUpload";
import GPSClockIn from "@/components/mobile/GPSClockIn";
import MobileLayout from "@/components/mobile/MobileLayout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { Laptop, Smartphone, Hammer } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function Home() {
  const { viewMode, setViewMode, initialize } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initialize();
    setMounted(true);
  }, [initialize]);

  if (!mounted) return null;

  return (
    <>
      <Toaster position="top-center" theme="dark" />

      {/* Demo Toggle Control */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-slate-900/90 p-2 rounded-full border border-slate-700 shadow-2xl backdrop-blur">
        <Button
          size="sm"
          variant={viewMode === 'manager' ? 'default' : 'ghost'}
          onClick={() => setViewMode('manager')}
          className={`rounded-full ${viewMode === 'manager' ? 'bg-blue-600' : 'text-slate-400'}`}
        >
          <Laptop className="h-4 w-4 mr-2" />
          Manager
        </Button>
        <Button
          size="sm"
          variant={viewMode === 'worker' ? 'default' : 'ghost'}
          onClick={() => setViewMode('worker')}
          className={`rounded-full ${viewMode === 'worker' ? 'bg-emerald-600' : 'text-slate-400'}`}
        >
          <Smartphone className="h-4 w-4 mr-2" />
          Worker
        </Button>
      </div>

      {viewMode === 'manager' ? (
        <DashboardLayout>
          <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
                <p className="text-slate-400">Bentornato, Arch. Rossi</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Hammer className="mr-2 h-4 w-4" /> Nuovo Cantiere
                </Button>
              </div>
            </div>

            <KPISection />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Chart */}
              <ProductionChart />

              {/* Feed */}
              <ActivityFeed />
            </div>

            {/* Action Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SmartReconciliation />
            </div>

            {/* Feature Walkthrough (Demo Only) */}
            <FeatureWalkthrough />
          </div>
        </DashboardLayout>
      ) : (
        <MobileLayout>
          <div className="max-w-md mx-auto space-y-8">
            <GPSClockIn />
            <ExpenseUpload />
          </div>
        </MobileLayout>
      )}
    </>
  );
}
