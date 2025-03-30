import React from 'react';
import { cn } from '../../lib/utils';

type SpotlightProps = {
  className?: string;
  fill?: string;
  darkModeFill?: string;
};

export const Spotlight = ({ className, fill, darkModeFill }: SpotlightProps) => {
  const lightFill = fill || 'rgba(59, 130, 246, 0.2)';
  const darkFill = darkModeFill || fill || 'rgba(58, 168, 236, 0.25)';

  return (
    <svg
      className={cn(
        'animate-spotlight pointer-events-none absolute z-[1] h-[200%] w-[180%] opacity-0 transition-all duration-300 sm:h-[180%] lg:h-[169%] lg:w-[84%]',
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          className="spotlight-fill transition-all duration-300"
          fill={lightFill}
          style={{
            fill: `var(--spotlight-fill, ${lightFill})`,
          }}
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="120"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
      <style jsx>{`
        @media (prefers-color-scheme: dark) {
          .spotlight-fill {
            fill: ${darkFill};
            --spotlight-fill: ${darkFill};
          }
        }
      `}</style>
    </svg>
  );
};
