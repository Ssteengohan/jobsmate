'use client';

import Lenis from 'lenis';
import { useEffect, useRef, createContext, useState, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

// Add interface to extend Window type
interface WindowWithLenis extends Window {
  lenis?: Lenis;
}

// Update TypeScript global declarations
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Import the required types from Lenis
type LenisOptions = ConstructorParameters<typeof Lenis>[0];
type Orientation = 'vertical' | 'horizontal';

export const ScrollContext = createContext({
  scroll: 0,
  direction: 0,
  isScrolling: false,
});

// Device detection utility
const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop';

  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
};

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollData, setScrollData] = useState({ scroll: 0, direction: 0, isScrolling: false });
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const throttleRef = useRef(false);
  const lastScrollY = useRef(0);
  const deviceType = useRef(getDeviceType());

  useEffect(() => {
    // Skip if not in browser
    if (typeof window === 'undefined') return;

    const currentDeviceType = getDeviceType();

    // Adjust parameters based on device type with correct types
    const config: LenisOptions = {
      duration: currentDeviceType === 'desktop' ? 1.0 : 0.5,
      easing: (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(1 - t, 3);
      },
      orientation: 'vertical' as Orientation,
      gestureOrientation: 'vertical' as Orientation,
      smoothWheel: true,
      wheelMultiplier: currentDeviceType === 'desktop' ? 1.0 : 1.2,
      touchMultiplier:
        currentDeviceType === 'mobile' ? 2.0 : currentDeviceType === 'tablet' ? 1.8 : 1.2,
      infinite: false,
      lerp: currentDeviceType === 'desktop' ? 0.08 : 0.04,
      syncTouch: true,
      touchInertiaMultiplier: currentDeviceType === 'desktop' ? 1.0 : 1.5,
    };

    // Create the Lenis instance with our configuration
    const lenis = new Lenis(config);

    // Store in ref for component access
    lenisRef.current = lenis;

    // Also make Lenis globally accessible for the smooth scroll handlers
    if (typeof window !== 'undefined') {
      (window as WindowWithLenis).lenis = lenis;
    }

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frame = requestAnimationFrame(raf);
    };

    let frame = requestAnimationFrame(raf);

    // Setup scroll listener
    const onScroll = ({
      scroll,
      direction,
      velocity,
    }: {
      scroll: number;
      direction: number;
      velocity: number;
    }) => {
      if (throttleRef.current && Math.sign(direction) === Math.sign(lastScrollY.current)) {
        return;
      }

      lastScrollY.current = direction;

      setScrollData({
        scroll,
        direction,
        isScrolling: Math.abs(velocity) > 0.01,
      });

      throttleRef.current = true;

      // Shorter throttle time for touch devices for more responsive updates
      const throttleTime = deviceType.current === 'desktop' ? 16 : 8;

      setTimeout(() => {
        throttleRef.current = false;
      }, throttleTime);

      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      // Shorter timeout for mobile/tablet
      const scrollTimeout = deviceType.current === 'desktop' ? 100 : 80;

      updateTimeoutRef.current = setTimeout(() => {
        setScrollData({
          scroll,
          direction: 0,
          isScrolling: false,
        });
      }, scrollTimeout);
    };

    lenis.on('scroll', onScroll);

    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 200);

    return () => {
      cancelAnimationFrame(frame);
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, []);

  return <ScrollContext.Provider value={scrollData}>{children}</ScrollContext.Provider>;
}

export function useScrollData() {
  return useContext(ScrollContext);
}

// Standalone hook for accessing Lenis instance
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Get the global Lenis instance
    if (typeof window !== 'undefined' && window.lenis) {
      lenisRef.current = window.lenis;
    }
  }, []);

  return lenisRef;
}

// Conditional provider that only applies smooth scrolling outside studio routes
export function ConditionalSmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith('/studio');

  // If we're on a studio route, render children without smooth scrolling
  if (isStudioRoute) {
    return <>{children}</>;
  }

  // Otherwise, apply smooth scrolling
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
