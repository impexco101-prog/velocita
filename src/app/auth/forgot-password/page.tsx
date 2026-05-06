'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // TODO: Implement Supabase password reset
      console.log('Password reset for:', email)
      setSuccess(true)
    } catch (err) {
      setError('Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-gold-cta mr-2">↑</span>
              <span className="text-2xl font-playfair font-bold text-gold-cta">
                Velocita
              </span>
            </div>
            <h1 className="text-3xl font-playfair font-bold text-text-primary mb-2">
              Check Your Email
            </h1>
            <p className="text-[#8B9DC3]">
              We've sent password reset instructions to your email
            </p>
          </div>

          <div className="bg-cards border border-card-border rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-text-primary mb-6">
              Password reset link sent to:<br />
              <span className="font-mono text-gold-cta">{email}</span>
            </p>
            <Link 
              href="/auth/login" 
              className="inline-block bg-gold-cta hover:bg-yellow-500 text-background font-bold py-3 px-6 rounded-[6px] transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    )
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
            Reset Password
          </h1>
          <p className="text-[#8B9DC3]">
            Enter your email to receive reset instructions
          </p>
        </div>

        {/* Forgot Password Form */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                placeholder="your.email@example.com"
              />
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
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <Link 
              href="/auth/login" 
              className="text-[#8B9DC3] hover:text-gold-cta transition-colors"
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
