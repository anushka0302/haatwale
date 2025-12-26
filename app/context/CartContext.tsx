'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// === TYPES ===
export interface CartItem {
  id: number;
  uniqueId: string; // The crucial ID for deleting
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant: string;
}

export type Product = Omit<CartItem, 'quantity' | 'variant' | 'uniqueId'>;

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant: string, finalPrice: number) => void;
  removeFromCart: (uniqueId: string) => void;
  totalPrice: number;
  toastMessage: string | null;
  closeToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1. LOAD CART (With Cleanup for old buggy items)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('haatwale_cart');
      if (savedCart) {
        try {
          // FIX: Cast the parsed JSON as CartItem[] so TypeScript knows the structure
          const parsedCart = JSON.parse(savedCart) as CartItem[];
          
          // Filter out items that don't have uniqueId (Old data that causes bugs)
          // No need for 'any' here now because 'parsedCart' is typed
          const validItems = parsedCart.filter((item) => item.uniqueId);
          
          setTimeout(() => setCart(validItems), 0);
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
    }
  }, []);

  // 2. SAVE CART
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('haatwale_cart', JSON.stringify(cart));
    }
  }, [cart]);

  // === ACTIONS ===
  const addToCart = (product: Product, variant: string, finalPrice: number) => {
    const uniqueId = `${product.id}-${variant}`; 

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.uniqueId === uniqueId);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { 
        ...product, 
        id: product.id,
        uniqueId: uniqueId,
        variant: variant,
        price: finalPrice, 
        quantity: 1 
      }];
    });

    setToastMessage(`${product.name} (${variant})`); 
    setTimeout(() => setToastMessage(null), 3000);
  };

  // REMOVE FUNCTION (Strictly checks uniqueId)
  const removeFromCart = (uniqueId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.uniqueId !== uniqueId));
  };

  const closeToast = () => setToastMessage(null);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice, toastMessage, closeToast }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}