/**
 * LinearButton Demo
 * Shows all variants and sizes extracted from Linear
 */

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { LinearButton } from "./linear-button";

export function LinearButtonDemo() {
  return (
    <div className="min-h-screen bg-[rgb(8,8,8)] p-12">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-white">
            LinearButton Component
          </h1>
          <p className="text-[rgb(138,143,152)]">
            Pixel-perfect replica of Linear&apos;s button styles
          </p>
        </div>

        {/* Primary (Invert) Variant */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium text-white">
            Primary (Invert) - Light buttons for dark backgrounds
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <LinearButton variant="invert" size="default">
              Start building
            </LinearButton>
            <LinearButton variant="invert" size="default">
              Get started
            </LinearButton>
            <LinearButton variant="invert" size="default">
              Sign up
              <ArrowRight className="size-4" />
            </LinearButton>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <LinearButton variant="invert" size="small">
              Sign up
            </LinearButton>
            <LinearButton variant="invert" size="small">
              Small CTA
            </LinearButton>
          </div>
        </section>

        {/* Secondary Variant */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium text-white">
            Secondary - Dark buttons
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <LinearButton variant="secondary" size="default">
              Contact sales
            </LinearButton>
            <LinearButton variant="secondary" size="default">
              Learn more
            </LinearButton>
            <LinearButton variant="secondary" size="default">
              View details
              <ChevronRight className="size-4" />
            </LinearButton>
          </div>
        </section>

        {/* Ghost Variant */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium text-white">
            Ghost - Navigation links
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <LinearButton variant="ghost" size="small">
              Product
            </LinearButton>
            <LinearButton variant="ghost" size="small">
              Resources
            </LinearButton>
            <LinearButton variant="ghost" size="small">
              Pricing
            </LinearButton>
            <LinearButton variant="ghost" size="small">
              Customers
            </LinearButton>
            <LinearButton variant="ghost" size="small">
              Now
            </LinearButton>
            <LinearButton variant="ghost" size="small">
              Contact
            </LinearButton>
            <div className="mx-2 h-4 w-px bg-[rgb(62,62,68)]" />
            <LinearButton variant="ghost" size="small">
              Log in
            </LinearButton>
          </div>
        </section>

        {/* Link Variant */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium text-white">
            Link - Underline on hover
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <LinearButton variant="link" size="small">
              Learn more
            </LinearButton>
            <LinearButton variant="link" size="default">
              View documentation
            </LinearButton>
          </div>
        </section>

        {/* As Link (asChild) */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium text-white">
            Using asChild with Next.js Link
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <LinearButton asChild variant="invert" size="default">
              <Link href="/signup">Sign up</Link>
            </LinearButton>
            <LinearButton asChild variant="secondary" size="default">
              <Link href="/contact">Contact sales</Link>
            </LinearButton>
            <LinearButton asChild variant="ghost" size="small">
              <Link href="/features">Features</Link>
            </LinearButton>
          </div>
        </section>

        {/* Loading State */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium text-white">Loading State</h2>
          <div className="flex flex-wrap items-center gap-4">
            <LinearButton loading variant="invert" size="default">
              Processing...
            </LinearButton>
            <LinearButton loading variant="secondary" size="default">
              Submitting...
            </LinearButton>
          </div>
        </section>

        {/* Disabled State */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium text-white">Disabled State</h2>
          <div className="flex flex-wrap items-center gap-4">
            <LinearButton disabled variant="invert" size="default">
              Disabled
            </LinearButton>
            <LinearButton disabled variant="secondary" size="default">
              Disabled
            </LinearButton>
            <LinearButton disabled variant="ghost" size="small">
              Disabled
            </LinearButton>
          </div>
        </section>

        {/* Full Example - Hero CTA Section */}
        <section className="space-y-6 rounded-2xl border border-[rgb(62,62,68)] bg-[rgb(18,18,20)] p-8">
          <h2 className="text-xl font-medium text-white">
            Example: Hero CTA Section (like Linear homepage)
          </h2>
          <div className="space-y-6">
            <h3 className="max-w-2xl text-4xl font-medium leading-tight text-white">
              Linear is a purpose-built tool for planning and building products
            </h3>
            <p className="max-w-xl text-[rgb(138,143,152)]">
              Meet the system for modern software development. Streamline
              issues, projects, and product roadmaps.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <LinearButton variant="invert" size="default">
                Start building
              </LinearButton>
              <LinearButton variant="link" size="default">
                New: Linear Reviews (Beta)
                <ChevronRight className="size-4" />
              </LinearButton>
            </div>
          </div>
        </section>

        {/* Token Reference */}
        <section className="space-y-4 text-sm text-[rgb(138,143,152)]">
          <h2 className="text-lg font-medium text-white">Extracted Tokens</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-[rgb(62,62,68)] bg-[rgb(18,18,20)] p-4">
              <h3 className="mb-2 font-medium text-white">Colors</h3>
              <ul className="space-y-1">
                <li>
                  Invert BG: <code>rgb(230, 230, 230)</code>
                </li>
                <li>
                  Invert FG: <code>rgb(8, 9, 10)</code>
                </li>
                <li>
                  Secondary BG: <code>rgb(40, 40, 44)</code>
                </li>
                <li>
                  Secondary FG: <code>rgb(247, 248, 248)</code>
                </li>
                <li>
                  Ghost FG: <code>rgb(138, 143, 152)</code>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-[rgb(62,62,68)] bg-[rgb(18,18,20)] p-4">
              <h3 className="mb-2 font-medium text-white">Sizes</h3>
              <ul className="space-y-1">
                <li>
                  Small: <code>h-8 text-[13px] px-3 rounded-lg</code>
                </li>
                <li>
                  Default: <code>h-10 text-[15px] px-4 rounded-[10px]</code>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-[rgb(62,62,68)] bg-[rgb(18,18,20)] p-4">
              <h3 className="mb-2 font-medium text-white">Animation</h3>
              <ul className="space-y-1">
                <li>
                  Easing: <code>cubic-bezier(0.25, 0.46, 0.45, 0.94)</code>
                </li>
                <li>
                  Duration: <code>160ms</code> (ghost: <code>100ms</code>)
                </li>
                <li>
                  Active: <code>scale(0.98)</code>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-[rgb(62,62,68)] bg-[rgb(18,18,20)] p-4">
              <h3 className="mb-2 font-medium text-white">Typography</h3>
              <ul className="space-y-1">
                <li>
                  Font: <code>Inter Variable</code>
                </li>
                <li>
                  Weight: <code>510</code> (mapped to font-medium)
                </li>
                <li>
                  Line-height: matches height
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LinearButtonDemo;
