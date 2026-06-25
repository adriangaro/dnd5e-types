/**
 * Amount of speed reduction caused by wearing armor but not meeting the strength
 * requirement in feet. Value will be converted to the appropriate value to match
 * the actor's speed unit. `CONFIG.DND5E.armorSpeedReduction`.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      armorSpeedReduction: number;
    }
  }
}

export {};
