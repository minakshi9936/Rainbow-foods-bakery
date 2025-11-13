import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rainbow Foods & Bakery - Greater Noida | Fresh Baked Goods & Custom Cakes',
  description: 'Rainbow Foods & Bakery in Greater Noida - Your trusted source for fresh artisan breads, delicious pastries, custom cakes, and premium bakery products. Daily baking with premium ingredients. Visit us today!',
  keywords: 'bakery Greater Noida, fresh bread, pastries, custom cakes, artisan bakery, desserts, baked goods, cake shop near me',
  openGraph: {
    title: 'Rainbow Foods & Bakery - Greater Noida',
    description: 'Discover Rainbow Foods & Bakery in Greater Noida - Freshly baked goods daily with premium ingredients and traditional techniques.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
