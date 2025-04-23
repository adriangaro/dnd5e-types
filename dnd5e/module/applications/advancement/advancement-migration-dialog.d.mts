/**
 * Dialog to select which new advancements should be added to an item.
 */
export default class AdvancementMigrationDialog extends Dialog {
  /**
   * A helper constructor function which displays the migration dialog.
   * @param {Item5e} item                    Item to which the advancements are being added.
   * @param {Advancement[]} advancements     New advancements that should be displayed in the prompt.
   * @returns {Promise<Advancement[]|null>}  Resolves with the advancements that should be added, if any.
   */
  static createDialog(
    item: Item.Implementation, 
    advancements: dnd5e.types.Advancement.Any[]
  ): Promise<dnd5e.types.Advancement.Any[] | null>
}
