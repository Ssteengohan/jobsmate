'use client';

import Lenis from 'lenis';
import { useEffect, useRef, createContext, useState, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Create context for scroll data
export const ScrollContext = createContext({
  scroll: 0,
  direction: 0,
  isScrolling: false,
});

export default function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling with performance-optimized settings
    const lenis = new Lenis({
      duration: 1.2, // Reduced from 2 for better responsiveness on MacBook
      easing: (t: number) => {
        // Simplified easing function for better performance
        return 1 - Math.pow(1 - t, 3);
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly increased for better responsiveness
      touchMultiplier: 1.5, // Reduced for better control on trackpads
      infinite: false,
      lerp: 0.06, // Reduced for better performance on MacBook
      syncTouch: true, // Synchronize touch movements for smoother feel
    });

    // Store the instance in the ref
    lenisRef.current = lenis;

    // Configure GSAP ScrollTrigger to work with Lenis
    // Use requestAnimationFrame for better performance
    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    // Clean up
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}

// Provider component for Lenis with debounced scroll updates
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useLenis();
  const [scrollData, setScrollData] = useState({ scroll: 0, direction: 0, isScrolling: false });
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Optimized scroll handler with debounce for scroll state updates
    const onScroll = ({
      scroll,
      direction,
      velocity,
    }: {
      scroll: number;
      direction: number;
      velocity: number;
    }) => {
      // Clear existing timeout to debounce frequent updates
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      // Delay state updates to reduce render frequency
      updateTimeoutRef.current = setTimeout(() => {
        setScrollData({
          scroll,
          direction,
          isScrolling: Math.abs(velocity) > 0.01,
        });
      }, 16); // Approximately matches 60fps for smoother updates
    };

    lenis.on('scroll', onScroll);

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      lenis.off('scroll', onScroll);
    };
  }, [lenisRef]);

  return <ScrollContext.Provider value={scrollData}>{children}</ScrollContext.Provider>;
}

// Custom hook for accessing scroll data
export function useScrollData() {
  return useContext(ScrollContext);
}
