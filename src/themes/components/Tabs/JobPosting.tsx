import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getVideoUrlWithFallback } from '@/lib/spaces';

const JobPosting = () => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [desktopVideoError, setDesktopVideoError] = useState<boolean>(false);
  const [mobileVideoError, setMobileVideoError] = useState<boolean>(false);

  useEffect(() => {

    if (desktopVideoRef.current) {
      desktopVideoRef.current.play().catch((error) => {
        console.log('Desktop video play error:', error);
        setDesktopVideoError(true);
      });
    }


    if (mobileVideoRef.current) {
      mobileVideoRef.current.play().catch((error) => {
        console.log('Mobile video play error:', error);
        setMobileVideoError(true);
      });
    }
  }, []);

  return (
    <motion.section className="relative flex h-full items-center justify-center overflow-hidden rounded-2xl">
      <div className="absolute inset-0 z-10" aria-hidden="true"></div>


      {!desktopVideoError ? (
        <video
          ref={desktopVideoRef}
          className="h-full w-full rounded-2xl object-cover object-top max-sm:hidden"
          src={getVideoUrlWithFallback('jobpostDesktop')}
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
          src={getVideoUrlWithFallback('jobpostMobile')}
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ pointerEvents: 'none' }}
          preload="auto"
          onError={() => setMobileVideoError(true)}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100 sm:hidden">
          <p className="text-gray-500">Video preview unavailable</p>
        </div>
      )}
    </motion.section>
  );
};

export default JobPosting;
