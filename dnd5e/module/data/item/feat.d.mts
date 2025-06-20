import { ItemDataModel } from "../abstract.mjs";
import AdvancementField from "../fields/advancement-field.mjs";
import FormulaField from "../fields/formula-field.mjs";
import ActivitiesTemplate from "./templates/activities.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import ItemTypeTemplate from "./templates/item-type.mjs";
import ItemTypeField from "./fields/item-type-field.mjs";

declare class _ItemDataModel extends ItemDataModel { }

/**
 * Data definition for Feature items.
 * @mixes ActivitiesTemplate
 * @mixes ItemDescriptionTemplate
 * @mixes ItemTypeTemplate
 *
 */
declare class FeatData extends _ItemDataModel.mixin(
  ActivitiesTemplate, ItemDescriptionTemplate<'feat'>, ItemTypeTemplate<'feat'>
)<
  dnd5e.types.MergeSchemas<
    dnd5e.types.MergeSchemas<
      {
        advancement: foundry.data.fields.ArrayField<AdvancementField, { label: "DND5E.AdvancementTitle" }>,
        cover: foundry.data.fields.NumberField<{ min: 0, max: 1 }>,
        crewed: foundry.data.fields.BooleanField,
        enchant: foundry.data.fields.SchemaField<{
          max: FormulaField<{ deterministic: true }>,
          period: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Feat.Enchantment.PeriodTypeKey | ''>
        }>,
        prerequisites: foundry.data.fields.SchemaField<{
          level: foundry.data.fields.NumberField<{ integer: true, min: 0 }>,
          repeatable: foundry.data.fields.BooleanField
        }>,
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.ItemProperties.Feat.TypeKey>
        >,
        requirements: foundry.data.fields.StringField<{ required: true, nullable: true }>,
        type: ItemTypeField<'feat', { baseItem: false }>
      },
      {}
    >,
    fvttUtils.RemoveIndexSignatures<
      dnd5e.types.DataModelConfig.Item.feat.OverrideSchema
    >
  >
> {
  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */


  metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      hasEffects: true,
    }
  >;
  static get metadata(): fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      hasEffects: true,
    }
  >;

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */


  /** @inheritDoc */
  getFavoriteData(): Promise<FeatData.FavoriteData<this>>

   /* -------------------------------------------- */

  /** @inheritDoc */
  getSheetData(context: FeatData.SheetData): Promise<void>

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */

  /**
   * Migrate enchantment data format.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migrateEnchantment(source: object)

  /* -------------------------------------------- */

  /**
   * Ensure feats have a type object.
   * @param source The candidate source data from which the model will be constructed.
   */
  static #migrateType(source: object)

  /* -------------------------------------------- */

  /**
   * Migrate 0 values to null.
   * @param source The candidate source data from which the model will be constructed.
   */
  static #migrateRecharge(source: object)

  /* -------------------------------------------- */
  /*  Getters                                     */
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
   * Does this feature represent a group of individual enchantments (e.g. the "Infuse Item" feature stores data about
   * all of the character's infusions).
   */
  get isEnchantmentSource(): boolean

  /* -------------------------------------------- */

  /**
   * The proficiency multiplier for this item.
   */
  get proficiencyMultiplier(): number
}

declare namespace FeatData {
  type Schema = dnd5e.types.GetSchema<typeof FeatData>
  interface FavoriteData<This> extends ItemDataModel.FavoriteData {
    subtitle: [string, string]
    uses: dnd5e.types.GetKeyReturn<This, 'getUsesData'> | null
  }

  interface SheetData {
    subtitles: { label: string }[],
    parts: string[],
    itemType: string,
    itemSubtypes: string[]
  }
}

export default FeatData

declare global {
  namespace dnd5e.types {
    namespace Feat {
      namespace Class {
        interface DefaultTypes {
          "arcaneShot": true,
          "artificerInfusion": true,
          "channelDivinity": true,
          "defensiveTactic": true,
          "eldritchInvocation": true,
          "elementalDiscipline": true,
          "fightingStyle": true,
          "huntersPrey": true,
          "ki": true,
          "maneuver": true,
          "metamagic": true,
          "multiattack": true,
          "pact": true,
          "psionicPower": true,
          "rune": true,
          "superiorHuntersDefense": true
        }

        /**
         * Override interface for declaration merging.
         * Add custom types properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.Order.Types {
         * interface OverrideTypes {
         * customProperty: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultTypes,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace Enchantment {
        interface DefaultTypes {
          "artificerInfusion": true,
          "rune": true
        }

        /**
         * Override interface for declaration merging.
         * Add custom types properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.Order.Types {
         * interface OverrideTypes {
         * customProperty: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultTypes,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;

        interface DefaultPeriodType {
          sr: true,
          lr: true,
          atwill: true
        }

        /**
         * Override interface for declaration merging.
         * Add custom types properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.Order.Types {
         * interface OverrideTypes {
         * customProperty: true
         * }
         * }
         * }
         */
        interface OverridePeriodTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type PeriodTypes = dnd5e.types.MergeOverrideDefinition<
          DefaultPeriodType,
          OverridePeriodTypes
        >;
        type PeriodTypeKey = dnd5e.types.ExtractKeys<PeriodTypes>;

      }

      namespace Feat {
        interface DefaultTypes {
          "epicBoon": true,
          "fightingStyle": true,
          "general": true,
          "origin": true
        }

        /**
         * Override interface for declaration merging.
         * Add custom types properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.Order.Types {
         * interface OverrideTypes {
         * customProperty: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultTypes,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      namespace SupernaturalGift {
        interface DefaultTypes {
          "blessing": true,
          "charm": true,
          "epicBoon": true
        }

        /**
         * Override interface for declaration merging.
         * Add custom types properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.Order.Types {
         * interface OverrideTypes {
         * customProperty: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultTypes,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      // --- Base Definitions ---
      interface DefaultFeatTypes extends Record<string, string | null> {
        background: null,
        class: Class.TypeKey,
        enchantment: Enchantment.TypeKey
        feat: Feat.TypeKey
        monster: null
        race: null
        spellFeature: null
        supernaturalGift: SupernaturalGift.TypeKey
        vehicle: null,
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
        DefaultFeatTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    namespace ItemProperties {
      namespace Feat {
        // --- Base Definitions ---
        interface DefaultFeatProperties {
          mgc: true;   // Represents a supernatural or magical feat/trait
          trait: true; // Indicates it's a racial/class/monster trait rather than a chosen Feat
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
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultFeatProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }

      interface ValidPropertyMap {
        feat: ItemProperties.Feat.TypeKey;
      }
    }

    namespace ItemTypes {
      interface ItemTypeMap {
        feat: {
          [K in Feat.TypeKey]: ItemTypeConfig<Feat.Types[K]>
        }
      }
    }

    namespace DataModelConfig {
      interface Item {
        feat: typeof FeatData;
      }
      namespace Item.feat {
        interface OverrideSchema extends foundry.data.fields.DataSchema {

        }
      }
    }

    interface DND5EConfig {
      /**
       * Types of "features" items.
       */
      featureTypes: {
        [K in Feat.TypeKey]: ItemTypes.StrictItemTypeConfig<Feat.Types[K]>
      }
      /**
       * Periods at which enchantments can be re-bound to new items.
       */
      enchantmentPeriods: {
        [K in Feat.Enchantment.PeriodTypeKey]: {
          label: string
        }
      }
    }
  }
}