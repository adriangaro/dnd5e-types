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
 * the shared field bundles live as named exports of `data/actor/templates/_fields.mjs`
 * (`AttributesFields`, `DetailsField`, `TraitsField`). The custom actor fields each live in their own
 * module mirroring the runtime `data/actor/fields/*` layout (`ACFormulasField`, `SimpleTraitField`,
 * `DamageTraitField`, `TravelField`). `CommonTemplate`/`CreatureTemplate` are named exports of their
 * own template files.
 */

declare global {
  namespace dnd5e.dataModels.actor {
    // Concrete actor data models (data/actor/*.mjs).
    const CharacterData: typeof import("../actor/character.mjs").default;
    type CharacterData = import("../actor/character.mjs").default;

    const EncounterData: typeof import("../actor/encounter.mjs").default;
    type EncounterData = import("../actor/encounter.mjs").default;

    const GroupData: typeof import("../actor/group.mjs").default;
    type GroupData = import("../actor/group.mjs").default;

    const NPCData: typeof import("../actor/npc.mjs").default;
    type NPCData = import("../actor/npc.mjs").default;

    const VehicleData: typeof import("../actor/vehicle.mjs").default;
    type VehicleData = import("../actor/vehicle.mjs").default;

    // Config map (actor type key → constructor).
    const config: {
      character: typeof import("../actor/character.mjs").default;
      encounter: typeof import("../actor/encounter.mjs").default;
      group: typeof import("../actor/group.mjs").default;
      npc: typeof import("../actor/npc.mjs").default;
      vehicle: typeof import("../actor/vehicle.mjs").default;
    };

    // Custom actor fields (data/actor/fields/*.mjs).
    const ACFormulasField: typeof import("../actor/fields/ac-formulas-field.mjs").default;
    type ACFormulasField = import("../actor/fields/ac-formulas-field.mjs").default;

    const DamageTraitField: typeof import("../actor/fields/damage-trait-field.mjs").default;
    type DamageTraitField = import("../actor/fields/damage-trait-field.mjs").default;

    const SimpleTraitField: typeof import("../actor/fields/simple-trait-field.mjs").default;
    type SimpleTraitField = import("../actor/fields/simple-trait-field.mjs").default;

    const TravelField: typeof import("../actor/fields/travel-field.mjs").default;
    type TravelField = import("../actor/fields/travel-field.mjs").default;

    // System flags model (data/actor/group-system-flags.mjs).
    const GroupSystemFlags: typeof import("../actor/group-system-flags.mjs").default;
    type GroupSystemFlags = import("../actor/group-system-flags.mjs").default;

    // Shared actor field bundles (data/actor/templates/_fields.mjs).
    const AttributesFields: typeof import("../actor/templates/_fields.mjs").AttributesFields;
    type AttributesFields = import("../actor/templates/_fields.mjs").AttributesFields;

    const DetailsFields: typeof import("../actor/templates/_fields.mjs").DetailsField;
    type DetailsFields = import("../actor/templates/_fields.mjs").DetailsField;

    const TraitsFields: typeof import("../actor/templates/_fields.mjs").TraitsField;
    type TraitsFields = import("../actor/templates/_fields.mjs").TraitsField;

    // Actor data templates.
    const CommonTemplate: typeof import("../actor/templates/common.mjs").CommonTemplate;
    type CommonTemplate = import("../actor/templates/common.mjs").CommonTemplate;

    const CreatureTemplate: typeof import("../actor/templates/creature.mjs").CreatureTemplate;
    type CreatureTemplate = import("../actor/templates/creature.mjs").CreatureTemplate;
  }
}

export {};
