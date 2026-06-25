/**
 * Runtime API fragment for `dnd5e.dataModels.activeEffect`.
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.activeEffect {
    const BaseEffectData: typeof import("./base.mjs").default;
    type BaseEffectData = import("./base.mjs").default;

    const EnchantmentData: typeof import("./enchantment.mjs").default;
    type EnchantmentData = import("./enchantment.mjs").default;

    // Config map (effect type key → constructor).
    const config: {
      base: typeof import("./base.mjs").default;
      enchantment: typeof import("./enchantment.mjs").default;
    };
  }
}

export {};
