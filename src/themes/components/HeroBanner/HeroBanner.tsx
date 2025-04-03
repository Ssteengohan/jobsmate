'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function SpotlightPreview() {
  return (
    <div className="relative z-0 flex h-screen w-full items-center overflow-hidden antialiased transition-colors duration-300 sm:h-[60rem] md:justify-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-gray-50/30 transition-colors duration-300 dark:from-transparent dark:to-[var(--primary-dark)]/20" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full mx-auto sm:max-w-7xl pt-20 md:pt-0"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-[var(--primary-light-blue)] via-[var(--primary-medium-blue)] to-[var(--primary-gold)] bg-clip-text text-center text-5xl font-bold text-transparent drop-shadow-[0_0_5px_rgba(0,0,0,0.2)] md:text-8xl dark:drop-shadow-[0_0_8px_rgba(42,151,219,0.3)]"
        >
          Attract, Access <br />
          <motion.span className="transition-all duration-800 hover:text-[var(--primary-gold)]">
            and Hire
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mt-2 max-w-lg text-center text-base font-normal text-neutral-500 transition-colors duration-300 sm:mt-6 md:text-lg dark:text-neutral-300"
        >
          Hire the best applicants for your open tech position. Focus on skills, not just resumes.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 flex flex-col justify-center gap-4 px-4 sm:flex-row"
        >
          <motion.input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-full border border-neutral-300 bg-transparent px-4 py-3 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-300 focus:border-[var(--primary-gold)] focus:ring-[var(--primary-gold)] focus:outline-none sm:hidden dark:text-white dark:focus:border-[var(--primary-gold)] dark:focus:ring-[var(--primary-gold)]"
          ></motion.input>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="group relative rounded-full border border-transparent bg-[var(--primary-gold)] px-8 py-3 text-xs font-medium text-[var(--primary-dark-blue)] transition-all duration-300 ease-in-out hover:border-transparent hover:shadow-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:ring-offset-2 focus:outline-none sm:text-sm dark:text-[var(--primary-dark)] dark:hover:shadow-[0_0_15px_rgba(240,180,41,0.4)]"
          >
            <div className="via-primary-light-blue absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-70 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100 group-hover:shadow-md" />
            <div className="via-primary-gold absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100" />
            <div className="from-primary-light-blue via-primary-medium-blue to-primary-gold absolute -top-px -right-px -left-px h-[3px] w-0 rounded-t-full bg-gradient-to-r transition-all duration-700 group-hover:w-full" />
            <span className="relative z-20 transition-all duration-300">Start for free</span>
          </motion.button>

          <motion.button
            whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            className="group relative inline-flex overflow-hidden rounded-full p-[1px] shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl focus:ring-2 focus:ring-[var(--primary-light-blue)] focus:ring-offset-2 focus:outline-none dark:hover:shadow-[0_0_20px_rgba(42,151,219,0.4)]"
          >
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary-light-blue)_0%,var(--primary-medium-blue)_40%,var(--primary-gold)_70%,var(--primary-dark)_100%)] opacity-80 transition-all duration-300 ease-in-out group-hover:animate-[spin_3s_linear_infinite] group-hover:opacity-100" />
            <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-[var(--primary-light-blue)] backdrop-blur-3xl transition-all duration-300 ease-in-out group-hover:bg-[var(--primary-light-blue)] group-hover:text-white group-hover:shadow-inner dark:bg-[var(--neutral-50)] dark:text-[var(--primary-medium-blue)] dark:group-hover:bg-[var(--primary-dark-blue)] dark:group-hover:text-white dark:group-hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
              Talk to sales
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
