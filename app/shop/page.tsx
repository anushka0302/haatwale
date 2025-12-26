'use client';

import React, { useState } from 'react';
import { products, Product } from '@/data/products';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { ShoppingCart, Filter } from 'lucide-react';
// 1. Import the Quantity Modal
import QuantityModal from '../components/QuantityModal';

export default function Shop() {
  const { addToCart } = useCart();
  
  // 2. Add State for the Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 3. Handler to open Modal
  const openQuickAdd = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // 4. Handler when user confirms inside Modal
  const handleConfirmAdd = (product: Product, variant: string, price: number) => {
    addToCart(product, variant, price);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      
      {/* 5. The Quantity Modal Component */}
      <QuantityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
        onConfirm={handleConfirmAdd} 
      />

      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#6BBF46] font-bold tracking-widest uppercase text-sm">Full Catalogue</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#053B28]">All Products</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our complete collection of mountain pulses, wild spices, and herbal wellness products.
          </p>
        </div>

        {/* Filters (Visual only for now) */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <p className="text-gray-500 font-medium">{products.length} Products Found</p>
          <button className="flex items-center gap-2 text-[#053B28] font-bold hover:text-[#6BBF46] transition-colors">
            <Filter size={18} /> Filter
          </button>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white border border-gray-100 rounded-3xl p-4 hover:shadow-xl hover:border-[#6BBF46]/30 transition-all duration-300">
              
              {/* Image */}
              <div className="relative h-64 w-full bg-[#F5F9F5] rounded-2xl overflow-hidden mb-4">
                <Link href={`/product/${product.id}`} className="block w-full h-full">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
                
                {/* 6. Button Trigger: Opens Modal instead of direct add */}
                <button 
                  onClick={() => openQuickAdd(product)}
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md text-[#053B28] hover:bg-[#6BBF46] hover:text-white transition-colors translate-y-12 group-hover:translate-y-0 duration-300 z-10"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
              
              {/* Info */}
              <div className="px-2">
                <p className="text-xs text-[#6BBF46] font-bold uppercase tracking-wider mb-1">Organic</p>
                <Link href={`/product/${product.id}`}>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#6BBF46] cursor-pointer transition-colors">
                    {product.name}
                  </h4>
                </Link>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#053B28]">₹{product.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{product.price + 50}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}