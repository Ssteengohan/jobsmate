import Navbar from '@/themes/components/Navbar/Navbar';
import { SpotlightPreview } from '@/themes/components/HeroBanner/HeroBanner';
import Tabs from '@/themes/components/Tabs/Tabs';

export default function Home() {
  return (
    <main className="relative mx-auto min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-y-0 left-[10%] w-[0.5px] bg-neutral-400 opacity-20"></div>
      <div className="absolute inset-y-0 left-[90%] w-[0.5px] bg-neutral-400 opacity-20"></div>
      <div className="absolute inset-x-0 top-[80%] h-px bg-neutral-400 opacity-10"></div>
      <Navbar />
      <SpotlightPreview />
      <Tabs />
    </main>
  );
}
