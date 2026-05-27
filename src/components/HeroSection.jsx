export default function HeroSection({ activeTab, setActiveTab }) {
  return (
    <section
      className="relative min-h-[420px] flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1A1108 0%, #2C1F0E 45%, #3D2A12 100%)',
      }}
    >
      {/* Decorative cross pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="crossPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <line x1="30" y1="10" x2="30" y2="50" stroke="#C4682A" strokeWidth="1" />
              <line x1="10" y1="30" x2="50" y2="30" stroke="#C4682A" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crossPattern)" />
        </svg>
      </div>

      {/* Radial glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #C4682A 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/80">
              Ethos Logos Investments
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Portfolios screened
            <br />
            <span className="text-brand-orange">for faith and</span> reason.
          </h1>

          {/* Sub */}
          <p className="text-white/70 text-lg sm:text-xl max-w-xl leading-relaxed mb-8">
            The only investment screener that applies the full four-tier framework
            of Catholic Social Teaching — from <em>Evangelium Vitae</em> to{' '}
            <em>Mensuram Bonam</em> — with precise quantitative scoring.
          </p>

          {/* Tab switcher */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setActiveTab('screener')
                document.getElementById('screener')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                activeTab === 'screener'
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              Quick Screen →
            </button>
            <button
              onClick={() => {
                setActiveTab('portfolio')
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              Portfolio Analysis →
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-10">
          {[
            { value: '4', label: 'Screening Tiers' },
            { value: '30+', label: 'Securities Profiled' },
            { value: 'A–F', label: 'Fiduciary Grade' },
            { value: '100%', label: 'Magisterium-Aligned' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-serif text-3xl font-bold text-brand-orange">{value}</div>
              <div className="text-xs text-white/50 mt-1 tracking-wider uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
