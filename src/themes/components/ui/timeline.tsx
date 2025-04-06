'use client';
import { useScroll, useTransform, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.4', 'end 0.9'], // Adjusted for better timing
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 0.11, 0.9, 1], // Add more control points
    [0, height * 0.1, height * 0.9, height], // Matching scroll positions to height
  );

  // Smooth opacity transition
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0.8]);

  return (
    <div
      className="w-full bg-white font-sans transition-colors duration-300 md:px-10 dark:bg-[var(--neutral-50)]"
      ref={containerRef}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-10">
        <h2 className="mb-4 max-w-4xl text-lg font-bold transition-colors duration-300 md:text-4xl">
          <span className="text-[var(--primary-dark-blue)] dark:text-[var(--primary-white)]">
            A Tech Platform{' '}
          </span>
          <span className="bg-gradient-to-r from-[var(--primary-light-blue)] via-[var(--primary-medium-blue)] to-[var(--primary-gold)] bg-clip-text text-transparent">
            Created to Safe Time
          </span>
        </h2>
        <p className="max-w-lg text-sm text-neutral-700 transition-colors duration-300 md:text-base dark:text-neutral-300">
          Jobsmate seamlessly connects with your ATS (Applicant Tracking System) to streamline your
          hiring workflow. Whether you&apos;re harvesting candidate data or posting new jobs, we
          ensure you only spend time on what matters most: interviewing the right candidates.
        </p>
      </div>

      <div ref={ref} className="relative flex flex-col mx-auto max-w-7xl  pb-20">
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
          }}
          className="absolute top-0 left-8 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[var(--neutral-200)] to-transparent to-[99%] transition-colors duration-300 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8 dark:via-[var(--neutral-200)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[var(--primary-gold)] from-[0%] via-[var(--primary-light-blue)] via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
