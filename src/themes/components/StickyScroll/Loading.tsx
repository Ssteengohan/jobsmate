'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    setProgress(0);
    controls.set({ strokeDashoffset: 565.49 });

    controls.start({
      strokeDashoffset: 565.49 * 0.28,
      transition: { duration: 2, ease: 'easeInOut' },
    });

    let startTime: number | null = null;
    const duration = 2000;
    const targetProgress = 72;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(
        Math.floor((elapsed / duration) * targetProgress),
        targetProgress,
      );

      setProgress(newProgress);

      if (newProgress < targetProgress) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [controls]);

  return (
    <section className="relative z-20 flex h-full w-full items-center justify-center">
      <div className="relative flex aspect-square w-full max-w-[160px] items-center justify-center rounded-full bg-[#02253b] sm:max-w-[15rem] md:max-w-[240px]">
        <div className="relative flex h-full w-full items-center justify-center rounded-full">
          <svg className="absolute h-full w-full" viewBox="0 0 240 240">
            <circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              strokeWidth="30"
              strokeLinecap="round"
              transform="rotate(-90 120 120)"
            />
          </svg>
          <motion.svg className="absolute h-full w-full" viewBox="0 0 240 240">
            <motion.circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke="#ffc22c"
              strokeWidth="60"
              strokeLinecap="round"
              transform="rotate(-90 120 120)"
              strokeDasharray="565.49"
              initial={{ strokeDashoffset: 565.49 }}
              animate={controls}
            />
          </motion.svg>
          <span className="z-20 flex aspect-square h-2/3 w-2/3 items-center justify-center rounded-full bg-[#f9f9f9] text-base font-semibold text-[#0a0a0a] sm:text-lg md:text-xl">
            {progress}%
          </span>
        </div>
      </div>
    </section>
  );
};

export default Loading;
