'use client';

import Lenis from 'lenis';
import { useEffect, useRef, createContext, useState, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

export default function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const deviceType = getDeviceType();

    // Adjust parameters based on device type with correct types
    const config: LenisOptions = {
      duration: deviceType === 'desktop' ? 1.0 : 0.8,
      easing: (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(1 - t, 3);
      },
      orientation: 'vertical' as Orientation,
      gestureOrientation: 'vertical' as Orientation,
      smoothWheel: true,
      wheelMultiplier: deviceType === 'desktop' ? 1.0 : 0.9,
      touchMultiplier: deviceType === 'mobile' ? 1.5 : deviceType === 'tablet' ? 1.4 : 1.2,
      infinite: false,
      lerp: deviceType === 'desktop' ? 0.08 : 0.06, // Lower lerp for more responsive feel on mobile
      syncTouch: true,
      touchInertiaMultiplier: deviceType === 'desktop' ? 1.0 : 1.2,
    };

    const lenis = new Lenis(config);

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frame = requestAnimationFrame(raf);
    };

    let frame = requestAnimationFrame(raf);

    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 200);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useLenis();
  const [scrollData, setScrollData] = useState({ scroll: 0, direction: 0, isScrolling: false });
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const throttleRef = useRef(false);
  const lastScrollY = useRef(0);
  const deviceType = useRef(getDeviceType());

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

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

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      lenis.off('scroll', onScroll);
    };
  }, [lenisRef]);

  return <ScrollContext.Provider value={scrollData}>{children}</ScrollContext.Provider>;
}

export function useScrollData() {
  return useContext(ScrollContext);
}
