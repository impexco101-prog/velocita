'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'parent' as 'parent' | 'tutor' | 'admin',
    university: '',
    preferredLanguage: 'en',
    consentTerms: false,
    consentAiMonitoring: false,
    consentDataUse: false,
    consentEmails: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate required consents
    if (!formData.consentTerms || !formData.consentAiMonitoring || !formData.consentDataUse) {
      setError('Please accept all required consent checkboxes')
      setLoading(false)
      return
    }

    try {
      // TODO: Implement Supabase auth signup
      console.log('Signup:', formData)
      
      // Redirect based on role
      switch (formData.role) {
        case 'parent':
          router.push('/dashboard/parent')
          break
        case 'tutor':
          router.push('/dashboard/tutor')
          break
        case 'admin':
          router.push('/admin')
          break
      }
    } catch (err) {
      setError('Failed to create account')
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
            Create Account
          </h1>
          <p className="text-[#8B9DC3]">
            Join Melbourne's most trusted VCE platform
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-cards border border-card-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                I am a:
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'parent'})}
                  className={`py-2 px-3 rounded-lg border transition-colors ${
                    formData.role === 'parent'
                      ? 'bg-gold-cta/15 border-gold-cta text-gold-cta'
                      : 'bg-transparent border-card-border text-text-primary hover:border-gold-cta'
                  }`}
                >
                  Parent
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'tutor'})}
                  className={`py-2 px-3 rounded-lg border transition-colors ${
                    formData.role === 'tutor'
                      ? 'bg-gold-cta/15 border-gold-cta text-gold-cta'
                      : 'bg-transparent border-card-border text-text-primary hover:border-gold-cta'
                  }`}
                >
                  Tutor
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'admin'})}
                  className={`py-2 px-3 rounded-lg border transition-colors ${
                    formData.role === 'admin'
                      ? 'bg-gold-cta/15 border-gold-cta text-gold-cta'
                      : 'bg-transparent border-card-border text-text-primary hover:border-gold-cta'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Full name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                placeholder="Enter your full name"
              />
            </div>

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
                placeholder="Create a strong password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Confirm password
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                placeholder="Confirm your password"
              />
            </div>

            {/* Role-specific fields */}
            {formData.role === 'parent' && (
              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Preferred language
                </label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({...formData, preferredLanguage: e.target.value})}
                  className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                >
                  <option value="en">English</option>
                  <option value="vi">Vietnamese</option>
                  <option value="zh-hans">Mandarin (Simplified)</option>
                  <option value="zh-hant">Mandarin (Traditional)</option>
                  <option value="ko">Korean</option>
                </select>
              </div>
            )}

            {formData.role === 'tutor' && (
              <div>
                <label className="block text-text-primary font-medium mb-2">
                  University
                </label>
                <select
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                >
                  <option value="">Select your university</option>
                  <option value="University of Melbourne">University of Melbourne</option>
                  <option value="Monash University">Monash University</option>
                  <option value="RMIT University">RMIT University</option>
                  <option value="Deakin University">Deakin University</option>
                  <option value="La Trobe University">La Trobe University</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}

            {/* Referral Code */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Referral code (optional)
              </label>
              <input
                type="text"
                value={formData.referralCode || ''}
                onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
                className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                placeholder="Enter referral code if you have one"
              />
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  checked={formData.consentTerms}
                  onChange={(e) => setFormData({...formData, consentTerms: e.target.checked})}
                  className="mr-3 mt-1 w-4 h-4 text-gold-cta bg-[#1A2140] border-gray-600 rounded focus:ring-gold-cta"
                />
                <span className="text-sm text-text-primary">
                  I agree to Velocita's Terms of Service and Privacy Policy (required)
                </span>
              </label>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  checked={formData.consentAiMonitoring}
                  onChange={(e) => setFormData({...formData, consentAiMonitoring: e.target.checked})}
                  className="mr-3 mt-1 w-4 h-4 text-gold-cta bg-[#1A2140] border-gray-600 rounded focus:ring-gold-cta"
                />
                <span className="text-sm text-text-primary">
                  I consent to AI monitoring of tutoring sessions for safety and quality purposes (required for all users)
                </span>
              </label>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  checked={formData.consentDataUse}
                  onChange={(e) => setFormData({...formData, consentDataUse: e.target.checked})}
                  className="mr-3 mt-1 w-4 h-4 text-gold-cta bg-[#1A2140] border-gray-600 rounded focus:ring-gold-cta"
                />
                <span className="text-sm text-text-primary">
                  I consent to my child's learning data being used to improve ATAR predictions (required for parents)
                </span>
              </label>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.consentEmails}
                  onChange={(e) => setFormData({...formData, consentEmails: e.target.checked})}
                  className="mr-3 mt-1 w-4 h-4 text-gold-cta bg-[#1A2140] border-gray-600 rounded focus:ring-gold-cta"
                />
                <span className="text-sm text-text-primary">
                  I would like to receive weekly progress reports and platform updates via email (optional)
                </span>
              </label>
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
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-[#8B9DC3]">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-gold-cta hover:text-yellow-500 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
