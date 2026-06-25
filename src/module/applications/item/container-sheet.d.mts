/** Extended version of item sheet to handle containers. */

import ItemSheet5e from "./item-sheet.mjs";
import InventoryElement from "../components/inventory.mjs";

declare class ContainerSheet<
  RenderContext extends object = ContainerSheet.RenderContext,
  Configuration extends
    foundry.applications.api.DocumentSheetV2.Configuration<globalThis.Item.Implementation> = ContainerSheet.Configuration,
  RenderOptions extends
    foundry.applications.api.DocumentSheetV2.RenderOptions = ContainerSheet.RenderOptions,
> extends ItemSheet5e<RenderContext, Configuration, RenderOptions> {
  /** The container's cached contents. */
  protected _items: globalThis.Item.Implementation[];

  /**
   * Prepare rendering context for the contents tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        The prepared rendering context.
   */
  protected _prepareContentsContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /**
   * Handle the dropping of Folder data onto the Container sheet.
   * @param event  The concluding DragEvent which contains the drop data.
   * @param data   The data transfer extracted from the event.
   * @returns      The created Item objects.
   */
  protected _onDropFolder(event: DragEvent, data: object): Promise<globalThis.Item.Implementation[]>;

  /**
   * Handle the dropping of Item data onto an Item Sheet.
   * @param event  The concluding DragEvent which contains the drop data.
   * @param data   The data transfer extracted from the event.
   * @returns      The created Item objects or `false` if it couldn't be created.
   */
  protected _onDropItem(event: DragEvent, data: object): Promise<globalThis.Item.Implementation[] | boolean | void>;

  /**
   * Process a single item when dropping into the container.
   * @param itemData  The item data to create.
   * @param options   Options for processing the drop.
   * @returns         The item data to create after processing, or false if creation has been handled.
   */
  protected _onDropSingleItem(
    itemData: object,
    options: { container: string; depth: number; event: DragEvent }
  ): Promise<object | false>;

  /**
   * Handle a drop event for an existing contained Item to sort it relative to its siblings.
   * @param event  The concluding DragEvent.
   * @param item   The item that needs to be sorted.
   */
  protected _onSortItem(event: DragEvent, item: globalThis.Item.Implementation): Promise<void>;

  /**
   * Filter the container's contents based on the current set of filters.
   * @param items    The Items to filter.
   * @param filters  Filters applied to the Item list.
   * @returns        The filtered array of Items.
   */
  protected _filterItems(items: globalThis.Item.Implementation[], filters: Set<string>): globalThis.Item.Implementation[];

  /**
   * Determine whether an Item will be shown based on the current set of filters.
   * @param item     The Item.
   * @param filters  Filters applied to the Item.
   * @returns        Return false to hide the item; return void to let other filters continue to apply.
   */
  protected _filterItem(item: globalThis.Item.Implementation, filters: Set<string>): boolean | void;
}

declare namespace ContainerSheet {
  interface Any extends ContainerSheet<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof ContainerSheet<any, any, any>> {}

  interface RenderContext extends ItemSheet5e.RenderContext {
    items: globalThis.Item.Implementation[];
    itemContext: Record<
      string,
      {
        totalWeight: number;
        isExpanded: boolean;
        isStack: boolean;
        expanded: object | null;
        groups: { contents: string; type: string };
        dataset: { groupContents: string; groupType: string };
        capacity?: { value: number; max: number; pct: number; units: string; maxLabel?: string | number };
        columns?: InventoryElement.InventoryColumnDescriptor[];
        clickAction?: string;
      }
    >;
    isContainer: boolean;
    rollableClass: string;
    encumbrance: { value: number; max: number; pct: number; units: string; maxLabel?: string | number };
    inventory: InventoryElement.InventorySectionDescriptor[];
    listControls: dnd5e.types.applications.components.ListControlConfiguration;
    currency: Record<dnd5e.types.Currency.TypeKey, number>;
    showCurrency: boolean;
    config: ItemSheet5e.RenderContext["CONFIG"];
  }
  interface Configuration extends ItemSheet5e.Configuration {}
  interface RenderOptions extends ItemSheet5e.RenderOptions {}
}

export default ContainerSheet;
