-- Comprehensive Audit and Compliance System for Velocita
-- Australian Privacy Act and Working With Children legislation compliant

-- 1. MASTER AUDIT LOG TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Who did it
  actor_id UUID REFERENCES profiles(id),
  actor_role TEXT,
  actor_ip TEXT,
  actor_user_agent TEXT,
  
  -- What they did
  action TEXT NOT NULL,
  action_category TEXT CHECK (
    action_category IN (
      'auth',
      'data_access',
      'data_modification',
      'financial',
      'safety',
      'consent',
      'admin',
      'ai_interaction',
      'booking',
      'verification'
    )
  ),
  
  -- What it affected
  resource_type TEXT,
  resource_id UUID,
  
  -- The detail
  old_values JSONB,
  new_values JSONB,
  metadata JSONB,
  
  -- Result
  status TEXT CHECK (status IN (
    'success', 'failed', 'blocked'
  )),
  failure_reason TEXT,
  
  -- When
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Integrity
  checksum TEXT
);

-- This table must NEVER be updated or deleted
-- Only INSERT is allowed
CREATE POLICY "audit_logs_insert_only" 
ON audit_logs FOR INSERT
TO authenticated WITH CHECK (TRUE);

CREATE POLICY "audit_logs_admin_read"
ON audit_logs FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Index for fast querying
CREATE INDEX IF NOT EXISTS idx_audit_actor 
  ON audit_logs(actor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_resource 
  ON audit_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_category 
  ON audit_logs(action_category, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_created 
  ON audit_logs(created_at DESC);

-- 2. CONSENT MANAGEMENT TABLE
CREATE TABLE IF NOT EXISTS consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  profile_id UUID REFERENCES profiles(id),
  
  consent_type TEXT CHECK (consent_type IN (
    'terms_of_service',
    'privacy_policy',
    'ai_session_monitoring',
    'session_recording',
    'data_analytics',
    'marketing_emails',
    'parent_reports',
    'outcome_data_use',
    'wwcc_verification',
    'guarantee_terms'
  )),
  
  version TEXT NOT NULL,
  consented BOOLEAN NOT NULL,
  consented_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  
  -- For withdrawal of consent
  withdrawn_at TIMESTAMPTZ,
  withdrawal_reason TEXT
);

CREATE INDEX IF NOT EXISTS idx_consent_profile 
  ON consent_records(profile_id, consent_type);

-- 3. DATA ACCESS LOG
CREATE TABLE IF NOT EXISTS data_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  accessor_id UUID REFERENCES profiles(id),
  accessor_role TEXT,
  
  data_subject_id UUID,
  data_subject_type TEXT,
  
  data_type TEXT,
  access_reason TEXT,
  
  accessed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT
);

-- 4. FINANCIAL AUDIT TABLE
CREATE TABLE IF NOT EXISTS financial_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  transaction_type TEXT CHECK (
    transaction_type IN (
      'subscription_created',
      'subscription_renewed',
      'subscription_cancelled',
      'subscription_paused',
      'session_payment',
      'tutor_payout',
      'refund_issued',
      'guarantee_refund',
      'referral_reward',
      'credit_added',
      'credit_used'
    )
  ),
  
  family_id UUID REFERENCES family_accounts(id),
  tutor_id UUID REFERENCES profiles(id),
  
  amount_aud DECIMAL(10,2),
  stripe_transaction_id TEXT,
  stripe_event_id TEXT,
  
  description TEXT,
  metadata JSONB,
  
  status TEXT CHECK (status IN (
    'pending',
    'completed', 
    'failed',
    'refunded'
  )),
  
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  processed_by UUID REFERENCES profiles(id)
);

-- 5. WWCC AND VERIFICATION AUDIT
CREATE TABLE IF NOT EXISTS verification_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  tutor_id UUID REFERENCES profiles(id),
  
  verification_type TEXT CHECK (
    verification_type IN (
      'wwcc_submitted',
      'wwcc_verified',
      'wwcc_expired',
      'wwcc_revoked',
      'myequals_requested',
      'myequals_verified',
      'myequals_failed',
      'police_check_submitted',
      'police_check_cleared',
      'police_check_flagged',
      'identity_verified',
      'identity_failed'
    )
  ),
  
  verification_number TEXT,
  verified_by TEXT,
  expiry_date DATE,
  
  document_reference TEXT,
  notes TEXT,
  
  status TEXT CHECK (status IN (
    'pending',
    'verified',
    'failed',
    'expired',
    'revoked'
  )),
  
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  verified_by_admin UUID REFERENCES profiles(id)
);

-- 6. SESSION AUDIT TABLE
CREATE TABLE IF NOT EXISTS session_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  booking_id UUID REFERENCES bookings(id),
  student_id UUID REFERENCES students(id),
  tutor_id UUID REFERENCES profiles(id),
  
  session_type TEXT CHECK (session_type IN (
    'human_tutoring',
    'ai_socratic',
    'ai_homework_analysis',
    'ai_quiz',
    'ai_session_prep'
  )),
  
  -- Timing
  scheduled_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  duration_minutes INTEGER,
  
  -- Safety
  tutor_wwcc_verified BOOLEAN,
  tutor_wwcc_number TEXT,
  ai_monitoring_active BOOLEAN,
  
  -- Content summary
  topics_covered TEXT[],
  integrity_score DECIMAL(4,2),
  flags_raised INTEGER DEFAULT 0,
  
  -- Outcome
  session_completed BOOLEAN,
  cancellation_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. INCIDENT AND SAFETY AUDIT
CREATE TABLE IF NOT EXISTS incident_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  incident_id UUID REFERENCES safety_incidents(id),
  
  action TEXT,
  action_taken_by UUID REFERENCES profiles(id),
  action_taken_at TIMESTAMPTZ DEFAULT NOW(),
  
  previous_status TEXT,
  new_status TEXT,
  
  notes TEXT,
  internal_notes TEXT,
  
  notifications_sent TEXT[],
  escalated_to TEXT,
  
  resolution TEXT,
  resolved_at TIMESTAMPTZ
);

-- 8. DATA RETENTION AND DELETION LOG
CREATE TABLE IF NOT EXISTS data_lifecycle_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  record_type TEXT,
  record_id UUID,
  
  action TEXT CHECK (action IN (
    'created',
    'anonymised',
    'deleted',
    'exported',
    'retention_extended',
    'retention_expired'
  )),
  
  reason TEXT,
  requested_by UUID REFERENCES profiles(id),
  approved_by UUID REFERENCES profiles(id),
  
  retention_period_days INTEGER,
  scheduled_deletion_date DATE,
  
  performed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all audit tables
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_lifecycle_log ENABLE ROW LEVEL SECURITY;
