import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

export type DiagnosticResult = {
  id: string
  year_level: number
  subjects: unknown[]
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
