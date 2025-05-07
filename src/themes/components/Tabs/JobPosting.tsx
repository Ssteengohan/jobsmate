import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const JobPosting = () => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [desktopVideoError, setDesktopVideoError] = useState<boolean>(false);
  const [mobileVideoError, setMobileVideoError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (desktopVideoRef.current) {
      desktopVideoRef.current.play().catch((error) => {
        console.log('Desktop video play error:', error);
        setDesktopVideoError(true);
      });
    }

    console.log('Attempting to load mobile video from:', '/jobpost-mobile.mp4');

    const isMobile = window.innerWidth < 640; // sm breakpoint
    if (isMobile) {
      console.log('Mobile device detected, should show mobile video');
    }

    if (mobileVideoRef.current) {
      mobileVideoRef.current.addEventListener('loadeddata', () => {
        console.log('Mobile video loaded successfully');
        setIsLoading(false);
      });

      mobileVideoRef.current.play().catch((error) => {
        console.error('Mobile video play error:', error);
        setMobileVideoError(true);
        setIsLoading(false);
      });
    }
  }, []);

  const mobilePaths = [
    '/jobpost-mobile.mp4',
    '/public/jobpost-mobile.mp4',
    '/assets/jobpost-mobile.mp4',
    '/videos/jobpost-mobile.mp4',
  ];

  return (
    <motion.section className="relative flex h-full items-center justify-center overflow-hidden rounded-2xl">
      <div className="absolute inset-0 z-10" aria-hidden="true"></div>

      {!desktopVideoError ? (
        <video
          ref={desktopVideoRef}
          className="h-full w-full rounded-2xl object-cover object-top max-sm:hidden"
          src="/CleanShot 2025-04-04 at 18.37.34.mp4"
          poster="/video-poster-desktop.jpg"
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ pointerEvents: 'none' }}
          preload="auto"
          onError={() => setDesktopVideoError(true)}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100 max-sm:hidden">
          <p className="text-gray-500">Video preview unavailable</p>
        </div>
      )}

      {!mobileVideoError ? (
        <video
          ref={mobileVideoRef}
          className="h-full w-full rounded-2xl object-cover object-top sm:hidden"
          src={mobilePaths[0]}
          poster="/video-poster-mobile.jpg"
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ pointerEvents: 'none' }}
          preload="auto"
          onError={(e) => {
            console.error('Mobile video error:', e);
            const target = e.target as HTMLVideoElement;
            console.error('Video error code:', target.error?.code);
            console.error('Video error message:', target.error?.message);
            setMobileVideoError(true);
          }}
        >
          {mobilePaths.slice(1).map((path, index) => (
            <source key={index} src={path} type="video/mp4" />
          ))}
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100 sm:hidden">
          <p className="text-gray-500">Video preview unavailable</p>
        </div>
      )}

      {isLoading && (
        <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-gray-100 sm:hidden">
          <p className="text-gray-700">Loading video...</p>
        </div>
      )}
    </motion.section>
  );
};

export default JobPosting;
