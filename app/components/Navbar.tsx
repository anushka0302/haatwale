'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, User as UserIcon, LogOut, ChevronDown, Home, Store, Info, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import AuthModal from './AuthModal';

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  const { cart } = useCart();

  // Search Logic
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsUserDropdownOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleAuthSuccess = (user: User) => {
    setIsAuthModalOpen(false);
  };

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
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className={`w-6 h-6 transition-colors ${isScrolled ? 'text-gray-600' : 'text-gray-800'}`} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <img 
                src="/logo.svg" 
                alt="Haatwale Logo" 
                className="h-24 w-auto object-contain cursor-pointer" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex gap-8 text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600' : 'text-gray-800'}`}>
            <Link href="/" className="hover:text-brandPrimary transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-brandPrimary transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-brandPrimary transition-colors">Our Story</Link>
            <Link href="/contact" className="hover:text-brandPrimary transition-colors">Contact</Link>
          </div>

          {/* Right Actions */}
          <div className="flex gap-5 items-center">
            
            {/* SEARCH SECTION */}
            <div className="relative flex items-center">
               {isSearchOpen && (
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   onKeyDown={handleKeyDown}
                   autoFocus
                   placeholder="Search pahadi products..." 
                   className="absolute right-10 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm outline-none w-64 shadow-lg animate-in slide-in-from-right-4 duration-300 text-gray-800"
                 />
               )}
               <Search 
                 onClick={() => {
                    if (isSearchOpen && searchQuery) {
                        handleSearchSubmit();
                    } else {
                        setIsSearchOpen(!isSearchOpen);
                    }
                 }}
                 className={`w-5 h-5 cursor-pointer hover:text-brandPrimary transition-colors ${isScrolled ? 'text-gray-500' : 'text-gray-700'}`} 
               />
            </div>
            
            {/* Cart Link */}
            <Link href="/cart">
              <div className="relative cursor-pointer group">
                <ShoppingCart className={`w-5 h-5 group-hover:text-brandPrimary transition-colors ${isScrolled ? 'text-gray-500' : 'text-gray-700'}`} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brandAccent text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>

            {/* USER AUTH SECTION */}
            <div className="relative ml-2">
              {user ? (
                <div className="flex items-center">
                  <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 group"
                  >
                    <div className="hidden md:block text-right mr-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">Namaste,</p>
                      <p className={`text-xs font-bold truncate max-w-[80px] ${isScrolled ? 'text-brandDark' : 'text-gray-800'}`}>
                        {user.displayName?.split(' ')[0] || 'Pahadi'}
                      </p>
                    </div>
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt="User profile" 
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full border-2 border-brandPrimary/20 group-hover:border-brandPrimary transition-all object-cover shadow-sm" 
                      />
                    ) : (
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-brandPrimary/10 group-hover:text-brandPrimary transition-all border border-gray-200">
                        <UserIcon size={18} />
                      </div>
                    )}
                    <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsUserDropdownOpen(false)}></div>
                      <div className="absolute right-0 top-12 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in-95">
                        <div className="px-4 py-3 border-b border-gray-50 mb-2">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Signed in as</p>
                          <p className="text-sm font-bold text-brandDark truncate">{user.email}</p>
                        </div>
                        <Link 
                          href="/orders" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-brandPrimary/5 hover:text-brandPrimary transition-all"
                        >
                          <ShoppingCart size={16} /> My Orders
                        </Link>
                        <Link 
                          href="/profile" 
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-brandPrimary/5 hover:text-brandPrimary transition-all"
                        >
                          <UserIcon size={16} /> Account Settings
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all border-t border-gray-50 mt-2"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isScrolled ? 'border-brandPrimary text-brandPrimary hover:bg-brandPrimary hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-white'}`}
                >
                  <UserIcon size={16} />
                  <span className="text-xs font-bold">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR MENU --- */}
      <div className={`fixed inset-0 z-[100] transition-visibility duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
              <img src="/logo.svg" alt="Logo" className="h-16 w-auto" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto py-6 px-6 space-y-2">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-brandPrimary/5 hover:text-brandPrimary font-bold transition-all"
              >
                <Home size={20} /> Home
              </Link>
              <Link 
                href="/shop" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-brandPrimary/5 hover:text-brandPrimary font-bold transition-all"
              >
                <Store size={20} /> Shop
              </Link>
              <Link 
                href="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-brandPrimary/5 hover:text-brandPrimary font-bold transition-all"
              >
                <Info size={20} /> Our Story
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-brandPrimary/5 hover:text-brandPrimary font-bold transition-all"
              >
                <Phone size={20} /> Contact
              </Link>

              {user && (
                <>
                  <div className="h-px bg-gray-100 my-4" />
                  <Link 
                    href="/orders" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-brandPrimary/5 hover:text-brandPrimary font-bold transition-all"
                  >
                    <ShoppingCart size={20} /> My Orders
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-bold transition-all"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </>
              )}
            </div>

            {/* Menu Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              {!user && (
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-4 bg-brandPrimary text-white rounded-xl font-black shadow-lg shadow-brandPrimary/20"
                >
                  Join the Haat
                </button>
              )}
              <p className="mt-4 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                © 2024 Haatwale • Himalayan Born
              </p>
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}