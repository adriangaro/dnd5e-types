import ItemListControlsElement from "./item-list-controls.mjs";

/**
 * A context menu for filtering items in a list.
 */
export default class FilterMenu extends foundry.applications.ux.ContextMenu {
  /**
   * Handle applying a filter.
   * @param controls  The parent list controls element.
   * @param event     The triggering event.
   */
  #onClickItem(controls: ItemListControlsElement, event: PointerEvent): void;

  /* -------------------------------------------- */

  /**
   * Render the filter menu's entries.
   * @param controls  The parent list controls element.
   */
  #renderEntries(controls: ItemListControlsElement): void;
}
