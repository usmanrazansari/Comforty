'use client'
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

type Order = {
  _id: string;
  items: Array<{
    _id: string;
    name: string;
    price: number;
    quantity: number;
    images: string[];
  }>;
  total: number;
  status: string;
  createdAt: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8">My Orders</h1>
          <div>Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">My Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
            <Link 
              href="/"
              className="text-[#2B9DC3] hover:text-[#248AAD]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </div>
                <div className="divide-y">
                  {order.items.map((item) => (
                    <div key={item._id} className="py-4 flex items-center">
                      <div className="relative h-20 w-20 flex-shrink-0">
                        {item.images[0] && (
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">${order.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
} 