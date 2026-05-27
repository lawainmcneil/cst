import { getGradeColors } from '../utils/scoring'

const GRADE_DESCRIPTIONS = {
  'A+': 'Perfect Alignment — 100% CST-Compliant',
  'A':  'Excellent Alignment — Minimal Violation Exposure',
  'A−': 'Strong Alignment — Minor Violations Noted',
  'B+': 'Good Alignment — Moderate Violations Detected',
  'B':  'Acceptable Alignment — Remediation Recommended',
  'B−': 'Below-Target Alignment — Active Engagement Required',
  'C+': 'Weak Alignment — Significant Violations',
  'C':  'Poor Alignment — Comprehensive Review Required',
  'C−': 'Serious Misalignment — Divestment Planning Required',
  'D':  'Critical Misalignment — Immediate Review Required',
  'F':  'Tier 1 Kill Switch Activated — Immediate Divestment',
}

export default function GradeDisplay({ grade, gradeClass, score, violationPct, tier1Fail, compact = false }) {
  const colors = getGradeColors(gradeClass)
  const description = GRADE_DESCRIPTIONS[grade] || ''

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${colors.bg} ${colors.border}`}>
        <span className={`font-serif font-bold text-2xl ${colors.text}`}>{grade}</span>
        <div>
          <div className={`text-xs font-semibold ${colors.text}`}>CST Grade</div>
          <div className={`text-xs ${colors.text} opacity-70`}>{score}% aligned</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border-2 p-6 ${colors.bg} ${colors.border}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="section-label mb-1">Fiduciary Grade</p>
          <p className={`text-sm font-medium ${colors.text} opacity-80 max-w-xs`}>{description}</p>
        </div>
        {/* Grade circle */}
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-lg grade-glow ${colors.border} bg-white`}
        >
          <span className={`font-serif font-bold text-4xl ${colors.text}`}>{grade}</span>
        </div>
      </div>

      {/* Score bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs font-semibold mb-1.5">
          <span className={colors.text}>Alignment Score</span>
          <span className={colors.text}>{score}%</span>
        </div>
        <div className="h-3 bg-white/60 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              gradeClass === 'grade-a' ? 'bg-emerald-500' :
              gradeClass === 'grade-b' ? 'bg-blue-500' :
              gradeClass === 'grade-c' ? 'bg-amber-500' :
              gradeClass === 'grade-d' ? 'bg-orange-600' : 'bg-red-700'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1 opacity-60">
          <span className={colors.text}>0% — Portfolio Grade F</span>
          <span className={colors.text}>100% — Grade A+</span>
        </div>
      </div>

      {tier1Fail && (
        <div className="mt-4 flex items-start gap-2 bg-red-700 text-white rounded-xl p-3 text-sm">
          <span className="text-lg leading-none mt-0.5">⚠</span>
          <div>
            <p className="font-bold">Tier 1 Kill Switch Activated</p>
            <p className="opacity-90 text-xs mt-0.5">
              Exposure to a Tier 1 intrinsic evil detected. Portfolio grade is immediately set to F
              regardless of all other holdings. Immediate divestment is required under the Ethos Logos Fiduciary Protocol.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
