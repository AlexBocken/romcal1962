import { ScreamingSnakeCase } from '../types/common';
import { toScreamingSnakeCase } from '../utils/string';

/**
 * Liturgical periods in the 1962 Tridentine calendar.
 * The 1962 calendar has more octaves and specific periods compared to 1969.
 */
export enum Period {
  // Christmas Time
  ChristmasOctave = 'CHRISTMAS_OCTAVE',
  EpiphanyOctave = 'EPIPHANY_OCTAVE',
  DaysBeforeEpiphany = 'DAYS_BEFORE_EPIPHANY',
  DaysFromEpiphany = 'DAYS_FROM_EPIPHANY',
  ChristmasToPresentationOfTheLord = 'CHRISTMAS_TO_PRESENTATION_OF_THE_LORD',

  // Pre-Lent
  SeptuagesimaTime = 'SEPTUAGESIMA_TIME',

  // Lent
  PresentationOfTheLordToHolyThursday = 'PRESENTATION_OF_THE_LORD_TO_HOLY_THURSDAY',
  Passiontide = 'PASSIONTIDE',
  HolyWeek = 'HOLY_WEEK',

  // Easter Time
  EasterOctave = 'EASTER_OCTAVE',
  AscensionOctave = 'ASCENSION_OCTAVE',

  // Pentecost Season
  PentecostOctave = 'PENTECOST_OCTAVE',
  CorpusChristiOctave = 'CORPUS_CHRISTI_OCTAVE',

  // Other specific periods
  EmberDays = 'EMBER_DAYS',
  RogationDays = 'ROGATION_DAYS',
}

/**
 * A dynamically generated constant consisting of all the enum IDs in Period
 */
export const PERIODS: ScreamingSnakeCase<keyof typeof Period>[] = Object.keys(Period)
  .filter((id) => typeof Period[id as keyof typeof Period] === 'string')
  .map((id) => toScreamingSnakeCase(id)) as ScreamingSnakeCase<keyof typeof Period>[];
