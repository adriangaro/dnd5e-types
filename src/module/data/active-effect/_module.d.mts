/**
 * Runtime API fragment for `dnd5e.dataModels.activeEffect`.
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.activeEffect {
    const BaseEffectData: typeof import("../active-effect/base.mjs").default;
    type BaseEffectData = import("../active-effect/base.mjs").default;

    const EnchantmentData: typeof import("../active-effect/enchantment.mjs").default;
    type EnchantmentData = import("../active-effect/enchantment.mjs").default;

    // Config map (effect type key → constructor).
    const config: {
      base: typeof import("../active-effect/base.mjs").default;
      enchantment: typeof import("../active-effect/enchantment.mjs").default;
    };
  }
}

export {};
