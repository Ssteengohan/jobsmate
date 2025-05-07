'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  highlighted?: boolean;
}

interface PricingCardProps {
  tiers?: PricingTier[];
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
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
    buttonText: 'Get Started',
  },
  {
    name: 'Business',
    price: '$49',
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
    buttonText: 'Start 14-day trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$199',
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
    buttonText: 'Contact Sales',
  },
];

const PricingCard: React.FC<PricingCardProps> = ({ tiers = defaultTiers }) => {
  return (
    <div
      id="pricing-card"
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
            Simple, transparent{' '}
            <span className="bg-[var(--primary-gold)] bg-clip-text text-transparent">pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 text-sm text-neutral-500 md:mt-4 md:text-lg dark:text-neutral-300"
          >
            Choose the plan that&apos;s right for your business
          </motion.p>
        </div>

        <div className="mt-4 grid w-full cursor-pointer grid-cols-1 gap-4 sm:mt-8 sm:gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -6,
                boxShadow: tier.highlighted
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
                tier.highlighted
                  ? 'z-10 border-2 border-[var(--primary-gold)] shadow-lg md:h-auto lg:-mt-8 lg:h-[600px] lg:shadow-xl dark:border-[var(--primary-gold)]'
                  : 'border border-neutral-200 shadow-md sm:shadow-lg dark:border-neutral-700'
              } bg-white transition-all duration-300 ease-in-out dark:bg-[var(--neutral-50)]`}
            >
              <div
                className={`px-3 py-4 sm:px-6 sm:py-8 ${tier.highlighted ? 'bg-[var(--primary-gold)]/10 dark:bg-[var(--primary-gold)]/20' : ''}`}
              >
                <h3 className="text-base font-semibold text-neutral-900 sm:text-lg dark:text-white">
                  {tier.name}
                </h3>
                <div className="mt-2 flex items-baseline md:mt-4">
                  <span className="text-2xl font-bold tracking-tight text-[var(--primary-dark-blue)] md:text-4xl dark:text-[var(--primary-light-blue)]">
                    {tier.price}
                  </span>
                  <span className="ml-1 text-xs font-medium text-neutral-500 sm:text-base md:text-lg dark:text-neutral-300">
                    /month
                  </span>
                </div>
                <p className="text-2xs mt-2 text-xs text-neutral-500 sm:mt-4 sm:text-sm dark:text-neutral-400">
                  {tier.description}
                </p>
              </div>

              <div className="flex flex-1 flex-col justify-between px-3 pt-3 pb-4 sm:px-6 sm:pt-6 sm:pb-8">
                <div className="space-y-2 sm:space-y-4">
                  {tier.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-start">
                      <div
                        className={`flex-shrink-0 ${feature.included ? 'text-[var(--primary-light-blue)]' : 'text-neutral-400'}`}
                      >
                        <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      </div>
                      <p
                        className={`text-2xs ml-1.5 sm:ml-3 sm:text-xs md:text-sm ${feature.included ? 'text-neutral-700 dark:text-neutral-200' : 'text-neutral-400 line-through dark:text-neutral-500'}`}
                      >
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6 md:mt-8">
                  {tier.highlighted ? (
                    <Link
                      href="https://platform.jobsmate.global/company/onboarding/preferences?_gl=1*1wymypx*_ga*NzU1NTc2NDU5LjE3NDU3NjU2Nzk.*_ga_0YKSTQGZFY*MTc0NTc2NTY3OC4xLjAuMTc0NTc2NTY3OC4wLjAuMA"
                      target="_blank"
                      className="block w-full"
                      aria-label={`${tier.buttonText} for ${tier.name} plan`}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.03,
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                          type: 'tween',
                          ease: 'easeOut',
                          duration: 0.2,
                        }}
                        className="group text-2xs relative w-full cursor-pointer rounded-full border border-transparent bg-[var(--primary-gold)] px-3 py-1.5 text-center font-medium text-[var(--primary-dark-blue)] transition-all duration-300 ease-in-out hover:shadow-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:ring-offset-2 focus:outline-none sm:px-4 sm:py-2 sm:text-xs md:px-6 md:py-3 md:text-sm dark:text-[var(--primary-dark)] dark:hover:shadow-[0_0_15px_rgba(240,180,41,0.4)]"
                      >
                        <div className="via-primary-light-blue absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-70 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100 group-hover:shadow-md" />
                        <div className="via-primary-gold absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100" />
                        <span className="relative z-20 transition-all duration-300">
                          {tier.buttonText}
                        </span>
                      </motion.div>
                    </Link>
                  ) : (
                    <Link
                      href={
                        tier.name === 'Free'
                          ? 'https://platform.jobsmate.global/company/onboarding/preferences?_gl=1*1wymypx*_ga*NzU1NTc2NDU5LjE3NDU3NjU2Nzk.*_ga_0YKSTQGZFY*MTc0NTc2NTY3OC4xLjAuMTc0NTc2NTY3OC4wLjAuMA'
                          : 'https://calendly.com/info-jtq/jobsmate-introduction?month=2025-04'
                      }
                      target="_blank"
                      className="block w-full"
                      aria-label={`${tier.buttonText} for ${tier.name} plan`}
                    >
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
                          scale: {
                            type: 'tween',
                            ease: 'easeOut',
                            duration: 0.2,
                          },
                          boxShadow: {
                            type: 'tween',
                            ease: 'easeOut',
                            duration: 0.3,
                          },
                        }}
                        className="group relative inline-flex w-full cursor-pointer justify-center overflow-hidden rounded-full p-[1px] shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl focus:ring-2 focus:ring-[var(--primary-light-blue)] focus:ring-offset-2 focus:outline-none dark:hover:shadow-[0_0_20px_rgba(42,151,219,0.4)]"
                      >
                        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary-light-blue)_0%,var(--primary-medium-blue)_40%,var(--primary-gold)_70%,var(--primary-dark)_100%)] opacity-80 transition-all duration-300 ease-in-out group-hover:animate-[spin_3s_linear_infinite] group-hover:opacity-100" />
                        <span className="text-2xs relative z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-white px-3 py-1.5 font-medium text-[var(--primary-light-blue)] backdrop-blur-3xl transition-all duration-300 ease-in-out group-hover:bg-[var(--primary-light-blue)] group-hover:text-white group-hover:shadow-inner sm:px-4 sm:py-2 sm:text-xs md:px-6 md:py-3 md:text-sm dark:bg-[var(--neutral-50)] dark:text-[var(--primary-medium-blue)] dark:group-hover:bg-[var(--primary-dark-blue)] dark:group-hover:text-white dark:group-hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
                          {tier.buttonText}
                        </span>
                      </motion.div>
                    </Link>
                  )}
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
