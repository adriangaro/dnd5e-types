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
    const BackgroundData: typeof import("./background.mjs").default;
    type BackgroundData = import("./background.mjs").default;
    const ClassData: typeof import("./class.mjs").default;
    type ClassData = import("./class.mjs").default;
    const ConsumableData: typeof import("./consumable.mjs").default;
    type ConsumableData = import("./consumable.mjs").default;
    const ContainerData: typeof import("./container.mjs").default;
    type ContainerData = import("./container.mjs").default;
    const EquipmentData: typeof import("./equipment.mjs").default;
    type EquipmentData = import("./equipment.mjs").default;
    const FacilityData: typeof import("./facility.mjs").default;
    type FacilityData = import("./facility.mjs").default;
    const FeatData: typeof import("./feat.mjs").default;
    type FeatData = import("./feat.mjs").default;
    const LootData: typeof import("./loot.mjs").default;
    type LootData = import("./loot.mjs").default;
    const RaceData: typeof import("./race.mjs").default;
    type RaceData = import("./race.mjs").default;
    const SpellData: typeof import("./spell.mjs").default;
    type SpellData = import("./spell.mjs").default;
    const SubclassData: typeof import("./subclass.mjs").default;
    type SubclassData = import("./subclass.mjs").default;
    const ToolData: typeof import("./tool.mjs").default;
    type ToolData = import("./tool.mjs").default;
    const WeaponData: typeof import("./weapon.mjs").default;
    type WeaponData = import("./weapon.mjs").default;

    /* ---- Config map (item type key → constructor) ---- */
    const config: {
      background: typeof import("./background.mjs").default;
      class: typeof import("./class.mjs").default;
      consumable: typeof import("./consumable.mjs").default;
      container: typeof import("./container.mjs").default;
      equipment: typeof import("./equipment.mjs").default;
      facility: typeof import("./facility.mjs").default;
      feat: typeof import("./feat.mjs").default;
      loot: typeof import("./loot.mjs").default;
      race: typeof import("./race.mjs").default;
      spell: typeof import("./spell.mjs").default;
      subclass: typeof import("./subclass.mjs").default;
      tool: typeof import("./tool.mjs").default;
      weapon: typeof import("./weapon.mjs").default;
    };

    /* ---- Fields (value classes added to their shims) ---- */
    const ItemTypeField: typeof import("./fields/item-type-field.mjs").ItemTypeField;
    type ItemTypeField = import("./fields/item-type-field.mjs").ItemTypeField;
    const SpellcastingField: typeof import("./fields/spellcasting-field.mjs").default;
    type SpellcastingField = import("./fields/spellcasting-field.mjs").default;

    /* ---- Mixin templates (default exports) ---- */
    const ActivitiesTemplate: typeof import("./templates/activities.mjs").default;
    type ActivitiesTemplate = import("./templates/activities.mjs").default;
    const AdvancementTemplate: typeof import("./templates/advancement.mjs").default;
    type AdvancementTemplate = import("./templates/advancement.mjs").default;
    const EquippableItemTemplate: typeof import("./templates/equippable-item.mjs").default;
    type EquippableItemTemplate = import("./templates/equippable-item.mjs").default;
    const IdentifiableTemplate: typeof import("./templates/identifiable.mjs").default;
    type IdentifiableTemplate = import("./templates/identifiable.mjs").default;
    const ItemDescriptionTemplate: typeof import("./templates/item-description.mjs").default;
    type ItemDescriptionTemplate = import("./templates/item-description.mjs").default;
    const ItemTypeTemplate: typeof import("./templates/item-type.mjs").default;
    type ItemTypeTemplate = import("./templates/item-type.mjs").default;
    const MountableTemplate: typeof import("./templates/mountable.mjs").default;
    type MountableTemplate = import("./templates/mountable.mjs").default;
    const PhysicalItemTemplate: typeof import("./templates/physical-item.mjs").default;
    type PhysicalItemTemplate = import("./templates/physical-item.mjs").default;

    /* ---- Nested namespace (`export * as startingEquipment`) ---- */
    namespace startingEquipment {
      const EquipmentEntryData: typeof import("./templates/starting-equipment.mjs").EquipmentEntryData;
      type EquipmentEntryData = import("./templates/starting-equipment.mjs").EquipmentEntryData;
      const StartingEquipmentTemplate: typeof import("./templates/starting-equipment.mjs").StartingEquipmentTemplate;
      type StartingEquipmentTemplate = import("./templates/starting-equipment.mjs").StartingEquipmentTemplate;
    }
  }
}

export {};
