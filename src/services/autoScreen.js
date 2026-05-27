// Auto-Screening Orchestrator
// Combines EDGAR company data + SIC mapping + HRC CEI lookup
// to produce a provisional CST holding object for any publicly traded ticker
//
// Result is tagged as PROVISIONAL — not a substitute for manual analyst review
// Confidence level: 'auto-screen' — lower than 'public-data' or 'documented'

import { edgarLookup, isFundType, getSectorFromSIC } from './edgarService.js'
import { getSICScreening } from '../data/sicMapping.js'
import { getHRCStatus, deriveHRCViolations } from '../data/hrcCEI.js'

// ─────────────────────────────────────────────────────────────────────────────
// PRIMARY EXPORT — autoScreenTicker(ticker)
// Returns a holding object compatible with cstDatabase schema
// Throws if EDGAR lookup fails entirely
// ─────────────────────────────────────────────────────────────────────────────
export async function autoScreenTicker(ticker) {
  const t = ticker?.toUpperCase()?.trim()
  if (!t) throw new Error('Ticker required')

  // 1. EDGAR Lookup — company metadata + SIC code
  const edgar = await edgarLookup(t)

  // 2. SIC Code Screening
  const sicResult = getSICScreening(edgar.sic)

  // 3. HRC CEI Lookup (in-memory, no network call)
  const hrcData = getHRCStatus(t)
  const hrcViolations = deriveHRCViolations(t)

  // 4. Build violations array
  const violations = []
  const flags = []

  // ── SIC-based violations ──────────────────────────────────────────────────
  if (sicResult.source === 'SIC-KILL') {
    // Tier 1 automatic kill from SIC
    violations.push({
      tier: 1,
      type: 'Intrinsic Evil',
      subtype: sicResult.label,
      penalty: -100,
      source: `EDGAR SIC ${edgar.sic} — ${edgar.sicDescription}`,
      cooperationLevel: 'Formal Material',
      note: sicResult.note || 'SIC code indicates intrinsic evil industry',
      autoScreened: true,
    })
  } else if (sicResult.source === 'SIC-TIER2' && sicResult.penalty) {
    violations.push({
      tier: 2,
      type: sicResult.type || 'Vice & Negligence',
      subtype: sicResult.subtype || sicResult.label,
      penalty: sicResult.penalty,
      source: `EDGAR SIC ${edgar.sic} — ${edgar.sicDescription}`,
      cooperationLevel: 'Proximate Material',
      note: sicResult.note || '',
      autoScreened: true,
    })
  } else if (sicResult.flagOnly) {
    // Flagged for review — not a hard violation but needs analyst attention
    flags.push({
      type: 'SIC-FLAG',
      label: sicResult.label,
      note: sicResult.note || '',
      sic: edgar.sic,
      source: 'SIC-FLAG',
    })
  }

  // ── HRC CEI — Tier 3 benefits violations ─────────────────────────────────
  if (hrcViolations.violations.length > 0) {
    hrcViolations.violations.forEach((v) => violations.push({ ...v, autoScreened: true }))
  }

  // 5. Determine status and tier
  const hasTier1 = violations.some((v) => v.tier === 1)
  const hasTier2 = violations.some((v) => v.tier === 2)
  const hasTier3 = violations.some((v) => v.tier === 3)
  const isFund = isFundType(edgar)

  let status, tier, baseScore
  if (hasTier1) {
    status = 'FAIL'
    tier = 1
    baseScore = 100 // Will be overridden to 0 by scoreHolding()
  } else if (hasTier2) {
    status = 'REVIEW'
    tier = 2
    baseScore = 100
  } else if (hasTier3 || flags.length > 0) {
    status = 'REVIEW'
    tier = 3
    baseScore = 100
  } else if (hrcData && hrcData.confirmed && !hrcData.abortionTravel && !hrcData.genderTrans) {
    // Clean HRC CEI record — confirmed no violations
    status = 'PASS'
    tier = 4
    baseScore = 100
  } else if (!hrcData) {
    // No HRC data — cannot confirm clean
    status = 'REVIEW'
    tier = 3
    baseScore = 100
    flags.push({
      type: 'NO-HRC-DATA',
      label: 'No HRC CEI record found',
      note: 'Benefits policies unverified. Requires manual review.',
      source: 'HRC-MISSING',
    })
  } else {
    status = 'PASS'
    tier = 4
    baseScore = 100
  }

  // 6. Virtue bonus — only if HRC confirmed clean
  let virtueBonus = 0
  if (status === 'PASS' && tier === 4 && !hasTier1 && !hasTier2 && !hasTier3) {
    // Cannot auto-assign virtue bonus — requires analyst review of mission alignment
    virtueBonus = 0
  }

  // 7. Sector from SIC
  const sector = sicResult.clean
    ? `${getSectorFromSIC(edgar.sic)} — ${edgar.sicDescription || ''}`
    : edgar.sicDescription || getSectorFromSIC(edgar.sic)

  // 8. Build provisional notes
  const provisionalNotes = buildProvisionalNotes(edgar, sicResult, hrcData, flags, isFund)

  return {
    ticker: t,
    name: edgar.companyName,
    type: isFund ? 'fund' : 'stock',
    sector,
    status,
    tier,
    baseScore,
    violations,
    virtueBonus,
    flags,

    // Provenance metadata
    dataConfidence: 'auto-screen',
    provisional: true,
    provisionalNotes,
    edgarData: {
      cik: edgar.cik,
      sic: edgar.sic,
      sicDescription: edgar.sicDescription,
      stateOfIncorporation: edgar.stateOfIncorporation,
      entityType: edgar.entityType,
      exchanges: edgar.exchanges,
    },
    hrcData: hrcData || null,

    // Standard fields with provisional markers
    description: `Auto-screened via EDGAR. ${edgar.sicDescription || ''} (SIC ${edgar.sic || 'N/A'}).`,
    encyclicalBasis: 'Pending analyst review',
    recommendAction: hasTier1 ? 'DIVEST' : status === 'REVIEW' ? 'REVIEW' : 'HOLD',
    lastReviewed: new Date().toISOString().slice(0, 10),
    autoScreened: true,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER — Build plain-language provisional notes for the analyst
// ─────────────────────────────────────────────────────────────────────────────
function buildProvisionalNotes(edgar, sicResult, hrcData, flags, isFund) {
  const notes = []

  notes.push(`PROVISIONAL AUTO-SCREEN — Not a substitute for analyst review.`)

  if (edgar.sic) {
    notes.push(`SIC ${edgar.sic}: ${edgar.sicDescription || 'No description'}. ${sicResult.note || ''}`)
  } else {
    notes.push(`No SIC code found in EDGAR — industry classification unknown.`)
  }

  if (isFund) {
    notes.push(`Entity classified as investment fund. Holdings-level screening requires N-PORT filing review.`)
  }

  if (hrcData) {
    if (hrcData.confirmed) {
      notes.push(`HRC CEI: Score ${hrcData.score}. Data confirmed from public sources.`)
    } else {
      notes.push(`HRC CEI: Score ${hrcData.score} (estimated). Confirmation required.`)
    }
  } else {
    notes.push(`No HRC CEI record — corporate benefits policies unverified.`)
  }

  flags.forEach((f) => notes.push(`FLAG: ${f.label} — ${f.note}`))

  notes.push(`EDGAR CIK: ${edgar.cik}. Review at https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${edgar.cik}&type=10-K`)

  return notes.join(' | ')
}

// ─────────────────────────────────────────────────────────────────────────────
// BATCH SCREEN — Screen multiple tickers in sequence (rate-limited)
// Respects EDGAR 10 req/sec limit with 150ms gap between requests
// ─────────────────────────────────────────────────────────────────────────────
export async function batchAutoScreen(tickers, onProgress) {
  const results = []
  const errors = []

  for (let i = 0; i < tickers.length; i++) {
    const t = tickers[i]
    try {
      const result = await autoScreenTicker(t)
      results.push(result)
      onProgress?.({ ticker: t, index: i, total: tickers.length, success: true })
    } catch (err) {
      errors.push({ ticker: t, error: err.message })
      onProgress?.({ ticker: t, index: i, total: tickers.length, success: false, error: err.message })
    }

    // Rate limiting: 150ms between requests = ~6.7 req/sec (safe under 10 req/sec limit)
    if (i < tickers.length - 1) {
      await new Promise((r) => setTimeout(r, 150))
    }
  }

  return { results, errors }
}

// ─────────────────────────────────────────────────────────────────────────────
// MERGE PROVISIONAL → DATABASE
// Takes a provisionally screened holding and merges in any existing manual
// data from cstDatabase (manual data always wins)
// ─────────────────────────────────────────────────────────────────────────────
export function mergeWithManualData(provisional, manualEntry) {
  if (!manualEntry) return provisional
  // Manual data overrides everything; provisional fills in gaps only
  return {
    ...provisional,
    ...manualEntry,
    provisional: false,
    dataConfidence: manualEntry.dataConfidence || 'public-data',
    edgarData: provisional.edgarData, // preserve EDGAR context even when overridden
  }
}
