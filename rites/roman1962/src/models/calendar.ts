import { PRECEDENCES } from '../constants/precedences';
import { Dates, isValidDate } from '../utils/dates';

import { RomcalConfig } from './config';
import { LiturgicalDay } from './liturgical-day';
import { LiturgicalDayConfig } from './liturgical-day-config';

/**
 * LiturgicalCalendar type:
 * A record where keys are ISO 8601 date strings (YYYY-MM-DD)
 * and values are arrays of LiturgicalDay objects for that date
 */
export type LiturgicalCalendar = Record<string, LiturgicalDay[]>;

export class Calendar {
  readonly #config: RomcalConfig;
  readonly #liturgicalDayConfig: LiturgicalDayConfig;
  readonly dates: Dates;

  constructor(config: RomcalConfig, liturgicalDayConfig: LiturgicalDayConfig) {
    this.#config = config;
    this.#liturgicalDayConfig = liturgicalDayConfig;
    this.dates = new Dates(config, liturgicalDayConfig.year);
  }

  /**
   * Generate a liturgical calendar for the specified year
   * Returns a record mapping ISO date strings to arrays of LiturgicalDay objects
   * @param includeMass - Whether to include full mass data (default: false for performance)
   */
  generateCalendar(includeMass = false): LiturgicalCalendar {
    const calendar: LiturgicalCalendar = {};

    // Iterate through all liturgical day definitions
    Object.entries(this.#config.liturgicalDayDef).forEach(([id, def]) => {
      // Compute the date for this definition
      const date = this.#liturgicalDayConfig.buildDate(def);

      // Skip if the date could not be computed
      if (!date || !isValidDate(date)) {
        return;
      }

      const dateStr = date.toISOString().substring(0, 10);

      // Create a LiturgicalDay object, passing the id from the key and includeMass flag
      const liturgicalDay = new LiturgicalDay(def, date, this.#liturgicalDayConfig, id, includeMass);

      // Add to the calendar
      if (!calendar[dateStr]) {
        calendar[dateStr] = [];
      }

      calendar[dateStr].push(liturgicalDay);
    });

    // Sort the calendar by date, and within each date by precedence (highest first)
    const sortedCalendar: LiturgicalCalendar = {};
    Object.keys(calendar)
      .sort()
      .forEach((dateStr) => {
        sortedCalendar[dateStr] = calendar[dateStr].sort((a, b) => {
          const precedenceOrder: readonly string[] = PRECEDENCES;
          const aIdx = precedenceOrder.indexOf(a.precedence);
          const bIdx = precedenceOrder.indexOf(b.precedence);
          return (aIdx === -1 ? Infinity : aIdx) - (bIdx === -1 ? Infinity : bIdx);
        });
      });

    return sortedCalendar;
  }
}
