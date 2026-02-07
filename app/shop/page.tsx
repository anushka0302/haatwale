'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, Product } from '@/data/products';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { ShoppingCart, Filter, SearchX, Star, Loader2 } from 'lucide-react'; 
import QuantityModal from '../components/QuantityModal';

// --- HELPER FUNCTION FOR PRICING ---
const getStartingPrice = (product: Product) => {
  const name = product.name.toLowerCase();
  const isLiquid = name.match(/oil|ghee|squash|juice|liquid|burans|rhododendron|syrup|ark/);
  // Matches logic in QuantityModal: 0.35x for liquids, 0.30x for others (250g/ml)
  // Exception: Spices used 0.30 in modal update, so consistent here.
  const multiplier = isLiquid ? 0.35 : 0.30;
  const unit = isLiquid ? "250 ml" : "250 gm";
  const price = Math.round(product.price * multiplier);
  return { price, unit };
};

function ShopContent() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  
  const searchTerm = searchParams.get('search')?.toLowerCase() || "";
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((product: Product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const descMatch = product.desc.toLowerCase().includes(searchTerm);
      const categoryMatch = product.category?.toLowerCase().includes(searchTerm);
      return nameMatch || descMatch || categoryMatch;
    });
  }, [searchTerm]);

  const openQuickAdd = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmAdd = (product: Product, variant: string, price: number) => {
    addToCart(product, variant, price);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <QuantityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
        onConfirm={handleConfirmAdd} 
      />

      {/* --- HEADER --- */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6BBF46]/10 text-[#6BBF46] text-[10px] font-bold uppercase tracking-[0.2em]">
          <Star size={12} fill="currentColor" /> Premium Organic Selection
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-[#053B28] tracking-tight">
          {searchTerm ? `Results for "${searchTerm}"` : "The Pahadi Shop"}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg font-medium leading-relaxed">
          {searchTerm 
            ? `We found ${filteredProducts.length} authentic mountain treasures for you.`
            : "Handpicked, sun-dried, and chemical-free produce from the heart of the Himalayas."
          }
        </p>
      </div>

      {/* --- FILTERS BAR --- */}
      <div className="flex justify-between items-end mb-10 pb-6 border-b border-gray-100">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Catalogue</p>
          <p className="text-sm font-bold text-[#053B28]">{filteredProducts.length} Items Available</p>
        </div>
        <button className="group flex items-center gap-3 bg-white border border-gray-200 px-6 py-3 rounded-2xl text-sm font-bold text-[#053B28] hover:border-[#6BBF46] hover:text-[#6BBF46] transition-all shadow-sm">
          <Filter size={18} className="group-hover:rotate-180 transition-transform duration-500" /> 
          Refine Search
        </button>
      </div>
      
      {/* --- EMPTY STATE --- */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 bg-white rounded-[3rem] border border-dashed border-gray-200">
          <div className="bg-gray-100 p-8 rounded-full">
            <SearchX size={54} className="text-gray-300" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#053B28]">No matches found</h3>
            <p className="text-gray-400 max-w-xs mx-auto text-sm">
              We couldn&apos;t find any products matching your search. Try using more general keywords.
            </p>
          </div>
          <Link href="/shop" className="bg-[#053B28] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6BBF46] transition-all shadow-lg">
            View All Products
          </Link>
        </div>
      ) : (
        /* --- PRODUCT GRID --- */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product) => {
            // Calculate Display Price
            const { price: startPrice, unit: startUnit } = getStartingPrice(product);

            return (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-[4/5] w-full bg-[#F5F9F5] rounded-[2.5rem] overflow-hidden mb-6 border border-transparent group-hover:border-[#6BBF46]/20 transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2">
                  <Link href={`/product/${product.id}`} className="block w-full h-full">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                  </Link>
                  
                  <button 
                    onClick={() => openQuickAdd(product)}
                    className="absolute bottom-6 right-6 bg-[#6BBF46] p-4 rounded-2xl shadow-xl text-white hover:bg-[#053B28] hover:scale-110 active:scale-95 transition-all duration-300 z-10"
                  >
                    <ShoppingCart size={22} strokeWidth={2.5} />
                  </button>

                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-bold text-[#6BBF46] uppercase tracking-wider">100% Organic</span>
                  </div>
                </div>
                
                <div className="px-1 space-y-1">
                  <Link href={`/product/${product.id}`}>
                    <h4 className="text-xl font-bold text-[#053B28] leading-tight hover:text-[#6BBF46] transition-colors line-clamp-2">
                      {product.name}
                    </h4>
                  </Link>
                  <p className="text-xs text-gray-400 font-medium line-clamp-1">{product.desc}</p>
                  
                  {/* UPDATED PRICE SECTION */}
                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#053B28]">₹{startPrice}</span>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">
                        / {startUnit}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Shop() {
  return (
    <div className="min-h-screen bg-white pt-36 pb-24 px-8">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="animate-spin text-[#6BBF46]" size={40} />
          <p className="text-[#053B28] font-bold animate-pulse">Sourcing from the mountains...</p>
        </div>
      }>
        <ShopContent />
      </Suspense>
    </div>
  );
}