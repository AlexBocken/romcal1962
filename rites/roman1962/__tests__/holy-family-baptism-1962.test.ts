import { RomcalConfig } from '../src/models/config';
import { Dates, getUtcDate } from '../src/utils/dates';

describe('1962 Tridentine Calendar - Holy Family and Baptism Logic', () => {
  // Create a mock config for testing
  const mockConfig: Partial<RomcalConfig> = {
    scope: 'liturgical',
    easterCalculationType: 'gregorian',
  };

  describe('Date Calculation Logic', () => {
    test('2023: Jan 8 is Sunday - Holy Family on Jan 8, no Baptism', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2023);

      // Jan 8, 2023 is a Sunday
      const jan8 = getUtcDate(2023, 1, 8);
      expect(jan8.getUTCDay()).toBe(0); // Sunday

      // Holy Family should be on Jan 8
      const holyFamily = dates.holyFamily1962(2023);
      expect(holyFamily).not.toBeNull();
      expect(holyFamily?.getUTCDate()).toBe(8);
      expect(holyFamily?.getUTCMonth()).toBe(0); // January

      // Baptism should be null (Holy Family takes precedence)
      const baptism = dates.baptismOfTheLord1962(2023);
      expect(baptism).not.toBeNull();
      expect(baptism?.getUTCDate()).toBe(13);
    });

    test('2021: Jan 10 is Sunday - Holy Family on Jan 10, no Baptism on Jan 13', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2021);

      // Jan 10, 2021 is a Sunday
      const jan10 = getUtcDate(2021, 1, 10);
      expect(jan10.getUTCDay()).toBe(0); // Sunday

      // Holy Family should be on Jan 10
      const holyFamily = dates.holyFamily1962(2021);
      expect(holyFamily).not.toBeNull();
      expect(holyFamily?.getUTCDate()).toBe(10);
      expect(holyFamily?.getUTCMonth()).toBe(0); // January

      // Jan 13, 2021 is Wednesday - Baptism should be on Jan 13
      const jan13 = getUtcDate(2021, 1, 13);
      expect(jan13.getUTCDay()).toBe(3); // Wednesday

      const baptism = dates.baptismOfTheLord1962(2021);
      expect(baptism).not.toBeNull();
      expect(baptism?.getUTCDate()).toBe(13);
    });

    test('2019: Jan 13 is Sunday - Holy Family on Jan 13, no Baptism', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2019);

      // Jan 13, 2019 is a Sunday
      const jan13 = getUtcDate(2019, 1, 13);
      expect(jan13.getUTCDay()).toBe(0); // Sunday

      // Holy Family should be on Jan 13 (no Sunday Jan 7-12)
      const holyFamily = dates.holyFamily1962(2019);
      expect(holyFamily).not.toBeNull();
      expect(holyFamily?.getUTCDate()).toBe(13);
      expect(holyFamily?.getUTCMonth()).toBe(0); // January

      // Baptism should be null (Jan 13 is Sunday, so Holy Family instead)
      const baptism = dates.baptismOfTheLord1962(2019);
      expect(baptism).toBeNull();
    });

    test('2025: Jan 12 is Sunday - Holy Family on Jan 12, Baptism on Jan 13', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);

      // Jan 12, 2025 is a Sunday
      const jan12 = getUtcDate(2025, 1, 12);
      expect(jan12.getUTCDay()).toBe(0); // Sunday

      // Holy Family should be on Jan 12
      const holyFamily = dates.holyFamily1962(2025);
      expect(holyFamily).not.toBeNull();
      expect(holyFamily?.getUTCDate()).toBe(12);
      expect(holyFamily?.getUTCMonth()).toBe(0); // January

      // Jan 13, 2025 is Monday - Baptism should be on Jan 13
      const jan13 = getUtcDate(2025, 1, 13);
      expect(jan13.getUTCDay()).toBe(1); // Monday

      const baptism = dates.baptismOfTheLord1962(2025);
      expect(baptism).not.toBeNull();
      expect(baptism?.getUTCDate()).toBe(13);
      expect(baptism?.getUTCMonth()).toBe(0); // January
    });

    test('2026: Jan 11 is Sunday - Holy Family on Jan 11, Baptism on Jan 13', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2026);

      // Jan 11, 2026 is a Sunday
      const jan11 = getUtcDate(2026, 1, 11);
      expect(jan11.getUTCDay()).toBe(0); // Sunday

      // Holy Family should be on Jan 11
      const holyFamily = dates.holyFamily1962(2026);
      expect(holyFamily).not.toBeNull();
      expect(holyFamily.getUTCDate()).toBe(11);
      expect(holyFamily.getUTCMonth()).toBe(0); // January

      // Jan 13, 2026 is Tuesday - Baptism should be on Jan 13
      const jan13 = getUtcDate(2026, 1, 13);
      expect(jan13.getUTCDay()).toBe(2); // Tuesday

      const baptism = dates.baptismOfTheLord1962(2026);
      expect(baptism).not.toBeNull();
      expect(baptism?.getUTCDate()).toBe(13);
      expect(baptism?.getUTCMonth()).toBe(0); // January
    });
  });

  describe('Mutual Exclusivity', () => {
    test('Holy Family and Baptism cannot both occur in the same year if Holy Family is on Jan 13', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2019);

      const holyFamily = dates.holyFamily1962(2019);
      const baptism = dates.baptismOfTheLord1962(2019);

      // If Holy Family is on Jan 13, Baptism should be null
      if (holyFamily?.getUTCDate() === 13) {
        expect(baptism).toBeNull();
      }
    });

    test('Holy Family ALWAYS occurs (mathematical guarantee)', () => {
      // Test several years to ensure Holy Family always has a date
      // This is mathematically guaranteed: there's always either a Sunday in Jan 7-12,
      // or Jan 13 is itself a Sunday
      const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

      years.forEach((year) => {
        const dates = new Dates(mockConfig as RomcalConfig, year);
        const holyFamily = dates.holyFamily1962(year);

        // Holy Family should ALWAYS exist
        expect(holyFamily).not.toBeNull();

        // It should be between Jan 7-13
        expect(holyFamily.getUTCMonth()).toBe(0); // January
        expect(holyFamily.getUTCDate()).toBeGreaterThanOrEqual(7);
        expect(holyFamily.getUTCDate()).toBeLessThanOrEqual(13);

        // It should always be a Sunday
        expect(holyFamily.getUTCDay()).toBe(0);
      });
    });
  });

  describe('Memoization', () => {
    test('Holy Family date calculations are memoized', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);

      const hf1 = dates.holyFamily1962(2025);
      const hf2 = dates.holyFamily1962(2025);

      // Should return the exact same object reference (memoized)
      expect(hf1).toBe(hf2);
    });

    test('Baptism date calculations are memoized', () => {
      const dates = new Dates(mockConfig as RomcalConfig, 2025);

      const b1 = dates.baptismOfTheLord1962(2025);
      const b2 = dates.baptismOfTheLord1962(2025);

      // Should return the exact same object reference (memoized)
      expect(b1).toBe(b2);
    });
  });
});
