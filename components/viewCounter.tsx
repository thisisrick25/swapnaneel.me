'use client';

import { useEffect, useState, useRef } from 'react';

interface ViewCounterProps {
  slug: string;
  trackView?: boolean;
  count?: number; // Optional pre-fetched count
}

export default function ViewCounter({ slug, trackView = true, count }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(count ?? null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // If count was provided, use it directly
    if (count !== undefined) {
      setViews(count);
      return;
    }

    // Prevent double fetching
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    // Otherwise, fetch from API
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`);
        if (response.ok) {
          const data = await response.json();
          setViews(data.count);
        } else {
          console.error('Failed to fetch views');
          setViews(0);
        }
      } catch (error) {
        console.error('Error fetching views:', error);
        setViews(0);
      }
    };

    fetchViews();

    // Track view if not already viewed within the last hour
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
        // Increment view and mark as viewed with current timestamp
        const incrementView = async () => {
          try {
            await fetch('/api/views', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ slug }),
            });
            // Refresh the count after incrementing
            setTimeout(() => {
              fetchViews();
            }, 100);
          } catch (error) {
            console.error('Error incrementing views:', error);
          }
        };
        incrementView();
        localStorage.setItem(viewedKey, now.toString());
      }
    }
  }, [slug, trackView, count]);

  if (views === null) {
    return <p>Loading views...</p>;
  }

  return (
    <p>
      {views.toLocaleString()} views
    </p>
  );
}