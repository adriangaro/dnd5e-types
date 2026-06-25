/**
 * Advancement type config funnel. `CONFIG.DND5E.advancementTypes`.
 *
 * The expandable `Advancement` registry (DefaultTypes / OverrideTypes / Types / TypeKey / Config)
 * lives in `src/module/data/advancement/_registry.d.mts`; this file only wires the `CONFIG.DND5E`
 * entry to it.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      advancementTypes: {
        [K in dnd5e.types.Advancement.TypeKey]: dnd5e.types.Advancement.Config<K>;
      };
    }
  }
}

export {};
