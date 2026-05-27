import { useState } from 'react'
import { scoreHolding, TIER_META, getGradeColors } from '../utils/scoring'
import GradeDisplay from './GradeDisplay'

const STATUS_BADGE = {
  PASS:   'bg-emerald-100 text-emerald-800 border border-emerald-200',
  FAIL:   'bg-red-100 text-red-800 border border-red-200',
  REVIEW: 'bg-amber-100 text-amber-800 border border-amber-200',
}

const ACTION_BADGE = {
  HOLD:          'bg-emerald-600 text-white',
  DIVEST:        'bg-red-700 text-white',
  ENGAGE:        'bg-blue-600 text-white',
  'ENGAGE/DIVEST': 'bg-orange-700 text-white',
  REPLACE:       'bg-amber-700 text-white',
  VERIFY:        'bg-slate-600 text-white',
}

const CONFIDENCE_LABEL = {
  documented:              { label: 'Documented', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  'public-data':           { label: 'Public Data', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  estimated:               { label: 'Estimated', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  'requires-verification': { label: 'Requires Verification', color: 'text-slate-600 bg-slate-50 border-slate-200' },
}

export default function HoldingResult({ holding }) {
  const [expanded, setExpanded] = useState(false)
  const result = scoreHolding(holding)
  const colors = getGradeColors(result.gradeClass)
  const conf = CONFIDENCE_LABEL[holding.dataConfidence] || CONFIDENCE_LABEL['requires-verification']

  return (
    <div className="animate-fade-in-up space-y-4">
      {/* Header card */}
      <div className="card">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            {/* Ticker badge */}
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-brand-dark flex items-center justify-center">
              <span className="font-mono font-bold text-white text-sm tracking-tight">{holding.ticker}</span>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-xl text-brand-dark">{holding.name}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs text-brand-muted">{holding.sector}</span>
                <span className="text-brand-muted opacity-50">·</span>
                <span className="text-xs font-medium text-brand-muted capitalize">{holding.type}</span>
                <span className="text-brand-muted opacity-50">·</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${conf.color}`}>
                  {conf.label}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${STATUS_BADGE[holding.status] || STATUS_BADGE.REVIEW}`}>
              {holding.status}
            </span>
            {holding.recommendAction && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${ACTION_BADGE[holding.recommendAction] || 'bg-slate-500 text-white'}`}>
                {holding.recommendAction}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grade */}
      <GradeDisplay
        grade={result.grade}
        gradeClass={result.gradeClass}
        score={result.score}
        violationPct={result.violationPct}
        tier1Fail={result.tier1Fail}
      />

      {/* Violations */}
      {holding.violations.length > 0 ? (
        <div className="space-y-3">
          <p className="section-label">Violations Detected</p>
          {holding.violations.map((v, i) => {
            const tierMeta = TIER_META[v.tier] || {}
            return (
              <div
                key={i}
                className={`rounded-xl border p-4 ${tierMeta.bgColor || 'bg-gray-50'} ${tierMeta.borderColor || 'border-gray-200'}`}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-start gap-3">
                    <span className={`tier-badge mt-0.5 ${tierMeta.color || 'bg-gray-600 text-white'}`}>
                      {tierMeta.shortLabel}
                    </span>
                    <div>
                      <p className={`font-semibold text-sm ${tierMeta.textColor || 'text-gray-800'}`}>
                        {v.type}
                        {v.subtype && (
                          <span className="font-normal opacity-80"> — {v.subtype}</span>
                        )}
                      </p>
                      <p className={`text-sm mt-1 leading-relaxed ${tierMeta.textColor || 'text-gray-700'} opacity-90`}>
                        {v.description}
                      </p>
                      {v.exposureEstimate && (
                        <p className={`text-xs mt-1.5 font-semibold ${tierMeta.textColor} opacity-80`}>
                          Estimated Exposure: {v.exposureEstimate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-2xl font-bold font-mono ${tierMeta.textColor}`}>
                      {v.penalty}
                    </span>
                    <div className={`text-xs ${tierMeta.textColor} opacity-70`}>pts</div>
                  </div>
                </div>
                <div className={`mt-3 pt-3 border-t ${tierMeta.borderColor} border-opacity-50`}>
                  <p className={`text-xs ${tierMeta.textColor} opacity-75`}>
                    <span className="font-semibold">Source:</span> {v.source}
                  </p>
                  <p className={`text-xs ${tierMeta.textColor} opacity-75 mt-0.5`}>
                    <span className="font-semibold">Cooperation Level:</span> {v.cooperationLevel}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card bg-emerald-50 border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">✓</div>
            <div>
              <p className="font-semibold text-emerald-800">No Violations Detected</p>
              <p className="text-sm text-emerald-700 opacity-80 mt-0.5">
                No Tier 1, Tier 2, or Tier 3 violations identified in available data.
                {holding.requiresVerification && ' Full API verification recommended before final disposition.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Virtue Multiplier */}
      {holding.virtueBonus > 0 && (
        <div className="card bg-emerald-50 border-emerald-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="tier-badge bg-emerald-700 text-white">Tier 4</span>
              <div>
                <p className="font-semibold text-emerald-800">Virtue Multiplier Applied</p>
                <p className="text-sm text-emerald-700 mt-0.5">
                  This holding demonstrates proactive alignment with the common good, earning a bonus under the Tier 4 Virtue Multiplier framework.
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-2xl font-bold font-mono text-emerald-700">+{holding.virtueBonus}</span>
              <div className="text-xs text-emerald-600">pts</div>
            </div>
          </div>
        </div>
      )}

      {/* Theological Defense — expandable */}
      <div className="card">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <div>
            <p className="section-label">Theological & Data Defense</p>
            <p className="text-sm text-brand-muted mt-0.5">Magisterial basis, forensic evidence, cooperation analysis</p>
          </div>
          <span className={`text-brand-orange text-xl transition-transform ${expanded ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </button>

        {expanded && (
          <div className="mt-5 space-y-4 border-t border-brand-border pt-5 animate-fade-in-up">
            <DefenseBlock label="Magisterial Basis" value={holding.magisterialBasis} />
            <DefenseBlock label="Foundational Encyclical" value={holding.foundationalEncyclical} />
            <DefenseBlock label="Forensic Data Evidence" value={holding.dataEvidence} />
            <DefenseBlock label="Cooperation Analysis" value={holding.cooperationAnalysis} />
            {holding.ncbcNote && (
              <DefenseBlock label="NCBC Bioethics Review" value={holding.ncbcNote} highlight />
            )}
            {holding.activeEngagement && (
              <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                <span>⟳</span>
                <span className="font-semibold">Active Stewardship Engagement:</span>
                <span>This holding is subject to active shareholder engagement per the "voice, vote, exit" protocol of Mensuram Bonam.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stewardship Recommendation */}
      <div className="card border-brand-orange/30 bg-brand-orange-light">
        <p className="section-label mb-2">Stewardship Recommendation</p>
        <p className="text-brand-dark font-medium text-sm leading-relaxed">{holding.stewardship}</p>
      </div>

      {/* Data disclaimer */}
      <p className="text-xs text-brand-muted text-center pb-2">
        This analysis is provided for educational and fiduciary planning purposes. Live API integration with SEC EDGAR, HRC CEI,
        and ProPublica Form 990 data is required for final disposition decisions. All scores are based on
        publicly available data as of the framework publication date.
      </p>
    </div>
  )
}

function DefenseBlock({ label, value, highlight = false }) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? 'bg-amber-50 border border-amber-200' : 'bg-brand-warm'}`}>
      <p className={`text-xs font-bold tracking-wide uppercase mb-1 ${highlight ? 'text-amber-800' : 'text-brand-orange'}`}>
        {label}
      </p>
      <p className={`text-sm leading-relaxed ${highlight ? 'text-amber-900' : 'text-brand-dark'}`}>{value}</p>
    </div>
  )
}
