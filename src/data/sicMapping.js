// SIC Code → CST Tier Mapping
// Standard Industrial Classification codes mapped to Catholic Social Teaching screening tiers
// Source: SEC SIC code list + CST Four-Tier Fiduciary Screening Architecture

// ─────────────────────────────────────────────────────────────────────────────
// TIER 1 — INTRINSIC EVIL (Kill Switch — 0% Tolerance)
// Any revenue from these industries triggers immediate F regardless of percentage
// ─────────────────────────────────────────────────────────────────────────────
export const TIER1_SIC = {
  // Abortion & Abortifacient Manufacturing
  2836: {
    label: 'Pharmaceutical Preparations (abortion drugs)',
    note: 'Requires filing analysis — not all pharma is Tier 1. Flag for manual review.',
    flagOnly: true, // flag for review, not automatic kill — need to check specific drugs
  },

  // Pornography / Adult Entertainment
  7812: {
    label: 'Motion Picture Production (adult content possible)',
    flagOnly: true,
    note: 'Requires subsidiary check for adult content production',
  },
  7922: {
    label: 'Theatrical Producers / Adult Entertainment possible',
    flagOnly: true,
  },
  7929: {
    label: 'Bands, Orchestras, Actors — adult entertainment possible',
    flagOnly: true,
  },
  7993: {
    label: 'Video Games / Gambling Devices',
    tier: 2,
    type: 'Vice & Negligence',
    subtype: 'Gambling Operations',
    penalty: -20,
    note: 'Gambling devices and equipment',
  },
  7999: {
    label: 'Amusement and Recreation (adult clubs possible)',
    flagOnly: true,
  },

  // Gambling (pure operators)
  7011: {
    label: 'Hotels and Motels (casino-hotel hybrids)',
    flagOnly: true,
  },
  7941: { label: 'Casinos (Gaming)', tier: 2, type: 'Vice & Negligence', subtype: 'Gambling Operations', penalty: -20 },
  7948: { label: 'Racing, including Track Operations', tier: 2, type: 'Vice & Negligence', subtype: 'Gambling Operations', penalty: -20 },

  // Tobacco
  2100: { label: 'Cigarettes', tier: 2, type: 'Vice & Negligence', subtype: 'Tobacco Production', penalty: -20 },
  2111: { label: 'Cigarettes', tier: 2, type: 'Vice & Negligence', subtype: 'Tobacco Production', penalty: -20 },
  2121: { label: 'Cigars', tier: 2, type: 'Vice & Negligence', subtype: 'Tobacco Production', penalty: -20 },
  2131: { label: 'Chewing and Smoking Tobacco', tier: 2, type: 'Vice & Negligence', subtype: 'Tobacco Production', penalty: -20 },
  2141: { label: 'Tobacco Stemming and Redrying', tier: 2, type: 'Vice & Negligence', subtype: 'Tobacco Production', penalty: -20 },

  // Alcohol
  2080: { label: 'Beverages (alcohol)', tier: 2, type: 'Vice & Negligence', subtype: 'Alcohol Production', penalty: -20 },
  2082: { label: 'Malt Beverages', tier: 2, type: 'Vice & Negligence', subtype: 'Alcohol Production', penalty: -20 },
  2083: { label: 'Malt', tier: 2, type: 'Vice & Negligence', subtype: 'Alcohol Production', penalty: -20 },
  2084: { label: 'Wines, Brandy and Brandy Spirits', tier: 2, type: 'Vice & Negligence', subtype: 'Alcohol Production', penalty: -20 },
  2085: { label: 'Distilled and Blended Liquors', tier: 2, type: 'Vice & Negligence', subtype: 'Alcohol Production', penalty: -20 },

  // Weapons / Firearms (not defense contractors — pure civilian weapons)
  3482: { label: 'Small Arms Ammunition', tier: 2, type: 'Vice & Negligence', subtype: 'Civilian Weapons Manufacturing', penalty: -15 },
  3484: { label: 'Small Arms', tier: 2, type: 'Vice & Negligence', subtype: 'Civilian Weapons Manufacturing', penalty: -15 },
  3489: { label: 'Ordnance & Accessories', flagOnly: true, note: 'Review for anti-personnel landmines / cluster munitions' },
  3761: { label: 'Guided Missiles & Space Vehicles', flagOnly: true, note: 'Review for nuclear warhead delivery systems' },
  3812: { label: 'Defense Electronics', flagOnly: true, note: 'Review for nuclear weapons systems' },

  // Stem Cell / Embryo Destruction
  8731: {
    label: 'Commercial Physical & Biological Research',
    flagOnly: true,
    note: 'Requires 10-K filing review for embryonic stem cell research',
  },
  8099: {
    label: 'Health Services (fertility clinics / IVF)',
    flagOnly: true,
    note: 'May include IVF with embryo destruction — requires filing review',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// TIER 2 — VICE & NEGLIGENCE (>5% gross revenue threshold)
// ─────────────────────────────────────────────────────────────────────────────
export const TIER2_SIC = {
  // Alcohol retail / distribution
  5921: { label: 'Liquor Stores', tier: 2, type: 'Vice & Negligence', subtype: 'Alcohol Retail', penalty: -20 },
  5812: { label: 'Eating and Drinking Places (bars)', flagOnly: true, note: 'Flag if >5% revenue from alcohol sales' },

  // Gambling
  7993: { label: 'Video Games, Slot Machines', tier: 2, subtype: 'Gambling Devices', penalty: -20 },

  // Adult content / entertainment venues
  5999: { label: 'Miscellaneous Retail (adult shops)', flagOnly: true },
  7389: {
    label: 'Services — Equipment Rental and Leasing (private prisons)',
    flagOnly: true,
    note: 'GEO Group uses SIC 7389. Review for private prison operations.',
  },
  6798: {
    label: 'Real Estate Investment Trusts (prison REIT)',
    flagOnly: true,
    note: 'CoreCivic uses SIC 6798. Review for private prison REIT operations.',
  },

  // Contraceptive manufacturing
  3841: { label: 'Surgical & Medical Instruments', flagOnly: true, note: 'May include contraceptive devices — review product lines' },
  3069: { label: 'Fabricated Rubber Products (contraceptives)', flagOnly: true },
}

// ─────────────────────────────────────────────────────────────────────────────
// TIER 3 — CULTURAL SCANDAL (Cooperation & Anthropological Scandal)
// Note: Tier 3 violations are primarily from HRC CEI data, not SIC codes.
// SIC alone cannot identify abortion travel subsidies or gender-transition benefits.
// These SIC flags are supplementary industry-context signals only.
// ─────────────────────────────────────────────────────────────────────────────
export const TIER3_SIC = {
  // Tech / Social Media (algorithmic harm risk)
  7372: { label: 'Prepackaged Software', flagOnly: true, note: 'Check HRC CEI for benefits policies' },
  7374: { label: 'Computer Processing and Data Preparation', flagOnly: true },
  4813: { label: 'Telephone Communications', flagOnly: true },
  4899: { label: 'Communications Services (social media)', flagOnly: true },

  // Media / Publishing
  2710: { label: 'Newspapers', flagOnly: true },
  7812: { label: 'Motion Picture Production', flagOnly: true },
  4833: { label: 'Television Broadcasting Stations', flagOnly: true },
  4832: { label: 'Radio Broadcasting Stations', flagOnly: true },

  // Healthcare (may fund Planned Parenthood)
  8011: { label: 'Offices and Clinics of Doctors of Medicine', flagOnly: true },
  8049: { label: 'Offices & Clinics of Other Health Practitioners', flagOnly: true },
}

// ─────────────────────────────────────────────────────────────────────────────
// CLEAN INDUSTRIES — Generally CST-compatible
// Low screening risk; still check HRC CEI for Tier 3
// ─────────────────────────────────────────────────────────────────────────────
export const CLEAN_SIC_RANGES = [
  { from: 100, to: 999, label: 'Agriculture / Farming', note: 'Generally clean; check pesticide practices' },
  { from: 1000, to: 1499, label: 'Mining', note: 'Check environmental stewardship' },
  { from: 1500, to: 1799, label: 'Construction', note: 'Generally clean' },
  { from: 2000, to: 2079, label: 'Food Manufacturing', note: 'Generally clean; check animal welfare' },
  { from: 2086, to: 2099, label: 'Soft Drinks / Non-Alcohol Beverages', note: 'Generally clean' },
  { from: 2200, to: 2799, label: 'Textiles / Apparel', note: 'Check labor practices' },
  { from: 2800, to: 2835, label: 'Chemicals (non-pharma)', note: 'Check environmental stewardship' },
  { from: 3000, to: 3481, label: 'Manufacturing (non-weapons)', note: 'Generally clean' },
  { from: 3490, to: 3759, label: 'Industrial Manufacturing', note: 'Generally clean' },
  { from: 3800, to: 3811, label: 'Scientific Instruments', note: 'Generally clean' },
  { from: 3813, to: 3999, label: 'Electronics / Consumer Products', note: 'Check HRC CEI for benefits' },
  { from: 4000, to: 4499, label: 'Transportation', note: 'Generally clean' },
  { from: 4500, to: 4599, label: 'Air Transportation', note: 'Generally clean' },
  { from: 4600, to: 4812, label: 'Utilities / Pipeline', note: 'Check environmental stewardship' },
  { from: 4814, to: 4831, label: 'Communications (non-broadcast)', note: 'Check HRC CEI' },
  { from: 5000, to: 5199, label: 'Wholesale Trade', note: 'Generally clean' },
  { from: 5200, to: 5920, label: 'Retail Trade (non-liquor)', note: 'Check HRC CEI for large retailers' },
  { from: 5922, to: 5999, label: 'Miscellaneous Retail', note: 'Generally clean' },
  { from: 6000, to: 6499, label: 'Finance / Banking / Insurance', note: 'Check HRC CEI; check ESG investment mandates' },
  { from: 6500, to: 6797, label: 'Real Estate', note: 'Generally clean' },
  { from: 6799, to: 6999, label: 'Holding Companies', note: 'Review subsidiaries' },
  { from: 7000, to: 7010, label: 'Lodging (non-casino)', note: 'Generally clean' },
  { from: 7012, to: 7372, label: 'Services (non-software)', note: 'Check HRC CEI' },
  { from: 7375, to: 7388, label: 'Computer Services', note: 'Check HRC CEI' },
  { from: 7390, to: 7940, label: 'Business Services / Sports', note: 'Generally clean' },
  { from: 7949, to: 7992, label: 'Amusement / Recreation (non-casino)', note: 'Generally clean' },
  { from: 7994, to: 7998, label: 'Bowling / Physical Fitness', note: 'Generally clean' },
  { from: 8000, to: 8010, label: 'Health Services', note: 'Check HRC CEI; bioethics review' },
  { from: 8012, to: 8048, label: 'Health Services', note: 'Check HRC CEI; bioethics review' },
  { from: 8050, to: 8098, label: 'Health Services', note: 'Check HRC CEI; bioethics review' },
  { from: 8100, to: 8730, label: 'Legal / Education / Social Services', note: 'Check mission alignment' },
  { from: 8732, to: 9999, label: 'Research / Government / Non-classified', note: 'Review individually' },
]

// ─────────────────────────────────────────────────────────────────────────────
// PRIMARY LOOKUP FUNCTION
// Returns CST screening signal from SIC code
// ─────────────────────────────────────────────────────────────────────────────
export function getSICScreening(sicCode) {
  const sic = Number(sicCode)
  if (!sic) return { tier: null, flagOnly: false, label: 'Unknown SIC', note: 'No SIC data available' }

  // Check Tier 1 SIC flags first
  if (TIER1_SIC[sic]) {
    const entry = TIER1_SIC[sic]
    if (entry.flagOnly) {
      return { tier: null, flagOnly: true, label: entry.label, note: entry.note, source: 'SIC-FLAG' }
    }
    return { tier: 1, flagOnly: false, label: entry.label, note: entry.note, source: 'SIC-KILL' }
  }

  // Check Tier 2 SIC flags
  if (TIER2_SIC[sic]) {
    const entry = TIER2_SIC[sic]
    if (entry.flagOnly) {
      return { tier: null, flagOnly: true, label: entry.label, note: entry.note, source: 'SIC-FLAG' }
    }
    return {
      tier: 2,
      flagOnly: false,
      label: entry.label,
      subtype: entry.subtype,
      penalty: entry.penalty,
      note: entry.note,
      source: 'SIC-TIER2',
    }
  }

  // Check Tier 3 SIC flags
  if (TIER3_SIC[sic]) {
    const entry = TIER3_SIC[sic]
    return { tier: null, flagOnly: true, label: entry.label, note: entry.note, source: 'SIC-T3-FLAG' }
  }

  // Check clean ranges
  for (const range of CLEAN_SIC_RANGES) {
    if (sic >= range.from && sic <= range.to) {
      return { tier: null, flagOnly: false, label: range.label, note: range.note, clean: true, source: 'SIC-CLEAN' }
    }
  }

  return { tier: null, flagOnly: false, label: 'Unclassified SIC', note: 'Manual review required', source: 'SIC-UNKNOWN' }
}

// ─────────────────────────────────────────────────────────────────────────────
// SIC CODE LABELS (for display in UI)
// ─────────────────────────────────────────────────────────────────────────────
export function getSICLabel(sicCode) {
  const result = getSICScreening(sicCode)
  return result.label || `SIC ${sicCode}`
}
