'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if hovering over interactive elements
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Only display custom cursor on desktop devices
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (isDesktop) {
      document.body.classList.add('custom-cursor');
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor');
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-4 w-4 rounded-full bg-[var(--primary-light-blue)] mix-blend-difference dark:bg-[var(--primary-gold)]"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Cursor follower ring */}
      <motion.div
        className="pointer-events-none fixed z-[9998] h-8 w-8 rounded-full border border-[var(--primary-medium-blue)] opacity-70 dark:border-[var(--primary-gold)]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 25,
          mass: 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
