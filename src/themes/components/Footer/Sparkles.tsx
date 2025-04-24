'use client';
import React, { useEffect, useState, useRef } from 'react';
import { SparklesCore } from '../ui/sparkles';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SparklesPreview() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    // Animate gradient lines
    if (gradientRef.current) {
      const gradients = gradientRef.current.querySelectorAll('.gradient-line');
      tl.from(
        gradients,
        {
          width: 0,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power2.inOut',
        },
        0.3,
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Check initial color scheme
    if (typeof window !== 'undefined') {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

      // Listen for changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex h-full w-full items-center justify-center"
    >
      {/* Enhanced gradients with better positioning */}
      <div ref={gradientRef} className="pointer-events-none absolute inset-0">
        <div className="gradient-line absolute top-1/3 right-0 left-0 mx-auto h-[2px] w-2/3 bg-gradient-to-r from-transparent via-[#2a97db] to-transparent opacity-60 blur-sm" />
        <div className="gradient-line absolute top-1/2 right-0 left-0 mx-auto h-px w-3/5 bg-gradient-to-r from-transparent via-[#1c6a9e] to-transparent opacity-40" />
        {/* <div className="gradient-line absolute right-0 bottom-1/3 left-0 mx-auto h-[2px] w-2/5 bg-gradient-to-r from-transparent via-[#f0b429] to-transparent opacity-70 blur-[1px]" /> */}
      </div>

      {/* Core sparkles component with more subtle settings */}
      <SparklesCore
        background="transparent"
        minSize={0.4} // Reduced size for subtlety
        maxSize={1.0} // Reduced max size
        particleDensity={600} // Reduced density
        className="h-full w-full"
        particleColor={isDarkMode ? 'rgba(58, 168, 236, 0.7)' : 'rgba(28, 106, 158, 0.5)'}
        speed={0.8} // Slowed down for elegance
      />
    </div>
  );
}
