'use client';

import React from 'react';
import { Mountain, Users, Leaf, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* 1. HERO SECTION */}
      <div className="relative pt-40 pb-20 px-6 bg-[#F5F9F5]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#6BBF46] font-bold tracking-widest uppercase text-sm mb-4 block">Who We Are</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#053B28] mb-8 leading-tight">
            From the Himalayas <br/> to Your Home
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Haatwale is not just a brand; it is a bridge. We connect the hardworking farmers of Uttarakhand&apos;s remote villages directly to you, eliminating middlemen and ensuring purity.
          </p>
        </div>
      </div>

      {/* 2. VALUES GRID */}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          
          <div className="text-center space-y-4 p-6 rounded-3xl hover:bg-[#F5F9F5] transition-colors duration-300">
            <div className="w-16 h-16 bg-[#6BBF46]/10 text-[#6BBF46] rounded-full flex items-center justify-center mx-auto mb-6">
              <Mountain size={32} />
            </div>
            <h3 className="text-2xl font-bold text-[#053B28]">High Altitude Sourced</h3>
            <p className="text-gray-600 leading-relaxed">
              Our produce grows above 5000ft in pristine air, water, and soil. The harsh climate naturally prevents pests, making our crops purely organic by nature.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-3xl hover:bg-[#F5F9F5] transition-colors duration-300">
            <div className="w-16 h-16 bg-[#6BBF46]/10 text-[#6BBF46] rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf size={32} />
            </div>
            <h3 className="text-2xl font-bold text-[#053B28]">100% Chemical Free</h3>
            <p className="text-gray-600 leading-relaxed">
              We follow the traditional &quot;Jaivik&quot; farming methods passed down through generations. No synthetic fertilizers, no GMOs—just pure earth.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-3xl hover:bg-[#F5F9F5] transition-colors duration-300">
            <div className="w-16 h-16 bg-[#6BBF46]/10 text-[#6BBF46] rounded-full flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-bold text-[#053B28]">Farmer First</h3>
            <p className="text-gray-600 leading-relaxed">
              We pay fair prices directly to the growers, empowering rural livelihoods in Devbhoomi. Your purchase supports a family in the hills.
            </p>
          </div>

        </div>
      </div>

      {/* 3. DETAILED STORY SECTION */}
      <div className="py-20 px-6 bg-[#053B28] text-white">
        <div className="max-w-3xl mx-auto space-y-8 text-lg leading-relaxed text-gray-200">
          <div className="flex items-center gap-3 text-[#6BBF46] mb-2">
            <Heart size={24} fill="currentColor" />
            <span className="font-bold tracking-widest uppercase text-sm">Our Tradition</span>
          </div>
          
          <h2 className="text-4xl font-serif font-bold text-white mb-8">The Spirit of the &quot;Haat&quot;</h2>
          
          <p>
            In the hills, a <strong>&quot;Haat&quot;</strong> is a weekly village market where locals gather to trade their freshest harvest. It is a place of trust, community, and pure food. Farmers walk miles carrying their produce—Rajma, Millets, Spices—knowing that their neighbors value quality over quantity.
          </p>
          <p>
            As urbanization grows, access to this authentic mountain produce is fading. <span className="text-white font-bold">Haatwale</span> was born to keep this tradition alive digitally. We travel to remote valleys—from Munsiyari to Uttarkashi—to collect rare pulses, spices, and herbs that you won&apos;t find in regular grocery stores.
          </p>
          <p>
            When you buy from Haatwale, you aren&apos;t just buying food; you are preserving a culture, saving indigenous seeds, and tasting the true essence of the Himalayas.
          </p>

          <div className="pt-8">
             <img src="/logo.svg" alt="Haatwale Signature" className="h-16 w-auto brightness-0 invert opacity-50" />
          </div>
        </div>
      </div>

    </div>
  );
}