import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { Timeline } from '../ui/timeline';
import { CodeBlockDemo } from './VsCode';
import { motion, useScroll, useTransform } from 'framer-motion';

export function TimelineDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    // Attempt to play the videos after component mounts
    const videoElements = [videoRef.current, videoRef2.current];

    videoElements.forEach((video) => {
      if (video) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('Autoplay was prevented:', error);
          });
        }
      }
    });
  }, []);

  // Create scroll-triggered animation progress values with wider ranges for slower transitions
  const firstItemProgress = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const secondItemProgress = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const thirdItemProgress = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  const data = [
    {
      title: 'Anti-cheat Monitor',
      content: (
        <div>
          <motion.p
            style={{
              opacity: firstItemProgress,
              y: useTransform(firstItemProgress, [0, 1], [30, 0]), // More dramatic movement
            }}
            className="mb-8 text-xs font-normal text-neutral-800 md:text-lg dark:text-neutral-200"
          >
            🔍 Beyond our elite tech candidate pool, we rigorously screen every applicant with our
            advanced Anti-cheat monitor, ensuring integrity and authenticity in your hiring process.
          </motion.p>
          <motion.div
            style={{
              opacity: firstItemProgress,
              scale: useTransform(firstItemProgress, [0, 1], [0.92, 1]), // More dramatic scaling
              filter: useTransform(
                firstItemProgress,
                [0, 0.4, 1], // Three-point transition for slower blur effect
                ['blur(15px)', 'blur(8px)', 'blur(0px)'], // More pronounced initial blur
              ),
            }}
            className="flex h-full w-full gap-4"
          >
            <Image
              src="/anti-cheat.png"
              alt="startup template"
              width={700}
              height={700}
              className="h-full w-full rounded-lg shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
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
            style={{
              opacity: secondItemProgress,
              y: useTransform(secondItemProgress, [0, 1], [10, 0]), // More dramatic movement
            }}
            className="mt-4 mb-12 text-xs font-normal text-neutral-800 md:text-lg dark:text-neutral-200"
          >
            💻 Watch candidates code in real-time! We meticulously track every line of code,
            providing you with deep insights into their problem-solving abilities and coding style.
          </motion.p>
          <motion.div
            style={{
              opacity: secondItemProgress,
              scale: useTransform(secondItemProgress, [0, 1], [0.5, 1]), // More dramatic scaling
              filter: useTransform(
                secondItemProgress,
                [0, 0.8, 1], // Three-point transition for slower blur effect
                ['blur(4px)', 'blur(1px)', 'blur(0px)'], // More pronounced initial blur
              ),
            }}
            className="flex h-full w-full flex-col-reverse gap-4 md:gap-8"
          >
            <video
              ref={videoRef}
              className="h-full w-full rounded-2xl object-cover object-top"
              src="/anti-cheat.mp4"
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
              controls={false}
            >
              Your browser does not support the video tag.
            </video>
            <CodeBlockDemo />
          </motion.div>
        </div>
      ),
    },
    {
      title: 'Review, message, reject',
      content: (
        <div>
          <motion.p
            style={{
              opacity: thirdItemProgress,
              y: useTransform(thirdItemProgress, [0, 1], [30, 0]), // More dramatic movement
            }}
            className="mb-4 text-xs font-normal text-neutral-800 md:text-lg dark:text-neutral-200"
          >
            ✅ Streamline your hiring workflow with our automated candidate management system. Boost
            response rates and save time with one-click reviews, personalized messaging, and
            professional rejections.
          </motion.p>
          <motion.div
            style={{
              opacity: thirdItemProgress,
              scale: useTransform(thirdItemProgress, [0, 0.92], [1, 1]), // More dramatic scaling
              filter: useTransform(
                thirdItemProgress,
                [0, 0.1, 1], // Three-point transition for slower blur effect
                ['blur(4px)', 'blur(2px)', 'blur(0px)'], // More pronounced initial blur
              ),
            }}
            className="flex h-full w-full flex-col-reverse gap-4 md:gap-8"
          >
            <video
              ref={videoRef2}
              className="h-full w-full rounded-2xl object-cover object-top"
              src="/review.mp4"
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
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
    <div ref={containerRef} className="relative h-full z-20 w-full">
      <Timeline data={data} />
    </div>
  );
}
