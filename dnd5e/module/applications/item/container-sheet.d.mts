import type ItemSheet5e from "./item-sheet.d.mts";

/**
 * @extends {ItemSheet5e}
 */
export default class ContainerSheet extends ItemSheet5e {
  /**
   * IDs for items on the sheet that have been expanded.
   * @type {Set<string>}
   * @protected
   */
  _expanded: Set<string>;


  /**
   * Handle the dropping of Folder data onto the Container sheet.
   * @param event              The concluding DragEvent which contains the drop data.
   * @param data                  The data transfer extracted from the event.
   * @returns The created Item objects.
   */
  _onDropFolder(event: DragEvent, data: { type: string; uuid: string }): Promise<Item.Implementation[]>;

  /* -------------------------------------------- */

  /**
   * Handle the dropping of Item data onto an Item Sheet.
   * @param event              The concluding DragEvent which contains the drop data.
   * @param data                  The data transfer extracted from the event.
   * @returns The created Item objects or `false` if it couldn't be created.
   * @protected
   */
  _onDropItem(event: DragEvent, data: { type: string; uuid: string }): Promise<Item.Implementation[] | boolean | void>;

  /* -------------------------------------------- */

  /**
   * Process a single item when dropping into the container.
   * @param itemData           The item data to create.
   * @param options
   * @param options.container  ID of the container to create the items.
   * @param options.depth      Current depth of the item being created.
   * @param options.event   The concluding DragEvent which provided the drop data.
   * @returns The item data to create after processing, or false if the item should not be
   *                                    created or creation has been otherwise handled.
   * @protected
   */
  _onDropSingleItem(itemData: object, options: { container: string; depth: number; event: DragEvent }): Promise<object | false>;

  /* -------------------------------------------- */

  /**
   * Handle a drop event for an existing contained Item to sort it relative to its siblings.
   * @param event  The concluding DragEvent.
   * @param item      The item that needs to be sorted.
   * @protected
   */
  _onSortItem(event: DragEvent, item: Item.Implementation): Promise<void>;
}
