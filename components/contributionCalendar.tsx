"use client"

import { useState } from 'react';
import Link from 'next/link';
import { GIT_USERNAME } from '@/lib/constants';
import { poppins } from '@/fonts';
import { LuExternalLink } from 'react-icons/lu';
import { SiGithub, SiGitlab } from 'react-icons/si';
import type { CalendarData } from '@/utils/getContributionCalendar';

type Source = 'github' | 'gitlab';

type Props = {
  github: CalendarData | null;
  gitlab: CalendarData | null;
};

// Map level to CSS class
function getLevelClass(level: number): string {
  return `contribution-level-${level}`;
}

// Get month labels from weeks data
function getMonthLabels(weeks: { days: { date: string }[] }[]): { month: string; colStart: number }[] {
  const months: { month: string; colStart: number }[] = [];
  let lastMonth = '';

  weeks.forEach((week, weekIndex) => {
    const firstDay = week.days[0];
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.toLocaleString('en-US', { month: 'short' });

      if (month !== lastMonth) {
        months.push({ month, colStart: weekIndex });
        lastMonth = month;
      }
    }
  });

  return months;
}

export default function ContributionCalendar({ github, gitlab }: Props) {
  const [source, setSource] = useState<Source>('github');

  // Select the current data based on toggle - instant, no loading!
  const data = source === 'github' ? github : gitlab;
  const monthLabels = data ? getMonthLabels(data.weeks) : [];

  // Don't render if no data at all
  if (!github && !gitlab) return null;

  return (
    <section className="mb-16">
      <div className="section-header">
        <h2 className={poppins.className}>Activity</h2>
        <div className="flex items-center gap-3">
          {/* Toggle Switch */}
          <div className="source-toggle">
            <button
              onClick={() => setSource('github')}
              className={`toggle-btn ${source === 'github' ? 'active' : ''}`}
              title="GitHub"
              aria-label="Show GitHub contributions"
              disabled={!github}
            >
              <SiGithub className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSource('gitlab')}
              className={`toggle-btn ${source === 'gitlab' ? 'active' : ''}`}
              title="GitLab"
              aria-label="Show GitLab contributions"
              disabled={!gitlab}
            >
              <SiGitlab className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Link */}
          {data && (
            <Link
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-1"
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
            <div className="contribution-calendar">
              {/* Month labels row */}
              <div className="contribution-months">
                {monthLabels.map(({ month, colStart }) => (
                  <span
                    key={`${month}-${colStart}`}
                    className="contribution-month-label"
                    style={{ gridColumnStart: colStart + 1 }}
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
                        title={`${day.count} contribution${day.count !== 1 ? 's' : ''} on ${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Total contributions */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {data.totalContributions.toLocaleString()} contributions in the last year
          </p>
        </>
      )}
    </section>
  );
}
