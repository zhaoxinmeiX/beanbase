import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { Bean } from '@/types/bean';

interface RoastDonutChartProps {
    beans: Bean[];
}

const ROAST_COLORS: Record<string, string> = {
    Light: '#facc15',   // yellow-400
    Medium: '#f97316',  // orange-500
    Dark: '#57534e',    // stone-600
};

export default function RoastDonutChart({ beans }: RoastDonutChartProps) {
    const data = Object.entries(
        beans.reduce<Record<string, number>>((acc, b) => {
            acc[b.roastLevel] = (acc[b.roastLevel] || 0) + 1;
            return acc;
        }, {}),
    ).map(([name, value]) => ({ name, value }));

    if (data.length === 0) return null;

    return (
        <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-gray-900">Roast Level Distribution</h3>
            <div className="flex flex-1 items-center justify-center">
                <div className="h-52 w-52">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={85}
                                paddingAngle={4}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry) => (
                                    <Cell
                                        key={entry.name}
                                        fill={ROAST_COLORS[entry.name] ?? '#94a3b8'}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    fontSize: '13px',
                                }}
                                formatter={((value: number, name: string) => [`${value} varieties`, name]) as never}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="ml-6 space-y-3">
                    {data.map((entry) => (
                        <div key={entry.name} className="flex items-center gap-2">
                            <span
                                className="inline-block h-3 w-3 rounded-full"
                                style={{ backgroundColor: ROAST_COLORS[entry.name] ?? '#94a3b8' }}
                            />
                            <span className="text-sm text-gray-600">{entry.name}</span>
                            <span className="text-sm font-semibold text-gray-900">{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
