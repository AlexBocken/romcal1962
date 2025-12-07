# Code Examples: 1969 Proper of Time Implementation

This document provides concrete code examples from the 1969 implementation that should serve as templates for the 1962 equivalent.

---

## 1. ProperOfTime Class Structure

### 1969 Implementation

**File:** `/rites/roman1969/src/proper-of-time/proper-of-time.ts`

```typescript
export class ProperOfTime extends CalendarDef {
  readonly #config: RomcalConfig;
  readonly #weekdays = WEEKDAYS;
  readonly #months = MONTHS;
  readonly #calendarName: string = PROPER_OF_TIME_NAME;

  public get calendarName(): string {
    return this.#calendarName;
  }

  constructor(config: RomcalConfig, inputs?: BundleInputs) {
    super(config, inputs);
    this.#config = config;
  }

  buildAllDefinitions = (): void => {
    if (Object.keys(Object.keys(this.#config.liturgicalDayDef)).length > 0) return;

    if (this.#config.scope === 'gregorian') {
      this.lateChristmasTime();
      this.lent();
      this.paschalTriduum();
      this.easterTime();
      this.ordinaryTime();
      this.advent(+1);
      this.earlyChristmasTime(+1);
    } else {
      this.advent();
      this.christmasTime();
      this.lent();
      this.paschalTriduum();
      this.easterTime();
      this.ordinaryTime();
    }
  };

  #newLiturgicalDayDef(id: Id, input: LiturgicalDayProperOfTimeInput): LiturgicalDayDef {
    return new LiturgicalDayDef(
      id,
      { properCycle: ProperCycles.ProperOfTime, ...input },
      PROPER_OF_TIME_NAME,
      this.#config
    );
  }
}
```

### 1962 Adaptation

```typescript
export class ProperOfTime extends CalendarDef {
  readonly #config: RomcalConfig;
  readonly #weekdays = WEEKDAYS;
  readonly #months = MONTHS;
  readonly #calendarName: string = PROPER_OF_TIME_NAME_1962;

  public get calendarName(): string {
    return this.#calendarName;
  }

  constructor(config: RomcalConfig, inputs?: BundleInputs) {
    super(config, inputs);
    this.#config = config;
  }

  buildAllDefinitions = (): void => {
    if (Object.keys(Object.keys(this.#config.liturgicalDayDef)).length > 0) return;

    if (this.#config.scope === 'gregorian') {
      // Handle year transitions - similar to 1969
      this.lateChristmasTime();
      this.afterEpiphany(); // NEW
      this.septuagesimaTime(); // NEW
      this.lent();
      this.passiontide(); // NEW
      this.paschalTriduum();
      this.easterTime();
      this.rogationDays(); // NEW
      this.pentecostSeason(); // REPLACES ordinaryTime
      this.advent(+1);
      this.earlyChristmasTime(+1);
    } else {
      this.advent();
      this.christmasTime();
      this.afterEpiphany(); // NEW
      this.septuagesimaTime(); // NEW
      this.lent();
      this.passiontide(); // NEW
      this.paschalTriduum();
      this.easterTime();
      this.rogationDays(); // NEW
      this.pentecostSeason(); // REPLACES ordinaryTime
    }
  };

  #newLiturgicalDayDef(id: Id, input: LiturgicalDayProperOfTimeInput): LiturgicalDayDef {
    return new LiturgicalDayDef(
      id,
      { properCycle: ProperCycles.ProperOfTime, ...input },
      PROPER_OF_TIME_NAME_1962,
      this.#config
    );
  }
}
```

---

## 2. Advent Implementation (Template Pattern)

### 1969 Implementation

**Lines 74-130:**

```typescript
advent(yearOffset = 0): void {
  // All days, from the 1st Sunday of Advent to the Friday of the 3rd week of Advent.
  for (let i = 0; i < 20; i += 1) {
    const week = Math.floor(i / 7) + 1;
    const dow = i - (week - 1) * 7;

    this.#newLiturgicalDayDef(`advent_${week}_${this.#weekdays[dow]}`, {
      precedence: dow === 0 ? Precedences.PrivilegedSunday_2 : Precedences.Weekday_13,
      dateDef:
        dow === 0
          ? { dateFn: 'sundayOfAdvent', dateArgs: [week], yearOffset: -1 + yearOffset }
          : {
              dateFn: 'unprivilegedWeekdayOfAdvent',
              dateArgs: [dow, week],
              yearOffset: -1 + yearOffset,
            },
      isHolyDayOfObligation: dow === 0,
      seasons: [Season.Advent],
      periods: [],
      calendarMetadata: { weekOfSeason: week, dayOfSeason: i + 1, dayOfWeek: dow },
      colors: [
        ...(week === 3 && dow === 0 ? [Colors.Rose] : []), // Gaudete
        Colors.Purple,
      ],
      i18nDef: dow === 0 ? ['seasons:advent.sunday', { week }] : ['seasons:advent.weekday', { week, dow }],
    });
  }

  // Fourth Sunday of Advent.
  this.#newLiturgicalDayDef(`advent_4_${this.#weekdays[0]}`, {
    precedence: Precedences.PrivilegedSunday_2,
    dateDef: { dateFn: 'sundayOfAdvent', dateArgs: [4], yearOffset: -1 + yearOffset },
    isHolyDayOfObligation: true,
    seasons: [Season.Advent],
    periods: [],
    calendarMetadata: { weekOfSeason: 4, dayOfSeason: 22, dayOfWeek: 0 },
    colors: [Colors.Purple],
    i18nDef: ['seasons:advent.sunday', { week: 4 }],
  });

  // Week before Christmas, from the 17 to 24 December.
  for (let day = 17; day < 25; day += 1) {
    this.#newLiturgicalDayDef(`advent_${this.#months[11]}_${day}`, {
      precedence: Precedences.PrivilegedWeekday_9,
      dateDef: {
        dateFn: 'privilegedWeekdayOfAdvent',
        dateArgs: [day],
        yearOffset: -1 + yearOffset,
      },
      seasons: [Season.Advent],
      periods: [],
      calendarMetadata: {},
      colors: [Colors.Purple],
      i18nDef: ['seasons:advent.privileged_weekday', { day }],
    });
  }
}
```

### Key Pattern: Loop through Sundays and Weekdays

```typescript
// Loop 0-19 gives:
// i=0: week=1, dow=0 (Sunday of week 1)
// i=1: week=1, dow=1 (Monday of week 1)
// ...
// i=7: week=2, dow=0 (Sunday of week 2)

for (let i = 0; i < 20; i += 1) {
  const week = Math.floor(i / 7) + 1;
  const dow = i - (week - 1) * 7;

  // dow: 0=Sunday, 1-6=Mon-Sat
}
```

**This pattern applies to:** Advent, Lent, Easter Time, Pentecost Season (1962), After Epiphany (1962), Septuagesima (1962)

---

## 3. Lent Implementation (Easter-Dependent)

### 1969 Implementation

**Lines 281-349:**

```typescript
lent(yearOffset = 0): void {
  // Ash Wednesday.
  this.#newLiturgicalDayDef('ash_wednesday', {
    precedence: Precedences.AshWednesday_2,
    dateDef: { dateFn: 'ashWednesday', yearOffset },
    seasons: [Season.Lent],
    periods: [Period.PresentationOfTheLordToHolyThursday],
    calendarMetadata: { weekOfSeason: 0, dayOfSeason: 1, dayOfWeek: 3 },
    colors: [Colors.Purple],
    i18nDef: ['names:ash_wednesday'],
  });

  // Days after Ash Wednesday.
  for (let dow = 4; dow < 7; dow += 1) {
    this.#newLiturgicalDayDef(`${this.#weekdays[dow]}_after_ash_wednesday`, {
      precedence: Precedences.PrivilegedWeekday_9,
      dateDef: { dateFn: 'ashWednesday', addDay: dow - 3, yearOffset },
      seasons: [Season.Lent],
      periods: [Period.PresentationOfTheLordToHolyThursday],
      calendarMetadata: { weekOfSeason: 0, dayOfSeason: dow - 2, dayOfWeek: dow },
      colors: [Colors.Purple],
      i18nDef: ['seasons:lent.day_after_ash_wed', { dow }],
    });
  }

  // All days, from the 1st Sunday of Lent to the Saturday of the 5th week of Lent.
  for (let i = 0; i < 35; i += 1) {
    const week = Math.floor(i / 7) + 1;
    const dow = i - (week - 1) * 7;
    this.#newLiturgicalDayDef(`lent_${week}_${this.#weekdays[dow]}`, {
      precedence: dow === 0 ? Precedences.PrivilegedSunday_2 : Precedences.PrivilegedWeekday_9,
      dateDef: { dateFn: 'ashWednesday', addDay: i + 4, yearOffset },
      isHolyDayOfObligation: dow === 0,
      seasons: [Season.Lent],
      periods: [Period.PresentationOfTheLordToHolyThursday],
      calendarMetadata: { weekOfSeason: week, dayOfSeason: i + 5, dayOfWeek: dow },
      colors: [
        ...(week === 4 && dow === 0 ? [Colors.Rose] : []), // Laetare
        Colors.Purple,
      ],
      i18nDef: dow === 0 ? ['seasons:lent.sunday', { week }] : ['seasons:lent.weekday', { week, dow }],
    });
  }

  // Palm Sunday of the Passion of the Lord.
  this.#newLiturgicalDayDef('palm_sunday_of_the_passion_of_the_lord', {
    precedence: Precedences.PrivilegedSunday_2,
    dateDef: { dateFn: 'palmSunday', yearOffset },
    isHolyDayOfObligation: true,
    seasons: [Season.Lent],
    periods: [Period.HolyWeek, Period.PresentationOfTheLordToHolyThursday],
    calendarMetadata: { weekOfSeason: 6, dayOfSeason: 40, dayOfWeek: 0 },
    colors: [Colors.Red],
    i18nDef: ['names:palm_sunday_of_the_passion_of_the_lord'],
  });

  // Holy Week, Monday to Thursday.
  for (let dow = 1; dow < 5; dow += 1) {
    this.#newLiturgicalDayDef(`holy_${this.#weekdays[dow]}`, {
      precedence: Precedences.PrivilegedWeekday_9,
      dateFn: { dateFn: 'palmSunday', addDay: dow, yearOffset },
      seasons: [Season.Lent],
      periods: [Period.HolyWeek, Period.PresentationOfTheLordToHolyThursday],
      calendarMetadata: { weekOfSeason: 6, dayOfSeason: 40 + dow, dayOfWeek: dow },
      colors: [Colors.Purple],
      i18nDef: ['seasons:lent.holy_week_day', { dow }],
    });
  }
}
```

### 1962 Adaptation

For 1962, keep Lent largely the same but:

1. Split out Passiontide (weeks 5-6) into separate method
2. Use 1962 Precedences (e.g., `PrivilegedFeria_10` for weekdays)
3. Add special handling for Palm Sunday in 1962 (called "Passion Sunday")

```typescript
lent1962(yearOffset = 0): void {
  // Ash Wednesday - same as 1969
  // But use 1962 Precedences

  // Lent weeks 1-4 - same structure as 1969
  for (let i = 0; i < 28; i += 1) {  // Only 4 weeks (weeks 1-4)
    const week = Math.floor(i / 7) + 1;
    const dow = i - (week - 1) * 7;
    this.#newLiturgicalDayDef(`lent_${week}_${this.#weekdays[dow]}`, {
      precedence: dow === 0 ? Precedences.PrivilegedSunday_2 : Precedences.PrivilegedFeria_10,
      dateDef: { dateFn: 'ashWednesday', addDay: i + 4, yearOffset },
      isHolyDayOfObligation: dow === 0,
      seasons: [Season.Lent],  // NOT Passiontide for weeks 1-4
      // ... rest of config
    });
  }
}

passiontide1962(yearOffset = 0): void {
  // Passion Sunday (5th Sunday of Lent) - 2 weeks before Easter
  // Monday-Saturday of Passion Week
  // Palm Sunday (6th Sunday) - 1 week before Easter
  // Holy Week
}
```

---

## 4. Easter Time Implementation

### 1969 Implementation

**Lines 406-477:**

```typescript
easterTime(yearOffset = 0): void {
  // Octave of Easter.
  for (let dow = 1; dow < 7; dow += 1) {
    this.#newLiturgicalDayDef(`easter_${this.#weekdays[dow]}`, {
      precedence: Precedences.WeekdayOfEasterOctave_2,
      dateDef: { dateFn: 'easterSunday', addDay: dow, yearOffset },
      seasons: [Season.EasterTime],
      periods: [Period.EasterOctave],
      calendarMetadata: { weekOfSeason: 1, dayOfSeason: dow + 1, dayOfWeek: dow },
      colors: [Colors.White],
      i18nDef: ['seasons:easter_time.octave', { dow }],
    });
  }

  // Second Sunday of Easter, or of Divine Mercy.
  this.#newLiturgicalDayDef('divine_mercy_sunday', {
    precedence: Precedences.PrivilegedSunday_2,
    dateDef: { dateFn: 'divineMercySunday', yearOffset },
    isHolyDayOfObligation: true,
    seasons: [Season.EasterTime],
    periods: [Period.EasterOctave],
    calendarMetadata: { weekOfSeason: 2, dayOfSeason: 8, dayOfWeek: 0 },
    colors: [Colors.White],
    i18nDef: ['names:divine_mercy_sunday'],
  });

  // All days, from the 2nd Monday to the 7th Saturday of Easter Time.
  for (let i = 8; i < 49; i += 1) {
    const week = Math.floor(i / 7) + 1;
    const dow = i - (week - 1) * 7;

    const data: LiturgicalDayProperOfTimeInput = {
      precedence: dow === 0 ? Precedences.PrivilegedSunday_2 : Precedences.Weekday_13,
      dateDef: {
        dateFn: 'weekdayOrSundayOfEasterTime',
        dateArgs: [dow, week],
        yearOffset,
      },
      isHolyDayOfObligation: dow === 0,
      seasons: [Season.EasterTime],
      periods: [],
      calendarMetadata: { weekOfSeason: week, dayOfSeason: i + 1, dayOfWeek: dow },
      colors: [Colors.White],
      i18nDef: dow === 0 ? ['seasons:easter_time.sunday', { week }] : ['seasons:easter_time.weekday', { week, dow }],
    };

    // The Ascension of the Lord
    if (week === 6 && dow === 4) {
      this.#newLiturgicalDayDef('ascension_of_the_lord', {
        ...data,
        precedence: Precedences.ProperOfTimeSolemnity_2,
        dateDef: { dateFn: 'ascension', yearOffset },
        isHolyDayOfObligation: true,
        calendarMetadata: {},
        i18nDef: ['names:ascension_of_the_lord'],
      });
    }

    // All other Sundays and weekdays.
    this.#newLiturgicalDayDef(`easter_time_${week}_${this.#weekdays[dow]}`, data);
  }

  // Pentecost Sunday.
  this.#newLiturgicalDayDef('pentecost_sunday', {
    precedence: Precedences.ProperOfTimeSolemnity_2,
    dateDef: { dateFn: 'pentecostSunday', yearOffset },
    isHolyDayOfObligation: true,
    seasons: [Season.EasterTime],
    periods: [],
    calendarMetadata: { weekOfSeason: 8, dayOfSeason: 50, dayOfWeek: 0 },
    colors: [Colors.Red],
    i18nDef: ['names:pentecost_sunday'],
  });
}
```

**Note:** 1962 Easter Time is identical to 1969 (both have 7 weeks from Easter to Pentecost)

---

## 5. Dates Class: Memoization Pattern

### 1969 Implementation

**Lines 253-268:**

```typescript
christmas = (year = this.#isLiturgicalYear ? this.#year - 1 : this.#year): Date => {
  if (this.#christmas[year]) return this.#christmas[year];
  return (this.#christmas[year] = Dates.christmas(year));
};

#christmas: Record<string, Date> = {};

static christmas = (year: number): Date => {
  return getUtcDate(year, 12, 25);
};
```

### Easter-Based Calculation Pattern

**Lines 641-651:**

```typescript
easterSunday = (
  year: number = this.#year,
  easterCalculationType: EasterCalculationType = this.#config.easterCalculationType
): Date => {
  if (this.#easter[year]) return this.#easter[year];
  const { month, day } =
    easterCalculationType === 'gregorian'
      ? calculateGregorianEasterDate(year)
      : calculateJulianEasterDateToGregorianDate(year);
  return (this.#easter[year] = getUtcDate(year, month, day));
};

#easter: Record<string, Date> = {};
```

### Offset-Based Calculation Pattern

**Lines 491-496:**

```typescript
ashWednesday = (year = this.#year): Date => {
  if (this.#ashWednesday[year]) return this.#ashWednesday[year];
  return (this.#ashWednesday[year] = subtractsDays(this.easterSunday(year), 46));
};

#ashWednesday: Record<string, Date> = {};
```

---

## 6. Ordinaryime Implementation (1969 Model for After Pentecost 1962)

### 1969 Implementation

**Lines 483-559:**

```typescript
ordinaryTime(yearOffset = 0): void {
  // The Most Holy Trinity.
  this.#newLiturgicalDayDef('most_holy_trinity', {
    precedence: Precedences.GeneralSolemnity_3,
    dateDef: { dateFn: 'trinitySunday', yearOffset },
    isHolyDayOfObligation: true,
    seasons: [Season.OrdinaryTime],
    periods: [],
    calendarMetadata: { dayOfWeek: 0 },
    colors: [Colors.White],
    i18nDef: ['names:most_holy_trinity'],
  });

  // Ordinary Time.
  for (let i = 1; i < 238; i += 1) {
    const week = Math.floor(i / 7) + 1;
    const dow = i - (week - 1) * 7;

    const data: LiturgicalDayProperOfTimeInput = {
      precedence: dow === 0 ? Precedences.UnprivilegedSunday_6 : Precedences.Weekday_13,
      dateDef: { dateFn: 'dateOfOrdinaryTime', dateArgs: [dow, week], yearOffset },
      isHolyDayOfObligation: dow === 0,
      seasons: [Season.OrdinaryTime],
      periods: [],
      calendarMetadata: { weekOfSeason: week, dayOfWeek: dow },
      colors: [Colors.Green],
      i18nDef:
        dow === 0 ? ['seasons:ordinary_time.sunday', { week }] : ['seasons:ordinary_time.weekday', { week, dow }],
    };

    // Special handling for Christ the King (week 34)
    if (week === 34 && dow === 0) {
      this.#newLiturgicalDayDef('our_lord_jesus_christ_king_of_the_universe', {
        ...data,
        precedence: Precedences.GeneralSolemnity_3,
        colors: [Colors.White],
        i18nDef: ['names:our_lord_jesus_christ_king_of_the_universe'],
      });
    } else {
      this.#newLiturgicalDayDef(`ordinary_time_${week}_${this.#weekdays[dow]}`, data);
    }
  }
}
```

### 1962 Adaptation (PentecostSeason)

```typescript
pentecostSeason(yearOffset = 0): void {
  // Pentecost Sunday and Octave - special handling
  // Then up to 28 Sundays after Pentecost (not 34 like 1969)

  for (let i = 1; i < 200; i += 1) {  // Reduced from 238
    const week = Math.floor(i / 7) + 1;
    const dow = i - (week - 1) * 7;

    const data: LiturgicalDayProperOfTimeInput = {
      precedence: dow === 0 ? Precedences.UnprivilegedSunday_6 : Precedences.FerialDay_15,
      dateDef: { dateFn: 'dateOfPentecostSeason', dateArgs: [dow, week], yearOffset },
      isHolyDayOfObligation: dow === 0,
      seasons: [Season.PentecostSeason],  // Changed
      periods: [],
      calendarMetadata: { weekOfSeason: week, dayOfWeek: dow },
      colors: [Colors.Green],
      i18nDef:
        dow === 0 ? ['seasons:pentecost_season.sunday', { week }] : ['seasons:pentecost_season.weekday', { week, dow }],
    };

    this.#newLiturgicalDayDef(`pentecost_season_${week}_${this.#weekdays[dow]}`, data);
  }
}
```

---

## 7. NEW for 1962: Septuagesima Implementation

### Pattern (Based on Advent/Lent)

```typescript
septuagesimaTime(yearOffset = 0): void {
  // Septuagesima is 70 days before Easter (9 weeks)
  // Sexagesima is 60 days before Easter (8 weeks)
  // Quinquagesima is 50 days before Easter (7 weeks, Sunday before Ash Wed)

  for (let i = 0; i < 21; i += 1) {  // 3 weeks = 21 days
    const week = Math.floor(i / 7) + 1;
    const dow = i - (week - 1) * 7;

    this.#newLiturgicalDayDef(`septuagesima_${week}_${this.#weekdays[dow]}`, {
      precedence: dow === 0 ? Precedences.PrivilegedSunday_2 : Precedences.PrivilegedFeria_10,
      dateDef: {
        dateFn: 'septuagesimaWeekday',  // NEW method needed in Dates class
        dateArgs: [dow, week],
        yearOffset,
      },
      isHolyDayOfObligation: dow === 0,
      seasons: [Season.SeptuagesimaTime],
      periods: [],
      calendarMetadata: { weekOfSeason: week, dayOfSeason: i + 1, dayOfWeek: dow },
      colors: [Colors.Purple],
      i18nDef: dow === 0
        ? ['seasons:septuagesima.sunday', { week }]
        : ['seasons:septuagesima.weekday', { week, dow }],
    });
  }
}
```

### Required Dates Methods

```typescript
// In Dates class
septuagesimaS unday = (year = this.#year): Date => {
  // 9 weeks before Easter = 63 days before Easter
  if (this.#septuagesimaS unday[year]) return this.#septuagesimaS unday[year];
  return (this.#septuagesimaS unday[year] = subtractsDays(this.easterSunday(year), 63));
};

sexagesimaSunday = (year = this.#year): Date => {
  // 8 weeks before Easter = 56 days before Easter
  if (this.#sexagesimaSunday[year]) return this.#sexagesimaSunday[year];
  return (this.#sexagesimaSunday[year] = subtractsDays(this.easterSunday(year), 56));
};

quinquagesimaSunday = (year = this.#year): Date => {
  // 7 weeks before Easter = 49 days before Easter = Sunday before Ash Wed
  if (this.#quinquagesimaSunday[year]) return this.#quinquagesimaSunday[year];
  return (this.#quinquagesimaSunday[year] = subtractsDays(this.easterSunday(year), 49));
};

septuagesimaWeekday = (dow: number, week: number, year = this.#year): Date | null => {
  const id = `${year}_${week}_${dow}`;
  if (this.#septuagesimaWeekday[id] !== undefined) return this.#septuagesimaWeekday[id];

  if (dow < 0 || dow > 6 || week < 1 || week > 3) {
    return (this.#septuagesimaWeekday[id] = null);
  }

  const firstSunday = this.septuagesimaS unday(year);
  const date = addDays(firstSunday, (week - 1) * 7 + dow);
  return (this.#septuagesimaWeekday[id] = date);
};
```

---

## Summary: Files to Create

### 1. `/rites/roman1962/src/proper-of-time/proper-of-time.ts`

- ~600-800 lines
- 8-9 seasonal methods
- Follow 1969 patterns

### 2. `/rites/roman1962/src/utils/dates.ts` (extend from roman1969)

- Add ~30-40 methods for 1962-specific dates
- Septuagesima/Sexagesima/Quinquagesima
- After Epiphany Sundays
- Passiontide dates
- Rogation Days
- After Pentecost Sundays

### 3. Constants (already exist)

- `/rites/roman1962/src/constants/seasons.ts` ✓
- `/rites/roman1962/src/constants/precedences.ts` ✓
- `/rites/roman1962/src/constants/ranks.ts` ✓

---

## Key Differences Summary

| Aspect                  | 1969                     | 1962                             | Implementation Note                                               |
| ----------------------- | ------------------------ | -------------------------------- | ----------------------------------------------------------------- |
| Seasons                 | 6                        | 9                                | Add AfterEpiphany, SeptuagesimaTime, Passiontide, PentecostSeason |
| Sundays after Pentecost | 34 weeks (Ordinary Time) | 28 weeks (Pentecost Season)      | Use shorter loop in pentecostSeason()                             |
| Octaves                 | 2 major                  | 4-5 major                        | Add to periods definitions                                        |
| Passiontide             | Not present              | Weeks 5-6 of Lent                | Extract into separate method                                      |
| Advent precedence       | Weekday_13               | PrivilegedFeria_10 for Dec 17-23 | Update precedences in advent()                                    |
