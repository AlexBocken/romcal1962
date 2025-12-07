import { Colors } from '../constants/colors';
import { ProperCycles } from '../constants/cycles';
import { PROPER_OF_TIME_NAME } from '../constants/general-calendar-names';
import { MONTHS } from '../constants/months';
import { Period } from '../constants/periods';
import { Precedences } from '../constants/precedences';
import { Season } from '../constants/seasons';
import { WEEKDAYS } from '../constants/weekdays';
import { CalendarDef } from '../models/calendar-def';
import { RomcalConfig } from '../models/config';
import { LiturgicalDayDef } from '../models/liturgical-day-def';
import { BundleInputs } from '../types/calendar-def';
import { Id } from '../types/common';
import { LiturgicalDayProperOfTimeInput } from '../types/liturgical-day';

/**
 * Generates the Proper of Time (temporal cycle) for the 1962 Tridentine calendar.
 *
 * The temporal cycle includes all moveable feasts and seasons that depend on
 * the date of Easter:
 * - Advent (4 Sundays)
 * - Christmas Time (Dec 25 - Epiphany Octave)
 * - After Epiphany (1-6 variable Sundays)
 * - Septuagesima Time (3 Sundays before Lent)
 * - Lent (Ash Wednesday - Saturday before Passion Sunday)
 * - Passiontide (Passion Sunday - Holy Saturday)
 * - Paschal Triduum (Holy Thursday - Easter Sunday)
 * - Easter Time (Easter Sunday - Pentecost)
 * - Pentecost Season (After Pentecost - Advent)
 */
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

  /**
   * Build all liturgical day definitions for the temporal cycle.
   *
   * The order depends on the scope:
   * - 'liturgical': Starts with Advent, follows liturgical year order
   * - 'gregorian': Handles year transitions (Christmas spans Dec-Jan)
   */
  buildAllDefinitions = (): void => {
    if (Object.keys(Object.keys(this.#config.liturgicalDayDef)).length > 0) return;

    if (this.#config.scope === 'gregorian') {
      // Gregorian year: handle year transitions
      this.lateChristmasTime();
      this.afterEpiphany();
      this.septuagesimaTime();
      this.lent();
      this.passiontide();
      this.paschalTriduum();
      this.easterTime();
      this.pentecostSeason();
      this.advent(+1);
      this.earlyChristmasTime(+1);
    } else {
      // Liturgical year: follows natural liturgical order
      this.advent();
      this.christmasTime();
      this.afterEpiphany();
      this.septuagesimaTime();
      this.lent();
      this.passiontide();
      this.paschalTriduum();
      this.easterTime();
      this.pentecostSeason();
    }
  };

  /**
   * Helper to create a new LiturgicalDayDef for the Proper of Time.
   */
  #newLiturgicalDayDef(id: Id, input: LiturgicalDayProperOfTimeInput): LiturgicalDayDef {
    return new LiturgicalDayDef(
      id,
      { properCycle: ProperCycles.ProperOfTime, ...input },
      PROPER_OF_TIME_NAME,
      this.#config
    );
  }

  /**
   * ============================================================================
   * ADVENT
   * ============================================================================
   */

  advent(yearOffset = 0): void {
    // All days from the 1st Sunday of Advent to the Friday of the 3rd week of Advent.
    for (let i = 0; i < 20; i += 1) {
      const week = Math.floor(i / 7) + 1;
      const dow = i - (week - 1) * 7;

      this.#newLiturgicalDayDef(`advent_${week}_${this.#weekdays[dow]}`, {
        precedence: dow === 0 ? Precedences.PrivilegedSunday_2 : Precedences.FerialDay_15,
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
          ...(week === 3 && dow === 0 ? [Colors.Rose] : []), // Gaudete Sunday
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

    // Privileged weekdays from December 17-24 (Feria Major).
    // In 1962, these are Privileged Ferial days with higher precedence.
    for (let day = 17; day < 25; day += 1) {
      this.#newLiturgicalDayDef(`advent_${this.#months[11]}_${day}`, {
        precedence: Precedences.PrivilegedFeria_10,
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

    // Add Ember Days of Advent (Wednesday, Friday, Saturday of 3rd week)
    const emberDays = [3, 5, 6]; // Wed, Fri, Sat
    emberDays.forEach((dow) => {
      this.#newLiturgicalDayDef(`advent_3_${this.#weekdays[dow]}_ember`, {
        precedence: Precedences.PrivilegedFeria_10,
        dateDef: {
          dateFn: 'unprivilegedWeekdayOfAdvent',
          dateArgs: [dow, 3],
          yearOffset: -1 + yearOffset,
        },
        seasons: [Season.Advent],
        periods: [Period.EmberDays],
        calendarMetadata: { weekOfSeason: 3, dayOfWeek: dow },
        colors: [Colors.Purple],
        i18nDef: ['seasons:advent.ember_day', { dow }],
      });
    });
  }

  /**
   * ============================================================================
   * CHRISTMAS TIME
   * ============================================================================
   */

  christmasTime(yearOffset = 0): void {
    this.earlyChristmasTime(yearOffset);
    this.lateChristmasTime(yearOffset);
  }

  /**
   * Early Christmas Time: December 25-31 (first part in the first Gregorian year).
   */
  earlyChristmasTime(yearOffset = 0): void {
    // The Nativity of the Lord (Christmas Day).
    this.#newLiturgicalDayDef('nativity_of_the_lord', {
      precedence: Precedences.ProperOfTimeSolemnity_2,
      dateDef: { dateFn: 'christmas', yearOffset: -1 + yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.ChristmasTime],
      periods: [Period.ChristmasOctave],
      calendarMetadata: { weekOfSeason: 1, dayOfSeason: 1 },
      colors: [Colors.White],
      i18nDef: ['names:nativity_of_the_lord'],
    });

    // Days within the Octave of Christmas (Dec 26-31, excluding Dec 25 and Jan 1).
    for (let count = 2; count < 8; count += 1) {
      this.#newLiturgicalDayDef(`christmas_octave_day_${count}`, {
        precedence: Precedences.PrivilegedFeria_10,
        dateDef: {
          dateFn: 'weekdayWithinOctaveOfChristmas',
          dateArgs: [count],
          yearOffset: -1 + yearOffset,
        },
        seasons: [Season.ChristmasTime],
        periods: [Period.ChristmasOctave],
        calendarMetadata: { dayOfSeason: count },
        colors: [Colors.White],
        i18nDef: ['seasons:christmas_time.octave', { count }],
      });
    }

    // The Sunday within the Octave of Christmas (Holy Family).
    // In 1962, this is a II Class feast.
    this.#newLiturgicalDayDef('holy_family_of_jesus_mary_and_joseph', {
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { dateFn: 'holyFamily', yearOffset: -1 + yearOffset },
      seasons: [Season.ChristmasTime],
      periods: [Period.ChristmasOctave],
      calendarMetadata: {},
      colors: [Colors.White],
      i18nDef: ['names:holy_family_of_jesus_mary_and_joseph'],
    });
  }

  /**
   * Late Christmas Time: January 1 through Octave Day of Epiphany (Jan 13).
   */
  lateChristmasTime(yearOffset = 0): void {
    // Octave Day of Christmas: Circumcision of the Lord (January 1).
    // In 1962, this is a I Class feast.
    this.#newLiturgicalDayDef('octave_day_of_christmas', {
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { dateFn: 'maryMotherOfGod', yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.ChristmasTime],
      periods: [Period.ChristmasOctave],
      calendarMetadata: { dayOfSeason: 8 },
      colors: [Colors.White],
      i18nDef: ['names:octave_day_of_christmas'],
    });

    // Weekdays of Christmas Time, January 2-5 (before Epiphany).
    for (let day = 2; day < 6; day += 1) {
      this.#newLiturgicalDayDef(`christmas_time_${this.#months[0]}_${day}`, {
        precedence: Precedences.FerialDay_15,
        dateDef: { dateFn: 'weekdayBeforeEpiphany', dateArgs: [day], yearOffset },
        seasons: [Season.ChristmasTime],
        periods: [Period.DaysBeforeEpiphany],
        calendarMetadata: { dayOfSeason: 7 + day },
        colors: [Colors.White],
        i18nDef: ['seasons:christmas_time.before_epiphany', { day }],
      });
    }

    // The Epiphany of the Lord (always January 6 in 1962).
    this.#newLiturgicalDayDef('epiphany_of_the_lord', {
      precedence: Precedences.ProperOfTimeSolemnity_2,
      dateDef: { dateFn: 'epiphany', yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.ChristmasTime],
      periods: [Period.EpiphanyOctave],
      calendarMetadata: {},
      colors: [Colors.White],
      i18nDef: ['names:epiphany_of_the_lord'],
    });

    // Days within the Octave of Epiphany (Jan 7-12).
    for (let day = 7; day < 13; day += 1) {
      this.#newLiturgicalDayDef(`epiphany_octave_day_${day}`, {
        precedence: Precedences.DayWithinOctave_8,
        dateDef: { dateFn: 'weekdayAfterEpiphany', dateArgs: [day - 6], yearOffset },
        seasons: [Season.ChristmasTime],
        periods: [Period.EpiphanyOctave],
        calendarMetadata: {},
        colors: [Colors.White],
        i18nDef: ['seasons:christmas_time.epiphany_octave', { day }],
      });
    }

    // Octave Day of Epiphany (January 13) - I Class.
    this.#newLiturgicalDayDef('octave_day_of_epiphany', {
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { dateFn: 'octaveDayOfEpiphany', yearOffset },
      seasons: [Season.ChristmasTime],
      periods: [Period.EpiphanyOctave],
      calendarMetadata: {},
      colors: [Colors.White],
      i18nDef: ['names:octave_day_of_epiphany'],
    });
  }

  /**
   * ============================================================================
   * AFTER EPIPHANY
   * ============================================================================
   */

  afterEpiphany(yearOffset = 0): void {
    // Get the number of Sundays after Epiphany for this year (1-6, variable).
    // This depends on when Easter falls.
    const maxSundays = 6; // Maximum possible Sundays after Epiphany

    // Generate all possible Sundays after Epiphany (1-6).
    // The Dates class will return null for Sundays that don't occur.
    for (let week = 1; week <= maxSundays; week += 1) {
      this.#newLiturgicalDayDef(`after_epiphany_${week}_${this.#weekdays[0]}`, {
        precedence: Precedences.UnprivilegedSunday_6,
        dateDef: { dateFn: 'sundayAfterEpiphany', dateArgs: [week], yearOffset },
        isHolyDayOfObligation: true,
        seasons: [Season.AfterEpiphany],
        periods: [],
        calendarMetadata: { weekOfSeason: week, dayOfWeek: 0 },
        colors: [Colors.Green],
        i18nDef: ['seasons:after_epiphany.sunday', { week }],
      });

      // Weekdays after each Sunday (Monday-Saturday).
      for (let dow = 1; dow < 7; dow += 1) {
        this.#newLiturgicalDayDef(`after_epiphany_${week}_${this.#weekdays[dow]}`, {
          precedence: Precedences.FerialDay_15,
          dateDef: {
            dateFn: 'weekdayAfterSundayAfterEpiphany',
            dateArgs: [week, dow],
            yearOffset,
          },
          seasons: [Season.AfterEpiphany],
          periods: [],
          calendarMetadata: { weekOfSeason: week, dayOfWeek: dow },
          colors: [Colors.Green],
          i18nDef: ['seasons:after_epiphany.weekday', { week, dow }],
        });
      }
    }
  }

  /**
   * ============================================================================
   * SEPTUAGESIMA TIME
   * ============================================================================
   */

  septuagesimaTime(yearOffset = 0): void {
    const sundayNames = ['septuagesima', 'sexagesima', 'quinquagesima'];
    const dateFunctions = ['septuagesimaSunday', 'sexagesimaSunday', 'quinquagesimaSunday'];

    // Three Sundays of Septuagesima Time (9, 8, 7 weeks before Easter).
    for (let week = 1; week <= 3; week += 1) {
      // Sunday
      this.#newLiturgicalDayDef(`${sundayNames[week - 1]}_${this.#weekdays[0]}`, {
        precedence: Precedences.UnprivilegedSunday_6,
        dateDef: { dateFn: dateFunctions[week - 1], yearOffset },
        isHolyDayOfObligation: true,
        seasons: [Season.SeptuagesimaTime],
        periods: [Period.SeptuagesimaTime],
        calendarMetadata: { weekOfSeason: week, dayOfWeek: 0 },
        colors: [Colors.Purple],
        i18nDef: [`seasons:septuagesima_time.${sundayNames[week - 1]}`],
      });

      // Weekdays (Monday-Saturday).
      for (let dow = 1; dow < 7; dow += 1) {
        this.#newLiturgicalDayDef(`${sundayNames[week - 1]}_${this.#weekdays[dow]}`, {
          precedence: Precedences.FerialDay_15,
          dateDef: {
            dateFn: 'weekdayAfterSeptuagesimaSunday',
            dateArgs: [week, dow],
            yearOffset,
          },
          seasons: [Season.SeptuagesimaTime],
          periods: [Period.SeptuagesimaTime],
          calendarMetadata: { weekOfSeason: week, dayOfWeek: dow },
          colors: [Colors.Purple],
          i18nDef: ['seasons:septuagesima_time.weekday', { week, dow }],
        });
      }
    }
  }

  /**
   * ============================================================================
   * LENT
   * ============================================================================
   */

  lent(): void {
    // TODO: Implement Lent (Ash Wednesday - Saturday before Passion Sunday)
  }

  /**
   * ============================================================================
   * PASSIONTIDE
   * ============================================================================
   */

  passiontide(): void {
    // TODO: Implement Passiontide (Passion Sunday - Holy Saturday)
  }

  /**
   * ============================================================================
   * PASCHAL TRIDUUM
   * ============================================================================
   */

  paschalTriduum(): void {
    // TODO: Implement Paschal Triduum (Holy Thursday - Easter Sunday)
  }

  /**
   * ============================================================================
   * EASTER TIME
   * ============================================================================
   */

  easterTime(): void {
    // TODO: Implement Easter Time (Easter Sunday - Pentecost)
  }

  /**
   * ============================================================================
   * PENTECOST SEASON
   * ============================================================================
   */

  pentecostSeason(): void {
    // TODO: Implement Pentecost Season (After Pentecost - Advent)
    // Includes Trinity Sunday, Corpus Christi, Sacred Heart
    // Sundays after Pentecost (23-28)
    // Ember Days in September
  }
}
