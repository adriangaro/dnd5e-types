/**
 * Consumable resources config domain. `CONFIG.DND5E.consumableResources`.
 *
 * Actor/item attribute paths that are valid targets for item resource consumption.
 * Populated during init (an array of dot-path strings).
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      /** Attribute dot-paths valid as resource-consumption targets. */
      consumableResources: string[];
    }
  }
}

export {};
