import { DateDef } from '../types/liturgical-day';
import { Dates, addDays, getUtcDate, isValidDate, subtractsDays } from '../utils/dates';
import { isInteger } from '../utils/numbers';

import { RomcalConfig } from './config';
import { LiturgicalDayDef } from './liturgical-day-def';

export class LiturgicalDayConfig {
  readonly config: RomcalConfig;
  readonly year: number;
  readonly dates: Dates;

  constructor(config: RomcalConfig, year?: number) {
    this.config = config;

    const currentYear = new Date().getUTCFullYear();
    this.year = year ?? currentYear;

    // Initialize the Dates class
    this.dates = new Dates(config, this.year);
  }

  /**
   * Lookup the date of a LiturgicalDayDef object, from a defined year scope
   * @param dateDef
   * @param yearOffset
   */
  #dateLookup(dateDef: DateDef, yearOffset = 0): Date | null {
    let date: Date | null = null;
    const year = this.year + (dateDef.yearOffset ?? 0) + yearOffset;

    // DateDefMonthDate - Fixed date (e.g., January 1)
    if (isInteger(dateDef.month) && isInteger(dateDef.date) && dateDef.month > 0 && dateDef.date > 0) {
      date = getUtcDate(year, dateDef.month, dateDef.date);

      // DateDefDateFnAddDay or DateDefDateFnSubtractDay - Computed date (e.g., Easter, Ash Wednesday)
    } else if (typeof dateDef.dateFn === 'string' && Object.prototype.hasOwnProperty.call(this.dates, dateDef.dateFn)) {
      const args = [...(dateDef.dateArgs ?? []), year];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dates = this.dates[dateDef.dateFn].apply<ThisType<Dates>, any, any>(this, args);
      const validDate = isValidDate(dates) ? dates : null;
      date = (Array.isArray(dates) ? dates.find((e) => e) : validDate) || null;

      // Apply addDay or subtractDay offsets if specified
      if (date && isInteger(dateDef.addDay)) date = addDays(date, dateDef.addDay);
      if (date && isInteger(dateDef.subtractDay)) date = subtractsDays(date, dateDef.subtractDay);
    }

    return date;
  }

  /**
   * Build the date for a LiturgicalDayDef
   * @param def
   * @param yearOffset
   */
  buildDate(def: LiturgicalDayDef, yearOffset = 0): Date | null {
    const date = this.#dateLookup(def.dateDef, yearOffset);
    if (!date) return null;

    // For the 1962 calendar, we don't have complex date exceptions yet
    // This can be extended in the future if needed
    return date;
  }
}
