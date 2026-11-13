import {
  HeroSkeleton,
  NewsSkeleton,
  ProjectSkeleton,
  EducationSkeleton,
  PublicationSkeleton,
  WritingSkeleton,
  ContributionSkeleton,
  ContributionGraphSkeleton,
  SkillsSkeleton,
} from '@/components/skeletons'

export default function Loading() {
  return (
    <div className="py-16 sm:py-24" aria-busy="true" aria-label="Loading page">
      {/* Static sections — render directly */}
      <HeroSkeleton />
      <NewsSkeleton />

      {/* Async sections — Suspense boundaries for independent streaming */}
      <ProjectSkeleton />

      <EducationSkeleton />
      <PublicationSkeleton />

      <WritingSkeleton />
      <ContributionSkeleton />
      <ContributionGraphSkeleton />

      <SkillsSkeleton />
    </div>
  )
}
