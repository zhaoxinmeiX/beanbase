import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/DashboardPage';
import InventoryPage from '@/pages/InventoryPage';
import BeanDetailPage from '@/pages/BeanDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'inventory/:id', element: <BeanDetailPage /> },
    ],
  },
]);

export default router;
