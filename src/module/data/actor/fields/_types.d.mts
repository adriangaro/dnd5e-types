/**
 * Hand-managed type defs. Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.actor.fields {
      interface ACFormulaData {
      armored: boolean|null; // Require character be armored or not armored to use this formula.
      formula: string; // Formula to use to calculate armor class.
      label: string; // Label used for calculation in the attribution tooltip & config dialog.
      shielded: boolean|null; // Require character to have a shield or not have a shield to use this formula.
      }

      interface SimpleTraitData {
      value: Set<string>; // Keys for currently selected traits.
      custom: string; // Semicolon-separated list of custom traits.
      }

      interface DamageTraitData extends SimpleTraitData {
      bypasses: Set<string>; // Keys for physical weapon properties that cause resistances to be bypassed.
      }

      interface TravelData {
      pace?: TravelPace5e; // Current travel pace.
      paces: Record<dnd5e.types.TravelType.TypeKey, string>; // Formulas for various travel paces per/day.
      speeds: Record<dnd5e.types.TravelType.TypeKey, string>; // Formulas for various travel speeds per/hour.
      units: dnd5e.types.TravelUnit.TypeKey | null; // Movement used to measure the various travel speeds.
      }

      type TravelPace5e = dnd5e.types.TravelPace.TypeKey;

  }
}

export {};
