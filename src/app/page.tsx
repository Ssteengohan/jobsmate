import Navbar from '@/themes/components/Navbar/Navbar';
import { SpotlightPreview } from '@/themes/components/HeroBanner/HeroBanner';
import { TabsDemo } from '@/themes/components/Tabs/Tabs';

export default function Home() {
  return (
    <main className="relative mx-auto min-h-screen overflow-hidden bg-white transition-colors duration-300 dark:bg-[var(--background)]">
      <div className="absolute inset-y-0 left-[10%] z-10 w-[1px] bg-neutral-400 opacity-30 dark:bg-neutral-700"></div>
      <div className="absolute inset-y-0 left-[90%] z-10 w-[1px] bg-neutral-400 opacity-30 dark:bg-neutral-700"></div>
      <Navbar />
      <SpotlightPreview />
      <TabsDemo />
    </main>
  );
}
