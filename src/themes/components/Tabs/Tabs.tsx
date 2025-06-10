'use client';

import { useRef, useState, useEffect } from 'react';
import { Tabs } from '../ui/tabs';
import Dashboard from './Dashboard';
import MatchandRank from './MatchandRank';
import JobPosting from './JobPosting';
import {
  MdDashboard,
  MdWork,
  MdAnalytics,
  MdSettings,
  MdPerson,
  MdBusiness,
  MdAssessment,
  MdSearch,
  MdGroup,
} from 'react-icons/md';
import { FaUserCheck } from 'react-icons/fa';
import { client } from '@/sanity/lib/client';
import { TABS_SECTION_QUERY } from '@/sanity/lib/queries';

interface TabData {
  title: string;
  value: string;
  icon: string;
  componentType: 'dashboard' | 'jobposting' | 'matchandrank';
  order: number;
}

interface TabsSectionData {
  _id: string;
  title?: string;
  tabs: TabData[];
}

interface TabsDemoProps {
  initialData?: TabsSectionData | null;
}

// Icon mapping
const iconMap = {
  MdDashboard: MdDashboard,
  MdWork: MdWork,
  FaUserCheck: FaUserCheck,
  MdAnalytics: MdAnalytics,
  MdSettings: MdSettings,
  MdPerson: MdPerson,
  MdBusiness: MdBusiness,
  MdAssessment: MdAssessment,
  MdSearch: MdSearch,
  MdGroup: MdGroup,
};

// Component mapping
const componentMap = {
  dashboard: Dashboard,
  jobposting: JobPosting,
  matchandrank: MatchandRank,
};

export function TabsDemo({ initialData }: TabsDemoProps) {
  const tabsRef = useRef(null);
  const [tabsData, setTabsData] = useState<TabsSectionData | null>(initialData || null);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  // Fetch tabs data from Sanity only if not provided as props
  useEffect(() => {
    // If we already have initial data, skip fetching
    if (initialData) {
      return;
    }

    // Only fetch if no initial data provided
    const fetchTabsData = async () => {
      try {
        const data = await client.fetch(TABS_SECTION_QUERY);

        if (!data) {
          setError('No tabs data found. Please add a tabs section document in Sanity.');
          return;
        }

        setTabsData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to load tabs data: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTabsData();
  }, [initialData]);

  // Default fallback tabs (same as before)
  const defaultTabs = [
    {
      title: 'Dashboard',
      value: 'dashboard',
      content: (
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          <Dashboard />
        </div>
      ),
      icon: <MdDashboard />,
    },
    {
      title: 'Job posting',
      value: 'jobposting',
      content: (
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          <JobPosting />
        </div>
      ),
      icon: <MdWork />,
    },
    {
      title: 'Match and Rank',
      value: 'matchandrank',
      content: (
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          <MatchandRank />
        </div>
      ),
      icon: <FaUserCheck />,
    },
  ];

  // Generate tabs from Sanity data or use defaults
  const tabs = tabsData?.tabs
    ? tabsData.tabs.map((tab) => {
        const IconComponent = iconMap[tab.icon as keyof typeof iconMap];
        const ContentComponent = componentMap[tab.componentType];

        return {
          title: tab.title,
          value: tab.value,
          content: (
            <div style={{ position: 'relative', height: '100%', width: '100%' }}>
              <ContentComponent />
            </div>
          ),
          icon: IconComponent ? <IconComponent /> : <MdDashboard />,
        };
      })
    : defaultTabs;

  // Show loading state
  if (loading) {
    return (
      <div className="sm:min-h-18000px relative z-50 flex items-start border-none bg-none">
        <div className="sticky top-0 z-50 mx-auto flex w-full flex-col items-start justify-start bg-white/95 py-4 backdrop-blur-sm transition-all duration-300 sm:container sm:mt-0 md:gap-12 dark:bg-[var(--neutral-50)]/95">
          <div className="flex h-32 w-full items-center justify-center">
            <div className="flex animate-pulse space-x-4">
              <div className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-8 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-8 w-28 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state or render with default tabs
  if (error) {
    console.warn('Tabs error:', error);
    // Continue with default tabs instead of showing error
  }

  return (
    <div
      className="sm:min-h-18000px relative z-50 flex items-start border-none bg-none"
      style={{ position: 'relative' }}
    >
      <div
        ref={tabsRef}
        className="sticky top-0 z-50 mx-auto flex w-full flex-col items-start justify-start bg-white/95 py-4 backdrop-blur-sm transition-all duration-300 sm:container sm:mt-0 md:gap-12 dark:bg-[var(--neutral-50)]/95"
        style={{ position: 'relative' }}
      >
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
