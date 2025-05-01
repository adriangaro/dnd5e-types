import { ItemDataModel } from "../abstract.mjs";
import ActivitiesTemplate from "./templates/activities.mjs";
import EquippableItemTemplate from "./templates/equippable-item.mjs";
import IdentifiableTemplate from "./templates/identifiable.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import ItemTypeTemplate from "./templates/item-type.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";
import MountableTemplate from "./templates/mountable.mjs";
import ItemTypeField from "./fields/item-type-field.mjs";

declare class _ItemDataModel extends ItemDataModel { }

/**
 * Data definition for Equipment items.
 * @mixes ActivitiesTemplate
 * @mixes ItemDescriptionTemplate
 * @mixes ItemTypeTemplate
 * @mixes IdentifiableTemplate
 * @mixes PhysicalItemTemplate
 * @mixes EquippableItemTemplate
 * @mixes MountableTemplate
 *
 */
declare class EquipmentData extends _ItemDataModel.mixin(
  ActivitiesTemplate, ItemDescriptionTemplate<'equipment'>, IdentifiableTemplate, ItemTypeTemplate<'equipment'>,
  PhysicalItemTemplate, EquippableItemTemplate, MountableTemplate
)<
  dnd5e.types.MergeSchemas<
    {
      type: ItemTypeField<'equipment', { subtype: false }, { label: "DND5E.ItemEquipmentType" }>,
      armor: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.NumberField<{ required: true, integer: true, min: 0, label: "DND5E.ArmorClass" }>,
        magicalBonus: foundry.data.fields.NumberField<{ min: 0, integer: true, label: "DND5E.MagicalBonus" }>,
        dex: foundry.data.fields.NumberField<{ required: true, integer: true, label: "DND5E.ItemEquipmentDexMod" }>
      }>,
      properties: foundry.data.fields.SetField<
        dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperties.Equipment.TypeKey>,
        { label: "DND5E.ItemEquipmentProperties" }
      >,
      strength: foundry.data.fields.NumberField<{ required: true, integer: true, min: 0, label: "DND5E.ItemRequiredStr" }>,
      proficient: foundry.data.fields.NumberField<{
        required: true, min: 0, max: 1, integer: true, initial: null, label: "DND5E.ProficiencyLevel"
      }>
    },
    {
      armor: foundry.data.fields.SchemaField<
        {},
        foundry.data.fields.SchemaField.DefaultOptions,
        {},
        {
          base: number
        }
      >,
    }
  >
> {

  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */


  metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      enchantable: true,
      inventoryItem: true,
      inventoryOrder: 200
    }
  >;
  static get metadata(): fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      enchantable: true,
      inventoryItem: true,
      inventoryOrder: 200
    }
  >;

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */

  /**
   * Apply migrations to the armor field.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migrateArmor(source: object)

  /* -------------------------------------------- */

  /**
   * Apply migrations to the type field.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migrateType(source: object)

  /* -------------------------------------------- */

  /**
   * Ensure blank strength values are migrated to null, and string values are converted to numbers.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migrateStrength(source: object)

  /* -------------------------------------------- */

  /**
   * Migrates stealth disadvantage boolean to properties.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static _migrateStealth(source: object)

  /* -------------------------------------------- */

  /**
   * Migrate the proficient field to convert boolean values.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migrateProficient(source: object)

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareFinalData()

  /* -------------------------------------------- */

  /** @inheritDoc */
  getFavoriteData(): Promise<EquipmentData.FavoriteData<this>>

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Properties displayed in chat.
   */
  get chatProperties(): string[]

  /* -------------------------------------------- */

  /**
   * Properties displayed on the item card.
   */
  get cardProperties(): string[]

  /* -------------------------------------------- */

  /**
   * Is this Item any of the armor subtypes?
   */
  get isArmor(): boolean

  /* -------------------------------------------- */

  /**
   * Is this item a separate large object like a siege engine or vehicle component that is
   * usually mounted on fixtures rather than equipped, and has its own AC and HP?
   */
  get isMountable(): boolean

  /* -------------------------------------------- */

  /**
   * The proficiency multiplier for this item.
   */
  get proficiencyMultiplier(): number
}

declare namespace EquipmentData {
  interface FavoriteData<This> extends ItemDataModel.FavoriteData {
    subtitle: [string, string],
    uses: dnd5e.types.GetKeyReturn<This, 'getUsesData'> | null
  }
}

export default EquipmentData;

declare global {
  namespace dnd5e.types {


    namespace ArmorProficiency {
      // --- Armor Group Definitions ---
      interface DefaultArmorGroupTypes {
        'lgt': true; // Light
        'med': true; // Medium
        'hvy': true; // Heavy
        'shl': true; // Shield
      }

      /**
       * Override interface for declaration merging.
       * Add custom armor group types here.
       * @example
       * declare global {
       * namespace dnd5e.types.ArmorProficiency {
       * interface OverrideGroupTypes {
       * 'exo': true // Exoskeleton
       * }
       * }
       * }
       */
      interface OverrideGroupTypes extends Record<string, boolean | never> { }

      type GroupTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultArmorGroupTypes,
        OverrideGroupTypes
      >;
      type GroupTypeKey = dnd5e.types.ExtractKeys<GroupTypes>;

      // --- Specific Armor Proficiency Definitions ---
      interface DefaultArmorProficiencyTypes extends Record<string, GroupTypeKey> {
        breastplate: 'med';
        chainmail: 'hvy';
        chainshirt: 'med';
        halfplate: 'med';
        hide: 'med';
        leather: 'lgt';
        padded: 'lgt';
        plate: 'hvy';
        ringmail: 'hvy';
        scalemail: 'med';
        shield: 'shl'; // Added shield here for consistency
        splint: 'hvy';
        studded: 'lgt';
      }

      /**
      * Override interface for declaration merging.
      * Add custom specific armor proficiencies and map them to a group key.
      * @example
      * declare global {
      * namespace dnd5e.types.ArmorProficiency {
      * interface OverrideTypes {
      * 'powerArmorFrame': 'exo'
      * }
      * }
      * }
      */
      interface OverrideTypes extends Record<string, GroupTypeKey | never> { }

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultArmorProficiencyTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      // --- Armor Proficiency Map (Trait Mapping) ---
      interface DefaultArmorProficiencyMap extends Record<string, GroupTypeKey | boolean> {
        natural: true;  // Represents natural armor
        clothing: true; // Represents wearing only clothing
        light: 'lgt';   // Proficiency in the light armor group
        medium: 'med';  // Proficiency in the medium armor group
        heavy: 'hvy';   // Proficiency in the heavy armor group
        shield: 'shl';  // Proficiency in the shield group
      }

      /**
       * Override interface for declaration merging.
       * Add custom trait keys for armor proficiency mapping.
       * @example
       * declare global {
       * namespace dnd5e.types.ArmorProficiency {
       * interface OverrideProficiencyMap {
       * 'exoskeletonProficiency': 'exo'
       * }
       * }
       * }
       */
      interface OverrideProficiencyMap extends Record<string, GroupTypeKey | boolean | never> { }

      type ProficiencyMap = dnd5e.types.MergeOverrideDefinition<
        DefaultArmorProficiencyMap,
        OverrideProficiencyMap
      >;

      type ProficiencyTypeKey = dnd5e.types.ExtractKeys<
        ProficiencyMap
      >;

      // --- Armor Class Calculation Methods ---
      interface DefaultArmorClasses extends Record<string, boolean> {
        flat: true;       // AC determined by a flat value (often from items)
        natural: true;    // AC determined by natural armor calculation
        default: true;    // Standard AC calculation (armor + dex modifier)
        mage: true;       // Mage Armor calculation (e.g., 13 + Dex)
        draconic: true;   // Draconic Sorcerer calculation (e.g., 13 + Dex)
        unarmoredMonk: true; // Monk Unarmored Defense (10 + Dex + Wis)
        unarmoredBarb: true; // Barbarian Unarmored Defense (10 + Dex + Con)
        custom: true;     // Custom AC formula defined on the actor
      }

      /**
       * Override interface for declaration merging.
       * Add custom named AC calculation methods.
       * @example
       * declare global {
       * namespace dnd5e.types.ArmorProficiency {
       * interface OverrideArmorClasses {
       * 'psionicBarrier': true // Example: AC = 10 + Int
       * }
       * }
       * }
       */
      interface OverrideArmorClasses extends Record<string, boolean | never> { } // Value is typically boolean, but kept flexible if needed

      type ArmorClasses = dnd5e.types.MergeOverrideDefinition<
        DefaultArmorClasses,
        OverrideArmorClasses
      >;
      type ArmorClassKey = dnd5e.types.ExtractKeys<ArmorClasses>;

      // --- Combined Keys and Config ---
      type CompleteTypeKey = TypeKey | GroupTypeKey;

      /** Configuration object structure for an Armor Class calculation method. */
      type ArmorClassConfig = {
        label: string;
        /** Optional formula if the calculation method requires one (e.g., for 'custom') */
        formula?: string;
      };

      type GetArmorTypesByGroupType<T extends GroupTypeKey> = dnd5e.types.FindKeyByValue<
        dnd5e.types.ArmorProficiency.Types,
        T
      >
      type GetArmorTypesByProficiency<T extends ProficiencyTypeKey> = ProficiencyMap[T] extends true ? never : dnd5e.types.FindKeyByValue<
        dnd5e.types.ArmorProficiency.Types,
        ProficiencyMap[T]
      >
    }

    namespace Equipment {
      // --- Base Definitions ---
      interface DefaultEquipmentTypes extends Record<string, string | null> {
        "ring": null,
        "rod": null,
        "trinket": null,
        "vehicle": null,
        "wand": null,
        "wondrous": null
        "": null
      }

      type DefaultFromArmorProficiency = {
        [K in dnd5e.types.ArmorProficiency.ProficiencyTypeKey]: dnd5e.types.ArmorProficiency.GetArmorTypesByProficiency<K> extends never 
          ? null 
          : dnd5e.types.ArmorProficiency.GetArmorTypesByProficiency<K> 
      }

      /**
       * Override interface for declaration merging.
       * Add custom feat properties here.
       * @example
       * declare global {
       * namespace dnd5e.types.ItemProperties.Feat {
       * interface OverrideTypes {
       * combatManeuver: true
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, string | null | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        dnd5e.types.MergeOverrideDefinition<
          DefaultEquipmentTypes,
          DefaultFromArmorProficiency
        >,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    namespace ItemProperties {
      namespace Equipment {
        // --- Base Definitions ---
        interface DefaultEquipmentProperties {
          mgc: true;  // Magical
          ada: true;  // Adamantine
          foc: true;  // Spellcasting Focus
          stealthDisadvantage: true; // Confers disadvantage on Stealth checks
        }

        /**
         * Override interface for declaration merging.
         * Add custom equipment properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Equipment {
         * interface OverrideTypes {
         * requiresAttunement: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultEquipmentProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      interface ValidPropertyMap {
        equipment: ItemProperties.Equipment.TypeKey;
      }
    }

    namespace ItemTypes {
      interface ItemTypeMap {
        equipment: {
          [K in Equipment.TypeKey]: ItemTypes.ItemTypeConfig<Equipment.Types[K]>
        }
      }
    }

    namespace DataModelConfig {
      interface Item {
        equipment: typeof EquipmentData;
      }
    }

    interface DND5EConfig {
      armorIds: dnd5e.types.FilterNever<{
        [K in dnd5e.types.ArmorProficiency.TypeKey]: dnd5e.types.FindKeyByValue<
          dnd5e.types.ArmorProficiency.ProficiencyMap,
          dnd5e.types.ArmorProficiency.Types[K]
        > extends 'shield' ? never : string
      }>,
      shieldIds: dnd5e.types.FilterNever<{
        [K in dnd5e.types.ArmorProficiency.TypeKey]: dnd5e.types.FindKeyByValue<
          dnd5e.types.ArmorProficiency.ProficiencyMap,
          dnd5e.types.ArmorProficiency.Types[K]
        > extends 'shield' ? string : never
      }>,
      armorProficienciesMap: dnd5e.types.ArmorProficiency.ProficiencyMap,
      armorTypes: {
        [K in keyof dnd5e.types.ArmorProficiency.ProficiencyMap]: string
      },
      armorProficiencies: {
        [K in dnd5e.types.ArmorProficiency.GroupTypeKey]: string
      }
      armorClasses: {
        [K in dnd5e.types.ArmorProficiency.ArmorClassKey]: dnd5e.types.ArmorProficiency.ArmorClassConfig
      }

      equipmentTypes: {
        [K in Equipment.TypeKey]: string
      }

      miscEquipmentTypes: {
        [K in Exclude<Equipment.TypeKey, "" | keyof Equipment.DefaultFromArmorProficiency>]: string
      }
    }
  }
}
