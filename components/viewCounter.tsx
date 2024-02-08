import { increment } from 'db/actions';
import { getViewsCount } from 'db/queries';
import { cache } from 'react';

function View({ slug, allViews }: {
  slug: string;
  allViews: {
    slug: string;
    count: number;
  }[];
  trackView?: boolean;
}) {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug);
  const number = new Number(viewsForSlug?.count || 0);

  return (
    <p>
      {`${number.toLocaleString()} views`}
    </p>
  );
}

let incrementViews = cache(increment);

export default async function ViewCounter({ slug }: { slug: string }) {
  let views = await getViewsCount();
  incrementViews(slug);
  return <View allViews={views} slug={slug} />;
}