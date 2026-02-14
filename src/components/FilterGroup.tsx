
interface FilterGroupProps {
    roastLevel: string;
    origin: string;
    origins: string[];
    onRoastChange: (value: string) => void;
    onOriginChange: (value: string) => void;
}

const roastOptions: Array<{ label: string; value: string }> = [
    { label: 'All Roasts', value: '' },
    { label: 'Light', value: 'Light' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Dark', value: 'Dark' },
];

export default function FilterGroup({
    roastLevel,
    origin,
    origins,
    onRoastChange,
    onOriginChange,
}: FilterGroupProps) {
    return (
        <div className="flex gap-3">
            {/* Roast Level Filter */}
            <select
                value={roastLevel}
                onChange={(e) => onRoastChange(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
                {roastOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {/* Origin Filter */}
            <select
                value={origin}
                onChange={(e) => onOriginChange(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
                <option value="">All Origins</option>
                {origins.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    );
}
