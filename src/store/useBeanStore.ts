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
            beans: initialBeans as Bean[],

            addBean: (newBean) =>
                set((state) => ({
                    beans: [
                        ...state.beans,
                        { ...newBean, id: crypto.randomUUID() },
                    ],
                })),

            updateBean: (id, updates) =>
                set((state) => ({
                    beans: state.beans.map((bean) =>
                        bean.id === id ? { ...bean, ...updates } : bean,
                    ),
                })),

            deleteBean: (id) =>
                set((state) => ({
                    beans: state.beans.filter((bean) => bean.id !== id),
                })),

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
            name: 'bean-storage',
        },
    ),
);
