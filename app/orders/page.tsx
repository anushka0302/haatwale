'use client';

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Package, CheckCircle2, Loader2, Calendar, IndianRupee } from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  items: OrderItem[];
  createdAt: Timestamp;
  status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchOrders(currentUser.uid);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchOrders = async (uid: string) => {
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <Loader2 className="animate-spin h-12 w-12 text-[#6BBF46]" />
    </div>
  );

  return (
    // Changed: bg-transparent to see animations
    <div className="relative min-h-screen bg-transparent pt-32 pb-20 px-6 overflow-x-hidden">
      
      {/* --- ANIMATED BACKGROUND SHAPES (Matching Profile Page) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute top-20 left-10 w-12 h-12 bg-[#6BBF46]/20 rounded-full animate-bounce duration-[5000ms]" />
        <div className="absolute top-40 right-20 w-16 h-8 bg-[#FDB813]/30 rounded-full rotate-45 animate-pulse" />
        <div className="absolute bottom-40 left-1/4 w-10 h-10 bg-[#6BBF46]/10 rounded-lg animate-spin duration-[8000ms]" />
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-[#FDB813]/5 rounded-full -translate-x-1/2 animate-ping" />
        <div className="absolute bottom-10 right-1/4 w-14 h-6 bg-[#6BBF46]/20 rounded-full -rotate-12 animate-bounce" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#053B28] flex items-center gap-3">
            <Package className="text-[#6BBF46]" /> My Orders
          </h1>
          <Link href="/shop" className="text-sm font-bold text-[#6BBF46] hover:bg-[#6BBF46]/10 px-4 py-2 rounded-full transition-all backdrop-blur-md">
            + New Order
          </Link>
        </div>

        {orders.length === 0 ? (
          // Glass Effect for Empty State
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-16 text-center shadow-2xl border border-white/40">
            <div className="w-16 h-16 bg-[#6BBF46]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-[#6BBF46]" />
            </div>
            <p className="text-gray-600 text-lg mb-6 font-medium">You haven&apos;t placed any orders yet.</p>
            <Link 
              href="/shop" 
              className="bg-[#053B28] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-[#6BBF46] transition-all inline-block"
            >
              Explore Pahadi Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              // Glass Effect for Order Cards
              <div key={order.id} className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/40 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="bg-white/30 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-white/20">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Order Date</p>
                      <div className="flex items-center gap-2 text-sm font-bold text-[#053B28]">
                        <Calendar size={14} className="text-[#6BBF46]" />
                        {order.createdAt?.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Amount</p>
                      <div className="flex items-center gap-1 text-sm font-bold text-[#6BBF46]">
                        <IndianRupee size={14} />
                        {order.totalAmount}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-green-100/50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold border border-green-200/50">
                    <CheckCircle2 size={14} />
                    Payment Successful
                  </div>
                </div>
                
                {/* Items List */}
                <div className="p-6 space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="h-14 w-14 bg-white/50 rounded-2xl flex items-center justify-center border border-white/20 overflow-hidden">
                        <img src="/logo.svg" alt="item" className="w-8 opacity-40" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#053B28]">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity} • Price: ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-white/20 border-t border-white/10 flex justify-between items-center">
                   <p className="text-[10px] text-gray-500 font-bold uppercase">ORDER ID: #{order.id.slice(0, 12).toUpperCase()}</p>
                   <button className="text-xs font-bold text-[#053B28] hover:text-[#6BBF46] transition-colors">Download Invoice</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}