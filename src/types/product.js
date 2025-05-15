export interface Product {
  id: string;
  name: string;
  category: 'dairy' | 'vegetable';
  price: number;
  image: string;
  model3d?: string; // Path to 3D model if available
  description: string;
  nutritionalInfo?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  inStock: boolean;
  featured?: boolean;
}