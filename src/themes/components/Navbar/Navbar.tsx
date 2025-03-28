'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Animation variants
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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white px-4 py-4 shadow-md">
      <div className="container mx-auto flex h-16 w-full items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/jobsmate-mob.svg"
                alt="Jobsmate Logo"
                width={100}
                height={250}
                className=""
              />
              <span className="text-3xl text-black">Jobsmate</span>
            </Link>
          </div>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-3">
              <li>
                <Link
                  href="/about"
                  className="px-3 py-2 text-black transition-all duration-400 ease-in-out hover:rounded-xl hover:bg-[#f3f4f6]"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="px-3 py-2 text-black transition-all duration-400 ease-in-out hover:rounded-xl hover:bg-[#f3f4f6]"
                >
                  Price
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="px-3 py-2 text-black transition-all duration-400 ease-in-out hover:rounded-xl hover:bg-[#f3f4f6]"
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
            className="group relative rounded-full border border-slate-300 bg-white px-8 py-2 text-sm font-medium text-black transition-all duration-300 ease-in-out hover:scale-105 hover:border-transparent hover:shadow-lg"
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
            className="group relative inline-flex h-10 overflow-hidden rounded-full p-[1px] shadow-sm transition-all duration-300 ease-in-out hover:shadow-md focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary-light-blue)_0%,var(--primary-medium-blue)_40%,var(--primary-gold)_70%,var(--primary-dark)_100%)] transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:animate-[spin_1.5s_linear_infinite]" />
            <span className="group-hover:text-primary-medium-blue inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-black backdrop-blur-3xl transition-all duration-300 ease-in-out group-hover:bg-gray-50">
              Candidate
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="mt-2 inline-flex items-center justify-center rounded-md p-2 text-gray-600 lg:hidden"
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
                  className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#f3f4f6]"
                >
                  Features
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/services"
                  className="block rounded-md px-3 py-1 text-base font-medium text-black hover:bg-[#f3f4f6]"
                >
                  Price
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/contact"
                  className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#f3f4f6]"
                >
                  About us
                </Link>
              </motion.div>

              <div className="mt-1 flex flex-col gap-5">
                <motion.div variants={buttonVariants}>
                  <Link
                    href="/"
                    className="w-full rounded-full border border-slate-300 bg-white px-8 py-2 text-center text-sm font-medium text-black"
                  >
                    Company
                  </Link>
                </motion.div>

                <motion.div variants={buttonVariants}>
                  <Link
                    href="/"
                    className="w-full rounded-full border border-slate-300 bg-white px-8 py-2 text-center text-sm font-medium text-black"
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
