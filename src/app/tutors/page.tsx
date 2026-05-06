'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getRankedTutors, Tutor, StudentProfile } from '@/lib/matching'

// Mock tutor data - in real app this would come from database
const mockTutors: Tutor[] = [
  {
    id: '1',
    name: 'Emma Wong',
    subjects: ['Mathematical Methods', 'Specialist Maths', 'Chemistry'],
    availability: { weekdays: true, weekends: true },
    velocity_score: 85,
    languages: ['en'],
    hourly_rate: 75
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    subjects: ['Physics', 'Mathematical Methods', 'English Language'],
    availability: { weekdays: true, weekends: false },
    velocity_score: 92,
    languages: ['en'],
    hourly_rate: 80
  },
  {
    id: '3',
    name: 'Sarah Lee',
    subjects: ['Biology', 'Psychology', 'English Literature'],
    availability: { weekdays: true, weekends: true },
    velocity_score: 78,
    languages: ['en', 'zh-hans'],
    hourly_rate: 70
  },
  {
    id: '4',
    name: 'David Chen',
    subjects: ['Mathematical Methods', 'Specialist Maths', 'Physics'],
    availability: { weekdays: false, weekends: true },
    velocity_score: 88,
    languages: ['en', 'zh-hans', 'zh-hant'],
    hourly_rate: 85
  },
  {
    id: '5',
    name: 'Lisa Park',
    subjects: ['Chemistry', 'Biology', 'Psychology'],
    availability: { weekdays: true, weekends: true },
    velocity_score: 82,
    languages: ['en', 'ko'],
    hourly_rate: 72
  }
]

export default function TutorsPage() {
  const searchParams = useSearchParams()
  const subjectFilter = searchParams.get('subject')
  const [selectedSubject, setSelectedSubject] = useState(subjectFilter || 'All Subjects')
  const [sortBy, setSortBy] = useState('match')

  // Mock student profile for matching
  const studentProfile: StudentProfile = {
    id: 'student1',
    name: 'Student',
    subjects: subjectFilter ? [subjectFilter] : ['Mathematical Methods'],
    availability: { weekdays: true, weekends: true },
    language_preference: 'en',
    target_atar: 90
  }

  // Calculate ranked tutors
  const rankedTutors = useMemo(() => {
    if (selectedSubject === 'All Subjects') {
      return mockTutors.map(tutor => ({
        tutor,
        score: tutor.velocity_score,
        breakdown: {
          subject_match: 40,
          schedule_match: 25,
          velocity_bonus: Math.min(tutor.velocity_score * 0.2, 20),
          language_bonus: 15
        }
      })).sort((a, b) => b.score - a.score)
    }
    return getRankedTutors(mockTutors, studentProfile, selectedSubject)
  }, [selectedSubject, studentProfile])

  const subjects = ['All Subjects', ...Array.from(new Set(mockTutors.flatMap(t => t.subjects)))]

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
              <Link href="/auth/login" className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors">
                Login
              </Link>
              <Link href="/auth/signup" className="bg-gold-cta hover:bg-yellow-500 text-background font-bold py-2 px-4 rounded-[6px] transition-colors">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-text-primary mb-2">
            Verified VCE Tutors
          </h1>
          <p className="text-[#8B9DC3]">
            {subjectFilter 
              ? `Top tutors for ${subjectFilter} ranked by compatibility`
              : 'Browse our complete network of verified VCE tutors'
            }
          </p>
        </div>

        {/* Filters */}
        <div className="bg-cards border border-card-border rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
              >
                <option value="match">Best Match</option>
                <option value="velocity">Velocity Score</option>
                <option value="price">Lowest Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tutor Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rankedTutors.map((match, index) => (
            <div key={match.tutor.id} className="bg-cards border border-card-border rounded-lg p-6 relative">
              {/* Match Badge */}
              {selectedSubject !== 'All Subjects' && (
                <div className="absolute -top-2 -right-2 bg-gold-cta text-background text-xs font-bold px-3 py-1 rounded-full">
                  {Math.round(match.score)}% Match
                </div>
              )}

              {/* Tutor Info */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold-cta rounded-full flex items-center justify-center text-background font-bold mr-3">
                  {match.tutor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-text-primary">{match.tutor.name}</div>
                  <div className="text-sm text-[#8B9DC3]">Velocity Score: {match.tutor.velocity_score}</div>
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-4">
                <div className="text-sm text-[#8B9DC3] mb-2">Subjects:</div>
                <div className="flex flex-wrap gap-2">
                  {match.tutor.subjects.map(subject => (
                    <span
                      key={subject}
                      className={`px-2 py-1 rounded-full text-xs ${
                        subject === selectedSubject
                          ? 'bg-gold-cta/15 border border-gold-cta text-gold-cta'
                          : 'bg-[#1A2140] text-[#8B9DC3]'
                      }`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Match Breakdown */}
              {selectedSubject !== 'All Subjects' && (
                <div className="mb-4">
                  <div className="text-sm text-[#8B9DC3] mb-2">Match Breakdown:</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-primary">Subject Match</span>
                      <span className="text-gold-cta">{match.breakdown.subject_match}pts</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-primary">Schedule Match</span>
                      <span className="text-gold-cta">{match.breakdown.schedule_match}pts</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-primary">Velocity Bonus</span>
                      <span className="text-gold-cta">{Math.round(match.breakdown.velocity_bonus)}pts</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-primary">Language Match</span>
                      <span className="text-gold-cta">{match.breakdown.language_bonus}pts</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Languages */}
              <div className="mb-4">
                <div className="text-sm text-[#8B9DC3] mb-1">Languages:</div>
                <div className="text-xs text-text-primary">
                  {match.tutor.languages.map(lang => {
                    const langMap: { [key: string]: string } = {
                      'en': 'English',
                      'zh-hans': 'Mandarin',
                      'zh-hant': 'Cantonese',
                      'ko': 'Korean',
                      'vi': 'Vietnamese'
                    }
                    return langMap[lang] || lang
                  }).join(', ')}
                </div>
              </div>

              
              {/* CTA Button */}
              <Link
                href={`/auth/signup?subject=${selectedSubject}&tutor=${match.tutor.id}`}
                className="block w-full bg-gold-cta hover:bg-yellow-500 text-background font-bold py-3 px-6 rounded-[6px] transition-colors text-center"
              >
                Book Free Session
              </Link>
            </div>
          ))}
        </div>

        {/* No Results */}
        {rankedTutors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#8B9DC3] mb-4">
              No tutors found for {selectedSubject}
            </div>
            <Link
              href="/tutors/register"
              className="inline-block bg-gold-cta hover:bg-yellow-500 text-background font-bold py-3 px-6 rounded-[6px] transition-colors"
            >
              Become a Tutor
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
