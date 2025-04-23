import type AdvancementConfig from "./advancement-config-v2.d.mts"

/**
 * Presents a list of advancement types to create when clicking the new advancement button.
 * Once a type is selected, this hands the process over to the advancement's individual editing interface.
 *
 * @param {Item5e} item             Item to which this advancement will be added.
 * @param {object} [dialogData={}]  An object of dialog data which configures how the modal window is rendered.
 * @param {object} [options={}]     Dialog rendering options.
 */
export default class AdvancementSelection extends Dialog {
  item: Item.Implementation

  constructor(item: Item.Implementation, ...args: ConstructorParameters<typeof Dialog>)

  /* -------------------------------------------- */

  /**
   * A helper constructor function which displays the selection dialog and returns a Promise once its workflow has
   * been resolved.
   * @param {Item5e} item                         Item to which the advancement should be added.
   * @param {object} [config={}]
   * @param {boolean} [config.rejectClose=false]  Trigger a rejection if the window was closed without a choice.
   * @param {object} [config.options={}]          Additional rendering options passed to the Dialog.
   * @returns {Promise<AdvancementConfig|null>}   Result of `Item5e#createAdvancement`.
   */
  static createDialog(item: Item.Implementation, config?:{ 
    rejectClose?: boolean, options?: object
  }): Promise<AdvancementConfig.Any | null>
}
