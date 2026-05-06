'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ParentDashboard() {
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
    { code: 'zh-hans', name: 'Mandarin', flag: '🇨🇳' },
    { code: 'zh-hant', name: 'Cantonese', flag: '🇭🇰' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' }
  ]

  const vceEvents = [
    { name: 'VCE Exams Start', date: '2026-10-26', daysUntil: 127 },
    { name: 'ATAR Results', date: '2026-12-12', daysUntil: 174 },
    { name: 'Term 4 Start', date: '2026-10-05', daysUntil: 106 }
  ]

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
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="appearance-none bg-[#1A2140] border border-transparent rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors">
                Settings
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
            Welcome back, Parent
          </h1>
          <p className="text-[#8B9DC3]">
            Manage your children's VCE journey
          </p>
        </div>

        {/* Alerts Section */}
        <div className="bg-cards border border-card-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-playfair font-bold text-text-primary mb-4">
            Alerts
          </h2>
          <div className="flex items-center text-green-500">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Everything looks great — Johnny is on track</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Children Overview */}
          <div className="lg:col-span-2">
            <div className="bg-cards border border-card-border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-playfair font-bold text-text-primary mb-4">
                Johnny Chen
              </h3>
              <div className="text-sm text-[#8B9DC3] mb-4">
                Year 12 • Melbourne High School
              </div>
              <div className="text-2xl font-bold text-gold-cta mb-2">
                89.5
              </div>
              <div className="text-sm text-[#8B9DC3] mb-4">
                Current ATAR estimate
              </div>
              <div className="mt-4">
                <button className="text-gold-cta hover:text-yellow-500 text-sm transition-colors">
                  View Details →
                </button>
              </div>
            </div>

            {/* Progress Narrative */}
            <div className="bg-cards border border-card-border rounded-lg p-6">
              <h3 className="text-xl font-playfair font-bold text-text-primary mb-4">
                This Week's Progress Story
              </h3>
              <div className="space-y-4 text-text-primary">
                <p>
                  This week Johnny focused on <span className="text-gold-cta font-semibold">Mathematical Methods</span>. His understanding of calculus concepts has improved significantly, particularly with integration techniques.
                </p>
                <p>
                  We've noticed strong progress in problem-solving speed, with Johnny now completing practice questions 25% faster than last week. His confidence in tackling complex problems has grown noticeably.
                </p>
                <p>
                  Looking ahead, we'll focus on exam technique and time management strategies to ensure Johnny can maintain this momentum under test conditions. Next week's sessions will include timed practice exams.
                </p>
              </div>
            </div>
          </div>

          {/* VCE Calendar Widget */}
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <h3 className="text-xl font-playfair font-bold text-text-primary mb-4">
              VCE Calendar
            </h3>
            <div className="space-y-4">
              {vceEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-text-primary">{event.name}</div>
                    <div className="text-sm text-[#8B9DC3]">{event.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gold-cta">{event.daysUntil}</div>
                    <div className="text-xs text-[#8B9DC3]">days</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-card-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-cta mb-1">127</div>
                <div className="text-sm text-[#8B9DC3]">VCE exams in</div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Student Button */}
        <div className="text-center">
          <button className="bg-gold-cta hover:bg-yellow-500 text-background font-bold py-3 px-6 rounded-[6px] transition-colors">
            Add Another Student
          </button>
        </div>

        {/* Language Preference Notice */}
        {selectedLanguage !== 'en' && (
          <div className="mt-8 bg-gold-cta/10 border border-gold-cta/50 rounded-lg p-4 text-center">
            <p className="text-gold-cta">
              Full {languages.find(l => l.code === selectedLanguage)?.name} support coming soon. Your preference has been saved.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
