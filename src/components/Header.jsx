import { useState } from 'react'

export default function Header({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const TAB_LINKS = [
    { label: 'CST Screener', tab: 'screener' },
    { label: 'Portfolio Analysis', tab: 'portfolio' },
    { label: 'HRC CEI Database', tab: 'hrc' },
  ]

  const handleTabClick = (tab) => {
    setActiveTab?.(tab)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="https://ethoslogosinvestments.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img src="/logo.svg" alt="Ethos Logos Investments" className="h-10 w-auto" />
            </picture>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {TAB_LINKS.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleTabClick(link.tab)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === link.tab
                    ? 'text-brand-orange bg-orange-50'
                    : 'text-brand-dark/80 hover:text-brand-dark hover:bg-brand-warm'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="#framework"
              className="px-3 py-2 text-sm font-medium text-brand-dark/80 hover:text-brand-dark rounded-lg hover:bg-brand-warm transition-colors"
            >
              The Framework
            </a>
            <a
              href="https://ethoslogosinvestments.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm font-medium text-brand-dark/80 hover:text-brand-dark rounded-lg hover:bg-brand-warm transition-colors"
            >
              About Ethos Logos
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://ethoslogosinvestments.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm py-2 px-5"
            >
              Get In Touch →
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-brand-dark hover:bg-brand-warm"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-current mb-1"></span>
            <span className="block w-5 h-0.5 bg-current mb-1"></span>
            <span className="block w-5 h-0.5 bg-current"></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-brand-border bg-white px-4 py-3 space-y-1">
          {TAB_LINKS.map((link) => (
            <button
              key={link.tab}
              onClick={() => handleTabClick(link.tab)}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === link.tab
                  ? 'text-brand-orange bg-orange-50'
                  : 'text-brand-dark hover:bg-brand-warm'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="#framework"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-brand-dark hover:bg-brand-warm rounded-lg"
          >
            The Framework
          </a>
          <div className="pt-2">
            <a
              href="https://ethoslogosinvestments.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm py-2 w-full text-center"
            >
              Get In Touch →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

