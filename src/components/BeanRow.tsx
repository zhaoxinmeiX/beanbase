import { useState } from 'react';
import { Minus, Plus, Pencil, Trash2 } from 'lucide-react';
import type { Bean } from '@/types/bean';
import { useBeanStore } from '@/store/useBeanStore';
import ConfirmDialog from '@/components/ConfirmDialog';

interface BeanRowProps {
    bean: Bean;
    onEdit: (bean: Bean) => void;
}

/** Roast level badge colors */
const roastColors: Record<Bean['roastLevel'], string> = {
    Light: 'bg-yellow-100 text-yellow-800',
    Medium: 'bg-orange-100 text-orange-800',
    Dark: 'bg-stone-700 text-white',
};

export default function BeanRow({ bean, onEdit }: BeanRowProps) {
    const adjustQuantity = useBeanStore((s) => s.adjustQuantity);
    const deleteBean = useBeanStore((s) => s.deleteBean);
    const isLowStock = bean.quantity <= 5 && bean.quantity > 0;
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <tr className="hover:bg-gray-50 transition-colors">
                {/* Name */}
                <td className="px-4 py-3 font-medium text-gray-900">{bean.name}</td>

                {/* Origin */}
                <td className="px-4 py-3 text-gray-600">{bean.origin}</td>

                {/* Roast Level Badge */}
                <td className="px-4 py-3">
                    <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${roastColors[bean.roastLevel]}`}
                    >
                        {bean.roastLevel}
                    </span>
                </td>

                {/* Quantity with +/- buttons */}
                <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => adjustQuantity(bean.id, -1)}
                            disabled={bean.quantity <= 0}
                            className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={14} />
                        </button>

                        <span
                            className={`min-w-8 text-center font-mono text-sm font-semibold ${bean.quantity === 0
                                ? 'text-gray-400'
                                : isLowStock
                                    ? 'text-red-600'
                                    : 'text-gray-900'
                                }`}
                        >
                            {bean.quantity}
                        </span>

                        <button
                            onClick={() => adjustQuantity(bean.id, 1)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-gray-500 transition-colors hover:bg-gray-100"
                            aria-label="Increase quantity"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </td>

                {/* Price */}
                <td className="px-4 py-3 text-gray-700">
                    ${bean.price.toFixed(2)}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                    {bean.inStock ? (
                        <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                            In Stock
                        </span>
                    ) : (
                        <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                            Out of Stock
                        </span>
                    )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => onEdit(bean)}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-600"
                            aria-label={`Edit ${bean.name}`}
                        >
                            <Pencil size={15} />
                        </button>
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            aria-label={`Delete ${bean.name}`}
                        >
                            <Trash2 size={15} />
                        </button>
                    </div>
                </td>
            </tr>

            <ConfirmDialog
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={() => {
                    deleteBean(bean.id);
                    setShowConfirm(false); // Close dialog after confirming
                }}
                title="Delete Bean"
                message={`Are you sure you want to delete "${bean.name}"? This action cannot be undone.`}
            />
        </>
    );
}
