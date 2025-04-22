'use client';

import { useRef } from 'react';
import { Tabs } from '../ui/tabs';
import Dashboard from './Dashboard';
import MatchandRank from './MatchandRank';
import JobPosting from './JobPosting';
import { MdDashboard, MdWork } from 'react-icons/md';
import { FaUserCheck } from 'react-icons/fa';

export function TabsDemo() {
  const tabsRef = useRef(null);

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
    <div className="3xl:!min-h-[115vh] relative z-50 flex h-[75vh] items-start border-none bg-none sm:!min-h-[130vh]">
      <div
        ref={tabsRef}
        className="sticky top-0 z-50 container mx-auto flex w-full flex-col items-start justify-start bg-white/95 py-4 backdrop-blur-sm transition-all duration-300 sm:mt-0 md:gap-12 dark:bg-[var(--neutral-50)]/95"
      >
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
