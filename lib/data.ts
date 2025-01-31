import { Product } from './types';

export const furnitureProducts = [
  {
    _id: "1",
    name: "Modern Leather Sofa",
    price: 999,
    category: { name: "Living Room", _id: "1" },
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"],
    description: "Premium Italian leather sofa with modern design"
  }
] satisfies Product[]; 