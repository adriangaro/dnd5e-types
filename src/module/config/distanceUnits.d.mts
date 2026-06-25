/**
 * Distance unit label-map (Seam A). `CONFIG.DND5E.distanceUnits`.
 *
 * Built at runtime by spreading `DND5E.movementUnits` keys then `DND5E.rangeTypes`:
 *   `{ ...movementUnits keys, ...rangeTypes }`
 * Composed here from `MovementUnit.Types & RangeType.Types` so that downstream
 * `MovementUnit.OverrideTypes` / `RangeType.OverrideTypes` expansions automatically
 * propagate into `DistanceUnit.TypeKey` without any change here.
 * Downstream modules may also add distance-only units via `OverrideTypes`:
 *   declare global { namespace dnd5e.types.DistanceUnit { interface OverrideTypes { hex: true } } }
 */

declare global {
  namespace dnd5e.types {
    namespace DistanceUnit {
      /** Downstream merge point for distance-only additions. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<
        dnd5e.types.MovementUnit.Types & dnd5e.types.RangeType.Types,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      distanceUnits: { [K in dnd5e.types.DistanceUnit.TypeKey]: string };
    }
  }
}

export {};
