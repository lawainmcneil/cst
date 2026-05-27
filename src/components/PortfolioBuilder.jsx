import { useState, useRef } from 'react'
import holdingsDB, { searchHoldings } from '../data/cstDatabase'
import { scorePortfolio, scoreHolding, getGradeColors, TIER_META } from '../utils/scoring'
import GradeDisplay from './GradeDisplay'
import FiduciaryReport from './FiduciaryReport'

export default function PortfolioBuilder() {
  const [entries, setEntries] = useState([])
  const [tickerInput, setTickerInput] = useState('')
  const [weightInput, setWeightInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [analysisResult, setAnalysisResult] = useState(null)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('pm')           // 'pm' | 'fiduciary'
  const [accountType, setAccountType] = useState('qualified') // 'qualified' | 'taxable'
  const tickerRef = useRef(null)

  const totalWeight = entries.reduce((sum, e) => sum + Number(e.weight || 0), 0)

  const handleTickerInput = (val) => {
    setTickerInput(val)
    setError('')
    if (val.trim().length >= 1) {
      setSuggestions(searchHoldings(val))
    } else {
      setSuggestions([])
    }
  }

  const addEntry = (ticker) => {
    const t = (ticker || tickerInput).trim().toUpperCase()
    const weight = Number(weightInput)
    setSuggestions([])

    if (!t) { setError('Please enter a ticker symbol.'); return }
    if (!holdingsDB[t]) { setError(`"${t}" not found in database. Try a known ticker.`); return }
    if (!weight || weight <= 0 || weight > 100) { setError('Enter a portfolio weight between 0.1% and 100%.'); return }
    if (entries.find((e) => e.ticker === t)) { setError(`${t} is already in the portfolio.`); return }

    setEntries([...entries, { ticker: t, holding: holdingsDB[t], weight }])
    setTickerInput('')
    setWeightInput('')
    setAnalysisResult(null)
    tickerRef.current?.focus()
  }

  const removeEntry = (ticker) => {
    setEntries(entries.filter((e) => e.ticker !== ticker))
    setAnalysisResult(null)
  }

  const runAnalysis = () => {
    if (entries.length === 0) { setError('Add at least one holding.'); return }
    const holdingEntries = entries.map((e) => ({
      holding: e.holding,
      portfolioWeight: Number(e.weight),
    }))
    setAnalysisResult(scorePortfolio(holdingEntries))
  }

  const clearAll = () => {
    setEntries([])
    setAnalysisResult(null)
    setError('')
    setViewMode('pm')
  }

  return (
    <section id="portfolio" className="py-16">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="section-label mb-2">Step 2 — Portfolio Analysis</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
            Full Portfolio Grade
          </h2>
          <p className="text-brand-muted text-lg max-w-xl mx-auto">
            Build your portfolio below. The engine calculates exact weighted exposure
            across all four tiers and issues a portfolio-wide CST fiduciary grade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: input + holdings list */}
          <div className="lg:col-span-3 space-y-4">
            {/* Add holding form */}
            <div className="card">
              <p className="section-label mb-3">Add Holding</p>
              <div className="flex gap-2">
                {/* Ticker input with autocomplete */}
                <div className="relative flex-1">
                  <input
                    ref={tickerRef}
                    type="text"
                    placeholder="Ticker (e.g. AAPL)"
                    value={tickerInput}
                    onChange={(e) => handleTickerInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addEntry()}
                    className="w-full px-4 py-2.5 border border-brand-border rounded-xl text-sm font-mono font-semibold uppercase placeholder:normal-case placeholder:font-normal bg-white focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-brand-border rounded-xl shadow-lg z-20 overflow-hidden">
                      {suggestions.map((h) => (
                        <button
                          key={h.ticker}
                          onClick={() => {
                            setTickerInput(h.ticker)
                            setSuggestions([])
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-brand-warm text-sm border-b border-brand-border/40 last:border-0"
                        >
                          <span className="font-mono font-bold text-brand-dark w-12">{h.ticker}</span>
                          <span className="text-brand-muted truncate flex-1 text-xs">{h.name}</span>
                          <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                            h.status === 'PASS' ? 'text-emerald-700 bg-emerald-50' :
                            h.status === 'FAIL' ? 'text-red-700 bg-red-50' :
                            'text-amber-700 bg-amber-50'
                          }`}>{h.status}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Weight input */}
                <div className="relative w-28">
                  <input
                    type="number"
                    placeholder="Weight %"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addEntry()}
                    min="0.1"
                    max="100"
                    step="0.1"
                    className="w-full px-3 py-2.5 pr-7 border border-brand-border rounded-xl text-sm bg-white focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted text-xs">%</span>
                </div>

                <button
                  onClick={() => addEntry()}
                  className="btn-primary py-2.5 px-4 text-sm flex-shrink-0"
                >
                  + Add
                </button>
              </div>

              {error && (
                <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
                  <span>⚠</span> {error}
                </p>
              )}

              {/* Weight indicator */}
              {entries.length > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-brand-muted">Total Allocated</span>
                    <span className={`font-semibold ${totalWeight > 100 ? 'text-red-600' : totalWeight === 100 ? 'text-emerald-600' : 'text-brand-dark'}`}>
                      {totalWeight.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-brand-warm rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${totalWeight > 100 ? 'bg-red-500' : totalWeight === 100 ? 'bg-emerald-500' : 'bg-brand-orange'}`}
                      style={{ width: `${Math.min(totalWeight, 100)}%` }}
                    />
                  </div>
                  {Math.abs(totalWeight - 100) > 0.1 && (
                    <p className="text-xs text-brand-muted mt-1">
                      {totalWeight < 100
                        ? `${(100 - totalWeight).toFixed(1)}% unallocated — weights will be normalized on analysis`
                        : `${(totalWeight - 100).toFixed(1)}% over-allocated — weights will be normalized`}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Holdings list */}
            {entries.length > 0 && (
              <div className="card">
                <div className="flex items-center justify-between mb-3">
                  <p className="section-label">Portfolio Holdings ({entries.length})</p>
                  <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-700 hover:underline">
                    Clear All
                  </button>
                </div>
                <div className="divide-y divide-brand-border">
                  {entries.map((e) => {
                    const s = scoreHolding(e.holding)
                    const colors = getGradeColors(s.gradeClass)
                    return (
                      <div key={e.ticker} className="flex items-center gap-3 py-2.5">
                        <span className="font-mono font-bold text-brand-dark text-sm w-14">{e.ticker}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-brand-dark truncate">{e.holding.name}</p>
                          <p className="text-xs text-brand-muted">{e.holding.sector}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>
                            {s.grade}
                          </span>
                          <span className="text-sm font-semibold text-brand-dark w-14 text-right">
                            {e.weight}%
                          </span>
                          <button
                            onClick={() => removeEntry(e.ticker)}
                            className="text-brand-muted hover:text-red-600 text-sm p-1"
                            aria-label="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-brand-border">
                  <button
                    onClick={runAnalysis}
                    className="btn-primary w-full justify-center"
                  >
                    Run Portfolio Analysis →
                  </button>
                </div>
              </div>
            )}

            {entries.length === 0 && (
              <div className="card py-10 text-center border-dashed border-2 border-brand-border bg-brand-warm/50">
                <p className="text-brand-muted text-sm">
                  Add holdings above to begin building your portfolio for CST analysis.
                </p>
                <p className="text-brand-muted text-xs mt-1 opacity-70">
                  Try adding: AAPL 40% + SPY 40% + PFE 20%
                </p>
              </div>
            )}
          </div>

          {/* Right: Results panel */}
          <div className="lg:col-span-2">
            {analysisResult ? (
              <div className="space-y-3">
                {/* ── View toggle ───────────────────────────────────────── */}
                <div className="card p-1.5">
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => setViewMode('pm')}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                        viewMode === 'pm'
                          ? 'bg-brand-dark text-white'
                          : 'text-brand-muted hover:bg-brand-warm'
                      }`}
                    >
                      PM Audit Trail
                    </button>
                    <button
                      onClick={() => setViewMode('fiduciary')}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                        viewMode === 'fiduciary'
                          ? 'bg-brand-orange text-white'
                          : 'text-brand-muted hover:bg-brand-warm'
                      }`}
                    >
                      Fiduciary Report
                    </button>
                  </div>
                </div>

                {/* ── Account type selector (shown in Fiduciary view) ───── */}
                {viewMode === 'fiduciary' && (
                  <div className="card p-1.5">
                    <p className="text-[10px] text-brand-muted text-center mb-1.5 uppercase tracking-wider font-semibold">
                      Account Type
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        onClick={() => setAccountType('qualified')}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          accountType === 'qualified'
                            ? 'bg-emerald-600 text-white'
                            : 'text-brand-muted hover:bg-brand-warm'
                        }`}
                      >
                        Qualified (IRA/401k)
                      </button>
                      <button
                        onClick={() => setAccountType('taxable')}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          accountType === 'taxable'
                            ? 'bg-emerald-600 text-white'
                            : 'text-brand-muted hover:bg-brand-warm'
                        }`}
                      >
                        Taxable Account
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Active view ───────────────────────────────────────── */}
                {viewMode === 'pm' ? (
                  <PortfolioResults result={analysisResult} entries={entries} />
                ) : (
                  <FiduciaryReport
                    result={analysisResult}
                    entries={entries}
                    accountType={accountType}
                  />
                )}
              </div>
            ) : (
              <div className="card py-10 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-warm flex items-center justify-center mb-4">
                  <span className="font-serif text-3xl text-brand-orange font-bold">?</span>
                </div>
                <p className="font-serif text-lg text-brand-dark mb-1">Portfolio Grade</p>
                <p className="text-xs text-brand-muted max-w-[200px]">
                  Add holdings and run the analysis to receive your fiduciary grade.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function PortfolioResults({ result, entries }) {
  const [expanded, setExpanded] = useState(false)
  const colors = getGradeColors(result.gradeClass)

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Grade */}
      <GradeDisplay
        grade={result.grade}
        gradeClass={result.gradeClass}
        score={Number(result.alignmentScore)}
        violationPct={Number(result.violationExposure)}
        tier1Fail={result.tier1Fail}
      />

      {/* Exposure breakdown */}
      <div className="card">
        <p className="section-label mb-3">Violation Exposure</p>
        <div className="space-y-3">
          <ExposureRow
            label="Tier 1 — Intrinsic Evils"
            value={result.tier1Fail ? '100.00' : '0.00'}
            color="text-red-700"
            bg={result.tier1Fail ? 'bg-red-50' : 'bg-brand-warm'}
          />
          <ExposureRow
            label="Tier 2 — Vice & Negligence"
            value={result.tier2Exposure}
            color="text-amber-800"
            bg="bg-amber-50"
            show={Number(result.tier2Exposure) > 0}
          />
          <ExposureRow
            label="Tier 3 — Cultural Scandal"
            value={result.tier3Exposure}
            color="text-orange-800"
            bg="bg-orange-50"
            show={Number(result.tier3Exposure) > 0}
          />
          <ExposureRow
            label="Tier 4 — Vice Inverse"
            value={result.tier4Exposure || '0.00'}
            color="text-purple-800"
            bg="bg-purple-50"
            show={Number(result.tier4Exposure) > 0}
          />
          <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${colors.bg} border ${colors.border}`}>
            <span className={`text-xs font-bold ${colors.text}`}>Total Violation</span>
            <span className={`font-mono font-bold text-sm ${colors.text}`}>{result.violationExposure}%</span>
          </div>
        </div>
      </div>

      {/* Per-holding breakdown */}
      {result.breakdown && (
        <div className="card">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between"
          >
            <p className="section-label">Per-Holding Breakdown</p>
            <span className={`text-brand-orange transition-transform ${expanded ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {expanded && (
            <div className="mt-3 divide-y divide-brand-border animate-fade-in-up">
              {result.breakdown.map((b) => {
                const cols = getGradeColors(b.status === 'PASS' ? 'grade-a' :
                  b.tier === 1 ? 'grade-f' : b.tier === 2 ? 'grade-c' : 'grade-d')
                return (
                  <div key={b.ticker} className="flex items-center gap-2 py-2">
                    <span className="font-mono font-bold text-brand-dark text-xs w-12">{b.ticker}</span>
                    <span className="text-xs text-brand-muted flex-1">{b.portfolioWeight.toFixed(1)}%</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cols.badge}`}>{b.grade}</span>
                    <span className="font-mono text-xs text-brand-muted w-14 text-right">
                      {b.exposureContribution}% exp.
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Stewardship plan */}
      <div className="card bg-brand-dark text-white">
        <p className="section-label text-brand-orange mb-2">Stewardship Plan</p>
        <p className="text-xs text-white/70 mb-3">
          To achieve complete moral alignment with Catholic Social Teaching:
        </p>
        <div className="space-y-2">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs font-bold text-white">Qualified Accounts (IRA/401k)</p>
            <p className="text-xs text-white/70 mt-1">
              Moral alignment can be achieved immediately with zero tax friction. Replace
              non-aligned funds with CATH or a Catholic-responsible SMA.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-xs font-bold text-white">Taxable Accounts</p>
            <p className="text-xs text-white/70 mt-1">
              A custom transition plan can systematically harvest tax losses while
              unwinding violating positions — transforming this realignment into an
              after-tax wealth optimization.
            </p>
          </div>
        </div>
        <a
          href="https://ethoslogosinvestments.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-white mt-4 w-full justify-center text-xs py-2"
        >
          Schedule a Fiduciary Review →
        </a>
      </div>
    </div>
  )
}

function ExposureRow({ label, value, color, bg, show = true }) {
  if (!show && Number(value) === 0) return null
  return (
    <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${bg}`}>
      <span className={`text-xs font-medium ${color}`}>{label}</span>
      <span className={`font-mono font-bold text-sm ${color}`}>{Number(value).toFixed(2)}%</span>
    </div>
  )
}
