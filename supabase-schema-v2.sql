-- Core Architecture Schema for Velocita
-- This file contains all tables for the complete system

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  role TEXT CHECK (role IN ('parent', 'tutor', 'admin')),
  university TEXT,
  language_preference TEXT DEFAULT 'en' CHECK (language_preference IN ('en', 'vi', 'zh-hans', 'zh-hant', 'ko')),
  referral_code TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Family Accounts
CREATE TABLE IF NOT EXISTS family_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES profiles(id),
  family_name TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID REFERENCES family_accounts(id),
  first_name TEXT,
  year_level INTEGER,
  school_name TEXT,
  current_atar_estimate DECIMAL(4,2),
  target_atar DECIMAL(4,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tutor Profiles with Safety
CREATE TABLE IF NOT EXISTS tutor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id),
  subjects TEXT[],
  hourly_rate DECIMAL(8,2),
  availability JSONB,
  wwcc_status TEXT CHECK (wwcc_status IN ('pending', 'verified', 'expired')) DEFAULT 'pending',
  wwcc_number TEXT,
  wwcc_verified_at TIMESTAMPTZ,
  is_safety_cleared BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Safety Incidents
CREATE TABLE IF NOT EXISTS safety_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_by UUID REFERENCES profiles(id),
  tutor_id UUID REFERENCES profiles(id),
  student_id UUID REFERENCES students(id),
  description TEXT,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- VCE Calendar
CREATE TABLE IF NOT EXISTS vce_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT,
  event_type TEXT CHECK (event_type IN ('sac', 'exam', 'results', 'enrolment', 'term_start', 'term_end')),
  subject TEXT,
  year_level INTEGER,
  event_date DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subject Health Scores
CREATE TABLE IF NOT EXISTS subject_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  subject TEXT,
  understanding_score INTEGER DEFAULT 50,
  application_score INTEGER DEFAULT 50,
  exam_technique_score INTEGER DEFAULT 50,
  time_management_score INTEGER DEFAULT 50,
  confidence_score INTEGER DEFAULT 50,
  overall_score INTEGER GENERATED ALWAYS AS (
    (understanding_score + application_score + 
     exam_technique_score + time_management_score + 
     confidence_score) / 5
  ) STORED,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- ATAR Goals (Guarantee Engine - Inactive)
CREATE TABLE IF NOT EXISTS atar_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  tutor_id UUID REFERENCES profiles(id),
  start_date DATE,
  target_date DATE,
  starting_estimate DECIMAL(4,2),
  target_atar DECIMAL(4,2),
  sessions_recommended INTEGER,
  sessions_completed INTEGER DEFAULT 0,
  is_guarantee_eligible BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'achieved', 'missed', 'refund_issued')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Goal Milestones
CREATE TABLE IF NOT EXISTS goal_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES atar_goals(id),
  week_number INTEGER,
  expected_score DECIMAL(4,2),
  actual_score DECIMAL(4,2),
  on_track BOOLEAN,
  checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID REFERENCES family_accounts(id),
  tier TEXT CHECK (tier IN ('ai_foundation', 'hybrid_accelerator', 'elite_atar')),
  billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'annual')),
  monthly_price DECIMAL(8,2),
  annual_price DECIMAL(8,2),
  sessions_included INTEGER,
  sessions_used INTEGER DEFAULT 0,
  sessions_rolled_over INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  pause_until DATE,
  stripe_subscription_id TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  next_billing_at TIMESTAMPTZ
);

-- Referrals
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES profiles(id),
  referred_id UUID REFERENCES profiles(id),
  referral_code TEXT UNIQUE,
  reward_issued BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student Alerts
CREATE TABLE IF NOT EXISTS student_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  alert_type TEXT CHECK (alert_type IN ('missed_session', 'declining_scores', 'low_ai_engagement', 'goal_at_risk', 'wwcc_expiring')),
  severity TEXT CHECK (severity IN ('info', 'warning', 'critical')),
  message TEXT,
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress Narratives
CREATE TABLE IF NOT EXISTS progress_narratives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  week_number INTEGER,
  narrative_en TEXT,
  narrative_vi TEXT,
  narrative_zh TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  sent_to_parent BOOLEAN DEFAULT FALSE
);

-- Velocity Scores
CREATE TABLE IF NOT EXISTS velocity_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES profiles(id),
  score DECIMAL(5,2) DEFAULT 0,
  sessions_count INTEGER DEFAULT 0,
  avg_atar_improvement DECIMAL(4,2) DEFAULT 0,
  student_retention_rate DECIMAL(4,2) DEFAULT 0,
  parent_satisfaction_avg DECIMAL(4,2) DEFAULT 0,
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert VCE Calendar 2026 Dates
INSERT INTO vce_calendar (event_name, event_type, event_date, description) VALUES
('Term 3 Start', 'term_start', '2026-07-13', 'VCE Term 3 begins'),
('Term 3 End', 'term_end', '2026-09-18', 'VCE Term 3 ends'),
('Term 4 Start', 'term_start', '2026-10-05', 'VCE Term 4 begins'),
('VCE Exams Start', 'exam', '2026-10-26', 'VCE written examinations begin'),
('VCE Exams End', 'exam', '2026-11-20', 'VCE written examinations end'),
('ATAR Results', 'results', '2026-12-12', 'ATAR results released');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_students_family_id ON students(family_id);
CREATE INDEX IF NOT EXISTS idx_tutor_profiles_profile_id ON tutor_profiles(profile_id);
CREATE INDEX IF NOT EXISTS idx_subject_health_student_id ON subject_health(student_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_family_id ON subscriptions(family_id);
CREATE INDEX IF NOT EXISTS idx_student_alerts_student_id ON student_alerts(student_id);
CREATE INDEX IF NOT EXISTS idx_progress_narratives_student_id ON progress_narratives(student_id);
CREATE INDEX IF NOT EXISTS idx_velocity_scores_tutor_id ON velocity_scores(tutor_id);
CREATE INDEX IF NOT EXISTS idx_vce_calendar_event_date ON vce_calendar(event_date);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE atar_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_narratives ENABLE ROW LEVEL SECURITY;
ALTER TABLE velocity_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic - will be refined with authentication)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Parents can view own family" ON family_accounts FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "Parents can view own students" ON students FOR SELECT USING (family_id IN (SELECT id FROM family_accounts WHERE parent_id = auth.uid()));
