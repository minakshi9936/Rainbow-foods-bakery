"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const galleryImages = [
  "https://res.cloudinary.com/dh9uxczld/image/upload/v1762935562/oreo-vanilla-cake_mbun89.jpg",
  "https://res.cloudinary.com/dh9uxczld/image/upload/v1762935646/choco-vanilla-cake_ea2aof.jpg",
  "https://res.cloudinary.com/dh9uxczld/image/upload/v1762935562/kitkat-bar-cake_h05lni.jpg",
  "https://res.cloudinary.com/dh9uxczld/image/upload/v1762935562/white-choco-chips-cake_qezdoc.jpg",
  "https://res.cloudinary.com/dh9uxczld/image/upload/v1762935562/chocolate-truffle-cake_pwo27c.jpg",
  "https://res.cloudinary.com/dh9uxczld/image/upload/v1762935561/blueberry-cake_ggebz8.jpg",
  "https://res.cloudinary.com/dh9uxczld/image/upload/v1762935561/vanilla-butterfly-cake_ujcsfr.jpg",
  "https://res.cloudinary.com/dh9uxczld/image/upload/v1762935561/red-velvet-cake_ivwyy5.jpg",
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Disable scroll when popup opens
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <main className="bg-black text-white min-h-screen pt-44">
        <Header />
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
        Gallery
      </h1>

      {/* GALLERY GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {galleryImages.map((src, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden border border-gray-700 cursor-pointer hover:scale-105 transition-all group"
            onClick={() => setSelectedImage(src)}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={500}
              height={350}
              className="object-cover w-full h-64"
            />

            {/* Hover color overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all" />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full px-4">
            <Image
              src={selectedImage}
              alt="Selected"
              width={1200}
              height={800}
              className="object-contain mx-auto rounded-xl"
            />

            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white text-black rounded-full px-3 py-1 hover:bg-gray-200 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="mt-20">
      <Footer />
      </div>
      <WhatsAppButton />
    </main>
  );
}
