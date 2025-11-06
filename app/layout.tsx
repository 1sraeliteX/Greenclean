import type { Metadata } from "next";
import { Bricolage_Grotesque } from 'next/font/google';
import "./globals.css";
import Navbar from "../src/components/Navbar";
import BottomNavbar from "../src/components/BottomNavbar";
import { CartProvider } from "../src/context/CartContext";
import Cart from "../src/components/Cart";

// Load Bricolage Grotesque for the entire app
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: "Green Clean - Waste Management",
  description: "Efficient waste management and recycling services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${bricolage.variable} font-sans antialiased bg-gray-50`}
        style={{
          '--font-sans': bricolage.style.fontFamily,
          fontFamily: bricolage.style.fontFamily,
        } as React.CSSProperties}
      >
        <CartProvider>
          <Navbar />
          <main className="pt-16 pb-16 md:pb-0 min-h-screen">
            {children}
          </main>
          <Cart />
          <BottomNavbar />
        </CartProvider>
      </body>
    </html>
  );
}
