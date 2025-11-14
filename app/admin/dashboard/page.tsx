'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';
import Image from 'next/image';
import {
  LogOut,
  Image as ImageIcon,
  ShoppingCart,
  Menu as MenuIcon,
  TrendingUp,
  Settings,
  Clock,
} from 'lucide-react';

interface Stats {
  galleryCount: number;
  productCount: number;
}

export default function AdminDashboard() {
  const { isLoggedIn, logout } = useAdmin();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<Stats>({
    galleryCount: 0,
    productCount: 0,
  });

  useEffect(() => {
    const galleryImages = localStorage.getItem('galleryImages');
    const products = localStorage.getItem('products');

    try {
      const galleryCount = galleryImages ? JSON.parse(galleryImages).length : 0;
      const productCount = products ? JSON.parse(products).length : 0;
      setStats({ galleryCount, productCount });
    } catch (err) {
      console.error('Error loading stats:', err);
    }

    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  if (!mounted) return null;

  const dashboardItems = [
    {
      title: 'Gallery Images',
      description: 'Manage gallery images and photo updates',
      icon: ImageIcon,
      href: '/admin/gallery',
      color: 'from-orange-500 via-pink-500 to-purple-500',
      count: stats.galleryCount,
      label: 'images',
    },
    {
      title: 'Products',
      description: 'Add, edit, or remove products from catalog',
      icon: ShoppingCart,
      href: '/admin/products',
      color: 'from-pink-500 via-purple-500 to-indigo-500',
      count: stats.productCount,
      label: 'products',
    },
    {
      title: 'Menu Management',
      description: 'Update the menu image in hero section',
      icon: MenuIcon,
      href: '/admin/menu',
      color: 'from-rose-500 via-orange-500 to-amber-500',
      count: 1,
      label: 'menu',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-black via-[#14060f] to-black text-white">
        <nav className="bg-black/80 backdrop-blur-md border-b border-orange-500/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image src="/Rainbow-logo.webp" alt="Rainbow Foods & Bakery" width={52} height={52} className="rounded" />
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-xs text-orange-200/80">Rainbow Foods & Bakery</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/40"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Welcome Back!</h2>
            </div>
            <p className="text-lg text-slate-300">Manage your restaurant content and updates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-purple-500/10 border border-orange-500/30 rounded-xl p-6 backdrop-blur-sm shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-200/90 mb-2">Gallery Images</p>
                  <p className="text-4xl font-bold text-white">{stats.galleryCount}</p>
                </div>
                <div className="bg-orange-500/20 p-4 rounded-lg">
                  <ImageIcon className="h-8 w-8 text-orange-200" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-orange-500/20">
                <p className="text-xs text-orange-100/80 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Active gallery items
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/30 rounded-xl p-6 backdrop-blur-sm shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-pink-200/90 mb-2">Products</p>
                  <p className="text-4xl font-bold text-white">{stats.productCount}</p>
                </div>
                <div className="bg-pink-500/20 p-4 rounded-lg">
                  <ShoppingCart className="h-8 w-8 text-pink-200" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-pink-500/20">
                <p className="text-xs text-pink-100/80 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> In your catalog
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-rose-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-200/90 mb-2">Last Updated</p>
                  <p className="text-2xl font-bold text-white">Just Now</p>
                </div>
                <div className="bg-purple-500/20 p-4 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-200" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-500/20">
                <p className="text-xs text-purple-100/80 flex items-center gap-1">
                  <Settings className="h-3 w-3" /> All systems active
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Management Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-orange-400/40 transition-all duration-300 cursor-pointer h-full hover:shadow-xl hover:shadow-orange-500/20">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      <div className="relative p-8">
                        <div className={`mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${item.color} group-hover:scale-105 transition-transform duration-300`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white">{item.count}</span>
                            <span className="text-sm text-orange-100/80">{item.label}</span>
                          </div>
                          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500 group-hover:translate-x-1 transition-all duration-300">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-white/5 border border-orange-500/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Quick Tips</h3>
            <ul className="space-y-3 text-slate-200">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Add high-quality images to your gallery to showcase your products</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Keep product information updated with correct prices and descriptions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Update your menu regularly to reflect current offerings</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
