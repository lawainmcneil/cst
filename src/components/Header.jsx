import { useState } from 'react'

const NAV_LINKS = [
  { label: 'CST Screener', href: '#screener' },
  { label: 'Portfolio Analysis', href: '#portfolio' },
  { label: 'The Framework', href: '#framework' },
  { label: 'About Ethos Logos', href: 'https://ethoslogosinvestments.com', external: true },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

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
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="px-3 py-2 text-sm font-medium text-brand-dark/80 hover:text-brand-dark rounded-lg hover:bg-brand-warm transition-colors"
              >
                {link.label}
              </a>
            ))}
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-brand-dark hover:bg-brand-warm rounded-lg"
            >
              {link.label}
            </a>
          ))}
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

