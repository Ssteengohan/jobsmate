'use client';
import Link, { LinkProps } from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  className,
  onClick,
  ...props
}) => {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // If onClick prop was provided, call it first
    if (onClick) {
      onClick(e);
    }

    // If the event was prevented by onClick or is an anchor link, don't proceed with page transition
    if (e.defaultPrevented || href.startsWith('#')) {
      return;
    }

    e.preventDefault();
    const body = document.querySelector('body');

    body?.classList.add('page-transition');

    await sleep(500);
    router.push(href);
    await sleep(500);

    body?.classList.remove('page-transition');
  };

  return (
    <Link {...props} href={href} className={className} onClick={handleTransition}>
      {children}
    </Link>
  );
};
