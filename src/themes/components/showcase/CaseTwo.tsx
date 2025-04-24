import Link from 'next/link';
import React, { ReactNode } from 'react';
import Balancer from 'react-wrap-balancer';
import { ArrowRight, Award } from 'lucide-react';

interface SaasIconProps {
  children: ReactNode;
  className?: string;
}

const SaasIcon = ({ children, className = '' }: SaasIconProps) => (
  <div
    className={`flex h-5 w-5 items-center justify-center rounded-md bg-[#4dabf7] text-white ${className}`}
  >
    {children}
  </div>
);

const CaseTwo = () => {
  return (
    <div className="relative mt-[50vh] h-[800px] border-b border-black/20 pt-20 dark:border-white/30">
      <div className="mx-auto h-full">
        <div className="flex h-full">
          <div className="flex w-1/4 flex-col justify-between pt-20 text-gray-600 md:text-base dark:text-gray-400">
            <div className="px-4">
              <h3 className="text-foreground text-xl font-bold">Build Your Global Team</h3>
              <Balancer className="pt-5">
                Hire Globally with ease - Matching of skills, experience & job description
              </Balancer>

              <Balancer className="w-3/4 pt-10">
                Rceive automatically all the applicant information in your Applicant Tracking System
              </Balancer>

              <ul className="list-disc pt-5 pl-5">
                <li>Seniority</li>
                <li>Skills</li>
                <li>Ranking</li>
                <li>Anti-cheating report</li>
              </ul>
            </div>
            <Link
              href={'/'}
              className="group text-foreground relative flex w-fit items-center gap-1 px-4 pb-20 text-sm font-semibold"
            >
              <span className="relative inline-block">
                Explore Ranked matches
                <span className="absolute bottom-[-4px] left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"></span>
              </span>
              <ArrowRight className="inline h-4 w-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="relative w-2/4 overflow-hidden border-r border-l border-black/20 dark:border-white/30">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-medium-blue)]/5 via-transparent to-[var(--primary-gold)]/5"></div>
              <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-medium-blue)_0.8px,transparent_0.8px)] [background-size:14px_14px]"></div>
              <div className="absolute inset-0 [background-image:radial-gradient(var(--primary-gold)_0.8px,transparent_0.8px)] [background-size:18px_18px]"></div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-[var(--neutral-50)]/30"></div>
            </div>
            <div className="relative z-10 flex flex-col">
              <div className="pt-10 pl-5">
                <span className="text-background rounded-xl text-xl bg-white px-2 py-2 font-bold">
                  <SaasIcon className="mr-2 inline-flex bg-[var(--primary-gold)]">
                    <Award className="h-3 w-3" />
                  </SaasIcon>
                  Matched & Ranked
                </span>
              </div>
              <div className="flex flex-col gap-4 pt-10 pl-30">
                <div className="flex w-[90%] flex-row items-center rounded-2xl border-[#7f9cf5]/50 border-1 bg-white px-2 py-2 max-md:flex-wrap md:pr-2">
                  <div className="flex items-center max-md:w-full max-md:justify-evenly">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      className="v-popper--has-tooltip size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div className="flex flex-row items-center justify-evenly max-md:w-2/4 md:flex-col">
                      <span className="text-lg font-bold text-[#00253b] md:text-xl">1#</span>
                      <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[10px] font-bold text-white md:px-4 md:text-[10px]">
                        70%
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between border-[#ededed] px-2 max-md:flex-col">
                    <div className="flex w-full flex-row items-start gap-1 max-md:justify-evenly md:items-center">
                      <span className="rounded-full bg-[#ebf4ff] px-2 py-3 text-[#7f9cf5] uppercase md:px-2 md:py-2 md:text-xl">
                        RN
                      </span>
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-bold text-[#00253b]">Robert Ment</span>
                        <div className="flex flex-row items-start gap-2 md:items-center">
                          <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[8px] font-bold text-[#00253b] md:text-xs lg:px-2 lg:py-1">
                            Senior
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#0077B5"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-5 xl:w-5"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                      <span className="text-sm font-bold text-nowrap text-[#00253b]">
                        Top skills
                      </span>
                      <div className="flex flex-wrap items-start gap-1 md:items-center">
                        <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                          AWS
                        </span>
                        <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                          Docker
                        </span>
                        <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                          Git
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                      <span className="text-xs font-bold text-[#00253b] md:text-xs">
                        Country of residence
                      </span>
                      <span className="text-[10px] text-[#00253b]">🇦🇪 United Arab Emirates</span>
                    </div>
                  </div>
                </div>
                <div className="flex w-[90%] flex-row items-center rounded-2xl border-[#7f9cf5]/50 border-1 bg-white px-2 py-2 max-md:flex-wrap md:pr-2">
                  <div className="flex items-center max-md:w-full max-md:justify-evenly">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      className="v-popper--has-tooltip size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div className="flex flex-row items-center justify-evenly max-md:w-2/4 md:flex-col">
                      <span className="text-lg font-bold text-[#00253b] md:text-xl">1#</span>
                      <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[10px] font-bold text-white md:px-4 md:text-[10px]">
                        70%
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between border-[#ededed] px-2 max-md:flex-col">
                    <div className="flex w-full flex-row items-start gap-1 max-md:justify-evenly md:items-center">
                      <span className="rounded-full bg-[#ebf4ff] px-2 py-3 text-[#7f9cf5] uppercase md:px-2 md:py-2 md:text-xl">
                        RN
                      </span>
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-bold text-[#00253b]">Robert Ment</span>
                        <div className="flex flex-row items-start gap-2 md:items-center">
                          <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[8px] font-bold text-[#00253b] md:text-xs lg:px-2 lg:py-1">
                            Senior
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#0077B5"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-5 xl:w-5"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                      <span className="text-sm font-bold text-nowrap text-[#00253b]">
                        Top skills
                      </span>
                      <div className="flex flex-wrap items-start gap-1 md:items-center">
                        <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                          AWS
                        </span>
                        <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                          Docker
                        </span>
                        <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                          Git
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                      <span className="text-xs font-bold text-[#00253b] md:text-xs">
                        Country of residence
                      </span>
                      <span className="text-[10px] text-[#00253b]">🇦🇪 United Arab Emirates</span>
                    </div>
                  </div>
                </div>
                <div className="flex w-[90%] flex-row items-center rounded-2xl border-[#7f9cf5]/50 border-1 bg-white px-2 py-2 max-md:flex-wrap md:pr-2">
                  <div className="flex items-center max-md:w-full max-md:justify-evenly">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      className="v-popper--has-tooltip size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div className="flex flex-row items-center justify-evenly max-md:w-2/4 md:flex-col">
                      <span className="text-lg font-bold text-[#00253b] md:text-xl">1#</span>
                      <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[10px] font-bold text-white md:px-4 md:text-[10px]">
                        70%
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between border-[#ededed] px-2 max-md:flex-col">
                    <div className="flex w-full flex-row items-start gap-1 max-md:justify-evenly md:items-center">
                      <span className="rounded-full bg-[#ebf4ff] px-2 py-3 text-[#7f9cf5] uppercase md:px-2 md:py-2 md:text-xl">
                        RN
                      </span>
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-bold text-[#00253b]">Robert Ment</span>
                        <div className="flex flex-row items-start gap-2 md:items-center">
                          <span className="rounded-lg bg-[#fad246] px-2 py-1 text-[8px] font-bold text-[#00253b] md:text-xs lg:px-2 lg:py-1">
                            Senior
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#0077B5"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-5 xl:w-5"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                      <span className="text-sm font-bold text-nowrap text-[#00253b]">
                        Top skills
                      </span>
                      <div className="flex flex-wrap items-start gap-1 md:items-center">
                        <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                          AWS
                        </span>
                        <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                          Docker
                        </span>
                        <span className="rounded-lg bg-[#38b6ff] px-3 py-1 text-[8px] font-bold text-nowrap text-white md:text-[10px]">
                          Git
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center gap-1 sm:items-start">
                      <span className="text-xs font-bold text-[#00253b] md:text-xs">
                        Country of residence
                      </span>
                      <span className="text-[10px] text-[#00253b]">🇦🇪 United Arab Emirates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default CaseTwo;
