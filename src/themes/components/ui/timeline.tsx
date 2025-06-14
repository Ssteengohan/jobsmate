'use client';
import { useScroll, useTransform, motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Balancer from 'react-wrap-balancer';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  highlightedTitle?: string;
  subtitle?: string;
}

export const Timeline = ({ data, title, highlightedTitle, subtitle }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const manualProgress = useMotionValue(0);

  const springyProgress = useSpring(manualProgress, {
    stiffness: isMobile ? 200 : 100,
    damping: isMobile ? 25 : 30,
    mass: isMobile ? 0.5 : 0.1,
    restSpeed: 0.01,
  });

  const handleResize = React.useCallback(() => {
    const mobileView = window.innerWidth < 768;
    setIsMobile(mobileView);

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMobile ? ref : containerRef,
    offset: isMobile ? ['start start', 'end end'] : ['start 10%', 'end 85%'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      manualProgress.set(latest);
    });

    return unsubscribe;
  }, [scrollYProgress, manualProgress]);

  useEffect(() => {
    handleResize();

    let resizeFrame: number;
    const smoothResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(handleResize);
    };

    window.addEventListener('resize', smoothResize);

    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener('resize', smoothResize);
    };
  }, [handleResize]);

  const heightTransform = useTransform(
    springyProgress,
    [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
    [
      0,
      isMobile ? height * 0.25 : height * 0.2,
      isMobile ? height * 0.45 : height * 0.35,
      isMobile ? height * 0.6 : height * 0.5,
      isMobile ? height * 0.75 : height * 0.65,
      isMobile ? height * 0.9 : height * 0.8,
      height,
    ],
  );

  const opacityTransform = useTransform(
    springyProgress,
    [0, 0.03, 0.2, 0.8, 0.97, 1],
    [0, 0.8, 1, 1, 0.8, 0],
  );

  return (
    <div
      className="w-full bg-white font-sans transition-colors duration-300 md:px-10 dark:bg-[var(--neutral-50)]"
      ref={containerRef}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-10">
        {(title || highlightedTitle) && (
          <h2 className="mb-4 max-w-4xl text-3xl font-bold transition-colors duration-300 md:text-5xl">
            <Balancer>
              {title && (
                <span className="text-[var(--primary-dark-blue)] dark:text-[var(--primary-white)]">
                  {title}
                  <br/>
                  {highlightedTitle ? ' ' : ''}
                </span>
              )}
              {highlightedTitle && (
                <span className="bg-gradient-to-r from-[var(--primary-light-blue)] via-[var(--primary-medium-blue)] to-[var(--primary-gold)] bg-clip-text text-transparent">
                  {highlightedTitle}
                </span>
              )}
            </Balancer>
          </h2>
        )}
        {subtitle && (
          <p className="max-w-lg text-sm text-neutral-700 transition-colors duration-300 md:text-base dark:text-neutral-300">
            {subtitle}
          </p>
        )}
      </div>

      <div ref={ref} className="relative mx-auto flex max-w-7xl flex-col pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-40">
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white transition-colors duration-300 md:left-3 dark:bg-[var(--neutral-50)]">
                <div className="h-4 w-4 rounded-full border border-[var(--primary-medium-blue)] bg-[var(--primary-light-blue)] p-2 transition-colors duration-300 dark:border-[var(--primary-medium-blue)] dark:bg-[var(--primary-light-blue)]" />
              </div>
              <h3 className="hidden text-xl font-bold text-[var(--primary-gold)] transition-colors duration-300 md:block md:pl-20 md:text-5xl dark:text-[var(--primary-gold)]">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pr-4 pl-20 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-[var(--primary-gold)] transition-colors duration-300 md:hidden dark:text-[var(--primary-gold)]">
                {item.title}
              </h3>
              {item.content}{' '}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + 'px',
            maxHeight: 'none',
          }}
          className="absolute top-0 left-8 w-[2px] overflow-visible bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[var(--neutral-200)] to-transparent to-[99%] transition-colors duration-300 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8 dark:via-[var(--neutral-200)]"
        >
          <motion.div
            transition={{
              duration: 0.01,
              ease: 'linear',
              type: 'tween',
            }}
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              maxHeight: '500%',
              willChange: 'transform, opacity',
              translateZ: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
            className="w-[2px] rounded-full bg-gradient-to-t from-[var(--primary-gold)] from-[0%] via-[var(--primary-light-blue)] via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
