/**
 * Mass structure and propers types for the 1962 Tridentine Mass
 */

/**
 * Preface types used in the 1962 Missal
 */
export enum PrefaceType {
  /** Apostelpräfation - Apostles' Preface */
  Apostles = 'APOSTLES',
  /** Dreifaltigkeitspräfation - Trinity Preface */
  Trinity = 'TRINITY',
  /** Heilig-Kreuz-Präfation - Holy Cross Preface */
  HolyCross = 'HOLY_CROSS',
  /** Marienpräfation - Marian Preface */
  Marian = 'MARIAN',
  /** gewöhnliche Präfation - Common/Ordinary Preface */
  Common = 'COMMON',
  /** eigene Präfation - Proper Preface (specific to this day) */
  Proper = 'PROPER',
}

/**
 * Communicantes type
 */
export enum CommunicantesType {
  /** gewöhnliches Communicantes */
  Common = 'COMMON',
  /** eigenes Communicantes - proper to this day */
  Proper = 'PROPER',
}

/**
 * Source for variable mass parts
 */
export enum MassPartSource {
  /** vom Sonntag - from Sunday */
  FromSunday = 'FROM_SUNDAY',
  /** vom Wochentag - from weekday */
  FromWeekday = 'FROM_WEEKDAY',
  /** Proper to this day */
  Proper = 'PROPER',
}

/**
 * Mass structure - indicates which parts are included in the Mass
 * Based on the abbreviations in the 1962 Ordo
 */
export interface MassStructure {
  /** Whether to include Gloria */
  gloria?: boolean | MassPartSource;

  /** Whether to include Credo */
  credo?: boolean | MassPartSource;

  /** Name of the Sequence if included (e.g., "Victimae Paschali", "Veni Sancte Spiritus") */
  sequence?: string;

  /** Whether to include Tractus instead of Alleluia/Graduale */
  tractus?: boolean;

  /** Type of Preface to use */
  preface?: PrefaceType | string;

  /** Type of Communicantes to use */
  communicantes?: CommunicantesType;

  /** Whether this is a Votive Mass (Vo-Messe) */
  isVotiveMass?: boolean;

  /** Commemorations - IDs of feasts to commemorate (mit dem Gedächtnis) */
  commemorations?: string[];

  /** Whether this uses the second collect/prayer (2. Gebet) */
  secondCollect?: boolean;
}

/**
 * Biblical reference for a proper text
 */
export interface BiblicalReference {
  /** Scripture reference in traditional format (e.g., "Luc. I, 26-28", "Eph. IV, 23-28") */
  reference: string;

  /** Book abbreviation (e.g., "Luc", "Eph", "Ps") */
  book?: string;

  /** Chapter number */
  chapter?: number;

  /** Verse range (e.g., "26-28") */
  verses?: string;
}

/**
 * A proper text with optional biblical reference
 * Text is stored as i18n key for translation support
 */
export interface ProperText {
  /** Biblical reference if applicable */
  reference?: BiblicalReference;

  /** i18n key for the text (e.g., "propers.introitus.easter_sunday") */
  textKey: string;

  /** Optional rubrics or performance notes */
  rubric?: string;
}

/**
 * Complete set of Mass propers (changing parts)
 */
export interface MassPropers {
  /** Introitus (Entrance Antiphon) */
  introitus?: ProperText;

  /** Oratio/Collecta (Opening Prayer/Collect) */
  oratio?: ProperText;

  /** Lectio/Epistola (Epistle/First Reading) */
  lectio?: ProperText;

  /** Graduale (Gradual - responsorial chant) */
  graduale?: ProperText;

  /** Tractus (Tract - replaces Alleluia in penitential seasons) */
  tractus?: ProperText;

  /** Sequentia (Sequence) */
  sequentia?: ProperText;

  /** Evangelium (Gospel) */
  evangelium?: ProperText;

  /** Offertorium (Offertory Antiphon) */
  offertorium?: ProperText;

  /** Secreta (Secret Prayer/Prayer over the Offerings) */
  secreta?: ProperText;

  /** Communio (Communion Antiphon) */
  communio?: ProperText;

  /** Postcommunio (Post-communion Prayer) */
  postcommunio?: ProperText;
}

/**
 * Lightweight summary of mass propers (for calendar list view)
 * Only includes whether propers exist, not the full content
 */
export interface MassPropersSummary {
  /** Whether this day has any proper texts defined */
  hasPropers: boolean;

  /** List of which parts have propers */
  properParts?: (keyof MassPropers)[];
}

/**
 * Full mass data including structure and propers
 */
export interface MassData {
  /** Mass structure (which parts to include) */
  structure?: MassStructure;

  /** Mass propers (the actual texts) */
  propers?: MassPropers;
}
