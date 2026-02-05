import { GeneralRoman1962 } from './calendars/general-roman';
import { PROPER_OF_TIME_NAME } from './constants/general-calendar-names';
import { Calendar, LiturgicalCalendar } from './models/calendar';
import { RomcalConfig } from './models/config';
import { LiturgicalDay } from './models/liturgical-day';
import { LiturgicalDayConfig } from './models/liturgical-day-config';
import { LiturgicalDayDef } from './models/liturgical-day-def';
import { ProperOfTime } from './proper-of-time/proper-of-time';
import { Id } from './types/common';
import { LiturgicalDayProperOfTimeInput } from './types/liturgical-day';
import { Dates } from './utils/dates';

export class Romcal {
  readonly #config: RomcalConfig;
  #computedCalendars: Record<string, LiturgicalCalendar> = {};
  #dates: Record<number, Dates> = {};

  constructor(config?: Partial<RomcalConfig>) {
    // Create a full config with defaults for 1962 Tridentine calendar
    // Note: In 1962, Epiphany, Ascension, and Corpus Christi are NEVER transferred to Sunday
    this.#config = {
      scope: config?.scope ?? 'gregorian',
      easterCalculationType: config?.easterCalculationType ?? 'gregorian',
      year: config?.year ?? new Date().getFullYear(),
      liturgicalDayDef: {},
      martyrologyCatalog: {},
      localeDef: {},
      dates: null as unknown as typeof Dates,
      // 1962-specific: fixed dates, never transferred to Sunday
      epiphanyOnSunday: false,
      ascensionOnSunday: false,
      corpusChristiOnSunday: false,
    };
  }

  /**
   * Sanitize the provided year
   * @param year
   * @private
   */
  static #sanitizeYear(year?: number | string): number {
    const y: number = typeof year === 'string' ? parseInt(year, 10) : (year ?? new Date().getFullYear());
    if (!Number.isInteger(y) || y < 0 || y > 9999) {
      throw new Error('The provided year is incorrect');
    }
    return y;
  }

  /**
   * Get the Dates utility for a specific year
   * @param year
   */
  dates(year?: number | string): Dates {
    const y = Romcal.#sanitizeYear(year);
    if (!this.#dates[y]) {
      this.#dates[y] = new Dates(this.#config, y);
    }
    return this.#dates[y];
  }

  /**
   * Build all liturgical day definitions
   * This combines definitions from ProperOfTime and GeneralRoman1962
   * @param year
   * @private
   */
  #buildAllDefinitions(year: number): void {
    // Create a proper config object for this year
    const yearConfig: RomcalConfig = {
      scope: this.#config.scope,
      easterCalculationType: this.#config.easterCalculationType,
      year,
      liturgicalDayDef: {},
      martyrologyCatalog: {},
      localeDef: {},
      epiphanyOnSunday: false,
      ascensionOnSunday: false,
      corpusChristiOnSunday: false,
      dates: new Dates(this.#config, year) as typeof Dates,
    };

    // Create calendar instances
    const properOfTime = new ProperOfTime(yearConfig);
    const generalRoman = new GeneralRoman1962(yearConfig);

    // Build proper-of-time definitions (populates properOfTime.inputs with raw data).
    properOfTime.buildAllDefinitions();

    // Create proper LiturgicalDayDef instances from proper-of-time inputs.
    // This computes rank from precedence, resolves i18n names, etc.
    Object.entries(properOfTime.inputs).forEach(([id, input]) => {
      // ProperOfTime inputs are always single LiturgicalDayProperOfTimeInput objects (not arrays)
      new LiturgicalDayDef(id, input as LiturgicalDayProperOfTimeInput, PROPER_OF_TIME_NAME, yearConfig);
    });

    // Build sanctorale definitions (creates LiturgicalDayDef instances via CalendarDef base).
    // These are stored directly in yearConfig.liturgicalDayDef by the LiturgicalDayDef constructor.
    generalRoman.buildAllDefinitions();

    // yearConfig.liturgicalDayDef now contains proper LiturgicalDayDef instances
    // for both proper-of-time and sanctorale entries.
    this.#config.liturgicalDayDef = yearConfig.liturgicalDayDef;
    this.#config.dates = yearConfig.dates;
    this.#config.year = year;
  }

  /**
   * Generate a liturgical calendar for the specified year
   * @param year - The year to generate the calendar for
   * @param options - Options for calendar generation
   * @param options.includeMass - Whether to include full mass data (default: false)
   * @returns A Promise that resolves to a LiturgicalCalendar
   */
  async generateCalendar(year?: number | string, options?: { includeMass?: boolean }): Promise<LiturgicalCalendar> {
    const y = Romcal.#sanitizeYear(year);
    const includeMass = options?.includeMass ?? false;

    // Cache key includes the includeMass flag
    const cacheKey = `${y}${includeMass ? '_with_mass' : ''}`;
    if (this.#computedCalendars[cacheKey]) {
      return this.#computedCalendars[cacheKey];
    }

    // Build all definitions for this year
    this.#buildAllDefinitions(y);

    // Create liturgical day config
    const liturgicalDayConfig = new LiturgicalDayConfig(this.#config, y);

    // Generate the calendar
    const calendar = new Calendar(this.#config, liturgicalDayConfig);
    const liturgicalCalendar = calendar.generateCalendar(includeMass);

    // Cache the result
    this.#computedCalendars[cacheKey] = liturgicalCalendar;

    return liturgicalCalendar;
  }

  /**
   * Get a single liturgical day by its ID for a specific year
   * @param id - The liturgical day ID
   * @param options - Options including the year
   * @returns A Promise that resolves to a LiturgicalDay or null
   */
  async getOneLiturgicalDay(id: Id, options?: { year?: number | string }): Promise<LiturgicalDay | null | undefined> {
    const year = Romcal.#sanitizeYear(options?.year);

    // Build all definitions if not already done
    if (Object.keys(this.#config.liturgicalDayDef).length === 0) {
      this.#buildAllDefinitions(year);
    }

    // Check if the ID exists
    if (!this.#config.liturgicalDayDef[id]) {
      return undefined;
    }

    const def = this.#config.liturgicalDayDef[id];
    const liturgicalDayConfig = new LiturgicalDayConfig(this.#config, year);

    // Compute the date
    const date = liturgicalDayConfig.buildDate(def);
    if (!date) {
      return null;
    }

    // Return the LiturgicalDay object
    return new LiturgicalDay(def, date, liturgicalDayConfig);
  }
}

// Export types and constants
export { LiturgicalCalendar, LiturgicalDay };
export * from './constants/colors';
export * from './constants/commons';
export * from './constants/ranks';
export * from './types/mass';
export { Dates } from './utils/dates';
