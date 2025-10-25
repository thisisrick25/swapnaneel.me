'use client';

import { useEffect, useState, useRef } from 'react';
import { jetbrains_mono } from '@/fonts';

interface ViewCounterProps {
  slug: string;
  trackView?: boolean;
  count?: number; // Optional pre-fetched count
}

export default function ViewCounter({ slug, trackView = true, count }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(count ?? null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Prevent double fetching
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const setInitialViews = async (): Promise<number> => {
      if (count !== undefined) {
        setViews(count);
        return count;
      } else {
        try {
          const response = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`);
          if (response.ok) {
            const data = await response.json();
            setViews(data.count);
            return data.count;
          } else {
            console.error('Failed to fetch views');
            setViews(0);
            return 0;
          }
        } catch (error) {
          console.error('Error fetching views:', error);
          setViews(0);
          return 0;
        }
      }
    };

    setInitialViews().then((initialCount) => {
      if (trackView) {
        const viewedKey = `viewed_${slug}`;
        const stored = localStorage.getItem(viewedKey);
        const now = Date.now();
        const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

        let shouldIncrement = true;

        if (stored) {
          const viewedTime = parseInt(stored);
          if (now - viewedTime < ONE_HOUR) {
            shouldIncrement = false; // Still within 1 hour, don't increment
          }
        }

        if (shouldIncrement) {
          setViews(initialCount + 1);

          // Increment view on server in background
          const incrementView = async () => {
            try {
              await fetch('/api/views', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ slug }),
              });
            } catch (error) {
              console.error('Error incrementing views:', error);
              // Revert optimistic update on error
              setViews(initialCount);
            }
          };
          incrementView();
          localStorage.setItem(viewedKey, now.toString());
        }
      }
    });
  }, [slug, trackView, count]);

  if (views === null) {
    return <p>Loading views...</p>;
  }

  return (
    <p className={jetbrains_mono.className}>
      {views} views
    </p>
  );
}