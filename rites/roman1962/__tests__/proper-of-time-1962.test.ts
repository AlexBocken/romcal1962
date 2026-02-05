import { Colors } from '../src/constants/colors';
import { Period } from '../src/constants/periods';
import { Precedences } from '../src/constants/precedences';
import { Season } from '../src/constants/seasons';
import { RomcalConfig } from '../src/models/config';
import { ProperOfTime } from '../src/proper-of-time/proper-of-time';
import { Inputs } from '../src/types/calendar-def';
import { Dates } from '../src/utils/dates';

describe('1962 Tridentine Calendar - ProperOfTime', () => {
  let properOfTime: ProperOfTime;
  let definitions: Inputs;

  beforeAll(() => {
    // Create a mock config for testing
    // Note: In 1962, Epiphany (Jan 6), Ascension (Thursday), and Corpus Christi (Thursday)
    // are always on their traditional days - no config needed
    const mockConfig: Partial<RomcalConfig> = {
      scope: 'liturgical',
      easterCalculationType: 'gregorian',
      year: 2025,
      liturgicalDayDef: {},
      martyrologyCatalog: {}, // Empty martyrology for testing
      localeDef: {}, // Empty locale for testing
    };

    // Add dates after creating the config
    mockConfig.dates = new Dates(mockConfig as RomcalConfig, 2025) as typeof Dates;

    properOfTime = new ProperOfTime(mockConfig as RomcalConfig);

    // Build all the definitions
    properOfTime.buildAllDefinitions();

    // Access the definitions through the inputs property
    definitions = properOfTime.inputs;
  });

  describe('Advent', () => {
    test('buildAllDefinitions was called and definitions exist', () => {
      expect(definitions).toBeDefined();
      expect(Object.keys(definitions).length).toBeGreaterThan(0);
      // Log first 10 keys for debugging
      console.log('First 10 keys:', Object.keys(definitions).slice(0, 10));
    });

    test('generates 4 Sundays of Advent', () => {
      expect(definitions['advent_1_sunday']).toBeDefined();
      expect(definitions['advent_2_sunday']).toBeDefined();
      expect(definitions['advent_3_sunday']).toBeDefined();
      expect(definitions['advent_4_sunday']).toBeDefined();
    });

    test('Advent Sundays have correct precedence and color', () => {
      const adventSunday1 = definitions['advent_1_sunday'];
      expect(adventSunday1.precedence).toBe(Precedences.PrivilegedSunday_2);
      expect(adventSunday1.colors).toContain(Colors.Purple);
      expect(adventSunday1.seasons).toContain(Season.Advent);
      expect(adventSunday1.isHolyDayOfObligation).toBe(true);
    });

    test('generates Ember Days in Advent', () => {
      expect(definitions['advent_3_wednesday_ember']).toBeDefined();
      expect(definitions['advent_3_friday_ember']).toBeDefined();
      expect(definitions['advent_3_saturday_ember']).toBeDefined();

      const emberWed = definitions['advent_3_wednesday_ember'];
      expect(emberWed.periods).toContain(Period.EmberDays);
      expect(emberWed.precedence).toBe(Precedences.PrivilegedFeria_10);
    });

    test('generates privileged weekdays Dec 17-24', () => {
      expect(definitions['advent_december_17']).toBeDefined();
      expect(definitions['advent_december_18']).toBeDefined();
      expect(definitions['advent_december_23']).toBeDefined();

      const dec17 = definitions['advent_december_17'];
      expect(dec17.precedence).toBe(Precedences.PrivilegedFeria_10);
      expect(dec17.seasons).toContain(Season.Advent);
    });
  });

  describe('Christmas Time', () => {
    test('generates Christmas Day', () => {
      const christmas = definitions['nativity_of_the_lord'];
      expect(christmas).toBeDefined();
      expect(christmas.precedence).toBe(Precedences.ProperOfTimeSolemnity_2);
      expect(christmas.colors).toContain(Colors.White);
      expect(christmas.isHolyDayOfObligation).toBe(true);
    });

    test('generates Christmas Octave', () => {
      expect(definitions['christmas_octave_day_2']).toBeDefined();
      expect(definitions['christmas_octave_day_3']).toBeDefined();

      const day2 = definitions['christmas_octave_day_2'];
      expect(day2.periods).toContain(Period.ChristmasOctave);
      expect(day2.seasons).toContain(Season.ChristmasTime);
    });

    test('generates Epiphany on January 6', () => {
      const epiphany = definitions['epiphany_of_the_lord'];
      expect(epiphany).toBeDefined();
      expect(epiphany.precedence).toBe(Precedences.ProperOfTimeSolemnity_2);
      expect(epiphany.isHolyDayOfObligation).toBe(true);
    });

    test('generates Epiphany Octave', () => {
      // Epiphany Octave days are Jan 7-12
      expect(definitions['epiphany_octave_day_7']).toBeDefined();
      expect(definitions['epiphany_octave_day_12']).toBeDefined();

      const octaveDay = definitions['epiphany_octave_day_7'];
      expect(octaveDay.periods).toContain(Period.EpiphanyOctave);

      // Octave Day of Epiphany (Jan 13)
      const epiphanyOctave = definitions['octave_day_of_epiphany'];
      expect(epiphanyOctave).toBeDefined();
      expect(epiphanyOctave.periods).toContain(Period.EpiphanyOctave);
    });
  });

  describe('After Epiphany', () => {
    test('generates variable Sundays after Epiphany', () => {
      // The 1st Sunday after Epiphany is the Holy Family (in Christmas Time).
      // afterEpiphany() generates the 2nd through 6th Sundays.
      expect(definitions['after_epiphany_2_sunday']).toBeDefined();

      const sunday2 = definitions['after_epiphany_2_sunday'];
      expect(sunday2.seasons).toContain(Season.AfterEpiphany);
      expect(sunday2.isHolyDayOfObligation).toBe(true);
    });

    test('number of Sundays after Epiphany varies (2-6)', () => {
      let count = 0;
      for (let i = 2; i <= 6; i++) {
        if (definitions[`after_epiphany_${i}_sunday`]) {
          count++;
        }
      }
      expect(count).toBeGreaterThanOrEqual(1);
      expect(count).toBeLessThanOrEqual(5);
    });
  });

  describe('Septuagesima Time', () => {
    test('generates 3 pre-Lenten Sundays', () => {
      expect(definitions['septuagesima_sunday']).toBeDefined();
      expect(definitions['sexagesima_sunday']).toBeDefined();
      expect(definitions['quinquagesima_sunday']).toBeDefined();
    });

    test('Septuagesima Sundays have correct properties', () => {
      const septuagesima = definitions['septuagesima_sunday'];
      expect(septuagesima).toBeDefined();
      expect(septuagesima.seasons).toContain(Season.SeptuagesimaTime);
      expect(septuagesima.colors).toContain(Colors.Purple);
      expect(septuagesima.precedence).toBe(Precedences.UnprivilegedSunday_6);
    });
  });

  describe('Lent', () => {
    test('generates Ash Wednesday', () => {
      const ashWed = definitions['ash_wednesday'];
      expect(ashWed).toBeDefined();
      expect(ashWed.seasons).toContain(Season.Lent);
      expect(ashWed.periods).toContain(Period.EmberDays);
      expect(ashWed.precedence).toBe(Precedences.PrivilegedFeria_10);
    });

    test('generates Ember Days in Lent', () => {
      const ashWed = definitions['ash_wednesday'];
      const emberSat = definitions['saturday_after_ash_wednesday'];

      expect(ashWed.periods).toContain(Period.EmberDays);
      expect(emberSat).toBeDefined();
      expect(emberSat.periods).toContain(Period.EmberDays);
    });

    test('generates 4 Sundays of Lent', () => {
      expect(definitions['lent_1_sunday']).toBeDefined();
      expect(definitions['lent_2_sunday']).toBeDefined();
      expect(definitions['lent_3_sunday']).toBeDefined();
      expect(definitions['lent_4_sunday']).toBeDefined();
    });

    test('Laetare Sunday (4th Sunday) can use rose', () => {
      const laetare = definitions['lent_4_sunday'];
      expect(laetare.colors).toContain(Colors.Rose);
      expect(laetare.colors).toContain(Colors.Purple);
    });
  });

  describe('Passiontide', () => {
    test('generates Passion Sunday', () => {
      const passionSunday = definitions['passion_sunday'];
      expect(passionSunday).toBeDefined();
      expect(passionSunday.seasons).toContain(Season.Passiontide);
      expect(passionSunday.periods).toContain(Period.Passiontide);
      expect(passionSunday.precedence).toBe(Precedences.PrivilegedSunday_2);
    });

    test('generates Passion Week weekdays', () => {
      expect(definitions['passion_week_monday']).toBeDefined();
      expect(definitions['passion_week_tuesday']).toBeDefined();
      expect(definitions['passion_week_saturday']).toBeDefined();
    });

    test('generates Palm Sunday', () => {
      const palmSunday = definitions['palm_sunday'];
      expect(palmSunday).toBeDefined();
      expect(palmSunday.seasons).toContain(Season.Passiontide);
      expect(palmSunday.periods).toContain(Period.HolyWeek);
      expect(palmSunday.precedence).toBe(Precedences.PrivilegedSunday_2);
    });

    test('generates Holy Week Monday-Wednesday', () => {
      const holyMon = definitions['holy_monday'];
      const holyTue = definitions['holy_tuesday'];
      const holyWed = definitions['holy_wednesday'];

      expect(holyMon).toBeDefined();
      expect(holyTue).toBeDefined();
      expect(holyWed).toBeDefined();

      expect(holyMon.precedence).toBe(Precedences.HolyWeek_2);
      expect(holyMon.periods).toContain(Period.HolyWeek);
    });
  });

  describe('Paschal Triduum', () => {
    test('generates Holy Thursday', () => {
      const holyThu = definitions['holy_thursday'];
      expect(holyThu).toBeDefined();
      expect(holyThu.precedence).toBe(Precedences.Triduum_1);
      expect(holyThu.seasons).toContain(Season.PaschalTriduum);
      expect(holyThu.colors).toContain(Colors.White);
    });

    test('generates Good Friday', () => {
      const goodFri = definitions['good_friday'];
      expect(goodFri).toBeDefined();
      expect(goodFri.precedence).toBe(Precedences.Triduum_1);
      expect(goodFri.seasons).toContain(Season.PaschalTriduum);
      expect(goodFri.colors).toContain(Colors.Red);
    });

    test('generates Holy Saturday', () => {
      const holySat = definitions['holy_saturday'];
      expect(holySat).toBeDefined();
      expect(holySat.precedence).toBe(Precedences.Triduum_1);
      expect(holySat.seasons).toContain(Season.PaschalTriduum);
    });

    test('generates Easter Sunday', () => {
      const easter = definitions['easter_sunday'];
      expect(easter).toBeDefined();
      expect(easter.precedence).toBe(Precedences.Triduum_1);
      expect(easter.seasons).toContain(Season.EasterTime);
      expect(easter.periods).toContain(Period.EasterOctave);
      expect(easter.colors).toContain(Colors.White);
      expect(easter.isHolyDayOfObligation).toBe(true);
    });

    test('Triduum days have highest precedence', () => {
      const holyThu = definitions['holy_thursday'];
      const goodFri = definitions['good_friday'];
      const holySat = definitions['holy_saturday'];
      const easter = definitions['easter_sunday'];

      expect(holyThu.precedence).toBe(Precedences.Triduum_1);
      expect(goodFri.precedence).toBe(Precedences.Triduum_1);
      expect(holySat.precedence).toBe(Precedences.Triduum_1);
      expect(easter.precedence).toBe(Precedences.Triduum_1);
    });
  });

  describe('Easter Time', () => {
    test('generates Easter Octave', () => {
      expect(definitions['easter_monday']).toBeDefined();
      expect(definitions['easter_tuesday']).toBeDefined();
      expect(definitions['easter_saturday']).toBeDefined();

      const easterMon = definitions['easter_monday'];
      expect(easterMon.periods).toContain(Period.EasterOctave);
      expect(easterMon.seasons).toContain(Season.EasterTime);
      expect(easterMon.precedence).toBe(Precedences.ProperOfTimeSolemnity_2);
    });

    test('generates Sunday within Octave of Easter', () => {
      const lowSunday = definitions['sunday_within_octave_of_easter'];
      expect(lowSunday).toBeDefined();
      expect(lowSunday.periods).toContain(Period.EasterOctave);
      expect(lowSunday.precedence).toBe(Precedences.PrivilegedSunday_2);
    });

    test('generates Sundays after Easter (2-5)', () => {
      expect(definitions['sunday_after_easter_2']).toBeDefined();
      expect(definitions['sunday_after_easter_3']).toBeDefined();
      expect(definitions['sunday_after_easter_4']).toBeDefined();
      expect(definitions['sunday_after_easter_5']).toBeDefined();
    });

    test('generates Rogation Days', () => {
      expect(definitions['rogation_monday']).toBeDefined();
      expect(definitions['rogation_tuesday']).toBeDefined();
      expect(definitions['rogation_wednesday']).toBeDefined();

      const rogationMon = definitions['rogation_monday'];
      expect(rogationMon.periods).toContain(Period.RogationDays);
      expect(rogationMon.colors).toContain(Colors.Purple);
    });

    test('generates Ascension on Thursday', () => {
      const ascension = definitions['ascension'];
      expect(ascension).toBeDefined();
      expect(ascension.precedence).toBe(Precedences.ProperOfTimeSolemnity_2);
      expect(ascension.periods).toContain(Period.AscensionOctave);
      expect(ascension.isHolyDayOfObligation).toBe(true);
    });

    test('generates Ascension Octave', () => {
      expect(definitions['ascension_octave_friday']).toBeDefined();
      expect(definitions['ascension_octave_saturday']).toBeDefined();
      expect(definitions['sunday_within_octave_of_ascension']).toBeDefined();

      const ascensionFri = definitions['ascension_octave_friday'];
      expect(ascensionFri.periods).toContain(Period.AscensionOctave);
    });

    test('generates Vigil of Pentecost', () => {
      const vigil = definitions['vigil_of_pentecost'];
      expect(vigil).toBeDefined();
      expect(vigil.colors).toContain(Colors.Red);
    });

    test('generates Pentecost Sunday', () => {
      const pentecost = definitions['pentecost_sunday'];
      expect(pentecost).toBeDefined();
      expect(pentecost.precedence).toBe(Precedences.ProperOfTimeSolemnity_2);
      expect(pentecost.seasons).toContain(Season.PentecostSeason);
      expect(pentecost.periods).toContain(Period.PentecostOctave);
      expect(pentecost.colors).toContain(Colors.Red);
    });
  });

  describe('Pentecost Season', () => {
    test('generates Pentecost Octave', () => {
      expect(definitions['pentecost_monday']).toBeDefined();
      expect(definitions['pentecost_tuesday']).toBeDefined();
      expect(definitions['pentecost_saturday']).toBeDefined();

      const pentecostMon = definitions['pentecost_monday'];
      expect(pentecostMon.periods).toContain(Period.PentecostOctave);
      expect(pentecostMon.colors).toContain(Colors.Red);
    });

    test('generates Trinity Sunday', () => {
      const trinity = definitions['trinity_sunday'];
      expect(trinity).toBeDefined();
      expect(trinity.precedence).toBe(Precedences.ProperOfTimeSolemnity_2);
      expect(trinity.colors).toContain(Colors.White);
      expect(trinity.isHolyDayOfObligation).toBe(true);
    });

    test('generates Ember Days after Pentecost', () => {
      expect(definitions['ember_wednesday_pentecost']).toBeDefined();
      expect(definitions['ember_friday_pentecost']).toBeDefined();
      expect(definitions['ember_saturday_pentecost']).toBeDefined();

      const emberWed = definitions['ember_wednesday_pentecost'];
      expect(emberWed.periods).toContain(Period.EmberDays);
      expect(emberWed.colors).toContain(Colors.Red);
    });

    test('generates Corpus Christi on Thursday', () => {
      const corpusChristi = definitions['corpus_christi'];
      expect(corpusChristi).toBeDefined();
      expect(corpusChristi.precedence).toBe(Precedences.ProperOfTimeSolemnity_2);
      expect(corpusChristi.periods).toContain(Period.CorpusChristiOctave);
      expect(corpusChristi.colors).toContain(Colors.White);
      expect(corpusChristi.isHolyDayOfObligation).toBe(true);
    });

    test('generates Corpus Christi Octave', () => {
      expect(definitions['corpus_christi_octave_friday']).toBeDefined();
      expect(definitions['corpus_christi_octave_saturday']).toBeDefined();
      expect(definitions['sunday_after_pentecost_2']).toBeDefined();
      expect(definitions['corpus_christi_octave_weekday_monday']).toBeDefined();

      const octaveFri = definitions['corpus_christi_octave_friday'];
      expect(octaveFri.periods).toContain(Period.CorpusChristiOctave);
    });

    test('generates Sacred Heart', () => {
      const sacredHeart = definitions['sacred_heart'];
      expect(sacredHeart).toBeDefined();
      expect(sacredHeart.precedence).toBe(Precedences.ProperOfTimeSolemnity_2);
      expect(sacredHeart.colors).toContain(Colors.White);
    });

    test('generates variable Sundays after Pentecost (23-28)', () => {
      let count = 0;
      // Note: Sundays start from week 3 (Trinity Sunday is week 1, 2nd Sunday is week 2)
      for (let i = 3; i <= 28; i++) {
        if (definitions[`sunday_after_pentecost_${i}`]) {
          count++;
        }
      }
      expect(count).toBeGreaterThanOrEqual(21); // 23 total minus Trinity and 2nd Sunday
      expect(count).toBeLessThanOrEqual(26); // 28 total minus Trinity and 2nd Sunday
    });

    test('last Sunday after Pentecost has special i18n key', () => {
      // Find the last Sunday
      let lastSunday = null;
      for (let i = 28; i >= 1; i--) {
        if (definitions[`sunday_after_pentecost_${i}`]) {
          lastSunday = definitions[`sunday_after_pentecost_${i}`];
          break;
        }
      }

      expect(lastSunday).toBeDefined();
      expect(lastSunday.i18nDef).toContain('seasons:pentecost_season.last_sunday_after_pentecost');
    });

    test('generates September Ember Days', () => {
      expect(definitions['ember_wednesday_september']).toBeDefined();
      expect(definitions['ember_friday_september']).toBeDefined();
      expect(definitions['ember_saturday_september']).toBeDefined();

      const emberWed = definitions['ember_wednesday_september'];
      expect(emberWed.periods).toContain(Period.EmberDays);
      expect(emberWed.colors).toContain(Colors.Purple);
    });
  });

  describe('Liturgical Colors', () => {
    test('uses purple for Advent and Lent', () => {
      const advent1 = definitions['advent_1_sunday'];
      const lent1 = definitions['lent_1_sunday'];

      expect(advent1).toBeDefined();
      expect(lent1).toBeDefined();
      expect(advent1.colors).toContain(Colors.Purple);
      expect(lent1.colors).toContain(Colors.Purple);
    });

    test('uses white for Christmas and Easter seasons', () => {
      const christmas = definitions['nativity_of_the_lord'];
      const easter = definitions['easter_sunday'];
      const ascension = definitions['ascension'];

      expect(christmas).toBeDefined();
      expect(easter).toBeDefined();
      expect(ascension).toBeDefined();
      expect(christmas.colors).toContain(Colors.White);
      expect(easter.colors).toContain(Colors.White);
      expect(ascension.colors).toContain(Colors.White);
    });

    test('uses red for Pentecost', () => {
      const pentecost = definitions['pentecost_sunday'];
      const pentecostMon = definitions['pentecost_monday'];

      expect(pentecost.colors).toContain(Colors.Red);
      expect(pentecostMon.colors).toContain(Colors.Red);
    });

    test('uses green for Sundays after Pentecost', () => {
      const sunday3 = definitions['sunday_after_pentecost_3'];
      expect(sunday3).toBeDefined();
      expect(sunday3.colors).toContain(Colors.Green);
    });

    test('allows rose for Laetare Sunday', () => {
      const laetare = definitions['lent_4_sunday'];
      expect(laetare.colors).toContain(Colors.Rose);
    });
  });

  describe('Precedence Levels', () => {
    test('Triduum has highest precedence', () => {
      const holyThu = definitions['holy_thursday'];
      expect(holyThu).toBeDefined();
      expect(holyThu.precedence).toBe(Precedences.Triduum_1);
    });

    test('Major solemnities have ProperOfTimeSolemnity_2', () => {
      const christmas = definitions['nativity_of_the_lord'];
      const epiphany = definitions['epiphany_of_the_lord'];
      const ascension = definitions['ascension'];

      expect(christmas).toBeDefined();
      expect(epiphany).toBeDefined();
      expect(ascension).toBeDefined();
      expect(christmas.precedence).toBe(Precedences.ProperOfTimeSolemnity_2);
      expect(epiphany.precedence).toBe(Precedences.ProperOfTimeSolemnity_2);
      expect(ascension.precedence).toBe(Precedences.ProperOfTimeSolemnity_2);
    });

    test('Privileged Sundays have PrivilegedSunday_2', () => {
      const advent1 = definitions['advent_1_sunday'];
      const passionSunday = definitions['passion_sunday'];

      expect(advent1).toBeDefined();
      expect(passionSunday).toBeDefined();
      expect(advent1.precedence).toBe(Precedences.PrivilegedSunday_2);
      expect(passionSunday.precedence).toBe(Precedences.PrivilegedSunday_2);
    });

    test('Privileged ferias have PrivilegedFeria_10', () => {
      const ashWed = definitions['ash_wednesday'];
      const holyMon = definitions['holy_monday'];

      expect(ashWed.precedence).toBe(Precedences.PrivilegedFeria_10);
      expect(holyMon.precedence).toBe(Precedences.HolyWeek_2);
    });
  });

  describe('Holy Days of Obligation', () => {
    test('marks Sundays as holy days', () => {
      const advent1 = definitions['advent_1_sunday'];
      const easter = definitions['easter_sunday'];

      expect(advent1).toBeDefined();
      expect(easter).toBeDefined();
      expect(advent1.isHolyDayOfObligation).toBe(true);
      expect(easter.isHolyDayOfObligation).toBe(true);
    });

    test('marks major solemnities as holy days', () => {
      const christmas = definitions['nativity_of_the_lord'];
      const epiphany = definitions['epiphany_of_the_lord'];
      const ascension = definitions['ascension'];

      expect(christmas).toBeDefined();
      expect(epiphany).toBeDefined();
      expect(ascension).toBeDefined();
      expect(christmas.isHolyDayOfObligation).toBe(true);
      expect(epiphany.isHolyDayOfObligation).toBe(true);
      expect(ascension.isHolyDayOfObligation).toBe(true);
    });

    test('does not mark weekdays as holy days (except major feasts)', () => {
      const ashWed = definitions['ash_wednesday'];
      expect(ashWed.isHolyDayOfObligation).toBeUndefined();
    });
  });
});
