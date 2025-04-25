// cSpell: ignore gsap ScrollTrigger
import React, { useRef, useEffect, useState, lazy, Suspense } from 'react';
import AnimatedHeading from '../AnimatedHeading';

// Lazily load the heavy case components
const CaseOne = lazy(() => import('./CaseOne'));
const CaseTwo = lazy(() => import('./CaseTwo'));
const CaseThree = lazy(() => import('./CaseThree'));

type GSAPTarget = Element | string | Element[] | NodeList | null | undefined;
type GSAPVars = Record<string, unknown>;
type TimelinePosition = number | string | '+=0' | '+=0.1' | '>';

interface GSAPInstance {
  timeline: (options?: Record<string, unknown>) => GSAPTimeline;
  to: (target: GSAPTarget, vars: GSAPVars) => GSAPTimeline;
  set: (target: GSAPTarget, vars: GSAPVars) => GSAPTimeline;
  registerPlugin: (...plugins: unknown[]) => void;
}

interface GSAPTimeline {
  to: (target: GSAPTarget, vars: GSAPVars, position?: TimelinePosition) => GSAPTimeline;
  kill: () => void;
  progress: (value?: number) => number;
}

interface ScrollTriggerInstance {
  create: (options: Record<string, unknown>) => ScrollTriggerObject;
  getAll: () => ScrollTriggerObject[];
  refresh: (hard?: boolean) => void;
  batch: (
    targets: GSAPTarget,
    options: {
      interval: number;
      batchMax: number;
      start: string;
      end: string;
      scrub: number;
      onEnter: (elements: HTMLElement[]) => void;
      [key: string]: unknown;
    },
  ) => void;
}

interface ScrollTriggerObject {
  kill: (completely?: boolean) => void;
  vars: {
    trigger: Element | string | null;
    [key: string]: unknown;
  };
}

let gsap: GSAPInstance | undefined;
let ScrollTrigger: ScrollTriggerInstance | undefined;

const ShowCase = () => {
  const initialText =
    'Find the right fit, faster. Connect with top candidates, streamline hiring, and collaborate smarter — all in one powerful platform.';

  const sectionRef = useRef<HTMLElement>(null);
  const balancerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [shouldLoadCases, setShouldLoadCases] = useState(false);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const loadGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');

        gsap = gsapModule.default as unknown as GSAPInstance;
        ScrollTrigger = scrollTriggerModule.ScrollTrigger as unknown as ScrollTriggerInstance;

        gsap.registerPlugin(ScrollTrigger);
        setGsapLoaded(true);

        // prefetch case components in idle time to avoid JIT overhead on first scroll
        const idle: (cb: () => void) => number =
          window.requestIdleCallback?.bind(window) ??
          ((cb: () => void) => window.setTimeout(cb, 200));

        idle(() => {
          import('./CaseOne');
          import('./CaseTwo');
          import('./CaseThree');
        });
      } catch {
      }
    };

    loadGSAP();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadCases(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (ScrollTrigger?.getAll) {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      }
    };
  }, []);

  useEffect(() => {
    if (!balancerRef.current || !isClient || !gsapLoaded) return;
    const paragraphElement = balancerRef.current;

    // prevent double-processing
    if (paragraphElement.querySelectorAll('.word-span').length) return;

    // split into spans
    paragraphElement.innerHTML = '';
    const words = initialText.split(' ');
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.classList.add('word-span');
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.display = 'inline-block';
      span.style.marginRight =
        word.endsWith('.') || word.endsWith(',') || i === words.length - 1 ? '0' : '0.25em';
      span.textContent = word;
      paragraphElement.appendChild(span);
    });

    const wordElements = paragraphElement.querySelectorAll<HTMLElement>('.word-span');

    if (gsap && ScrollTrigger) {
      // set initial state with will-change hint
      gsap!.set(wordElements, { opacity: 0, y: 20, willChange: 'opacity, transform' });

      // batch animations for better perf
      ScrollTrigger!.batch(wordElements, {
        interval: 0.1,
        batchMax: 20,
        start: 'top 85%',
        end: 'bottom 60%',
        scrub: 0.6,
        onEnter: (batch: HTMLElement[]) => {
          gsap!.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: 'power2.out',
            overwrite: true,
          });
        },
      });
    }

    return () => {
      if (ScrollTrigger?.getAll) {
        ScrollTrigger.getAll()
          .filter((t) => t.vars.trigger === paragraphElement)
          .forEach((t) => t.kill());
      }
    };
  }, [isClient, gsapLoaded]);

  // once we know we'll render the Cases, trigger a refresh so ScrollTrigger measurements are ready
  useEffect(() => {
    if (shouldLoadCases && ScrollTrigger) {
      ScrollTrigger.refresh(true);
    }
  }, [shouldLoadCases]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mx-auto flex h-fit w-full flex-col gap-20 bg-white pb-[850px] dark:bg-[#1e2635] pt-10"
      style={{ isolation: 'isolate' }}
    >
      <div className="container flex max-w-7xl flex-col gap-4">
        <AnimatedHeading
          text="Talent, Unlocked."
          className="text-3xl font-bold text-nowrap sm:text-6xl"
          outlineColor="rgba(100,100,100,0.3)"
          fillColor="currentColor"
          strokeWidth={1.5}
        />

        <div
          ref={balancerRef}
          className="overflow-hidden text-lg leading-relaxed whitespace-pre-wrap text-gray-700 sm:w-3/5 sm:text-xl dark:text-gray-300"
        >
          {initialText}
        </div>
      </div>

      {isClient && shouldLoadCases && (
        <Suspense
          fallback={
            <div className="flex h-[800px] items-center justify-center">Loading showcase...</div>
          }
        >
          <CaseOne />
          <CaseTwo />
          <CaseThree />
        </Suspense>
      )}

      <style jsx global>{`
        .word-span {
          will-change: opacity, transform;
        }
      `}</style>
    </section>
  );
};

export default ShowCase;
