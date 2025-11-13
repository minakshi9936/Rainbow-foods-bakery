'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (err) {
        console.error('Error loading products:', err);
        loadDefaultProducts();
      }
    } else {
      loadDefaultProducts();
    }
    setMounted(true);
  }, []);

  const loadDefaultProducts = () => {
    const defaultProducts: Product[] = [
      {
        id: '1',
        image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Artisan Sourdough Bread',
        price: '$6.99',
      },
      {
        id: '2',
        image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Chocolate Croissants',
        price: '$4.50',
      },
      {
        id: '3',
        image: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Blueberry Muffins',
        price: '$3.25',
      },
      {
        id: '4',
        image: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Cinnamon Rolls',
        price: '$4.75',
      },
      {
        id: '5',
        image: 'https://images.pexels.com/photos/1098592/pexels-photo-1098592.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Custom Birthday Cake',
        price: '$45.00',
      },
      {
        id: '6',
        image: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'French Baguette',
        price: '$3.99',
      },
      {
        id: '7',
        image: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Assorted Donuts',
        price: '$12.99',
      },
      {
        id: '8',
        image: 'https://images.pexels.com/photos/1120970/pexels-photo-1120970.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Apple Pie',
        price: '$18.00',
      },
    ];
    setProducts(defaultProducts);
  };

  if (!mounted) return null;

  return (
    <section id="products" className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our selection of freshly baked goods, made daily with the finest ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/40 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <p className="text-2xl font-bold text-orange-600">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
