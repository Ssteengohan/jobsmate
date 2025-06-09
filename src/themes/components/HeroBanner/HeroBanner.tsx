'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { PortableTextBlock } from '@portabletext/types';
import { client } from '@/sanity/lib/client';
import { HERO_BANNER_QUERY } from '@/sanity/lib/queries';
import { urlFor, getBlurDataURL } from '@/sanity/lib/image';
import { renderPortableText } from '@/sanity/lib/portableText';

interface CtaButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
  ariaLabel?: string;
  isExternal?: boolean;
}

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

interface HeroBannerData {
  title: PortableTextBlock[];
  subtitle: string;
  ctaButtons: CtaButton[];
  backgroundImage?: SanityImage;
  showGradientOverlay: boolean;
}

export function SpotlightPreview() {
  const [heroBannerData, setHeroBannerData] = useState<HeroBannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroBannerData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(HERO_BANNER_QUERY);
        setHeroBannerData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching hero banner data:', err);
        setError('Failed to load hero banner content');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroBannerData();
  }, []);

  if (loading) {
    return (
      <div className="relative z-0 flex h-screen w-full items-center justify-center overflow-hidden antialiased sm:h-[45rem]">
        <div className="animate-pulse text-center">
          <div className="mx-auto mb-4 h-12 w-96 rounded-lg bg-gray-300"></div>
          <div className="mx-auto mb-8 h-6 w-64 rounded bg-gray-200"></div>
          <div className="flex justify-center gap-4">
            <div className="h-12 w-32 rounded-full bg-gray-300"></div>
            <div className="h-12 w-32 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !heroBannerData) {
    return (
      <div className="relative z-0 flex h-screen w-full items-center justify-center overflow-hidden antialiased sm:h-[45rem]">
        <div className="text-center">
          <p className="mb-4 text-red-500">{error || 'Hero banner data not found'}</p>
          <p className="text-gray-500">Please check your Sanity configuration.</p>
        </div>
      </div>
    );
  }

  const backgroundImageUrl = heroBannerData.backgroundImage
    ? urlFor(heroBannerData.backgroundImage).width(1920).height(1080).url()
    : null;

  const backgroundBlurDataURL = heroBannerData.backgroundImage
    ? getBlurDataURL(heroBannerData.backgroundImage)
    : null;

  const renderCtaButton = (button: CtaButton, index: number) => {
    // Safety check to prevent undefined href errors
    if (!button.href || !button.text) {
      console.warn('CTA button missing required fields:', button);
      return null;
    }

    if (button.variant === 'primary') {
      return (
        <Link
          key={index}
          href={button.href}
          aria-label={button.ariaLabel || button.text}
          className="group relative flex cursor-pointer items-center justify-center rounded-full border border-transparent bg-[var(--primary-gold)] px-8 py-3 text-xs font-medium text-[var(--primary-dark-blue)] transition-all duration-300 ease-in-out hover:scale-105 hover:border-transparent hover:shadow-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:ring-offset-2 focus:outline-none sm:text-sm dark:text-[var(--primary-dark)] dark:hover:shadow-[0_0_15px_rgba(240,180,41,0.4)]"
        >
          <div className="via-primary-light-blue absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-70 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100 group-hover:shadow-md" />
          <div className="via-primary-gold absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100" />
          <div className="from-primary-light-blue via-primary-medium-blue to-primary-gold absolute -top-px -right-px -left-px h-[3px] w-0 rounded-t-full bg-gradient-to-r transition-all duration-700 group-hover:w-full" />
          <span className="relative z-20 text-center transition-all duration-300">
            {button.text}
          </span>
        </Link>
      );
    } else {
      return (
        <Link
          key={index}
          href={button.href}
          aria-label={button.ariaLabel || button.text}
          className="group relative inline-flex cursor-pointer overflow-hidden rounded-full p-[1px] shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl focus:ring-2 focus:ring-[var(--primary-light-blue)] focus:ring-offset-2 focus:outline-none dark:hover:shadow-[0_0_20px_rgba(42,151,219,0.4)]"
        >
          <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary-light-blue)_0%,var(--primary-medium-blue)_40%,var(--primary-gold)_70%,var(--primary-dark)_100%)] opacity-80 transition-all duration-300 ease-in-out group-hover:animate-[spin_3s_linear_infinite] group-hover:opacity-100" />
          <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-[var(--primary-light-blue)] backdrop-blur-3xl transition-all duration-300 ease-in-out group-hover:bg-[var(--primary-light-blue)] group-hover:text-white group-hover:shadow-inner dark:bg-[var(--neutral-50)] dark:text-[var(--primary-medium-blue)] dark:group-hover:bg-[var(--primary-dark-blue)] dark:group-hover:text-white dark:group-hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
            {button.text}
          </span>
        </Link>
      );
    }
  };

  return (
    <div className="relative z-0 flex h-screen w-full items-center overflow-hidden antialiased sm:h-[45rem] md:justify-center">
      {/* Background Image */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 -z-20">
          <Image
            src={backgroundImageUrl}
            alt="Hero background"
            fill
            className="object-cover"
            priority
            placeholder={backgroundBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={backgroundBlurDataURL || undefined}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 -z-10 ${
          heroBannerData.showGradientOverlay
            ? 'bg-gradient-to-b from-transparent to-gray-50/30 dark:bg-[#202735] dark:bg-none'
            : backgroundImageUrl
              ? 'bg-black/20 dark:bg-black/40'
              : 'bg-gradient-to-b from-transparent to-gray-50/30 dark:bg-[#202735] dark:bg-none'
        }`}
      />

      <div className="relative z-10 mx-auto w-full pt-20 sm:max-w-7xl md:pt-0">
        {/* Title with Portable Text */}
        <div className="text-center text-5xl font-bold md:text-8xl">
          {renderPortableText(heroBannerData.title)}
        </div>

        {/* Subtitle */}
        <p className="mx-auto mt-2 max-w-lg text-center text-base font-normal text-neutral-500 sm:mt-6 md:text-lg dark:text-neutral-300">
          {heroBannerData.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 px-4 sm:flex-row">
          {heroBannerData.ctaButtons
            ?.filter((button) => button.href && button.text)
            .map((button, index) => renderCtaButton(button, index))
            .filter(Boolean)}
        </div>
      </div>
    </div>
  );
}
