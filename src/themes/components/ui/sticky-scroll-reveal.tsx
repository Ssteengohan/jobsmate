'use client';
import React, { useRef, useMemo } from 'react';
import { useMotionValueEvent, useScroll, useTransform, motion } from 'motion/react';
import { cn } from '../../lib/utils';

export const StickyScroll = ({
  content,
  contentClassName,
  onActiveCardChange,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  onActiveCardChange?: (index: number) => void;
}) => {
  const [activeCard, setActiveCard] = React.useState(0); // Ensure the first post is shown initially
  const sectionRef = useRef<HTMLDivElement>(null);

  // Calculate appropriate height based on content length
  const sectionHeight = useMemo(() => `${content.length * 100}vh`, [content.length]);

  // Use the main page scroll instead of container scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const cardLength = content.length;

  // Updated transform mappings - now at the bottom scroll, the content remains visible.
  const opacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.05, 1], [0.92, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.05, 1], [20, 0, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Divide the scroll range evenly among cards
    const cardProgressSegment = 1 / cardLength;
    // Calculate which card should be active based on scroll progress
    const activeIndex = Math.min(Math.floor(latest / cardProgressSegment), cardLength - 1);

    // Only update if the active card has changed
    if (activeIndex !== activeCard) {
      setActiveCard(activeIndex);

      // Trigger loading animation when the second card is active
      if (activeIndex === 1) {
        console.log('Trigger loading animation'); // Replace with actual loading animation logic
      }

      // Call the callback if provided
      if (onActiveCardChange) {
        onActiveCardChange(activeIndex);
      }
    }
  });

  // Updated gradients with three distinct stops, inspired by the HeroBanner title gradient

  // Enhanced gradient backgrounds that are more visible in dark mode

  return (
    <motion.section
      ref={sectionRef}
      style={{ height: sectionHeight }}
      className="relative w-full overflow-hidden transition-colors duration-300"
    >
      {/* Community message banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute top-0 sm:top-[15vh] right-0 left-0 z-5 py-3 text-center text-lg font-medium dark:from-white/5 dark:via-white/10 dark:to-white/5 dark:text-white/90"
      >
        <h3 className="bg-gradient-to-r from-[var(--primary-light-blue)] via-[var(--primary-medium-blue)] to-[var(--primary-gold)] bg-clip-text text-4xl lg:text-7xl font-bold text-transparent drop-shadow-[0_0_5px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_8px_rgba(42,151,219,0.3)]">
          We care about our
          <br />{' '}
          <motion.span
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="relative inline-block text-[var(--primary-gold)] dark:text-[var(--primary-gold)]"
          >
            Tech community
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[var(--primary-gold)]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
            />
            …
          </motion.span>
        </h3>
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-2 inline-block font-medium text-neutral-600 italic dark:text-white/70 pt-2 sm:pt-0" 
        >
          Not just a data-bank or recruitment agency.
        </motion.span>
      </motion.div>

      {/* Gradient background that changes with each card - using subtle colors instead of opacity */}
      <motion.div
        className="absolute inset-0 z-0 transition-all duration-700"
        animate={{
          background: [
            `linear-gradient(145deg, #fcfdff 100%, #f0f8fe 100%, #e8f4fc 100%)`,
            `linear-gradient(145deg, #fdfcff 100%, #f8f0ff 100%, #f2eafb 100%)`,
            `linear-gradient(145deg, #fffdf8 100%, #fcf9f0 100%, #faf6e8 100%)`,
            `linear-gradient(145deg, #f4fdfb 100%, #f0fbfa 100%, #e8f8f6 100%)`,
          ][activeCard],
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Dark mode gradient overlay */}
      <motion.div
        className="absolute inset-0 z-0 hidden transition-all duration-700 dark:block"
        animate={{
          background: [
            `linear-gradient(145deg, var(--primary-dark) 0%, var(--primary-medium-blue) 50%, var(--primary-light-blue) 100%)`,
            `linear-gradient(145deg, var(--primary-dark-blue) 0%, var(--accent-purple) 100%, var(--accent-rose) 100%)`,
            `linear-gradient(145deg, var(--primary-dark) 0%, var(--primary-dark-blue) 70%, var(--primary-gold) 100%)`,
            `linear-gradient(145deg, var(--accent-teal) 0%, var(--primary-medium-blue) 50%, var(--primary-light-blue) 100%)`,
          ][activeCard],
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Subtle overlay with very light colors rather than white opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fafbfd]/10 via-[#f9f9f9] to-[var(--primary-gold)]/5 backdrop-blur-[1px] dark:bg-gradient-to-b dark:from-transparent dark:via-black/30 dark:to-black/60 dark:backdrop-blur-sm" />

      {/* Abstract subtle pattern for light mode with color tints from variables */}
      <div className="absolute inset-0 mix-blend-soft-light dark:opacity-20 dark:mix-blend-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#e8f4fc,transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_20%,var(--spotlight-blue),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,#faf6e8,transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_60%,var(--spotlight-gold),transparent_30%)]" />
      </div>

      {/* Extremely subtle grain texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-[0.015] mix-blend-multiply dark:opacity-[0.03] dark:mix-blend-soft-light" />

      {/* Main content container */}
      <motion.div
        style={{ opacity, scale, y }}
        className="fixed top-0 left-0 flex h-screen w-full flex-col items-center justify-center px-4 md:px-10"
      >
        {/* Text content needs different text colors for light/dark mode */}
        <div className="container mx-auto flex h-full max-w-7xl flex-col items-center justify-center md:flex-row md:items-center">
          <div className="relative flex w-full flex-col items-center justify-center md:w-1/2 md:pr-12">
            <div className="relative h-[250px] w-full max-w-xl md:h-[300px]">
              {content.map((item, index) => (
                <motion.div
                  key={item.title + index}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center md:items-start md:justify-center md:text-left"
                  initial={{
                    opacity: 1, // Ensure the first post is already visible
                    filter: index === 0 ? 'blur(0px)' : 'blur(4px)',
                    scale: index === 0 ? 1 : 0.98,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0,
                    filter: activeCard === index ? 'blur(0px)' : 'blur(4px)',
                    scale: activeCard === index ? 1 : 0.98,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <h2 className="mb-6 text-3xl font-bold text-neutral-800 md:text-5xl dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-lg text-neutral-600 md:text-xl dark:text-white/80">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image column with hover effects and better transitions */}
          <div className="relative mt-10 h-[300px] w-full overflow-visible md:mt-0 md:h-[550px] md:w-5/12">
            {content.map((item, index) => (
              <motion.div
                key={`content-${index}`}
                className={cn(
                  'absolute inset-0 overflow-hidden rounded-xl shadow-xl transition-transform dark:border dark:border-white/10',
                  'dark:hover:shadow-primary-light-blue/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30',
                  contentClassName,
                )}
                initial={{
                  opacity: index === 0 ? 1 : 0,
                  scale: index === 0 ? 1 : 0.9,
                  y: index === 0 ? 0 : 30,
                  rotateX: index === 0 ? 0 : -10,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  scale: activeCard === index ? 1 : 0.9,
                  y: activeCard === index ? 0 : 30,
                  rotateX: activeCard === index ? 0 : -10,
                  pointerEvents: activeCard === index ? 'auto' : 'none',
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.02,
                  rotateX: 2,
                  rotateY: 2,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                }}
              >
                {item.content ?? null}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
