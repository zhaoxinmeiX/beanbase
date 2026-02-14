import { useState, useMemo } from 'react';
import { Coffee, Plus, Search } from 'lucide-react';
import { useBeanStore } from '@/store/useBeanStore';
import BeanTable from '@/components/BeanTable';
import SearchBar from '@/components/SearchBar';
import FilterGroup from '@/components/FilterGroup';
import Modal from '@/components/Modal';
import BeanForm from '@/components/BeanForm';
import type { Bean } from '@/types/bean';

export default function InventoryPage() {
  const beans = useBeanStore((s) => s.beans);
  const addBean = useBeanStore((s) => s.addBean);
  const updateBean = useBeanStore((s) => s.updateBean);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRoast, setFilterRoast] = useState('');
  const [filterOrigin, setFilterOrigin] = useState('');

  const [editingBean, setEditingBean] = useState<Bean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    setEditingBean(null);
    setIsModalOpen(true);
  };

  const openEditModal = (bean: Bean) => {
    setEditingBean(bean);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBean(null);
  };

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
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Bean
        </button>
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
        <BeanTable beans={filteredBeans} onEdit={openEditModal} />
      ) : beans.length > 0 ? (
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

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingBean ? 'Edit Bean' : 'Add New Bean'}
      >
        <BeanForm
          key={editingBean?.id ?? 'add'}
          initialData={editingBean ?? undefined}
          buttonText={editingBean ? 'Save Changes' : 'Add Bean'}
          onSubmit={(data) => {
            if (editingBean) {
              updateBean(editingBean.id, data);
            } else {
              addBean(data);
            }
            closeModal();
          }}
        />
      </Modal>
    </div>
  );
}
