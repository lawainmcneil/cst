import { useState } from 'react'

const TIERS = [
  {
    number: 1,
    title: 'Intrinsic Evil',
    subtitle: 'The Kill Switch — 0% Tolerance',
    penalty: '−100 pts / Grade F',
    color: {
      bg: 'bg-red-700',
      light: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      accent: 'text-red-700',
    },
    encyclical: 'Evangelium Vitae (John Paul II)',
    compendium: 'Compendium §§403–410',
    description:
      'Corporate actions within Tier 1 directly oppose the fundamental, non-negotiable right to life and physical integrity of the human person. These actions are defined as intrinsically evil — morally unacceptable regardless of circumstances, intentions, or broader social contributions.',
    scope: [
      'Active embryonic stem cell research & therapeutic cloning',
      'Abortion providers & abortifacient manufacturers',
      'Human trafficking & forced labor operations',
      'Pornography production & distribution',
      'Human commodification (for-profit private prisons)',
      'Eugenics programs',
    ],
    logic: 'SEC Parent CIK → Global Subsidiary Map (OpenCorporates) → Keyword & NAICS scan across all active subsidiaries.',
    ncbcNote:
      'The use of historical immortalized cell lines (e.g., HEK-293) for testing when no alternative exists is classified as remote, completed material cooperation under NCBC guidelines (Dignitas Personae, n.35) and does NOT trigger a Tier 1 Kill Switch.',
  },
  {
    number: 2,
    title: 'Vice & Negligence',
    subtitle: 'Temperance Threshold — >5% Gross Revenue',
    penalty: '−20 pts',
    color: {
      bg: 'bg-amber-700',
      light: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
      accent: 'text-amber-700',
    },
    encyclical: 'Centesimus Annus (John Paul II, §36)',
    compendium: 'Compendium §358; Mensuram Bonam (2022)',
    description:
      'Tier 2 addresses sectors that, while not intrinsically evil, present significant systemic risks to personal temperance, familial stability, and social well-being. The 5% gross revenue threshold is the materiality test.',
    scope: [
      'Commercial manufacture of alcoholic beverages (>5% revenue)',
      'Production & marketing of tobacco products (>5% revenue)',
      'Operation or technology licensing of commercial gambling (>5% revenue)',
    ],
    logic:
      'Query SEC Form 10-K segment revenue data to isolate gross revenue from restricted activities. Fail if >5% threshold exceeded.',
    ncbcNote: null,
  },
  {
    number: 3,
    title: 'Cooperation & Cultural Scandal',
    subtitle: 'Philanthropic & Anthropological Engines',
    penalty: '−10 to −50 pts',
    color: {
      bg: 'bg-orange-700',
      light: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-900',
      accent: 'text-orange-700',
    },
    encyclical: 'Evangelium Vitae + Fratelli Tutti',
    compendium: 'Compendium §§210–215, 358',
    description:
      'Tier 3 evaluates corporate actions that facilitate moral harm through financial contribution, institutional cooperation, or the public promotion of values contrary to Magisterial anthropology and the preservation of the family. Two distinct engines operate here.',
    scope: [
      'Direct corporate grants/sponsorships to abortion-providing NGOs (−10 pts)',
      'Subsidized out-of-state travel for abortion or gender-transition procedures (−20 pts)',
      'Active lobbying against parental rights in education (−20 to −50 pts)',
      'Weaponizing media products to influence minors against Magisterial anthropology (−30 to −50 pts)',
      'Algorithmic addiction design targeting minors (−30 pts)',
    ],
    logic:
      'Philanthropic Engine: IRS Form 990 Schedule I — direct corporate checks = FAIL (proximate); employee matching (Benevity/CyberGrants) = PASS (remote). Anthropological Inverted Index: HRC CEI (utilized inverted — high score = higher risk of cultural scandal).',
    ncbcNote:
      'Note: Employee-directed matching programs represent remote, decentralized cooperation and are classified as PASS under the Ethos Logos Protocol. The corporation is not the proximate agent of selection.',
  },
  {
    number: 4,
    title: 'The Virtue Multiplier',
    subtitle: 'Proactive Mission Alignment — +20 pts',
    penalty: '+20 pts (Bonus)',
    color: {
      bg: 'bg-emerald-700',
      light: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      accent: 'text-emerald-700',
    },
    encyclical: "Laudato Si' + Rerum Novarum",
    compendium: 'Compendium §§325–335, 466–470',
    description:
      'The Virtue Multiplier shifts the analytical focus from avoiding harm to actively promoting positive social and environmental outcomes — directly rewarding corporations that contribute to integral human development and ecological stewardship.',
    scope: [
      'Agricultural renewability & sustainable land stewardship',
      'Expanding global access to clean water and essential medicines',
      'High CEO-to-worker pay equity (Dignity of Labor)',
      'Active rejection of short-termism in capital deployment',
      'Faith-consistent shareholder engagement and proxy voting',
    ],
    logic:
      'Positive data sources: Good Jobs First (labor practices), DOL Sweat & Toil (supply chain), As You Sow (proxy voting). Bonus applied when proactive alignment is documented and material.',
    ncbcNote: null,
  },
]

const ENCYCLICALS = [
  { title: 'Evangelium Vitae', author: 'John Paul II, 1995', principle: 'Sanctity of Life', application: 'Absolute prohibition against corporate activities involving direct abortion, abortifacients, euthanasia, or embryonic stem cell R&D.' },
  { title: 'Rerum Novarum', author: 'Leo XIII, 1891', principle: 'Dignity of Labor & Capital', application: 'Rejects the absolute subordination of labor to capital; demands fair remuneration, safe working conditions, and labor representation.' },
  { title: 'Centesimus Annus', author: 'John Paul II, 1991', principle: 'Limits of the Free Market', application: 'Affirms the efficiency of the free market but rejects market absolutism; private property is subordinated to the universal destination of goods.' },
  { title: "Laudato Si'", author: 'Pope Francis, 2015', principle: 'Integral Ecology', application: 'Demands progressive divestment from highly destructive fossil fuel extraction and active corporate engagement to align with climate targets.' },
  { title: 'Caritas in Veritate', author: 'Benedict XVI, 2009', principle: 'Ethical Culture in Finance', application: 'Insists that finance must be aligned with an internal ethical culture; markets divorced from moral truth degrade into systemic exploitation.' },
  { title: 'Fratelli Tutti', author: 'Pope Francis, 2020', principle: 'Solidarity & Global Stewardship', application: 'Condemns financial speculation that exploits the vulnerable and prioritizes short-termism over long-term human development.' },
]

export default function FrameworkGuide() {
  const [expandedTier, setExpandedTier] = useState(null)

  return (
    <section id="framework" className="py-20 bg-brand-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label text-brand-orange mb-3">The Framework</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            The Four-Tier Fiduciary Screening Architecture
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Rooted in the <em>Compendium of the Social Doctrine of the Church</em>, the
            USCCB Socially Responsible Investment Guidelines (2021), and <em>Mensuram Bonam</em> (2022),
            this framework converts moral theology into a rigorous quantitative scoring engine.
          </p>
        </div>

        {/* Tier cards */}
        <div className="space-y-4 mb-16">
          {TIERS.map((tier) => {
            const isOpen = expandedTier === tier.number
            return (
              <div
                key={tier.number}
                className={`rounded-2xl border overflow-hidden transition-all ${tier.color.border} ${isOpen ? tier.color.light : 'bg-white/5'}`}
              >
                <button
                  onClick={() => setExpandedTier(isOpen ? null : tier.number)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  {/* Tier badge */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${tier.color.bg} flex items-center justify-center`}>
                    <span className="font-serif font-bold text-white text-lg">{tier.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-serif font-bold text-lg ${isOpen ? tier.color.text : 'text-white'}`}>
                        Tier {tier.number}: {tier.title}
                      </span>
                      <span className={`text-xs ${isOpen ? tier.color.accent : 'text-white/50'}`}>
                        {tier.subtitle}
                      </span>
                    </div>
                    <p className={`text-sm mt-0.5 ${isOpen ? tier.color.text : 'text-white/60'} opacity-80`}>
                      {tier.description.slice(0, 120)}...
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-3">
                    <span className={`font-mono font-bold text-sm ${isOpen ? tier.color.accent : 'text-brand-orange'}`}>
                      {tier.penalty}
                    </span>
                    <span className={`text-xl transition-transform ${isOpen ? 'rotate-180 ' + tier.color.accent : 'text-white/50'}`}>
                      ▾
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-5 pb-6 space-y-5 border-t ${tier.color.border} animate-fade-in-up`}>
                    {/* Description */}
                    <div className="pt-5">
                      <p className={`text-sm leading-relaxed ${tier.color.text}`}>{tier.description}</p>
                    </div>

                    {/* Scope */}
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${tier.color.accent}`}>Scope</p>
                      <ul className="space-y-1.5">
                        {tier.scope.map((item, i) => (
                          <li key={i} className={`flex items-start gap-2 text-sm ${tier.color.text}`}>
                            <span className={`${tier.color.bg} text-white rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold`}>
                              {tier.number === 4 ? '+' : '✕'}
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Logic */}
                    <div className={`rounded-xl ${tier.color.bg} bg-opacity-10 border ${tier.color.border} p-4`}>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${tier.color.accent}`}>Screening Logic</p>
                      <p className={`text-sm ${tier.color.text}`}>{tier.logic}</p>
                    </div>

                    {/* Encyclical */}
                    <div className="flex gap-4">
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${tier.color.accent}`}>Primary Encyclical</p>
                        <p className={`text-sm font-semibold ${tier.color.text}`}>{tier.encyclical}</p>
                      </div>
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${tier.color.accent}`}>Compendium Basis</p>
                        <p className={`text-sm font-semibold ${tier.color.text}`}>{tier.compendium}</p>
                      </div>
                    </div>

                    {/* NCBC Note */}
                    {tier.ncbcNote && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                          NCBC Bioethics Note
                        </p>
                        <p className="text-sm text-amber-900">{tier.ncbcNote}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Grading rubric */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-12">
          <p className="section-label text-brand-orange mb-4">Grading Protocol</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { grade: 'A+', range: '0.00%', desc: 'Perfect', color: 'bg-emerald-600' },
              { grade: 'A', range: '0.01–6.99%', desc: 'Excellent', color: 'bg-emerald-500' },
              { grade: 'A−', range: '7–10.99%', desc: 'Strong', color: 'bg-teal-500' },
              { grade: 'B±', range: '11–19.99%', desc: 'Acceptable', color: 'bg-blue-500' },
              { grade: 'C±', range: '20–39.99%', desc: 'Weak', color: 'bg-amber-500' },
              { grade: 'D–F', range: '40%+', desc: 'Critical', color: 'bg-red-600' },
            ].map(({ grade, range, desc, color }) => (
              <div key={grade} className="bg-white/10 rounded-xl p-3 text-center">
                <div className={`${color} text-white font-serif font-bold text-2xl rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2`}>
                  {grade}
                </div>
                <p className="text-white text-xs font-semibold">{desc}</p>
                <p className="text-white/40 text-[10px] mt-0.5">{range} violation</p>
              </div>
            ))}
          </div>
        </div>

        {/* Encyclicals */}
        <div>
          <p className="section-label text-brand-orange text-center mb-6">Magisterial Foundations</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENCYCLICALS.map((enc) => (
              <div key={enc.title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="font-serif font-semibold text-white text-sm">{enc.title}</p>
                <p className="text-brand-orange text-xs font-medium mt-0.5">{enc.author}</p>
                <p className="text-white/50 text-xs mt-2 font-semibold uppercase tracking-wide">{enc.principle}</p>
                <p className="text-white/70 text-xs mt-1.5 leading-relaxed">{enc.application}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
