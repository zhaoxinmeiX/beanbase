import { useRoutes, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/DashboardPage';
import InventoryPage from '@/pages/InventoryPage';

export default function AppRouter() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />, // 这里使用了 Layout
      children: [
        { index: true, element: <Navigate to="/dashboard" replace /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'inventory', element: <InventoryPage /> },
      ],
    },
  ]);
}
