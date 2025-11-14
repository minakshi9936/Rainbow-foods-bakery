"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function AboutPage() {
  return (
    
    <div className="bg-black text-white min-h-screen pt-44">
        <Header />
      {/* Top Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Rainbow Foods & Bakery</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Where taste meets creativity — baked fresh every day!  
          Our mission is to bring joy to your plates with colorful cakes,  
          premium breads, and delightful treats prepared with love.
        </p>
      </section>

      {/* Image + Text */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="relative w-full h-[350px] rounded-xl overflow-hidden shadow-xl">
          <Image
            src="data:image/jpeg;base64,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" // Your image
            alt="Bakery Interior"
            fill
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold text-pink-400 mb-4">Who We Are</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Rainbow Foods & Bakery is a celebration of taste and colors!  
            From customized cakes to fresh pastries and artisan breads,  
            we serve happiness in every bite.  
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            Every product is prepared using high-quality ingredients,  
            maintaining freshness and authentic flavor.  
          </p>

          <p className="text-gray-300 leading-relaxed">
            Whether it’s birthdays, weddings, festivals, or celebrations —  
            we promise to make your special moments unforgettable!
          </p>
        </div>
      </section>

      {/* Colorful Features */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
          Why Choose Us
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Fresh Ingredients",
              desc: "Premium quality, baked fresh everyday."
            },
            {
              title: "Custom Cakes",
              desc: "Designed just the way you like!"
            },
            {
              title: "Colorful Collection",
              desc: "Experience the fun of vibrant flavors."
            },
            {
              title: "Fast Delivery",
              desc: "Fresh happiness delivered quickly."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl shadow-lg text-center bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-400"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-black font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-20">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
          Want something special?
        </h3>

        <p className="text-gray-300 mb-8">
          We customize cakes and desserts for your special moments!
        </p>

        <a
          href="/contact"
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold rounded-full hover:opacity-90 transition"
        >
          Contact Us
        </a>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
