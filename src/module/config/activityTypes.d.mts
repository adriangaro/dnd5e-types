/**
 * Activity type config funnel. `CONFIG.DND5E.activityTypes`.
 *
 * The expandable `Activity` registry (DefaultTypes / OverrideTypes / Types / TypeKey / Config) lives
 * in `src/module/data/activity/_registry.d.mts`; this file only wires the `CONFIG.DND5E` entry to it.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      activityTypes: {
        [K in dnd5e.types.Activity.TypeKey]: dnd5e.types.Activity.Config<K>;
      };
    }
  }
}

export {};
