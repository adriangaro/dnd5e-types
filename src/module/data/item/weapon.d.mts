/**
 * Data definition for Weapon items.
 *
 * Follows the canonical item pattern (see loot.d.mts): schema composed from mixed templates via
 * `SystemDataModel.MergeTemplateSchemas` + own fields, Seam-D overrides folded at a single point,
 * Seam-C registration on `dnd5e.types.DataModelConfig.Item`.
 */

import SystemDataModel, { ItemDataModel, ItemDataModelMixin } from "./../abstract/system-data-model.mjs";
import type ActivitiesTemplate from "./templates/activities.mjs";
import type ItemDescriptionTemplate from "./templates/item-description.mjs";
import type IdentifiableTemplate from "./templates/identifiable.mjs";
import type ItemTypeTemplate from "./templates/item-type.mjs";
import type PhysicalItemTemplate from "./templates/physical-item.mjs";
import type EquippableItemTemplate from "./templates/equippable-item.mjs";
import type MountableTemplate from "./templates/mountable.mjs";

declare global {
  namespace dnd5e.types.Item.Weapon {
    /** Templates folded by `ItemDataModel.mixin(...)`. */
    type Templates = [
      typeof ActivitiesTemplate,
      typeof ItemDescriptionTemplate,
      typeof IdentifiableTemplate,
      typeof ItemTypeTemplate,
      typeof PhysicalItemTemplate,
      typeof EquippableItemTemplate,
      typeof MountableTemplate,
    ];

    /** Pre-Seam-D source schema: mixed template schemas + weapon's own fields. */
    type BaseSchema = dnd5e.types.MergeSchemas<
      SystemDataModel.MergeTemplateSchemas<dnd5e.types.Item.Weapon.Templates>,
      {
        ammunition: foundry.data.fields.SchemaField<{
          type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.ConsumableType.Ammo.TypeKey | "", { required: true; blank: true }>;
        }>;
        armor: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{ integer: true; min: 0 }>;
        }>;
        damage: foundry.data.fields.SchemaField<{
          base: dnd5e.types.fields.DamageField;
          bonus: dnd5e.types.fields.FormulaField;
          versatile: dnd5e.types.fields.DamageField;
        }>;
        magicalBonus: dnd5e.types.fields.FormulaField<{ deterministic: true }>;
        mastery: dnd5e.types.fields.RestrictedStringField<dnd5e.types.WeaponMastery.TypeKey | "", { required: true; blank: true }>;
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperty.Weapon.TypeKey, { required: true; blank: false }>
        >;
        proficient: foundry.data.fields.NumberField<{
          required: true;
          min: 0;
          max: 1;
          integer: true;
          initial: null;
        }>;
        range: foundry.data.fields.SchemaField<{
          value: foundry.data.fields.NumberField<{ min: 0 }>;
          long: foundry.data.fields.NumberField<{ min: 0 }>;
          reach: foundry.data.fields.NumberField<{ min: 0 }>;
          units: dnd5e.types.fields.RestrictedStringField<dnd5e.types.DistanceUnit.TypeKey, { required: true; blank: false }>;
        }>;
        // ItemTypeField({ value: "simpleM", subtype: false }) → value + baseItem only.
        // value = weapon category (WeaponType), baseItem = specific base weapon (WeaponId); both expandable.
        type: dnd5e.types.fields.ItemTypeField<{
          value: dnd5e.types.fields.RestrictedStringField<dnd5e.types.WeaponType.TypeKey | "", { required: true; blank: true }>;
          baseItem: dnd5e.types.fields.RestrictedStringField<dnd5e.types.WeaponId.TypeKey | "", { required: true; blank: true }>;
        }>;
      }
    >;
  }

  namespace dnd5e.types.DataModelConfig {
    /** Seam C: register the weapon subtype on the interface the funnel reads. */
    interface Item {
      weapon: typeof import("./weapon.mjs").default;
    }
  }

  namespace dnd5e.types.DataModelConfig.Item.weapon {
    interface OverrideSchema extends foundry.data.fields.DataSchema {}
    interface OverrideBase extends fvttUtils.AnyObject {}
    interface OverrideDerived extends fvttUtils.AnyObject {}
  }
}

/** The real `ItemDataModel.mixin(...)` base: merged schema + every template's instance methods + statics. */
declare const WeaponData_base: ReturnType<
  typeof ItemDataModelMixin<WeaponData.Schema, WeaponData.Base, WeaponData.Derived, dnd5e.types.Item.Weapon.Templates>
>;

declare class WeaponData extends WeaponData_base {
  static override _systemType: "weapon";
  static override defineSchema(): WeaponData.Schema;

  /** Modes that can be used when making an attack with this weapon. */
  get attackModes(): foundry.applications.fields.FormSelectOption[];

  /** Ammunition that can be used with this weapon. */
  get ammunitionOptions(): Array<{
    item: globalThis.Item.Implementation;
    value: string;
    label: string;
    disabled: boolean;
  }>;

  /** Attack classification of this weapon. */
  get attackClassification(): "weapon" | "unarmed";

  /** Attack type offered by this weapon. */
  get attackType(): "melee" | "ranged" | null;

  /** Available abilities that can be used to attack with this weapon. */
  get availableAbilities(): Set<dnd5e.types.Ability.TypeKey> | null;

  /** Properties displayed in chat. */
  get chatProperties(): string[];

  /** Properties displayed on the item card. */
  get cardProperties(): string[];

  /** Is the range value relevant to this weapon? */
  get hasRange(): boolean;

  /** Is this item a separate large object like a siege engine or vehicle component that is usually mounted on fixtures rather than equipped, and has its own AC and HP? */
  get isMountable(): boolean;

  /** Does the Weapon implement a versatile damage roll as part of its usage? */
  get isVersatile(): boolean;

  /** Mastery options that can be used when attacking with this weapon. */
  get masteryOptions(): Array<{ value: dnd5e.types.WeaponMastery.TypeKey; label: string; rule: boolean }> | null;

  /** Does this item have base damage defined in `damage.base` to offer to an activity? */
  get offersBaseDamage(): boolean;

  /** The proficiency multiplier for this item. */
  get proficiencyMultiplier(): number;

  /** Attack types that can be used with this item by default. */
  get validAttackTypes(): Set<dnd5e.types.AttackType.TypeKey>;
}

declare namespace WeaponData {
  /** Source schema with Seam-D `OverrideSchema` folded in (single fold point). */
  type Schema = dnd5e.types.MergeSchemas<
    dnd5e.types.Item.Weapon.BaseSchema,
    dnd5e.types.DataModelConfig.Item.weapon.OverrideSchema
  >;
  type Base = dnd5e.types.MergeData<fvttUtils.EmptyObject, dnd5e.types.DataModelConfig.Item.weapon.OverrideBase>;

  /**
   * Derived overlay: `prepareDerivedData` augments the `type` object with `label`/`identifier`.
   * A top-level `type` key in DerivedData REPLACES the schema `type`, so intersect-preserve the
   * initialized schema shape (value/baseItem) and add the derived keys.
   */
  interface DerivedDefault {
    type: dnd5e.types.InitializedOf<WeaponData.Schema>["type"] & {
      label: string;
      identifier: string;
    };
  }
  type Derived = dnd5e.types.MergeData<DerivedDefault, dnd5e.types.DataModelConfig.Item.weapon.OverrideDerived>;
}

export default WeaponData;
