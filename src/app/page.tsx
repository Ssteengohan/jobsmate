'use client';

import Navbar from '@/themes/components/Navbar/Navbar';
import { SpotlightPreview } from '@/themes/components/HeroBanner/HeroBanner';
import { TabsDemo } from '@/themes/components/Tabs/Tabs';
import { Spotlight } from '@/themes/components/ui/Spotlight';
import CustomCursor from '@/themes/components/ui/CustomCursor';
import Slider from '@/themes/components/Slider/Slider';
import { TimelineDemo } from '@/themes/components/TimeLine/TimeLine';

export default function Home() {
  return (
    <main className="mx-auto min-h-screen overflow-hidden bg-white transition-colors duration-300 dark:bg-[var(--neutral-50)]">
      <CustomCursor />
      <Navbar />
      <div className="relative container">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-gray-50/30 transition-colors duration-300 dark:from-transparent dark:to-[var(--primary-dark)]/20" />
        <div className="absolute inset-y-0 left-[1%] z-10 hidden w-[1px] bg-neutral-400 opacity-30 lg:block dark:bg-neutral-500"></div>
        <div className="absolute inset-y-0 left-[99%] z-10 hidden w-[1px] bg-neutral-400 opacity-30 lg:block dark:bg-neutral-500"></div>

        <Spotlight
          className="-top-20 -left-10 z-25 sm:-top-30 sm:left-0 md:-top-1/8 md:left-1/3"
          fill="rgba(59, 130, 246, 0.15)"
          darkModeFill="rgba(58, 168, 236, 0.25)"
        />

        <Spotlight
          className="-top-10 -right-10 z-25 sm:top-0 sm:right-1/4 md:top-0 md:right-1/4 2xl:-top-1/12 2xl:right-2/6"
          fill="rgba(234, 179, 8, 0.15)"
          darkModeFill="rgba(142, 85, 255, 0.22)"
        />

        <SpotlightPreview />

        <div className="relative">
          <TabsDemo />
          <Slider />
        </div>
        <TimelineDemo />
      </div>
    </main>
  );
}
