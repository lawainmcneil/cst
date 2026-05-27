export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img src="/logo.svg" alt="Ethos Logos Investments" className="h-10 w-auto brightness-0 invert" />
              </picture>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Solid, Sober Generational Stewardship. Portfolios that are good for your
              life and soul — evaluated through the full framework of Catholic Social Teaching.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://ethoslogosinvestments.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-orange text-sm font-semibold hover:underline"
              >
                ethoslogosinvestments.com →
              </a>
            </div>
          </div>

          {/* Framework */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-wider mb-3">CST Framework</p>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                'Tier 1: Intrinsic Evils',
                'Tier 2: Vice & Negligence',
                'Tier 3: Cultural Scandal',
                'Tier 4: Virtue Multiplier',
                'Grading Rubric',
                'Cooperation Theology',
              ].map((item) => (
                <li key={item}>
                  <a href="#framework" className="hover:text-white/80 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Authorities */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-wider mb-3">Authoritative Sources</p>
            <ul className="space-y-2 text-sm text-white/50">
              {[
                'Mensuram Bonam (2022)',
                'USCCB SRI Guidelines (2021)',
                'Evangelium Vitae',
                "Laudato Si'",
                'Centesimus Annus',
                'NCBC Bioethics Guidelines',
              ].map((item) => (
                <li key={item} className="text-white/50">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Ethos Logos Investments. This tool is for educational and fiduciary planning purposes only.
            Not financial advice. Consult a registered investment advisor.
          </p>
          <p className="text-white/20 text-xs">
            Framework: Compendium of the Social Doctrine of the Church & Mensuram Bonam (2022)
          </p>
        </div>
      </div>
    </footer>
  )
}
