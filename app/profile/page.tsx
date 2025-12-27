'use client';

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User as UserIcon, Mail, Phone, MapPin, Loader2, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setPhone(userDoc.data().phone || '');
            setAddress(userDoc.data().address || '');
          }
        } catch (err) {
          console.error("Firestore fetch error:", err);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setUpdating(true);
    try {
      await updateProfile(user, { displayName });
      await setDoc(doc(db, 'users', user.uid), {
        fullName: displayName,
        phone,
        address,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-transparent">
      <Loader2 className="animate-spin text-[#6BBF46]" size={40} />
    </div>
  );

  return (
    // Changed: Removed 'bg-white' and added 'bg-transparent' to show animations
    <div className="relative min-h-screen w-full bg-transparent pt-32 pb-12 overflow-x-hidden">
      
      {/* --- ANIMATED BACKGROUND SHAPES --- */}
      {/* This layer is behind the content */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute top-20 left-10 w-12 h-12 bg-[#6BBF46]/20 rounded-full animate-bounce duration-[5000ms]" />
        <div className="absolute top-40 right-20 w-16 h-8 bg-[#FDB813]/30 rounded-full rotate-45 animate-pulse" />
        <div className="absolute bottom-40 left-1/4 w-10 h-10 bg-[#6BBF46]/10 rounded-lg animate-spin duration-[8000ms]" />
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-[#FDB813]/5 rounded-full -translate-x-1/2 animate-ping" />
        <div className="absolute bottom-10 right-1/4 w-14 h-6 bg-[#6BBF46]/20 rounded-full -rotate-12 animate-bounce" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Changed: Used bg-white/70 backdrop-blur for glass effect so shapes show through */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/40 overflow-hidden">
          
          <div className="h-32 bg-gradient-to-r from-[#053B28] to-[#6BBF46] relative opacity-90">
            <div className="absolute -bottom-12 left-10">
              <img 
                src={user?.photoURL || 'https://www.svgrepo.com/show/452229/google-docs.svg'} 
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-3xl border-4 border-white object-cover shadow-lg"
                alt="Avatar"
              />
            </div>
          </div>

          <div className="pt-16 pb-10 px-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#053B28]">Account Settings</h1>
              <p className="text-gray-600">Manage your Pahadi profile and shipping details</p>
            </div>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-widest">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/50 border border-gray-200 focus:bg-white focus:border-[#6BBF46] outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-widest">Email (Readonly)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    value={user?.email || ''} 
                    disabled
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-100/50 border border-transparent text-gray-400 cursor-not-allowed text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-widest">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/50 border border-gray-200 focus:bg-white focus:border-[#6BBF46] outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-widest">Default Shipping Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <textarea 
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/50 border border-gray-200 focus:bg-white focus:border-[#6BBF46] outline-none text-sm resize-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2 pt-4 flex items-center gap-4">
                <button 
                  type="submit" 
                  disabled={updating}
                  className="bg-[#053B28] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-[#6BBF46] transition-all flex items-center gap-2 shadow-lg disabled:opacity-70"
                >
                  {updating ? <Loader2 className="animate-spin" size={18} /> : "Save Changes"}
                </button>
                {success && (
                  <span className="text-[#6BBF46] flex items-center gap-1 font-bold animate-in fade-in slide-in-from-left-2">
                    <CheckCircle size={18} /> Updated Successfully
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}