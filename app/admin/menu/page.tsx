'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAdmin } from '@/context/AdminContext';
import Link from 'next/link';
import { LogOut, ArrowLeft, Save, AlertCircle, Check } from 'lucide-react';

export default function AdminMenu() {
  const { logout } = useAdmin();
  const router = useRouter();
  const [menuImageUrl, setMenuImageUrl] = useState('/menu.jpg');
  const [newMenuUrl, setNewMenuUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedMenuUrl = localStorage.getItem('menuImageUrl');
    if (savedMenuUrl) {
      setMenuImageUrl(savedMenuUrl);
    }
    setLoading(false);
  }, []);

  const handleUpdateMenu = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    if (!newMenuUrl.trim()) {
      setError('Please enter a menu image URL');
      setIsSaving(false);
      return;
    }

    localStorage.setItem('menuImageUrl', newMenuUrl.trim());
    setMenuImageUrl(newMenuUrl.trim());
    setSuccess('Menu updated successfully!');
    setNewMenuUrl('');
    setIsSaving(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#14060f] to-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-black via-[#14060f] to-black text-white">
        <nav className="bg-black/80 backdrop-blur-md border-b border-orange-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <button className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              </Link>
              <h1 className="text-2xl font-bold text-white">Menu Management</h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-600 hover:via-orange-600 hover:to-amber-600 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-orange-500/40"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/40 rounded-lg flex items-start gap-3 text-rose-100">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-lg flex items-start gap-3 text-emerald-100">
              <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Current Menu</h2>
              <div className="aspect-square overflow-hidden rounded-lg border border-white/10 bg-black/40 mb-6">
                <img
                  src={menuImageUrl}
                  alt="Current Menu"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500?text=Invalid+Menu+Image';
                  }}
                />
              </div>
              <p className="text-sm text-slate-300 break-all">
                Current URL: <span className="font-mono text-orange-200">{menuImageUrl}</span>
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Update Menu</h2>
              <form onSubmit={handleUpdateMenu} className="space-y-6">
                <div>
                  <label htmlFor="menuUrl" className="block text-sm font-medium text-slate-200 mb-2">
                    Menu Image URL
                  </label>
                  <textarea
                    id="menuUrl"
                    value={newMenuUrl}
                    onChange={(e) => setNewMenuUrl(e.target.value)}
                    placeholder="https://example.com/menu.jpg"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-black/60 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none resize-none"
                  />
                  <p className="text-xs text-slate-300 mt-2">
                    Enter the complete URL to the menu image. You can use any image hosting service (Cloudinary, Imgur, etc.)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 disabled:bg-white/20 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-orange-500/40 disabled:text-white/60"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'Updating...' : 'Update Menu'}
                </button>
              </form>

              <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <h3 className="font-semibold text-orange-100 mb-2">Tips:</h3>
                <ul className="text-xs text-orange-100/80 space-y-1">
                  <li>• Use high-quality menu images (JPG or PNG)</li>
                  <li>• Ensure the image is at least 500x500 pixels</li>
                  <li>• Try image hosting: cloudinary.com, imgbb.com, or postimages.org</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Preview</h2>
            <p className="text-slate-300 mb-4">This is how your menu will appear in the Hero section:</p>
            <div className="max-w-2xl mx-auto aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/40">
              <img
                src={menuImageUrl}
                alt="Menu Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Menu+Preview';
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
