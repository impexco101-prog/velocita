'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo */}
            <div className="flex items-center">
              <span className="text-gold-cta mr-2">↑</span>
              <span className="text-xl font-playfair font-bold text-gold-cta">
                Velocita
              </span>
            </div>

            {/* Right: Links and CTA */}
            <div className="flex items-center space-x-8">
              <Link href="#how-it-works" className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors">
                How it works
              </Link>
              <Link href="#tutors" className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors">
                Tutors
              </Link>
              <Link href="#pricing" className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors">
                Pricing
              </Link>
              <Link 
                href="/diagnostic" 
                className="bg-gold-cta hover:bg-yellow-500 text-background font-bold py-2 px-4 rounded-[6px] transition-colors"
              >
                Start Free Diagnostic
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-[680px]">
            {/* Small label */}
            <p className="text-xs uppercase tracking-wider text-gold-cta mb-6">
              MELBOURNE'S #1 VCE PLATFORM
            </p>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-text-primary leading-tight mb-6 tracking-tight">
              Your Child's ATAR.<br />
              Guaranteed.
            </h1>

            {/* Subheadline */}
            <p className="text-lg font-dm-sans text-[#8B9DC3] mb-12 max-w-[580px] leading-relaxed">
              AI-powered learning meets verified expert tutors. 
              Melbourne's most trusted VCE acceleration platform.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link 
                href="/diagnostic" 
                className="inline-flex items-center justify-center bg-gold-cta hover:bg-yellow-500 text-background font-bold py-4 px-8 rounded-[6px] transition-colors text-lg"
              >
                Take Free Diagnostic →
              </Link>
              <button className="inline-flex items-center justify-center bg-transparent border border-white text-white font-bold py-4 px-8 rounded-[6px] hover:bg-white hover:text-background transition-colors text-lg">
                Browse Verified Tutors
              </button>
            </div>

            {/* Trust strip */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-2xl font-bold text-gold-cta mr-2">2,200+</span>
                <span className="text-sm text-[#8B9DC3]">Students</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-2xl font-bold text-gold-cta mr-2">94%</span>
                <span className="text-sm text-[#8B9DC3]">Hit Target ATAR</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-2xl font-bold text-gold-cta mr-2">Verified</span>
                <span className="text-sm text-[#8B9DC3]">Tutors Only</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="results" className="bg-cards py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-text-primary mb-4">
              Verified Student Results
            </h2>
            <p className="text-lg text-[#8B9DC3] max-w-3xl mx-auto">
              Real results from Melbourne students who transformed their VCE journey with Velocita
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-background border border-card-border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold-cta rounded-full flex items-center justify-center text-background font-bold mr-3">
                  JS
                </div>
                <div>
                  <div className="font-bold text-text-primary">James Chen</div>
                  <div className="text-sm text-[#8B9DC3]">Methodist Ladies' College</div>
                </div>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex text-gold-cta">
                  ★★★★★
                </div>
              </div>
              <p className="text-text-primary mb-4">
                "Velocita helped me jump from a predicted 82 to a final ATAR of 96.5. The personalized study plan made all the difference."
              </p>
              <div className="text-sm">
                <span className="text-gold-cta font-bold">82 → 96.5</span>
                <span className="text-[#8B9DC3] ml-2">+14.5 ATAR improvement</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-background border border-card-border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold-cta rounded-full flex items-center justify-center text-background font-bold mr-3">
                  SR
                </div>
                <div>
                  <div className="font-bold text-text-primary">Sophia Rodriguez</div>
                  <div className="text-sm text-[#8B9DC3]">Melbourne High School</div>
                </div>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex text-gold-cta">
                  ★★★★★
                </div>
              </div>
              <p className="text-text-primary mb-4">
                "The expert tutors were amazing. I went from struggling with Specialist Maths to scoring in the top 5% of the state."
              </p>
              <div className="text-sm">
                <span className="text-gold-cta font-bold">91.2</span>
                <span className="text-[#8B9DC3] ml-2">Final ATAR</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-background border border-card-border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold-cta rounded-full flex items-center justify-center text-background font-bold mr-3">
                  LT
                </div>
                <div>
                  <div className="font-bold text-text-primary">Lucas Thompson</div>
                  <div className="text-sm text-[#8B9DC3]">Scotch College</div>
                </div>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex text-gold-cta">
                  ★★★★★
                </div>
              </div>
              <p className="text-text-primary mb-4">
                "The AI diagnostics identified exactly what I needed to work on. My English score improved by 15 points in just 8 weeks."
              </p>
              <div className="text-sm">
                <span className="text-gold-cta font-bold">88.7</span>
                <span className="text-[#8B9DC3] ml-2">Final ATAR</span>
              </div>
            </div>
          </div>

          {/* More results CTA */}
          <div className="text-center mt-16">
            <Link 
              href="/diagnostic" 
              className="inline-flex items-center bg-gold-cta hover:bg-yellow-500 text-background font-bold py-4 px-8 rounded-[6px] transition-colors text-lg"
            >
              Start Your Free ATAR Diagnostic →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-card-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-gold-cta mr-2">↑</span>
              <span className="text-xl font-playfair font-bold text-gold-cta">
                Velocita
              </span>
            </div>
            <p className="text-sm text-[#8B9DC3] mb-2">
              Melbourne's Premier VCE Tutoring Platform
            </p>
            <p className="text-xs text-[#8B9DC3]">
              © 2024 Velocita Learning. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
