'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function ParentDashboard() {
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [students, setStudents] = useState([])
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [subjectHealth, setSubjectHealth] = useState([])
  const [progressNarrative, setProgressNarrative] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      
      // Get logged in user email
      const { data: { user } } = 
        await supabase.auth.getUser()
      const userEmail = user?.email
      console.log('User email:', userEmail)
      
      // Demo family mapping
      const DEMO_FAMILY_MAP: 
        Record<string, string> = {
        'michael@velocita-demo.com': 
          '22222222-2222-2222-2222-222222222221',
        'linh@velocita-demo.com': 
          '22222222-2222-2222-2222-222222222222',
        'wei@velocita-demo.com': 
          '22222222-2222-2222-2222-222222222223',
        'raj@velocita-demo.com': 
          '22222222-2222-2222-2222-222222222224',
      }
      
      const familyId = userEmail ? 
        DEMO_FAMILY_MAP[userEmail] : null
      console.log('Family ID:', familyId)
      
      if (!familyId) {
        console.log('No family ID found')
        setLoading(false)
        return
      }
      
      // Fetch students
      const { data: studentsData, error } = 
        await supabase
          .from('students')
          .select('*')
          .eq('family_id', familyId)
      
      console.log('Students:', studentsData)
      console.log('Error:', error)
      
      if (studentsData && studentsData.length > 0) {
        // For each student fetch additional data
        const enrichedStudents = await 
          Promise.all(studentsData.map(
            async (student) => {
              
              const [health, narrative, 
                booking, alerts] = 
              await Promise.all([
                
                supabase.from('subject_health')
                  .select('*')
                  .eq('student_id', student.id),
                  
                supabase.from('progress_narratives')
                  .select('*')
                  .eq('student_id', student.id)
                  .order('generated_at', 
                    { ascending: false })
                  .limit(1),
                  
                supabase.from('bookings')
                  .select('*')
                  .eq('student_id', student.id)
                  .eq('status', 'confirmed')
                  .gt('scheduled_at', 
                    new Date().toISOString())
                  .order('scheduled_at', 
                    { ascending: true })
                  .limit(1),
                  
                supabase.from('student_alerts')
                  .select('*')
                  .eq('student_id', student.id)
                  .eq('is_resolved', false)
              ])
              
              return {
                ...student,
                subjectHealth: health.data || [],
                narrative: narrative.data?.[0] 
                  || null,
                upcomingBooking: 
                  booking.data?.[0] || null,
                alerts: alerts.data || []
              }
            }))
        
        setStudents(enrichedStudents)
        console.log('Enriched students:', enrichedStudents)
      } else {
        console.log('No students found')
      }
      
      setLoading(false)
    }
    
    fetchData()
  }, [])
}, [])

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
          {alerts.length > 0 ? (
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className={`flex items-center ${
                  alert.severity === 'warning' ? 'text-yellow-500' : 
                  alert.severity === 'error' ? 'text-red-500' : 'text-blue-500'
                }`}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.82 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>{alert.message}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center text-green-500">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Everything looks great — all students are on track</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Children Overview */}
          <div className="lg:col-span-2">
            {students.map((student, index) => {
              // Calculate overall subject health score
              const overallHealth = student.subjectHealth.length > 0 
                ? Math.round(
                    student.subjectHealth.reduce((sum, health) => 
                      sum + (health.understanding_score + health.application_score + 
                             health.exam_technique_score + health.time_management_score + 
                             health.confidence_score) / 5, 0) / student.subjectHealth.length
                  )
                : 0

              return (
                <div key={student.id} className="bg-cards border border-card-border rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-playfair font-bold text-text-primary mb-2">
                        {student.first_name}
                      </h3>
                      <div className="text-sm text-[#8B9DC3]">
                        Year {student.year_level} • {student.school_name}
                      </div>
                    </div>
                    {student.upcomingBooking && (
                      <div className="text-right text-sm">
                        <div className="text-gold-cta font-semibold">
                          {new Date(student.upcomingBooking.scheduled_at).toLocaleDateString()}
                        </div>
                        <div className="text-[#8B9DC3]">
                          {student.upcomingBooking.subject}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ATAR Progress */}
                  <div className="flex items-center mb-4">
                    <div className="text-2xl font-bold text-gold-cta mr-3">
                      {student.current_atar_estimate || '--'}
                    </div>
                    {student.target_atar && (
                      <div className="flex items-center text-sm text-[#8B9DC3]">
                        <span className="mr-2">→</span>
                        <span>Target: {student.target_atar}</span>
                        <span className="ml-2 text-gold-cta">↑</span>
                      </div>
                    )}
                  </div>

                  {/* Subject Health */}
                  <div className="mb-4">
                    <div className="text-sm text-[#8B9DC3] mb-2">Subject Health</div>
                    <div className="w-full bg-[#1A2140] rounded-full h-2">
                      <div 
                        className="bg-gold-cta h-2 rounded-full transition-all duration-300"
                        style={{ width: `${overallHealth}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-[#8B9DC3] mt-1">
                      Overall: {overallHealth}%
                    </div>
                  </div>

                  {/* Latest Progress Narrative Excerpt */}
                  {student.narrative && (
                    <div className="mb-4">
                      <div className="text-sm text-[#8B9DC3] mb-1">Latest Progress</div>
                      <div className="text-text-primary text-sm">
                        {student.narrative.narrative_en?.slice(0, 150)}...
                      </div>
                    </div>
                  )}

                  {/* Active Alerts */}
                  {student.alerts.length > 0 && (
                    <div className="mb-4">
                      {student.alerts.map((alert, alertIndex) => (
                        <div key={alertIndex} className={`flex items-center text-sm ${
                          alert.severity === 'warning' ? 'text-yellow-500' : 
                          alert.severity === 'error' ? 'text-red-500' : 'text-blue-500'
                        }`}>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-1.333-1.964-1.333-2.732 0L3.82 16.5c-.77 1.333.192 2.5 1.732 2.5z" />
                          </svg>
                          <span>{alert.message}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4">
                    <button className="text-gold-cta hover:text-yellow-500 text-sm transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              )
            })}

            {/* Progress Narrative */}
            {students.length > 0 && students[0].narrative && (
              <div className="bg-cards border border-card-border rounded-lg p-6">
                <h3 className="text-xl font-playfair font-bold text-text-primary mb-4">
                  This Week's Progress Story
                </h3>
                <div className="space-y-4 text-text-primary">
                  {selectedLanguage === 'vi' && students[0].narrative.narrative_vi ? (
                    <div className="whitespace-pre-line">{students[0].narrative.narrative_vi}</div>
                  ) : (
                    <div className="whitespace-pre-line">{students[0].narrative.narrative_en}</div>
                  )}
                </div>
              </div>
            )}
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
