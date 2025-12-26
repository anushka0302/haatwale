import React from 'react'; // Added React import to be safe
import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import Navbar from "./components/Navbar";
import FloatingParticles from "./components/FloatingParticles";
import { CartProvider } from "./context/CartContext";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haatwale - Organic Store",
  description: "Fresh & Natural products from the hills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* FIX: Added suppressHydrationWarning={true} to stop the error */}
      <body className={`${inter.className} relative`} suppressHydrationWarning={true}>
        
        <CartProvider>
          
          {/* Background Layer */}
          <FloatingParticles />
          
          {/* Top Layer: Navbar */}
          <Navbar /> 
          
          {/* Popup Layer: The Toast Notification */}
          <Toast />
          
          {/* Content Layer (Flexbox to push Footer to bottom) */}
          <div className="relative z-10 min-h-screen flex flex-col">
             
             {/* Main Page Content (Grows to fill space) */}
             <div className="flex-grow">
                {children}
             </div>

             {/* Global Footer */}
             <Footer />
             
          </div>
          
        </CartProvider>

      </body>
    </html>
  );
}