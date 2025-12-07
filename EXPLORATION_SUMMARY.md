# 1969 Proper of Time Exploration: Summary & Findings

**Date:** 2025-12-07  
**Scope:** Medium thoroughness  
**Focus:** Understanding architecture for 1962 adaptation

---

## What Was Explored

1. **ProperOfTime class** - Main temporal cycle generator
2. **Dates utility class** - All date calculations
3. **Constants** - Seasons, precedences, ranks
4. **Calendar architecture** - How calendars are built and composed
5. **Code patterns** - Reusable implementation patterns

---

## Key Findings

### 1. Architecture is Simple & Reusable

The 1969 implementation follows a clean, modular design:

- **ProperOfTime class** extends CalendarDef and orchestrates seasonal methods
- **Each seasonal method** (advent, lent, easterTime, etc.) creates LiturgicalDayDef objects using a loop pattern
- **Dates utility class** handles all date arithmetic with memoization for performance
- **Constants** define seasons, precedences, colors, and other metadata

**Implication:** The 1962 implementation can follow the exact same patterns with 1962-specific seasons and precedences.

### 2. Date Calculations are Well-Encapsulated

The Dates class handles:

- Fixed dates (Christmas Dec 25, Epiphany Jan 6)
- Easter-dependent dates (calculated from Easter Sunday)
- Offset calculations (dates relative to key dates)
- Range generation (all dates in a period)

**Implication:** Extending with 1962-specific date methods (Septuagesima, After Epiphany, Rogation Days) is straightforward—just follow the memoization pattern.

### 3. The Loop Pattern is Universal

Every season uses:

```typescript
for (let i = 0; i < count; i += 1) {
  const week = Math.floor(i / 7) + 1;
  const dow = i - (week - 1) * 7;

  this.#newLiturgicalDayDef(`key_${week}_${this.#weekdays[dow]}`, {
    // config
  });
}
```

This pattern works for:

- Advent (4 weeks)
- Lent (6 weeks)
- Easter Time (7 weeks)
- Ordinary Time (34 weeks, 1969) → **Pentecost Season (28 weeks, 1962)**
- **New: Septuagesima (3 weeks)**
- **New: After Epiphany (1-6 weeks, variable)**
- **New: Passiontide (2 weeks, part of Lent)**

### 4. Precedence & Rank Systems are Separate

- **Precedences** define priority when multiple celebrations fall on same day
- **Ranks** classify celebrations (1st Class, 2nd Class, etc.)
- 1962 has different values for both (already defined in roman1962/)

**Implication:** No changes needed to core logic—just use 1962 Precedences and Ranks constants.

### 5. Scope Handling (Gregorian vs Liturgical) is Important

The `buildAllDefinitions()` method checks scope:

```typescript
if (this.#config.scope === 'gregorian') {
  // Handle year transitions (Christmas spans Dec-Jan)
  // Latedate Christmas Time
  // Early Advent (next year)
} else {
  // Simple linear order within liturgical year
}
```

**Implication:** Must preserve this logic for 1962 version.

---

## What Needs to be Different in 1962

| Component       | 1969                     | 1962                                                              | Effort                        |
| --------------- | ------------------------ | ----------------------------------------------------------------- | ----------------------------- |
| Seasons         | 6                        | 9 (add AfterEpiphany, Septuagesima, Passiontide, PentecostSeason) | Low - already defined         |
| Precedences     | 13 levels                | 15 levels (1960 Code of Rubrics)                                  | Low - already defined         |
| Advent          | Same structure           | Same structure + special Dec 17-23 handling                       | Low - 1-2 line changes        |
| Christmas Time  | Same structure           | Same structure                                                    | Low - reuse as-is             |
| After Epiphany  | N/A                      | 1-6 Sundays (varies by Easter)                                    | Medium - new method           |
| Septuagesima    | N/A                      | 3 Sundays (9/8/7 weeks before Easter)                             | Low - follow Advent pattern   |
| Lent            | 6 weeks                  | 4 weeks + Passiontide (2 weeks)                                   | Medium - split into 2 methods |
| Passiontide     | N/A                      | Weeks 5-6 of Lent (special veiling rules)                         | Low - separate method         |
| Easter Time     | 7 weeks                  | 7 weeks (same)                                                    | Low - reuse as-is             |
| Rogation Days   | N/A                      | Mon-Wed before Ascension                                          | Low - small separate method   |
| After Pentecost | 34 weeks (Ordinary Time) | 28 weeks (Pentecost Season)                                       | Low - adjust loop count       |
| Octaves         | 2 major                  | 4-5 major                                                         | Low - update periods          |

---

## Implementation Roadmap

### Phase 1: Extend Dates Class (est. 100-150 lines)

Add these methods to Dates class:

```typescript
// Septuagesima cycle (70/60/50 days before Easter)
septuagesimaS unday() → Date
sexagesimaSunday() → Date
quinquagesimaSunday() → Date
septuagesimaWeekday(dow, week) → Date

// After Epiphany (varies with Easter, max 6 Sundays)
sundayAfterEpiphany(week) → Date | null
allSundaysAfterEpiphany(year) → Date[]

// Passiontide (weeks 5-6 of Lent)
passionSunday() → Date  // 5th Sunday of Lent
passiontideWeekday(dow, week) → Date

// Rogation Days (Mon-Wed before Ascension)
rogationDays() → Date[]
rogationDay(dow) → Date

// After Pentecost (replaces Ordinary Time)
afterPentecostSunday(week) → Date
afterPentecostWeekday(dow, week) → Date
```

All follow memoization pattern—copy from existing methods.

### Phase 2: Implement ProperOfTime Class (est. 600-800 lines)

Create `/rites/roman1962/src/proper-of-time/proper-of-time.ts`:

```typescript
export class ProperOfTime extends CalendarDef {
  // Copy structure from roman1969

  buildAllDefinitions(): void {
    // buildAllDefinitions + adjust season call order
  }

  // Seasonal methods (in order):
  advent(); // Copy from 1969 (almost identical)
  christmasTime(); // Copy from 1969 (identical)
  afterEpiphany(); // NEW - 1-6 Sundays, varies
  septuagesimaTime(); // NEW - 3 Sundays
  lent(); // MODIFY - only weeks 1-4
  passiontide(); // NEW - weeks 5-6
  paschalTriduum(); // Copy from 1969 (identical)
  easterTime(); // Copy from 1969 (identical)
  rogationDays(); // NEW - Mon-Wed before Ascension
  pentecostSeason(); // NEW - up to 28 Sundays after Pentecost
}
```

### Phase 3: Create Calendar Definition (est. 100-200 lines)

Create `/rites/roman1962/src/calendars/general-roman/index.ts`:

This defines the Sanctorale (fixed feasts). Can start minimal and expand.

### Phase 4: Testing & Integration (est. 200-400 lines tests)

Create test suite and integrate with calendar registry.

---

## Files & Line Counts

```
New/Modified Files:

rites/roman1962/src/
├── proper-of-time/
│   ├── proper-of-time.ts                        NEW  ~700 lines
│   └── proper-of-time.spec.ts                   NEW  ~400 lines
├── utils/
│   ├── dates.ts                                 NEW  ~300 lines (1962-specific additions)
│   └── dates.spec.ts                            NEW  ~200 lines
├── calendars/
│   └── general-roman/
│       └── index.ts                             NEW  ~200-500 lines (start minimal)
└── constants/
    ├── seasons.ts                               DONE ✓ (already defined)
    ├── precedences.ts                           DONE ✓ (already defined)
    └── ranks.ts                                 DONE ✓ (already defined)

Total new code: ~2100-2400 lines (including tests)
Reused from roman1969: ~400 lines (lent, easterTime, advent adapted)
```

---

## Copy-Paste Opportunities (High Reuse)

These methods can be copied almost verbatim from 1969:

1. **advent()** - Just need to verify Dec 17-23 precedence matches 1962 spec
2. **earlyChristmasTime()** - Identical
3. **lateChristmasTime()** - Identical
4. **paschalTriduum()** - Identical
5. **easterTime()** - Identical
6. **Advent/Christmas date methods in Dates class** - Identical

Estimated reuse: ~60% of code can be adapted with minimal changes.

---

## Known Risks & Considerations

### 1. After Epiphany Sundays (Variable)

In 1962, the number of Sundays after Epiphany varies (1-6) depending on Easter date.

- If Easter is early: fewer After Epiphany Sundays
- Omitted Sundays are transferred to after Pentecost
- This requires dynamic calculation in Dates class

**Solution:** Add method to calculate omitted Sundays and adjust Pentecost season accordingly.

### 2. Passiontide Special Rubrics

Passiontide has special rules (veiling, no Gloria Patri) that aren't just scheduling.

**Solution:**

- Create Passiontide season constant (already done)
- These rules are applied in the LiturgicalDay model based on season/period metadata
- No special logic needed in ProperOfTime

### 3. Ember Days & Rogation Days

These fall on specific days (Wed/Fri/Sat for Ember Days, Mon-Wed for Rogations).

**Solution:**

- Add to ProperOfTime as separate methods
- Calculate dynamically from Easter date
- Treat as weekday additions within seasons

### 4. Octaves (Easter, Christmas, Epiphany, Pentecost, Corpus Christi)

1962 has more octaves than 1969.

**Solution:**

- Period definitions already support octaves
- Just need to define additional Period constants
- LiturgicalDay model handles the logic

---

## Resources Created

This exploration created two detailed documents in the repository:

1. **EXPLORATION_1969_ARCHITECTURE.md** (12 KB)
   - Complete architecture overview
   - Data flow diagrams
   - Class hierarchy
   - Implementation strategy

2. **EXPLORATION_CODE_EXAMPLES.md** (15 KB)
   - Concrete code examples from 1969
   - Patterns to replicate
   - 1962 adaptations shown
   - New method templates

---

## Conclusion

The 1969 Proper of Time implementation is well-designed and highly reusable. Creating the 1962 equivalent is primarily a matter of:

1. **Extending the Dates class** with 1962-specific date methods (~300 lines)
2. **Creating ProperOfTime1962 class** by copying/adapting the 1969 version (~700 lines)
3. **Using already-defined constants** for 1962 seasons and precedences (already done)
4. **Creating Sanctorale definitions** for fixed feasts (~200-500 lines to start)

The architecture supports all 1962 calendar features without requiring core changes. The main challenge will be implementing the variable After Epiphany Sundays logic, but this follows standard patterns in the codebase.

**Estimated total effort:** 2000-2400 lines of code and tests, achievable in 2-3 implementation sprints.

---

## Next Steps

1. Review EXPLORATION_1969_ARCHITECTURE.md and EXPLORATION_CODE_EXAMPLES.md
2. Create /rites/roman1962/src/proper-of-time/proper-of-time.ts (start with skeleton)
3. Extend /rites/roman1962/src/utils/dates.ts with 1962-specific methods
4. Create /rites/roman1962/src/calendars/general-roman/index.ts (minimal Sanctorale)
5. Write comprehensive tests
6. Integrate with main calendar system
