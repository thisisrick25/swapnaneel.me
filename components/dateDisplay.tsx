'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { formatDistanceToNowStrict, format } from 'date-fns';

interface DateDisplayProps {
  date: string | Date;
}

export default function DateDisplay({ date }: DateDisplayProps) {
  const [showFullDate, setShowFullDate] = useState(false);

  const targetDate = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(targetDate.getTime())) {
    return <span className="text-gray-400 dark:text-gray-500">—</span>;
  }

  const relativeDate = formatDistanceToNowStrict(targetDate, { addSuffix: true });
  const fullDate = format(targetDate, 'MMMM d, yyyy');

  return (
    <time
      dateTime={targetDate.toISOString()}
      className="relative cursor-pointer overflow-hidden whitespace-nowrap"
      onMouseEnter={() => setShowFullDate(true)}
      onMouseLeave={() => setShowFullDate(false)}
      title={fullDate}
    >
      <AnimatePresence mode="wait" initial={false}>
        {showFullDate ? (
          <motion.span
            key="full"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 900, damping: 50 }}
            className="block"
          >
            {fullDate}
          </motion.span>
        ) : (
          <motion.span
            key="relative"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 900, damping: 50 }}
            className="block"
          >
            {relativeDate}
          </motion.span>
        )}
      </AnimatePresence>
    </time>
  );
}