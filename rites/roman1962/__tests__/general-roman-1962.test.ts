import { GeneralRoman1962 } from '../src/calendars/general-roman';
import { Colors } from '../src/constants/colors';
import { CommonDefinition as Common } from '../src/constants/commons';
import { Ranks } from '../src/constants/ranks';
import { RomcalConfig } from '../src/models/config';
import { Inputs } from '../src/types/calendar-def';
import { Dates } from '../src/utils/dates';

describe('1962 Tridentine Calendar - GeneralRoman1962', () => {
  let calendar: GeneralRoman1962;
  let definitions: Inputs;

  beforeAll(() => {
    // Create a mock config for testing
    const mockConfig: Partial<RomcalConfig> = {
      scope: 'liturgical',
      easterCalculationType: 'gregorian',
      year: 2025,
      liturgicalDayDef: {},
      martyrologyCatalog: {},
      localeDef: {},
    };

    // Add dates after creating the config
    mockConfig.dates = new Dates(mockConfig as RomcalConfig, 2025) as typeof Dates;

    calendar = new GeneralRoman1962(mockConfig as RomcalConfig);

    // Build all the definitions
    calendar.buildAllDefinitions();

    // Access definitions through inputs property
    definitions = calendar.inputs;
  });

  describe('Calendar Structure', () => {
    test('calendar class is instantiated correctly', () => {
      expect(calendar).toBeInstanceOf(GeneralRoman1962);
    });

    test('buildAllDefinitions was called and definitions exist', () => {
      expect(definitions).toBeDefined();
      expect(Object.keys(definitions).length).toBeGreaterThan(0);
    });

    test('has correct particular config', () => {
      expect(calendar.particularConfig?.easterCalculationType).toBe('gregorian');
    });
  });

  describe('Major Solemnities - I Class', () => {
    test('Circumcision / Octave Day of Nativity (Jan 1)', () => {
      const feast = definitions['octave_day_of_the_nativity_circumcision'];
      expect(feast).toBeDefined();
      expect(feast.rank).toBe(Ranks.FirstClass);
      expect(feast.colors).toBe(Colors.White);
      expect(feast.isHolyDayOfObligation).toBe(true);
      expect(feast.commonsDef).toBe(Common.None);
    });

    test('Epiphany (Jan 6)', () => {
      const feast = definitions['epiphany_of_the_lord'];
      expect(feast).toBeDefined();
      expect(feast.rank).toBe(Ranks.FirstClass);
      expect(feast.colors).toBe(Colors.White);
      expect(feast.isHolyDayOfObligation).toBe(true);
      expect(feast.commonsDef).toBe(Common.None);
    });

    test('St. Joseph (Mar 19)', () => {
      const feast = definitions['joseph_spouse_of_mary'];
      expect(feast).toBeDefined();
      expect(feast.rank).toBe(Ranks.FirstClass);
      expect(feast.colors).toBe(Colors.White);
      expect(feast.isHolyDayOfObligation).toBe(true);
      expect(feast.commonsDef).toBe(Common.None);
    });

    test('Annunciation (Mar 25)', () => {
      const feast = definitions['annunciation_of_the_lord'];
      expect(feast).toBeDefined();
      expect(feast.rank).toBe(Ranks.FirstClass);
      expect(feast.colors).toBe(Colors.White);
      expect(feast.isHolyDayOfObligation).toBe(true);
      expect(feast.commonsDef).toBe(Common.None);
    });

    test('Nativity of St. John the Baptist (Jun 24)', () => {
      const feast = definitions['nativity_of_saint_john_the_baptist'];
      expect(feast).toBeDefined();
      expect(feast.rank).toBe(Ranks.FirstClass);
      expect(feast.colors).toBe(Colors.White);
      expect(feast.isHolyDayOfObligation).toBe(true);
      expect(feast.commonsDef).toBe(Common.None);
    });

    test('SS. Peter and Paul (Jun 29)', () => {
      const feast = definitions['peter_and_paul_apostles'];
      expect(feast).toBeDefined();
      expect(feast.rank).toBe(Ranks.FirstClass);
      expect(feast.colors).toBe(Colors.Red);
      expect(feast.isHolyDayOfObligation).toBe(true);
      expect(feast.commonsDef).toBe(Common.None);
    });

    test('Assumption (Aug 15)', () => {
      const feast = definitions['assumption_of_the_blessed_virgin_mary'];
      expect(feast).toBeDefined();
      expect(feast.rank).toBe(Ranks.FirstClass);
      expect(feast.colors).toBe(Colors.White);
      expect(feast.isHolyDayOfObligation).toBe(true);
      expect(feast.commonsDef).toBe(Common.None);
    });

    test('All Saints (Nov 1)', () => {
      const feast = definitions['all_saints'];
      expect(feast).toBeDefined();
      expect(feast.rank).toBe(Ranks.FirstClass);
      expect(feast.colors).toBe(Colors.White);
      expect(feast.isHolyDayOfObligation).toBe(true);
      expect(feast.commonsDef).toBe(Common.None);
    });

    test('All Souls (Nov 2)', () => {
      const feast = definitions['all_souls'];
      expect(feast).toBeDefined();
      expect(feast.rank).toBe(Ranks.FirstClass);
      expect(feast.colors).toContain(Colors.Purple);
      expect(feast.colors).toContain(Colors.Black);
      expect(feast.isHolyDayOfObligation).toBe(false);
      expect(feast.commonsDef).toBe(Common.None);
    });

    test('Immaculate Conception (Dec 8)', () => {
      const feast = definitions['immaculate_conception_of_the_blessed_virgin_mary'];
      expect(feast).toBeDefined();
      expect(feast.rank).toBe(Ranks.FirstClass);
      expect(feast.colors).toBe(Colors.White);
      expect(feast.isHolyDayOfObligation).toBe(true);
      expect(feast.commonsDef).toBe(Common.None);
    });
  });

  describe('Major Solemnities - II Class', () => {
    test('Purification / Presentation (Feb 2)', () => {
      const feast = definitions['presentation_of_the_lord'];
      expect(feast).toBeDefined();
      expect(feast.rank).toBe(Ranks.SecondClass);
      expect(feast.colors).toBe(Colors.White);
      expect(feast.isHolyDayOfObligation).toBe(true);
      expect(feast.commonsDef).toBe(Common.None);
    });
  });

  describe('Liturgical Properties', () => {
    test('all major feasts have rank defined', () => {
      const majorFeasts = [
        'octave_day_of_the_nativity_circumcision',
        'epiphany_of_the_lord',
        'presentation_of_the_lord',
        'joseph_spouse_of_mary',
        'annunciation_of_the_lord',
        'nativity_of_saint_john_the_baptist',
        'peter_and_paul_apostles',
        'assumption_of_the_blessed_virgin_mary',
        'all_saints',
        'all_souls',
        'immaculate_conception_of_the_blessed_virgin_mary',
      ];

      majorFeasts.forEach((feastKey) => {
        const feast = definitions[feastKey];
        expect(feast).toBeDefined();
        expect(feast.rank).toBeDefined();
      });
    });

    test('all major feasts have precedence defined', () => {
      const majorFeasts = [
        'octave_day_of_the_nativity_circumcision',
        'epiphany_of_the_lord',
        'presentation_of_the_lord',
        'joseph_spouse_of_mary',
        'annunciation_of_the_lord',
        'nativity_of_saint_john_the_baptist',
        'peter_and_paul_apostles',
        'assumption_of_the_blessed_virgin_mary',
        'all_saints',
        'all_souls',
        'immaculate_conception_of_the_blessed_virgin_mary',
      ];

      majorFeasts.forEach((feastKey) => {
        const feast = definitions[feastKey];
        expect(feast).toBeDefined();
        expect(feast.precedence).toBeDefined();
      });
    });

    test('all major feasts have colors defined', () => {
      const majorFeasts = [
        'octave_day_of_the_nativity_circumcision',
        'epiphany_of_the_lord',
        'presentation_of_the_lord',
        'joseph_spouse_of_mary',
        'annunciation_of_the_lord',
        'nativity_of_saint_john_the_baptist',
        'peter_and_paul_apostles',
        'assumption_of_the_blessed_virgin_mary',
        'all_saints',
        'all_souls',
        'immaculate_conception_of_the_blessed_virgin_mary',
      ];

      majorFeasts.forEach((feastKey) => {
        const feast = definitions[feastKey];
        expect(feast).toBeDefined();
        expect(feast.colors).toBeDefined();
      });
    });

    test('all major feasts have commonsDef set to None', () => {
      const majorFeasts = [
        'octave_day_of_the_nativity_circumcision',
        'epiphany_of_the_lord',
        'presentation_of_the_lord',
        'joseph_spouse_of_mary',
        'annunciation_of_the_lord',
        'nativity_of_saint_john_the_baptist',
        'peter_and_paul_apostles',
        'assumption_of_the_blessed_virgin_mary',
        'all_saints',
        'all_souls',
        'immaculate_conception_of_the_blessed_virgin_mary',
      ];

      majorFeasts.forEach((feastKey) => {
        const feast = definitions[feastKey];
        expect(feast).toBeDefined();
        expect(feast.commonsDef).toBe(Common.None);
      });
    });
  });

  describe('Liturgical Colors', () => {
    test('Marian feasts use white', () => {
      const marianFeasts = [
        'presentation_of_the_lord',
        'annunciation_of_the_lord',
        'assumption_of_the_blessed_virgin_mary',
        'immaculate_conception_of_the_blessed_virgin_mary',
      ];

      marianFeasts.forEach((feastKey) => {
        const feast = definitions[feastKey];
        expect(feast).toBeDefined();
        expect(feast.colors).toBe(Colors.White);
      });
    });

    test('Peter and Paul uses red (martyrs)', () => {
      const feast = definitions['peter_and_paul_apostles'];
      expect(feast).toBeDefined();
      expect(feast.colors).toBe(Colors.Red);
    });

    test('All Souls allows purple or black', () => {
      const feast = definitions['all_souls'];
      expect(feast).toBeDefined();
      expect(feast.colors).toContain(Colors.Purple);
      expect(feast.colors).toContain(Colors.Black);
    });
  });
});
