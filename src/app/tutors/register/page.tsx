'use client'

import Link from 'next/link'
import { useState } from 'react'

const vceSubjects = [
  'Mathematical Methods',
  'Specialist Mathematics',
  'English Language',
  'English Literature',
  'Biology',
  'Chemistry',
  'Physics',
  'Psychology',
  'Business Management',
  'Accounting',
  'Economics',
  'Legal Studies',
  'History',
  'Geography',
  'Physical Education',
  'Health and Human Development'
]

export default function TutorRegister() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    degree: '',
    yearOfStudy: '',
    subjects: [] as string[],
    hourlyRate: 65,
    availability: {
      mondayFridayMornings: false,
      mondayFridayAfternoons: false,
      mondayFridayEvenings: false,
      saturday: false,
      sunday: false
    },
    aboutYourself: '',
    workingWithChildrenCheck: '',
    howDidYouHear: ''
  })

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Tutor registration:', formData)
    // Handle form submission here
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
            <Link 
              href="/" 
              className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-text-primary mb-4">
            Become a Velocita Tutor
          </h1>
          <p className="text-lg text-[#8B9DC3] max-w-2xl mx-auto">
            Join Melbourne's most verified tutoring platform. Earn more, teach smarter.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <h3 className="text-xl font-playfair font-bold text-gold-cta mb-3">
              Earn $65-95/hour
            </h3>
            <p className="text-[#8B9DC3]">
              Set your own schedule. We handle all bookings and admin.
            </p>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <h3 className="text-xl font-playfair font-bold text-gold-cta mb-3">
              AI Session Prep
            </h3>
            <p className="text-[#8B9DC3]">
              Walk into every session knowing exactly what your student needs.
            </p>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <h3 className="text-xl font-playfair font-bold text-gold-cta mb-3">
              Build Your Reputation
            </h3>
            <p className="text-[#8B9DC3]">
              Verified credentials and outcome tracking build your professional profile.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-cards border border-card-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
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

              {/* Phone */}
              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                  placeholder="04xx xxx xxx"
                />
              </div>

              {/* University */}
              <div>
                <label className="block text-text-primary font-medium mb-2">
                  University
                </label>
                <select
                  required
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

              {/* Degree/Course */}
              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Degree/Course
                </label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({...formData, degree: e.target.value})}
                  className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                  placeholder="e.g., Bachelor of Science"
                />
              </div>

              {/* Year of Study */}
              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Year of study
                </label>
                <select
                  required
                  value={formData.yearOfStudy}
                  onChange={(e) => setFormData({...formData, yearOfStudy: e.target.value})}
                  className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                >
                  <option value="">Select year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Subjects you can teach
              </label>
              <div className="flex flex-wrap gap-2">
                {vceSubjects.map(subject => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => handleSubjectToggle(subject)}
                    className={`px-4 py-2 rounded-full text-sm border transition-all ${
                      formData.subjects.includes(subject)
                        ? 'bg-gold-cta/15 border-gold-cta text-gold-cta'
                        : 'bg-cards border-card-border text-text-primary hover:border-gold-cta'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Hourly rate preference: <span className="text-gold-cta font-bold">${formData.hourlyRate}</span>
              </label>
              <input
                type="range"
                min="45"
                max="120"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({...formData, hourlyRate: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{background: `linear-gradient(to right, #D4A843 0%, #D4A843 ${((formData.hourlyRate - 45) / 75) * 100}%, #374151 ${((formData.hourlyRate - 45) / 75) * 100}%, #374151 100%)`}}
              />
              <div className="flex justify-between text-xs text-[#8B9DC3] mt-2">
                <span>$45</span>
                <span>$120</span>
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Availability
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.availability.mondayFridayMornings}
                    onChange={(e) => setFormData({
                      ...formData,
                      availability: {...formData.availability, mondayFridayMornings: e.target.checked}
                    })}
                    className="mr-3 w-4 h-4 text-gold-cta bg-[#1A2140] border-gray-600 rounded focus:ring-gold-cta"
                  />
                  <span className="text-text-primary">Monday-Friday mornings</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.availability.mondayFridayAfternoons}
                    onChange={(e) => setFormData({
                      ...formData,
                      availability: {...formData.availability, mondayFridayAfternoons: e.target.checked}
                    })}
                    className="mr-3 w-4 h-4 text-gold-cta bg-[#1A2140] border-gray-600 rounded focus:ring-gold-cta"
                  />
                  <span className="text-text-primary">Monday-Friday afternoons</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.availability.mondayFridayEvenings}
                    onChange={(e) => setFormData({
                      ...formData,
                      availability: {...formData.availability, mondayFridayEvenings: e.target.checked}
                    })}
                    className="mr-3 w-4 h-4 text-gold-cta bg-[#1A2140] border-gray-600 rounded focus:ring-gold-cta"
                  />
                  <span className="text-text-primary">Monday-Friday evenings</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.availability.saturday}
                    onChange={(e) => setFormData({
                      ...formData,
                      availability: {...formData.availability, saturday: e.target.checked}
                    })}
                    className="mr-3 w-4 h-4 text-gold-cta bg-[#1A2140] border-gray-600 rounded focus:ring-gold-cta"
                  />
                  <span className="text-text-primary">Saturday</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.availability.sunday}
                    onChange={(e) => setFormData({
                      ...formData,
                      availability: {...formData.availability, sunday: e.target.checked}
                    })}
                    className="mr-3 w-4 h-4 text-gold-cta bg-[#1A2140] border-gray-600 rounded focus:ring-gold-cta"
                  />
                  <span className="text-text-primary">Sunday</span>
                </label>
              </div>
            </div>

            {/* About Yourself */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                About yourself
              </label>
              <textarea
                required
                rows={4}
                value={formData.aboutYourself}
                onChange={(e) => setFormData({...formData, aboutYourself: e.target.value})}
                className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                placeholder="Tell students and parents about your teaching style and experience"
              />
            </div>

            {/* Working With Children Check */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                Working With Children Check number
              </label>
              <input
                type="text"
                required
                value={formData.workingWithChildrenCheck}
                onChange={(e) => setFormData({...formData, workingWithChildrenCheck: e.target.value})}
                className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
                placeholder="WWC-XXXXXXX"
              />
            </div>

            {/* How did you hear about us */}
            <div>
              <label className="block text-text-primary font-medium mb-2">
                How did you hear about us?
              </label>
              <select
                required
                value={formData.howDidYouHear}
                onChange={(e) => setFormData({...formData, howDidYouHear: e.target.value})}
                className="w-full px-4 py-3 bg-[#1A2140] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta focus:border-transparent text-text-primary"
              >
                <option value="">Select an option</option>
                <option value="Google">Google</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend">Friend</option>
                <option value="University">University</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gold-cta hover:bg-yellow-500 text-background font-bold py-4 px-6 rounded-[6px] transition-colors text-lg"
            >
              Apply to Join Velocita →
            </button>
          </form>

          <div className="text-center mt-8 text-sm text-[#8B9DC3]">
            We review all applications within 48 hours. Verification through My eQuals required upon acceptance.
          </div>
        </div>
      </div>
    </div>
  )
}
