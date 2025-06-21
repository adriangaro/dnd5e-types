import ActorSheetMixin from "./deprecated/sheet-mixin.mjs";

/**
 * A character sheet for group-type Actors.
 * The functionality of this sheet is sufficiently different from other Actor types that we extend the base
 * Foundry VTT ActorSheet instead of the ActorSheet5e abstraction used for character, npc, and vehicle types.
 */
export default class GroupActorSheet extends ActorSheetMixin(foundry.appv1?.sheets?.ActorSheet) {

  /**
   * IDs for items on the sheet that have been expanded.
   * @protected
   */
  _expanded: Set<string>

  /* -------------------------------------------- */

  /**
   * A set of item types that should be prevented from being dropped on this type of actor sheet.
   * @type {Set<string>}
   */
  static unsupportedItemTypes: Set<string>

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /**
   * Prepare a localized summary of group membership.
   * @param  stats     The number of members in the group
   * @returns                                         The formatted summary string
   */
  #getSummary(stats: {nMembers: number, nVehicles: number}): string

  /* -------------------------------------------- */

  /**
   * Prepare membership data for the sheet.
   */
  #prepareMembers(): {sections: object, stats: object}

  /* -------------------------------------------- */

  /**
   * Prepare movement speed data for rendering on the sheet.
   */
  #prepareMovementSpeed(): {secondary: string, primary: string}

  /* -------------------------------------------- */

  /**
   * Prepare inventory items for rendering on the sheet.
   * @param context  Prepared rendering context.
   */
  #prepareInventory(context: object): Record<string, object>


  /* -------------------------------------------- */

  /**
   * Handle clicks to action buttons on the group sheet.
   * @param event      The initiating click event
   * @protected
   */
  _onClickActionButton(event: PointerEvent)

  /* -------------------------------------------- */

  /**
   * Handle clicks on member names in the members list.
   * @param event      The initiating click event
   * @protected
   */
  _onClickMemberName(event: PointerEvent)


  /* -------------------------------------------- */

  /**
   * Handles dropping of a single item onto this group sheet.
   * @param itemData            The item data to create.
   * @param event            The concluding DragEvent which provided the drop data.
   * @returns   The item data to create after processing, or false if the item should not be
   *                                     created or creation has been otherwise handled.
   * @protected
   */
  _onDropSingleItem(itemData: Item.CreateData, event: DragEvent): Promise<object|boolean>
}
