import Link from 'next/link';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Balancer from 'react-wrap-balancer';
import { ArrowRight, Award, CircleSlash, Heart, MessageSquare, Briefcase } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import WorldMap from '../../../components/WorldMap';

// Register GSAP plugins if we're in browser environment
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

const CaseTwo = () => {
  const [animationReady, setAnimationReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const arrowRefs = useRef<(SVGGElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const middleColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  // Set up animation readiness
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('js-animation-ready');
      const timer = setTimeout(() => setAnimationReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Animation effect for connecting lines and arrows
  useEffect(() => {
    if (typeof window === 'undefined' || !animationReady) return;

    const ctx = gsap.context(() => {
      const paths = pathRefs.current.filter(Boolean);
      const arrows = arrowRefs.current.filter(Boolean);
      const cards = cardsRef.current.filter(Boolean);

      // Create a main timeline for better sequencing
      const mainTl = gsap.timeline({
        paused: true,
        smoothChildTiming: true,
        defaults: {
          ease: 'power2.out',
          duration: 0.4,
        },
      });

      // Initial state for columns
      gsap.set([leftColumnRef.current, rightColumnRef.current], {
        autoAlpha: 0,
        y: 20,
      });

      // Initial state for the title
      gsap.set(titleRef.current, {
        autoAlpha: 0,
        y: -15,
      });

      // Set initial state of paths
      paths.forEach((path) => {
        if (!path) return;
        try {
          const pathLength = path.getTotalLength() || 300;
          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });
        } catch (err) {
          console.error('Error setting up path', err);
        }
      });

      // Set initial state for arrows and cards
      gsap.set(arrows, {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: 'center center',
        visibility: 'hidden',
      });

      // Set initial state for the arrow triangles specifically
      gsap.set('#arrowTriangle1, #arrowTriangle2, #arrowTriangle3', {
        autoAlpha: 0,
        scale: 0,
        visibility: 'hidden',
      });

      // Ensure cards are completely hidden initially
      gsap.set('.info-container', {
        autoAlpha: 0,
        y: 30,
        scale: 0.95,
        immediateRender: true,
        clearProps: 'filter',
      });

      // Setup WorldMap animations
      const worldMapElement = document.querySelector('.world-map-container');
      if (worldMapElement) {
        gsap.set(worldMapElement, {
          autoAlpha: 0.3,
          scale: 0.97,
        });

        const mapConnections = document.querySelectorAll('.map-connection');
        if (mapConnections.length) {
          mapConnections.forEach((conn) => {
            gsap.set(conn, {
              strokeDasharray: 10,
              strokeDashoffset: 50,
              autoAlpha: 0,
            });
          });
        }

        const mapMarkers = document.querySelectorAll('.pulse-circle');
        if (mapMarkers.length) {
          gsap.set(mapMarkers, {
            autoAlpha: 0,
            scale: 0,
          });
        }
      }

      // Animate side columns first
      mainTl
        .to(
          leftColumnRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
          },
          0,
        )
        .to(
          rightColumnRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
          },
          0.2,
        );

      // Show the world map immediately at the start
      mainTl.to(
        '.world-map-container',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.35,
          ease: 'power1.out',
        },
        0,
      );

      // Add title animation
      mainTl.to(
        titleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: 'back.out(1.2)',
        },
        0.2,
      );

      // Animate map markers with staggered effect
      mainTl.to(
        '.pulse-circle',
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.07,
          ease: 'back.out(1.7)',
        },
        0.1,
      );

      // Animate map connections with staggered effect
      mainTl.to(
        '.map-connection',
        {
          strokeDashoffset: 0,
          autoAlpha: 0.7,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power1.inOut',
        },
        0.2,
      );

      // Create animations for each path, arrow, and card
      interface ArrowPulseTimeline {
        timeline: gsap.core.Timeline;
        arrow: SVGGElement | null;
      }

      const arrowPulseTimelines: ArrowPulseTimeline[] = [];

      arrows.forEach((arrow, index) => {
        if (arrow) {
          gsap.set(arrow, {
            autoAlpha: 0,
            visibility: 'hidden',
            scale: 0,
          });

          const triangleId = `#arrowTriangle${index + 1}`;
          const triangle = arrow.querySelector(triangleId) || document.querySelector(triangleId);
          if (triangle) {
            gsap.set(triangle, {
              autoAlpha: 0,
              visibility: 'hidden',
              scale: 0,
            });
          }
        }
      });

      arrows.forEach((arrow, index) => {
        if (arrow) {
          const triangleId = `#arrowTriangle${index + 1}`;
          const triangle = arrow.querySelector(triangleId) || document.querySelector(triangleId);

          if (triangle) {
            const pulseTl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
            pulseTl.to(triangle, {
              scale: 1.2,
              duration: 0.6,
              ease: 'sine.inOut',
            });

            arrowPulseTimelines.push({ timeline: pulseTl, arrow });
          }
        }
      });

      paths.forEach((path, index) => {
        if (!path) return;

        const startTime = index * 0.7 + 0.7;

        mainTl.fromTo(
          path,
          {
            strokeDashoffset: path.getTotalLength() || 300,
            autoAlpha: 0.3,
          },
          {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power2.inOut',
            onStart: () => {
              if (arrows[index]) {
                gsap.set(arrows[index], {
                  autoAlpha: 1,
                  scale: 1,
                  visibility: 'visible',
                });

                const triangleId = `#arrowTriangle${index + 1}`;
                const triangle =
                  arrows[index].querySelector(triangleId) || document.querySelector(triangleId);
                if (triangle) {
                  gsap.set(triangle, {
                    autoAlpha: 1,
                    visibility: 'visible',
                    scale: 1,
                  });
                }

                const pulseAnimation = arrowPulseTimelines.find(
                  (item) => item.arrow === arrows[index],
                );
                if (pulseAnimation) {
                  pulseAnimation.timeline.play();
                }
              }
            },
          },
          startTime,
        );

        if (arrows[index]) {
          mainTl.to(
            arrows[index],
            {
              autoAlpha: 1,
              visibility: 'visible',
              scale: 1,
              duration: 0.2,
              ease: 'power1.out',
              immediateRender: true,
            },
            startTime,
          );

          mainTl.to(
            arrows[index],
            {
              motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1,
              },
              duration: 0.8,
              ease: 'power2.inOut',
            },
            startTime,
          );
        }

        const card = cards[index];
        if (card) {
          mainTl.set(
            card,
            {
              autoAlpha: 0,
              y: 30,
              scale: 0.95,
            },
            startTime + 0.29,
          );

          mainTl.to(
            card,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: 'back.out(1.2)',
              clearProps: 'filter',
            },
            startTime + 0.3,
          );
        }
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
          id: 'case-two-pin',
          onLeaveBack: () => {
            mainTl.progress(0);
            arrows.forEach((arrow, index) => {
              if (arrow) {
                gsap.set(arrow, { autoAlpha: 0, visibility: 'hidden', scale: 0 });

                const triangleId = `#arrowTriangle${index + 1}`;
                const triangle =
                  arrow.querySelector(triangleId) || document.querySelector(triangleId);
                if (triangle) {
                  gsap.set(triangle, { autoAlpha: 0, visibility: 'hidden', scale: 0 });
                }
              }
            });
          },
          onLeave: () => {
            mainTl.progress(1);
          },
        });
      }

      ScrollTrigger.create({
        trigger: stickyWrapperRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        onUpdate: (self) => {
          const rawProgress = Math.min(self.progress, 1);
          const easedProgress =
            rawProgress < 0.5
              ? 2 * rawProgress * rawProgress
              : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;
          mainTl.progress(easedProgress);
        },
        scrub: 0.6,
        preventOverlaps: true,
        fastScrollEnd: true,
        markers: false,
        id: 'case-two-animation',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animationReady]);

  return (
    <div className="relative z-50 mt-[720px]" ref={stickyWrapperRef}>
      <div className="h-screen">
        <div
          ref={containerRef}
          className="relative h-[800px] border-t border-b border-black/20 dark:border-white/30"
        >
          <div className="mx-auto h-full">
            <div className="flex h-full">
              <div
                ref={leftColumnRef}
                className="flex w-1/4 flex-col justify-between pt-20 text-gray-600 md:text-base dark:text-gray-400"
              >
                <div className="px-4">
                  <h3 className="text-foreground text-xl font-bold">Build Your Global Team</h3>
                  <Balancer className="pt-5">
                    Hire Globally with ease - Matching of skills, experience & job description
                  </Balancer>

                  <Balancer className="w-3/4 pt-10">
                    Receive automatically all the applicant information in your Applicant Tracking
                    System
                  </Balancer>

                  <ul className="list-disc pt-5 pl-5">
                    <li>Seniority</li>
                    <li>Skills</li>
                    <li>Ranking</li>
                    <li>Anti-cheating report</li>
                  </ul>
                </div>
                <Link
                  href={'/'}
                  className="group text-foreground relative flex w-fit items-center gap-1 px-4 pb-20 text-sm font-semibold"
                >
                  <span className="relative inline-block">
                    Explore Ranked matches
                    <span className="absolute bottom-[-4px] left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"></span>
                  </span>
                  <ArrowRight className="inline h-4 w-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </div>
              <div
                ref={middleColumnRef}
                className="relative w-2/4 overflow-hidden border-r border-l border-black/20 dark:border-white/30"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-medium-blue)]/5 via-transparent to-[var(--primary-gold)]/5"></div>
                  <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-medium-blue)_0.8px,transparent_0.8px)] [background-size:14px_14px]"></div>
                  <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-gold)_0.8px,transparent_0.8px)] [background-size:18px_18px]"></div>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-[var(--neutral-50)]/30"></div>
                </div>

                <div className="pointer-events-none absolute inset-0 z-[5]">
                  <svg width="100%" height="100%" className="overflow-visible">
                    <defs>
                      <linearGradient
                        id="gradientFlow"
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

                    <path
                      ref={(el) => {
                        pathRefs.current[0] = el;
                      }}
                      d="M 50 50 C 100 70, 50 100, 120 150"
                      fill="none"
                      stroke="url(#gradientFlow)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="opacity-80"
                    />

                    <g
                      ref={(el) => {
                        arrowRefs.current[0] = el;
                      }}
                      opacity="0"
                    >
                      <polygon
                        id="arrowTriangle1"
                        points="-4,-4 6,-4 0,6"
                        fill="var(--primary-gold)"
                        fillOpacity="0.9"
                        filter="drop-shadow(0 0 2px rgba(240, 180, 41, 0.5))"
                      />
                    </g>

                    <path
                      ref={(el) => {
                        pathRefs.current[1] = el;
                      }}
                      d="M 60 50 C 100 70, 50 180, 130 230"
                      fill="none"
                      stroke="url(#gradientFlow)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="opacity-80"
                    />

                    <g
                      ref={(el) => {
                        arrowRefs.current[1] = el;
                      }}
                      opacity="0"
                    >
                      <polygon
                        id="arrowTriangle2"
                        points="-4,-4 6,-4 0,6"
                        fill="var(--primary-gold)"
                        fillOpacity="0.9"
                        filter="drop-shadow(0 0 2px rgba(240, 180, 41, 0.5))"
                      />
                    </g>

                    <path
                      ref={(el) => {
                        pathRefs.current[2] = el;
                      }}
                      d="M 60 50 C 100 80, 50 160, 120 310"
                      fill="none"
                      stroke="url(#gradientFlow)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="opacity-80"
                    />

                    <g
                      ref={(el) => {
                        arrowRefs.current[2] = el;
                      }}
                      opacity="0"
                    >
                      <polygon
                        id="arrowTriangle3"
                        points="-4,-4 6,-4 0,6"
                        fill="var(--primary-gold)"
                        fillOpacity="0.9"
                        filter="drop-shadow(0 0 2px rgba(240, 180, 41, 0.5))"
                      />
                    </g>
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col">
                  <div className="pt-10 pl-5">
                    <span
                      ref={titleRef}
                      className="matched-title rounded-xl border-[0.5px] border-black/40 bg-white px-2 py-2 text-xl font-bold text-[#05253c]"
                    >
                      <SaasIcon className="mr-2 inline-flex bg-[var(--primary-gold)]">
                        <Award className="h-3 w-3" />
                      </SaasIcon>
                      Matched & Ranked
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 pt-10 pl-30">
                    <div
                      ref={(el) => {
                        cardsRef.current[0] = el;
                      }}
                      className="info-container relative flex w-[90%] flex-row items-center rounded-2xl border-1 border-[#7f9cf5]/50 bg-white px-2 py-2 max-md:flex-wrap md:pr-2"
                    >
                      <div className="flex items-center max-md:w-full max-md:justify-evenly">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="red"
                          className="v-popper--has-tooltip size-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <div className="flex flex-row items-center justify-evenly max-md:w-2/4 md:flex-col">
                          <span className="text-lg font-bold text-[#00253b] md:text-xl">1#</span>
                          <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[10px] font-bold text-white md:px-4 md:text-[10px]">
                            70%
                          </span>
                        </div>
                      </div>
                      <div className="flex w-full flex-row items-center justify-between border-[#ededed] px-2 max-md:flex-col">
                        <div className="flex w-full flex-row items-start gap-1 max-md:justify-evenly md:items-center">
                          <span className="rounded-full bg-[#ebf4ff] px-2 py-3 text-[#7f9cf5] uppercase md:px-2 md:py-2 md:text-xl">
                            RN
                          </span>
                          <div className="flex flex-col items-start gap-1">
                            <span className="text-sm font-bold text-[#00253b]">Robert Ment</span>
                            <div className="flex flex-row items-start gap-2 md:items-center">
                              <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[8px] font-bold text-[#00253b] md:text-xs lg:px-2 lg:py-1">
                                Senior
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#0077B5"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-5 xl:w-5"
                              >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                          <span className="text-sm font-bold text-nowrap text-[#00253b]">
                            Top skills
                          </span>
                          <div className="flex flex-wrap items-start gap-1 md:items-center">
                            <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                              AWS
                            </span>
                            <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                              Docker
                            </span>
                            <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                              Git
                            </span>
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                          <span className="text-xs font-bold text-[#00253b] md:text-xs">
                            Country of residence
                          </span>
                          <span className="text-[10px] text-[#00253b]">
                            🇦🇪 United Arab Emirates
                          </span>
                        </div>
                      </div>
                      <span className="bg-primary-gold text-background absolute -top-4 -right-7 rounded-3xl px-4 py-2 shadow-xs shadow-[#05253c]">
                        <Heart className="h-4 w-4" fill="#05253c" />
                      </span>
                    </div>

                    <div
                      ref={(el) => {
                        cardsRef.current[1] = el;
                      }}
                      className="info-container relative flex w-[90%] flex-row items-center rounded-2xl border-1 border-[#7f9cf5]/50 bg-white px-2 py-2 max-md:flex-wrap md:pr-2"
                    >
                      <div className="flex items-center max-md:w-full max-md:justify-evenly">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="red"
                          className="v-popper--has-tooltip size-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <div className="flex flex-row items-center justify-evenly max-md:w-2/4 md:flex-col">
                          <span className="text-lg font-bold text-[#00253b] md:text-xl">1#</span>
                          <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[10px] font-bold text-white md:px-4 md:text-[10px]">
                            70%
                          </span>
                        </div>
                      </div>
                      <div className="flex w-full flex-row items-center justify-between border-[#ededed] px-2 max-md:flex-col">
                        <div className="flex w-full flex-row items-start gap-1 max-md:justify-evenly md:items-center">
                          <span className="rounded-full bg-[#ebf4ff] px-2 py-3 text-[#7f9cf5] uppercase md:px-2 md:py-2 md:text-xl">
                            RN
                          </span>
                          <div className="flex flex-col items-start gap-1">
                            <span className="text-sm font-bold text-[#00253b]">Robert Ment</span>
                            <div className="flex flex-row items-start gap-2 md:items-center">
                              <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[8px] font-bold text-[#00253b] md:text-xs lg:px-2 lg:py-1">
                                Senior
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#0077B5"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-5 xl:w-5"
                              >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                          <span className="text-sm font-bold text-nowrap text-[#00253b]">
                            Top skills
                          </span>
                          <div className="flex flex-wrap items-start gap-1 md:items-center">
                            <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                              AWS
                            </span>
                            <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                              Docker
                            </span>
                            <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                              Git
                            </span>
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                          <span className="text-xs font-bold text-[#00253b] md:text-xs">
                            Country of residence
                          </span>
                          <span className="text-[10px] text-[#00253b]">
                            🇦🇪 United Arab Emirates
                          </span>
                        </div>
                      </div>
                      <span className="bg-primary-gold text-background absolute -right-7 rounded-3xl px-4 py-2 shadow-xs shadow-[#05253c]">
                        <MessageSquare className="h-4 w-4" fill="#05253c" />
                      </span>
                    </div>

                    <div
                      ref={(el) => {
                        cardsRef.current[2] = el;
                      }}
                      className="info-container relative flex w-[90%] flex-row items-center rounded-2xl border-1 border-[#7f9cf5]/50 bg-white px-2 py-2 max-md:flex-wrap md:pr-2"
                    >
                      <div className="flex items-center max-md:w-full max-md:justify-evenly">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="red"
                          className="v-popper--has-tooltip size-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <div className="flex flex-row items-center justify-evenly max-md:w-2/4 md:flex-col">
                          <span className="text-lg font-bold text-[#00253b] md:text-xl">1#</span>
                          <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[10px] font-bold text-white md:px-4 md:text-[10px]">
                            70%
                          </span>
                        </div>
                      </div>
                      <div className="flex w-full flex-row items-center justify-between border-[#ededed] px-2 max-md:flex-col">
                        <div className="flex w-full flex-row items-start gap-1 max-md:justify-evenly md:items-center">
                          <span className="rounded-full bg-[#ebf4ff] px-2 py-3 text-[#7f9cf5] uppercase md:px-2 md:py-2 md:text-xl">
                            RN
                          </span>
                          <div className="flex flex-col items-start gap-1">
                            <span className="text-sm font-bold text-[#00253b]">Robert Ment</span>
                            <div className="flex flex-row items-start gap-2 md:items-center">
                              <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[8px] font-bold text-[#00253b] md:text-xs lg:px-2 lg:py-1">
                                Senior
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#0077B5"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-5 xl:w-5"
                              >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                          <span className="text-sm font-bold text-nowrap text-[#00253b]">
                            Top skills
                          </span>
                          <div className="flex flex-wrap items-start gap-1 md:items-center">
                            <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                              AWS
                            </span>
                            <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                              Docker
                            </span>
                            <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                              Git
                            </span>
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                          <span className="text-xs font-bold text-[#00253b] md:text-xs">
                            Country of residence
                          </span>
                          <span className="text-[10px] text-[#00253b]">
                            🇦🇪 United Arab Emirates
                          </span>
                        </div>
                      </div>
                      <span className="bg-primary-gold text-background absolute -right-7 -bottom-5 rounded-3xl px-4 py-2 shadow-xs shadow-[#05253c]">
                        <CircleSlash className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[35%] z-10 flex h-full w-full items-center justify-center">
                  <WorldMap className="world-map-container h-fit w-[95%]" />
                </div>
              </div>
              <div ref={rightColumnRef} className="w-1/4">
                <div className="flex h-full flex-col justify-between pt-20 pb-10">
                  <div className="flex flex-col gap-5 px-5">
                    <h3 className="text-foreground text-xl font-bold">Hiring Process</h3>

                    <div className="mt-2 flex flex-col gap-3">
                      {/* Hiring Process Steps */}
                      <div className="flex items-center gap-3 rounded-lg border-1 border-gray-400/30 bg-gradient-to-r from-white to-gray-50 px-6 py-3 shadow-[0_0px_15px_0px_rgba(0,0,0,0.1)] dark:from-gray-800 dark:to-gray-900">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#38b6ff]/20">
                          <span className="text-lg font-bold text-[#38b6ff]">1</span>
                        </div>
                        <span className="text-sm font-medium">Review matched candidates</span>
                      </div>

                      <div className="flex items-center gap-3 rounded-lg border-1 border-gray-400/30 bg-gradient-to-r from-white to-gray-50 px-6 py-3 shadow-[0_0px_15px_0px_rgba(0,0,0,0.1)] dark:from-gray-800 dark:to-gray-900">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#fad246]/20">
                          <span className="text-lg font-bold text-[#fad246]">2</span>
                        </div>
                        <span className="text-sm font-medium">Schedule interviews</span>
                      </div>

                      <div className="flex items-center gap-3 rounded-lg border-1 border-gray-400/10 px-6 py-3 opacity-65">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#e2e8f0]">
                          <span className="text-lg font-bold text-gray-500">3</span>
                        </div>
                        <span className="text-sm text-gray-500">Select final candidates</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-6">
                      <h4 className="text-foreground mb-3 font-semibold">Global Talent Pool</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col items-center justify-center rounded-xl bg-[var(--primary-medium-blue)]/10 p-3">
                          <span className="text-2xl font-bold text-[var(--primary-medium-blue)]">
                            120+
                          </span>
                          <span className="text-xs">Countries</span>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-xl bg-[var(--primary-gold)]/10 p-3">
                          <span className="text-2xl font-bold text-[var(--primary-gold)]">
                            10K+
                          </span>
                          <span className="text-xs">Developers</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Information Elements (Non-clickable) */}
                  <div className="mt-6 flex flex-col gap-3 px-5">
                    <div className="flex items-center justify-center gap-2 rounded-lg bg-[var(--primary-medium-blue)]/80 px-4 py-2 text-white">
                      <Briefcase className="h-4 w-4" />
                      <span>Top candidates ready</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 rounded-lg border border-[var(--primary-gold)]/80 bg-transparent px-4 py-2 text-[var(--primary-gold)]">
                      <Award className="h-4 w-4" />
                      <span>Search criteria applied</span>
                    </div>

                    <div className="text-foreground mt-6 flex w-fit items-center gap-1 text-sm">
                      <span className="opacity-75">70+ matched candidates</span>
                      <ArrowRight className="inline h-4 w-4 opacity-75" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .js-animation-ready .info-container {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          will-change: opacity, transform;
        }

        .js-animation-ready .world-map-container {
          opacity: 0.3;
          transform: scale(0.97);
          will-change: opacity, transform;
        }

        .js-animation-ready .matched-title {
          opacity: 0;
          transform: translateY(-15px);
          will-change: opacity, transform;
        }
      `}</style>
    </div>
  );
};

export default CaseTwo;
