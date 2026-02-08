import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

export default function MainLayout() {
  return (
    // 最外层容器：全屏，无滚动
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* 左侧：侧边栏 */}
      <Sidebar />

      {/* 右侧：主内容区 (包含 Header 和 Outlet) */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-semibold text-gray-800">Inventory Management</h1>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
            XZ
          </div>
        </header>

        {/* 核心内容区 (只有这里可以滚动！) */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Outlet 就是路由匹配到的页面 */}
          <Outlet />
        </div>

      </main>
    </div>
  );
}