import UsesField from "../../data/shared/uses-field.mjs";
import ContextMenu5e from "../context-menu.mjs";
import ItemSheet5e from "./item-sheet.mjs";
import ItemSheetV2Mixin from "./sheet-v2-mixin.mjs";
// Assuming Foundry VTT types like Item.Implementation, DocumentSheetOptions, Document, ActiveEffect.Implementation are globally available

/**
 * V2 Item sheet implementation.
 */
export default class ItemSheet5e2 extends ItemSheetV2Mixin(ItemSheet5e) {

  /**
   * Create a new recovery profile.
   * @returns
   * @protected
   */
  _onAddRecovery(): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Delete an activity.
   * @param target  The deletion even target.
   * @returns
   * @protected
   */
  _onDeleteActivity(target: HTMLElement): Promise<void> | void;

  /* -------------------------------------------- */

  /**
   * Delete a recovery profile.
   * @param target  The deletion event target.
   * @returns
   * @protected
   */
  _onDeleteRecovery(target: HTMLElement): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Edit an activity.
   * @param event  The triggering event.
   * @returns
   * @protected
   */
  _onEditActivity(event: PointerEvent): Promise<void> | void;

  /* -------------------------------------------- */

  /**
   * Handle removing the Item currently being crafted.
   * @returns
   * @protected
   */
  _onRemoveCraft(): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle performing some sheet action.
   * @param event  The originating event.
   * @returns
   * @protected
   */
  _onSheetAction(event: PointerEvent): Promise<void> | void;


  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

 

  /**
   * Handle dropping an Activity onto the sheet.
   * @param event       The drag event.
   * @param transfer       The dropped data.
   * @param transfer.data  The Activity data.
   * @protected
   */
  _onDropActivity(event: DragEvent, transfer: { data: dnd5e.types.Activity.Any }): void;

  /* -------------------------------------------- */

  /**
   * Handle dropping another item onto this item.
   * @param event  The drag event.
   * @param data      The dropped data.
   */
  _onDropItem(event: DragEvent, data: object): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle creating a "Cast" activity when dropping a spell.
   * @param event  The drag event.
   * @param item      The dropped item.
   */
  _onDropSpell(event: DragEvent, item: Item.OfType<'spell'>): void;

  /* -------------------------------------------- */
  /*  Filtering                                   */
  /* -------------------------------------------- */

  /**
   * Filter child embedded ActiveEffects based on the current set of filters.
   * @param collection    The embedded collection name.
   * @param filters  Filters to apply to the children.
   * @returns
   * @protected
   */
  _filterChildren(collection: string, filters: Set<string>): Document[];
}
