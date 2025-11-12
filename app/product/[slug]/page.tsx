import { products } from "../data";
import Image from "next/image";
import Link from "next/link";

interface Params {
  params: {
    slug: string;
  };
}

export default function ProductDetails({ params }: Params) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex justify-center items-center">
        <h1 className="text-2xl">Product Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-10">
        <div className="relative w-full h-80 lg:w-1/2 lg:h-[400px] rounded-xl overflow-hidden border border-gray-700">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>

        <div className="lg:w-1/2 space-y-5">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <span className="text-sm bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-1 rounded-full inline-block">
            {product.category}
          </span>

          <p className="text-gray-300">{product.description}</p>

          <p className="text-orange-400 text-3xl font-semibold">₹{product.price}</p>

          <Link
            href="/product"
            className="inline-block mt-5 border border-gray-400 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}
