import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import type { Bean } from '@/types/bean';

interface StockBarChartProps {
    beans: Bean[];
}

export default function StockBarChart({ beans }: StockBarChartProps) {
    const data = beans
        .map((b) => ({
            name: b.name.length > 12 ? b.name.slice(0, 12) + '…' : b.name,
            quantity: b.quantity,
            isLow: b.quantity <= 5,
        }))
        .sort((a, b) => b.quantity - a.quantity);

    if (data.length === 0) return null;

    return (
        <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-gray-900">Stock by Bean</h3>
            <div className="min-h-64 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 11, fill: '#6b7280' }}
                            tickLine={false}
                            axisLine={{ stroke: '#e5e7eb' }}
                            interval={0}
                            angle={-25}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#6b7280' }}
                            tickLine={false}
                            axisLine={false}
                            unit=" kg"
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                fontSize: '13px',
                            }}
                            formatter={((value: number) => [`${value} kg`, 'Stock']) as never}
                        />
                        <Bar dataKey="quantity" radius={[6, 6, 0, 0]} maxBarSize={40}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={entry.isLow ? '#ef4444' : '#3b82f6'}
                                    fillOpacity={entry.isLow ? 0.8 : 0.85}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-sm bg-blue-500" /> Normal
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-sm bg-red-500" /> Low Stock (≤ 5 kg)
                </span>
            </div>
        </div>
    );
}
