'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const DEMO_FAMILY_MAP: Record<string, string> = {
  'michael@velocita-demo.com': '22222222-2222-2222-2222-222222222221',
  'linh@velocita-demo.com': '22222222-2222-2222-2222-222222222222',
  'wei@velocita-demo.com': '22222222-2222-2222-2222-222222222223',
  'raj@velocita-demo.com': '22222222-2222-2222-2222-222222222224',
}

export default function ParentDashboard() {
  const [email, setEmail] = useState('')
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
const { data: { subscription } } = 
  sb.auth.onAuthStateChange(
    async (event, session) => {
      const userEmail = 
        session?.user?.email || ''
      setEmail(userEmail)
      if (!userEmail) {
        setLoading(false)
        return
      }
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
      const familyId = 
        DEMO_FAMILY_MAP[userEmail]
      if (!familyId) {
        setLoading(false)
        return
      }
      const { data } = await sb
        .from('students')
        .select('*')
        .eq('family_id', familyId)
      if (data) setStudents(data)
      setLoading(false)
    }
  )
return () => subscription.unsubscribe()

  const VCE_DATES = [
    { name: 'VCE Exams Start', date: '2026-10-26', days: 127 },
    { name: 'ATAR Results', date: '2026-12-12', days: 174 },
    { name: 'Term 4 Start', date: '2026-10-05', days: 106 },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0E1A',
      padding: '40px',
      fontFamily: 'DM Sans, sans-serif',
      color: '#F0F4FF'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '32px'
      }}>
        <div>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            margin: '0 0 4px',
            color: '#F0F4FF'
          }}>
            Welcome back, Parent
          </h1>
          <p style={{ color: '#8B9DC3', margin: 0, fontSize: '15px' }}>
            Manage your children VCE journey
          </p>
        </div>
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
          <span style={{ color: '#8B9DC3', fontSize: '13px' }}>
            {email}
          </span>
          <button
            onClick={() => {
              supabase.auth.signOut()
              window.location.href = '/'
            }}
            style={{
              background: 'transparent',
              border: '1px solid #1E2D4A',
              color: '#8B9DC3',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '24px',
        alignItems: 'start'
      }}>
        <div>
          {loading && (
            <div style={{ color: '#8B9DC3', padding: '32px', textAlign: 'center' }}>
              Loading student data...
            </div>
          )}

          {!loading && students.length === 0 && (
            <div style={{
              background: '#0F1629',
              border: '1px solid #1E2D4A',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              color: '#8B9DC3'
            }}>
              <p>No students found</p>
              <small>Email: {email}</small>
            </div>
          )}

          {students.map(student => (
            <div key={student.id} style={{
              background: '#0F1629',
              border: '1px solid #1E2D4A',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '16px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div>
                  <h2 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '24px',
                    margin: '0 0 4px',
                    color: '#F0F4FF'
                  }}>
                    {student.first_name}
                  </h2>
                  <p style={{
                    color: '#8B9DC3',
                    fontSize: '14px',
                    margin: 0
                  }}>
                    Year {student.year_level} · {student.school_name}
                  </p>
                </div>
                {student.current_atar_estimate && (
                  <div style={{
                    background: '#1A2140',
                    borderRadius: '8px',
                    padding: '12px 20px',
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
                      <span style={{ color: '#D4A843' }}>
                        {student.current_atar_estimate}
                      </span>
                      <span style={{ 
                        color: '#4A5578',
                        fontSize: '16px',
                        margin: '0 4px'
                      }}>→</span>
                      <span style={{ color: '#10C27A' }}>
                        {student.target_atar}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  background: '#1A2140',
                  borderRadius: '20px',
                  padding: '4px 12px',
                  fontSize: '12px',
                  color: '#8B9DC3'
                }}>
                  {student.curriculum_code}
                </span>
                <span style={{
                  background: '#1A2140',
                  borderRadius: '20px',
                  padding: '4px 12px',
                  fontSize: '12px',
                  color: '#8B9DC3'
                }}>
                  {student.market_code}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: '#0F1629',
          border: '1px solid #1E2D4A',
          borderRadius: '12px',
          padding: '24px',
          position: 'sticky',
          top: '24px'
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
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: '#D4A843',
              fontSize: '52px',
              fontWeight: 700,
              fontFamily: 'Georgia, serif',
              lineHeight: 1
            }}>
              127
            </div>
            <div style={{
              color: '#8B9DC3',
              fontSize: '13px',
              marginTop: '4px'
            }}>
              VCE exams in
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
