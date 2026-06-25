/** A custom element that handles displaying a collection of items. */

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
   * The HTML tag named used by this element.
   */
  static tagName: string;

  /**
   * Retrieve the templates needed to render the inventory.
   */
  static get templates(): string[];

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
  get app(): foundry.applications.api.ApplicationV2.Any;

  /**
   * Can items be used from this inventory list.
   */
  get canUse(): boolean;

  /**
   * The document that holds these items.
   */
  get document(): Actor.Implementation | Item.Implementation;

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
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Prepare an array of context menu options which are available for inventory items.
   * @param item     The item.
   * @param element  The item's rendered element.
   */
  protected _getContextOptions(
    item: Item.Implementation,
    element: HTMLElement
  ): foundry.applications.ux.ContextMenu.Entry<HTMLElement>[];

  /**
   * Handle item actions.
   * @param target           The action target.
   * @param action           The action to invoke.
   * @param options.event    The triggering event.
   */
  protected _onAction(target: HTMLElement, action: string, options?: { event?: PointerEvent }): Promise<void>;

  /**
   * Handle incrementing or decrementing a numeric input.
   * @param event  The triggering event.
   */
  protected _onAdjustInput(event: PointerEvent): void;

  /**
   * Handle changing the quantity or charges fields.
   * @param event  Triggering change event.
   */
  protected _onChangeInput(event: Event): Promise<void>;

  /**
   * Handle input changes to numeric form fields, allowing them to accept delta-typed inputs.
   * @param event  Triggering event.
   */
  protected _onChangeInputDelta(event: Event): Promise<void>;

  /**
   * Handle deleting an item.
   * @param item  The item.
   */
  protected _onDeleteItem(item: Item.Implementation): Promise<unknown>;

  /**
   * Handle duplicating an item.
   * @param item  The item.
   * @returns  The duplicated item.
   */
  protected _onDuplicateItem(item: Item.Implementation): Promise<Item.Implementation>;

  /**
   * Handle editing an item.
   * @param item  The item.
   */
  protected _onEditItem(item: Item.Implementation): Promise<foundry.applications.api.ApplicationV2>;

  /**
   * Handle spawning the currency management dialog.
   */
  protected _onManageCurrency(): Promise<foundry.applications.api.ApplicationV2>;

  /**
   * Handle opening the context menu.
   * @param element  The element the context menu was triggered for.
   */
  protected _onOpenContextMenu(element: HTMLElement): void;

  /**
   * Handle recharging an item.
   * @param entry          The entity being recharged.
   * @param options.event  The triggering event.
   */
  protected _onRollRecharge(
    entry: Item.Implementation | dnd5e.types.Activity.Instance,
    options?: { event?: PointerEvent }
  ): Promise<foundry.dice.Roll | void>;

  /**
   * Manage columns when the inventory element's inline size changes.
   * @param entries  Resize observer entries.
   */
  protected _onResize(entries: ResizeObserverEntry[]): void;

  /**
   * Handle toggling an item's attunement status.
   * @param item  The item.
   */
  protected _onToggleAttunement(item: Item.Implementation): Promise<Item.Implementation>;

  /**
   * Handle toggling an item's charged state.
   * @param item  The item.
   */
  protected _onToggleCharge(item: Item.Implementation): Promise<Item.Implementation>;

  /**
   * Handle toggling an item's equipped state.
   * @param item  The item.
   */
  protected _onToggleEquipped(item: Item.Implementation): Promise<Item.Implementation>;

  /**
   * Handle toggling an item's presence in an NPC's gear list.
   * @param item  The item.
   */
  protected _onToggleGear(item: Item.Implementation): void;

  /**
   * Handle toggling an item's identified state.
   * @param item  The item.
   */
  protected _onToggleIdentify(item: Item.Implementation): Promise<Item.Implementation>;

  /**
   * Handle toggling an item's in-line description.
   * @param target        The action target.
   * @param options.item  The item instance, otherwise it will be inferred from the target.
   */
  protected _onToggleExpand(target: HTMLElement, options?: { item?: Item.Implementation }): Promise<void>;

  /**
   * Handle toggling an item's favorited status.
   * @param item  The item.
   */
  protected _onToggleFavorite(item: Item.Implementation): Promise<Actor.Implementation | void>;

  /**
   * Handle toggling a spell's prepared state.
   * @param item  The spell.
   */
  protected _onTogglePrepared(item: Item.Implementation): Promise<Item.Implementation>;

  /**
   * Handle using an activity.
   * @param activity       The activity.
   * @param options.event  The triggering event.
   */
  protected _onUseActivity(
    activity: dnd5e.types.Activity.Instance,
    options?: { event?: PointerEvent }
  ): Promise<dnd5e.types.documents.activity.ActivityUsageResults | void>;

  /**
   * Handle activating an item.
   * @param item           The item.
   * @param options.event  The triggering event.
   */
  protected _onUseItem(
    item: Item.Implementation,
    options?: { event?: PointerEvent }
  ): Promise<dnd5e.types.documents.activity.ActivityUsageResults | ChatMessage.Implementation | object | void>;

  /**
   * Handle viewing an item.
   * @param item  The item.
   */
  protected _onViewItem(item: Item.Implementation): Promise<foundry.applications.api.ApplicationV2>;

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Retrieve an item by its ID.
   * @param id  The Item ID.
   */
  getItem(id: string): Item.Implementation | Promise<Item.Implementation> | undefined;

  /**
   * Map column descriptors to their renderable form.
   */
  static mapColumns(
    cols: (string | InventoryElement.InventoryColumnDescriptor)[]
  ): InventoryElement.InventoryColumnDescriptor[];

  /**
   * Prepare section descriptors for rendering.
   */
  static prepareSections(
    sections: Partial<InventoryElement.InventorySectionDescriptor>[]
  ): InventoryElement.InventorySectionDescriptor[];

  /**
   * Return the union of all columns that need to be rendered in order to satisfy every rendered section.
   */
  static unionColumns(
    sections: Partial<InventoryElement.InventorySectionDescriptor>[]
  ): (string | InventoryElement.InventoryColumnDescriptor)[];
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
    /** The minimum width of the primary column in this section. If the section is resized such that the primary column would be smaller than this width, secondary columns are hidden in order to retain this minimum. */
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

  interface Any extends InventoryElement {}
  interface AnyConstructor extends fvttUtils.Identity<typeof InventoryElement> {}
}

export default InventoryElement;
