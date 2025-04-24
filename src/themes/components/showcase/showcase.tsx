import React, { useRef, useEffect } from 'react';
import CaseOne from './CaseOne';
import AnimatedHeading from '../AnimatedHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseTwo from './CaseTwo';

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
      className="relative z-10 mx-auto flex h-[370vh] w-full flex-col gap-20 bg-white dark:bg-[#1e2635]"
      style={{ isolation: 'isolate' }}
    >
      <div className="flex max-w-7xl flex-col gap-4 pt-10 container">
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
          Find the right fit, faster. Connect with top candidates, streamline hiring, and
          collaborate smarter — all in one powerful platform.
        </div>
      </div>

      <CaseOne />
      <CaseTwo />
    </section>
  );
};

export default ShowCase;
