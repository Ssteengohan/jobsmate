import React, { useEffect, useState, useRef } from 'react';
import { SparklesPreview } from './Sparkles';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Function to get current year for copyright
const getCurrentYear = () => new Date().getFullYear();

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [email, setEmail] = useState('');

  // Refs for animations
  const mainTitleRef = useRef(null);
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const copyrightRef = useRef(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update year if needed (for sites that stay open across year boundaries)
  useEffect(() => {
    setCurrentYear(getCurrentYear());
  }, []);

  // Set up animations
  useEffect(() => {
    // Title animation
    gsap.fromTo(
      mainTitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
    );

    // Form animation
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.5 },
    );

    // Copyright section animation
    gsap.fromTo(copyrightRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.6 });

    // Set up ScrollTrigger for staggered footer items
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(containerRef.current, { opacity: 1, duration: 0.3 });
          gsap.fromTo(
            itemRefs.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              delay: 0.3,
            },
          );
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  // Handle email subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add subscription logic here
    console.log('Subscribing email:', email);
    setEmail('');
    // Show success message or feedback
  };

  // Button hover animations
  const handleButtonHover = (element: HTMLElement, isEntering: boolean) => {
    if (isEntering) {
      gsap.to(element, { scale: 1.02, duration: 0.2 });
    } else {
      gsap.to(element, { scale: 1, duration: 0.2 });
    }
  };

  // Footer link sections
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Integrations', href: '/integrations' },
        { label: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="relative z-10 flex w-full flex-col border-t-1 border-neutral-300 bg-[#f9f5eb] dark:border-[#f0b429]/30 dark:bg-[#1a2637]">
      {/* Community section with sparkles and newsletter - grouped together */}
      <div className="relative z-10 w-full overflow-hidden py-12">
        <div className="container mx-auto px-4">
          <div className="relative mx-auto max-w-3xl text-center">
            {/* SparklesPreview as background */}
            <div className="absolute inset-0 -z-10">
              <SparklesPreview />
            </div>

            {/* Community Title */}
            <h3
              ref={mainTitleRef}
              className="text-center text-2xl font-bold sm:text-3xl md:text-4xl"
            >
              <span className="text-[var(--primary-dark-blue)] drop-shadow-sm dark:text-[var(--primary-white)]">
                Join our tech{' '}
              </span>
              <span className="relative">
                <span className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-gold)] bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(240,180,41,0.3)]">
                  community
                </span>
              </span>
            </h3>

            {/* Newsletter subscription form */}
            <form
              ref={formRef}
              onSubmit={handleSubscribe}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Subscribe for updates on new features and integrations
              </p>
              <div className="relative flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-l-md border border-gray-300 px-4 py-2 text-sm focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                  required
                />
                <button
                  type="submit"
                  onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-r-md bg-[var(--primary-gold)] px-4 py-2 text-sm font-medium text-[var(--primary-dark-blue)] transition-all duration-200 hover:shadow-md dark:text-[var(--primary-dark)] dark:hover:shadow-[0_0_15px_rgba(240,180,41,0.4)]"
                >
                  <div className="via-primary-light-blue absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-70 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100 group-hover:shadow-md" />
                  <div className="via-primary-gold absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100" />
                  <span className="relative z-10">Subscribe</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div ref={containerRef} className="container mx-auto px-4 py-10 opacity-0">
        <div className="grid grid-cols-1 gap-8 max-sm:pb-5 md:grid-cols-2 lg:grid-cols-12">
          {/* Logo and company description - now spans 7 columns */}
          <div
            className="col-span-1 lg:col-span-7"
            ref={(el) => {
              itemRefs.current[0] = el;
            }}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <Image
                  src="/jobsmate-mob.svg"
                  alt="Jobsmate Logo"
                  width={140}
                  height={40}
                  className="dark:brightness-110"
                />
              </div>
              <p className="max-w-xs text-sm text-gray-600 dark:text-gray-300">
                Hire the best applicants for your tech positions. Focus on skills, not just resumes.
              </p>
              <div className="py-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Powered by </span>
                <Link
                  href="mailto:contact@nextshift.com"
                  className="group relative font-medium text-[var(--primary-medium-blue)] dark:text-[var(--primary-light-blue)]"
                >
                  <span className="relative z-10">NextShift</span>
                  <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-[var(--primary-medium-blue)] opacity-60 transition-all duration-300 group-hover:w-full dark:bg-[var(--primary-light-blue)]"></span>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer sections with links - each now spans 2 columns and positioned more to the right */}
          {footerSections.map((section, index) => (
            <div
              key={section.title}
              className={`col-span-1 lg:col-span-2 ${index === 0 ? 'lg:col-start-9' : 'lg:col-start-11'}`}
              ref={(el) => {
                itemRefs.current[index + 1] = el;
              }}
            >
              <h3 className="mb-4 text-sm font-semibold text-[var(--primary-dark-blue)] dark:text-[var(--primary-light-blue)]">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group relative text-sm text-gray-600 transition-colors duration-200 dark:text-gray-300"
                    >
                      <span className="relative">{link.label}</span>
                      <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-gray-400 opacity-50 transition-all duration-300 group-hover:w-full dark:bg-gray-500"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright section */}
      <div
        ref={copyrightRef}
        className="border-t border-gray-200 bg-[#f0ece0] py-6 dark:border-gray-700 dark:bg-[#162030]"
      >
        <div className="container mx-auto flex flex-col gap-4 px-4 text-xs text-gray-600 md:flex-row md:items-center md:justify-between dark:text-gray-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>&copy; {currentYear} Jobsmate. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <Link href="/privacy" className="group relative transition-colors duration-200">
              <span>Privacy Policy</span>
              <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-gray-400 opacity-50 transition-all duration-200 group-hover:w-full dark:bg-gray-500"></span>
            </Link>
            <span className="hidden md:inline">•</span>
            <Link href="/terms" className="group relative transition-colors duration-200">
              <span>Terms & Conditions</span>
              <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-gray-400 opacity-50 transition-all duration-200 group-hover:w-full dark:bg-gray-500"></span>
            </Link>

            {/* LinkedIn icon - visible on mobile next to Terms & Conditions */}
            <Link
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] md:hidden dark:hover:bg-gray-800"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          {/* LinkedIn icon for desktop - positioned on the right */}
          <div className="hidden items-center self-start md:ml-auto md:flex md:self-auto">
            <Link
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
