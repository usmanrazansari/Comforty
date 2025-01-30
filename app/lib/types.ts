export interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: {
    name: string;
    _id: string;
  };
  specifications?: Array<{
    name: string;
    value: string;
  }>;
  features?: string[];
  stock?: number;
  rating?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
} 