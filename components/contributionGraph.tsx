"use client"

import { useState } from 'react';
import Link from 'next/link';
import { GIT_USERNAME } from '@/lib/constants';
import { poppins } from '@/fonts';
import { LuExternalLink } from 'react-icons/lu';
import { SiGithub, SiGitlab } from 'react-icons/si';
import type { CalendarData } from '@/utils/getContributionCalendar';
import CalendarToolTip, { useCalendarTooltip } from '@/components/calendarToolTip';

type Source = 'github' | 'gitlab';

type Props = {
  github: CalendarData | null;
  gitlab: CalendarData | null;
};

// Map level to CSS class
function getLevelClass(level: number): string {
  return `contribution-level-${level}`;
}

// Get month labels from weeks data - skip months with less than 3 weeks to prevent overlap
function getMonthLabels(weeks: { days: { date: string }[] }[]): { month: string; colStart: number }[] {
  const rawMonths: { month: string; colStart: number }[] = [];
  let lastMonth = '';

  weeks.forEach((week, weekIndex) => {
    const firstDay = week.days[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.toLocaleString('en-US', { month: 'short' });

      if (month !== lastMonth) {
        rawMonths.push({ month, colStart: weekIndex });
        lastMonth = month;
      }
    }
  });

  // Filter out months that are too close to the next one (less than 3 columns apart)
  return rawMonths.filter((m, i) => {
    if (i === rawMonths.length - 1) return true; // Always show last month
    const nextMonth = rawMonths[i + 1];
    return nextMonth.colStart - m.colStart >= 3;
  });
}

export default function ContributionGraph({ github, gitlab }: Props) {
  const [source, setSource] = useState<Source>('github');
  const { tooltip, onMouseEnter, onMouseLeave } = useCalendarTooltip();

  // Select the current data based on toggle - instant, no loading!
  const data = source === 'github' ? github : gitlab;
  const monthLabels = data ? getMonthLabels(data.weeks) : [];

  // Don't render if no data at all
  if (!github && !gitlab) return null;

  return (
    <section className="mb-12 relative">
      {/* Tooltip Portal - Fixed Position to escape overflow clipping */}
      {tooltip && <CalendarToolTip x={tooltip.x} y={tooltip.y} content={tooltip.content} />}

      <div className="section-header">
        <h2 className={poppins.className}>Activity</h2>
        <div className="flex items-center gap-3">
          {/* Toggle Switch */}
          <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-gray-500/5 inline-flex items-center gap-0.5 p-0.5">
            <button
              onClick={() => setSource('github')}
              className={`toggle-btn ${source === 'github' ? 'active' : ''}`}
              title="GitHub"
              aria-label="Show GitHub contributions"
              disabled={!github}
            >
              <SiGithub className={`w-4 h-4 transition-colors ${source === 'github'
                ? 'text-zinc-900 dark:text-white'
                : 'text-gray-400 dark:text-gray-500 hover:text-zinc-600 dark:hover:text-gray-300'
                }`} />
            </button>
            <button
              onClick={() => setSource('gitlab')}
              className={`toggle-btn ${source === 'gitlab' ? 'active' : ''}`}
              title="GitLab"
              aria-label="Show GitLab contributions"
              disabled={!gitlab}
            >
              <SiGitlab className={`w-4 h-4 transition-colors ${source === 'gitlab'
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-gray-400 dark:text-gray-500 hover:text-orange-400 dark:hover:text-orange-300'
                }`} />
            </button>
          </div>

          {/* Profile Link */}
          {data && (
            <Link
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm hover:opacity-80 transition-colors inline-flex items-center gap-1 ${source === 'github'
                ? 'text-gray-600 dark:text-gray-400'
                : 'text-orange-600 dark:text-orange-400'
                }`}
            >
              @{GIT_USERNAME}
              <LuExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* No data for selected source */}
      {!data && (
        <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
          No {source === 'github' ? 'GitHub' : 'GitLab'} contribution data available
        </p>
      )}

      {/* Calendar - switches instantly! */}
      {data && (
        <>
          <div className="contribution-calendar-wrapper">
            <div className={`contribution-calendar ${source}`}>
              {/* Month labels row */}
              <div className="contribution-months">
                {monthLabels.map(({ month, colStart }) => (
                  <span
                    key={`${month}-${colStart}`}
                    className="contribution-month-label"
                    style={{
                      gridColumnStart: colStart + 1,
                      gridColumnEnd: 'span 3'
                    }}
                  >
                    {month}
                  </span>
                ))}
              </div>

              {/* Grid of contribution squares */}
              <div className="contribution-grid">
                {data.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="contribution-week">
                    {week.days.map((day) => (
                      <div
                        key={day.date}
                        className={`contribution-square ${getLevelClass(day.level)}`}
                        onMouseEnter={(e) => onMouseEnter(e, day.count, day.date)}
                        onMouseLeave={onMouseLeave}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Total contributions and legend */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {data.totalContributions.toLocaleString()} contributions in the last year on{' '}
              <Link href={data.profileUrl} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">
                {source === 'github' ? 'GitHub' : 'GitLab'}
              </Link>
            </p>

            {/* Less to More legend */}
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <span>Less</span>
              <div className={`contribution-calendar ${source}`}>
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div key={level} className={`contribution-square contribution-level-${level}`} />
                  ))}
                </div>
              </div>
              <span>More</span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
