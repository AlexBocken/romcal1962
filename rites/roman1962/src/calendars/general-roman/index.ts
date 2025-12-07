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
    // JANUARY
    // ========================================================================

    // January 1 - Octave Day of the Nativity / Circumcision of the Lord
    // I Class with Octave
    // Mass: Puer (as in Schott Missal)
    // Rubrics: Gl, o Cr, Präf v Weihn (Christmas Preface), gew Communicantes
    // src: mr_1962 (German), br_1962, cr_1960
    octave_day_of_the_nativity_circumcision: {
      rank: Ranks.FirstClass,
      precedence: Precedences.ProperOfTimeSolemnity_2,
      dateDef: { month: 1, date: 1 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // January 6 - Epiphany of the Lord (Erscheinung des Herrn)
    // I Class with Octave
    // Mass: Ecce advénit
    // Rubrics: Gl, Cr, eig Präf (Proper Preface of Epiphany), eig Communicantes
    // src: mr_1962 (German), br_1962, cr_1960
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

    // January 13 - Commemoration of the Baptism of Our Lord Jesus Christ
    // II Class (when not on Sunday)
    // Mass: Ecce advénit
    // Rubrics: Gl, o Cr, gew Communicantes
    // src: mr_1962 (German)
    // Note: Falls on Sunday after Epiphany when that Sunday exists
    baptism_of_the_lord: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassLordFeast_5,
      dateDef: { month: 1, date: 13 },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // January 14 - St. Hilary, Bishop, Confessor, Doctor
    // III Class, with commemoration of St. Felix, Priest, Martyr
    // Mass: In médio
    // Rubrics: Gl, 2. Geb v Felix (2nd collect of St. Felix)
    // src: mr_1962 (German)
    hilary_of_poitiers_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 14 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // January 14 - St. Felix, Priest, Martyr
    // Commemorated with St. Hilary
    // src: mr_1962 (German)
    felix_of_nola_priest: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 1, date: 14 },
      commonsDef: [Common.Pastors, Common.Martyrs],
      colors: Colors.Red,
    },

    // January 15 - St. Paul the First Hermit, Confessor
    // III Class, with commemoration of St. Maurus, Abbot
    // Mass: Justus
    // Rubrics: Gl, 2. Geb v Maurus (2nd collect of St. Maurus)
    // src: mr_1962 (German)
    paul_the_hermit: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 15 },
      commonsDef: Common.Abbots,
      colors: Colors.White,
    },

    // January 15 - St. Maurus, Abbot
    // Commemorated with St. Paul the Hermit
    // src: mr_1962 (German)
    maurus_of_subiaco_abbot: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 1, date: 15 },
      commonsDef: Common.Abbots,
      colors: Colors.White,
    },

    // January 16 - St. Marcellus I, Pope, Martyr
    // III Class
    // Mass: Si díligis me
    // Rubrics: Gl
    // src: mr_1962 (German)
    marcellus_i_pope: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 16 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // January 17 - St. Anthony, Abbot
    // III Class
    // Mass: Os justi
    // Rubrics: Gl
    // src: mr_1962 (German)
    anthony_of_egypt_abbot: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 17 },
      commonsDef: Common.Abbots,
      colors: Colors.White,
    },

    // January 18 - St. Prisca, Virgin, Martyr
    // IV Class (Commemoration)
    // Mass: Me exspectavérunt
    // Rubrics: Gl (when celebrated as votive Mass)
    // src: mr_1962 (German)
    // Note: Usually commemorated on weekday Mass
    prisca_of_rome_virgin: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 1, date: 18 },
      commonsDef: [Common.Virgins, Common.VirginMartyrs],
      colors: Colors.Red,
    },

    // January 19 - SS. Marius, Martha, Audifax, and Abachum, Martyrs
    // IV Class (Commemoration)
    // Mass: Justi epuléntur (when celebrated)
    // Rubrics: Gl, with 2nd collect of St. Canute
    // src: mr_1962 (German)
    marius_martha_audifax_abachum_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 1, date: 19 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // January 19 - St. Canute (Knud), King, Martyr
    // IV Class (Commemoration)
    // Mass: In virtúte (when celebrated)
    // Commemorated with SS. Marius and Companions
    // src: mr_1962 (German)
    canute_of_denmark_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 1, date: 19 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // January 20 - SS. Fabian, Pope, and Sebastian, Martyrs
    // III Class
    // Mass: Intret
    // Rubrics: Gl
    // src: mr_1962 (German)
    fabian_i_pope_and_sebastian_martyrs: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 20 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // January 21 - St. Agnes, Virgin, Martyr
    // III Class
    // Mass: Me exspectavérunt
    // Rubrics: Gl
    // src: mr_1962 (German)
    agnes_of_rome_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 21 },
      commonsDef: [Common.Virgins, Common.VirginMartyrs],
      colors: Colors.Red,
    },

    // January 22 - SS. Vincent and Anastasius, Martyrs
    // III Class
    // Mass: Intret
    // Rubrics: Gl
    // src: mr_1962 (German)
    vincent_and_anastasius_martyrs: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 22 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // January 23 - St. Raymond of Penyafort, Confessor
    // III Class, with commemoration of St. Emerentiana, Virgin, Martyr
    // Mass: Os justi
    // Rubrics: Gl, 2. Geb v Emerentiana
    // src: mr_1962 (German)
    raymond_of_penyafort_priest: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 23 },
      commonsDef: Common.Pastors,
      colors: Colors.White,
    },

    // January 23 - St. Emerentiana, Virgin, Martyr
    // Commemorated with St. Raymond
    // src: mr_1962 (German)
    emerentiana_of_rome_virgin: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 1, date: 23 },
      commonsDef: [Common.Virgins, Common.VirginMartyrs],
      colors: Colors.Red,
    },

    // January 24 - St. Timothy, Bishop, Martyr
    // III Class
    // Mass: Státuit
    // Rubrics: Gl
    // src: mr_1962 (German)
    timothy_of_ephesus_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 24 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // January 25 - Conversion of St. Paul the Apostle
    // III Class, with commemoration of St. Peter the Apostle
    // Mass: Scio
    // Rubrics: Gl, Prayer of St. Peter under one conclusion with the collect,
    // Ap-präf (Apostles' Preface)
    // src: mr_1962 (German)
    conversion_of_saint_paul_the_apostle: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 25 },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // January 26 - St. Polycarp, Bishop, Martyr
    // III Class
    // Mass: Sacerdótes Dei
    // Rubrics: Gl
    // src: mr_1962 (German)
    polycarp_of_smyrna_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 26 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // January 27 - St. John Chrysostom, Bishop, Confessor, Doctor
    // III Class
    // Mass: In médio
    // Rubrics: Gl
    // src: mr_1962 (German)
    john_chrysostom_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 27 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // January 28 - St. Peter Nolasco, Confessor
    // III Class, with commemoration of St. Agnes (second time)
    // Mass: Justus
    // Rubrics: Gl, 2. Geb v Agnes
    // src: mr_1962 (German)
    peter_nolasco_religious: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 28 },
      commonsDef: Common.Religious,
      colors: Colors.White,
    },

    // January 28 - St. Agnes (Second Feast)
    // Commemorated with St. Peter Nolasco
    // src: mr_1962 (German)
    agnes_of_rome_virgin_second: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 1, date: 28 },
      commonsDef: [Common.Virgins, Common.VirginMartyrs],
      colors: Colors.Red,
    },

    // January 29 - St. Francis de Sales, Bishop, Confessor, Doctor
    // III Class
    // Mass: In médio
    // Rubrics: Gl
    // src: mr_1962 (German)
    francis_de_sales_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 29 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // January 30 - St. Martina, Virgin, Martyr
    // III Class
    // Mass: Loquébar
    // Rubrics: Gl
    // src: mr_1962 (German)
    martina_of_rome_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 30 },
      commonsDef: [Common.Virgins, Common.VirginMartyrs],
      colors: Colors.Red,
    },

    // January 31 - St. John Bosco, Confessor
    // III Class
    // Mass: Dedit
    // Rubrics: Gl
    // src: mr_1962 (German)
    john_bosco_priest: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 1, date: 31 },
      commonsDef: Common.Pastors,
      colors: Colors.White,
    },

    // ========================================================================
    // FEBRUARY - DECEMBER (Major Feasts Only - To Be Expanded)
    // ========================================================================

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
