import type { FilterState5e } from "./item-list-controls.d.mts";

/**
 * A custom element that handles displaying a collection of items.
 */
declare class InventoryElement extends HTMLElement {
  /* -------------------------------------------- */
  /*  Configuration                               */
  /* -------------------------------------------- */

  /**
   * Well-known inventory columns.
   */
  static COLUMNS: Record<string, InventoryElement.InventoryColumnDescriptor>;

  /**
   * Well-known inventory sections.
   */
  static SECTIONS: Record<string, InventoryElement.InventorySectionDescriptor>;

  /**
   * Retrieve the templates needed to render the inventory.
   */
  static get templates(): string[];

  /* -------------------------------------------- */
  /*  Lifecycle                                   */
  /* -------------------------------------------- */

  connectedCallback(): void;

  /* -------------------------------------------- */
  /*  Methods                                     */
  /* -------------------------------------------- */

  /**
   * Cache section data to avoid expensive lookups during resize events.
   * @internal
   */
  _cacheSections(): void;

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * The actor that manages these items.
   */
  get actor(): Actor.Implementation | null;

  /**
   * Reference to the Application that contains this component.
   */
  get app(): foundry.applications.api.ApplicationV2;

  /**
   * Reference to the application that contains this component.
   */
  #app: foundry.applications.api.ApplicationV2;

  /**
   * Can items be used from this inventory list.
   */
  get canUse(): boolean;

  /**
   * The document that holds these items.
   */
  get document(): Actor.Implementation | Item.Implementation;

  /**
   * Cached section data to avoid expensive lookups during resize events.
   */
  #sections: {
    columns: Partial<InventoryElement.InventoryColumnDescriptor>[];
    elements: Record<string, HTMLElement[]>;
    element: HTMLElement;
    minWidth?: number;
  }[];

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /**
   * Prepare an array of context menu options which are available for inventory items.
   * @param item          The item.
   * @param element  The item's rendered element.
   * @returns  An array of context menu options offered for the Item.
   * @protected
   */
  protected _getContextOptions(item: Item.Implementation, element?: HTMLElement): foundry.applications.ux.ContextMenu.Entry<HTMLElement>[];

  /**
   * Handle item actions.
   * @param target - The action target.
   * @param action - The action to invoke.
   * @param options - Options object.
   * @param options.event - The triggering event.
   * @protected
   */
  protected _onAction(target: HTMLElement, action: string, { event }?: { event?: PointerEvent }): Promise<void>;

  /**
   * Handle incrementing or decrementing a numeric input.
   * @param event  The triggering event.
   * @protected
   */
  protected _onAdjustInput(event: PointerEvent): void;

  /**
   * Handle changing the quantity or charges fields.
   * @param event  Triggering change event.
   * @protected
   */
  protected _onChangeInput(event: Event): Promise<void>;

  /**
   * Handle input changes to numeric form fields, allowing them to accept delta-typed inputs.
   * @param event  Triggering event.
   * @protected
   */
  protected _onChangeInputDelta(event: Event): Promise<void>;

  /**
   * Create an item on a legacy sheet.
   * TODO: Remove once legacy sheets are removed.
   * @param event - The triggering event.
   * @protected
   */
  protected _onCreateItem(event: Event): Promise<Item.Implementation> | void;

  /**
   * Handle deleting an item.
   * @param item - The item to delete.
   * @protected
   */
  protected _onDeleteItem(item: Item.Implementation): Promise<void>;

  /**
   * Handle duplicating an item.
   * @param item        The item.
   * @returns  The duplicated item.
   * @protected
   */
  protected _onDuplicateItem(item: Item.Implementation): Promise<Item.Implementation>;

  /**
   * Handle editing an item.
   * @param item  The item.
   * @protected
   */
  protected _onEditItem(item: Item.Implementation): Promise<foundry.applications.api.ApplicationV2>;

  /**
   * Handle spawning the currency management dialog.
   * @protected
   */
  protected _onManageCurrency(): Promise<foundry.applications.api.ApplicationV2>;

  /**
   * Handle opening the context menu.
   * @param element  The element the context menu was triggered for.
   * @protected
   */
  protected _onOpenContextMenu(element: HTMLElement): void;

  /**
   * Handle recharging an item.
   * @param entry - The entity being recharged.
   * @param options - Options object.
   * @param options.event - The triggering event.
   * @protected
   */
  protected _onRollRecharge(entry: Item.Implementation | dnd5e.types.Activity.Implementation, { event }?: { event?: PointerEvent }): Promise<foundry.dice.Roll | void>;

  /**
   * Manage columns when the inventory element's inline size changes.
   * @param entries - Resize observer entries.
   * @protected
   */
  protected _onResize(entries: ResizeObserverEntry[]): void;

  /**
   * Handle toggling an item's attunement status.
   * @param item  The item.
   * @protected
   */
  protected _onToggleAttunement(item: Item.Implementation): Promise<Item.Implementation>;

  /**
   * Handle toggling an item's charged state.
   * @param item  The item.
   * @protected
   */
  protected _onToggleCharge(item: Item.Implementation): Promise<Item.Implementation>;

  /**
   * Handle toggling an item's equipped state.
   * @param item  The item.
   * @protected
   */
  protected _onToggleEquipped(item: Item.Implementation): Promise<Item.Implementation>;

  /**
   * Handle toggling an item's in-line description.
   * @param target - The action target.
   * @param options - Options object.
   * @param options.item - The item instance, otherwise it will be inferred from the target.
   * @protected
   */
  protected _onToggleExpand(target: HTMLElement, { item }?: { item?: Item.Implementation }): Promise<void>;

  /**
   * Handle toggling an item's favorited status.
   * @param item  The item.
   * @protected
   */
  protected _onToggleFavorite(item: Item.Implementation): Promise<Actor.Implementation | void>;

  /**
   * Handle toggling a spell's prepared state.
   * @param item  The spell.
   * @protected
   */
  protected _onTogglePrepared(item: Item.Implementation): Promise<Item.Implementation>;

  /**
   * Handle using an activity.
   * @param activity - The activity to use.
   * @param options - Options object.
   * @param options.event - The triggering event.
   * @protected
   */
  protected _onUseActivity(activity: dnd5e.types.Activity.Implementation, { event }?: { event?: PointerEvent }): Promise<dnd5e.types.Activity.UsageResults | void>;

  /**
   * Handle activating an item.
   * @param item - The item to use.
   * @param options - Options object.
   * @param options.event - The triggering event.
   * @protected
   */
  protected _onUseItem(item: Item.Implementation, { event }?: { event?: PointerEvent }): Promise<dnd5e.types.Activity.UsageResults | foundry.documents.ChatMessage | fvttUtils.AnyObject | void>;

  /**
   * Handle viewing an item.
   * @param item  The item.
   * @protected
   */
  protected _onViewItem(item: Item.Implementation): Promise<foundry.applications.api.ApplicationV2>;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Retrieve an item by its ID.
   * @param id - The Item ID.
   */
  getItem(id: string): Item.Implementation | Promise<Item.Implementation>;

  /**
   * Map column descriptors to their renderable form.
   * @param cols - Array of column descriptors or IDs.
   */
  static mapColumns(cols: (string | InventoryElement.InventoryColumnDescriptor)[]): InventoryElement.InventoryColumnDescriptor[];

  /**
   * Prepare section descriptors for rendering.
   * @param sections - Array of section descriptors to prepare.
   */
  static prepareSections(sections: Partial<InventoryElement.InventorySectionDescriptor>[]): InventoryElement.InventorySectionDescriptor[];

  /**
   * Return the union of all columns that need to be rendered in order to satisfy every rendered section.
   * @param sections - Array of section descriptors to analyze.
   */
  static unionColumns(sections: Partial<InventoryElement.InventorySectionDescriptor>[]): (string | InventoryElement.InventoryColumnDescriptor)[];

  /* -------------------------------------------- */
  /*  Deprecated                                  */
  /* -------------------------------------------- */

  /**
   * TODO: Remove filtering code from dnd5e-inventory when all sheets use item-list-controls.
   * Apply the current set of filters to the inventory list.
   * @param state  The filter state to apply.
   * @protected
   * @deprecated
   */
  protected _applyFilters(state: FilterState5e): void;

  /**
   * Prepare filter lists and attach their listeners.
   * @protected
   * @deprecated
   */
  protected _initializeFilterLists(): void;

  /**
   * Reference to the application that contains this component.
   * @protected
   * @deprecated Use {@link app} instead.
   */
  protected get _app(): foundry.applications.api.ApplicationV2;

  /**
   * Create a new item.
   * @param target  Button or context menu entry that triggered this action.
   * @deprecated Use {@link _onCreateItem} instead.
   */
  _onCreate(target: HTMLElement): Promise<Item.Implementation | null>;

  /**
   * Expand or collapse an item's summary.
   * @param target  Button or context menu entry that triggered this action.
   * @param item         Item to being expanded or collapsed.
   * @deprecated Use {@link _onToggleExpand} instead.
   */
  _onExpand(target: HTMLElement, item: Item.Implementation): Promise<void>;
}

declare namespace InventoryElement {
  interface InventorySectionDescriptor {
    /** The section identifier. */
    id: string;
    /** Sections are displayed in ascending order of this value. */
    order: number;
    /** Group identifiers that this section belongs to. */
    groups: Record<string, string>;
    /** The name of the section. Will be localized. */
    label: string;
    /** The minimum width of the primary column in this section. */
    minWidth?: number;
    /** A list of column descriptors or IDs of well-known columns. */
    columns: (string | InventoryColumnDescriptor)[];
    /** Section data stored in the DOM. */
    dataset?: Record<string, string>;
    /** Items in this section. */
    items?: Item.Implementation[];
  }

  interface InventoryColumnDescriptor {
    /** The column identifier. */
    id: string;
    /** The handlebars template used to render the column. */
    template: string;
    /** The amount of pixels of width allocated to represent this column. */
    width: number;
    /** Columns are displayed from left-to-right in ascending order of this value. */
    order: number;
    /** Columns with a higher priority take precedence when there is not enough space to display all columns. */
    priority: number;
    /** The column label. */
    label?: string;
  }
}

export default InventoryElement;