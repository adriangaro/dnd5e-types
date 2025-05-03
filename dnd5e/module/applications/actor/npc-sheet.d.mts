import type { prosemirror } from "node_modules/fvtt-types/src/foundry/client-esm/client.d.mts";
import ActorSheet5e from "./base-sheet.mjs";

/**
 * An Actor sheet for NPC type characters.
 */
export default class ActorSheet5eNPC extends ActorSheet5e {

  /* -------------------------------------------- */

  /**
   * Format NPC armor information into a localized string.
   * @returns  Formatted armor label.
   */
  getArmorLabel(): string

  /* -------------------------------------------- */

  /**
   * A helper method to establish the displayed preparation state for an item.
   * @param item     Item being prepared for display.
   * @param context  Context data for display.
   * @protected
   */
  _prepareItem(item: Item.Implementation, context: object)

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers
  /* -------------------------------------------- */

  /**
   * Handle mouse click events for NPC sheet actions.
   * @param event  The originating click event.
   * @private
   */
  _onSheetAction(event: MouseEvent): Promise<tinyMCE.Editor | prosemirror.EditorView | dnd5e.dice.D20Roll[] | null | void> | void
}
