// EDGAR API Service
// U.S. Securities and Exchange Commission EDGAR — Free, no API key required
// CORS supported on data.sec.gov — safe to call from browser
// Rate limit: 10 requests/second (we stay well below this)
//
// Reference: https://efts.sec.gov/LATEST/search-index?q=%22AAPL%22&dateRange=custom&startdt=2023-01-01
//            https://data.sec.gov/submissions/CIK0000320193.json

const EDGAR_BASE = 'https://data.sec.gov'
const EDGAR_TICKERS = 'https://www.sec.gov/files/company_tickers.json'
const EDGAR_SEARCH = 'https://efts.sec.gov/LATEST/search-index'

// Cache CIK lookups in memory to avoid redundant API calls
const cikCache = new Map()

// ─────────────────────────────────────────────────────────────────────────────
// TICKER → CIK LOOKUP
// SEC maintains a canonical mapping of ticker → CIK number
// ─────────────────────────────────────────────────────────────────────────────
export async function lookupCIK(ticker) {
  const t = ticker?.toUpperCase()?.trim()
  if (!t) throw new Error('Ticker is required')

  if (cikCache.has(t)) return cikCache.get(t)

  try {
    // Primary: company_tickers.json — fast, single file, all ~10k tickers
    const res = await fetch(EDGAR_TICKERS, {
      headers: { 'User-Agent': 'EthosLogos CST Screener lawain@lawainmcneil.com' },
    })
    if (!res.ok) throw new Error(`EDGAR ticker fetch failed: ${res.status}`)

    const data = await res.json()
    // data is { "0": { cik_str: 320193, ticker: "AAPL", title: "Apple Inc." }, ... }
    const entries = Object.values(data)
    const match = entries.find((e) => e.ticker?.toUpperCase() === t)

    if (!match) {
      // Fallback: full-text search
      return await lookupCIKBySearch(t)
    }

    const cikStr = String(match.cik_str).padStart(10, '0')
    const result = { cik: cikStr, cikRaw: match.cik_str, ticker: t, companyName: match.title }
    cikCache.set(t, result)
    return result
  } catch (err) {
    // Fallback to full-text search
    try {
      return await lookupCIKBySearch(t)
    } catch (fallbackErr) {
      throw new Error(`CIK lookup failed for ${t}: ${err.message}`)
    }
  }
}

async function lookupCIKBySearch(ticker) {
  const url = `${EDGAR_SEARCH}?q=%22${encodeURIComponent(ticker)}%22&dateRange=custom&startdt=2020-01-01&forms=10-K`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'EthosLogos CST Screener lawain@lawainmcneil.com' },
  })
  if (!res.ok) throw new Error(`EDGAR search failed: ${res.status}`)

  const data = await res.json()
  const hits = data?.hits?.hits || []
  if (!hits.length) throw new Error(`No EDGAR results for ticker: ${ticker}`)

  const first = hits[0]._source
  const cikRaw = first.entity_id || first.ciks?.[0]
  if (!cikRaw) throw new Error(`No CIK in EDGAR search result for: ${ticker}`)

  const cikStr = String(cikRaw).padStart(10, '0')
  const result = { cik: cikStr, cikRaw, ticker, companyName: first.display_names?.[0] || ticker }
  cikCache.set(ticker, result)
  return result
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY INFO — SIC, category, state of incorporation, fiscal year
// Returns the submissions JSON which has all filings and company metadata
// ─────────────────────────────────────────────────────────────────────────────
export async function getCompanyInfo(cik) {
  const paddedCIK = String(cik).padStart(10, '0')
  const url = `${EDGAR_BASE}/submissions/CIK${paddedCIK}.json`

  const res = await fetch(url, {
    headers: { 'User-Agent': 'EthosLogos CST Screener lawain@lawainmcneil.com' },
  })
  if (!res.ok) throw new Error(`EDGAR company info failed for CIK ${cik}: ${res.status}`)

  const data = await res.json()

  return {
    cik: paddedCIK,
    name: data.name,
    ticker: data.tickers?.[0] || '',
    exchanges: data.exchanges || [],
    sic: data.sic ? Number(data.sic) : null,
    sicDescription: data.sicDescription || '',
    stateOfIncorporation: data.stateOfIncorporation || '',
    category: data.category || '', // e.g. "Large accelerated filer"
    fiscalYearEnd: data.fiscalYearEnd || '',
    entityType: data.entityType || '',
    ein: data.ein || '',
    // Latest filing index for further drill-down
    recentFilings: {
      form: data.filings?.recent?.form || [],
      filingDate: data.filings?.recent?.filingDate || [],
      accessionNumber: data.filings?.recent?.accessionNumber || [],
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FULL EDGAR LOOKUP — Combines CIK + company info in one call
// ─────────────────────────────────────────────────────────────────────────────
export async function edgarLookup(ticker) {
  const cikResult = await lookupCIK(ticker)
  const companyInfo = await getCompanyInfo(cikResult.cik)

  return {
    ticker: ticker.toUpperCase(),
    cik: cikResult.cik,
    companyName: companyInfo.name || cikResult.companyName,
    sic: companyInfo.sic,
    sicDescription: companyInfo.sicDescription,
    stateOfIncorporation: companyInfo.stateOfIncorporation,
    category: companyInfo.category,
    entityType: companyInfo.entityType,
    exchanges: companyInfo.exchanges,
    recentFilings: companyInfo.recentFilings,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// LATEST 10-K ACCESSION — Find the most recent annual report
// Useful for pulling specific business description data
// ─────────────────────────────────────────────────────────────────────────────
export async function getLatest10K(cik) {
  const info = await getCompanyInfo(cik)
  const forms = info.recentFilings.form
  const dates = info.recentFilings.filingDate
  const accessions = info.recentFilings.accessionNumber

  // Find most recent 10-K or 10-K405
  for (let i = 0; i < forms.length; i++) {
    if (forms[i] === '10-K' || forms[i] === '10-K405') {
      return {
        form: forms[i],
        filingDate: dates[i],
        accessionNumber: accessions[i],
        viewUrl: `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${accessions[i].replace(/-/g, '')}/`,
      }
    }
  }
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// ETF HOLDINGS LOOKUP via EDGAR N-PORT
// ETFs file N-PORT monthly — contains full portfolio holdings with CUSIP/name
// Note: This is advanced; returns raw filing index, not parsed holdings
// ─────────────────────────────────────────────────────────────────────────────
export async function getLatestNPort(cik) {
  const info = await getCompanyInfo(cik)
  const forms = info.recentFilings.form
  const dates = info.recentFilings.filingDate
  const accessions = info.recentFilings.accessionNumber

  for (let i = 0; i < forms.length; i++) {
    if (forms[i] === 'N-PORT' || forms[i] === 'N-PORT/A') {
      return {
        form: forms[i],
        filingDate: dates[i],
        accessionNumber: accessions[i],
      }
    }
  }
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// MUTUAL FUND / ETF DETECTION
// Based on entity type and SIC code
// SIC 6726 = Investment Offices (holding companies, ETFs)
// SIC 6199 = Finance Services (broad)
// Entity type "Investment Company" = registered fund
// ─────────────────────────────────────────────────────────────────────────────
export function isFundType(companyInfo) {
  const fundSIC = [6726, 6199, 6726, 6221, 6211, 6282]
  const fundEntityTypes = ['Investment Company', 'Registered Investment Advisor']
  return (
    fundSIC.includes(companyInfo.sic) ||
    fundEntityTypes.some((t) => companyInfo.entityType?.includes(t)) ||
    companyInfo.category?.toLowerCase().includes('investment')
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRY CLASSIFICATION HELPER
// Returns human-readable sector from SIC code ranges
// ─────────────────────────────────────────────────────────────────────────────
export function getSectorFromSIC(sic) {
  if (!sic) return 'Unknown'
  const s = Number(sic)
  if (s >= 100 && s <= 999) return 'Agriculture'
  if (s >= 1000 && s <= 1499) return 'Mining'
  if (s >= 1500 && s <= 1799) return 'Construction'
  if (s >= 2000 && s <= 3999) return 'Manufacturing'
  if (s >= 4000 && s <= 4999) return 'Transportation & Utilities'
  if (s >= 5000 && s <= 5199) return 'Wholesale Trade'
  if (s >= 5200 && s <= 5999) return 'Retail Trade'
  if (s >= 6000 && s <= 6799) return 'Finance & Real Estate'
  if (s >= 7000 && s <= 8999) return 'Services'
  if (s >= 9000 && s <= 9999) return 'Government / Non-classified'
  return 'Unknown'
}
