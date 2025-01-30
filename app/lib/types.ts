export interface Product {
  _id: string | number;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: { name: string; _id: string };
} 