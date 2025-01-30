import type { Product } from './types';

export const furnitureProducts: Product[] = [
  {
    _id: "1",
    name: "Modern Leather Sofa",
    price: 999,
    category: { name: "Living Room", _id: "1" },
    images: ["https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"],
    description: "Premium Italian leather sofa with modern design"
  },
  {
    _id: "2",
    name: "Ergonomic Office Chair",
    price: 299,
    category: { name: "Office", _id: "4" },
    images: ["https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg"],
    description: "Comfortable ergonomic chair for long work hours"
  },
  {
    _id: "3",
    name: "Wooden Dining Table",
    price: 799,
    category: { name: "Dining Room", _id: "3" },
    images: ["https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg"],
    description: "Solid wood dining table with modern finish"
  },
  {
    _id: "4",
    name: "Queen Size Bed",
    price: 899,
    category: { name: "Bedroom", _id: "2" },
    images: ["https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg"],
    description: "Comfortable queen size bed with storage"
  },
  {
    _id: "5",
    name: "Modern Coffee Table",
    price: 299,
    category: { name: "Living Room", _id: "1" },
    images: ["https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg"],
    description: "Sleek coffee table with storage compartments"
  },
  {
    _id: "6",
    name: "Bookshelf Unit",
    price: 399,
    category: { name: "Living Room", _id: "1" },
    images: ["https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg"],
    description: "Modern bookshelf with adjustable shelves"
  },
  {
    _id: "7",
    name: "Accent Chair",
    price: 449,
    category: { name: "Living Room", _id: "1" },
    images: ["https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg"],
    description: "Stylish accent chair with premium fabric"
  },
  {
    _id: "8",
    name: "King Size Bed",
    price: 1299,
    category: { name: "Bedroom", _id: "2" },
    images: ["https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg"],
    description: "Luxurious king size bed with headboard"
  },
  {
    _id: "9",
    name: "Study Desk",
    price: 349,
    category: { name: "Office", _id: "4" },
    images: ["https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg"],
    description: "Compact study desk with drawers"
  },
  {
    _id: "10",
    name: "Dining Chairs Set",
    price: 599,
    category: { name: "Dining Room", _id: "3" },
    images: ["https://images.pexels.com/photos/1813502/pexels-photo-1813502.jpeg"],
    description: "Set of 6 modern dining chairs"
  },
  {
    _id: "11",
    name: "Bedside Table",
    price: 149,
    category: { name: "Bedroom", _id: "2" },
    images: ["https://images.pexels.com/photos/2082092/pexels-photo-2082092.jpeg"],
    description: "Compact bedside table with drawer"
  },
  {
    _id: "12",
    name: "Filing Cabinet",
    price: 279,
    category: { name: "Office", _id: "4" },
    images: ["https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg"],
    description: "Metal filing cabinet with lock system"
  }
]; 