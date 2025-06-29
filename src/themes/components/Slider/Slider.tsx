'use client';

import React, { useRef, useEffect, useState } from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { useLenis } from '@/themes/lib/lenis';
import { client } from '@/sanity/lib/client';
import { SLIDER_SECTION_QUERY } from '@/sanity/lib/queries';

interface SliderLogo {
  image: {
    asset: {
      _id: string;
      url: string;
    } | null;
    alt?: string;
  } | null;
  alt: string;
  companyName: string;
  order: number;
  isVisible: boolean;
}

interface SliderSectionData {
  _id: string;
  title?: string;
  headingText: string;
  headingPrefix: string;
  highlightText: string;
  logos: SliderLogo[];
  animationSettings: {
    enableAnimations: boolean;
    animationDuration: number;
    enableTiltEffect: boolean;
  };
  backgroundSettings: {
    showBackground: boolean;
    backgroundOpacity: number;
  };
  isEnabled: boolean;
}

interface SliderProps {
  initialData?: SliderSectionData | null;
}

const TiltLogo = ({
  src,
  alt,
  enableTilt = true,
}: {
  src: string;
  alt: string;
  enableTilt?: boolean;
}) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !enableTilt) return;

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
  }, [enableTilt]);

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

const Slider = ({ initialData }: SliderProps) => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [sliderData, setSliderData] = useState<SliderSectionData | null>(initialData || null);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  const lenis = useLenis();

  // Real-time data fetching with aggressive polling for instant updates
  useEffect(() => {
    let isActive = true;

    const fetchSliderData = async () => {
      if (!isActive) return;

      try {
        const data = await client.fetch(
          SLIDER_SECTION_QUERY,
          { _timestamp: Date.now() }, // Cache busting parameter
          {
            cache: 'no-store',
            next: { revalidate: 0 },
          },
        );

        console.log('🔄 Real-time fetched slider data:', data);
        console.log(
          '📝 Generated heading:',
          data?.title || data?.headingText || 'Integration with 15+ ATS',
        );

        if (isActive) {
          if (!data) {
            setError('No slider data found. Using default configuration.');
            // Set fallback data to show something
            setSliderData({
              _id: 'fallback',
              title: 'Integration with 15+ ATS',
              headingText: 'Integration with 15+ ATS',
              headingPrefix: 'Integration with',
              highlightText: '15+ ATS',
              logos: [],
              animationSettings: {
                enableAnimations: true,
                animationDuration: 1000,
                enableTiltEffect: true,
              },
              backgroundSettings: {
                showBackground: true,
                backgroundOpacity: 0.5,
              },
              isEnabled: true,
            });
          } else {
            setSliderData(data);
            setError(null);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isActive) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(`Failed to load slider data: ${errorMessage}`);
          console.error('Slider fetch error:', err);
          setLoading(false);
        }
      }
    };

    // Initial fetch
    fetchSliderData();

    // Set up polling for real-time updates (every 1 second for super fast updates)
    const intervalId = setInterval(fetchSliderData, 1000);

    return () => {
      isActive = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []); // Only run once, polling handles updates

  // Only use Sanity data - no fallback defaults
  const data = sliderData;

  // All hooks must be called before any early returns
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

  const wordProgress = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const firstRowAnimProgress = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const secondRowAnimProgress = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.15, 0.28], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0.15, 0.28], [30, 0]);

  const combinedOpacity = useTransform(scrollYProgress, (latest) => {
    if (latest < 0.12 || latest > 1) return 0;
    return 1;
  });

  const displayStyle = useTransform(scrollYProgress, (latest) => {
    if (latest < 0.12 || latest > 1) return 'none';
    return 'flex';
  });

  // Additional useTransform for background opacity animation
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.7], [0.6, 0.4, 0.2, 0]);

  // Animation transforms - faster, compressed sequence
  const firstRowTrans0 = {
    opacity: useTransform(firstRowAnimProgress, [0, 0.4], [0, 1]),
    x: useTransform(firstRowAnimProgress, [0, 0.4], [-20, 0]),
    filter: useTransform(firstRowAnimProgress, [0, 0.4], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(firstRowAnimProgress, [0, 0.4], [0.9, 1]),
  };
  const firstRowTrans1 = {
    opacity: useTransform(firstRowAnimProgress, [0.3, 0.7], [0, 1]),
    x: useTransform(firstRowAnimProgress, [0.3, 0.7], [-20, 0]),
    filter: useTransform(firstRowAnimProgress, [0.3, 0.7], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(firstRowAnimProgress, [0.3, 0.7], [0.9, 1]),
  };
  const firstRowTrans2 = {
    opacity: useTransform(firstRowAnimProgress, [0.6, 1], [0, 1]),
    x: useTransform(firstRowAnimProgress, [0.6, 1], [-20, 0]),
    filter: useTransform(firstRowAnimProgress, [0.6, 1], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(firstRowAnimProgress, [0.6, 1], [0.9, 1]),
  };
  const firstRowTransforms = [firstRowTrans0, firstRowTrans1, firstRowTrans2];

  const secondRowTrans0 = {
    opacity: useTransform(secondRowAnimProgress, [0, 0.3], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0, 0.3], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0, 0.3], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0, 0.3], [0.9, 1]),
  };
  const secondRowTrans1 = {
    opacity: useTransform(secondRowAnimProgress, [0.25, 0.55], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0.25, 0.55], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0.25, 0.55], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0.25, 0.55], [0.9, 1]),
  };
  const secondRowTrans2 = {
    opacity: useTransform(secondRowAnimProgress, [0.5, 0.8], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0.5, 0.8], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0.5, 0.8], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0.5, 0.8], [0.9, 1]),
  };
  const secondRowTrans3 = {
    opacity: useTransform(secondRowAnimProgress, [0.75, 1], [0, 1]),
    x: useTransform(secondRowAnimProgress, [0.75, 1], [-20, 0]),
    filter: useTransform(secondRowAnimProgress, [0.75, 1], ['blur(8px)', 'blur(0px)']),
    scale: useTransform(secondRowAnimProgress, [0.75, 1], [0.9, 1]),
  };

  const mobileSecondRowTransforms = [secondRowTrans0, secondRowTrans1, secondRowTrans2];
  const desktopSecondRowTransforms = [
    secondRowTrans0,
    secondRowTrans1,
    secondRowTrans2,
    secondRowTrans3,
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="relative -top-0 -z-50 min-h-[90vh] w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="mb-4 h-8 w-64 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no data or disabled
  if (!data || (!data.isEnabled && sliderData)) {
    return null;
  }

  // Show error state (continue with defaults)
  if (error) {
    console.warn('Slider error:', error);
  }

  // Generate heading with styling
  const generateStyledHeading = () => {
    // Return the plain title from Sanity - let TextGenerateEffect handle highlighting
    const result = data.title || data.headingText || 'Integration with 15+ ATS';
    console.log('Generated heading:', result, 'from data:', {
      title: data.title,
      headingText: data.headingText,
    });
    return result;
  };

  const words = generateStyledHeading();

  const firstRow = (
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
  );

  const secondRow = (
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
  );

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
          opacity: backgroundOpacity,
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
          <div className="relative">
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
            {firstRow}
            {secondRow}
          </div>
        </motion.div>
      </motion.section>

      <div className="h-[220vh] w-full sm:h-[240vh]"></div>
    </div>
  );
};

export default Slider;
