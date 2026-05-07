'use client'

import { useEffect, useState } from 'react'

export default function ParentDashboard() {
  const [info, setInfo] = useState('Loading...')

  useEffect(() => {
    const key = 'sb-htqldlyejnloaiwkgirj-auth-token'
    const stored = localStorage.getItem(key)
    
    if (!stored) {
      setInfo('No session found. Please log in.')
      return
    }
    
    try {
      const parsed = JSON.parse(stored)
      const email = parsed?.user?.email || 'No email found'
      setInfo('Logged in as: ' + email)
    } catch(e) {
      setInfo('Error: ' + String(e))
    }
  }, [])

  return (
    <div style={{
      padding: '40px',
      background: '#0A0E1A',
      minHeight: '100vh',
      color: '#F0F4FF',
      fontFamily: 'sans-serif'
    }}>
      <h1>Parent Dashboard</h1>
      <p>{info}</p>
    </div>
  )
}
