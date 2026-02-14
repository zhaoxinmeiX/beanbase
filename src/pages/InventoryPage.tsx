import { useState, useMemo } from 'react';
import { Coffee, Search } from 'lucide-react';
import { useBeanStore } from '@/store/useBeanStore';
import BeanTable from '@/components/BeanTable';
import SearchBar from '@/components/SearchBar';
import FilterGroup from '@/components/FilterGroup';

export default function InventoryPage() {
  const beans = useBeanStore((s) => s.beans);

  // Page-level UI state (not in Zustand — only needed here)
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRoast, setFilterRoast] = useState('');
  const [filterOrigin, setFilterOrigin] = useState('');

  // Derive unique origins from data
  const origins = useMemo(
    () => [...new Set(beans.map((b) => b.origin))].sort(),
    [beans],
  );

  // Derived state: filter beans without mutating store
  const filteredBeans = useMemo(() => {
    return beans.filter((bean) => {
      const matchesSearch = bean.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRoast = filterRoast === '' || bean.roastLevel === filterRoast;
      const matchesOrigin = filterOrigin === '' || bean.origin === filterOrigin;
      return matchesSearch && matchesRoast && matchesOrigin;
    });
  }, [beans, searchTerm, filterRoast, filterOrigin]);

  const isFiltering = searchTerm || filterRoast || filterOrigin;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventory</h2>
          <p className="mt-1 text-sm text-gray-500">
            {isFiltering
              ? `${filteredBeans.length} of ${beans.length} items`
              : `${beans.length} ${beans.length === 1 ? 'item' : 'items'} in stock`}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:w-64">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <FilterGroup
          roastLevel={filterRoast}
          origin={filterOrigin}
          origins={origins}
          onRoastChange={setFilterRoast}
          onOriginChange={setFilterOrigin}
        />
      </div>

      {/* Table, Filter-Empty, or Global-Empty */}
      {filteredBeans.length > 0 ? (
        <BeanTable beans={filteredBeans} />
      ) : beans.length > 0 ? (
        /* Has data but filters matched nothing */
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white py-16">
          <Search size={48} className="text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-700">
            No matching beans
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        /* No data at all */
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
