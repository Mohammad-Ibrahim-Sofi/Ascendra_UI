import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { OfficerSidebar } from '@/components/layout/OfficerSidebar';
import { OfficerNavbar } from '@/components/layout/OfficerNavbar';

export function OfficerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <OfficerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <OfficerNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
