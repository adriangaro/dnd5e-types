/**
 * Travel pace config domain (Seam A). `CONFIG.DND5E.travelPace`.
 *
 * Available travel paces (slow/normal/fast) with their mileage + multipliers.
 */

declare global {
  namespace dnd5e.types {
    namespace TravelPace {
      /** Default travel paces. */
      interface DefaultTypes {
        slow: true;
        normal: true;
        fast: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.travelPace[key]` entry. */
      interface Config {
        /** The human-readable label. */
        label: string;
        /** The standard pace value in miles per day. */
        standard: number;
        /** The speed up or slow down factor for this travel pace. */
        multiplier: number;
        /** Whether to round the multiplied result up or down (omit = no rounding). */
        round?: "up" | "down";
      }
    }

    interface DND5EConfig {
      travelPace: { [K in dnd5e.types.TravelPace.TypeKey]: dnd5e.types.TravelPace.Config };
    }
  }
}

export {};
