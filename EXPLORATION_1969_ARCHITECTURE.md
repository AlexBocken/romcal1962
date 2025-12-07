# 1969 Proper of Time Architecture Analysis

## Executive Summary

The 1969 Roman calendar implementation uses a class-based architecture where `ProperOfTime` extends `CalendarDef` to generate the temporal cycle (moveable feasts). The system calculates dates based on Easter using a sophisticated `Dates` utility class with memoization and supports multiple scopes (gregorian/liturgical).

---

## Architecture Overview

### 1. Class Hierarchy

```
CalendarDef (base class)
  └── ProperOfTime (generates temporal cycle)
```

**ProperOfTime** is responsible for:

- Generating all dates of the temporal cycle (moveable feasts)
- Structuring the liturgical year into seasons
- Defining date calculation functions
- Creating LiturgicalDayDef objects with proper precedence and metadata

### 2. Main Components

#### A. ProperOfTime Class (`/rites/roman1969/src/proper-of-time/proper-of-time.ts`)

**Key Methods:**

```typescript
public buildAllDefinitions(): void
  - Orchestrates building all temporal cycle definitions
  - Calls seasonal methods: advent(), christmasTime(), lent(), paschalTriduum(),
    easterTime(), ordinaryTime()

private #newLiturgicalDayDef(id, input): LiturgicalDayDef
  - Factory method to create LiturgicalDayDef objects
  - Sets properCycle to ProperCycles.ProperOfTime
  - Wraps with PROPER_OF_TIME_NAME identifier
```

**Seasonal Methods:**

1. `advent(yearOffset)` - Lines 74-130
2. `christmasTime(yearOffset)` - Lines 136-139 (delegates to earlyChristmasTime + lateChristmasTime)
3. `earlyChristmasTime(yearOffset)` - Lines 148-189
4. `lateChristmasTime(yearOffset)` - Lines 198-275
5. `lent(yearOffset)` - Lines 281-349
6. `paschalTriduum(yearOffset)` - Lines 355-400
7. `easterTime(yearOffset)` - Lines 406-477
8. `ordinaryTime(yearOffset)` - Lines 483-559

#### B. Dates Utility Class (`/rites/roman1969/src/utils/dates.ts`)

**Purpose:** Provides all date calculations needed for the liturgical calendar

**Key Patterns:**

- **Memoization**: Every method caches results using private record properties (e.g., `#christmas: Record<string, Date> = {}`)
- **Dual Instance/Static Methods**: Most methods have both instance (`easterSunday()`) and static (`Dates.easter()`) versions
- **Year Handling**: Distinguishes between liturgical year and gregorian year via `#isLiturgicalYear`

**Easter-Based Calculations:**

```typescript
easterSunday(year, easterCalculationType) → Date
  - Uses calculateGregorianEasterDate() or calculateJulianEasterDateToGregorianDate()
  - From @internal/easter package
  - Base for all moveable feasts

// Examples of dependencies:
ashWednesday() = easterSunday() - 46 days
palmSunday() = easterSunday() - 7 days
goodFriday() = easterSunday() - 2 days
holySaturday() = easterSunday() - 1 day
pentecostSunday() = easterSunday() + 49 days
trinitySunday() = easterSunday() + 56 days
corpusChristi() = easterSunday() + 63 days (or +60 if not on Sunday)
```

**Date Helper Methods:**

```typescript
addDays(date, days) → Date
subtractsDays(date, days) → Date
getUtcDate(year, month, date) → Date
startOfWeek(date) → Date
isSameDate(date1, date2) → boolean
dateDifference(date1, date2) → number
rangeOfDays(start, end) → Date[]
```

#### C. Constants

**Seasons.ts:**

```typescript
enum Season {
  Advent,
  ChristmasTime,
  Lent,
  PaschalTriduum,
  EasterTime,
  OrdinaryTime,
}
```

**Precedences.ts:**

- Numeric ordering (1-13) defining precedence rules
- Higher numbers = lower precedence
- Each precedence is a string constant like `'PRIVILEGED_SUNDAY_2'`

---

## Data Flow

### 1. Initialization Flow

```
User calls romcal(year, {calendar: GeneralRoman})
  ↓
Calendar.prototype.buildAllDefinitions()
  ↓
ProperOfTime.buildAllDefinitions() is called
  ↓
Checks scope (gregorian/liturgical)
  ├─ If gregorian:
  │   • lateChristmasTime(+1) - next year's early Christmas
  │   • lent() - current year
  │   • paschalTriduum()
  │   • easterTime()
  │   • ordinaryTime()
  │   • advent(+1) - next year's Advent
  │   • earlyChristmasTime(+1)
  │
  └─ If liturgical:
      • advent() - current liturgical year
      • christmasTime()
      • lent()
      • paschalTriduum()
      • easterTime()
      • ordinaryTime()
```

### 2. Season Definition Pattern

Each seasonal method follows a pattern:

```typescript
methodName(yearOffset = 0): void {
  // Loop through days/weeks
  for (let i = 0; i < count; i += 1) {
    const week = Math.floor(i / 7) + 1;
    const dow = i - (week - 1) * 7;

    this.#newLiturgicalDayDef(`key_${week}_${this.#weekdays[dow]}`, {
      precedence: Precedences.SomeValue,
      dateDef: {
        dateFn: 'someFunction',
        dateArgs: [args...],
        yearOffset: -1 + yearOffset
      },
      seasons: [Season.SomeSeasonOrMultiple],
      periods: [Period.SomePeriod],
      calendarMetadata: { weekOfSeason, dayOfSeason, dayOfWeek },
      colors: [Colors.Color],
      i18nDef: ['i18n:key', {context}]
    });
  }
}
```

### 3. Date Definition Types

**Format 1: Fixed month/date**

```typescript
dateDef: { month: 1, date: 25 }  // January 25
```

**Format 2: Function-based**

```typescript
dateDef: {
  dateFn: 'ashWednesday',
  yearOffset: 0
}
```

**Format 3: Function with arguments**

```typescript
dateDef: {
  dateFn: 'sundayOfAdvent',
  dateArgs: [week],
  yearOffset: -1
}
```

**Format 4: Function with offset**

```typescript
dateDef: {
  dateFn: 'ashWednesday',
  addDay: 4,  // or subtractDay: 2
  yearOffset: 0
}
```

---

## Key Insights for 1962 Implementation

### 1. Date Calculation Foundation (Reusable)

The `Dates` class is calendar-agnostic for most calculations:

- ✅ Easter date calculation (same algorithm for both 1962 and 1969)
- ✅ Simple arithmetic (addDays, subtractDays)
- ✅ Holiday calculations (Christmas Dec 25, Epiphany Jan 6, etc.)

**What needs modification for 1962:**

- Dates needed for Septuagesima, Sexagesima, Quinquagesima
- Dates for After Epiphany Sundays (different counting than 1969)
- Dates for After Pentecost Sundays (different numbering than Ordinary Time)
- Additional octaves

### 2. ProperOfTime Architecture (Adaptable)

The structure is flexible:

```typescript
export class ProperOfTime1962 extends CalendarDef {
  buildAllDefinitions(): void {
    if (this.#config.scope === 'gregorian') {
      // Handle year transitions
    } else {
      this.advent();
      this.christmasTime();
      this.afterEpiphany();          // NEW
      this.septuagesimaTime();       // NEW
      this.lent();
      this.passiontide();             // NEW (or within lent())
      this.paschalTriduum();
      this.easterTime();
      this.rogatonDays();             // NEW
      this.pentecostSeason();         // MODIFIED (replaces ordinaryTime)
    }
  }

  // New methods for 1962
  afterEpiphany(yearOffset = 0): void { ... }
  septuagesimaTime(yearOffset = 0): void { ... }
  passiontide(yearOffset = 0): void { ... }
  rogationDays(yearOffset = 0): void { ... }
  pentecostSeason(yearOffset = 0): void { ... }
}
```

### 3. Dates Utility Additions (Extend)

Add to `Dates` class for 1962-specific dates:

```typescript
class Dates {
  // NEW: Septuagesima cycle
  septuagesimaTime() → Date[]
  septuagesimaS unday() → Date
  sexagesimaSunday() → Date
  quinquagesimaSunday() → Date

  // NEW: After Epiphany (varies by Easter date)
  afterEpiphanyS undays(year) → Date[]
  sundayAfterEpiphany(week) → Date

  // MODIFIED: Passiontide
  passionSunday() → Date  // 5th Sunday of Lent
  holyWeekStart() → Date  // Passion Sunday (already palmSunday in 1969)

  // NEW: Rogation Days
  rogationDays() → Date[]  // Mon-Wed before Ascension

  // NEW: After Pentecost counting
  afterPentecostSunday(week) → Date
  allSundaysAfterPentecost(year) → Date[]
}
```

### 4. Season and Rank Differences (Already Defined)

The 1962 constants are partially defined:

**Seasons.ts (roman1962):**

- ✅ AfterEpiphany = 'AFTER_EPIPHANY'
- ✅ SeptuagesimaTime = 'SEPTUAGESIMA_TIME'
- ✅ Passiontide = 'PASSIONTIDE'
- ✅ PentecostSeason = 'PENTECOST_SEASON'

**Precedences.ts (roman1962):**

- ✅ Comprehensive 1960 Code of Rubrics system
- ✅ Different from 1969 (more octaves, vigils, ferial precedence)

---

## Implementation Strategy

### Phase 1: Extend Dates Class

1. Calculate Septuagesima dates (70 days before Easter)
2. Implement After Epiphany Sunday calculations
3. Implement Passiontide identification
4. Implement Rogation Days
5. Implement After Pentecost Sunday counting

### Phase 2: Implement ProperOfTime1962

1. Create class extending CalendarDef
2. Implement 8 seasonal methods (advent through pentecostSeason)
3. Handle gregorian vs liturgical scope
4. Use existing color/period/precedence constants

### Phase 3: Integrate with Calendar System

1. Create GeneralRoman1962 class (extends CalendarDef)
2. Define Sanctorale (fixed feasts)
3. Set ParentCalendars reference to ProperOfTime1962
4. Add to calendar registry

---

## Code Patterns to Replicate

### Pattern 1: Memoized Date Methods

```typescript
private #someDate: Record<string, Date> = {};

someDate = (year = this.#year): Date => {
  if (this.#someDate[year]) return this.#someDate[year];
  return (this.#someDate[year] = /* calculation */);
};
```

### Pattern 2: Range of Days

```typescript
const start = this.someStartDate(year);
const end = subtractsDays(this.someEndDate(year), 1);
const allDates = rangeOfDays(start, end);
```

### Pattern 3: Looping with Week/Day-of-Week

```typescript
for (let i = 0; i < 35; i += 1) {
  const week = Math.floor(i / 7) + 1;
  const dow = i - (week - 1) * 7;
  // dow: 0=Sunday, 1=Monday, ..., 6=Saturday
}
```

### Pattern 4: Conditional Metadata

```typescript
calendarMetadata: {
  weekOfSeason: week,
  dayOfSeason: i + 1,
  dayOfWeek: dow
}
```

---

## 1969 vs 1962: Key Differences to Implement

| Aspect              | 1969                                          | 1962                                                            |
| ------------------- | --------------------------------------------- | --------------------------------------------------------------- |
| **Pre-Lent**        | None                                          | Septuagesima (3 Sundays)                                        |
| **After Epiphany**  | Variable Sundays (same as OT after Pentecost) | 1-6 Sundays (varies by Easter)                                  |
| **Lent Structure**  | 6 Sundays                                     | 6 Sundays + Passiontide (final 2 weeks)                         |
| **Passiontide**     | None                                          | Distinct 2-week period (veilings, no Gloria Patri)              |
| **Easter Season**   | 7 weeks                                       | 7 weeks (same)                                                  |
| **Rogation Days**   | Not in temporal cycle                         | Mon-Wed before Ascension                                        |
| **After Pentecost** | Ordinary Time (1-34 Sundays)                  | Pentecost Season (1-28 Sundays)                                 |
| **Octaves**         | Only Easter + Christmas                       | Multiple (Christmas, Epiphany, Pentecost, Corpus Christi, etc.) |
| **Ember Days**      | Optional/separate                             | Part of temporal cycle                                          |

---

## Files to Create/Modify for 1962

```
rites/roman1962/src/
├── proper-of-time/
│   ├── proper-of-time.ts          # NEW: Main temporal cycle class
│   └── proper-of-time.spec.ts     # NEW: Tests
├── utils/
│   ├── dates.ts                   # EXTEND: Add 1962-specific date methods
│   └── dates.spec.ts              # EXTEND: Add 1962-specific tests
├── constants/
│   ├── seasons.ts                 # DONE: 1962 seasons defined
│   ├── precedences.ts             # DONE: 1960 Code of Rubrics defined
│   ├── ranks.ts                   # DONE: 1962 ranking system
│   └── colors.ts                  # REUSE: Same as 1969
├── models/
│   ├── calendar-def.ts            # REUSE: From parent
│   ├── liturgical-day-def.ts      # REUSE: From parent
│   └── config.ts                  # REUSE: From parent
├── calendars/
│   └── general-roman/
│       └── index.ts               # NEW: 1962 General Roman calendar
└── types/
    └── common.ts                  # DONE: Basic types
```
