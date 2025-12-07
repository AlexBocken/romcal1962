import { ScreamingSnakeCase } from '../types/common';
import { toScreamingSnakeCase } from '../utils/string';

/**
 * Liturgical seasons according to the 1962 Tridentine calendar.
 *
 * The 1962 calendar differs significantly from the 1969 (Novus Ordo) calendar:
 *
 * Key differences:
 * - **Septuagesima Time**: A pre-Lenten season of 3 Sundays (Septuagesima, Sexagesima, Quinquagesima)
 *   that prepares for Lent. This season was abolished in 1969.
 * - **Passiontide**: The final 2 weeks of Lent (from Passion Sunday through Holy Saturday),
 *   when crucifixes and images are veiled. This is a distinct sub-season within Lent.
 * - **Pentecost Season**: The 1962 calendar counts Sundays "after Pentecost" (1-28 Sundays),
 *   whereas the 1969 calendar uses "Ordinary Time" after Pentecost.
 * - **After Epiphany**: Sundays are counted "after Epiphany" (1-6 Sundays) until Septuagesima,
 *   with any remaining Sundays transferred to after Pentecost.
 *
 * The liturgical year structure in 1962:
 * 1. Advent (4 Sundays)
 * 2. Christmas Time (Dec 25 - Epiphany and its octave)
 * 3. After Epiphany (1-6 Sundays, depending on the date of Easter)
 * 4. Septuagesima Time (3 Sundays: Septuagesima, Sexagesima, Quinquagesima)
 * 5. Lent (Ash Wednesday through Saturday before Passion Sunday)
 * 6. Passiontide (Passion Sunday through Holy Saturday, part of Lent)
 * 7. Paschal Triduum (Good Friday, Holy Saturday, Easter Sunday)
 * 8. Easter Time (Easter Sunday through Saturday before Pentecost, 7 weeks)
 * 9. Pentecost Season (Pentecost through the last Saturday before Advent)
 *
 * @readonly
 * @enum {string}
 */
export enum Season {
  /**
   * Advent: The beginning of the liturgical year.
   * Four Sundays of preparation for the Nativity of the Lord.
   * Begins on the Sunday nearest to November 30 (St. Andrew's Day).
   * Liturgical color: Purple (Violet)
   */
  Advent = 'ADVENT',

  /**
   * Christmas Time: From the Nativity through the Octave of Epiphany.
   * Includes:
   * - Christmas Day (Dec 25) and its Octave (through Jan 1)
   * - Epiphany (Jan 6 or transferred) and its Octave
   * - Holy Family (Sunday within the Octave of Christmas)
   * Liturgical colors: White, Gold
   */
  ChristmasTime = 'CHRISTMAS_TIME',

  /**
   * After Epiphany: Sundays after the Octave of Epiphany until Septuagesima.
   * The number of Sundays varies (1-6) depending on the date of Easter.
   * Omitted Sundays are transferred to after Pentecost (before the last Sunday).
   * Liturgical color: Green
   */
  AfterEpiphany = 'AFTER_EPIPHANY',

  /**
   * Septuagesima Time: Pre-Lenten season (abolished in 1969).
   * Three Sundays that prepare for Lent:
   * - Septuagesima Sunday (9 weeks before Easter)
   * - Sexagesima Sunday (8 weeks before Easter)
   * - Quinquagesima Sunday (7 weeks before Easter, Sunday before Ash Wednesday)
   *
   * During this time:
   * - Gloria is omitted at Mass
   * - Alleluia is replaced with the Tract
   * - Te Deum is omitted in the Office
   * Liturgical color: Purple (Violet)
   */
  SeptuagesimaTime = 'SEPTUAGESIMA_TIME',

  /**
   * Lent: The penitential season of 40 days (excluding Sundays).
   * Begins on Ash Wednesday and continues through Holy Saturday.
   * Includes Passiontide as its final two weeks.
   * Liturgical colors: Purple (Violet), Rose (Laetare Sunday)
   */
  Lent = 'LENT',

  /**
   * Passiontide: The final two weeks of Lent (part of Lent, not separate).
   * Begins on Passion Sunday (5th Sunday of Lent, 2 weeks before Easter).
   * During Passiontide:
   * - All crucifixes, images, and statues are veiled in purple
   * - Gloria Patri is omitted from the Introit and Lavabo
   * - Includes Holy Week
   * Liturgical color: Purple (Violet)
   */
  Passiontide = 'PASSIONTIDE',

  /**
   * Paschal Triduum: The three holiest days of the liturgical year.
   * - Good Friday (liturgy of the Lord's Passion)
   * - Holy Saturday (anticipation of the Resurrection)
   * - Easter Sunday (the Resurrection)
   * Liturgical colors: Red (Good Friday), White (Easter Vigil and Easter Sunday)
   */
  PaschalTriduum = 'PASCHAL_TRIDUUM',

  /**
   * Easter Time: The great season of resurrection and joy.
   * Seven weeks from Easter Sunday through the Saturday before Pentecost.
   * Includes:
   * - Easter Octave (8 days, all I Class)
   * - Sundays of Eastertide (2nd-5th Sundays after Easter)
   * - Rogation Days (Monday-Wednesday before Ascension)
   * - Ascension (40 days after Easter, always Thursday)
   * - Sunday after Ascension
   * Liturgical color: White
   */
  EasterTime = 'EASTER_TIME',

  /**
   * Pentecost Season: The longest season of the liturgical year (1962 calendar).
   * Begins on Pentecost Sunday and continues until the Saturday before Advent.
   * Includes:
   * - Pentecost Sunday and its Octave
   * - Trinity Sunday (Sunday after Pentecost)
   * - Corpus Christi and its Octave
   * - Sacred Heart (Friday after Corpus Christi Octave)
   * - Up to 28 Sundays after Pentecost (depending on the date of Easter)
   *
   * NOTE: In the 1969 calendar, this was replaced with "Ordinary Time."
   * The 1962 calendar explicitly counts Sundays "after Pentecost" (I-XXVIII).
   *
   * Liturgical color: Green (except for feast days)
   */
  PentecostSeason = 'PENTECOST_SEASON',
}

/**
 * A dynamically generated constant consisting of all the enum IDs in Season.
 * This array is generated at runtime from the Season enum keys.
 */
export const SEASONS = Object.keys(Season)
  .filter((id) => typeof Season[id as keyof typeof Season] === 'string')
  .map((id) => toScreamingSnakeCase(id)) as ScreamingSnakeCase<keyof typeof Season>[];
