declare global {
  namespace dnd5e.documents.activity {
    const ActivityMixin: typeof import("../documents/activity/mixin.mjs").ActivityMixin;

    const AttackActivity: typeof import("../documents/activity/attack.mjs").default;
    type AttackActivity = import("../documents/activity/attack.mjs").default;

    const CastActivity: typeof import("../documents/activity/cast.mjs").default;
    type CastActivity = import("../documents/activity/cast.mjs").default;

    const CheckActivity: typeof import("../documents/activity/check.mjs").default;
    type CheckActivity = import("../documents/activity/check.mjs").default;

    const DamageActivity: typeof import("../documents/activity/damage.mjs").default;
    type DamageActivity = import("../documents/activity/damage.mjs").default;

    const EnchantActivity: typeof import("../documents/activity/enchant.mjs").default;
    type EnchantActivity = import("../documents/activity/enchant.mjs").default;

    const EnchantmentError: typeof import("../documents/activity/enchant.mjs").EnchantmentError;
    type EnchantmentError = import("../documents/activity/enchant.mjs").EnchantmentError;

    const ForwardActivity: typeof import("../documents/activity/forward.mjs").default;
    type ForwardActivity = import("../documents/activity/forward.mjs").default;

    const HealActivity: typeof import("../documents/activity/heal.mjs").default;
    type HealActivity = import("../documents/activity/heal.mjs").default;

    const OrderActivity: typeof import("../documents/activity/order.mjs").default;
    type OrderActivity = import("../documents/activity/order.mjs").default;

    const SaveActivity: typeof import("../documents/activity/save.mjs").default;
    type SaveActivity = import("../documents/activity/save.mjs").default;

    const SummonActivity: typeof import("../documents/activity/summon.mjs").default;
    type SummonActivity = import("../documents/activity/summon.mjs").default;

    const TransformActivity: typeof import("../documents/activity/transform.mjs").default;
    type TransformActivity = import("../documents/activity/transform.mjs").default;

    const UtilityActivity: typeof import("../documents/activity/utility.mjs").default;
    type UtilityActivity = import("../documents/activity/utility.mjs").default;
  }
}

export {};
