/**
 * Runtime API fragment for `dnd5e.dataModels.actor` — mirrors the runtime
 * `module/data/actor/_module.mjs`.
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in. Member names use
 * the runtime API export names (e.g. v2 `DetailsField`/`TraitsField` are exposed under their
 * runtime names `DetailsFields`/`TraitsFields`).
 *
 * Layout note: the per-bundle `templates/{attributes,details,traits}.mjs` split is not mirrored —
 * the shared field bundles live in `data/actor/templates/{attributes,details,traits}.mjs`
 * (`AttributesFields`, `DetailsField`, `TraitsField`). The custom actor fields each live in their own
 * module mirroring the runtime `data/actor/fields/*` layout (`ACFormulasField`, `SimpleTraitField`,
 * `DamageTraitField`, `TravelField`). `CommonTemplate`/`CreatureTemplate` are named exports of their
 * own template files.
 */

declare global {
  namespace dnd5e.dataModels.actor {
    // Concrete actor data models (data/actor/*.mjs).
    const CharacterData: typeof import("./character.mjs").default;
    type CharacterData = import("./character.mjs").default;

    const EncounterData: typeof import("./encounter.mjs").default;
    type EncounterData = import("./encounter.mjs").default;

    const GroupData: typeof import("./group.mjs").default;
    type GroupData = import("./group.mjs").default;

    const NPCData: typeof import("./npc.mjs").default;
    type NPCData = import("./npc.mjs").default;

    const VehicleData: typeof import("./vehicle.mjs").default;
    type VehicleData = import("./vehicle.mjs").default;

    // Config map (actor type key → constructor).
    const config: {
      character: typeof import("./character.mjs").default;
      encounter: typeof import("./encounter.mjs").default;
      group: typeof import("./group.mjs").default;
      npc: typeof import("./npc.mjs").default;
      vehicle: typeof import("./vehicle.mjs").default;
    };

    // Custom actor fields (data/actor/fields/*.mjs).
    const ACFormulasField: typeof import("./fields/ac-formulas-field.mjs").default;
    type ACFormulasField = import("./fields/ac-formulas-field.mjs").default;

    const DamageTraitField: typeof import("./fields/damage-trait-field.mjs").default;
    type DamageTraitField = import("./fields/damage-trait-field.mjs").default;

    const SimpleTraitField: typeof import("./fields/simple-trait-field.mjs").default;
    type SimpleTraitField = import("./fields/simple-trait-field.mjs").default;

    const TravelField: typeof import("./fields/travel-field.mjs").default;
    type TravelField = import("./fields/travel-field.mjs").default;

    // System flags model (data/actor/group-system-flags.mjs).
    const GroupSystemFlags: typeof import("./group-system-flags.mjs").default;
    type GroupSystemFlags = import("./group-system-flags.mjs").default;

    // Shared actor field bundles (data/actor/templates/{attributes,details,traits}.mjs).
    const AttributesFields: typeof import("./templates/attributes.mjs").default;
    type AttributesFields = import("./templates/attributes.mjs").default;

    const DetailsFields: typeof import("./templates/details.mjs").default;
    type DetailsFields = import("./templates/details.mjs").default;

    const TraitsFields: typeof import("./templates/traits.mjs").default;
    type TraitsFields = import("./templates/traits.mjs").default;

    // Actor data templates.
    const CommonTemplate: typeof import("./templates/common.mjs").CommonTemplate;
    type CommonTemplate = import("./templates/common.mjs").CommonTemplate;

    const CreatureTemplate: typeof import("./templates/creature.mjs").CreatureTemplate;
    type CreatureTemplate = import("./templates/creature.mjs").CreatureTemplate;
  }
}

export {};
