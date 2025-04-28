import type { NextConfig } from "next";

const nextConfig: NextConfig = {
      images: {
        formats: ["image/avif", "image/webp"],
    },
    async redirects() {
      return [
        // Common misspellings of "jobsmate"
        {
          source: '/jobs-mate/:path*',
          destination: '/:path*',
          permanent: true,
        },
        {
          source: '/job-mate/:path*',
          destination: '/:path*',
          permanent: true,
        },
        {
          source: '/jobmate/:path*',
          destination: '/:path*',
          permanent: true,
        },
        {
          source: '/jobs-mates/:path*',
          destination: '/:path*',
          permanent: true,
        },
        // Common section misspellings
        {
          source: '/pricing-plans',
          destination: '/pricing',
          permanent: true,
        },
        {
          source: '/about-us',
          destination: '/about',
          permanent: true,
        },
        {
          source: '/job-search',
          destination: '/jobs',
          permanent: true,
        },
        {
          source: '/contact-us',
          destination: '/contact',
          permanent: true,
        },
        {
          source: '/terms-of-service',
          destination: '/terms',
          permanent: true,
        },
        {
          source: '/privacy-policy',
          destination: '/privacy',
          permanent: true,
        }
      ];
    }
};

export default nextConfig;
