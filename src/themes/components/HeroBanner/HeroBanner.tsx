import React from 'react';
import { Spotlight } from '../ui/Spotlight';

export function SpotlightPreview() {
  return (
    <div className="relative container flex h-[40rem] w-full overflow-hidden rounded-md bg-gradient-to-br from-[#1c6a9e] to-[#2a97db] antialiased md:items-center md:justify-center bg-primary-light-blue">
      <div />

      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="rgba(255, 255, 255, 0.9)" />

      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-gradient-to-b from-white to-black/70 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Spotlight <br /> is the new trend.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-center text-base font-normal text-black/70 md:text-lg">
          Hire the best applicants for your open tech position Focus on skills not just resumes
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="text-primary-medium-blue rounded-md bg-white px-4 py-2 font-medium transition-colors hover:bg-neutral-100">
            Learn More
          </button>
          <button className="rounded-md bg-transparent px-4 py-2 text-white ring-1 ring-white/70 transition-colors hover:bg-white/10">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
