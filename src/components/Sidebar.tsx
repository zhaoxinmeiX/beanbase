import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Coffee } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Coffee, label: 'Inventory', path: '/inventory' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <span className="text-xl font-bold text-gray-900">BeanBase ☕</span>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${isActive
                ? 'bg-gray-100 text-black'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
