'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#053B28] text-white pt-16 pb-8 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TOP SECTION: 4 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMN 1: BRAND & NEWSLETTER */}
          <div className="space-y-6">
            {/* Logo Area */}
            <div className="flex items-center gap-2 mb-4">
               {/* Make sure logo.svg exists, or use your standard logo with a brightness filter */}
               <img src="/logo.svg" alt="Haatwale Logo" className="h-12 w-auto brightness-0 invert" />
            </div>
            
            <h3 className="font-bold text-lg">Subscribe to our newsletter</h3>
            <p className="text-gray-300 text-sm">Get the latest updates on new harvests and offers.</p>
            
            {/* Input Field */}
            <div className="flex bg-white rounded-lg overflow-hidden p-1">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 px-4 py-2 text-gray-800 outline-none text-sm"
              />
              <button className="bg-[#6BBF46] hover:bg-[#5aa838] text-white px-4 py-2 rounded-md transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              <SocialIcon icon={<Facebook size={20} />} href="#" />
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Linkedin size={20} />} href="#" />
              <SocialIcon icon={<Youtube size={20} />} href="#" />
            </div>
          </div>

          {/* COLUMN 2: SHOP / SERVICES */}
          <div>
            <h3 className="font-bold text-lg mb-6 tracking-wide text-[#6BBF46]">SHOP</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/shop" className="hover:text-white hover:translate-x-1 transition-all inline-block">Shop All Products</Link></li>
              <li><Link href="/shop" className="hover:text-white hover:translate-x-1 transition-all inline-block">New Harvest</Link></li>
              <li><Link href="/shop" className="hover:text-white hover:translate-x-1 transition-all inline-block">Gift Boxes</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Bulk Orders</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Track Your Order</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: POLICIES / LINKS */}
          <div>
            <h3 className="font-bold text-lg mb-6 tracking-wide text-[#6BBF46]">OTHER LINKS</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">Our Story</Link></li>
              {/* UPDATED LINKS BELOW */}
              <li><Link href="/privacy-policy" className="hover:text-white hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white hover:translate-x-1 transition-all inline-block">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white hover:translate-x-1 transition-all inline-block">Refund Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white hover:translate-x-1 transition-all inline-block">Terms of Service</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACT INFO */}
          <div>
            <h3 className="font-bold text-lg mb-6 tracking-wide text-[#6BBF46]">CONTACT HAATWALE</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex gap-3 items-start">
                <Mail className="shrink-0 text-[#6BBF46]" size={18} />
                <a href="mailto:hello@haatwale.com" className="hover:text-white transition-colors">hello@haatwale.com</a>
              </li>
              <li className="flex gap-3 items-start">
                <Phone className="shrink-0 text-[#6BBF46]" size={18} />
                <div>
                  <a href="tel:+919105498001" className="hover:text-white transition-colors block">+91 9105498001</a>
                  <p className="text-xs text-gray-400 mt-1">10AM - 6PM, Mon - Sat</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="shrink-0 text-[#6BBF46]" size={18} />
                <span>
                  Village Haat Center, <br/>
                  Chharayal Nayabad, Haldwani, <br/>
                  Uttarakhand 263139, India
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2025 Haatwale Organic. All rights reserved.</p>
          <div className="flex gap-6">
             <span>
               Made with ❤️ in Devbhoomi By{' '}
               <a 
                 href="https://www.hoursdev.com" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="hover:text-white underline decoration-gray-600 hover:decoration-white transition-all"
               >
                 Hoursdev.com
               </a>
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a 
      href={href} 
      className="bg-white/10 p-2 rounded-full hover:bg-[#6BBF46] hover:text-white transition-all text-white"
    >
      {icon}
    </a>
  );
}