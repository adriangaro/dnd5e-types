import type { DropEffectValue } from "../../drag-drop.mjs";
import Item5e from "../../documents/item.mjs";
import DragDropApplicationMixin from "../mixins/drag-drop-mixin.mjs";
import ItemSheet5e from "./item-sheet.mjs";

/**
 * Compendium with added support for item containers.
 */
declare class ItemCompendium5e extends DragDropApplicationMixin(foundry.applications.sidebar.apps.Compendium) {

  /**
   * The collection managed by this compendium.
   */
  get collection(): foundry.documents.collections.CompendiumCollection<any>;


  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */


  /**
   * Handle dropping an entry into the compendium, managing container relationships.
   * @param target  The drop target element.
   * @param data    The dropped data.
   */
  protected _handleDroppedEntry(target: HTMLElement, data: any): Promise<void>;

  /* -------------------------------------------- */
  /*  Event Handlers                             */
  /* -------------------------------------------- */

  /**
   * Handle clicking on a compendium entry to open its sheet.
   * @param event  The click event.
   */
  protected _onClickEntry(event: Event): Promise<void>;

  /**
   * Check if an entry already exists in this compendium.
   * @param item  The item to check.
   * @returns     Whether the entry already exists.
   * @protected
   */
  protected _entryAlreadyExists(item: Item.Implementation): boolean;
}

export default ItemCompendium5e;
