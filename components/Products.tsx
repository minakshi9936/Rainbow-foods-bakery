'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { products as productsData } from '@/app/product/data';
import { ArrowRight } from 'lucide-react';

interface AdminProduct {
  id: string;
  title: string;
  priceHalfKg: string;
  pricePerKg: string;
  image: string;
  category: string;
  description: string;
}

const Products = () => {
  const defaultProducts = productsData.slice(0, 4).map((p) => ({
    id: p.id.toString(),
    title: p.name,
    priceHalfKg: p.priceHalfKg.toString(),
    pricePerKg: p.pricePerKg.toString(),
    image: p.image,
    category: p.category,
    description: p.description,
  }));

  const [allProducts, setAllProducts] = useState<AdminProduct[]>(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWeight, setSelectedWeight] = useState<'500g' | '1kg'>('1kg');
  const [displayProducts, setDisplayProducts] = useState<AdminProduct[]>(defaultProducts.slice(0, 4));
  const whatsappNumber = '6389202030';

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts) as AdminProduct[];
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
        setAllProducts(normalized);
      } catch (err) {
        console.error('Error loading products:', err);
      }
    }
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    if (selectedCategory !== 'All') {
      filtered = allProducts.filter(p => p.category === selectedCategory);
    }
    setDisplayProducts(filtered.slice(0, 4));
  }, [selectedCategory, allProducts]);

  const categories = ['All', ...Array.from(new Set(allProducts.map(p => p.category)))];

  return (
    <section id="products" className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Products</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover our selection of freshly baked goods, made daily with the finest ingredients
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full border transition-all text-sm
              ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white border-transparent'
                  : 'border-gray-500 text-gray-300 hover:border-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-3 mb-10">
          {['500g', '1kg'].map((weight) => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight as '500g' | '1kg')}
              className={`px-5 py-2 rounded-full border transition-all text-sm
              ${
                selectedWeight === weight
                  ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white border-transparent'
                  : 'border-gray-500 text-gray-300 hover:border-white'
              }`}
            >
              {weight}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {displayProducts.map((product) => {
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              `Hello! I'd like to order ${selectedWeight} of ${product.title}.`
            )}`;

            return (
              <div
                key={product.id}
                className="rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-all border border-gray-800 bg-gray-900 cursor-pointer"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white">{product.title}</h3>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{product.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-orange-400 text-lg font-semibold">
                      ₹{selectedWeight === '1kg' ? product.pricePerKg : product.priceHalfKg}{' '}
                      <span className="text-sm text-gray-400">{selectedWeight === '1kg' ? '/kg' : '/500g'}</span>
                    </p>
                    <span className="text-xs bg-gradient-to-r from-pink-500 to-orange-500 px-2 py-1 rounded-full text-white">
                      {product.category}
                    </span>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full justify-center items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link href="/product">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              View All Products
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
