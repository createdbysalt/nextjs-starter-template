import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Design Inspiration | Playground Studios',
  description: 'Portfolio design inspiration and references',
}

const inspirations = [
  {
    name: 'Cathy Dolle',
    url: '/inspo/cathy-dolle',
    original: 'https://www.cathydolle.com/',
    description: 'Split layout with center image stack, custom cursor, Lenis smooth scroll',
    features: ['Image Stack', 'Custom Cursor', 'Split Layout', 'About Overlay'],
  },
  {
    name: 'Etienne Studio',
    url: '/inspo/etienne-studio',
    original: 'https://www.etienne.studio/',
    description: '3D rotating carousel with CSS transforms, live clock, minimal typography',
    features: ['3D Carousel', 'Live Clock', 'CSS 3D Transforms', 'Auto-rotate'],
  },
]

export default function InspoIndexPage() {
  return (
    <main className="min-h-screen bg-white text-black p-8 md:p-16">
      <h1 className="text-2xl font-semibold mb-2">Design Inspiration</h1>
      <p className="text-neutral-500 mb-12">
        Replicated portfolio designs for reference and learning
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {inspirations.map((inspo) => (
          <Link
            key={inspo.name}
            href={inspo.url}
            className="group block border border-neutral-200 rounded-lg p-6 hover:border-black transition-colors"
          >
            <h2 className="text-lg font-medium mb-1 group-hover:underline">
              {inspo.name}
            </h2>
            <p className="text-sm text-neutral-500 mb-4">{inspo.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {inspo.features.map((feature) => (
                <span
                  key={feature}
                  className="text-xs bg-neutral-100 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>

            <p className="text-xs text-neutral-400">
              Original:{' '}
              <span className="text-neutral-600">{inspo.original}</span>
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-neutral-200">
        <p className="text-sm text-neutral-500">
          These are recreations for learning purposes. Visit the original sites
          to see the full experience.
        </p>
      </div>
    </main>
  )
}
