import BaseConfigSheet from "./base-config.mjs";


/**
 * An application class which provides advanced configuration for special character flags which modify an Actor.
 */
export default class ActorSheetFlags extends BaseConfigSheet {
  /* -------------------------------------------- */

  /**
   * Prepare an object of sorted classes.
   * @private
   */
  _getClasses(): Record<string, string>

  /* -------------------------------------------- */

  /**
   * Prepare an object of flags data which groups flags by section
   * Add some additional data for rendering
   * @private
   */
  _getFlags(): object

  /* -------------------------------------------- */

  /**
   * Get the bonuses fields and their localization strings
   * @private
   */
  _getBonuses(): dnd5e.types.FormSelectOption[]

  /* -------------------------------------------- */

  /**
   * Get NPC-specific fields.
   * @returns {object}
   * @protected
   */
  _getNPC(): {
    important: {
      field: foundry.data.fields.DataField.Any,
      name: string,
      value: any
    }
  }
}
