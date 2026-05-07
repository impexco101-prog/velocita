'use client'

import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'

export default function Demo() {
  const loginAsDemo = async (
    email: string, 
    password: string,
    redirectTo: string
  ) => {
    const sb = getSupabase()
    const { data, error } = await sb.auth
      .signInWithPassword({ email, password })
    
    if (error) {
      alert('Login failed: ' + error.message)
      return
    }
    
    if (data.session) {
      window.location.href = redirectTo
    }
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-background border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-gold-cta mr-2">↑</span>
              <span className="text-xl font-playfair font-bold text-gold-cta">
                Velocita
              </span>
            </div>
            <Link 
              href="/" 
              className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-background py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Small label */}
            <p className="text-xs uppercase tracking-wider text-gold-cta mb-6">
              DEMO ENVIRONMENT
            </p>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-text-primary leading-tight mb-6 tracking-tight">
              Experience Velocita
            </h1>

            {/* Subheading */}
            <p className="text-lg font-dm-sans text-[#8B9DC3] max-w-3xl mx-auto leading-relaxed">
              Explore the platform through the eyes of real Melbourne families. 
              All data is sample data only.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Entry Cards */}
      <section className="bg-cards py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 — Parent with 2 children (Featured) */}
            <div className="bg-background border-2 border-gold-cta rounded-lg p-6 shadow-lg transform md:scale-105">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-playfair font-bold text-gold-cta mb-2">
                Melbourne Parent
              </h3>
              <div className="text-sm text-[#8B9DC3] mb-3">The Chen Family</div>
              <p className="text-text-primary mb-4">
                Michael & Lisa have two children on Velocita — Johnny (Year 12, Methods) 
                and Amy (Year 10, English). See how one dashboard manages two students.
              </p>
              <div className="text-sm text-[#8B9DC3] mb-4">
                <strong>2 Students | 11 Sessions | Since Feb 2026</strong>
              </div>
              <div className="text-xs text-[#8B9DC3] mb-4">
                <strong>Email:</strong> michael@velocita-demo.com<br/>
                <strong>Password:</strong> Demo2026!
              </div>
              <button
                onClick={() => loginAsDemo(
                  'michael@velocita-demo.com',
                  'Demo2026!',
                  '/dashboard/parent'
                )}
                className="inline-flex items-center justify-center bg-gold-cta hover:bg-yellow-500 text-background font-bold py-3 px-6 rounded-[6px] transition-colors w-full"
              >
                View Parent Dashboard →
              </button>
            </div>

            {/* Card 2 — Vietnamese parent */}
            <div className="bg-background border border-card-border rounded-lg p-6">
              <div className="text-4xl mb-4">🇻🇳</div>
              <h3 className="text-xl font-playfair font-bold text-gold-cta mb-2">
                Vietnamese Family
              </h3>
              <div className="text-sm text-[#8B9DC3] mb-3">The Nguyen Family</div>
              <p className="text-text-primary mb-4">
                Linh monitors Sarah's Year 11 Biology progress in Vietnamese. 
                See our bilingual parent dashboard in action.
              </p>
              <div className="text-sm text-[#8B9DC3] mb-4">
                <strong>1 Student | 6 Sessions | Vietnamese Reports</strong>
              </div>
              <div className="text-xs text-[#8B9DC3] mb-4">
                <strong>Email:</strong> linh@velocita-demo.com<br/>
                <strong>Password:</strong> Demo2026!
              </div>
              <button
                onClick={() => loginAsDemo(
                  'linh@velocita-demo.com',
                  'Demo2026!', 
                  '/dashboard/parent'
                )}
                className="inline-flex items-center justify-center bg-gold-cta hover:bg-yellow-500 text-background font-bold py-3 px-6 rounded-[6px] transition-colors w-full"
              >
                View Vietnamese Dashboard →
              </button>
            </div>

            {/* Card 3 — Chinese family elite student */}
            <div className="bg-background border border-card-border rounded-lg p-6">
              <div className="text-4xl mb-4">🇨🇳</div>
              <h3 className="text-xl font-playfair font-bold text-gold-cta mb-2">
                Elite Student Family
              </h3>
              <div className="text-sm text-[#8B9DC3] mb-3">The Zhang Family</div>
              <p className="text-text-primary mb-4">
                Wei & Mei have Kevin targeting 99 ATAR and Jessica on a steady 
                improvement path. See elite-level tracking.
              </p>
              <div className="text-sm text-[#8B9DC3] mb-4">
                <strong>2 Students | 11 Sessions | 99 ATAR Target</strong>
              </div>
              <div className="text-xs text-[#8B9DC3] mb-4">
                <strong>Email:</strong> wei@velocita-demo.com<br/>
                <strong>Password:</strong> Demo2026!
              </div>
              <button
                onClick={() => loginAsDemo(
                  'wei@velocita-demo.com',
                  'Demo2026!',
                  '/dashboard/parent'
                )}
                className="inline-flex items-center justify-center bg-gold-cta hover:bg-yellow-500 text-background font-bold py-3 px-6 rounded-[6px] transition-colors w-full"
              >
                View Elite Dashboard →
              </button>
            </div>

            {/* Card 4 — Tutor view */}
            <div className="bg-background border border-card-border rounded-lg p-6">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-playfair font-bold text-gold-cta mb-2">
                Verified Tutor
              </h3>
              <div className="text-sm text-[#8B9DC3] mb-3">Emma Wong — UniMelb Medicine</div>
              <p className="text-text-primary mb-4">
                See Emma's tutor dashboard — Velocity Score 92, 4 active students, 
                upcoming sessions with AI prep briefs.
              </p>
              <div className="text-sm text-[#8B9DC3] mb-4">
                <strong>Velocity Score: 92 | 47 Sessions | 8.2 avg improvement</strong>
              </div>
              <div className="text-xs text-[#8B9DC3] mb-4">
                <strong>Email:</strong> emma@velocita-demo.com<br/>
                <strong>Password:</strong> Demo2026!
              </div>
              <button
                onClick={() => loginAsDemo(
                  'emma@velocita-demo.com',
                  'Demo2026!',
                  '/dashboard/tutor'
                )}
                className="inline-flex items-center justify-center bg-gold-cta hover:bg-yellow-500 text-background font-bold py-3 px-6 rounded-[6px] transition-colors w-full"
              >
                View Tutor Dashboard →
              </button>
            </div>

            {/* Card 5 — No login needed */}
            <div className="bg-background border-2 border-emerald-500 rounded-lg p-6 shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-playfair font-bold text-emerald-500 mb-2">
                Try The Diagnostic
              </h3>
              <div className="text-sm text-[#8B9DC3] mb-3">No Account Required</div>
              <p className="text-text-primary mb-4">
                Take the free 5-minute ATAR diagnostic right now. 
                No account needed.
              </p>
              <div className="text-sm text-[#8B9DC3] mb-4">
                <strong>Free | 5 minutes | Instant results</strong>
              </div>
              <div className="text-xs text-[#8B9DC3] mb-4">
                <strong>Start immediately — no signup required</strong>
              </div>
              <button
                onClick={() => window.location.href = '/diagnostic'}
                className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-[6px] transition-colors w-full"
              >
                Start Free Diagnostic →
              </button>
            </div>

          </div>

          {/* Disclaimer */}
          <div className="text-center mt-16">
            <p className="text-sm text-[#8B9DC3] italic">
              All data shown is sample data created for demonstration purposes. 
              No real student information is used.
            </p>
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
