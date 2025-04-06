'use client';

import React, { useRef, useEffect } from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';

const words = `Integration with <span class="text-[var(--primary-gold)]">15+ ATS</span>`;

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Create a sequential animation flow: text → first row → second row
  const wordProgress = useTransform(scrollYProgress, [0.22, 0.28], [0, 1]);

  // First row starts after text is complete
  const firstRowAnimProgress = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  // Second row starts after first row is complete
  const secondRowAnimProgress = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);

  const scale = useTransform(scrollYProgress, [0.2, 0.3], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0.2, 0.3], [30, 0]);

  const combinedOpacity = useTransform(scrollYProgress, (latest) => {
    // Show content with minimal scrolling
    if (latest < 0.15) return 0;
    if (latest > 0.8) return 0;
    if (latest >= 0.15 && latest <= 0.8) {
      return 1;
    }
    return 0;
  });

  const displayStyle = useTransform(scrollYProgress, (latest) => {
    // Ensure display triggers earlier
    if (latest > 0.85 || latest < 0.1) return 'none';
    return 'flex';
  });

  // UNROLLED grid transform hooks for first row (3 items)
  const firstRowTrans0 = {
    opacity: useTransform(firstRowAnimProgress, [0, 0.1], [0, 1]),
    x: useTransform(firstRowAnimProgress, [0, 0.1], [-20, 0]),
    filter: useTransform(firstRowAnimProgress, [0, 0.1], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(firstRowAnimProgress, [0, 0.1], [0.9, 1]),
  };
  const firstRowTrans1 = {
    opacity: useTransform(firstRowAnimProgress, [0.1, 0.2], [0, 1]),
    x: useTransform(firstRowAnimProgress, [0.1, 0.2], [-20, 0]),
    filter: useTransform(firstRowAnimProgress, [0.1, 0.2], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(firstRowAnimProgress, [0.1, 0.2], [0.9, 1]),
  };
  const firstRowTrans2 = {
    opacity: useTransform(firstRowAnimProgress, [0.2, 0.3], [0, 1]),
    x: useTransform(firstRowAnimProgress, [0.2, 0.3], [-20, 0]),
    filter: useTransform(firstRowAnimProgress, [0.2, 0.3], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(firstRowAnimProgress, [0.2, 0.3], [0.9, 1]),
  };
  const firstRowTransforms = [firstRowTrans0, firstRowTrans1, firstRowTrans2];

  // UNROLLED grid transform hooks for second row (4 items for desktop)
  const secondRowTrans0 = {
    opacity: useTransform(secondRowAnimProgress, [0, 0.2], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0, 0.2], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0, 0.2], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0, 0.2], [0.9, 1]),
  };
  const secondRowTrans1 = {
    opacity: useTransform(secondRowAnimProgress, [0.2, 0.4], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0.2, 0.4], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0.2, 0.4], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0.2, 0.4], [0.9, 1]),
  };
  const secondRowTrans2 = {
    opacity: useTransform(secondRowAnimProgress, [0.4, 0.6], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0.4, 0.6], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0.4, 0.6], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0.4, 0.6], [0.9, 1]),
  };
  const secondRowTrans3 = {
    opacity: useTransform(secondRowAnimProgress, [0.6, 0.8], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0.6, 0.8], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0.6, 0.8], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0.6, 0.8], [0.9, 1]),
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
    <div ref={containerRef} className="relative -top-10 z-0 min-h-[180vh] w-full">
      {/* Dotted background using design system colors */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {/* Gradient base layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-medium-blue)]/5 via-transparent to-[var(--primary-gold)]/5"></div>

        {/* Primary dots layer with design system colors */}
        <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-medium-blue)_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>

        {/* Secondary dots layer with accent color */}
        <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-gold)_1px,transparent_1px)] [background-size:22px_22px]"></div>

        {/* Radial gradient overlay with reduced opacity */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-[var(--neutral-50)]/30"></div>
      </div>

      {/* Interactive dots layer that fades with scroll */}
      <motion.div
        className="absolute inset-0 z-10 [background-image:radial-gradient(var(--primary-light-blue)_2px,transparent_2px)] [background-size:20px_20px] dark:[background-image:radial-gradient(var(--accent-purple)_1.8px,transparent_1.8px)]"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.1, 0.5, 0.7], [0.6, 0.4, 0.2, 0]),
        }}
      />

      <motion.section
        ref={sliderRef}
        style={{
          opacity: combinedOpacity,
          display: displayStyle,
          pointerEvents: 'none',
        }}
        className="fixed top-[30vh] left-0 z-20 h-auto w-full items-center justify-center to-transparent transition-all duration-500 dark:from-[var(--neutral-50)]/80 dark:via-[var(--neutral-50)]/30 dark:to-transparent"
      >
        <motion.div
          ref={textRef}
          style={{ scale, y }}
          className="container flex h-full w-full flex-col items-center justify-normal"
        >
          <div className="">
            <TextGenerateEffect
              words={words}
              html={true}
              duration={0.5}
              className="flex w-full items-center justify-center font-bold text-nowrap"
              animate={true}
              scrollProgress={wordProgress}
            />
          </div>

          {/* Mobile and tablet grid (2 columns) - show only 6 logos */}
          <div className="mt-12 mb-24 grid w-full grid-cols-2 items-center justify-center gap-8 px-4 md:hidden">
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
      <div className="h-[220vh] w-full"></div>
    </div>
  );
};

export default Slider;
