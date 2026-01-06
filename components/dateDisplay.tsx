'use client';

import { useState } from 'react';
import { formatDistanceToNowStrict, format } from 'date-fns';

interface DateDisplayProps {
  date: string | Date;
  /** Minimum width for the date display */
  width?: string;
}

export default function DateDisplay({
  date,
  width = '100px',
}: DateDisplayProps) {
  const [showFullDate, setShowFullDate] = useState(false);

  const targetDate = typeof date === 'string' ? new Date(date) : date;

  // Handle invalid dates
  if (isNaN(targetDate.getTime())) {
    return <span className="text-gray-400 dark:text-gray-500">—</span>;
  }

  // Use date-fns for accurate relative time
  const relativeDate = formatDistanceToNowStrict(targetDate, { addSuffix: true });

  const fullDate = format(targetDate, 'MMMM d, yyyy');

  return (
    <time
      dateTime={targetDate.toISOString()}
      className="relative cursor-pointer overflow-hidden whitespace-nowrap"
      onMouseEnter={() => setShowFullDate(true)}
      onMouseLeave={() => setShowFullDate(false)}
      title={fullDate}
      style={{ fontWeight: '300', minWidth: width, willChange: 'transform, opacity' }}
    >
      <span
        className={`absolute left-0 transition-all duration-300 ease-in-out motion-reduce:transition-none ${showFullDate
          ? '-translate-y-full opacity-0 blur-[2px] scale-95'
          : 'translate-y-0 opacity-100 blur-0 scale-100'
          }`}
      >
        {relativeDate}
      </span>
      <span
        className={`absolute left-0 transition-all duration-300 ease-in-out motion-reduce:transition-none ${showFullDate
          ? 'translate-y-0 opacity-100 blur-0 scale-100'
          : 'translate-y-full opacity-0 blur-[2px] scale-95'
          }`}
      >
        {fullDate}
      </span>
      {/* Invisible placeholder to maintain width */}
      <span className="invisible">{fullDate}</span>
    </time>
  );
}