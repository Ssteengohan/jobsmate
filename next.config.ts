import type { NextConfig } from "next";
import path from 'path';

const disableCache = process.env.DISABLE_WEBPACK_CACHE === 'true';

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
     // Disable production source maps to reduce bundle size
     productionBrowserSourceMaps: false,
     // Add experimental features for better optimization
     experimental: {
       optimizePackageImports: ['framer-motion', 'gsap', '@tsparticles/react'],
     },
     // Configure webpack to handle large assets better
     webpack: (config, { isServer }) => {
       // Make cache conditional
       config.cache = disableCache ? false : {
         type: 'filesystem',
         buildDependencies: {
           config: [__filename],
         },
         cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'),
         // Exclude large files from cache
         maxMemoryGenerations: 1,
         compression: 'gzip',
         // Don't cache files larger than 1MB
         maxAge: 172800000, // 2 days
       };
       
       // Optimize video handling
       config.module.rules.push({
         test: /\.(mp4|webm|ogg)$/,
         use: {
           loader: 'file-loader',
           options: {
             publicPath: '/_next/static/videos/',
             outputPath: 'static/videos/',
           },
         },
       });
       
       return config;
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
