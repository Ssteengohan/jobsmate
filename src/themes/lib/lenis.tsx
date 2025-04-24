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
    // Initialize Lenis smooth scrolling with optimized settings for performance
    const lenis = new Lenis({
      duration: 1.0, // Reduced duration for more responsive feel
      easing: (t: number) => {
        // More performant cubic easing function
        return t === 1 ? 1 : 1 - Math.pow(1 - t, 3);
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // Balanced multiplier
      touchMultiplier: 1.2, // Improved touch response
      infinite: false,
      lerp: 0.08, // Slightly increased for smoother stops
      syncTouch: true, // Synchronize touch movements
    });

    // Store the instance in the ref
    lenisRef.current = lenis;

    // Use requestAnimationFrame with consistent frame updates
    const raf = (time: number) => {
      // Update lenis with time parameter for better physics
      lenis.raf(time);

      // Update ScrollTrigger after Lenis updates
      ScrollTrigger.update();

      // Continue animation loop
      frame = requestAnimationFrame(raf);
    };

    let frame = requestAnimationFrame(raf);

    // Force ScrollTrigger refresh when Lenis is ready
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 200);

    // Clean up
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}

// Provider component for Lenis with optimized scroll updates
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useLenis();
  const [scrollData, setScrollData] = useState({ scroll: 0, direction: 0, isScrolling: false });
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const throttleRef = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Optimized scroll handler with throttling for better performance
    const onScroll = ({
      scroll,
      direction,
      velocity,
    }: {
      scroll: number;
      direction: number;
      velocity: number;
    }) => {
      // Skip update if throttled (unless direction changed)
      if (throttleRef.current && Math.sign(direction) === Math.sign(lastScrollY.current)) {
        return;
      }

      // Save last direction for comparison
      lastScrollY.current = direction;

      // Update state and apply throttle
      setScrollData({
        scroll,
        direction,
        isScrolling: Math.abs(velocity) > 0.01,
      });

      // Enable throttle
      throttleRef.current = true;

      // Reset throttle after short delay
      setTimeout(() => {
        throttleRef.current = false;
      }, 16); // ~60fps timing

      // Clear any pending timeout
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      // Set timeout to update final position when scrolling stops
      updateTimeoutRef.current = setTimeout(() => {
        setScrollData({
          scroll,
          direction: 0,
          isScrolling: false,
        });
      }, 100);
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
