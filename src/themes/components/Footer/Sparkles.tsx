'use client';
import React, { useEffect, useState } from 'react';
import { SparklesCore } from '../ui/sparkles';

export function SparklesPreview() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className="flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="relative">
        <h3 className="relative z-20 text-center text-2xl sm:text-3xl font-bold md:text-6xl lg:text-7xl">
          <span className="drop-shadow-[0_0_5px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_8px_rgba(42,151,219,0.3)]">
            Join our tech{' '}
          </span>
          <span className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-gold)] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(240,180,41,0.6)] dark:drop-shadow-[0_0_5px_rgba(255,197,71,0.8)]">
            community
          </span>
        </h3>

        {/* Gradients positioned under the text */}
        <div className="absolute right-0 -bottom-4 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#2a97db] to-transparent blur-sm" />
        <div className="absolute right-0 -bottom-4 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#1c6a9e] to-transparent" />
        <div className="absolute right-1/4 -bottom-6 left-1/6 mx-auto h-[3px] w-3/4 bg-gradient-to-r from-transparent via-[#f0b429] to-transparent blur-sm" />
      </div>

      <div className="relative mt-8 flex h-1/4 w-full justify-center lg:w-[60rem]">
        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.9}
          maxSize={1}
          particleDensity={1200}
          className="h-2/4 sm:h-3/4 w-full sm:pt-1"
          particleColor={isDarkMode ? '#3aa8ec' : '#1c6a9e'}
          speed={2}
        />
      </div>
    </div>
  );
}
