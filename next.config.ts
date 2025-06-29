import type { NextConfig } from "next";

const nextConfig: NextConfig = {
      images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https', 
            hostname: '*.sanitycdn.com',
            port: '',
            pathname: '/**',
          },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
    },
     productionBrowserSourceMaps: true,
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
