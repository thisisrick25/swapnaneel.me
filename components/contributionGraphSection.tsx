import { getBothCalendars } from '@/utils/getContributionCalendar'
import ContributionGraph from './contributionGraph'

export default async function ContributionGraphSection() {
  const calendars = await getBothCalendars()

  return <ContributionGraph github={calendars.github} gitlab={calendars.gitlab} />
}
