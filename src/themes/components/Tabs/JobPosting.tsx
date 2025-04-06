import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const JobPosting = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, []);

  return (
    <motion.section className="flex items-center justify-center overflow-hidden rounded-2xl">
      {' '}
      <video
        ref={videoRef}
        className="h-full w-full rounded-2xl object-cover object-top"
        src="/CleanShot 2025-04-04 at 18.37.34.mp4"
        muted
        loop
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
    </motion.section>
  );
};

export default JobPosting;
