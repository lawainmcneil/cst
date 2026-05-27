import { useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import QuickScreener from './components/QuickScreener'
import PortfolioBuilder from './components/PortfolioBuilder'
import FrameworkGuide from './components/FrameworkGuide'
import Footer from './components/Footer'

export default function App() {
  const [activeTab, setActiveTab] = useState('screener')

  return (
    <div className="min-h-screen bg-brand-light">
      <Header />
      <HeroSection activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main tool area */}
      <div className="bg-brand-light">
        {/* Tab switcher — sticky below hero */}
        <div className="sticky top-16 z-40 bg-white border-b border-brand-border shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex">
              <TabButton
                active={activeTab === 'screener'}
                onClick={() => setActiveTab('screener')}
              >
                Quick Screen
              </TabButton>
              <TabButton
                active={activeTab === 'portfolio'}
                onClick={() => setActiveTab('portfolio')}
              >
                Portfolio Analysis
              </TabButton>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'screener' ? (
            <QuickScreener />
          ) : (
            <PortfolioBuilder />
          )}
        </div>
      </div>

      <FrameworkGuide />
      <Footer />
    </div>
  )
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-all ${
        active
          ? 'border-brand-orange text-brand-orange'
          : 'border-transparent text-brand-muted hover:text-brand-dark hover:border-brand-border'
      }`}
    >
      {children}
    </button>
  )
}
