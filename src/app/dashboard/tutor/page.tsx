'use client'

import Link from 'next/link'

export default function TutorDashboard() {
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
            <div className="flex items-center space-x-4">
              <button className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors">
                Profile
              </button>
              <button className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-text-primary mb-2">
            Welcome back, Tutor
          </h1>
          <p className="text-[#8B9DC3]">
            Manage your tutoring sessions and track student progress
          </p>
        </div>

        {/* WWCC Alert */}
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-8">
          <div className="flex items-center text-red-500">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>⚠️ Complete your WWCC verification to appear in search results</span>
          </div>
        </div>

        {/* Velocity Score */}
        <div className="bg-cards border border-card-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-playfair font-bold text-text-primary mb-4">
            Your Velocity Score
          </h2>
          <div className="text-center">
            <div className="text-5xl font-bold text-gold-cta mb-2">
              --
            </div>
            <p className="text-[#8B9DC3]">
              Your Velocity Score will appear after your first 3 sessions
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-gold-cta mb-2">
              0
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Active Students
            </div>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-gold-cta mb-2">
              0
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Sessions Completed
            </div>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-gold-cta mb-2">
              $0
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Monthly Earnings
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
