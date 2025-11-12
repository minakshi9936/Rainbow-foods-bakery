"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "./data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

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

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
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

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

              <p className="text-orange-400 text-lg mt-3 font-semibold">
                ₹{p.price}
              </p>

              <span className="text-sm mt-2 inline-block bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-1 rounded-full">
                {p.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </main>
  );
}


