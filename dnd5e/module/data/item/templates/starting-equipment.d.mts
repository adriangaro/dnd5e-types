import SystemDataModel from "../../abstract.mjs";
import { FormulaField } from "../../fields/_module.mjs";

/**
 * Data model template representing a background & class's starting equipment.
 */
declare class StartingEquipmentTemplate extends SystemDataModel<
  {
    startingEquipment: foundry.data.fields.ArrayField<
      foundry.data.fields.EmbeddedDataField<typeof EquipmentEntryData>, { required: true }
    >,
    wealth: FormulaField<
      {
        label: "DND5E.StartingEquipment.Wealth.Label",
        hint: "DND5E.StartingEquipment.Wealth.Hint"
      }
    >
  }
> {
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * HTML formatted description of the starting equipment on this item.
   */
  get startingEquipmentDescription(): string
}

export default StartingEquipmentTemplate;

/**
 * Data for a single entry in the equipment list.
 */
export class EquipmentEntryData extends foundry.abstract.DataModel<{
  _id: foundry.data.fields.DocumentIdField<{ initial: () => string }>,
  group: foundry.data.fields.StringField<{ nullable: true, initial: null }>,
  sort: foundry.data.fields.IntegerSortField,
  type: foundry.data.fields.StringField<{ required: true, initial: "OR", choices: (typeof EquipmentEntryData)['TYPES'] }>,
  count: foundry.data.fields.NumberField<{ initial: undefined }>,
  key: foundry.data.fields.StringField<{ initial: undefined }>,
  requiresProficiency: foundry.data.fields.BooleanField<{ label: "DND5E.StartingEquipment.Proficient.Label" }>
}> {

  /**
   * Types that group together child entries.
   */
  static GROUPING_TYPES: {
    OR: "DND5E.StartingEquipment.Operator.OR",
    AND: "DND5E.StartingEquipment.Operator.AND"
  };

  /**
   * Types that contain an option for the player.
   */
  static OPTION_TYPES: {
    // Category types
    armor: "DND5E.StartingEquipment.Choice.Armor",
    tool: "DND5E.StartingEquipment.Choice.Tool",
    weapon: "DND5E.StartingEquipment.Choice.Weapon",
    focus: "DND5E.StartingEquipment.Choice.Focus",

    // Generic item type
    linked: "DND5E.StartingEquipment.SpecificItem"
  };

  /**
   * Equipment entry types.
   */
  static get TYPES(): (typeof EquipmentEntryData['GROUPING_TYPES']) & (typeof EquipmentEntryData['OPTION_TYPES'])

  /* -------------------------------------------- */

  /**
   * Where in `CONFIG.DND5E` to find the type category labels.
   */
  static CATEGORIES: {
    armor: {
      label: "DND5E.Armor",
      config: "armorTypes"
    },
    focus: {
      label: "DND5E.Focus.Label",
      config: "focusTypes"
    },
    tool: {
      label: "TYPES.Item.tool",
      config: "toolTypes"
    },
    weapon: {
      label: "TYPES.Item.weapon",
      config: "weaponProficiencies"
    }
  };

  /* -------------------------------------------- */

  /**
   * Get any children represented by this entry in order.
   */
  get children(): EquipmentEntryData[]

  /* -------------------------------------------- */

  /**
   * Transform this entry into a human readable label.
   */
  get label(): string

  /* -------------------------------------------- */

  /**
   * Blank label if no key is specified for a choice type.
   */
  get blankLabel(): string

  /* -------------------------------------------- */

  /**
   * Get the label for a category.
   */
  get categoryLabel(): string

  /* -------------------------------------------- */

  /**
   * Build a list of possible key options for this entry's type.
   */
  get keyOptions(): Record<string, string>

}


declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      /**
       * Type of spellcasting foci.
       */
      focusTypes: Record<'arcane' | 'druidic' |' holy', {
        /**
         * Localized label for this category.
         */
        label: string,
        /**
         * Item IDs or UUIDs.
         */
        itemIds: Record<string, string>
      }>
    }
  }
}