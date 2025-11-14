"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { products as staticProducts } from "./[slug]/data";
import categoriesData from "../../categories.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";



export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWeight, setSelectedWeight] = useState<'500g' | '1kg'>("1kg");
  const products = staticProducts;
  const whatsappNumber = "6389202030";

  const handleOrderClick = (event: MouseEvent<HTMLButtonElement>, productName: string) => {
    event.preventDefault();
    event.stopPropagation();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      `Hello! I'd like to order ${selectedWeight} of ${productName}.`
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };



  const categories = ["All", ...categoriesData];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="bg-black text-white min-h-screen pt-44">
        <Header />
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-10">
        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Products</span>
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full border transition-all
            ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white"
                : "border-gray-500 text-gray-300 hover:border-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-10 px-4">
        {["500g", "1kg"].map((weight) => (
          <button
            key={weight}
            onClick={() => setSelectedWeight(weight as '500g' | '1kg')}
            className={`px-5 py-2 rounded-full border transition-all
            ${
              selectedWeight === weight
                ? "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white"
                : "border-gray-500 text-gray-300 hover:border-white"
            }`}
          >
            {weight}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-20">
        {filteredProducts.map((p) => (
          <Link
            href={`/product/${p.slug}`}
            key={p.id}
            className="rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-all border border-gray-800 bg-gray-900"
          >
            <div className="relative h-56 w-full">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                {p.description}
              </p>

              <div className="mt-3 flex justify-between items-center">
                <p className="text-orange-400 text-lg font-semibold">
                  ₹{selectedWeight === '1kg' ? p.pricePerKg : p.priceHalfKg}{' '}
                  <span className="text-sm text-gray-400">{selectedWeight === '1kg' ? '/kg' : '/500g'}</span>
                </p>
                <span className="text-sm inline-block bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-1 rounded-full">
                  {p.category}
                </span>
              </div>
              <button
                onClick={(event) => handleOrderClick(event, p.name)}
                className="mt-4 inline-flex w-full justify-center items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all"
              >
                Order Now
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div className = "mt-20">
      <Footer />
      </div>
    </main>
  );
}
