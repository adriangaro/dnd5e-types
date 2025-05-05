import { convertLength, defaultUnits, filteredKeys, formatLength } from "../../utils.mjs";
import { ItemDataModel } from "../abstract.mjs";
import BaseActivityData from "../activity/base-activity.mjs";
import DamageField from "../shared/damage-field.mjs";
import ItemTypeField from "./fields/item-type-field.mjs";
import ActivitiesTemplate from "./templates/activities.mjs";
import EquippableItemTemplate from "./templates/equippable-item.mjs";
import IdentifiableTemplate from "./templates/identifiable.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";
import ItemTypeTemplate from "./templates/item-type.mjs";
import MountableTemplate from "./templates/mountable.mjs";


declare class _ItemDataModel extends ItemDataModel { }
/**
 * Data definition for Weapon items.
 * @mixes ActivitiesTemplate
 * @mixes ItemDescriptionTemplate
 * @mixes ItemTypeTemplate
 * @mixes IdentifiableTemplate
 * @mixes PhysicalItemTemplate
 * @mixes EquippableItemTemplate
 * @mixes MountableTemplate
 *
 */
declare class WeaponData extends _ItemDataModel.mixin(
  ActivitiesTemplate, ItemDescriptionTemplate<'weapon'>, IdentifiableTemplate, ItemTypeTemplate<'weapon'>,
  PhysicalItemTemplate, EquippableItemTemplate, MountableTemplate
)<
dnd5e.types.MergeSchemas<
  dnd5e.types.MergeSchemas<
    {
      type: ItemTypeField<'weapon', { value: "simpleM", subtype: false }, { required: true, label: "DND5E.ItemWeaponType" }>,
      ammunition: foundry.data.fields.SchemaField<{
        type: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Consumable.Ammo.TypeKey>
      }>,
      armor: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.NumberField<{ integer: true, min: 0 }>
      }>,
      damage: foundry.data.fields.SchemaField<{
        base: DamageField,
        versatile: DamageField
      }>,
      magicalBonus: foundry.data.fields.NumberField<{ min: 0, integer: true, label: "DND5E.MagicalBonus" }>,
      mastery: dnd5e.types.fields.RestrictedStringField<dnd5e.types.WeaponProficiency.MasteryTypeKey>
      properties: foundry.data.fields.SetField<
        dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperties.Weapon.TypeKey>,
        { label: "DND5E.ItemWeaponProperties" }
      >,
      proficient: foundry.data.fields.NumberField<{
        required: true, min: 0, max: 1, integer: true, initial: null, label: "DND5E.ProficiencyLevel"
      }>,
      range: foundry.data.fields.SchemaField<{
        value: foundry.data.fields.NumberField<{ min: 0 }>,
        long: foundry.data.fields.NumberField<{ min: 0 }>,
        reach: foundry.data.fields.NumberField<{ min: 0 }>,
        units: foundry.data.fields.StringField
      }>
    },
    {}
  >,
      fvttUtils.RemoveIndexSignatures<
        dnd5e.types.DataModelConfig.Item.weapon.OverrideSchema
      >
    >
> {
  /* -------------------------------------------- */

  /** @inheritDoc */
  static metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      enchantable: true,
      inventoryItem: true,
      inventoryOrder: 100
    }
  >;

  override metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      enchantable: true,
      inventoryItem: true,
      inventoryOrder: 100
    }
  >;

  /* -------------------------------------------- */
  /*  Data Migrations                             */
  /* -------------------------------------------- */


  /**
   * Migrate weapon damage from old parts.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migrateDamage(source: object)

  /* -------------------------------------------- */

  /**
   * Migrate the properties object into a set.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migratePropertiesData(source: object)

  /* -------------------------------------------- */

  /**
   * Migrate the proficient field to convert boolean values.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migrateProficient(source: object)

  /* -------------------------------------------- */

  /**
   * Migrate the range value to the reach field for melee weapons without the thrown property.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migrateReach(source): object

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareFinalData()

  /* -------------------------------------------- */

  /** @inheritDoc */
  getFavoriteData(): Promise<WeaponData.FavoriteData<this>>

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Ammunition that can be used with this weapon.
   */
  get ammunitionOptions(): dnd5e.types.FormSelectOption[]

  /* -------------------------------------------- */

  /**
   * Attack classification of this weapon.
   */
  get attackClassification(): dnd5e.types.Attack.ClassificationTypeKey

  /* -------------------------------------------- */

  /** @override */
  get attackModes(): dnd5e.types.FormSelectOption[]

  /* -------------------------------------------- */

  /**
   * Attack type offered by this weapon.
   */
  get attackType(): dnd5e.types.Attack.TypeKey | null

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
   * Is the range value relevant to this weapon?
   */
  get hasRange(): boolean

  /* -------------------------------------------- */

  /**
   * Is this item a separate large object like a siege engine or vehicle component that is
   * usually mounted on fixtures rather than equipped, and has its own AC and HP?
   */
  get isMountable(): boolean

  /* -------------------------------------------- */

  /**
   * Does the Weapon implement a versatile damage roll as part of its usage?
   */
  get isVersatile(): boolean

  /* -------------------------------------------- */

  /**
   * Mastery options that can be used when attacking with this weapon.
   */
  get masteryOptions(): dnd5e.types.FormSelectOption<dnd5e.types.WeaponProficiency.MasteryTypeKey>[] | null

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

  /* -------------------------------------------- */

  /**
   * Attack types that can be used with this item by default.
   */
  get validAttackTypes(): Set<dnd5e.types.Attack.TypeKey>
}

declare namespace WeaponData {
  type Schema = dnd5e.types.GetSchema<typeof WeaponData>
  interface FavoriteData<This> extends ItemDataModel.FavoriteData {
    subtitle: string,
    modifier: number,
    range: dnd5e.types.GetKey<This, 'range'>
  }
}

export default WeaponData

declare global {
  namespace dnd5e.types {
    namespace WeaponProficiency {
      // --- Weapon Group Definitions ---
      interface DefaultWeaponGroupTypes {
        sim: true; // Simple
        mar: true; // Martial
      }

      /**
       * Override interface for declaration merging.
       * Add custom weapon group types here.
       * @example
       * declare global {
       * namespace dnd5e.types.WeaponProficiency {
       * interface OverrideGroupTypes {
       * 'exo': true // Exotic
       * }
       * }
       * }
       */
      interface OverrideGroupTypes extends Record<string, boolean | never> { }

      type GroupTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultWeaponGroupTypes,
        OverrideGroupTypes
      >;
      type GroupTypeKey = dnd5e.types.ExtractKeys<GroupTypes>;

      // --- Specific Weapon Proficiency Definitions ---
      interface DefaultWeaponProficiencyTypes extends Record<string, GroupTypeKey> {
        battleaxe: 'mar';
        blowgun: 'mar';
        club: 'sim';
        dagger: 'sim';
        dart: 'sim';
        flail: 'mar';
        glaive: 'mar';
        greataxe: 'mar';
        greatclub: 'sim';
        greatsword: 'mar';
        halberd: 'mar';
        handaxe: 'sim';
        handcrossbow: 'mar';
        heavycrossbow: 'mar';
        javelin: 'sim';
        lance: 'mar';
        lightcrossbow: 'sim';
        lighthammer: 'sim';
        longbow: 'mar';
        longsword: 'mar';
        mace: 'sim';
        maul: 'mar';
        morningstar: 'mar';
        net: 'mar'; // Often considered martial despite simple usage
        pike: 'mar';
        quarterstaff: 'sim';
        rapier: 'mar';
        scimitar: 'mar';
        shortsword: 'mar';
        sickle: 'sim';
        spear: 'sim';
        shortbow: 'sim';
        sling: 'sim';
        trident: 'mar';
        warpick: 'mar';
        warhammer: 'mar';
        whip: 'mar';
        // Common Firearms (often martial)
        musket: 'mar';
        pistol: 'mar';
        // Consider adding others like rifle, shotgun if needed
      }

      /**
       * Override interface for declaration merging.
       * Add custom specific weapon proficiencies and map them to a group key.
       * @example
       * declare global {
       * namespace dnd5e.types.WeaponProficiency {
       * interface OverrideTypes {
       * 'laserPistol': 'exo'
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, GroupTypeKey | never> { }

      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultWeaponProficiencyTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      // --- Weapon Proficiency Map (Trait Mapping) ---
      interface DefaultWeaponProficiencyMap extends Record<string, GroupTypeKey | boolean> {
        simpleM: 'sim';  // Proficiency in simple melee weapons group
        simpleR: 'sim';  // Proficiency in simple ranged weapons group
        martialM: 'mar'; // Proficiency in martial melee weapons group
        martialR: 'mar'; // Proficiency in martial ranged weapons group
        improv: true;    // Proficiency with improvised weapons
        natural: true;   // Proficiency with natural weapons (claws, bite, etc.)
        siege: true;     // Proficiency with siege weapons
      }

      /**
       * Override interface for declaration merging.
       * Add custom trait keys for weapon proficiency mapping.
       * @example
       * declare global {
       * namespace dnd5e.types.WeaponProficiency {
       * interface OverrideWeaponProficiencyMap {
       * 'exoticWeapons': 'exo'
       * }
       * }
       * }
       */
      interface OverrideProficiencyMap extends Record<string, GroupTypeKey | boolean | never> { }

      type ProficiencyMap = dnd5e.types.MergeOverrideDefinition<
        DefaultWeaponProficiencyMap,
        OverrideProficiencyMap
      >;

      type ProficiencyTypeKey = dnd5e.types.ExtractKeys<ProficiencyMap>;


      type GetWeaponTypesByProficiency<T extends ProficiencyTypeKey> = ProficiencyMap[T] extends true ? never : dnd5e.types.FindKeyByValue<
        dnd5e.types.WeaponProficiency.Types,
        ProficiencyMap[T]
      >

      // --- Weapon Type Map (Ranged/Melee mapping for Proficiency Groups) ---
      // Maps keys from ProficiencyMap to 'ranged' or 'melee' where applicable
      interface DefaultWeaponTypeMap extends Record<keyof DefaultWeaponProficiencyMap | string, 'ranged' | 'melee' | never> {
        simpleM: 'melee';
        simpleR: 'ranged';
        martialM: 'melee';
        martialR: 'ranged';
        siege: 'ranged'; // Typically siege engines are ranged
        // 'improv' and 'natural' can be either, so they are not explicitly mapped here.
        improv: never;
        natural: never;
        // Add mappings for any custom *groups* added via OverrideWeaponProficiencyMap if they have a fixed type
      }

      /**
       * Override interface for declaration merging.
       * Add mappings for custom proficiency *groups* (from OverrideWeaponProficiencyMap)
       * to 'ranged' or 'melee' if they have a consistent type.
       * @example
       * declare global {
       * namespace dnd5e.types.WeaponProficiency {
       * interface OverrideTypeMap {
       * 'exoticWeapons': 'ranged' // If all exotic weapons are ranged, otherwise leave as never
       * }
       * }
       * }
       */
      interface OverrideTypeMap extends Record<string, 'ranged' | 'melee' | never> { }

      type TypeMap = dnd5e.types.MergeOverrideDefinition<
        DefaultWeaponTypeMap,
        OverrideTypeMap
      >;


      // --- Combined Keys ---
      type CompleteTypeKey = TypeKey | GroupTypeKey;

      interface DefaultMasteryTypes {
        cleave: true,
        graze: true,
        nick: true,
        push: true
        sap: true
        slow: true
        topple: true
        vex: true
      }

      /**
       * Override interface for declaration merging.
       * Add mappings for custom proficiency *groups* (from OverrideWeaponProficiencyMap)
       * to 'ranged' or 'melee' if they have a consistent type.
       * @example
       * declare global {
       * namespace dnd5e.types.WeaponProficiency {
       * interface OverrideTypeMap {
       * 'exoticWeapons': 'ranged' // If all exotic weapons are ranged, otherwise leave as never
       * }
       * }
       * }
       */
      interface WeaponMasteryTypes extends Record<string, string | never> { }

      type MasteryTypes = dnd5e.types.MergeOverrideDefinition<
      DefaultMasteryTypes,
        WeaponMasteryTypes
      >;

      type MasteryTypeKey = dnd5e.types.ExtractKeys<MasteryTypes>;
    }

    namespace Weapon {
      // --- Base Definitions ---
      interface DefaultWeaponTypes extends Record<string, string | null> {
        "": null
      }

      type DefaultFromWeaponProficiency = {
        [K in WeaponProficiency.ProficiencyTypeKey]: dnd5e.types.WeaponProficiency.GetWeaponTypesByProficiency<K> extends never
        ? null
        : dnd5e.types.WeaponProficiency.GetWeaponTypesByProficiency<K>
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
          DefaultWeaponTypes,
          DefaultFromWeaponProficiency
        >,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      
      interface DefaultClassificationMap extends Record<string, dnd5e.types.Attack.ClassificationTypeKey> {
        
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
      interface OverrideClassificationMap extends Record<string, dnd5e.types.Attack.ClassificationTypeKey | never> { }

      // --- Derived Types ---
      type ClassificationMap = dnd5e.types.MergeOverrideDefinition<
        DefaultClassificationMap,
        OverrideClassificationMap
      >;
    }

    namespace ItemProperties {
      namespace Weapon {
        // --- Base Definitions ---
        interface DefaultWeaponProperties {
          ada: true; // Adamantine weapon (overcomes resistance)
          amm: true; // Ammunition (requires ammunition)
          fin: true; // Finesse (can use Dex for attack/damage)
          fir: true; // Firearm (special firearm property, often misfire) - Consider renaming if confusing with fire damage
          foc: true; // Spellcasting Focus (can be used as one)
          hvy: true; // Heavy (Small creatures have disadvantage)
          lgt: true; // Light (suitable for two-weapon fighting)
          lod: true; // Loading (limits attacks per action/round)
          mgc: true; // Magical weapon (overcomes resistance)
          rch: true; // Reach (extends melee range)
          rel: true; // Reload (requires action/bonus action to reload) - Distinguish from Loading
          ret: true; // Returning (thrown weapon returns)
          sil: true; // Silvered weapon (overcomes resistance)
          spc: true; // Special (has unique rules described elsewhere)
          thr: true; // Thrown (can be thrown as a ranged attack)
          two: true; // Two-Handed (requires two hands to wield)
          ver: true; // Versatile (can be used with one or two hands for different damage)
        }

        /**
         * Override interface for declaration merging.
         * Add custom weapon properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Weapon {
         * interface OverrideTypes {
         * double: true // e.g., Double-bladed Scimitar
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultWeaponProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }
      interface ValidPropertyMap {
        weapon: ItemProperties.Weapon.TypeKey;
      }
    }

    namespace ItemTypes {
      interface ItemTypeMap {
        weapon: {
          [K in Weapon.TypeKey]: ItemTypes.ItemTypeConfig<Weapon.Types[K]>
        }
      }
    }

    namespace DataModelConfig {
      interface Item {
        weapon: typeof WeaponData;
      }
      namespace Item.weapon {
        interface OverrideSchema extends foundry.data.fields.DataSchema {

        }
      }
    }

    interface DND5EConfig {
      /**
       * The basic weapon types in 5e. This enables specific weapon proficiencies or
       * starting equipment provided by classes and backgrounds.
       */
      weaponIds: {
        [K in dnd5e.types.WeaponProficiency.TypeKey]: string
      }
      /**
       * A mapping between `DND5E.weaponTypes` and `DND5E.weaponProficiencies` that
       * is used to determine if character has proficiency when adding an item.
       */
      weaponProficienciesMap: dnd5e.types.WeaponProficiency.ProficiencyMap
      /**
       * The set of types which a weapon item can take.
       */
      weaponTypes: {
        [K in keyof dnd5e.types.WeaponProficiency.ProficiencyMap]: string
      },
      /**
       * General weapon categories.
       */
      weaponProficiencies: {
        [K in dnd5e.types.WeaponProficiency.GroupTypeKey]: string
      }
      /**
       * Weapon masteries.
       */
      weaponMasteries: {
        [K in dnd5e.types.WeaponProficiency.MasteryTypeKey]: {
          label: string
        }
      }
      /**
       * A mapping between `DND5E.weaponTypes` and `DND5E.attackTypes`.
       */
      weaponTypeMap: {
        [K in keyof dnd5e.types.WeaponProficiency.TypeMap]: dnd5e.types.WeaponProficiency.TypeMap[K]
      }

      /**
       * A mapping between `DND5E.weaponTypes` and `DND5E.attackClassifications`. Unlisted types are assumed to be
       * of the "weapon" classification.
       */
      weaponClassificationMap: {
        [K in keyof dnd5e.types.Weapon.ClassificationMap]: dnd5e.types.Weapon.ClassificationMap[K]
      }
    }
  }
}