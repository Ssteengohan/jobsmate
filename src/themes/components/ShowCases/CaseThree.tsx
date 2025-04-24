import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Balancer from 'react-wrap-balancer';
import Image from 'next/image';

// Register ScrollTrigger if we're in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CaseThree = () => {
  const [animationReady, setAnimationReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);

  // Set up animation readiness with a slightly faster delay
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('js-animation-ready');
      const timer = setTimeout(() => setAnimationReady(true), 50); // Reduced from 100ms
      return () => clearTimeout(timer);
    }
  }, []);

  // Create animation timeline - moved outside of the main effect for better organization
  const createAnimationTimeline = useCallback(() => {
    const ctx = gsap.context(() => {
      // Initial state for content - using GPU acceleration for better performance
      gsap.set(contentRef.current, {
        autoAlpha: 0,
        willChange: 'opacity, transform',
      });

      // Initial states for middle column elements with better transform hints
      gsap.set(titleRef.current, {
        autoAlpha: 0,
        y: -20,
        willChange: 'opacity, transform',
      });

      gsap.set(chartRef.current, {
        autoAlpha: 0,
        scale: 0.9,
        y: 20,
        willChange: 'opacity, transform',
        transformOrigin: 'center center',
      });

      gsap.set(logoRef.current, {
        autoAlpha: 0,
        scale: 0.9,
        y: 30,
        willChange: 'opacity, transform',
        transformOrigin: 'center center',
      });

      // Set initial state for analytics cards - batch operations for better performance
      const analyticCards = gsap.utils.toArray('.analytics-card');
      gsap.set(analyticCards, {
        autoAlpha: 0,
        x: 20,
        scale: 0.95,
        willChange: 'opacity, transform',
        transformOrigin: 'center center',
      });

      // Set initial state for chart bars - batching for better performance
      const chartLines = gsap.utils.toArray('.chart-line');
      gsap.set(chartLines, {
        scaleY: 0,
        transformOrigin: 'bottom',
        willChange: 'transform',
      });

      // Set initial state for metric labels
      const metricLabels = gsap.utils.toArray('.metric-label');
      gsap.set(metricLabels, {
        autoAlpha: 0,
        y: 10,
        willChange: 'opacity, transform',
      });

      // Main animation timeline - improved easing and performance
      const mainTl = gsap.timeline({
        paused: true,
        smoothChildTiming: true,
        defaults: {
          ease: 'power2.out',
          duration: 0.4,
          clearProps: '', // Don't clear props for better performance
        },
      });

      // Create the animation sequence with better performance considerations
      mainTl
        // First show the overall content
        .to(contentRef.current, {
          autoAlpha: 1,
          duration: 0.5,
        })

        // Animate title with a subtle bounce but less intensive calculation
        .to(
          titleRef.current,
          {
            autoAlpha: 1,
            y: 0,
            ease: 'back.out(1.1)', // Reduced from 1.2 for better performance
            duration: 0.6,
          },
          0.1, // Start slightly later for better sequence
        )

        // Reveal the chart container with a slight bounce
        .to(
          chartRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.1)', // Less bouncy for better performance
          },
          0.3, // Slightly adjusted timing
        )

        // Animate in each chart bar with optimized staggered effect
        .to(
          chartLines,
          {
            scaleY: 1,
            stagger: 0.08, // Reduced from 0.12 for faster appearance
            duration: 0.6,
            ease: 'power3.out', // Removed elastic for better performance
          },
          0.55, // Start earlier for better flow
        )

        // Animate in metric labels after chart bars appear
        .to(
          metricLabels,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.06, // Reduced from 0.1 for faster appearance
            duration: 0.4,
          },
          0.75, // Adjusted timing
        )

        // Animate in the logo container
        .to(
          logoRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out', // Simpler easing for better performance
          },
          0.8, // Show earlier
        )

        // Animate the right side analytics cards with better timing
        .to(
          analyticCards,
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            stagger: 0.08, // Reduced stagger for quicker appearance
            duration: 0.5, // Slightly reduced duration
            ease: 'back.out(1.4)', // Less bouncy
          },
          0.4, // Start earlier for better sequence
        );

      // Create pulsing effect for logo with better performance
      gsap.to('.pulse-element', {
        scale: 1.03, // Less scale for better performance
        repeat: -1,
        yoyo: true,
        duration: 1.8, // Slower for better performance
        ease: 'sine.inOut',
      });

      // Create subtle movement of the background patterns with better performance
      gsap.to('.pattern-grid', {
        backgroundPosition: '14px 14px',
        duration: 25, // Longer animation for less CPU usage
        repeat: -1,
        ease: 'none', // 'none' is more performant than 'linear'
      });

      gsap.to('.pattern-dots', {
        backgroundPosition: '18px 18px',
        duration: 30, // Longer animation for less CPU usage
        repeat: -1,
        ease: 'none', // 'none' is more performant than 'linear'
      });

      // Pin the container during scroll with better performance settings
      if (stickyWrapperRef.current && containerRef.current) {
        ScrollTrigger.create({
          trigger: stickyWrapperRef.current,
          start: 'top top', // Position at the very top
          end: 'bottom top+=340px', // Adjusted end point calculation
          pin: containerRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          pinReparent: false,
          refreshPriority: 1,
          id: 'case-three-pin',
          onEnter: () => {
            // Ensure clean start state
            mainTl.progress(0);
          },
          onLeaveBack: () => {
            mainTl.progress(0);
          },
          onLeave: () => {
            mainTl.progress(1);
          },
        });
      }

      // Create animation trigger with optimized scrub and easing
      ScrollTrigger.create({
        trigger: stickyWrapperRef.current,
        start: 'top 50%', // Adjusted to trigger at the middle of viewport
        end: 'bottom top', // End when bottom reaches the top
        onUpdate: (self) => {
          // Optimized progress calculation with smoother easing curve
          const rawProgress = Math.min(self.progress, 1);
          // Simpler quadratic easing that's more performant
          const easedProgress =
            rawProgress < 0.5
              ? 2 * rawProgress * rawProgress
              : -1 + (4 - 2 * rawProgress) * rawProgress;

          mainTl.progress(easedProgress);
        },
        scrub: 0.5, // Reduced scrub for more immediate response
        preventOverlaps: true, // Prevent conflicting ScrollTriggers
        fastScrollEnd: true, // Better performance on fast scrolling
        id: 'case-three-animation',
      });

      return () => {
        // Return the timeline for external control if needed
        return mainTl;
      };
    }, containerRef);

    return ctx;
  }, []);

  // Setup animations with dependency on animationReady
  useEffect(() => {
    if (typeof window === 'undefined' || !animationReady) return;

    // Create the animations
    const ctx = createAnimationTimeline();

    // Force ScrollTrigger refresh after a short delay to ensure accurate positioning
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true); // Force recalculation
    }, 100);

    // Clean up function
    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert(); // Clean up all GSAP animations
    };
  }, [animationReady, createAnimationTimeline]);

  return (
    <div className="relative z-40 mt-[380px]" ref={stickyWrapperRef} style={{ position: 'relative', top: 0 }}>
      <div className="h-screen">
        <div
          ref={containerRef}
          className="relative h-[800px] border-t border-b border-black/20 dark:border-white/30"
          style={{ willChange: 'transform', top: 0 }} // Added top: 0 to prevent unwanted top spacing
        >
          <div className="mx-auto h-full">
            <div className="flex h-full" ref={contentRef}>
              <div className="relative z-10 flex w-1/4 flex-col justify-between pt-20">
                <div className="px-4">
                  <h3 className="text-foreground text-xl font-bold">Applicant reporting</h3>
                  <Balancer className="pt-5 text-gray-600 dark:text-gray-400">
                    Sync your data from Jobsmate with your applicant tracking system and share your
                    data Insight with the talent acquisition team all at once
                  </Balancer>
                </div>

                <Link
                  href={'/'}
                  className="group text-foreground relative flex w-fit items-center gap-1 px-4 pb-20 text-sm font-semibold"
                >
                  <span className="relative inline-block">
                    Explore platform
                    <span className="absolute bottom-[-4px] left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"></span>
                  </span>
                  <ArrowRight className="inline h-4 w-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="relative w-2/4 overflow-hidden border-r border-l border-black/20 dark:border-white/30">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[var(--primary-medium-blue)]/10 via-transparent to-transparent dark:from-[var(--primary-medium-blue)]/30">
                    <div
                      className="pattern-grid absolute inset-0 transition-all duration-700"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px), 
                                       linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '14px 14px',
                        willChange: 'background-position', // Optimize animation
                      }}
                    ></div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--primary-gold)]/10 via-transparent to-transparent dark:from-[var(--primary-gold)]/30">
                    <div
                      className="pattern-dots absolute inset-0 [background-image:radial-gradient(var(--primary-gold)_1px,transparent_1px)] [background-size:14px_14px] dark:[background-image:radial-gradient(var(--primary-gold)_1.5px,transparent_1px)]"
                      style={{ willChange: 'background-position' }} // Optimize animation
                    ></div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/30 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-[var(--neutral-50)]/5"></div>
                </div>

                <div className="flex h-full flex-col items-center">
                  <div className="pt-12 text-center">
                    <h2 ref={titleRef} className="mb-2 text-2xl font-bold">
                      Recruitment Analytics
                    </h2>
                  </div>

                  <div
                    ref={chartRef}
                    className="mx-auto mt-8 flex w-[85%] flex-col items-center justify-center rounded-lg bg-white/90 p-6 shadow-lg dark:bg-gray-800/90"
                  >
                    <div className="mb-8 flex w-full flex-col space-y-3">
                      <span className="text-sm font-medium text-gray-500">
                        Application Funnel (2023-2024)
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-[var(--primary-medium-blue)]"></div>
                          <span className="text-xs text-gray-500">Applications</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-[var(--primary-gold)]"></div>
                          <span className="text-xs text-gray-500">Hires</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-[160px] w-full items-end justify-around border-b border-gray-200">
                      <div className="flex flex-col items-center">
                        <div className="chart-line h-[120px] w-8 rounded-t-md bg-[var(--primary-medium-blue)]/70"></div>
                        <div className="chart-line h-[18px] w-8 bg-[var(--primary-gold)]"></div>
                        <span className="mt-2 text-xs">Q1 &apos;23</span>
                        <span className="text-[10px] text-gray-500">1,240</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="chart-line h-[140px] w-8 rounded-t-md bg-[var(--primary-medium-blue)]/70"></div>
                        <div className="chart-line h-[20px] w-8 bg-[var(--primary-gold)]"></div>
                        <span className="mt-2 text-xs">Q2 &apos;23</span>
                        <span className="text-[10px] text-gray-500">1,456</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="chart-line h-[90px] w-8 rounded-t-md bg-[var(--primary-medium-blue)]/70"></div>
                        <div className="chart-line h-[15px] w-8 bg-[var(--primary-gold)]"></div>
                        <span className="mt-2 text-xs">Q3 &apos;23</span>
                        <span className="text-[10px] text-gray-500">942</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="chart-line h-[150px] w-8 rounded-t-md bg-[var(--primary-medium-blue)]/70"></div>
                        <div className="chart-line h-[25px] w-8 bg-[var(--primary-gold)]"></div>
                        <span className="mt-2 text-xs">Q4 &apos;23</span>
                        <span className="text-[10px] text-gray-500">1,580</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="chart-line h-[155px] w-8 rounded-t-md bg-[var(--primary-medium-blue)]/70"></div>
                        <div className="chart-line h-[26px] w-8 bg-[var(--primary-gold)]"></div>
                        <span className="mt-2 text-xs">Q1 &apos;24</span>
                        <span className="text-[10px] text-gray-500">1,789</span>
                      </div>
                    </div>

                    <div className="mt-4 flex w-full justify-between">
                      <div className="text-center">
                        <span className="metric-label text-xs text-gray-500">Hire Rate</span>
                        <p className="text-lg font-bold text-[var(--primary-medium-blue)]">4.7%</p>
                        <span className="text-[10px] text-gray-500">Industry avg: 4.2%</span>
                      </div>
                      <div className="text-center">
                        <span className="metric-label text-xs text-gray-500">Time to Hire</span>
                        <p className="text-lg font-bold text-[var(--primary-gold)]">32 days</p>
                        <span className="text-[10px] text-gray-500">↓12% vs Q4 &apos;23</span>
                      </div>
                      <div className="text-center">
                        <span className="metric-label text-xs text-gray-500">Cost per Hire</span>
                        <p className="text-lg font-bold text-emerald-500">$4,280</p>
                        <span className="text-[10px] text-gray-500">↓8% vs industry avg</span>
                      </div>
                    </div>
                  </div>

                  <div className="mx-auto mt-5 w-[85%] rounded-lg border border-[var(--primary-medium-blue)]/30 bg-gradient-to-r from-[var(--primary-medium-blue)]/15 to-[var(--primary-gold)]/10 p-4 shadow-sm dark:border-[var(--primary-medium-blue)]/40 dark:from-[var(--primary-medium-blue)]/25 dark:to-[var(--primary-gold)]/15">
                    <h3 className="text-sm font-semibold text-[var(--primary-medium-blue)]">
                      How Jobsmate Improves These Metrics:
                    </h3>
                    <ul className="mt-2 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2 rounded-full bg-[var(--primary-gold)]/20 p-0.5 text-[var(--primary-gold)]">
                          ▲
                        </span>
                        <span className="font-medium text-white">
                          Cut time-to-hire by 28% with automated candidate screening
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 rounded-full bg-[var(--primary-gold)]/20 p-0.5 text-[var(--primary-gold)]">
                          ▲
                        </span>
                        <span className="font-medium text-white">
                          Reduce cost-per-hire by identifying efficient sourcing channels
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 rounded-full bg-[var(--primary-gold)]/20 p-0.5 text-[var(--primary-gold)]">
                          ▲
                        </span>
                        <span className="font-medium text-white">
                          Improve candidate quality with skill-based assessments
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div
                    ref={logoRef}
                    className="mt-2 flex w-fit items-center justify-center overflow-visible rounded-lg bg-[#05253c] shadow-lg"
                    style={{ willChange: 'transform, opacity' }} // Performance hint
                  >
                    <Image
                      src="/jobsmate-mob.svg"
                      alt="Jobsmate"
                      width={120}
                      height={120}
                      className="pulse-element"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="w-1/4">
                <div className="h-full px-6 pt-20">
                  <h3 className="text-foreground text-xl font-bold">Competitive Edge</h3>
                  <p className="mt-2 text-xs text-gray-500">Compared to industry standards</p>

                  <div className="mt-6 space-y-4" ref={analyticsRef}>
                    <div
                      className="analytics-card rounded-lg border border-gray-200 bg-gradient-to-r from-white to-gray-50 p-4 shadow-md dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <h4 className="mb-2 text-sm font-medium">Skill Match Accuracy</h4>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-[var(--primary-medium-blue)]">
                          +30%
                        </span>
                        <span className="text-sm text-gray-500">vs LinkedIn</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                        Verified assessments vs self-reported data
                      </p>
                    </div>

                    <div
                      className="analytics-card rounded-lg border border-gray-200 bg-gradient-to-r from-white to-gray-50 p-4 shadow-md dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <h4 className="mb-2 text-sm font-medium">Time-to-Hire Reduction</h4>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-[var(--primary-gold)]">25%</span>
                        <span className="text-sm text-gray-500">faster process</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                        Automated ranking vs manual screening
                      </p>
                    </div>

                    <div
                      className="analytics-card rounded-lg border border-gray-200 bg-gradient-to-r from-white to-gray-50 p-4 shadow-md dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <h4 className="mb-2 text-sm font-medium">Cost Savings</h4>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-emerald-500">65%</span>
                        <span className="text-sm text-gray-500">lower cost</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                        €175/mo vs agency fees & premium tools
                      </p>
                    </div>

                    <div
                      className="analytics-card rounded-lg border border-gray-200 bg-gradient-to-r from-white to-gray-50 p-4 shadow-md dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <h4 className="mb-2 text-sm font-medium">Hiring Quality</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold text-[var(--primary-medium-blue)]">
                            84%
                          </span>
                          <span className="text-sm text-gray-500">match rate</span>
                        </div>
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100">
                          Industry Best
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .js-animation-ready .chart-line {
          transform: scaleY(0);
          transform-origin: bottom;
          will-change: transform;
          backface-visibility: hidden; /* Prevent flickering */
          perspective: 1000; /* Hardware acceleration hint */
        }

        .js-animation-ready .analytics-card {
          will-change: opacity, transform;
          backface-visibility: hidden;
          perspective: 1000;
        }

        .pulse-element {
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000;
        }

        /* Enhanced dark mode styles */
        @media (prefers-color-scheme: dark) {
          .pattern-grid {
            background-image:
              linear-gradient(to right, rgba(220, 226, 240, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(220, 226, 240, 0.15) 1px, transparent 1px) !important;
          }

          .pattern-dots {
            background-image: radial-gradient(
              var(--primary-gold) 1.5px,
              transparent 1.5px
            ) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CaseThree;
