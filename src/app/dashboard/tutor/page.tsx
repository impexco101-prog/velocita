'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function TutorDashboard() {
  const [velocityScore, setVelocityScore] = useState(null)
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [recentSessions, setRecentSessions] = useState([])
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [monthlyEarnings, setMonthlyEarnings] = useState(0)
  const [activeStudents, setActiveStudents] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTutorData()
  }, [])

  const fetchTutorData = async () => {
    try {
      const supabase = createClient()
      
      // Get logged-in user's email from Supabase Auth
      const { data: { user } } = await supabase.auth.getUser()
      const userEmail = user?.email

      // Demo account email to tutor mapping
      const DEMO_TUTOR_MAP: Record<string, string> = {
        'emma@velocita-demo.com': 
          '11111111-1111-1111-1111-111111111111',
        'james@velocita-demo.com': 
          '11111111-1111-1111-1111-111111111112',
        'priya@velocita-demo.com': 
          '11111111-1111-1111-1111-111111111113',
      }

      const tutorId = DEMO_TUTOR_MAP[userEmail] || null

      if (!tutorId) {
        console.error('No demo tutor mapping found for email:', userEmail)
        setLoading(false)
        return
      }

      // Fetch velocity score from velocity_scores
      const { data: velocityData } = await supabase
        .from('velocity_scores')
        .select('*')
        .eq('tutor_id', tutorId)
        .single()

      // Fetch upcoming bookings with student details
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select(`
          b.*,
          s.first_name,
          s.year_level,
          s.school_name
        `)
        .eq('b.tutor_id', tutorId)
        .eq('b.status', 'confirmed')
        .gt('b.scheduled_at', new Date().toISOString())
        .order('b.scheduled_at', { ascending: true })

      // Fetch recent completed sessions
      const { data: recentSessionsData } = await supabase
        .from('bookings')
        .select(`
          b.*,
          s.first_name
        `)
        .eq('b.tutor_id', tutorId)
        .eq('b.status', 'completed')
        .order('b.scheduled_at', { ascending: false })
        .limit(5)

      // Fetch monthly earnings from completed sessions
      const { data: completedData } = await supabase
        .from('bookings')
        .select('amount_aud')
        .eq('tutor_id', tutorId)
        .eq('status', 'completed')
        .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

      // Fetch active students count
      const { data: activeStudentsData } = await supabase
        .from('bookings')
        .select('student_id')
        .eq('tutor_id', tutorId)
        .gte('scheduled_at', new Date(new Date().setDate(new Date().getDate() - 30)).toISOString())

      const uniqueStudents = [...new Set(activeStudentsData?.map(b => b.student_id) || [])]

      setVelocityScore(velocityData?.score || 0)
      setUpcomingBookings(bookingsData || [])
      setRecentSessions(recentSessionsData || [])
      setSessionsCompleted(velocityData?.sessions_count || 0)
      setMonthlyEarnings(completedData?.reduce((sum, b) => sum + (b.amount_aud || 0), 0) || 0)
      setActiveStudents(uniqueStudents.length)
    } catch (error) {
      console.error('Error fetching tutor data:', error)
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-primary">Loading dashboard...</div>
      </div>
    )
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

        {/* Velocity Score */}
        <div className="bg-cards border border-card-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-playfair font-bold text-text-primary mb-4">
            Your Velocity Score
          </h2>
          <div className="text-center">
            <div className="text-5xl font-bold text-gold-cta mb-2">
              {velocityScore || '--'}
            </div>
            <p className="text-[#8B9DC3]">
              {velocityScore ? 'Excellent performance!' : 'Your Velocity Score will appear after your first 3 sessions'}
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-gold-cta mb-2">
              {activeStudents}
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Active Students
            </div>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-gold-cta mb-2">
              {sessionsCompleted}
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Sessions Completed
            </div>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-gold-cta mb-2">
              ${monthlyEarnings.toFixed(0)}
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Monthly Earnings
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-cards border border-card-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-playfair font-bold text-text-primary mb-4">
            Upcoming Sessions
          </h2>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking, index) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-[#1A2140] rounded-lg">
                  <div>
                    <div className="font-medium text-text-primary">
                      {booking.first_name} — {booking.subject}
                    </div>
                    <div className="text-sm text-[#8B9DC3]">
                      {new Date(booking.scheduled_at).toLocaleDateString()} • {booking.year_level}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gold-cta">${booking.amount_aud}</div>
                    <div className="text-xs text-[#8B9DC3]">{booking.duration_minutes} min</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-[#8B9DC3]">
              No upcoming sessions scheduled
            </div>
          )}
        </div>

        {/* Recent Sessions */}
        <div className="bg-cards border border-card-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-playfair font-bold text-text-primary mb-4">
            Recent Sessions
          </h2>
          {recentSessions.length > 0 ? (
            <div className="space-y-4">
              {recentSessions.map((session, index) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-[#1A2140] rounded-lg">
                  <div>
                    <div className="font-medium text-text-primary">
                      {session.first_name} — {session.subject}
                    </div>
                    <div className="text-sm text-[#8B9DC3]">
                      {new Date(session.scheduled_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gold-cta">${session.amount_aud}</div>
                    <div className="text-xs text-[#8B9DC3]">{session.duration_minutes} min</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-[#8B9DC3]">
              No recent sessions
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
