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
  interface FavoriteData extends ItemDataModel.FavoriteData {
    subtitle: string,
    modifier: number
  }
}

export default ToolData

declare global {
  namespace dnd5e.types {
    
    namespace ToolGroup {
      // --- Base Definitions ---
      interface DefaultToolGroupTypes {
        art: true;  // Artisan's Tools
        game: true; // Gaming Set
        music: true;// Musical Instrument
        vehicle: true; // Vehicle proficiency (Land/Water) - Consider if this fits tool logic
      }

      /**
       * Override interface for declaration merging.
       * Add custom tool group types here.
       * @example
       * declare global {
       * namespace dnd5e.types.ToolGroup {
       * interface OverrideTypes {
       * 'sci': true // Scientific Instrument
       * }
       * }
       * }
       */
      interface OverrideTypes extends Record<string, boolean | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultToolGroupTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      type GetToolTypesByGroup<T extends TypeKey | boolean> = dnd5e.types.FindKeyByValue<
        Tool.Types,
        T
      >
    }

    namespace Tool {
      // --- Base Definitions ---
      // `true` indicates a tool proficiency not belonging to a standard group (like thieves' tools)
      // Otherwise, the value is the key of the group it belongs to (from ToolGroup.TypeKey)
      interface DefaultToolTypes extends Record<string, ToolGroup.TypeKey | true> {
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
      interface OverrideTypes extends Record<string, ToolGroup.TypeKey | true | never> { }

      // --- Derived Types ---
      type Types = dnd5e.types.MergeOverrideDefinition<
        DefaultToolTypes,
        OverrideTypes
      >;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Configuration object structure for a specific tool type. */
      interface ToolTypeConfig<T extends TypeKey> {
        id: T; // The key identifying the tool, e.g., "alchemist"
        label: string; // The display name, e.g., "Alchemist's Supplies"
        ability?: dnd5e.types.Ability.TypeKey; // Default ability score associated, if any
        group?: ToolGroup.TypeKey; // The group this tool belongs to, if any
      }
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
       interface OverrideTypes extends Record<string, boolean | never> {}

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
          [K in ToolGroup.TypeKey]: ToolGroup.GetToolTypesByGroup<K> extends never ? never : ItemTypes.ItemTypeConfig<ToolGroup.GetToolTypesByGroup<K>>
        } & {
          "": ItemTypes.ItemTypeConfig<ToolGroup.GetToolTypesByGroup<boolean>>
        }> 
      }
    }

    namespace DataModelConfig {
      interface Item {
        tool: typeof ToolData;
      }
    }

    interface DND5EConfig {
      tools: {
        [K in dnd5e.types.Tool.TypeKey]: dnd5e.types.Tool.ToolTypeConfig<K>
      }
      toolProficiencies: {
        [K in dnd5e.types.ToolGroup.TypeKey]: string
      }
    }
  }
}
