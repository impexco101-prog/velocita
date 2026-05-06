'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { getRankedTutors } from '@/lib/matching'

interface DiagnosticData {
  year_level: string
  subjects: string[]
  current_atar: number
  target_atar: number
  math_answers: number[]
  english_answers: number[]
  study_hours: number
  has_tutor: boolean
  challenge: string
  email: string
}

const vceSubjects = [
  'English', 'Mathematical Methods', 'Specialist Maths', 'Chemistry', 
  'Physics', 'Biology', 'Psychology', 'Business Management', 
  'Accounting', 'Economics', 'Legal Studies', 'Health & Human Development'
]

const mathQuestions = [
  {
    question: "What is the derivative of f(x) = 3x² + 2x - 5?",
    options: ["6x + 2", "3x + 2", "6x² + 2x", "3x² + 2"],
    correct: 0
  },
  {
    question: "Solve: log₂(x) = 4",
    options: ["8", "16", "2", "4"],
    correct: 1
  },
  {
    question: "∫(2x + 3)dx = ?",
    options: ["x² + 3x + C", "x² + 3x", "2x² + 3x + C", "x² + 3"],
    correct: 0
  },
  {
    question: "sin(30°) = ?",
    options: ["√3/2", "1/2", "√2/2", "1"],
    correct: 1
  },
  {
    question: "A bag contains 3 red and 2 blue balls. Probability of drawing red?",
    options: ["3/5", "2/5", "1/2", "3/2"],
    correct: 0
  }
]

const englishQuestions = [
  {
    question: "What is a 'metaphor'?",
    options: [
      "Direct comparison without 'like' or 'as'",
      "Comparison using 'like' or 'as'",
      "Exaggeration for effect",
      "Giving human qualities to objects"
    ],
    correct: 0
  },
  {
    question: "Which is the best thesis structure?",
    options: [
      "Argument + Evidence + Analysis",
      "Story + Description + Summary",
      "Opinion + Examples + Conclusion",
      "Introduction + Body + Conclusion"
    ],
    correct: 0
  },
  {
    question: "What does 'tone' refer to in literature?",
    options: [
      "Author's attitude toward subject",
      "Story's setting",
      "Character development",
      "Plot structure"
    ],
    correct: 0
  },
  {
    question: "What is 'foreshadowing'?",
    options: [
      "Hints about future events",
      "Background information",
      "Character dialogue",
      "Story resolution"
    ],
    correct: 0
  },
  {
    question: "Best way to analyze evidence?",
    options: [
      "Explain how it supports argument",
      "Summarize what happened",
      "Count how many examples",
      "List all details"
    ],
    correct: 0
  }
]

const challenges = [
  "Time management", "Understanding complex concepts", "Exam anxiety",
  "Motivation", "Study techniques", "Subject-specific difficulty", "Other"
]

export default function DiagnosticPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<DiagnosticData>({
    year_level: '',
    subjects: [],
    current_atar: 40,
    target_atar: 45,
    math_answers: [],
    english_answers: [],
    study_hours: 10,
    has_tutor: false,
    challenge: '',
    email: ''
  })
  const [mathScores, setMathScores] = useState<number[]>([])
  const [englishScores, setEnglishScores] = useState<number[]>([])
  const [predictedATAR, setPredictedATAR] = useState(0)
  const [velocitaATAR, setVelocitaATAR] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [animatedATAR, setAnimatedATAR] = useState(0)

  useEffect(() => {
    calculateATAR()
  }, [formData, mathScores, englishScores])

  useEffect(() => {
    if (currentStep === 5 && predictedATAR > 0) {
      const duration = 1500
      const steps = 60
      const increment = predictedATAR / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= predictedATAR) {
          setAnimatedATAR(Math.round(predictedATAR))
          clearInterval(timer)
        } else {
          setAnimatedATAR(Math.round(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [currentStep, predictedATAR])

  const calculateATAR = () => {
    const mathScore = mathScores.filter(a => a === 1).length * 20
    const englishScore = englishScores.filter(a => a === 1).length * 20
    const studyBonus = formData.study_hours > 15 ? 5 : formData.study_hours > 10 ? 3 : 0
    const tutorBonus = formData.has_tutor ? 3 : 0
    
    const baseATAR = formData.current_atar + (mathScore + englishScore) / 10 + studyBonus + tutorBonus
    const predicted = Math.min(99.95, Math.max(40, baseATAR))
    const velocitaBoosted = Math.min(99.95, predicted + 8.5)
    
    setPredictedATAR(predicted)
    setVelocitaATAR(velocitaBoosted)
  }

  useEffect(() => {
    if (currentStep === 5) {
      calculateATAR()
    }
  }, [currentStep])

  const handleMathAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...formData.math_answers]
    newAnswers[questionIndex] = answerIndex
    setFormData({...formData, math_answers: newAnswers})
    
    const isCorrect = answerIndex === mathQuestions[questionIndex].correct
    const newScores = [...mathScores]
    newScores[questionIndex] = isCorrect ? 1 : 0
    setMathScores(newScores)
  }

  const handleEnglishAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...formData.english_answers]
    newAnswers[questionIndex] = answerIndex
    setFormData({...formData, english_answers: newAnswers})
    
    const isCorrect = answerIndex === englishQuestions[questionIndex].correct
    const newScores = [...englishScores]
    newScores[questionIndex] = isCorrect ? 1 : 0
    setEnglishScores(newScores)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('diagnostic_results').insert({
        year_level: parseInt(formData.year_level),
        subjects: formData.subjects,
        current_atar: formData.current_atar,
        target_atar: formData.target_atar,
        math_score: mathScores.filter(a => a === 1).length * 20,
        english_score: englishScores.filter(a => a === 1).length * 20,
        study_hours: formData.study_hours,
        has_tutor: formData.has_tutor,
        challenge: formData.challenge,
        predicted_atar: predictedATAR,
        email: formData.email
      })
      
      if (error) throw error
    } catch (error) {
      console.error('Error saving diagnostic:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const renderProgressBar = () => (
    <div className="w-full h-2 bg-gray-700 rounded-full mb-8">
      <div 
        className="h-full bg-gold-cta rounded-full transition-all duration-500"
        style={{width: `${(currentStep / 5) * 100}%`}}
      />
    </div>
  )

  const renderHeader = () => (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-2">
        <span className="text-gold-cta mr-2">↑</span>
        <h1 className="text-2xl font-playfair font-bold text-gold-cta">
          Velocita
        </h1>
      </div>
      <p className="text-xs font-dm-sans text-[#4A5578] tracking-wider mb-4">
        ATAR ACCELERATION PLATFORM
      </p>
      <div className="w-24 h-px bg-gold-cta mx-auto"></div>
    </div>
  )

  const getStepLabel = () => {
    const labels = {
      1: "STEP 1 OF 5 — STUDENT PROFILE",
      2: "STEP 2 OF 5 — MATHEMATICS", 
      3: "STEP 3 OF 5 — ENGLISH",
      4: "STEP 4 OF 5 — STUDY HABITS",
      5: "STEP 5 OF 5 — YOUR RESULTS"
    }
    return labels[currentStep]
  }

  const renderStep1 = () => (
    <div className="space-y-8">
      <p className="text-xs uppercase tracking-wider text-gold-cta mb-4">{getStepLabel()}</p>
      <h2 className="text-3xl font-playfair font-bold text-text-primary">Student Profile</h2>
      
      <div>
        <label className="block text-text-primary font-medium mb-4">Year Level</label>
        <div className="flex flex-wrap gap-3">
          {['9', '10', '11', '12'].map(year => (
            <button
              key={year}
              onClick={() => setFormData({...formData, year_level: year})}
              className={`px-6 py-3 rounded-full border-2 transition-all ${
                formData.year_level === year 
                  ? 'bg-gold-cta border-gold-cta text-white' 
                  : 'bg-cards border-card-border text-text-primary hover:border-gold-cta'
              }`}
            >
              Year {year}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-text-primary font-medium mb-4">VCE Subjects</label>
        <div className="flex flex-wrap gap-2">
          {vceSubjects.map(subject => (
            <button
              key={subject}
              onClick={() => {
                const newSubjects = formData.subjects.includes(subject)
                  ? formData.subjects.filter(s => s !== subject)
                  : [...formData.subjects, subject]
                setFormData({...formData, subjects: newSubjects})
              }}
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

      <div>
        <label className="block text-text-primary font-medium mb-4">
          Current ATAR: <span className="text-gold-cta font-bold">{formData.current_atar}</span>
        </label>
        <input
          type="range"
          min="40"
          max="99"
          value={formData.current_atar}
          onChange={(e) => {
            const value = parseInt(e.target.value)
            setFormData({...formData, current_atar: value, target_atar: Math.max(value + 5, formData.target_atar)})
          }}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{background: `linear-gradient(to right, #D4A843 0%, #D4A843 ${((formData.current_atar - 40) / 59) * 100}%, #374151 ${((formData.current_atar - 40) / 59) * 100}%, #374151 100%)`}}
        />
        <div className="flex justify-between text-xs text-text-secondary mt-2">
          <span>40</span>
          <span>99</span>
        </div>
      </div>

      <div>
        <label className="block text-text-primary font-medium mb-4">
          Target ATAR: <span className="text-gold-cta font-bold">{formData.target_atar}</span>
        </label>
        <input
          type="range"
          min={formData.current_atar + 5}
          max="99"
          value={formData.target_atar}
          onChange={(e) => setFormData({...formData, target_atar: parseInt(e.target.value)})}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{background: `linear-gradient(to right, #D4A843 0%, #D4A843 ${((formData.target_atar - formData.current_atar - 5) / (99 - formData.current_atar - 5)) * 100}%, #374151 ${((formData.target_atar - formData.current_atar - 5) / (99 - formData.current_atar - 5)) * 100}%, #374151 100%)`}}
        />
        <div className="flex justify-between text-xs text-text-secondary mt-2">
          <span>{formData.current_atar + 5}</span>
          <span>99</span>
        </div>
      </div>
      
      {currentStep === 1 && (
        <div className="mt-8">
          <button
            onClick={nextStep}
            disabled={!formData.year_level || formData.subjects.length === 0}
            className="w-full bg-gold-cta hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-[14px] px-8 rounded-[6px] transition-colors"
          >
            Start Diagnostic →
          </button>
        </div>
      )}
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8">
      <p className="text-xs uppercase tracking-wider text-gold-cta mb-4">{getStepLabel()}</p>
      <h2 className="text-3xl font-playfair font-bold text-text-primary">Mathematics Quiz</h2>
      <p className="text-text-secondary">Question {formData.math_answers.length + 1} of 5</p>
      
      {mathQuestions.map((q, qIndex) => (
        formData.math_answers.length === qIndex && (
          <div key={qIndex} className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">{q.question}</h3>
            <div className="space-y-3">
              {q.options.map((option, oIndex) => {
                const isSelected = formData.math_answers[qIndex] === oIndex
                const showFeedback = isSelected
                const isCorrect = oIndex === q.correct
                
                return (
                  <button
                    key={oIndex}
                    onClick={() => handleMathAnswer(qIndex, oIndex)}
                    disabled={showFeedback}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      showFeedback
                        ? isCorrect 
                          ? 'bg-success-green/20 border-success-green text-success-green'
                          : 'bg-red-500/20 border-red-500 text-red-500'
                        : 'bg-cards border-card-border text-text-primary hover:border-gold-cta'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            {formData.math_answers[qIndex] !== undefined && (
              <button
                onClick={() => {
                  if (qIndex < mathQuestions.length - 1) {
                    handleMathAnswer(qIndex + 1, -1)
                    setFormData({...formData, math_answers: [...formData.math_answers.slice(0, qIndex + 1), undefined]})
                  } else {
                    nextStep()
                  }
                }}
                className="mt-6 bg-gold-cta hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {qIndex < mathQuestions.length - 1 ? 'Next Question' : 'Continue to English'}
              </button>
            )}
          </div>
        )
      ))}
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-8">
      <p className="text-xs uppercase tracking-wider text-gold-cta mb-4">{getStepLabel()}</p>
      <h2 className="text-3xl font-playfair font-bold text-text-primary">English Quiz</h2>
      <p className="text-text-secondary">Question {formData.english_answers.length + 1} of 5</p>
      
      {englishQuestions.map((q, qIndex) => (
        formData.english_answers.length === qIndex && (
          <div key={qIndex} className="space-y-4">
            <h3 className="text-xl font-medium text-text-primary">{q.question}</h3>
            <div className="space-y-3">
              {q.options.map((option, oIndex) => {
                const isSelected = formData.english_answers[qIndex] === oIndex
                const showFeedback = isSelected
                const isCorrect = oIndex === q.correct
                
                return (
                  <button
                    key={oIndex}
                    onClick={() => handleEnglishAnswer(qIndex, oIndex)}
                    disabled={showFeedback}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      showFeedback
                        ? isCorrect 
                          ? 'bg-success-green/20 border-success-green text-success-green'
                          : 'bg-red-500/20 border-red-500 text-red-500'
                        : 'bg-cards border-card-border text-text-primary hover:border-gold-cta'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            {formData.english_answers[qIndex] !== undefined && (
              <button
                onClick={() => {
                  if (qIndex < englishQuestions.length - 1) {
                    handleEnglishAnswer(qIndex + 1, -1)
                    setFormData({...formData, english_answers: [...formData.english_answers.slice(0, qIndex + 1), undefined]})
                  } else {
                    nextStep()
                  }
                }}
                className="mt-6 bg-gold-cta hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {qIndex < englishQuestions.length - 1 ? 'Next Question' : 'Continue to Study Habits'}
              </button>
            )}
          </div>
        )
      ))}
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-8">
      <p className="text-xs uppercase tracking-wider text-gold-cta mb-4">{getStepLabel()}</p>
      <h2 className="text-3xl font-playfair font-bold text-text-primary">Study Habits</h2>
      
      <div>
        <label className="block text-text-primary font-medium mb-4">
          Weekly Study Hours: <span className="text-gold-cta font-bold">{formData.study_hours}</span>
        </label>
        <input
          type="range"
          min="0"
          max="30"
          value={formData.study_hours}
          onChange={(e) => setFormData({...formData, study_hours: parseInt(e.target.value)})}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{background: `linear-gradient(to right, #D4A843 0%, #D4A843 ${(formData.study_hours / 30) * 100}%, #374151 ${(formData.study_hours / 30) * 100}%, #374151 100%)`}}
        />
        <div className="flex justify-between text-xs text-text-secondary mt-2">
          <span>0</span>
          <span>30</span>
        </div>
      </div>

      <div>
        <label className="block text-text-primary font-medium mb-4">Currently have a tutor?</label>
        <div className="flex gap-4">
          <button
            onClick={() => setFormData({...formData, has_tutor: true})}
            className={`px-8 py-3 rounded-lg border-2 transition-all ${
              formData.has_tutor
                ? 'bg-gold-cta border-gold-cta text-white'
                : 'bg-cards border-card-border text-text-primary hover:border-gold-cta'
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => setFormData({...formData, has_tutor: false})}
            className={`px-8 py-3 rounded-lg border-2 transition-all ${
              !formData.has_tutor
                ? 'bg-gold-cta border-gold-cta text-white'
                : 'bg-cards border-card-border text-text-primary hover:border-gold-cta'
            }`}
          >
            No
          </button>
        </div>
      </div>

      <div>
        <label className="block text-text-primary font-medium mb-4">Biggest Challenge</label>
        <div className="grid grid-cols-2 gap-3">
          {challenges.map(challenge => (
            <button
              key={challenge}
              onClick={() => setFormData({...formData, challenge})}
              className={`p-3 rounded-lg border-2 transition-all text-sm ${
                formData.challenge === challenge
                  ? 'bg-gold-cta border-gold-cta text-white'
                  : 'bg-cards border-card-border text-text-primary hover:border-gold-cta'
              }`}
            >
              {challenge}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-text-primary font-medium mb-4">Email for Results</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-3 bg-cards border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-cta text-text-primary"
          placeholder="your@email.com"
        />
      </div>
      
      {currentStep === 4 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="bg-cards border border-card-border text-text-primary font-bold py-3 px-6 rounded-lg hover:border-gold-cta transition-colors"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={!formData.email}
            className="flex-1 bg-gold-cta hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-[14px] px-8 rounded-[6px] transition-colors"
          >
            See My Results →
          </button>
        </div>
      )}
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-8">
      <p className="text-xs uppercase tracking-wider text-gold-cta mb-4">{getStepLabel()}</p>
      <h2 className="text-3xl font-playfair font-bold text-text-primary">Your ATAR Prediction</h2>
      
      <div className="text-center py-8">
        <div className="text-6xl font-playfair font-bold text-gold-cta mb-4">
          {animatedATAR}
        </div>
        <p className="text-text-secondary">Predicted ATAR</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-cards border border-card-border rounded-lg p-6">
          <h3 className="text-xl font-playfair font-bold text-gold-cta mb-2">Current Trajectory</h3>
          <div className="text-3xl font-bold text-gold-cta mb-2">{Math.round(predictedATAR)}</div>
          <p className="text-text-secondary text-sm">Based on your current study habits</p>
        </div>
        
        <div className="bg-cards border border-card-border rounded-lg p-6">
          <h3 className="text-xl font-playfair font-bold text-success-green mb-2">With Velocita</h3>
          <div className="text-3xl font-bold text-success-green mb-2">{Math.round(velocitaATAR)}</div>
          <p className="text-text-secondary text-sm">+{Math.round(velocitaATAR - predictedATAR)} with expert tutoring</p>
        </div>
      </div>

      <div className="bg-cards border border-card-border rounded-lg p-6">
        <h3 className="text-xl font-playfair font-bold text-text-primary mb-4">Subject Health</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-primary">Mathematics</span>
              <span className="text-sm text-text-primary">{mathScores.filter(a => a === 1).length * 20}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gold-cta h-2 rounded-full transition-all duration-1000"
                style={{width: `${mathScores.filter(a => a === 1).length * 20}%`}}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-primary">English</span>
              <span className="text-sm text-text-primary">{englishScores.filter(a => a === 1).length * 20}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gold-cta h-2 rounded-full transition-all duration-1000"
                style={{width: `${englishScores.filter(a => a === 1).length * 20}%`}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-insight-blue/20 border border-insight-blue rounded-lg p-6">
        <h3 className="text-xl font-playfair font-bold text-insight-blue mb-2">Key Insight</h3>
        <p className="text-text-primary">
          {formData.challenge === 'Time management' && 'With structured study sessions and expert guidance, you can optimize your study efficiency and boost your ATAR potential.'}
          {formData.challenge === 'Understanding complex concepts' && 'Our specialized tutors break down complex topics into manageable concepts, ensuring you master difficult material.'}
          {formData.challenge === 'Exam anxiety' && 'Regular practice exams and confidence-building techniques help reduce anxiety and improve performance under pressure.'}
          {formData.challenge === 'Motivation' && 'Personalized goal-setting and progress tracking keep you motivated and focused on your ATAR goals.'}
          {formData.challenge === 'Study techniques' && 'Learn proven study methods tailored to VCE subjects for maximum retention and understanding.'}
          {formData.challenge === 'Subject-specific difficulty' && 'Targeted support in your challenging subjects can significantly improve your overall ATAR.'}
          {formData.challenge === 'Other' && 'Personalized tutoring addresses your unique challenges and helps you achieve your full potential.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-gold-cta hover:bg-yellow-500 text-background font-bold py-[14px] px-8 rounded-[6px] transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Book Free Session'}
        </button>
        <Link 
          href={`/tutors?subject=${formData.subjects[0] || 'Mathematical Methods'}`}
          className="flex-1 bg-cards border border-card-border text-text-primary font-bold py-4 px-6 rounded-lg hover:border-gold-cta transition-colors text-center"
        >
          View Matched Tutors
        </Link>
      </div>
      <div className="text-center mt-8">
        <p className="text-xs text-[#4A5578]">
          Powered by Velocita Learning · velocita.com.au
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {renderHeader()}
        {renderProgressBar()}
        
        <div className="bg-cards border border-card-border rounded-lg p-8">
          <div className="animate-fade-in">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </div>
          
          {currentStep > 1 && currentStep < 5 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                className="bg-cards border border-card-border text-text-primary font-bold py-3 px-6 rounded-lg hover:border-gold-cta transition-colors"
              >
                Previous
              </button>
              {currentStep < 4 && (
                <button
                  onClick={nextStep}
                  className="bg-gold-cta hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Continue
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
