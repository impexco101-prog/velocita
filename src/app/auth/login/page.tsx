'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await getSupabase()
        .auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        })

      console.log('Login result:', data, error)
      console.log('Session:', data?.session)

      if (error) {
        setError(error.message)
        return
      }

      if (data.session) {
        // Session is stored automatically by Supabase in localStorage
        // Check user role and redirect accordingly
        const TUTOR_EMAILS = [
          'emma@velocita-demo.com',
          'james@velocita-demo.com', 
          'priya@velocita-demo.com'
        ]
        
        const userEmail = data.session.user.email
        if (TUTOR_EMAILS.includes(userEmail || '')) {
          window.location.href = '/dashboard/tutor'
        } else {
          window.location.href = '/dashboard/parent'
        }
      } else {
        setError('Login failed: No session created')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-gold-cta mr-2">↑</span>
            <span className="text-2xl font-playfair font-bold text-gold-cta">
              Velocita
            </span>
          </div>
          <h1 className="text-3xl font-playfair font-bold text-text-primary mb-2">
            Welcome Back
          </h1>
          <p className="text-[#8B9DC3]">
            Sign in to your Velocita account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-cards border border-card-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                placeholder="Enter your password"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 text-gold-cta bg-[#1A2140] border-gray-600 rounded focus:ring-gold-cta"
                />
                <span className="text-text-primary text-sm">Remember me</span>
              </label>
              <Link 
                href="/auth/forgot-password" 
                className="text-gold-cta hover:text-yellow-500 text-sm transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-cta hover:bg-yellow-500 text-background font-bold py-3 px-6 rounded-[6px] transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-[#8B9DC3]">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-gold-cta hover:text-yellow-500 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
