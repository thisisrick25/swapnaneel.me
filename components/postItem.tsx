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
}

export default function PostItem({ title, date, viewCount, slug, showLink = true }: PostItemProps) {
  const content = (
    <>
      <div className={`${poppins.className}`} style={{ fontWeight: '500' }}>
        {title}
      </div>
      <div className={`${inter.className} flex justify-between text-sm text-gray-600 dark:text-gray-400`} style={{ fontWeight: '300' }}>
        <DateDisplay date={date} />
        <ViewCounter slug={slug} trackView={false} count={viewCount} />
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
    <div className="grid grid-cols-1 w-full my-4">
      {content}
    </div>
  );
}