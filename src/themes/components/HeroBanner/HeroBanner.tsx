'use client';

import React from 'react';
import { Spotlight } from '../ui/Spotlight';
import { motion } from 'framer-motion';

export function SpotlightPreview() {
  return (
    <div className="relative flex h-[40rem] w-full items-center overflow-hidden bg-white antialiased sm:h-[60rem] md:justify-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-gray-50/30" />

      <Spotlight
        className="-top-40 left-20 md:-top-20 md:left-1/4"
        fill="rgba(59, 130, 246, 0.15)"

      />
      <Spotlight
        className="top-0 right-0 md:top-60 md:right-1/4"
        fill="rgba(234, 179, 8, 0.15)"

      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 container mx-auto w-full max-w-7xl rounded-md p-4 pt-20 md:pt-0"
      >
        {/* Spotlights directly in container - not wrapped in motion.div */}

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-[var(--primary-light-blue)] via-[var(--primary-medium-blue)] to-[var(--primary-gold)] bg-clip-text text-center text-5xl font-bold text-transparent drop-shadow-[0_0_5px_rgba(0,0,0,0.2)] md:text-8xl"
        >
          Attract, Access <br />
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="transition-all duration-300 hover:text-[var(--primary-gold)]"
          >
            and Hire
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mt-6 max-w-lg text-center text-base font-normal text-neutral-500 md:text-lg"
        >
          Hire the best applicants for your open tech position. Focus on skills, not just resumes.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 flex justify-center gap-4"
        >
          {/* Start for free Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="group relative rounded-full border border-transparent bg-[var(--primary-gold)] px-8 py-3 text-xs font-medium text-[var(--primary-dark-blue)] transition-all duration-300 ease-in-out hover:shadow-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:ring-offset-2 focus:outline-none sm:text-sm"
          >
            <span className="relative z-20 transition-all duration-300 group-hover:text-[var(--primary-medium-blue)]">
              Start for free
            </span>
          </motion.button>

          {/* Talk to Sales Button */}
          <motion.button
            whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            className="group relative inline-flex overflow-hidden rounded-full p-[1px] shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl focus:ring-2 focus:ring-[var(--primary-light-blue)] focus:ring-offset-2 focus:outline-none"
          >
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary-light-blue)_0%,var(--primary-medium-blue)_40%,var(--primary-gold)_70%,var(--primary-dark)_100%)] opacity-80 transition-all duration-300 ease-in-out group-hover:animate-[spin_3s_linear_infinite] group-hover:opacity-100" />
            <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-[var(--primary-light-blue)] backdrop-blur-3xl transition-all duration-300 ease-in-out group-hover:bg-[var(--primary-light-blue)] group-hover:text-white group-hover:shadow-inner">
              Talk to sales
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
