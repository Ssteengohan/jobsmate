'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
  icon?: React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          'no-visible-scrollbar relative flex w-full max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 overflow-auto [perspective:1000px] sm:flex-row sm:justify-center sm:gap-4 sm:gap-x-8 sm:overflow-visible sm:pb-0 md:flex-wrap',
          containerClassName,
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              'relative cursor-pointer rounded-full border border-gray-300 px-3 py-2 text-lg text-nowrap transition-all duration-200 hover:bg-[#f3f4f6] max-md:text-sm md:px-4 md:py-2 dark:border-gray-700 dark:hover:bg-[var(--neutral-200)]',
              active.value === tab.value ? 'border-blue-500 dark:border-blue-400' : '',
              tabClassName,
            )}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                className={cn(
                  'absolute inset-0 rounded-full bg-blue-50 dark:bg-blue-900/20',
                  activeTabClassName,
                )}
              />
            )}

            <span
              className={cn(
                'relative flex items-center gap-2',
                active.value === tab.value
                  ? 'font-medium text-blue-600 dark:text-blue-400'
                  : 'text-[#00253b] dark:text-white',
              )}
            >
              {tab.icon && (
                <span
                  className={cn(
                    'text-base sm:text-base lg:text-lg',
                    active.value === tab.value ? 'text-blue-500 dark:text-blue-400' : '',
                  )}
                >
                  {tab.icon}
                </span>
              )}
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn('mt-24 sm:mt-20', contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div
      className="relative mx-auto flex h-auto min-h-[60vh] w-full overflow-visible sm:min-h-[65vh] md:h-screen lg:h-auto lg:aspect-video lg:w-[90%]"
      style={{ position: 'relative' }}
    >
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
            position: 'absolute',
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn(
            'absolute top-0 left-0 h-full w-full overflow-hidden rounded-2xl border-1 border-neutral-300 shadow-xl',
            className,
          )}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
