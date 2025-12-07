import { Dates, getUtcDate } from '../src/utils/dates';
import { RomcalConfig } from '../src/models/config';

describe('1962 Tridentine Calendar - Date Calculations', () => {
  // Create a mock config for testing
  const mockConfig: Partial<RomcalConfig> = {
    scope: 'liturgical',
    easterCalculationType: 'gregorian',
    epiphanyOnSunday: false, // In 1962, Epiphany is always Jan 6
    ascensionOnSunday: false, // In 1962, Ascension is always Thursday (40 days after Easter)
  };

  describe('Septuagesima Time', () => {
    test('Septuagesima Sunday is 63 days (9 weeks) before Easter - Year 2025', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const easter = dates.easterSunday(2025);
      const septuagesima = dates.septuagesimaSunday(2025);

      // Easter 2025 is April 20
      expect(easter.getUTCMonth()).toBe(3); // April (0-indexed)
      expect(easter.getUTCDate()).toBe(20);

      // Septuagesima should be 63 days before
      const daysDiff = Math.round((easter.getTime() - septuagesima.getTime()) / (1000 * 60 * 60 * 24));
      expect(daysDiff).toBe(63);

      // Should be a Sunday
      expect(septuagesima.getUTCDay()).toBe(0);
    });

    test('Sexagesima Sunday is 56 days (8 weeks) before Easter - Year 2025', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const easter = dates.easterSunday(2025);
      const sexagesima = dates.sexagesimaSunday(2025);

      const daysDiff = Math.round((easter.getTime() - sexagesima.getTime()) / (1000 * 60 * 60 * 24));
      expect(daysDiff).toBe(56);
      expect(sexagesima.getUTCDay()).toBe(0); // Sunday
    });

    test('Quinquagesima Sunday is 49 days (7 weeks) before Easter - Year 2025', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const easter = dates.easterSunday(2025);
      const quinquagesima = dates.quinquagesimaSunday(2025);

      const daysDiff = Math.round((easter.getTime() - quinquagesima.getTime()) / (1000 * 60 * 60 * 24));
      expect(daysDiff).toBe(49);
      expect(quinquagesima.getUTCDay()).toBe(0); // Sunday
    });

    test('Quinquagesima is the Sunday before Ash Wednesday', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const quinquagesima = dates.quinquagesimaSunday(2025);
      const ashWed = dates.ashWednesday(2025);

      const daysDiff = Math.round((ashWed.getTime() - quinquagesima.getTime()) / (1000 * 60 * 60 * 24));
      expect(daysDiff).toBe(3); // Sunday to Wednesday
    });
  });

  describe('Passiontide', () => {
    test('Passion Sunday is 14 days (2 weeks) before Easter', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const easter = dates.easterSunday(2025);
      const passionSunday = dates.passionSunday(2025);

      const daysDiff = Math.round((easter.getTime() - passionSunday.getTime()) / (1000 * 60 * 60 * 24));
      expect(daysDiff).toBe(14);
      expect(passionSunday.getUTCDay()).toBe(0); // Sunday
    });

    test('Passion Sunday is also called the 5th Sunday of Lent', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const passionSunday = dates.passionSunday(2025);
      const palmSunday = dates.palmSunday(2025);

      const daysDiff = Math.round((palmSunday.getTime() - passionSunday.getTime()) / (1000 * 60 * 60 * 24));
      expect(daysDiff).toBe(7); // One week before Palm Sunday
    });
  });

  describe('Rogation Days', () => {
    test('Rogation Days are Monday, Tuesday, Wednesday before Ascension', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const rogationDays = dates.rogationDays(2025);
      const ascension = dates.ascension(2025);

      expect(rogationDays).toHaveLength(3);

      // Check they are consecutive days
      const day1 = rogationDays[0];
      const day2 = rogationDays[1];
      const day3 = rogationDays[2];

      expect(day2.getTime() - day1.getTime()).toBe(24 * 60 * 60 * 1000); // 1 day
      expect(day3.getTime() - day2.getTime()).toBe(24 * 60 * 60 * 1000); // 1 day

      // Check they are Mon, Tue, Wed
      expect(day1.getUTCDay()).toBe(1); // Monday
      expect(day2.getUTCDay()).toBe(2); // Tuesday
      expect(day3.getUTCDay()).toBe(3); // Wednesday

      // Check they are 3, 2, 1 days before Ascension
      expect(Math.round((ascension.getTime() - day1.getTime()) / (1000 * 60 * 60 * 24))).toBe(3);
      expect(Math.round((ascension.getTime() - day2.getTime()) / (1000 * 60 * 60 * 24))).toBe(2);
      expect(Math.round((ascension.getTime() - day3.getTime()) / (1000 * 60 * 60 * 24))).toBe(1);
    });
  });

  describe('Ember Days', () => {
    test('Ember Days in Advent are Wed/Fri/Sat of 3rd week of Advent', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const emberDays = dates.emberDaysAdvent(2025);

      expect(emberDays).toHaveLength(3);

      // Check they are Wed, Fri, Sat
      expect(emberDays[0].getUTCDay()).toBe(3); // Wednesday
      expect(emberDays[1].getUTCDay()).toBe(5); // Friday
      expect(emberDays[2].getUTCDay()).toBe(6); // Saturday

      // Check they are consecutive Wed-Fri-Sat
      expect(Math.round((emberDays[1].getTime() - emberDays[0].getTime()) / (1000 * 60 * 60 * 24))).toBe(2);
      expect(Math.round((emberDays[2].getTime() - emberDays[1].getTime()) / (1000 * 60 * 60 * 24))).toBe(1);
    });

    test('Ember Days in Lent start with Ash Wednesday', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const emberDays = dates.emberDaysLent(2025);
      const ashWed = dates.ashWednesday(2025);

      expect(emberDays).toHaveLength(3);

      // First Ember Day should be Ash Wednesday
      expect(emberDays[0].getTime()).toBe(ashWed.getTime());

      // Check days are Wed, Fri, Sat
      expect(emberDays[0].getUTCDay()).toBe(3); // Wednesday (Ash Wed)
      expect(emberDays[1].getUTCDay()).toBe(5); // Friday
      expect(emberDays[2].getUTCDay()).toBe(6); // Saturday
    });

    test('Ember Days after Pentecost are Wed/Fri/Sat after Pentecost', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const emberDays = dates.emberDaysPentecost(2025);
      const pentecost = dates.pentecostSunday(2025);

      expect(emberDays).toHaveLength(3);

      // Should be the week after Pentecost Sunday
      expect(emberDays[0].getTime()).toBeGreaterThan(pentecost.getTime());

      // Check they are Wed, Fri, Sat
      expect(emberDays[0].getUTCDay()).toBe(3); // Wednesday
      expect(emberDays[1].getUTCDay()).toBe(5); // Friday
      expect(emberDays[2].getUTCDay()).toBe(6); // Saturday
    });

    test('September Ember Days are after Sept 14 (Exaltation of Holy Cross)', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const emberDays = dates.emberDaysSeptember(2025);
      const exaltation = dates.exaltationOfTheHolyCross(2025);

      expect(emberDays).toHaveLength(3);

      // Should be after Sept 14
      expect(emberDays[0].getTime()).toBeGreaterThan(exaltation.getTime());

      // Check they are Wed, Fri, Sat
      expect(emberDays[0].getUTCDay()).toBe(3); // Wednesday
      expect(emberDays[1].getUTCDay()).toBe(5); // Friday
      expect(emberDays[2].getUTCDay()).toBe(6); // Saturday
    });
  });

  describe('After Epiphany', () => {
    test('Number of Sundays after Epiphany varies (1-6) based on Easter date', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const count = dates.numberOfSundaysAfterEpiphany(2025);

      expect(count).toBeGreaterThanOrEqual(1);
      expect(count).toBeLessThanOrEqual(6);
    });

    test('Sundays after Epiphany return null if week number exceeds available Sundays', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const maxSundays = dates.numberOfSundaysAfterEpiphany(2025);

      // Valid Sunday should exist
      const validSunday = dates.sundayAfterEpiphany(1, 2025);
      expect(validSunday).not.toBeNull();
      expect(validSunday?.getUTCDay()).toBe(0); // Sunday

      // Sunday beyond max should be null
      const invalidSunday = dates.sundayAfterEpiphany(maxSundays + 1, 2025);
      expect(invalidSunday).toBeNull();
    });
  });

  describe('Pentecost Season (After Pentecost)', () => {
    test('Number of Sundays after Pentecost varies (23-28) based on Easter date', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const count = dates.numberOfSundaysAfterPentecost(2025);

      expect(count).toBeGreaterThanOrEqual(23);
      expect(count).toBeLessThanOrEqual(28);
    });

    test('Sundays after Pentecost are calculated correctly', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const pentecost = dates.pentecostSunday(2025);
      const firstSunday = dates.sundayAfterPentecost(1, 2025);
      const secondSunday = dates.sundayAfterPentecost(2, 2025);

      expect(firstSunday).not.toBeNull();
      expect(secondSunday).not.toBeNull();

      // Should be Sundays
      expect(firstSunday?.getUTCDay()).toBe(0);
      expect(secondSunday?.getUTCDay()).toBe(0);

      // Should be 1 week and 2 weeks after Pentecost
      if (firstSunday && secondSunday) {
        expect(Math.round((firstSunday.getTime() - pentecost.getTime()) / (1000 * 60 * 60 * 24))).toBe(7);
        expect(Math.round((secondSunday.getTime() - pentecost.getTime()) / (1000 * 60 * 60 * 24))).toBe(14);
      }
    });

    test('Sundays after Pentecost return null if week number exceeds available Sundays', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);
      const maxSundays = dates.numberOfSundaysAfterPentecost(2025);

      // Valid Sunday should exist
      const validSunday = dates.sundayAfterPentecost(1, 2025);
      expect(validSunday).not.toBeNull();

      // Sunday beyond max should be null
      const invalidSunday = dates.sundayAfterPentecost(maxSundays + 1, 2025);
      expect(invalidSunday).toBeNull();
    });
  });

  describe('Memoization', () => {
    test('Date calculations are memoized for performance', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);

      const sep1 = dates.septuagesimaSunday(2025);
      const sep2 = dates.septuagesimaSunday(2025);

      // Should return the exact same object reference (memoized)
      expect(sep1).toBe(sep2);
    });
  });
});
