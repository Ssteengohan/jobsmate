import Link from 'next/link';
import React, { ReactNode, useEffect, useRef } from 'react';
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
import { useScrollData } from '@/themes/lib/lenis';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
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
}

const SliderItem = ({ icon, label, isActive = false, iconColor, iconBgColor }: SliderItemProps) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border-1 ${
        isActive
          ? 'border-gray-400/30 bg-gradient-to-r from-white to-gray-50 shadow-[0_0px_15px_0px_rgba(0,0,0,0.1)] dark:from-gray-800 dark:to-gray-900'
          : 'border-gray-400/10 opacity-65 grayscale-[30%] filter'
      } px-6 py-3 transition-all duration-300 ${
        isActive
          ? 'hover:shadow-[0_0px_20px_0px_rgba(0,0,0,0.15)]'
          : 'hover:opacity-80 hover:grayscale-[0%]'
      }`}
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const containers = [
        container1Ref.current,
        container2Ref.current,
        container3Ref.current,
        container4Ref.current,
        container5Ref.current,
      ].filter(Boolean);
      if (containers.length) {
        gsap.set(containers, {
          autoAlpha: 0,
          y: 20,
          filter: 'blur(10px)',
        });
      }

      const badges = [badge1Ref.current, badge2Ref.current].filter(Boolean);
      if (badges.length) {
        gsap.set(badges, {
          autoAlpha: 0,
          y: 15,
          filter: 'blur(5px)',
        });
      }

      const startCircle = document.querySelector('#svg1 circle[cx="152"][cy="180"]');
      const midCircle = document.querySelector('#svg2 circle[cx="355"][cy="25"]');
      const endCircle = document.querySelector('#svg3 circle[cx="338"][cy="15"]');
      const circles = [startCircle, midCircle, endCircle].filter(Boolean);
      if (circles.length) {
        gsap.set(circles, { autoAlpha: 0, scale: 0 });
      }

      const arrows = [
        arrowRef1.current,
        arrowRef2.current,
        arrowRef3.current,
        arrowRef4.current,
      ].filter(Boolean);
      if (arrows.length) {
        gsap.set(arrows, { autoAlpha: 0, scale: 0 });
      }

      let path1Length = 0;
      let path2Length = 0;
      let path3Length = 0;
      let path4Length = 0;

      if (path1Ref.current) {
        try {
          path1Length = path1Ref.current.getTotalLength() || 300;
          gsap.set(path1Ref.current, {
            strokeDasharray: path1Length,
            strokeDashoffset: path1Length,
          });
        } catch {
          console.error('Error setting up path1');
        }
      }

      if (path2Ref.current) {
        try {
          path2Length = path2Ref.current.getTotalLength() || 300;
          gsap.set(path2Ref.current, {
            strokeDasharray: path2Length,
            strokeDashoffset: path2Length,
          });
        } catch {
          console.error('Error setting up path2');
        }
      }

      if (path3Ref.current) {
        try {
          path3Length = path3Ref.current.getTotalLength() || 300;
          gsap.set(path3Ref.current, {
            strokeDasharray: path3Length,
            strokeDashoffset: path3Length,
          });
        } catch {
          console.error('Error setting up path3');
        }
      }

      if (path4Ref.current) {
        try {
          path4Length = path4Ref.current.getTotalLength() || 300;
          gsap.set(path4Ref.current, {
            strokeDasharray: path4Length,
            strokeDashoffset: path4Length,
          });
        } catch {
          console.error('Error setting up path4');
        }
      }

      if (stickyWrapperRef.current && containerRef.current) {
        ScrollTrigger.create({
          trigger: stickyWrapperRef.current,
          start: 'top 10%',
          end: 'bottom 10%',
          pin: containerRef.current,
          pinSpacing: true,
          anticipatePin: 1,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyWrapperRef.current,
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: 0.6,
          toggleActions: 'play none none reverse',
          markers: false,
        },
      });

      tl.to(container1Ref.current, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.25,
        ease: 'power3.out',
      })
        .to(
          badge1Ref.current,
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.2,
            ease: 'power3.out',
          },
          '>+0.5',
        )
        .to(
          startCircle,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.15,
            ease: 'back.out',
          },
          '>-0.05',
        )
        .to(
          arrowRef1.current,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.1,
            ease: 'back.out',
          },
          '>-0.05',
        );

      if (path1Ref.current) {
        tl.to(
          path1Ref.current,
          {
            strokeDashoffset: 0,
            duration: 0.4,
            ease: 'power1.inOut',
          },
          '>-0.1',
        )
          .to(
            arrowRef1.current,
            {
              motionPath: {
                path: path1Ref.current,
                align: path1Ref.current,
                alignOrigin: [0.7, 0.5],
                autoRotate: false,
                start: 0,
                end: 1,
              },
              duration: 0.4,
              ease: 'power1.inOut',
            },
            '>-0.4',
          )
          .to(
            container2Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.25,
              ease: 'power3.out',
            },
            '>0.1',
          )
          .to(
            badge2Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.2,
              ease: 'power3.out',
            },
            '>+0.5',
          )
          .to(
            midCircle,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.15,
              ease: 'back.out',
            },
            '>0.15',
          );
      }

      tl.to(
        arrowRef2.current,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.1,
          ease: 'back.out',
        },
        '>0.1',
      );

      if (path2Ref.current) {
        tl.to(
          path2Ref.current,
          {
            strokeDashoffset: 0,
            duration: 0.4,
            ease: 'power1.inOut',
          },
          '>0.1',
        )
          .to(
            arrowRef2.current,
            {
              motionPath: {
                path: path2Ref.current,
                align: path2Ref.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0,
                end: 1,
              },
              duration: 0.4,
              ease: 'power1.inOut',
            },
            '>-0.4',
          )
          .to(
            container3Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.25,
              ease: 'power3.out',
            },
            '>0.1',
          )
          .to(
            endCircle,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.15,
              ease: 'back.out',
            },
            '>0.15',
          );
      }

      if (path3Ref.current) {
        tl.to(
          arrowRef3.current,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.1,
            ease: 'back.out',
          },
          '>-0.05',
        )
          .to(
            path3Ref.current,
            {
              strokeDashoffset: 0,
              duration: 0.4,
              ease: 'power1.inOut',
            },
            '>-0.05',
          )
          .to(
            arrowRef3.current,
            {
              motionPath: {
                path: path3Ref.current,
                align: path3Ref.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1,
              },
              duration: 0.4,
              ease: 'power1.inOut',
            },
            '>-0.4',
          )
          .to(
            container4Ref.current,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.25,
              ease: 'power3.out',
            },
            '>0.1',
          );
      }

      if (path4Ref.current) {
        tl.to(
          arrowRef4.current,
          {
            autoAlpha: 0.5,
            scale: 1,
            duration: 0.1,
            ease: 'back.out',
          },
          '>0.1',
        )
          .to(
            path4Ref.current,
            {
              strokeDashoffset: 0,
              duration: 0.4,
              ease: 'power1.inOut',
            },
            '>0.1',
          )
          .to(
            arrowRef4.current,
            {
              motionPath: {
                path: path4Ref.current,
                align: path4Ref.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1,
              },
              duration: 0.4,
              ease: 'power1.inOut',
            },
            '>-0.4',
          )
          .to(
            container5Ref.current,
            {
              autoAlpha: 0.7,
              y: 0,
              filter: 'blur(0px) grayscale(40%)',
              duration: 0.25,
              ease: 'power3.out',
            },
            '>0.1',
          );
      }

      gsap.to('#arrowTriangle1, #arrowTriangle2, #arrowTriangle3, #arrowTriangle4', {
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: 'sine.inOut',
      });

      gsap.to(
        '#gradientStop1, #gradientStop2, #gradientStop3, #gradientStop4, #gradientStop5, #gradientStop6, #gradientStop7, #gradientStop8',
        {
          attr: { offset: '+=1' },
          repeat: -1,
          duration: 2,
          ease: 'none',
          modifiers: {
            offset: (offset) => {
              try {
                const num = parseFloat(offset) || 0;
                return (num % 1).toString();
              } catch {
                return '0';
              }
            },
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isScrolling]);

  return (
    <div className="relative" ref={stickyWrapperRef}>
      <div className="h-[150vh]">
        {' '}
        <div className="flex h-[800px]" ref={containerRef}>
          <div className="flex h-full w-1/4 flex-col justify-between gap-2 pt-10">
            <div className="container flex w-full flex-col gap-2">
              <h2 className="text-xl font-semibold">Hire local or global</h2>
              <Balancer className="w-3/4 text-gray-600 *:text-sm md:text-base dark:text-gray-400">
                Streamline your hiring process with our tools and integrations to attract talent.
              </Balancer>
            </div>
            <Link
              href={'/'}
              className="group relative px-4  flex w-fit items-center gap-1 pb-20 text-sm font-semibold"
            >
              <span className="relative inline-block">
                Explore platform
                <span className="absolute bottom-[-4px] left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"></span>
              </span>
              <ArrowRight className="inline h-4 w-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="background-here relative flex w-2/4 flex-col gap-32 overflow-hidden border border-black/10 dark:border-white/10">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-medium-blue)]/5 via-transparent to-[var(--primary-gold)]/5"></div>
              <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-medium-blue)_0.8px,transparent_0.8px)] [background-size:14px_14px]"></div>
              <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-gold)_0.8px,transparent_0.8px)] [background-size:18px_18px]"></div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-[var(--neutral-50)]/30"></div>
            </div>

            <div className="pointer-events-none absolute inset-0 z-[15]">
              <svg id="svg1" width="100%" height="60%" className="overflow-visible" ref={svgRef1}>
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
              <svg id="svg2" width="100%" height="100%" className="overflow-visible" ref={svgRef2}>
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
              <svg id="svg3" width="100%" height="10%" className="overflow-visible" ref={svgRef3}>
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
                  d="M 345 15 C 380 15 440 -20 465 -45"
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
              <svg id="svg4" width="100%" height="10%" className="overflow-visible" ref={svgRef4}>
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
                  d="M 344 15 C 380 60 380 80 465 80"
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

            <div
              ref={container1Ref}
              className="container-1 relative z-10 flex w-fit flex-col items-end gap-2 pt-15 pl-12"
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
              className="container-2 relative z-10 flex w-fit flex-col items-end gap-2 pl-64"
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
            <div className="flex justify-between">
              <div
                ref={container3Ref}
                className="container-3 relative z-10 flex w-fit flex-col items-end gap-2 pt-17 pl-15"
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
              <div className="flex flex-col gap-12">
                <div
                  ref={container4Ref}
                  className="container-3 relative z-10 flex w-fit flex-col items-end gap-2 pr-6"
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
                  className="container-5 relative z-10 flex w-fit flex-col items-end gap-2 pr-6 opacity-80"
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
          <div className="flex w-1/4 flex-col items-center justify-between pb-20">
            <div className="flex flex-col justify-center gap-4 px-9 pt-20">
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
              />
            </div>
            <div className="mx-auto flex w-full items-center justify-center border-t-2 border-black/10">
              <Image src="jobsmate-mob.svg" alt="Home icon" width={200} height={200} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseOne;
