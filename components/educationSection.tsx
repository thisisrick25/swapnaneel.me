"use client"

import { poppins } from "@/fonts"
import ShinyCard from "./shinyCard"
import { GraduationCap, Calendar } from "lucide-react"

export default function EducationSection() {
  const education = [
    {
      school: "University Name",
      degree: "Bachelor of Technology in Computer Science",
      date: "2021 - 2025",
      description: "Relevant coursework: Data Structures, Algorithms, Operating Systems, Database Management Systems.",
    },
    // Add more education items here
  ]

  return (
    <section className="mb-16">
      <div className="section-header mb-6">
        <h2 className={poppins.className}>Education</h2>
      </div>

      <div className="grid gap-4">
        {education.map((edu, index) => (
          <ShinyCard
            key={index}
            containerClassName="rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 transition-all"
            className="p-6 bg-gray-50/50 dark:bg-zinc-800/50 rounded-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg border border-gray-100 dark:border-zinc-800 shrink-0">
                  <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                    {edu.school}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    {edu.degree}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 sm:text-right pl-13 sm:pl-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{edu.date}</span>
              </div>
            </div>

            {edu.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 pl-13 mt-2">
                {edu.description}
              </p>
            )}
          </ShinyCard>
        ))}
      </div>
    </section>
  )
}
