// Smart Matching Foundation for Velocita

export interface Tutor {
  id: string
  name: string
  subjects: string[]
  availability: Record<string, unknown>
  velocity_score: number
  languages: string[]
  hourly_rate: number
}

export interface StudentProfile {
  id: string
  name: string
  subjects: string[]
  availability: Record<string, unknown>
  language_preference: string
  target_atar: number
}

export interface MatchScore {
  tutor: Tutor
  score: number
  breakdown: {
    subject_match: number
    schedule_match: number
    velocity_bonus: number
    language_bonus: number
  }
}

/**
 * Calculate match score between tutor and student
 * @param tutor - Tutor profile
 * @param studentProfile - Student profile
 * @returns Match score with breakdown
 */
export function getMatchScore(tutor: Tutor, studentProfile: StudentProfile): MatchScore {
  let score = 0
  let subject_match = 0
  let schedule_match = 0
  let velocity_bonus = 0
  let language_bonus = 0

  // Subject matching (40 points max)
  const commonSubjects = tutor.subjects.filter(subject => 
    studentProfile.subjects.includes(subject)
  )
  if (commonSubjects.length > 0) {
    subject_match = 40
    score += subject_match
  }

  // Schedule matching (25 points max)
  // Simplified schedule matching - in real implementation this would be more complex
  if (tutor.availability && studentProfile.availability) {
    schedule_match = 25 // Assume some overlap for now
    score += schedule_match
  }

  // Velocity score bonus (up to 20 points)
  velocity_bonus = Math.min(tutor.velocity_score * 0.2, 20)
  score += velocity_bonus

  // Language matching (15 points max)
  if (tutor.languages.includes(studentProfile.language_preference)) {
    language_bonus = 15
    score += language_bonus
  }

  return {
    tutor,
    score,
    breakdown: {
      subject_match,
      schedule_match,
      velocity_bonus,
      language_bonus
    }
  }
}

/**
 * Get ranked list of tutors for a student
 * @param tutors - List of available tutors
 * @param studentProfile - Student profile
 * @param subject - Optional subject filter
 * @returns Ranked list of match scores
 */
export function getRankedTutors(
  tutors: Tutor[], 
  studentProfile: StudentProfile, 
  subject?: string
): MatchScore[] {
  // Filter tutors by subject if specified
  let filteredTutors = tutors
  if (subject) {
    filteredTutors = tutors.filter(tutor => tutor.subjects.includes(subject))
  }

  // Calculate match scores
  const matchScores = filteredTutors.map(tutor => 
    getMatchScore(tutor, studentProfile)
  )

  // Sort by score (highest first)
  return matchScores.sort((a, b) => b.score - a.score)
}

/**
 * Generate unique referral code
 * @param userId - User ID
 * @returns Unique referral code
 */
export function generateReferralCode(userId: string): string {
  const prefix = 'VLC'
  const hash = userId.slice(-8).toUpperCase()
  return `${prefix}${hash}`
}

/**
 * Template-based progress narrative generator
 * @param studentData - Student progress data
 * @returns Generated narrative
 */
export function generateProgressNarrative(studentData: unknown): {
  narrative_en: string
  narrative_vi: string
  narrative_zh: string
} {
  const { name, subject, progress_improvement, speed_improvement, next_focus } = studentData

  const narrative_en = `This week ${name} focused on ${subject}. ${progress_improvement}. ${speed_improvement}. ${next_focus}.`
  
  const narrative_vi = `Tuần này ${name} đã tập trung vào ${subject}. ${progress_improvement}. ${speed_improvement}. ${next_focus}.`
  
  const narrative_zh = `本周${name}专注于${subject}。${progress_improvement}。${speed_improvement}。${next_focus}。`

  return {
    narrative_en,
    narrative_vi,
    narrative_zh
  }
}
