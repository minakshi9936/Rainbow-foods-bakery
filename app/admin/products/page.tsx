'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAdmin } from '@/context/AdminContext';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import { LogOut, ArrowLeft, Plus, Trash2, Edit, AlertCircle, Check } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  priceHalfKg: string;
  pricePerKg: string;
  image: string;
  category: string;
  description: string;
}

export default function AdminProducts() {
  const { logout } = useAdmin();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    priceHalfKg: '',
    pricePerKg: '',
    image: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts) as Product[];
        const normalized = parsed.map((product) => {
          const pricePerKg = product.pricePerKg ?? '';
          const parsedPerKg = Number(pricePerKg);
          const hasHalf = product.priceHalfKg && product.priceHalfKg.trim() !== '';
          const priceHalfKg = hasHalf
            ? product.priceHalfKg
            : Number.isNaN(parsedPerKg)
            ? ''
            : Math.round(parsedPerKg / 2).toString();
          return {
            ...product,
            pricePerKg,
            priceHalfKg,
          };
        });
        setProducts(normalized);
        localStorage.setItem('products', JSON.stringify(normalized));
      } catch (err) {
        console.error('Error loading products:', err);
      }
    } else {
      const defaultProducts: Product[] = [
        {
          id: '1',
          image: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1762935562/oreo-vanilla-cake_mbun89.jpg',
          title: 'Oreo Vanilla Cake',
          priceHalfKg: '475',
          pricePerKg: '950',
          category: 'Exotic Cake',
          description: 'Creamy vanilla frosting topped with Oreo biscuits.',
        },
        {
          id: '2',
          image: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1762935561/Chocolate_Ecstasy_Cake_hsyqan.jpg',
          title: 'Chocolate Ecstasy Cake',
          priceHalfKg: '475',
          pricePerKg: '950',
          category: 'Exotic Cake',
          description: 'Decadent chocolate cake with rich frosting.',
        },
        {
          id: '3',
          image: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1762935563/black-forest-cake_nekqte.jpg',
          title: 'Black Forest Cake',
          priceHalfKg: '425',
          pricePerKg: '850',
          category: 'Rich Cake',
          description: 'Classic whipped cream cake with cherries.',
        },
        {
          id: '4',
          image: 'https://res.cloudinary.com/dh9uxczld/image/upload/v1762935561/red-velvet-cake_ivwyy5.jpg',
          title: 'Red Velvet Cake',
          priceHalfKg: '550',
          pricePerKg: '1100',
          category: 'Premium Cake',
          description: 'Classic red velvet cake with cream frosting.',
        },
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
    setLoading(false);
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (
      !formData.title.trim() ||
      !formData.priceHalfKg.trim() ||
      !formData.pricePerKg.trim() ||
      !formData.image.trim() ||
      !formData.category.trim() ||
      !formData.description.trim()
    ) {
      setError('Please fill in all fields');
      return;
    }

    if (editingId) {
      const updatedProducts = products.map((p) => (p.id === editingId ? { ...p, ...formData } : p));
      saveProducts(updatedProducts);
      setSuccess('Product updated successfully!');
      setEditingId(null);
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
      };
      const updatedProducts = [...products, newProduct];
      saveProducts(updatedProducts);
      setSuccess('Product added successfully!');
    }

    setFormData({ title: '', priceHalfKg: '', pricePerKg: '', image: '', category: '', description: '' });
    setShowForm(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      title: product.title,
      priceHalfKg: product.priceHalfKg,
      pricePerKg: product.pricePerKg,
      image: product.image,
      category: product.category,
      description: product.description,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({ title: '', priceHalfKg: '', pricePerKg: '', image: '', category: '', description: '' });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter((p) => p.id !== id);
      saveProducts(updatedProducts);
      setSuccess('Product deleted successfully!');
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
              <h1 className="text-2xl font-bold text-white">Products Management</h1>
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

          {showForm && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>

              <form onSubmit={handleAddProduct} className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-200 mb-2">
                    Product Name
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Artisan Sourdough Bread"
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-black/60 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="priceHalfKg" className="block text-sm font-medium text-slate-200 mb-2">
                      Price for 500g (₹)
                    </label>
                    <input
                      id="priceHalfKg"
                      type="number"
                      value={formData.priceHalfKg}
                      onChange={(e) => setFormData({ ...formData, priceHalfKg: e.target.value })}
                      placeholder="e.g., 475"
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-black/60 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="pricePerKg" className="block text-sm font-medium text-slate-200 mb-2">
                      Price Per KG (₹)
                    </label>
                    <input
                      id="pricePerKg"
                      type="number"
                      value={formData.pricePerKg}
                      onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })}
                      placeholder="e.g., 950"
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-black/60 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-slate-200 mb-2">
                    Image URL
                  </label>
                  <input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-black/60 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-200 mb-2">
                      Category
                    </label>
                    <input
                      id="category"
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Exotic Cake"
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-black/60 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-200 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="e.g., Creamy vanilla frosting topped with Oreo biscuits."
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-black/60 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-orange-500/40"
                  >
                    <Check className="h-4 w-4" />
                    {editingId ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/10 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {!showForm && (
            <div>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-orange-500/40"
              >
                <Plus className="h-4 w-4" />
                Add New Product
              </button>
            </div>
          )}

          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Products ({products.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-sm uppercase text-slate-200 tracking-wide">
                    <th className="py-3 px-4 font-semibold">Image</th>
                    <th className="py-3 px-4 font-semibold">Product Name</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">Price 500g</th>
                    <th className="py-3 px-4 font-semibold">Price Per KG</th>
                    <th className="py-3 px-4 font-semibold">Description</th>
                    <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-12 w-12 object-cover rounded-md border border-white/10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50?text=Error';
                          }}
                        />
                      </td>
                      <td className="py-3 px-4 text-slate-100 font-semibold">{product.title}</td>
                      <td className="py-3 px-4 text-slate-200">{product.category}</td>
                      <td className="py-3 px-4 text-orange-200 font-semibold">₹{product.priceHalfKg}/500g</td>
                      <td className="py-3 px-4 text-orange-200 font-semibold">₹{product.pricePerKg}/kg</td>
                      <td className="py-3 px-4 text-slate-300 text-sm line-clamp-2">{product.description}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold rounded-md transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-md transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {products.length === 0 && (
              <p className="text-center text-slate-300 py-12">No products yet. Add one using the button above.</p>
            )}
          </div>
        </main>
      </div>
      <WhatsAppButton />
    </ProtectedRoute>
  );
}
