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

            {/* Right: Links and CTAs */}
            <div className="flex items-center space-x-6">
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
                href="/tutors/register" 
                className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors"
              >
                Join as a Tutor
              </Link>
              <Link 
                href="/auth/login" 
                className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-gold-cta hover:bg-yellow-500 text-background font-bold py-2 px-4 rounded-[6px] transition-colors"
              >
                Get Started Free
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
                href="/auth/signup" 
                className="inline-flex items-center justify-center bg-gold-cta hover:bg-yellow-500 text-background font-bold py-4 px-8 rounded-[6px] transition-colors text-lg"
              >
                Get Started Free →
              </Link>
              <Link 
                href="#tutors"
                className="inline-flex items-center justify-center bg-transparent border border-white text-white font-bold py-4 px-8 rounded-[6px] hover:bg-white hover:text-background transition-colors text-lg"
              >
                Browse Verified Tutors
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-2xl font-bold text-gold-cta mr-2">Founding Cohort</span>
                <span className="text-sm text-[#8B9DC3]">Now Open</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-2xl font-bold text-gold-cta mr-2">Verified</span>
                <span className="text-sm text-[#8B9DC3]">Tutors Only</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-2xl font-bold text-gold-cta mr-2">Melbourne</span>
                <span className="text-sm text-[#8B9DC3]">VCE Specialists</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-text-primary mb-4">
              How Velocita Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 01 */}
            <div className="text-center">
              <div className="text-6xl font-playfair font-bold text-gold-cta mb-4">
                01
              </div>
              <h3 className="text-2xl font-playfair font-bold text-text-primary mb-4">
                Take Free Diagnostic
              </h3>
              <p className="text-base font-dm-sans text-[#8B9DC3] leading-relaxed">
                Identify your exact knowledge gaps in just 5 minutes. No signup required.
              </p>
            </div>

            {/* Step 02 */}
            <div className="text-center">
              <div className="text-6xl font-playfair font-bold text-gold-cta mb-4">
                02
              </div>
              <h3 className="text-2xl font-playfair font-bold text-text-primary mb-4">
                Match With a Verified Tutor
              </h3>
              <p className="text-base font-dm-sans text-[#8B9DC3] leading-relaxed">
                Every tutor is university-verified and background checked. See real credentials.
              </p>
            </div>

            {/* Step 03 */}
            <div className="text-center">
              <div className="text-6xl font-playfair font-bold text-gold-cta mb-4">
                03
              </div>
              <h3 className="text-2xl font-playfair font-bold text-text-primary mb-4">
                Track Your ATAR Progress
              </h3>
              <p className="text-base font-dm-sans text-[#8B9DC3] leading-relaxed">
                Weekly AI reports show exactly what is improving and what needs work.
              </p>
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

      {/* Pricing Section */}
      <section id="pricing" className="bg-cards py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-text-primary mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-[#8B9DC3]">
              No lock-in contracts. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Foundation Card */}
            <div className="bg-background border border-card-border rounded-lg p-8">
              <h3 className="text-2xl font-playfair font-bold text-text-primary mb-2">
                AI Foundation
              </h3>
              <div className="text-4xl font-bold text-gold-cta mb-6">
                $79<span className="text-lg text-[#8B9DC3]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Unlimited Socratic AI sessions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Homework photo analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Weekly parent progress report</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Spaced repetition quizzes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Free ATAR diagnostic included</span>
                </li>
              </ul>
              <button className="w-full bg-transparent border border-white text-white font-bold py-3 px-6 rounded-[6px] hover:bg-white hover:text-background transition-colors">
                Get Started
              </button>
            </div>

            {/* Hybrid Accelerator Card (Featured) */}
            <div className="bg-background border-2 border-gold-cta rounded-lg p-8 shadow-lg transform scale-105">
              <div className="bg-gold-cta text-background text-sm font-bold py-1 px-3 rounded-full inline-block mb-4">
                Most Popular
              </div>
              <h3 className="text-2xl font-playfair font-bold text-text-primary mb-2">
                Hybrid Accelerator
              </h3>
              <div className="text-4xl font-bold text-gold-cta mb-6">
                $299<span className="text-lg text-[#8B9DC3]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Everything in AI Foundation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">4 human tutor sessions per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Priority tutor matching</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Post-session parent notes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Bilingual parent communication</span>
                </li>
              </ul>
              <button className="w-full bg-gold-cta hover:bg-yellow-500 text-background font-bold py-3 px-6 rounded-[6px] transition-colors">
                Get Started
              </button>
            </div>

            {/* Elite ATAR Program Card */}
            <div className="bg-background border border-card-border rounded-lg p-8">
              <h3 className="text-2xl font-playfair font-bold text-text-primary mb-2">
                Elite ATAR Program
              </h3>
              <div className="text-4xl font-bold text-gold-cta mb-6">
                $599<span className="text-lg text-[#8B9DC3]">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Everything in Hybrid Accelerator</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">8 tutor sessions per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Dedicated tutor relationship</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">Monthly parent strategy call</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-cta mr-2">✓</span>
                  <span className="text-text-primary">ATAR improvement guarantee</span>
                </li>
              </ul>
              <button className="w-full bg-transparent border border-white text-white font-bold py-3 px-6 rounded-[6px] hover:bg-white hover:text-background transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tutors Section */}
      <section id="tutors" className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-text-primary mb-4">
              Meet Our Verified Tutors
            </h2>
            <p className="text-lg text-[#8B9DC3] max-w-3xl mx-auto">
              Every tutor is university verified, background checked, and outcome tracked.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tutor 1 */}
            <div className="bg-cards border border-card-border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gold-cta rounded-full flex items-center justify-center text-background font-bold text-xl mr-4">
                  EW
                </div>
                <div>
                  <div className="font-bold text-text-primary text-lg">Emma Wong</div>
                  <div className="text-sm text-[#8B9DC3]">University of Melbourne</div>
                </div>
              </div>
              <div className="text-sm text-[#8B9DC3] mb-4">
                Doctor of Medicine (Year 4)
              </div>
              <div className="text-sm text-text-primary mb-4">
                <strong>Subjects:</strong> Mathematical Methods, Specialist Maths, Chemistry
              </div>
              <div className="inline-block bg-gold-cta text-background text-xs font-bold py-1 px-3 rounded-full">
                Elite Tutor
              </div>
            </div>

            {/* Tutor 2 */}
            <div className="bg-cards border border-card-border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gold-cta rounded-full flex items-center justify-center text-background font-bold text-xl mr-4">
                  MJ
                </div>
                <div>
                  <div className="font-bold text-text-primary text-lg">Marcus Johnson</div>
                  <div className="text-sm text-[#8B9DC3]">Monash University</div>
                </div>
              </div>
              <div className="text-sm text-[#8B9DC3] mb-4">
                Bachelor of Engineering (Hons)
              </div>
              <div className="text-sm text-text-primary mb-4">
                <strong>Subjects:</strong> Physics, Mathematical Methods, English Language
              </div>
              <div className="inline-block bg-gold-cta text-background text-xs font-bold py-1 px-3 rounded-full">
                Elite Tutor
              </div>
            </div>

            {/* Tutor 3 */}
            <div className="bg-cards border border-card-border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gold-cta rounded-full flex items-center justify-center text-background font-bold text-xl mr-4">
                  SL
                </div>
                <div>
                  <div className="font-bold text-text-primary text-lg">Sarah Lee</div>
                  <div className="text-sm text-[#8B9DC3]">RMIT University</div>
                </div>
              </div>
              <div className="text-sm text-[#8B9DC3] mb-4">
                Bachelor of Science (Distinction)
              </div>
              <div className="text-sm text-text-primary mb-4">
                <strong>Subjects:</strong> Biology, Psychology, English Literature
              </div>
              <div className="inline-block bg-gold-cta text-background text-xs font-bold py-1 px-3 rounded-full">
                Elite Tutor
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/diagnostic" 
              className="inline-flex items-center bg-gold-cta hover:bg-yellow-500 text-background font-bold py-4 px-8 rounded-[6px] transition-colors text-lg"
            >
              Start With a Free Diagnostic →
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
