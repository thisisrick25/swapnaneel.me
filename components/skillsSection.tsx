"use client"

import { useState } from 'react'
import { poppins } from '@/fonts'
import {
  Sparkles, Brain, Package, Globe, Cloud,
  Database, Code
} from 'lucide-react'

const skillCategories = [
  { key: 'all', label: 'All Skills', icon: Sparkles },
  { key: 'ai_ml', label: 'AI/ML/DL', icon: Brain },
  { key: 'python_libs', label: 'Python Libs', icon: Package },
  { key: 'web', label: 'Web', icon: Globe },
  { key: 'cloud', label: 'Cloud', icon: Cloud },
  { key: 'databases', label: 'Databases', icon: Database },
  { key: 'languages', label: 'Languages', icon: Code },
]

type Category = typeof skillCategories[number]['key']

const skills: { name: string; categories: Category[]; icon?: string }[] = [
  // AI/ML/DL
  { name: 'PyTorch', categories: ['ai_ml'], icon: '🔥' },
  { name: 'TensorFlow', categories: ['ai_ml'], icon: '🧠' },
  { name: 'Scikit-learn', categories: ['ai_ml'], icon: '📊' },
  { name: 'Hugging Face', categories: ['ai_ml'], icon: '🤗' },
  { name: 'LangChain', categories: ['ai_ml'], icon: '🔗' },

  // Python Libs
  { name: 'FastAPI', categories: ['python_libs'], icon: '⚡' },
  { name: 'Flask', categories: ['python_libs'], icon: '🌶️' },
  { name: 'Pandas', categories: ['python_libs'], icon: '🐼' },
  { name: 'NumPy', categories: ['python_libs'], icon: '🔢' },
  { name: 'Beautiful Soup', categories: ['python_libs'], icon: '🍜' },
  { name: 'Selenium', categories: ['python_libs'], icon: '🤖' },

  // Web
  { name: 'React', categories: ['web'], icon: '⚛️' },
  { name: 'Next.js', categories: ['web'], icon: '▲' },
  { name: 'Node.js', categories: ['web'], icon: '💚' },
  { name: 'Express', categories: ['web'], icon: '🚂' },
  { name: 'TailwindCSS', categories: ['web'], icon: '🎨' },
  { name: 'HTML/CSS', categories: ['web'], icon: '🌐' },

  // Cloud
  { name: 'AWS', categories: ['cloud'], icon: '☁️' },
  { name: 'Docker', categories: ['cloud'], icon: '🐳' },
  { name: 'Kubernetes', categories: ['cloud'], icon: '⚙️' },
  { name: 'Vercel', categories: ['cloud'], icon: '▲' },

  // Databases
  { name: 'PostgreSQL', categories: ['databases'], icon: '🐘' },
  { name: 'MongoDB', categories: ['databases'], icon: '🍃' },
  { name: 'Redis', categories: ['databases'], icon: '🔴' },
  { name: 'MySQL', categories: ['databases'], icon: '🐬' },
  { name: 'Supabase', categories: ['databases'], icon: '⚡' },

  // Languages
  { name: 'Python', categories: ['languages'], icon: '🐍' },
  { name: 'TypeScript', categories: ['languages'], icon: '💙' },
  { name: 'JavaScript', categories: ['languages'], icon: '💛' },
  { name: 'SQL', categories: ['languages'], icon: '📋' },
  { name: 'C/C++', categories: ['languages'], icon: '⚙️' },
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.categories.includes(activeCategory))

  // Get counts for each category
  const getCategoryCount = (categoryKey: Category) => {
    if (categoryKey === 'all') return skills.length
    return skills.filter(skill => skill.categories.includes(categoryKey)).length
  }

  return (
    <section className="mb-16">
      <h2 className={`text-2xl font-bold tracking-tight mb-4 ${poppins.className}`}>Skills</h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skillCategories.map((category) => {
          const Icon = category.icon
          const count = getCategoryCount(category.key)
          const isActive = activeCategory === category.key

          return (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${isActive
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800/50'
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{category.label}</span>
              <span className={`text-xs ${isActive ? 'opacity-70' : 'text-gray-400 dark:text-gray-500'}`}>
                {count}
              </span>
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 dark:border-zinc-700 rounded-full"
            >
              {skill.icon && <span className="text-xs">{skill.icon}</span>}
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
