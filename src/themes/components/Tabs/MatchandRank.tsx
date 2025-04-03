import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { HiOutlineHome } from 'react-icons/hi2';
import { TbUsers } from 'react-icons/tb';
import { RiSettings3Line } from 'react-icons/ri';
import { CiMail } from 'react-icons/ci';
import { BiFilterAlt } from 'react-icons/bi';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const MatchandRank = () => {
  const [activeTab, setActiveTab] = useState('assessment');
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const favoriteTabRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const scaleEffect = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Prevent manual scrolling
  useEffect(() => {
    if (contentScrollRef.current) {
      const element = contentScrollRef.current;
      const preventScroll = (e: Event) => e.preventDefault();
      element.addEventListener('wheel', preventScroll, { passive: false });

      // Disable touch scroll on mobile devices
      if (window.innerWidth < 768) {
        element.addEventListener('touchmove', preventScroll, { passive: false });
      }

      return () => {
        element.removeEventListener('wheel', preventScroll);
        if (window.innerWidth < 768) {
          element.removeEventListener('touchmove', preventScroll);
        }
      };
    }
  }, []);

  // Multi-phase animation sequence
  useEffect(() => {
    if (!contentScrollRef.current) return;

    const element = contentScrollRef.current;

    // Phase 1: Initial scroll down animation (after animations finish)
    const initialScrollDown = () => {
      setTimeout(() => {
        if (!element) return;

        const start = element.scrollTop;
        const target = element.scrollHeight;
        const duration = window.innerWidth < 768 ? 12000 : 6000;

        let startTime: number | null = null;

        const animateScrollDown = (currentTime: number) => {
          if (!element) return;
          if (startTime === null) startTime = currentTime;

          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const easeInOutQuad =
            progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

          element.scrollTop = start + (target - start) * easeInOutQuad;

          if (timeElapsed < duration) {
            requestAnimationFrame(animateScrollDown);
          } else {
            setTimeout(() => {
              scrollToTop();
            }, 2000);
          }
        };

        requestAnimationFrame(animateScrollDown);
      }, 4000);
    };

    const scrollToTop = () => {
      if (!element) return;

      const start = element.scrollTop;
      const target = 0;
      const duration = 3000;

      let startTime: number | null = null;

      const animateScrollUp = (currentTime: number) => {
        if (!element) return;
        if (startTime === null) startTime = currentTime;

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeInOutQuad =
          progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

        element.scrollTop = start - (start - target) * easeInOutQuad;

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScrollUp);
        } else {
          setTimeout(() => {
            if (favoriteTabRef.current) {
              favoriteTabRef.current.click();
            }
            setTimeout(() => {
              scrollDownAgain();
            }, 2000);
          }, 1000);
        }
      };

      requestAnimationFrame(animateScrollUp);
    };

    const scrollDownAgain = () => {
      if (!element) return;

      const start = element.scrollTop;
      const target = element.scrollHeight;
      const duration = window.innerWidth < 768 ? 8000 : 4000;

      let startTime: number | null = null;

      const animateScrollDownAgain = (currentTime: number) => {
        if (!element) return;
        if (startTime === null) startTime = currentTime;

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeInOutQuad =
          progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

        element.scrollTop = start + (target - start) * easeInOutQuad;

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScrollDownAgain);
        }
      };

      requestAnimationFrame(animateScrollDownAgain);
    };

    initialScrollDown();
  }, []);

  const sectionVariants = {
    header: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.005,
          delayChildren: 0.1,
        },
      },
    },
    tabs: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.005,
          delayChildren: 0.5,
        },
      },
    },
    candidates: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 1,
          delayChildren: 0.8,
        },
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      ref={scrollRef}
      className="scrollbar-hide pointer-events-auto flex h-full w-full flex-row overflow-hidden rounded-2xl border-1 border-zinc-300 bg-white select-none"
    >
      <div className="Navbar scrollbar-hide flex w-5/12 flex-col items-start rounded-l-2xl border-r-1 border-zinc-500/10 bg-white md:w-1/5 2xl:w-2/12">
        <div className="flex items-center px-2 pt-2">
          <Image
            src="/jobsmate-mob.svg"
            alt="Jobsmate Logo"
            width={40}
            height={40}
            className="h-6 w-6 transition-opacity duration-300 sm:h-12 sm:w-12 md:h-[45px] md:w-[45px] lg:h-[50px] lg:w-[50px] xl:h-[55px] xl:w-[55px]"
          />
          <span className="text-[10px] font-light text-black sm:text-xs md:text-sm lg:text-base xl:text-lg">
            Jobsmate
          </span>
        </div>
        <div className="flex items-center gap-2 pt-3 pl-3 sm:pt-6">
          <HiOutlineHome
            className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 xl:h-6 xl:w-6"
            color="#00253b"
          />
          <span className="text-[10px] font-medium text-[#00253b] sm:text-xs md:text-sm lg:text-base">
            Jobs
          </span>
        </div>
        <div className="flex w-full items-center gap-2 pt-5 pl-3">
          <TbUsers
            className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 xl:h-6 xl:w-6"
            color="black"
          />
          <span className="text-[10px] font-medium text-[#00253b] sm:text-xs md:text-sm lg:text-base">
            Company
          </span>
        </div>
        <div className="flex w-full items-center gap-2 pt-5 pl-3">
          <RiSettings3Line
            className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 xl:h-6 xl:w-6"
            color="black"
          />
          <span className="text-[10px] font-medium text-[#00253b] sm:text-xs md:text-sm lg:text-base">
            Settings
          </span>
        </div>
        <div className="flex w-full items-center gap-2 pt-5 pl-3">
          <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 xl:h-6 xl:w-6"
          >
            <path
              d="M7.77346 9.582C7.90996 9.582 8.01233 9.47109 8.01233 9.34313V2.99621C8.01233 2.92796 7.98673 2.86825 7.93555 2.82559L6.11849 1.06825C6.07583 1.02559 6.01612 1 5.94787 1H1.23886C1.1109 1 1 1.1109 1 1.23886V9.3346C1 9.4711 1.1109 9.57346 1.23886 9.57346H7.77346V9.582ZM6.19526 1.81043L7.17631 2.75735H6.43413C6.29763 2.75735 6.19526 2.64645 6.19526 2.51848V1.81896V1.81043ZM1.48626 1.48626H5.71754V2.99621C5.71754 3.1327 5.82844 3.23507 5.9564 3.23507H7.40664C7.45782 3.23507 7.50048 3.21801 7.5346 3.19242V9.09574H1.48626V1.48626Z"
              fill="#00253B"
              stroke="#00253B"
              strokeWidth="0.25"
            ></path>
            <path
              d="M6.13558 10.4948C6.09292 10.4521 6.03321 10.4265 5.96496 10.4265H1.25595C1.11946 10.4265 1.01709 10.5374 1.01709 10.6654V18.7611C1.01709 18.8976 1.12799 19 1.25595 19H7.79055C7.92705 19 8.02942 18.8891 8.02942 18.7611V12.4142C8.02942 12.3459 8.00382 12.2862 7.95264 12.2436L6.13558 10.4862V10.4948ZM6.21235 11.2369L7.1934 12.1839H6.45122C6.31472 12.1839 6.21235 12.073 6.21235 11.945V11.2455V11.2369ZM7.54316 18.5308H1.49482V10.9128H5.7261V12.4227C5.7261 12.5592 5.837 12.6616 5.96496 12.6616H7.4152C7.46638 12.6616 7.50904 12.6445 7.54316 12.6189V18.5223V18.5308Z"
              fill="#00253B"
              stroke="#00253B"
              strokeWidth="0.25"
            ></path>
            <path
              d="M16.398 9.582C16.5345 9.582 16.6368 9.47109 16.6368 9.34313V2.99621C16.6368 2.92796 16.6112 2.86825 16.5601 2.82559L14.743 1.06825C14.7003 1.02559 14.6406 1 14.5724 1H9.86338C9.72688 1 9.62451 1.1109 9.62451 1.23886V9.3346C9.62451 9.4711 9.73541 9.57346 9.86338 9.57346H16.398V9.582ZM14.8198 1.81043L15.8008 2.75735H15.0586C14.9221 2.75735 14.8198 2.64645 14.8198 2.51848V1.81896V1.81043ZM10.1022 1.48626H14.3335V2.99621C14.3335 3.1327 14.4444 3.23507 14.5724 3.23507H16.0226C16.0738 3.23507 16.1165 3.21801 16.1506 3.19242V9.08721H10.1022V1.48626Z"
              fill="#00253B"
              stroke="#00253B"
              strokeWidth="0.25"
            ></path>
            <path
              d="M16.5689 12.2521L14.7518 10.4948C14.7091 10.4521 14.6494 10.4265 14.5812 10.4265H9.87216C9.73567 10.4265 9.6333 10.5374 9.6333 10.6654V18.7611C9.6333 18.8976 9.7442 19 9.87216 19H16.4068C16.5433 19 16.6456 18.8891 16.6456 18.7611V12.4142C16.6456 12.3459 16.62 12.2862 16.5689 12.2436V12.2521ZM14.82 11.2369L15.8011 12.1839H15.0589C14.9224 12.1839 14.82 12.073 14.82 11.945V11.2455V11.2369ZM16.1594 18.5308H10.111V10.9128H14.3423V12.4227C14.3423 12.5592 14.4532 12.6616 14.5812 12.6616H16.0314C16.0826 12.6616 16.1252 12.6445 16.1594 12.6189V18.5223V18.5308Z"
              fill="#00253B"
              stroke="#00253B"
              strokeWidth="0.25"
            ></path>
          </svg>
          <span className="text-[8px] font-medium text-[#00253b] sm:text-xs md:text-sm lg:text-base">
            My Assessments
          </span>
        </div>
        <div className="flex w-full items-center gap-2 pt-5 pl-3">
          <CiMail
            className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 xl:h-6 xl:w-6"
            color="black"
          />
          <span className="text-[10px] font-medium text-[#00253b] sm:text-xs md:text-sm lg:text-base">
            Inbox
          </span>
        </div>
      </div>
      <div ref={contentScrollRef} className="scrollbar-hide flex w-full flex-col overflow-y-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants.header}
          className="flex w-full flex-wrap items-center justify-between gap-4 px-2 py-4 md:px-8"
        >
          <div className="flex flex-wrap items-center gap-3 md:gap-6">
            <motion.span
              variants={itemVariants}
              className="text-xs font-bold text-[#00253b] sm:text-sm lg:text-2xl"
            >
              Java Developer 🇦🇪
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="rounded-lg bg-[#00253b] px-1 py-1 text-[8px] font-bold md:px-3 md:py-2 md:text-xs"
            >
              Published
            </motion.span>
            <motion.div variants={itemVariants} className="flex items-center gap-1">
              <BiFilterAlt className="h-3 w-3 sm:h-5 sm:w-5" color="black" />
              <span className="text-[8px] text-black uppercase sm:text-[10px] md:text-xs lg:text-sm">
                filter
              </span>
            </motion.div>
          </div>
          <motion.span
            variants={itemVariants}
            className="rounded-2xl bg-[#fad246] p-1 px-2 font-medium text-[#00253b] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] shadow-[#00253b] max-md:text-[6px] md:px-3 md:py-2"
          >
            SWITCH TO MATCHER
          </motion.span>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants.tabs}
          className="flex flex-row flex-wrap items-center gap-2 px-4 py-2 text-sm font-bold text-[#00253b] md:gap-12 md:px-8 md:py-4"
        >
          <motion.div
            variants={itemVariants}
            className="flex cursor-pointer flex-col"
            onClick={() => setActiveTab('assessment')}
          >
            <span className="px-1 pt-1 pb-1 text-[8px] md:px-4 md:pt-4 md:pb-3 md:text-sm">
              Assessment Completed
            </span>
            {activeTab === 'assessment' && (
              <span className="h-0.5 w-full bg-[#38b6ff] underline"></span>
            )}
          </motion.div>
          <motion.span variants={itemVariants} className="text-[8px] md:text-sm">
            Pending Assessment
          </motion.span>
          <motion.div
            ref={favoriteTabRef}
            variants={itemVariants}
            className="flex cursor-pointer flex-col"
            onClick={() => setActiveTab('favorite')}
          >
            <span className="px-2 text-[8px] md:pt-2 md:pb-2 md:text-sm">Favorite</span>
            {activeTab === 'favorite' && (
              <span className="h-0.5 w-full bg-[#38b6ff] underline"></span>
            )}
          </motion.div>
          <motion.span variants={itemVariants} className="text-[8px] md:text-sm">
            Edit
          </motion.span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
            variants={sectionVariants.candidates}
            style={{ scale: scaleEffect }}
            className="candidates-container"
          >
            {Array.from({ length: activeTab === 'favorite' ? 2 : 10 }).map((_, idx) => (
              <motion.div
                key={`${activeTab}-${idx}`}
                variants={itemVariants}
                className="repeat flex w-full flex-row items-center gap-4 px-4 pb-4 max-md:flex-wrap md:pr-8"
              >
                <div className="flex items-center max-md:w-full max-md:justify-evenly">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    className="v-popper--has-tooltip size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className="flex flex-row items-center justify-evenly max-md:w-2/4 md:flex-col">
                    <span className="text-lg font-bold text-[#00253b] md:text-2xl">#{idx + 1}</span>
                    <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[10px] font-bold text-white md:px-4 md:text-xs">
                      {85 - idx}%
                    </span>
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between gap-2 rounded-lg border-2 border-[#ededed] px-4 py-2 max-md:flex-col">
                  <div className="flex w-full flex-row items-start gap-1 max-md:justify-evenly md:items-center">
                    <span className="rounded-full bg-[#ebf4ff] px-3 py-3 text-[#7f9cf5] uppercase md:px-4 md:py-4 md:text-3xl">
                      RN
                    </span>
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-xs font-bold text-[#00253b] md:text-base">
                        Robert Ment
                      </span>
                      <div className="flex flex-row items-start gap-2 md:items-center">
                        <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[8px] text-[#00253b] md:text-xs lg:px-3 lg:py-2">
                          Senior
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#0077B5"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                    <span className="font-bold text-nowrap text-[#00253b]">Top skills</span>
                    <div className="flex flex-wrap items-start gap-1 md:items-center">
                      <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-xs">
                        AWS
                      </span>
                      <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-xs">
                        Docker
                      </span>
                      <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-xs">
                        Git
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                    <span className="text-xs font-bold text-[#00253b] md:text-base">
                      Country of residence
                    </span>
                    <span className="text-[#00253b] max-md:text-xs">🇦🇪 United Arab Emirates</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default MatchandRank;
