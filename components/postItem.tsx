import Link from 'next/link';
import DateDisplay from '@/components/dateDisplay';
import ViewCounter from '@/components/viewCounter';

interface PostItemProps {
  title: string;
  date: string | Date;
  viewCount?: number;
  slug: string;
  showLink?: boolean;
  updatedAt?: string | Date;
  summary?: string;
}

export default function PostItem({ title, date, viewCount, slug, showLink = true, updatedAt, summary }: PostItemProps) {
  const content = (
    <div className="list-item group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          {summary && (
            <p className="small-text mt-1 line-clamp-1">
              {summary}
            </p>
          )}
        </div>
        <span className="small-text shrink-0">
          <DateDisplay date={date} />
        </span>
      </div>

      {!showLink && updatedAt && updatedAt !== date && (
        <div className="mt-2 text-xs text-gray-400">
          Updated <DateDisplay date={updatedAt} />
        </div>
      )}

      {showLink && viewCount !== undefined && viewCount > 0 && (
        <div className="mt-1">
          <ViewCounter slug={slug} trackView={false} count={viewCount} />
        </div>
      )}
    </div>
  );

  if (showLink) {
    return (
      <Link href={`/posts/${slug}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
}