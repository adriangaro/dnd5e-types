/**
 * Data model template representing a background & class's starting equipment.
 *
 * A pure `SystemDataModel` template (parent = Item) representing a background & class's starting
 * equipment. Folded into item models via `ItemDataModel.mixin(...)`. The `startingEquipment` field is
 * an `ArrayField` of `EmbeddedDataField(EquipmentEntryData)`; `EquipmentEntryData` is a local
 * `DataModel` whose schema (and grouping/option type maps) we mirror here.
 */

import SystemDataModel from "../../abstract/system-data-model.mjs";

declare global {
  namespace dnd5e.types.Item.StartingEquipment {
    /** Schema of a single `EquipmentEntryData` entry. */
    type EquipmentEntrySchema = {
      _id: foundry.data.fields.DocumentIdField<{ initial: () => string }>;
      group: foundry.data.fields.StringField<{ nullable: true; initial: null }>;
      sort: foundry.data.fields.IntegerSortField;
      type: dnd5e.types.fields.RestrictedStringField<
        "OR" | "AND" | "armor" | "tool" | "weapon" | "focus" | "currency" | "linked",
        { required: true; initial: "OR" }
      >;
      count: foundry.data.fields.NumberField<{ initial: undefined }>;
      key: foundry.data.fields.StringField<{ initial: undefined }>;
      requiresProficiency: foundry.data.fields.BooleanField;
    };

    interface Schema extends foundry.data.fields.DataSchema {
      startingEquipment: foundry.data.fields.ArrayField<
        foundry.data.fields.EmbeddedDataField<typeof EquipmentEntryData>,
        { required: true }
      >;
      wealth: dnd5e.types.fields.FormulaField;
    }

    /** Instance methods this template MIXES onto a model (composed onto items via a companion interface). */
    interface Methods {
      /**
       * HTML formatted description of the starting equipment on this item.
       * @type {string}
       */
      get startingEquipmentDescription(): string;

      /**
       * Create a HTML formatted description of the starting equipment on this item.
       * @param {object} [options={}]
       * @param {boolean} [options.modernStyle]  Should this be formatted according to modern rules or legacy.
       * @returns {string}
       */
      getStartingEquipmentDescription(options?: { modernStyle?: boolean }): string;
    }
  }
}

/**
 * Data for a single entry in the equipment list.
 *
 * @property {string} _id                     Unique ID of this entry.
 * @property {string|null} group              Parent entry that contains this one.
 * @property {number} sort                    Sorting order of this entry.
 * @property {string} type                    Entry type as defined in `EquipmentEntryData#TYPES`.
 * @property {number} [count]                 Number of items granted. If empty, assumed to be `1`.
 * @property {string} [key]                   Category or item key unless type is "linked", in which case it is a UUID.
 * @property {boolean} [requiresProficiency]  Is this only a valid item if character already has the
 *                                            required proficiency.
 */
export declare class EquipmentEntryData extends foundry.abstract.DataModel<
  dnd5e.types.Item.StartingEquipment.EquipmentEntrySchema,
  foundry.abstract.DataModel.Any
> {
  /**
   * Types that group together child entries.
   * @enum {string}
   */
  static GROUPING_TYPES: { OR: string; AND: string };

  /**
   * Types that contain an option for the player.
   * @enum {string}
   */
  static OPTION_TYPES: {
    armor: string;
    tool: string;
    weapon: string;
    focus: string;
    currency: string;
    linked: string;
  };

  /**
   * Equipment entry types.
   * @type {Record<string, string>}
   */
  static get TYPES(): Record<string, string>;

  /**
   * Where in `CONFIG.DND5E` to find the type category labels.
   * @enum {{ label: string, config: string }}
   */
  static CATEGORIES: Record<"armor" | "currency" | "focus" | "tool" | "weapon", { label?: string; config: string }>;

  static override defineSchema(): dnd5e.types.Item.StartingEquipment.EquipmentEntrySchema;

  /**
   * Get any children represented by this entry in order.
   * @returns {EquipmentEntryData[]}
   */
  get children(): EquipmentEntryData[];

  /**
   * Transform this entry into a human readable label.
   * @type {string}
   */
  get label(): string;

  /**
   * Blank label if no key is specified for a choice type.
   * @type {string}
   */
  get blankLabel(): string;

  /**
   * Get the label for a category.
   * @type {string}
   */
  get categoryLabel(): string;

  /**
   * Build a list of possible key options for this entry's type.
   * @returns {Record<string, string>}
   */
  get keyOptions(): Record<string, string>;

  /**
   * Transform this entry into a human readable label.
   * @param {object} [options={}]
   * @param {number} [options.depth=1]       Current depth of label being generated.
   * @param {boolean} [options.modernStyle]  Use modern style for OR entries.
   */
  generateLabel(options?: { depth?: number; modernStyle?: boolean }): string;

  /**
   * Prefix each OR entry at a certain level with a letter.
   * @param {string[]} entries                    Entries to prefix.
   * @param {object} [options={}]
   * @param {number} [options.depth=1]            Current depth of the OR entry (1 or 2).
   * @param {boolean} [options.modernStyle=true]  Capitalized first level markers rather than lowercased.
   * @param {string[]} [options.usedPrefixes]     Prefixes that were used.
   * @returns {string[]}
   */
  static prefixOrEntries(
    entries: string[],
    options?: { depth?: number; modernStyle?: boolean; usedPrefixes?: string[] },
  ): string[];
}

export declare class StartingEquipmentTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.StartingEquipment.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends SystemDataModel<Schema, BaseData, DerivedData> {
  static override defineSchema(): dnd5e.types.Item.StartingEquipment.Schema;
}
export declare interface StartingEquipmentTemplate<
  Schema extends foundry.data.fields.DataSchema = dnd5e.types.Item.StartingEquipment.Schema,
  BaseData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
  DerivedData extends fvttUtils.AnyObject = fvttUtils.EmptyObject,
> extends dnd5e.types.Item.StartingEquipment.Methods {}

export default StartingEquipmentTemplate;
