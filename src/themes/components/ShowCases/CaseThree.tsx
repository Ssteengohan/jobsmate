import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Balancer from 'react-wrap-balancer';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Add screen size interface
interface ScreenSize {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const CaseThree = () => {
  const [animationReady, setAnimationReady] = useState(false);
  // Add screen size state
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);

  // Add window resize handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('js-animation-ready');
      const timer = setTimeout(() => setAnimationReady(true), 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const createAnimationTimeline = useCallback(() => {
    // Only create complex animation for desktop
    if (!screenSize.isDesktop) return null;

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, {
        autoAlpha: 0,
        willChange: 'opacity, transform',
      });

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

      const analyticCards = gsap.utils.toArray('.analytics-card');
      gsap.set(analyticCards, {
        autoAlpha: 0,
        x: 20,
        scale: 0.95,
        willChange: 'opacity, transform',
        transformOrigin: 'center center',
      });

      const chartLines = gsap.utils.toArray('.chart-line');
      gsap.set(chartLines, {
        scaleY: 0,
        transformOrigin: 'bottom',
        willChange: 'transform',
      });

      const metricLabels = gsap.utils.toArray('.metric-label');
      gsap.set(metricLabels, {
        autoAlpha: 0,
        y: 10,
        willChange: 'opacity, transform',
      });

      const mainTl = gsap.timeline({
        paused: true,
        smoothChildTiming: true,
        defaults: {
          ease: 'power2.out',
          duration: 0.4,
          clearProps: '',
        },
      });

      mainTl
        .to(contentRef.current, {
          autoAlpha: 1,
          duration: 0.5,
        })
        .to(
          titleRef.current,
          {
            autoAlpha: 1,
            y: 0,
            ease: 'back.out(1.1)',
            duration: 0.6,
          },
          0.1,
        )
        .to(
          chartRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.1)',
          },
          0.3,
        )
        .to(
          chartLines,
          {
            scaleY: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out',
          },
          0.55,
        )
        .to(
          metricLabels,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.4,
          },
          0.75,
        )
        .to(
          logoRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.8,
        )
        .to(
          analyticCards,
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: 'back.out(1.4)',
          },
          0.4,
        );

      gsap.to('.pulse-element', {
        scale: 1.03,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: 'sine.inOut',
      });

      gsap.to('.pattern-grid', {
        backgroundPosition: '14px 14px',
        duration: 25,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.pattern-dots', {
        backgroundPosition: '18px 18px',
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      if (stickyWrapperRef.current && containerRef.current) {
        ScrollTrigger.create({
          trigger: stickyWrapperRef.current,
          start: 'top 10%',
          end: 'bottom 10%',
          pin: containerRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          pinReparent: false,
          refreshPriority: 1,
          id: 'case-three-pin',
          onEnter: () => {
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

      const scrollTrigger = ScrollTrigger.create({
        trigger: stickyWrapperRef.current,
        start: 'top 60%',
        end: 'bottom 20%',
        onUpdate: (self) => {
          const rawProgress = Math.min(self.progress, 1);
          const easedProgress =
            rawProgress < 0.5
              ? 2 * rawProgress * rawProgress
              : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

          mainTl.progress(easedProgress);
        },
        scrub: 0.8,
        preventOverlaps: true,
        fastScrollEnd: true,
        id: 'case-three-animation',
      });

      return () => {
        scrollTrigger.kill();
        return mainTl;
      };
    }, containerRef);

    return ctx;
  }, [screenSize.isDesktop]); // Add screenSize.isDesktop to dependencies

  // Add mobile animation effect
  useEffect(() => {
    if (typeof window === 'undefined' || !animationReady) return;

    if (!screenSize.isDesktop) {
      const ctx = gsap.context(() => {
        // Make everything visible initially
        gsap.set([contentRef.current, titleRef.current, chartRef.current, logoRef.current], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });

        gsap.set('.analytics-card', { autoAlpha: 1, x: 0, scale: 1 });
        gsap.set('.chart-line', { scaleY: 1 });
        gsap.set('.metric-label', { autoAlpha: 1, y: 0 });

        // Simple entrance animations for mobile
        const mobileTl = gsap.timeline();

        mobileTl
          .from(titleRef.current, {
            autoAlpha: 0,
            y: -20,
            duration: 0.6,
            ease: 'back.out(1.1)',
          })
          .from(
            chartRef.current,
            {
              autoAlpha: 0,
              y: 20,
              scale: 0.95,
              duration: 0.7,
              ease: 'back.out(1.1)',
            },
            '-=0.3',
          )
          .from(
            '.chart-line',
            {
              scaleY: 0,
              stagger: 0.04,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.2',
          )
          .from(
            '.metric-label',
            {
              autoAlpha: 0,
              y: 10,
              stagger: 0.03,
              duration: 0.3,
            },
            '-=0.2',
          )
          .from(
            logoRef.current,
            {
              autoAlpha: 0,
              scale: 0.9,
              duration: 0.5,
            },
            '-=0.1',
          )
          .from(
            '.analytics-card',
            {
              autoAlpha: 0,
              y: 15,
              stagger: 0.08,
              duration: 0.5,
            },
            '-=0.4',
          );

        // Continue animations
        gsap.to('.pulse-element', {
          scale: 1.03,
          repeat: -1,
          yoyo: true,
          duration: 1.8,
          ease: 'sine.inOut',
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [animationReady, screenSize.isDesktop]);

  useEffect(() => {
    if (typeof window === 'undefined' || !animationReady) return;

    const ctx = createAnimationTimeline();

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      if (ctx) ctx.revert();
    };
  }, [animationReady, createAnimationTimeline]);

  return (
    <div
      className={`relative z-40 ${screenSize.isDesktop ? 'mt-[719px]' : 'mt-16'}`}
      ref={stickyWrapperRef}
      style={{ position: 'relative', top: 0 }}
    >
      <div className={screenSize.isDesktop ? 'h-screen' : 'h-auto'}>
        <div
          ref={containerRef}
          className={`relative ${
            screenSize.isDesktop ? 'h-[800px]' : 'h-auto'
          } border-t border-b border-black/20 dark:border-white/30`}
          style={{ willChange: screenSize.isDesktop ? 'transform' : 'auto', top: 0 }}
        >
          <div className="mx-auto h-full">
            <div className={`${screenSize.isDesktop ? 'flex' : 'block'} h-full`} ref={contentRef}>
              <div
                className={`relative z-10 ${
                  screenSize.isDesktop
                    ? 'flex w-1/4 flex-col justify-between pt-20'
                    : 'w-full px-4 py-6'
                }`}
              >
                <div className={screenSize.isDesktop ? 'px-4' : ''}>
                  <h3 className="text-foreground text-xl font-bold">Applicant reporting</h3>
                  <Balancer className="pt-5 text-gray-600 dark:text-gray-400">
                    Sync your data from Jobsmate with your applicant tracking system and share your
                    data Insight with the talent acquisition team all at once
                  </Balancer>
                </div>

                {screenSize.isDesktop && (
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
                )}
              </div>

              <div
                className={`relative ${
                  screenSize.isDesktop
                    ? 'w-2/4 overflow-hidden border-r border-l border-black/20 dark:border-white/30'
                    : 'w-full border-t border-b border-black/10 px-4 py-6 dark:border-white/10'
                }`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[var(--primary-medium-blue)]/10 via-transparent to-transparent dark:from-[var(--primary-medium-blue)]/30">
                    <div
                      className="pattern-grid absolute inset-0 transition-all duration-700"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px), 
                                       linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '14px 14px',
                        willChange: 'background-position',
                      }}
                    ></div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--primary-gold)]/10 via-transparent to-transparent dark:from-[var(--primary-gold)]/30">
                    <div
                      className="pattern-dots absolute inset-0 [background-image:radial-gradient(var(--primary-gold)_1px,transparent_1px)] [background-size:14px_14px] dark:[background-image:radial-gradient(var(--primary-gold)_1.5px,transparent_1px)]"
                      style={{ willChange: 'background-position' }}
                    ></div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/30 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-[var(--neutral-50)]/5"></div>
                </div>

                <div className="flex h-full flex-col items-center">
                  <div className="pt-4 text-center">
                    <h2 ref={titleRef} className="mb-2 text-2xl font-bold">
                      Recruitment Analytics
                    </h2>
                  </div>

                  <div
                    ref={chartRef}
                    className="relative z-50 mx-auto mt-8 flex w-full max-w-[500px] flex-col items-center justify-center rounded-lg bg-white/90 p-4 shadow-lg sm:p-6 dark:bg-gray-800/90"
                  >
                    <div className="mb-6 flex w-full flex-col space-y-3 sm:mb-8">
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

                    <div className="flex h-[140px] w-full items-end justify-around border-b border-gray-200 sm:h-[160px]">
                      <div className="flex flex-col items-center">
                        <div className="chart-line h-[100px] w-5 rounded-t-md bg-[var(--primary-medium-blue)]/70 sm:h-[120px] sm:w-8"></div>
                        <div className="chart-line h-[15px] w-5 bg-[var(--primary-gold)] sm:h-[18px] sm:w-8"></div>
                        <span className="mt-2 text-xs">Q1 &apos;23</span>
                        <span className="text-[10px] text-gray-500">1,240</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="chart-line h-[120px] w-5 rounded-t-md bg-[var(--primary-medium-blue)]/70 sm:h-[140px] sm:w-8"></div>
                        <div className="chart-line h-[18px] w-5 bg-[var(--primary-gold)] sm:h-[20px] sm:w-8"></div>
                        <span className="mt-2 text-xs">Q2 &apos;23</span>
                        <span className="text-[10px] text-gray-500">1,456</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="chart-line h-[75px] w-5 rounded-t-md bg-[var(--primary-medium-blue)]/70 sm:h-[90px] sm:w-8"></div>
                        <div className="chart-line h-[12px] w-5 bg-[var(--primary-gold)] sm:h-[15px] sm:w-8"></div>
                        <span className="mt-2 text-xs">Q3 &apos;23</span>
                        <span className="text-[10px] text-gray-500">942</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="chart-line h-[130px] w-5 rounded-t-md bg-[var(--primary-medium-blue)]/70 sm:h-[150px] sm:w-8"></div>
                        <div className="chart-line h-[22px] w-5 bg-[var(--primary-gold)] sm:h-[25px] sm:w-8"></div>
                        <span className="mt-2 text-xs">Q4 &apos;23</span>
                        <span className="text-[10px] text-gray-500">1,580</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="chart-line h-[135px] w-5 rounded-t-md bg-[var(--primary-medium-blue)]/70 sm:h-[155px] sm:w-8"></div>
                        <div className="chart-line h-[23px] w-5 bg-[var(--primary-gold)] sm:h-[26px] sm:w-8"></div>
                        <span className="mt-2 text-xs">Q1 &apos;24</span>
                        <span className="text-[10px] text-gray-500">1,789</span>
                      </div>
                    </div>

                    <div className="mt-4 flex w-full flex-wrap justify-between gap-2">
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

                  <div className="relative z-50 mx-auto mt-5 flex w-full max-w-[500px] flex-col rounded-lg border border-[var(--primary-medium-blue)]/30 bg-gradient-to-r from-[var(--primary-medium-blue)]/15 to-[var(--primary-gold)]/10 p-3 shadow-sm sm:p-4 dark:border-[var(--primary-medium-blue)]/80 dark:from-[var(--primary-medium-blue)]/65 dark:to-[var(--primary-gold)]/15">
                    <h3 className="flex items-center gap-2 rounded-md border-l-4 border-[var(--primary-medium-blue)] bg-[var(--primary-medium-blue)]/10 p-1.5 text-sm font-bold text-[var(--primary-medium-blue)] sm:text-base dark:border-[var(--primary-gold)] dark:bg-[var(--primary-medium-blue)]/25 dark:text-[var(--primary-gold)]">
                      <span className="inline-block animate-pulse">📈</span>
                      How Jobsmate Improves These Metrics:
                    </h3>
                    <ul className="mt-2 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2 rounded-full bg-[var(--primary-gold)]/20 p-0.5 px-1 text-[var(--primary-gold)]">
                          ▲
                        </span>
                        <span className="font-bold text-[#05253c] dark:text-white">
                          Cut time-to-hire by 28% with automated candidate screening
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 rounded-full bg-[var(--primary-gold)]/20 p-0.5 px-1 text-[var(--primary-gold)]">
                          ▲
                        </span>
                        <span className="font-bold text-[#05253c] dark:text-white">
                          Reduce cost-per-hire by identifying efficient sourcing channels
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 rounded-full bg-[var(--primary-gold)]/20 p-0.5 px-1 text-[var(--primary-gold)]">
                          ▲
                        </span>
                        <span className="font-bold text-[#05253c] dark:text-white">
                          Improve candidate quality with skill-based assessments
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div
                    ref={logoRef}
                    className="mt-4 flex w-fit items-center justify-center overflow-visible rounded-lg bg-[#05253c] shadow-lg"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <Image
                      src="/jobsmate-mob.svg"
                      alt="Jobsmate"
                      width={100}
                      height={100}
                      className="pulse-element"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className={screenSize.isDesktop ? 'w-1/4' : 'w-full px-4 py-6'}>
                <div className={`${screenSize.isDesktop ? 'h-full px-6 pt-20' : 'pt-4'}`}>
                  <h3 className="text-foreground text-xl font-bold">Competitive Edge</h3>
                  <p className="mt-2 text-xs text-gray-500">Compared to industry standards</p>

                  <div
                    className={`mt-6 ${
                      screenSize.isDesktop ? 'space-y-4' : 'grid grid-cols-1 gap-3 sm:grid-cols-2'
                    }`}
                    ref={analyticsRef}
                  >
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

              {/* Mobile-only call-to-action link */}
              {!screenSize.isDesktop && (
                <div className="flex w-full justify-center border-t border-black/10 px-4 py-6 dark:border-white/10">
                  <Link
                    href={'/'}
                    className="group text-foreground relative flex w-fit items-center gap-1 text-sm font-semibold"
                  >
                    <span className="relative inline-block">
                      Explore platform
                      <span className="absolute bottom-[-4px] left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"></span>
                    </span>
                    <ArrowRight className="inline h-4 w-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .js-animation-ready .chart-line {
          transform: scaleY(0);
          transform-origin: bottom;
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000;
        }

        /* Override animation settings for mobile/tablet */
        @media (max-width: 1023px) {
          .js-animation-ready .chart-line {
            transform: scaleY(1) !important;
          }

          .js-animation-ready .analytics-card,
          .js-animation-ready .metric-label {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
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
