'use client'
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type UserProfile = {
  name: string;
  email: string;
  createdAt: string;
};

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
    router.push('/auth/login');
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2B9DC3]"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Profile</h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
              >
                Logout
              </button>
            </div>

            {profile && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-lg">{profile.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-lg">{profile.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <p className="mt-1 text-lg">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold">Quick Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => router.push('/orders')}
                  className="p-4 border rounded-lg hover:bg-gray-50 text-left"
                >
                  <h3 className="font-medium">My Orders</h3>
                  <p className="text-sm text-gray-600">View your order history</p>
                </button>
                <button
                  onClick={() => router.push('/wishlist')}
                  className="p-4 border rounded-lg hover:bg-gray-50 text-left"
                >
                  <h3 className="font-medium">My Wishlist</h3>
                  <p className="text-sm text-gray-600">View saved items</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 