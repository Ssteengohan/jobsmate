'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { FOOTER_QUERY } from '@/sanity/lib/queries';
import { FooterData, isFooterData } from '@/types/footer';
import { urlFor } from '@/sanity/lib/image';

// Define interfaces for backward compatibility
interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  initialData?: FooterData | null;
}

// Interface for Lenis scroll library access
interface LenisScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  lerp?: number;
  onStart?: () => void;
  onComplete?: () => void;
}

// Smooth scroll handler function for footer links
const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    e.stopPropagation();

    const navbarHeight = document.querySelector('header')?.clientHeight || 80;
    const targetElement = document.querySelector(href);

    if (!targetElement) {
      // For lazy-loaded sections, scroll to trigger loading first
      if (href === '#features') {
        // Scroll down to trigger ShowCase loading
        const triggerPosition = window.innerHeight * 0.7;
        const lenis = (
          window as unknown as {
            lenis?: {
              scrollTo: (target: number | string, options?: LenisScrollOptions) => void;
            };
          }
        ).lenis;

        // Show a subtle loading indicator to enhance UX
        const loadingIndicator = document.createElement('div');
        loadingIndicator.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px 16px;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          border-radius: 20px;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 9999;
        `;
        loadingIndicator.textContent = 'Scrolling to features...';
        document.body.appendChild(loadingIndicator);

        // Fade in the loading indicator
        setTimeout(() => {
          loadingIndicator.style.opacity = '1';
        }, 50);

        if (lenis) {
          // First smooth scroll to trigger section loading
          lenis.scrollTo(triggerPosition, {
            duration: 0.8, // Faster first scroll to reduce waiting time
            easing: (t: number) => 1 - Math.pow(1 - t, 2), // Smoother initial movement
            lerp: 0.1,
            onComplete: () => {
              // After initial scroll completes, look for the target
              setTimeout(() => {
                const retryTarget = document.querySelector(href);
                if (retryTarget) {
                  const elementPosition =
                    retryTarget.getBoundingClientRect().top + window.pageYOffset;
                  const finalPosition = elementPosition - navbarHeight - 20;

                  // Now do the final scroll to exact position
                  lenis.scrollTo(finalPosition, {
                    duration: 1.8, // Longer, smoother final scroll
                    easing: (t: number) => {
                      // Premium easing curve for beautiful scrolling
                      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    },
                    lerp: 0.075, // More precise final positioning
                    onComplete: () => {
                      // Update URL and remove the loading indicator
                      window.history.replaceState({}, '', href);
                      loadingIndicator.style.opacity = '0';
                      setTimeout(() => {
                        loadingIndicator.remove();
                      }, 300);
                    },
                  });
                } else {
                  // If target still not found, clean up
                  loadingIndicator.style.opacity = '0';
                  setTimeout(() => {
                    loadingIndicator.remove();
                  }, 300);
                }
              }, 700); // Reduced waiting time between scrolls
            },
          });
        } else {
          // Fallback for browsers without Lenis
          window.scrollTo({ top: triggerPosition, behavior: 'smooth' });

          // Wait and try to find the target again
          setTimeout(() => {
            const retryTarget = document.querySelector(href);
            if (retryTarget) {
              const elementPosition = retryTarget.getBoundingClientRect().top + window.pageYOffset;
              const finalPosition = elementPosition - navbarHeight - 20;

              window.scrollTo({ top: finalPosition, behavior: 'smooth' });

              // Update URL after scroll completes
              setTimeout(() => {
                window.history.replaceState({}, '', href);
                loadingIndicator.style.opacity = '0';
                setTimeout(() => {
                  loadingIndicator.remove();
                }, 300);
              }, 1000);
            } else {
              // Clean up if target not found
              loadingIndicator.style.opacity = '0';
              setTimeout(() => {
                loadingIndicator.remove();
              }, 300);
            }
          }, 1000);
        }
      }
      return;
    }

    // Element exists, scroll to it directly
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const targetPosition = elementPosition - navbarHeight - 20;

    // Use Lenis for butter-smooth scrolling
    const lenis = (
      window as unknown as {
        lenis?: {
          scrollTo: (target: number | string, options?: LenisScrollOptions) => void;
        };
      }
    ).lenis;

    if (lenis) {
      // Slightly offset the scroll to provide a more natural starting point
      const startOffset = window.scrollY;
      const distance = Math.abs(targetPosition - startOffset);

      // Adjust duration based on scroll distance for a more natural feel
      // Longer distances get slightly more time, with a base minimum
      const baseDuration = 1.2;
      const distanceFactor = Math.min(distance / 2000, 1); // Cap at 1 for very long scrolls
      const adaptiveDuration = baseDuration + distanceFactor * 1.0;

      lenis.scrollTo(targetPosition, {
        duration: adaptiveDuration,
        easing: (t: number) => {
          // Enhanced easing function for ultra-smooth experience
          // This combines cubic and exponential easing for a butter-smooth feel
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        },
        lerp: 0.1, // Linear interpolation factor for extra smoothness
        onStart: () => {
          // Add a subtle visual indication that scrolling is happening
          document.body.style.cursor = 'progress';
        },
        onComplete: () => {
          document.body.style.cursor = '';
          // Update URL after scroll completes
          window.history.replaceState({}, '', href);
        },
      });
    } else {
      // Fallback to native smooth scroll with best possible settings
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Update URL after scroll likely completes
      setTimeout(() => {
        window.history.replaceState({}, '', href);
      }, 1000);
    }
  }
};

const getCurrentYear = () => new Date().getFullYear();

// Default fallback sections for backward compatibility
const defaultFooterSections: FooterSection[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing-card' },
      { label: 'About us', href: 'https://jobsmate.global/why-jobsmate/', isExternal: true },
    ],
  },
  {
    title: 'Contact',
    links: [
      {
        label: 'Abberdaan 56, 1064 AA Amsterdam',
        href: 'https://maps.app.goo.gl/Z1YWD6nBfJsPJt776',
        isExternal: true,
      },
      {
        label: '+31 6 38 27 51 70',
        href: 'tel:+31638275170',
        isExternal: true,
      },
    ],
  },
];

const Footer: React.FC<FooterProps> = ({ initialData }) => {
  const [footerData, setFooterData] = useState<FooterData | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState(getCurrentYear());

  useEffect(() => {
    setCurrentYear(getCurrentYear());
  }, []);

  useEffect(() => {
    if (!initialData) {
      const fetchFooterData = async () => {
        try {
          setLoading(true);
          const data = await client.fetch(FOOTER_QUERY);

          if (data && isFooterData(data)) {
            setFooterData(data);
            setError(null);
          } else {
            console.warn('No footer data found in Sanity, using fallback data');
            setError('No footer data found. Using default content.');
          }
        } catch (err) {
          console.error('Error fetching footer data:', err);
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(`Failed to load footer data: ${errorMessage}`);
        } finally {
          setLoading(false);
        }
      };

      fetchFooterData();
    }
  }, [initialData]);

  // Use either Sanity data or fallback to legacy sections
  const displaySections = footerData?.navigationSections
    ? footerData.navigationSections.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
    : defaultFooterSections;

  // Show loading state
  if (loading) {
    return (
      <footer className="relative z-[99] flex w-full flex-col border-t-1 border-neutral-300 bg-[#f9f5eb] dark:border-[#f0b429]/30 dark:bg-[#1a2637]">
        <div className="relative z-[99] w-full overflow-hidden py-12">
          <div className="container mx-auto px-6">
            <div className="flex h-32 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-8 w-48 animate-pulse rounded bg-gray-300"></div>
                <div className="mx-auto h-4 w-64 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Show error state with fallback content
  if (error && !footerData) {
    console.warn('Footer error:', error);
    // Continue with fallback content
  }

  // Get styling from Sanity data or use defaults
  const getBorderClasses = () => {
    if (!footerData?.styling) return 'border-neutral-300 dark:border-[#f0b429]/30';

    switch (footerData.styling.borderStyle) {
      case 'none':
        return 'border-transparent';
      case 'thick':
        return 'border-2 border-gray-400 dark:border-gray-600';
      case 'gradient':
        return 'border-2 border-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-light-blue)]';
      default:
        return 'border-neutral-300 dark:border-[#f0b429]/30';
    }
  };

  return (
    <footer
      className={`relative z-[99] flex w-full flex-col border-t-1 ${getBorderClasses()}`}
      style={{
        position: 'relative',
        isolation: 'isolate',
      }}
    >
      {/* Simple background layer for full coverage */}
      <div
        className="absolute inset-0 z-[1] bg-[#f9f5eb] dark:bg-[#1a2637]"
        style={{
          width: '100vw',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      {/* CSS for proper styling */}
      <style jsx>{`
        footer {
          background-color: #f9f5eb;
        }
        :global(.dark) footer {
          background-color: #1a2637;
        }
      `}</style>{' '}
      {/* Main footer content */}
      <div className="relative z-[10] w-full overflow-hidden bg-[#f9f5eb] py-12 dark:bg-[#1a2637]">
        <div className="absolute inset-0 z-[1] bg-[#f9f5eb] dark:bg-[#1a2637]" />
        <div className="relative z-[2] container mx-auto px-4">
          {/* Newsletter section - commented out for now */}
          {/* <div className="relative mx-auto max-w-3xl text-center">
              Newsletter content...
            </div> */}
        </div>
      </div>
      {/* Footer grid section */}
      <div className="relative z-[10] container mx-auto bg-[#f9f5eb] px-4 py-10 dark:bg-[#1a2637]">
        <div className="absolute inset-0 z-[1] bg-[#f9f5eb] dark:bg-[#1a2637]" />
        <div className="relative z-[2] grid grid-cols-1 gap-8 max-sm:pb-5 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-5">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <Link href="/" aria-label="Go to homepage">
                  {footerData?.brand?.logo?.image?.asset ? (
                    <Image
                      src={urlFor(footerData.brand.logo.image).width(140).height(40).url()}
                      alt={footerData.brand.logo.alt || 'Logo'}
                      width={140}
                      height={40}
                      className="h-40 w-40 dark:brightness-100"
                    />
                  ) : (
                    <Image
                      src="/jobsmate-mob.svg"
                      alt="Jobsmate Logo"
                      width={140}
                      height={40}
                      className="h-40 w-40 dark:brightness-100"
                    />
                  )}
                </Link>
              </div>
              <p className="max-w-xs text-sm text-gray-600 dark:text-gray-300">
                {footerData?.brand?.description ||
                  'Hire the best applicants for your tech positions. Focus on skills, not just resumes.'}
              </p>
              {footerData?.brand?.poweredBy && (
                <div className="py-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{footerData.brand.poweredBy.text} </span>
                  <Link
                    href={`mailto:${footerData.brand.poweredBy.email}`}
                    aria-label={`Contact ${footerData.brand.poweredBy.company}`}
                    className="group relative font-medium text-[var(--primary-medium-blue)] dark:text-[var(--primary-light-blue)]"
                  >
                    <span className="relative z-10">{footerData.brand.poweredBy.company}</span>
                    <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-[var(--primary-medium-blue)] opacity-60 transition-all duration-300 group-hover:w-full dark:bg-[var(--primary-light-blue)]"></span>
                  </Link>
                </div>
              )}
              {!footerData?.brand?.poweredBy && (
                <div className="py-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Powered by </span>
                  <Link
                    href="mailto:contact@nextshift.com"
                    aria-label="Contact NextShift"
                    className="group relative font-medium text-[var(--primary-medium-blue)] dark:text-[var(--primary-light-blue)]"
                  >
                    <span className="relative z-10">NextShift</span>
                    <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-[var(--primary-medium-blue)] opacity-60 transition-all duration-300 group-hover:w-full dark:bg-[var(--primary-light-blue)]"></span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Sections */}
          {displaySections.map((section, index) => (
            <div
              key={section.title}
              className={`col-span-1 lg:col-span-2 ${
                index === 0 ? 'lg:col-start-7' : index === 1 ? 'lg:col-start-9' : 'lg:col-start-11'
              }`}
            >
              <h3 className="mb-4 text-sm font-semibold text-[var(--primary-dark-blue)] dark:text-[var(--primary-light-blue)]">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      aria-label={link.label}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="group relative text-sm text-gray-600 transition-colors duration-200 dark:text-gray-300"
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          handleSmoothScroll(e, link.href);
                        }
                      }}
                    >
                      <span className="relative">{link.label}</span>
                      <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-gray-400 opacity-50 transition-all duration-300 group-hover:w-full dark:bg-gray-500"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>{' '}
      {/* Footer Bottom Section with Social Links */}
      <div className="relative z-[10] border-t border-gray-200 bg-[#f0ece0] py-6 dark:border-gray-700 dark:bg-[#162030]">
        {/* Additional solid background overlay for bottom section */}
        <div className="absolute inset-0 z-[1] bg-[#f0ece0] dark:bg-[#162030]"></div>
        <div className="relative z-[5] container mx-auto flex flex-col gap-4 px-4 text-xs text-gray-600 md:flex-row md:items-center md:justify-between dark:text-gray-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>&copy; {currentYear} Jobsmate. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <Link
              href="https://jobsmate.global/privacy-policy"
              aria-label="Privacy Policy"
              className="group relative transition-colors duration-200"
            >
              <span>Privacy Policy</span>
              <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-gray-400 opacity-50 transition-all duration-200 group-hover:w-full dark:bg-gray-500"></span>
            </Link>
            <span className="hidden md:inline">•</span>
            <Link
              href="https://jobsmate.global/terms-and-conditions-employees"
              aria-label="Terms and Conditions"
              className="group relative transition-colors duration-200"
            >
              <span>Terms & Conditions</span>
              <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-gray-400 opacity-50 transition-all duration-200 group-hover:w-full dark:bg-gray-500"></span>
            </Link>

            {/* Mobile Social Links */}
            <div className="flex space-x-2 md:hidden">
              {/* Sanity-driven social links */}
              {footerData?.socialLinks?.linkedin?.isActive && (
                <Link
                  href={footerData.socialLinks.linkedin.url}
                  aria-label={footerData.socialLinks.linkedin.ariaLabel}
                  className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}

              {footerData?.socialLinks?.instagram?.isActive && (
                <Link
                  href={footerData.socialLinks.instagram.url}
                  aria-label={footerData.socialLinks.instagram.ariaLabel}
                  className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}

              {footerData?.socialLinks?.email?.isActive && (
                <Link
                  href={`mailto:${footerData.socialLinks.email.address}`}
                  aria-label={footerData.socialLinks.email.ariaLabel}
                  className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                  </svg>
                </Link>
              )}

              {/* Custom Social Links for Mobile */}
              {footerData?.socialLinks?.customSocials
                ?.filter((social) => social.isActive)
                .map((social) => (
                  <Link
                    key={social.platform}
                    href={social.url}
                    aria-label={social.ariaLabel || social.platform}
                    className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.iconSvg ? (
                      <div
                        className="h-3.5 w-3.5"
                        dangerouslySetInnerHTML={{ __html: social.iconSvg }}
                      />
                    ) : (
                      <span className="text-xs">{social.platform.charAt(0).toUpperCase()}</span>
                    )}
                  </Link>
                ))}

              {/* Fallback social links if no Sanity data */}
              {!footerData && (
                <>
                  <Link
                    href="https://www.linkedin.com/company/jobsmate"
                    aria-label="LinkedIn"
                    className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.instagram.com/jobsmateglobal/"
                    aria-label="Instagram"
                    className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="mailto:info@jobsmate.nl"
                    aria-label="Gmail"
                    className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Desktop Social Links */}
          <div className="hidden items-center self-start md:ml-auto md:flex md:self-auto">
            {/* Sanity-driven social links for desktop */}
            {footerData?.socialLinks?.linkedin?.isActive && (
              <Link
                href={footerData.socialLinks.linkedin.url}
                aria-label={footerData.socialLinks.linkedin.ariaLabel}
                className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}

            {footerData?.socialLinks?.instagram?.isActive && (
              <Link
                href={footerData.socialLinks.instagram.url}
                aria-label={footerData.socialLinks.instagram.ariaLabel}
                className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.40-1.439-1.40z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}

            {footerData?.socialLinks?.email?.isActive && (
              <Link
                href={`mailto:${footerData.socialLinks.email.address}`}
                aria-label={footerData.socialLinks.email.ariaLabel}
                className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </Link>
            )}

            {/* Custom Social Links for Desktop */}
            {footerData?.socialLinks?.customSocials
              ?.filter((social) => social.isActive)
              .map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  aria-label={social.ariaLabel || social.platform}
                  className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.iconSvg ? (
                    <div className="h-4 w-4" dangerouslySetInnerHTML={{ __html: social.iconSvg }} />
                  ) : (
                    <span className="text-sm">{social.platform.charAt(0).toUpperCase()}</span>
                  )}
                </Link>
              ))}

            {/* Fallback social links for desktop if no Sanity data */}
            {!footerData && (
              <>
                <Link
                  href="https://www.linkedin.com/company/jobsmate?originalSubdomain=nl"
                  aria-label="LinkedIn"
                  className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/jobsmateglobal/"
                  aria-label="Instagram"
                  className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.40s.645 1.40 1.441 1.40c.795 0 1.439-.645 1.439-1.40s-.644-1.40-1.439-1.40z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="mailto:info@jobsmate.nl"
                  aria-label="Gmail"
                  className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
