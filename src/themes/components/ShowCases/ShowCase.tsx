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
      } catch (error) {
        console.error('Error loading GSAP:', error);
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

    console.log('Setting up subtext scroll animation');
    const paragraphElement = balancerRef.current;

    // Make sure we're working with the original text (not already processed)
    if (paragraphElement.querySelectorAll('.word-span').length > 0) {
      console.log('Words already processed, skipping');
      return;
    }

    // Clear the paragraph text and prepare for animation
    paragraphElement.innerHTML = '';
    const words = initialText.split(' ');

    words.forEach((word, i) => {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('word-span');
      // Set initial state visibly to confirm the spans are created
      wordSpan.style.opacity = '0';
      wordSpan.style.transform = 'translateY(20px)';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.marginRight = '0.25em';

      if (word.endsWith('.') || word.endsWith(',') || i === words.length - 1) {
        wordSpan.style.marginRight = '0';
      }

      wordSpan.textContent = word;
      paragraphElement.appendChild(wordSpan);
    });

    const wordElements = paragraphElement.querySelectorAll('.word-span');
    console.log(`Found ${wordElements.length} words to animate`);

    if (gsap && ScrollTrigger) {
      // Reset words to initial hidden state
      gsap.set(wordElements, { opacity: 0, y: 20 });

      // Flow on scroll with scrub, like AnimatedHeading
      gsap
        .timeline({
          scrollTrigger: {
            trigger: paragraphElement,
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        })
        .to(wordElements, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: 'power2.out',
          duration: 0.5,
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

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mx-auto flex h-fit w-full flex-col gap-20 bg-white pb-[850px] dark:bg-[#1e2635]"
      style={{ isolation: 'isolate' }}
    >
      <div className="container flex max-w-7xl flex-col gap-4 pt-10">
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
    </section>
  );
};

export default ShowCase;
