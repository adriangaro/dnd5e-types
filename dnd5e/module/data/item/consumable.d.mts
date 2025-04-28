import { filteredKeys } from "../../utils.mjs";
import SystemDataModel, { ItemDataModel } from "../abstract.mjs";
import BaseActivityData from "../activity/base-activity.mjs";
import DamageField from "../shared/damage-field.mjs";
import UsesField from "../shared/uses-field.mjs";
import ActivitiesTemplate from "./templates/activities.mjs";
import EquippableItemTemplate from "./templates/equippable-item.mjs";
import IdentifiableTemplate from "./templates/identifiable.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import ItemTypeTemplate from "./templates/item-type.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";
import ItemTypeField from "./fields/item-type-field.mjs";

declare class _ItemDataModel extends ItemDataModel {}
/**
 * Data definition for Consumable items.
 * @mixes ActivitiesTemplate
 * @mixes ItemDescriptionTemplate
 * @mixes ItemTypeTemplate
 * @mixes IdentifiableTemplate
 * @mixes PhysicalItemTemplate
 * @mixes EquippableItemTemplate
 *
 * @property {object} damage
 * @property {DamageData} damage.base    Damage caused by this ammunition.
 * @property {string} damage.replace     Should ammunition damage replace the base weapon's damage?
 * @property {number} magicalBonus       Magical bonus added to attack & damage rolls by ammunition.
 * @property {Set<string>} properties    Ammunition properties.
 * @property {object} uses
 * @property {boolean} uses.autoDestroy  Should this item be destroyed when it runs out of uses.
 */
declare class ConsumableData extends _ItemDataModel.mixin(
  ActivitiesTemplate, ItemDescriptionTemplate<'consumable'>, IdentifiableTemplate, ItemTypeTemplate<'consumable'>,
  PhysicalItemTemplate, EquippableItemTemplate
)<
  dnd5e.types.MergeSchemas<
    {
      type: ItemTypeField<{ label: "DND5E.ItemConsumableType" }>,
      damage: foundry.data.fields.SchemaField<{
        base: DamageField,
        replace: foundry.data.fields.BooleanField
      }>,
      magicalBonus: foundry.data.fields.NumberField<{ min: 0, integer: true }>,
      properties: foundry.data.fields.SetField<
        foundry.data.fields.StringField<
          foundry.data.fields.StringField.DefaultOptions,
          dnd5e.types.ItemProperties.Consumable.TypeKey, dnd5e.types.ItemProperties.Consumable.TypeKey, dnd5e.types.ItemProperties.Consumable.TypeKey
        >
      >,
      uses: UsesField<{
        autoDestroy: foundry.data.fields.BooleanField<{ required: true }>
      }>
    },
    {
      type: foundry.data.fields.SchemaField<
        {},
        ItemTypeField.DefaultOptions,
        {},
        {
          label: string
        }
      >
    }
  >
> {
  /* -------------------------------------------- */

  metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      enchantable: true,
      inventoryItem: true,
      inventoryOrder: 300
    }
  >;
  static get metadata(): fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      enchantable: true,
      inventoryItem: true,
      inventoryOrder: 300
    }
  >;


  /* -------------------------------------------- */
  /*  Data Migrations                             */
  /* -------------------------------------------- */

  /* -------------------------------------------- */

  /**
   * Migrate weapon damage from old parts.
   */
  static #migrateDamage(source: ConsumableData['_source'])

  /* -------------------------------------------- */

  /**
   * Migrate the properties object into a set.
   */
  static #migratePropertiesData(source: ConsumableData['_source'])

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /* -------------------------------------------- */

  /** @inheritDoc */
  getFavoriteData: () => Promise<
    ItemDataModel.FavoriteData & {
      subtitle: [string, string],
      uses: ReturnType<ConsumableData['getUsesData']> | null,
      quantity: number
    }
  >

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Properties displayed in chat.
   */
  get chatProperties(): string[]

  /* -------------------------------------------- */

  /**
   * Does this item have base damage defined in `damage.base` to offer to an activity?
   */
  get offersBaseDamage(): boolean

  /* -------------------------------------------- */

  /**
   * The proficiency multiplier for this item.
   */
  get proficiencyMultiplier(): number
}

export default ConsumableData;

