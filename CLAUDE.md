# ROMCAL: Tridentine Calendar Edition

## Project Overview

This project is a derivative of [romcal](https://github.com/romcal/romcal), focused on implementing the **1962 Tridentine (Extraordinary Form) liturgical calendar** with **enhanced liturgical features** including Mass readings, prayers, and ceremonial rubrics.

### Distinction from Parent Project

**Parent Project (romcal):**

- Implements the 1969 post-Vatican II calendar (General Roman Calendar)
- Provides calendar dates, ranks, colors, and basic liturgical metadata
- Focused on "when" celebrations occur

**This Project:**

- Implements the 1962 Tridentine calendar (Extraordinary Form)
- Includes comprehensive liturgical content: readings, prayers, propers, rubrics
- Focused on "what" happens during celebrations (complete Ordo/Directorium)
- Target audience: FSSP, ICKSP, and other Extraordinary Form communities

### Key Differences: 1962 vs 1969 Calendars

| Feature              | 1962 Tridentine                                  | 1969 Modern (parent)                       |
| -------------------- | ------------------------------------------------ | ------------------------------------------ |
| **Pre-Lent**         | Septuagesima, Sexagesima, Quinquagesima          | None (Lent starts Ash Wednesday)           |
| **Seasons**          | Septuagesima Time, Passiontide, Pentecost Season | Ordinary Time (replaces Pentecost season)  |
| **Ranking System**   | 1st/2nd/3rd/4th Class, Doubles, Simples          | Solemnity/Feast/Memorial/Optional Memorial |
| **Octaves**          | Multiple octaves throughout year                 | Only Easter Octave and Christmas Octave    |
| **Vigils**           | Many vigils with unique Masses                   | Most vigils removed                        |
| **Liturgical Color** | More use of Black (Requiems, Good Friday)        | Purple often replaces Black                |
| **Proper of Saints** | More feast days                                  | Many feasts reduced or removed             |
| **Ember Days**       | 4 sets per year (Wed/Fri/Sat)                    | Optional, rarely observed                  |
| **Rogation Days**    | Monday-Wednesday before Ascension                | Optional, rarely observed                  |

## Project Context

### What is an Ordo/Directorium?

An **Ordo** (Latin) or **Directorium** (various languages) is the official liturgical directory published annually that provides:

- Daily Mass propers (readings, prayers, chants)
- Divine Office structure
- Ceremonial rubrics and instructions
- Feast rankings and precedence
- Liturgical colors and vestments

This project aims to generate complete digital Ordos for the 1962 Tridentine calendar.

### Features to Add (Beyond Parent Project)

#### 1. Scripture Readings

```typescript
interface Reading {
  citation: string; // e.g., "Isaiah 40:1-5, 9-11"
  type: 'epistle' | 'gospel' | 'lesson' | 'prophecy';
  text?: string; // Full text (copyright permitting)
  source?: string; // Missal reference
}
```

#### 2. Mass Prayers (Propers)

```typescript
interface Prayer {
  type: 'collect' | 'secret' | 'postcommunion' | 'preface';
  latin: string; // Original Latin text
  translation?: string; // English or other locale
  source?: string; // Missal page reference
}
```

#### 3. Mass Propers (Introit, Gradual, etc.)

```typescript
interface Proper {
  type: 'introit' | 'gradual' | 'alleluia' | 'tract' | 'sequence' | 'offertory' | 'communion';
  latin: string; // Chant text in Latin
  citation?: string; // Scripture reference if applicable
  notation?: string; // Gregorian notation (future)
}
```

#### 4. Liturgical Rubrics

```typescript
interface Rubric {
  type: 'gloria' | 'credo' | 'preface' | 'hanc_igitur' | 'commemorations' | 'general';
  instruction: string; // e.g., "Gloria is said", "Credo is omitted"
  detail?: string; // Additional ceremonial notes
}
```

#### 5. Divine Office Structure

```typescript
interface OfficeStructure {
  invitatory?: string; // Invitatory antiphon
  hymnOffice?: string; // Office hymn
  psalmody: PsalmScheme[]; // Psalm arrangement
  readings: Reading[]; // Matins readings
  teDeumSaid: boolean; // Whether Te Deum is sung
}
```

### Data Sources

**Liturgical Texts:**

- 1962 Roman Missal (Missale Romanum)
- 1962 Roman Breviary (Breviarium Romanum)
- Liber Usualis (chants and notation)
- Baronius Press Ordo (annual liturgical directory)

**References:**

- http://www.liturgyoffice.org.uk/Calendar/Extraordinary/
- https://divinumofficium.com (Divinum Officium project)
- https://github.com/DivinumOfficium/divinum-officium

**Copyright Considerations:**

- Liturgical texts pre-1962 are generally in public domain
- Modern translations may be copyrighted
- Start with Latin texts (public domain) and citations
- Optionally add translations with proper licensing

## Architecture

### Monorepo Structure

```
romcal-tridentine/
├── packages/
│   ├── config/              # Shared Jest and build config
│   └── easter/              # Easter calculation (reused from parent)
├── rites/
│   ├── roman1962/           # PRIMARY: 1962 Tridentine implementation
│   │   ├── build/           # Build scripts
│   │   ├── src/
│   │   │   ├── calendars/   # Calendar definitions
│   │   │   │   ├── general-roman/
│   │   │   │   └── countries/
│   │   │   ├── catalog/
│   │   │   │   ├── martyrology.ts
│   │   │   │   ├── readings-catalog.ts    # NEW: Scripture texts
│   │   │   │   ├── prayers-catalog.ts     # NEW: Collects, etc.
│   │   │   │   └── propers-catalog.ts     # NEW: Introits, etc.
│   │   │   ├── constants/
│   │   │   │   ├── ranks.ts               # MODIFIED: 1962 ranking
│   │   │   │   ├── precedences.ts         # MODIFIED: 1962 rules
│   │   │   │   ├── seasons.ts             # MODIFIED: Add Septuagesima
│   │   │   │   ├── colors.ts              # Same as parent
│   │   │   │   └── rubrics.ts             # NEW: Rubric types
│   │   │   ├── locales/                   # i18n (reuse parent structure)
│   │   │   ├── models/
│   │   │   │   ├── liturgical-day.ts      # EXTENDED: Add new fields
│   │   │   │   └── ...
│   │   │   ├── proper-of-time/            # MODIFIED: 1962 temporal cycle
│   │   │   ├── types/
│   │   │   │   ├── reading.ts             # NEW
│   │   │   │   ├── prayer.ts              # NEW
│   │   │   │   ├── proper.ts              # NEW
│   │   │   │   ├── rubric.ts              # NEW
│   │   │   │   └── ...
│   │   │   └── utils/                     # Reuse from parent
│   │   ├── __tests__/
│   │   ├── jest.config.mjs
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── roman1969/           # OPTIONAL: Keep for reference/comparison
└── [root config files]
```

### Key Directories

#### `/rites/roman1962/src/calendars/`

**Purpose:** Define all liturgical celebrations (Proper of Saints)

**Structure:**

- `general-roman/` - Universal 1962 calendar
- `countries/` - National calendars (e.g., France, USA)
- `regions/` - Continental/regional calendars
- `communities/` - Religious order calendars (future)

**Pattern:**

```typescript
export class GeneralRoman1962 extends CalendarDef {
  inputs: Inputs = {
    septuagesima_sunday: {
      precedence: Precedences.SundayOfFirstOrSecondClass,
      dateDef: { dateFn: 'septuagesimaSunday' },
      colors: [Colors.Purple],
      rank: Ranks.SecondClass,
      rubrics: [
        { type: 'gloria', instruction: 'Gloria is omitted' },
        { type: 'alleluia', instruction: 'Alleluia is not said' },
      ],
      readings: [
        { type: 'epistle', citation: '1 Corinthians 9:24-27; 10:1-5' },
        { type: 'gospel', citation: 'Matthew 20:1-16' },
      ],
      prayers: [
        { type: 'collect', latin: 'Preces populi tui...' },
        // ... secret, postcommunion
      ],
      propers: [
        { type: 'introit', latin: 'Circumdederunt me gemitus mortis...' },
        { type: 'gradual', latin: 'Adjutor in opportunitatibus...' },
        { type: 'tract', latin: 'De profundis clamavi ad te...' },
        // ... offertory, communion
      ],
    },
    // ... more celebrations
  };
}
```

#### `/rites/roman1962/src/catalog/`

**Purpose:** Centralized repositories of reusable liturgical content

**New Files:**

- `readings-catalog.ts` - Scripture texts (Epistles, Gospels, Lessons)
- `prayers-catalog.ts` - Collects, Secrets, Postcommunions, Prefaces
- `propers-catalog.ts` - Introits, Graduals, Tracts, Sequences, etc.

**Rationale:** Many readings/prayers are reused across different Masses (commons, votive Masses, etc.)

**Example:**

```typescript
// readings-catalog.ts
export const ReadingsCatalog = {
  epistle_1cor9_24_27: {
    citation: '1 Corinthians 9:24-27; 10:1-5',
    type: 'epistle',
    latin: 'Fratres: Nescitis quod ii qui in stadio currunt...',
    english: 'Brethren: Know you not that they that run in the race...',
  },
  // ... thousands of readings
};
```

#### `/rites/roman1962/src/constants/`

**Purpose:** Enumerations and immutable reference data

**Modified Files:**

- `ranks.ts` - 1962 ranking system (1st/2nd/3rd/4th Class, Doubles, Simples)
- `precedences.ts` - 1962 precedence rules (different from 1969)
- `seasons.ts` - Add Septuagesima Time, Passiontide, Pentecost Season

**New Files:**

- `rubrics.ts` - Rubric type enumerations
- `proper-types.ts` - Types of Mass propers

**Example:**

```typescript
// ranks.ts
export enum Rank {
  FirstClass = 'FIRST_CLASS',
  SecondClass = 'SECOND_CLASS',
  ThirdClass = 'THIRD_CLASS',
  FourthClass = 'FOURTH_CLASS',
  DoubleOfFirstClass = 'DOUBLE_OF_FIRST_CLASS',
  DoubleOfSecondClass = 'DOUBLE_OF_SECOND_CLASS',
  MajorDouble = 'MAJOR_DOUBLE',
  Double = 'DOUBLE',
  Semidouble = 'SEMIDOUBLE',
  Simple = 'SIMPLE',
  // ...
}
```

#### `/rites/roman1962/src/proper-of-time/`

**Purpose:** Programmatically generate the temporal cycle (Sundays and moveable feasts)

**Key Changes from Parent:**

- Add `septuagesimaTime()` - 3 Sundays before Lent
- Add `passiontide()` - Last 2 weeks of Lent
- Modify `lent()` - Different structure with Passiontide
- Modify `ordinaryTime()` → `afterPentecost()` - Sundays after Pentecost
- Add `afterEpiphany()` - Variable Sundays after Epiphany

#### `/rites/roman1962/src/types/`

**Purpose:** TypeScript type definitions

**New Files:**

```typescript
// reading.ts
export interface Reading {
  citation: string;
  type: ReadingType;
  latin?: string;
  translation?: Record<string, string>; // locale -> text
  source?: string;
}

// prayer.ts
export interface Prayer {
  type: PrayerType;
  latin: string;
  translation?: Record<string, string>;
  source?: string;
}

// proper.ts
export interface Proper {
  type: ProperType;
  latin: string;
  citation?: string;
  notation?: string; // Future: Gregorian notation
}

// rubric.ts
export interface Rubric {
  type: RubricType;
  instruction: string;
  detail?: string;
}
```

**Modified Files:**

- `liturgical-day.ts` - Extend with new fields:
  ```typescript
  export interface LiturgicalDay {
    // ... existing fields
    readings?: Reading[];
    prayers?: Prayer[];
    propers?: Proper[];
    rubrics?: Rubric[];
    officeStructure?: OfficeStructure;
  }
  ```

### Data Flow

```
1. Calendar Definition (calendars/general-roman/index.ts)
   ↓
2. Proper of Time Generation (proper-of-time/proper-of-time.ts)
   ↓
3. Calendar Merging (models/calendar.ts)
   ↓
4. Precedence Resolution (models/calendar.ts)
   ↓
5. Localization (locales/*.ts)
   ↓
6. LiturgicalDay Output (models/liturgical-day.ts)
```

## Standards and Conventions

### Code Style

**TypeScript:**

- Strict mode enabled
- Target: ES2022
- Module: CommonJS (with ESM exports)

**Naming Conventions:**

- `PascalCase` - Classes, interfaces, enums, types
- `camelCase` - Variables, functions, methods
- `SCREAMING_SNAKE_CASE` - Enum values, constants
- `snake_case` - Liturgical day keys (e.g., `septuagesima_sunday`)

**File Organization:**

- No default exports (except where required)
- Alphabetical import ordering
- Group imports: external → internal → types
- One newline between import groups

### Formatting

**Prettier Configuration:**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always"
}
```

### Linting

**ESLint (Flat Config):**

- TypeScript ESLint recommended rules
- Import order enforcement
- Unused imports detection
- No console.log in production code
- Object shorthand required

### Testing

**Framework:** Jest with esbuild-jest

**Coverage Requirements:**

- Aim for >80% coverage
- All public APIs must have tests
- Snapshot tests for calendar output

**Test Structure:**

- Unit tests: `*.spec.ts` alongside source
- Integration tests: `__tests__/*.test.ts`
- Fixtures: `__tests__/fixtures/`

**Test Environment:** `TZ=UTC` (all tests run in UTC)

### Git Workflow

**Conventional Commits:**

```
type(scope): subject

body (optional)
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (formatting, etc.)
- `refactor` - Code change that neither fixes bug nor adds feature
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes

**Scopes:**

- `calendar` - Calendar definitions
- `readings` - Scripture readings
- `prayers` - Mass prayers
- `propers` - Mass propers (introit, gradual, etc.)
- `rubrics` - Liturgical rubrics
- `build` - Build system
- `types` - Type definitions

**Commit Messages:**

- Do NOT add "Co-Authored-By: Claude" or similar AI attribution to commit messages
- Keep commit messages concise and focused on the technical changes

**Hooks:**

- Pre-commit: Prettier + ESLint (via lint-staged)
- Commit-msg: Conventional commit format validation

### Versioning

**Semantic Versioning:** `MAJOR.MINOR.PATCH`

**Pre-release:** Use `@dev` npm tag during development

- Example: `3.0.0-dev.1`, `3.0.0-dev.2`, ...

**Breaking Changes:**

- Major version bump
- Documented in CHANGELOG.md
- Migration guide provided

## Common Commands

### Setup

```bash
# Clone repository
git clone <repository-url>
cd romcal-tridentine

# Install dependencies
npm install

# Build all packages
npm run build
```

### Development

```bash
# Clean build artifacts
npm run clean

# Build specific rite
npm run build -w=@internal/rite-roman1962

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests without coverage (faster)
npm run test:without-coverage

# Update snapshots
npm run test:snapshot:update
```

### Code Quality

```bash
# Lint all code
npm run lint

# Fix linting issues
npm run lint:fix

# Format check
npm run prettier

# Format fix
npm run prettier:fix

# Run data integrity checks
npm run data:checks
```

### Documentation

```bash
# Generate API documentation
npm run doc

# Check for broken links in docs
npm run docs:check-links

# Sort glossary alphabetically
npm run docs:sort-glossary
```

### Build Output

```bash
# Build produces:
dist/
├── cjs/romcal.js          # CommonJS bundle
├── esm/romcal.js          # ES Module bundle
├── iife/romcal.js         # Browser bundle (global: Romcal)
├── bundles/               # Localized calendar bundles
│   ├── general-roman/
│   └── [country]/
└── index.d.ts             # TypeScript definitions
```

## Implementation Phases

### Phase 1: Foundation (MVP)

- [x] Set up monorepo structure
- [x] Implement 1962 ranking and precedence system
- [x] Implement 1962 Proper of Time (temporal cycle)
  - [x] Septuagesima Time
  - [x] Lent and Passiontide
  - [x] Sundays after Pentecost
  - [x] Ember Days and Rogation Days
- [x] Core General Roman Calendar 1962 (major feasts only)
- [x] Basic tests

### Phase 2: Enhanced Data

- [ ] Add Reading types and catalog structure
- [ ] Add Prayer types and catalog structure
- [ ] Add Proper types and catalog structure
- [ ] Add Rubric types
- [ ] Implement catalog references in calendar definitions
- [ ] Add readings/prayers/propers for major feasts

### Phase 3: Complete Sanctorale

- [ ] Complete General Roman Calendar 1962 (all saints)
- [ ] Add Commons of Saints with proper texts
- [ ] Populate readings catalog
- [ ] Populate prayers catalog
- [ ] Populate propers catalog

### Phase 4: Localization

- [ ] Latin locale (primary)
- [ ] English locale
- [ ] Additional locales (French, German, Spanish, etc.)
- [ ] Calendar bundles per locale

### Phase 5: National Calendars

- [ ] United States
- [ ] France
- [ ] Germany
- [ ] Poland
- [ ] Other countries with significant Extraordinary Form communities

### Phase 6: Advanced Features

- [ ] Divine Office structure
- [ ] Votive Masses
- [ ] Requiem Masses
- [ ] Commemorations system
- [ ] Gregorian notation (future)

### Phase 7: Polish & Release

- [ ] Comprehensive test coverage
- [ ] API documentation
- [ ] User guide
- [ ] Migration from parent project guide
- [ ] Examples and integrations
- [ ] v1.0.0 release

## Data Integrity

### Validation Checks

**Automated Checks (`npm run data:checks`):**

- All liturgical days have valid precedence
- All liturgical days have valid rank
- All date definitions are well-formed
- No duplicate keys
- All calendar inheritance chains are valid
- All locale references exist
- All reading citations are well-formed
- All prayer references exist in catalog

### Sources of Truth

**Primary:**

- 1962 Missale Romanum (official)
- 1962 Breviarium Romanum (official)
- Vatican documents on 1962 calendar

**Secondary:**

- Baronius Press Ordo
- Divinum Officium project
- FSSP and ICKSP liturgical resources

### Review Process

**Before Adding New Calendar Data:**

1. Verify against official sources
2. Cross-reference with existing implementations
3. Add source citations in code comments
4. Create test fixtures
5. Peer review

## Project Goals

### Short-term

- Provide accurate 1962 liturgical calendar with dates and rankings
- Include Mass readings for all Sundays and major feasts
- Support Latin and English locales

### Medium-term

- Complete readings/prayers/propers for entire calendar
- Support major national calendars
- Create example applications (web app, API, etc.)

### Long-term

- Become the reference implementation for 1962 Tridentine calendar
- Support Divine Office (Breviary) generation
- Provide Gregorian chant notation
- Enable custom diocesan and religious community calendars

## Contributing

**We Welcome:**

- Bug reports and fixes
- Calendar data corrections
- New localizations
- Test coverage improvements
- Documentation enhancements
- Feature suggestions

**Before Contributing:**

1. Read this CLAUDE.md file
2. Check existing issues
3. Discuss major changes in issues first
4. Follow code style and conventions
5. Add tests for new features
6. Update documentation

**Pull Request Process:**

1. Fork and create feature branch
2. Make changes with conventional commits
3. Run `npm run lint:fix` and `npm run prettier:fix`
4. Run `npm test` and ensure all tests pass
5. Update CHANGELOG.md
6. Submit PR with clear description

## Resources

### Documentation

- [Parent romcal documentation](https://github.com/romcal/romcal/tree/dev/docs)
- [Parent romcal API docs](https://romcal.github.io/romcal/)
- [General Norms for the Liturgical Year and Calendar (1969)](https://www.catholicculture.org/culture/library/view.cfm?id=10842)
- [1962 Rubrics of the Roman Breviary and Missal](http://www.sanctamissa.org/en/resources/1962-rubrics/)

### External Projects

- [Divinum Officium](https://divinumofficium.com) - 1962 Divine Office online
- [Divinum Officium GitHub](https://github.com/DivinumOfficium/divinum-officium)
- [Extraordinary Form Calendar (UK)](http://www.liturgyoffice.org.uk/Calendar/Extraordinary/)

### Communities

- Priestly Fraternity of St. Peter (FSSP)
- Institute of Christ the King Sovereign Priest (ICKSP)
- Personal Apostolic Administration of St. Peter
- Society of St. Pius X (SSPX) - uses similar calendar with minor differences

## License

MIT License (same as parent project)

---

**Last Updated:** 2025-12-07
**Romcal Version Reference:** 3.0.0-dev.118 (parent project)
