'use client';

import React from 'react';
import { CheckCircle, Download, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Defined interface to resolve the TypeScript "any" type error
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface SuccessModalProps {
  isOpen: boolean;
  orderId: string;
  amount: number;
  items: OrderItem[];
  onClose: () => void;
}

export default function PaymentSuccessModal({ isOpen, orderId, amount, items, onClose }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with blur matching your brand's glassmorphism style */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Animated Modal Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl overflow-hidden"
          >
            {/* Success Header with brand colors (#6BBF46) */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <CheckCircle className="text-[#6BBF46] w-12 h-12" />
              </div>
              <h2 className="text-2xl font-black text-[#053B28]">Payment Successful!</h2>
              <p className="text-gray-500 text-sm mt-1">Order ID: #{orderId.slice(0, 10).toUpperCase()}</p>
            </div>

            {/* Invoice Summary Box */}
            <div className="mt-8 bg-gray-50/80 rounded-3xl p-6 border border-gray-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Invoice Summary</p>
              <div className="space-y-3 max-h-32 overflow-y-auto pr-2">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">{item.name} x{item.quantity}</span>
                    <span className="text-[#053B28] font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-gray-200 my-4" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-500">Total Paid</span>
                <span className="text-xl font-black text-[#6BBF46]">₹{amount}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="flex items-center justify-center gap-2 py-4 border-2 border-gray-100 rounded-2xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all">
                <Download size={16} /> Invoice
              </button>
              <button 
                onClick={onClose}
                className="py-4 bg-[#053B28] text-white rounded-2xl text-xs font-black shadow-lg shadow-[#053B28]/20 hover:bg-[#6BBF46] transition-all"
              >
                Continue Shop
              </button>
            </div>

            {/* Email Confirmation Hint */}
            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
              <Mail size={12} /> A copy has been sent to your email
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}