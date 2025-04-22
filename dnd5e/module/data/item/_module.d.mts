import BackgroundData from "./background.mjs";
import ClassData from "./class.mjs";
import ConsumableData from "./consumable.mjs";
import ContainerData from "./container.mjs";
import EquipmentData from "./equipment.mjs";
import FacilityData from "./facility.mjs";
import FeatData from "./feat.mjs";
import LootData from "./loot.mjs";
import RaceData from "./race.mjs";
import SpellData from "./spell.mjs";
import SubclassData from "./subclass.mjs";
import ToolData from "./tool.mjs";
import WeaponData from "./weapon.mjs";

export {
  BackgroundData,
  ClassData,
  ConsumableData,
  ContainerData,
  EquipmentData,
  FacilityData,
  FeatData,
  LootData,
  RaceData,
  SpellData,
  SubclassData,
  ToolData,
  WeaponData
};
export {default as EnchantmentField, EnchantmentData, EnchantmentError} from "./fields/enchantment-field.mjs";
export {default as ItemTypeField} from "./fields/item-type-field.mjs";
export {default as SpellcastingField} from "./fields/spellcasting-field.mjs";
export {default as SummonsField, SummonsData} from "./fields/summons-field.mjs";
export {default as ActionTemplate} from "./templates/action.mjs";
export {default as ActivatedEffectTemplate} from "./templates/activated-effect.mjs";
export {default as ActivitiesTemplate} from "./templates/activities.mjs";
export {default as EquippableItemTemplate} from "./templates/equippable-item.mjs";
export {default as IdentifiableTemplate} from "./templates/identifiable.mjs";
export {default as ItemDescriptionTemplate} from "./templates/item-description.mjs";
export {default as ItemTypeTemplate} from "./templates/item-type.mjs";
export {default as MountableTemplate} from "./templates/mountable.mjs";
export {default as PhysicalItemTemplate} from "./templates/physical-item.mjs";
export * as startingEquipment from "./templates/starting-equipment.mjs";

export const config: {
  background: typeof BackgroundData,
  container: typeof ContainerData,
  class: typeof ClassData,
  consumable: typeof ConsumableData,
  equipment: typeof EquipmentData,
  facility: typeof FacilityData,
  feat: typeof FeatData,
  loot: typeof LootData,
  race: typeof RaceData,
  spell: typeof SpellData,
  subclass: typeof SubclassData,
  tool: typeof ToolData,
  weapon: typeof WeaponData
};

declare global {
  namespace dnd5e.types {
    namespace DataModelConfig {
      interface Item {
        background: typeof BackgroundData,
        container: typeof ContainerData,
        class: typeof ClassData,
        consumable: typeof ConsumableData,
        equipment: typeof EquipmentData,
        facility: typeof FacilityData,
        feat: typeof FeatData,
        loot: typeof LootData,
        race: typeof RaceData,
        spell: typeof SpellData,
        subclass: typeof SubclassData,
        tool: typeof ToolData,
        weapon: typeof WeaponData
      }
    }
  }
}

declare module "fvtt-types/configuration" {
  interface DataModelConfig {
    Item: dnd5e.types.DataModelConfig.Item,
  }
}
