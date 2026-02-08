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
      commonsDef: [Common.Popes, Common.Martyrs],
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
      commonsDef: [Common.Popes, Common.Martyrs],
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
    // MAY
    // ========================================================================

    // May 1 - St. Joseph the Worker
    // I Class
    // src: mr_1962 (German Schott)
    joseph_the_worker: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 5, date: 1 },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // May 2 - St. Athanasius, Bishop, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    athanasius_of_alexandria_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 2 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // May 3 - Comm. SS. Alexander, Eventius, Theodulus, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    alexander_eventius_and_theodulus_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 5, date: 3 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // May 3 - Comm. St. Juvenal, Bishop, Confessor
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    juvenal_of_narni_bishop: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 5, date: 3 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // May 4 - St. Monica, Widow
    // III Class
    // src: mr_1962 (German Schott)
    monica_of_hippo: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 4 },
      commonsDef: Common.HolyWomen,
      colors: Colors.White,
    },

    // May 5 - St. Pius V, Pope, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    pius_v_pope: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 5 },
      commonsDef: [Common.Popes, Common.Confessor],
      colors: Colors.White,
    },

    // May 7 - St. Stanislaus, Bishop, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    stanislaus_of_krakow_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 7 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // May 9 - St. Gregory of Nazianzus, Bishop, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    gregory_of_nazianzus_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 9 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // May 10 - St. Antoninus, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    antoninus_of_florence_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 10 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // May 10 - Comm. SS. Gordian and Epimachus, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    gordian_and_epimachus_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 5, date: 10 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // May 11 - SS. Philip and James, Apostles
    // II Class
    // src: mr_1962 (German Schott)
    philip_and_james_apostles: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 5, date: 11 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // May 12 - SS. Nereus, Achilleus, Domitilla, and Pancras, Martyrs
    // III Class
    // src: mr_1962 (German Schott)
    nereus_achilleus_domitilla_and_pancras_martyrs: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 12 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // May 13 - St. Robert Bellarmine, Bishop, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    robert_bellarmine_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 13 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // May 14 - Comm. St. Boniface of Tarsus, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    boniface_of_tarsus_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 5, date: 14 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // May 15 - St. John Baptist de la Salle, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    john_baptist_de_la_salle: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 15 },
      commonsDef: [Common.Confessor, Common.Educators],
      colors: Colors.White,
    },

    // May 16 - St. Ubald, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    ubald_of_gubbio_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 16 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // May 17 - St. Paschal Baylon, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    paschal_baylon: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 17 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // May 18 - St. Venantius, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    venantius_of_camerino_martyr: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 18 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // May 19 - St. Peter Celestine, Pope, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    peter_celestine_pope: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 19 },
      commonsDef: [Common.Popes, Common.Confessor],
      colors: Colors.White,
    },

    // May 19 - Comm. St. Pudentiana, Virgin
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    pudentiana_of_rome_virgin: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 5, date: 19 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // May 20 - St. Bernardine of Siena, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    bernardine_of_siena: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 20 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // May 25 - St. Gregory VII, Pope, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    gregory_vii_pope: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 25 },
      commonsDef: [Common.Popes, Common.Confessor],
      colors: Colors.White,
    },

    // May 25 - Comm. St. Urban I, Pope, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    urban_i_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 5, date: 25 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // May 26 - St. Philip Neri, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    philip_neri: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 26 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // May 26 - Comm. St. Eleutherius, Pope, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    eleutherius_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 5, date: 26 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // May 27 - St. Bede the Venerable, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    bede_the_venerable: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 27 },
      commonsDef: [Common.Confessor, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // May 27 - Comm. St. John I, Pope, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    john_i_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 5, date: 27 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // May 28 - St. Augustine of Canterbury, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    augustine_of_canterbury_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 28 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // May 29 - St. Mary Magdalene de Pazzi, Virgin
    // III Class
    // src: mr_1962 (German Schott)
    mary_magdalene_de_pazzi_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 5, date: 29 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // May 30 - Comm. St. Felix I, Pope, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    felix_i_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 5, date: 30 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // May 31 - Queenship of the Blessed Virgin Mary
    // II Class
    // src: mr_1962 (German Schott)
    queenship_of_mary: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 5, date: 31 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // May 31 - Comm. St. Petronilla, Virgin
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    petronilla_of_rome_virgin: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 5, date: 31 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // ========================================================================
    // JUNE
    // ========================================================================

    // June 1 - St. Angela Merici, Virgin
    // III Class
    // src: mr_1962 (German Schott)
    angela_merici_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 1 },
      commonsDef: [Common.Virgin, Common.Founders],
      colors: Colors.White,
    },

    // June 2 - Comm. SS. Marcellinus, Peter, and Erasmus, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    marcellinus_peter_and_erasmus_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 6, date: 2 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // June 4 - St. Francis Caracciolo, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    francis_caracciolo: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 4 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // June 5 - St. Boniface, Bishop, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    boniface_of_mainz_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 5 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // June 6 - St. Norbert, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    norbert_of_xanten_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 6 },
      commonsDef: [Common.Bishops, Common.Founders],
      colors: Colors.White,
    },

    // June 9 - Comm. SS. Primus and Felician, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    primus_and_felician_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 6, date: 9 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // June 10 - St. Margaret of Scotland, Widow
    // III Class
    // src: mr_1962 (German Schott)
    margaret_of_scotland: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 10 },
      commonsDef: Common.HolyWomen,
      colors: Colors.White,
    },

    // June 11 - St. Barnabas, Apostle
    // III Class
    // src: mr_1962 (German Schott)
    barnabas_apostle: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 11 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // June 12 - St. John of San Facundo, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    john_of_sahagun: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 12 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // June 12 - Comm. SS. Basilides, Cyrinus, Nabor, and Nazarius, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    basilides_cyrinus_nabor_and_nazarius_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 6, date: 12 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // June 13 - St. Anthony of Padua, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    anthony_of_padua: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 13 },
      commonsDef: [Common.Confessor, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // June 14 - St. Basil the Great, Bishop, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    basil_the_great_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 14 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // June 15 - Comm. SS. Vitus, Modestus, and Crescentia, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    vitus_modestus_and_crescentia_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 6, date: 15 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // June 17 - St. Gregory Barbarigo, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    gregory_barbarigo_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 17 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // June 18 - St. Ephrem the Syrian, Deacon, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    ephrem_the_syrian_deacon: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 18 },
      commonsDef: [Common.Deacon, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // June 18 - Comm. SS. Mark and Marcellian, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    mark_and_marcellian_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 6, date: 18 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // June 19 - St. Juliana of Falconieri, Virgin
    // III Class
    // src: mr_1962 (German Schott)
    juliana_of_falconieri_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 19 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // June 19 - Comm. SS. Gervasius and Protasius, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    gervasius_and_protasius_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 6, date: 19 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // June 20 - Comm. St. Silverius, Pope, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    silverius_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 6, date: 20 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // June 21 - St. Aloysius Gonzaga, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    aloysius_gonzaga: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 21 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // June 22 - St. Paulinus, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    paulinus_of_nola_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 22 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // June 23 - Vigil of the Nativity of St. John the Baptist
    // II Class
    // src: mr_1962 (German Schott)
    vigil_of_john_the_baptist: {
      rank: Ranks.SecondClass,
      precedence: Precedences.VigilOfFirstOrSecondClass_8,
      dateDef: { month: 6, date: 23 },
      commonsDef: Common.None,
      colors: Colors.Purple,
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

    // June 25 - St. William, Abbot
    // III Class
    // src: mr_1962 (German Schott)
    william_of_vercelli_abbot: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 25 },
      commonsDef: Common.Abbots,
      colors: Colors.White,
    },

    // June 26 - SS. John and Paul, Martyrs
    // III Class
    // src: mr_1962 (German Schott)
    john_and_paul_martyrs: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 26 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // June 28 - Vigil of SS. Peter and Paul, Apostles
    // II Class
    // src: mr_1962 (German Schott)
    vigil_of_peter_and_paul: {
      rank: Ranks.SecondClass,
      precedence: Precedences.VigilOfFirstOrSecondClass_8,
      dateDef: { month: 6, date: 28 },
      commonsDef: Common.None,
      colors: Colors.Purple,
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

    // June 30 - Commemoration of St. Paul the Apostle
    // III Class
    // src: mr_1962 (German Schott)
    commemoration_of_saint_paul_apostle: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 6, date: 30 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // ========================================================================
    // JULY
    // ========================================================================

    // July 1 - Most Precious Blood of Our Lord Jesus Christ
    // I Class
    // src: mr_1962 (German Schott)
    most_precious_blood: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 7, date: 1 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // July 2 - Visitation of the Blessed Virgin Mary
    // II Class
    // src: mr_1962 (German Schott)
    visitation_of_the_blessed_virgin_mary: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 7, date: 2 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // July 2 - Comm. SS. Processus and Martinian, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    processus_and_martinian_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 2 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // July 3 - St. Irenaeus, Bishop, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    irenaeus_of_lyon_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 3 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // July 5 - St. Anthony Mary Zaccaria, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    anthony_mary_zaccaria: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 5 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // July 7 - SS. Cyril and Methodius, Bishops, Confessors
    // III Class
    // src: mr_1962 (German Schott)
    cyril_and_methodius_bishops: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 7 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // July 8 - St. Elizabeth of Portugal, Widow
    // III Class
    // src: mr_1962 (German Schott)
    elizabeth_of_portugal: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 8 },
      commonsDef: Common.HolyWomen,
      colors: Colors.White,
    },

    // July 10 - Seven Holy Brothers, Martyrs, and SS. Rufina and Secunda, Virgin Martyrs
    // III Class
    // src: mr_1962 (German Schott)
    seven_brothers_rufina_and_secunda_martyrs: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 10 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // July 11 - Comm. St. Pius I, Pope, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    pius_i_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 11 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // July 12 - St. John Gualbert, Abbot
    // III Class
    // src: mr_1962 (German Schott)
    john_gualbert_abbot: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 12 },
      commonsDef: Common.Abbots,
      colors: Colors.White,
    },

    // July 12 - Comm. SS. Nabor and Felix, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    nabor_and_felix_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 12 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // July 14 - St. Bonaventure, Bishop, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    bonaventure_of_bagnoregio_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 14 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // July 15 - St. Henry II, Emperor, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    henry_ii_emperor: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 15 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // July 16 - Comm. Our Lady of Mount Carmel
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    our_lady_of_mount_carmel: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 16 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // July 17 - Comm. St. Alexius, Confessor
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    alexius_of_rome: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 17 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // July 18 - St. Camillus de Lellis, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    camillus_de_lellis: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 18 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // July 18 - Comm. St. Symphorosa and her Seven Sons, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    symphorosa_and_seven_sons_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 18 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // July 19 - St. Vincent de Paul, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    vincent_de_paul: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 19 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // July 20 - St. Jerome Emiliani, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    jerome_emiliani: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 20 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // July 20 - Comm. St. Margaret of Antioch, Virgin, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    margaret_of_antioch_virgin: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 20 },
      commonsDef: Common.VirginMartyrs,
      colors: Colors.Red,
    },

    // July 21 - St. Lawrence of Brindisi, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    lawrence_of_brindisi: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 21 },
      commonsDef: [Common.Confessor, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // July 21 - Comm. St. Praxedes, Virgin
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    praxedes_virgin: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 21 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // July 22 - St. Mary Magdalene, Penitent
    // III Class
    // src: mr_1962 (German Schott)
    mary_magdalene: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 22 },
      commonsDef: Common.HolyWomen,
      colors: Colors.White,
    },

    // July 23 - St. Apollinaris, Bishop, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    apollinaris_of_ravenna_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 23 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // July 23 - Comm. St. Liborius, Bishop, Confessor
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    liborius_of_le_mans_bishop: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 23 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // July 24 - Comm. St. Christina, Virgin, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    christina_of_bolsena_virgin: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 24 },
      commonsDef: Common.VirginMartyrs,
      colors: Colors.Red,
    },

    // July 25 - St. James the Greater, Apostle
    // II Class
    // src: mr_1962 (German Schott)
    james_apostle: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 7, date: 25 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // July 25 - Comm. St. Christopher, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    christopher_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 25 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // July 26 - St. Anne, Mother of the Blessed Virgin Mary
    // II Class
    // src: mr_1962 (German Schott)
    anne_mother_of_mary: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 7, date: 26 },
      commonsDef: Common.HolyWomen,
      colors: Colors.White,
    },

    // July 27 - Comm. St. Pantaleon, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    pantaleon_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 27 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // July 28 - SS. Nazarius, Celsus, Victor I, and Innocent I
    // III Class
    // src: mr_1962 (German Schott)
    nazarius_celsus_victor_i_and_innocent_i: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 28 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // July 29 - St. Martha, Virgin
    // III Class
    // src: mr_1962 (German Schott)
    martha_of_bethany: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 29 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // July 29 - Comm. SS. Felix, Simplicius, Faustinus, and Beatrix, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    felix_simplicius_faustinus_and_beatrix_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 29 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // July 30 - Comm. SS. Abdon and Sennen, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    abdon_and_sennen_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 7, date: 30 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // July 31 - St. Ignatius of Loyola, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    ignatius_of_loyola: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 7, date: 31 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // ========================================================================
    // AUGUST
    // ========================================================================

    // August 1 - Comm. Holy Maccabees, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    holy_machabees_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 1 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 2 - St. Alphonsus Liguori, Bishop, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    alphonsus_liguori_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 2 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // August 2 - Comm. St. Stephen I, Pope, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    stephen_i_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 2 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // August 4 - St. Dominic, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    dominic_de_guzman: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 4 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // August 5 - Dedication of the Basilica of St. Mary Major
    // III Class
    // src: mr_1962 (German Schott)
    dedication_of_saint_mary_major: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 5 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // August 6 - Transfiguration of Our Lord Jesus Christ
    // II Class
    // src: mr_1962 (German Schott)
    transfiguration_of_the_lord: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassLordFeast_5,
      dateDef: { month: 8, date: 6 },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // August 6 - Comm. SS. Sixtus II, Felicissimus, and Agapitus, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    sixtus_ii_felicissimus_and_agapitus_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 6 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 7 - St. Cajetan, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    cajetan_of_thiene: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 7 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // August 7 - Comm. St. Donatus, Bishop, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    donatus_of_arezzo_bishop: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 7 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // August 8 - St. John Mary Vianney, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    john_mary_vianney: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 8 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // August 8 - Comm. SS. Cyriacus, Largus, and Smaragdus, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    cyriacus_largus_and_smaragdus_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 8 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 9 - Vigil of St. Lawrence
    // III Class
    // src: mr_1962 (German Schott)
    vigil_of_saint_lawrence: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.VigilOfThirdClass_12,
      dateDef: { month: 8, date: 9 },
      commonsDef: Common.None,
      colors: Colors.Purple,
    },

    // August 9 - Comm. St. Romanus, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    romanus_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 9 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 10 - St. Lawrence, Martyr
    // II Class
    // src: mr_1962 (German Schott)
    lawrence_of_rome_deacon: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 8, date: 10 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 11 - Comm. SS. Tiburtius and Susanna, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    tiburtius_and_susanna_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 11 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 12 - St. Clare, Virgin
    // III Class
    // src: mr_1962 (German Schott)
    clare_of_assisi_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 12 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // August 13 - Comm. SS. Hippolytus and Cassian, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    hippolytus_and_cassian_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 13 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 14 - Vigil of the Assumption
    // II Class
    // src: mr_1962 (German Schott)
    vigil_of_the_assumption: {
      rank: Ranks.SecondClass,
      precedence: Precedences.VigilOfFirstOrSecondClass_8,
      dateDef: { month: 8, date: 14 },
      commonsDef: Common.None,
      colors: Colors.Purple,
    },

    // August 14 - Comm. St. Eusebius, Confessor
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    eusebius_of_rome_confessor: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 14 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
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

    // August 16 - St. Joachim, Father of the Blessed Virgin Mary
    // II Class
    // src: mr_1962 (German Schott)
    joachim_father_of_mary: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 8, date: 16 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // August 17 - St. Hyacinth, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    hyacinth_of_poland: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 17 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // August 18 - Comm. St. Agapitus, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    agapitus_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 18 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 19 - St. John Eudes, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    john_eudes: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 19 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // August 20 - St. Bernard, Abbot, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    bernard_of_clairvaux_abbot: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 20 },
      commonsDef: [Common.Abbots, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // August 21 - St. Jane Frances de Chantal, Widow
    // III Class
    // src: mr_1962 (German Schott)
    jane_frances_de_chantal: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 21 },
      commonsDef: Common.HolyWomen,
      colors: Colors.White,
    },

    // August 22 - Immaculate Heart of the Blessed Virgin Mary
    // II Class
    // src: mr_1962 (German Schott)
    immaculate_heart_of_mary: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 8, date: 22 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // August 22 - Comm. SS. Timothy and Companions, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    timothy_and_companions_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 22 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 23 - St. Philip Benizi, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    philip_benizi: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 23 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // August 24 - St. Bartholomew, Apostle
    // II Class
    // src: mr_1962 (German Schott)
    bartholomew_apostle: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 8, date: 24 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // August 25 - St. Louis IX, King, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    louis_ix_of_france: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 25 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // August 26 - Comm. St. Zephyrinus, Pope, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    zephyrinus_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 26 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // August 27 - St. Joseph Calasanz, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    joseph_calasanz: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 27 },
      commonsDef: [Common.Confessor, Common.Educators],
      colors: Colors.White,
    },

    // August 28 - St. Augustine, Bishop, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    augustine_of_hippo_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 28 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // August 28 - Comm. St. Hermes, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    hermes_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 28 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 29 - Beheading of St. John the Baptist
    // III Class
    // src: mr_1962 (German Schott)
    beheading_of_saint_john_the_baptist: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 29 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // August 29 - Comm. St. Sabina, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    sabina_of_rome_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 29 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 30 - St. Rose of Lima, Virgin
    // III Class
    // src: mr_1962 (German Schott)
    rose_of_lima_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 30 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // August 30 - Comm. SS. Felix and Adauctus, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    felix_and_adauctus_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 8, date: 30 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // August 31 - St. Raymond Nonnatus, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    raymond_nonnatus: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 8, date: 31 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // ========================================================================
    // SEPTEMBER
    // ========================================================================

    // September 1 - Comm. St. Giles, Abbot
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    giles_abbot: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 1 },
      commonsDef: Common.Abbots,
      colors: Colors.White,
    },

    // September 1 - Comm. Twelve Holy Brothers, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    twelve_brothers_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 1 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 2 - St. Stephen of Hungary, King, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    stephen_of_hungary: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 2 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // September 3 - St. Pius X, Pope, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    pius_x_pope: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 3 },
      commonsDef: [Common.Popes, Common.Confessor],
      colors: Colors.White,
    },

    // September 5 - St. Lawrence Justinian, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    lawrence_justinian_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 5 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // September 8 - Nativity of the Blessed Virgin Mary
    // II Class
    // src: mr_1962 (German Schott)
    nativity_of_the_blessed_virgin_mary: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 9, date: 8 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // September 8 - Comm. St. Hadrian, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    hadrian_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 8 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 9 - Comm. St. Gorgonius, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    gorgonius_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 9 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 10 - St. Nicholas of Tolentino, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    nicholas_of_tolentino: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 10 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // September 11 - Comm. SS. Protus and Hyacinth, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    protus_and_hyacinth_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 11 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 12 - Holy Name of Mary
    // III Class
    // src: mr_1962 (German Schott)
    holy_name_of_mary: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 12 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // September 14 - Exaltation of the Holy Cross
    // II Class
    // src: mr_1962 (German Schott)
    exaltation_of_the_holy_cross: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassLordFeast_5,
      dateDef: { month: 9, date: 14 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // September 15 - Seven Sorrows of the Blessed Virgin Mary
    // II Class
    // src: mr_1962 (German Schott)
    seven_sorrows_of_the_blessed_virgin_mary: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 9, date: 15 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // September 15 - Comm. St. Nicodemus, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    nicodemus_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 15 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 16 - SS. Cornelius, Pope, and Cyprian, Bishop, Martyrs
    // III Class
    // src: mr_1962 (German Schott)
    cornelius_and_cyprian_martyrs: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 16 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 16 - Comm. SS. Euphemia, Lucy, and Geminianus, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    euphemia_lucia_and_geminianus_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 16 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 17 - Comm. Stigmata of St. Francis
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    stigmata_of_saint_francis: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 17 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // September 18 - St. Joseph of Cupertino, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    joseph_of_cupertino: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 18 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // September 19 - St. Januarius, Bishop, and Companions, Martyrs
    // III Class
    // src: mr_1962 (German Schott)
    januarius_and_companions_martyrs: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 19 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // September 20 - Comm. SS. Eustace and Companions, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    eustace_and_companions_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 20 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 21 - St. Matthew, Apostle, Evangelist
    // II Class
    // src: mr_1962 (German Schott)
    matthew_apostle: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 9, date: 21 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // September 22 - St. Thomas of Villanova, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    thomas_of_villanova_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 22 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // September 22 - Comm. SS. Maurice and Companions, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    maurice_and_companions_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 22 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 23 - St. Linus, Pope, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    linus_pope: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 23 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // September 23 - Comm. St. Thecla, Virgin, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    thecla_virgin: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 23 },
      commonsDef: Common.VirginMartyrs,
      colors: Colors.Red,
    },

    // September 24 - Comm. Our Lady of Ransom
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    our_lady_of_ransom: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 24 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // September 26 - Comm. SS. Cyprian and Justina, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    cyprian_and_justina_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 9, date: 26 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 27 - SS. Cosmas and Damian, Martyrs
    // III Class
    // src: mr_1962 (German Schott)
    cosmas_and_damian_martyrs: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 27 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 28 - St. Wenceslaus, Duke, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    wenceslaus_of_bohemia_martyr: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 28 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // September 29 - Dedication of St. Michael the Archangel
    // I Class
    // src: mr_1962 (German Schott)
    dedication_of_saint_michael_archangel: {
      rank: Ranks.FirstClass,
      precedence: Precedences.GeneralFirstClassFeast_3,
      dateDef: { month: 9, date: 29 },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // September 30 - St. Jerome, Priest, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    jerome_of_stridon: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 9, date: 30 },
      commonsDef: [Common.Pastors, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // ========================================================================
    // OCTOBER
    // ========================================================================

    // October 1 - Comm. St. Remigius, Bishop, Confessor
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    remigius_of_reims_bishop: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 10, date: 1 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // October 2 - Holy Guardian Angels
    // III Class
    // src: mr_1962 (German Schott)
    guardian_angels: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 2 },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // October 3 - St. Therese of the Child Jesus, Virgin
    // III Class
    // src: mr_1962 (German Schott)
    therese_of_the_child_jesus_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 3 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // October 4 - St. Francis of Assisi, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    francis_of_assisi: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 4 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // October 5 - Comm. SS. Placid and Companions, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    placid_and_companions_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 10, date: 5 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // October 6 - St. Bruno, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    bruno_of_cologne: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 6 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // October 7 - Our Lady of the Rosary
    // II Class
    // src: mr_1962 (German Schott)
    our_lady_of_the_rosary: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 10, date: 7 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // October 7 - Comm. St. Mark I, Pope, Confessor
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    mark_i_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 10, date: 7 },
      commonsDef: [Common.Popes, Common.Confessor],
      colors: Colors.White,
    },

    // October 8 - St. Bridget of Sweden, Widow
    // III Class
    // src: mr_1962 (German Schott)
    bridget_of_sweden: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 8 },
      commonsDef: Common.HolyWomen,
      colors: Colors.White,
    },

    // October 8 - Comm. SS. Sergius, Bacchus, Marcellus, and Apuleius, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    sergius_bacchus_marcellus_and_apuleius_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 10, date: 8 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // October 9 - St. John Leonardi, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    john_leonardi: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 9 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // October 9 - Comm. SS. Denis, Rusticus, and Eleutherius, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    denis_rusticus_and_eleutherius_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 10, date: 9 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // October 10 - St. Francis Borgia, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    francis_borgia: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 10 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // October 11 - Motherhood of the Blessed Virgin Mary
    // II Class
    // src: mr_1962 (German Schott)
    motherhood_of_the_blessed_virgin_mary: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 10, date: 11 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // October 13 - St. Edward the Confessor, King
    // III Class
    // src: mr_1962 (German Schott)
    edward_the_confessor: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 13 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // October 14 - St. Callistus I, Pope, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    callistus_i_pope: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 14 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // October 15 - St. Teresa of Avila, Virgin
    // III Class
    // src: mr_1962 (German Schott)
    teresa_of_avila_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 15 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // October 16 - St. Hedwig, Widow
    // III Class
    // src: mr_1962 (German Schott)
    hedwig_of_silesia: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 16 },
      commonsDef: Common.HolyWomen,
      colors: Colors.White,
    },

    // October 17 - St. Margaret Mary Alacoque, Virgin
    // III Class
    // src: mr_1962 (German Schott)
    margaret_mary_alacoque_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 17 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // October 18 - St. Luke, Evangelist
    // II Class
    // src: mr_1962 (German Schott)
    luke_evangelist: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 10, date: 18 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // October 19 - St. Peter of Alcantara, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    peter_of_alcantara: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 19 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // October 20 - St. John Cantius, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    john_cantius: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 20 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // October 21 - Comm. St. Hilarion, Abbot
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    hilarion_abbot: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 10, date: 21 },
      commonsDef: Common.Abbots,
      colors: Colors.White,
    },

    // October 21 - Comm. SS. Ursula and Companions, Virgin Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    ursula_and_companions_virgin_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 10, date: 21 },
      commonsDef: Common.VirginMartyrs,
      colors: Colors.Red,
    },

    // October 23 - St. Anthony Mary Claret, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    anthony_mary_claret_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 23 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // October 24 - St. Raphael the Archangel
    // III Class
    // src: mr_1962 (German Schott)
    raphael_archangel: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 10, date: 24 },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // October 25 - Comm. SS. Chrysanthus and Daria, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    chrysanthus_and_daria_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 10, date: 25 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // October 26 - Comm. St. Evaristus, Pope, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    evaristus_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 10, date: 26 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // October 28 - SS. Simon and Jude, Apostles
    // II Class
    // src: mr_1962 (German Schott)
    simon_and_jude_apostles: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 10, date: 28 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // ========================================================================
    // NOVEMBER
    // ========================================================================

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

    // November 4 - St. Charles Borromeo, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    charles_borromeo_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 4 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // November 4 - Comm. SS. Vitalis and Agricola, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    vitalis_and_agricola_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 11, date: 4 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // November 8 - Comm. Four Crowned Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    four_crowned_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 11, date: 8 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // November 9 - Dedication of the Archbasilica of the Most Holy Saviour (St. John Lateran)
    // II Class
    // src: mr_1962 (German Schott)
    dedication_of_the_lateran_basilica: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 11, date: 9 },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // November 9 - Comm. St. Theodore, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    theodore_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 11, date: 9 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // November 10 - St. Andrew Avellino, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    andrew_avellino: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 10 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // November 10 - Comm. SS. Tryphon, Respicius, and Nympha, Martyrs
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    tryphon_respicius_and_nympha_martyrs: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 11, date: 10 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // November 11 - St. Martin of Tours, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    martin_of_tours_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 11 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // November 11 - Comm. St. Mennas, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    mennas_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 11, date: 11 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // November 12 - St. Martin I, Pope, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    martin_i_pope: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 12 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // November 13 - St. Didacus, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    didacus_of_alcala: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 13 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // November 14 - St. Josaphat, Bishop, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    josaphat_of_polotsk_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 14 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // November 15 - St. Albert the Great, Bishop, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    albert_the_great_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 15 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // November 16 - St. Gertrude the Great, Virgin
    // III Class
    // src: mr_1962 (German Schott)
    gertrude_the_great_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 16 },
      commonsDef: Common.Virgin,
      colors: Colors.White,
    },

    // November 17 - St. Gregory Thaumaturgus, Bishop, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    gregory_thaumaturgus_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 17 },
      commonsDef: Common.Bishops,
      colors: Colors.White,
    },

    // November 18 - Dedication of the Basilicas of SS. Peter and Paul
    // III Class
    // src: mr_1962 (German Schott)
    dedication_of_the_basilicas_of_peter_and_paul: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 18 },
      commonsDef: Common.None,
      colors: Colors.White,
    },

    // November 19 - St. Elizabeth of Hungary, Widow
    // III Class
    // src: mr_1962 (German Schott)
    elizabeth_of_hungary: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 19 },
      commonsDef: Common.HolyWomen,
      colors: Colors.White,
    },

    // November 19 - Comm. St. Pontian, Pope, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    pontian_pope: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 11, date: 19 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // November 20 - St. Felix of Valois, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    felix_of_valois: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 20 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // November 21 - Presentation of the Blessed Virgin Mary
    // III Class
    // src: mr_1962 (German Schott)
    presentation_of_the_blessed_virgin_mary: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 21 },
      commonsDef: Common.BlessedVirginMary,
      colors: Colors.White,
    },

    // November 22 - St. Cecilia, Virgin, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    cecilia_of_rome_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 22 },
      commonsDef: Common.VirginMartyrs,
      colors: Colors.Red,
    },

    // November 23 - St. Clement I, Pope, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    clement_i_pope: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 23 },
      commonsDef: [Common.Popes, Common.Martyrs],
      colors: Colors.Red,
    },

    // November 23 - Comm. St. Felicity of Rome, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    felicity_of_rome_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 11, date: 23 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // November 24 - St. John of the Cross, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    john_of_the_cross: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 24 },
      commonsDef: [Common.Confessor, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // November 24 - Comm. St. Chrysogonus, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    chrysogonus_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 11, date: 24 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // November 25 - St. Catherine of Alexandria, Virgin, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    catherine_of_alexandria_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 25 },
      commonsDef: Common.VirginMartyrs,
      colors: Colors.Red,
    },

    // November 26 - St. Sylvester, Abbot
    // III Class
    // src: mr_1962 (German Schott)
    sylvester_guzzolini_abbot: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 11, date: 26 },
      commonsDef: Common.Abbots,
      colors: Colors.White,
    },

    // November 26 - Comm. St. Peter of Alexandria, Bishop, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    peter_of_alexandria_bishop: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 11, date: 26 },
      commonsDef: [Common.Bishops, Common.Martyrs],
      colors: Colors.Red,
    },

    // November 29 - Comm. St. Saturninus, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    saturninus_martyr: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 11, date: 29 },
      commonsDef: Common.Martyrs,
      colors: Colors.Red,
    },

    // November 30 - St. Andrew, Apostle
    // II Class
    // src: mr_1962 (German Schott)
    andrew_apostle: {
      rank: Ranks.SecondClass,
      precedence: Precedences.GeneralSecondClassFeast_7,
      dateDef: { month: 11, date: 30 },
      commonsDef: Common.None,
      colors: Colors.Red,
    },

    // ========================================================================
    // DECEMBER
    // ========================================================================

    // December 2 - St. Bibiana, Virgin, Martyr
    // III Class
    // src: mr_1962 (German Schott)
    bibiana_of_rome_virgin: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 12, date: 2 },
      commonsDef: Common.VirginMartyrs,
      colors: Colors.Red,
    },

    // December 3 - St. Francis Xavier, Confessor
    // III Class
    // src: mr_1962 (German Schott)
    francis_xavier: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 12, date: 3 },
      commonsDef: Common.Confessor,
      colors: Colors.White,
    },

    // December 4 - St. Peter Chrysologus, Bishop, Confessor, Doctor
    // III Class
    // src: mr_1962 (German Schott)
    peter_chrysologus_bishop: {
      rank: Ranks.ThirdClass,
      precedence: Precedences.GeneralThirdClassFeast_11,
      dateDef: { month: 12, date: 4 },
      commonsDef: [Common.Bishops, Common.DoctorsOfTheChurch],
      colors: Colors.White,
    },

    // December 4 - Comm. St. Barbara, Virgin, Martyr
    // IV Class (commemoration)
    // src: mr_1962 (German Schott)
    barbara_of_nicomedia_virgin: {
      rank: Ranks.FourthClass,
      precedence: Precedences.Commemoration_14,
      dateDef: { month: 12, date: 4 },
      commonsDef: Common.VirginMartyrs,
      colors: Colors.Red,
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
