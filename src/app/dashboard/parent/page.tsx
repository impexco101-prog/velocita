'use client'

import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'

const DEMO_FAMILY_MAP: Record<string, string> = {
  'michael@velocita-demo.com': 
    '22222222-2222-2222-2222-222222222221',
  'linh@velocita-demo.com': 
    '22222222-2222-2222-2222-222222222222',
  'wei@velocita-demo.com': 
    '22222222-2222-2222-2222-222222222223',
  'raj@velocita-demo.com': 
    '22222222-2222-2222-2222-222222222224',
}

const VCE_DATES = [
  { name: 'VCE Exams Start', 
    date: '2026-10-26', days: 127 },
  { name: 'ATAR Results', 
    date: '2026-12-12', days: 174 },
  { name: 'Term 4 Start', 
    date: '2026-10-05', days: 106 },
]

interface Student {
  id: string
  first_name: string
  year_level: number
  school_name: string
  current_atar_estimate: number
  target_atar: number
  curriculum_code: string
}

interface SubjectHealth {
  subject: string
  understanding_score: number
  application_score: number
  exam_technique_score: number
  time_management_score: number
  confidence_score: number
}

interface Narrative {
  narrative_en: string
  generated_at: string
}

interface Alert {
  message: string
  severity: string
}

interface EnrichedStudent extends Student {
  subjects: SubjectHealth[]
  narrative: Narrative | null
  alerts: Alert[]
}

export default function ParentDashboard() {
  const [email, setEmail] = useState('')
  const [students, setStudents] = 
    useState<EnrichedStudent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const sb = getSupabase()
      const key = 
        'sb-htqldlyejnloaiwkgirj-auth-token'
      const stored = localStorage.getItem(key)
      if (!stored) {
        setLoading(false)
        return
      }
      
      const parsed = JSON.parse(stored)
      const userEmail = parsed?.user?.email || ''
      setEmail(userEmail)
      
      const familyId = DEMO_FAMILY_MAP[userEmail]
      if (!familyId) {
        setLoading(false)
        return
      }
      
      const { data: studentsData } = await sb
        .from('students')
        .select('*')
        .eq('family_id', familyId)
      
      if (!studentsData) {
        setLoading(false)
        return
      }
      
      const enriched = await Promise.all(
        studentsData.map(async (student) => {
          const [subjects, narratives, alerts] =
            await Promise.all([
            sb.from('subject_health')
              .select('*')
              .eq('student_id', student.id),
            sb.from('progress_narratives')
              .select('*')
              .eq('student_id', student.id)
              .order('generated_at', 
                { ascending: false })
              .limit(1),
            sb.from('student_alerts')
              .select('*')
              .eq('student_id', student.id)
              .eq('is_resolved', false)
          ])
          
          return {
            ...student,
            subjects: subjects.data || [],
            narrative: narratives.data?.[0] 
              || null,
            alerts: alerts.data || []
          }
        })
      )
      
      setStudents(enriched)
      setLoading(false)
    }
    
    load()
  }, [])

  const getOverallHealth = (
    subjects: SubjectHealth[]
  ) => {
    if (!subjects.length) return 0
    const avg = subjects.reduce((sum, s) => 
      sum + (
        s.understanding_score +
        s.application_score +
        s.exam_technique_score +
        s.time_management_score +
        s.confidence_score
      ) / 5, 0
    ) / subjects.length
    return Math.round(avg)
  }

  const getHealthColor = (score: number) => {
    if (score >= 70) return '#10C27A'
    if (score >= 40) return '#F59E0B'
    return '#EF4444'
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
            margin: '0 0 4px',
            color: '#F0F4FF'
          }}>
            Welcome back
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
          Loading student data...
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Students */}
        <div>
          {students.map(student => {
            const health = 
              getOverallHealth(student.subjects)
            const healthColor = 
              getHealthColor(health)
            
            return (
              <div key={student.id} style={{
                background: '#0F1629',
                border: '1px solid #1E2D4A',
                borderRadius: '12px',
                padding: '28px',
                marginBottom: '20px'
              }}>
                {/* Student header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <div>
                    <h2 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '28px',
                      margin: '0 0 6px',
                      color: '#F0F4FF'
                    }}>
                      {student.first_name}
                    </h2>
                    <p style={{
                      color: '#8B9DC3',
                      fontSize: '14px',
                      margin: 0
                    }}>
                      Year {student.year_level} · 
                      {student.school_name}
                    </p>
                  </div>
                  
                  {student.current_atar_estimate 
                    && (
                    <div style={{
                      background: '#1A2140',
                      borderRadius: '10px',
                      padding: '14px 20px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#8B9DC3',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '4px'
                      }}>
                        ATAR Track
                      </div>
                      <div style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        fontFamily: 'Georgia, serif'
                      }}>
                        <span style={{ 
                          color: '#D4A843' 
                        }}>
                          {student.current_atar_estimate}
                        </span>
                        <span style={{ 
                          color: '#4A5578',
                          fontSize: '16px',
                          margin: '0 4px'
                        }}>→</span>
                        <span style={{ 
                          color: '#10C27A' 
                        }}>
                          {student.target_atar}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Health score */}
                <div style={{
                  background: '#1A2140',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        color: '#8B9DC3',
                        marginBottom: '4px'
                      }}>
                        Overall Health
                      </div>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: healthColor
                      }}>
                        {health}%
                      </div>
                    </div>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: `conic-gradient(${healthColor} ${health * 3.6}deg, #1E2D4A 0deg)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: '#1A2140',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: healthColor
                        }}>
                          {health}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subjects */}
                {student.subjects.length > 0 && (
                  <div style={{
                    marginBottom: '20px'
                  }}>
                    <h3 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '18px',
                      margin: '0 0 12px',
                      color: '#F0F4FF'
                    }}>
                      Subject Performance
                    </h3>
                    <div style={{
                      display: 'grid',
                      gap: '8px'
                    }}>
                      {student.subjects.map(subject => {
                        const subjectHealth = (
                          subject.understanding_score +
                          subject.application_score +
                          subject.exam_technique_score +
                          subject.time_management_score +
                          subject.confidence_score
                        ) / 5
                        
                        return (
                          <div key={subject.subject} style={{
                            background: '#1A2140',
                            borderRadius: '8px',
                            padding: '12px'
                          }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <span style={{
                                fontSize: '14px',
                                color: '#F0F4FF'
                              }}>
                                {subject.subject}
                              </span>
                              <span style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: getHealthColor(subjectHealth)
                              }}>
                                {Math.round(subjectHealth)}%
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Alerts */}
                {student.alerts.length > 0 && (
                  <div style={{
                    marginBottom: '20px'
                  }}>
                    <h3 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '18px',
                      margin: '0 0 12px',
                      color: '#F0F4FF'
                    }}>
                      Alerts
                    </h3>
                    {student.alerts.map(alert => (
                      <div key={alert.message} style={{
                        background: alert.severity === 'high' 
                          ? 'rgba(239, 68, 68, 0.1)'
                          : 'rgba(245, 158, 11, 0.1)',
                        border: `1px solid ${alert.severity === 'high' 
                          ? '#EF4444' 
                          : '#F59E0B'}`,
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          fontSize: '13px',
                          color: alert.severity === 'high' 
                            ? '#EF4444' 
                            : '#F59E0B'
                        }}>
                          {alert.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Narrative */}
                {student.narrative && (
                  <div>
                    <h3 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '18px',
                      margin: '0 0 12px',
                      color: '#F0F4FF'
                    }}>
                      Progress Narrative
                    </h3>
                    <div style={{
                      background: '#1A2140',
                      borderRadius: '8px',
                      padding: '16px'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#8B9DC3'
                      }}>
                        {student.narrative.narrative_en}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#4A5578',
                        marginTop: '8px'
                      }}>
                        {new Date(student.narrative.generated_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Sidebar */}
        <div>
          {/* VCE Calendar */}
          <div style={{
            background: '#0F1629',
            border: '1px solid #1E2D4A',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              margin: '0 0 20px',
              color: '#F0F4FF'
            }}>
              VCE Calendar
            </h3>
            {VCE_DATES.map(item => (
              <div key={item.name} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid #1E2D4A'
              }}>
                <div>
                  <div style={{
                    color: '#F0F4FF',
                    fontSize: '14px',
                    fontWeight: 500
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    color: '#4A5578',
                    fontSize: '12px'
                  }}>
                    {item.date}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    color: '#D4A843',
                    fontSize: '24px',
                    fontWeight: 700,
                    fontFamily: 'Georgia, serif'
                  }}>
                    {item.days}
                  </div>
                  <div style={{
                    color: '#4A5578',
                    fontSize: '11px'
                  }}>
                    days
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
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
              Quick Actions
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <button style={{
                background: '#1A2140',
                border: '1px solid #1E2D4A',
                color: '#F0F4FF',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left'
              }}>
                Book a Session
              </button>
              <button style={{
                background: '#1A2140',
                border: '1px solid #1E2D4A',
                color: '#F0F4FF',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left'
              }}>
                View Progress Reports
              </button>
              <button style={{
                background: '#1A2140',
                border: '1px solid #1E2D4A',
                color: '#F0F4FF',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left'
              }}>
                Contact Tutor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
