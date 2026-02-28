'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface Project {
  id: string
  number: string
  name: string
  slug: string
  image: string
}

interface ProjectListProps {
  projects: Project[]
  onHover: (project: Project | null) => void
  activeProject: Project | null
  className?: string
}

export function ProjectList({
  projects,
  onHover,
  activeProject,
  className,
}: ProjectListProps) {
  // Split projects into left (1-6) and right (7-12) columns
  const leftProjects = projects.slice(0, 6)
  const rightProjects = projects.slice(6, 12)

  return (
    <div
      className={cn(
        'hidden md:block',
        className
      )}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {/* Left Column */}
      <div
        style={{
          position: 'absolute',
          left: '8.8%',
          top: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '24px', listStyle: 'none', margin: 0, padding: 0 }}>
          {leftProjects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onHover={onHover}
              isActive={activeProject?.id === project.id}
              align="left"
            />
          ))}
        </ul>
      </div>

      {/* Right Column */}
      <div
        style={{
          position: 'absolute',
          right: '8.8%',
          top: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '24px', listStyle: 'none', margin: 0, padding: 0, textAlign: 'right' }}>
          {rightProjects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onHover={onHover}
              isActive={activeProject?.id === project.id}
              align="right"
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

interface ProjectItemProps {
  project: Project
  onHover: (project: Project | null) => void
  isActive: boolean
  align: 'left' | 'right'
}

function ProjectItem({ project, onHover, isActive, align }: ProjectItemProps) {
  return (
    <motion.li
      style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
    >
      <Link
        href={`/project/${project.slug}`}
        className={cn(
          'flex items-center gap-8 text-[11px] font-medium uppercase transition-opacity duration-300',
          align === 'right' && 'flex-row-reverse',
          isActive ? 'text-black' : 'text-neutral-400 hover:text-black'
        )}
      >
        <span className="w-8">{project.number}/</span>
        <motion.span
          animate={{
            x: isActive ? (align === 'left' ? 4 : -4) : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {project.name}
        </motion.span>
      </Link>
    </motion.li>
  )
}

// Default project data matching the original site
export const defaultProjects: Project[] = [
  { id: '1', number: '01', name: 'ARD', slug: 'ard', image: '/projects/ard.jpg' },
  { id: '2', number: '02', name: 'Pierre Cathala', slug: 'pierre-cathala', image: '/projects/pierre-cathala.jpg' },
  { id: '3', number: '03', name: 'Jean Khamkwan', slug: 'jean-khamkwan', image: '/projects/jean-khamkwan.jpg' },
  { id: '4', number: '04', name: 'Yeng', slug: 'yeng', image: '/projects/yeng.jpg' },
  { id: '5', number: '05', name: 'Prada Beauty', slug: 'prada-beauty', image: '/projects/prada-beauty.jpg' },
  { id: '6', number: '06', name: 'KLSR', slug: 'klsr', image: '/projects/klsr.jpg' },
  { id: '7', number: '07', name: 'Michael Bardou', slug: 'michael-bardou', image: '/projects/michael-bardou.jpg' },
  { id: '8', number: '08', name: 'Zhong Lin', slug: 'zhong-lin', image: '/projects/zhong-lin.jpg' },
  { id: '9', number: '09', name: 'Aishy', slug: 'aishy', image: '/projects/aishy.jpg' },
  { id: '10', number: '10', name: 'Folio Template', slug: 'folio-template', image: '/projects/folio-template.jpg' },
  { id: '11', number: '11', name: 'Elie Leber', slug: 'elie-leber', image: '/projects/elie-leber.jpg' },
  { id: '12', number: '12', name: 'Rue Saint Abel', slug: 'rue-saint-abel', image: '/projects/rue-saint-abel.jpg' },
]
