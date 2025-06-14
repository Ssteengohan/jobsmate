'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  outlineColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = '',
  as: Component = 'h1',
  outlineColor = 'rgba(255,255,255,0.5)',
  fillColor = 'white',
  strokeWidth = 1,
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [characters, setCharacters] = useState<string[]>([]);

  useEffect(() => {
    const chars = text.split('');
    setCharacters(chars);
  }, [text]);

  useEffect(() => {
    if (!headingRef.current || typeof window === 'undefined' || characters.length === 0) return;

    const headingElement = headingRef.current;
    const chars = headingElement.querySelectorAll('.animated-char');

    gsap.set(chars, {
      color: 'transparent',
      WebkitTextStroke: `${strokeWidth}px ${outlineColor}`,
      opacity: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingElement,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0.3, 
      },
    });


    tl.to(chars, {
      color: fillColor,
      WebkitTextStroke: `0px transparent`,
      stagger: {
        each: 0.02, 
        from: 'start',
        ease: 'power2.inOut',
      },
      duration: 0.2,
      ease: 'power2.inOut',
    });

    const completionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: headingElement,
        start: 'top 25%',
        onEnter: () => {
          gsap.to(chars, {
            color: fillColor,
            WebkitTextStroke: `0px transparent`,
            duration: 0.2,
            stagger: 0.01,
            ease: 'power1.out',
            overwrite: 'auto',
          });
        },
      },
    });


    return () => {
      tl.kill();
      completionTimeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === headingElement) {
          trigger.kill();
        }
      });
    };
  }, [characters, outlineColor, fillColor, strokeWidth]);

  return (
    <div className={`relative ${className}`} style={{ lineHeight: 1.3 }}>
      <Component
        ref={headingRef}
        className={className}
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className="animated-char"
            style={{
              display: 'inline-block',
              color: 'transparent',
              WebkitTextStroke: `${strokeWidth}px ${outlineColor}`,
              transition: 'color 0.6s ease, -webkit-text-stroke 0.6s ease',
              ...(char === ' ' ? { marginRight: '0.0em' } : {}),
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </Component>

      <span className="sr-only">{text}</span>
    </div>
  );
};

export default AnimatedHeading;
