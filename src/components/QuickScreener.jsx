import { useState, useRef } from 'react'
import holdingsDB, { searchHoldings } from '../data/cstDatabase'
import { autoScreenTicker } from '../services/autoScreen'
import { enrichWithHRC } from '../utils/enrichHolding'
import HoldingResult from './HoldingResult'

const SUGGESTIONS = ['AAPL', 'PFE', 'DIS', 'PM', 'CVX', 'SPY', 'CATH', 'META', 'QQQ', 'GEO']

export default function QuickScreener() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [screenState, setScreenState] = useState('idle') // 'idle' | 'loading' | 'found' | 'provisional' | 'error'
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef(null)

  const handleSearch = async (ticker) => {
    const t = (ticker || query).trim().toUpperCase()
    if (!t) return

    setSuggestions([])
    setResult(null)
    setErrorMsg('')

    // 1. Check manual database first — then enrich with HRC CEI
    const manualHolding = holdingsDB[t]
    if (manualHolding) {
      setResult(enrichWithHRC(manualHolding))
      setScreenState('found')
      return
    }

    // 2. Not in manual DB — run EDGAR auto-screen
    setScreenState('loading')
    try {
      const provisional = await autoScreenTicker(t)
      setResult(provisional)
      setScreenState('provisional')
    } catch (err) {
      setScreenState('error')
      setErrorMsg(err.message || 'EDGAR lookup failed')
    }
  }

  const handleInput = (val) => {
    setQuery(val)
    setScreenState('idle')
    setResult(null)
    setErrorMsg('')
    if (val.trim().length >= 1) {
      setSuggestions(searchHoldings(val))
    } else {
      setSuggestions([])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
    if (e.key === 'Escape') setSuggestions([])
  }

  const handleClear = () => {
    setQuery('')
    setResult(null)
    setScreenState('idle')
    setErrorMsg('')
    setSuggestions([])
    inputRef.current?.focus()
  }

  const isLoading = screenState === 'loading'
  const isProvisional = screenState === 'provisional'

  return (
    <section id="screener" className="py-16">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="section-label mb-2">Step 1 — Quick Screen</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
            Screen Any Investment
          </h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto">
            Enter a ticker symbol to run an instant four-tier Catholic Social Teaching analysis.
            Unknown tickers are auto-screened live via SEC EDGAR.
          </p>
        </div>

        {/* Search box */}
        <div className="relative mb-6">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-brand-muted">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter ticker symbol, e.g. AAPL, PFE, SPY, NVDA..."
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="w-full pl-12 pr-32 py-4 text-base border-2 border-brand-border rounded-2xl bg-white text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-orange transition-colors shadow-sm disabled:opacity-60"
              autoFocus
            />
            <div className="absolute right-2 flex items-center gap-1">
              {query && !isLoading && (
                <button
                  onClick={handleClear}
                  className="p-2 text-brand-muted hover:text-brand-dark rounded-lg"
                  aria-label="Clear"
                >
                  ✕
                </button>
              )}
              <button
                onClick={() => handleSearch()}
                disabled={isLoading || !query.trim()}
                className="btn-primary py-2 px-5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Screening…' : 'Screen'}
              </button>
            </div>
          </div>

          {/* Autocomplete dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-brand-border rounded-xl shadow-lg z-20 overflow-hidden">
              {suggestions.map((h) => (
                <button
                  key={h.ticker}
                  onClick={() => {
                    setQuery(h.ticker)
                    handleSearch(h.ticker)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-brand-warm transition-colors border-b border-brand-border/50 last:border-0"
                >
                  <span className="font-mono font-bold text-brand-dark w-14 text-sm">{h.ticker}</span>
                  <span className="text-sm text-brand-muted flex-1 truncate">{h.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    h.status === 'PASS' ? 'bg-emerald-100 text-emerald-700' :
                    h.status === 'FAIL' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {h.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick-pick chips */}
        {screenState === 'idle' && !result && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <span className="text-xs text-brand-muted self-center mr-1">Try:</span>
            {SUGGESTIONS.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setQuery(t)
                  handleSearch(t)
                }}
                className="px-3 py-1.5 text-xs font-mono font-semibold text-brand-dark bg-white border border-brand-border rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="mt-4 animate-fade-in-up">
            <div className="card text-center py-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <LoadingSpinner size={28} />
                <span className="font-serif text-lg text-brand-dark font-semibold">
                  Running EDGAR Auto-Screen…
                </span>
              </div>
              <p className="text-brand-muted text-sm max-w-sm mx-auto">
                Querying SEC EDGAR for company metadata, SIC classification,
                and HRC CEI benefits data for{' '}
                <span className="font-mono font-bold">{query.toUpperCase()}</span>.
              </p>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-brand-muted">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                  SEC EDGAR
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse delay-150" />
                  SIC Classification
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse delay-300" />
                  HRC CEI
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && screenState !== 'loading' && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-brand-muted">
                  Screening result for{' '}
                  <span className="font-mono font-bold text-brand-dark">{result.ticker}</span>
                </p>
                {isProvisional && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    <span>⚡</span> EDGAR Auto-Screen
                  </span>
                )}
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-brand-orange hover:underline"
              >
                ← New Search
              </button>
            </div>

            {/* Provisional disclaimer banner */}
            {isProvisional && (
              <div className="mb-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">⚡</span>
                  <div>
                    <p className="font-semibold mb-1">Provisional EDGAR Auto-Screen</p>
                    <p className="text-amber-800 leading-relaxed">
                      This result was generated live from SEC EDGAR data and has not been manually
                      reviewed by an Ethos Logos analyst. SIC classification and HRC CEI data
                      are used as proxies — actual CST compliance requires filings review.
                      Treat this as a <strong>preliminary screening signal only</strong>.
                    </p>
                    {result.edgarData?.cik && (
                      <a
                        href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${result.edgarData.cik}&type=10-K`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-amber-700 underline hover:text-amber-900"
                      >
                        View EDGAR filings for {result.ticker} →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            <HoldingResult holding={result} provisional={isProvisional} />

            {/* Analyst CTA only for provisional results */}
            {isProvisional && (
              <div className="mt-4 p-4 rounded-xl bg-brand-dark text-white text-center">
                <p className="font-serif text-lg font-semibold mb-1">Need a Verified Analysis?</p>
                <p className="text-sm text-white/70 mb-3">
                  An Ethos Logos analyst can provide a full fiduciary review with documented
                  sources, encyclical citations, and a stewardship action plan.
                </p>
                <a
                  href="https://ethoslogosinvestments.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Schedule a Full Fiduciary Review →
                </a>
              </div>
            )}
          </div>
        )}

        {/* Error state */}
        {screenState === 'error' && (
          <div className="mt-4 animate-fade-in-up">
            <div className="card text-center py-10">
              <div className="w-16 h-16 rounded-full bg-red-50 mx-auto mb-4 flex items-center justify-center">
                <span className="text-red-600 text-2xl font-bold">!</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-brand-dark mb-2">
                EDGAR Lookup Failed
              </h3>
              <p className="text-brand-muted text-sm max-w-sm mx-auto mb-2">
                Could not find <span className="font-mono font-bold">{query.toUpperCase()}</span> in
                SEC EDGAR. This may not be a U.S. exchange-listed security, or the ticker may
                be incorrect.
              </p>
              {errorMsg && (
                <p className="text-xs text-red-500 font-mono mb-4 max-w-xs mx-auto">{errorMsg}</p>
              )}
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  onClick={handleClear}
                  className="btn-outline text-sm"
                >
                  Try Another Ticker
                </button>
                <a
                  href="https://ethoslogosinvestments.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  Contact an Analyst →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function LoadingSpinner({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin text-brand-orange"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
