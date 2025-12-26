'use client';

import React from 'react';

export default function HeroScene() {
  return (
    // CHANGE: Removed '-z-10'. Now it sits comfortably in the header.
    <div className="absolute inset-0 overflow-hidden w-full h-full bg-gradient-to-b from-blue-100 to-white">
      
      {/* 1. THE SUN (Rotating) */}
      <div className="absolute top-10 right-10 w-32 h-32 md:w-64 md:h-64 opacity-90">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-sun text-yellow-400 fill-current">
          <circle cx="50" cy="50" r="20" />
          <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <line x1="50" y1="10" x2="50" y2="5" />
            <line x1="50" y1="90" x2="50" y2="95" />
            <line x1="10" y1="50" x2="5" y2="50" />
            <line x1="90" y1="50" x2="95" y2="50" />
            <line x1="22" y1="22" x2="18" y2="18" />
            <line x1="78" y1="78" x2="82" y2="82" />
            <line x1="78" y1="22" x2="82" y2="18" />
            <line x1="22" y1="78" x2="18" y2="82" />
          </g>
        </svg>
      </div>

      {/* 2. CLOUDS (Moving) */}
      <div className="absolute top-20 left-0 w-48 h-24 animate-cloud-slow opacity-80">
        <svg viewBox="0 0 100 60" className="fill-white drop-shadow-sm">
          <path d="M10,40 Q20,20 40,40 T70,40 T90,40 V60 H10 Z" />
        </svg>
      </div>
      <div className="absolute top-10 left-[-20%] w-64 h-32 animate-cloud-fast opacity-60" style={{ animationDelay: '5s' }}>
        <svg viewBox="0 0 100 60" className="fill-white drop-shadow-sm">
           <path d="M10,40 Q25,10 50,40 T90,40 V60 H10 Z" />
        </svg>
      </div>

      {/* 3. ROLLING HILLS */}
      <div className="absolute bottom-0 w-full h-1/2">
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path fill="#86efac" fillOpacity="0.6" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="#6DAE44" fillOpacity="1" d="M0,256L48,245.3C96,235,192,213,288,192C384,171,480,149,576,160C672,171,768,213,864,224C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* 4. CROPS (Swaying) */}
      <div className="absolute bottom-0 w-full h-16 flex justify-around px-10 opacity-70">
         {[...Array(20)].map((_, i) => {
             const height = 20 + (Math.sin(i * 10) + 1) * 10;
             return (
               <div key={i} className="w-1 bg-green-800 rounded-full animate-crop" 
                    style={{ 
                      animationDelay: `${i * 0.2}s`, 
                      height: `${height}px` 
                    }}>
               </div>
             );
         })}
      </div>
    </div>
  );
}