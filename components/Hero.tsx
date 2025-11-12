"use client";

import { useState } from "react";
import { ArrowRight, X, Download } from "lucide-react";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToProducts = () => {
    const element = document.querySelector("#products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dh9uxczld/image/upload/v1762858549/rainbow-hero_tooulw.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Freshly Baked with Love,
            <br />
            Every Single Day
          </h2>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the finest artisan breads, pastries, and custom cakes
            made with premium ingredients and traditional techniques
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {/* Explore Products */}
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center px-8 py-4 bg-rose-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
            >
              Menu
            </button>
          </div>
        </div>
      </section>

      {/* Menu Popup */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="relative bg-white rounded-lg shadow-xl p-4 max-w-xl w-[90%]">
            
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={26} />
            </button>

            {/* Menu Image */}
            <img
              src="/menu.jpg"
              alt="Menu"
              className="w-full rounded-md object-contain"
            />

            {/* Download Button */}
            <div className="text-center mt-4">
              <a
                href="/menu.jpg"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
              >
                <Download size={20} />
                Download Menu
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
