import { useState } from 'react';
import type { Bean, RoastLevel } from '@/types/bean';

type BeanFormData = Omit<Bean, 'id'>;

interface BeanFormProps {
    onSubmit: (data: BeanFormData) => void;
    initialData?: Bean;
    buttonText?: string;
}

const roastLevels: RoastLevel[] = ['Light', 'Medium', 'Dark'];

export default function BeanForm({
    onSubmit,
    initialData,
    buttonText = 'Save',
}: BeanFormProps) {
    const [name, setName] = useState(initialData?.name ?? '');
    const [origin, setOrigin] = useState(initialData?.origin ?? '');
    const [roastLevel, setRoastLevel] = useState<RoastLevel>(
        initialData?.roastLevel ?? 'Medium',
    );
    const [quantity, setQuantity] = useState(
        initialData?.quantity?.toString() ?? '',
    );
    const [price, setPrice] = useState(initialData?.price?.toString() ?? '');

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) newErrors.name = 'Name is required';
        if (!origin.trim()) newErrors.origin = 'Origin is required';
        if (!quantity || Number(quantity) < 0)
            newErrors.quantity = 'Quantity must be ≥ 0';
        if (!price || Number(price) <= 0)
            newErrors.price = 'Price must be greater than 0';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const qty = Number(quantity);
        onSubmit({
            name: name.trim(),
            origin: origin.trim(),
            roastLevel,
            quantity: qty,
            price: Number(price),
            inStock: qty > 0,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ethiopia Yirgacheffe"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-1 ${errors.name
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                />
                {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
            </div>

            {/* Origin */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Origin <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Ethiopia"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-1 ${errors.origin
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                />
                {errors.origin && (
                    <p className="mt-1 text-xs text-red-500">{errors.origin}</p>
                )}
            </div>

            {/* Roast Level */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Roast Level
                </label>
                <select
                    value={roastLevel}
                    onChange={(e) => setRoastLevel(e.target.value as RoastLevel)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                    {roastLevels.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            {/* Quantity & Price (side by side) */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Quantity (kg) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="0"
                        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-1 ${errors.quantity
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                            }`}
                    />
                    {errors.quantity && (
                        <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Price ($/kg) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-1 ${errors.price
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                            }`}
                    />
                    {errors.price && (
                        <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                    )}
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {buttonText}
            </button>
        </form>
    );
}
