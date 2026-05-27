import { useState, useRef } from 'react'
import holdingsDB, { searchHoldings } from '../data/cstDatabase'
import HoldingResult from './HoldingResult'

const SUGGESTIONS = ['AAPL', 'PFE', 'DIS', 'PM', 'CVX', 'SPY', 'CATH', 'META', 'QQQ', 'GEO']

export default function QuickScreener() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [notFound, setNotFound] = useState(false)
  const inputRef = useRef(null)

  const handleSearch = (ticker) => {
    const t = (ticker || query).trim().toUpperCase()
    const holding = holdingsDB[t]
    setSuggestions([])
    if (holding) {
      setResult(holding)
      setNotFound(false)
    } else {
      setResult(null)
      setNotFound(true)
    }
  }

  const handleInput = (val) => {
    setQuery(val)
    setNotFound(false)
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
    setNotFound(false)
    setSuggestions([])
    inputRef.current?.focus()
  }

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
            Enter a ticker symbol to run an instant four-tier Catholic Social Teaching analysis against
            the Ethos Logos Fiduciary Protocol.
          </p>
        </div>

        {/* Search box */}
        <div className="relative mb-6">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-brand-muted">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter ticker symbol, e.g. AAPL, PFE, SPY, CATH..."
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-32 py-4 text-base border-2 border-brand-border rounded-2xl bg-white text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-orange transition-colors shadow-sm"
              autoFocus
            />
            <div className="absolute right-2 flex items-center gap-1">
              {query && (
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
                className="btn-primary py-2 px-5 text-sm"
              >
                Screen
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
        {!result && !notFound && (
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

        {/* Results */}
        {result && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-brand-muted">
                Screening result for <span className="font-mono font-bold text-brand-dark">{result.ticker}</span>
              </p>
              <button
                onClick={handleClear}
                className="text-xs text-brand-orange hover:underline"
              >
                ← New Search
              </button>
            </div>
            <HoldingResult holding={result} />
          </div>
        )}

        {/* Not Found */}
        {notFound && (
          <div className="mt-4 animate-fade-in-up">
            <div className="card text-center py-10">
              <div className="w-16 h-16 rounded-full bg-brand-warm mx-auto mb-4 flex items-center justify-center">
                <span className="text-brand-orange text-2xl font-bold">?</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-brand-dark mb-2">
                "{query.toUpperCase()}" Not in Database
              </h3>
              <p className="text-brand-muted text-sm max-w-sm mx-auto mb-6">
                This security is not in the current screening database. A complete fiduciary analysis
                requires live integration with SEC EDGAR, HRC CEI, and ProPublica data sources.
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
          </div>
        )}
      </div>
    </section>
  )
}
