import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { Timeline } from '../ui/timeline';
import { CodeBlockDemo } from './VsCode';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getVideoUrlWithFallback } from '@/lib/spaces';

export function TimelineDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const videoElements = [videoRef.current, videoRef2.current];

    videoElements.forEach((video) => {
      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.preload = 'metadata';
        requestAnimationFrame(() => {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log('Autoplay was prevented:', error);
            });
          }
        });
      }
    });

    return () => {
      videoElements.forEach((video) => {
        if (video && !video.paused) {
          video.pause();
        }
      });
    };
  }, []);

  const firstItemProgress = useTransform(scrollYProgress, [0.05, 0.25], [0, 1], { clamp: false });
  const secondItemProgress = useTransform(scrollYProgress, [0.3, 0.5], [0, 1], { clamp: false });
  const thirdItemProgress = useTransform(scrollYProgress, [0.25, 0.65], [0, 1], { clamp: false });

  const data = [
    {
      title: 'Anti-cheat Monitor',
      content: (
        <div>
          <motion.p
            transition={{
              duration: 0.05,
              ease: 'linear',
              type: 'tween',
            }}
            style={{
              opacity: firstItemProgress,
              y: useTransform(firstItemProgress, [0, 1], [20, 0], { clamp: false }),
              willChange: 'opacity, transform',
            }}
            className="mb-8 text-xs font-normal text-[var(--primary-dark-blue)] md:text-lg dark:text-neutral-200"
          >
            🔍 Beyond our elite tech candidate pool, we rigorously screen every applicant with our
            advanced Anti-cheat monitor, ensuring integrity and authenticity in your hiring process.
          </motion.p>
          <motion.div
            transition={{
              duration: 0.05,
              ease: 'linear',
            }}
            style={{
              opacity: firstItemProgress,
              scale: useTransform(firstItemProgress, [0, 1], [0.95, 1], { clamp: false }),
              filter: useTransform(
                firstItemProgress,
                [0, 0.5, 1],
                ['blur(4px)', 'blur(1px)', 'blur(0px)'],
              ),
              willChange: 'opacity, transform, filter',
            }}
            className="flex h-full w-full gap-4"
          >
            <Image
              src="/anti-cheat.png"
              alt="startup template"
              width={700}
              height={700}
              className="h-full w-full rounded-lg border-1 border-zinc-300 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              loading="eager"
              priority
            />
          </motion.div>
        </div>
      ),
    },
    {
      title: 'Review live coding',
      content: (
        <div>
          <motion.p
            transition={{
              duration: 0.05,
              ease: 'linear',
            }}
            style={{
              opacity: secondItemProgress,
              y: useTransform(secondItemProgress, [0, 1], [10, 0], { clamp: false }),
              willChange: 'opacity, transform',
            }}
            className="mt-4 mb-12 text-xs font-normal text-[var(--primary-dark-blue)] md:text-lg dark:text-neutral-200"
          >
            💻 Watch candidates code in real-time! We meticulously track every line of code,
            providing you with deep insights into their problem-solving abilities and coding style.
          </motion.p>
          <motion.div
            transition={{
              duration: 0.05,
              ease: 'linear',
            }}
            style={{
              opacity: secondItemProgress,
              scale: useTransform(secondItemProgress, [0, 1], [0.95, 1], { clamp: false }),
              filter: useTransform(
                secondItemProgress,
                [0, 0.5, 1],
                ['blur(3px)', 'blur(1px)', 'blur(0px)'],
              ),
              willChange: 'opacity, transform, filter',
            }}
            className="flex h-full w-full flex-col-reverse gap-4 md:gap-12"
          >
            <div className="w-full max-w-full overflow-hidden">
              <CodeBlockDemo scrollProgress={secondItemProgress} />
            </div>
            <video
              ref={videoRef}
              className="h-full w-full rounded-2xl border-1 border-zinc-300 object-cover object-top shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              src={getVideoUrlWithFallback('antiCheat')}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              controls={false}
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      ),
    },
    {
      title: 'Review, message, reject',
      content: (
        <div>
          <motion.p
            transition={{
              duration: 0.05,
              ease: 'linear',
            }}
            style={{
              opacity: thirdItemProgress,
              y: useTransform(thirdItemProgress, [0, 1], [20, 0], { clamp: false }),
              willChange: 'opacity, transform',
            }}
            className="mb-4 text-xs font-normal text-[var(--primary-dark-blue)] md:mb-8 md:text-lg dark:text-neutral-200"
          >
            ✅ Streamline your hiring workflow with our automated candidate management system. Boost
            response rates and save time with one-click reviews, personalized messaging, and
            professional rejections.
          </motion.p>
          <motion.div
            transition={{
              duration: 0.01,
              ease: 'linear',
            }}
            style={{
              opacity: thirdItemProgress,
              scale: useTransform(thirdItemProgress, [0, 1], [0.95, 1], { clamp: false }),
              filter: useTransform(
                thirdItemProgress,
                [0, 0.5, 1],
                ['blur(4px)', 'blur(1px)', 'blur(0px)'],
              ),
              willChange: 'opacity, transform, filter',
            }}
            className="flex h-full w-full flex-col-reverse gap-4 md:gap-8"
          >
            <video
              ref={videoRef2}
              className="h-full w-full rounded-2xl border-1 border-zinc-300 object-cover object-top shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              src={getVideoUrlWithFallback('review')}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              controls={false}
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="relative z-20 h-full w-full" id="timeline">
      <Timeline data={data} />
    </div>
  );
}
