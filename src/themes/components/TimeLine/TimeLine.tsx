'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Timeline } from '../ui/timeline';
import { CodeBlockDemo } from './VsCode';
import { motion, useScroll, useTransform } from 'framer-motion';
import { client } from '@/sanity/lib/client';
import { TIMELINE_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { TimelineData } from '@/types/timeline';

interface TimelineDemoProps {
  initialData?: TimelineData | null;
}

export function TimelineDemo({ initialData }: TimelineDemoProps) {
  const [timelineData, setTimelineData] = useState<TimelineData | null>(initialData || null);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Fetch timeline data from Sanity only if not provided as props
  useEffect(() => {
    // If we already have initial data, skip fetching
    if (initialData) {
      return;
    }

    // Only fetch if no initial data provided
    const fetchTimelineData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(TIMELINE_QUERY);

        if (!data) {
          setError('No timeline data found. Please add a timeline document in Sanity.');
          return;
        }

        setTimelineData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching timeline data:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to load timeline data: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, [initialData]);

  useEffect(() => {
    const videoElements = [videoRef.current, videoRef2.current];

    videoElements.forEach((video) => {
      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.preload = 'metadata';
        requestAnimationFrame(() => {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log('Autoplay was prevented:', error);
            });
          }
        });
      }
    });

    return () => {
      videoElements.forEach((video) => {
        if (video && !video.paused) {
          video.pause();
        }
      });
    };
  }, []);

  // Generate multiple progress transforms for different timeline items
  const firstItemProgress = useTransform(scrollYProgress, [0.05, 0.25], [0, 1], { clamp: false });
  const secondItemProgress = useTransform(scrollYProgress, [0.3, 0.5], [0, 1], { clamp: false });
  const thirdItemProgress = useTransform(scrollYProgress, [0.25, 0.65], [0, 1], { clamp: false });
  const fourthItemProgress = useTransform(scrollYProgress, [0.45, 0.8], [0, 1], { clamp: false });
  const fifthItemProgress = useTransform(scrollYProgress, [0.6, 0.95], [0, 1], { clamp: false });

  // Array of progress transforms to use for each item
  const progressTransforms = [
    firstItemProgress,
    secondItemProgress,
    thirdItemProgress,
    fourthItemProgress,
    fifthItemProgress,
  ];

  // Create y transforms for each progress
  const firstYTransform = useTransform(firstItemProgress, [0, 1], [20, 0], { clamp: false });
  const secondYTransform = useTransform(secondItemProgress, [0, 1], [20, 0], { clamp: false });
  const thirdYTransform = useTransform(thirdItemProgress, [0, 1], [20, 0], { clamp: false });
  const fourthYTransform = useTransform(fourthItemProgress, [0, 1], [20, 0], { clamp: false });
  const fifthYTransform = useTransform(fifthItemProgress, [0, 1], [20, 0], { clamp: false });

  const yTransforms = [
    firstYTransform,
    secondYTransform,
    thirdYTransform,
    fourthYTransform,
    fifthYTransform,
  ];

  // Create scale transforms for each progress
  const firstScaleTransform = useTransform(firstItemProgress, [0, 1], [0.95, 1], { clamp: false });
  const secondScaleTransform = useTransform(secondItemProgress, [0, 1], [0.95, 1], {
    clamp: false,
  });
  const thirdScaleTransform = useTransform(thirdItemProgress, [0, 1], [0.95, 1], { clamp: false });
  const fourthScaleTransform = useTransform(fourthItemProgress, [0, 1], [0.95, 1], {
    clamp: false,
  });
  const fifthScaleTransform = useTransform(fifthItemProgress, [0, 1], [0.95, 1], { clamp: false });

  const scaleTransforms = [
    firstScaleTransform,
    secondScaleTransform,
    thirdScaleTransform,
    fourthScaleTransform,
    fifthScaleTransform,
  ];

  // Create blur transforms for each progress
  const firstBlurTransform = useTransform(
    firstItemProgress,
    [0, 0.5, 1],
    ['blur(4px)', 'blur(1px)', 'blur(0px)'],
  );
  const secondBlurTransform = useTransform(
    secondItemProgress,
    [0, 0.5, 1],
    ['blur(4px)', 'blur(1px)', 'blur(0px)'],
  );
  const thirdBlurTransform = useTransform(
    thirdItemProgress,
    [0, 0.5, 1],
    ['blur(4px)', 'blur(1px)', 'blur(0px)'],
  );
  const fourthBlurTransform = useTransform(
    fourthItemProgress,
    [0, 0.5, 1],
    ['blur(4px)', 'blur(1px)', 'blur(0px)'],
  );
  const fifthBlurTransform = useTransform(
    fifthItemProgress,
    [0, 0.5, 1],
    ['blur(4px)', 'blur(1px)', 'blur(0px)'],
  );

  const blurTransforms = [
    firstBlurTransform,
    secondBlurTransform,
    thirdBlurTransform,
    fourthBlurTransform,
    fifthBlurTransform,
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="relative z-20 h-full w-full" id="timeline">
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-48 animate-pulse rounded bg-gray-300"></div>
            <div className="mx-auto h-4 w-64 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !timelineData) {
    return (
      <div className="relative z-20 h-full w-full" id="timeline">
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <p className="mb-4 text-red-500">{error || 'Timeline data not found'}</p>
            <p className="text-gray-500">Please check your Sanity configuration.</p>
          </div>
        </div>
      </div>
    );
  }

  // Generate timeline data from Sanity
  const data = timelineData.items.map((item, index) => {
    const progress = progressTransforms[index] || firstItemProgress;
    const yTransform = yTransforms[index] || yTransforms[0];
    const scaleTransform = scaleTransforms[index] || scaleTransforms[0];
    const blurTransform = blurTransforms[index] || blurTransforms[0];

    // Debug: Log item data to see what we're receiving
    console.log('Timeline item:', {
      title: item.title,
      hasImage: !!item.image?.asset?.url,
      hasVideo: !!(item.video?.asset?.url || item.videoUrl),
      showCodeBlock: item.showCodeBlock,
    });

    return {
      title: item.title,
      content: (
        <div>
          <motion.p
            transition={{
              duration: 0.05,
              ease: 'linear',
              type: 'tween',
            }}
            style={{
              opacity: progress,
              y: yTransform,
              willChange: 'opacity, transform',
            }}
            className="mb-8 text-xs font-normal text-[var(--primary-dark-blue)] md:text-lg dark:text-neutral-200"
          >
            {item.emoji} {item.description}
          </motion.p>
          <motion.div
            transition={{
              duration: 0.05,
              ease: 'linear',
            }}
            style={{
              opacity: progress,
              scale: scaleTransform,
              filter: blurTransform,
              willChange: 'opacity, transform, filter',
            }}
            className="flex h-full w-full flex-col gap-4 md:gap-8"
          >
            {/* Render Image if available */}
            {item.image?.asset?.url && (
              <div className="w-full">
                <Image
                  src={urlFor(item.image).width(700).height(700).url()}
                  alt={item.image?.alt || item.title}
                  width={700}
                  height={700}
                  className="h-full w-full rounded-lg border-1 border-zinc-300 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                  loading="eager"
                  priority
                />
              </div>
            )}

            {/* Video and Code Block Container */}
            {(item.video?.asset?.url || item.videoUrl || item.showCodeBlock) && (
              <div
                className={`flex h-full w-full ${(item.video?.asset?.url || item.videoUrl) && item.showCodeBlock ? 'flex-col-reverse gap-4 md:gap-12' : 'flex-col gap-4 md:gap-8'}`}
              >
                {/* Code Block */}
                {item.showCodeBlock && (
                  <div className="w-full max-w-full overflow-hidden">
                    <CodeBlockDemo scrollProgress={progress} />
                  </div>
                )}

                {/* Video */}
                {(item.video?.asset?.url || item.videoUrl) && (
                  <video
                    ref={index === 0 ? videoRef : index === 1 ? videoRef2 : undefined}
                    className="h-full w-full rounded-2xl border-1 border-zinc-300 object-cover object-top shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    src={
                      item.video?.asset?.url || item.videoUrl || '/anti-cheat.mp4' // Fallback video
                    }
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    controls={false}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
          </motion.div>
        </div>
      ),
    };
  });

  return (
    <div ref={containerRef} className="relative z-20 h-full w-full" id="timeline">
      <Timeline
        data={data}
        title={timelineData.title}
        highlightedTitle={timelineData.highlightedTitle}
        subtitle={timelineData.subtitle}
      />
    </div>
  );
}
