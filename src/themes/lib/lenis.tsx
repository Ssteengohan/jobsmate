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
    // Initialize Lenis smooth scrolling with enhanced aesthetics
    const lenis = new Lenis({
      duration: 2, // Slightly longer for smoother feel
      easing: (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.75, // Reduced for more subtle control
      touchMultiplier: 1.8, // Adjusted for better touch response
      infinite: false,
      lerp: 0.08, // Increased lerp for more fluid motion
    });

    // Store the instance in the ref
    lenisRef.current = lenis;

    // Configure GSAP ScrollTrigger to work with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Create a custom Lenis animation frame that updates ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Clean up - using the local variable instead of the ref
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}

// Provider component for Lenis
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useLenis();
  const [scrollData, setScrollData] = useState({ scroll: 0, direction: 0, isScrolling: false });

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Set up scroll listener for Lenis
    const onScroll = ({
      scroll,
      direction,
      velocity,
    }: {
      scroll: number;
      direction: number;
      velocity: number;
    }) => {
      setScrollData({
        scroll,
        direction,
        isScrolling: Math.abs(velocity) > 0.01,
      });
    };

    lenis.on('scroll', onScroll);

    return () => {
      // Using the captured lenis instance
      lenis.off('scroll', onScroll);
    };
  }, [lenisRef]);

  return <ScrollContext.Provider value={scrollData}>{children}</ScrollContext.Provider>;
}

// Custom hook for accessing scroll data
export function useScrollData() {
  return useContext(ScrollContext);
}
