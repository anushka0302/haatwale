'use client';

import React, { useState, useMemo } from 'react';
import { products, Product } from '@/data/products';
import { ShoppingCart, ArrowRight, Sparkles } from 'lucide-react'; 
import HeroScene from './components/HeroScene';
import { useCart } from './context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import QuantityModal from './components/QuantityModal';

// --- HELPER FUNCTION FOR PRICING ---
// Calculates the starting price (250g/ml) to match the QuantityModal logic
const getStartingPrice = (product: Product) => {
  const name = product.name.toLowerCase();
  
  // 1. Identify Type
  const isLiquid = name.match(/oil|ghee|squash|juice|liquid|burans|rhododendron|syrup|ark/);
  
  // 2. Determine Multiplier & Unit
  // Liquids: 0.35x for 250ml
  // Spices/Others: 0.30x for 250gm (Updated to match your modal logic)
  const multiplier = isLiquid ? 0.35 : 0.30;
  const unit = isLiquid ? "250 ml" : "250 gm";

  // 3. Calculate Price
  const price = Math.round(product.price * multiplier);

  return { price, unit };
};

export default function Home() {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('Forest Produce');

  // Spotlight Logic: Map specific products to the Museum Showcase
  const spotlightProducts = useMemo(() => {
    return products.slice(0, 5); 
  }, []);
  
  // Updated category list to match products.ts exactly
  const categories = ['Spices', 'Pulses', 'Grains', 'Forest Produce', 'Wellness', 'All'];

  // Optimized filtering logic
  const filteredProducts = useMemo(() => {
    return activeCategory === 'All' 
      ? products 
      : products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const openQuickAdd = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmAdd = (product: Product, variant: string, price: number) => {
    addToCart(product, variant, price);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans overflow-x-hidden">
      <QuantityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
        onConfirm={handleConfirmAdd} 
      />

      {/* --- HERO SECTION: FULL SCREEN --- */}
      <header className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <HeroScene />
        </div>
        <div className="max-w-[1000px] mx-auto px-6 relative z-10 w-full text-center">
          <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-brandPrimary/20 text-brandPrimary text-[10px] font-black tracking-[0.3em] uppercase shadow-sm">
                <Sparkles size={12} /> Curated Himalayan Harvest
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-brandDark leading-[1.1] md:leading-[0.85] tracking-tighter">
                Nature&apos;s Best <br className="hidden md:block"/>
                <span className="text-brandPrimary italic font-medium"> Delivered Fresh.</span>
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="w-full sm:w-auto">
                <button className="bg-brandDark text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:bg-black active:scale-95">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* --- FEATURE SECTION: MODERN SIDEBAR SHOWCASE --- */}
      <section className="relative w-full py-16 md:py-20 bg-[#fdfdfd] overflow-hidden border-b border-gray-100">
        
        {/* Modernized Aipan Background Texture */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cg fill='none' stroke='%231E4A26' stroke-width='1.5'%3E%3Ccircle cx='200' cy='200' r='60'/%3E%3Cpath d='M140 200h120M200 140v120'/%3E%3Crect x='80' y='80' width='240' height='240' rx='40'/%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '500px' 
             }}>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: HERITAGE STORY (40% Width) */}
            <div className="lg:col-span-5 space-y-6 md:space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-[2px] bg-brandPrimary"></div>
                   <h4 className="text-brandPrimary font-bold uppercase tracking-[0.4em] text-[10px]">
                     Direct from Devbhoomi
                   </h4>
                </div>
                <h2 className="text-5xl md:text-7xl font-medium text-brandDark tracking-tighter leading-[0.95]">
                  Uttarakhand&apos;s <br/>
                  <span className="italic serif font-light text-brandPrimary">Native Gems</span>
                </h2>
                <p className="text-gray-500 font-medium text-base md:text-lg max-w-md leading-relaxed">
                  Hand-harvested from high-altitude terraced farms. Experience the pure vitality of the Himalayas in every grain.
                </p>
              </div>

              <Link href="/shop" className="group inline-flex items-center gap-4 bg-white border border-gray-200 pl-6 pr-2 py-2 rounded-full hover:border-brandPrimary transition-all shadow-sm hover:shadow-md">
                 <span className="text-brandDark font-bold uppercase tracking-[0.1em] text-[11px]">Browse the Haat</span>
                 <div className="w-10 h-10 rounded-full bg-brandPrimary text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight size={18} />
                 </div>
              </Link>
            </div>

            {/* RIGHT COLUMN: FROSTED PRODUCT TRACK (60% Width) */}
            <div className="lg:col-span-7 relative group/track">
              
              {/* Modern Authenticity Seal */}
              <div className="absolute -top-10 -right-4 w-36 h-36 border border-brandPrimary/10 rounded-full flex items-center justify-center animate-[spin_25s_linear_infinite] opacity-40 z-20 pointer-events-none hidden xl:flex">
                <span className="text-[7px] font-black text-brandPrimary uppercase tracking-[0.3em] text-center p-4">
                    • PURELY ORGANIC • TRADITIONALLY HARVESTED •
                </span>
              </div>

              {/* Horizontal Scroll Mask */}
              <div className="relative w-full overflow-hidden rounded-[3rem]">
                 <div className="flex animate-infinite-scroll whitespace-nowrap hover:[animation-play-state:paused] py-8">
                   {[...spotlightProducts, ...spotlightProducts].map((product, index) => (
                     <Link key={`${product.id}-${index}`} href={`/product/${product.id}`} className="inline-block mx-4 first:ml-0">
                       {/* Glassmorphism Card Style */}
                       <div className="relative w-64 h-80 md:w-[320px] md:h-[400px] bg-white border border-gray-50 rounded-[3rem] p-8 flex flex-col items-center justify-center transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2">
                           
                           {/* Limited Tag */}
                           <div className="absolute top-6 left-6">
                              <span className="bg-[#1E4A26] text-white px-3 py-1 rounded-lg text-[8px] font-bold uppercase tracking-widest flex items-center gap-1">
                                 <Sparkles size={8} /> Limited
                              </span>
                           </div>

                           <div className="relative w-full h-2/3 transform transition-transform duration-500 group-hover:scale-105">
                              <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                           </div>
                           
                           <div className="mt-6 text-center">
                              <h5 className="text-brandDark font-bold text-lg tracking-tight mb-1">{product.name}</h5>
                              <div className="flex items-center justify-center gap-2">
                                 <span className="w-4 h-[1px] bg-brandPrimary/30"></span>
                                 <span className="text-[9px] font-black uppercase tracking-widest text-brandPrimary">Authentic Pahadi</span>
                                 <span className="w-4 h-[1px] bg-brandPrimary/30"></span>
                              </div>
                           </div>
                       </div>
                     </Link>
                   ))}
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- COLLECTIONS SECTION --- */}
      <main className="max-w-[1400px] mx-auto py-12 md:py-24 px-4 md:px-8 relative bg-white overflow-hidden">
        
        {/* Subtly Floating Aipan Background Element */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] opacity-[0.09] pointer-events-none translate-x-1/4 -translate-y-1/4 z-0">
          <img 
            src="/aipan-pattern.svg" 
            alt="Aipan Pattern" 
            className="w-full h-full object-contain" 
          />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-20 gap-6 md:gap-10">
            <div className="space-y-2 md:space-y-4">
              <div className="flex items-center gap-2 md:gap-3">
                 <span className="w-8 md:w-12 h-[1px] bg-brandPrimary"></span>
                 <h3 className="text-brandPrimary font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[8px] lg:text-[12px]">
                   Catalogue
                 </h3>
              </div>
              <h2 className="text-3xl md:text-7xl font-bold text-brandDark tracking-tighter leading-tight">
                Fresh from <br className="hidden lg:block" /> the <span className="italic font-medium serif text-brandPrimary">Haat</span>
              </h2>
            </div>
            
            {/* Modernized Asymmetrical Category Buttons */}
            <div className="flex flex-col gap-4 md:gap-6 items-center md:items-end w-full md:w-auto">
              <div className="flex overflow-x-auto pb-6 gap-3 no-scrollbar scroll-smooth w-full px-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative flex-shrink-0 min-w-[80px] md:min-w-[120px] px-6 md:px-10 py-3 md:py-4 text-[10px] md:text-[11px] font-black uppercase tracking-wider md:tracking-[0.2em] transition-all duration-500 whitespace-nowrap overflow-hidden ${
                      activeCategory === cat 
                      ? 'text-white scale-105' 
                      : 'text-gray-400 hover:text-brandPrimary'
                    }`}
                  >
                    {activeCategory === cat && (
                      <div className="absolute inset-0 bg-brandPrimary rounded-tl-2xl rounded-br-2xl md:rounded-tl-[2rem] md:rounded-br-[2rem] rounded-tr-lg rounded-bl-lg shadow-lg z-0 animate-in fade-in zoom-in duration-500" />
                    )}
                    
                    {activeCategory !== cat && (
                      <div className="absolute inset-0 border border-gray-100 rounded-full bg-white/50 backdrop-blur-sm z-0" />
                    )}

                    <span className="relative z-10">{cat}</span>
                  </button>
                ))}
              </div>
              
              {/* Visual Scroll Indicator */}
              <div className="hidden md:block w-64 h-[3px] bg-gray-100 rounded-full overflow-hidden mr-4">
                  <div 
                    className="h-full bg-brandPrimary transition-all duration-1000 ease-out" 
                    style={{ width: `${((categories.indexOf(activeCategory) + 1) / categories.length) * 100}%` }}
                  ></div>
              </div>
            </div>
          </div>
          
          {/* Optimized Responsive Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12 relative">
            {filteredProducts.map((product) => {
              // --- CALCULATE DYNAMIC PRICE HERE ---
              const { price: startPrice, unit: startUnit } = getStartingPrice(product);

              return (
                <div 
                  key={product.id} 
                  className="group relative bg-white border border-gray-100/50 rounded-[2rem] md:rounded-[3.5rem] p-3 md:p-6 transition-all duration-700 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Premium Product Stage */}
                  <div className="relative aspect-[4/5] w-full bg-[#F9FBF9] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden mb-4 md:mb-8 border border-gray-50/50">
                    
                    <div className="absolute top-3 left-3 md:top-6 md:left-6 z-20">
                       <span className="bg-brandDark text-white px-2 py-1 md:px-4 md:py-1.5 rounded-full text-[6px] md:text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1 md:gap-2">
                         <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-brandPrimary animate-pulse"></span>
                         Limited
                       </span>
                    </div>

                    <Link href={`/product/${product.id}`} className="block w-full h-full p-4 md:p-8 relative">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-md" 
                        sizes="(max-width: 768px) 50vw, 25vw" 
                      />
                    </Link>

                    <button 
                      onClick={() => openQuickAdd(product)} 
                      className="absolute bottom-3 right-3 md:bottom-6 md:right-6 bg-brandPrimary text-white w-8 h-8 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 hover:bg-brandDark active:scale-95 z-20"
                    >
                      <ShoppingCart 
                        className="w-3.5 h-3.5 md:w-6 md:h-6" 
                        strokeWidth={2.5} 
                      />
                    </button>
                  </div>

                  <div className="space-y-2 md:space-y-4 px-1 md:px-2">
                    <div className="flex justify-between items-start gap-2">
                      <Link href={`/product/${product.id}`} className="flex-1">
                        <h4 className="text-xs md:text-xl font-black text-brandDark group-hover:text-brandPrimary transition-colors leading-tight line-clamp-2">
                          {product.name}
                        </h4>
                      </Link>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                      {/* --- UPDATED PRICE DISPLAY --- */}
                      <div className="flex items-baseline gap-2">
                         <span className="text-lg md:text-3xl font-black text-brandDark tracking-tighter">
                           ₹{startPrice}
                         </span>
                         <span className="text-[9px] md:text-[11px] text-gray-400 font-bold uppercase">
                           / {startUnit}
                         </span>
                      </div>
                      <span className="bg-brandPrimary/10 text-brandPrimary text-[6px] md:text-[10px] font-black px-1.5 py-0.5 rounded-sm md:rounded-lg inline-block w-fit">
                        SAVE ₹100
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

    </div>
  );
}