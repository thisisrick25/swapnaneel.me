'use client';

import { useEffect, useState, useRef } from 'react';
import { fira_code } from '@/fonts';
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

    if (stored === '1') {
      return; // Already viewed, don't increment
    }

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

    localStorage.setItem(viewedKey, '1');
  }, [slug, trackView, count]);

  return (
    <span className={fira_code.className} style={{ fontWeight: '300' }}>
      {views} views
    </span>
  );
}
