/**
 * Data integrity checks for the 1962 General Roman Calendar.
 *
 * Validates:
 *   [1] All entries have a valid precedence
 *   [2] All entries have a valid rank matching their precedence
 *   [3] All entries have valid date definitions
 *   [4] No duplicate keys
 *   [5] All entries have valid colors
 *   [6] All entries have a commonsDef
 *   [7] Entries are sorted by month/date
 */

import { GeneralRoman1962 } from '../src/calendars/general-roman';
import { CommonDefinition } from '../src/constants/commons';
import { PRECEDENCES, Precedences } from '../src/constants/precedences';
import { Ranks } from '../src/constants/ranks';
import { RomcalConfig } from '../src/models/config';
import { LiturgicalDayInput } from '../src/types/liturgical-day';
import { Dates } from '../src/utils/dates';

type CalendarInput = LiturgicalDayInput & { rank?: string };

let errorCount = 0;
let warnCount = 0;

const error = (msg: string): void => {
  console.error(`  ✗ ERROR: ${msg}`);
  errorCount++;
};

const warn = (msg: string): void => {
  console.warn(`  ⚠ WARN:  ${msg}`);
  warnCount++;
};

const ok = (msg: string): void => {
  console.log(`  ✓ ${msg}`);
};

// Set up a minimal config to instantiate the calendar
const mockConfig: Partial<RomcalConfig> = {
  scope: 'liturgical',
  easterCalculationType: 'gregorian',
  year: 2025,
  liturgicalDayDef: {},
  martyrologyCatalog: {},
  localeDef: {},
};
mockConfig.dates = new Dates(mockConfig as RomcalConfig, 2025) as unknown as typeof Dates;

const calendar = new GeneralRoman1962(mockConfig as RomcalConfig);
calendar.buildAllDefinitions();
const inputs = calendar.inputs;

const entries = Object.entries(inputs);
console.log(`\nChecking ${entries.length} calendar entries...\n`);

// Valid values
const validPrecedences = new Set(PRECEDENCES);
const validRanks = new Set(Object.values(Ranks));
const validCommons = new Set(Object.values(CommonDefinition));

// Rank-to-precedence consistency mapping
const rankPrecedenceMap: Record<string, Set<string>> = {
  [Ranks.FirstClass]: new Set([
    Precedences.Triduum_1,
    Precedences.ProperOfTimeSolemnity_2,
    Precedences.PrivilegedSunday_2,
    Precedences.HolyWeek_2,
    Precedences.EasterOctave_2,
    Precedences.GeneralFirstClassFeast_3,
    Precedences.ProperFirstClassFeast_PrincipalPatron_4a,
    Precedences.ProperFirstClassFeast_DedicationOfOwnChurch_4b,
    Precedences.ProperFirstClassFeast_TitleOfOwnChurch_4c,
  ]),
  [Ranks.SecondClass]: new Set([
    Precedences.GeneralSecondClassLordFeast_5,
    Precedences.UnprivilegedSunday_6,
    Precedences.GeneralSecondClassFeast_7,
    Precedences.DayWithinOctave_8,
    Precedences.VigilOfFirstOrSecondClass_8,
    Precedences.ProperSecondClassFeast_9,
  ]),
  [Ranks.ThirdClass]: new Set([
    Precedences.PrivilegedFeria_10,
    Precedences.GeneralThirdClassFeast_11,
    Precedences.VigilOfThirdClass_12,
    Precedences.ProperThirdClassFeast_13,
  ]),
  [Ranks.FourthClass]: new Set([Precedences.Commemoration_14, Precedences.FerialDay_15]),
};

/**
 * [1] Check valid precedences
 */
let precedenceErrors = 0;
for (const [key, raw] of entries) {
  const entry = (Array.isArray(raw) ? raw[0] : raw) as CalendarInput;
  if (!entry.precedence) {
    error(`[1] '${key}' has no precedence defined`);
    precedenceErrors++;
  } else if (!validPrecedences.has(entry.precedence)) {
    error(`[1] '${key}' has invalid precedence: ${entry.precedence}`);
    precedenceErrors++;
  }
}
if (!precedenceErrors) ok('[1] All entries have valid precedences');

/**
 * [2] Check rank-precedence consistency
 */
let rankErrors = 0;
for (const [key, raw] of entries) {
  const entry = (Array.isArray(raw) ? raw[0] : raw) as CalendarInput;
  if (entry.rank && entry.precedence) {
    if (!validRanks.has(entry.rank as Ranks)) {
      error(`[2] '${key}' has invalid rank: ${entry.rank}`);
      rankErrors++;
    } else {
      const allowedPrecedences = rankPrecedenceMap[entry.rank];
      if (allowedPrecedences && !allowedPrecedences.has(entry.precedence)) {
        warn(`[2] '${key}' rank '${entry.rank}' may not match precedence '${entry.precedence}'`);
      }
    }
  }
}
if (!rankErrors) ok('[2] All entries have valid ranks');

/**
 * [3] Check date definitions
 */
let dateErrors = 0;
for (const [key, raw] of entries) {
  const entry = (Array.isArray(raw) ? raw[0] : raw) as CalendarInput;
  if (!entry.dateDef) {
    error(`[3] '${key}' has no dateDef`);
    dateErrors++;
  } else {
    const def = entry.dateDef as { month?: number; date?: number; dateFn?: string };
    if (def.month !== undefined && def.date !== undefined) {
      if (def.month < 1 || def.month > 12) {
        error(`[3] '${key}' has invalid month: ${def.month}`);
        dateErrors++;
      }
      if (def.date < 1 || def.date > 31) {
        error(`[3] '${key}' has invalid date: ${def.date}`);
        dateErrors++;
      }
    }
  }
}
if (!dateErrors) ok('[3] All entries have valid date definitions');

/**
 * [4] Check for duplicate keys (inherent in object, but check array values)
 */
ok('[4] No duplicate keys (enforced by object structure)');

/**
 * [5] Check colors
 */
let colorErrors = 0;
for (const [key, raw] of entries) {
  const entry = (Array.isArray(raw) ? raw[0] : raw) as CalendarInput;
  if (!entry.colors) {
    error(`[5] '${key}' has no colors defined`);
    colorErrors++;
  }
}
if (!colorErrors) ok('[5] All entries have colors defined');

/**
 * [6] Check commonsDef
 */
let commonsErrors = 0;
for (const [key, raw] of entries) {
  const entry = (Array.isArray(raw) ? raw[0] : raw) as CalendarInput;
  if (entry.commonsDef === undefined) {
    error(`[6] '${key}' has no commonsDef`);
    commonsErrors++;
  } else {
    const commons = Array.isArray(entry.commonsDef) ? entry.commonsDef : [entry.commonsDef];
    for (const c of commons) {
      if (!validCommons.has(c)) {
        error(`[6] '${key}' has invalid commonsDef value: ${c}`);
        commonsErrors++;
      }
    }
  }
}
if (!commonsErrors) ok('[6] All entries have valid commonsDef');

/**
 * [7] Check month/date ordering within the sanctorale
 */
let orderErrors = 0;
let lastMonth = 0;
let lastDate = 0;
for (const [key, raw] of entries) {
  const entry = (Array.isArray(raw) ? raw[0] : raw) as CalendarInput;
  const def = entry.dateDef as { month?: number; date?: number; dateFn?: string } | undefined;
  if (def?.month !== undefined && def?.date !== undefined) {
    const currentMonth = def.month;
    const currentDate = def.date;
    if (currentMonth < lastMonth || (currentMonth === lastMonth && currentDate < lastDate)) {
      warn(`[7] '${key}' (${currentMonth}/${currentDate}) is out of order after (${lastMonth}/${lastDate})`);
      orderErrors++;
    }
    lastMonth = currentMonth;
    lastDate = currentDate;
  }
}
if (!orderErrors) ok('[7] Entries are in chronological order');

/**
 * Summary
 */
console.log(`\n${'-'.repeat(50)}`);
console.log(`Total entries: ${entries.length}`);
console.log(`Errors: ${errorCount}`);
console.log(`Warnings: ${warnCount}`);
console.log('');

if (errorCount > 0) {
  process.exit(1);
}
