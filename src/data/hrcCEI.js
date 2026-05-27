// HRC Corporate Equality Index (CEI) Lookup Table
// Source: HRC Foundation CEI 2023/2024 public dataset
// Updated annually at hrc.org/resources/corporate-equality-index
//
// Fields:
//   score          — HRC CEI score (0–100). 80+ = high probability of Tier 3 violations.
//   abortionTravel — confirmed employer-subsidized abortion travel benefit
//   genderTrans    — confirmed employer-subsidized gender-transition healthcare benefit
//   confirmed      — true = publicly reported post-Dobbs announcement or consecutive 100% CEI
//                    false = estimated from profile; requires live HRC query for certainty
//
// CST Screening Use:
//   score 0 / non-participant → no confirmed Tier 3 benefits (provisionally cleaner)
//   score 1–79  → some benefits possible; check individual policies
//   score 80–99 → high probability of Tier 3 violations; flag for review
//   score 100   → highest probability; abortion travel and gender-transition benefits typical

const HRC_CEI = {

  // ── Technology ──────────────────────────────────────────────────────────
  AAPL:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  MSFT:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  GOOGL: { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  GOOG:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  META:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  AMZN:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  NVDA:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  INTC:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  IBM:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  CSCO:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  CRM:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  ADBE:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  ORCL:  { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  QCOM:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  AVGO:  { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  TXN:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ADI:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  AMAT:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  LRCX:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  KLAC:  { score:  95, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MU:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  HPQ:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  HPE:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  DELL:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ACN:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  NOW:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  SNOW:  { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PANW:  { score:  95, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CRWD:  { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MCHP:  { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  SWKS:  { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  MPWR:  { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  ENTG:  { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  KEYS:  { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CDNS:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  SNPS:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ANSS:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  FTNT:  { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  OKTA:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ZS:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  DDOG:  { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  NET:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  TEAM:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  WDAY:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  INTU:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PYPL:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  SQ:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  UBER:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  LYFT:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ABNB:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  DASH:  { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  SPOT:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  TWTR:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false }, // pre-Musk
  TSLA:  { score:  35, abortionTravel: false, genderTrans: false, confirmed: true  }, // Musk era, low CEI

  // ── Financials ──────────────────────────────────────────────────────────
  JPM:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  BAC:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  WFC:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  GS:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  MS:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  C:     { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  BLK:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  SCHW:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  AXP:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  V:     { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MA:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  COF:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  DFS:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  USB:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PNC:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  TFC:   { score:  85, abortionTravel: true,  genderTrans: true,  confirmed: false },
  FITB:  { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  KEY:   { score:  85, abortionTravel: true,  genderTrans: true,  confirmed: false },
  RF:    { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  HBAN:  { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  MTB:   { score:  75, abortionTravel: false, genderTrans: false, confirmed: false },
  CFG:   { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  STT:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  BK:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  NTRS:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MET:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PRU:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  AFL:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  AIG:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ALL:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PGR:   { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  TRV:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CB:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MMC:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  AON:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  'BRK.B': { score: 0, abortionTravel: false, genderTrans: false, confirmed: true  }, // non-participant

  // ── Healthcare / Pharma / Biotech ────────────────────────────────────────
  JNJ:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PFE:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  MRK:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  ABBV:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  LLY:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  BMY:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  AMGN:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  GILD:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  BIIB:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  REGN:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  VRTX:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ISRG:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  BSX:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MDT:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ABT:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  SYK:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ZTS:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  A:     { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false }, // Agilent
  DHR:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  TMO:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  IQV:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  WAT:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MTD:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  BIO:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ALGN:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  RMD:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  BAX:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  BDX:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  EW:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  HOLX:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ILMN:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  IDXX:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  UNH:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CVS:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CI:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ELV:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  HUM:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CNC:   { score:  85, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MCK:   { score:  95, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CAH:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ABC:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  GEHC:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  DXCM:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MRNA:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  BNTX:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CRSP:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false }, // CRISPR Therapeutics
  EDIT:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false }, // Editas Medicine

  // ── Consumer Discretionary ───────────────────────────────────────────────
  DIS:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  NFLX:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  NKE:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  MCD:   { score:  95, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  SBUX:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  TGT:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  AMZN:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  HD:    { score:   0, abortionTravel: false, genderTrans: false, confirmed: true  }, // non-participant
  LOW:   { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  F:     { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  GM:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  TSLA:  { score:  35, abortionTravel: false, genderTrans: false, confirmed: true  },
  APTV:  { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CMG:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  YUM:   { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  QSR:   { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  HLT:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MAR:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  H:     { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  IHG:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  EXPE:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  BKNG:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  TJX:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ROST:  { score:  75, abortionTravel: false, genderTrans: false, confirmed: false },
  BURL:  { score:  70, abortionTravel: false, genderTrans: false, confirmed: false },
  RL:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PVH:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  TPR:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CPRI:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },

  // ── Consumer Staples ─────────────────────────────────────────────────────
  WMT:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  COST:  { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  KR:    { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PG:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  KO:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PEP:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MDLZ:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  GIS:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  K:     { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  CPB:   { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  HSY:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CLX:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CL:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  KMB:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  EL:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ULTA:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  DG:    { score:  60, abortionTravel: false, genderTrans: false, confirmed: false },
  DLTR:  { score:  65, abortionTravel: false, genderTrans: false, confirmed: false },
  SYY:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },

  // ── Communication Services ───────────────────────────────────────────────
  VZ:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  T:     { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  TMUS:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CMCSA: { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CHTR:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PARA:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  WBD:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  FOXA:  { score:  65, abortionTravel: false, genderTrans: false, confirmed: false }, // Fox lower CEI
  FOX:   { score:  65, abortionTravel: false, genderTrans: false, confirmed: false },
  NYT:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  TTD:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MTCH:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },

  // ── Industrials ──────────────────────────────────────────────────────────
  GE:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  HON:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  MMM:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CAT:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  DE:    { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  EMR:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PH:    { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  ETN:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ROK:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  UNP:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CSX:   { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  NSC:   { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  UPS:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  FDX:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  LMT:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  RTX:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  NOC:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  BA:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: true  },
  GD:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  HII:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  LHX:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  TDG:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  AXON:  { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  XYL:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ITW:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  AME:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  FAST:  { score:  60, abortionTravel: false, genderTrans: false, confirmed: false },
  SWK:   { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  IR:    { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  OTIS:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CARR:  { score:  95, abortionTravel: true,  genderTrans: true,  confirmed: false },
  DAL:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  UAL:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  AAL:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  LUV:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },

  // ── Energy ───────────────────────────────────────────────────────────────
  XOM:   { score:  25, abortionTravel: false, genderTrans: false, confirmed: false },
  CVX:   { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  COP:   { score:  65, abortionTravel: false, genderTrans: false, confirmed: false },
  OXY:   { score:  40, abortionTravel: false, genderTrans: false, confirmed: false },
  PSX:   { score:  75, abortionTravel: false, genderTrans: false, confirmed: false },
  VLO:   { score:  70, abortionTravel: false, genderTrans: false, confirmed: false },
  MPC:   { score:  70, abortionTravel: false, genderTrans: false, confirmed: false },
  SLB:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  HAL:   { score:  70, abortionTravel: false, genderTrans: false, confirmed: false },
  BKR:   { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  NEE:   { score:  60, abortionTravel: false, genderTrans: false, confirmed: true  }, // confirmed non-provider per research
  DUK:   { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  SO:    { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  AEP:   { score:  75, abortionTravel: false, genderTrans: false, confirmed: false },
  EXC:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  SRE:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PCG:   { score:  85, abortionTravel: true,  genderTrans: false, confirmed: false },
  ED:    { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  WEC:   { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  ES:    { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  EIX:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PEG:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },

  // ── Materials ─────────────────────────────────────────────────────────────
  LIN:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  APD:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  DD:    { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  DOW:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PPG:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  SHW:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  ECL:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  NEM:   { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  FCX:   { score:  75, abortionTravel: false, genderTrans: false, confirmed: false },
  NUE:   { score:  70, abortionTravel: false, genderTrans: false, confirmed: false },
  STLD:  { score:  65, abortionTravel: false, genderTrans: false, confirmed: false },
  X:     { score:  65, abortionTravel: false, genderTrans: false, confirmed: false },

  // ── REITs ────────────────────────────────────────────────────────────────
  AMT:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PLD:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  CCI:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  EQIX:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  SPG:   { score:  90, abortionTravel: true,  genderTrans: true,  confirmed: false },
  O:     { score:  75, abortionTravel: false, genderTrans: false, confirmed: false },
  WELL:  { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  PSA:   { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
  EQR:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  AVB:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  DLR:   { score: 100, abortionTravel: true,  genderTrans: true,  confirmed: false },
  VICI:  { score:  80, abortionTravel: true,  genderTrans: false, confirmed: false },
}

export default HRC_CEI

/**
 * Look up a ticker in the HRC CEI table.
 * @param {string} ticker
 * @returns {{ score, abortionTravel, genderTrans, confirmed } | null}
 */
export function getHRCStatus(ticker) {
  return HRC_CEI[ticker?.toUpperCase()] || null
}

/**
 * Derive a Tier 3 penalty from HRC CEI data.
 * Returns { penalty, violations[], notes }
 */
export function deriveHRCViolations(ticker) {
  const h = getHRCStatus(ticker)
  if (!h) return { penalty: 0, violations: [], notes: 'Not in HRC CEI dataset — requires live query' }

  if (h.score === 0) {
    return {
      penalty: 0,
      violations: [],
      notes: 'HRC CEI non-participant — no confirmed abortion travel or gender-transition benefits',
    }
  }

  const violations = []
  let penalty = 0

  if (h.abortionTravel) {
    violations.push({
      tier: 3,
      type: 'Cultural Scandal',
      subtype: 'Abortion Travel Subsidy',
      description: `Company provides subsidized out-of-state abortion travel benefits for employees.${h.confirmed ? '' : ' (Estimated from HRC CEI profile — requires live query confirmation.)'}`,
      penalty: -20,
      source: `HRC Corporate Equality Index (CEI) ${h.confirmed ? '— confirmed' : `score ${h.score}/100 — estimated`}`,
      cooperationLevel: 'Proximate Material',
    })
    penalty -= 20
  }

  if (h.genderTrans) {
    violations.push({
      tier: 3,
      type: 'Cultural Scandal',
      subtype: 'Gender-Transition Healthcare Subsidy',
      description: `Company provides subsidized gender-transition healthcare benefits for employees.${h.confirmed ? '' : ' (Estimated from HRC CEI profile — requires live query confirmation.)'}`,
      penalty: -10,
      source: `HRC Corporate Equality Index (CEI) ${h.confirmed ? '— confirmed' : `score ${h.score}/100 — estimated`}`,
      cooperationLevel: 'Proximate Material',
    })
    penalty -= 10
  }

  return { penalty, violations, notes: `HRC CEI score: ${h.score}/100` }
}
