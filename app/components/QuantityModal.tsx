'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';

interface QuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onConfirm: (product: Product, variant: string, price: number) => void;
}

export default function QuantityModal({ isOpen, onClose, product, onConfirm }: QuantityModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  if (!mounted || !isOpen || !product) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>
      <ModalContent 
        key={product.id} 
        product={product} 
        onClose={onClose} 
        onConfirm={onConfirm} 
      />
    </div>,
    document.body
  );
}

function ModalContent({ product, onClose, onConfirm }: { 
  product: Product; 
  onClose: () => void; 
  onConfirm: (product: Product, variant: string, price: number) => void; 
}) {
  const [selectedOption, setSelectedOption] = useState<number>(0);

  // Updated Regex to include 'timur', 'pepper', 'mirch' explicitly
  const isLiquid = product.name.toLowerCase().match(/oil|ghee|squash|juice|liquid|burans|rhododendron|syrup|ark/);
  const isSpice = product.name.toLowerCase().match(/spice|chili|mirch|turmeric|salt|herb|tea|timur|pepper|powder/);

  let options = [];

  // --- STRATEGIC PRICING LOGIC (Base Price = 1 KG) ---
  if (isLiquid) {
    // Liquids (Glass Jars = Heavy Shipping + Fragile Packing)
    options = [
      { label: "250 ml", multiplier: 0.35 }, 
      { label: "500 ml", multiplier: 0.60 }, 
      { label: "750 ml", multiplier: 0.85 }, // Added consistent step
      { label: "1 Liter", multiplier: 1.0 }, 
      { label: "2 Liters", multiplier: 1.95 }, 
      { label: "5 Liters", multiplier: 4.85 },
    ];
  } else if (isSpice) {
    // Spices (Light Content, but High Value/Packaging)
    // Fixed: Previous logic had 250gm at 1.0 (Full KG price). Now scaled to KG.
    options = [
      { label: "50 gm", multiplier: 0.08 },  // Small pack premium included
      { label: "100 gm", multiplier: 0.15 },
      { label: "250 gm", multiplier: 0.30 }, // ~25% weight + packaging cost
      { label: "500 gm", multiplier: 0.55 },
      { label: "750 gm", multiplier: 0.75 }, // EXACT calculation (367.5 for 490)
      { label: "1 kg", multiplier: 1.0 },
    ];
  } else {
    // Grains/Pulses/General (Pure Weight)
    options = [
      { label: "250 gm", multiplier: 0.30 }, 
      { label: "500 gm", multiplier: 0.55 }, 
      { label: "750 gm", multiplier: 0.75 }, // Added 750gm option
      { label: "1 kg", multiplier: 1.0 },
      { label: "2 kg", multiplier: 1.98 }, 
      { label: "5 kg", multiplier: 4.90 }, 
    ];
  }

  const activeOption = options[selectedOption] || options[0];
  
  // Math.round ensures clean numbers (e.g. 367.5 becomes 368)
  const finalPrice = Math.round(product.price * activeOption.multiplier);

  const handleConfirm = () => {
    onConfirm(product, activeOption.label, finalPrice);
    onClose();
  };

  return (
    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl scale-100 transform transition-all relative z-10">
      
      {/* Header */}
      <div className="bg-[#F5F9F5] p-6 flex justify-between items-start">
        <div className="flex gap-4">
            <div className="w-20 h-20 bg-white rounded-xl p-2 shadow-sm flex items-center justify-center">
              <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#6BBF46] uppercase tracking-wider">Select Quantity</p>
              <h3 className="text-xl font-bold text-[#053B28] leading-tight line-clamp-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mt-1">Base Price: ₹{product.price} / kg</p>
            </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full text-gray-500 transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Options Grid */}
      <div className="p-6">
        <label className="block text-sm font-bold text-gray-700 mb-4">Choose Pack Size:</label>
        
        <div className="grid grid-cols-2 gap-3 mb-8">
          {options.map((opt, idx) => {
            const price = Math.round(product.price * opt.multiplier);
            const isSelected = selectedOption === idx;
            
            return (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                  isSelected 
                    ? 'border-[#6BBF46] bg-[#F5F9F5] shadow-md' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className={`block font-bold ${isSelected ? 'text-[#053B28]' : 'text-gray-700'}`}>
                  {opt.label}
                </span>
                <span className="block text-sm text-gray-500">₹{price}</span>
                
                {isSelected && (
                  <div className="absolute top-3 right-3 w-4 h-4 bg-[#6BBF46] rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Button */}
        <button 
          onClick={handleConfirm}
          className="w-full bg-[#053B28] hover:bg-[#6BBF46] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <ShoppingBag size={20} />
          Add Pack - ₹{finalPrice}
        </button>
      </div>
    </div>
  );
}