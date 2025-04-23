import React, { useRef, useEffect } from 'react';
import CaseOne from './CaseOne';
import AnimatedHeading from '../AnimatedHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ShowCase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const balancerRef = useRef<HTMLDivElement>(null);

  // Set up scroll animations
  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return;

    // Check if dark mode is enabled
    const isDarkMode = document.documentElement.classList.contains('dark');

    // Create a timeline for the section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'center 20%',
        scrub: 1,
      },
    });

    // Background color animation (subtle shift) - different colors based on mode
    tl.to(
      sectionRef.current,
      {
        backgroundColor: isDarkMode ? '#1a2230' : '#f5f5f5', // Dark blue for dark mode, light gray for light mode
        duration: 1,
        ease: 'power1.inOut',
      },
      0,
    );

    // Clean up
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Balancer text animation
  useEffect(() => {
    if (!balancerRef.current || typeof window === 'undefined') return;

    const paragraphElement = balancerRef.current;
    const text = paragraphElement.textContent || '';

    // Clear the paragraph text so we can add spans
    paragraphElement.textContent = '';

    // Split the text into words and add spans with proper spacing
    const words = text.split(' ');

    words.forEach((word, i) => {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('word-span');
      wordSpan.style.opacity = '0';
      wordSpan.style.transform = 'translateY(20px)';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.marginRight = '0.25em'; // Add consistent spacing between words

      // Don't add extra space after the last word of a sentence
      if (word.endsWith('.') || word.endsWith(',') || i === words.length - 1) {
        wordSpan.style.marginRight = '0';
      }

      // Remove the extra space at the end of each word span
      wordSpan.textContent = word;
      paragraphElement.appendChild(wordSpan);
    });

    // Animate each word using ScrollTrigger
    const wordElements = paragraphElement.querySelectorAll('.word-span');

    gsap
      .timeline({
        scrollTrigger: {
          trigger: paragraphElement,
          start: 'top 85%',
          end: 'top 40%',
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

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === paragraphElement)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-50 mx-auto flex h-screen w-full flex-col items-center gap-4 bg-white dark:bg-[#1e2635]"
    >
      <div className="flex flex-col gap-4 pt-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <AnimatedHeading
          text="Talent, Unlocked."
          className="text-3xl sm:text-6xl font-bold text-nowrap dark:text-white"
          outlineColor="rgba(100,100,100,0.3)"
          fillColor="currentColor"
          strokeWidth={1.5}
        />

        <div
          ref={balancerRef}
          className="sm:w-3/5 overflow-hidden text-lg sm:text-xl leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-300"
        >
          Find the right fit, faster. Connect with top candidates, streamline hiring, and
          collaborate smarter — all in one powerful platform.
        </div>
      </div>

      <CaseOne />
    </section>
  );
};

export default ShowCase;
