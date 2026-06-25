/**
 * `dnd5e.documents.advancement` runtime API fragment.
 *
 * Mirrors the runtime `module/documents/advancement/_module.mjs` exports. Each concrete
 * advancement document is exposed as BOTH a value (`const` → the constructor, via
 * `typeof import(...).default`) and a type (`type` → the instance, via `import(...).default`),
 * inside an OPEN namespace so consumers can declaration-merge their own advancements in.
 *
 * Every member here is a DEFAULT export from `src/documents/advancement/<file>.mjs`.
 * Paths are relative to this file at `src/module/_api/`, so they reach
 * `src/documents/advancement/` via `../../documents/advancement/`.
 */

declare global {
  namespace dnd5e.documents.advancement {
    const Advancement: typeof import("../documents/advancement/advancement.mjs").default;
    type Advancement = import("../documents/advancement/advancement.mjs").default;

    const AbilityScoreImprovementAdvancement: typeof import("../documents/advancement/ability-score-improvement.mjs").default;
    type AbilityScoreImprovementAdvancement = import("../documents/advancement/ability-score-improvement.mjs").default;

    const HitPointsAdvancement: typeof import("../documents/advancement/hit-points.mjs").default;
    type HitPointsAdvancement = import("../documents/advancement/hit-points.mjs").default;

    const ItemChoiceAdvancement: typeof import("../documents/advancement/item-choice.mjs").default;
    type ItemChoiceAdvancement = import("../documents/advancement/item-choice.mjs").default;

    const ItemGrantAdvancement: typeof import("../documents/advancement/item-grant.mjs").default;
    type ItemGrantAdvancement = import("../documents/advancement/item-grant.mjs").default;

    const ModifyItemAdvancement: typeof import("../documents/advancement/modify-item.mjs").default;
    type ModifyItemAdvancement = import("../documents/advancement/modify-item.mjs").default;

    const ScaleValueAdvancement: typeof import("../documents/advancement/scale-value.mjs").default;
    type ScaleValueAdvancement = import("../documents/advancement/scale-value.mjs").default;

    const SizeAdvancement: typeof import("../documents/advancement/size.mjs").default;
    type SizeAdvancement = import("../documents/advancement/size.mjs").default;

    const SubclassAdvancement: typeof import("../documents/advancement/subclass.mjs").default;
    type SubclassAdvancement = import("../documents/advancement/subclass.mjs").default;

    const TraitAdvancement: typeof import("../documents/advancement/trait.mjs").default;
    type TraitAdvancement = import("../documents/advancement/trait.mjs").default;
  }
}

export {};
