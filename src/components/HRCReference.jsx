import { useState, useMemo } from 'react'
import HRC_CEI from '../data/hrcCEI'
import holdingsDB from '../data/cstDatabase'

const PAGE_SIZE = 50

// Score → CST risk level (higher HRC score = higher CST concern)
function getRiskLevel(score, abortionTravel, genderTrans) {
  if (score === 0) return { label: 'Non-Participant', color: 'bg-emerald-100 text-emerald-800', bar: 'bg-emerald-500', risk: 0 }
  if (score === 100 && abortionTravel && genderTrans) return { label: 'High Risk', color: 'bg-red-100 text-red-800', bar: 'bg-red-600', risk: 3 }
  if (score >= 80 && (abortionTravel || genderTrans)) return { label: 'Elevated Risk', color: 'bg-amber-100 text-amber-800', bar: 'bg-amber-500', risk: 2 }
  if (score >= 1) return { label: 'Review', color: 'bg-yellow-100 text-yellow-800', bar: 'bg-yellow-400', risk: 1 }
  return { label: 'Non-Participant', color: 'bg-emerald-100 text-emerald-800', bar: 'bg-emerald-500', risk: 0 }
}

const FLAG_YES = (
  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
    ⚠ Yes
  </span>
)
const FLAG_NO = (
  <span className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
    ✓ No
  </span>
)
const FLAG_UNKNOWN = (
  <span className="inline-flex items-center text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
    ? Est.
  </span>
)

export default function HRCReference() {
  const [search, setSearch] = useState('')
  const [scoreFilter, setScoreFilter] = useState('all') // 'all' | '100' | '80-99' | '1-79' | '0'
  const [flagFilter, setFlagFilter] = useState('all') // 'all' | 'abortion' | 'gender' | 'both' | 'none'
  const [confirmedFilter, setConfirmedFilter] = useState('all') // 'all' | 'confirmed' | 'estimated'
  const [inDBFilter, setInDBFilter] = useState('all') // 'all' | 'yes' | 'no'
  const [sortBy, setSortBy] = useState('score-desc') // 'score-desc' | 'score-asc' | 'ticker' | 'name'
  const [page, setPage] = useState(1)

  // Build flat array from the HRC_CEI object
  const allEntries = useMemo(() => {
    return Object.entries(HRC_CEI).map(([ticker, data]) => ({
      ticker,
      name: data.name || ticker,
      score: data.score ?? 0,
      abortionTravel: data.abortionTravel ?? false,
      genderTrans: data.genderTrans ?? false,
      confirmed: data.confirmed ?? false,
      inDB: !!holdingsDB[ticker],
    }))
  }, [])

  // Stats
  const stats = useMemo(() => {
    const total = allEntries.length
    const score100 = allEntries.filter((e) => e.score === 100).length
    const withAbortion = allEntries.filter((e) => e.abortionTravel).length
    const withGender = allEntries.filter((e) => e.genderTrans).length
    const confirmed = allEntries.filter((e) => e.confirmed).length
    const nonParticipant = allEntries.filter((e) => e.score === 0).length
    const inDB = allEntries.filter((e) => e.inDB).length
    return { total, score100, withAbortion, withGender, confirmed, nonParticipant, inDB }
  }, [allEntries])

  // Filter + sort
  const filtered = useMemo(() => {
    let result = allEntries

    // Search
    if (search.trim()) {
      const q = search.trim().toUpperCase()
      result = result.filter(
        (e) =>
          e.ticker.toUpperCase().includes(q) ||
          e.name.toUpperCase().includes(q.toUpperCase().replace(/[^A-Z0-9 ]/g, ''))
      )
    }

    // Score filter
    if (scoreFilter === '100') result = result.filter((e) => e.score === 100)
    else if (scoreFilter === '80-99') result = result.filter((e) => e.score >= 80 && e.score < 100)
    else if (scoreFilter === '1-79') result = result.filter((e) => e.score >= 1 && e.score < 80)
    else if (scoreFilter === '0') result = result.filter((e) => e.score === 0)

    // Flag filter
    if (flagFilter === 'both') result = result.filter((e) => e.abortionTravel && e.genderTrans)
    else if (flagFilter === 'abortion') result = result.filter((e) => e.abortionTravel)
    else if (flagFilter === 'gender') result = result.filter((e) => e.genderTrans)
    else if (flagFilter === 'none') result = result.filter((e) => !e.abortionTravel && !e.genderTrans)

    // Confirmed filter
    if (confirmedFilter === 'confirmed') result = result.filter((e) => e.confirmed)
    else if (confirmedFilter === 'estimated') result = result.filter((e) => !e.confirmed)

    // In DB filter
    if (inDBFilter === 'yes') result = result.filter((e) => e.inDB)
    else if (inDBFilter === 'no') result = result.filter((e) => !e.inDB)

    // Sort
    if (sortBy === 'score-desc') result = [...result].sort((a, b) => b.score - a.score)
    else if (sortBy === 'score-asc') result = [...result].sort((a, b) => a.score - b.score)
    else if (sortBy === 'ticker') result = [...result].sort((a, b) => a.ticker.localeCompare(b.ticker))
    else if (sortBy === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name))

    return result
  }, [allEntries, search, scoreFilter, flagFilter, confirmedFilter, inDBFilter, sortBy])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const resetFilters = () => {
    setSearch('')
    setScoreFilter('all')
    setFlagFilter('all')
    setConfirmedFilter('all')
    setInDBFilter('all')
    setSortBy('score-desc')
    setPage(1)
  }

  const handleFilter = (setter) => (val) => {
    setter(val)
    setPage(1)
  }

  const activeFilterCount = [
    search.trim() ? 1 : 0,
    scoreFilter !== 'all' ? 1 : 0,
    flagFilter !== 'all' ? 1 : 0,
    confirmedFilter !== 'all' ? 1 : 0,
    inDBFilter !== 'all' ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <section id="hrc" className="py-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-label mb-2">CST Data Source</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
            HRC Corporate Equality Index
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            The HRC CEI is the primary Tier 3 data source for corporate benefits screening.
            Companies scoring 100 are required to offer abortion travel reimbursement and
            gender-transition benefits — both Tier 3 violations under the CST framework.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          <StatChip label="Total Companies" value={stats.total.toLocaleString()} />
          <StatChip label="Score 100" value={stats.score100.toLocaleString()} color="text-red-700" />
          <StatChip label="Abortion Travel" value={stats.withAbortion.toLocaleString()} color="text-red-600" />
          <StatChip label="Gender Transition" value={stats.withGender.toLocaleString()} color="text-amber-700" />
          <StatChip label="Confirmed" value={stats.confirmed.toLocaleString()} color="text-blue-700" />
          <StatChip label="Non-Participant" value={stats.nonParticipant.toLocaleString()} color="text-emerald-700" />
          <StatChip label="In CST DB" value={stats.inDB.toLocaleString()} color="text-brand-orange" />
        </div>

        {/* Disclaimer */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
          <span className="text-xl mt-0.5 flex-shrink-0">⚠</span>
          <p>
            <strong>Screening note:</strong> A higher HRC CEI score indicates <em>greater</em> CST concern.
            Score 0 / non-participant companies have no confirmed Tier 3 benefits but may still have
            other violations. All non-confirmed entries are estimated from HRC CEI profiles —
            always verify with live HRC database query before final fiduciary disposition.
            Source: <a href="https://www.hrc.org/resources/corporate-equality-index" target="_blank" rel="noopener noreferrer" className="underline font-semibold">HRC Foundation CEI 2023/2024</a>.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="card mb-6 space-y-4">
          {/* Search row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by ticker or company name…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="w-full pl-9 pr-4 py-2.5 border border-brand-border rounded-xl text-sm bg-white focus:outline-none focus:border-brand-orange transition-colors"
              />
              {search && (
                <button
                  onClick={() => { setSearch(''); setPage(1) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark"
                >✕</button>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-brand-orange hover:underline whitespace-nowrap flex-shrink-0"
              >
                Clear all ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-4">

            {/* Score filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-brand-muted uppercase tracking-wide">Score:</span>
              {[
                { val: 'all', label: 'All' },
                { val: '100', label: '100 (Highest Risk)' },
                { val: '80-99', label: '80–99' },
                { val: '1-79', label: '1–79' },
                { val: '0', label: '0 / Non-Participant' },
              ].map(({ val, label }) => (
                <FilterChip
                  key={val}
                  active={scoreFilter === val}
                  onClick={() => handleFilter(setScoreFilter)(val)}
                >
                  {label}
                </FilterChip>
              ))}
            </div>

            {/* Tier 3 flag filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-brand-muted uppercase tracking-wide">Tier 3 Flag:</span>
              {[
                { val: 'all', label: 'All' },
                { val: 'both', label: 'Both flags' },
                { val: 'abortion', label: 'Abortion Travel' },
                { val: 'gender', label: 'Gender Transition' },
                { val: 'none', label: 'No flags' },
              ].map(({ val, label }) => (
                <FilterChip
                  key={val}
                  active={flagFilter === val}
                  onClick={() => handleFilter(setFlagFilter)(val)}
                >
                  {label}
                </FilterChip>
              ))}
            </div>

            {/* Confirmed / Estimated */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-brand-muted uppercase tracking-wide">Data:</span>
              {[
                { val: 'all', label: 'All' },
                { val: 'confirmed', label: 'Confirmed' },
                { val: 'estimated', label: 'Estimated' },
              ].map(({ val, label }) => (
                <FilterChip
                  key={val}
                  active={confirmedFilter === val}
                  onClick={() => handleFilter(setConfirmedFilter)(val)}
                >
                  {label}
                </FilterChip>
              ))}
            </div>

            {/* In CST DB */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-brand-muted uppercase tracking-wide">In CST DB:</span>
              {[
                { val: 'all', label: 'All' },
                { val: 'yes', label: 'Yes' },
                { val: 'no', label: 'No' },
              ].map(({ val, label }) => (
                <FilterChip
                  key={val}
                  active={inDBFilter === val}
                  onClick={() => handleFilter(setInDBFilter)(val)}
                >
                  {label}
                </FilterChip>
              ))}
            </div>
          </div>

          {/* Sort + result count */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-brand-border">
            <p className="text-sm text-brand-muted">
              Showing <span className="font-semibold text-brand-dark">{filtered.length.toLocaleString()}</span> of{' '}
              <span className="font-semibold">{stats.total.toLocaleString()}</span> companies
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setPage(1) }}
                className="text-xs border border-brand-border rounded-lg px-2 py-1.5 bg-white text-brand-dark focus:outline-none focus:border-brand-orange"
              >
                <option value="score-desc">Score (High → Low)</option>
                <option value="score-asc">Score (Low → High)</option>
                <option value="ticker">Ticker (A → Z)</option>
                <option value="name">Company Name (A → Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card p-0 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[80px_1fr_90px_110px_120px_90px_70px] gap-3 px-4 py-3 bg-brand-warm border-b border-brand-border text-xs font-bold uppercase tracking-wide text-brand-muted">
            <span>Ticker</span>
            <span>Company</span>
            <span className="text-center">HRC Score</span>
            <span className="text-center">Abortion Travel</span>
            <span className="text-center">Gender Transition</span>
            <span className="text-center">Data</span>
            <span className="text-center">CST DB</span>
          </div>

          {/* Rows */}
          {paginated.length === 0 ? (
            <div className="py-12 text-center text-brand-muted text-sm">
              No companies match the current filters.
            </div>
          ) : (
            <div className="divide-y divide-brand-border/50">
              {paginated.map((entry) => {
                const risk = getRiskLevel(entry.score, entry.abortionTravel, entry.genderTrans)
                return (
                  <div
                    key={entry.ticker}
                    className="grid grid-cols-[80px_1fr_90px_110px_120px_90px_70px] gap-3 px-4 py-3 items-center hover:bg-brand-warm/50 transition-colors"
                  >
                    {/* Ticker */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand-dark text-sm">{entry.ticker}</span>
                    </div>

                    {/* Company name + risk badge */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-brand-dark truncate">{entry.name}</span>
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${risk.color}`}>
                          {risk.label}
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className={`text-sm font-bold ${
                          entry.score === 100 ? 'text-red-700' :
                          entry.score >= 80 ? 'text-amber-700' :
                          entry.score >= 1 ? 'text-yellow-700' :
                          'text-emerald-700'
                        }`}>
                          {entry.score}
                        </span>
                        <div className="w-12 h-1 rounded-full bg-brand-border mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${risk.bar}`}
                            style={{ width: `${entry.score}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Abortion Travel */}
                    <div className="text-center">
                      {entry.score === 0 ? FLAG_NO :
                       entry.abortionTravel && entry.confirmed ? FLAG_YES :
                       entry.abortionTravel && !entry.confirmed ? FLAG_UNKNOWN :
                       FLAG_NO}
                    </div>

                    {/* Gender Transition */}
                    <div className="text-center">
                      {entry.score === 0 ? FLAG_NO :
                       entry.genderTrans && entry.confirmed ? FLAG_YES :
                       entry.genderTrans && !entry.confirmed ? FLAG_UNKNOWN :
                       FLAG_NO}
                    </div>

                    {/* Confirmed / Estimated */}
                    <div className="text-center">
                      {entry.score === 0 ? (
                        <span className="text-xs text-slate-400">N/A</span>
                      ) : entry.confirmed ? (
                        <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full">Confirmed</span>
                      ) : (
                        <span className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded-full">Estimated</span>
                      )}
                    </div>

                    {/* In CST DB */}
                    <div className="text-center">
                      {entry.inDB ? (
                        <span className="text-xs font-semibold text-brand-orange bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded-full">✓ Yes</span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-brand-muted">
              Page {page} of {totalPages} · {filtered.length} results
            </p>
            <div className="flex items-center gap-1">
              <PagBtn disabled={page === 1} onClick={() => setPage(1)}>«</PagBtn>
              <PagBtn disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</PagBtn>
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let p
                if (totalPages <= 7) p = i + 1
                else if (page <= 4) p = i + 1
                else if (page >= totalPages - 3) p = totalPages - 6 + i
                else p = page - 3 + i
                return (
                  <PagBtn key={p} active={p === page} onClick={() => setPage(p)}>{p}</PagBtn>
                )
              })}
              <PagBtn disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</PagBtn>
              <PagBtn disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</PagBtn>
            </div>
          </div>
        )}

        {/* Source note */}
        <p className="text-xs text-brand-muted text-center mt-6">
          Data sourced from the HRC Foundation Corporate Equality Index 2023/2024 public report.
          Entries marked "Estimated" are inferred from HRC scoring rubric — not individually confirmed.
          For formal fiduciary use, verify against the live{' '}
          <a href="https://www.hrc.org/resources/corporate-equality-index" target="_blank" rel="noopener noreferrer" className="text-brand-orange underline">HRC CEI database</a>.
        </p>
      </div>
    </section>
  )
}

function StatChip({ label, value, color = 'text-brand-dark' }) {
  return (
    <div className="card py-3 px-4 text-center">
      <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
      <p className="text-xs text-brand-muted mt-0.5 leading-tight">{label}</p>
    </div>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-colors ${
        active
          ? 'bg-brand-orange text-white border-brand-orange'
          : 'bg-white text-brand-dark border-brand-border hover:border-brand-orange hover:text-brand-orange'
      }`}
    >
      {children}
    </button>
  )
}

function PagBtn({ active, disabled, onClick, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${
        active
          ? 'bg-brand-orange text-white'
          : disabled
          ? 'text-brand-muted opacity-40 cursor-not-allowed'
          : 'text-brand-dark hover:bg-brand-warm border border-brand-border'
      }`}
    >
      {children}
    </button>
  )
}
