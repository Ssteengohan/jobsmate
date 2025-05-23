import Link from 'next/link';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Balancer from 'react-wrap-balancer';
import {
  ArrowRight,
  Users,
  Briefcase,
  ClipboardCheck,
  Award,
  LineChart,
  Check,
  X,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { useScrollData } from '@/themes/lib/lenis';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    ScrollTrigger,
    MotionPathPlugin,
    TextPlugin,
    DrawSVGPlugin,
    MorphSVGPlugin,
    SplitText,
    CustomEase,
  );
}

interface ScreenSize {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface SaasIconProps {
  children: ReactNode;
  className?: string;
}

const SaasIcon = ({ children, className = '' }: SaasIconProps) => (
  <div
    className={`flex h-5 w-5 items-center justify-center rounded-md bg-[#4dabf7] text-white ${className}`}
  >
    {children}
  </div>
);

interface SliderItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  iconColor: string;
  iconBgColor: string;
  className?: string;
}

const SliderItem = ({
  icon,
  label,
  isActive = false,
  iconColor,
  iconBgColor,
  className = '',
}: SliderItemProps) => {
  return (
    <div
      className={`slider-item flex items-center gap-3 rounded-lg border-1 ${
        isActive
          ? 'border-gray-400/30 bg-gradient-to-r from-white to-gray-50 shadow-[0_0px_15px_0px_rgba(0,0,0,0.1)] dark:from-gray-800 dark:to-gray-900'
          : 'border-gray-400/10 opacity-65 grayscale-[30%] filter'
      } px-6 py-3 transition-all duration-300 ${
        isActive
          ? 'hover:shadow-[0_0px_20px_0px_rgba(0,0,0,0.15)]'
          : 'hover:opacity-80 hover:grayscale-[0%]'
      } ${className}`}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-md"
        style={{ backgroundColor: isActive ? iconBgColor : '#e2e8f0', opacity: isActive ? 1 : 0.6 }}
      >
        <div style={{ color: isActive ? iconColor : '#94a3b8' }}>{icon}</div>
      </div>
      <span className={`text-lg ${isActive ? 'font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
        {label}
      </span>
    </div>
  );
};

const CaseOne = () => {
  const { isScrolling } = useScrollData();
  const [animationReady, setAnimationReady] = useState(false);
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);
  const container3Ref = useRef<HTMLDivElement>(null);
  const container4Ref = useRef<HTMLDivElement>(null);
  const container5Ref = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLSpanElement>(null);
  const badge2Ref = useRef<HTMLSpanElement>(null);
  const svgRef1 = useRef<SVGSVGElement>(null);
  const svgRef2 = useRef<SVGSVGElement>(null);
  const svgRef3 = useRef<SVGSVGElement>(null);
  const svgRef4 = useRef<SVGSVGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const path4Ref = useRef<SVGPathElement>(null);
  const arrowRef1 = useRef<SVGGElement>(null);
  const arrowRef2 = useRef<SVGGElement>(null);
  const arrowRef3 = useRef<SVGGElement>(null);
  const arrowRef4 = useRef<SVGGElement>(null);

  const leftColumnRef = useRef<HTMLDivElement>(null);
  const middleColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

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

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('js-animation-ready');
      const timer = setTimeout(() => setAnimationReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !animationReady) return;

    // Create custom eases for smoother animations
    CustomEase.create(
      'customBounce',
      'M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.354,0.963 0.362,1 0.374,0.985 0.414,0.934 0.455,0.954 0.519,0.988 0.541,1 0.566,1 0.603,1 0.618,0.957 0.676,0.96 0.727,0.963 0.767,1 0.802,1 0.851,1 0.865,0.952 0.915,0.952 0.937,0.952 0.948,0.967 0.962,0.975 0.975,0.983 1,1 1,1',
    );
    CustomEase.create('customOut', 'M0,0 C0.25,0.46 0.45,0.94 1,1');

    const ctx = gsap.context(() => {
      gsap.set('.slider-item', { clearProps: 'all' });
      gsap.set(
        [
          container1Ref.current,
          container2Ref.current,
          container3Ref.current,
          container4Ref.current,
          container5Ref.current,
          badge1Ref.current,
          badge2Ref.current,
          leftColumnRef.current,
          middleColumnRef.current,
          rightColumnRef.current,
        ].filter(Boolean),
        { clearProps: 'all' },
      );

      if (screenSize.isDesktop) {
        const mainTl = gsap.timeline({
          paused: true,
          smoothChildTiming: true,
          defaults: {
            ease: 'customOut',
            duration: 0.6,
          },
        });

        // Enhanced text animations with SplitText
        if (titleRef.current) {
          const titleSplit = new SplitText(titleRef.current, { type: 'chars,words' });
          gsap.set(titleSplit.chars, {
            y: 20,
            opacity: 0,
            rotationX: -90,
            transformOrigin: '0% 50% -50px',
          });
        }

        if (descriptionRef.current) {
          const descSplit = new SplitText(descriptionRef.current, { type: 'lines,words' });
          gsap.set(descSplit.lines, { y: 30, opacity: 0 });
        }

        const containers = [
          container1Ref.current,
          container2Ref.current,
          container3Ref.current,
          container4Ref.current,
          container5Ref.current,
        ].filter(Boolean);

        const badges = [badge1Ref.current, badge2Ref.current].filter(Boolean);

        const columns = [
          leftColumnRef.current,
          middleColumnRef.current,
          rightColumnRef.current,
        ].filter(Boolean);

        const startCircle = document.querySelector('#svg1 circle[cx="152"][cy="180"]');
        const midCircle = document.querySelector('#svg2 circle[cx="355"][cy="25"]');
        const endCircle = document.querySelector('#svg3 circle[cx="338"][cy="15"]');
        const circles = [startCircle, midCircle, endCircle].filter(Boolean);

        const arrows = [
          arrowRef1.current,
          arrowRef2.current,
          arrowRef3.current,
          arrowRef4.current,
        ].filter(Boolean);

        const paths = [
          path1Ref.current,
          path2Ref.current,
          path3Ref.current,
          path4Ref.current,
        ].filter(Boolean);

        // Enhanced path setup with DrawSVGPlugin
        paths.forEach((path) => {
          if (!path) return;
          gsap.set(path, {
            drawSVG: '0% 0%',
            opacity: 0.8,
          });
        });

        const sliderItems = document.querySelectorAll('.slider-item');
        gsap.set(sliderItems, {
          autoAlpha: 0,
          x: 15,
          filter: 'blur(2px)',
        });

        gsap.set(columns, {
          autoAlpha: 0,
          y: 20,
        });

        gsap.set(containers, {
          autoAlpha: 0,
          y: 20,
          filter: 'blur(5px)',
        });

        gsap.set(badges, {
          autoAlpha: 0,
          y: 15,
          filter: 'blur(3px)',
        });

        gsap.set(circles, {
          autoAlpha: 0,
          scale: 0,
          transformOrigin: 'center center',
        });

        gsap.set(arrows, {
          autoAlpha: 0,
          scale: 0,
          transformOrigin: 'center center',
        });

        // Remove the old strokeDasharray setup
        // paths.forEach((path) => {
        //   if (!path) return;
        //   try {
        //     const pathLength = path.getTotalLength() || 300;
        //     gsap.set(path, {
        //       strokeDasharray: pathLength,
        //       strokeDashoffset: pathLength,
        //     });
        //   } catch {}
        // });

        mainTl.to(
          leftColumnRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'customBounce',
          },
          0,
        );

        // Animated title reveal
        if (titleRef.current) {
          const titleSplit = new SplitText(titleRef.current, { type: 'chars' });
          mainTl.to(
            titleSplit.chars,
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 0.8,
              stagger: 0.02,
              ease: 'back.out(1.7)',
            },
            0.2,
          );
        }

        // Animated description reveal
        if (descriptionRef.current) {
          const descSplit = new SplitText(descriptionRef.current, { type: 'lines' });
          mainTl.to(
            descSplit.lines,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
            },
            0.4,
          );
        }

        mainTl
          .to(
            middleColumnRef.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'customBounce',
            },
            0.3,
          )
          .to(
            rightColumnRef.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'customBounce',
            },
            0.5,
          );

        // Enhanced slider items with better stagger
        mainTl.to(
          sliderItems,
          {
            autoAlpha: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            stagger: {
              amount: 0.8,
              ease: 'power2.out',
            },
            ease: 'customBounce',
          },
          0.6,
        );

        // Enhanced container animations
        mainTl
          .to(
            container1Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              ease: 'customBounce',
            },
            0.8,
          )
          .to(
            badge1Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1.05,
              duration: 0.6,
              ease: 'customBounce',
            },
            1.0,
          )
          .to(
            badge1Ref.current,
            {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            1.3,
          )
          .to(
            startCircle,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.6,
              ease: 'customBounce',
            },
            1.2,
          );

        // Enhanced path drawing with DrawSVGPlugin - make sure it's in the timeline
        mainTl.to(
          path1Ref.current,
          {
            drawSVG: '0% 100%',
            duration: 1.2,
            ease: 'power2.inOut',
          },
          1.4,
        );

        // Enhanced arrow motion with better easing
        if (path1Ref.current && arrowRef1.current) {
          mainTl
            .set(
              arrowRef1.current,
              {
                autoAlpha: 0,
                scale: 0,
              },
              1.4,
            )
            .to(
              arrowRef1.current,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 1.2,
                motionPath: {
                  path: path1Ref.current,
                  align: path1Ref.current,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                  start: 0,
                  end: 1,
                },
                ease: 'customOut',
              },
              1.4,
            );
        }

        mainTl
          .to(
            container2Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              ease: 'customBounce',
            },
            2.4,
          )
          .to(
            badge2Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1.05,
              duration: 0.6,
              ease: 'customBounce',
            },
            2.6,
          )
          .to(
            badge2Ref.current,
            {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            2.9,
          )
          .to(
            midCircle,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.6,
              ease: 'customBounce',
            },
            2.8,
          )
          .to(
            path2Ref.current,
            {
              drawSVG: '0% 100%',
              duration: 1.2,
              ease: 'power2.inOut',
            },
            3.0,
          );

        // Enhanced second arrow animation
        if (path2Ref.current && arrowRef2.current) {
          mainTl
            .set(
              arrowRef2.current,
              {
                autoAlpha: 0,
                scale: 0,
              },
              3.0,
            )
            .to(
              arrowRef2.current,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 1.2,
                motionPath: {
                  path: path2Ref.current,
                  align: path2Ref.current,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                  start: 0,
                  end: 1,
                },
                ease: 'customOut',
              },
              3.0,
            );
        }

        mainTl
          .to(
            container3Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              ease: 'customBounce',
            },
            4.0,
          )
          .to(
            [container4Ref.current, container5Ref.current],
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              stagger: 0.2,
              ease: 'customBounce',
            },
            4.2,
          )
          .to(
            endCircle,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.6,
              ease: 'customBounce',
            },
            4.4,
          );

        // Enhanced final paths with simultaneous drawing
        mainTl.to(
          [path3Ref.current, path4Ref.current],
          {
            drawSVG: '0% 100%',
            duration: 1.0,
            stagger: 0.1,
            ease: 'power2.inOut',
          },
          4.6,
        );

        // Enhanced final arrows with better coordination
        if (path3Ref.current && arrowRef3.current) {
          mainTl
            .set(
              arrowRef3.current,
              {
                autoAlpha: 0,
                scale: 0,
              },
              4.6,
            )
            .to(
              arrowRef3.current,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 1.0,
                motionPath: {
                  path: path3Ref.current,
                  align: path3Ref.current,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: true,
                  start: 0,
                  end: 1,
                },
                ease: 'customOut',
              },
              4.6,
            );
        }

        if (path4Ref.current && arrowRef4.current) {
          mainTl
            .set(
              arrowRef4.current,
              {
                autoAlpha: 0,
                scale: 0,
              },
              4.7,
            )
            .to(
              arrowRef4.current,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 1.0,
                motionPath: {
                  path: path4Ref.current,
                  align: path4Ref.current,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: true,
                  start: 0,
                  end: 1,
                },
                ease: 'customOut',
              },
              4.7,
            );
        }

        // Enhanced ScrollTrigger with better performance
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
            invalidateOnRefresh: true,
            id: 'case-one-pin',
            onLeaveBack: () => {
              mainTl.progress(0);
            },
            onLeave: () => {
              mainTl.progress(1);
            },
            markers: false,
          });
        }

        ScrollTrigger.create({
          trigger: stickyWrapperRef.current,
          start: 'top 60%',
          end: 'bottom 20%',
          onUpdate: (self) => {
            const rawProgress = Math.min(self.progress, 1);
            // Enhanced easing with CustomEase
            const easedProgress = CustomEase.create(
              'scrollEase',
              'M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1',
            )(rawProgress);
            mainTl.progress(easedProgress);
          },
          scrub: 0.8,
          preventOverlaps: true,
          fastScrollEnd: true,
          markers: false,
          id: 'case-one-animation',
        });
      } else {
        // Enhanced mobile animations
        const mainTl = gsap.timeline({
          paused: true,
          smoothChildTiming: true,
          defaults: {
            ease: 'customOut',
            duration: 0.6,
          },
        });

        const containers = [
          container1Ref.current,
          container2Ref.current,
          container3Ref.current,
          container4Ref.current,
          container5Ref.current,
        ].filter(Boolean);

        const badges = [badge1Ref.current, badge2Ref.current].filter(Boolean);

        const columns = [
          leftColumnRef.current,
          middleColumnRef.current,
          rightColumnRef.current,
        ].filter(Boolean);

        const sliderItems = document.querySelectorAll('.slider-item');

        gsap.set(sliderItems, {
          autoAlpha: 0,
          y: 15,
          filter: 'blur(2px)',
        });

        gsap.set(columns, {
          autoAlpha: 0,
          y: 15,
        });

        gsap.set(containers, {
          autoAlpha: 0,
          y: 20,
          filter: 'blur(3px)',
        });

        gsap.set(badges, {
          autoAlpha: 0,
          y: 10,
          filter: 'blur(2px)',
        });

        // Enhanced mobile timeline with SplitText
        if (titleRef.current) {
          const titleSplit = new SplitText(titleRef.current, { type: 'words' });
          gsap.set(titleSplit.words, { y: 30, opacity: 0 });
          mainTl.to(
            titleSplit.words,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'customBounce',
            },
            0.2,
          );
        }

        mainTl
          .to(
            leftColumnRef.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'customBounce',
            },
            0,
          )
          .to(
            sliderItems,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              stagger: {
                amount: 0.6,
                ease: 'power2.out',
              },
              duration: 0.7,
              ease: 'customBounce',
            },
            0.4,
          )
          .to(
            middleColumnRef.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'customBounce',
            },
            0.6,
          )
          .to(
            rightColumnRef.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'customBounce',
            },
            0.8,
          )
          .to(
            container1Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              ease: 'customBounce',
            },
            1.0,
          )
          .to(
            badge1Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1.05,
              duration: 0.6,
              ease: 'customBounce',
            },
            1.2,
          )
          .to(
            badge1Ref.current,
            {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            1.5,
          )
          .to(
            container2Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              ease: 'customBounce',
            },
            1.8,
          )
          .to(
            badge2Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1.05,
              duration: 0.6,
              ease: 'customBounce',
            },
            2.0,
          )
          .to(
            badge2Ref.current,
            {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            2.3,
          )
          .to(
            container3Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              ease: 'customBounce',
            },
            2.6,
          )
          .to(
            container4Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              ease: 'customBounce',
            },
            2.8,
          )
          .to(
            container5Ref.current,
            {
              autoAlpha: 0.8,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              ease: 'customBounce',
            },
            3.0,
          );

        if (containerRef.current) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            onUpdate: (self) => {
              const rawProgress = Math.min(self.progress * 1.2, 1);
              const easedProgress = CustomEase.create(
                'mobileScrollEase',
                'M0,0 C0.215,0.61 0.355,1 1,1',
              )(rawProgress);
              mainTl.progress(easedProgress);
            },
            scrub: 0.3,
            markers: false,
            id: 'case-one-mobile-animation',
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isScrolling, animationReady, screenSize.isDesktop, screenSize.width]);

  return (
    <div className="relative" id="about-us" ref={stickyWrapperRef}>
      <div className={screenSize.isDesktop ? 'h-[100vh]' : 'h-auto min-h-[100vh]'}>
        <div
          className={`translate-z-0 border-t border-b border-black/20 dark:border-white/30 ${
            screenSize.isDesktop ? 'flex h-[800px]' : 'flex h-auto flex-col py-8'
          }`}
          ref={containerRef}
        >
          <div
            ref={leftColumnRef}
            className={`flex flex-col justify-between gap-2 lg:pt-10 ${
              screenSize.isDesktop ? 'h-full w-1/4' : 'mb-8 h-auto w-full'
            }`}
          >
            <div className="container flex w-full flex-col gap-2">
              <h2 ref={titleRef} className="text-xl font-semibold">
                Hire local or global
              </h2>
              <div ref={descriptionRef}>
                <Balancer className="w-full text-gray-600 *:text-sm sm:w-3/4 md:text-base dark:text-gray-400">
                  Streamline your hiring process with our tools and integrations to attract talent.
                </Balancer>
              </div>
            </div>
            <Link
              href={
                'https://platform.jobsmate.global/company/onboarding/preferences?_gl=1*1wymypx*_ga*NzU1NTc2NDU5LjE3NDU3NjU2Nzk.*_ga_0YKSTQGZFY*MTc0NTc2NTY3OC4xLjAuMTc0NTc2NTY3OC4wLjAuMA'
              }
              target="_blank"
              className="group relative flex w-fit items-center gap-1 px-4 font-semibold md:pb-20"
              aria-label="Explore Jobsmate hiring platform"
            >
              <span className="relative inline-block">
                Explore platform
                <span className="absolute bottom-[-4px] left-0 h-[1px] w-0 bg-current transition-all duration-500 ease-out group-hover:w-full"></span>
              </span>
              <ArrowRight className="inline h-4 w-4 transform transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
          <div
            ref={middleColumnRef}
            className={`relative flex flex-col overflow-hidden border-black/20 dark:border-white/30 ${
              screenSize.isDesktop
                ? 'w-2/4 gap-32 border-r border-l'
                : 'w-full gap-4 border-t border-b px-4 py-8 sm:gap-16'
            }`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-medium-blue)]/5 via-transparent to-[var(--primary-gold)]/5"></div>
              <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-medium-blue)_0.8px,transparent_0.8px)] [background-size:14px_14px]"></div>
              <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-gold)_0.8px,transparent_0.8px)] [background-size:18px_18px]"></div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-[var(--neutral-50)]/30"></div>
            </div>

            {screenSize.isDesktop && (
              <>
                <div className="pointer-events-none absolute inset-0 z-[15] hidden lg:block">
                  <svg
                    id="svg1"
                    width="100%"
                    height="60%"
                    className="overflow-visible"
                    ref={svgRef1}
                  >
                    <defs>
                      <linearGradient
                        id="gradientFlow1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop id="gradientStop1" offset="0" stopColor="#4dabf7" />
                        <stop offset="0.3" stopColor="#74c0fc" />
                        <stop id="gradientStop2" offset="0.5" stopColor="var(--primary-gold)" />
                        <stop offset="0.7" stopColor="#74c0fc" />
                        <stop offset="1" stopColor="#4dabf7" />
                      </linearGradient>
                    </defs>

                    <circle cx="152" cy="180" r="8" fill="white" stroke="#4dabf7" strokeWidth="2" />

                    <path
                      ref={path1Ref}
                      d="M 152 195 
                        L 152 190 
                        C 145 280, 180 260, 280 260
                        S 345 355, 355 340"
                      fill="none"
                      stroke="url(#gradientFlow1)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="opacity-90"
                    />

                    <g id="arrowGroup1" ref={arrowRef1} opacity="0">
                      <polygon
                        id="arrowTriangle1"
                        points="-4,-4 6,-4 0,6"
                        fill="var(--primary-gold)"
                        fillOpacity="0.9"
                        filter="drop-shadow(0 0 2px rgba(240, 180, 41, 0.5))"
                      />
                    </g>
                  </svg>
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-[50%] bottom-0 z-[15]">
                  <svg
                    id="svg2"
                    width="100%"
                    height="100%"
                    className="overflow-visible"
                    ref={svgRef2}
                  >
                    <defs>
                      <linearGradient
                        id="gradientFlow2"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop id="gradientStop3" offset="0" stopColor="#4dabf7" />
                        <stop offset="0.3" stopColor="#74c0fc" />
                        <stop id="gradientStop4" offset="0.5" stopColor="var(--primary-gold)" />
                        <stop offset="0.7" stopColor="#74c0fc" />
                        <stop offset="1" stopColor="#4dabf7" />
                      </linearGradient>
                    </defs>

                    <circle cx="355" cy="25" r="8" fill="white" stroke="#4dabf7" strokeWidth="2" />

                    <path
                      ref={path2Ref}
                      d="M 355 33
                        C 345 170, 190 80, 190 125
                        S 190 210, 190, 215"
                      fill="none"
                      stroke="url(#gradientFlow2)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="opacity-90"
                    />

                    <g id="arrowGroup2" ref={arrowRef2} opacity="0">
                      <polygon
                        id="arrowTriangle2"
                        points="-4,-4 4,-4 0,6"
                        fill="var(--primary-gold)"
                        fillOpacity="0.9"
                        filter="drop-shadow(0 0 2px rgba(240, 180, 41, 0.5))"
                      />
                    </g>
                  </svg>
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-[80%] bottom-0 z-[15]">
                  <svg
                    id="svg3"
                    width="100%"
                    height="10%"
                    className="overflow-visible"
                    ref={svgRef3}
                  >
                    <defs>
                      <linearGradient
                        id="gradientFlow3"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop id="gradientStop5" offset="0" stopColor="#4dabf7" />
                        <stop offset="0.3" stopColor="#74c0fc" />
                        <stop id="gradientStop6" offset="0.5" stopColor="var(--primary-gold)" />
                        <stop offset="0.7" stopColor="#74c0fc" />
                        <stop offset="1" stopColor="#4dabf7" />
                      </linearGradient>
                    </defs>

                    <circle cx="338" cy="15" r="8" fill="white" stroke="#4dabf7" strokeWidth="2" />

                    <path
                      ref={path3Ref}
                      d="M 345 15 C 380 15 445 -25 485 -50"
                      fill="none"
                      stroke="url(#gradientFlow3)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="opacity-90"
                    />

                    <g id="arrowGroup3" ref={arrowRef3} opacity="0">
                      <polygon
                        id="arrowTriangle3"
                        points="-4,-4 -4,4 6,0"
                        fill="var(--primary-gold)"
                        fillOpacity="0.9"
                        filter="drop-shadow(0 0 4px rgba(240, 180, 41, 0.7))"
                      />
                    </g>
                  </svg>
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-[80%] bottom-0 z-[15]">
                  <svg
                    id="svg4"
                    width="100%"
                    height="10%"
                    className="overflow-visible"
                    ref={svgRef4}
                  >
                    <defs>
                      <linearGradient
                        id="gradientFlow4"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                        gradientUnits="userSpaceOnUse"
                        className="opacity-50"
                      >
                        <stop id="gradientStop7" offset="0" stopColor="#4dabf7" />
                        <stop offset="0.3" stopColor="#74c0fc" />
                        <stop id="gradientStop8" offset="0.5" stopColor="var(--primary-gold)" />
                        <stop offset="0.7" stopColor="#74c0fc" />
                        <stop offset="1" stopColor="#4dabf7" />
                      </linearGradient>
                    </defs>

                    <path
                      ref={path4Ref}
                      d="M 344 14 C 380 60 380 80 485 85"
                      fill="none"
                      stroke="url(#gradientFlow4)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="opacity-50"
                      style={{ filter: 'grayscale(40%)' }}
                    />

                    <g id="arrowGroup4" ref={arrowRef4} opacity="0">
                      <polygon
                        id="arrowTriangle4"
                        points="-4,-4 -4,4 6,0"
                        fill="var(--primary-gold)"
                        fillOpacity="0.7"
                        filter="drop-shadow(0 0 4px rgba(240, 180, 41, 0.5)) grayscale(40%)"
                      />
                    </g>
                  </svg>
                </div>
              </>
            )}

            <div
              ref={container1Ref}
              className="container-1 relative z-10 flex w-fit flex-col items-end gap-2 pt-6 pl-6 sm:pt-15 sm:pl-12"
            >
              <span
                ref={badge1Ref}
                className="flex w-fit items-center justify-end rounded-sm bg-[#b8e6f9] px-2 py-1 text-[11px] font-bold text-[#05253c]"
              >
                <SaasIcon className="mr-2 h-5 w-5">
                  <Users className="h-3 w-3" />
                </SaasIcon>
                100+ Applicants
              </span>
              <div className="flex w-fit flex-col gap-0.5 rounded-2xl border-[0.5px] border-black/40 bg-white px-3 py-3">
                <span className="flex items-center justify-center text-center font-bold text-[#05253c]">
                  <SaasIcon className="mr-2">
                    <Briefcase className="h-3 w-3" />
                  </SaasIcon>
                  Job posted
                </span>
                <hr className="h-[2px] w-full text-gray-400/50" />
                <span className="pt-2 text-[10px] text-[#05253c]">
                  Post a job on Linkedin or Jobsmate
                </span>
              </div>
            </div>
            <div
              ref={container2Ref}
              className={`container-2 relative z-10 flex w-fit flex-col items-end gap-2 ${
                screenSize.isDesktop ? 'pl-64' : 'pl-6 sm:pl-12'
              }`}
            >
              <span
                ref={badge2Ref}
                className="flex w-fit items-center justify-end rounded-sm bg-[#b8e6f9] px-2 py-1 text-[11px] font-bold text-[#05253c]"
              >
                <SaasIcon className="mr-2 h-5 w-5">
                  <ClipboardCheck className="h-3 w-3" />
                </SaasIcon>
                70 Assessments
              </span>
              <div className="flex w-fit flex-col gap-0.5 rounded-2xl border-[0.5px] border-black/40 bg-white px-3 py-3">
                <span className="flex items-center justify-center text-center font-bold text-[#05253c]">
                  <SaasIcon className="mr-2">
                    <Award className="h-3 w-3" />
                  </SaasIcon>
                  Assess Skills
                </span>
                <hr className="h-[2px] w-full text-gray-400/50" />
                <span className="pt-2 text-[10px] text-[#05253c]">
                  Let candidates make a coding Assessments
                </span>
              </div>
            </div>
            <div className={`flex ${screenSize.isDesktop ? 'justify-between' : 'flex-col gap-8'}`}>
              <div
                ref={container3Ref}
                className="container-3 relative z-10 flex w-fit flex-col items-end gap-2 pl-6 sm:pl-12 lg:pt-17 lg:pl-15"
              >
                <div className="flex w-fit flex-col gap-0.5 rounded-2xl border-[0.5px] border-black/40 bg-white px-3 py-3">
                  <span className="flex items-center justify-center text-center font-bold text-[#05253c]">
                    <SaasIcon className="mr-2">
                      <LineChart className="h-3 w-3" />
                    </SaasIcon>
                    Applicant Tracking System
                  </span>
                  <hr className="h-[2px] w-full text-gray-400/50" />
                  <span className="pt-2 text-center text-[10px] text-[#05253c]">
                    Receive candidate information
                  </span>
                </div>
              </div>
              <div
                className={`flex ${
                  screenSize.isDesktop
                    ? 'flex-col gap-12'
                    : 'flex-row flex-wrap gap-6 pl-6 sm:pl-12'
                }`}
              >
                <div
                  ref={container4Ref}
                  className="container-3 relative z-10 flex w-fit flex-col items-end gap-2 pr-2 sm:pr-6"
                >
                  <div className="flex w-fit flex-col gap-0.5 rounded-2xl border-[0.5px] border-black/40 bg-white px-3 py-3">
                    <span className="flex items-center justify-center text-center font-bold text-[#05253c]">
                      <SaasIcon className="mr-2 bg-green-500">
                        <Check className="h-3 w-3" />
                      </SaasIcon>
                      Interview
                    </span>
                    <hr className="h-[2px] w-full text-gray-400/50" />
                    <Balancer className="pt-2 text-center text-[10px] text-[#05253c]">
                      interview candidate or invite for the next stage
                    </Balancer>
                  </div>
                </div>
                <div
                  ref={container5Ref}
                  className="container-5 relative z-10 flex w-fit flex-col items-end gap-2 pr-2 opacity-80 sm:pr-6"
                >
                  <div className="flex w-fit flex-col gap-0.5 rounded-2xl border-[0.5px] border-black/30 bg-white/90 px-3 py-3 grayscale-[30%] filter">
                    <span className="flex items-center justify-center text-center font-bold text-[#05253c]">
                      <SaasIcon className="mr-2 bg-red-500">
                        <X className="h-3 w-3" />
                      </SaasIcon>
                      Pass on application
                    </span>
                    <hr className="h-[2px] w-full text-gray-400/30" />
                    <Balancer className="pt-2 text-center text-[10px] text-[#05253c]/80">
                      Decide not to proceed with the application
                    </Balancer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={rightColumnRef}
            className={`flex flex-col ${
              screenSize.isDesktop ? 'w-1/4' : 'w-full px-4 py-8'
            } items-center justify-between`}
          >
            <div
              className={`flex ${
                screenSize.isDesktop ? 'flex-col' : 'flex-row flex-wrap'
              } justify-center gap-4 px-2 pt-0 sm:px-9`}
            >
              <SliderItem
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#0891b2"
                  >
                    <rect
                      x="1.25"
                      y="1.25"
                      width="4"
                      height="4"
                      rx="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <rect
                      x="6.75"
                      y="6.75"
                      width="4"
                      height="4"
                      rx="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <path
                      d="M2 7.25V8.00084C2 9.10541 2.89543 10.0008 4 10.0008H4.75"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M10 4.75L10 3.99916C10 2.89459 9.10457 1.99916 8 1.99916L7.25 1.99916"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                }
                label="New Applicant"
                iconColor="#0891b2"
                iconBgColor="#cffafe"
                className="slider-item"
              />
              <SliderItem
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#9333ea"
                  >
                    <rect
                      x="1.25"
                      y="1.25"
                      width="4"
                      height="4"
                      rx="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <rect
                      x="6.75"
                      y="6.75"
                      width="4"
                      height="4"
                      rx="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <path
                      d="M2 7.25V8.00084C2 9.10541 2.89543 10.0008 4 10.0008H4.75"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M10 4.75L10 3.99916C10 2.89459 9.10457 1.99916 8 1.99916L7.25 1.99916"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                }
                label="Monitor Anti-cheating"
                iconColor="#9333ea"
                iconBgColor="#f3e8ff"
                className="slider-item"
              />
              <SliderItem
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#16a34a"
                  >
                    <rect
                      x="1.25"
                      y="1.25"
                      width="4"
                      height="4"
                      rx="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <rect
                      x="6.75"
                      y="6.75"
                      width="4"
                      height="4"
                      rx="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <path
                      d="M2 7.25V8.00084C2 9.10541 2.89543 10.0008 4 10.0008H4.75"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M10 4.75L10 3.99916C10 2.89459 9.10457 1.99916 8 1.99916L7.25 1.99916"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                }
                label="Software engineer"
                isActive={true}
                iconColor="#16a34a"
                iconBgColor="#dcfce7"
                className="slider-item"
              />
              <SliderItem
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ea580c"
                  >
                    <rect
                      x="1.25"
                      y="1.25"
                      width="4"
                      height="4"
                      rx="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <rect
                      x="6.75"
                      y="6.75"
                      width="4"
                      height="4"
                      rx="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <path
                      d="M2 7.25V8.00084C2 9.10541 2.89543 10.0008 4 10.0008H4.75"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M10 4.75L10 3.99916C10 2.89459 9.10457 1.99916 8 1.99916L7.25 1.99916"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                }
                label="Ranked matches"
                iconColor="#ea580c"
                iconBgColor="#ffedd5"
                className="slider-item"
              />
              <SliderItem
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#4f46e5"
                  >
                    <rect
                      x="1.25"
                      y="1.25"
                      width="4"
                      height="4"
                      rx="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <rect
                      x="6.75"
                      y="6.75"
                      width="4"
                      height="4"
                      rx="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <path
                      d="M2 7.25V8.00084C2 9.10541 2.89543 10.0008 4 10.0008H4.75"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M10 4.75L10 3.99916C10 2.89459 9.10457 1.99916 8 1.99916L7.25 1.99916"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                }
                label="Assessed candidate"
                iconColor="#4f46e5"
                iconBgColor="#e0e7ff"
                className="slider-item"
              />
              <SliderItem
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#db2777"
                  >
                    <rect
                      x="1.25"
                      y="1.25"
                      width="4"
                      height="4"
                      rx="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <rect
                      x="6.75"
                      y="6.75"
                      width="4"
                      height="4"
                      rx="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <path
                      d="M2 7.25V8.00084C2 9.10541 2.89543 10.0008 4 10.0008H4.75"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M10 4.75L10 3.99916C10 2.89459 9.10457 1.99916 8 1.99916L7.25 1.99916"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                }
                label="Favorite Applicants"
                iconColor="#db2777"
                iconBgColor="#fce7f3"
                className="slider-item"
              />
            </div>
            <div
              className={`mx-auto flex w-full items-center justify-center ${
                screenSize.isDesktop
                  ? 'h-full border-t-2 border-black/10 dark:border-white/30'
                  : 'mt-4 h-auto border-t border-black/10 py-8 dark:border-white/30'
              }`}
            >
              <Image src="jobsmate-mob.svg" alt="Home icon" width={200} height={200} />
            </div>
          </div>
          <style jsx global>{`
            .js-animation-ready .container-1,
            .js-animation-ready .container-2,
            .js-animation-ready .container-3,
            .js-animation-ready .container-4,
            .js-animation-ready .container-5 {
              opacity: 0;
              visibility: hidden;
              will-change: opacity, transform, filter;
            }

            .js-animation-ready .slider-item {
              opacity: 0;
              will-change: opacity, transform, filter;
            }

            @media (max-width: 1023px) {
              .js-animation-ready .slider-item {
                transform: translateY(15px);
              }
            }

            @media (min-width: 1024px) {
              .js-animation-ready .slider-item {
                transform: translateX(15px);
              }
            }

            @keyframes enhancedPulse {
              0%,
              100% {
                opacity: 1;
                transform: scale(1) rotate(0deg);
              }
              25% {
                opacity: 0.8;
                transform: scale(1.02) rotate(0.5deg);
              }
              50% {
                opacity: 0.7;
                transform: scale(0.98) rotate(-0.5deg);
              }
              75% {
                opacity: 0.9;
                transform: scale(1.01) rotate(0.3deg);
              }
            }

            .enhanced-pulse {
              animation: enhancedPulse 3s ease-in-out infinite;
            }

            /* Enhanced responsive scaling */
            @media (max-width: 768px) {
              #svg1,
              #svg2,
              #svg3,
              #svg4 {
                transform-origin: center;
                transform: scale(0.9);
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
              }
            }

            @media (max-width: 640px) {
              #svg1,
              #svg2,
              #svg3,
              #svg4 {
                transform: scale(0.85);
                filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08));
              }
            }

            /* Enhanced hardware acceleration */
            .slider-item,
            .container-1,
            .container-2,
            .container-3,
            .container-4,
            .container-5 {
              transform: translate3d(0, 0, 0);
              backface-visibility: hidden;
              perspective: 1000px;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default CaseOne;
