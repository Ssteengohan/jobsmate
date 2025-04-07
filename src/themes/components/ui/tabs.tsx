'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
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
          'no-visible-scrollbar relative flex w-full max-w-full items-center justify-between gap-x-1 gap-y-8 overflow-auto pb-6 [perspective:1000px] sm:flex-row sm:justify-center sm:gap-4 sm:overflow-visible sm:pb-0 md:flex-wrap',
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
              'relative cursor-pointer rounded-full px-1 py-1 text-2xl text-nowrap hover:bg-[#f3f4f6] max-md:text-xs md:px-4 md:py-2 dark:hover:bg-[var(--neutral-200)]',
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
                className={cn('absolute inset-0 rounded-full', activeTabClassName)}
              />
            )}

            <span className="relative block text-[#00253b] dark:text-white">{tab.title}</span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn('mt-20 sm:mt-16', contentClassName)}
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
    <div className="relative h-auto min-h-[50vh] w-full overflow-visible lg:min-h-[70vh]">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn(
            'absolute top-0 left-0 h-full shadow-xl w-full overflow-hidden rounded-2xl border-1 border-neutral-300',
            className,
          )}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};