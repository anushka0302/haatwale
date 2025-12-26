'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage, closeToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-in">
      <div className="bg-white border border-green-100 shadow-2xl rounded-2xl p-4 flex items-center gap-4 min-w-[300px]">
        
        {/* Icon */}
        <div className="bg-green-100 p-2 rounded-full text-green-600">
          <CheckCircle size={24} fill="currentColor" className="text-white" />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h4 className="font-bold text-gray-800 text-sm">Success</h4>
          <p className="text-gray-600 text-sm">{toastMessage}</p>
        </div>

        {/* Close Button */}
        <button onClick={closeToast} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}