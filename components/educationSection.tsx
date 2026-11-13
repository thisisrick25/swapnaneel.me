import { space_grotesk } from "@/fonts"
import education from "@/data/education.json"

export default function EducationSection() {

  return (
    <section className="mb-12">
      <div className="section-header mb-6">
        <h2 className={space_grotesk.className}>Education</h2>
      </div>

      <div className="space-y-3">
        {education.map((edu, index) => (
          <div key={index}>
            <span className="font-semibold text-gray-900 dark:text-gray-100 block">
              {edu.school}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm block mt-0.5">
              {edu.degree}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
