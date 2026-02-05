# Mass Data Schema Extension

This document describes the schema extension for mass structure and propers in the 1962 Tridentine rite module.

## Overview

The schema has been extended to support:

1. **Mass Structure** - Indicates which parts are included in the Mass (Gloria, Credo, Sequence, etc.)
2. **Mass Propers** - The changing parts of the Mass (Introitus, Oratio, Evangelium, etc.) with biblical references
3. **i18n Support** - All texts use translation keys for multilingual support

## Type Definitions

All mass-related types are defined in `/src/types/mass.ts`:

### MassStructure

Indicates which parts are included in the Mass based on the 1962 Ordo abbreviations:

```typescript
interface MassStructure {
  /** Whether to include Gloria (Gl) */
  gloria?: boolean | MassPartSource;

  /** Whether to include Credo (Cr) */
  credo?: boolean | MassPartSource;

  /** Name of the Sequence if included (Sequ) */
  sequence?: string;

  /** Whether to include Tractus instead of Alleluia (Tr) */
  tractus?: boolean;

  /** Type of Preface to use */
  preface?: PrefaceType | string;

  /** Type of Communicantes to use */
  communicantes?: CommunicantesType;

  /** Whether this is a Votive Mass (Vo-Messe) */
  isVotiveMass?: boolean;

  /** Commemorations (m Geb - mit dem Gedächtnis) */
  commemorations?: string[];

  /** Whether this uses the second collect (2. Geb) */
  secondCollect?: boolean;
}
```

#### Enums

**PrefaceType**:
- `APOSTLES` - Apostelpräfation
- `TRINITY` - Dreifaltigkeitspräfation
- `HOLY_CROSS` - Heilig-Kreuz-Präfation
- `MARIAN` - Marienpräfation
- `COMMON` - gewöhnliche Präfation
- `PROPER` - eigene Präfation

**CommunicantesType**:
- `COMMON` - gewöhnliches Communicantes
- `PROPER` - eigenes Communicantes

**MassPartSource**:
- `FROM_SUNDAY` - vom Sonntag (v So)
- `FROM_WEEKDAY` - vom Wochentag (v Wo)
- `PROPER` - Proper to this day

### MassPropers

The changing parts of the Mass with optional biblical references:

```typescript
interface MassPropers {
  introitus?: ProperText;      // Entrance Antiphon
  oratio?: ProperText;         // Collect/Opening Prayer
  lectio?: ProperText;         // Epistle/First Reading
  graduale?: ProperText;       // Gradual
  tractus?: ProperText;        // Tract (replaces Alleluia)
  sequentia?: ProperText;      // Sequence
  evangelium?: ProperText;     // Gospel
  offertorium?: ProperText;    // Offertory Antiphon
  secreta?: ProperText;        // Secret Prayer
  communio?: ProperText;       // Communion Antiphon
  postcommunio?: ProperText;   // Post-communion Prayer
}
```

### ProperText

Each proper text includes:

```typescript
interface ProperText {
  /** Biblical reference if applicable */
  reference?: BiblicalReference;

  /** i18n key for the text (e.g., "propers.introitus.easter_sunday") */
  textKey: string;

  /** Optional rubrics or performance notes */
  rubric?: string;
}

interface BiblicalReference {
  /** Traditional format (e.g., "Luc. I, 26-28") */
  reference: string;

  /** Book abbreviation (e.g., "Luc", "Eph") */
  book?: string;

  /** Chapter number */
  chapter?: number;

  /** Verse range (e.g., "26-28") */
  verses?: string;
}
```

### MassData

The complete mass data structure:

```typescript
interface MassData {
  structure?: MassStructure;  // Which parts to include
  propers?: MassPropers;       // The actual texts
}
```

## Integration with LiturgicalDay

The `LiturgicalDay` interface has been extended:

```typescript
interface LiturgicalDay {
  // ... existing fields ...

  /** Full mass data (only included when requested) */
  mass?: MassData;

  /** Lightweight summary (always included) */
  massPropersSummary?: MassPropersSummary;
}
```

## API Strategy

To avoid overloading data packages, the API provides multiple endpoints:

### 1. Lightweight Calendar (Default)
**Endpoint**: `GET /api/calendar/:year`

Returns the full year calendar without mass propers. Includes only `massPropersSummary` which indicates which parts have propers available.

**Use case**: Initial calendar view, performance-optimized

### 2. Detailed Calendar
**Endpoint**: `GET /api/calendar/:year/detailed`

Returns the full year calendar WITH mass propers for all days.

**Use case**: When full data is needed for the entire year

### 3. Single Day Data
**Endpoint**: `GET /api/calendar/:year/:date`

Returns detailed data for a specific date including mass propers.

**Example**: `GET /api/calendar/2026/2026-04-12`

**Use case**: User clicks on a specific day to see details

### 4. Propers Only
**Endpoint**: `GET /api/propers/:year/:date`

Returns only the mass propers for a specific date (no other liturgical data).

**Example**: `GET /api/propers/2026/2026-04-12`

**Use case**: When you only need the mass texts

## Orchestrator API

The `Romcal` class has been updated:

```typescript
class Romcal {
  async generateCalendar(
    year?: number | string,
    options?: { includeMass?: boolean }
  ): Promise<LiturgicalCalendar>
}
```

**Usage**:
```typescript
// Lightweight - no mass propers
const calendar = await romcal.generateCalendar(2026);

// With mass propers
const detailedCalendar = await romcal.generateCalendar(2026, { includeMass: true });
```

## Adding Mass Data to Liturgical Days

To add mass data to a liturgical day definition, extend the definition object:

```typescript
{
  ash_wednesday: {
    dateDef: { dateFn: 'ashWednesday' },
    // ... other properties ...
    mass: {
      structure: {
        gloria: false,                    // No Gloria
        credo: false,                      // No Credo
        tractus: true,                     // Use Tractus
        preface: PrefaceType.Common,
        communicantes: CommunicantesType.Common,
      },
      propers: {
        introitus: {
          reference: {
            reference: 'Sap. XI, 24, 25, 27',
            book: 'Sap',
            chapter: 11,
            verses: '24, 25, 27',
          },
          textKey: 'propers.introitus.ash_wednesday',
        },
        oratio: {
          textKey: 'propers.oratio.ash_wednesday',
        },
        // ... other propers
      }
    }
  }
}
```

## i18n Organization

Mass texts should be organized in translation files:

```
locales/
  en/
    propers.json        # All proper texts
  la/
    propers.json        # Latin proper texts
  de/
    propers.json        # German proper texts
```

**Example structure**:
```json
{
  "propers": {
    "introitus": {
      "ash_wednesday": "Miseréris ómnium, Dómine...",
      "easter_sunday": "Resurréxi, et adhuc tecum sum..."
    },
    "oratio": {
      "ash_wednesday": "Concéde nobis, Dómine...",
      "easter_sunday": "Deus, qui hodiérna die..."
    }
  }
}
```

## Performance Considerations

1. **Default is lightweight**: Calendar generation without `includeMass: true` is fast and produces small payloads
2. **Caching**: The orchestrator caches both lightweight and detailed calendars separately
3. **On-demand loading**: Frontend can load calendar overview quickly, then fetch details per day
4. **Summary included**: Even lightweight responses include `massPropersSummary` showing which parts exist

## Migration Path

For existing code:
1. No changes needed if you don't use mass data
2. `generateCalendar()` still works without options
3. All new fields are optional
4. Add mass data incrementally to liturgical day definitions

## Future Enhancements

Potential additions:
- Translation context/notes for rubrics
- Cross-references between proper texts
- Audio/chant notation references
- Variant texts for different uses (e.g., private vs. solemn Mass)
