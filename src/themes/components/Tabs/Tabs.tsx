'use client';

import { useRef } from 'react';
import { Tabs } from '../ui/tabs';
import Dashboard from './Dashboard';
import MatchandRank from './MatchandRank';
import JobPosting from './JobPosting';

export function TabsDemo() {
  const tabsRef = useRef(null);

  const tabs = [
    {
      title: 'Dashboard',
      value: 'dashboard',
      content: <Dashboard />,
    },
    {
      title: 'Job posting',
      value: 'jobposting',
      content: <JobPosting />,
    },
    {
      title: 'Match and Rank',
      value: 'matchandrank',
      content: <MatchandRank />,
    },
  ];

  return (
    <div className="relative z-1 flex min-h-[100vh] items-start bg-none border-none ">
      <div
        ref={tabsRef}
        className="sticky top-0 z-10 container mx-auto flex w-full flex-col items-start justify-start gap-4 bg-white/95 py-4 backdrop-blur-sm transition-all duration-300 sm:mt-0 md:gap-12 dark:bg-[var(--neutral-50)]/95"
      >
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
