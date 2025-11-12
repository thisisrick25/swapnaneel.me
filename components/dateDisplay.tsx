'use client';

import { useState } from 'react';
import { inter } from '@/fonts';

interface DateDisplayProps {
  date: string | Date;
}

export default function DateDisplay({ date }: DateDisplayProps) {
  const [showFullDate, setShowFullDate] = useState(false);

  const targetDate = new Date(date);
  const now = new Date();
  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  let relativeDate = '';
  if (diffInDays === 0) {
    relativeDate = 'Today';
  } else if (diffInDays === 1) {
    relativeDate = '1 day ago';
  } else if (diffInDays < 7) {
    relativeDate = `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    relativeDate = `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    relativeDate = `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    relativeDate = `${years} year${years > 1 ? 's' : ''} ago`;
  }

  const fullDate = targetDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <span
      className={`${inter.className} relative cursor-pointer overflow-hidden`}
      onMouseEnter={() => setShowFullDate(true)}
      onMouseLeave={() => setShowFullDate(false)}
      title={fullDate}
      style={{ fontWeight: '300', minWidth: '180px' }}
    >
      <span
        className={`absolute left-0 transition-transform duration-300 ease-in-out ${showFullDate ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
      >
        {relativeDate}
      </span>
      <span
        className={`absolute left-0 transition-transform duration-300 ease-in-out ${showFullDate ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
      >
        {fullDate}
      </span>
    </span>
  );
}