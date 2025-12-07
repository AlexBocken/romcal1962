/**
 * Precedence of Liturgical Days according to the 1960 Code of Rubrics (Rubricarum instructum).
 *
 * The precedence system determines which celebration is observed when multiple celebrations
 * fall on the same day. The order in this list is critical: higher precedence types appear
 * first, lower precedence types at the end.
 *
 * This system is based on Pope John XXIII's 1960 Code of Rubrics, incorporated into the
 * 1962 Roman Missal used in the Extraordinary Form.
 *
 * Key differences from the 1969 (Novus Ordo) system:
 * - More octaves throughout the year (not just Easter and Christmas)
 * - Vigils are more numerous and have their own precedence levels
 * - Ember Days and Rogation Days have specific precedence
 * - Different treatment of privileged ferial days
 *
 * @readonly
 */
export const Precedences = {
  // Note: 63 character limit per name due to string literal typing & PascalCase to SNAKE_CASE conversion

  /**
   * 1 - The Paschal Triduum
   * Good Friday through Easter Sunday (the highest liturgical celebrations)
   */
  Triduum_1: 'TRIDUUM_1' as const,

  /**
   * 2 - Primary I Class Solemnities of the Proper of Time
   * - Christmas Day (Nativity of the Lord)
   * - Epiphany
   * - Easter Sunday
   * - Ascension
   * - Pentecost
   */
  ProperOfTimeSolemnity_2: 'PROPER_OF_TIME_SOLEMNITY_2' as const,

  /**
   * 2 - Privileged Sundays (I Class)
   * - All Sundays of Advent
   * - All Sundays of Lent (including Passion Sunday and Palm Sunday)
   * - All Sundays of Eastertide
   * These Sundays cannot be displaced by any feast
   */
  PrivilegedSunday_2: 'PRIVILEGED_SUNDAY_2' as const,

  /**
   * 2 - Days of Holy Week (Monday through Wednesday)
   * - Monday of Holy Week
   * - Tuesday of Holy Week
   * - Wednesday of Holy Week
   * (Holy Thursday, Good Friday, and Holy Saturday are part of the Triduum)
   */
  HolyWeek_2: 'HOLY_WEEK_2' as const,

  /**
   * 2 - Days within the Octave of Easter
   * - Monday through Saturday of Easter Week (octave days)
   * These days are treated as I Class and cannot be displaced
   */
  EasterOctave_2: 'EASTER_OCTAVE_2' as const,

  /**
   * 3 - I Class Feasts in the General Calendar
   * Includes major feasts of the Lord, Blessed Virgin Mary, and certain saints
   * Examples:
   * - Immaculate Conception (Dec 8)
   * - Assumption (Aug 15)
   * - Feasts of Apostles (when I Class)
   * - All Saints (Nov 1)
   */
  GeneralFirstClassFeast_3: 'GENERAL_FIRST_CLASS_FEAST_3' as const,

  /**
   * 4 - Proper I Class Feasts
   */

  /**
   * 4a - Principal Patron of a place, city, diocese, region, or nation
   */
  ProperFirstClassFeast_PrincipalPatron_4a: 'PROPER_FIRST_CLASS_FEAST__PRINCIPAL_PATRON_4A' as const,

  /**
   * 4b - Anniversary of the Dedication of one's own church
   */
  ProperFirstClassFeast_DedicationOfOwnChurch_4b: 'PROPER_FIRST_CLASS_FEAST__DEDICATION_OF_OWN_CHURCH_4B' as const,

  /**
   * 4c - Title (patron) of one's own church
   */
  ProperFirstClassFeast_TitleOfOwnChurch_4c: 'PROPER_FIRST_CLASS_FEAST__TITLE_OF_OWN_CHURCH_4C' as const,

  /**
   * 5 - II Class Feasts of the Lord in the General Calendar
   * Examples:
   * - Holy Family
   * - Transfiguration
   * - Sacred Heart
   * - Christ the King
   */
  GeneralSecondClassLordFeast_5: 'GENERAL_SECOND_CLASS_LORD_FEAST_5' as const,

  /**
   * 6 - Unprivileged Sundays (II Class)
   * - Sundays after Epiphany
   * - Sundays after Pentecost
   * - Sundays within the Octave of Christmas and Epiphany
   * These can be displaced by I Class feasts
   */
  UnprivilegedSunday_6: 'UNPRIVILEGED_SUNDAY_6' as const,

  /**
   * 7 - II Class Feasts in the General Calendar
   * Feasts of the Blessed Virgin Mary, Apostles, and major saints
   * Examples:
   * - Purification of Mary (Feb 2)
   * - Annunciation (Mar 25)
   * - Most individual Apostles' feasts
   */
  GeneralSecondClassFeast_7: 'GENERAL_SECOND_CLASS_FEAST_7' as const,

  /**
   * 8 - Days within Octaves of II Class feasts
   * Examples:
   * - Days within the Octave of Christmas (Dec 26-31, Jan 1 being the Octave Day)
   * - Days within the Octave of Epiphany
   * - Days within the Octave of Corpus Christi
   */
  DayWithinOctave_8: 'DAY_WITHIN_OCTAVE_8' as const,

  /**
   * 8 - Vigils of I Class or II Class feasts (when the vigil itself is II Class)
   * Examples:
   * - Vigil of Pentecost
   * - Vigil of the Nativity (Christmas Eve)
   * - Vigil of the Ascension
   */
  VigilOfFirstOrSecondClass_8: 'VIGIL_OF_FIRST_OR_SECOND_CLASS_8' as const,

  /**
   * 9 - Proper II Class Feasts
   * - Secondary patrons of a diocese or religious community
   * - Other proper II Class feasts in particular calendars
   */
  ProperSecondClassFeast_9: 'PROPER_SECOND_CLASS_FEAST_9' as const,

  /**
   * 10 - Privileged Ferial Days (weekdays with special precedence)
   * - Ash Wednesday
   * - Weekdays of Lent (Monday through Saturday)
   * - Ember Days (Quattuor Tempora): Wed/Fri/Sat in Advent, Lent, after Pentecost, September
   * - Rogation Days (Mon-Wed before Ascension)
   * - Weekdays of Advent from Dec 17-23
   * These ferial days take precedence over III Class feasts
   */
  PrivilegedFeria_10: 'PRIVILEGED_FERIA_10' as const,

  /**
   * 11 - III Class Feasts in the General Calendar
   * Most feasts of saints fall into this category
   * Examples:
   * - Most martyrs, confessors, virgins, holy women
   * - Lesser feasts of Our Lady
   * - Feasts of Doctors of the Church
   */
  GeneralThirdClassFeast_11: 'GENERAL_THIRD_CLASS_FEAST_11' as const,

  /**
   * 12 - Vigils of III Class (when the vigil itself is III Class)
   * Examples:
   * - Vigil of St. Lawrence (Aug 9)
   * - Vigil of the Assumption (Aug 14)
   * - Various saints' vigils
   */
  VigilOfThirdClass_12: 'VIGIL_OF_THIRD_CLASS_12' as const,

  /**
   * 13 - Proper III Class Feasts
   * Feasts proper to a diocese, religious order, or local calendar
   */
  ProperThirdClassFeast_13: 'PROPER_THIRD_CLASS_FEAST_13' as const,

  /**
   * 14 - Commemorations (IV Class)
   * Simple commemorations of saints, usually celebrated within another Mass
   * These were called "Simple" feasts before 1960
   */
  Commemoration_14: 'COMMEMORATION_14' as const,

  /**
   * 15 - Ferial Days (IV Class weekdays)
   * Ordinary weekdays with no special observance
   * - Most weekdays outside Lent and Advent
   * - Can be replaced by votive Masses or Requiem Masses
   */
  FerialDay_15: 'FERIAL_DAY_15' as const,
};

export const PRECEDENCES = [
  Precedences.Triduum_1,
  Precedences.ProperOfTimeSolemnity_2,
  Precedences.PrivilegedSunday_2,
  Precedences.HolyWeek_2,
  Precedences.EasterOctave_2,
  Precedences.GeneralFirstClassFeast_3,
  Precedences.ProperFirstClassFeast_PrincipalPatron_4a,
  Precedences.ProperFirstClassFeast_DedicationOfOwnChurch_4b,
  Precedences.ProperFirstClassFeast_TitleOfOwnChurch_4c,
  Precedences.GeneralSecondClassLordFeast_5,
  Precedences.UnprivilegedSunday_6,
  Precedences.GeneralSecondClassFeast_7,
  Precedences.DayWithinOctave_8,
  Precedences.VigilOfFirstOrSecondClass_8,
  Precedences.ProperSecondClassFeast_9,
  Precedences.PrivilegedFeria_10,
  Precedences.GeneralThirdClassFeast_11,
  Precedences.VigilOfThirdClass_12,
  Precedences.ProperThirdClassFeast_13,
  Precedences.Commemoration_14,
  Precedences.FerialDay_15,
];

export type Precedence = (typeof PRECEDENCES)[number];
