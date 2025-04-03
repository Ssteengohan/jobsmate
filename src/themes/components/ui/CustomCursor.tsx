'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        (target.classList && target.classList.contains('interactive'));

      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Only display custom cursor on desktop devices
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (isDesktop) {
      document.body.classList.add('custom-cursor');
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('custom-cursor');
    };
  }, [isVisible]);

  return (
    <>
      {/* Main cursor dot - smaller and more subtle */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-3 w-3 rounded-full bg-[var(--primary-medium-blue)] mix-blend-difference dark:bg-[var(--primary-gold)]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0.8 : 1,
          opacity: isVisible ? 0.8 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 750,
          damping: 40,
          mass: 0.2,
        }}
      />

      {/* Cursor follower ring - more subtle with fade effect */}
      <motion.div
        className="pointer-events-none fixed z-[9998] h-6 w-6 rounded-full border border-[var(--primary-medium-blue)]/60 backdrop-blur-[1px] dark:border-[var(--primary-gold)]/60"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.3 : 1,
          opacity: isVisible ? (isHovering ? 0.7 : 0.5) : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      />
    </>
  );
};

export default CustomCursor;
