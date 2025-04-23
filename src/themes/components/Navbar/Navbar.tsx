'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollData } from '@/themes/lib/lenis';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const navRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Get scroll data from Lenis context
  const { scroll, direction } = useScrollData();

  useEffect(() => {
    // Hide navbar when scrolling down, show when scrolling up
    if (scroll > 100) {
      if (direction === 1 && scroll > lastScroll) {
        // Scrolling down
        setIsVisible(false);
      } else if (direction === -1) {
        // Scrolling up
        setIsVisible(true);
      }
    } else {
      // Always show at top of page
      setIsVisible(true);
    }

    setLastScroll(scroll);
  }, [scroll, direction, lastScroll]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto flex h-16 w-full items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/jobsmate-mob.svg"
                alt="Jobsmate Logo"
                width={100}
                height={250}
                className="transition-opacity duration-300"
              />
              <span className="text-3xl text-black transition-colors duration-300 dark:text-[var(--primary-white)]">
                Jobsmate
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
                    scale: 1, // Fixed: removed array of values to avoid the error
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

              <li
                ref={(el) => {
                  navRefs.current[0] = el;
                }}
                onMouseEnter={() => setActiveItem(0)}
                onMouseLeave={() => setActiveItem(null)}
                className="relative z-10"
              >
                <Link
                  href="/about"
                  className="block px-3 py-2 text-black transition-all duration-400 ease-in-out dark:text-[var(--primary-white)]"
                >
                  Features
                </Link>
              </li>
              <li
                ref={(el) => {
                  navRefs.current[1] = el;
                }}
                onMouseEnter={() => setActiveItem(1)}
                onMouseLeave={() => setActiveItem(null)}
                className="relative z-10"
              >
                <Link
                  href="/services"
                  className="block px-3 py-2 text-black transition-all duration-400 ease-in-out dark:text-[var(--primary-white)]"
                >
                  Price
                </Link>
              </li>
              <li
                ref={(el) => {
                  navRefs.current[2] = el;
                }}
                onMouseEnter={() => setActiveItem(2)}
                onMouseLeave={() => setActiveItem(null)}
                className="relative z-10"
              >
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-black transition-all duration-400 ease-in-out dark:text-[var(--primary-white)]"
                >
                  About us
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Action buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/"
            className="group relative rounded-full border border-slate-300 bg-white px-8 py-2 text-sm font-medium text-black transition-all duration-300 ease-in-out hover:scale-105 hover:border-transparent hover:shadow-lg dark:border-[var(--neutral-200)] dark:bg-[var(--neutral-50)] dark:text-[var(--primary-white)] dark:hover:shadow-[0_4px_20px_rgba(42,151,219,0.2)]"
          >
            <div className="via-primary-light-blue absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-70 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100 group-hover:shadow-md" />
            <div className="via-primary-gold absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100" />
            <div className="from-primary-light-blue via-primary-medium-blue to-primary-gold absolute -top-px -right-px -left-px h-[3px] w-0 rounded-t-full bg-gradient-to-r transition-all duration-700 group-hover:w-full" />
            <span className="group-hover:text-primary-medium-blue relative z-20 transition-all duration-300">
              Company
            </span>
          </Link>
          <Link
            href="/"
            className="group relative inline-flex h-10 overflow-hidden rounded-full p-[1px] shadow-sm transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none dark:hover:shadow-[0_4px_20px_rgba(42,151,219,0.2)]"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary-light-blue)_0%,var(--primary-medium-blue)_40%,var(--primary-gold)_70%,var(--primary-dark)_100%)] transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:animate-[spin_1.5s_linear_infinite]" />
            <span className="group-hover:text-primary-medium-blue inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-black backdrop-blur-3xl transition-all duration-300 ease-in-out group-hover:bg-gray-50 dark:bg-[var(--neutral-50)] dark:text-[var(--primary-white)] dark:group-hover:bg-[var(--neutral-200)]">
              Candidate
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
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
      </div>

      {/* Mobile menu with animation */}
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
              <motion.div variants={itemVariants}>
                <Link
                  href="/about"
                  className="block rounded-md px-3 py-2 text-base font-medium text-black transition-colors duration-300 hover:bg-[#f3f4f6] dark:text-[var(--primary-white)] dark:hover:bg-[var(--neutral-200)]"
                >
                  Features
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/services"
                  className="block rounded-md px-3 py-1 text-base font-medium text-black transition-colors duration-300 hover:bg-[#f3f4f6] dark:text-[var(--primary-white)] dark:hover:bg-[var(--neutral-200)]"
                >
                  Price
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/contact"
                  className="block rounded-md px-3 py-2 text-base font-medium text-black transition-colors duration-300 hover:bg-[#f3f4f6] dark:text-[var(--primary-white)] dark:hover:bg-[var(--neutral-200)]"
                >
                  About us
                </Link>
              </motion.div>

              <div className="mt-1 flex flex-col gap-5">
                <motion.div variants={buttonVariants}>
                  <Link
                    href="/"
                    className="w-full rounded-full border border-slate-300 bg-white px-8 py-2 text-center text-sm font-medium text-black transition-colors duration-300 dark:border-[var(--neutral-200)] dark:bg-[var(--neutral-50)] dark:text-[var(--primary-white)]"
                  >
                    Company
                  </Link>
                </motion.div>

                <motion.div variants={buttonVariants}>
                  <Link
                    href="/"
                    className="w-full rounded-full border border-slate-300 bg-white px-8 py-2 text-center text-sm font-medium text-black transition-colors duration-300 dark:border-[var(--neutral-200)] dark:bg-[var(--neutral-50)] dark:text-[var(--primary-white)]"
                  >
                    Candidate
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
