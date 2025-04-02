'use client';

import { Tabs } from '../ui/tabs';
import Dashboard from './Dashboard';


export function TabsDemo() {
  const tabs = [
    {
      title: 'Dashboard',
      value: 'dashboard',
      content: <Dashboard />,
    },
    {
      title: 'Services',
      value: 'services',
      content: <Dashboard />,
    },
    {
      title: 'Playground',
      value: 'playground',
      content: <Dashboard />,
    },
    {
      title: 'Content',
      value: 'content',
      content: <Dashboard />,
    },
    {
      title: 'Random',
      value: 'random',
      content: <Dashboard />,
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

