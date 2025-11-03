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
  const content = (
    <>
      <div className={`${poppins.className}`} style={{ fontWeight: '500' }}>
        {title}
      </div>
      <div className={`${inter.className} text-xs md:text-sm text-gray-600 dark:text-gray-400`} style={{ fontWeight: '300' }}>
        {showLink ? (
          <div className="flex justify-between">
            <DateDisplay date={date} />
            <ViewCounter slug={slug} trackView={!showLink} count={viewCount} />
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <DateDisplay date={date} />
              <ViewCounter slug={slug} trackView={!showLink} count={viewCount} />
            </div>
            {updatedAt && updatedAt !== date && (
              <div className="mt-1 text-gray-500 inline-flex gap-1 italic">
                <span>Updated</span>
                <DateDisplay date={updatedAt} />
              </div>
            )}
          </>
        )}
      </div>
    </>
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