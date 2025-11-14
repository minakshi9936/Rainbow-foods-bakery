'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#09090b] to-black text-white">
      <Header />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-32 -left-16 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-[-12rem] h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" />
      </div>
      <main className="relative z-10 pt-44 pb-24">
        <section className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-orange-300">
            Contact
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
            Let&apos;s craft something sweet together
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Share your celebration ideas, custom cake designs, or catering needs with our team and we will reply with the perfect plan for you.
          </p>
        </section>
        <div className="mt-16">
          <Contact />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
