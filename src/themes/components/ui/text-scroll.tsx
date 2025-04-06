import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define a type for Lenis to avoid using 'any'
interface LenisInstance {
  destroy: () => void;
  // Add other methods/properties as needed
}

// Type declaration for global Lenis constructor
declare global {
  interface Window {
    Lenis: new (options: { autoRaf: boolean }) => LenisInstance;
  }
}

// Utility function to wrap words in spans
const wrapWordsInSpan = (element: HTMLElement | null): void => {
  if (!element) return;
  const text = element.textContent;
  element.innerHTML = text
    ? text
        .split(' ')
        .map(
          (word: string) =>
            `<span class="word inline-block transform translate-x-[calc(100vw-25px)] sm:translate-x-[calc(100vw-15px)]">${word}</span>`,
        )
        .join(' ')
    : '';
};

const TextScroll = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const pinHeightRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling using the global instance
    let lenis: LenisInstance | null = null;
    try {
      if (typeof window !== 'undefined' && window.Lenis) {
        lenis = new window.Lenis({
          autoRaf: true,
        });
      }
    } catch (error) {
      console.error('Failed to initialize Lenis:', error);
    }

    // Wait for DOM to be fully loaded
    const setupAnimation = () => {
      // Create GSAP animations once component mounts
      if (scrollRef.current) {
        gsap.to(scrollRef.current, {
          autoAlpha: 0,
          duration: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'top top-=1',
            toggleActions: 'play none reverse none',
          },
        });
      }

      // Process paragraph text to wrap words in spans
      if (paragraphRef.current) {
        wrapWordsInSpan(paragraphRef.current);

        // Get all the word elements after they've been created
        const words = sectionRef.current?.querySelectorAll('.word');

        // Only proceed if words exist
        if (words && words.length > 0) {
          // Set initial position for the words (off-screen)
          gsap.set(words, { x: '100vw' });

          // Animate the words
          gsap.to(words, {
            x: 0,
            stagger: 0.02,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: pinHeightRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
              pin: containerRef.current,
            },
          });
        }
      }
    };

    // Run after a short delay to ensure refs are properly set
    const timeoutId = setTimeout(setupAnimation, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (lenis) lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="mwg_effect005 relative z-10 bg-white" ref={sectionRef}>
      <p
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        ref={scrollRef}
      >
      </p>

      <div className="h-[500vh]" ref={pinHeightRef}>
        <div className="flex h-screen items-center overflow-hidden px-6 md:px-6" ref={containerRef}>
          <div className="absolute top-6 right-6 left-6 flex justify-between md:top-4 md:right-4 md:left-4">
            <p className="text-[1.2vw] md:text-base">About Henri Matisse</p>
            <div className="flex items-center gap-4 text-right text-[0.9vw] font-medium uppercase md:mt-4 md:flex-col md:items-start md:text-[13px]">
              <p className="md:order-2 md:text-left">
                &ldquo;La Tristesse du roi&rdquo; <br />
                1952 <br />
                gouache, cut-out papers <br />
                Centre Pompidou
              </p>
            </div>
          </div>
          <p
            className="w-3/5 text-[3.9vw] leading-[0.9] font-medium tracking-[-0.03em] sm:w-full sm:pb-[74px] md:text-[30px]"
            ref={paragraphRef}
          >
            Henri Matisse (1869→1954) was a French artist known for his vibrant use of color and
            bold, expressive shapes. A leading figure of the Fauvism movement, Matisse&apos;s work
            broke away from traditional representation, using vivid hues to convey emotion rather
            than realism.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TextScroll;
