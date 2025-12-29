"use client"

import { useState, ReactNode } from 'react'
import { poppins, ibm_plex_mono } from '@/fonts'
import BorderBeam from './borderBeam'
import {
  LuSparkles, LuBrain, LuPackage, LuGlobe, LuCloud,
  LuDatabase, LuCode
} from 'react-icons/lu'
import {
  SiPytorch, SiTensorflow, SiScikitlearn, SiHuggingface, SiLangchain,
  SiFastapi, SiFlask, SiPandas, SiNumpy, SiSelenium,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiTailwindcss, SiHtml5,
  SiAmazonwebservices, SiDocker, SiKubernetes, SiVercel,
  SiPostgresql, SiMongodb, SiRedis, SiMysql, SiSupabase,
  SiPython, SiTypescript, SiJavascript, SiCplusplus
} from 'react-icons/si'

const skillCategories = [
  { key: 'all', label: 'All', icon: <LuSparkles className="w-3.5 h-3.5" /> },
  { key: 'ai_ml', label: 'AI/ML', icon: <LuBrain className="w-3.5 h-3.5" /> },
  { key: 'python_libs', label: 'Python', icon: <LuPackage className="w-3.5 h-3.5" /> },
  { key: 'web', label: 'Web', icon: <LuGlobe className="w-3.5 h-3.5" /> },
  { key: 'cloud', label: 'Cloud', icon: <LuCloud className="w-3.5 h-3.5" /> },
  { key: 'databases', label: 'Data', icon: <LuDatabase className="w-3.5 h-3.5" /> },
  { key: 'languages', label: 'Lang', icon: <LuCode className="w-3.5 h-3.5" /> },
]

type Category = typeof skillCategories[number]['key']

const skills: { name: string; categories: Category[]; icon: ReactNode }[] = [
  // AI/ML/DL
  { name: 'PyTorch', categories: ['ai_ml'], icon: <SiPytorch className="w-3.5 h-3.5 text-orange-500" /> },
  { name: 'TensorFlow', categories: ['ai_ml'], icon: <SiTensorflow className="w-3.5 h-3.5 text-orange-400" /> },
  { name: 'Scikit-learn', categories: ['ai_ml'], icon: <SiScikitlearn className="w-3.5 h-3.5 text-blue-500" /> },
  { name: 'Hugging Face', categories: ['ai_ml'], icon: <SiHuggingface className="w-3.5 h-3.5 text-yellow-500" /> },
  { name: 'LangChain', categories: ['ai_ml'], icon: <SiLangchain className="w-3.5 h-3.5 text-green-500" /> },

  // Python Libs
  { name: 'FastAPI', categories: ['python_libs'], icon: <SiFastapi className="w-3.5 h-3.5 text-teal-500" /> },
  { name: 'Flask', categories: ['python_libs'], icon: <SiFlask className="w-3.5 h-3.5" /> },
  { name: 'Pandas', categories: ['python_libs'], icon: <SiPandas className="w-3.5 h-3.5 text-blue-600" /> },
  { name: 'NumPy', categories: ['python_libs'], icon: <SiNumpy className="w-3.5 h-3.5 text-blue-400" /> },
  { name: 'Selenium', categories: ['python_libs'], icon: <SiSelenium className="w-3.5 h-3.5 text-green-600" /> },

  // Web
  { name: 'React', categories: ['web'], icon: <SiReact className="w-3.5 h-3.5 text-cyan-400" /> },
  { name: 'Next.js', categories: ['web'], icon: <SiNextdotjs className="w-3.5 h-3.5" /> },
  { name: 'Node.js', categories: ['web'], icon: <SiNodedotjs className="w-3.5 h-3.5 text-green-500" /> },
  { name: 'Express', categories: ['web'], icon: <SiExpress className="w-3.5 h-3.5" /> },
  { name: 'TailwindCSS', categories: ['web'], icon: <SiTailwindcss className="w-3.5 h-3.5 text-cyan-500" /> },
  { name: 'HTML/CSS', categories: ['web'], icon: <SiHtml5 className="w-3.5 h-3.5 text-orange-500" /> },

  // Cloud
  { name: 'AWS', categories: ['cloud'], icon: <SiAmazonwebservices className="w-3.5 h-3.5 text-orange-400" /> },
  { name: 'Docker', categories: ['web', 'cloud'], icon: <SiDocker className="w-3.5 h-3.5 text-blue-500" /> },
  { name: 'Kubernetes', categories: ['cloud'], icon: <SiKubernetes className="w-3.5 h-3.5 text-blue-600" /> },
  { name: 'Vercel', categories: ['cloud'], icon: <SiVercel className="w-3.5 h-3.5" /> },

  // Databases
  { name: 'PostgreSQL', categories: ['databases'], icon: <SiPostgresql className="w-3.5 h-3.5 text-blue-500" /> },
  { name: 'MongoDB', categories: ['databases'], icon: <SiMongodb className="w-3.5 h-3.5 text-green-500" /> },
  { name: 'Redis', categories: ['databases'], icon: <SiRedis className="w-3.5 h-3.5 text-red-500" /> },
  { name: 'MySQL', categories: ['databases'], icon: <SiMysql className="w-3.5 h-3.5 text-blue-600" /> },
  { name: 'Supabase', categories: ['databases'], icon: <SiSupabase className="w-3.5 h-3.5 text-emerald-500" /> },

  // Languages
  { name: 'Python', categories: ['languages'], icon: <SiPython className="w-3.5 h-3.5 text-yellow-500" /> },
  { name: 'TypeScript', categories: ['languages'], icon: <SiTypescript className="w-3.5 h-3.5 text-blue-500" /> },
  { name: 'JavaScript', categories: ['languages'], icon: <SiJavascript className="w-3.5 h-3.5 text-yellow-400" /> },
  { name: 'C/C++', categories: ['languages'], icon: <SiCplusplus className="w-3.5 h-3.5 text-blue-600" /> },
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.categories.includes(activeCategory))

  return (
    <section className="mb-12">
      <h2 className={`text-2xl font-bold tracking-tight mb-4 ${poppins.className}`}>Skills</h2>

      {/* Category Tabs with MeteorBeam effect on active */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skillCategories.map((category) => {
          const isActive = activeCategory === category.key

          if (isActive) {
            return (
              <BorderBeam key={category.key} active={true}>
                <button
                  onClick={() => setActiveCategory(category.key)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-white dark:text-gray-900"
                >
                  {category.icon}
                  {category.label}
                </button>
              </BorderBeam>
            )
          }

          return (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
            >
              {category.icon}
              {category.label}
            </button>
          )
        })}
      </div>

      {/* Skills Container */}
      <div className="p-5 border border-gray-200 dark:border-zinc-700 rounded-xl">
        <div className="flex flex-wrap gap-2">
          {filteredSkills.map((skill) => (
            <span
              key={skill.name}
              className={`inline-flex items-center gap-1.5 px-1.5 py-1 text-xs font-medium border border-gray-200 dark:border-zinc-700 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors ${ibm_plex_mono.className}`}
            >
              {skill.icon}
              {skill.name}
            </span>
          ))}
        </div>

        {/* Count footer */}
        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Showing {filteredSkills.length} {activeCategory === 'all' ? 'total skills' : `skills in ${skillCategories.find(c => c.key === activeCategory)?.label}`}
        </p>
      </div>
    </section>
  )
}
