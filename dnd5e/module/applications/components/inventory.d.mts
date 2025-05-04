/**
 * Custom element that handles displaying actor & container inventories.
 */
export default class InventoryElement extends HTMLElement {
  connectedCallback(): void;

  /**
   * Prepare filter lists and attach their listeners.
   * @protected
   */
  protected _initializeFilterLists(): void;

  /**
   * TODO: Remove filtering code from dnd5e-inventory when all sheets use item-list-controls.
   * Apply the current set of filters to the inventory list.
   * @param {FilterState5e} state  The filter state to apply.
   * @protected
   */
  protected _applyFilters(state: any): void; // TODO: Define FilterState5e type

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Reference to the application that contains this component.
   */
  #app: Application;

  /**
   * Reference to the application that contains this component.
   * @protected
   */
  protected get _app(): Application;

  /* -------------------------------------------- */

  /**
   * Can items be used directly from the inventory?
   */
  get canUse(): boolean;

  /* -------------------------------------------- */

  /**
   * Containing actor for this inventory, either the document or its parent if document is an item.
   */
  get actor(): Actor.Implementation | null;

  /* -------------------------------------------- */

  /**
   * Document whose inventory is represented.
   */
  get document(): Actor.Implementation | Item.Implementation;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Retrieve an item with the specified ID.
   * @param id
   */
  getItem(id: string): Item.Implementation | Promise<Item.Implementation>;

  /* -------------------------------------------- */
  /*  Event Handlers                              */
  /* -------------------------------------------- */

  /**
   * Prepare an array of context menu options which are available for inventory items.
   * @param item           The Item for which the context menu is activated.
   * @param element The element the context menu was spawned from.
   * @returns  An array of context menu options offered for the Item.
   */
  _getContextOptions(item: Item.Implementation, element?: HTMLElement): foundry.applications.ux.ContextMenu.Entry<JQuery>[];

  /* -------------------------------------------- */

  /**
   * Handle changing the quantity or charges fields.
   * @param event  Triggering change event.
   * @protected
   */
  protected _onChangeInput(event: Event): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle input changes to numeric form fields, allowing them to accept delta-typed inputs.
   * @param event  Triggering event.
   * @protected
   */
  protected _onChangeInputDelta(event: Event): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle incrementing or decrementing a numeric input.
   * @param event  The triggering event.
   * @protected
   */
  protected _onAdjustInput(event: PointerEvent): void;

  /* -------------------------------------------- */

  /**
   * Handle item actions.
   * @param target                Button or context menu entry that triggered this action.
   * @param action                 Action being triggered.
   * @param options
   * @param options.event  The original triggering event.
   * @protected
   */
  protected _onAction(target: Element, action: string, { event }?: { event?: PointerEvent }): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Create a new item.
   * @param target  Button or context menu entry that triggered this action.
   */
  _onCreate(target: HTMLElement): Promise<Item.Implementation | null>;

  /* -------------------------------------------- */

  /**
   * Expand or collapse an item's summary.
   * @param target  Button or context menu entry that triggered this action.
   * @param item         Item to being expanded or collapsed.
   */
  _onExpand(target: HTMLElement, item: Item.Implementation ): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Handle opening the context menu.
   * @param element  The element the context menu was triggered on.
   * @protected
   */
  protected _onOpenContextMenu(element: HTMLElement): void;
}