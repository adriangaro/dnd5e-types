/**
 * Special time-period config domain (Seam A). `CONFIG.DND5E.specialTimePeriods`.
 *
 * Time periods that don't accept a numeric value (instantaneous, special). Label-map;
 * keys stay expandable.
 */

declare global {
  namespace dnd5e.types {
    namespace SpecialTimePeriod {
      /** Non-numeric time periods. */
      interface DefaultTypes {
        inst: true;
        spec: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      specialTimePeriods: { [K in dnd5e.types.SpecialTimePeriod.TypeKey]: string };
    }
  }
}

export {};
