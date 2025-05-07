import React, { useEffect, useState } from 'react';
// import { SparklesPreview } from './Sparkles';
import Link from 'next/link';
import Image from 'next/image';

// Define interfaces for our components
interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const getCurrentYear = () => new Date().getFullYear();

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  // const [email, setEmail] = useState('');
  useEffect(() => {
    setCurrentYear(getCurrentYear());
  }, []);

  // const handleSubscribe = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Subscribing email:', email);
  //   setEmail('');
  // };

  const footerSections: FooterSection[] = [
    {
      title: 'Platform',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing-card' },
        { label: 'About us', href: 'https://jobsmate.global/why-jobsmate/' },
      ],
    },
    {
      title: 'Contact',
      links: [
        {
          label: 'Abberdaan 56, 1064 AA Amsterdam',
          href: 'https://maps.app.goo.gl/Z1YWD6nBfJsPJt776',
          isExternal: true,
        },
        {
          label: '+31 6 38 27 51 70',
          href: 'tel:+31638275170',
          isExternal: true,
        },
      ],
    },
  ];

  return (
    <footer className="relative z-10 flex w-full flex-col border-t-1 border-neutral-300 bg-[#f9f5eb] dark:border-[#f0b429]/30 dark:bg-[#1a2637]">
      <div className="relative z-10 w-full overflow-hidden py-12">
        <div className="container mx-auto px-4">
          {/* <div className="relative mx-auto max-w-3xl text-center">
            <div className="absolute inset-0 -z-10">
              <SparklesPreview />
            </div>
            <h3 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
              <span className="text-[var(--primary-dark-blue)] drop-shadow-sm dark:text-[var(--primary-white)]">
                Join our tech{' '}
              </span>
              <span className="relative">
                <span className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-gold)] bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(240,180,41,0.3)]">
                  community
                </span>
              </span>
            </h3>
            <form
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
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-r-md bg-[var(--primary-gold)] px-4 py-2 text-sm font-medium text-[var(--primary-dark-blue)] transition-all duration-200 hover:shadow-md dark:text-[var(--primary-dark)] dark:hover:shadow-[0_0_15px_rgba(240,180,41,0.4)]"
                >
                  <div className="via-primary-light-blue absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-70 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100 group-hover:shadow-md" />
                  <div className="via-primary-gold absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 shadow-sm transition-all duration-300 group-hover:w-3/4 group-hover:opacity-100" />
                  <span className="relative z-10">Subscribe</span>
                </button>
              </div>
            </form>
          </div> */}
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 max-sm:pb-5 md:grid-cols-2 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-5">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <Image
                  src="/jobsmate-mob.svg"
                  alt="Jobsmate Logo"
                  width={140}
                  height={40}
                  className="h-40 w-40 dark:brightness-100"
                />
              </div>
              <p className="max-w-xs text-sm text-gray-600 dark:text-gray-300">
                Hire the best applicants for your tech positions. Focus on skills, not just resumes.
              </p>
              <div className="py-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Powered by </span>
                <Link
                  href="mailto:contact@nextshift.com"
                  aria-label="Contact NextShift"
                  className="group relative font-medium text-[var(--primary-medium-blue)] dark:text-[var(--primary-light-blue)]"
                >
                  <span className="relative z-10">NextShift</span>
                  <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-[var(--primary-medium-blue)] opacity-60 transition-all duration-300 group-hover:w-full dark:bg-[var(--primary-light-blue)]"></span>
                </Link>
              </div>
            </div>
          </div>
          {footerSections.map((section, index) => (
            <div
              key={section.title}
              className={`col-span-1 lg:col-span-2 ${
                index === 0 ? 'lg:col-start-7' : index === 1 ? 'lg:col-start-9' : 'lg:col-start-11'
              }`}
            >
              <h3 className="mb-4 text-sm font-semibold text-[var(--primary-dark-blue)] dark:text-[var(--primary-light-blue)]">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal || link.href.startsWith('#') ? (
                      <Link
                        href={link.href}
                        aria-label={link.label}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        className="group relative text-sm text-gray-600 transition-colors duration-200 dark:text-gray-300"
                      >
                        <span className="relative">{link.label}</span>
                        <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-gray-400 opacity-50 transition-all duration-300 group-hover:w-full dark:bg-gray-500"></span>
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        aria-label={link.label}
                        className="group relative text-sm text-gray-600 transition-colors duration-200 dark:text-gray-300"
                      >
                        <span className="relative">{link.label}</span>
                        <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-gray-400 opacity-50 transition-all duration-300 group-hover:w-full dark:bg-gray-500"></span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200 bg-[#f0ece0] py-6 dark:border-gray-700 dark:bg-[#162030]">
        <div className="container mx-auto flex flex-col gap-4 px-4 text-xs text-gray-600 md:flex-row md:items-center md:justify-between dark:text-gray-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>&copy; {currentYear} Jobsmate. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <Link
              href="https://jobsmate.global/privacy-policy"
              aria-label="Privacy Policy"
              className="group relative transition-colors duration-200"
            >
              <span>Privacy Policy</span>
              <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-gray-400 opacity-50 transition-all duration-200 group-hover:w-full dark:bg-gray-500"></span>
            </Link>
            <span className="hidden md:inline">•</span>
            <Link
              href="https://jobsmate.global/terms-and-conditions-employees"
              aria-label="Terms and Conditions"
              className="group relative transition-colors duration-200"
            >
              <span>Terms & Conditions</span>
              <span className="absolute -bottom-0.5 left-0 h-[0.5px] w-0 bg-gray-400 opacity-50 transition-all duration-200 group-hover:w-full dark:bg-gray-500"></span>
            </Link>
            <div className="flex space-x-2 md:hidden">
              <Link
                href="https://www.linkedin.com/company/jobsmate"
                aria-label="LinkedIn"
                className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
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

              <Link
                href="https://www.instagram.com/jobsmateglobal/"
                aria-label="Instagram"
                className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <Link
                href="mailto:info@jobsmate.nl"
                aria-label="Gmail"
                className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="hidden items-center self-start md:ml-auto md:flex md:self-auto">
            <Link
              href="https://www.linkedin.com/company/jobsmate?originalSubdomain=nl"
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

            <Link
              href="https://www.instagram.com/jobsmateglobal/"
              aria-label="Instagram"
              className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            <Link
              href="mailto:info@jobsmate.nl"
              aria-label="Gmail"
              className="transform rounded-full p-1.5 text-gray-500 transition-all duration-300 hover:scale-110 hover:bg-gray-100 hover:text-[var(--primary-light-blue)] dark:hover:bg-gray-800"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
