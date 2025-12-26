'use client';

import React, { useEffect, useState } from 'react';

// === DEFINE SVG SHAPES (UPDATED: High Opacity & Shadows) ===

const LeafShape1 = ({ color }: { color: string }) => (
  // Changed opacity-60 to opacity-90 for better visibility
  <svg viewBox="0 0 24 24" fill={color} className="w-full h-full opacity-90 drop-shadow-sm">
    <path d="M12,2C9,2,2,9,2,12s7,10,10,10s10-7,10-10S15,2,12,2z M12,20c-1.5,0-7-6-7-8s2.5-8,7-8s7,6,7,8S13.5,20,12,20z"/>
  </svg>
);

const LeafShape2 = ({ color }: { color: string }) => (
  // Changed opacity-50 to opacity-80
  <svg viewBox="0 0 24 24" fill={color} className="w-full h-full opacity-80 drop-shadow-sm">
    <path d="M20.5,3.5c-2.3-2.3-6.1-2.3-8.5,0L3.5,12c-2.3,2.3-2.3,6.1,0,8.5s6.1,2.3,8.5,0L20.5,12 C22.8,9.6,22.8,5.8,20.5,3.5z"/>
  </svg>
);

const BerryShape = ({ color }: { color: string }) => (
  // Changed opacity-70 to opacity-100 (Solid)
  <svg viewBox="0 0 24 24" fill={color} className="w-full h-full opacity-100 drop-shadow-md">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

// === MAIN COMPONENT ===

interface ParticleStyle {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  scale: number;
  shapeType: number;
  color: string;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<ParticleStyle[]>([]);

  const brandPrimary = "#6DAE44"; 
  const brandAccent = "#F59E0B"; 
  
  // Increased count from 35 to 45 for more density
  const particleCount = 45; 

  useEffect(() => {
    const newParticles: ParticleStyle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const color = Math.random() > 0.3 ? brandPrimary : brandAccent;
      
      newParticles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        // FASTER: Changed from (15s-35s) to (10s-25s)
        animationDuration: `${Math.random() * 15 + 10}s`,
        animationDelay: `-${Math.random() * 20}s`,
        // LARGER: Increased scale range slightly
        scale: Math.random() * 1 + 0.8, 
        shapeType: Math.floor(Math.random() * 3),
        color: color,
      });
    }
    
    const timer = setTimeout(() => {
      setParticles(newParticles);
    }, 0);

    return () => clearTimeout(timer);
  }, []); 

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute top-[-10%] animate-fall will-change-transform"
          style={{
            left: particle.left,
            animationDuration: particle.animationDuration,
            animationDelay: particle.animationDelay,
            // LARGER BASE SIZE: Changed 30px to 45px
            width: `${45 * particle.scale}px`,
            height: `${45 * particle.scale}px`,
          }}
        >
           <div className="w-full h-full animate-[spin-slow_15s_linear_infinite]">
             {particle.shapeType === 0 && <LeafShape1 color={particle.color} />}
             {particle.shapeType === 1 && <LeafShape2 color={particle.color} />}
             {particle.shapeType === 2 && <BerryShape color={particle.color} />}
           </div>
        </div>
      ))}
    </div>
  );
}