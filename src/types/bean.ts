/**
 * Coffee bean roast level classification
 */
export type RoastLevel = 'Light' | 'Medium' | 'Dark';

/**
 * Coffee bean data model
 */
export interface Bean {
    id: string;
    name: string;
    origin: string;
    roastLevel: RoastLevel;
    quantity: number; // kg
    price: number; // $/kg
    inStock: boolean;
}
