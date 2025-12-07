import { Precedence, Precedences } from './precedences';

/**
 * Rank of liturgical days according to the 1960 Code of Rubrics (Rubricarum instructum).
 * Pope John XXIII's 1960 reform replaced the traditional Double/Semidouble/Simple system
 * with a simpler I/II/III/IV Class classification system, which was incorporated into
 * the 1962 Roman Missal.
 *
 * Historical note: Before 1960, feasts were ranked as Doubles (of varying degrees),
 * Semidoubles, and Simples. The 1960 Code of Rubrics simplified this:
 * - Doubles of I Class → I Class
 * - Doubles of II Class → II Class
 * - Greater Doubles, Doubles, Semidoubles → III Class
 * - Simples → IV Class (commemorations)
 *
 * @readonly
 * @enum {string}
 */
export enum Ranks {
  /**
   * I Class: The highest rank of liturgical celebrations.
   * Includes the greatest solemnities of the liturgical year and principal feasts
   * of the Lord, the Blessed Virgin Mary, and the Apostles.
   *
   * Examples:
   * - Easter Sunday, Pentecost, Christmas
   * - Sundays of Advent, Lent, and Eastertide
   * - Holy Week (Palm Sunday through Holy Saturday)
   * - Principal feasts of Our Lord and Our Lady
   */
  FirstClass = 'FIRST_CLASS',

  /**
   * II Class: Major feasts and important celebrations.
   * Includes significant feasts of the Lord, feasts of the Blessed Virgin Mary,
   * feasts of Apostles, and other important liturgical days.
   *
   * Examples:
   * - Feasts of the Apostles
   * - Major Marian feasts
   * - Days within octaves of I Class feasts
   * - Certain solemnities of the Lord
   */
  SecondClass = 'SECOND_CLASS',

  /**
   * III Class: Feasts and memorials of saints and lesser liturgical days.
   * This class absorbed most of the former Greater Doubles, Doubles, and Semidoubles.
   *
   * Examples:
   * - Feasts of saints (martyrs, confessors, virgins)
   * - Lesser feasts of the Lord or Our Lady
   * - Sundays within octaves
   * - Vigils of certain feasts
   */
  ThirdClass = 'THIRD_CLASS',

  /**
   * IV Class: Commemorations and simple celebrations.
   * The lowest rank, often commemorated within another celebration.
   * Corresponds to the former Simple feasts.
   *
   * Examples:
   * - Commemorations of saints
   * - Votive Masses (when permitted)
   * - Requiem Masses (when permitted)
   * - Ferial days (weekdays)
   */
  FourthClass = 'FOURTH_CLASS',
}

export const RANKS = [Ranks.FirstClass, Ranks.SecondClass, Ranks.ThirdClass, Ranks.FourthClass] as const;

export type Rank = (typeof RANKS)[number];

/**
 * Maps each precedence level to its corresponding rank.
 * This mapping follows the 1960 Code of Rubrics (Rubricarum instructum).
 *
 * Note: Multiple precedence levels can map to the same rank, as precedence
 * determines which celebration takes priority when conflicts occur, while
 * rank indicates the liturgical importance and ceremonial complexity.
 */
export const RanksFromPrecedence: Record<Precedence, Rank> = {
  // Level 1: Paschal Triduum
  [Precedences.Triduum_1]: Ranks.FirstClass,

  // Level 2: Primary I Class days
  [Precedences.ProperOfTimeSolemnity_2]: Ranks.FirstClass,
  [Precedences.PrivilegedSunday_2]: Ranks.FirstClass,
  [Precedences.HolyWeek_2]: Ranks.FirstClass,
  [Precedences.EasterOctave_2]: Ranks.FirstClass,

  // Level 3: General I Class feasts
  [Precedences.GeneralFirstClassFeast_3]: Ranks.FirstClass,

  // Level 4: Proper I Class feasts
  [Precedences.ProperFirstClassFeast_PrincipalPatron_4a]: Ranks.FirstClass,
  [Precedences.ProperFirstClassFeast_DedicationOfOwnChurch_4b]: Ranks.FirstClass,
  [Precedences.ProperFirstClassFeast_TitleOfOwnChurch_4c]: Ranks.FirstClass,

  // Level 5: II Class feasts of the Lord
  [Precedences.GeneralSecondClassLordFeast_5]: Ranks.SecondClass,

  // Level 6: Unprivileged Sundays (II Class)
  [Precedences.UnprivilegedSunday_6]: Ranks.SecondClass,

  // Level 7: General II Class feasts
  [Precedences.GeneralSecondClassFeast_7]: Ranks.SecondClass,

  // Level 8: Days within octaves, vigils
  [Precedences.DayWithinOctave_8]: Ranks.SecondClass,
  [Precedences.VigilOfFirstOrSecondClass_8]: Ranks.SecondClass,

  // Level 9: Proper II Class feasts
  [Precedences.ProperSecondClassFeast_9]: Ranks.SecondClass,

  // Level 10: Privileged Ferial days
  [Precedences.PrivilegedFeria_10]: Ranks.SecondClass,

  // Level 11: General III Class feasts
  [Precedences.GeneralThirdClassFeast_11]: Ranks.ThirdClass,

  // Level 12: III Class vigils
  [Precedences.VigilOfThirdClass_12]: Ranks.ThirdClass,

  // Level 13: Proper III Class feasts
  [Precedences.ProperThirdClassFeast_13]: Ranks.ThirdClass,

  // Level 14: IV Class commemorations and ferial days
  [Precedences.Commemoration_14]: Ranks.FourthClass,
  [Precedences.FerialDay_15]: Ranks.FourthClass,
};
