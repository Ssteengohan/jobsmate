import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const Card = () => {
  // State to track if component is in viewport
  const [isInView, setIsInView] = useState(false);

  // Refs for animation targets
  const cardRef = useRef<HTMLDivElement>(null);

  // Left side refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Right side refs
  const dashboardRef = useRef<HTMLDivElement>(null);
  const timeCardRef = useRef<HTMLDivElement>(null);
  const qualityCardRef = useRef<HTMLDivElement>(null);
  const metricsRowRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const proBadgeRef = useRef<HTMLDivElement>(null);

  // Set up intersection observer to detect when card is in view
  useEffect(() => {
    // Capture the current value of the ref inside the effect
    const currentCardElement = cardRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once we've seen it, no need to observe anymore
          if (currentCardElement) observer.unobserve(currentCardElement);
        }
      },
      {
        // Start animation when element is 20% visible
        threshold: 0.2,
        // Start slightly before element is in view for smoother experience
        rootMargin: '0px 0px -10% 0px',
      },
    );

    if (currentCardElement) {
      observer.observe(currentCardElement);
    }

    return () => {
      // Use the captured value in the cleanup function
      if (currentCardElement) observer.unobserve(currentCardElement);
    };
  }, []);

  // Animation effect - now triggered when card is in view
  useEffect(() => {
    // Set initial states
    gsap.set([titleRef.current, subtitleRef.current], {
      y: -30,
      opacity: 0,
      transformOrigin: 'center center',
    });

    gsap.set(buttonsRef.current, {
      y: 20,
      opacity: 0,
    });

    gsap.set([timeCardRef.current, qualityCardRef.current], {
      opacity: 0,
      y: 20,
      scale: 0.9,
    });

    gsap.set(dashboardRef.current, {
      opacity: 0,
      y: 10,
    });

    gsap.set(metricsRowRef.current, {
      opacity: 0,
    });

    gsap.set(progressBarRef.current, {
      opacity: 0,
    });

    gsap.set(progressFillRef.current, {
      width: '0%',
    });

    gsap.set(proBadgeRef.current, {
      opacity: 0,
      rotate: -5,
      scale: 0.8,
    });

    // Only start animation when card is in view
    if (isInView) {
      // Main animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Start with the left side content animation
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
      })
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          '-=0.4',
        ) // Slightly overlap with previous animation
        .to(
          buttonsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          '-=0.3',
        )

        // Continue with right side animations
        .to(
          dashboardRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          '-=0.2',
        )
        .to(
          timeCardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
          },
          '-=0.4',
        )
        .to(
          qualityCardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
          },
          '-=0.3',
        )
        .to(metricsRowRef.current, {
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            // Animate metric items individually
            gsap.to('.metric-item', {
              scale: 1,
              opacity: 1,
              stagger: 0.1,
              duration: 0.3,
              ease: 'back.out(1.2)',
            });
          },
        })
        .to(progressBarRef.current, {
          opacity: 1,
          duration: 0.5,
        })
        .to(
          progressFillRef.current,
          {
            width: '85%',
            duration: 1.5,
            ease: 'power2.out',
          },
          '-=0.3',
        )
        .to(
          proBadgeRef.current,
          {
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          '-=1.2',
        );

      return () => {
        // Clean up animations
        tl.kill();
      };
    }
  }, [isInView]); // Depend on isInView state

  // Button hover animations
  useEffect(() => {
    // Add subtle hover animations for buttons
    const buttons = document.querySelectorAll('.card-button');
    buttons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          y: -3,
          duration: 0.2,
          ease: 'power2.out',
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      // Clean up event listeners
      buttons.forEach((button) => {
        button.removeEventListener('mouseenter', () => {});
        button.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <section
      ref={cardRef}
      className="container mx-auto flex h-auto min-h-[600px] w-full flex-col items-center justify-center border-t border-b border-black/20 bg-white p-4 shadow-lg md:h-[40vh] md:flex-row md:p-8 dark:border-white/30 dark:bg-[#1e2635]"
    >
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center py-8 md:w-1/2 md:py-0">
        <h3
          ref={titleRef}
          className="text-center text-2xl font-bold text-[var(--primary-dark-blue)] md:text-left md:text-4xl dark:text-white"
        >
          Start with a 14-day
        </h3>
        <span
          ref={subtitleRef}
          className="text-center text-2xl text-[var(--primary-dark-blue)] md:text-left md:text-4xl dark:text-white"
        >
          free trial of Pro
        </span>
        <div
          ref={buttonsRef}
          className="flex w-full flex-col items-center justify-center gap-4 pt-6 md:flex-row md:flex-wrap md:items-start md:pt-10"
        >
          <Link
            href={'/'}
            className="card-button group relative w-full max-w-[240px] cursor-pointer rounded-full border border-transparent bg-[var(--primary-gold)] px-8 py-3 text-center text-xs font-medium text-[var(--primary-dark-blue)] transition-all duration-300 ease-in-out hover:border-transparent hover:shadow-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:ring-offset-2 focus:outline-none sm:text-sm md:w-auto dark:text-[var(--primary-dark)] dark:hover:shadow-[0_0_15px_rgba(240,180,41,0.4)]"
          >
            <div className="via-primary-light-blue absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-70 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100 group-hover:shadow-md" />
            <div className="via-primary-gold absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100" />
            <div className="from-primary-light-blue via-primary-medium-blue to-primary-gold absolute -top-px -right-px -left-px h-[3px] w-0 rounded-t-full bg-gradient-to-r transition-all duration-700 group-hover:w-full" />
            <span className="relative z-20 transition-all duration-300">Start for free</span>
          </Link>

          <Link
            href={'/'}
            className="card-button group relative inline-flex w-full max-w-[240px] cursor-pointer overflow-hidden rounded-full p-[1px] text-center shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl focus:ring-2 focus:ring-[var(--primary-light-blue)] focus:ring-offset-2 focus:outline-none md:w-auto dark:hover:shadow-[0_0_20px_rgba(42,151,219,0.4)]"
          >
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary-light-blue)_0%,var(--primary-medium-blue)_40%,var(--primary-gold)_70%,var(--primary-dark)_100%)] opacity-80 transition-all duration-300 ease-in-out group-hover:animate-[spin_3s_linear_infinite] group-hover:opacity-100" />
            <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-[var(--primary-light-blue)] backdrop-blur-3xl transition-all duration-300 ease-in-out group-hover:bg-[var(--primary-light-blue)] group-hover:text-white group-hover:shadow-inner dark:bg-[var(--neutral-50)] dark:text-[var(--primary-medium-blue)] dark:group-hover:bg-[var(--primary-dark-blue)] dark:group-hover:text-white dark:group-hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
              See our plans
            </span>
          </Link>
        </div>
      </div>
      <div className="relative mt-4 flex h-[300px] w-full items-center justify-center overflow-hidden md:mt-0 md:h-full md:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br bg-none from-[var(--primary-light-blue)]/10 to-[var(--primary-gold)]/10 opacity-60 dark:opacity-100"></div>

        {/* Dashboard visualization with animated elements */}
        <div className="relative z-10 w-full max-w-xs md:max-w-md">
          {/* Floating statistics cards with staggered animation */}
          <div
            ref={timeCardRef}
            className="absolute -top-6 -right-4 z-20 rounded-lg border border-[var(--primary-light-blue)]/20 bg-white p-2 shadow-lg md:-top-10 md:-right-10 md:p-3 dark:border-[var(--primary-light-blue)]/40 dark:bg-[var(--neutral-50)]"
          >
            <p className="text-xs text-gray-600 dark:text-gray-400">Time saved</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[var(--primary-medium-blue)] md:text-2xl">
                68%
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-500">↑12%</span>
            </div>
          </div>

          <div
            ref={qualityCardRef}
            className="absolute -right-2 -bottom-4 rounded-lg border border-[var(--primary-gold)]/20 bg-white p-2 shadow-lg md:-right-4 md:-bottom-6 md:p-3 dark:border-[var(--primary-gold)]/40 dark:bg-[var(--neutral-50)]"
          >
            <p className="text-xs text-gray-600 dark:text-gray-400">Hire quality</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[var(--primary-gold)] md:text-2xl">94%</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-500">↑8%</span>
            </div>
          </div>

          {/* Main dashboard preview */}
          <div
            ref={dashboardRef}
            className="overflow-hidden rounded-xl border border-gray-200/70 shadow-xl md:shadow-2xl dark:border-white/20"
          >
            <Image
              src="/dashboard-preview.png"
              alt="Pro Dashboard"
              width={500}
              height={300}
              className="h-auto w-full"
              onError={(e) => {
                // Fallback if image doesn't exist - with proper type checking
                e.currentTarget.style.display = 'none';

                // Safe access to nextSibling with proper type checking
                const fallbackElement = e.currentTarget.nextSibling as HTMLElement;
                if (fallbackElement && fallbackElement instanceof HTMLElement) {
                  fallbackElement.style.display = 'block';
                }
              }}
            />

            {/* Fallback if image doesn't exist */}
            <div className="hidden h-52 w-full bg-gradient-to-br from-[var(--primary-light-blue)] to-[var(--primary-gold)] p-4">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-2 w-24 rounded bg-white/30"></div>
                  <div className="h-6 w-40 rounded bg-white/50"></div>
                  <div className="h-2 w-32 rounded bg-white/30"></div>
                </div>

                <div className="flex justify-between">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="chart-bar h-16 w-16 rounded-md bg-white/20"
                      style={{ height: '0px' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics row */}
          <div ref={metricsRowRef} className="mt-3 grid grid-cols-3 gap-1 md:mt-4 md:gap-2">
            {['Faster Hiring', 'More Candidates', 'Higher ROI'].map((text, i) => (
              <div
                key={i}
                className="metric-item rounded border border-gray-200/20 bg-white/80 p-1 text-center backdrop-blur-sm md:p-2 dark:border-white/5 dark:bg-white/10"
                style={{ opacity: 0, scale: 0.8 }}
              >
                <span className="text-[10px] font-medium text-[var(--primary-dark-blue)] md:text-xs dark:text-white">
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Progress bar animation */}
          <div
            ref={progressBarRef}
            className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-200 md:mt-4 md:h-1.5 dark:bg-white/10"
          >
            <div
              ref={progressFillRef}
              className="h-full bg-gradient-to-r from-[var(--primary-light-blue)] to-[var(--primary-gold)]"
            />
          </div>

          {/* Pro badge */}
          <div
            ref={proBadgeRef}
            className="absolute -top-2 -left-2 rounded-full bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-light-blue)] px-2 py-0.5 text-[10px] font-bold text-white shadow-lg md:-top-4 md:-left-4 md:px-3 md:py-1 md:text-xs"
          >
            PRO
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
