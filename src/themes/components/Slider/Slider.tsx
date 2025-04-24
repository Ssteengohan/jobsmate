'use client';

import React, { useRef, useEffect } from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import useLenis from '@/themes/lib/lenis';

const words = `<span class="bg-gradient-to-r from-[var(--primary-light-blue)] via-[var(--primary-medium-blue)] to-[var(--primary-dark-blue)] bg-clip-text text-transparent">Integration with</span> <span class="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-gold)]/80 bg-clip-text text-transparent font-bold">15+ ATS</span>`;

// Logo component with GSAP-powered tilt effect
const TiltLogo = ({ src, alt }: { src: string; alt: string }) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    let bounds: DOMRect;
    let mouseX = 0;
    let mouseY = 0;

    const mouseMove = (e: MouseEvent) => {
      bounds = image.getBoundingClientRect();
      // Calculate mouse position as percentage of element dimensions
      mouseX = (e.clientX - bounds.left) / bounds.width - 0.5;
      mouseY = (e.clientY - bounds.top) / bounds.height - 0.5;

      // Apply the animation with GSAP to just the image
      gsap.to(image, {
        rotationY: mouseX * 20, // Tilt left and right
        rotationX: -mouseY * 20, // Tilt up and down
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
        scale: 1.05,
        y: -mouseY * 5,
        x: -mouseX * 5,
        filter: 'brightness(1.05)',
      });
    };

    const mouseLeave = () => {
      // Return to neutral position with GSAP
      gsap.to(image, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        y: 0,
        x: 0,
        filter: 'brightness(1)',
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    // Add event listeners
    image.addEventListener('mousemove', mouseMove);
    image.addEventListener('mouseleave', mouseLeave);

    // Cleanup
    return () => {
      image.removeEventListener('mousemove', mouseMove);
      image.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  return (
    <div className="relative" style={{ perspective: '1200px' }}>
      <div ref={imageRef} className="h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
        <Image src={src} alt={alt} width={210} height={210} className="object-contain" />
      </div>
    </div>
  );
};

const Slider = () => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  // Initialize Lenis smooth scrolling
  const lenis = useLenis();

  // Integrate Lenis with framer-motion scroll tracking
  useEffect(() => {
    // Register lenis scroll events with framer-motion
    if (!lenis.current) return;

    // Store reference to prevent stale closures in cleanup function
    const lenisInstance = lenis.current;

    const updateScrollValues = () => {
      if (containerRef.current && lenisInstance) {
        // Removed unused variables rect and scrollTop
        // We keep the function as a placeholder for future scroll handling
        // or remove it entirely if not needed
      }
    };

    lenisInstance.on('scroll', updateScrollValues);

    return () => {
      // Use stored instance rather than potentially stale lenis.current
      lenisInstance?.off('scroll', updateScrollValues);
    };
  }, [lenis]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Create a sequential animation flow: text → first row → second row
  // Delayed triggers - text appears later in the scroll
  const wordProgress = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  // First row starts only after text is complete, delayed
  const firstRowAnimProgress = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

  // Second row starts after first row is complete, delayed
  const secondRowAnimProgress = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);

  const scale = useTransform(scrollYProgress, [0.25, 0.35], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0.25, 0.35], [30, 0]);

  const combinedOpacity = useTransform(scrollYProgress, (latest) => {
    // Delayed appearance
    if (latest < 0.2 || latest > 1) return 0;
    return 1; // Only visible within the specified range
  });

  const displayStyle = useTransform(scrollYProgress, (latest) => {
    // Delayed display
    if (latest < 0.15 || latest > 1) return 'none';
    return 'flex';
  });

  // UNROLLED grid transform hooks for first row (3 items)
  // Maintained the same relative spacing between items
  const firstRowTrans0 = {
    opacity: useTransform(firstRowAnimProgress, [0, 0.15], [0, 1]),
    x: useTransform(firstRowAnimProgress, [0, 0.15], [-20, 0]),
    filter: useTransform(firstRowAnimProgress, [0, 0.15], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(firstRowAnimProgress, [0, 0.15], [0.9, 1]),
  };
  const firstRowTrans1 = {
    opacity: useTransform(firstRowAnimProgress, [0.25, 0.4], [0, 1]),
    x: useTransform(firstRowAnimProgress, [0.25, 0.4], [-20, 0]),
    filter: useTransform(firstRowAnimProgress, [0.25, 0.4], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(firstRowAnimProgress, [0.25, 0.4], [0.9, 1]),
  };
  const firstRowTrans2 = {
    opacity: useTransform(firstRowAnimProgress, [0.5, 0.65], [0, 1]),
    x: useTransform(firstRowAnimProgress, [0.5, 0.65], [-20, 0]),
    filter: useTransform(firstRowAnimProgress, [0.5, 0.65], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(firstRowAnimProgress, [0.5, 0.65], [0.9, 1]),
  };
  const firstRowTransforms = [firstRowTrans0, firstRowTrans1, firstRowTrans2];

  // UNROLLED grid transform hooks for second row (4 items for desktop)
  // Increased spacing between items for more pronounced sequential effect
  const secondRowTrans0 = {
    opacity: useTransform(secondRowAnimProgress, [0, 0.15], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0, 0.15], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0, 0.15], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0, 0.15], [0.9, 1]),
  };
  const secondRowTrans1 = {
    opacity: useTransform(secondRowAnimProgress, [0.25, 0.4], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0.25, 0.4], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0.25, 0.4], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0.25, 0.4], [0.9, 1]),
  };
  const secondRowTrans2 = {
    opacity: useTransform(secondRowAnimProgress, [0.5, 0.65], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0.5, 0.65], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0.5, 0.65], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0.5, 0.65], [0.9, 1]),
  };
  const secondRowTrans3 = {
    opacity: useTransform(secondRowAnimProgress, [0.75, 0.9], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0.75, 0.9], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0.75, 0.9], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0.75, 0.9], [0.9, 1]),
  };

  // For mobile/tablet: only use first 3 transforms (6 logos total)
  const mobileSecondRowTransforms = [secondRowTrans0, secondRowTrans1, secondRowTrans2];
  // For desktop: use all 4 transforms (7 logos total)
  const desktopSecondRowTransforms = [
    secondRowTrans0,
    secondRowTrans1,
    secondRowTrans2,
    secondRowTrans3,
  ];

  return (
    <div ref={containerRef} className="relative -top-0 -z-50 min-h-[90vh] w-full">
      {/* Dotted background using design system colors */}
      <div className="absolute inset-0 -z-50 overflow-hidden">
        {/* Gradient base layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-medium-blue)]/5 via-transparent to-[var(--primary-gold)]/5"></div>

        {/* Primary dots layer with design system colors */}
        <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-medium-blue)_0.8px,transparent_0.8px)] [background-size:14px_14px]"></div>

        {/* Secondary dots layer with accent color */}
        <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-gold)_0.8px,transparent_0.8px)] [background-size:18px_18px]"></div>

        {/* Radial gradient overlay with reduced opacity */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-[var(--neutral-50)]/30"></div>
      </div>

      {/* Interactive dots layer that fades with scroll */}
      <motion.div
        className="absolute inset-0 -z-50 [background-image:radial-gradient(var(--primary-light-blue)_1.5px,transparent_1.5px)] [background-size:18px_18px] dark:[background-image:radial-gradient(var(--accent-purple)_1.3px,transparent_1.3px)]"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.6, 0.8], [0.6, 0.4, 0.2, 0]),
        }}
      />

      <motion.section
        ref={sliderRef}
        style={{
          opacity: combinedOpacity,
          display: displayStyle,
          pointerEvents: 'none',
        }}
        className="fixed top-[15vh] left-0 -z-50 flex h-auto w-full items-center justify-start to-transparent transition-all duration-500 dark:from-[var(--neutral-50)]/80 dark:via-[var(--neutral-50)]/30 dark:to-transparent"
      >
        <motion.div
          ref={textRef}
          style={{ scale, y }}
          className="container flex h-full w-full flex-col items-center justify-start"
        >
          <div className="">
            <TextGenerateEffect
              words={words}
              html={true}
              duration={0.5}
              className="flex w-full items-center justify-center px-4 text-center font-bold lg:px-0 lg:text-start"
              animate={true}
              scrollProgress={wordProgress}
              tag="h2"
            />
          </div>

          {/* Mobile and tablet grid (2 columns) - show only 6 logos */}
          <div className="mt-12 mb-24 grid w-full grid-cols-2 items-center justify-center gap-8 px-4 md:hidden dark:invert">
            {/* Combine 6 logos (3 from first row, 3 from second row) */}
            {[...firstRowTransforms, ...mobileSecondRowTransforms].map((trans, i) => (
              <motion.div
                key={i + 1}
                style={{
                  opacity: trans.opacity,
                  x: trans.x,
                  filter: trans.filter,
                  scale: trans.scale,
                }}
                className="pointer-events-auto"
              >
                <TiltLogo src={`/${i + 1}.svg`} alt={`ATS Integration ${i + 1}`} />
              </motion.div>
            ))}
          </div>

          {/* Desktop grid layout - hide on mobile/tablet - show all 7 logos */}
          <div className="hidden md:block">
            {/* First row: 3-column grid with tilt effect */}
            <div className="mx-auto grid w-3/4 grid-cols-3 items-center justify-center gap-12 pt-12 dark:invert">
              {firstRowTransforms.map((trans, i) => (
                <motion.div
                  key={i + 1}
                  style={{
                    opacity: trans.opacity,
                    x: trans.x,
                    filter: trans.filter,
                    scale: trans.scale,
                  }}
                  className="pointer-events-auto"
                >
                  <TiltLogo src={`/${i + 1}.svg`} alt={`ATS Integration ${i + 1}`} />
                </motion.div>
              ))}
            </div>

            {/* Second row: 4 items, 4-column grid (original layout) */}
            <div className="mb-24 grid w-full grid-cols-4 items-center justify-center gap-12 px-16 dark:invert-100">
              {desktopSecondRowTransforms.map((trans, i) => (
                <motion.div
                  key={i + 4}
                  style={{
                    opacity: trans.opacity,
                    x: trans.x,
                    filter: trans.filter,
                    scale: trans.scale,
                  }}
                  className="pointer-events-auto"
                >
                  <TiltLogo src={`/${i + 4}.svg`} alt={`ATS Integration ${i + 4}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Extra space for scrolling */}
      <div className="h-[250vh] w-full sm:h-[200vh]"></div>
    </div>
  );
};

export default Slider;
