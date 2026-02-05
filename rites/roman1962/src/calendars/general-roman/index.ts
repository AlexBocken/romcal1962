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

    // January 2 (or Sunday between Jan 1-6) - Most Holy Name of Jesus
    // II Class
    // Mass: In nómine Jesu
    // Celebrated on Sunday between Jan 1-6, or Jan 2 if no Sunday falls in that range
    // src: mr_1962 (German)
    most_holy_name_of_jesus: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassLordFeast_5,
      dateDef: { dateFn: 'holyNameOfJesus1962' },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // January 2-4 - Ferial days of Christmas Octave
    // IV Class
    // Mass: Puer vom 1. Jan (Mass from Jan 1)
    // Rubrics: Gl, o Cr, Präf v Weihn (Christmas Preface), gew Communicantes
    // src: mr_1962 (German)
    january_2_ferial: {
      rank: Ranks.FourthClass,
      precedence: Precedences.FerialDay_15,
      dateDef: { month: 1, date: 2 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
    },

    january_3_ferial: {
      rank: Ranks.FourthClass,
      precedence: Precedences.FerialDay_15,
      dateDef: { month: 1, date: 3 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
    },

    january_4_ferial: {
      rank: Ranks.FourthClass,
      precedence: Precedences.FerialDay_15,
      dateDef: { month: 1, date: 4 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // January 5 - Ferial day with commemoration of St. Telesphorus, Pope, Martyr
    // IV Class
    // Mass: Puer vom 1. Jan, Gl, 2. Geb v Telesphorus, o Cr, Präf v Weihn
    // Or: Messe Si díligis me v Telesphorus
    // src: mr_1962 (German)
    january_5_ferial: {
      rank: Ranks.FourthClass,
      precedence: Precedences.FerialDay_15,
      dateDef: { month: 1, date: 5 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
    },

    telesphorus_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 1, date: 5 },
      commonsDef: [Common.Martyrs, Common.Pastors_Pope],
      colors: Colors.Red,
    },

    // January 7-12 - Ferial days after Epiphany
    // IV Class
    // Mass: Ecce advénit (Jan 6) before Holy Family, or In excélso throno (1st Sunday after Epiphany) after Holy Family
    // Rubrics: Gl, o Cr, Präf v Erscheinung (Epiphany Preface), gew Communicantes
    // On Saturday: Gedächtnis der allerseligsten Jungfrau Maria (Commemoration of BVM)
    // src: mr_1962 (German)
    january_7_ferial: {
      rank: Ranks.FourthClass,
      precedence: Precedences.FerialDay_15,
      dateDef: { month: 1, date: 7 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
    },

    january_8_ferial: {
      rank: Ranks.FourthClass,
      precedence: Precedences.FerialDay_15,
      dateDef: { month: 1, date: 8 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
    },

    january_9_ferial: {
      rank: Ranks.FourthClass,
      precedence: Precedences.FerialDay_15,
      dateDef: { month: 1, date: 9 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
    },

    january_10_ferial: {
      rank: Ranks.FourthClass,
      precedence: Precedences.FerialDay_15,
      dateDef: { month: 1, date: 10 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // January 11 - Ferial day with commemoration of St. Hyginus, Pope, Martyr
    // IV Class
    // Mass: Ecce advénit or In excélso throno, Gl, 2. Geb v Hyginus, o Cr, Präf v Erscheinung
    // Or: Messe Si díligis me v Hyginus
    // src: mr_1962 (German)
    january_11_ferial: {
      rank: Ranks.FourthClass,
      precedence: Precedences.FerialDay_15,
      dateDef: { month: 1, date: 11 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
    },

    hyginus_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 1, date: 11 },
      commonsDef: [Common.Martyrs, Common.Pastors_Pope],
      colors: Colors.Red,
    },

    january_12_ferial: {
      rank: Ranks.FourthClass,
      precedence: Precedences.FerialDay_15,
      dateDef: { month: 1, date: 12 },
      properCycle: ProperCycles.ProperOfTime,
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // Holy Family: Jesus, Mary, and Joseph
    // II Class
    // Celebrated on the Sunday between Jan 7-12, OR on Jan 13 if it's a Sunday
    // Mass: Exsúltat
    // Rubrics: Gl, ohne 2. Geb (without 2nd collect), Präf v Erscheinung, gew Communicantes
    // src: mr_1962 (German)
    holy_family: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassLordFeast_5,
      dateDef: { dateFn: 'holyFamily1962' },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // January 13 - Commemoration of the Baptism of Our Lord Jesus Christ
    // II Class (when NOT on Sunday)
    // Mass: Ecce advénit
    // Rubrics: Gl, o Cr, gew Communicantes
    // src: mr_1962 (German)
    // Note: If Jan 13 is a Sunday, Holy Family is celebrated instead
    baptism_of_the_lord: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassLordFeast_5,
      dateDef: { dateFn: 'baptismOfTheLord1962' },
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
    // FEBRUARY
    // ========================================================================

    // February 1 - St. Ignatius of Antioch, Bishop, Martyr
    // III Class
    // Mass: Mihi autem, Gl
    // src: mr_1962 (German Schott)
    ignatius_of_antioch_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 2, date: 1 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // February 2 - Purification of the Blessed Virgin Mary (Candlemas / Lichtmeß)
    // II Class (considered a Feast of the Lord)
    // Mass: as in Schott, with blessing of candles and procession
    // Rubrics: Kerzenweihe u Prozession (Blessing of candles and procession)
    // src: mr_1962 (German Schott)
    // Note: Called "Mariä Reinigung" in 1962, "Presentation of the Lord" in 1969
    presentation_of_the_lord: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassLordFeast_5,
      dateDef: { month: 2, date: 2 },
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // February 3 - St. Blaise, Bishop, Martyr
    // IV Class (Commemoration)
    // Mass: Sacerdótes Dei v Blasius, Gl (when celebrated as own Mass)
    // On ferial day: Messe v So, o Gl, 2. Geb v Blasius
    // src: mr_1962 (German Schott)
    blaise_of_sebaste_bishop: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 2, date: 3 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // February 4 - St. Andrew Corsini, Bishop, Confessor
    // III Class
    // Mass: Státuit, Gl
    // src: mr_1962 (German Schott)
    andrew_corsini_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 2, date: 4 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // February 5 - St. Agatha, Virgin, Martyr
    // III Class
    // Mass: Gaudéamus, Gl
    // src: mr_1962 (German Schott)
    agatha_of_sicily_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 2, date: 5 },
      commonsDef: [Common.Virgins, Common.VirginMartyrs],
      colors: Colors.Red,
    },

    // February 6 - St. Titus, Bishop, Confessor
    // III Class, with commemoration of St. Dorothy, Virgin, Martyr
    // Mass: Státuit, Gl, 2. Geb v Dorothea
    // src: mr_1962 (German Schott)
    titus_of_crete_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 2, date: 6 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // February 6 - St. Dorothy, Virgin, Martyr
    // Commemorated with St. Titus
    // src: mr_1962 (German Schott)
    dorothy_of_caesarea_virgin: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 2, date: 6 },
      commonsDef: [Common.Virgins, Common.VirginMartyrs],
      colors: Colors.Red,
    },

    // February 7 - St. Romuald, Abbot
    // III Class
    // Mass: Os justi, Gl
    // src: mr_1962 (German Schott)
    romuald_of_ravenna_abbot: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 2, date: 7 },
      commonsDef: Common.Abbots,
      colors: Colors.White,
    },

    // February 8 - St. John of Matha, Confessor
    // III Class
    // Mass: Os justi, Gl
    // In Lent: Ferial day takes precedence (3. Kl), with comm. of St. John
    // src: mr_1962 (German Schott)
    john_of_matha_priest: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 2, date: 8 },
      commonsDef: Common.Religious,
      colors: Colors.White,
    },

    // February 9 - St. Cyril of Alexandria, Bishop, Confessor, Doctor
    // III Class, with commemoration of St. Apollonia, Virgin, Martyr
    // Mass: In médio, Gl, 2. Geb v Apollonia
    // In Lent: Ferial day takes precedence (3. Kl), with comm. of St. Cyril and St. Apollonia
    // src: mr_1962 (German Schott)
    cyril_of_alexandria_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 2, date: 9 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // February 9 - St. Apollonia, Virgin, Martyr
    // Commemorated with St. Cyril of Alexandria
    // src: mr_1962 (German Schott)
    apollonia_of_alexandria_virgin: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 2, date: 9 },
      commonsDef: [Common.Virgins, Common.VirginMartyrs],
      colors: Colors.Red,
    },

    // February 10 - St. Scholastica, Virgin
    // III Class
    // Mass: Dilexísti, Gl
    // In Lent: Ferial day takes precedence (3. Kl), with comm. of St. Scholastica
    // src: mr_1962 (German Schott)
    scholastica_of_nursia_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 2, date: 10 },
      commonsDef: Common.Virgins,
      colors: Colors.White,
    },

    // February 11 - Apparition of the Blessed Virgin Mary at Lourdes
    // III Class
    // Mass: Vidi, Gl, Marienpräf (Marian Preface)
    // In Lent: Ferial day takes precedence (3. Kl), with comm. of BVM
    // src: mr_1962 (German Schott)
    our_lady_of_lourdes: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 2, date: 11 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // February 12 - Seven Holy Founders of the Servite Order, Confessors
    // III Class
    // Mass: Justi, Gl
    // In Lent: Ferial day takes precedence (3. Kl), with comm. of the Seven Founders
    // src: mr_1962 (German Schott)
    seven_holy_founders_of_the_servite_order: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 2, date: 12 },
      commonsDef: Common.Religious,
      colors: Colors.White,
    },

    // February 14 - St. Valentine, Priest, Martyr
    // IV Class (Commemoration)
    // Mass: In virtúte v Valentin, Gl (when celebrated as own Mass)
    // On ferial day: Messe v So, o Gl, 2. Geb v Valentin
    // src: mr_1962 (German Schott)
    valentine_of_rome_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 2, date: 14 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // February 15 - SS. Faustinus and Jovita, Martyrs
    // IV Class (Commemoration)
    // Mass: Salus autem v Faustinus u Jovita, Gl (when celebrated as own Mass)
    // On ferial day: Messe v So, o Gl, 2. Geb v Faustinus u Jovita
    // src: mr_1962 (German Schott)
    faustinus_and_jovita_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 2, date: 15 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // February 18 - St. Simeon, Bishop, Martyr
    // IV Class (Commemoration)
    // Mass: Státuit v Simeon, Gl (when celebrated as own Mass)
    // On ferial day: Messe v So, o Gl, 2. Geb v Simeon
    // src: mr_1962 (German Schott)
    simeon_of_jerusalem_bishop: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 2, date: 18 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // February 22 - Chair of St. Peter the Apostle (Thronfest des hl. Petrus)
    // II Class, with commemoration of St. Paul the Apostle
    // Mass: Státuit, Gl, prayer of St. Paul under one conclusion with the collect
    // Rubrics: Cr (Credo), Ap-präf (Apostles' Preface)
    // In Lent: 2. Geb v Wo (2nd collect from weekday)
    // src: mr_1962 (German Schott)
    chair_of_saint_peter_the_apostle: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 2, date: 22 },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // February 23 - St. Peter Damian, Bishop, Confessor, Doctor
    // III Class
    // Mass: In médio, Gl
    // In Lent: Ferial day takes precedence (3. Kl), with comm. of St. Peter Damian
    // src: mr_1962 (German Schott)
    peter_damian_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 2, date: 23 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // February 24 - St. Matthias, Apostle
    // II Class
    // Mass: Mihi autem, Gl, Cr, Ap-präf (Apostles' Preface)
    // In Lent: 2. Geb v Wo (2nd collect from weekday)
    // Bissextile: Feb 24 in normal years, Feb 25 in leap years
    // src: mr_1962 (German Schott)
    matthias_apostle: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { dateFn: 'matthiasApostle1962' },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // February 27 - St. Gabriel of Our Lady of Sorrows, Confessor
    // III Class
    // Mass: Oculus, Gl
    // In Lent: Ferial day takes precedence (3. Kl), with comm. of St. Gabriel
    // Bissextile: Feb 27 in normal years, Feb 28 in leap years
    // src: mr_1962 (German Schott)
    gabriel_possenti_religious: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { dateFn: 'gabrielPossenti1962' },
      commonsDef: Common.Religious,
      colors: Colors.White,
    },

    // ========================================================================
    // MARCH
    // ========================================================================

    // March 4 - St. Casimir, Confessor
    // III Class
    // Mass: Os justi, Gl
    // src: mr_1962 (German Schott)
    casimir_of_poland: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 4 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // March 4 - comm. St. Lucius I, Pope, Martyr
    // IV Class (Commemoration)
    // src: mr_1962 (German Schott)
    lucius_i_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 3, date: 4 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // March 6 - SS. Perpetua and Felicity, Martyrs
    // III Class
    // Mass: Me exspectavérunt, Gl
    // src: mr_1962 (German Schott)
    perpetua_of_carthage_and_felicity_of_carthage_martyrs: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 6 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // March 7 - St. Thomas Aquinas, Confessor, Doctor of the Church
    // III Class
    // Mass: In médio, Gl, Cr
    // src: mr_1962 (German Schott)
    thomas_aquinas_priest: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 7 },
      commonsDef: [Common.Confessor, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // March 8 - St. John of God, Confessor
    // III Class
    // Mass: Justus ut palma, Gl
    // src: mr_1962 (German Schott)
    john_of_god_duarte_cidade_religious: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 8 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // March 9 - St. Frances of Rome, Widow
    // III Class
    // Mass: Cognóvi, Gl
    // src: mr_1962 (German Schott)
    frances_of_rome_religious: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 9 },
      commonsDef: Common.HolyWomen,
      colors: Colors.White,
    },

    // March 10 - Forty Holy Martyrs
    // III Class
    // Mass: Intret, Gl
    // src: mr_1962 (German Schott)
    forty_holy_martyrs_of_sebaste: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 10 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // March 12 - St. Gregory I, Pope, Confessor, Doctor of the Church
    // III Class
    // Mass: Sacerdótes tui (from the Common of Popes), Gl
    // src: mr_1962 (German Schott)
    gregory_i_the_great_pope: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 12 },
      commonsDef: [Common.Popes, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // March 17 - St. Patrick, Bishop, Confessor
    // III Class
    // Mass: Státuit, Gl
    // src: mr_1962 (German Schott)
    patrick_of_ireland_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 17 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // March 18 - St. Cyril of Jerusalem, Bishop, Confessor, Doctor of the Church
    // III Class
    // Mass: In médio, Gl
    // src: mr_1962 (German Schott)
    cyril_of_jerusalem_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 18 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // March 19 - St. Joseph, Spouse of the Blessed Virgin Mary, Confessor
    // I Class, Patron of the Universal Church
    // Mass: Justus ut palma, Gl, Cr, Pref
    // src: mr_1962, br_1962, cr_1960 (German Schott)
    joseph_spouse_of_mary: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 3, date: 19 },
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // March 21 - St. Benedict, Abbot
    // III Class
    // Mass: Os justi, Gl
    // src: mr_1962 (German Schott)
    benedict_of_nursia_abbot: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 21 },
      commonsDef: Common.Abbots,
      colors: Colors.White,
    },

    // March 24 - St. Gabriel the Archangel
    // III Class
    // Mass: Benedícite Dóminum, Gl
    // src: mr_1962 (German Schott)
    gabriel_archangel: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 24 },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // March 25 - Annunciation of the Blessed Virgin Mary
    // I Class
    // Mass: Vultum tuum, Gl, Cr, Pref
    // src: mr_1962, br_1962, cr_1960 (German Schott)
    annunciation_of_the_lord: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 3, date: 25 },
      commonsDef: Common.None,
      colors: Colors.White,
      isHolyDayOfObligation: true,
    },

    // March 27 - St. John Damascene, Confessor, Doctor of the Church
    // III Class
    // Mass: In médio, Gl
    // src: mr_1962 (German Schott)
    john_damascene_priest: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 27 },
      commonsDef: [Common.Confessor, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // March 28 - St. John of Capistrano, Confessor
    // III Class
    // Mass: Justus ut palma, Gl
    // src: mr_1962 (German Schott)
    john_of_capistrano_priest: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 3, date: 28 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // ========================================================================
    // APRIL
    // ========================================================================

    // April 2 - comm. St. Francis of Paola, Confessor
    // IV Class (Commemoration)
    // src: mr_1962 (German Schott)
    francis_of_paola_hermit: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 4, date: 2 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // April 4 - St. Isidore of Seville, Bishop, Confessor, Doctor of the Church
    // III Class
    // Mass: In médio, Gl
    // src: mr_1962 (German Schott)
    isidore_of_seville_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 4 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // April 5 - St. Vincent Ferrer, Confessor
    // III Class
    // Mass: Justus ut palma, Gl
    // src: mr_1962 (German Schott)
    vincent_ferrer_priest: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 5 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // April 11 - St. Leo I, Pope, Confessor, Doctor of the Church
    // III Class
    // Mass: Si dilígis me (from the Common of Popes), Gl
    // src: mr_1962 (German Schott)
    leo_i_the_great_pope: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 11 },
      commonsDef: [Common.Popes, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // April 13 - St. Hermenegild, Martyr
    // III Class
    // Mass: Protexísti, Gl
    // src: mr_1962 (German Schott)
    hermenegild_martyr: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 13 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // April 14 - St. Justin, Martyr
    // III Class
    // Mass: Laetábitur, Gl
    // src: mr_1962 (German Schott)
    justin_martyr: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 14 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // April 14 - comm. SS. Tiburtius, Valerian, and Maximus, Martyrs
    // IV Class (Commemoration)
    // src: mr_1962 (German Schott)
    tiburtius_valerian_and_maximus_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 4, date: 14 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // April 17 - comm. St. Anicetus, Pope, Martyr
    // IV Class (Commemoration)
    // src: mr_1962 (German Schott)
    anicetus_i_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 4, date: 17 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // April 21 - St. Anselm, Bishop, Confessor, Doctor of the Church
    // III Class
    // Mass: In médio, Gl
    // src: mr_1962 (German Schott)
    anselm_of_canterbury_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 21 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // April 22 - SS. Soter and Cajus, Popes, Martyrs
    // III Class
    // Mass: Intret, Gl
    // src: mr_1962 (German Schott)
    soter_and_cajus_popes: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 22 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // April 23 - comm. St. George, Martyr
    // IV Class (Commemoration)
    // src: mr_1962 (German Schott)
    george_of_lydda_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 4, date: 23 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // April 24 - St. Fidelis of Sigmaringen, Martyr
    // III Class
    // Mass: Laetábitur, Gl
    // src: mr_1962 (German Schott)
    fidelis_of_sigmaringen_priest: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 24 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // April 25 - St. Mark, Evangelist
    // II Class
    // Mass: Protexísti, Gl, Cr, Pref
    // src: mr_1962 (German Schott)
    mark_evangelist: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 4, date: 25 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // April 26 - SS. Cletus and Marcellinus, Popes, Martyrs
    // III Class
    // Mass: Intret, Gl
    // src: mr_1962 (German Schott)
    cletus_and_marcellinus_popes: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 26 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // April 27 - St. Peter Canisius, Confessor, Doctor of the Church
    // III Class
    // Mass: In médio, Gl
    // src: mr_1962 (German Schott)
    peter_canisius_priest: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 27 },
      commonsDef: [Common.Confessor, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // April 28 - St. Paul of the Cross, Confessor
    // III Class
    // Mass: Os justi, Gl
    // src: mr_1962 (German Schott)
    paul_of_the_cross_priest: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 28 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // April 29 - St. Peter of Verona, Martyr
    // III Class
    // Mass: Protexísti, Gl
    // src: mr_1962 (German Schott)
    peter_of_verona_martyr: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 29 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // April 30 - St. Catherine of Siena, Virgin
    // III Class
    // Mass: Dilexísti, Gl
    // src: mr_1962 (German Schott)
    catherine_of_siena_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 4, date: 30 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // ========================================================================
    // MAY - DECEMBER (Major Feasts Only - To Be Expanded)
    // ========================================================================

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
