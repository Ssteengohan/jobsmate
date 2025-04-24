'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs } from '../ui/tabs';
import Dashboard from './Dashboard';
import MatchandRank from './MatchandRank';
import JobPosting from './JobPosting';
import { MdDashboard, MdWork } from 'react-icons/md';
import { FaUserCheck } from 'react-icons/fa';

export function TabsDemo() {
  const tabsRef = useRef(null);
  const [showTabs, setShowTabs] = useState(false);

  // Delay tabs appearance to allow hero banner animations to complete
  useEffect(() => {
    // Start animation after hero banner animations (around 2 seconds)
    const timer = setTimeout(() => {
      setShowTabs(true);
    }, 1200); // Adjusted to account for hero banner animation delays

    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    {
      title: 'Dashboard',
      value: 'dashboard',
      content: <Dashboard />,
      icon: <MdDashboard />,
    },
    {
      title: 'Job posting',
      value: 'jobposting',
      content: <JobPosting />,
      icon: <MdWork />,
    },
    {
      title: 'Match and Rank',
      value: 'matchandrank',
      content: <MatchandRank />,
      icon: <FaUserCheck />,
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="3xl:!min-h-[115vh] relative z-50 flex h-[75vh] items-start border-none bg-none sm:!min-h-[130vh]"
        initial={{ opacity: 0, y: 50 }}
        animate={showTabs ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth animation
          staggerChildren: 0.2,
        }}
      >
        <motion.div
          ref={tabsRef}
          className="sticky top-0 z-50 container mx-auto flex w-full flex-col items-start justify-start bg-white/95 py-4 backdrop-blur-sm transition-all duration-300 sm:mt-0 md:gap-12 dark:bg-[var(--neutral-50)]/95"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={showTabs ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{
            delay: 0.1,
            duration: 0.4,
          }}
        >
          {showTabs && <Tabs tabs={tabs} />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
