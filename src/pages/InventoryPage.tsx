import { Coffee } from 'lucide-react';
import { useBeanStore } from '@/store/useBeanStore';
import BeanTable from '@/components/BeanTable';

export default function InventoryPage() {
  const beans = useBeanStore((s) => s.beans);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventory</h2>
          <p className="mt-1 text-sm text-gray-500">
            {beans.length} {beans.length === 1 ? 'item' : 'items'} in stock
          </p>
        </div>
      </div>

      {/* Table or Empty State */}
      {beans.length > 0 ? (
        <BeanTable beans={beans} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white py-16">
          <Coffee size={48} className="text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-700">
            No coffee beans yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first batch of beans.
          </p>
        </div>
      )}
    </div>
  );
}
