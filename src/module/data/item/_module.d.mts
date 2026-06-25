/**
 * `dnd5e.dataModels.item` — runtime API surface for item system data models, mirroring
 * `module/data/item/_module.mjs`. Every member is exposed as BOTH a value (`const` → the
 * constructor/field) and a type (`type` → the instance), inside an OPEN namespace so modules can
 * declaration-merge their own models/fields/templates in.
 *
 * Member names mirror the runtime `_module.mjs` exports. Templates and field shims are default
 * exports; `startingEquipment` is a re-exported nested namespace (`export * as startingEquipment`)
 * surfaced here with its `EquipmentEntryData` + `StartingEquipmentTemplate` members.
 *
 * Paths are relative to this fragment (`src/module/_api/`), i.e. `../item/<file>.mjs`.
 */

declare global {
  namespace dnd5e.dataModels.item {
    /* ---- Concrete item data models ---- */
    const BackgroundData: typeof import("../item/background.mjs").default;
    type BackgroundData = import("../item/background.mjs").default;
    const ClassData: typeof import("../item/class.mjs").default;
    type ClassData = import("../item/class.mjs").default;
    const ConsumableData: typeof import("../item/consumable.mjs").default;
    type ConsumableData = import("../item/consumable.mjs").default;
    const ContainerData: typeof import("../item/container.mjs").default;
    type ContainerData = import("../item/container.mjs").default;
    const EquipmentData: typeof import("../item/equipment.mjs").default;
    type EquipmentData = import("../item/equipment.mjs").default;
    const FacilityData: typeof import("../item/facility.mjs").default;
    type FacilityData = import("../item/facility.mjs").default;
    const FeatData: typeof import("../item/feat.mjs").default;
    type FeatData = import("../item/feat.mjs").default;
    const LootData: typeof import("../item/loot.mjs").default;
    type LootData = import("../item/loot.mjs").default;
    const RaceData: typeof import("../item/race.mjs").default;
    type RaceData = import("../item/race.mjs").default;
    const SpellData: typeof import("../item/spell.mjs").default;
    type SpellData = import("../item/spell.mjs").default;
    const SubclassData: typeof import("../item/subclass.mjs").default;
    type SubclassData = import("../item/subclass.mjs").default;
    const ToolData: typeof import("../item/tool.mjs").default;
    type ToolData = import("../item/tool.mjs").default;
    const WeaponData: typeof import("../item/weapon.mjs").default;
    type WeaponData = import("../item/weapon.mjs").default;

    /* ---- Config map (item type key → constructor) ---- */
    const config: {
      background: typeof import("../item/background.mjs").default;
      class: typeof import("../item/class.mjs").default;
      consumable: typeof import("../item/consumable.mjs").default;
      container: typeof import("../item/container.mjs").default;
      equipment: typeof import("../item/equipment.mjs").default;
      facility: typeof import("../item/facility.mjs").default;
      feat: typeof import("../item/feat.mjs").default;
      loot: typeof import("../item/loot.mjs").default;
      race: typeof import("../item/race.mjs").default;
      spell: typeof import("../item/spell.mjs").default;
      subclass: typeof import("../item/subclass.mjs").default;
      tool: typeof import("../item/tool.mjs").default;
      weapon: typeof import("../item/weapon.mjs").default;
    };

    /* ---- Fields (value classes added to their shims) ---- */
    const ItemTypeField: typeof import("../item/fields/item-type-field.mjs").ItemTypeField;
    type ItemTypeField = import("../item/fields/item-type-field.mjs").ItemTypeField;
    const SpellcastingField: typeof import("../item/fields/spellcasting-field.mjs").default;
    type SpellcastingField = import("../item/fields/spellcasting-field.mjs").default;

    /* ---- Mixin templates (default exports) ---- */
    const ActivitiesTemplate: typeof import("../item/templates/activities.mjs").default;
    type ActivitiesTemplate = import("../item/templates/activities.mjs").default;
    const AdvancementTemplate: typeof import("../item/templates/advancement.mjs").default;
    type AdvancementTemplate = import("../item/templates/advancement.mjs").default;
    const EquippableItemTemplate: typeof import("../item/templates/equippable-item.mjs").default;
    type EquippableItemTemplate = import("../item/templates/equippable-item.mjs").default;
    const IdentifiableTemplate: typeof import("../item/templates/identifiable.mjs").default;
    type IdentifiableTemplate = import("../item/templates/identifiable.mjs").default;
    const ItemDescriptionTemplate: typeof import("../item/templates/item-description.mjs").default;
    type ItemDescriptionTemplate = import("../item/templates/item-description.mjs").default;
    const ItemTypeTemplate: typeof import("../item/templates/item-type.mjs").default;
    type ItemTypeTemplate = import("../item/templates/item-type.mjs").default;
    const MountableTemplate: typeof import("../item/templates/mountable.mjs").default;
    type MountableTemplate = import("../item/templates/mountable.mjs").default;
    const PhysicalItemTemplate: typeof import("../item/templates/physical-item.mjs").default;
    type PhysicalItemTemplate = import("../item/templates/physical-item.mjs").default;

    /* ---- Nested namespace (`export * as startingEquipment`) ---- */
    namespace startingEquipment {
      const EquipmentEntryData: typeof import("../item/templates/starting-equipment.mjs").EquipmentEntryData;
      type EquipmentEntryData = import("../item/templates/starting-equipment.mjs").EquipmentEntryData;
      const StartingEquipmentTemplate: typeof import("../item/templates/starting-equipment.mjs").StartingEquipmentTemplate;
      type StartingEquipmentTemplate = import("../item/templates/starting-equipment.mjs").StartingEquipmentTemplate;
    }
  }
}

export {};
