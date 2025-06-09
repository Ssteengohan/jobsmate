'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollData } from '@/themes/lib/lenis';
import { client } from '@/sanity/lib/client';
import { NAVBAR_QUERY } from '@/sanity/lib/queries';
import { transformToImageUrl, getBlurDataURL } from '@/sanity/lib/image';

interface NavbarData {
  _id: string;
  logo: {
    asset: {
      _id: string;
      url: string;
    } | null;
    alt?: string;
  } | null;
  logoText: string;
  navigationItems: Array<{
    title: string;
    href: string;
    isExternal: boolean;
  }>;
  ctaButtons: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
    ariaLabel?: string;
  }>;
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [logoBlur, setLogoBlur] = useState<string>('');
  const navRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scrollDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const scrollDirectionBufferRef = useRef(0);

  const { scroll, direction } = useScrollData();

  // Fetch navbar data from Sanity
  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const data = await client.fetch(NAVBAR_QUERY);

        if (!data) {
          setError('No navbar data found. Please add a navbar document in Sanity.');
          return;
        }

        setNavbarData(data);

        // Generate blur data URL for logo
        if (data.logo?.asset?.url) {
          const blurUrl = getBlurDataURL(data.logo.asset.url, 20);
          setLogoBlur(blurUrl);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to load navbar data: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarData();
  }, []);

  const handleScroll = useCallback(
    (scrollPosition: number, scrollDirection: number) => {
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }

      scrollDebounceRef.current = setTimeout(() => {
        if (scrollDirection < 0) {
          setIsVisible(true);
          scrollDirectionBufferRef.current = 0;
          setLastScroll(scrollPosition);
          return;
        }

        if (scrollPosition > 80 && scrollDirection > 0 && scrollPosition > lastScroll) {
          setIsVisible(false);
        }

        if (scrollPosition <= 80) {
          setIsVisible(true);
        }

        setLastScroll(scrollPosition);
      }, 10);
    },
    [lastScroll],
  );

  useEffect(() => {
    handleScroll(scroll, direction);

    return () => {
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }
    };
  }, [scroll, direction, handleScroll]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      e.stopPropagation();

      // Close mobile menu if open
      if (mobileMenuOpen) setMobileMenuOpen(false);

      const navbarHeight = document.querySelector('header')?.clientHeight || 80;
      const targetElement = document.querySelector(href);

      if (!targetElement) {
        // For lazy-loaded sections, scroll to trigger loading first
        if (href === '#features') {
          // Scroll down to trigger ShowCase loading
          const triggerPosition = window.innerHeight * 0.7; // Use Lenis for smooth scrolling
          const lenis = (
            window as unknown as {
              lenis?: {
                scrollTo: (
                  target: number | string,
                  options?: {
                    duration?: number;
                    easing?: (t: number) => number;
                    lerp?: number;
                    onStart?: () => void;
                    onComplete?: () => void;
                  },
                ) => void;
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
                const elementPosition =
                  retryTarget.getBoundingClientRect().top + window.pageYOffset;
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
            scrollTo: (
              target: number | string,
              options?: {
                duration?: number;
                easing?: (t: number) => number;
                lerp?: number;
                onStart?: () => void;
                onComplete?: () => void;
              },
            ) => void;
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

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    closed: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const navbarClasses = `fixed w-full transform ${
    isVisible ? 'translate-y-0' : '-translate-y-full'
  } z-50 border-b border-gray-200 bg-white px-4 py-4 shadow-md backdrop-blur-sm transition-transform duration-300 ease-in-out dark:border-[var(--neutral-200)] dark:bg-[var(--neutral-50)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]`;

  // Show loading state
  if (loading) {
    return (
      <header className={navbarClasses}>
        <div className="container mx-auto flex h-16 w-full items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center">
              <div className="h-10 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="ml-2 h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Show error state
  if (error || !navbarData) {
    return (
      <header className={navbarClasses}>
        <div className="container mx-auto flex h-16 w-full items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/jobsmate-mob.svg"
                alt="Jobsmate Logo"
                width={40}
                height={40}
                className="h-18 w-18 transition-opacity duration-300"
              />
              <span className="text-3xl text-black transition-colors duration-300 dark:text-[var(--primary-white)]">
                Jobsmate
              </span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto flex h-16 w-full items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {navbarData.logo?.asset?.url ? (
                <Image
                  src={transformToImageUrl(navbarData.logo.asset.url)}
                  alt={navbarData.logo.alt || 'Logo'}
                  width={40}
                  height={40}
                  className="h-18 w-18 transition-opacity duration-300"
                  placeholder="blur"
                  blurDataURL={logoBlur}
                />
              ) : (
                <Image
                  src="/jobsmate-mob.svg"
                  alt="Jobsmate Logo"
                  width={40}
                  height={40}
                  className="h-18 w-18 transition-opacity duration-300"
                />
              )}
              <span className="text-3xl text-black transition-colors duration-300 dark:text-[var(--primary-white)]">
                {navbarData.logoText}
              </span>
            </Link>
          </div>

          <nav className="hidden lg:block">
            <ul className="relative flex items-center gap-3">
              {activeItem !== null && (
                <motion.div
                  className="absolute z-0 rounded-xl bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 dark:from-[var(--neutral-200)] dark:via-[var(--neutral-100)] dark:to-[var(--neutral-200)]"
                  initial={false}
                  animate={{
                    width: navRefs.current[activeItem]?.offsetWidth,
                    height: navRefs.current[activeItem]?.offsetHeight,
                    x: navRefs.current[activeItem]?.offsetLeft,
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                    mass: 1.2,
                  }}
                  layoutId="navHover"
                />
              )}

              {navbarData.navigationItems.map((item, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    navRefs.current[index] = el;
                  }}
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                  className="relative z-10"
                >
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-black transition-all duration-400 ease-in-out dark:text-[var(--primary-white)]"
                    onClick={item.isExternal ? undefined : (e) => handleSmoothScroll(e, item.href)}
                    {...(item.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          {navbarData.ctaButtons.map((button, index) =>
            button.variant === 'secondary' ? (
              <Link
                key={index}
                href={button.href}
                className="group relative rounded-full border border-slate-300 bg-white px-8 py-2 text-sm font-medium text-black transition-all duration-300 ease-in-out hover:scale-105 hover:border-transparent hover:shadow-lg dark:border-[var(--neutral-200)] dark:bg-[var(--neutral-50)] dark:text-[var(--primary-white)] dark:hover:shadow-[0_4px_20px_rgba(42,151,219,0.2)]"
                aria-label={button.ariaLabel || button.text}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="via-primary-light-blue absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-70 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100 group-hover:shadow-md" />
                <div className="via-primary-gold absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100" />
                <div className="from-primary-light-blue via-primary-medium-blue to-primary-gold absolute -top-px -right-px -left-px h-[3px] w-0 rounded-t-full bg-gradient-to-r transition-all duration-700 group-hover:w-full" />
                <span className="group-hover:text-primary-medium-blue relative z-20 transition-all duration-300">
                  {button.text}
                </span>
              </Link>
            ) : (
              <Link
                key={index}
                href={button.href}
                className="group relative inline-flex h-10 overflow-hidden rounded-full p-[1px] shadow-sm transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none dark:hover:shadow-[0_4px_20px_rgba(42,151,219,0.2)]"
                aria-label={button.ariaLabel || button.text}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary-light-blue)_0%,var(--primary-medium-blue)_40%,var(--primary-gold)_70%,var(--primary-dark)_100%)] transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:animate-[spin_1.5s_linear_infinite]" />
                <span className="group-hover:text-primary-medium-blue inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-black backdrop-blur-3xl transition-all duration-300 ease-in-out group-hover:bg-gray-50 dark:bg-[var(--neutral-50)] dark:text-[var(--primary-white)] dark:group-hover:bg-[var(--neutral-200)]">
                  {button.text}
                </span>
              </Link>
            ),
          )}
        </div>

        <button
          type="button"
          className="mt-2 inline-flex items-center justify-center rounded-md p-2 text-gray-600 transition-colors duration-300 lg:hidden dark:text-gray-300"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle mobile menu"
        >
          <svg
            className={`h-8 w-8 ${mobileMenuOpen ? 'hidden' : 'block'}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            className={`h-8 w-8 ${mobileMenuOpen ? 'block' : 'hidden'}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>{' '}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col space-y-1 px-4 pt-2 pb-3">
              {navbarData.navigationItems.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-black transition-colors duration-300 hover:bg-[#f3f4f6] dark:text-[var(--primary-white)] dark:hover:bg-[var(--neutral-200)]"
                    onClick={item.isExternal ? undefined : (e) => handleSmoothScroll(e, item.href)}
                    {...(item.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-1 flex flex-col gap-5">
                {navbarData.ctaButtons.map((button, index) => (
                  <motion.div key={index} variants={buttonVariants}>
                    <Link
                      href={button.href}
                      className="w-full rounded-full border border-slate-300 bg-white px-8 py-2 text-center text-sm font-medium text-black transition-colors duration-300 dark:border-[var(--neutral-200)] dark:bg-[var(--neutral-50)] dark:text-[var(--primary-white)]"
                      aria-label={button.ariaLabel || button.text}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {button.text}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
