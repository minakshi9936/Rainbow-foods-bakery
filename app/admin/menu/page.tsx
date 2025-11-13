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
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Menu */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Menu</h2>
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-200 mb-6">
                <img
                  src={menuImageUrl}
                  alt="Current Menu"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500?text=Invalid+Menu+Image';
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 break-all">
                Current URL: <span className="font-mono">{menuImageUrl}</span>
              </p>
            </div>

            {/* Update Menu Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Menu</h2>

              <form onSubmit={handleUpdateMenu} className="space-y-6">
                <div>
                  <label htmlFor="menuUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    Menu Image URL
                  </label>
                  <textarea
                    id="menuUrl"
                    value={newMenuUrl}
                    onChange={(e) => setNewMenuUrl(e.target.value)}
                    placeholder="https://example.com/menu.jpg"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter the complete URL to the menu image. You can use any image hosting service (Cloudinary, Imgur, etc.)
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Updating...' : 'Update Menu'}
                  </button>
                </div>
              </form>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Tips:</h3>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Use high-quality menu images (JPG or PNG)</li>
                  <li>• Ensure the image is at least 500x500 pixels</li>
                  <li>• Try image hosting: cloudinary.com, imgbb.com, or postimages.org</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg shadow-md p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>
            <p className="text-gray-600 mb-4">This is how your menu will appear in the Hero section:</p>
            <div className="max-w-2xl mx-auto aspect-video overflow-hidden rounded-lg bg-gray-200">
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
