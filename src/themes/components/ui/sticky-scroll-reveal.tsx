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
  const [activeCard, setActiveCard] = React.useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const sectionHeight = useMemo(() => `${content.length * 100}vh`, [content.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const cardLength = content.length;

  const opacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.05, 1], [0.92, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.05, 1], [20, 0, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardProgressSegment = 1 / cardLength;
    const activeIndex = Math.min(Math.floor(latest / cardProgressSegment), cardLength - 1);

    if (activeIndex !== activeCard) {
      setActiveCard(activeIndex);

      if (onActiveCardChange) {
        onActiveCardChange(activeIndex);
      }
    }
  });

  return (
    <motion.section
      ref={sectionRef}
      style={{ height: sectionHeight }}
      className="relative w-full overflow-hidden transition-colors duration-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute top-[1vh] right-0 left-0 z-5 py-3 text-center text-lg font-medium sm:top-[10vh] dark:from-white/5 dark:via-white/10 dark:to-white/5 dark:text-white/90"
      >
        <h3 className="bg-gradient-to-r from-[var(--primary-light-blue)] via-[var(--primary-medium-blue)] to-[var(--primary-gold)] bg-clip-text text-4xl font-bold text-transparent drop-shadow-[0_0_5px_rgba(0,0,0,0.1)] lg:text-6xl dark:drop-shadow-[0_0_8px_rgba(42,151,219,0.3)]">
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
          className="mt-2 inline-block pt-2 font-medium text-neutral-600 italic sm:pt-0 dark:text-white/70"
        >
          Not just a data-bank or recruitment agency.
        </motion.span>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-0 transition-all duration-700"
        animate={{
          background: [
            `linear-gradient(145deg, #f9ebd1 , #f9ebd1 , ##fbf7f0)`,
            `linear-gradient(145deg, ##fbf7f0, ##fbf7f0, #fbf7f0)`,
            `linear-gradient(145deg, #fbf7f0, #fbf7f0, #fbf7f0)`,
          ][activeCard],
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute inset-0 z-0 hidden transition-all duration-700 dark:block"
        animate={{
          background: [
            `linear-gradient(145deg, var(--primary-dark) 0%, var(--primary-dark-blue) 40%, var(--primary-medium-blue) 125%, var(--primary-gold) 100%)`,
            `linear-gradient(145deg, var(--primary-dark) 0%, var(--primary-dark-blue) 40%, var(--primary-medium-blue) 80%, var(--primary-light-blue) 100%)`,
            `linear-gradient(145deg, var(--primary-dark-blue) 0%, var(--primary-dark-blue) 30%, var(--primary-medium-blue) 60%, var(--primary-medium-blue) 100%)`,
          ][activeCard],
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-[#f9ebd1] to-[#faf3e5] backdrop-blur-[1px] dark:bg-gradient-to-b dark:from-transparent dark:via-black/30 dark:to-black/60 dark:backdrop-blur-sm" />

      <div className="absolute inset-0 mix-blend-soft-light dark:opacity-20 dark:mix-blend-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#e8f4fc,transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_20%,var(--spotlight-blue),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,#faf6e8,transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_60%,var(--spotlight-gold),transparent_30%)]" />
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-[0.015] mix-blend-multiply dark:opacity-[0.03] dark:mix-blend-soft-light" />

      <motion.div
        style={{ opacity, scale, y }}
        className="fixed top-0 left-0 flex h-screen w-full flex-col items-center justify-center px-4 md:px-10"
      >
        <div className="container mx-auto flex h-full max-w-7xl flex-col items-center justify-center md:flex-row md:items-center">
          <div className="relative flex w-full flex-col items-center justify-center md:w-1/2 md:pr-12">
            <div className="relative h-[250px] w-full max-w-xl md:h-[300px]">
              {content.map((item, index) => (
                <motion.div
                  key={item.title + index}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center md:items-start md:justify-center md:text-left"
                  initial={{
                    opacity: 1,
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
                  <h2 className="mb-6 text-3xl font-bold text-[var(--primary-dark-blue)] md:text-5xl dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-sm text-neutral-600 md:text-xl dark:text-white/80">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative mt-10 h-[200px] w-4/5 overflow-visible md:mt-0 md:h-[450px] md:w-4/12">
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
