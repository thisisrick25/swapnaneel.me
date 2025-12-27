import { unstable_cache } from 'next/cache';
import { GIT_USERNAME, REVALIDATE_SECONDS } from '@/lib/constants';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;

// Types for normalized calendar data
export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type CalendarData = {
  source: 'github' | 'gitlab';
  totalContributions: number;
  weeks: ContributionWeek[];
  profileUrl: string;
};

// GitHub GraphQL query
const GITHUB_QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`;

// Map GitHub contribution levels to numeric values
function mapGitHubLevel(level: string): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case 'FIRST_QUARTILE': return 1;
    case 'SECOND_QUARTILE': return 2;
    case 'THIRD_QUARTILE': return 3;
    case 'FOURTH_QUARTILE': return 4;
    default: return 0;
  }
}

// Map count to level (for GitLab)
function countToLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

async function fetchGitHubCalendar(): Promise<CalendarData | null> {
  if (!GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN not set');
    return null;
  }

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: GITHUB_QUERY,
        variables: { username: GIT_USERNAME },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    const json = await res.json();
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) return null;

    const weeks: ContributionWeek[] = calendar.weeks.map((week: any) => ({
      days: week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        level: mapGitHubLevel(day.contributionLevel),
      })),
    }));

    return {
      source: 'github',
      totalContributions: calendar.totalContributions,
      weeks,
      profileUrl: `https://github.com/${GIT_USERNAME}`,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub calendar:', error);
    return null;
  }
}

async function fetchGitLabCalendar(): Promise<CalendarData | null> {
  try {
    const headers: HeadersInit = {};
    if (GITLAB_TOKEN) {
      headers['PRIVATE-TOKEN'] = GITLAB_TOKEN;
    }

    const res = await fetch(`https://gitlab.com/users/${GIT_USERNAME}/calendar.json`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.warn('GitLab calendar fetch failed:', res.status);
      return null;
    }

    const data: Record<string, number> = await res.json();
    const dates = Object.keys(data).sort();
    if (dates.length === 0) return null;

    const totalContributions = Object.values(data).reduce((sum, count) => sum + count, 0);

    const startDate = new Date(dates[0] + 'T00:00:00');
    // Use today as end date - use local midnight
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const todayDate = new Date(todayStr + 'T00:00:00');

    const firstSunday = new Date(startDate);
    firstSunday.setDate(startDate.getDate() - startDate.getDay());

    const weeks: ContributionWeek[] = [];
    let currentDate = new Date(firstSunday);

    while (currentDate <= todayDate) {
      const week: ContributionDay[] = [];

      for (let i = 0; i < 7 && currentDate <= todayDate; i++) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        const count = data[dateStr] || 0;

        week.push({
          date: dateStr,
          count,
          level: countToLevel(count),
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (week.length > 0) {
        weeks.push({ days: week });
      }
    }

    return {
      source: 'gitlab',
      totalContributions,
      weeks,
      profileUrl: `https://gitlab.com/${GIT_USERNAME}`,
    };
  } catch (error) {
    console.error('Failed to fetch GitLab calendar:', error);
    return null;
  }
}

// Fetch both calendars in parallel (cached)
export const getBothCalendars = unstable_cache(
  async (): Promise<{ github: CalendarData | null; gitlab: CalendarData | null }> => {
    const [github, gitlab] = await Promise.all([
      fetchGitHubCalendar(),
      fetchGitLabCalendar(),
    ]);

    return { github, gitlab };
  },
  ['calendars'],
  { revalidate: REVALIDATE_SECONDS }
);
