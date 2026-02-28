import { Metadata } from 'next'
import { CathyHomePage } from '@/components/cathy-dolle'
import type { Project } from '@/components/cathy-dolle'

export const metadata: Metadata = {
  title: 'Cathy Dolle Inspiration | Playground Studios',
  description: 'Portfolio inspiration from cathydolle.com',
}

// Sample projects with placeholder images
const sampleProjects: Project[] = [
  {
    id: '1',
    number: '01',
    name: 'Brand Identity',
    slug: 'brand-identity',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop',
  },
  {
    id: '2',
    number: '02',
    name: 'Studio Session',
    slug: 'studio-session',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
  },
  {
    id: '3',
    number: '03',
    name: 'Product Launch',
    slug: 'product-launch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop',
  },
  {
    id: '4',
    number: '04',
    name: 'Editorial',
    slug: 'editorial',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
  },
  {
    id: '5',
    number: '05',
    name: 'Campaign',
    slug: 'campaign',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
  },
  {
    id: '6',
    number: '06',
    name: 'Digital Art',
    slug: 'digital-art',
    image: 'https://images.unsplash.com/photo-1633186710895-309db2eca9e4?w=600&h=800&fit=crop',
  },
  {
    id: '7',
    number: '07',
    name: 'Photography',
    slug: 'photography',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop',
  },
  {
    id: '8',
    number: '08',
    name: 'Motion',
    slug: 'motion',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop',
  },
  {
    id: '9',
    number: '09',
    name: 'Architecture',
    slug: 'architecture',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800&fit=crop',
  },
  {
    id: '10',
    number: '10',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
  },
  {
    id: '11',
    number: '11',
    name: 'Lifestyle',
    slug: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=600&h=800&fit=crop',
  },
  {
    id: '12',
    number: '12',
    name: 'Creative',
    slug: 'creative',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=800&fit=crop',
  },
]

export default function CathyDolleInspoPage() {
  return <CathyHomePage projects={sampleProjects} />
}
