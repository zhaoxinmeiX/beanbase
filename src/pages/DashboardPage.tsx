import { Coffee, Package, AlertTriangle } from 'lucide-react';
import { useBeanStore } from '@/store/useBeanStore';
import StatCard from '@/components/StatCard';
import LowStockList from '@/components/LowStockList';
import RoastDonutChart from '@/components/RoastDonutChart';
import StockBarChart from '@/components/StockBarChart';

export default function DashboardPage() {
  const beans = useBeanStore((s) => s.beans);

  const totalVarieties = beans.length;
  const totalStock = beans.reduce((sum, b) => sum + b.quantity, 0);
  const lowStockBeans = beans.filter((b) => b.quantity <= 5);
  const totalValue = beans.reduce((sum, b) => sum + b.quantity * b.price, 0);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your coffee bean inventory</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Varieties"
          value={totalVarieties}
          icon={Coffee}
          accent="text-blue-600 bg-blue-50"
        />
        <StatCard
          title="Total Stock"
          value={`${totalStock} kg`}
          icon={Package}
          accent="text-emerald-600 bg-emerald-50"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockBeans.length}
          icon={AlertTriangle}
          accent="text-amber-600 bg-amber-50"
        />
        <StatCard
          title="Inventory Value"
          value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={Package}
          accent="text-purple-600 bg-purple-50"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <StockBarChart beans={beans} />
        </div>
        <div className="lg:col-span-2">
          <RoastDonutChart beans={beans} />
        </div>
      </div>

      {/* Low Stock Alert */}
      <LowStockList beans={lowStockBeans} />
    </div>
  );
}
