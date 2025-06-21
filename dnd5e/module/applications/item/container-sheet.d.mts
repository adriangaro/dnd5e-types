import type ItemSheet5e from "./item-sheet.d.mts";

/**
 * Extended version of item sheet to handle containers.
 */
declare class ContainerSheet<
  RenderContext extends fvttUtils.AnyObject = {},
  Configuration extends fvttUtils.AnyObject = {},
  RenderOptions extends fvttUtils.AnyObject = {},
> extends ItemSheet5e<
  Item.Implementation,
  ContainerSheet.MakeRenderContext<RenderContext>,
  ContainerSheet.MakeConfiguration<Configuration>,
  ContainerSheet.MakeRenderOptions<RenderOptions>
> {
  
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The container's cached contents.
   * @protected
   */
  protected _items: Item.Implementation[];

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Prepare rendering context for the contents tab.
   * @param context  Context being prepared.
   * @param options  Options which configure application rendering behavior.
   * @returns        Updated context.
   * @protected
   */
  protected _prepareContentsContext(context: this['__RenderContext'], options: fvttUtils.DeepPartial<this['__RenderOptions']>): Promise<this['__RenderContext']>;

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /**
   * Handle the dropping of Folder data onto the Container sheet.
   * @param event  The concluding DragEvent which contains the drop data.
   * @param data   The data transfer extracted from the event.
   * @returns      The created Item objects.
   */
  protected _onDropFolder(event: DragEvent, data: { type: string; uuid: string }): Promise<Item.Implementation[]>;

  /**
   * Handle the dropping of Item data onto an Item Sheet.
   * @param event  The concluding DragEvent which contains the drop data.
   * @param data   The data transfer extracted from the event.
   * @returns      The created Item objects or `false` if it couldn't be created.
   * @protected
   */
  protected _onDropItem(event: DragEvent, data: any): Promise<Item.Implementation[] | boolean | void>;

  /**
   * Process a single item when dropping into the container.
   * @param itemData  The item data to create.
   * @param options   Options for processing the drop.
   * @returns         The item data to create after processing, or false if the item should not be
   *                  created or creation has been otherwise handled.
   * @protected
   */
  protected _onDropSingleItem(itemData: object, options: { container: string; depth: number; event: DragEvent }): Promise<object | false>;

  /**
   * Handle a drop event for an existing contained Item to sort it relative to its siblings.
   * @param event  The concluding DragEvent.
   * @param item   The item that needs to be sorted.
   * @protected
   */
  protected _onSortItem(event: DragEvent, item: Item.Implementation): Promise<void>;

  /* -------------------------------------------- */
  /*  Filtering                                   */
  /* -------------------------------------------- */

  /**
   * Filter the container's contents based on the current set of filters.
   * @param items    The Items to filter.
   * @param filters  Filters applied to the Item list.
   * @returns        Filtered Items.
   * @protected
   */
  protected _filterItems(items: Item.Implementation[], filters: Set<string>): Item.Implementation[];

  /**
   * Determine whether an Item will be shown based on the current set of filters.
   * @param item     The Item.
   * @param filters  Filters applied to the Item.
   * @returns        Whether the item should be shown or undefined to continue filtering.
   * @protected
   */
  protected _filterItem(item: Item.Implementation, filters: Set<string>): boolean | void;
}

declare class AnyContainerSheet extends ContainerSheet<any, any, any> {
  constructor(...args: any[]);
}

declare namespace ContainerSheet {
  interface Any extends AnyContainerSheet {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyContainerSheet> {}

  type MakeRenderContext<Ctx extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {
      // Container-specific context
      items: Item.Implementation[];
      itemContext: Record<string, {
        totalWeight: number;
        isExpanded: boolean;
        isStack: boolean;
        expanded: any;
        groups: { contents: string; type: string };
        dataset: { groupContents: string; groupType: string };
        capacity?: {
          value: number;
          max: number;
          maxLabel: string | number;
          pct: number;
        };
        columns?: string[];
        clickAction?: string;
      }>;
      isContainer: boolean;
      rollableClass: string;
      encumbrance: {
        value: number;
        max: number;
        maxLabel: string | number;
        pct: number;
      };
      inventory: any[];
      listControls: any;
      showCurrency: boolean;
      config: any; // TODO: Remove when actors convert to AppV2
    },
    Ctx
  >;
  type RenderContext = ContainerSheet['__RenderContext'];

  type MakeConfiguration<Cfg extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {},
    Cfg
  >;
  type Configuration = ContainerSheet['__Configuration'];

  type MakeRenderOptions<Opt extends fvttUtils.AnyObject = {}> = dnd5e.types.DeepMerge<
    {},
    Opt
  >;
  type RenderOptions = ContainerSheet['__RenderOptions'];
}

export default ContainerSheet;
