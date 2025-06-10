'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { PRICING_CARD_QUERY } from '@/sanity/lib/queries';
import { PricingCardData } from '@/types/pricingCard';

// Custom CheckIcon component
const CheckIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Cross Icon for excluded features
const CrossIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

interface PricingCardProps {
  initialData?: PricingCardData | null;
}

// Fallback data structure matching old interface
const defaultTiers = [
  {
    name: 'Free',
    price: { amount: '$0', period: '/month' },
    description: 'Perfect for small teams just getting started',
    features: [
      { text: 'Up to 5 job postings', included: true },
      { text: 'Basic applicant tracking', included: true },
      { text: 'Email notifications', included: true },
      { text: 'Resume parsing', included: true },
      { text: 'Team collaboration tools', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'API access', included: false },
    ],
    ctaButton: { text: 'Get Started', url: 'https://platform.jobsmate.global/company/onboarding/preferences', style: 'gradient', openInNewTab: true },
    isHighlighted: false,
  },
  {
    name: 'Business',
    price: { amount: '$49', period: '/month' },
    description: 'Everything you need for growing companies',
    features: [
      { text: 'Unlimited job postings', included: true },
      { text: 'Advanced applicant tracking', included: true },
      { text: 'Email & SMS notifications', included: true },
      { text: 'Resume parsing & AI matching', included: true },
      { text: 'Team collaboration tools', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'API access', included: false },
    ],
    ctaButton: { text: 'Start 14-day trial', url: 'https://calendly.com/info-jtq/jobsmate-introduction', style: 'primary', openInNewTab: true },
    isHighlighted: true,
  },
  {
    name: 'Enterprise',
    price: { amount: '$199', period: '/month' },
    description: 'Custom solutions for large organizations',
    features: [
      { text: 'Unlimited job postings', included: true },
      { text: 'Full-featured ATS integration', included: true },
      { text: 'All notifications & alerts', included: true },
      { text: 'AI-powered candidate matching', included: true },
      { text: 'Advanced team collaboration', included: true },
      { text: 'Custom analytics & reporting', included: true },
      { text: 'Full API access & custom integrations', included: true },
    ],
    ctaButton: { text: 'Contact Sales', url: 'https://calendly.com/info-jtq/jobsmate-introduction', style: 'gradient', openInNewTab: true },
    isHighlighted: false,
  },
];

const PricingCard: React.FC<PricingCardProps> = ({ initialData }) => {
  const [pricingData, setPricingData] = useState<PricingCardData | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) return;

    const fetchPricingData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(PRICING_CARD_QUERY);
        
        if (!data) {
          setError('No pricing data found. Please add a pricing card document in Sanity.');
          return;
        }

        setPricingData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching pricing data:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to load pricing data: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingData();
  }, [initialData]);

  // Show loading state
  if (loading) {
    return (
      <div className="relative container flex min-h-[90vh] justify-center bg-gradient-to-b from-white to-[#fcf4e5] px-2 py-4 sm:min-h-[90vh] sm:px-6 md:py-12 lg:px-8 dark:bg-[#1e2635] dark:bg-none">
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-48 animate-pulse rounded bg-gray-300"></div>
            <div className="mx-auto h-4 w-64 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  // Use fallback data if error or no data
  const displayData = pricingData || {
    sectionHeader: {
      title: { beforeHighlight: 'Simple, transparent', highlightedWord: 'pricing' },
      subtitle: 'Choose the plan that\'s right for your business'
    },
    pricingTiers: defaultTiers,
    sectionSettings: { backgroundColor: 'gradient' },
    seoSettings: { sectionId: 'pricing-card' }
  };

  if (error) {
    console.warn('Using fallback pricing data:', error);
  }

  const getButtonStyle = (style: string) => {
    switch (style) {
      case 'primary':
        return "group text-2xs relative w-full cursor-pointer rounded-full border border-transparent bg-[var(--primary-gold)] px-3 py-1.5 text-center font-medium text-[var(--primary-dark-blue)] transition-all duration-300 ease-in-out hover:shadow-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:ring-offset-2 focus:outline-none sm:px-4 sm:py-2 sm:text-xs md:px-6 md:py-3 md:text-sm dark:text-[var(--primary-dark)] dark:hover:shadow-[0_0_15px_rgba(240,180,41,0.4)]";
      case 'gradient':
      default:
        return "group relative inline-flex w-full cursor-pointer justify-center overflow-hidden rounded-full p-[1px] shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl focus:ring-2 focus:ring-[var(--primary-light-blue)] focus:ring-offset-2 focus:outline-none dark:hover:shadow-[0_0_20px_rgba(42,151,219,0.4)]";
    }
  };

  return (
    <div
      id={displayData.seoSettings?.sectionId || 'pricing-card'}
      className="relative container flex min-h-[90vh] justify-center bg-gradient-to-b from-white to-[#fcf4e5] px-2 py-4 sm:min-h-[90vh] sm:px-6 md:py-12 lg:px-8 dark:bg-[#1e2635] dark:bg-none"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 py-6 md:gap-12 md:py-12 md:pt-0">
        <div className="mb-4 text-center md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pb-1 text-center text-3xl leading-tight font-bold tracking-tight sm:pt-12 sm:pb-2 sm:leading-relaxed md:text-6xl"
          >
            {displayData.sectionHeader.title.beforeHighlight}{' '}
            <span className="bg-[var(--primary-gold)] bg-clip-text text-transparent">
              {displayData.sectionHeader.title.highlightedWord}
            </span>
            {'afterHighlight' in displayData.sectionHeader.title && displayData.sectionHeader.title.afterHighlight && ` ${displayData.sectionHeader.title.afterHighlight}`}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 text-sm text-neutral-500 md:mt-4 md:text-lg dark:text-neutral-300"
          >
            {displayData.sectionHeader.subtitle}
          </motion.p>
        </div>

        <div className="mt-4 grid w-full cursor-pointer grid-cols-1 gap-4 sm:mt-8 sm:gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {displayData.pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -6,
                boxShadow: tier.isHighlighted
                  ? '0 20px 30px -10px rgba(240, 180, 41, 0.3)'
                  : '0 20px 30px -10px rgba(0, 0, 0, 0.2)',
              }}
              transition={{
                default: {
                  type: 'tween',
                  ease: 'easeOut',
                  duration: 0.3,
                },
                opacity: {
                  duration: 0.2,
                  delay: 0.0 * (index + 1),
                },
                y: {
                  duration: 0.2,
                  delay: 0.0 * (index + 1),
                },
              }}
              className={`flex transform-gpu flex-col overflow-hidden rounded-xl will-change-transform sm:rounded-2xl ${
                tier.isHighlighted
                  ? 'z-10 border-2 border-[var(--primary-gold)] shadow-lg md:h-auto lg:-mt-8 lg:h-[600px] lg:shadow-xl dark:border-[var(--primary-gold)]'
                  : 'border border-neutral-200 shadow-md sm:shadow-lg dark:border-neutral-700'
              } bg-white transition-all duration-300 ease-in-out dark:bg-[var(--neutral-50)]`}
            >
              <div
                className={`px-3 py-4 sm:px-6 sm:py-8 ${tier.isHighlighted ? 'bg-[var(--primary-gold)]/10 dark:bg-[var(--primary-gold)]/20' : ''}`}
              >
                {tier.price && typeof tier.price === 'object' && 'discountBadge' in tier.price && tier.price.discountBadge && (
                  <div className="mb-2 inline-block rounded-full bg-[var(--primary-gold)] px-3 py-1 text-xs font-semibold text-[var(--primary-dark-blue)]">
                    {tier.price.discountBadge}
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-neutral-900 sm:text-2xl dark:text-white">
                  {tier.name}
                </h3>
                
                <div className="mt-2 flex items-baseline">
                  {tier.price && typeof tier.price === 'object' && 'originalPrice' in tier.price && tier.price.originalPrice && (
                    <span className="mr-2 text-lg text-gray-500 line-through dark:text-gray-400">
                      {tier.price.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-neutral-900 sm:text-4xl dark:text-white">
                    {tier.price?.amount || '$0'}
                  </span>
                  {tier.price?.period && (
                    <span className="ml-1 text-sm text-neutral-500 dark:text-neutral-300">
                      {tier.price.period}
                    </span>
                  )}
                </div>
                
                <p className="mt-2 text-sm text-neutral-600 sm:text-base dark:text-neutral-300">
                  {tier.description}
                </p>
              </div>

              <div className="flex flex-1 flex-col justify-between px-3 py-4 sm:px-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0">
                        {feature.included ? (
                          <CheckIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <CrossIcon className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                      <span
                        className={`ml-3 text-sm ${
                          feature.included
                            ? 'text-neutral-700 dark:text-neutral-200'
                            : 'text-neutral-400 dark:text-neutral-500'
                        } ${'highlight' in feature && (feature as { highlight?: boolean }).highlight ? 'font-semibold text-[var(--primary-gold)]' : ''}`}
                        title={'tooltip' in feature ? (feature as { tooltip?: string }).tooltip : undefined}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link
                    href={tier.ctaButton?.url || '#'}
                    target={tier.ctaButton?.openInNewTab ? '_blank' : '_self'}
                    className="block w-full"
                    aria-label={'ariaLabel' in (tier.ctaButton || {}) ? (tier.ctaButton as { ariaLabel?: string }).ariaLabel : `${tier.ctaButton?.text} for ${tier.name} plan`}
                  >
                    {tier.ctaButton?.style === 'primary' ? (
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                          type: 'tween',
                          ease: 'easeOut',
                          duration: 0.2,
                        }}
                        className={getButtonStyle('primary')}
                      >
                        <div className="via-primary-light-blue absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-70 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100 group-hover:shadow-md" />
                        <div className="via-primary-gold absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100" />
                        <span className="relative z-20 transition-all duration-300">
                          {tier.ctaButton?.text}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{
                          scale: 1.03,
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                          default: {
                            type: 'tween',
                            ease: 'easeOut',
                            duration: 0.2,
                          },
                        }}
                        className={getButtonStyle('gradient')}
                      >
                        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary-light-blue)_0%,var(--primary-medium-blue)_40%,var(--primary-gold)_70%,var(--primary-dark)_100%)] opacity-80 transition-all duration-300 ease-in-out group-hover:animate-[spin_3s_linear_infinite] group-hover:opacity-100" />
                        <span className="text-2xs relative z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-white px-3 py-1.5 font-medium text-[var(--primary-light-blue)] backdrop-blur-3xl transition-all duration-300 ease-in-out group-hover:bg-[var(--primary-light-blue)] group-hover:text-white group-hover:shadow-inner sm:px-4 sm:py-2 sm:text-xs md:px-6 md:py-3 md:text-sm dark:bg-[var(--neutral-50)] dark:text-[var(--primary-medium-blue)] dark:group-hover:bg-[var(--primary-dark-blue)] dark:group-hover:text-white dark:group-hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
                          {tier.ctaButton?.text}
                        </span>
                      </motion.div>
                    )}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
