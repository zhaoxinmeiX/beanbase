import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Bean } from '@/types/bean';
import initialBeans from '@/data/initialBeans.json';

interface BeanState {
    beans: Bean[];

    // Actions
    addBean: (bean: Omit<Bean, 'id'>) => void;
    updateBean: (id: string, updates: Partial<Bean>) => void;
    deleteBean: (id: string) => void;
    adjustQuantity: (id: string, delta: number) => void;
}

export const useBeanStore = create<BeanState>()(
    persist(
        (set) => ({
            // Initial state: load from mock data
            beans: initialBeans as Bean[],

            // Add a new bean with auto-generated UUID
            addBean: (newBean) =>
                set((state) => ({
                    beans: [
                        ...state.beans,
                        { ...newBean, id: crypto.randomUUID() },
                    ],
                })),

            // Update an existing bean by ID (partial update)
            updateBean: (id, updates) =>
                set((state) => ({
                    beans: state.beans.map((bean) =>
                        bean.id === id ? { ...bean, ...updates } : bean,
                    ),
                })),

            // Delete a bean by ID
            deleteBean: (id) =>
                set((state) => ({
                    beans: state.beans.filter((bean) => bean.id !== id),
                })),

            // Adjust quantity by delta (+1/-1), auto-toggle inStock
            adjustQuantity: (id, delta) =>
                set((state) => ({
                    beans: state.beans.map((bean) => {
                        if (bean.id !== id) return bean;
                        const newQuantity = Math.max(0, bean.quantity + delta);
                        return {
                            ...bean,
                            quantity: newQuantity,
                            inStock: newQuantity > 0,
                        };
                    }),
                })),
        }),
        {
            name: 'bean-storage', // localStorage key
        },
    ),
);
