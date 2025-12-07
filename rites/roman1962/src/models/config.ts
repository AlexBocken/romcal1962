import { EasterCalculationType } from '../types/config';

/**
 * Minimal RomcalConfig interface for 1962 calendar.
 * This will be extended as we build out the implementation.
 *
 * Note: Unlike the 1969 calendar, the 1962 Tridentine calendar has fixed dates for:
 * - Epiphany: always January 6 (never transferred to Sunday)
 * - Ascension: always Thursday, 40 days after Easter (never transferred to Sunday)
 * - Corpus Christi: always Thursday after Trinity Sunday (never transferred to Sunday)
 *
 * Therefore, epiphanyOnSunday, ascensionOnSunday, and corpusChristiOnSunday configs
 * are not needed and are always implicitly false for this calendar.
 */
export interface RomcalConfig {
  /**
   * Scope of the calendar: 'liturgical' (starts with Advent) or 'gregorian' (calendar year)
   */
  scope: 'liturgical' | 'gregorian';

  /**
   * Method for calculating Easter date
   */
  easterCalculationType: EasterCalculationType;

  /**
   * Additional config properties will be added as needed
   */
  [key: string]: unknown;
}
