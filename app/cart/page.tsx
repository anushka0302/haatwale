'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; 
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import AuthModal from '../components/AuthModal';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: new (options: RazorpayOptions) => any; 
  }
}

export default function CartPage() {
  const { cart, removeFromCart, totalPrice } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    startPayment();
  };

  const startPayment = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        body: JSON.stringify({ amount: totalPrice }),
      });
      const data = await res.json();
      if (!data.orderId) throw new Error('Order creation failed');

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: totalPrice * 100,
        currency: "INR",
        name: "Haatwale Organic",
        description: "Payment for your order",
        order_id: data.orderId,
        handler: function (response: RazorpayResponse) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: user?.displayName || "",
          email: user?.email || "",
          contact: "" 
        },
        theme: {
          color: "#053B28"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong with payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-12 px-6 overflow-x-hidden">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* --- ANIMATED BACKGROUND SHAPES (Matching Profile/Orders) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute top-20 left-10 w-12 h-12 bg-[#6BBF46]/20 rounded-full animate-bounce duration-[5000ms]" />
        <div className="absolute top-40 right-20 w-16 h-8 bg-[#FDB813]/30 rounded-full rotate-45 animate-pulse" />
        <div className="absolute bottom-40 left-1/4 w-10 h-10 bg-[#6BBF46]/10 rounded-lg animate-spin duration-[8000ms]" />
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-[#FDB813]/5 rounded-full -translate-x-1/2 animate-ping" />
        <div className="absolute bottom-10 right-1/4 w-14 h-6 bg-[#6BBF46]/20 rounded-full -rotate-12 animate-bounce" />
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={(loggedInUser) => {
          setIsAuthModalOpen(false); 
          setUser(loggedInUser); 
          startPayment(); 
        }} 
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#053B28] mb-8">Your Cart</h1>
        
        {cart.length === 0 ? (
          // Glass Effect for Empty State
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-16 text-center shadow-2xl border border-white/40 flex flex-col items-center">
            <div className="bg-[#6BBF46]/10 p-8 rounded-full mb-6">
               <ShoppingBag className="w-12 h-12 text-[#6BBF46]" />
            </div>
            <h2 className="text-3xl font-bold text-[#053B28] mb-4">Your bag is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md">Looks like you haven&apos;t added any Pahadi goodness to your cart yet.</p>
            <Link 
              href="/shop" 
              className="bg-[#6BBF46] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-[#053B28] transition-all"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                // Glass Effect for Cart Items
                <div key={item.uniqueId} className="bg-white/70 backdrop-blur-xl p-4 rounded-[2rem] border border-white/40 shadow-xl flex items-center gap-4 transition-all hover:shadow-md">
                  <div className="h-24 w-24 bg-white/50 rounded-2xl flex items-center justify-center p-2 shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#053B28]">{item.name}</h3>
                    <span className="inline-block bg-[#6BBF46]/10 text-[#053B28] text-[10px] font-bold px-2 py-1 rounded-md mt-1 mb-1 tracking-widest uppercase">
                      Size: {item.variant}
                    </span>
                    <p className="text-[#6BBF46] font-bold text-lg">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     <span className="text-xs text-gray-500 font-bold">Qty: {item.quantity}</span>
                     <button 
                      onClick={() => removeFromCart(item.uniqueId)}
                      className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                     >
                        <Trash2 size={18} />
                     </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              {/* Glass Effect for Order Summary */}
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 shadow-2xl sticky top-32">
                <h3 className="text-xl font-bold text-[#053B28] mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Shipping</span>
                    <span className="text-[#6BBF46] font-bold uppercase text-xs tracking-widest">Free</span>
                  </div>
                  <div className="h-px bg-gray-200/50 my-2"></div>
                  <div className="flex justify-between text-xl font-bold text-[#053B28]">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-[#053B28] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#6BBF46] transition-all shadow-lg active:scale-95 disabled:opacity-70"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'} <ArrowRight size={20} />
                </button>
                
                <p className="text-[10px] text-center text-gray-400 mt-4 font-bold uppercase tracking-widest">
                  Secure Payment • 100% Organic
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}