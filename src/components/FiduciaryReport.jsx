// FiduciaryReport.jsx
// Section V: CLIENT-FACING OUTPUT (THE BLIND AUDIT)
//
// Per system instructions (Senior Fiduciary CST Analyst — Section V):
// "The Agent is STRICTLY FORBIDDEN from outputting specific ticker symbols,
//  fund names, or company names. All data must be aggregated by CST Principle and Tier."
//
// This component renders only aggregated violation principles, exposure math,
// and stewardship guidance. No tickers or fund names appear anywhere in output.

import { getGradeColors } from '../utils/scoring'

export default function FiduciaryReport({ result, entries, accountType = 'qualified' }) {
  if (!result) return null

  // ── C. Opaque wrapper exposure ─────────────────────────────────────────────
  const totalEntryWeight = entries.reduce((sum, e) => sum + Number(e.weight), 0)
  const opaqueWeight = entries
    .filter((e) =>
      e.holding.dataConfidence === 'estimated' ||
      e.holding.dataConfidence === 'requires-verification'
    )
    .reduce((sum, e) => sum + Number(e.weight), 0)
  const opaquePct =
    totalEntryWeight > 0
      ? ((opaqueWeight / totalEntryWeight) * 100).toFixed(2)
      : '0.00'

  // ── D. Collect violation principles by tier (deduplicated by subtype) ───────
  const principles = { 1: [], 2: [], 3: [], 4: [] }
  entries.forEach(({ holding }) => {
    holding.violations?.forEach((v) => {
      const t = v.tier
      if (t >= 1 && t <= 4 && !principles[t].includes(v.subtype)) {
        principles[t].push(v.subtype)
      }
    })
  })

  // ── E. Virtue themes ────────────────────────────────────────────────────────
  const virtueEntries = entries.filter((e) => (e.holding.virtueBonus || 0) > 0)

  const colors = getGradeColors(result.gradeClass)
  const hasAnyViolation = Number(result.violationExposure) > 0

  return (
    <div className="space-y-5 animate-fade-in-up">

      {/* ── Report Header ─────────────────────────────────────────────────── */}
      <div className="rounded-xl bg-brand-dark px-5 py-4 border border-white/10">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="section-label text-brand-orange leading-tight">
            CST Fiduciary Report
          </p>
          <span className="text-white/25 text-[10px] font-mono tracking-widest flex-shrink-0 mt-0.5">
            BLIND AUDIT
          </span>
        </div>
        <p className="text-white/40 text-xs">
          Catholic Social Teaching Screening · Mensuram Bonam (2022) ·
          USCCB SRI Guidelines (2021)
        </p>
      </div>

      {/* ── A. Executive Summary ─────────────────────────────────────────── */}
      <div className="card">
        <p className="section-label mb-2">A. Executive Summary</p>
        <p className="text-sm text-brand-dark/85 leading-relaxed">
          {buildExecutiveSummary(result, entries)}
        </p>
      </div>

      {/* ── B. Fiduciary Grade ───────────────────────────────────────────── */}
      <div className={`card ${colors.bg} border ${colors.border}`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="section-label mb-1">B. Fiduciary Grade</p>
            {result.tier1Fail ? (
              <p className={`text-xs font-bold ${colors.text}`}>
                Tier 1 Severity Override — Kill Switch Activated
              </p>
            ) : (
              <p className={`text-xs ${colors.text}`}>
                {result.violationExposure}% total CST violation exposure ·{' '}
                {result.alignmentScore}% aligned
              </p>
            )}
          </div>
          <span className={`font-serif text-6xl font-bold leading-none ${colors.text}`}>
            {result.grade}
          </span>
        </div>
        {result.tier1Fail && (
          <div className="mt-3 bg-red-700/10 border border-red-300 rounded-lg px-3 py-2.5">
            <p className="text-red-800 text-xs font-bold leading-relaxed">
              ⚠ Severity Override Active — This portfolio grade is [F] regardless of
              aligned holdings. A Tier 1 Intrinsic Evil exposure has been detected.
              Immediate unconditional divestment from the violating position(s) is
              required before any further CST analysis is actionable.
            </p>
          </div>
        )}
      </div>

      {/* ── C. Exact Exposure Math ───────────────────────────────────────── */}
      <div className="card">
        <p className="section-label mb-3">C. Exact Exposure Math</p>
        <div className="space-y-2">
          <ExposureMetric
            label="Total Known CST Violation Exposure"
            value={`${result.violationExposure}%`}
            sublabel="Confirmed, weighted across all tiers"
            variant={hasAnyViolation ? 'danger' : 'clean'}
          />
          <ExposureMetric
            label="Opaque Wrappers / Hidden Exposure"
            value={`${opaquePct}%`}
            sublabel={
              Number(opaquePct) > 0
                ? 'Holdings with estimated or unverified data — actual exposure may be higher'
                : 'All holdings have confirmed data'
            }
            variant={Number(opaquePct) > 0 ? 'warning' : 'clean'}
          />
          <div className="border-t border-brand-border pt-2">
            <ExposureMetric
              label="Portfolio Alignment Score"
              value={`${result.alignmentScore}%`}
              sublabel="Confirmed mission-aligned capital"
              variant="positive"
            />
          </div>
        </div>
      </div>

      {/* ── D. Violation Breakdown by Tier ───────────────────────────────── */}
      {(principles[1].length > 0 ||
        principles[2].length > 0 ||
        principles[3].length > 0 ||
        principles[4].length > 0) && (
        <div className="card">
          <p className="section-label mb-3">D. Violation Breakdown</p>
          <p className="text-xs text-brand-muted mb-3">
            Aggregated by CST Principle and Tier. No specific company or fund names
            are disclosed in this client-facing report.
          </p>
          <div className="space-y-3">
            {principles[1].length > 0 && (
              <ViolationTierBlock
                label="Tier 1 — Intrinsic Evils"
                badgeClass="bg-red-700 text-white"
                bgClass="bg-red-50"
                borderClass="border-red-200"
                textClass="text-red-900"
                exposure={result.tier1Fail ? '100.00' : '0.00'}
                principles={principles[1]}
              />
            )}
            {principles[2].length > 0 && (
              <ViolationTierBlock
                label="Tier 2 — Vice & Negligence"
                badgeClass="bg-amber-700 text-white"
                bgClass="bg-amber-50"
                borderClass="border-amber-200"
                textClass="text-amber-900"
                exposure={result.tier2Exposure}
                principles={principles[2]}
              />
            )}
            {principles[3].length > 0 && (
              <ViolationTierBlock
                label="Tier 3 — Cultural Scandal"
                badgeClass="bg-orange-700 text-white"
                bgClass="bg-orange-50"
                borderClass="border-orange-200"
                textClass="text-orange-900"
                exposure={result.tier3Exposure}
                principles={principles[3]}
              />
            )}
            {principles[4].length > 0 && (
              <ViolationTierBlock
                label="Tier 4 — Vice Inverse (Virtue Multiplier Penalty)"
                badgeClass="bg-purple-700 text-white"
                bgClass="bg-purple-50"
                borderClass="border-purple-200"
                textClass="text-purple-900"
                exposure={result.tier4Exposure || '0.00'}
                principles={principles[4]}
              />
            )}
          </div>
        </div>
      )}

      {/* ── E. Virtue Multiplier ─────────────────────────────────────────── */}
      {virtueEntries.length > 0 && (
        <div className="card bg-emerald-50 border border-emerald-200">
          <p className="section-label mb-1 text-emerald-800">E. Virtue Multiplier</p>
          <p className="text-xs text-emerald-700 mb-3">
            A portion of this portfolio is actively deployed in mission-aligned capital:
          </p>
          <ul className="space-y-2">
            {virtueEntries.map(({ holding }) => (
              <li key={holding.ticker} className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 flex-shrink-0 font-bold">✦</span>
                <span className="text-xs text-emerald-900 leading-relaxed">
                  {getVirtueTheme(holding)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── F. Stewardship Alignment Plan ───────────────────────────────── */}
      <div className="card bg-brand-dark text-white">
        <p className="section-label text-brand-orange mb-3">F. Stewardship Alignment Plan</p>

        {accountType === 'taxable' ? (
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-xs font-bold text-white mb-2">Taxable Account</p>
            <p className="text-xs text-white/75 leading-relaxed">
              Because this is a taxable account, a custom transition plan can be engineered
              to systematically harvest tax losses while unwinding violating positions,
              transforming this realignment into an opportunity to actively offset capital
              gains and optimize your after-tax wealth. Schedule a Fiduciary Review to
              identify the specific violating holdings and see your custom transition map.
            </p>
          </div>
        ) : (
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-xs font-bold text-white mb-2">Qualified Account (IRA / 401k)</p>
            <p className="text-xs text-white/75 leading-relaxed">
              Moral alignment can be achieved immediately with zero tax friction. The
              violating positions in this portfolio can be replaced with CST-compliant
              alternatives without triggering a taxable event. Schedule a Fiduciary Review
              to identify the specific holdings and receive a custom transition map.
            </p>
          </div>
        )}

        <a
          href="https://ethoslogosinvestments.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-white mt-4 w-full justify-center text-xs py-2"
        >
          Schedule a Fiduciary Review →
        </a>

        <p className="text-white/20 text-[10px] mt-4 text-center leading-relaxed">
          This report contains no specific security, fund, or company names per the
          Ethos Logos Blind Audit protocol. The full PM Audit Trail with granular
          holding-level forensic data is available to the Portfolio Manager separately.
        </p>
      </div>
    </div>
  )
}

// ── Helper: Executive Summary text ──────────────────────────────────────────
function buildExecutiveSummary(result, entries) {
  if (result.tier1Fail) {
    return `This portfolio has been evaluated against the four-tier Catholic Social Teaching Fiduciary Framework (Mensuram Bonam, 2022). The evaluation has identified a confirmed Tier 1 Intrinsic Evil exposure within the current capital allocation, activating the Severity Override. The portfolio fiduciary grade is [F] regardless of the volume of aligned holdings. Immediate, unconditional divestment from the violating position(s) is required before any further CST remediation analysis is actionable.`
  }

  const violationPct = Number(result.violationExposure)

  if (violationPct === 0) {
    const hasVirtue = entries.some((e) => (e.holding.virtueBonus || 0) > 0)
    return `This portfolio has been evaluated against the four-tier Catholic Social Teaching Fiduciary Framework (Mensuram Bonam, 2022). The current capital allocation demonstrates full alignment with Magisterial investment principles — no active violations were identified across all four tiers.${
      hasVirtue
        ? ' The portfolio additionally qualifies for Tier 4 Virtue Multiplier recognition for mission-aligned capital deployment.'
        : ''
    } This allocation merits the highest CST fiduciary designation.`
  }

  const activeTiers = []
  if (Number(result.tier2Exposure) > 0) activeTiers.push('Tier 2 (Vice & Negligence)')
  if (Number(result.tier3Exposure) > 0) activeTiers.push('Tier 3 (Cultural Scandal)')
  if (result.tier4Exposure && Number(result.tier4Exposure) > 0)
    activeTiers.push('Tier 4 Vice Inverse')

  const tierText =
    activeTiers.length > 1
      ? activeTiers.slice(0, -1).join(', ') + ', and ' + activeTiers[activeTiers.length - 1]
      : activeTiers[0] || 'multiple tiers'

  return `This portfolio has been evaluated against the four-tier Catholic Social Teaching Fiduciary Framework (Mensuram Bonam, 2022). The analysis identifies ${violationPct.toFixed(2)}% aggregate CST violation exposure spanning ${tierText}. No Tier 1 Intrinsic Evil was detected, preserving the portfolio's eligibility for structured remediation. A stewardship plan is outlined below. In a qualified account, full moral alignment can be achieved immediately with zero tax friction.`
}

// ── Helper: Virtue theme descriptions (no company names) ────────────────────
function getVirtueTheme(holding) {
  const sector = holding.sector || ''
  const encyclical = holding.foundationalEncyclical || ''
  const type = holding.type || ''

  if (sector.includes('Utilities') || encyclical.includes("Laudato Si'")) {
    return "Clean energy and renewable infrastructure — capital actively funding the transition aligned with Laudato Si' integral ecology mandate (§§172–175)"
  }
  if (sector.includes('Healthcare') && (holding.virtueBonus || 0) > 0) {
    return 'Essential medicine access programs serving underserved populations — Tier 4 Virtue Multiplier: Access to Medicine (Compendium §§234–237)'
  }
  if (
    type === 'mutual-fund' || type === 'etf'
      ? sector.includes('Catholic') ||
        sector.includes('USCCB') ||
        sector.includes('Biblical') ||
        sector.includes('Knights')
      : false
  ) {
    return 'Capital deployed through a mission-screened investment vehicle applying USCCB Socially Responsible Investment Guidelines — intentional fiduciary alignment with the Magisterium'
  }
  if (
    (type === 'mutual-fund' || type === 'etf') &&
    (sector.includes('Screened') || sector.includes('Catholic'))
  ) {
    return 'Capital deployed through a mission-screened investment vehicle applying Catholic exclusionary criteria — positive fiduciary alignment'
  }
  if (encyclical.includes('Rerum Novarum') || sector.includes('Consumer Staples')) {
    return 'Ethical labor practices and above-market worker compensation — Tier 4 Virtue Multiplier: Dignity of Labor (Rerum Novarum, Compendium §§305–309)'
  }
  return 'Mission-aligned capital with positive CST virtue factor recognition — Tier 4 Virtue Multiplier'
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ExposureMetric({ label, value, sublabel, variant = 'neutral' }) {
  const styles = {
    danger:   { bg: 'bg-red-50',     text: 'text-red-700',     sub: 'text-red-500'     },
    warning:  { bg: 'bg-amber-50',   text: 'text-amber-700',   sub: 'text-amber-500'   },
    positive: { bg: 'bg-emerald-50', text: 'text-emerald-700', sub: 'text-emerald-500' },
    clean:    { bg: 'bg-brand-warm', text: 'text-brand-muted', sub: 'text-brand-muted' },
    neutral:  { bg: 'bg-brand-warm', text: 'text-brand-dark',  sub: 'text-brand-muted' },
  }
  const s = styles[variant] || styles.neutral
  return (
    <div className={`rounded-lg px-3 py-2.5 ${s.bg}`}>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${s.text}`}>{label}</span>
        <span className={`font-mono font-bold text-sm ${s.text}`}>{value}</span>
      </div>
      {sublabel && <p className={`text-xs mt-0.5 ${s.sub}`}>{sublabel}</p>}
    </div>
  )
}

function ViolationTierBlock({
  label, badgeClass, bgClass, borderClass, textClass, exposure, principles,
}) {
  return (
    <div className={`rounded-lg px-3 py-3 ${bgClass} border ${borderClass}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeClass} leading-5`}>
          {label}
        </span>
        <span className={`font-mono font-bold text-sm ${textClass} flex-shrink-0`}>
          {Number(exposure).toFixed(2)}%
        </span>
      </div>
      <p className={`text-xs font-semibold ${textClass} mb-1`}>Violations detected:</p>
      <ul className="space-y-0.5">
        {principles.map((p, i) => (
          <li key={i} className={`text-xs ${textClass} opacity-90 flex items-start gap-1.5`}>
            <span className="flex-shrink-0 font-bold">·</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
