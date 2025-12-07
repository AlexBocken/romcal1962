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
   * Helper to add a new liturgical day input for the Proper of Time.
   */
  #newLiturgicalDayDef(id: Id, input: LiturgicalDayProperOfTimeInput): void {
    this.inputs[id] = { properCycle: ProperCycles.ProperOfTime, ...input };
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

  lent(yearOffset = 0): void {
    // Ash Wednesday - start of Lent.
    this.#newLiturgicalDayDef('ash_wednesday', {
      precedence: Precedences.PrivilegedFeria_10,
      dateDef: { dateFn: 'ashWednesday', yearOffset },
      seasons: [Season.Lent],
      periods: [Period.EmberDays], // Ash Wed is first Ember Day of Lent
      calendarMetadata: { weekOfSeason: 0, dayOfSeason: 1, dayOfWeek: 3 },
      colors: [Colors.Purple],
      i18nDef: ['names:ash_wednesday'],
    });

    // Thursday and Friday after Ash Wednesday.
    for (let dow = 4; dow < 6; dow += 1) {
      this.#newLiturgicalDayDef(`${this.#weekdays[dow]}_after_ash_wednesday`, {
        precedence: Precedences.PrivilegedFeria_10,
        dateDef: { dateFn: 'ashWednesday', addDay: dow - 3, yearOffset },
        seasons: [Season.Lent],
        periods: [],
        calendarMetadata: { weekOfSeason: 0, dayOfSeason: dow - 2, dayOfWeek: dow },
        colors: [Colors.Purple],
        i18nDef: ['seasons:lent.day_after_ash_wed', { dow }],
      });
    }

    // Saturday after Ash Wednesday (Ember Day).
    this.#newLiturgicalDayDef('saturday_after_ash_wednesday', {
      precedence: Precedences.PrivilegedFeria_10,
      dateDef: { dateFn: 'ashWednesday', addDay: 3, yearOffset },
      seasons: [Season.Lent],
      periods: [Period.EmberDays],
      calendarMetadata: { weekOfSeason: 0, dayOfSeason: 4, dayOfWeek: 6 },
      colors: [Colors.Purple],
      i18nDef: ['seasons:lent.saturday_after_ash_wed'],
    });

    // Sundays and weekdays of Lent (weeks 1-4, up to Saturday before Passion Sunday).
    // In 1962, Lent is 4 weeks (Ash Wed to Saturday before Passion Sunday).
    for (let i = 0; i < 28; i += 1) {
      const week = Math.floor(i / 7) + 1;
      const dow = i - (week - 1) * 7;
      this.#newLiturgicalDayDef(`lent_${week}_${this.#weekdays[dow]}`, {
        precedence: dow === 0 ? Precedences.PrivilegedSunday_2 : Precedences.PrivilegedFeria_10,
        dateDef: { dateFn: 'ashWednesday', addDay: i + 4, yearOffset },
        isHolyDayOfObligation: dow === 0,
        seasons: [Season.Lent],
        periods: [],
        calendarMetadata: { weekOfSeason: week, dayOfSeason: i + 5, dayOfWeek: dow },
        colors: [
          ...(week === 4 && dow === 0 ? [Colors.Rose] : []), // Laetare Sunday
          Colors.Purple,
        ],
        i18nDef: dow === 0 ? ['seasons:lent.sunday', { week }] : ['seasons:lent.weekday', { week, dow }],
      });
    }
  }

  /**
   * ============================================================================
   * PASSIONTIDE
   * ============================================================================
   */

  passiontide(yearOffset = 0): void {
    // Passion Sunday (5th Sunday of Lent, 2 weeks before Easter).
    // Starts Passiontide - veiling of images and crucifixes.
    this.#newLiturgicalDayDef('passion_sunday', {
      precedence: Precedences.PrivilegedSunday_2,
      dateDef: { dateFn: 'passionSunday', yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.Passiontide],
      periods: [Period.Passiontide],
      calendarMetadata: { weekOfSeason: 1, dayOfSeason: 1, dayOfWeek: 0 },
      colors: [Colors.Purple],
      i18nDef: ['names:passion_sunday'],
    });

    // Weekdays of Passion Week (Monday-Saturday).
    for (let dow = 1; dow < 7; dow += 1) {
      this.#newLiturgicalDayDef(`passion_week_${this.#weekdays[dow]}`, {
        precedence: Precedences.PrivilegedFeria_10,
        dateDef: { dateFn: 'passionSunday', addDay: dow, yearOffset },
        seasons: [Season.Passiontide],
        periods: [Period.Passiontide],
        calendarMetadata: { weekOfSeason: 1, dayOfSeason: dow + 1, dayOfWeek: dow },
        colors: [Colors.Purple],
        i18nDef: ['seasons:passiontide.passion_week_day', { dow }],
      });
    }

    // Palm Sunday (6th Sunday of Lent, Sunday before Easter).
    this.#newLiturgicalDayDef('palm_sunday', {
      precedence: Precedences.PrivilegedSunday_2,
      dateDef: { dateFn: 'palmSunday', yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.Passiontide],
      periods: [Period.Passiontide, Period.HolyWeek],
      calendarMetadata: { weekOfSeason: 2, dayOfSeason: 8, dayOfWeek: 0 },
      colors: [Colors.Purple],
      i18nDef: ['names:palm_sunday'],
    });

    // Holy Week - Monday, Tuesday, Wednesday.
    for (let dow = 1; dow < 4; dow += 1) {
      this.#newLiturgicalDayDef(`holy_${this.#weekdays[dow]}`, {
        precedence: Precedences.HolyWeek_2,
        dateDef: { dateFn: 'palmSunday', addDay: dow, yearOffset },
        seasons: [Season.Passiontide],
        periods: [Period.Passiontide, Period.HolyWeek],
        calendarMetadata: { weekOfSeason: 2, dayOfSeason: 8 + dow, dayOfWeek: dow },
        colors: [Colors.Purple],
        i18nDef: ['seasons:passiontide.holy_week_day', { dow }],
      });
    }
  }

  /**
   * ============================================================================
   * PASCHAL TRIDUUM
   * ============================================================================
   */

  paschalTriduum(yearOffset = 0): void {
    // Holy Thursday (Maundy Thursday) - Evening Mass of the Lord's Supper.
    // In 1962, this is the beginning of the Paschal Triduum.
    this.#newLiturgicalDayDef('holy_thursday', {
      precedence: Precedences.Triduum_1,
      dateDef: { dateFn: 'palmSunday', addDay: 4, yearOffset },
      isHolyDayOfObligation: false,
      seasons: [Season.PaschalTriduum],
      periods: [Period.HolyWeek],
      calendarMetadata: { weekOfSeason: 1, dayOfSeason: 1, dayOfWeek: 4 },
      colors: [Colors.White],
      i18nDef: ['names:holy_thursday'],
    });

    // Good Friday - The Passion of the Lord.
    // The only day of the year with no Mass (Liturgy of the Passion instead).
    this.#newLiturgicalDayDef('good_friday', {
      precedence: Precedences.Triduum_1,
      dateDef: { dateFn: 'palmSunday', addDay: 5, yearOffset },
      isHolyDayOfObligation: false,
      seasons: [Season.PaschalTriduum],
      periods: [Period.HolyWeek],
      calendarMetadata: { weekOfSeason: 1, dayOfSeason: 2, dayOfWeek: 5 },
      colors: [Colors.Red], // Vestments for Liturgy of the Passion
      i18nDef: ['names:good_friday'],
    });

    // Holy Saturday - Easter Vigil.
    // The ancient paschal liturgy, celebrated after nightfall.
    this.#newLiturgicalDayDef('holy_saturday', {
      precedence: Precedences.Triduum_1,
      dateDef: { dateFn: 'palmSunday', addDay: 6, yearOffset },
      isHolyDayOfObligation: false,
      seasons: [Season.PaschalTriduum],
      periods: [Period.HolyWeek],
      calendarMetadata: { weekOfSeason: 1, dayOfSeason: 3, dayOfWeek: 6 },
      colors: [Colors.White], // After the Vigil begins
      i18nDef: ['names:holy_saturday'],
    });

    // Easter Sunday - The Resurrection of the Lord.
    // The greatest solemnity of the liturgical year.
    this.#newLiturgicalDayDef('easter_sunday', {
      precedence: Precedences.Triduum_1,
      dateDef: { dateFn: 'easterSunday', yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.EasterTime],
      periods: [Period.EasterOctave],
      calendarMetadata: { weekOfSeason: 1, dayOfSeason: 1, dayOfWeek: 0 },
      colors: [Colors.White],
      i18nDef: ['names:easter_sunday'],
    });
  }

  /**
   * ============================================================================
   * EASTER TIME
   * ============================================================================
   */

  easterTime(yearOffset = 0): void {
    // Easter Octave - Monday through Saturday after Easter Sunday.
    for (let dow = 1; dow < 7; dow += 1) {
      this.#newLiturgicalDayDef(`easter_${this.#weekdays[dow]}`, {
        precedence: Precedences.ProperOfTimeSolemnity_2,
        dateDef: { dateFn: 'easterSunday', addDay: dow, yearOffset },
        seasons: [Season.EasterTime],
        periods: [Period.EasterOctave],
        calendarMetadata: { weekOfSeason: 1, dayOfSeason: 1 + dow, dayOfWeek: dow },
        colors: [Colors.White],
        i18nDef: ['seasons:easter_time.easter_octave_day', { dow }],
      });
    }

    // Sunday within the Octave of Easter (Low Sunday, Divine Mercy Sunday).
    this.#newLiturgicalDayDef('sunday_within_octave_of_easter', {
      precedence: Precedences.PrivilegedSunday_2,
      dateDef: { dateFn: 'easterSunday', addDay: 7, yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.EasterTime],
      periods: [Period.EasterOctave],
      calendarMetadata: { weekOfSeason: 2, dayOfSeason: 8, dayOfWeek: 0 },
      colors: [Colors.White],
      i18nDef: ['names:sunday_within_octave_of_easter'],
    });

    // Sundays after Easter (2nd through 5th).
    // In 1962, these are the Sundays between Easter Octave and Ascension.
    for (let week = 2; week <= 5; week += 1) {
      this.#newLiturgicalDayDef(`sunday_after_easter_${week}`, {
        precedence: Precedences.PrivilegedSunday_2,
        dateDef: { dateFn: 'easterSunday', addDay: 7 * week, yearOffset },
        isHolyDayOfObligation: true,
        seasons: [Season.EasterTime],
        calendarMetadata: { weekOfSeason: week + 1, dayOfSeason: 7 * week + 1, dayOfWeek: 0 },
        colors: [Colors.White],
        i18nDef: ['seasons:easter_time.sunday_after_easter', { week }],
      });
    }

    // Rogation Days (Monday, Tuesday, Wednesday before Ascension).
    // These are days of prayer and fasting, traditionally with processions.
    const rogationDayNames = ['monday', 'tuesday', 'wednesday'];
    for (let i = 0; i < 3; i += 1) {
      this.#newLiturgicalDayDef(`rogation_${rogationDayNames[i]}`, {
        precedence: Precedences.PrivilegedFeria_10,
        dateDef: { dateFn: 'ascension', addDay: -(3 - i), yearOffset },
        seasons: [Season.EasterTime],
        periods: [Period.RogationDays],
        calendarMetadata: { dayOfWeek: i + 1 },
        colors: [Colors.Purple],
        i18nDef: ['seasons:easter_time.rogation_day', { dow: i + 1 }],
      });
    }

    // Ascension Thursday (40 days after Easter).
    // In 1962, always celebrated on Thursday (not transferred to Sunday).
    this.#newLiturgicalDayDef('ascension', {
      precedence: Precedences.ProperOfTimeSolemnity_2,
      dateDef: { dateFn: 'ascension', yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.EasterTime],
      periods: [Period.AscensionOctave],
      calendarMetadata: { weekOfSeason: 6, dayOfSeason: 40, dayOfWeek: 4 },
      colors: [Colors.White],
      i18nDef: ['names:ascension'],
    });

    // Ascension Octave - Friday and Saturday after Ascension.
    for (let dow = 5; dow < 7; dow += 1) {
      this.#newLiturgicalDayDef(`ascension_octave_${this.#weekdays[dow]}`, {
        precedence: Precedences.PrivilegedFeria_10,
        dateDef: { dateFn: 'ascension', addDay: dow - 4, yearOffset },
        seasons: [Season.EasterTime],
        periods: [Period.AscensionOctave],
        calendarMetadata: { dayOfWeek: dow },
        colors: [Colors.White],
        i18nDef: ['seasons:easter_time.ascension_octave_day', { dow }],
      });
    }

    // Sunday within the Octave of Ascension.
    this.#newLiturgicalDayDef('sunday_within_octave_of_ascension', {
      precedence: Precedences.PrivilegedSunday_2,
      dateDef: { dateFn: 'ascension', addDay: 3, yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.EasterTime],
      periods: [Period.AscensionOctave],
      calendarMetadata: { weekOfSeason: 7, dayOfSeason: 44, dayOfWeek: 0 },
      colors: [Colors.White],
      i18nDef: ['names:sunday_within_octave_of_ascension'],
    });

    // Ascension Octave weekdays (Monday through Thursday after Sunday).
    for (let dow = 1; dow <= 4; dow += 1) {
      this.#newLiturgicalDayDef(`ascension_octave_weekday_${this.#weekdays[dow]}`, {
        precedence: Precedences.PrivilegedFeria_10,
        dateDef: { dateFn: 'ascension', addDay: 3 + dow, yearOffset },
        seasons: [Season.EasterTime],
        periods: [Period.AscensionOctave],
        calendarMetadata: { dayOfWeek: dow },
        colors: [Colors.White],
        i18nDef: ['seasons:easter_time.ascension_octave_day', { dow }],
      });
    }

    // Vigil of Pentecost (Friday before Pentecost, last day of Ascension Octave).
    this.#newLiturgicalDayDef('vigil_of_pentecost', {
      precedence: Precedences.PrivilegedFeria_10,
      dateDef: { dateFn: 'pentecostSunday', addDay: -2, yearOffset },
      seasons: [Season.EasterTime],
      periods: [Period.AscensionOctave],
      calendarMetadata: { weekOfSeason: 7, dayOfSeason: 48, dayOfWeek: 5 },
      colors: [Colors.Red],
      i18nDef: ['names:vigil_of_pentecost'],
    });

    // Saturday before Pentecost (last day before Pentecost).
    this.#newLiturgicalDayDef('saturday_before_pentecost', {
      precedence: Precedences.PrivilegedFeria_10,
      dateDef: { dateFn: 'pentecostSunday', addDay: -1, yearOffset },
      seasons: [Season.EasterTime],
      periods: [Period.AscensionOctave],
      calendarMetadata: { weekOfSeason: 7, dayOfSeason: 49, dayOfWeek: 6 },
      colors: [Colors.Red],
      i18nDef: ['seasons:easter_time.saturday_before_pentecost'],
    });

    // Pentecost Sunday (50 days after Easter).
    // The descent of the Holy Spirit, concluding Easter Time.
    this.#newLiturgicalDayDef('pentecost_sunday', {
      precedence: Precedences.ProperOfTimeSolemnity_2,
      dateDef: { dateFn: 'pentecostSunday', yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.PentecostSeason],
      periods: [Period.PentecostOctave],
      calendarMetadata: { weekOfSeason: 1, dayOfSeason: 1, dayOfWeek: 0 },
      colors: [Colors.Red],
      i18nDef: ['names:pentecost_sunday'],
    });
  }

  /**
   * ============================================================================
   * PENTECOST SEASON
   * ============================================================================
   */

  pentecostSeason(yearOffset = 0): void {
    // Pentecost Octave - Monday through Saturday after Pentecost Sunday.
    for (let dow = 1; dow < 7; dow += 1) {
      this.#newLiturgicalDayDef(`pentecost_${this.#weekdays[dow]}`, {
        precedence: Precedences.ProperOfTimeSolemnity_2,
        dateDef: { dateFn: 'pentecostSunday', addDay: dow, yearOffset },
        seasons: [Season.PentecostSeason],
        periods: [Period.PentecostOctave],
        calendarMetadata: { weekOfSeason: 1, dayOfSeason: 1 + dow, dayOfWeek: dow },
        colors: [Colors.Red],
        i18nDef: ['seasons:pentecost_season.pentecost_octave_day', { dow }],
      });
    }

    // Trinity Sunday (Sunday after Pentecost, 1st Sunday after Pentecost).
    // The feast of the Holy Trinity.
    this.#newLiturgicalDayDef('trinity_sunday', {
      precedence: Precedences.ProperOfTimeSolemnity_2,
      dateDef: { dateFn: 'pentecostSunday', addDay: 7, yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.PentecostSeason],
      calendarMetadata: { weekOfSeason: 2, dayOfSeason: 8, dayOfWeek: 0 },
      colors: [Colors.White],
      i18nDef: ['names:trinity_sunday'],
    });

    // Ember Days after Pentecost (Wed/Fri/Sat in the week after Pentecost).
    const emberDaysPentecost = this.dates.emberDaysPentecost(this.#config.year + yearOffset);
    if (emberDaysPentecost.length === 3) {
      const emberDayNames = ['wednesday', 'friday', 'saturday'];
      const emberDayDows = [3, 5, 6];
      for (let i = 0; i < 3; i += 1) {
        this.#newLiturgicalDayDef(`ember_${emberDayNames[i]}_pentecost`, {
          precedence: Precedences.PrivilegedFeria_10,
          dateDef: { date: emberDaysPentecost[i] },
          seasons: [Season.PentecostSeason],
          periods: [Period.EmberDays],
          calendarMetadata: { dayOfWeek: emberDayDows[i] },
          colors: [Colors.Red],
          i18nDef: ['seasons:pentecost_season.ember_day_pentecost', { dow: emberDayDows[i] }],
        });
      }
    }

    // Corpus Christi (Thursday after Trinity Sunday).
    // The feast of the Body and Blood of Christ.
    this.#newLiturgicalDayDef('corpus_christi', {
      precedence: Precedences.ProperOfTimeSolemnity_2,
      dateDef: { dateFn: 'pentecostSunday', addDay: 11, yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.PentecostSeason],
      periods: [Period.CorpusChristiOctave],
      calendarMetadata: { weekOfSeason: 2, dayOfSeason: 12, dayOfWeek: 4 },
      colors: [Colors.White],
      i18nDef: ['names:corpus_christi'],
    });

    // Corpus Christi Octave - Friday and Saturday after Corpus Christi.
    for (let dow = 5; dow < 7; dow += 1) {
      this.#newLiturgicalDayDef(`corpus_christi_octave_${this.#weekdays[dow]}`, {
        precedence: Precedences.PrivilegedFeria_10,
        dateDef: { dateFn: 'pentecostSunday', addDay: 11 + (dow - 4), yearOffset },
        seasons: [Season.PentecostSeason],
        periods: [Period.CorpusChristiOctave],
        calendarMetadata: { dayOfWeek: dow },
        colors: [Colors.White],
        i18nDef: ['seasons:pentecost_season.corpus_christi_octave_day', { dow }],
      });
    }

    // 2nd Sunday after Pentecost (Sunday within Corpus Christi Octave).
    this.#newLiturgicalDayDef('sunday_after_pentecost_2', {
      precedence: Precedences.PrivilegedSunday_2,
      dateDef: { dateFn: 'pentecostSunday', addDay: 14, yearOffset },
      isHolyDayOfObligation: true,
      seasons: [Season.PentecostSeason],
      periods: [Period.CorpusChristiOctave],
      calendarMetadata: { weekOfSeason: 3, dayOfSeason: 15, dayOfWeek: 0 },
      colors: [Colors.Green],
      i18nDef: ['seasons:pentecost_season.sunday_after_pentecost', { week: 2 }],
    });

    // Corpus Christi Octave weekdays (Monday through Thursday after 2nd Sunday).
    for (let dow = 1; dow <= 4; dow += 1) {
      this.#newLiturgicalDayDef(`corpus_christi_octave_weekday_${this.#weekdays[dow]}`, {
        precedence: Precedences.PrivilegedFeria_10,
        dateDef: { dateFn: 'pentecostSunday', addDay: 14 + dow, yearOffset },
        seasons: [Season.PentecostSeason],
        periods: [Period.CorpusChristiOctave],
        calendarMetadata: { dayOfWeek: dow },
        colors: [Colors.White],
        i18nDef: ['seasons:pentecost_season.corpus_christi_octave_day', { dow }],
      });
    }

    // Sacred Heart (Friday after Corpus Christi Octave, 19 days after Pentecost).
    // The feast of the Most Sacred Heart of Jesus.
    this.#newLiturgicalDayDef('sacred_heart', {
      precedence: Precedences.ProperOfTimeSolemnity_2,
      dateDef: { dateFn: 'pentecostSunday', addDay: 19, yearOffset },
      isHolyDayOfObligation: false,
      seasons: [Season.PentecostSeason],
      calendarMetadata: { weekOfSeason: 3, dayOfSeason: 20, dayOfWeek: 5 },
      colors: [Colors.White],
      i18nDef: ['names:sacred_heart'],
    });

    // Sundays after Pentecost (3rd through last).
    // The number varies from year to year (23-28 total Sundays after Pentecost).
    const numberOfSundays = this.dates.numberOfSundaysAfterPentecost(this.#config.year + yearOffset);
    for (let week = 3; week <= numberOfSundays; week += 1) {
      const sunday = this.dates.sundayAfterPentecost(week, this.#config.year + yearOffset);
      if (sunday) {
        // Last Sunday after Pentecost has special significance.
        const isLastSunday = week === numberOfSundays;
        this.#newLiturgicalDayDef(`sunday_after_pentecost_${week}`, {
          precedence: Precedences.UnprivilegedSunday_6,
          dateDef: { date: sunday },
          isHolyDayOfObligation: true,
          seasons: [Season.PentecostSeason],
          calendarMetadata: { weekOfSeason: week + 1, dayOfWeek: 0 },
          colors: [Colors.Green],
          i18nDef: isLastSunday
            ? ['seasons:pentecost_season.last_sunday_after_pentecost']
            : ['seasons:pentecost_season.sunday_after_pentecost', { week }],
        });
      }
    }

    // September Ember Days (Wed/Fri/Sat after Sept 14, Exaltation of the Holy Cross).
    const emberDaysSeptember = this.dates.emberDaysSeptember(this.#config.year + yearOffset);
    if (emberDaysSeptember.length === 3) {
      const emberDayNames = ['wednesday', 'friday', 'saturday'];
      const emberDayDows = [3, 5, 6];
      for (let i = 0; i < 3; i += 1) {
        this.#newLiturgicalDayDef(`ember_${emberDayNames[i]}_september`, {
          precedence: Precedences.PrivilegedFeria_10,
          dateDef: { date: emberDaysSeptember[i] },
          seasons: [Season.PentecostSeason],
          periods: [Period.EmberDays],
          calendarMetadata: { dayOfWeek: emberDayDows[i] },
          colors: [Colors.Purple],
          i18nDef: ['seasons:pentecost_season.ember_day_september', { dow: emberDayDows[i] }],
        });
      }
    }
  }
}
