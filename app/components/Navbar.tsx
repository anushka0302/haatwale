'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
// IMPORT CART
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // GET CART DATA
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-6 py-4
          ${isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className={`w-6 h-6 transition-colors ${isScrolled ? 'text-gray-600' : 'text-brandDark'}`} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/">
              <img 
                src="/logo.svg" 
                alt="Haatwale Logo" 
                className="h-24 w-auto object-contain cursor-pointer" 
              />
            </Link>
          </div>

          <div className={`hidden md:flex gap-8 text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600' : 'text-gray-800'}`}>
            <Link href="/" className="hover:text-brandPrimary transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-brandPrimary transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-brandPrimary transition-colors">Our Story</Link>
            <Link href="/contact" className="hover:text-brandPrimary transition-colors">Contact</Link>
          </div>

          <div className="flex gap-5 items-center">
            <Search className={`w-5 h-5 cursor-pointer hover:text-brandPrimary transition-colors ${isScrolled ? 'text-gray-500' : 'text-gray-700'}`} />
            
            {/* Link to Cart Page */}
            <Link href="/cart">
              <div className="relative cursor-pointer group">
                <ShoppingCart className={`w-5 h-5 group-hover:text-brandPrimary transition-colors ${isScrolled ? 'text-gray-500' : 'text-gray-700'}`} />
                {/* Show Badge only if items exist */}
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brandAccent text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Same as before) */}
      <div 
        className={`fixed inset-0 z-[60] bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
            {/* Changed h-10 to h-20 for bigger visibility */}
            <img src="/logo.svg" alt="Logo" className="h-24 w-auto" />
            <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-gray-500" />
            </button>
            </div>
        
        <div className="flex flex-col p-8 gap-6 text-xl font-medium text-brandDark">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandPrimary">Home</Link>
          <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandPrimary">My Cart ({cart.length})</Link>
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandPrimary">Shop</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandPrimary">Our Story</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandPrimary">Contact</Link>
        </div>
      </div>
    </>
  );
}