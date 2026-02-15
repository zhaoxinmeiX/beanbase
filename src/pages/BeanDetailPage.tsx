import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBeanStore } from '@/store/useBeanStore';

export default function BeanDetailPage() {
    const { id } = useParams<{ id: string }>();
    const bean = useBeanStore((s) => s.beans.find((b) => b.id === id));

    if (!bean) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-5xl">☕</p>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">Bean not found</h2>
                <p className="mt-2 text-sm text-gray-500">The bean you're looking for doesn't exist.</p>
                <Link
                    to="/inventory"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                    <ArrowLeft size={16} />
                    Back to Inventory
                </Link>
            </div>
        );
    }

    const roastColors: Record<string, string> = {
        Light: 'bg-yellow-100 text-yellow-800',
        Medium: 'bg-orange-100 text-orange-800',
        Dark: 'bg-stone-700 text-white',
    };

    return (
        <div className="p-6">
            {/* Back link */}
            <Link
                to="/inventory"
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
                <ArrowLeft size={16} />
                Back to Inventory
            </Link>

            {/* Detail Card */}
            <div className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{bean.name}</h1>
                        <p className="mt-1 text-sm text-gray-500">{bean.origin}</p>
                    </div>
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${roastColors[bean.roastLevel]}`}
                    >
                        {bean.roastLevel} Roast
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                    {/* Quantity */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Quantity</p>
                        <p className={`mt-1 text-2xl font-bold ${bean.quantity <= 5 && bean.quantity > 0 ? 'text-red-600' : bean.quantity === 0 ? 'text-gray-400' : 'text-gray-900'}`}>
                            {bean.quantity} <span className="text-base font-normal text-gray-400">kg</span>
                        </p>
                    </div>

                    {/* Price */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Price</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                            ${bean.price.toFixed(2)} <span className="text-base font-normal text-gray-400">/kg</span>
                        </p>
                    </div>

                    {/* Status */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Status</p>
                        <p className="mt-1">
                            {bean.inStock ? (
                                <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                                    In Stock
                                </span>
                            ) : (
                                <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                                    Out of Stock
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Total Value */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Total Value</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                            ${(bean.quantity * bean.price).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
