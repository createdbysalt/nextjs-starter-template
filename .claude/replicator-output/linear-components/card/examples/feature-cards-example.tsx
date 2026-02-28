/**
 * ===============================================================================
 * EXAMPLE: Linear Feature Cards Page
 * DEMONSTRATES: How to use the replicated Linear card components
 * ===============================================================================
 *
 * This example shows:
 * 1. Using LinearFeatureGrid for the container
 * 2. LinearFeatureCard with full and half variants
 * 3. LinearFullWidthCardWrapper for full-width cards in grid
 * 4. Sample data structure
 *
 * To use in your project:
 * 1. Copy components from ./components/ to your _features folder
 * 2. Add tokens from extraction/tailwind-tokens.css to globals.css
 * 3. Import and use as shown below
 * ===============================================================================
 */

import {
  LinearFeatureCard,
  LinearFeatureGrid,
  LinearFullWidthCardWrapper,
  sampleFeatureCards,
} from "../components";

/**
 * FeaturesPage
 *
 * Example page layout matching Linear's /features page.
 */
export default function FeaturesPage() {
  return (
    // Page background - EXTRACTED: rgb(8, 9, 10)
    <div className="min-h-screen bg-[rgb(8,9,10)]">
      {/* Hero Section */}
      <header className="py-20 text-center">
        <h1 className="text-4xl font-medium tracking-tight text-[rgb(247,248,248)] lg:text-6xl">
          The system for modern
          <br />
          product development
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[rgb(138,143,152)]">
          Linear streamlines work across the entire development cycle, from
          roadmap to release.
        </p>
      </header>

      {/* Feature Cards Section */}
      <section className="pb-20">
        <LinearFeatureGrid>
          {/* Full-width cards (Planning, Building) */}
          {sampleFeatureCards
            .filter((card) => card.variant === "full")
            .map((card) => (
              <LinearFullWidthCardWrapper key={card.id}>
                <LinearFeatureCard
                  label={card.label}
                  description={card.description}
                  href={card.href}
                  variant="full"
                />
              </LinearFullWidthCardWrapper>
            ))}

          {/* Half-width cards (2 per row on desktop) */}
          {sampleFeatureCards
            .filter((card) => card.variant === "half")
            .map((card) => (
              <LinearFeatureCard
                key={card.id}
                label={card.label}
                description={card.description}
                href={card.href}
                variant="half"
              />
            ))}
        </LinearFeatureGrid>
      </section>

      {/* CTA Section */}
      <footer className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-[1024px] px-6 text-center">
          <h2 className="text-2xl font-medium text-[rgb(247,248,248)] lg:text-3xl">
            Plan the present. Build the future.
          </h2>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/contact"
              className="rounded-lg border border-white/20 px-4 py-2 text-[15px] font-medium text-[rgb(247,248,248)] transition-colors hover:border-white/40"
            >
              Contact sales
            </a>
            <a
              href="/signup"
              className="rounded-lg bg-[rgb(230,230,230)] px-4 py-2 text-[15px] font-medium text-[rgb(8,9,10)] transition-colors hover:bg-white"
            >
              Get started
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Alternative: Using base card components for custom layouts
 */
import {
  LinearCard,
  LinearCardHeader,
  LinearCardFooter,
  LinearCardLabel,
  LinearCardDescription,
  LinearCardArrow,
} from "../components";

export function CustomFeatureCard() {
  return (
    <LinearCard interactive href="/custom-feature" className="h-[400px]">
      {/* Custom header with illustration */}
      <LinearCardHeader>
        <div className="flex h-full items-center justify-center">
          {/* Your custom SVG or image here */}
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
        </div>
      </LinearCardHeader>

      {/* Footer with text and arrow */}
      <LinearCardFooter>
        <div>
          <LinearCardLabel>Custom Feature</LinearCardLabel>
          <LinearCardDescription>
            Build something amazing with these components
          </LinearCardDescription>
        </div>
        <LinearCardArrow />
      </LinearCardFooter>
    </LinearCard>
  );
}

/**
 * Example: Card with background image
 */
export function FeatureCardWithImage() {
  return (
    <LinearFeatureCard
      label="Insights"
      description="Instant analytics for any stream of work"
      href="/insights"
      variant="half"
      backgroundImage={
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/insights-chart.png"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(15,16,17)] via-transparent to-transparent" />
        </div>
      }
    />
  );
}
