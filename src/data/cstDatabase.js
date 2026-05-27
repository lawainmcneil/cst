// CST Holdings Database
// Sources: Ethos Logos Investment Framework, USCCB SRI Guidelines (2021),
// Mensuram Bonam (2022), SEC EDGAR, HRC CEI, ProPublica 990s
// dataConfidence: "documented" = from Ethos Logos framework file
//                 "public-data" = based on known public filings
//                 "estimated"   = estimated from holdings/sector data
//                 "requires-verification" = needs live API query

const holdingsDB = {

  // ============================================================
  // DOCUMENTED IN ETHOS LOGOS FRAMEWORK (High Confidence)
  // ============================================================

  AAPL: {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    sector: 'Technology',
    status: 'PASS',
    tier: null,
    baseScore: 100,
    violations: [],
    virtueBonus: 0,
    dataConfidence: 'documented',
    magisterialBasis: 'Compendium of the Social Doctrine of the Church, Ch. 6, §§270–273',
    foundationalEncyclical: 'Laborem Exercens (John Paul II)',
    dataEvidence:
      'DOL "Sweat & Toil" database and corporate supply chain audits confirm Apple actively monitors Tier 1 and Tier 2 suppliers. Documented remediation policies are in place and the company participates in shareholder dialogue on labor rights.',
    cooperationAnalysis:
      'Remote material cooperation regarding downstream user behavior (e-waste, minor digital dependencies); judged permissible under Ethos Logos Protocol. No direct Tier 1 or Tier 2 activity present.',
    ncbcNote: null,
    stewardship: 'HOLD & ENGAGE. Maintain position. Vote proxies on supply chain labor standards and algorithmic responsibility.',
    recommendAction: 'HOLD',
    activeEngagement: true,
  },

  CVX: {
    ticker: 'CVX',
    name: 'Chevron Corporation',
    type: 'stock',
    sector: 'Energy',
    status: 'PASS',
    tier: null,
    baseScore: 100,
    violations: [],
    virtueBonus: 0,
    dataConfidence: 'documented',
    magisterialBasis: "Compendium of the Social Doctrine of the Church, Ch. 10, §§466–469",
    foundationalEncyclical: "Laudato Si' (Pope Francis, 2015)",
    dataEvidence:
      "Chevron SEC 10-K confirms no thermal coal or tar sands extraction. Carbon-reduction benchmarks are aligned with transition frameworks. The company participates in faith-consistent shareholder engagement coalitions.",
    cooperationAnalysis:
      "Remote material cooperation in fossil fuel energy production; approved under USCCB 'Actively Work for Change' directive and Mensuram Bonam 'progressive divestment' guidance. Minimal equity position maintains a proxy-voting seat at the table.",
    ncbcNote: null,
    stewardship:
      'HOLD under active transition engagement. Vote all proxies in favor of decarbonization resolutions. Annual carbon-reduction performance audit required per Laudato Si\' mandate.',
    recommendAction: 'HOLD',
    activeEngagement: true,
  },

  PFE: {
    ticker: 'PFE',
    name: 'Pfizer Inc.',
    type: 'stock',
    sector: 'Healthcare',
    status: 'FAIL',
    tier: 3,
    baseScore: 100,
    violations: [
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Abortion Travel Subsidy',
        description: 'Direct corporate funding of out-of-state abortion travel subsidies for employees.',
        penalty: -20,
        source: 'HRC Corporate Equality Index (CEI) database; confirmed in SEC 10-K corporate benefits documentation',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'documented',
    magisterialBasis: 'Compendium of the Social Doctrine of the Church, Ch. 3, §108 & Ch. 5, §214',
    foundationalEncyclical: 'Evangelium Vitae (John Paul II)',
    dataEvidence:
      'HRC CEI database confirms subsidized corporate travel benefits for out-of-state abortion procedures. SEC 10-K corporate benefits documentation confirms the policy is actively funded by corporate cash flows.',
    cooperationAnalysis:
      'Proximate material cooperation: the corporate benefits policy actively facilitates the termination of human life, triggering a Tier 3 Cultural Scandal Fail. Immediate divestment required.',
    ncbcNote:
      'Historical use of the HEK-293 cell line for clinical trial testing is classified as permissible remote material cooperation under NCBC guidelines (Dignitas Personae, n.35). This bioethical clearance is overridden by the active corporate abortion travel subsidy policy, which constitutes an ongoing and remediable act of proximate cooperation.',
    stewardship:
      'DIVEST. Prior to full divestment, consider formal shareholder engagement requesting elimination of abortion travel benefits. Document all engagement attempts for fiduciary record.',
    recommendAction: 'DIVEST',
  },

  DIS: {
    ticker: 'DIS',
    name: 'The Walt Disney Company',
    type: 'stock',
    sector: 'Communication Services',
    status: 'FAIL',
    tier: 3,
    baseScore: 100,
    violations: [
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Anthropological Scandal',
        description:
          'Active production of media targeting minors with content contrary to Magisterial anthropology; corporate subsidization of gender-transition procedures; direct political lobbying against parental rights in primary education.',
        penalty: -40,
        source:
          'HRC CEI Index (100% rating); IRS Form 990 Schedule I corporate philanthropy filings; documented corporate advocacy campaigns',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'documented',
    magisterialBasis: 'Compendium of the Social Doctrine of the Church, Ch. 5, §§210–212 & Ch. 8, §358',
    foundationalEncyclical: 'Centesimus Annus (John Paul II)',
    dataEvidence:
      "HRC CEI Index: 100% rating confirming explicit guidelines on gender-transition support and active public advocacy against state parental rights laws. IRS Form 990, Schedule I confirms direct financial grants to organizations opposing traditional family anthropology.",
    cooperationAnalysis:
      "Active production and marketing of media designed to influence minors toward non-Magisterial anthropological frameworks, combined with direct political lobbying against parental rights, constitutes proximate material cooperation in cultural scandal. This exceeds passive employment benefits and represents active, systemic cultural scandal requiring immediate divestment.",
    ncbcNote: null,
    stewardship:
      'DIVEST IMMEDIATELY. Core business model involves proximate material cooperation in cultural scandal against the family and parental rights. No viable engagement path identified.',
    recommendAction: 'DIVEST',
  },

  PM: {
    ticker: 'PM',
    name: 'Philip Morris International',
    type: 'stock',
    sector: 'Consumer Staples',
    status: 'FAIL',
    tier: 2,
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Tobacco Manufacturing',
        description:
          'Gross corporate revenue from combustible tobacco and heated tobacco delivery systems far exceeds the 5% temperance threshold.',
        penalty: -20,
        source: 'SEC Form 10-K: >95% of gross revenue from tobacco manufacturing and distribution',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'documented',
    magisterialBasis: 'Compendium of the Social Doctrine of the Church, Ch. 8, §358',
    foundationalEncyclical: 'Centesimus Annus (John Paul II, §36)',
    dataEvidence:
      'SEC Form 10-K (p.14): >95% of gross corporate revenue derived directly from manufacture and sale of combustible tobacco products and heated tobacco delivery systems. Far exceeds the 5% temperance threshold.',
    cooperationAnalysis:
      'Directly engaged in the manufacture and commercialization of a highly addictive, lethal substance. Constitutes proximate material cooperation in bodily harm and systemic self-destruction. Structurally unacceptable under the Tier 2 Temperance constraint.',
    ncbcNote: null,
    stewardship: 'DIVEST. Core business model is tobacco manufacturing. No remediation path exists within the Tier 2 framework.',
    recommendAction: 'DIVEST',
  },

  // ============================================================
  // TIER 1 — INTRINSIC EVIL (Kill Switch)
  // ============================================================

  GEO: {
    ticker: 'GEO',
    name: 'GEO Group, Inc.',
    type: 'stock',
    sector: 'Industrials',
    status: 'FAIL',
    tier: 1,
    baseScore: 100,
    violations: [
      {
        tier: 1,
        type: 'Intrinsic Evil',
        subtype: 'Human Commodification — Private Prisons',
        description:
          'Core business is the operation of for-profit private prisons and detention facilities, treating incarcerated persons as revenue-generating units in direct violation of human dignity.',
        penalty: -100,
        source: 'SEC 10-K: >95% revenue from government-contracted private corrections and detention operations; Mensuram Bonam exclusionary criteria',
        cooperationLevel: 'Immediate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium of the Social Doctrine of the Church, §§403–410; Fratelli Tutti §188',
    foundationalEncyclical: 'Fratelli Tutti (Pope Francis, 2020)',
    dataEvidence:
      'SEC 10-K confirms GEO Group derives substantially all revenue from operation of government-contracted private correctional and immigration detention facilities.',
    cooperationAnalysis:
      'Immediate material cooperation in human commodification. The for-profit incarceration model monetizes human liberty, directly contradicting the Magisterial principle of human dignity and the universal destination of goods. Tier 1 Kill Switch activated. Portfolio Grade = F.',
    ncbcNote: null,
    stewardship: 'DIVEST IMMEDIATELY. Tier 1 intrinsic evil — human commodification. No remediation path exists.',
    recommendAction: 'DIVEST',
  },

  CXW: {
    ticker: 'CXW',
    name: 'CoreCivic, Inc.',
    type: 'stock',
    sector: 'Industrials',
    status: 'FAIL',
    tier: 1,
    baseScore: 100,
    violations: [
      {
        tier: 1,
        type: 'Intrinsic Evil',
        subtype: 'Human Commodification — Private Prisons',
        description:
          'Core business is the for-profit operation of private correctional and detention facilities.',
        penalty: -100,
        source: 'SEC 10-K: private corrections and detention management as primary revenue source',
        cooperationLevel: 'Immediate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium §§403–410; Fratelli Tutti §188',
    foundationalEncyclical: 'Fratelli Tutti (Pope Francis, 2020)',
    dataEvidence: 'SEC 10-K confirms CoreCivic derives substantially all revenue from private correctional and immigration detention operations.',
    cooperationAnalysis:
      'Immediate material cooperation in human commodification. Tier 1 Kill Switch activated.',
    ncbcNote: null,
    stewardship: 'DIVEST IMMEDIATELY. Tier 1 intrinsic evil.',
    recommendAction: 'DIVEST',
  },

  // ============================================================
  // TIER 2 — VICE & NEGLIGENCE
  // ============================================================

  MO: {
    ticker: 'MO',
    name: 'Altria Group, Inc.',
    type: 'stock',
    sector: 'Consumer Staples',
    status: 'FAIL',
    tier: 2,
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Tobacco Manufacturing',
        description: 'Substantially all gross revenue is derived from tobacco products, far exceeding the 5% temperance threshold.',
        penalty: -20,
        source: 'SEC Form 10-K: tobacco products represent >90% of gross revenue',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium §358',
    foundationalEncyclical: 'Centesimus Annus (John Paul II, §36)',
    dataEvidence: 'SEC 10-K confirms Altria derives substantially all revenue from cigarettes, oral tobacco products, and smokeless alternatives.',
    cooperationAnalysis: 'Core business is tobacco manufacturing. Proximate material cooperation in addiction and bodily harm. Tier 2 violation.',
    ncbcNote: null,
    stewardship: 'DIVEST. Tobacco is the core business model.',
    recommendAction: 'DIVEST',
  },

  BTI: {
    ticker: 'BTI',
    name: 'British American Tobacco plc',
    type: 'stock',
    sector: 'Consumer Staples',
    status: 'FAIL',
    tier: 2,
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Tobacco Manufacturing',
        description: 'Core business is global tobacco product manufacturing and distribution.',
        penalty: -20,
        source: 'Annual reports confirm tobacco as primary revenue source globally',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium §358',
    foundationalEncyclical: 'Centesimus Annus (John Paul II)',
    dataEvidence: 'Annual reports confirm British American Tobacco derives substantially all revenue from tobacco products across global markets.',
    cooperationAnalysis: 'Proximate material cooperation in addiction and bodily harm via tobacco manufacturing.',
    ncbcNote: null,
    stewardship: 'DIVEST.',
    recommendAction: 'DIVEST',
  },

  LVS: {
    ticker: 'LVS',
    name: 'Las Vegas Sands Corp.',
    type: 'stock',
    sector: 'Consumer Discretionary',
    status: 'FAIL',
    tier: 2,
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Commercial Gambling',
        description: 'Casino and gaming operations represent substantially all gross revenue, far exceeding the 5% temperance threshold.',
        penalty: -20,
        source: 'SEC Form 10-K: casino gaming is the primary revenue source',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium §358; Mensuram Bonam (2022) Exclusionary Criteria',
    foundationalEncyclical: 'Centesimus Annus (John Paul II)',
    dataEvidence: 'SEC 10-K confirms Las Vegas Sands derives substantially all revenue from casino gaming operations in Las Vegas, Macau, and Singapore.',
    cooperationAnalysis:
      'Core business is commercial gambling, fostering patterns of addiction, financial predation on vulnerable persons, and degradation of family stability. Tier 2 violation.',
    ncbcNote: null,
    stewardship: 'DIVEST.',
    recommendAction: 'DIVEST',
  },

  WYNN: {
    ticker: 'WYNN',
    name: 'Wynn Resorts, Ltd.',
    type: 'stock',
    sector: 'Consumer Discretionary',
    status: 'FAIL',
    tier: 2,
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Commercial Gambling',
        description: 'Casino gaming represents substantially all gross revenue.',
        penalty: -20,
        source: 'SEC Form 10-K',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium §358',
    foundationalEncyclical: 'Centesimus Annus (John Paul II)',
    dataEvidence: 'SEC 10-K confirms Wynn Resorts derives substantially all revenue from casino gaming operations.',
    cooperationAnalysis: 'Commercial gambling as core business model. Tier 2 violation.',
    ncbcNote: null,
    stewardship: 'DIVEST.',
    recommendAction: 'DIVEST',
  },

  BUD: {
    ticker: 'BUD',
    name: 'Anheuser-Busch InBev SA/NV',
    type: 'stock',
    sector: 'Consumer Staples',
    status: 'FAIL',
    tier: 2,
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Alcoholic Beverage Manufacturing',
        description: 'Gross revenue from commercial alcoholic beverage production exceeds the 5% temperance threshold.',
        penalty: -20,
        source: 'SEC 20-F / Annual Report: beer and malt beverages are the primary revenue source',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium §358; Mensuram Bonam (2022) Exclusionary Criteria',
    foundationalEncyclical: 'Centesimus Annus (John Paul II)',
    dataEvidence: 'Annual reports confirm AB InBev derives substantially all revenue from commercial alcoholic beverage production globally.',
    cooperationAnalysis: 'Core business is commercial alcohol manufacturing. Proximate material cooperation in addiction and familial harm. Tier 2 violation.',
    ncbcNote: null,
    stewardship: 'DIVEST.',
    recommendAction: 'DIVEST',
  },

  TAP: {
    ticker: 'TAP',
    name: 'Molson Coors Beverage Company',
    type: 'stock',
    sector: 'Consumer Staples',
    status: 'FAIL',
    tier: 2,
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Alcoholic Beverage Manufacturing',
        description: 'Core business is commercial beer and malt beverage production.',
        penalty: -20,
        source: 'SEC Form 10-K: beer and related beverages represent substantially all gross revenue',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium §358',
    foundationalEncyclical: 'Centesimus Annus (John Paul II)',
    dataEvidence: 'SEC 10-K confirms Molson Coors derives substantially all revenue from beer, hard seltzer, and malt beverage products.',
    cooperationAnalysis: 'Proximate material cooperation in addiction patterns through commercial alcohol manufacturing. Tier 2 violation.',
    ncbcNote: null,
    stewardship: 'DIVEST.',
    recommendAction: 'DIVEST',
  },

  // ============================================================
  // TIER 3 — CULTURAL SCANDAL / COOPERATION
  // ============================================================

  META: {
    ticker: 'META',
    name: 'Meta Platforms, Inc.',
    type: 'stock',
    sector: 'Communication Services',
    status: 'FAIL',
    tier: 3,
    baseScore: 100,
    violations: [
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Algorithmic Manipulation of Minors',
        description:
          'Platform algorithms are deliberately engineered to create psychological dependency in minors, constituting a Tier 3 Virtue Inverse penalty under the CST framework.',
        penalty: -30,
        source: 'FTC regulatory filings; U.S. Senate Judiciary Committee testimony (2024); FTC complaint documentation',
        cooperationLevel: 'Proximate Material',
      },
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Abortion Travel Subsidy',
        description: 'Corporate benefits include subsidized out-of-state abortion travel for employees.',
        penalty: -20,
        source: 'HRC CEI database; corporate benefits documentation',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: "Compendium §§358, 415; Laudato Si' §47 (technological colonialism)",
    foundationalEncyclical: "Fratelli Tutti (Pope Francis, 2020); Laudato Si' (Pope Francis, 2015)",
    dataEvidence:
      "FTC and Congressional testimony documents Meta's deliberate design of addictive social media algorithms targeting minors. HRC CEI database confirms abortion travel benefits.",
    cooperationAnalysis:
      'Multiple Tier 3 violations: proximate material cooperation in psychological manipulation of minors and active facilitation of abortion through corporate benefits policy.',
    ncbcNote: null,
    stewardship:
      'DIVEST. Consider shareholder engagement prior to divestment requesting algorithm design reforms and benefits policy revision. Document engagement for fiduciary record.',
    recommendAction: 'DIVEST',
  },

  GOOGL: {
    ticker: 'GOOGL',
    name: 'Alphabet Inc. (Google)',
    type: 'stock',
    sector: 'Communication Services',
    status: 'FAIL',
    tier: 3,
    baseScore: 100,
    violations: [
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Abortion Travel Subsidy + Cultural Advocacy',
        description:
          'Corporate benefits include abortion travel subsidies; AI and search products amplify content contrary to Magisterial anthropology; direct corporate cultural advocacy.',
        penalty: -40,
        source: 'HRC CEI database (100% rating); corporate policy documentation; public advocacy disclosures',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium §§214, 358',
    foundationalEncyclical: 'Evangelium Vitae (John Paul II)',
    dataEvidence:
      'HRC CEI database (100% rating) confirms Alphabet provides abortion travel subsidies and gender-transition benefits. Corporate advocacy activities documented in public disclosures.',
    cooperationAnalysis:
      'Proximate material cooperation in cultural scandal via active corporate abortion travel policy and public cultural advocacy.',
    ncbcNote: null,
    stewardship: 'ENGAGE, then DIVEST if unresponsive. Submit shareholder resolution on benefits policy reform.',
    recommendAction: 'ENGAGE/DIVEST',
  },

  MSFT: {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'stock',
    sector: 'Technology',
    status: 'FAIL',
    tier: 3,
    baseScore: 100,
    violations: [
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Abortion Travel Subsidy',
        description: 'Corporate benefits include subsidized out-of-state abortion travel for employees.',
        penalty: -20,
        source: 'HRC CEI database; Microsoft corporate benefits documentation',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium §214',
    foundationalEncyclical: 'Evangelium Vitae (John Paul II)',
    dataEvidence: 'HRC CEI database confirms Microsoft provides subsidized out-of-state abortion travel benefits.',
    cooperationAnalysis:
      'Proximate material cooperation via corporate abortion travel policy. Policy is remediable via shareholder engagement.',
    ncbcNote: null,
    stewardship:
      'ENGAGE. Submit shareholder resolution requesting elimination of the abortion travel subsidy benefit. Monitor for remediation within 12–18 months.',
    recommendAction: 'ENGAGE',
  },

  AMZN: {
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    type: 'stock',
    sector: 'Consumer Discretionary',
    status: 'FAIL',
    tier: 3,
    baseScore: 100,
    violations: [
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Abortion Travel Subsidy',
        description: 'Corporate benefits include subsidized out-of-state abortion travel.',
        penalty: -20,
        source: 'HRC CEI database; corporate benefits documentation',
        cooperationLevel: 'Proximate Material',
      },
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Adult Content Distribution',
        description:
          'Amazon streaming and web services infrastructure host and distribute adult content platforms, constituting proximate cooperation in pornographic material distribution.',
        penalty: -10,
        source: 'NCOSE (National Center on Sexual Exploitation) annual report; public platform policy disclosures',
        cooperationLevel: 'Proximate Material',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium §§214, 358',
    foundationalEncyclical: 'Evangelium Vitae (John Paul II)',
    dataEvidence:
      'HRC CEI confirms abortion travel benefits. NCOSE documentation confirms Amazon hosting and distribution of pornographic content platforms.',
    cooperationAnalysis:
      'Multiple Tier 3 violations. Proximate material cooperation in both abortion facilitation and pornographic content distribution.',
    ncbcNote: null,
    stewardship:
      'ENGAGE with formal shareholder resolution. Prioritize removal of adult content hosting policies and elimination of abortion travel benefits.',
    recommendAction: 'ENGAGE/DIVEST',
  },

  // ============================================================
  // PASSING STOCKS
  // ============================================================

  V: {
    ticker: 'V',
    name: 'Visa Inc.',
    type: 'stock',
    sector: 'Financials',
    status: 'PASS',
    tier: null,
    baseScore: 100,
    violations: [],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: 'Compendium §§337–345 (Role of Financial Systems)',
    foundationalEncyclical: 'Caritas in Veritate (Benedict XVI)',
    dataEvidence:
      'Visa operates as a payment network infrastructure provider. No direct involvement in Tier 1–3 activities. Employee-directed charitable matching via Benevity is classified as remote material cooperation (permissible).',
    cooperationAnalysis:
      'Remote material cooperation via payment network processing. Cannot control all merchant activity, but primary business serves legitimate commerce. No corporate-level Tier 1, 2, or confirmed Tier 3 violations.',
    ncbcNote: null,
    stewardship: 'HOLD. Engage on financial inclusion and anti-predatory lending initiatives aligned with Rerum Novarum.',
    recommendAction: 'HOLD',
  },

  JPM: {
    ticker: 'JPM',
    name: 'JPMorgan Chase & Co.',
    type: 'stock',
    sector: 'Financials',
    status: 'PASS',
    tier: null,
    baseScore: 92,
    violations: [],
    virtueBonus: 0,
    dataConfidence: 'requires-verification',
    magisterialBasis: 'Compendium §§331–345 (Ethics in Financial Markets)',
    foundationalEncyclical: 'Caritas in Veritate (Benedict XVI)',
    dataEvidence:
      'JPMorgan Chase provides comprehensive financial services. Requires live HRC CEI and corporate benefits review for complete Tier 3 screening. Prior engagement on ESG issues documented.',
    cooperationAnalysis:
      'Provisional PASS pending complete Tier 3 data query. Remote material cooperation via banking services to broad client base. No confirmed Tier 1 or Tier 2 violations.',
    ncbcNote: null,
    stewardship:
      'Provisional HOLD. Schedule full Fiduciary Review for HRC CEI and benefits policy analysis. Engage on predatory lending and fossil fuel financing transparency.',
    recommendAction: 'HOLD',
    requiresVerification: true,
  },

  XOM: {
    ticker: 'XOM',
    name: 'Exxon Mobil Corporation',
    type: 'stock',
    sector: 'Energy',
    status: 'PASS',
    tier: null,
    baseScore: 100,
    violations: [],
    virtueBonus: 0,
    dataConfidence: 'public-data',
    magisterialBasis: "Compendium §§466–469; Laudato Si' §§172–175",
    foundationalEncyclical: "Laudato Si' (Pope Francis, 2015)",
    dataEvidence:
      "ExxonMobil operates in conventional oil and natural gas without thermal coal or tar sands extraction. Carbon reduction commitments documented. Approved under progressive divestment framework pending transition review.",
    cooperationAnalysis:
      "Remote material cooperation in fossil fuel production; approved under progressive divestment framework. No Tier 1, 2, or confirmed Tier 3 violations.",
    ncbcNote: null,
    stewardship:
      "HOLD under active engagement. Vote all proxies in favor of climate transition resolutions. Annual carbon audit required per Laudato Si'.",
    recommendAction: 'HOLD',
    activeEngagement: true,
  },

  JNJ: {
    ticker: 'JNJ',
    name: 'Johnson & Johnson',
    type: 'stock',
    sector: 'Healthcare',
    status: 'PASS',
    tier: null,
    baseScore: 95,
    violations: [],
    virtueBonus: 10,
    dataConfidence: 'requires-verification',
    magisterialBasis: 'Compendium §§234–237 (Access to Healthcare)',
    foundationalEncyclical: 'Centesimus Annus (John Paul II)',
    dataEvidence:
      "J&J demonstrates significant investment in essential medicine access programs in developing nations — a positive Tier 4 Virtue Multiplier factor. Historical cell line testing use classified as remote cooperation under NCBC guidelines.",
    cooperationAnalysis:
      'Historical cell line use permissible under NCBC guidelines and Dignitas Personae (n.35). Access-to-medicine programs qualify for Tier 4 Virtue Multiplier. Full Tier 3 benefits verification pending live API query.',
    ncbcNote:
      'Historical use of HEK-293 and WI-38 cell lines in therapeutic development is classified as remote, completed material cooperation under NCBC guidelines. No ongoing embryonic destruction is present.',
    stewardship: 'Provisional PASS with Virtue Multiplier. Schedule annual HRC CEI status verification.',
    recommendAction: 'HOLD',
    requiresVerification: true,
  },

  NVDA: {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'stock',
    sector: 'Technology',
    status: 'PASS',
    tier: null,
    baseScore: 95,
    violations: [],
    virtueBonus: 0,
    dataConfidence: 'requires-verification',
    magisterialBasis: 'Compendium §§271–273 (Technology and Human Work)',
    foundationalEncyclical: 'Laborem Exercens (John Paul II)',
    dataEvidence:
      'NVIDIA is a semiconductor and AI computing company. Requires live HRC CEI and corporate benefits analysis for complete Tier 3 screening. No Tier 1 or Tier 2 violations confirmed.',
    cooperationAnalysis:
      'No confirmed Tier 1 or Tier 2 violations. Provisional PASS pending full Tier 3 cultural benefits screening via live API query.',
    ncbcNote: null,
    stewardship: 'Provisional PASS. Requires full HRC CEI and SEC 10-K data query for complete scoring. Monitor AI ethics engagement.',
    recommendAction: 'HOLD',
    requiresVerification: true,
  },

  'BRK.B': {
    ticker: 'BRK.B',
    name: 'Berkshire Hathaway Inc. (Class B)',
    type: 'stock',
    sector: 'Financials',
    status: 'PASS',
    tier: null,
    baseScore: 88,
    violations: [],
    virtueBonus: 0,
    dataConfidence: 'requires-verification',
    magisterialBasis: 'Compendium §§338, 345–358',
    foundationalEncyclical: 'Caritas in Veritate (Benedict XVI)',
    dataEvidence:
      "Berkshire Hathaway is a diversified conglomerate. Key subsidiaries (GEICO, BNSF Railway, Berkshire Hathaway Energy) are generally CST-consistent. Full subsidiary map via OpenCorporates API required for complete analysis.",
    cooperationAnalysis:
      "Diversified conglomerate with generally low CST risk profile. Personal charitable activities of Warren Buffett are excluded from corporate analysis (employee-directed matching is remote cooperation). Full subsidiary mapping required.",
    ncbcNote: null,
    stewardship: 'Provisional PASS. Schedule full subsidiary mapping via OpenCorporates for complete Tier 1 scan.',
    recommendAction: 'HOLD',
    requiresVerification: true,
  },

  UNH: {
    ticker: 'UNH',
    name: 'UnitedHealth Group Inc.',
    type: 'stock',
    sector: 'Healthcare',
    status: 'REVIEW',
    tier: 3,
    baseScore: 100,
    violations: [
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Healthcare Benefits Review Required',
        description:
          'Insurance plan documents require analysis for coverage of elective abortion, gender-transition procedures, and abortifacient contraceptives. Pending CMS Open Payments verification.',
        penalty: -15,
        source: 'Requires full plan document analysis via CMS Open Payments and insurance contract review',
        cooperationLevel: 'Requires Verification',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'requires-verification',
    magisterialBasis: 'Compendium §§234–237 (Healthcare Access)',
    foundationalEncyclical: 'Evangelium Vitae (John Paul II)',
    dataEvidence:
      "UnitedHealth's plan documents require full CMS Open Payments review to determine the scope of abortion and gender-transition coverage within insured plans. Live API query required.",
    cooperationAnalysis:
      'Provisional review status. Health insurance underwriting of abortifacient/abortion coverage would constitute Tier 3 proximate cooperation pending full data verification.',
    ncbcNote: null,
    stewardship: 'REQUIRES FULL ANALYSIS. Schedule Fiduciary Review for complete CMS and plan document analysis.',
    recommendAction: 'VERIFY',
    requiresVerification: true,
  },

  // ============================================================
  // ETFs
  // ============================================================

  SPY: {
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    type: 'etf',
    sector: 'Broad Market — Unscreened',
    status: 'REVIEW',
    tier: 'multiple',
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Tobacco & Gambling Exposure',
        description: 'Fund holds tobacco manufacturers (PM, MO, BTI) and casino operators that exceed the 5% revenue threshold.',
        penalty: -10,
        exposureEstimate: '~2.1% of fund in Tier 2 violating securities',
        source: 'SPY monthly holdings disclosure (State Street Global Advisors)',
        cooperationLevel: 'Remote Mediate',
      },
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Indirect Cultural Scandal Exposure',
        description: 'Fund holds significant positions in META, DIS, GOOGL, and AMZN — all carrying active Tier 3 violations.',
        penalty: -18,
        exposureEstimate: '~8.7% of fund assets in confirmed Tier 3 violating securities',
        source: 'SPY holdings disclosure',
        cooperationLevel: 'Remote Mediate',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'estimated',
    magisterialBasis: 'Compendium §§357–359 (Stewardship in Diversified Instruments); Mensuram Bonam (2022)',
    foundationalEncyclical: 'Mensuram Bonam (Pontifical Academy for Social Sciences, 2022)',
    dataEvidence:
      'Estimated violation exposure calculated from public SPY holdings data cross-referenced with individual security CST scores. Actual penetration requires full underlying scan.',
    cooperationAnalysis:
      'SPY as a passive index instrument represents remote mediate cooperation with underlying violating companies. Material exposure to both Tier 2 and Tier 3 violations exists.',
    ncbcNote: null,
    stewardship:
      'REPLACE. Consider substituting with CATH (Global X Catholic Values ETF) for CST-aligned large-cap exposure with no tax friction in qualified accounts.',
    recommendAction: 'REPLACE',
    requiresVerification: true,
  },

  QQQ: {
    ticker: 'QQQ',
    name: 'Invesco QQQ Trust (Nasdaq-100)',
    type: 'etf',
    sector: 'Technology-Concentrated — Unscreened',
    status: 'REVIEW',
    tier: 3,
    baseScore: 100,
    violations: [
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Heavy Tier 3 Concentration',
        description:
          'Heavy concentration in GOOGL (~3.7%), META (~3.3%), AMZN (~3.5%), and MSFT (~8.5%) creates ~25% aggregate exposure to confirmed Tier 3 violating securities.',
        penalty: -35,
        exposureEstimate: '~25% of fund in Tier 3 violating securities',
        source: 'QQQ monthly holdings disclosure (Invesco)',
        cooperationLevel: 'Remote Mediate (concentrated)',
      },
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Minor Vice Exposure',
        description: 'Minor indirect tobacco and gambling exposure through holding companies.',
        penalty: -5,
        exposureEstimate: '~1.2% indirect exposure',
        source: 'QQQ holdings disclosure',
        cooperationLevel: 'Remote Mediate',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'estimated',
    magisterialBasis: 'Compendium §§357–359; Mensuram Bonam (2022)',
    foundationalEncyclical: "Fratelli Tutti (Pope Francis); Laudato Si' (Pope Francis)",
    dataEvidence:
      'QQQ is concentrated in Nasdaq-100 technology and communication services. Top four Tier 3 violators (GOOGL, META, AMZN, MSFT) account for approximately 25% of fund assets.',
    cooperationAnalysis:
      'High concentration in Tier 3 violating technology companies creates elevated cultural scandal exposure. Not recommended for CST-compliant portfolios.',
    ncbcNote: null,
    stewardship: 'REPLACE. Concentrated Tier 3 exposure via large tech holdings. Seek screened technology alternative.',
    recommendAction: 'REPLACE',
  },

  VTI: {
    ticker: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    type: 'etf',
    sector: 'Total Market — Unscreened',
    status: 'REVIEW',
    tier: 'multiple',
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Vice Sector Exposure',
        description: 'Total market fund holds tobacco, alcohol, and gambling companies exceeding materiality threshold.',
        penalty: -12,
        exposureEstimate: '~2.4% exposure to Tier 2 violating securities',
        source: 'VTI holdings disclosure (Vanguard)',
        cooperationLevel: 'Remote Mediate',
      },
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Cultural Scandal Exposure',
        description: 'Fund holds META, DIS, AMZN, GOOGL with confirmed active Tier 3 violations.',
        penalty: -18,
        exposureEstimate: '~8.5% exposure to confirmed Tier 3 violating securities',
        source: 'VTI holdings disclosure',
        cooperationLevel: 'Remote Mediate',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'estimated',
    magisterialBasis: 'Compendium §§357–359',
    foundationalEncyclical: 'Mensuram Bonam (2022)',
    dataEvidence: 'Estimated based on VTI composition and individual security CST scores. Broad market exposure creates a wide violation footprint.',
    cooperationAnalysis:
      'Total market fund creates remote mediate cooperation across multiple violation tiers. Requires replacement with a screened vehicle.',
    ncbcNote: null,
    stewardship: 'REPLACE. Consider CATH or a custom Catholic-responsible SMA for similar equity exposure.',
    recommendAction: 'REPLACE',
  },

  IVV: {
    ticker: 'IVV',
    name: 'iShares Core S&P 500 ETF',
    type: 'etf',
    sector: 'Broad Market — Unscreened',
    status: 'REVIEW',
    tier: 'multiple',
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Vice Sector Exposure',
        description: 'Unscreened S&P 500 holds tobacco, gambling, and alcohol companies.',
        penalty: -10,
        exposureEstimate: '~2.1%',
        source: 'IVV holdings disclosure (BlackRock)',
        cooperationLevel: 'Remote Mediate',
      },
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Cultural Scandal Exposure',
        description: 'Fund holds confirmed Tier 3 violating companies (META, DIS, AMZN, GOOGL).',
        penalty: -18,
        exposureEstimate: '~8.7%',
        source: 'IVV holdings disclosure',
        cooperationLevel: 'Remote Mediate',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'estimated',
    magisterialBasis: 'Compendium §§357–359',
    foundationalEncyclical: 'Mensuram Bonam (2022)',
    dataEvidence: 'Unscreened S&P 500 exposure. Identical CST profile to SPY.',
    cooperationAnalysis: 'Remote mediate cooperation with Tier 2/3 violations. Same profile as SPY.',
    ncbcNote: null,
    stewardship: 'REPLACE with CATH or similar screened S&P 500 alternative.',
    recommendAction: 'REPLACE',
  },

  VOO: {
    ticker: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    type: 'etf',
    sector: 'Broad Market — Unscreened',
    status: 'REVIEW',
    tier: 'multiple',
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Vice Sector Exposure',
        description: 'Unscreened S&P 500 holds tobacco, gambling, and alcohol companies.',
        penalty: -10,
        exposureEstimate: '~2.1%',
        source: 'VOO holdings disclosure (Vanguard)',
        cooperationLevel: 'Remote Mediate',
      },
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Cultural Scandal Exposure',
        description: 'Fund holds confirmed Tier 3 violating companies.',
        penalty: -18,
        exposureEstimate: '~8.7%',
        source: 'VOO holdings disclosure',
        cooperationLevel: 'Remote Mediate',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'estimated',
    magisterialBasis: 'Compendium §§357–359',
    foundationalEncyclical: 'Mensuram Bonam (2022)',
    dataEvidence: 'Unscreened S&P 500 exposure. Identical CST profile to SPY and IVV.',
    cooperationAnalysis: 'Remote mediate cooperation with Tier 2/3 violations.',
    ncbcNote: null,
    stewardship: 'REPLACE with CATH or similar screened alternative.',
    recommendAction: 'REPLACE',
  },

  CATH: {
    ticker: 'CATH',
    name: 'Global X S&P 500 Catholic Values ETF',
    type: 'etf',
    sector: 'Broad Market — CST Screened',
    status: 'PASS',
    tier: null,
    baseScore: 100,
    violations: [],
    virtueBonus: 20,
    dataConfidence: 'documented',
    magisterialBasis:
      'Compendium §§357–359; USCCB Socially Responsible Investment Guidelines (2021 update)',
    foundationalEncyclical: 'Mensuram Bonam (Pontifical Academy for Social Sciences, 2022)',
    dataEvidence:
      'Global X CATH ETF tracks the S&P 500 with explicit exclusions aligned with USCCB SRI guidelines, removing abortion services, contraception manufacturers, embryonic research companies, weapon makers, and other screened categories.',
    cooperationAnalysis:
      'Specifically designed to exclude USCCB-defined investment prohibitions. Qualifies as a positive-alignment vehicle under CST fiduciary standards. Virtue Multiplier (+20 pts) applies for intentional, documented mission alignment.',
    ncbcNote: null,
    stewardship: 'HOLD & ACCUMULATE. Highest CST alignment among major U.S. large-cap ETF products. Optimal replacement for SPY/IVV/VOO in CST-compliant portfolios.',
    recommendAction: 'HOLD',
  },

  AVGE: {
    ticker: 'AVGE',
    name: 'Avantis All Equity Markets ETF',
    type: 'etf',
    sector: 'Global Multi-Factor — Unscreened',
    status: 'REVIEW',
    tier: 'multiple',
    baseScore: 100,
    violations: [
      {
        tier: 2,
        type: 'Vice & Negligence',
        subtype: 'Vice Sector Exposure (Global)',
        description: 'Global multi-factor fund includes international tobacco and alcohol companies alongside U.S. vice sectors.',
        penalty: -12,
        exposureEstimate: '~2.8% estimated Tier 2 exposure (global holdings)',
        source: 'AVGE holdings disclosure (American Century/Avantis)',
        cooperationLevel: 'Remote Mediate',
      },
      {
        tier: 3,
        type: 'Cultural Scandal',
        subtype: 'Cultural Scandal Exposure',
        description: 'Fund includes domestic and international holdings with Tier 3 cultural violation profiles.',
        penalty: -15,
        exposureEstimate: '~6.5% estimated Tier 3 exposure',
        source: 'AVGE holdings disclosure',
        cooperationLevel: 'Remote Mediate',
      },
    ],
    virtueBonus: 0,
    dataConfidence: 'estimated',
    magisterialBasis: 'Compendium §§357–359',
    foundationalEncyclical: 'Mensuram Bonam (2022)',
    dataEvidence: 'Estimated violation exposure based on global holdings composition and multi-factor tilt methodology. Requires full underlying scan for precise figure.',
    cooperationAnalysis:
      'Global unscreened multi-factor fund carries remote mediate cooperation with Tier 2 and Tier 3 violations across both domestic and international holdings.',
    ncbcNote: null,
    stewardship:
      'REVIEW. Seek screened global multi-factor alternative or replace U.S. sleeve with CATH. Schedule full Fiduciary Review for complete underlying analysis.',
    recommendAction: 'REVIEW',
    requiresVerification: true,
  },
}

export default holdingsDB

export function searchHoldings(query) {
  if (!query || query.trim().length < 1) return []
  const q = query.trim().toUpperCase()
  return Object.values(holdingsDB).filter(
    (h) =>
      h.ticker.includes(q) ||
      h.name.toUpperCase().includes(q)
  ).slice(0, 8)
}
