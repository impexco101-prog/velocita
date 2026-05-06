'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface AuditLog {
  id: string
  actor_id?: string
  actor_role?: string
  action: string
  action_category: string
  resource_type?: string
  resource_id?: string
  status: string
  created_at: string
}

interface VerificationAudit {
  id: string
  tutor_id: string
  verification_type: string
  verification_number?: string
  status: string
  verified_at: string
  expiry_date?: string
}

interface FinancialAudit {
  id: string
  transaction_type: string
  family_id?: string
  tutor_id?: string
  amount_aud?: number
  status: string
  processed_at: string
}

interface ConsentRecord {
  id: string
  profile_id: string
  consent_type: string
  version: string
  consented: boolean
  consented_at: string
}

export default function AuditDashboard() {
  const [activeTab, setActiveTab] = useState('events')
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [verificationAudits, setVerificationAudits] = useState<VerificationAudit[]>([])
  const [financialAudits, setFinancialAudits] = useState<FinancialAudit[]>([])
  const [consentRecords, setConsentRecords] = useState<ConsentRecord[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - in real app this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAuditLogs([
        {
          id: '1',
          actor_id: 'user1',
          actor_role: 'parent',
          action: 'user.signup',
          action_category: 'auth',
          resource_type: 'profile',
          resource_id: 'profile1',
          status: 'success',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          actor_id: 'user2',
          actor_role: 'tutor',
          action: 'tutor.verification_submitted',
          action_category: 'verification',
          resource_type: 'tutor_profile',
          resource_id: 'tutor1',
          status: 'success',
          created_at: new Date(Date.now() - 3600000).toISOString()
        }
      ])

      setVerificationAudits([
        {
          id: '1',
          tutor_id: 'tutor1',
          verification_type: 'wwcc_verified',
          verification_number: 'WWCC123456',
          status: 'verified',
          verified_at: new Date().toISOString(),
          expiry_date: '2026-12-31'
        },
        {
          id: '2',
          tutor_id: 'tutor2',
          verification_type: 'wwcc_submitted',
          status: 'pending',
          verified_at: new Date(Date.now() - 86400000).toISOString()
        }
      ])

      setFinancialAudits([
        {
          id: '1',
          transaction_type: 'subscription_created',
          family_id: 'family1',
          amount_aud: 99.00,
          status: 'completed',
          processed_at: new Date().toISOString()
        },
        {
          id: '2',
          transaction_type: 'session_payment',
          tutor_id: 'tutor1',
          amount_aud: 75.00,
          status: 'completed',
          processed_at: new Date(Date.now() - 7200000).toISOString()
        }
      ])

      setConsentRecords([
        {
          id: '1',
          profile_id: 'user1',
          consent_type: 'terms_of_service',
          version: '1.0',
          consented: true,
          consented_at: new Date().toISOString()
        },
        {
          id: '2',
          profile_id: 'user2',
          consent_type: 'ai_session_monitoring',
          version: '1.0',
          consented: true,
          consented_at: new Date(Date.now() - 3600000).toISOString()
        }
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const todayEvents = auditLogs.filter(log => 
    new Date(log.created_at).toDateString() === new Date().toDateString()
  ).length

  const openIncidents = verificationAudits.filter(audit => 
    audit.status === 'pending' || audit.status === 'failed'
  ).length

  const pendingVerifications = verificationAudits.filter(audit => 
    audit.status === 'pending'
  ).length

  const failedTransactions = financialAudits.filter(audit => 
    audit.status === 'failed'
  ).length

  const exportToCSV = (data: unknown[], filename: string) => {
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
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
                Velocita Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors">
                Dashboard
              </Link>
              <button className="text-sm font-dm-sans text-[#8B9DC3] hover:text-gold-cta transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-text-primary mb-2">
            Audit & Compliance Dashboard
          </h1>
          <p className="text-[#8B9DC3]">
            Comprehensive monitoring for Australian Privacy Act and Working With Children compliance
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-gold-cta mb-2">
              {todayEvents}
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Total Events Today
            </div>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {openIncidents}
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Safety Incidents Open
            </div>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {pendingVerifications}
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Pending Verifications
            </div>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-6">
            <div className="text-3xl font-bold text-red-500 mb-2">
              {failedTransactions}
            </div>
            <div className="text-sm text-[#8B9DC3]">
              Failed Transactions
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-cards border border-card-border rounded-lg">
          <div className="border-b border-card-border">
            <div className="flex space-x-8">
              {[
                { id: 'events', label: 'All Events' },
                { id: 'safety', label: 'Safety & WWCC' },
                { id: 'financial', label: 'Financial' },
                { id: 'consent', label: 'Consent Records' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-gold-cta text-gold-cta'
                      : 'border-transparent text-[#8B9DC3] hover:text-gold-cta'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-[#8B9DC3]">Loading audit data...</div>
              </div>
            ) : (
              <>
                {/* TAB 1 - All Events */}
                {activeTab === 'events' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-playfair font-bold text-text-primary">
                        Recent Audit Events
                      </h3>
                      <button
                        onClick={() => exportToCSV(auditLogs, 'audit-events.csv')}
                        className="bg-gold-cta hover:bg-yellow-500 text-background font-bold py-2 px-4 rounded-[6px] transition-colors text-sm"
                      >
                        Export CSV
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-card-border">
                            <th className="text-left py-3 px-4 text-text-primary">Time</th>
                            <th className="text-left py-3 px-4 text-text-primary">Actor</th>
                            <th className="text-left py-3 px-4 text-text-primary">Action</th>
                            <th className="text-left py-3 px-4 text-text-primary">Resource</th>
                            <th className="text-left py-3 px-4 text-text-primary">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {auditLogs.map(log => (
                            <tr key={log.id} className="border-b border-card-border">
                              <td className="py-3 px-4 text-[#8B9DC3]">
                                {new Date(log.created_at).toLocaleString()}
                              </td>
                              <td className="py-3 px-4 text-text-primary">
                                {log.actor_role || 'System'}
                              </td>
                              <td className="py-3 px-4 text-text-primary">
                                {log.action}
                              </td>
                              <td className="py-3 px-4 text-text-primary">
                                {log.resource_type || '-'}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  log.status === 'success' 
                                    ? 'bg-green-500/20 text-green-500'
                                    : log.status === 'failed'
                                    ? 'bg-red-500/20 text-red-500'
                                    : 'bg-yellow-500/20 text-yellow-500'
                                }`}>
                                  {log.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 2 - Safety & WWCC */}
                {activeTab === 'safety' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-playfair font-bold text-text-primary">
                        Verification & Safety Audit
                      </h3>
                      <button
                        onClick={() => exportToCSV(verificationAudits, 'verification-audit.csv')}
                        className="bg-gold-cta hover:bg-yellow-500 text-background font-bold py-2 px-4 rounded-[6px] transition-colors text-sm"
                      >
                        Export CSV
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-card-border">
                            <th className="text-left py-3 px-4 text-text-primary">Tutor ID</th>
                            <th className="text-left py-3 px-4 text-text-primary">Type</th>
                            <th className="text-left py-3 px-4 text-text-primary">Status</th>
                            <th className="text-left py-3 px-4 text-text-primary">Date</th>
                            <th className="text-left py-3 px-4 text-text-primary">Expiry</th>
                          </tr>
                        </thead>
                        <tbody>
                          {verificationAudits.map(audit => (
                            <tr key={audit.id} className="border-b border-card-border">
                              <td className="py-3 px-4 text-text-primary">
                                {audit.tutor_id}
                              </td>
                              <td className="py-3 px-4 text-text-primary">
                                {audit.verification_type.replace('_', ' ')}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  audit.status === 'verified' 
                                    ? 'bg-green-500/20 text-green-500'
                                    : audit.status === 'pending'
                                    ? 'bg-yellow-500/20 text-yellow-500'
                                    : audit.status === 'expired' || audit.status === 'revoked'
                                    ? 'bg-red-500/20 text-red-500'
                                    : 'bg-gray-500/20 text-gray-500'
                                }`}>
                                  {audit.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-[#8B9DC3]">
                                {new Date(audit.verified_at).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4 text-[#8B9DC3]">
                                {audit.expiry_date || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 3 - Financial */}
                {activeTab === 'financial' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-playfair font-bold text-text-primary">
                        Financial Audit
                      </h3>
                      <button
                        onClick={() => exportToCSV(financialAudits, 'financial-audit.csv')}
                        className="bg-gold-cta hover:bg-yellow-500 text-background font-bold py-2 px-4 rounded-[6px] transition-colors text-sm"
                      >
                        Export CSV
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-[#1A2140] rounded-lg p-4">
                        <div className="text-2xl font-bold text-gold-cta mb-1">
                          ${financialAudits.reduce((sum, audit) => sum + (audit.amount_aud || 0), 0).toFixed(2)}
                        </div>
                        <div className="text-xs text-[#8B9DC3]">Total Revenue</div>
                      </div>
                      <div className="bg-[#1A2140] rounded-lg p-4">
                        <div className="text-2xl font-bold text-red-500 mb-1">
                          ${financialAudits.filter(a => a.status === 'failed').reduce((sum, audit) => sum + (audit.amount_aud || 0), 0).toFixed(2)}
                        </div>
                        <div className="text-xs text-[#8B9DC3]">Refunds</div>
                      </div>
                      <div className="bg-[#1A2140] rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-500 mb-1">
                          ${financialAudits.filter(a => a.transaction_type === 'tutor_payout').reduce((sum, audit) => sum + (audit.amount_aud || 0), 0).toFixed(2)}
                        </div>
                        <div className="text-xs text-[#8B9DC3]">Tutor Payouts</div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-card-border">
                            <th className="text-left py-3 px-4 text-text-primary">Type</th>
                            <th className="text-left py-3 px-4 text-text-primary">Amount</th>
                            <th className="text-left py-3 px-4 text-text-primary">Family</th>
                            <th className="text-left py-3 px-4 text-text-primary">Status</th>
                            <th className="text-left py-3 px-4 text-text-primary">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {financialAudits.map(audit => (
                            <tr key={audit.id} className="border-b border-card-border">
                              <td className="py-3 px-4 text-text-primary">
                                {audit.transaction_type.replace('_', ' ')}
                              </td>
                              <td className="py-3 px-4 text-text-primary">
                                ${audit.amount_aud?.toFixed(2) || '0.00'}
                              </td>
                              <td className="py-3 px-4 text-text-primary">
                                {audit.family_id || '-'}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  audit.status === 'completed' 
                                    ? 'bg-green-500/20 text-green-500'
                                    : audit.status === 'failed'
                                    ? 'bg-red-500/20 text-red-500'
                                    : 'bg-yellow-500/20 text-yellow-500'
                                }`}>
                                  {audit.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-[#8B9DC3]">
                                {new Date(audit.processed_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 4 - Consent Records */}
                {activeTab === 'consent' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-playfair font-bold text-text-primary">
                        Consent Records
                      </h3>
                      <button
                        onClick={() => exportToCSV(consentRecords, 'consent-records.csv')}
                        className="bg-gold-cta hover:bg-yellow-500 text-background font-bold py-2 px-4 rounded-[6px] transition-colors text-sm"
                      >
                        Export CSV
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-card-border">
                            <th className="text-left py-3 px-4 text-text-primary">User</th>
                            <th className="text-left py-3 px-4 text-text-primary">Consent Type</th>
                            <th className="text-left py-3 px-4 text-text-primary">Version</th>
                            <th className="text-left py-3 px-4 text-text-primary">Date</th>
                            <th className="text-left py-3 px-4 text-text-primary">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {consentRecords.map(record => (
                            <tr key={record.id} className="border-b border-card-border">
                              <td className="py-3 px-4 text-text-primary">
                                {record.profile_id}
                              </td>
                              <td className="py-3 px-4 text-text-primary">
                                {record.consent_type.replace('_', ' ')}
                              </td>
                              <td className="py-3 px-4 text-text-primary">
                                {record.version}
                              </td>
                              <td className="py-3 px-4 text-[#8B9DC3]">
                                {new Date(record.consented_at).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  record.consented
                                    ? 'bg-green-500/20 text-green-500'
                                    : 'bg-red-500/20 text-red-500'
                                }`}>
                                  {record.consented ? 'Granted' : 'Withdrawn'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
