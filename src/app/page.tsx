'use client';

import Navbar from '@/themes/components/Navbar/Navbar';
import { SpotlightPreview } from '@/themes/components/HeroBanner/HeroBanner';
import { TabsDemo } from '@/themes/components/Tabs/Tabs';
import { Spotlight } from '@/themes/components/ui/Spotlight';
import Slider from '@/themes/components/Slider/Slider';
import { TimelineDemo } from '@/themes/components/TimeLine/TimeLine';
import PricingCard from '@/themes/components/PricingCard/PricingCard';
import ShowCase from '@/themes/components/ShowCases/ShowCase';
import Footer from '@/themes/components/Footer/Footer';
import Card from '@/themes/components/Cards/Card';

export default function Home() {
  return (
    <main className="mx-auto min-h-screen overflow-hidden bg-gradient-to-b from-white via-[#f9f9f9] to-[var(--primary-gold)]/15 transition-colors duration-300 dark:bg-[var(--neutral-50)] dark:bg-none">
      <Navbar />
      <div className="relative z-20 container">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-gray-50/30 transition-colors duration-300 dark:from-transparent dark:to-[var(--primary-dark)]/20" />
        <div className="absolute inset-y-0 left-[1%] z-10 hidden w-[1px] bg-neutral-400 opacity-30 lg:block dark:bg-[var(--primary-gold)]/80"></div>
        <div className="absolute inset-y-0 left-[99%] z-10 hidden w-[1px] bg-neutral-400 opacity-30 lg:block dark:bg-[var(--primary-gold)]/80"></div>

        <Spotlight
          className="-top-20 -left-10 z-25 sm:-top-30 sm:left-0 md:top-[10vh] md:left-1/3"
          fill="rgba(59, 130, 246, 0.25)"
          darkModeFill="rgba(58, 168, 236, 0.35)"
        />
        <Spotlight
          className="-top-20 -left-10 z-25 sm:-top-30 sm:left-0 md:top-[10vh] md:left-1/4"
          fill="rgba(59, 130, 246, 0.2)"
          darkModeFill="rgba(58, 168, 236, 0.2)"
        />

        <Spotlight
          className="-top-10 -right-10 z-25 sm:top-0 sm:right-1/4 md:top-0 md:right-1/4 2xl:top-3/4 2xl:right-2/6"
          fill="rgba(234, 179, 8, 0.15)"
          darkModeFill="rgba(142, 85, 255, 0.22)"
        />

        <SpotlightPreview />
      </div>
      <div className="relative z-10 container">
        <div className="absolute inset-y-0 left-[1%] z-10 hidden w-[1px] bg-neutral-400 opacity-30 lg:block dark:bg-[var(--primary-gold)]"></div>
        <div className="absolute inset-y-0 left-[99%] z-10 hidden w-[1px] bg-neutral-400 opacity-30 lg:block dark:bg-[var(--primary-gold)]"></div>
        <TabsDemo />
      </div>
      <div className="relative z-5 container">
        <div className="absolute inset-y-0 left-[1%] z-10 hidden w-[1px] bg-neutral-400 opacity-30 lg:block dark:bg-[var(--primary-gold)]/90"></div>
        <div className="absolute inset-y-0 left-[99%] z-10 hidden w-[1px] bg-neutral-400 opacity-30 lg:block dark:bg-[var(--primary-gold)]/90"></div>
        <Slider />

        {/* ShowCase component with responsive SVG paths */}
        <ShowCase />
        <TimelineDemo />
        <Card />
        <PricingCard />
      </div>
      <Footer />
    </main>
  );
}
