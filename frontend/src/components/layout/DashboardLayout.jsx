import React from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-ds-dark flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 pt-[72px] md:pt-6 md:p-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

