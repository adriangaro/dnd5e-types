/**
 * Travel time config domain (Seam A). `CONFIG.DND5E.travelTimes`.
 *
 * Default number of hours per day traveled by specific actor types (label → number).
 */

declare global {
  namespace dnd5e.types {
    namespace TravelTime {
      /** Default per-actor-type travel hours. */
      interface DefaultTypes {
        group: true;
        vehicle: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      travelTimes: { [K in dnd5e.types.TravelTime.TypeKey]: number };
    }
  }
}

export {};
