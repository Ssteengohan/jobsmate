import React from 'react';
import { Spotlight } from '../ui/Spotlight';

export function SpotlightPreview() {
  return (
    <div className="relative flex h-[50rem] w-full overflow-hidden bg-white antialiased md:items-center md:justify-center">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-gray-50/30" />

      <div className="relative z-10 container mx-auto w-full max-w-7xl rounded-md p-4 pt-20 md:pt-0">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-1/4"
          fill="rgba(59, 130, 246, 0.15)"
        />
        <Spotlight
          className="top-40 right-0 md:top-60 md:right-1/4"
          fill="rgba(234, 179, 8, 0.15)"
        />

        <h1 className="bg-gradient-to-r from-[var(--primary-light-blue)] via-[var(--primary-medium-blue)] to-[var(--primary-gold)] bg-clip-text text-center text-4xl font-bold text-transparent drop-shadow-[0_0_5px_rgba(0,0,0,0.2)] md:text-8xl">
          Attract, Access <br />
          <span className="transition-all duration-300 hover:text-[var(--primary-gold)]">
            and Hire
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-center text-base font-normal text-neutral-500 md:text-lg">
          Hire the best applicants for your open tech position. Focus on skills, not just resumes.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          {/* Start for free Button */}
          <button className="group relative rounded-full border border-transparent bg-[var(--primary-gold)] px-8 py-3 text-sm font-medium text-[var(--primary-dark-blue)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:ring-offset-2 focus:outline-none">
            <span className="relative z-20 transition-all duration-300 group-hover:text-[var(--primary-medium-blue)]">
              Start for free
            </span>
          </button>

          {/* Talk to Sales Button */}
          <button className="group relative inline-flex items-center justify-center rounded-full border border-[var(--primary-light-blue)] bg-transparent px-8 py-3 text-sm font-medium text-[var(--primary-light-blue)] transition-all duration-300 hover:bg-[var(--primary-light-blue)] hover:text-[var(--primary-dark-blue)] focus:ring-2 focus:ring-[var(--primary-light-blue)] focus:ring-offset-2">
            Talk to sales
          </button>
        </div>
      </div>
    </div>
  );
}
