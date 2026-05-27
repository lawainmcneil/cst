// HRC CEI Enrichment
// Cross-references every screened holding against the HRC CEI database
// and injects missing Tier 3 violations that aren't already captured
// in the manual database entry.
//
// Rules:
//  - Manual violations always win — never overwrite, only ADD missing ones
//  - Funds/ETFs are skipped (HRC CEI covers operating companies, not funds)
//  - If a violation subtype is already present, don't duplicate it
//  - Auto-enriched violations are tagged { autoEnriched: true } for UI display
//  - Status is promoted from PASS → REVIEW if new violations are injected

import { getHRCStatus } from '../data/hrcCEI'

// Subtypes that already represent an abortion travel violation
const ABORTION_SUBTYPES = [
  'abortion travel subsidy',
  'abortion travel',
  'reproductive healthcare travel',
  'reproductive travel',
]

// Subtypes that already represent a gender-transition violation
const GENDER_SUBTYPES = [
  'gender transition benefits',
  'gender-transition healthcare subsidy',
  'gender transition',
  'gender-affirming',
  'gender affirming',
]

function alreadyHas(violations, subtypeList) {
  return violations.some((v) => {
    const st = (v.subtype || '').toLowerCase()
    return subtypeList.some((match) => st.includes(match))
  })
}

/**
 * enrichWithHRC(holding)
 * Returns a new holding object with any missing HRC CEI Tier 3 violations
 * merged in. Returns the original object unchanged if nothing to add.
 */
export function enrichWithHRC(holding) {
  if (!holding?.ticker) return holding

  // Skip funds and ETFs — HRC CEI is for operating companies
  const t = holding.type?.toLowerCase() || ''
  if (t === 'fund' || t === 'etf' || t === 'mutual fund') return holding

  const hrc = getHRCStatus(holding.ticker)
  if (!hrc || hrc.score === 0) return holding // Non-participant or no data — no change

  const existing = holding.violations || []
  const toAdd = []

  // ── Abortion Travel ────────────────────────────────────────────────────────
  if (hrc.abortionTravel && !alreadyHas(existing, ABORTION_SUBTYPES)) {
    toAdd.push({
      tier: 3,
      type: 'Cultural Scandal',
      subtype: 'Abortion Travel Subsidy',
      description:
        `${holding.name} provides employer-subsidized out-of-state abortion travel benefits. ` +
        `HRC CEI score: ${hrc.score}/100. ` +
        (hrc.confirmed
          ? 'Benefit confirmed via public corporate announcement post-Dobbs (June 2022).'
          : 'Benefit estimated from HRC CEI score profile — requires live HRC database confirmation.'),
      penalty: -20,
      source: `HRC Corporate Equality Index 2023/2024 — ${hrc.score}/100${hrc.confirmed ? ' (confirmed)' : ' (estimated)'}`,
      cooperationLevel: 'Proximate Material',
      autoEnriched: true,
      hrcScore: hrc.score,
      hrcConfirmed: hrc.confirmed,
    })
  }

  // ── Gender-Transition Benefits ─────────────────────────────────────────────
  if (hrc.genderTrans && !alreadyHas(existing, GENDER_SUBTYPES)) {
    toAdd.push({
      tier: 3,
      type: 'Cultural Scandal',
      subtype: 'Gender-Transition Healthcare Subsidy',
      description:
        `${holding.name} provides employer-subsidized gender-transition healthcare, including surgical procedures. ` +
        `HRC CEI score: ${hrc.score}/100. ` +
        (hrc.confirmed
          ? 'Benefit confirmed via HRC CEI participation.'
          : 'Benefit estimated from HRC CEI score profile — requires live HRC database confirmation.'),
      penalty: -10,
      source: `HRC Corporate Equality Index 2023/2024 — ${hrc.score}/100${hrc.confirmed ? ' (confirmed)' : ' (estimated)'}`,
      cooperationLevel: 'Proximate Material',
      autoEnriched: true,
      hrcScore: hrc.score,
      hrcConfirmed: hrc.confirmed,
    })
  }

  if (toAdd.length === 0) return holding // Nothing to add

  // Promote PASS → REVIEW when new violations are injected
  const newStatus = holding.status === 'PASS' ? 'REVIEW' : holding.status

  // Promote recommendAction if needed
  let newAction = holding.recommendAction
  if (holding.status === 'PASS' && newStatus === 'REVIEW') {
    newAction = 'ENGAGE'
  }

  return {
    ...holding,
    violations: [...existing, ...toAdd],
    status: newStatus,
    recommendAction: newAction,
    hrcEnriched: true,
    hrcData: hrc,
  }
}
