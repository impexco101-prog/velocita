import { getSupabase } from './supabase';

export type AuditAction = 
  | 'user.signup'
  | 'user.login'
  | 'user.logout'
  | 'user.password_reset'
  | 'profile.viewed'
  | 'profile.updated'
  | 'student.created'
  | 'student.updated'
  | 'diagnostic.completed'
  | 'booking.created'
  | 'booking.confirmed'
  | 'booking.cancelled'
  | 'booking.completed'
  | 'session.started'
  | 'session.ended'
  | 'session.flagged'
  | 'payment.processed'
  | 'payment.failed'
  | 'tutor.verification_submitted'
  | 'tutor.verification_approved'
  | 'tutor.verification_rejected'
  | 'wwcc.verified'
  | 'wwcc.expired'
  | 'consent.granted'
  | 'consent.withdrawn'
  | 'incident.reported'
  | 'incident.resolved'
  | 'data.exported'
  | 'data.deleted'
  | 'admin.action'
  | 'ai.session_started'
  | 'ai.session_flagged'
  | 'guarantee.issued'
  | 'guarantee.claimed'
  | 'guarantee.refund_approved';

export async function logAuditEvent({
  actorId,
  actorRole,
  action,
  actionCategory,
  resourceType,
  resourceId,
  oldValues,
  newValues,
  metadata,
  status = 'success',
  failureReason,
  ipAddress,
}: {
  actorId?: string;
  actorRole?: string;
  action: AuditAction;
  actionCategory: string;
  resourceType?: string;
  resourceId?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  status?: 'success' | 'failed' | 'blocked';
  failureReason?: string;
  ipAddress?: string;
}) {
  const supabase = getSupabase();
  
  await supabase.from('audit_logs').insert({
    actor_id: actorId,
    actor_role: actorRole,
    action,
    action_category: actionCategory,
    resource_type: resourceType,
    resource_id: resourceId,
    old_values: oldValues,
    new_values: newValues,
    metadata,
    status,
    failure_reason: failureReason,
    actor_ip: ipAddress,
    created_at: new Date().toISOString(),
  });
}

export async function logConsent({
  profileId,
  consentType,
  version,
  consented,
  ipAddress,
}: {
  profileId: string;
  consentType: string;
  version: string;
  consented: boolean;
  ipAddress?: string;
}) {
  const supabase = getSupabase();
  
  await supabase.from('consent_records').insert({
    profile_id: profileId,
    consent_type: consentType,
    version,
    consented,
    ip_address: ipAddress,
    consented_at: new Date().toISOString(),
  });
}

export async function logDataAccess({
  accessorId,
  accessorRole,
  dataSubjectId,
  dataSubjectType,
  dataType,
  accessReason,
  ipAddress,
}: {
  accessorId: string;
  accessorRole: string;
  dataSubjectId: string;
  dataSubjectType: string;
  dataType: string;
  accessReason: string;
  ipAddress?: string;
}) {
  const supabase = getSupabase();
  
  await supabase.from('data_access_logs').insert({
    accessor_id: accessorId,
    accessor_role: accessorRole,
    data_subject_id: dataSubjectId,
    data_subject_type: dataSubjectType,
    data_type: dataType,
    access_reason: accessReason,
    ip_address: ipAddress,
    accessed_at: new Date().toISOString(),
  });
}

export async function logFinancialAudit({
  transactionType,
  familyId,
  tutorId,
  amountAud,
  stripeTransactionId,
  stripeEventId,
  description,
  metadata,
  status,
  processedBy,
}: {
  transactionType: string;
  familyId?: string;
  tutorId?: string;
  amountAud?: number;
  stripeTransactionId?: string;
  stripeEventId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  status: string;
  processedBy?: string;
}) {
  const supabase = getSupabase();
  
  await supabase.from('financial_audit').insert({
    transaction_type: transactionType,
    family_id: familyId,
    tutor_id: tutorId,
    amount_aud: amountAud,
    stripe_transaction_id: stripeTransactionId,
    stripe_event_id: stripeEventId,
    description,
    metadata,
    status,
    processed_by: processedBy,
    processed_at: new Date().toISOString(),
  });
}

export async function logVerificationAudit({
  tutorId,
  verificationType,
  verificationNumber,
  verifiedBy,
  expiryDate,
  documentReference,
  notes,
  status,
  verifiedByAdmin,
}: {
  tutorId: string;
  verificationType: string;
  verificationNumber?: string;
  verifiedBy?: string;
  expiryDate?: string;
  documentReference?: string;
  notes?: string;
  status: string;
  verifiedByAdmin?: string;
}) {
  const supabase = getSupabase();
  
  await supabase.from('verification_audit').insert({
    tutor_id: tutorId,
    verification_type: verificationType,
    verification_number: verificationNumber,
    verified_by: verifiedBy,
    expiry_date: expiryDate,
    document_reference: documentReference,
    notes,
    status,
    verified_by_admin: verifiedByAdmin,
    verified_at: new Date().toISOString(),
  });
}

export async function logSessionAudit({
  bookingId,
  studentId,
  tutorId,
  sessionType,
  scheduledAt,
  startedAt,
  endedAt,
  durationMinutes,
  tutorWwccVerified,
  tutorWwccNumber,
  aiMonitoringActive,
  topicsCovered,
  integrityScore,
  flagsRaised,
  sessionCompleted,
  cancellationReason,
}: {
  bookingId?: string;
  studentId: string;
  tutorId: string;
  sessionType: string;
  scheduledAt?: string;
  startedAt?: string;
  endedAt?: string;
  durationMinutes?: number;
  tutorWwccVerified?: boolean;
  tutorWwccNumber?: string;
  aiMonitoringActive?: boolean;
  topicsCovered?: string[];
  integrityScore?: number;
  flagsRaised?: number;
  sessionCompleted?: boolean;
  cancellationReason?: string;
}) {
  const supabase = getSupabase();
  
  await supabase.from('session_audit').insert({
    booking_id: bookingId,
    student_id: studentId,
    tutor_id: tutorId,
    session_type: sessionType,
    scheduled_at: scheduledAt,
    started_at: startedAt,
    ended_at: endedAt,
    duration_minutes: durationMinutes,
    tutor_wwcc_verified: tutorWwccVerified,
    tutor_wwcc_number: tutorWwccNumber,
    ai_monitoring_active: aiMonitoringActive,
    topics_covered: topicsCovered,
    integrity_score: integrityScore,
    flags_raised: flagsRaised || 0,
    session_completed: sessionCompleted,
    cancellation_reason: cancellationReason,
    created_at: new Date().toISOString(),
  });
}

export async function logIncidentAudit({
  incidentId,
  action,
  actionTakenBy,
  previousStatus,
  newStatus,
  notes,
  internalNotes,
  notificationsSent,
  escalatedTo,
  resolution,
}: {
  incidentId: string;
  action: string;
  actionTakenBy: string;
  previousStatus?: string;
  newStatus?: string;
  notes?: string;
  internalNotes?: string;
  notificationsSent?: string[];
  escalatedTo?: string;
  resolution?: string;
}) {
  const supabase = getSupabase();
  
  await supabase.from('incident_audit').insert({
    incident_id: incidentId,
    action,
    action_taken_by: actionTakenBy,
    previous_status: previousStatus,
    new_status: newStatus,
    notes,
    internal_notes: internalNotes,
    notifications_sent: notificationsSent,
    escalated_to: escalatedTo,
    resolution,
    action_taken_at: new Date().toISOString(),
  });
}

export async function logDataLifecycle({
  recordType,
  recordId,
  action,
  reason,
  requestedBy,
  approvedBy,
  retentionPeriodDays,
  scheduledDeletionDate,
}: {
  recordType: string;
  recordId: string;
  action: string;
  reason: string;
  requestedBy?: string;
  approvedBy?: string;
  retentionPeriodDays?: number;
  scheduledDeletionDate?: string;
}) {
  const supabase = getSupabase();
  
  await supabase.from('data_lifecycle_log').insert({
    record_type: recordType,
    record_id: recordId,
    action,
    reason,
    requested_by: requestedBy,
    approved_by: approvedBy,
    retention_period_days: retentionPeriodDays,
    scheduled_deletion_date: scheduledDeletionDate,
    performed_at: new Date().toISOString(),
  });
}
