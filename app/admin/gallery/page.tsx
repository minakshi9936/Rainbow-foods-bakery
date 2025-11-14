'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAdmin } from '@/context/AdminContext';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut, ArrowLeft, Plus, Trash2, AlertCircle } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
}

export default function AdminGallery() {
  const { logout } = useAdmin();
  const router = useRouter();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const savedImages = localStorage.getItem('galleryImages');
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (err) {
        console.error('Error loading gallery images:', err);
      }
    } else {
      const defaultImages: GalleryImage[] = [
        { id: '1', url: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: '2', url: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: '3', url: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: '4', url: 'https://images.pexels.com/photos/1098592/pexels-photo-1098592.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: '5', url: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: '6', url: 'https://images.pexels.com/photos/1120970/pexels-photo-1120970.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: '7', url: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: '8', url: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=800' },
      ];
      setImages(defaultImages);
      localStorage.setItem('galleryImages', JSON.stringify(defaultImages));
    }
    setLoading(false);
  }, []);

  const saveImages = (updatedImages: GalleryImage[]) => {
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    setImages(updatedImages);
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newImageUrl.trim()) {
      setError('Please enter an image URL');
      return;
    }

    const newImage: GalleryImage = {
      id: Date.now().toString(),
      url: newImageUrl.trim(),
    };

    const updatedImages = [...images, newImage];
    saveImages(updatedImages);
    setNewImageUrl('');
    setSuccess('Image added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDeleteImage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const updatedImages = images.filter((img) => img.id !== id);
      saveImages(updatedImages);
      setSuccess('Image deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
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
              <h1 className="text-2xl font-bold text-white">Gallery Management</h1>
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
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Add New Image</h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/40 rounded-lg flex items-start gap-3 text-rose-100">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-lg text-emerald-100">
                <p className="text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleAddImage} className="space-y-5">
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-200 mb-2">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 rounded-lg border border-white/10 bg-black/60 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-orange-500/40"
              >
                <Plus className="h-4 w-4" />
                Add Image
              </button>
            </form>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Current Gallery ({images.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-lg border border-white/10 bg-black/40">
                    <img
                      src={image.url}
                      alt="Gallery"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=Invalid+Image';
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:shadow-red-500/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            {images.length === 0 && (
              <p className="text-center text-slate-300 py-12">No gallery images yet. Add one using the form above.</p>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
