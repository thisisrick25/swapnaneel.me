import Link from 'next/link';
import DateDisplay from '@/components/dateDisplay';
import ViewCounter from '@/components/viewCounter';
import { poppins, inter } from '@/fonts';

interface PostItemProps {
  title: string;
  date: string | Date;
  viewCount?: number;
  slug: string;
  showLink?: boolean;
  updatedAt?: string | Date;
}

export default function PostItem({ title, date, viewCount, slug, showLink = true, updatedAt }: PostItemProps) {
  const dateAndViews = (
    <div className="flex justify-between">
      <DateDisplay date={date} />
      <ViewCounter slug={slug} trackView={!showLink} count={viewCount} />
    </div>
  );

  const content = (
    <div className="bg-neutral-100/60 dark:bg-neutral-900/60 p-3 rounded-lg shadow-xs">
      <div className={`${poppins.className} mb-2`} style={{ fontWeight: '500' }}>
        {title}
      </div>
      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
        {showLink ? (
          dateAndViews
        ) : (
          <>
            {dateAndViews}
            {updatedAt && updatedAt !== date && (
              <div className="mt-1 text-gray-500 italic">
                <span className={`${inter.className} inline-flex gap-1`} style={{ fontWeight: '300' }}>Updated <DateDisplay date={updatedAt} /></span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link
        href={`/posts/${slug}`}
        className="grid grid-cols-1 w-full my-4"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="grid grid-cols-1 w-full mb-4">
      {content}
    </div>
  );
}