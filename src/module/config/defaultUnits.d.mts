/**
 * Default imperial & metric units per measurement category. `CONFIG.DND5E.defaultUnits`.
 */

declare global {
  namespace dnd5e.types {
    namespace DefaultUnit {
      /** Imperial/metric default pair for one measurement category. */
      interface Config<UnitKey extends string = string> {
        /** Imperial unit key. */
        imperial: UnitKey;
        /** Metric unit key. */
        metric: UnitKey;
      }
    }

    interface DND5EConfig {
      defaultUnits: {
        /** Default length unit (e.g. `ft` / `m`). */
        length: dnd5e.types.DefaultUnit.Config<dnd5e.types.MovementUnit.TypeKey>;
        /** Default travel-speed unit (e.g. `mph` / `kph`). */
        travel: dnd5e.types.DefaultUnit.Config<dnd5e.types.TravelUnit.TypeKey>;
        /** Default volume unit (e.g. `cubicFoot` / `liter`). */
        volume: dnd5e.types.DefaultUnit.Config<dnd5e.types.VolumeUnit.TypeKey>;
        /** Default weight unit (e.g. `lb` / `kg`). */
        weight: dnd5e.types.DefaultUnit.Config<dnd5e.types.WeightUnit.TypeKey>;
      };
    }
  }
}

export {};
