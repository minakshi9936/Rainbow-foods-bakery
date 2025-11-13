'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAdmin } from '@/context/AdminContext';
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
      const updatedProducts = products.map((p) =>
        p.id === editingId ? { ...p, ...formData } : p
      );
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
              <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
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

          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>

              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Artisan Sourdough Bread"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="priceHalfKg" className="block text-sm font-medium text-gray-700 mb-2">
                    Price for 500g (₹)
                  </label>
                  <input
                    id="priceHalfKg"
                    type="number"
                    value={formData.priceHalfKg}
                    onChange={(e) => setFormData({ ...formData, priceHalfKg: e.target.value })}
                    placeholder="e.g., 475"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="pricePerKg" className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per KG (₹)
                  </label>
                  <input
                    id="pricePerKg"
                    type="number"
                    value={formData.pricePerKg}
                    onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })}
                    placeholder="e.g., 950"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    id="category"
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Exotic Cake"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g., Creamy vanilla frosting topped with Oreo biscuits."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Check className="h-4 w-4" />
                    {editingId ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {!showForm && (
            <div className="mb-8">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add New Product
              </button>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Products ({products.length})</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Image</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Product Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Price 500g</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Price Per KG</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-12 w-12 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50?text=Error';
                          }}
                        />
                      </td>
                      <td className="py-3 px-4 text-gray-900">{product.title}</td>
                      <td className="py-3 px-4 text-gray-900">{product.category}</td>
                      <td className="py-3 px-4 text-gray-900 font-semibold">₹{product.priceHalfKg}/500g</td>
                      <td className="py-3 px-4 text-gray-900 font-semibold">₹{product.pricePerKg}/kg</td>
                      <td className="py-3 px-4 text-gray-900 text-sm line-clamp-2">{product.description}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors"
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
              <p className="text-center text-gray-500 py-12">No products yet. Add one using the button above.</p>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
