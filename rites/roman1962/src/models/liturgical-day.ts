import { Color } from '../constants/colors';
import { CommonDefinition } from '../constants/commons';
import { Precedence } from '../constants/precedences';
import { Rank } from '../constants/ranks';
import { Id } from '../types/common';
import { DateDef } from '../types/liturgical-day';
import { MassData, MassPropersSummary } from '../types/mass';

import { LiturgicalDayConfig } from './liturgical-day-config';
import { LiturgicalDayDef } from './liturgical-day-def';

export interface LiturgicalDayData {
  /** Unique identifier */
  readonly id: Id;

  /** ISO 8601 date string (YYYY-MM-DD) */
  readonly date: string;

  /** Name of the liturgical day */
  readonly name: string;

  /** Date definition */
  readonly dateDef: DateDef;

  /** Precedence level (determines which celebration wins on a given date) */
  readonly precedence: Precedence;

  /** Rank (e.g., FIRST_CLASS, SECOND_CLASS, etc.) */
  readonly rank: Rank | undefined;

  /** Liturgical colors */
  readonly colors: Color[];

  /** Commons (categories like Martyrs, Popes, etc.) */
  readonly commons: CommonDefinition[];

  /** Mass structure and propers (optional - only included when requested) */
  readonly mass?: MassData;

  /** Summary of available mass propers (lightweight for calendar views) */
  readonly massPropersSummary?: MassPropersSummary;
}

export class LiturgicalDay implements LiturgicalDayData {
  readonly #liturgicalDayDef: LiturgicalDayDef;
  readonly #liturgicalDayConfig: LiturgicalDayConfig;

  readonly id: Id;
  readonly date: string;
  readonly dateDef: DateDef;
  readonly precedence: Precedence;
  readonly rank: Rank | undefined;
  readonly colors: Color[];
  readonly commons: CommonDefinition[];
  readonly mass?: MassData;
  readonly massPropersSummary?: MassPropersSummary;

  public get name(): string {
    return this.#liturgicalDayDef.name;
  }

  constructor(
    def: LiturgicalDayDef,
    date: Date,
    liturgicalDayConfig: LiturgicalDayConfig,
    id?: Id,
    includeMass?: boolean
  ) {
    this.#liturgicalDayDef = def;
    this.#liturgicalDayConfig = liturgicalDayConfig;
    this.id = id || def.id; // Use passed id or fall back to def.id
    this.date = date.toISOString().substring(0, 10);
    this.dateDef = def.dateDef;
    this.precedence = def.precedence;
    this.rank = def.rank;
    this.colors = def.colors ?? [];
    this.commons = def.commonsDef ?? [];

    // Mass data is only included if explicitly requested
    // This keeps the default calendar lightweight
    const defWithMass = def as LiturgicalDayDef & { mass?: MassData };
    if (includeMass && defWithMass.mass) {
      this.mass = defWithMass.mass;
    }

    // Always include a lightweight summary
    if (defWithMass.mass) {
      this.massPropersSummary = this.#buildMassPropersSummary(defWithMass.mass);
    }
  }

  #buildMassPropersSummary(massData: MassData): MassPropersSummary {
    if (!massData.propers) {
      return { hasPropers: false };
    }

    const properParts = Object.keys(massData.propers).filter(
      (key) => massData.propers?.[key as keyof typeof massData.propers] !== undefined
    ) as (keyof typeof massData.propers)[];

    return {
      hasPropers: properParts.length > 0,
      properParts,
    };
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      date: this.date,
      name: this.#liturgicalDayDef.name,
      dateDef: this.dateDef,
      precedence: this.precedence,
      rank: this.rank,
      colors: this.colors,
      commons: this.commons,
      ...(this.mass ? { mass: this.mass } : {}),
      ...(this.massPropersSummary ? { massPropersSummary: this.massPropersSummary } : {}),
    };
  }
}
