/**
 * Runtime API fragment for `dnd5e.dataModels.activity` — mirrors the runtime
 * `module/data/activity/_module.mjs`.
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in. Members mirror the
 * runtime `_module.mjs` export names (e.g. v2's `BaseAttackActivityData` is exposed under its runtime
 * name `AttackActivityData`).
 */

declare global {
  namespace dnd5e.dataModels.activity {
    const BaseActivityData: typeof import("./base-activity.mjs").default;
    type BaseActivityData = import("./base-activity.mjs").default;
    const AttackActivityData: typeof import("./attack-data.mjs").default;
    type AttackActivityData = import("./attack-data.mjs").default;
    const CastActivityData: typeof import("./cast-data.mjs").default;
    type CastActivityData = import("./cast-data.mjs").default;
    const CheckActivityData: typeof import("./check-data.mjs").default;
    type CheckActivityData = import("./check-data.mjs").default;
    const DamageActivityData: typeof import("./damage-data.mjs").default;
    type DamageActivityData = import("./damage-data.mjs").default;
    const EnchantActivityData: typeof import("./enchant-data.mjs").default;
    type EnchantActivityData = import("./enchant-data.mjs").default;
    const ForwardActivityData: typeof import("./forward-data.mjs").default;
    type ForwardActivityData = import("./forward-data.mjs").default;
    const HealActivityData: typeof import("./heal-data.mjs").default;
    type HealActivityData = import("./heal-data.mjs").default;
    const SaveActivityData: typeof import("./save-data.mjs").default;
    type SaveActivityData = import("./save-data.mjs").default;
    const SummonActivityData: typeof import("./summon-data.mjs").default;
    type SummonActivityData = import("./summon-data.mjs").default;
    const TransformActivityData: typeof import("./transform-data.mjs").default;
    type TransformActivityData = import("./transform-data.mjs").default;
    const UtilityActivityData: typeof import("./utility-data.mjs").default;
    type UtilityActivityData = import("./utility-data.mjs").default;
  }
}

export {};
