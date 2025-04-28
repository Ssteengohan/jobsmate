'use client';

import React, { useRef, useEffect } from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import useLenis from '@/themes/lib/lenis';

const words = `<span class="bg-gradient-to-r from-[var(--primary-light-blue)] via-[var(--primary-medium-blue)] to-[var(--primary-dark-blue)] bg-clip-text text-transparent">Integration with</span> <span class="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-gold)]/80 bg-clip-text text-transparent font-bold">15+ ATS</span>`;

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
      mouseX = (e.clientX - bounds.left) / bounds.width - 0.5;
      mouseY = (e.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(image, {
        rotationY: mouseX * 20,
        rotationX: -mouseY * 20,
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

    image.addEventListener('mousemove', mouseMove);
    image.addEventListener('mouseleave', mouseLeave);

    return () => {
      image.removeEventListener('mousemove', mouseMove);
      image.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  return (
    <div className="relative" style={{ perspective: '1200px' }}>
      <div ref={imageRef} className="h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
        <Image
          src={src}
          alt={alt}
          width={210}
          height={210}
          className="w-full object-contain"
          style={{ width: 'auto', height: 'auto' }}
          sizes="(max-width: 768px) 100vw, 210px"
        />
      </div>
    </div>
  );
};

const Slider = () => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis.current) return;

    const lenisInstance = lenis.current;

    const updateScrollValues = () => {
      if (containerRef.current && lenisInstance) {
      }
    };

    lenisInstance.on('scroll', updateScrollValues);

    return () => {
      lenisInstance?.off('scroll', updateScrollValues);
    };
  }, [lenis]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const wordProgress = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  const firstRowAnimProgress = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

  const secondRowAnimProgress = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);

  const scale = useTransform(scrollYProgress, [0.25, 0.35], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0.25, 0.35], [30, 0]);

  const combinedOpacity = useTransform(scrollYProgress, (latest) => {
    if (latest < 0.2 || latest > 1) return 0;
    return 1;
  });

  const displayStyle = useTransform(scrollYProgress, (latest) => {
    if (latest < 0.15 || latest > 1) return 'none';
    return 'flex';
  });

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

  const mobileSecondRowTransforms = [secondRowTrans0, secondRowTrans1, secondRowTrans2];
  const desktopSecondRowTransforms = [
    secondRowTrans0,
    secondRowTrans1,
    secondRowTrans2,
    secondRowTrans3,
  ];

  return (
    <div ref={containerRef} className="relative -top-0 -z-50 min-h-[90vh] w-full">
      <div className="absolute inset-0 -z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-medium-blue)]/5 via-transparent to-[var(--primary-gold)]/5"></div>
        <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-medium-blue)_0.8px,transparent_0.8px)] [background-size:14px_14px]"></div>
        <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-gold)_0.8px,transparent_0.8px)] [background-size:18px_18px]"></div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-[var(--neutral-50)]/30"></div>
      </div>

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

          <div className="mt-0 mb-24 grid w-full grid-cols-2 items-center justify-center gap-8 px-4 md:hidden dark:invert">
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

          <div className="hidden md:block">
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

      <div className="h-[250vh] w-full sm:h-[200vh]"></div>
    </div>
  );
};

export default Slider;
