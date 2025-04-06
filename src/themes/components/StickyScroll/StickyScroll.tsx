'use client';
import React from 'react';
import { StickyScroll } from '../ui/sticky-scroll-reveal';
import Image from 'next/image';
import Loading from './Loading';

const content = [
  {
    title: 'Views on one jobs post',
    description:
      'We increase the quality of candidates that view your job post, by getting in touch with them and letting them know about your company. ',
    content: (
      <div className="group relative flex h-full w-full items-center justify-center p-4 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-10"></div>
        <Image
          src="/icons.avif"
          width={600}
          height={600}
          className="h-full w-full rounded-lg object-cover transition-all duration-300"
          alt="job search dashboard"
          priority
        />
      </div>
    ),
  },
  {
    title: 'Apply rate',
    description:
      'You get a higher apply rate on the job post with suitable candidates. Our platform ensures that your job post reaches the right audience, increasing the chances of receiving applications from qualified professionals who match your requirements. This saves you time and effort in finding the perfect candidate.',
    content: (
      <div className="group relative flex h-full w-full items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-10"></div>
        <div className="flex h-full w-full items-center justify-center">
          <Loading />
        </div>
      </div>
    ),
  },
  {
    title: 'Finished assessments',
    description:
      'Let us do the job for you, so you can focus on the interview. We make sure that the assessment gets completed efficiently and effectively. Our system tracks progress and ensures that candidates complete their assessments on time, providing you with reliable data to make informed decisions during the hiring process.',
    content: (
      <div className="group relative flex h-full w-full items-center justify-center p-4 text-white">
        <div className="absolute inset-0 opacity-10"></div>
        <Image
          src="/finished.avif"
          width={600}
          height={600}
          className="h-full w-full rounded-lg object-cover transition-all duration-300"
          alt="interview preparation"
          priority
        />
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="relative z-0 w-full">
      <StickyScroll content={content} />
    </div>
  );
}
