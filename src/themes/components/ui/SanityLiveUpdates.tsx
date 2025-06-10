'use client';

import { useEffect } from 'react';
import { client } from '@/sanity/lib/client';

interface SanityLiveUpdatesProps {
  query: string;
  params?: Record<string, unknown>;
  initialData?: unknown;
  onDataUpdate: (newData: unknown) => void;
  pollInterval?: number; // milliseconds
}

export function SanityLiveUpdates({
  query,
  params = {},
  initialData,
  onDataUpdate,
  pollInterval = 2000, // Poll every 2 seconds for instant updates
}: SanityLiveUpdatesProps) {
  useEffect(() => {
    let isActive = true;

    const fetchLatestData = async () => {
      if (!isActive) return;

      try {
        const data = await client.fetch(
          query,
          { ...params, _timestamp: Date.now() }, // Cache busting
          {
            cache: 'no-store',
            next: { revalidate: 0 },
          },
        );

        if (isActive && data && JSON.stringify(data) !== JSON.stringify(initialData)) {
          onDataUpdate(data);
        }
      } catch (error) {
        console.warn('Live update fetch failed:', error);
      }
    };

    // Start polling for updates
    const intervalId = setInterval(fetchLatestData, pollInterval);

    // Cleanup
    return () => {
      isActive = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [query, params, onDataUpdate, pollInterval, initialData]);

  return null; // This is an invisible component that just handles updates
}
