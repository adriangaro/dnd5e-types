import ActorSheet5e from "./deprecated/base-sheet.mjs";

/**
 * An Actor sheet for Vehicle type actors.
 */
export default class ActorSheet5eVehicle extends ActorSheet5e {


  /* -------------------------------------------- */

  /** @override */
  static unsupportedItemTypes: Set<string>

  /* -------------------------------------------- */

  /**
   * Creates a new cargo entry for a vehicle Actor.
   */
  static get newCargo(): {name: "", quantity: 1} & fvttUtils.AnyObject

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /**
   * Prepare items that are mounted to a vehicle and require one or more crew to operate.
   * @param item     Copy of the item data being prepared for display.
   * @param context  Display context for the item.
   * @protected
   */
  _prepareCrewedItem(item: Item.Implementation, context: object)

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle saving a cargo row (i.e. crew or passenger) in-sheet.
   * @param event              Triggering event.
   * @returns   Actor after update if any changes were made.
   * @private
   */
  _onCargoRowChange(event: Event): Promise<Actor.Implementation>|null

  /* -------------------------------------------- */

  /**
   * Handle creating and deleting crew and passenger rows.
   * @param event   Triggering inventory event.
   */
  _onInventoryEvent(event: CustomEvent): Promise<Actor.Implementation | void>
}
