import { createClient } from '@supabase/supabase-js'

let client: ReturnType<typeof createClient> | null = null

export function getSupabase() {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return client
}

export type DiagnosticResult = {
  id: string
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
