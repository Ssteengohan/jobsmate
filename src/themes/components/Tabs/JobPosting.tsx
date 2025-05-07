import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const JobPosting = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // console.log('Auto-play prevented:', error);
      });
    }
  }, []);

  return (
    <motion.section className="relative flex items-center h-full justify-center overflow-hidden rounded-2xl">
      <div className="absolute inset-0 z-10" aria-hidden="true"></div>
      <video
        ref={videoRef}
        className="h-full w-full max-sm:hidden rounded-2xl object-cover object-top"
        src="/CleanShot 2025-04-04 at 18.37.34.mp4"
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{ pointerEvents: 'none' }}
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
      <video
        ref={videoRef}
        className="h-full w-full sm:hidden rounded-2xl object-cover object-top"
        src="/jobpost-mobile.mp4"
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{ pointerEvents: 'none' }}
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
    </motion.section>
  );
};

export default JobPosting;
