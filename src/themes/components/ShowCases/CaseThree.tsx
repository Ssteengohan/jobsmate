import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import { Observer } from 'gsap/Observer';
import Balancer from 'react-wrap-balancer';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase, SplitText, Observer);
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
  const [currentProgress, setCurrentProgress] = useState(0);
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

  useEffect(() => {
    if (typeof window === 'undefined' || !animationReady) return;

    if (screenSize.isDesktop) {
      const ctx = gsap.context(() => {
        // Create ultra-smooth custom easing curves
        CustomEase.create('ultraSmooth', 'M0,0 C0.16,1 0.3,1 1,1');
        CustomEase.create('chartReveal', 'M0,0 C0.23,1 0.32,1 1,1');
        CustomEase.create('floatIn', 'M0,0 C0.175,0.885 0.32,1.275 1,1');
        CustomEase.create('perfectBounce', 'M0,0 C0.68,-0.55 0.265,1.55 1,1');

        // Master timeline with perfect sequencing
        const masterTl = gsap.timeline({
          paused: true,
          smoothChildTiming: true,
          autoRemoveChildren: false,
        });

        // Initialize all elements with enhanced transforms
        const initTl = gsap.timeline();

        initTl
          .set(contentRef.current, {
            autoAlpha: 0,
            filter: 'blur(8px)',
            willChange: 'opacity, transform, filter',
          })
          .set(titleRef.current, {
            autoAlpha: 0,
            y: -40,
            rotationX: 20,
            transformPerspective: 1200,
            transformOrigin: '50% 100%',
            willChange: 'opacity, transform',
          })
          .set(chartRef.current, {
            autoAlpha: 0,
            scale: 0.7,
            y: 60,
            rotationY: 15,
            transformPerspective: 1200,
            filter: 'blur(4px)',
            willChange: 'opacity, transform, filter',
            transformOrigin: 'center center',
          })
          .set(logoRef.current, {
            autoAlpha: 0,
            scale: 0.6,
            y: 80,
            rotation: -10,
            filter: 'blur(2px)',
            willChange: 'opacity, transform, filter',
            transformOrigin: 'center center',
          });

        const analyticCards = gsap.utils.toArray('.analytics-card');
        initTl.set(analyticCards, {
          autoAlpha: 0,
          x: 60,
          y: 20,
          scale: 0.8,
          rotationY: 25,
          transformPerspective: 1000,
          filter: 'blur(2px)',
          willChange: 'opacity, transform, filter',
          transformOrigin: 'center center',
        });

        const chartLines = gsap.utils.toArray('.chart-line');
        initTl.set(chartLines, {
          scaleY: 0,
          scaleX: 0.6,
          transformOrigin: 'bottom center',
          filter: 'saturate(0.3)',
          willChange: 'transform, filter',
          backfaceVisibility: 'hidden',
        });

        const metricLabels = gsap.utils.toArray('.metric-label');
        initTl.set(metricLabels, {
          autoAlpha: 0,
          y: 25,
          scale: 0.8,
          rotationX: 15,
          transformPerspective: 800,
          willChange: 'opacity, transform',
        });

        // Stage 1: Foundation reveal (0% - 15%)
        masterTl
          .to(
            contentRef.current,
            {
              autoAlpha: 1,
              filter: 'blur(0px)',
              duration: 1.2,
              ease: 'ultraSmooth',
            },
            0,
          )

          // Stage 2: Title dramatic entrance (15% - 25%)
          .to(
            titleRef.current,
            {
              autoAlpha: 1,
              y: 0,
              rotationX: 0,
              duration: 1.0,
              ease: 'perfectBounce',
            },
            0.15,
          )

          // Stage 3: Chart container reveal (25% - 40%)
          .to(
            chartRef.current,
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              rotationY: 0,
              filter: 'blur(0px)',
              duration: 1.2,
              ease: 'floatIn',
            },
            0.25,
          )

          // Stage 4: Chart data visualization (40% - 70%)
          .to(
            chartLines.filter((_, i) => i % 2 === 0),
            {
              scaleY: 1,
              scaleX: 1,
              filter: 'saturate(1)',
              stagger: {
                each: 0.08,
                ease: 'power2.out',
                from: 'start',
              },
              duration: 0.8,
              ease: 'chartReveal',
            },
            0.4,
          )

          .to(
            chartLines.filter((_, i) => i % 2 === 1),
            {
              scaleY: 1,
              scaleX: 1,
              filter: 'saturate(1.2)',
              stagger: {
                each: 0.06,
                ease: 'power2.out',
                from: 'start',
              },
              duration: 0.6,
              ease: 'perfectBounce',
            },
            0.5,
          )

          // Stage 5: Metrics revelation (60% - 75%)
          .to(
            metricLabels,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              stagger: {
                each: 0.04,
                ease: 'power2.out',
              },
              duration: 0.6,
              ease: 'floatIn',
            },
            0.6,
          )

          // Stage 6: Logo prominence (70% - 85%)
          .to(
            logoRef.current,
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              rotation: 0,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'perfectBounce',
            },
            0.7,
          )

          // Stage 7: Analytics cards cascade (75% - 100%)
          .to(
            analyticCards,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationY: 0,
              filter: 'blur(0px)',
              stagger: {
                each: 0.06,
                ease: 'power2.out',
                from: 'start',
              },
              duration: 0.7,
              ease: 'floatIn',
            },
            0.75,
          );

        // Continuous animations
        gsap.to('.pulse-element', {
          scale: 1.06,
          repeat: -1,
          yoyo: true,
          duration: 2.5,
          ease: 'sine.inOut',
          transformOrigin: 'center center',
        });

        gsap.to('.pattern-grid', {
          backgroundPosition: '28px 28px',
          duration: 45,
          repeat: -1,
          ease: 'none',
        });

        gsap.to('.pattern-dots', {
          backgroundPosition: '32px 32px',
          duration: 50,
          repeat: -1,
          ease: 'none',
        });

        // Enhanced ScrollTrigger with perfect momentum
        let velocity = 0;
        let currentProgress = 0;
        let targetProgress = 0;

        const updateProgress = () => {
          // Smooth momentum-based progress
          currentProgress += (targetProgress - currentProgress) * 0.08;

          // Ultra-smooth easing function
          const smoothProgress = CustomEase.create(
            'scrollSmooth',
            'M0,0 C0.25,0.1 0.25,1 1,1',
          )(currentProgress);

          masterTl.progress(smoothProgress);
          setCurrentProgress(smoothProgress);

          if (Math.abs(targetProgress - currentProgress) > 0.001) {
            requestAnimationFrame(updateProgress);
          }
        };

        if (stickyWrapperRef.current && containerRef.current) {
          ScrollTrigger.create({
            trigger: stickyWrapperRef.current,
            start: 'top 8%',
            end: 'bottom 8%',
            pin: containerRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            pinReparent: false,
            refreshPriority: 10,
            id: 'case-three-pin',
            onEnter: () => {
              targetProgress = 0;
              updateProgress();
            },
            onLeaveBack: () => {
              targetProgress = 0;
              updateProgress();
            },
            onLeave: () => {
              targetProgress = 1;
              updateProgress();
            },
          });

          ScrollTrigger.create({
            trigger: stickyWrapperRef.current,
            start: 'top 50%',
            end: 'bottom 20%',
            onUpdate: (self) => {
              velocity = self.getVelocity() / -300;
              const rawProgress = Math.max(0, Math.min(1, self.progress));

              // Enhanced progress mapping with velocity consideration
              const velocityInfluence = Math.max(-0.1, Math.min(0.1, velocity * 0.001));
              targetProgress = rawProgress + velocityInfluence;
              targetProgress = Math.max(0, Math.min(1, targetProgress));

              requestAnimationFrame(updateProgress);
            },
            scrub: false, // We handle smoothing manually
            refreshPriority: 15,
            id: 'case-three-smooth-animation',
          });
        }

        return () => {
          // Cleanup
        };
      }, containerRef);

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 200);

      return () => {
        clearTimeout(refreshTimeout);
        if (ctx) ctx.revert();
      };
    }
  }, [animationReady, screenSize.isDesktop]);

  useEffect(() => {
    if (typeof window === 'undefined' || !animationReady) return;

    if (!screenSize.isDesktop) {
      const ctx = gsap.context(() => {
        // Mobile ultra-smooth easing
        CustomEase.create('mobileUltraSmooth', 'M0,0 C0.2,0 0.38,1 1,1');
        CustomEase.create('mobilePerfectFloat', 'M0,0 C0.175,0.885 0.32,1.275 1,1');

        // Mobile master timeline
        const mobileMasterTl = gsap.timeline({ paused: true });

        // Enhanced mobile initialization
        gsap.set([titleRef.current, chartRef.current, logoRef.current], {
          autoAlpha: 0,
          y: 30,
          scale: 0.9,
          rotationX: 8,
          transformPerspective: 1000,
          filter: 'blur(3px)',
          willChange: 'opacity, transform, filter',
        });

        const chartLines = gsap.utils.toArray('.chart-line');
        gsap.set(chartLines, {
          autoAlpha: 1,
          scaleY: 0,
          scaleX: 0.8,
          transformOrigin: 'bottom center',
          filter: 'saturate(0.4)',
          willChange: 'transform, filter',
          backfaceVisibility: 'hidden',
        });

        gsap.set('.metric-label', {
          autoAlpha: 0,
          y: 20,
          scale: 0.9,
          filter: 'blur(1px)',
          willChange: 'opacity, transform, filter',
        });

        const cards = gsap.utils.toArray('.analytics-card');
        gsap.set(cards, {
          autoAlpha: 0,
          y: 40,
          scale: 0.85,
          filter: 'blur(2px)',
          willChange: 'opacity, transform, filter',
        });

        // Mobile animation sequence
        mobileMasterTl
          .to(
            titleRef.current,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: 'blur(0px)',
              duration: 1.0,
              ease: 'mobilePerfectFloat',
            },
            0,
          )
          .to(
            chartRef.current,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: 'blur(0px)',
              duration: 1.2,
              ease: 'mobileUltraSmooth',
            },
            0.2,
          )
          .to(
            chartLines.filter((_, i) => i % 2 === 0),
            {
              scaleY: 1,
              scaleX: 1,
              filter: 'saturate(1)',
              stagger: {
                each: 0.12,
                ease: 'power2.out',
              },
              duration: 1.0,
              ease: 'mobileUltraSmooth',
            },
            0.5,
          )
          .to(
            chartLines.filter((_, i) => i % 2 === 1),
            {
              scaleY: 1,
              scaleX: 1,
              filter: 'saturate(1.1)',
              stagger: {
                each: 0.1,
                ease: 'power2.out',
              },
              duration: 0.8,
              ease: 'mobilePerfectFloat',
            },
            0.7,
          )
          .to(
            '.metric-label',
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              stagger: {
                each: 0.08,
                ease: 'power2.out',
              },
              duration: 0.8,
              ease: 'mobileUltraSmooth',
            },
            0.9,
          )
          .to(
            logoRef.current,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              filter: 'blur(0px)',
              duration: 1.0,
              ease: 'mobilePerfectFloat',
            },
            1.0,
          )
          .to(
            cards,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              stagger: {
                each: 0.1,
                ease: 'power2.out',
              },
              duration: 0.9,
              ease: 'mobilePerfectFloat',
            },
            1.2,
          );

        // Mobile continuous animations
        mobileMasterTl.add(() => {
          gsap.to('.pulse-element', {
            scale: 1.05,
            repeat: -1,
            yoyo: true,
            duration: 2.3,
            ease: 'sine.inOut',
          });

          gsap.to('.pattern-grid', {
            backgroundPosition: '20px 20px',
            duration: 35,
            repeat: -1,
            ease: 'none',
          });

          gsap.to('.pattern-dots', {
            backgroundPosition: '24px 24px',
            duration: 40,
            repeat: -1,
            ease: 'none',
          });
        }, 1.0);

        // Mobile smooth ScrollTrigger
        let mobileCurrentProgress = 0;
        let mobileTargetProgress = 0;

        const updateMobileProgress = () => {
          mobileCurrentProgress += (mobileTargetProgress - mobileCurrentProgress) * 0.06;
          const smoothProgress = CustomEase.create(
            'mobileScrollSmooth',
            'M0,0 C0.3,0 0.7,1 1,1',
          )(mobileCurrentProgress);
          mobileMasterTl.progress(smoothProgress);

          if (Math.abs(mobileTargetProgress - mobileCurrentProgress) > 0.001) {
            requestAnimationFrame(updateMobileProgress);
          }
        };

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          onUpdate: (self) => {
            mobileTargetProgress = Math.max(0, Math.min(1, self.progress * 1.1));
            requestAnimationFrame(updateMobileProgress);
          },
          refreshPriority: 8,
          id: 'case-three-mobile-smooth',
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [animationReady, screenSize.isDesktop]);

  return (
    <div
      className={`relative z-40 ${screenSize.isDesktop ? 'mt-[720px]' : '-mt-20 sm:mt-16'}`}
      ref={stickyWrapperRef}
      style={{ position: 'relative', top: 0 }}
    >
      {/* Progress indicator for smooth feedback */}
      {screenSize.isDesktop && (
        <div className="fixed top-1/2 right-4 z-50 h-32 w-1 rounded-full bg-gray-200 opacity-20">
          <div
            className="rounded-full bg-[var(--primary-medium-blue)] transition-all duration-300 ease-out"
            style={{
              height: `${currentProgress * 100}%`,
              width: '100%',
            }}
          />
        </div>
      )}

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
                    href={
                      'https://platform.jobsmate.global/company/onboarding/preferences?_gl=1*1wymypx*_ga*NzU1NTc2NDU5LjE3NDU3NjU2Nzk.*_ga_0YKSTQGZFY*MTc0NTc2NTY3OC4xLjAuMTc0NTc2NTY3OC4wLjAuMA'
                    }
                    target="_blank"
                    aria-label="Explore Jobsmate recruitment platform"
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
                    className="relative z-50 mx-auto mt-4 flex w-full max-w-[500px] flex-col items-center justify-center rounded-lg bg-white/90 p-4 shadow-lg sm:mt-4 sm:p-6 dark:bg-gray-800/90"
                  >
                    <div className="mb-6 flex w-full flex-col space-y-3 sm:mb-12">
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

                  <div className="relative z-50 mx-auto mt-4 flex w-full max-w-[500px] flex-col rounded-lg border border-[var(--primary-medium-blue)]/30 bg-gradient-to-r from-[var(--primary-medium-blue)]/15 to-[var(--primary-gold)]/10 p-3 shadow-sm sm:mt-5 sm:p-4 dark:border-[var(--primary-medium-blue)]/80 dark:from-[var(--primary-medium-blue)]/65 dark:to-[var(--primary-gold)]/15">
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
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        /* Enhanced smooth scrolling styles */
        .chart-line {
          transform-origin: bottom center !important;
          will-change: transform, filter !important;
          backface-visibility: hidden !important;
          transform-style: preserve-3d !important;
        }

        /* Ultra-smooth transitions */
        .analytics-card,
        .metric-label,
        .pulse-element {
          will-change: transform, opacity, filter !important;
          backface-visibility: hidden !important;
          transform-style: preserve-3d !important;
        }

        /* Hardware acceleration for all animated elements */
        .chart-line,
        .analytics-card,
        .metric-label {
          transform: translateZ(0) !important;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth !important;
        }

        /* Override animation settings for mobile/tablet but keep them animatable */
        @media (max-width: 1023px) {
          .js-animation-ready .chart-line,
          .js-animation-ready .analytics-card,
          .js-animation-ready .metric-label {
            opacity: 0;
            transition:
              transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              opacity 0.5s ease-out;
          }

          /* Ensure chart lines remain visible once animated */
          .chart-line {
            min-width: 4px;
            opacity: 1 !important; /* Force visibility */
            transform-origin: bottom !important;
          }

          /* Adjust chart heights for mobile/tablet */
          .chart-line[class*='h-[100px]'] {
            height: 60px !important;
          }
          .chart-line[class*='h-[120px]'] {
            height: 72px !important;
          }
          .chart-line[class*='h-[75px]'] {
            height: 45px !important;
          }
          .chart-line[class*='h-[130px]'] {
            height: 78px !important;
          }
          .chart-line[class*='h-[135px]'] {
            height: 80px !important;
          }

          /* Make the gold bars (hire bars) proportionally correct but shorter */
          .chart-line[class*='bg-[var(--primary-gold)]'] {
            height: 10px !important;
          }

          /* At tablet size, make chart lines a bit taller than mobile but still shorter than desktop */
          @media (min-width: 768px) and (max-width: 1023px) {
            .chart-line[class*='h-[100px]'] {
              height: 80px !important;
            }
            .chart-line[class*='h-[120px]'] {
              height: 96px !important;
            }
            .chart-line[class*='h-[75px]'] {
              height: 60px !important;
            }
            .chart-line[class*='h-[130px]'] {
              height: 104px !important;
            }
            .chart-line[class*='h-[135px]'] {
              height: 108px !important;
            }

            .chart-line[class*='bg-[var(--primary-gold)]'] {
              height: 13px !important;
            }
          }

          /* Improve text readability on small screens */
          .text-[10px] {
            font-size: 9px;
          }

          /* Reduce animation jank on mobile */
          .analytics-card,
          .chart-line,
          .metric-label,
          .pulse-element {
            backface-visibility: hidden;
          }
        }

        /* Optimize mobile performance */
        @media (max-width: 768px) {
          html,
          body {
            scroll-behavior: auto;
          }

          /* Better touch scrolling */
          .chart-line,
          .analytics-card,
          .metric-label {
            -webkit-tap-highlight-color: transparent;
          }

          /* Ensure chart lines animate on mobile */
          .chart-line {
            min-height: 5px; /* Ensure min height for visibility */
            will-change: transform;
            transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
          }

          /* Reduce motion for users who prefer it */
          @media (prefers-reduced-motion: reduce) {
            .chart-line,
            .analytics-card,
            .metric-label,
            .pulse-element {
              transition-duration: 0.1s !important;
              animation-duration: 0.1s !important;
            }
          }
        }

        /* Enhance the animation transition */
        .chart-line {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
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
