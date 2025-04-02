import Image from 'next/image';
import { HiOutlineHome } from 'react-icons/hi2';
import { TbUsers } from 'react-icons/tb';
import { RiSettings3Line } from 'react-icons/ri';
import { CiMail } from 'react-icons/ci';
import { BiFilterAlt } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Dashboard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const scaleEffect = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    if (contentScrollRef.current) {
      setTimeout(() => {
        const element = contentScrollRef.current;
        if (!element) return;
        const start = element.scrollTop;
        const target = element.scrollHeight;
        const duration = 6000;
        let startTime: number | null = null;
        const animateScroll = (currentTime: number) => {
          if (!element) return;
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const easeInOutQuad =
            progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
          element.scrollTop = start + (target - start) * easeInOutQuad;
          if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
          }
        };
        requestAnimationFrame(animateScroll);
      }, 4000);
    }
  }, []);

  useEffect(() => {
    if (contentScrollRef.current) {
      const element = contentScrollRef.current;
      const preventScroll = (e: WheelEvent) => e.preventDefault();
      element.addEventListener('wheel', preventScroll, { passive: false });
      return () => {
        element.removeEventListener('wheel', preventScroll);
      };
    }
  }, []);

  const sectionVariants = {
    section1: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.005,
          delayChildren: 0.1,
        },
      },
    },
    section2: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.005,
          delayChildren: 1.1,
        },
      },
    },
    section3: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.005,
          delayChildren: 1.5,
        },
      },
    },
    section4: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.005,
          delayChildren: 2.4,
        },
      },
    },
    section5: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.005,
          delayChildren: 3.0,
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
    <section
      ref={scrollRef}
      className="scrollbar-hide pointer-events-auto flex h-full w-full flex-row overflow-hidden rounded-2xl border-1 border-zinc-300 bg-white select-none"
    >
      <div className="Navbar scrollbar-hide flex w-5/12 flex-col items-start rounded-2xl bg-white md:w-2/6 2xl:w-2/12">
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
        <div className="flex items-center gap-2 pt-3 pb-4 pl-3 sm:pt-6">
          <HiOutlineHome
            className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 xl:h-6 xl:w-6"
            color="#3bb7ff"
          />
          <span className="text-[10px] font-medium text-[#3bb7ff] sm:text-xs md:text-sm lg:text-base">
            Jobs
          </span>
        </div>
        <div className="flex h-8 w-full items-center bg-[#f9f9f9] pl-3 2xl:h-12">
          <span className="text-[10px] font-medium text-[#00253b] sm:text-xs md:text-sm lg:text-base">
            Post a job
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
      <div className="flex h-full w-full gap-12 rounded-r-2xl bg-[#f9f9f9] pt-3 pl-3 sm:px-4 sm:pt-6 md:px-7">
        <div
          ref={contentScrollRef}
          className="scrollbar-hide flex max-h-full w-full flex-col items-start gap-4 overflow-y-auto sm:gap-8"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants.section1}
            className="section-1 flex w-full flex-wrap items-center gap-2 sm:gap-3"
          >
            <motion.span
              variants={itemVariants}
              className="text-[10px] font-bold text-[#00253b] sm:text-xs md:text-sm lg:text-base"
            >
              16 jobs
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="rounded-lg bg-[#00253b] px-2 py-1 text-[8px] text-white sm:text-[10px] md:text-xs lg:px-3 lg:text-sm"
            >
              4 published
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="rounded-lg bg-[#38b6ff] px-2 py-1 text-[8px] text-white sm:text-[10px] md:text-xs lg:px-3 lg:text-sm"
            >
              0 available
            </motion.span>
            <motion.div variants={itemVariants} className="flex items-center gap-1 sm:ml-0">
              <BiFilterAlt
                className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 xl:h-6 xl:w-6"
                color="black"
              />
              <span className="text-[8px] text-black uppercase sm:text-[10px] md:text-xs lg:text-sm">
                filter
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants.section1}
            className="flex h-fit w-full flex-col items-start gap-6 lg:hidden"
          >
            <motion.div variants={itemVariants}>
              <span className="rounded-2xl bg-[#fad246] px-3 py-2 font-medium text-[#00253b] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] shadow-[#00253b] max-md:text-[8px]">
                + POST A JOB
              </span>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex w-fit flex-col items-center gap-4 rounded-lg bg-[#00253b] px-6 py-8"
            >
              <span className="text-lg text-white lg:text-xl">Your stats</span>
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] sm:text-sm">Jobs Listed</span>
                  <span className="text-lg md:text-xl lg:text-3xl">16</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] sm:text-sm">Jobs Filled</span>
                  <span className="text-lg md:text-xl lg:text-3xl">0</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] sm:text-sm">Countries</span>
                  <span className="text-lg md:text-xl lg:text-3xl">4</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex h-full w-full flex-col items-start gap-3"
            >
              <span className="pb- w-full text-lg font-bold text-[#00253b]">
                Recent top candidates
              </span>
              <div className="flex h-full items-center justify-end gap-2 rounded-2xl border-1 border-zinc-700/30 bg-white px-3 py-4 sm:gap-4">
                <span className="rounded-full bg-[#ebf4ff] px-2 py-2 text-[#7f9cf5]">RN</span>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#00253b] sm:text-sm">
                    Ricardo Belchior
                  </span>
                  <span className="text-[10px] text-[#00253b] sm:text-sm">Frontend Developer</span>
                </div>
                <span className="h-1/12 text-xs text-[#7a7a25] underline sm:text-sm">see more</span>
              </div>
              <div className="flex h-full items-center justify-end gap-2 rounded-2xl border-1 border-zinc-700/30 bg-white px-3 py-4 sm:gap-4">
                <span className="rounded-full bg-[#ebf4ff] px-2 py-2 text-[#7f9cf5]">RN</span>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#00253b] sm:text-sm">
                    Ricardo Belchior
                  </span>
                  <span className="text-[10px] text-[#00253b] sm:text-sm">Frontend Developer</span>
                </div>
                <span className="h-1/12 text-xs text-[#7a7a25] underline sm:text-sm">see more</span>
              </div>
              <div className="flex h-full items-center justify-end gap-2 rounded-2xl border-1 border-zinc-700/30 bg-white px-3 py-4 sm:gap-4">
                <span className="rounded-full bg-[#ebf4ff] px-2 py-2 text-[#7f9cf5]">RN</span>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#00253b] sm:text-sm">
                    Ricardo Belchior
                  </span>
                  <span className="text-[10px] text-[#00253b] sm:text-sm">Frontend Developer</span>
                </div>
                <span className="h-1/12 text-xs text-[#7a7a25] underline sm:text-sm">see more</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ scale: scaleEffect }}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1, margin: '-100px 0px -100px 0px' }}
            variants={sectionVariants.section2}
            className="section-2 flex h-fit w-full flex-col items-start gap-4 rounded-2xl bg-white px-4 py-4 shadow-xs shadow-gray-500/30 lg:py-8 lg:pb-10"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
              <IoIosArrowDown color="#757575" opacity={0.7} className="h-3 w-3 lg:h-5 lg:w-5" />
              <span className="text-[10px] text-[#00253b] lg:text-xs">Data</span>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex justify-between rounded-xl border-2 border-[#e5e7eb] px-2 py-3 md:w-5/8"
            >
              <div className="flex w-8/12 flex-col gap-1">
                <span className="text-xs font-bold text-[#00253b] md:text-lg">
                  Maxchine Learning Engineer
                </span>
                <span className="text-xs font-bold text-[#00253b] md:text-base">ACHMEA</span>
                <span className="text-[10px] font-light text-[#00253b] sm:text-sm">
                  Join our client a leading insurance company as a Machine Learning Engineer /
                  Python Developer, where you’ll drive innovation in pricing models and streamline
                  processes within a dynamic, data-driven team.
                </span>
              </div>
              <div className="flex h-full w-fit items-start justify-center pr-1">
                <span className="rounded-lg bg-[#38b6ff] px-4 py-1 text-[6px] text-white md:text-sm">
                  Under review
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ scale: scaleEffect }}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1, margin: '-100px 0px -100px 0px' }}
            variants={sectionVariants.section3}
            className="section-3 flex h-fit w-full flex-col items-start gap-4 rounded-2xl bg-white px-4 py-4 shadow-xs shadow-gray-500/30 lg:py-8 lg:pb-10"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
              <IoIosArrowDown color="#757575" opacity={0.7} className="h-3 w-3 lg:h-5 lg:w-5" />
              <span className="text-[10px] text-[#00253b] lg:text-xs">Other Engineering</span>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex justify-between rounded-xl border-2 border-[#e5e7eb] px-2 py-3 md:w-5/8"
            >
              <div className="flex w-8/12 flex-col gap-1">
                <span className="text-xs font-bold text-[#00253b] md:text-lg">
                  AI Engineer SYTAC
                </span>
                <span className="text-[10px] font-light text-[#00253b] sm:text-sm">
                  Drive AI innovation as an AI Engineer, specializing in NLP and large language
                  models, with opportunities to design impactful solutions and lead advancements
                  using AWS
                </span>
              </div>
              <div className="flex h-full w-auto items-start justify-end pr-1">
                <span className="rounded-lg bg-[#fad246] px-4 py-1 text-[8px] text-white md:text-sm">
                  Archived
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ scale: scaleEffect }}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1, margin: '-100px 0px -100px 0px' }}
            variants={sectionVariants.section4}
            className="section-4 flex h-fit w-full flex-col items-start gap-4 rounded-2xl bg-white px-4 py-4 shadow-xs shadow-gray-500/30 lg:py-8 lg:pb-10"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
              <IoIosArrowDown color="#757575" opacity={0.7} className="h-3 w-3 lg:h-5 lg:w-5" />
              <span className="text-[10px] text-[#00253b] lg:text-xs">Software Engineering</span>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 items-start gap-4 md:grid-cols-2"
            >
              <div className="flex justify-between rounded-xl border-2 border-[#e5e7eb] px-2 py-3">
                <div className="flex w-8/12 flex-col gap-1">
                  <span className="text-xs font-bold text-[#00253b] md:text-lg">
                    AI Engineer SYTAC
                  </span>
                  <span className="text-[10px] font-light text-[#00253b] md:text-sm">
                    Drive AI innovation as an AI Engineer, specializing in NLP and large language
                    models, with opportunities to design impactful solutions and lead advancements
                    using AWS
                  </span>
                </div>
                <div className="flex h-full w-auto items-start justify-end pr-1">
                  <span className="rounded-lg bg-[#fad246] px-4 py-1 text-[8px] text-white md:text-sm">
                    Archived
                  </span>
                </div>
              </div>
              <div className="flex justify-between rounded-xl border-2 border-[#e5e7eb] px-2 py-3">
                <div className="flex w-8/12 flex-col gap-1">
                  <span className="text-xs font-bold text-[#00253b] md:text-lg">
                    AI Engineer SYTAC
                  </span>
                  <span className="text-[10px] font-light text-[#00253b] md:text-sm">
                    Drive AI innovation as an AI Engineer, specializing in NLP and large language
                    models, with opportunities to design impactful solutions and lead advancements
                    using AWS
                  </span>
                </div>
                <div className="flex h-full w-auto items-start justify-end pr-1">
                  <span className="rounded-lg bg-[#fad246] px-4 py-1 text-[8px] text-white md:text-sm">
                    Archived
                  </span>
                </div>
              </div>
              <div className="flex justify-between rounded-xl border-2 border-[#e5e7eb] px-2 py-3">
                <div className="flex w-8/12 flex-col gap-1">
                  <span className="text-xs font-bold text-[#00253b] md:text-lg">
                    AI Engineer SYTAC
                  </span>
                  <span className="text-[10px] font-light text-[#00253b] md:text-sm">
                    Drive AI innovation as an AI Engineer, specializing in NLP and large language
                    models, with opportunities to design impactful solutions and lead advancements
                    using AWS
                  </span>
                </div>
                <div className="flex h-full w-auto items-start justify-end pr-1">
                  <span className="rounded-lg bg-[#fad246] px-4 py-1 text-[8px] text-white md:text-sm">
                    Archived
                  </span>
                </div>
              </div>
              <div className="flex justify-between rounded-xl border-2 border-[#e5e7eb] px-2 py-3">
                <div className="flex w-8/12 flex-col gap-1">
                  <span className="text-xs font-bold text-[#00253b] md:text-lg">
                    AI Engineer SYTAC
                  </span>
                  <span className="text-[10px] font-light text-[#00253b] md:text-sm">
                    Drive AI innovation as an AI Engineer, specializing in NLP and large language
                    models, with opportunities to design impactful solutions and lead advancements
                    using AWS
                  </span>
                </div>
                <div className="flex h-full w-auto items-start justify-end pr-1">
                  <span className="rounded-lg bg-[#fad246] px-4 py-1 text-[8px] text-white md:text-sm">
                    Archived
                  </span>
                </div>
              </div>
              <div className="flex justify-between rounded-xl border-2 border-[#e5e7eb] px-2 py-3">
                <div className="flex w-8/12 flex-col gap-1">
                  <span className="text-xs font-bold text-[#00253b] md:text-lg">
                    AI Engineer SYTAC
                  </span>
                  <span className="text-[10px] font-light text-[#00253b] md:text-sm">
                    Drive AI innovation as an AI Engineer, specializing in NLP and large language
                    models, with opportunities to design impactful solutions and lead advancements
                    using AWS
                  </span>
                </div>
                <div className="flex h-full w-auto items-start justify-end pr-1">
                  <span className="rounded-lg bg-[#fad246] px-4 py-1 text-[8px] text-white md:text-sm">
                    Archived
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants.section5}
          className="section-5 hidden h-full w-2/5 flex-col items-end gap-10 lg:flex"
        >
          <motion.div variants={itemVariants}>
            <span className="rounded-2xl bg-[#fad246] px-4 py-2 font-medium text-[#00253b] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] shadow-[#00253b]">
              + POST A JOB
            </span>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex w-fit flex-col items-center gap-4 rounded-lg bg-[#00253b] px-6 py-8"
          >
            <span className="text-lg text-white lg:text-xl">Your stats</span>
            <div className="flex gap-4 text-white">
              <div className="flex flex-col items-center">
                <span className="text-sm">Jobs Listed</span>
                <span className="text-lg md:text-xl lg:text-3xl">16</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm">Jobs Filled</span>
                <span className="text-lg md:text-xl lg:text-3xl">0</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm">Countries</span>
                <span className="text-lg md:text-xl lg:text-3xl">4</span>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex w-full flex-col items-end gap-3">
            <span className="w-7/8 pb-4 text-lg font-bold text-[#00253b]">
              Recent top candidates
            </span>
            <div className="flex items-end justify-end gap-4 rounded-2xl border-1 border-zinc-700/30 bg-white px-3 py-4">
              <span className="rounded-full bg-[#ebf4ff] px-2 py-2 text-[#7f9cf5]">RN</span>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-[#00253b]">Ricardo Belchior</span>
                <span className="text-sm text-[#00253b]">Frontend Developer</span>
              </div>
              <span className="text-[#7a7a25] underline">see more</span>
            </div>
            <div className="flex items-end justify-end gap-4 rounded-2xl border-1 border-zinc-700/30 bg-white px-3 py-4">
              <span className="rounded-full bg-[#ebf4ff] px-2 py-2 text-[#7f9cf5]">RN</span>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-[#00253b]">Ricardo Belchior</span>
                <span className="text-sm text-[#00253b]">Frontend Developer</span>
              </div>
              <span className="text-[#7a7a25] underline">see more</span>
            </div>
            <div className="flex items-end justify-end gap-4 rounded-2xl border-1 border-zinc-700/30 bg-white px-3 py-4">
              <span className="rounded-full bg-[#ebf4ff] px-2 py-2 text-[#7f9cf5]">RN</span>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-[#00253b]">Ricardo Belchior</span>
                <span className="text-sm text-[#00253b]">Frontend Developer</span>
              </div>
              <span className="text-[#7a7a25] underline">see more</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
