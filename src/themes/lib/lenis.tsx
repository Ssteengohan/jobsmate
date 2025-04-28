'use client';

import Lenis from 'lenis';
import { useEffect, useRef, createContext, useState, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollContext = createContext({
  scroll: 0,
  direction: 0,
  isScrolling: false,
});

export default function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(1 - t, 3);
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
      lerp: 0.08,
      syncTouch: true,
    });

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

      setTimeout(() => {
        throttleRef.current = false;
      }, 16);

      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

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

export function useScrollData() {
  return useContext(ScrollContext);
}
