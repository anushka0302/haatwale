'use client';

import React from 'react';
import { signInWithPopup, User } from 'firebase/auth'; // Import User type
import { auth, googleProvider } from '@/lib/firebase';
import { X, Mail } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  // FIX: Change 'any' to 'User'
  onSuccess: (user: User) => void; 
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onSuccess(result.user);
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl relative">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#053B28]">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login to continue your purchase</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 p-4 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700"
          >
            {/* Standard HTML img tag is fine here for external SVG */}
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
            Continue with Google
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 bg-gray-100 p-4 rounded-xl font-bold text-gray-400 cursor-not-allowed">
            <Mail size={20} />
            Email Login (Coming Soon)
          </button>
        </div>

        <p className="text-xs text-center text-gray-400 mt-8">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}