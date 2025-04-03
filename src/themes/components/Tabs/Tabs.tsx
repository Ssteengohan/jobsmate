'use client';

import { Tabs } from '../ui/tabs';
import Dashboard from './Dashboard';
import MatchandRank from './MatchandRank';

export function TabsDemo() {
  const tabs = [
    {
      title: 'Dashboard',
      value: 'dashboard',
      content: <Dashboard />,
    },
    {
      title: 'Job posting',
      value: 'jobposting',
      content: <Dashboard />,
    },
    {
      title: 'Costum assessments',
      value: 'costumassessments',
      content: <Dashboard />,
    },
    {
      title: 'Anti-cheating monitor',
      value: 'anticheatingmonitor',
      content: <Dashboard />,
    },
    {
      title: 'Match and Rank',
      value: 'matchandrank',
      content: <MatchandRank />,
    },
  ];

  return (
    <div className="relative flex items-center bg-transparent">
      <div className="mx-auto flex h-[45rem] w-full flex-col items-start justify-start [perspective:1000px] not-sm:container sm:mt-20 2xl:h-[90vh]">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
