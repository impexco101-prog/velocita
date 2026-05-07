'use client'

import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'

const DEMO_TUTOR_MAP: Record<string, string> = {
  'emma@velocita-demo.com': 
    '11111111-1111-1111-1111-111111111111',
  'james@velocita-demo.com': 
    '11111111-1111-1111-1111-111111111112',
  'priya@velocita-demo.com': 
    '11111111-1111-1111-1111-111111111113',
}

interface VelocityScore {
  score: number
  sessions_count: number
  avg_atar_improvement: number
  student_retention_rate: number
  parent_satisfaction_avg: number
}

interface Booking {
  id: string
  subject: string
  scheduled_at: string
  status: string
  session_notes: string
  amount_aud: number
  student?: {
    first_name: string
    year_level: number
    school_name: string
  }
}

export default function TutorDashboard() {
  const [email, setEmail] = useState('')
  const [velocityScore, setVelocityScore] = 
    useState<VelocityScore | null>(null)
  const [upcomingSessions, setUpcomingSessions] = 
    useState<Booking[]>([])
  const [recentSessions, setRecentSessions] = 
    useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const key = 
        'sb-htqldlyejnloaiwkgirj-auth-token'
      const stored = localStorage.getItem(key)
      if (!stored) {
        setLoading(false)
        return
      }
      
      const parsed = JSON.parse(stored)
      const userEmail = 
        parsed?.user?.email || ''
      setEmail(userEmail)
      
      const tutorId = DEMO_TUTOR_MAP[userEmail]
      if (!tutorId) {
        setLoading(false)
        return
      }
      
      const sb = getSupabase()
      
      const [vsResult, upcomingResult, 
        recentResult] = await Promise.all([
        
        sb.from('velocity_scores')
          .select('*')
          .eq('tutor_id', tutorId)
          .single(),
          
        sb.from('bookings')
          .select('*, students(first_name, year_level, school_name)')
          .eq('tutor_id', tutorId)
          .eq('status', 'confirmed')
          .gt('scheduled_at', 
            new Date().toISOString())
          .order('scheduled_at', 
            { ascending: true })
          .limit(5),
          
        sb.from('bookings')
          .select('*, students(first_name, year_level, school_name)')
          .eq('tutor_id', tutorId)
          .eq('status', 'completed')
          .order('scheduled_at', 
            { ascending: false })
          .limit(5)
      ])
      
      if (vsResult.data) 
        setVelocityScore(vsResult.data)
      if (upcomingResult.data) 
        setUpcomingSessions(upcomingResult.data)
      if (recentResult.data) 
        setRecentSessions(recentResult.data)
      
      setLoading(false)
    }
    
    load()
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr)
      .toLocaleDateString('en-AU', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0E1A',
      padding: '40px',
      fontFamily: 'DM Sans, sans-serif',
      color: '#F0F4FF'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <div>
          <div style={{
            color: '#D4A843',
            fontSize: '20px',
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            marginBottom: '8px'
          }}>
            ↑ Velocita
          </div>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            margin: '0 0 4px'
          }}>
            Tutor Dashboard
          </h1>
          <p style={{
            color: '#8B9DC3',
            margin: 0,
            fontSize: '15px'
          }}>
            {email}
          </p>
        </div>
        <button
          onClick={async () => {
            await getSupabase().auth.signOut()
            window.location.href = '/'
          }}
          style={{
            background: 'transparent',
            border: '1px solid #1E2D4A',
            color: '#8B9DC3',
            padding: '8px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Logout
        </button>
      </div>

      {loading && (
        <div style={{
          color: '#8B9DC3',
          textAlign: 'center',
          padding: '60px'
        }}>
          Loading dashboard...
        </div>
      )}

      {!loading && (
        <div>
          {/* Velocity Score + Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 
              'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {/* Velocity Score */}
            <div style={{
              background: '#0F1629',
              border: '1px solid #D4A843',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '11px',
                color: '#D4A843',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '8px'
              }}>
                Velocity Score
              </div>
              <div style={{
                fontSize: '56px',
                fontWeight: 700,
                color: '#D4A843',
                fontFamily: 'Georgia, serif',
                lineHeight: 1
              }}>
                {velocityScore?.score || 0}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#8B9DC3',
                marginTop: '4px'
              }}>
                out of 100
              </div>
            </div>

            {/* Sessions */}
            <div style={{
              background: '#0F1629',
              border: '1px solid #1E2D4A',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '11px',
                color: '#8B9DC3',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '8px'
              }}>
                Sessions
              </div>
              <div style={{
                fontSize: '48px',
                fontWeight: 700,
                color: '#F0F4FF',
                fontFamily: 'Georgia, serif',
                lineHeight: 1
              }}>
                {velocityScore?.sessions_count 
                  || 0}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#8B9DC3',
                marginTop: '4px'
              }}>
                completed
              </div>
            </div>

            {/* Avg Improvement */}
            <div style={{
              background: '#0F1629',
              border: '1px solid #1E2D4A',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '11px',
                color: '#8B9DC3',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '8px'
              }}>
                Avg Improvement
              </div>
              <div style={{
                fontSize: '48px',
                fontWeight: 700,
                color: '#10C27A',
                fontFamily: 'Georgia, serif',
                lineHeight: 1
              }}>
                +{velocityScore
                  ?.avg_atar_improvement || 0}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#8B9DC3',
                marginTop: '4px'
              }}>
                ATAR points avg
              </div>
            </div>

            {/* Satisfaction */}
            <div style={{
              background: '#0F1629',
              border: '1px solid #1E2D4A',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '11px',
                color: '#8B9DC3',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '8px'
              }}>
                Parent Rating
              </div>
              <div style={{
                fontSize: '48px',
                fontWeight: 700,
                color: '#F0F4FF',
                fontFamily: 'Georgia, serif',
                lineHeight: 1
              }}>
                {velocityScore
                  ?.parent_satisfaction_avg 
                  || 0}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#8B9DC3',
                marginTop: '4px'
              }}>
                out of 5.0
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }}>
            {/* Upcoming Sessions */}
            <div style={{
              background: '#0F1629',
              border: '1px solid #1E2D4A',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '20px',
                margin: '0 0 20px',
                color: '#F0F4FF'
              }}>
                Upcoming Sessions
              </h3>
              {upcomingSessions.length === 0 ? (
                <p style={{ 
                  color: '#8B9DC3',
                  fontSize: '14px'
                }}>
                  No upcoming sessions
                </p>
              ) : (
                upcomingSessions.map(session => (
                  <div key={session.id} style={{
                    borderBottom: 
                      '1px solid #1E2D4A',
                    paddingBottom: '16px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 
                        'space-between',
                      marginBottom: '4px'
                    }}>
                      <span style={{
                        color: '#F0F4FF',
                        fontWeight: 600,
                        fontSize: '15px'
                      }}>
                        {(session as any)
                          .students?.first_name}
                      </span>
                      <span style={{
                        color: '#D4A843',
                        fontSize: '13px'
                      }}>
                        ${session.amount_aud}
                      </span>
                    </div>
                    <div style={{
                      color: '#8B9DC3',
                      fontSize: '13px',
                      marginBottom: '4px'
                    }}>
                      {session.subject}
                    </div>
                    <div style={{
                      color: '#4A5578',
                      fontSize: '12px'
                    }}>
                      {formatDate(
                        session.scheduled_at)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Recent Sessions */}
            <div style={{
              background: '#0F1629',
              border: '1px solid #1E2D4A',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '20px',
                margin: '0 0 20px',
                color: '#F0F4FF'
              }}>
                Recent Sessions
              </h3>
              {recentSessions.length === 0 ? (
                <p style={{ 
                  color: '#8B9DC3',
                  fontSize: '14px'
                }}>
                  No recent sessions
                </p>
              ) : (
                recentSessions.map(session => (
                  <div key={session.id} style={{
                    borderBottom: 
                      '1px solid #1E2D4A',
                    paddingBottom: '16px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 
                        'space-between',
                      marginBottom: '4px'
                    }}>
                      <span style={{
                        color: '#F0F4FF',
                        fontWeight: 600,
                        fontSize: '15px'
                      }}>
                        {(session as any)
                          .students?.first_name}
                      </span>
                      <span style={{
                        color: '#10C27A',
                        fontSize: '12px',
                        background: 
                          'rgba(16,194,122,0.1)',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        Completed
                      </span>
                    </div>
                    <div style={{
                      color: '#8B9DC3',
                      fontSize: '13px',
                      marginBottom: '4px'
                    }}>
                      {session.subject}
                    </div>
                    {session.session_notes && (
                      <div style={{
                        color: '#4A5578',
                        fontSize: '12px',
                        lineHeight: 1.5
                      }}>
                        {session.session_notes
                          .slice(0, 100)}...
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
