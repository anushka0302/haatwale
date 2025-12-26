'use client';

import React, { use, useState } from 'react';
import { products, Product } from '@/data/products'; 
import { useCart } from '../../context/CartContext'; 
import { ArrowLeft, ShoppingCart, ChefHat, HeartPulse, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// 1. Import the Quantity Modal
import QuantityModal from '../../components/QuantityModal';

export default function ProductDetails(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const id = parseInt(params.id);

  const product = products.find((p: Product) => p.id === id);
  const { addToCart } = useCart();
  
  // 2. Add State for the Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return notFound();
  }

  // 3. Handle adding the item AFTER quantity is selected
  const handleConfirmAdd = (product: Product, variant: string, price: number) => {
    addToCart(product, variant, price);
    setIsModalOpen(false);
  };

  const story = product.story || `This authentic ${product.name} is sourced directly from the high-altitude villages of Uttarakhand.`;
  const health = product.health || ["100% Organic & Natural", "Rich in essential mountain minerals", "Boosts overall immunity"];
  const recipe = product.recipe || { title: "Simple Mountain Style", steps: ["Soak overnight.", "Boil with salt and turmeric.", "Temper with cumin and garlic.", "Serve hot with rice."] };

  return (
    <div className="min-h-screen bg-[#FDFBF7]"> 
      
      {/* 4. Quantity Selection Modal */}
      <QuantityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
        onConfirm={handleConfirmAdd} 
      />

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-stone-500 hover:text-brandPrimary transition-colors font-medium"
          >
            <div className="p-2 bg-white rounded-full shadow-sm border border-stone-100 group-hover:border-brandPrimary/30">
               <ArrowLeft size={18} />
            </div>
            <span>Back to Shop</span>
          </Link>
        </div>

        {/* --- HERO SECTION --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] w-full bg-white rounded-[3rem] shadow-xl border border-stone-100 flex items-center justify-center p-8 overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-green-50/50 rounded-[3rem] -z-10"></div>
             <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" />
          </div>

          {/* Info & Buy */}
          <div className="space-y-8">
            <div>
              <span className="text-green-600 font-bold tracking-widest uppercase text-xs mb-2 block">Devbhoomi Collection</span>
              <h1 className="text-5xl font-serif font-bold text-stone-800 leading-tight mb-4">{product.name}</h1>
              <p className="text-xl text-stone-500 font-medium">{product.desc}</p>
            </div>

            <div className="flex items-end gap-4 border-b border-stone-200 pb-8">
              <span className="text-4xl font-bold text-stone-800">₹{product.price}</span>
              <span className="text-lg text-stone-400 line-through mb-1">₹{product.price + 50}</span>
              <span className="text-green-600 font-bold mb-1 text-sm bg-green-100 px-2 py-0.5 rounded">In Stock</span>
            </div>

            <div className="flex gap-4">
              <button 
                // 5. CLICK opens the Modal now
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-stone-800 text-white py-4 rounded-full font-bold text-lg hover:bg-black transition-all shadow-lg shadow-stone-300 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
            
            <p className="text-stone-400 text-sm flex items-center gap-2">
              <CheckIcon /> 100% Authentic Hill Produce
            </p>
          </div>
        </div>

        {/* --- BLOG CONTENT SECTION --- */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* THE STORY */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-orange-500" size={28} />
                <h2 className="text-3xl font-serif font-bold text-stone-800">The Story of {product.name}</h2>
              </div>
              <p className="text-lg text-stone-600 leading-relaxed whitespace-pre-line border-l-4 border-orange-200 pl-6">
                {story}
              </p>
            </section>

            {/* RECIPE */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
               <div className="flex items-center gap-3 mb-6">
                <ChefHat className="text-stone-700" size={28} />
                <h2 className="text-2xl font-serif font-bold text-stone-800">How to Cook: {recipe.title}</h2>
              </div>
              <ul className="space-y-4">
                {recipe.steps.map((step: string, idx: number) => (
                  <li key={idx} className="flex gap-4 items-start text-stone-600">
                    <span className="flex-shrink-0 w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center font-bold text-xs text-stone-500 mt-0.5">{idx + 1}</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* MEDICAL BENEFITS */}
          <div className="md:col-span-1">
            <div className="bg-green-50/50 p-8 rounded-3xl sticky top-24 border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <HeartPulse className="text-green-600" size={28} />
                <h2 className="text-xl font-bold text-stone-800">Medical Benefits</h2>
              </div>
              <ul className="space-y-4">
                {health.map((benefit: string, idx: number) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
                    <p className="text-stone-600 text-sm leading-relaxed font-medium">{benefit}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-green-200">
                <p className="text-xs text-stone-400 italic">
                  *Traditional knowledge. Not medical advice.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}