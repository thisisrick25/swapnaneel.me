import { poppins } from "@/fonts"

export default function EducationSection() {
  const education = [
    {
      school: "Indian Institute of Technology Patna (IIT Patna)",
      degree: "M.Tech in Artificial Intelligence and Data Science Engineering",
      date: "Aug 2025 - Present",
      description: "Focusing on Advanced Machine Learning, Deep Learning, and AI Ethics.",
    },
    {
      school: "Kalinga Institute of Industrial Technology (KIIT)",
      degree: "B.Tech in Computer Science & Engineering",
      date: "2019 - Sep 2023",
      description: "Relevant coursework: Data Structures, Algorithms, Operating Systems, Database Management Systems.",
    }
  ]

  return (
    <section className="mb-12">
      <div className="section-header mb-6">
        <h2 className={poppins.className}>Education</h2>
      </div>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {edu.school}
              </h3>
              <span className="text-sm font-mono text-gray-500 dark:text-gray-400 shrink-0">
                {edu.date}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {edu.degree}
            </p>
            {edu.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
