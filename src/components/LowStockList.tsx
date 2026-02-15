import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Bean } from '@/types/bean';

interface LowStockListProps {
    beans: Bean[];
}

export default function LowStockList({ beans }: LowStockListProps) {
    if (beans.length === 0) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-gray-900">Low Stock Alert</h3>
                <div className="flex flex-col items-center py-6 text-center">
                    <span className="text-3xl">✅</span>
                    <p className="mt-2 text-sm font-medium text-green-600">All stock levels healthy</p>
                    <p className="mt-1 text-xs text-gray-400">No items below threshold (≤ 5 kg)</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-500" />
                <h3 className="text-base font-semibold text-gray-900">
                    Low Stock Alert
                    <span className="ml-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        {beans.length}
                    </span>
                </h3>
            </div>

            <ul className="divide-y divide-gray-100">
                {beans.map((bean) => (
                    <li key={bean.id}>
                        <Link
                            to={`/inventory/${bean.id}`}
                            className="flex items-center justify-between py-3 transition-colors hover:bg-gray-50 rounded-md px-2 -mx-2"
                        >
                            <div>
                                <p className="text-sm font-medium text-gray-900">{bean.name}</p>
                                <p className="text-xs text-gray-500">{bean.origin} · {bean.roastLevel}</p>
                            </div>
                            <span className={`text-sm font-bold ${bean.quantity === 0 ? 'text-gray-400' : 'text-red-600'}`}>
                                {bean.quantity === 0 ? 'Out' : `${bean.quantity} kg`}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
