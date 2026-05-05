import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type DiagnosticResult = {
  id: string
  year_level: number
  subjects: any[]
  current_atar: number
  target_atar: number
  math_score: number
  english_score: number
  study_hours: number
  has_tutor: boolean
  challenge: string
  predicted_atar: number
  email: string
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      diagnostic_results: {
        Row: DiagnosticResult
        Insert: Omit<DiagnosticResult, 'id' | 'created_at'>
        Update: Partial<DiagnosticResult>
      }
    }
  }
}
