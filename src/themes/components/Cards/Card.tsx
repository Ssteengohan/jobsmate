'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { FREE_TRIAL_CARD_QUERY } from '@/sanity/lib/queries';
import { FreeTrialCardData } from '@/types/freeTrialCard';

interface CardProps {
  initialData?: FreeTrialCardData | null;
}

const Card = ({ initialData }: CardProps) => {
  const [cardData, setCardData] = useState<FreeTrialCardData | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) return;

    const fetchCardData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(FREE_TRIAL_CARD_QUERY);

        if (!data) {
          setError(
            'No free trial card data found. Please add a free trial card document in Sanity.',
          );
          return;
        }

        setCardData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching free trial card data:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to load free trial card data: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [initialData]);

  // Show loading state
  if (loading) {
    return (
      <section className="container mx-auto flex h-auto min-h-[700px] w-full flex-col items-center justify-center border-t border-b border-black/20 bg-white p-4 shadow-lg md:h-[40vh] md:flex-row md:p-8 dark:border-white/30 dark:bg-[#1e2635]">
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-48 animate-pulse rounded bg-gray-300"></div>
            <div className="mx-auto h-4 w-64 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state with fallback content
  if (error || !cardData) {
    console.warn('Using fallback free trial card content:', error);
    // Use original hardcoded content as fallback
    return (
      <section className="container mx-auto flex h-auto min-h-[700px] w-full flex-col items-center justify-center border-t border-b border-black/20 bg-white p-4 shadow-lg md:h-[40vh] md:flex-row md:p-8 dark:border-white/30 dark:bg-[#1e2635]">
        <div className="mx-auto flex h-full w-full flex-col items-center justify-center py-8 md:w-1/2 md:py-0">
          <div>
            <span className="text-center text-2xl font-bold text-[var(--primary-dark-blue)] md:text-left md:text-4xl dark:text-white">
              Start with a 14-day
            </span>
            <span className="text-center text-2xl text-[var(--primary-dark-blue)] md:text-left md:text-4xl dark:text-white">
              free trial of Pro
            </span>
          </div>
          {/* Rest of fallback content... */}
        </div>
      </section>
    );
  }

  // Render with Sanity data
  return (
    <section className="container mx-auto flex h-auto min-h-[700px] w-full flex-col items-center justify-center border-t border-b border-black/20 bg-white p-4 shadow-lg md:h-[40vh] md:flex-row md:p-8 dark:border-white/30 dark:bg-[#1e2635]">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center py-8 md:w-1/2 md:py-0">
        <div>
          <span className="text-center text-2xl font-bold text-[var(--primary-dark-blue)] md:text-left md:text-4xl dark:text-white">
            {cardData.title.line1}
          </span>
          <span className="text-center text-2xl text-[var(--primary-dark-blue)] md:text-left md:text-4xl dark:text-white">
            {cardData.title.line2}
          </span>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4 pt-6 md:flex-row md:flex-wrap md:items-start md:pt-10">
          <Link
            href={cardData.buttons.primaryButton.href}
            target="_blank"
            aria-label={cardData.buttons.primaryButton.ariaLabel}
            className="card-button group relative w-full max-w-[240px] cursor-pointer rounded-full border border-transparent bg-[var(--primary-gold)] px-8 py-3 text-center text-xs font-medium text-[var(--primary-dark-blue)] transition-all duration-300 ease-in-out hover:border-transparent hover:shadow-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:ring-offset-2 focus:outline-none sm:text-sm md:w-auto dark:text-[var(--primary-dark)] dark:hover:shadow-[0_0_15px_rgba(240,180,41,0.4)]"
          >
            <div className="via-primary-light-blue absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-70 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100 group-hover:shadow-md" />
            <div className="via-primary-gold absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100" />
            <div className="from-primary-light-blue via-primary-medium-blue to-primary-gold absolute -top-px -right-px -left-px h-[3px] w-0 rounded-t-full bg-gradient-to-r transition-all duration-700 group-hover:w-full" />
            <span className="relative z-20 transition-all duration-300">
              {cardData.buttons.primaryButton.text}
            </span>
          </Link>

          <Link
            href={cardData.buttons.secondaryButton.href}
            aria-label={cardData.buttons.secondaryButton.ariaLabel}
            className="card-button group relative inline-flex w-full max-w-[240px] cursor-pointer overflow-hidden rounded-full p-[1px] text-center shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl focus:ring-2 focus:ring-[var(--primary-light-blue)] focus:ring-offset-2 focus:outline-none md:w-auto dark:hover:shadow-[0_0_20px_rgba(42,151,219,0.4)]"
          >
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary-light-blue)_0%,var(--primary-medium-blue)_40%,var(--primary-gold)_70%,var(--primary-dark)_100%)] opacity-80 transition-all duration-300 ease-in-out group-hover:animate-[spin_3s_linear_infinite] group-hover:opacity-100" />
            <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-[var(--primary-light-blue)] backdrop-blur-3xl transition-all duration-300 ease-in-out group-hover:bg-[var(--primary-light-blue)] group-hover:text-white group-hover:shadow-inner dark:bg-[var(--neutral-50)] dark:text-[var(--primary-medium-blue)] dark:group-hover:bg-[var(--primary-dark-blue)] dark:group-hover:text-white dark:group-hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
              {cardData.buttons.secondaryButton.text}
            </span>
          </Link>
        </div>
      </div>
      <div className="relative mt-4 flex h-[400px] w-full items-center justify-center overflow-hidden md:mt-0 md:h-full md:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br bg-none from-[var(--primary-light-blue)]/10 to-[var(--primary-gold)]/10 opacity-60 dark:opacity-100"></div>
        <div className="relative z-10 w-full max-w-xs md:max-w-md">
          <div className="absolute -top-6 -right-4 z-20 rounded-lg border border-[var(--primary-light-blue)]/20 bg-white p-2 shadow-lg md:-top-10 md:-right-10 md:p-3 dark:border-[var(--primary-light-blue)]/40 dark:bg-[var(--neutral-50)]">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {cardData.stats.timeSaved.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[var(--primary-medium-blue)] md:text-2xl">
                {cardData.stats.timeSaved.percentage}%
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-500">
                ↑{cardData.stats.timeSaved.increase}%
              </span>
            </div>
          </div>

          <div className="absolute -right-2 -bottom-4 rounded-lg border border-[var(--primary-gold)]/20 bg-white p-2 shadow-lg md:-right-4 md:-bottom-6 md:p-3 dark:border-[var(--primary-gold)]/40 dark:bg-[var(--neutral-50)]">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {cardData.stats.hireQuality.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[var(--primary-gold)] md:text-2xl">
                {cardData.stats.hireQuality.percentage}%
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-500">
                ↑{cardData.stats.hireQuality.increase}%
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200/70 shadow-xl md:shadow-2xl dark:border-white/20">
            {/* Replace with fallback UI since we don't have the dashboard image */}
            <div className="h-52 w-full bg-gradient-to-br from-[var(--primary-light-blue)] to-[var(--primary-gold)] p-4">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-2 w-24 rounded bg-white/30"></div>
                  <div className="h-6 w-40 rounded bg-white/50"></div>
                  <div className="h-2 w-32 rounded bg-white/30"></div>
                </div>

                <div className="flex justify-between">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="chart-bar h-16 w-16 rounded-md bg-white/20" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1 md:mt-4 md:gap-2">
            {cardData.metrics.map((metric, i) => (
              <div
                key={i}
                className="metric-item rounded border border-gray-200/20 bg-white/80 p-1 text-center backdrop-blur-sm md:p-2 dark:border-white/5 dark:bg-white/10"
              >
                <span className="text-[10px] font-medium text-[var(--primary-dark-blue)] md:text-xs dark:text-white">
                  {metric.text}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-200 md:mt-4 md:h-1.5 dark:bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary-light-blue)] to-[var(--primary-gold)]"
              style={{ width: `${cardData.progressBar.percentage}%` }}
            />
          </div>

          <div className="absolute -top-2 -left-2 rounded-full bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-light-blue)] px-2 py-0.5 text-[10px] font-bold text-white shadow-lg md:-top-4 md:-left-4 md:px-3 md:py-1 md:text-xs">
            PRO
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
