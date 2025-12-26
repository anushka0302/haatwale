'use client';

import React, { useState } from 'react';
import { products, Product } from '@/data/products';
import { ShoppingCart, ArrowRight } from 'lucide-react'; 
import HeroScene from './components/HeroScene';
import { useCart } from './context/CartContext';
import Link from 'next/link';
// 1. Import Next.js Image Component
import Image from 'next/image';
import QuantityModal from './components/QuantityModal';

export default function Home() {
  const { addToCart } = useCart();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openQuickAdd = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmAdd = (product: Product, variant: string, price: number) => {
    addToCart(product, variant, price);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      <QuantityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
        onConfirm={handleConfirmAdd} 
      />

      {/* Header & Hero Section */}
      <header className="relative overflow-hidden min-h-[750px] flex items-center">
        <HeroScene />
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full pt-20">
          
          {/* Left Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/90 border border-brandPrimary/30 text-brandPrimary text-xs font-bold tracking-wider uppercase shadow-sm backdrop-blur-sm">
              100% Organic & Natural
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-brandDark leading-tight drop-shadow-sm tracking-tight">
              Nature&apos;s Best <br/>
              <span className="text-brandPrimary">Delivered Fresh.</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Experience the authentic taste of the Himalayas. Hand-ground spices, raw honey, and herbal wellness brought directly from the farm to your table.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop">
                <button className="bg-[#EC9706] hover:bg-brandDark text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-brandPrimary/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 w-full sm:w-auto">
                  Shop Now <ArrowRight size={20} />
                </button>
              </Link>
              <Link href="/about">
                <button className="bg-white/80 border border-gray-200 text-gray-700 px-10 py-5 rounded-full font-bold text-lg hover:bg-white transition-all backdrop-blur-sm shadow-sm w-full sm:w-auto">
                  View Story
                </button>
              </Link>
            </div>
          </div>
          
          {/* Right Side Card - OPTIMIZED WITH NEXT/IMAGE */}
          <div className="hidden lg:flex justify-center items-center w-full">
            <div className="relative h-[500px] w-full max-w-2xl bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/60 shadow-2xl overflow-hidden flex items-center justify-center group transform rotate-1 hover:rotate-0 transition-all duration-700">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50 z-0"></div>
               
               {/* 2. Replaced <img> with <Image /> using 'fill' and 'priority' */}
               <Image 
                 src="/feature_image.svg" 
                 alt="Featured Organic Product" 
                 fill // Automatically fills the parent relative container
                 priority // Forces immediate loading (Fixes LCP warning)
                 className="object-contain p-10 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 z-10"
               />
            </div>
          </div>

        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-[1400px] mx-auto py-24 px-6">
        <div className="text-center mb-20">
          <h3 className="text-brandAccent font-bold uppercase tracking-widest text-sm mb-3">Our Collection</h3>
          <h2 className="text-5xl font-bold text-brandDark">Fresh from the Haat</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div key={product.id} className="group bg-white border border-gray-100 rounded-[2rem] p-5 hover:shadow-2xl hover:shadow-brandPrimary/10 hover:border-brandPrimary/30 transition-all duration-500">
              
              <div className="relative h-72 w-full bg-brandLight rounded-[1.5rem] overflow-hidden mb-5">
                <Link href={`/product/${product.id}`} className="block w-full h-full relative">
                  {/* 3. Replaced Product Images with <Image /> */}
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" // Helps browser choose correct size
                  />
                </Link>
                
                <button 
                  onClick={() => openQuickAdd(product)}
                  className="absolute bottom-4 right-4 bg-white p-4 rounded-full shadow-lg text-brandDark hover:bg-brandPrimary hover:text-white transition-all translate-y-16 group-hover:translate-y-0 duration-300 z-10 hover:scale-110"
                >
                  <ShoppingCart size={22} />
                </button>
              </div>
              
              <div className="px-2">
                <p className="text-xs text-brandPrimary font-bold uppercase tracking-wider mb-2">Organic</p>
                <Link href={`/product/${product.id}`}>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 hover:text-brandPrimary cursor-pointer transition-colors line-clamp-1">
                    {product.name}
                  </h4>
                </Link>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-2xl font-bold text-brandDark">₹{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">₹{product.price + 100}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}