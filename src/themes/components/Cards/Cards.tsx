import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const statsData = [
  { value: 10, label: 'Profiles', suffix: 'k+', format: true },
  { value: 120, label: 'Countries', suffix: '+', format: false },
  { value: 1000, label: 'Companies', suffix: '+', format: true },
  { value: 99.95, label: 'Uptime', suffix: '%', format: false },
];

const Cards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const statsRefs = useRef<Array<HTMLDivElement | null>>([]);
  const countRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [animationsPlayed, setAnimationsPlayed] = useState(false);
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  useEffect(() => {
    statsRefs.current = statsRefs.current.slice(0, 4);
    countRefs.current = countRefs.current.slice(0, 4);

    const ctx = gsap.context(() => {
      const counterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center bottom', 
          end: 'bottom top',
          toggleActions: 'play none none reset',
          once: false, 
          onEnter: () => setAnimationsPlayed(true),
        },
        defaults: {
          duration: 2.5,
          ease: 'power2.out',
        },
      });
      const counterObjects = statsData.map(() => ({ value: 0 }));
      statsData.forEach((stat, index) => {
        if (countRefs.current[index]) {
          const countElement = countRefs.current[index];
          const obj = counterObjects[index];

          counterTl.to(
            obj,
            {
              value: stat.value,
              onUpdate: function () {
                if (countElement) {
                  const currentValue = obj.value;
                  if (stat.format) {
                    countElement.textContent = formatNumber(Math.floor(currentValue)) + stat.suffix;
                  } else {
                    countElement.textContent = currentValue.toFixed(2) + stat.suffix;
                  }
                }
              },
            },
            0,
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative container mx-auto h-[600px] overflow-hidden bg-white px-4 py-20 dark:bg-[var(--neutral-50)]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl pt-10 md:mb-20">
          <h2
            ref={headlineRef}
            className="mb-5 text-3xl font-bold tracking-tight text-[var(--primary-dark-blue)] md:text-4xl lg:text-5xl dark:text-white"
          >
            The platform for tech enthusiasts.
          </h2>
          <p
            ref={paragraphRef}
            className="text-base leading-relaxed text-[var(--primary-dark-blue)]/80 md:text-lg dark:text-white/80"
          >
            Jobsmate is for showcasing true potential. Our developers are looking for a next
            challenge and they are ready to showcase it to your company.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                statsRefs.current[index] = el;
              }}
              className="group relative rounded-xl border border-[var(--primary-light-blue)]/10 bg-white p-6 shadow-md md:p-8 dark:border-white/10 dark:bg-[var(--neutral-50)]"
            >
              <div className="absolute top-0 left-0 h-1 w-full rounded-t-xl bg-gradient-to-r from-[var(--primary-light-blue)] to-[var(--primary-gold)] opacity-70"></div>
              <h3 className="mb-2 text-3xl text-[var(--primary-light-blue)] md:text-4xl">
                <span
                  ref={(el) => {
                    countRefs.current[index] = el;
                  }}
                  className="inline-block"
                >
                  {!animationsPlayed
                    ? '0'
                    : stat.format
                      ? formatNumber(Math.floor(stat.value)) + stat.suffix
                      : Number(stat.value.toFixed(2)) + stat.suffix}
                </span>
              </h3>
              <p className="text-sm font-medium text-[var(--primary-dark-blue)]/70 md:text-base dark:text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
