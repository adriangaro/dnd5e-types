/**
 * Vehicle proficiency type config domain (Seam A). `CONFIG.DND5E.vehicleTypes`.
 *
 * Label-map (`@enum {string}`); keys remain expandable, values are localized labels.
 */

declare global {
  namespace dnd5e.types {
    namespace VehicleType {
      /** The default vehicle proficiency types. */
      interface DefaultTypes {
        air: true;
        land: true;
        space: true;
        water: true;
      }

      /** Downstream merge point — add `{ myVehicle: true }` here. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      /** The various types of vehicles in which characters can be proficient. @enum {string} */
      vehicleTypes: { [K in dnd5e.types.VehicleType.TypeKey]: string };
    }
  }
}

export {};
