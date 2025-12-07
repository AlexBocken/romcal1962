import { Colors } from '../../constants/colors';
import { CommonDefinition as Common } from '../../constants/commons';
import { ProperCycles } from '../../constants/cycles';
import { Precedences } from '../../constants/precedences';
import { Ranks } from '../../constants/ranks';
import { CalendarDef } from '../../models/calendar-def';
import { Inputs, ParticularConfig } from '../../types/calendar-def';

/**
 * General Roman Calendar for the 1962 Tridentine Rite
 *
 * This calendar implements the Extraordinary Form of the Roman Rite as codified
 * in the 1960 Code of Rubrics and the 1962 Roman Missal and Breviary.
 *
 * Key differences from 1969 calendar:
 * - Pre-Lent season (Septuagesima, Sexagesima, Quinquagesima)
 * - Different ranking system (I/II/III/IV Class per 1960 Code of Rubrics)
 * - More octaves throughout the year
 * - More vigils with unique Masses
 * - Fixed dates for Epiphany (Jan 6), Ascension (Thursday), Corpus Christi (Thursday)
 * - More extensive Proper of Saints
 *
 * Sources:
 * - Missale Romanum 1962
 * - Breviarium Romanum 1962
 * - Codex Rubricarum 1960 (Code of Rubrics)
 * - Baronius Press Ordo
 */
export class GeneralRoman1962 extends CalendarDef {
  /**
   * In 1962, Epiphany, Ascension, and Corpus Christi are always on their traditional days.
   * These are not configurable in the 1962 calendar.
   */
  particularConfig: ParticularConfig = {
    easterCalculationType: 'gregorian',
  };

  inputs: Inputs = {
    // ========================================================================
    // MAJOR SOLEMNITIES AND FEASTS OF THE LORD
    // ========================================================================

    // January 1 - Octave Day of the Nativity / Circumcision of the Lord
    // I Class with Octave
    // src: mr_1962, br_1962, cr_1960
    octave_day_of_the_nativity_circumcision: {
      rank: Ranks.FirstClass,
      precedence: Precedences.ProperOfTimeSolemnity_2,
      dateDef: { month: 1, date: 1 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // January 6 - Epiphany of the Lord
    // I Class with Octave
    // src: mr_1962, br_1962, cr_1960
    // Note: Always January 6 in 1962, never transferred to Sunday
    epiphany_of_the_lord: {
      rank: Ranks.FirstClass,
      precedence: Precedences.ProperOfTimeSolemnity_2,
      dateDef: { dateFn: 'epiphany' },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // February 2 - Purification of the Blessed Virgin Mary (Candlemas)
    // II Class
    // src: mr_1962, br_1962, cr_1960
    presentation_of_the_lord: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassLordFeast_5,
      dateDef: { month: 2, date: 2 },
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // March 19 - St. Joseph, Spouse of the Blessed Virgin Mary, Confessor
    // I Class, Patron of the Universal Church
    // src: mr_1962, br_1962, cr_1960
    joseph_spouse_of_mary: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 3, date: 19 },
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // March 25 - Annunciation of the Blessed Virgin Mary
    // I Class
    // src: mr_1962, br_1962, cr_1960
    annunciation_of_the_lord: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 3, date: 25 },
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // June 24 - Nativity of St. John the Baptist
    // I Class with Octave
    // src: mr_1962, br_1962, cr_1960
    nativity_of_saint_john_the_baptist: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 6, date: 24 },
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // June 29 - SS. Peter and Paul, Apostles
    // I Class with Octave
    // src: mr_1962, br_1962, cr_1960
    peter_and_paul_apostles: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 6, date: 29 },
      commonsDef: Common.None,
      colors: Colors.Red,
      isHolyDayOfObligation: true,
    },

    // August 15 - Assumption of the Blessed Virgin Mary
    // I Class with Octave
    // src: mr_1962, br_1962, cr_1960
    assumption_of_the_blessed_virgin_mary: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 8, date: 15 },
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // November 1 - All Saints
    // I Class with Octave
    // src: mr_1962, br_1962, cr_1960
    all_saints: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 11, date: 1 },
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // November 2 - All Souls (Commemoration of All the Faithful Departed)
    // I Class (unique: has privilege to be celebrated on any day of the week)
    // src: mr_1962, br_1962, cr_1960
    // Note: All three Masses may be said by one priest on this day
    all_souls: {
      rank: Ranks.FirstClass,
      precedence: Precedences.PrivilegedFeria_10,
      dateDef: { month: 11, date: 2 },
      commonsDef: Common.None,
      colors: [Colors.Purple, Colors.Black],
      isHolyDayOfObligation: false,
    },

    // December 8 - Immaculate Conception of the Blessed Virgin Mary
    // I Class with Octave, Patroness of the United States
    // src: mr_1962, br_1962, cr_1960
    immaculate_conception_of_the_blessed_virgin_mary: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 12, date: 8 },
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },
  };
}
