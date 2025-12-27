'use client';

import React, { useState } from 'react';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  User,
  UserCredential 
} from 'firebase/auth'; 
import { auth, googleProvider, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { X, Mail, Lock, Loader2, Eye, EyeOff, CheckCircle2, AlertCircle, Phone, MapPin, User as UserIcon } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void; 
}

interface FirebaseError {
  code: string;
  message: string;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);
  const [isCompletingGoogleProfile, setIsCompletingGoogleProfile] = useState(false);
  const [tempGoogleUser, setTempGoogleUser] = useState<User | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  // --- GOOGLE LOGIN WITH MISSING INFO DETECTION ---
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check Firestore for existing profile
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists() || !userSnap.data().phone) {
        // User is new or hasn't provided phone/address yet
        setTempGoogleUser(user);
        setIsCompletingGoogleProfile(true);
        setFullName(user.displayName || "");
        setSuccessMsg("Almost there! Please provide your delivery details.");
      } else {
        setSuccessMsg("Welcome back! Logging you in...");
        setTimeout(() => onSuccess(user), 800);
      }
    } catch (err) {
      const errorObj = err as FirebaseError;
      setError(errorObj.code === 'auth/popup-closed-by-user' ? "Sign-in cancelled." : "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  // --- FINISH GOOGLE PROFILE ---
  const handleFinishGoogleProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempGoogleUser) return;
    setLoading(true);
    try {
      await setDoc(doc(db, "users", tempGoogleUser.uid), {
        fullName,
        email: tempGoogleUser.email,
        phone,
        address,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSuccessMsg("Profile completed! Welcome to Haatwale 🙏");
      setTimeout(() => onSuccess(tempGoogleUser), 1000);
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- STANDARD EMAIL AUTH ---
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");
    
    try {
      let result: UserCredential; 
      
      if (isRegistering) {
        result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: fullName });
        await setDoc(doc(db, "users", result.user.uid), {
          fullName,
          email,
          phone,
          address,
          updatedAt: new Date().toISOString()
        });

        setSuccessMsg("Account created! Welcome to Haatwale 🙏");
        setTimeout(() => onSuccess(result.user), 1500);
      } else {
        result = await signInWithEmailAndPassword(auth, email, password);
        setSuccessMsg("Welcome back! Logging you in...");
        setTimeout(() => onSuccess(result.user), 800);
      }
    } catch (err) {
      const errorObj = err as FirebaseError;
      if (errorObj.code === 'auth/email-already-in-use') {
        setError("Email already registered. Try logging in.");
        setIsRegistering(false);
      } else {
        setError("Authentication failed. Please check your details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl relative overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2"><X size={24} /></button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#053B28]">
            {isCompletingGoogleProfile ? "One last step" : isRegistering ? "Join Haatwale" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            {isCompletingGoogleProfile ? "Provide your contact details for delivery" : isRegistering ? "Create your account to get started" : "Login to continue shopping"}
          </p>
        </div>

        {!isCompletingGoogleProfile && (
          <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition-all font-bold text-gray-700 mb-6 disabled:opacity-50">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>
        )}

        <form onSubmit={isCompletingGoogleProfile ? handleFinishGoogleProfile : handleEmailAuth} className="space-y-3">
          {(isRegistering || isCompletingGoogleProfile) && (
            <>
              <div className="relative">
                <UserIcon className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input type="text" placeholder="Full Name" value={fullName} className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none text-sm focus:border-[#6BBF46]" onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input type="tel" placeholder="Mobile Number" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none text-sm focus:border-[#6BBF46]" onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <textarea placeholder="Shipping Address" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none text-sm focus:border-[#6BBF46] h-20 resize-none" onChange={(e) => setAddress(e.target.value)} required />
              </div>
            </>
          )}

          {!isCompletingGoogleProfile && (
            <>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none text-sm focus:border-[#6BBF46]" onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input type={showPassword ? "text" : "password"} placeholder="Password (min. 6 chars)" className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none text-sm focus:border-[#6BBF46]" onChange={(e) => setPassword(e.target.value)} required={!isCompletingGoogleProfile} minLength={6} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </>
          )}

          {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl flex gap-2 border border-red-100"><AlertCircle size={16} />{error}</div>}
          {successMsg && <div className="bg-green-50 text-green-600 text-xs p-3 rounded-xl flex gap-2 border border-green-100"><CheckCircle2 size={16} />{successMsg}</div>}

          <button type="submit" disabled={loading} className={`w-full text-white py-3.5 rounded-xl font-bold text-sm shadow-lg ${isRegistering || isCompletingGoogleProfile ? 'bg-[#6BBF46]' : 'bg-[#053B28]'}`}>
            {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : (isCompletingGoogleProfile ? "Complete Profile" : isRegistering ? "Create Account" : "Login")}
          </button>
        </form>

        {!isCompletingGoogleProfile && (
          <p className="text-center text-xs text-gray-500 mt-6">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsRegistering(!isRegistering)} className="text-[#6BBF46] font-bold hover:underline">
              {isRegistering ? "Login" : "Sign Up"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}