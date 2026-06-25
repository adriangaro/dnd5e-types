/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/active-effect/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.activeEffect {
      interface BaseActiveEffectSystemData {
      /** Changes to apply to the actor. */
      changes: ActiveEffect.ChangeData[];
      magical: boolean; // Does this effect originate from a magical source?
      rider: {
        statuses: Set<string>; // Additional status effects that are separately applied when effect is applied.
      };
      }

      interface EnchantmentActiveEffectSystemData {
      /** Changes to apply to the item. */
      changes: ActiveEffect.ChangeData[];
      magical: boolean; // Does this effect originate from a magical source?
      }

  }
}

export {};
