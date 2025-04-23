/**
 * Dialog to confirm the deletion of an embedded item with advancement or decreasing a class level.
 */
export default class AdvancementConfirmationDialog extends Dialog {

  /**
   * A helper function that displays the dialog prompting for an item deletion.
   */
  static forDelete(item: Item.Implementation): Promise<boolean | null>

  /* -------------------------------------------- */

  /**
   * A helper function that displays the dialog prompting for leveling down.
   */
  static forLevelDown(item: Item.Implementation): Promise<boolean | null>

  /* -------------------------------------------- */

  /**
   * A helper constructor function which displays the confirmation dialog.
   * @param {Item5e} item              Item to be changed.
   * @param {string} title             Localized dialog title.
   * @param {string} message           Localized dialog message.
   * @param {object} continueButton    Object containing label and icon for the action button.
   * @returns {Promise<boolean|null>}  Resolves with whether advancements should be unapplied. Rejects with null.
   */
  static createDialog(item: Item.Implementation, title: string, message: string, continueButton: {
    icon: string, label: string
  }): Promise<boolean | null>
}
