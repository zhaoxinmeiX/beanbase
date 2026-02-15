import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    accent?: string;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    accent = 'text-blue-600 bg-blue-50',
}: StatCardProps) {
    const [textColor, bgColor] = accent.split(' ');

    return (
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${bgColor}`}>
                <Icon size={22} className={textColor} />
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
