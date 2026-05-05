'use client'

import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [diagnosticResults, setDiagnosticResults] = useState<any[]>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch data from Supabase
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-text flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-cards p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold mb-2">Current ATAR</h3>
            <p className="text-3xl font-bold text-gold-cta">--</p>
            <p className="text-sm text-gray-400 mt-1">No data available</p>
          </div>
          
          <div className="bg-cards p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold mb-2">Target ATAR</h3>
            <p className="text-3xl font-bold text-success-green">--</p>
            <p className="text-sm text-gray-400 mt-1">Set your goal</p>
          </div>
          
          <div className="bg-cards p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold mb-2">Study Hours/Week</h3>
            <p className="text-3xl font-bold text-text">--</p>
            <p className="text-sm text-gray-400 mt-1">Track your progress</p>
          </div>
        </div>

        <div className="bg-cards p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Recent Assessments</h2>
          <div className="text-center py-8 text-gray-400">
            <p className="mb-4">No diagnostic results yet</p>
            <a 
              href="/diagnostic" 
              className="inline-block bg-gold-cta hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Take Assessment
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-cards p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Math</span>
                  <span className="text-sm">--%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gold-cta h-2 rounded-full" style={{width: '0%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">English</span>
                  <span className="text-sm">--%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gold-cta h-2 rounded-full" style={{width: '0%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cards p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Study Recommendations</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Complete your diagnostic assessment to get personalized recommendations</li>
              <li>• Set a consistent study schedule</li>
              <li>• Focus on areas where you need improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
