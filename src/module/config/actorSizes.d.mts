/**
 * Creature size config domain (Seam A). `CONFIG.DND5E.actorSizes`.
 *
 * The `ActorSize` namespace (DefaultTypes / OverrideTypes / Types / TypeKey) is declared in
 * `_stubs.d.mts`; this file only layers the `Config` shape and the `CONFIG.DND5E` funnel entry.
 */

declare global {
  namespace dnd5e.types {
    namespace ActorSize {
      /** Shape of each `CONFIG.DND5E.actorSizes[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
        /** Localized abbreviation. */
        abbreviation: string;
        /** Default hit die denomination for NPCs of this size. */
        hitDie: number;
        /** Default token size. Default is `1`. */
        token?: number;
        /** Token scale multiplier applied to dynamic token rings. Default is `1`. */
        dynamicTokenScale?: number;
        /** Multiplier used to calculate carrying capacities. Default is `1`. */
        capacityMultiplier?: number;
        /** Numerical representation of size. */
        numerical: number;
      }
    }

    interface DND5EConfig {
      actorSizes: { [K in dnd5e.types.ActorSize.TypeKey]: dnd5e.types.ActorSize.Config };
    }
  }
}

export {};
