import Navbar from '@/themes/components/Navbar/Navbar';
import { SpotlightPreview } from '@/themes/components/HeroBanner/HeroBanner';

export default function Home() {
  return (
    <main className="mx-auto">
      <Navbar />
      <SpotlightPreview />
    </main>
  );
}
