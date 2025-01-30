import { increment } from 'db/actions';
import { getViewsCount } from 'db/queries';
import { cache } from 'react';

interface ViewCounterProps {
  slug: string;
  trackView?: boolean;
}

const incrementViews = cache(increment);

export default async function ViewCounter({ slug, trackView = true }: ViewCounterProps) {
  const views = await getViewsCount();

  const count = views.find((view) => view.slug === slug)?.count || 0;

  if (trackView) {
    incrementViews(slug);
  }

  return (
    <p>
      {count.toLocaleString()} views
    </p>
  );
}