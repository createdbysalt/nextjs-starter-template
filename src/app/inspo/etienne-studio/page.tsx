import { Metadata } from 'next'
import { EtienneHomePage } from '@/components/etienne-studio'
import type { CarouselProject } from '@/components/etienne-studio'

export const metadata: Metadata = {
  title: 'Etienne Studio Inspiration | Playground Studios',
  description: 'Portfolio inspiration from etienne.studio',
}

// Sample projects with placeholder images
const sampleProjects: CarouselProject[] = [
  {
    id: '1',
    name: 'Studio Pomelo',
    slug: 'studio-pomelo',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
  },
  {
    id: '2',
    name: 'Brand Campaign',
    slug: 'brand-campaign',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop',
  },
  {
    id: '3',
    name: 'Digital Experience',
    slug: 'digital-experience',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop',
  },
  {
    id: '4',
    name: 'Visual Identity',
    slug: 'visual-identity',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop',
  },
  {
    id: '5',
    name: 'Art Direction',
    slug: 'art-direction',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
  },
]

export default function EtienneStudioInspoPage() {
  return <EtienneHomePage projects={sampleProjects} />
}
