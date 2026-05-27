// CST Scoring Engine
// Implements the Ethos Logos Four-Tier Fiduciary Screening Architecture

export function scoreHolding(holding) {
  if (!holding) return null

  // Step 1: Tier 1 severity override — immediate F
  const tier1Violations = holding.violations.filter((v) => v.tier === 1)
  if (tier1Violations.length > 0) {
    return {
      score: 0,
      violationPct: 100,
      grade: 'F',
      gradeClass: 'grade-f',
      tier1Fail: true,
      totalPenalty: -100,
      virtueBonus: 0,
    }
  }

  // Step 2: Volume scale — sum deductions + virtue bonus
  const totalPenalty = holding.violations.reduce((sum, v) => sum + v.penalty, 0)
  const virtueBonus = holding.virtueBonus || 0
  let score = Math.min(100, Math.max(0, holding.baseScore + totalPenalty + virtueBonus))
  const violationPct = Math.max(0, 100 - score)

  return {
    score,
    violationPct,
    grade: getGrade(violationPct),
    gradeClass: getGradeClass(violationPct),
    tier1Fail: false,
    totalPenalty,
    virtueBonus,
  }
}

export function scorePortfolio(holdingEntries) {
  // holdingEntries = [{ holding, portfolioWeight }, ...]
  // portfolioWeight is 0–100 (percentage)

  if (!holdingEntries || holdingEntries.length === 0) return null

  const normalizedEntries = normalizeWeights(holdingEntries)

  // Step 1: Tier 1 check — any Tier 1 exposure > 0% → F
  const hasTier1 = normalizedEntries.some(
    ({ holding, portfolioWeight }) =>
      portfolioWeight > 0 &&
      holding.violations.some((v) => v.tier === 1)
  )

  if (hasTier1) {
    return {
      grade: 'F',
      gradeClass: 'grade-f',
      alignmentScore: 0,
      violationExposure: 100,
      tier1Fail: true,
      tier1Holdings: normalizedEntries
        .filter(({ holding }) => holding.violations.some((v) => v.tier === 1))
        .map(({ holding }) => holding.ticker),
    }
  }

  // Step 2: Weighted violation exposure
  let totalViolationExposure = 0
  const breakdown = []

  normalizedEntries.forEach(({ holding, portfolioWeight }) => {
    const weight = portfolioWeight / 100 // as decimal
    const scoringResult = scoreHolding(holding)
    const holdingViolationPct = scoringResult.violationPct / 100 // as decimal
    const exposureContribution = weight * holdingViolationPct * 100 // back to %

    totalViolationExposure += exposureContribution
    breakdown.push({
      ticker: holding.ticker,
      name: holding.name,
      portfolioWeight,
      status: holding.status,
      tier: holding.tier,
      score: scoringResult.score,
      grade: scoringResult.grade,
      exposureContribution: exposureContribution.toFixed(2),
    })
  })

  const alignmentScore = Math.max(0, 100 - totalViolationExposure)

  return {
    grade: getGrade(totalViolationExposure),
    gradeClass: getGradeClass(totalViolationExposure),
    alignmentScore: alignmentScore.toFixed(2),
    violationExposure: totalViolationExposure.toFixed(2),
    tier1Fail: false,
    breakdown,
    tier2Exposure: calcTierExposure(normalizedEntries, 2),
    tier3Exposure: calcTierExposure(normalizedEntries, 3),
    tier4Exposure: calcTierExposure(normalizedEntries, 4),
  }
}

function normalizeWeights(entries) {
  const totalWeight = entries.reduce((sum, e) => sum + (Number(e.portfolioWeight) || 0), 0)
  if (totalWeight === 0) return entries
  if (Math.abs(totalWeight - 100) < 0.01) return entries
  // If weights don't sum to 100, scale them
  return entries.map((e) => ({
    ...e,
    portfolioWeight: ((Number(e.portfolioWeight) || 0) / totalWeight) * 100,
  }))
}

function calcTierExposure(entries, tierNum) {
  let exposure = 0
  entries.forEach(({ holding, portfolioWeight }) => {
    const weight = portfolioWeight / 100
    const tierViolations = holding.violations.filter((v) => v.tier === tierNum)
    const tierPenalty = Math.abs(tierViolations.reduce((sum, v) => sum + v.penalty, 0))
    exposure += weight * (tierPenalty / 100) * 100
  })
  return exposure.toFixed(2)
}

export function getGrade(violationPct) {
  const v = Number(violationPct)
  if (v === 0)   return 'A+'
  if (v <= 6.99) return 'A'
  if (v <= 10.99) return 'A−'
  if (v <= 14.99) return 'B+'
  if (v <= 17.49) return 'B'
  if (v <= 19.99) return 'B−'
  if (v <= 26.99) return 'C+'
  if (v <= 33.99) return 'C'
  if (v <= 39.99) return 'C−'
  if (v <= 49.99) return 'D'
  return 'F'
}

export function getGradeClass(violationPct) {
  const g = getGrade(violationPct)
  if (g.startsWith('A')) return 'grade-a'
  if (g.startsWith('B')) return 'grade-b'
  if (g.startsWith('C')) return 'grade-c'
  if (g.startsWith('D')) return 'grade-d'
  return 'grade-f'
}

export function getGradeColors(gradeClass) {
  const map = {
    'grade-a': { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-800', badge: 'bg-emerald-600 text-white' },
    'grade-b': { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', badge: 'bg-blue-600 text-white' },
    'grade-c': { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', badge: 'bg-amber-500 text-white' },
    'grade-d': { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-800', badge: 'bg-orange-600 text-white' },
    'grade-f': { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800', badge: 'bg-red-700 text-white' },
  }
  return map[gradeClass] || map['grade-a']
}

export const TIER_META = {
  1: {
    label: 'Tier 1 — Intrinsic Evil',
    shortLabel: 'Tier 1',
    color: 'bg-red-700 text-white',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    iconColor: 'text-red-600',
    icon: '✕',
    description: 'Kill Switch — 0% Tolerance',
  },
  2: {
    label: 'Tier 2 — Vice & Negligence',
    shortLabel: 'Tier 2',
    color: 'bg-amber-700 text-white',
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-900',
    iconColor: 'text-amber-600',
    icon: '⚠',
    description: 'Temperance threshold >5% gross revenue',
  },
  3: {
    label: 'Tier 3 — Cultural Scandal',
    shortLabel: 'Tier 3',
    color: 'bg-orange-700 text-white',
    borderColor: 'border-orange-200',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-900',
    iconColor: 'text-orange-600',
    icon: '!',
    description: 'Cooperation & anthropological scandal',
  },
  4: {
    label: 'Tier 4 — Virtue Multiplier',
    shortLabel: 'Tier 4',
    color: 'bg-emerald-700 text-white',
    borderColor: 'border-emerald-200',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-900',
    iconColor: 'text-emerald-600',
    icon: '+',
    description: 'Mission alignment (+20 pts) / Vice Inverse penalty',
    // Vice Inverse: when a company actively does the opposite of a virtue
    // (e.g. algorithmic addiction of minors = inverse of human flourishing)
    penaltyColor: 'bg-purple-700 text-white',
    penaltyBorderColor: 'border-purple-200',
    penaltyBgColor: 'bg-purple-50',
    penaltyTextColor: 'text-purple-900',
    penaltyIconColor: 'text-purple-600',
  },
}
