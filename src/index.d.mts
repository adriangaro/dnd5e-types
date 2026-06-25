/**
 * @adriangaro/dnd5e-types — root barrel.
 *
 * Establishes the global `fvttUtils` bridge and the `dnd5e.types` namespace, then
 * side-effect-imports every submodule so all declaration merges register for consumers.
 * Consumers add this package to `compilerOptions.types` AFTER fvtt-types:
 *
 *   { "compilerOptions": { "types": ["fvtt-types", "@adriangaro/dnd5e-types"] } }
 *
 * Targets dnd5e v6 (Foundry v14) on foundry-vtt-types `main`.
 */

import * as _fvttUtils from "fvtt-types/utils";

// --- Type-utility kernel ----------------------------------------------------
import "./types/expandable.mjs";
import "./types/schema.mjs";
import "./types/fields.mjs";

// --- Custom field shims -----------------------------------------------------
import "./module/data/fields/mapping-field.mjs";
import "./module/data/fields/formula-field.mjs";
import "./module/data/fields/roll-config-field.mjs";
import "./module/data/fields/local-document-field.mjs";
import "./module/data/fields/advancement-field.mjs";
import "./module/data/fields/advancement-data-field.mjs";
import "./module/data/fields/advantage-mode-field.mjs";
import "./module/data/fields/identifier-field.mjs";
import "./module/data/fields/typed-collection-field.mjs";

// --- Shared data fields (damage/activation/duration/range/target/uses/source) -
import "./module/data/shared/damage-field.mjs";
import "./module/data/shared/activation-field.mjs";
import "./module/data/shared/duration-field.mjs";
import "./module/data/shared/range-field.mjs";
import "./module/data/shared/target-field.mjs";
import "./module/data/shared/uses-field.mjs";
import "./module/data/shared/source-field.mjs";
import "./module/data/shared/movement-field.mjs";
import "./module/data/shared/senses-field.mjs";
import "./module/data/shared/creature-type-field.mjs";

// --- Top-level module utilities (utils/enrichers/filter/migration/…) --------
import "./module/utils.mjs";
import "./module/enrichers.mjs";
import "./module/filter.mjs";
import "./module/migration.mjs";
import "./module/registry.mjs";
import "./module/drag-drop.mjs";
import "./module/tooltips.mjs";
import "./module/settings.mjs";

// --- Canvas layer (placeables, placement, detection modes) ------------------
import "./module/canvas/api/base-placement.mjs";
import "./module/canvas/template-placement.mjs";
import "./module/canvas/token-placement.mjs";
import "./module/canvas/token.mjs";
import "./module/canvas/note.mjs";
import "./module/canvas/ruler.mjs";
import "./module/canvas/ability-template.mjs";
import "./module/canvas/map-location-control-icon.mjs";
import "./module/canvas/detection-modes/blindsight.mjs";
import "./module/canvas/layers/tokens.mjs";

// --- Core fvtt-types CONFIG funnels (statusEffects/specialStatusEffects/Dice) -
import "./module/config/_core-funnels.mjs";

// --- The dnd5e runtime API (game.dnd5e / globalThis.dnd5e) -------------------
import "./module/_api.mjs";
// dnd5e.dataModels.* / dnd5e.documents.{activity,advancement} sub-namespace fragments
// `dnd5e.dataModels.*` value surface — the runtime-mirroring hub side-effect-imports every
// `data/<sub>/_module.d.mts` sub-barrel (mirrors `dnd5e.mjs`: `import * as dataModels from "./module/data/_module.mjs"`).
import "./module/data/_module.mjs";
import "./module/_api/applications-api.mjs";
import "./module/_api/applications-activity.mjs";
import "./module/_api/applications-actor.mjs";
import "./module/_api/applications-advancement.mjs";
import "./module/_api/applications-calendar.mjs";
import "./module/_api/applications-combat.mjs";
import "./module/_api/applications-components.mjs";
import "./module/_api/applications-dice.mjs";
import "./module/_api/applications-item.mjs";
import "./module/_api/applications-journal.mjs";
import "./module/_api/applications-regionBehavior.mjs";
import "./module/_api/applications-settings.mjs";
import "./module/_api/applications-shared.mjs";
import "./module/_api/applications-root.mjs";
import "./module/_api/documents-activity.mjs";
import "./module/_api/documents-advancement.mjs";

// --- CONFIG.DND5E domains (Seam A) ------------------------------------------
import "./module/config/abilityActivationTypes.mjs";
import "./module/config/abilityConsumptionTypes.mjs";
import "./module/config/ability.mjs";
import "./module/config/activityActivationTypes.mjs";
import "./module/config/activityConsumptionTypes.mjs";
import "./module/config/activityTypes.mjs";
import "./module/config/actorSizes.mjs";
import "./module/config/advancementTypes.mjs";
import "./module/config/aggregateDamageDisplay.mjs";
import "./module/config/alignments.mjs";
import "./module/config/ammoIds.mjs";
import "./module/config/areaTargetTypes.mjs";
import "./module/config/armorClasses.mjs";
import "./module/config/armorIds.mjs";
import "./module/config/armorProficienciesMap.mjs";
import "./module/config/armorProficiencies.mjs";
import "./module/config/armorSpeedReduction.mjs";
import "./module/config/armorTypes.mjs";
import "./module/config/ASCII.mjs";
import "./module/config/attackClassifications.mjs";
import "./module/config/attackModes.mjs";
import "./module/config/attackTypes.mjs";
import "./module/config/attunementTypes.mjs";
import "./module/config/bloodied.mjs";
import "./module/config/calendarDeltasRecoveryMapping.mjs";
import "./module/config/calendar.mjs";
import "./module/config/characterFlags.mjs";
import "./module/config/communicationTypes.mjs";
import "./module/config/conditionEffects.mjs";
import "./module/config/conditionTypes.mjs";
import "./module/config/consumableResources.mjs";
import "./module/config/consumableTypes.mjs";
import "./module/config/containerTypes.mjs";
import "./module/config/cover.mjs";
import "./module/config/crafting.mjs";
import "./module/config/creatureTypes.mjs";
import "./module/config/currencies.mjs";
import "./module/config/damageScalingModes.mjs";
import "./module/config/damageTypes.mjs";
import "./module/config/defaultAbilities.mjs";
import "./module/config/defaultArtwork.mjs";
import "./module/config/defaultCurrency.mjs";
import "./module/config/defaultUnits.mjs";
import "./module/config/dieSteps.mjs";
import "./module/config/difficultTerrainTypes.mjs";
import "./module/config/distanceUnits.mjs";
import "./module/config/enchantmentPeriods.mjs";
import "./module/config/encumbrance.mjs";
import "./module/config/epicBoonInterval.mjs";
import "./module/config/equipmentTypes.mjs";
import "./module/config/facilities.mjs";
import "./module/config/featureTypes.mjs";
import "./module/config/focusTypes.mjs";
import "./module/config/groupTypes.mjs";
import "./module/config/habitats.mjs";
import "./module/config/healingTypes.mjs";
import "./module/config/hitDieTypes.mjs";
import "./module/config/individualTargetTypes.mjs";
import "./module/config/itemActionTypes.mjs";
import "./module/config/itemProperties.mjs";
import "./module/config/itemRarity.mjs";
import "./module/config/languages.mjs";
import "./module/config/limitedUsePeriods.mjs";
import "./module/config/lootTypes.mjs";
import "./module/config/mapLocationMarker.mjs";
import "./module/config/maxAbilityScore.mjs";
import "./module/config/maxLevel.mjs";
import "./module/config/miscEquipmentTypes.mjs";
import "./module/config/movementTypes.mjs";
import "./module/config/movementUnits.mjs";
import "./module/config/neverBlockStatuses.mjs";
import "./module/config/permanentTimePeriods.mjs";
import "./module/config/proficiencyLevels.mjs";
import "./module/config/rangeTypes.mjs";
import "./module/config/requests.mjs";
import "./module/config/restTypes.mjs";
import "./module/config/rules.mjs";
import "./module/config/ruleTypes.mjs";
import "./module/config/scalarTimePeriods.mjs";
import "./module/config/senses.mjs";
import "./module/config/shieldIds.mjs";
import "./module/config/skill.mjs";
import "./module/config/skillPassive.mjs";
import "./module/config/sourceBooks.mjs";
import "./module/config/sourcePacks.mjs";
import "./module/config/specialTimePeriods.mjs";
import "./module/config/spellcasting.mjs";
import "./module/config/spellLevels.mjs";
import "./module/config/spellListTypes.mjs";
import "./module/config/spellPreparationStates.mjs";
import "./module/config/spellScalingModes.mjs";
import "./module/config/spellSchools.mjs";
import "./module/config/spellScrollIds.mjs";
import "./module/config/spellScrollValues.mjs";
import "./module/config/staticAbilityActivationTypes.mjs";
import "./module/config/statusEffects.mjs";
import "./module/config/_stubs.mjs";
import "./module/config/targetTypes.mjs";
import "./module/config/themes.mjs";
import "./module/config/timePeriods.mjs";
import "./module/config/timeUnits.mjs";
import "./module/config/tokenHpColors.mjs";
import "./module/config/tokenRingColors.mjs";
import "./module/config/tokenRulerColors.mjs";
import "./module/config/toolIds.mjs";
import "./module/config/toolProficiencies.mjs";
import "./module/config/tools.mjs";
import "./module/config/toolTypes.mjs";
import "./module/config/trackableAttributes.mjs";
import "./module/config/traitModes.mjs";
import "./module/config/traits.mjs";
import "./module/config/transformation.mjs";
import "./module/config/travelPace.mjs";
import "./module/config/travelTimes.mjs";
import "./module/config/travelTypes.mjs";
import "./module/config/travelUnits.mjs";
import "./module/config/treasure.mjs";
import "./module/config/validProperties.mjs";
import "./module/config/vehicleTypes.mjs";
import "./module/config/volumeUnits.mjs";
import "./module/config/weaponAndArmorProficiencyLevels.mjs";
import "./module/config/weaponClassificationMap.mjs";
import "./module/config/weaponIds.mjs";
import "./module/config/weaponMasteries.mjs";
import "./module/config/weaponProficienciesMap.mjs";
import "./module/config/weaponProficiencies.mjs";
import "./module/config/weaponTypeMap.mjs";
import "./module/config/weaponTypes.mjs";
import "./module/config/weightUnits.mjs";

// --- Domain type defs (`dnd5e.types.{data,documents,applications,canvas,core}.*`; co-located, hand-managed) ---
import "./module/documents/_types.mjs";
import "./module/documents/activity/_types.mjs";
import "./module/documents/advancement/_types.mjs";
import "./module/documents/mixins/_types.mjs";
import "./module/_types.mjs";
import "./module/applications/_types.mjs";
import "./module/applications/activity/_types.mjs";
import "./module/applications/actor/_types.mjs";
import "./module/applications/advancement/_types.mjs";
import "./module/applications/api/_types.mjs";
import "./module/applications/calendar/_types.mjs";
import "./module/applications/combat/_types.mjs";
import "./module/applications/components/_types.mjs";
import "./module/applications/dice/_types.mjs";
import "./module/applications/journal/_types.mjs";
import "./module/applications/settings/_types.mjs";
import "./module/canvas/_types.mjs";
import "./module/data/_types.mjs";
import "./module/data/abstract/_types.mjs";
import "./module/data/active-effect/_types.mjs";
import "./module/data/activity/_types.mjs";
import "./module/data/activity/fields/_types.mjs";
import "./module/data/actor/_types.mjs";
import "./module/data/actor/fields/_types.mjs";
import "./module/data/actor/templates/_types.mjs";
import "./module/data/advancement/_types.mjs";
import "./module/data/calendar/_types.mjs";
import "./module/data/chat-message/_types.mjs";
import "./module/data/chat-message/fields/_types.mjs";
import "./module/data/fields/_types.mjs";
import "./module/data/item/_types.mjs";
import "./module/data/item/fields/_types.mjs";
import "./module/data/item/templates/_types.mjs";
import "./module/data/journal/_types.mjs";
import "./module/data/region-behavior/_types.mjs";
import "./module/data/settings/_types.mjs";
import "./module/data/shared/_types.mjs";
import "./module/data/spellcasting/_types.mjs";
import "./module/data/user/_types.mjs";
// --- Roll configuration family (curated into dnd5e.types.Dice) ----------
import "./module/dice/_types.mjs";
// --- Dice classes -----------------------------------------------------------
import "./module/dice/basic-roll.mjs";
import "./module/dice/d20-roll.mjs";
import "./module/dice/damage-roll.mjs";
import "./module/dice/basic-die.mjs";
import "./module/dice/d20-die.mjs";
import "./module/dice/aggregate-damage-rolls.mjs";
import "./module/dice/simplify-roll-formula.mjs";

// --- Abstract data-model spine ----------------------------------------------
import "./module/data/abstract/system-data-model.mjs";
import "./module/data/abstract/actor-data-model.mjs";
import "./module/data/abstract/item-data-model.mjs";
import "./module/data/abstract/sparse-data-model.mjs";
import "./module/data/abstract/chat-message-data-model.mjs";
import "./module/data/abstract/active-effect-data-model.mjs";

// --- Actor custom fields + top-level terrain data ---------------------------
import "./module/data/actor/fields/ac-formulas-field.mjs";
import "./module/data/actor/fields/simple-trait-field.mjs";
import "./module/data/actor/fields/damage-trait-field.mjs";
import "./module/data/actor/fields/travel-field.mjs";
import "./module/data/terrain-data.mjs";

// --- Document subtype data models (chat-message / active-effect / journal) ---
import "./module/data/chat-message/fields/activations-field.mjs";
import "./module/data/chat-message/fields/deltas-field.mjs";
import "./module/data/chat-message/turn-message-data.mjs";
import "./module/data/chat-message/bastion-attack-message-data.mjs";
import "./module/data/chat-message/bastion-turn-message-data.mjs";
import "./module/data/chat-message/request-message-data.mjs";
import "./module/data/chat-message/rest-message-data.mjs";
import "./module/data/chat-message/time-passed-message-data.mjs";
import "./module/data/chat-message/usage-message-data.mjs";
import "./module/data/active-effect/base.mjs";
import "./module/data/active-effect/enchantment.mjs";
import "./module/data/journal/class.mjs";
import "./module/data/journal/map.mjs";
import "./module/data/journal/rule.mjs";
import "./module/data/journal/spells.mjs";
import "./module/data/journal/subclass.mjs";
import "./module/data/spellcasting/spellcasting-model.mjs";

// --- Settings models --------------------------------------------------------
import "./module/data/settings/bastion-setting.mjs";
import "./module/data/settings/calendar-setting.mjs";
import "./module/data/settings/primary-party-setting.mjs";
import "./module/data/settings/transformation-setting.mjs";

// --- User system flags ------------------------------------------------------
import "./module/data/user/user-system-flags.mjs";

// --- World collections ------------------------------------------------------
import "./module/data/collection/actors-collection.mjs";
import "./module/data/collection/items-collection.mjs";

// --- Region behaviors -------------------------------------------------------
import "./module/data/region-behavior/apply-active-effect.mjs";
import "./module/data/region-behavior/difficult-terrain.mjs";
import "./module/data/region-behavior/rotate-area.mjs";

// --- Calendars --------------------------------------------------------------
import "./module/data/calendar/calendar-data.mjs";
import "./module/data/calendar/calendar-of-harptos.mjs";
import "./module/data/calendar/calendar-of-greyhawk.mjs";
import "./module/data/calendar/calendar-of-khorvaire.mjs";

// --- Applications: Layer 0 foundation (api/) --------------------------------
import "./module/applications/fields.mjs";
import "./module/applications/api/application-v2-mixin.mjs";
import "./module/applications/api/application.mjs";
import "./module/applications/api/dialog.mjs";
import "./module/applications/api/document-sheet.mjs";
import "./module/applications/api/drag-drop-mixin.mjs";
import "./module/applications/api/pseudo-document-sheet.mjs";
import "./module/applications/api/primary-sheet-mixin.mjs";

// --- Actor data models ------------------------------------------------------
import "./module/data/actor/templates/attributes.mjs";
import "./module/data/actor/templates/details.mjs";
import "./module/data/actor/templates/traits.mjs";
import "./module/data/shared/currency.mjs";
import "./module/data/actor/templates/common.mjs";
import "./module/data/actor/templates/creature.mjs";
import "./module/data/actor/templates/group.mjs";
import "./module/data/actor/character.mjs";
import "./module/data/actor/npc.mjs";
import "./module/data/actor/vehicle.mjs";
import "./module/data/actor/group.mjs";
import "./module/data/actor/encounter.mjs";

// --- Activity foundation (registry + base + shared activity fields) ----------
import "./module/data/activity/fields/applied-effect-field.mjs";
import "./module/data/activity/fields/consumption-targets-field.mjs";
import "./module/data/activity/base-activity.mjs";
import "./module/data/activity/_registry.mjs";
import "./module/documents/activity/mixin.mjs";
import "./module/data/activity/utility-data.mjs";
import "./module/documents/activity/utility.mjs";
import "./module/data/activity/save-data.mjs";
import "./module/documents/activity/save.mjs";
import "./module/data/activity/attack-data.mjs";
import "./module/documents/activity/attack.mjs";
import "./module/data/activity/cast-data.mjs";
import "./module/documents/activity/cast.mjs";
import "./module/data/activity/check-data.mjs";
import "./module/documents/activity/check.mjs";
import "./module/data/activity/damage-data.mjs";
import "./module/documents/activity/damage.mjs";
import "./module/data/activity/enchant-data.mjs";
import "./module/documents/activity/enchant.mjs";
import "./module/data/activity/forward-data.mjs";
import "./module/documents/activity/forward.mjs";
import "./module/data/activity/heal-data.mjs";
import "./module/documents/activity/heal.mjs";
import "./module/data/activity/order-data.mjs";
import "./module/documents/activity/order.mjs";
import "./module/data/activity/summon-data.mjs";
import "./module/documents/activity/summon.mjs";
import "./module/data/activity/transform-data.mjs";
import "./module/documents/activity/transform.mjs";

// --- Advancement foundation -------------------------------------------------
import "./module/data/advancement/base-advancement.mjs";
import "./module/data/advancement/spell-config.mjs";
import "./module/data/advancement/_registry.mjs";
import "./module/documents/advancement/mixin.mjs";
import "./module/data/advancement/item-grant-data.mjs";
import "./module/documents/advancement/item-grant.mjs";
import "./module/data/advancement/ability-score-improvement-data.mjs";
import "./module/documents/advancement/ability-score-improvement.mjs";
import "./module/data/advancement/item-choice-data.mjs";
import "./module/documents/advancement/item-choice.mjs";
import "./module/data/advancement/modify-item-data.mjs";
import "./module/documents/advancement/modify-item.mjs";
import "./module/data/advancement/scale-value-data.mjs";
import "./module/documents/advancement/scale-value.mjs";
import "./module/data/advancement/size-data.mjs";
import "./module/documents/advancement/size.mjs";
import "./module/data/advancement/subclass-data.mjs";
import "./module/documents/advancement/subclass.mjs";
import "./module/data/advancement/trait-data.mjs";
import "./module/documents/advancement/trait.mjs";

// --- Item foundation (collection field shims + templates) -------------------
import "./module/data/fields/activities-field.mjs";
import "./module/data/fields/advancement-collection-field.mjs";
import "./module/data/item/fields/item-type-field.mjs";
import "./module/data/item/templates/item-description.mjs";
import "./module/data/item/templates/item-type.mjs";
import "./module/data/item/templates/physical-item.mjs";
import "./module/data/item/templates/equippable-item.mjs";
import "./module/data/item/templates/identifiable.mjs";
import "./module/data/item/templates/mountable.mjs";
import "./module/data/item/templates/activities.mjs";
import "./module/data/item/templates/advancement.mjs";
import "./module/data/item/templates/starting-equipment.mjs";
import "./module/data/item/loot.mjs";
import "./module/data/item/background.mjs";
import "./module/data/item/class.mjs";
import "./module/data/item/consumable.mjs";
import "./module/data/item/container.mjs";
import "./module/data/item/equipment.mjs";
import "./module/data/item/facility.mjs";
import "./module/data/item/feat.mjs";
import "./module/data/item/race.mjs";
import "./module/data/item/spell.mjs";
import "./module/data/item/subclass.mjs";
import "./module/data/item/tool.mjs";
import "./module/data/item/weapon.mjs";

// --- Documents --------------------------------------------------------------
import "./module/documents/item.mjs";
import "./module/documents/actor/actor.mjs";
import "./module/documents/active-effect.mjs";
import "./module/documents/chat-message.mjs";
import "./module/documents/combat.mjs";
import "./module/documents/combatant.mjs";
import "./module/documents/combatant-group.mjs";
import "./module/documents/token.mjs";
import "./module/documents/user.mjs";
import "./module/documents/journal-entry-page.mjs";
import "./module/documents/adventure.mjs";

// --- Document helper classes (plain, not registered) ------------------------
import "./module/documents/scaling.mjs";
import "./module/documents/actor/select-choices.mjs";
import "./module/documents/actor/trait.mjs";
import "./module/documents/actor/bastion.mjs";
import "./module/documents/actor/hit-dice.mjs";
import "./module/documents/actor/proficiency.mjs";

// --- Funnels (engine wiring) ------------------------------------------------
import "./funnel/data-model-config.mjs";
import "./funnel/document-class-config.mjs";
import "./funnel/flag-config.mjs";
import "./funnel/system-config.mjs";

declare global {
  /** Re-export of `fvtt-types/utils` as a global, used pervasively by the kernel. */
  export import fvttUtils = _fvttUtils;

  namespace dnd5e {
    namespace types {
      /**
       * The shape of the global `CONFIG.DND5E` object. Assembled across many per-domain
       * declaration merges (Seam A). Domains add their keys (e.g. `abilities`, `skills`).
       */
      interface DND5EConfig {}

      /** Literal keys currently declared on `DND5EConfig`. */
      type DND5EConfigKey = dnd5e.types.ExtractKeys<DND5EConfig>;
    }
  }

  interface CONFIG {
    DND5E: dnd5e.types.DND5EConfig;
  }
}

export {};
