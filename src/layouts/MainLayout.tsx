import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-semibold text-gray-800">Inventory Management</h1>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
            XZ
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}