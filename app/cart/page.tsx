'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; 
import { Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import AuthModal from '../components/AuthModal';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// FIX 1: Define the Razorpay Response Type
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// FIX 2: Define a basic shape for the Razorpay Constructor
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

// FIX 3: Add Razorpay to the Window interface safely
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
        // FIX 4: Use the strict type here
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (rzp as any).open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong with payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-12 px-6 flex flex-col items-center justify-center text-center bg-white">
        <div className="bg-green-50 p-8 rounded-full mb-6">
           <img src="/logo.svg" alt="Empty Cart" className="w-16 h-16 opacity-50 grayscale" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your bag is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven&apos;t added any Pahadi goodness to your cart yet.</p>
        <Link 
          href="/" 
          className="bg-[#6DAE44] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1E4A26] transition-all shadow-lg shadow-green-200"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={(loggedInUser) => {
          setIsAuthModalOpen(false); 
          setUser(loggedInUser); 
          startPayment(); 
        }} 
      />

      <div className="min-h-screen pt-28 pb-12 px-6 bg-[#F3F9F4]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1E4A26] mb-8">Your Cart</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.uniqueId} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                  <div className="h-24 w-24 bg-gray-50 rounded-xl flex items-center justify-center p-2 shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    <span className="inline-block bg-green-50 text-[#1E4A26] text-xs font-bold px-2 py-1 rounded-md mt-1 mb-1 border border-green-100">
                      Size: {item.variant}
                    </span>
                    <p className="text-[#6DAE44] font-bold text-lg">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     <span className="text-sm text-gray-500 font-medium">Qty: {item.quantity}</span>
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
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg sticky top-32">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="h-px bg-gray-100 my-2"></div>
                  <div className="flex justify-between text-xl font-bold text-[#1E4A26]">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-[#1E4A26] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'} <ArrowRight size={20} />
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                  Secure Payment • 100% Organic Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}