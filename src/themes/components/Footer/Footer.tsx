import React from 'react';
import { SparklesPreview } from './Sparkles';

const Footer = () => {
  return (
    <section className="relative z-10 flex h-[50vh] w-full items-center justify-center border-t-1 border-neutral-300 bg-[#f9f5eb] dark:border-[#f0b429]/30 dark:bg-[#1a2637]">
      <div>
        <SparklesPreview />
      </div>
      <div></div>
    </section>
  );
};

export default Footer;
