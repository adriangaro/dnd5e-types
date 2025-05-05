import { ItemDataModel } from "../abstract.mjs";
import FormulaField from "../fields/formula-field.mjs";
import ItemTypeField from "./fields/item-type-field.mjs";
import ActivitiesTemplate from "./templates/activities.mjs";
import EquippableItemTemplate from "./templates/equippable-item.mjs";
import IdentifiableTemplate from "./templates/identifiable.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import ItemTypeTemplate from "./templates/item-type.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";

declare class _ItemDataModel extends ItemDataModel { }

/**
 * Data definition for Tool items.
 * @mixes ActivitiesTemplate
 * @mixes ItemDescriptionTemplate
 * @mixes ItemTypeTemplate
 * @mixes IdentifiableTemplate
 * @mixes PhysicalItemTemplate
 * @mixes EquippableItemTemplate
 */
declare class ToolData extends _ItemDataModel.mixin(
  ActivitiesTemplate, ItemDescriptionTemplate<'tool'>, IdentifiableTemplate, ItemTypeTemplate<'tool'>,
  PhysicalItemTemplate, EquippableItemTemplate
)<
  dnd5e.types.MergeSchemas<
    dnd5e.types.MergeSchemas<
      {
        type: ItemTypeField<'tool', { subtype: false }, { label: "DND5E.ItemToolType" }>,
        ability: dnd5e.types.fields.RestrictedStringField<dnd5e.types.Ability.TypeKey, { required: true, blank: true, label: "DND5E.DefaultAbilityCheck" }>,
        chatFlavor: foundry.data.fields.StringField<{ required: true, label: "DND5E.ChatFlavor" }>,
        proficient: foundry.data.fields.NumberField<{
          required: true, initial: null, min: 0, max: 2, step: 0.5, label: "DND5E.ItemToolProficiency"
        }>,
        properties: foundry.data.fields.SetField<
          dnd5e.types.fields.RestrictedStringField<dnd5e.types.Tool.TypeKey>,
          { label: "DND5E.ItemToolProperties" }
        >,
        bonus: FormulaField<{ required: true, label: "DND5E.ItemToolBonus" }>
      },
      {}
    >,
    fvttUtils.RemoveIndexSignatures<
      dnd5e.types.DataModelConfig.Item.tool.OverrideSchema
    >
  >
> {
  /* -------------------------------------------- */
  metadata: fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      enchantable: true,
      inventoryItem: true,
      inventoryOrder: 400
    }
  >;
  static get metadata(): fvttUtils.SimpleMerge<
    ItemDataModel['metadata'],
    {
      enchantable: true,
      inventoryItem: true,
      inventoryOrder: 400
    }
  >;


  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */


  /* -------------------------------------------- */

  /**
   * Migrate the ability field.
   * @param source  The candidate source data from which the model will be constructed.
   */
  static #migrateAbility(source: object)

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */


  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareFinalData()

  /* -------------------------------------------- */

  /** @inheritDoc */
  getFavoriteData(): Promise<ToolData.FavoriteData>

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
   * Which ability score modifier is used by this item?
   */
  get abilityMod(): dnd5e.types.Ability.TypeKey | null

  /* -------------------------------------------- */

  /**
   * The proficiency multiplier for this item.
   */
  get proficiencyMultiplier(): number
}

declare namespace ToolData {
  type Schema = dnd5e.types.GetSchema<typeof ToolData>
  interface FavoriteData extends ItemDataModel.FavoriteData {
    subtitle: string,
    modifier: number
  }
}

export default ToolData

declare global {
  namespace dnd5e.types {

    namespace Tool {
      // --- Base Definitions ---
      // `true` indicates a tool proficiency not belonging to a standard group (like thieves' tools)
      // Otherwise, the value is the key of the group it belongs to (from GroupTypeKey)
      interface DefaultToolTypes extends Record<string, GroupTypeKey | true> {
        alchemist: 'art';    // Alchemist's Supplies
        bagpipes: 'music';   // Bagpipes
        brewer: 'art';       // Brewer's Supplies
        calligrapher: 'art'; // Calligrapher's Supplies
        card: 'game';        // Playing Card Set
        carpenter: 'art';    // Carpenter's Tools
        cartographer: 'art'; // Cartographer's Tools
        chess: 'game';       // Chess Set
        cobbler: 'art';      // Cobbler's Tools
        cook: 'art';         // Cook's Utensils
        dice: 'game';        // Dice Set
        disg: true;          // Disguise Kit
        drum: 'music';       // Drum
        dulcimer: 'music';   // Dulcimer
        flute: 'music';      // Flute
        forg: true;          // Forgery Kit
        glassblower: 'art';  // Glassblower's Tools
        herb: true;          // Herbalism Kit
        horn: 'music';       // Horn
        jeweler: 'art';      // Jeweler's Tools
        leatherworker: 'art';// Leatherworker's Tools
        lute: 'music';       // Lute
        lyre: 'music';       // Lyre
        mason: 'art';        // Mason's Tools
        navg: true;          // Navigator's Tools
        painter: 'art';      // Painter's Supplies
        panflute: 'music';   // Pan Flute
        pois: true;          // Poisoner's Kit
        potter: 'art';       // Potter's Tools
        shawm: 'music';      // Shawm
        smith: 'art';        // Smith's Tools
        thief: true;         // Thieves' Tools
        tinker: 'art';       // Tinker's Tools
        viol: 'music';       // Viol
        weaver: 'art';       // Weaver's Tools
        woodcarver: 'art';   // Woodcarver's Tools
        // Consider adding vehicle proficiency keys if needed, e.g., land: true, water: true
      }

      /**
       * Override interface for declaration merging.
       * Add custom tool types here. Map them to a ToolGroup.TypeKey if applicable,
       * otherwise use `true`.
       * @example
       * declare global {
       * namespace dnd5e.types.Tool {
       * interface OverrideTypes {
       * 'chemSet': 'sci'; // Chemistry Set -> Scientific Instrument Group
       * 'lockpick': true; // Advanced Lockpicks -> Standalone Proficiency
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, GroupTypeKey | true | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultToolTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Configuration object structure for a specific tool type. */
      interface ToolTypeConfig {
        /**
         * UUID of reference tool or ID within pack defined by `DND5E.sourcePacks.ITEMS`.
         */
        id: string;
        /**
         * Default ability used for the tool.
         */
        ability: dnd5e.types.Ability.TypeKey; // Default ability score associated, if any
      }

      // --- Base Definitions ---
      interface DefaultGroupTypes {
        art: true;  // Artisan's Tools
        game: true; // Gaming Set
        music: true;// Musical Instrument
      }

      /**
       * Override interface for declaration merging.
       * Add custom tool group types here.
       * @example
       * declare global {
       * namespace dnd5e.types.Tool {
       * interface OverrideGroupTypes {
       * 'sci': true // Scientific Instrument
       * }
       * }
       * }
       */
      interface OverrideGroupTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type GroupTypes = dnd5e.types.MergeOverrideDefinition<
        DefaultGroupTypes,
        OverrideGroupTypes
      >;
      type GroupTypeKey = dnd5e.types.ExtractKeys<GroupTypes>;

      type GetToolTypesByGroup<T extends GroupTypeKey | boolean> = dnd5e.types.FindKeyByValue<
        Tool.Types,
        T
      >
    }

    namespace ItemProperties {

      namespace Tool {
        // --- Base Definitions ---
        interface DefaultToolProperties {
          mgc: true; // Magical tool
        }

        /**
         * Override interface for declaration merging.
         * Add custom tool properties here.
         * @example
         * declare global {
         * namespace dnd5e.types.ItemProperties.Tool {
         * interface OverrideTypes {
         * requiresCalibration: true
         * }
         * }
         * }
         */
        interface OverrideTypes extends Record<string, boolean | never> { }

        // --- Derived Types ---
        type Types = dnd5e.types.MergeOverrideDefinition<
          DefaultToolProperties,
          OverrideTypes
        >;
        type TypeKey = dnd5e.types.ExtractKeys<Types>;
      }


      interface ValidPropertyMap {
        tool: ItemProperties.Tool.TypeKey;
      }
    }

    namespace ItemTypes {
      interface ItemTypeMap {
        tool: dnd5e.types.FilterNever<{
          [K in Tool.GroupTypeKey]: Tool.GetToolTypesByGroup<K> extends never ? never : ItemTypes.ItemTypeConfig<Tool.GetToolTypesByGroup<K>>
        } & {
          "": ItemTypes.ItemTypeConfig<Tool.GetToolTypesByGroup<boolean>>
        }>
      }
    }

    namespace DataModelConfig {
      interface Item {
        tool: typeof ToolData;
      }
      namespace Item.tool {
        interface OverrideSchema extends foundry.data.fields.DataSchema {

        }
      }
    }

    interface DND5EConfig {
      /**
       * The categories into which Tool items can be grouped.
       */
      toolTypes: {
        [K in dnd5e.types.Tool.GroupTypeKey]: string
      }
      /**
       * The categories of tool proficiencies that a character can gain.
       */
      toolProficiencies: {
        [K in dnd5e.types.Tool.GroupTypeKey]: string
      } & {
        vehicle: string
      }
      /**
       * Configuration data for tools.
       */
      tools: {
        [K in dnd5e.types.Tool.TypeKey]: dnd5e.types.Tool.ToolTypeConfig
      }
      /**
       * The basic tool types in 5e. This enables specific tool proficiencies or
       * starting equipment provided by classes and backgrounds.
       */
      toolIds: {
        [K in dnd5e.types.Tool.TypeKey]: string
      }
    }
  }
}
