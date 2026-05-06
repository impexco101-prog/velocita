'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function TutorDashboard() {
  const [velocityScore, setVelocityScore] = useState(null)
  const [upcomingBookings, setUpcomingBookings] = useState([])
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
      
      // For demo accounts, map email to tutor_id
      const urlParams = new URLSearchParams(window.location.search)
      const email = urlParams.get('email') || 'emma@velocita-demo.com'
      
      let tutorId
      switch(email) {
        case 'emma@velocita-demo.com':
          tutorId = '11111111-1111-1111-1111-111111111111'
          break
        case 'james@velocita-demo.com':
          tutorId = '11111111-1111-1111-1111-111111111112'
          break
        case 'priya@velocita-demo.com':
          tutorId = '11111111-1111-1111-1111-111111111113'
          break
        default:
          tutorId = '11111111-1111-1111-1111-111111111111'
      }

      // Fetch velocity score
      const { data: velocityData } = await supabase
        .from('velocity_scores')
        .select('*')
        .eq('tutor_id', tutorId)
        .single()

      // Fetch upcoming bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select(`
          *,
          students!inner(
            first_name,
            year_level,
            school_name
          )
        `)
        .eq('tutor_id', tutorId)
        .eq('status', 'confirmed')
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true })

      // Fetch completed sessions for earnings
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
                      {booking.students?.first_name} — {booking.subject}
                    </div>
                    <div className="text-sm text-[#8B9DC3]">
                      {new Date(booking.scheduled_at).toLocaleDateString()} • {booking.students?.year_level}
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
      </div>
    </div>
  )
}
