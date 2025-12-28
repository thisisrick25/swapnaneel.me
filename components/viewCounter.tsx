'use client';

import { useEffect, useState, useRef } from 'react';
import { ibm_plex_mono } from '@/fonts';
import { increment } from '@/db/actions';

interface ViewCounterProps {
  slug: string;
  trackView?: boolean;
  count?: number; // Pre-fetched count from server
}

export default function ViewCounter({ slug, trackView = true, count = 0 }: ViewCounterProps) {
  const [views, setViews] = useState<number>(count);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    // Prevent double incrementing (React StrictMode)
    if (hasIncrementedRef.current) return;
    if (!trackView) return;

    const viewedKey = `viewed_${slug}`;
    const stored = localStorage.getItem(viewedKey);
    const now = Date.now();
    const ONE_HOUR = 60 * 60 * 1000;

    let shouldIncrement = true;

    if (stored) {
      const viewedTime = parseInt(stored);
      if (now - viewedTime < ONE_HOUR) {
        shouldIncrement = false; // Still within 1 hour, don't increment
      }
    }

    if (shouldIncrement) {
      hasIncrementedRef.current = true;

      // Optimistic update
      setViews((prev) => prev + 1);

      // Increment using Server Action
      increment(slug).then((newCount) => {
        if (newCount > 0) {
          setViews(newCount);
        }
      }).catch((error) => {
        console.error('Error incrementing views:', error);
        // Revert optimistic update on error
        setViews(count);
      });

      localStorage.setItem(viewedKey, now.toString());
    }
  }, [slug, trackView, count]);

  return (
    <span className={ibm_plex_mono.className} style={{ fontWeight: '300' }}>
      {views} views
    </span>
  );
}
