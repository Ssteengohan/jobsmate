import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    // Reset progress and animation when the component mounts
    setProgress(0);
    controls.set({ strokeDashoffset: 565.49 });

    // Start the animation
    controls.start({
      strokeDashoffset: 565.49 * 0.28, // 72% filled
      transition: { duration: 2, ease: 'easeInOut' },
    });

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds
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
      <div className="relative flex h-60 w-60 items-center justify-center rounded-full bg-[#02253b]">
        <div className="relative flex h-60 w-60 items-center justify-center rounded-full">
          {/* Background circle (non-animated) */}
          <svg className="absolute h-60 w-60">
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

          {/* SVG for circular progress */}
          <motion.svg className="absolute h-60 w-60">
            <motion.circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke="#ffc22c"
              strokeWidth="60"
              strokeLinecap="round"
              transform="rotate(-90 120 120)"
              strokeDasharray="565.49" // 2 * PI * r (90)
              initial={{ strokeDashoffset: 565.49 }}
              animate={controls}
            />
          </motion.svg>
          <span className="z-20 flex h-40 w-40 items-center justify-center rounded-full bg-[#f9f9f9] text-xl font-semibold text-[#0a0a0a]">
            {progress}%
          </span>
        </div>
      </div>
    </section>
  );
};

export default Loading;
