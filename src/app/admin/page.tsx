'use client'

import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-background border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-gold-cta mr-2">↑</span>
              <span className="text-xl font-playfair font-bold text-gold-cta">
                Velocita Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
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
            Admin Dashboard
          </h1>
          <p className="text-[#8B9DC3]">
            Platform management and analytics
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-gold-cta mb-2">
              2,200+
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Total Students
            </div>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-gold-cta mb-2">
              150+
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Active Tutors
            </div>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-gold-cta mb-2">
              94%
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Success Rate
            </div>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-gold-cta mb-2">
              8.5
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Avg ATAR Improvement
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-cards border border-card-border rounded-lg p-6">
          <h2 className="text-xl font-playfair font-bold text-text-primary mb-4">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="bg-[#1A2140] hover:bg-[#252d4a] text-text-primary font-medium py-3 px-4 rounded-lg transition-colors">
              Review Tutor Applications
            </button>
            <button className="bg-[#1A2140] hover:bg-[#252d4a] text-text-primary font-medium py-3 px-4 rounded-lg transition-colors">
              Verify WWCC Documents
            </button>
            <button className="bg-[#1A2140] hover:bg-[#252d4a] text-text-primary font-medium py-3 px-4 rounded-lg transition-colors">
              View Safety Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
