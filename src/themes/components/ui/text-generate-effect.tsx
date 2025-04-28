'use client';
import { useEffect, useCallback, useState, useRef, ElementType } from 'react';
import { motion, stagger, useAnimate, MotionValue } from 'motion/react';
import { cn } from '../../lib/utils';

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  html = false,
  animate = true,
  scrollProgress,
  tag = 'div',
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  html?: boolean;
  animate?: boolean;
  scrollProgress?: MotionValue<number>;
  tag?: ElementType;
}) => {
  const [scope, animateFunc] = useAnimate();
  const [isReady, setIsReady] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementsRef = useRef<NodeListOf<Element> | null>(null);
  const wordsArray = words.split(' ');

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || !animate || !scrollProgress) return;

    if (html && scope.current) {
      elementsRef.current = scope.current.querySelectorAll('.text-word');
    }

    const unsubscribe = scrollProgress.on('change', (progress) => {
      if (!elementsRef.current) return;

      const totalWords = elementsRef.current.length;
      const spreadFactor = 2.5;
      const adjustedProgress = Math.pow(progress, spreadFactor);
      const visibleWordCount = Math.ceil(adjustedProgress * totalWords);

      elementsRef.current.forEach((element, index) => {
        if (index < visibleWordCount) {
          (element as HTMLElement).style.opacity = '1';
          (element as HTMLElement).style.filter = filter ? 'blur(0px)' : 'none';
          (element as HTMLElement).style.transform = 'translateY(0)';
        } else {
          (element as HTMLElement).style.opacity = '0';
          (element as HTMLElement).style.filter = filter ? 'blur(4px)' : 'none';
          (element as HTMLElement).style.transform = 'translateY(10px)';
        }
      });
    });

    return () => unsubscribe();
  }, [isReady, animate, scrollProgress, filter, html, scope]);

  const startAnimation = useCallback(() => {
    if (!isReady || !animate || hasAnimated || scrollProgress) return;

    setTimeout(() => {
      try {
        if (html) {
          if (scope.current) {
            scope.current.style.opacity = '1';
          }

          const elements = scope.current?.querySelectorAll('.text-word');
          elementsRef.current = elements;

          if (elements?.length > 0) {
            animateFunc(
              elements,
              {
                opacity: 1,
                filter: filter ? 'blur(0px)' : 'none',
                transform: 'translateY(0)',
              },
              {
                duration: duration || 1,
                delay: stagger(0.2),
              },
            );
            setHasAnimated(true);
          }
        } else {
          animateFunc(
            'span',
            {
              opacity: 1,
              filter: filter ? 'blur(0px)' : 'none',
            },
            {
              duration: duration || 1,
              delay: stagger(0.2),
            },
          );
          setHasAnimated(true);
        }
      } catch (error) {
        console.error('Animation error:', error);
      }
    }, 100);
  }, [animateFunc, duration, filter, html, scope, isReady, animate, hasAnimated, scrollProgress]);

  useEffect(() => {
    if (isReady && animate && !scrollProgress) {
      startAnimation();
    }

    if (!animate) {
      setHasAnimated(false);
    }
  }, [isReady, animate, startAnimation, scrollProgress]);

  const renderHTML = () => {
    const Tag = tag;

    return (
      <Tag ref={scope} className="text-[#05253c] dark:text-white" style={{ opacity: 1 }}>
        <span
          className="text-word"
          style={{
            opacity: 0,
            transition: 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease',
            transform: 'translateY(10px)',
          }}
        >
          Integration
        </span>{' '}
        <span
          className="text-word"
          style={{
            opacity: 0,
            transition: 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease',
            transform: 'translateY(10px)',
          }}
        >
          with
        </span>{' '}
        <span
          className="text-word text-[var(--primary-gold)]"
          style={{
            opacity: 0,
            transition: 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease',
            transform: 'translateY(10px)',
          }}
        >
          15+
        </span>{' '}
        <span
          className="text-word text-[var(--primary-gold)]"
          style={{
            opacity: 0,
            transition: 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease',
            transform: 'translateY(10px)',
          }}
        >
          ATS
        </span>
      </Tag>
    );
  };

  const renderWords = () => {
    if (html) {
      return renderHTML();
    }

    return (
      <motion.div ref={scope}>
        {wordsArray.map((word: string, idx: number) => {
          return (
            <motion.span
              key={word + idx}
              className="text-black opacity-0 dark:text-white"
              style={{
                filter: filter ? 'blur(10px)' : 'none',
              }}
            >
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn('', className)}>
      <div className="mt-4">
        <div className="text-4xl leading-snug tracking-wide text-black md:text-5xl 2xl:text-7xl dark:text-white">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
