import { EasterCalculationType } from '../types/config';

/**
 * Minimal RomcalConfig interface for 1962 calendar.
 * This will be extended as we build out the implementation.
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
