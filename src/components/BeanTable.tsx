import type { Bean } from '@/types/bean';
import BeanRow from '@/components/BeanRow';

interface BeanTableProps {
    beans: Bean[];
}

export default function BeanTable({ beans }: BeanTableProps) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-left text-gray-600">
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Origin</th>
                        <th className="px-4 py-3 font-medium">Roast</th>
                        <th className="px-4 py-3 font-medium">Quantity (kg)</th>
                        <th className="px-4 py-3 font-medium">Price ($/kg)</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {beans.map((bean) => (
                        <BeanRow key={bean.id} bean={bean} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
